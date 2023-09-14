export default `
---
title: Part 1 (getting started)
description: Scoping the project, deciding the tech stack and outlining some basic requirements.
status: COMPLETE
date: 9th Sep, 2023
category: Projects
theme: sunset
---

## Motivation

Every year, mental health problems seem to become more commonplace among more people. There's a great post by the World Health Organisation (WHO) that talks about the numbers [here](https://www.who.int/health-topics/mental-health#tab=tab_1). I think that one of the things that makes mental health so difficult to deal with is that a lot of the healing necessary has to come from yourself, rather than some external remedy. It's hard enough dealing with those problems as it is, and so trying to solve this is more energy that a lot of people just don't have.

Years of study by professionals has shown however that there are plenty of things we can do that don't take much effort and have a substantial impact on wellbeing. This includes, journalling, meditation, tracking habits and much more. A lot of this can seem daunting though, and so I wanted to try and create a space where all of this was available in one place. A single, central positive space you could come back to that had everything you needed.

I also have a lot of intrinsic motivation for this project as well. I aim to make it my first complete personal project, and have it be the primary project I can show off to anyone interested. Mental health is an important topic to me personally, and I hope that doing this project helps me learn much more about it.

## What will it do exactly?

I had some ideas for what I wanted the app to have, based on personal experience. From there, I needed to do some research to figure what other, similar projects were doing, and why they included those features. In this kind of situation I'd also like to ask potential users for what they want, but I didn't have a good means of surveying users. I could use a public forum or something similar, but the responses likely won't be of high enough quality or quantity.

In researching other apps, I noticed that most focused on meditation. This makes sense for a mobile application, but I intend to create a web application, for which meditation likely isn't as well suited. Most people won't be meditating in front of a computer screen, after all.

Another thing I noticed was a lot of simple, tracking features that aren't necessary associated with mental health, like reminders and alarms. Alarms are less suitable, since the user may not be on their computer when the alarm goes off, but the reminder could be useful - my Apple watch tells me when I've been sitting too long and need to stand up, which would be suitable for a web app (if they miss it because they're away from their computer, they're standing up anyway). Not everyone has access to a smart watch so this could be quite useful. 

With all that said, here's a simple set of requirements:

1. Users should be able to login, and store their data with an account
2. Users should be able to track:
	- Mood
	- Habits
	- Goals
3. Users should be able to set custom, timed reminders (e.g. stand)

This is not formal of course, since the scale of the project doesn't demand it, and these are subject to change. In the next post, where I will go over the design, I will go into more detail on each point, but for now they should act as a guideline.

## Tech stack

Since this is a web app, it needs a front-end. I expect to use my usual tech stack of React, TypeScript and Tailwind for this. The user should be able to login, and data needs to be stored, so some sort of backend will be required. I have experience building APIs in Python using Flask, so it makes sense to opt for that here. To store the data, any SQL-based database library is suitable, since I'm comfortable with SQL. I usually opt for SQLite if I can, since it's the simplest and has the least overhead, and I have opted for it here since those qualities are important. This requirement also includes authentication, which I do not have experience in.

After a little research, I came to understand that authentication seems to be fairly simple and something that can be handled in the backend, the same way other requests are handled. It's key however that the user has some key or token that specifies that they're able to access a page. For this purpose, Flask has a Flask-Login package that seems to be suitable, so that will be my go-to.

## What's next?

The next thing to do is design the project. This does not just mean the UI; it means diving deeper into the requirements, fleshing them out, and, of course, getting a better sense of what they look like in a visualisation of the UI, using a wireframe. I'll also outline some of the testing ahead of time, so that I know what standards to meet.

After that, I'll start coding, and talk about it during a subsequent blog post, before finally capping off with a final post about the whole project overall. Thank you for reading!


`;