To run in CLoud 9 - SHELL: gatsby develop -p $PORT -H $IP

TODO:
  <Done!> ~ Put the Content on the Post.
  <Done!> ~ Default image size 1200x660
  <> ~ Published and LastUpdated
  <> ~ Header
  <Ongoing> ~ Footer
              - Create the logos, get the path from svg
              - Add link
              ~ Process of creating the path. inkscape > create shapes on 1 layer > select all shapes > path > differentiate
              ~ Added condition if footer then scale to 2.5 because SVG is too small. Try to find a fix for this
  <> ~ Add a category: Advertisement, Blog, Article? Opinion, News?
              Change the Content Model name from Blog to Post
              Blog — November 25, 2019
              November 25, 2019 — 3 minute read (Doesn't look good)
  <> ~ 

BUG:
  <Done!> ~ Pagination on Tags not working. ~ Removed / on end
  <Done!> ~ Creating next page for tag when it is only sufficient for page 1 ~ Don't make pages 1
  <Done!> ~ Tags on Page is Camel Case, should be Pascal Case ~ Tags are as it is
  <Done?> ~ Tags Pagination not working together - Because #Philippines has 4 pages, causing everyone to imitate
              Removed pagination for now.


 # Hello Friend

![Hello Friend](https://github.com/panr/hugo-theme-hello-friend/blob/master/images/screenshot.png?raw=true)

This starter was made to help you present your ideas easier. We all know how hard is to start something on the web, especially these days. You need to prepare a bunch of stuff, configure them and when that’s done — create the content.

This starter is pretty basic and covers all of the essentials. All you have to do is start typing!

### DEMO - https://gatsby-hello-friend.now.sh/

## Features

- **dark/light mode**, depending on your preferences (dark is default, but you can change it)
- great reading experience thanks to [**Inter UI font**](https://rsms.me/inter/), made by [Rasmus Andersson](https://rsms.me/about/)
- nice code highlighting thanks to [**PrismJS**](https://prismjs.com)
- responsive youtube/vimeo etc. videos [gatsby-remark-embed-video](https://github.com/borgfriend/gatsby-remark-embed-video)
- fully responsive site

#### Code highlighting

By default the theme is using PrismJS to color your code syntax. All you need to do is to wrap you code like this:

<pre>
```html
  // your code here
```
</pre>

**Supported languages**: bash/shell, css, clike, javascript, apacheconf, actionscript, applescript, c, csharp, cpp, coffeescript, ruby, csp, css-extras, diff, django, docker, elixir, elm, markup-templating, erlang, fsharp, flow, git, go, graphql, less, handlebars, haskell, http, java, json, kotlin, latex, markdown, makefile, objectivec, ocaml, perl, php, php-extras, r, sql, processing, scss, python, jsx, typescript, toml, reason, textile, rust, sass, stylus, scheme, pug, swift, yaml, haml, twig, tsx, vim, visual-basic, wasm.

## How to start

First you need to clone this repo by `git clone https://github.com/panr/gatsby-starter-hello-friend.git` then switch to main dir, probably `cd gatsby-starter-hello-friend` should work fine. Next you should install all dependencies by `yarn` and then, to run starter on localhost `yarn dev` (which is `gatsby clean && gatsby develop`). If you want to build starter just run `yarn build` (which is `gatsby build`).

## How it works

It's a simple starter for blogs and personal sites. You have `posts` and `pages` directories. Posts are generated from markdown files with required fileds: `title`, `date` and `path`. Pages can be generated from markdown files as well (with built-in navigation between them, just like in posts) but you can also generate them from JavaScript files (just like you normally do in Gatsby). If so, you should wrap your content in `Layout` component. It's not required, but highly recommended.

#### Configuration

You can configure starter in `gatsby-config.js`. Here's what you can change:

```
title: String,
description: String,
copyrights: String,
author: String,
logo: Shape { // you can place your own logo
  src: String, // default dir is `/static/`
  alt: String,
},
logoText: String, // change default Hello Friend logo
defaultTheme: String, // light or dark as default
postsPerPage: Number, // pagination
showMenuItems: Number, // number of visible main menu items
menuMoreText: String, // string of main sub menu trigger (not visible items from main menu)
mainMenu: arrayOf(Shape { // main menu items
  title: String,
  path: String,
})
```

## How to contribute

If you spot any bugs, please use [Issue Tracker](https://github.com/panr/gatsby-starter-hello-friend/issues) or if you want to add a new feature directly please create a new [Pull Request](https://github.com/panr/gatsby-starter-hello-friend/pulls).

## Licence

Copyright © 2019 Radosław Kozieł ([@panr](https://radoslawkoziel.pl))

The starter is released under the MIT License. Check the [original theme license](https://github.com/panr/gatsby-starter-hello-friend.git/blob/master/LICENSE.md) for additional licensing information.
