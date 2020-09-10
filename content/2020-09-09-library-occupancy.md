---
date: 2020-05-11
title: "UF Library Occupancy"
cover: "images/library-widgets.png"
categories: 
    - Code
slug: "library-occupancy"
tags:
    - node
    - react
    - javascript
    - UF
    - open-source
---

## Unexpected Opportunity

A couple weekends ago I had an unexpected opportunity. The people counters for the UF libraries were not working as had been expected. No one specifically to blame really, there was just a mismatch of expectations about how an API was supposed to work and what the SLA was meant to be. No big deal except that the UF Libraries had part of their COVID-19 reopening plans built around the idea that they would know how many non-staff occupants were in any given library facility at a time. If the counters were down, then there was no way for anyone to be clear how many people were in any given facility at a time, which is obviously a problem when trying to pay attention to social distancing precautions.

The crux of the issue really was that the person counter vendor's API was meant to be consumed and cached for use across multiple devices, not to be exposed to a serious number of real-time queries. So a lot of queries ended up triggering a throttle and then a shutdown of the associated API keys. An honest misunderstanding on both sides, but it put the libraries in a bit of a bind, because no one was in on a Saturday and Sunday to set up a different solution.

So, I got a chance to write something fun!

## Widgets and Caching

In effect I wrote a small [application](https://github.com/jcoletaylor/library-occupancy) that polls the vendor's people counter API once a minute for every configured location, and caches the most recent result in an AWS S3 bucket.

On the frontend (I built a vanilla JS and a React variant, available in the codebase) I built small UI widgets that have an SVG capacity indicator which is able to update itself according to the facility's most recent occupancy metrics based on what is cached in the S3 bucket. It's not terribly complicated, but it was absurdly fun to write.

## Loving Bulma

I also have found myself again just completely taken with how great the [Bulma](https://bulma.io) framework is. It makes building reasonable dashboard layouts absurdly easy. As someone who's been building applications on the web since before even Bootstrap and jQuery existed, it is still sometimes surprising to me how great contemporary CSS flexbox frameworks really are.

## React, Again

The first variation, and the one that [has been deployed](http://www.uflib.ufl.edu/status) is just a vanilla JS version that updates itself with DOM query selectors, as it polls. It seemed like the most straightforward way to make available the functionality without needing to have anything extra included. However, I ended up deciding to rebuild the frontend as an exercise in getting familiar with React Hooks, and I have to say, it's a very clean experience to manage state that way. Much more straightforward than prop drilling or Redux.

## Open Source

Most of the code I write for [Fracture](https://fractureme.com) is closed source, and that's okay, we have IP that makes sense to keep in-house. But it felt really good to be able to write this and release it GPLv3 - it's unlikely a lot of folks would need this particular solution, but it feels good to write something that helps people and that I can make available to others if they could find a use for it.