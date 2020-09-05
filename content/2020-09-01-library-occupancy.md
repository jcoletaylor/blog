---
date: 2020-09-01
title: "UF Library Occupancy"
cover: "https://unsplash.it/400/300/?random?Library"
categories: 
    - Tech
slug: "uf-library-occupancy"
tags:
    - nodejs
    - react
---

### Little Contribution of Code

Over last weekend I had a chance to write a little code to help out the UF Libraries - The following is the README for it. The code is hosted on GitHub  [here](https://github.com/jcoletaylor/library-occupancy) and live on UF's website [here](http://www.uflib.ufl.edu/status/)

### Library Occupancy Counters

Library Occupancy Counters, specific for the [University of Florida Libraries](http://www.uflib.ufl.edu) but the underlying logic would work for any site supporting the [Store Traffic TMAS](https://storetraffic.com/tmas-people-counting-software) API.

### People Counting

Store Traffic powers the people counting solution for the University of Florida Libraries, particularly as the UF Libraries attempt to keep students, faculty, and staff safe with occupancy limits necessitated by COVID-19.

### Caching on the Backend

This project polls the TMAS API every five minutes, getting occupancy dashboard metrics, per configured location. These XML API results are parsed into JSON and stored in AWS S3 at predictive paths. The AWS S3 bucket is open to public-read and any CORS GET request, so any frontend can interact with it without authentication or configuration. The NodeJS/Express app that manages this is served on [Heroku](https://www.heroku.com). There is a sample [static site](https://library-occupancy.herokuapp.com/static/) and a [React site](https://library-occupancy.herokuapp.com/react/). Note that the Heroku site should not be publicly linked to directly, it is meant as an example of the running site deployed - the Heroku instance size is moderate, just enough to handle the background polling-parsing and uploading to S3.

### Displaying on the Frontend

The frontend display [provided with this project](https://library-occupancy.herokuapp.com/static/) is not at all the only way to display this data. However, it does provide a workable model of how to use [Bulma](http://bulma.io)-styled card components to display an SVG circular capacity indicator. The frontend can be loaded as flat HTML/CSS/JS files to any site. They manage fetching the S3 bucket data per configured location. The primary page shows the status of all configured facilities, but the `sites` folder has stub pages for each facility to be displayed individually, without headers and footers, so that they can be embedded in iFrames on any page without breaking the rest of the page styling.

The public folder is the easiest way to deploy this, though there is also a [React Frontend](https://library-occupancy.herokuapp.com/react/) that implements a slightly more programmatically robust way of building similar functionality.
