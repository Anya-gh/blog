export default `
---
title: Part 2 (UI and UX design)
description: How I designed the UI and UX for this web application, and all the things I learned regarding UI and UX design.
status: COMPLETE
date: 6th Sep, 2023
category: Projects
---

Doing proper UI and UX design is really important, but I didn't know how much so before I started working on this project. Until working on this, I had been arbitrarily running through different designs in my head until I landed on one I liked, and then tried to code it. As with most things it's hard to tell when something is a bad idea if it keeps working, as my method had been, so in some ways the time and energy I spent revising designs on this project is something I'm grateful for, because I know the experience will aid me in the future. On the other hand, you should do your best to ensure this isn't how the process goes, so I'm documenting it here.

I've split the post up into two parts (both on this page), which are essentially my two attempts at designing the website.

## Initial attempt

I knew I wanted the design to be simple, since it was just a blog. I decided on two pages: a home page and a separate page for whichever post the user was viewing. Then, the first page would have a list of all the posts, and the second page would just show the content in whatever markdown file stored the post the user was viewing.

With that in mind, I got started. Since I was trying to code the design from scratch, there was a bunch of non-design code I had to write, like the logic to pull out all the posts and render them as a list on the home page, so it was a long while before the website had the look and feel that I had imagined.

Naturally, it didn't look right, on either page. I figured it was a lack of content; the design was too dull and there wasn't enough on the screen. I wanted to just add more to each page, but there wasn't really anything to add; it was just a blog, not a site promoting a product, so it didn't need a bunch of pages and sections.

I kept trying whatever I could think of, until I gave up and tried something else. I didn't know what was wrong, so I asked a friend with a good amount of UI and UX experience, who told me to look at some UI and UX theory.

I was skeptical, because I imagined getting UI and UX design right was more about practice and sense than theory, but I gave it a go.

## The theory behind making a good design

### A systematic approach

I wanted to find a consistent approach to designs that worked for me, so I felt less aimless when deciding on a design. I narrowed it down to a few key steps:

1. User flow - a map of how the user will move through the application. Thinking about how a user will use your web application will let you cut unnecessary parts, and make the purpose of each part more clear.
2. Sitemap - all of the different pages, and how they're connected. This should be based on the user flow. This goes without saying; you should know how many pages there will be and what they'll do before you write any code.
3. Research - have a look at how others have approached the same, or similar, problems.
4. Wireframe - a mock of the UI; the 'design' part. Wireframes are sketches or mocks of what the UI should look like, and you can make them however you like; I like Figma, but you can use pen and paper if you want to. The advantage of doing this *before* any coding should be obvious; you can change it if you don't like it very easily, and you can make wireframes much faster than if you try to code the design straightaway. These can be detailed as you like, but I'd recommend making them as detailed as possible. The less details you leave out, the more chances that it won't turn out the way you thought it would. 

Whenever the topic of processes or methodologies come up, especially for smaller projects, I'm always perverse to the idea because I often find it to be a waste of time. Whilst I do think it's important to think about what you're going to do before you do it, creating documents that you never refer to again isn't worthwhile. I like this approach however, because most of the time these documents can be made quickly (as fast as a few minutes), and when you get to coding, you can focus on just translating your design rather than trying to both figure out a design and code it.

### Guidelines

Another important thing I picked up was a few guidelines to follow. If something's off, you can usually point to one of these as the culprit:

1. Visual hierarchy - important things come first.
2. Contrast - distinguish elements; more important elements should have more contrast.
3. Balance - give elements breathing room, but make sure to use the space available to the fullest.
4. Consistency - make it feel coherent.
5. Simplicity - keeping the designs as simple as possible so the content is the focus.
6. Feedback - give the user something to do.

Whilst guidelines can be useful to see why something's wrong, they usually won't tell you how to fix it. Making a striking and interesting design ultimately requires experience and creativity.

## Second attempt

### User flow and Sitemap

Luckily, the user flow for this project was very simple: the user finds the post that they want to read, and then they read it. As such, the sitemap I already had was ok, since it neatly distributed those two parts into two pages.

### Home page

Before starting again, the first thing I tried to do was review and understand what was wrong with the previous design. More than anything, I felt the design was dull. It was very monotone, and was why I thought of padding the page with more stuff, even if it wasn't necessary; this just ended up distracting from the main content, which was the list of blog posts. I knew I needed to bring more attention to the list of posts and make that part of the design more interesting, but I wasn't sure of what to do.

To see how I might address this, I went to look at other examples. One that I really liked was on Rafael Caferati's [portfolio](https://caferati.me/portfolio/). It's very simple, and the background has the same grayscale style I was using. Attention is brought to the most important parts of the page, the projects, by using a simple image that describes what the project is about. This works great because it breaks away from the monotonicity of the page, and is the only part of the page that does. The images also make sense, since they help give each project context much faster than reading a description.

I figured a similar idea could work for my application, so I began making a wireframe, in [Figma](https://www.figma.com/). The only major change I made from before was setting the background of each list item to a unique image for that post, and I was already much happier with it. 

### Blog page

As for the blog page, due to the limited elements I figured that more negative space made sense. I saw a lot of blogs centred the content, with empty space on the left and right. As for the menu, I had an idea to make the title of the blog post sync with the list of posts on the homepage, by using the same background image it was using there. Again, this breaks away from the monotonicity, and whilst it isn't the only important thing on the page, it is a central point of reference and so it makes sense to bring attention to it, especially at first. Since there weren't many icons, they fit nicely into the banner.

### Review

I took a step back and looked at it holistically, and I was much happier with it. I might experiment and find a design I like more in the future, but it is at least something I'm proud of presenting. Looking at the guidelines, I think everything is met, and more over I'm happy with how it looks.

## Closing thoughts

I still believe that UI and UX design, and design in general, is mostly a matter of experience and having a sense for what's right and what isn't. However, that doesn't mean we shouldn't do what we can to make that process easier and more consistent. I'm grateful to have had had the problems I had this project, because they were important stepping stones in becoming a better web developer, and hopefully a better software engineer in general.
`;