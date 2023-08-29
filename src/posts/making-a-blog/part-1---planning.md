export default `
---
title: Part 1 - Planning
date: 23rd August, 2023
description: Designing the structure of the blog, creating wireframes for pages and such.
status: COMPLETE
category: Projects
---
Making a blog has always been fairly high on my list prospective projects I'd like to take a stab at some day, but always seemed a little too daunting. At the time of writing, I've just graduated, so I've been focusing on personal projects to build a portfolio that will hopefully show off what I'm proficient in to employers. So, after finishing my personal website, I turned to this as the next project to work on.

There's lots of resources out there to make blogs, like Jekyll. I didn't want to use any of those though, because I figured this would be a good opportunity to grow my skills as a web developer and learn things along the way. I'm glad I took that route because, difficult and long as it was, I'm really proud of how it turned out, and I learnt a lot on the way.

## Motivation

First things first, what's a blog for? In my case, I wanted to have it be a space to talk a bit more about some of the projects I've worked on. There's only so much you can get on a CV, and I wanted to be a bit more humble; regardless of how you feel, it's always in your best interest to focus on the good when writing a CV, so this blog is a space where I can talk about the not so good, which I think is just as valuable to discuss.

In terms of growing my skills as a web developer, there are some new requirements in a blog I haven't dealt with before: particularly, content management. I knew I'd inevitably encounter this in the future, and this felt like an opportunity to get some practical experience in managing content, whilst still being fairly approachable.

## Design

Before writing any code, there are some structual decisions one needs to make: how blog posts will be written, stored and such; the structure of the application overall (pages, wireframes and such).

### Content management

I did some research online, and it seemed like markdown files were the way to go. They're lightweight, portable and still fairly expressive - they allow for headings, lists and most other things you'd want in a blog other than plain text. Ultimately, whatever you write in whatever file format you choose is going to get converted to markup (HTML headers, paragraphs and such) anyway, so it's important to choose a format that's compatible. In this regard, .docx or .pages files aren't going to play nice, which is a shame since there are great editors for those file types. Simply writing the content of the blog in your favourite text editor and copying it over to a markdown file is a valid approach however; even if you write directly into the markdown file you'll need to spell-check it anyway, and spell-checkers for markdown aren't great. You could write a script to do this for you, but it's hard to get a copy-and-paste wrong, so this is probably more effort than it's worth.

### Structure

A blog should be simple, as it's purpose is very simple. Whenever I design an application, I find it useful to think about what the website actually needs to do. In this particular case, we can boil it down to:

1. Show all the blog posts, with some way of opening them
2. Show whichever blog post is active

And thus we have two pages. Combining them into one is also a valid approach (indeed there are plenty of blogs out there that do this), but we should have no more than 2, because the third page will inevitably have some overlap with the first two.

The second page is less interesting, as most of the space will be taken up by whatever markdown file is being displayed. With the first page I could be a bit more creative and decide how I personally wanted it to look. I ended going with a fairly simple wireframe, with the posts cascading down the page one after the other. Most other blogs out there do this, and having them in a horizontal scrolling container just didn't feel right. So, that's essentially it: with a somewhat decent idea of what I was doing, I got started.

I could have been much more thorough here: designing tests, taking user feedback from willing volunteers and such. I didn't, because this is a personal project. Whilst it is important that I complete this to the highest quality, a lot of quality control mechanisms would be overkill for such a simple project, and I think having some projects that aren't work related that you can simply enjoy working on are important. Ultimately, if things go wrong, there's probably a lesson to be learned along the way, and the only harm done is to my time, of which at the time I had plenty.

## Tech stack

Before building anything, one has to consider what they'll build it with. In web development, there's a plethora of attractive options, with a lot of overlap. This can make choosing the *right* tech stack difficult, but in reality most tools are powerful enough to do just about anything in their domain with enough expertise, so it's usually a matter of preference. In this instance, I went with:

1. TypeScript - Everyone that's used TypeScript will tell you they can't go back to vanilla JavaScript, and I will tell you the very same. Types are so valuable in a myriad of ways: catching errors, improving readability, quality control, and more. At the time of writing, I see no reason not to use TypeScript for any project in the future.
2. React - This is the first component-based framework I learned, and has been able to do all the things I've wanted to do. I am planning to explore the alternatives in the future (Angular, Svelte etc.) but for now, React is the library I'm most comfortable with so I went with it.
    * Framer Motion - It's worth mentioning this library, which is an animation library for React. Animations, in my opinion, make a huge different to the look and feel of a website, and Framer Motion provides the utility for that. There are lots of animation libraries out there for React, and whilst Framer Motion has short-comings, it's lightweight and easy to use. A simple blog should have simple animations, and I already knew Framer Motion, so I chose to use it.
3. Tailwind - Just like TypeScript, I don't think I'll ever go back to vanilla CSS if I have the choice. It's faster, cleaner and so much more idiomatic. Once you get comfortable with it, it just feels like second nature. Even if you do require CSS for whatever reason, you can always implement CSS classes just like normal.
4. Vite - Vite is a build tool. Build tools basically help you bootstrap your project, packaging all of your tools together, and take care of the transition from development to live build. Create-react-app is the most common build tool you'll find for React, and is an obvious first choice since it's built into React. Lightweight as it is, it comes with a lot of unnecessary boilerplate, and it becomes tedious removing all of it every time you start a project. Vite is built with many popular tools like TypeScript and Tailwind in mind, without all of the boilerplate.


`;