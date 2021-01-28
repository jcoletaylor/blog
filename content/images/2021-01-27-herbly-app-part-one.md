---
date: 2021-01-27
title: "Herbly.app: Part 1"
cover: "images/herbly-foundation-small.jpg"
categories: 
    - Code
slug: "herbly-app-part-one"
tags:
    - node
    - react
    - javascript
    - ruby-on-rails
    - graphql
    - hasura
    - open-source
---

## Herbly: A New Site for an Old Medicine

I've just released [Herbly.app](https://www.herbly.app) on [Netlify](https://www.netlify.com/). It is a React app mostly because I wanted to get myself up to speed with using Hooks, the Context API, and the new React Router patterns, moving away from Redux after a few older projects where, despite its power, it felt like a bit of a hassle.

It also gave me a chance to use [Hasura GraphQL](https://hasura.io/) for a personal project - I've been using Hasura for production facing professional projects for a while now, but this was the first chance I had to really build it out against one of my own development projects. I'm using the [Apollo Client](https://www.apollographql.com/apollo-client/) to interact with Hasura, and it's really an excellent solution for frontend development. I have to say that the combination of Hooks, Context API, and the Apollo Client have really made developing a lot of functionality happen very quickly.

## Old medicine

Herbal medicine, particularly Chinese and East Asian herbal medicine, is hard to learn. I got a post-graduate degree and a full round of licensure in it, and I'm still telling you, yeah, it's hard to learn. For one thing, there's a lot of it. Like hundreds and hundreds of individual herbs, and thousands upon thousands of ways to combine them into formulas. For another, the herbs and the formulas are treated differently across various schools of thought, some radically different from one another. Given the geographical and historical distance between the cultural areas that gave rise to different schools, even herbs you think you know pretty well can show up in other formulas used in remarkably different ways.

I don't really work as an herbal clinician anymore. My run with the medicine as a practicing herbalist was pretty short-lived in the grand scheme of things, but I loved the study of it. Maybe because I'm really just a software dev at heart, but throughout my study, it really seemed like this vast system of medicine, in its intricacies and nuances, could probably be structured out as pretty clean data sets for study and analysis, if someone had the time and inclination.

If you've ever visited [American Dragon](https://www.americandragon.com/), you'll see what a great job Dr. Joel Penner did in curating a really massive data set. It's not a complete set of all herbs and formulas in all of TCM by any means, but over the decades of his practice, he put together hundreds of carefully laid out pages on herbs, formulas, and conditions. He has sadly passed away, but in 2019 he and I exchanged emails where I described the project I wanted to undertake, and after some explanation, he gave me permission.

## New tech

My proposal to Dr. Penner was this - I wanted to crawl his site, and convert it to structured data. The work he had done on curating the data and putting it together as flat html files was frankly impressive. It was clearly a labor of love, done over a professional lifetime. But html is not especially transferable between different systems - other sites, other applications, and other analytic tools are not really able to easily rely on flat html documents, and parsing them for their data is non-trivial. I wanted to make his work more open and available, and eventually add data from other sources to supplement it.

I did all of that because I wanted to build a TCM herb and formula API. I wanted there to be programatic ways to query and access this rich data in a way that could be done from the web, from mobile applications, and from other services. Maybe it's just because the majority of my professional life is spent designing, implementing, and maintaining a wide range of different APIs, and for me, data isn't real until it is well structured, clearly defined, and available across a well-documented API. Or it could just be that I thought it would be fun to try.

Still, why APIs? TCM herbal medicine is an extremely rich field of study. But many of the resources are closed-source or proprietary in nature, and this can make building public and shared ways to interact with this information more difficult than it needs to be.

The github repository for the website is [here](https://github.com/jcoletaylor/herbly-react). It is written in [React](https://reactjs.org/) and backed up by the [Hasura GraphQL Engine](https://hasura.io/). The original parsing of the data was done in [TypeScript](https://www.typescriptlang.org/) using [Cheerio](https://cheerio.js.org/). The [REST API](https://github.com/jcoletaylor/herbly-rails) has been written in [Ruby on Rails](https://rubyonrails.org/) simply because it is very fast to build out straightforward domain models.

## Crawling the data

I have not published the parsing work on github because, frankly, while it was a huge amount of work to do, it also isn't especially interesting code - if you've ever looked at jQuery-style selectors and old-school xpath selectors and tried to build structured data from a website crawl, you have a good idea of what I was up against.

There were about 700+ individual herb pages and 1100+ formula pages. Dr. Penner did a great job of keeping them pretty uniform so there wasn't a lot of variation between pages that I had to contend with, but they weren't identical either, so building in some fuzzy logic to get the best matches and most likely data from the pages was a lot of testing and revising.

If you're interested though, the result of the crawl can be found as structured JSON files [here](https://github.com/jcoletaylor/herbly-rails/tree/main/db/data).

## Next up

In part two of this series, I'll go into a little more detail about the major models and entities in the system, show some samples of the loader logic, and talk about what I hope to see come of the project in terms of its broader utility. In part three I'll cover building the React app, the materialized views composed of tsvector's for doing full-text search, and how those were hooked back into Hasura for the frontend's search features.