export default `
---
title: Part 2 (design)
description: Outlining requirements, defining tasks and deciding a tech stack.
status: COMPLETE
date: 13th Sep, 2023
category: Projects, Web App
theme: sunset
---

## Overview

I had some ideas for what I wanted the app to have, based on personal experience. From there, I needed to do some research to figure what other, similar projects were doing, and why they included those features. In this kind of situation I'd also like to ask potential users for what they want, but I didn't have a good means of surveying users. I could use a public forum or something similar, but the responses likely won't be of high enough quality or quantity.

In researching other apps, I noticed that most focused on meditation. This makes sense for a mobile application, but I intend to create a web application, for which meditation likely isn't as well suited. Most people won't be meditating in front of a computer screen, after all.

Another thing I noticed was a lot of simple, tracking features that aren't necessary associated with mental health, like reminders and alarms. Alarms are less suitable, since the user may not be on their computer when the alarm goes off, but the reminder could be useful - my Apple watch tells me when I've been sitting too long and need to stand up, which would be suitable for a web app (if they miss it because they're away from their computer, they're standing up anyway). Not everyone has access to a smart watch so this could be quite useful. 

Overall then, we have something like this:

1. Users should be able to login, and store their data with an account
2. Users should be able to track:
	- Mood
	- Habits
	- Goals
3. Users should be able to set custom, timed reminders (e.g. stand)

Now these requirements can be picked apart and be fleshed out to get something more formal. I don't want to make them too rigid as I expect that they may need to change, but I want to have enough to code something from.

### Login and accounts

Users should be able to have accounts. This makes the application feel more personalised to them as well as allowing them to track mood, habits and goals. In the vain of being personalised, it would make sense to let the user store their basic details: name, age, location, profile picture etc.  These should be optional however, since they aren't required; we just need a username and password so we can store their information and let them login.

As such, we can expand requirement 1 to:

1. Each user will have a username and password that will be used to login into their account.
	1. Each username should be unique.
	2. Each username and password combination should be unique (i.e. it should not be possible for a single username to be tied to multiple passwords).
	3. Users should be able to change their username and password.
2. Users should be able to optionally store personal information including:
	1. Name;
	2. Age;
	3. Gender;
	4. Location;
	5. Profile picture.

These are the basic requirements, and are unlikely to change. I would like to give the user an option to personalise the look of the app by setting their own background image, but this may or may not work depending on the UI and UX design I opt for, so I'm holding off setting this as a requirement. Ultimately, it will be something I add in at the end if there's time and it's suitable to do so. There may be other similar requirements as I continue working on this.

### Tracking

As aforementioned, the user will be able to track three things: mood, habits and goals. For all of these, the user should be able to see some sort of progression, in the form of a chart, graph or something similar, over a period of time (that can be changed between days, weeks, months etc.). From there, we can specify the requirements of each type separately:

1. Mood tracking. The user should be able to:
	1. Rate their mood, from a scale of 1-10, however often they like, with the system logging the time at which it was rated.
	2. Add an optional message with each rating, giving some context.
2. Habit tracking. The user should be able to:
	1. Create new habits, by specifying a name, description and how often they want to do the habit (e.g. every day).
	2. Change the name and description of existing habits.
	3. Delete existing habits.
	4. View all of their habits in one place.
3. Goal tracking. The user should be able to:
	1. Create new goals, by specifying a name, description and deadline.
	2. Change the name, description and deadline for goals.
	3. Delete goals, with expired goals being moved to an 'expired' section.
	4. View all of their goals in one place.

As we can see, the requirements for goals and habits are quite similar. As such, it makes sense to have these be accessible using the same feature, perhaps just with a setting for whether it's a habit or a goal. Nevertheless, this is a design issue; I just wanted to mention it here.

### Reminders

Reminders will function differently from trackers in that they will trigger at set times, reminding the user to do something. What they are reminded of will be up to them. Thus, the requirements are as such:

1. The user should be able to create new reminders, setting the name, description and frequency - the time of day at which it triggers, and how often.
2. The user should be able to change the name, description and frequency of reminders.
3. The user should be able to delete reminders.

### Usability

It's important to make sure the UI is user-friendly and the service is simple and effective to use. As such, the requirements are as such:

1. Create a front end UI to allow the user to use the service.
	1. Ensure this UI is user-friendly.
	2. Ensure this UI is visually appealing.

### Summary

The requirements outlines thus far don't include everything of course, particularly how they'll be fulfilled. This is intentional, since it leaves that up to my own discretion. If I was working with other people I would make this more concrete, but since it's just me for this project, there's little risk in doing this.

Nevertheless, to summarise, here is the list of requirements (subject to change):
1. Login and accounts:
	1. Each user will have a username and password that will be used to login into their account.
		1. Each username should be unique.
		2. Each username and password combination should be unique (i.e. it should not be possible for a single username to be tied to multiple passwords).
		3. Users should be able to change their username and password.
	2. Users should be able to optionally store personal information including:
		1. Name;
		2. Age;
		3. Gender;
		4. Location;
		5. Profile picture.
2. Tracking:
	1. Mood tracking. The user should be able to:
		1. Rate their mood, from a scale of 1-10, however often they like, with the system logging the time at which it was rated.
		2. Add an optional message with each rating, giving some context.
		3. View how their mood has changed over time.
	2. Habit tracking. The user should be able to:
		1. Create new habits, by specifying a name, description and how often they want to do the habit (e.g. every day).
		2. Change the name and description of existing habits.
		3. Delete existing habits.
		4. View their progress on habits.
	3. Goal tracking. The user should be able to:
		1. Create new goals, by specifying a name, description and deadline.
		2. Change the name, description and deadline for goals.
		3. Delete goals, with expired goals being moved to an 'expired' section.
		4. View their progress on goals.
3. Reminders:
	1. The user should be able to create new reminders, setting the name, description and frequency - the time of day at which it triggers, and how often.
	2. The user should be able to change the name, description and frequency of reminders.
	3. The user should be able to delete reminders.
4. Create a UI to allow the user to use the service.
	1. Ensure this UI is user-friendly.
	2. Ensure this UI is visually appealing.
## Tasks

Now that we have a list of requirements, we can be more concrete about what tasks actually need to be completed to meet the requirements. We'll map each requirement to its required tasks; when those tasks are complete that requirement should be fulfilled. This will ensure every task we do has some purpose that aligns with the requirements. It's also important to define a hierarchy or dependencies between the tasks, so we know which ones need to be completed first.

In some cases, it can be good to decompose tasks as much as possible for this process. This makes it clearer why a task is fulfilling a certain requirement. I prefer to simply write a short description of why this is the case for each requirement instead, so that's what I will be doing.

To start with, I've created a list of tasks that can be executed, that map to the requirements:

![tasks](maio/tasks.svg)

I have deliberately left out unit testing; I will absolutely be doing this, but I will be doing it individually for every component as they are completed, throughout the project, so it doesn't make sense for it to be its own tasks.

Next, we can outline the dependency graph. This will be useful for deciding the order of tasks:

![dependency graph](maio/dependency-graph.svg)

The implement design task has no dependencies, so we can do that at any time. The rest have a fairly clear order of tasks, with integration testing necessarily needing to be done last.

And finally, I've made a Gantt chart for the tasks:

![schedule](maio/schedule.svg)

There's no parallelisation here, since it'll be just me working on this. It's important to note that I won't be working on this in a waterfall manner; I will be going back and forth as necessary. This is, as aforementioned, just to give an order to tasks and give a general idea of how long each task should take. There's no time units, because there are no deadlines; the durations are just relative.

## Tech stack

Since this is a web app, it needs a front-end. I expect to use my usual tech stack of React, TypeScript and Tailwind for this. The user should be able to login, and data needs to be stored, so some sort of backend will be required. I have experience building APIs in Python using Flask, so it makes sense to opt for that here. To store the data, any SQL-based database library is suitable, since I'm comfortable with SQL. I usually opt for SQLite if I can, since it's the simplest and has the least overhead, and I have opted for it here since those qualities are important. This requirement also includes authentication, which I do not have experience in.

After a little research, I came to understand that authentication seems to be fairly simple and is something that can be handled in the backend, the same way other requests are handled. It's important however that the user has some key or token that specifies that they're able to access a page. For this purpose, Flask has a Flask-Login package that seems to be suitable, so that will be my go-to.

## Conclusion

To summarise, this post has gone over the requirements and outlined the tasks needed to complete those requirements. By the time of the next post, I will have completed some of the tasks highlighted here, and will be going over them. Thank you for reading!
`;