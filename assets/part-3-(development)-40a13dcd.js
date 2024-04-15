const e=`
---
title: Part 3 (development)
description: The development process for making this blog.
status: COMPLETE
date: 7th Sep, 2023
category: Projects, Web App
---

Just like with UI, I got to do a lot of new things on the development side, mainly centred around content management. I'll go through the key steps I went through in making this blog, from bootstrapping to deployment. 

## Choosing a tech stack

As I mentioned in the first part, it's hard to go wrong here. I think in general however, it's best practice to pick the simplest tools that suffice, since they'll make development easier. In my case, I like to default to the following tech stack:

- [React](https://react.dev/) - JavaScript framework;
- [Tailwind](https://tailwindcss.com/) - CSS framework;
- [TypeScript](https://www.typescriptlang.org/) - adds type checking to JavaScript;
- [Framer Motion](https://www.framer.com/motion/) - JavaScript animation library.

Of course, any of these can be swapped out with a suitable alternative, if you're more comfortable with something else, excluding TypeScript, which I think is a must for any JavaScript project. These are the ones I'm most comfortable with and like using, which is why I chose them.

Environments are important to make sure all the packages, libraries etc. that you use are in one place and are easy to manage. They also help with deployment. I like using [npm](https://www.npmjs.com/), since most packages are available through it, but [yarn](https://yarnpkg.com/) is good too.

Finally, a build tool. These help initially flesh out your project directory, and save you needing to write boilerplate code and get straight to developing. A lot of people still use the \`create-react-app\` command that comes with React, but I much prefer Vite. It has an option for TypeScript so you don't need to set it up yourself, and it's very simple to install Tailwind with it. 

## Routing

The first thing I like to do is set up the different routes for my application. This project came with a new challenge however: dynamic routes.

Typically, you'll know before hand what the segment names (e.g. \`/home\`, \`/contact\` etc.) will be, and so you hardcode the routes into the top-end component. I could have done that, by passing the data from \`/home\` after they'd clicked on a post to \`/blog\`, but this would have meant direct routing wouldn't be possible (i.e. the user would not be able to go to a post by entering an address through the address bar). Therefore, this is generally something that should be avoided if possible.

Instead, I needed to search through all the posts, pull out their title and create a new route using that as the address.

## Storing blog post metadata

We then need to consider where to get this data from. We could just read the file name or something similar, but I knew that I would need this data again when rendering out the list for the home page, and that I would need more than just the title. Therefore, I decided to create a \`JSON\` file to store this data.

The next issue was keeping this up to date. I didn't want to manually update this by hand every time I made a new post, and it was a bad idea anyway; this just lends itself to mismatches in data. I wanted to have this file automatically update whenever a new blog post was made, or a change was made to an existing post.

To do this, the data still needed to be somewhere so that the file could fetch it. For this, I used front matter, which you can declare in a markdown file between two triple dashes like so:

\`\`\`
---
title: Post 1
---
\`\`\`


This is especially convenient since the data can all be stored in one place, which reduces the chance of a mismatch. Of course, errors will still be possible this way, but they should be easier to find.

Finally, I needed to write a script to keep the \`JSON\` file up to date. For this I created a \`node\` script, since I was already using TypeScript. I also made the script detect when an important key from the front matter was missing (e.g. \`title\`). I used the \`fs\` utility built-in to JavaScript to find files and directories, and [chokidar](https://github.com/paulmillr/chokidar) to watch the directory with the posts for changes, after which the script would be run.

## Rendering markdown content

Unfortunately, JavaScript isn't natively able to deal with markdown files. Instead, it just sees the content inside as plain text, and doesn't understand markdown syntax.

On the other hand, there are plenty of libraries available that can parse markdown content. After quick Google search, I went with [react-markdown](https://github.com/remarkjs/react-markdown). This library lets you style the syntax however you want, which is what I was after.

This turned out to be something of a pain point however. The way react-markdown works is by rendering certain components by default (e.g. \`# Heading\` is rendered as \`<h1>Heading</h1>\`) and letting you override them by targeting the component (e.g. if we want to change how \`# Heading\` is rendered, we would override the \`h1\` component). You specify a function that renders out what you want instead. The issue is in the props; there's nothing to say what type they should be.

Fortunately, there is a neat trick you can use instead. If you just set the type for the props to something arbitrary, and proceed as normal (so in this case try to return something like \`<p>{props}</p>\`), ESLint (a linter for TypeScript) will tell you what the proper type should be. Upon doing this, you'll see that it expects the type \`React.ReactNode\`. The only exception for me was anchor tags, for which I needed the additional \`href\` property in the type. 


## Building the UI

The rest was simply building the UI from the wireframe I made in Figma. I also used it to make all the icons I needed for the page. This was all fairly simple, since nothing here was particularly new to me. 

## Closing thoughts

Coding for this project was really rewarding. It's not always the case that you get to do something completely new, and seeing it work is a great feeling. After you get comfortable working on a certain kind of requirements, seeing it work becomes more of an expectation than a goal. This is why I find it so important to continue to try new things, even if you don't need that thing immediately; it keeps what can otherwise become a very monotonous task fresh and enjoyable.
`;export{e as default};
