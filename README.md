# Bookblog

A set of tools to generate a blog. About books!

## Generating the site

`gulp build` places a complete static version of the site in the `build` folder.

## Making posts

`gulp draft <title>` will make a post in the `posts` folder with `draft` set to true.

`gulp post <title>` will make a post in the `posts` folder or remove the `draft` setting from a post.

## Running a server

`gulp server` will start a server that serves the `build` folder.
