---
date: 2021-08-21
title: "Herbly.app: Part 2"
cover: "images/herbly-app.jpg"
categories: 
    - Code
slug: "herbly-app-part-two"
tags:
    - node
    - react
    - javascript
    - ruby-on-rails
    - graphql
    - hasura
    - open-source
---

## Herbly: Technical Dive

In [Part One](https://greenmountain.blog/herbly-app-part-one) I described a little bit about the background of the Herbly project. In this post I wanted to go into a little more detail about how I approached the project from a technical perspective.

First, it's probably worth noting right off the bat that I used a mix-and-match approach of technologies on this project because, as with all personal projects (including this blog) I like to either try new technology stacks and frameworks, or revisit those I've worked with in the past to see how they've changed. The project involves a Rails application deployed to Heroku, a Hasura GraphQL layer over the Rails DB, and a React frontend deployed to Netlify.

There's even [a rust version](https://github.com/jcoletaylor/herbly-rust) using [Tide](https://github.com/http-rs/tide) and [SQLx](https://github.com/launchbadge/sqlx) that's in an early stage of development, just to brush up on my Rust 🦀, because it's an amazing language - side note, I really want to [Use Helix](https://usehelix.com/).

### Getting Started

For the core of this project, I selected Rails to help me do my data modeling and schema generation, and to give me a quick REST API to help me conceptually frame the data layer. Building a Rails api-only application is extremely straightforward (`rails new herbly --api --database=postgresql` and there we go). Also using jbuilder templates for expressive representation of the models seemed like a clean way to get started - a declarative syntax for representation rather than a lot of object-attribute mapping can be a nice change of pace from other languages sometimes.

### Generating and Loading Data

As described in Part one, the grunt work of this project was taking semi-structured HTML and building parsers that were flexible enough to generate structured data. While a bit beyond the scope of this project, as with many data-heavy projects, acquiring and cleaning the data from its original source is sometimes the largest lift (ask any of your data scientist friends). The resulting data model is probably easier [to just look](https://dbdiagram.io/d/612122886dc2bb6073b53325) at than describe. I did this in a few stages:

1) Crawling the site (with explicit written permission) to get the thousands of herbs, conditions, and formulas that would represent the data layer. 
2) Parsing the individual herb pages and building references to the other herbs and formulas that were cross linked.
3) Parsing the formula pages and doing the same with associated formulas, core herbs, and herb modifications.
4) Building an [intermediate representation](https://github.com/jcoletaylor/herbly-rails/tree/main/db/data) as JSON files for these.
5) Now in Rails, building a [set of loader logic](https://github.com/jcoletaylor/herbly-rails/tree/main/lib/loader) that would be idempotent, allowing me to add new herbs and formulas over time and simply re-run the loader.

### Building a view for searchability

I knew that on the frontend I was going to want to expose a materialized view for searchability. I have used [Scenic](https://github.com/scenic-views/scenic) for this in the past, and felt like it served well this time also. It makes creating views and integrating them into the migration stack very straightforward. The view logic is here, and worth discussing briefly:

```sql
SELECT
  herbs.id AS searchable_id,
  'Herb' AS searchable_type,
  herbs.name AS name,
  herbs.common_english AS common_english,
  setweight(to_tsvector('english', herbs.name::TEXT), 'A') ||
  setweight(to_tsvector('english', herbs.pinyin::TEXT), 'B') || 
  setweight(to_tsvector('english', herbs.common_english::TEXT), 'B') ||
  setweight(to_tsvector('english', coalesce(string_agg(herb_categories.name, ' '))::TEXT), 'C') || 
  setweight(to_tsvector('english', coalesce(string_agg(herb_action_types.name, ' '))::TEXT), 'C') || 
  setweight(to_tsvector('english', coalesce(string_agg(herb_notes.note, ' '))::TEXT), 'D') AS document
FROM herbs
LEFT OUTER JOIN herb_notes ON herbs.id = herb_notes.herb_id
LEFT OUTER JOIN herb_categories ON herbs.herb_category_id = herb_categories.id
LEFT OUTER JOIN herb_actions ON herbs.id = herb_actions.herb_id
LEFT OUTER JOIN herb_action_types ON herb_actions.herb_action_type_id = herb_action_types.id
GROUP BY herbs.id

UNION

SELECT
  formulas.id AS searchable_id,
  'Formula' AS searchable_type,
  formulas.name AS name,
  formulas.common_english AS common_english,
  setweight(to_tsvector('english', formulas.name::TEXT), 'A') ||
  setweight(to_tsvector('english', formulas.pinyin::TEXT), 'B') ||
  setweight(to_tsvector('english', formulas.common_english::TEXT), 'B') ||
  setweight(to_tsvector('english', coalesce(string_agg(formula_also_knowns.name, ' '))::TEXT), 'C') ||
  setweight(to_tsvector('english', coalesce(string_agg(formula_named_actions.name, ' '))::TEXT), 'C') ||
  setweight(to_tsvector('english', coalesce(string_agg(syndromes.name, ' '))::TEXT), 'C') ||
  setweight(to_tsvector('english', coalesce(string_agg(conditions.name, ' '))::TEXT), 'C') ||
  setweight(to_tsvector('english', coalesce(string_agg(symptoms.name, ' '))::TEXT), 'C') ||
  setweight(to_tsvector('english', coalesce(string_agg(formula_notes.note, ' '))::TEXT), 'D') AS document
FROM formulas
LEFT OUTER JOIN formula_notes ON formulas.id = formula_notes.formula_id
LEFT OUTER JOIN formula_also_knowns ON formulas.id = formula_also_knowns.formula_id
LEFT OUTER JOIN formula_actions ON formulas.id = formula_actions.formula_id
LEFT OUTER JOIN formula_named_actions ON formula_actions.formula_named_action_id = formula_named_actions.id
LEFT OUTER JOIN formula_syndromes ON formulas.id = formula_syndromes.formula_id
LEFT OUTER JOIN syndromes ON formula_syndromes.syndrome_id = syndromes.id
LEFT OUTER JOIN formula_conditions ON formulas.id = formula_conditions.formula_id
LEFT OUTER JOIN conditions ON formula_conditions.condition_id = conditions.id
LEFT OUTER JOIN formula_manifestations ON formulas.id = formula_manifestations.formula_id
LEFT OUTER JOIN formula_manifestation_symptoms ON formula_manifestations.id = formula_manifestation_symptoms.formula_manifestation_id
LEFT OUTER JOIN symptoms ON formula_manifestation_symptoms.symptom_id = symptoms.id
GROUP BY formulas.id

ORDER BY name ASC;

CREATE OR REPLACE FUNCTION full_search (search text)
	RETURNS SETOF search_results
	AS $$
	SELECT
		*
	FROM
		search_results
	WHERE
		document @@ plainto_tsquery('english', search)
	ORDER BY
		ts_rank(document, plainto_tsquery('english', search)) DESC;
$$
LANGUAGE sql
STABLE;
```

Herbs and Formulas do not share identical structures, but in order to make our `tsvector` style searches work across both herbs and formulas, I needed to build a `UNION` between them, and allow their differences be agregated into the full-text search as weighted composed joins into a `document` that could be queried by user-supplied inputs from the frontend. To be candid this involved some research and trial and error to get working the way I wanted, but I have been impressed by how easy and fast it was to get it set up and running. In my more professional-life projects I have usually just run to ElasticSearch for my indexing and full-text querying. For a personal project I honestly did not want to pay the hosting costs for spinning up ElasticSearch in Heroku, and this provided a really effective solution.

### Hasura and GraphQL

While [excellent solutions](https://graphql-ruby.org/) for GraphQL in Rails exist, I have been finding myself drawn to the [Hasura](https://hasura.io/) project - I use it regularly in my professional work, and because they make it dead-simple to [deploy to Heroku](https://hasura.io/docs/latest/graphql/core/deployment/deployment-guides/heroku.html) it seemed like an obvious choice. Once I deployed it and changed the Postgres URL to my shared Rails DB, it was more or less ready to go. The only thing to specifically note is that if you are going to expose publicly an `anonymous` role in Hasura, you have to configure that at startup, and explicitly grant what permissions (in my case, read only queries and count aggregates) to the tables you want it to use. Fortunately, Hasura will let you export the config so it is very easy to spin back up if you need to replay it for testing or in other environments, or if migrating services.

With my database wired up to Hasura, I could test out my search functionality. The GraphQL is very straightforward:

```graphql
query Search($search: String!, $limit: Int!, $offset: Int!) {
    full_search(args: { search: $search }, limit: $limit, offset: $offset) {
        name
        common_english
        searchable_id
        searchable_type
    }
    full_search_aggregate(args: { search: $search }) {
        aggregate {
            count
        }
    }
}
```

Space constrains showing that much more GraphQL here, but the queries for herbs, formulas, and associated elements are highly expressive using Hasura's syntax. For detail pages with complex object graphs needed for the frontend, it was very straightforward to build queries needed to retrieve all of the page data from a single network call. Hasura's query generation is very well optimized and leads to excellent performance on the frontend, even with relatively minimal DB and Application server sizes in the Heroku stack that serves the data.

### React and the Frontend

If you're curious, this is [the live website](https://www.herbly.app/). In my day-to-day professional life, my time is usually spent more on the API / Data Layer / Integration architecture side of the world. I don't get as much time to write frontend code as I might like, and so I took the opportunity to write [some React code](https://github.com/jcoletaylor/herbly-react). To integrate the React presentational components with the Hasura GraphQL data source, I opted for the [Apollo Client](https://www.apollographql.com/docs/react/) - the first time really worked with the client originally, it had a more Redux-style pattern to it, but recently they have moved to a hooks architecture, which has significantly simplified things. Specifically, the `useQuery` hook from the Apollo Client destructures `{ loading, error, data }` when called, which makes building components much more intuitive, and allows for shared patterns for showing commong loading and error components.

I decided to go with the [Bulma](https://bulma.io) framework for styling, simply because I have a reasonable amount of experience with it, it is fairly lightweight, and provides a good number of out-of-the-box components for building responsive sites and applications. The site is solidly functional at this point for searching through herbs and formulas, though there are a number of pieces that I would like to roll out when I get time, including better findability for browsing rather than just searching.

### Future Development

One of the primary reasons, originally, for leaning toward structured data (beyond the fact that my brain just thinks that way after this many years), rather than just loading data into a NoSQL database was that I really want try my hand at converting it to a Node/Relationship model for a Graph DB (like [Neo4J](https://neo4j.com/)) to make it more intuitive to explore this data, to see what formulas begin to present as shared "families" (a concept common in TCM) and which herbs show up most commonly for what kind of complaints. Of course this could be done with some thinking and clever DB queries, but like I noted at the start, this whole project has been an opportunity for me to try new things!