export default `
---
title: Part 1 (planning)
description: The process I went through before writing any code or starting development for this blog.
status: COMPLETE
date: 5th Sep, 2023
category: Projects
---
Making a blog has always been fairly high on my list prospective projects I'd like to take a stab at some day, but always seemed a little too daunting. At the time of writing, I've just graduated, so I've been focusing on personal projects to build a portfolio that will hopefully show off what I'm proficient in to employers. So, after finishing my personal website, I turned to this as the next project to work on.

There's lots of resources out there to make blogs, like Jekyll. I didn't want to use any of those though, because I figured this would be a good opportunity to grow my skills as a web developer and learn things along the way. I'm glad I took that route because, difficult and long as it was, I'm really proud of how it turned out, and I learnt a lot on the way.

This post is a discussion of what I think you need to consider before writing any code or blog posts, and how I think this sort of thing should be approached.

## Motivation

First things first, what's a blog for? In my case, I wanted to have it be a space to talk a bit more about some of the projects I've worked on. There's only so much you can get on a CV, and I wanted to be able to give the full picture.

In terms of growing my skills as a web developer, there are some new requirements in a blog I haven't dealt with before: particularly, content management. I knew I'd inevitably encounter this in the future, and this felt like an opportunity to get some practical experience in managing content, whilst still being fairly approachable.

## Overview

A blog has two parts: 
1. CMS - short for content management system, this is how the blogs you write get turned into blog posts on a website.
2. Web application - the platform itself that hosts the blogs, which in this case is a web application, and is what the user will use to see the blog posts.

### CMS

An effective content management system should make the process of creating a blog post as easy and seamless as possible. The best we can hope to do is essentially make a system where the blog just needs to be written into some file, and the CMS should take care of the rest. This also makes the whole system overall less prone to error.

The first thing we have to decide on is how to write the blog posts. The choice here is pretty simple - markdown files. They're the most lightweight and portable option. Being lightweight is important, because all of the styles that you may want to use need to be translated to HTML, so having a simple set of rules for styling (like in markdown files) is important. Portability is always an important concern to take into account, to ensure it works as seamlessly as possible with other libraries and frameworks.

Personally, I'm a big fan of [Obsidian](https://obsidian.md/), but there are lots of great markdown editors out there. At the bare minimum you need spell checking, but Obsidian is a lot more powerful than that, whilst not being overbearing, which is why I like to use it.

### Web application

A good design and implementation for a web application is equally important to support the user experience of reading blog posts as best as possible. This means having a sensible UI and writing scalable and clean code.

Naturally, choosing the right tools, from the plethora available, is important to make sure we meet those criteria. Fortunately, while there are a lot of choices, it's hard to go wrong here. JavaScript generally has the most support, and performance isn't really a consideration since the application is intended to be quite simple, so that's what I went with.

With that said, if you do choose to use JavaScript, I cannot recommend TypeScript enough. It is difficult to learn at first, but it will catch and save you on a daily basis from errors that could take hours to find and fix otherwise. Similarly with other frameworks in languages such as Python, which are not strongly typed (entirely; Python does enforce strong typing at runtime), it's important to make proper use of types to avoid errors that will cost you lots of time.

Version control is an important note to mention, but is the simplest; you should use Git. Whether you use GitHub is up to you, but you should remotely host your project to ensure it isn't all lost if something happens to the one machine it's stored on, and have backups in case something goes wrong.
## Wrapping up

That's it for planning. There's a lot to take into consideration, much more than I have gone over here, but hopefully this serves as a good overview. In the next part, I'll talk about UI and UX design, and some of the difficulties I had when finding the right design for this project.
`;