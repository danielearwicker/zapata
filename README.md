# zapata

Extremely minimal static site generator: handlebars + markdown + frontmatter

# Installation

```
npm install -g zapata
```

# Usage

To create yourself a simple starting point, create a new directory, change to it and then run `zapata create`:

```
mkdir mysite

cd mysite

zapata create
```

You write posts (articles, pages) as markdown `.md` files in the `posts` directory. A single `template.html` file (in Handlebars format) is used to convert each post into an HTML page.

To generate the site as plain HTML:

```
zapata generate
```

This creates (or replaces) a sub-directory called `generated`. Everything is copied into `generated` (apart from the raw `template.html` and `posts`), so you can include images and `.css` resources and other pages required by your template.

Posts are converted to `.html` files at the root level.

The generated `index.html` file is just a redirector that switches to the latest post.

# Structure of a post

A post must start with a frontmatter section, which is a YAML object inside `---` lines:

```
---
title: The introductory page of this site
posted: 2019-12-14
author: Octavia Optimism
---
```

The `title` and `posted` properties are mandatory. Posts are sorted by the `posted` data (most recent first).

Any other properties you define are exposed to the template as an object called `data`.

# License

MIT
