export default `
---
title: Music Humanisation
date: 17th Aug, 2023
description: A system to produce human sounding music, given a score and some instructions on how to play it (e.g. fast, slow, vibrant), using a neural network.
category: Projects, Machine Learning
status: COMPLETE
theme: piano
---

Given a score of music in some digital format, playing back a piece is trivial for computers. However, they struggle to induce the same tempo (changes in timing) and dynamics (changes in force or volume) that a human naturally exhibits. This causes playback from computers to sound robotic. In addition, scores usually include instructions from the composer as to how the performance of the piece should be played; these are often in Latin, and can have a dramatic effect on how the piece sounds overall. Computers fail to take this into account, and thus are incomparable to human players. A music humanisation system aims to solve this problem, by playing back a piece the way a human would with the capability to take instructions into account.

This project was a group project I completed in my 4th year with other university students on my course. In this post, I’ll go over my experience working on it and what I learned in the process, after a brief overview, rather than getting into the finer details. For that you should read my full report, which you can find [here](src/assets/documents/cs407.pdf).

## Why music humanisation?

There are plenty of music generation models out there, and they generally work under the same principles - they take a large amount of data and use it to train a recurrent neural network (RNN). With this, the RNN is able to, given a random string as input (often called a seed), produce pieces of music.

That is all they're able to do however. There is very little control over what they output; the aim is simply to produce something that sounds human. A real human performer would follow a conductor, or have instructions in their sheet music, thus changing the way the piece is played. This is what we were trying to create - a system that can be directed to play a certain way, rather than just producing arbitrary music.

## Overview

The project had two key parts: gathering data and training the neural network.

### Gathering data

Data was a big challenge. Each data sample needed to have three parts: the score; a performance by a human; the instructions on the score. Datasets containing just the first two are abundant, but those containing all three are few and far between. We ended up finding one, but it only had about 500 samples; not nearly enough. We tried a number of things to make this work, including:

- Hyper optimising our neural networks to need as little data as possible
- Taking a regular dataset without instructions, and extracting the instructions some other way (reading the corresponding sheet music with OMR, or trying to reverse engineer it by comparing the performance to the score)
- Pre-training the neural network on a typical music generation dataset (samples with just the first two parts), and the fine-tuning it on the smaller dataset for our task.

### Designing the right neural network

Deciding what the architecture should be largely depends on the task and data available, as well as some experimentation to find the right hyper-parameters. The input, as it is with most music generation models, was a sequence of tokens, including the instructions encoded somewhere in the input (at this stage, it’s not really important to consider exactly where that is). We also knew that we needed to consider the input holistically; just like the position of a word matters in a sentence, the position of some verse in a music piece matters as well.

Based on this, recurrent neural networks stood out as the most appropriate option, but we were still aiming to try as many different models as possible. We ended up going with a custom transformer, based on [Museformer](https://arxiv.org/abs/2210.10349), but also tried a convolutional neural network (CNN), though it did not perform as well.

### Testing

We needed a means to evaluate whether or not the system was successfully performing its task: it needed to produce a performance from a piece that sounded human, whilst following any instructions given to it. Judging this is an abstract task - there are little to no specifications as to what sounds 'human', after all. Therefore, we planned to give a survey to volunteers, allowing them to listen to our system, robotic pieces generated by synthesising software, and real human performances, and seeing if they could distinguish which was which. This is otherwise generally known as a Turing test, and indistinguishability was a sensible benchmark to aim for.

### Team management

Since this was a group project, as a group we needed to decide how we would divide the responsibility of the project, and generally how we were going to run it. We decided I should be project manager, since I was comfortable making notes and directing meetings. Since I still wanted to focus on writing code, rather than managing the project my responsibility would primarily be in ensuring everyone was on track and managing meetings (i.e. taking minutes, deciding what tasks to focus on etc.). Beyond this we didn’t feel like further roles were necessary; everyone else would work on whatever task needed to be completed.

As for the methodology, we had a Kanban-style system, with a backlog of tasks to be completed that would be evaluated each week in a weekly meeting. We didn’t know exactly what the tasks would be before starting as this project involved a lot of unknowns, so we thought it best to be less rigorous with the structure of the project, so we could make changes as we needed to.

### Evaluation

Overall, the project did not meet its original requirements. There wasn't enough data, and the neural network simply couldn't learn both to use instructions and produce a piece of human sounding music. With the state of the system as it was we didn't see the need for a survey; we could tell ourselves that it didn't meet the requirements.

However, the project was by no means a failure. Quite the opposite - we received a first overall, with a score of 78/100. We geared the project in a different direction - to explore the techniques necessary to make something like this work. In that aspect, we had done plenty, and had plenty of interesting points to discuss. That became the main focus of the project, to essentially evaluate do what could currently be done, and discuss what was needed for further progress.

I now want to talk about some of the key takeaways from this project, and what I learned from it.

## Working with a team

I had worked with a team previously, but the project was much smaller. This was my first real exposure to working with a team, and there was a lot that I learned from this experience.

I was project manager for this project, which came with a few important responsibilities: keeping everyone up to date with what everyone else was doing to avoid silos; being the first point of contact for issues; catching up with team members to ensure work was being done. 

### Dealing with problems

For most team members, everything went well. This was a project that involved a lot of initiative and exploration, and they understood that; there was no one to tell us what to do, and a lot of it needed to be figured out ourselves. One team member struggled significantly however.

This team member either did no work at all or did not complete it to the expected standard. After talking to them about it, they told me they were confused and didn't know what they needed to do. To address this, I reminded them that I should be their first point of contact and made an effort to catch up with them more often. I continued with this for as long as possible, and while things did get better, the improvement was insignificant.

In approaching tasks to this problem, it was important that everyone had ideas, presented them to the team and as a group we could decide what would be done. That's why initiative was so important. Everyone has their own strengths and weaknesses however, and it would have been better on my end to take that into account before deciding how to run the project. It's important to understand each member of the team from a behavioural standpoint to know what works best for them. That said, I do believe ultimately the onus falls on this team member, and that the main issue was simply a lack of effort.

Another team member struggled from personal issues throughout the project, which was understandable. They ended up effectively dropping out, and we worked primarily as a group of 4, rather than 6, and so I'm proud that we were able to accomplish just as much as other groups, if not more, with fewer numbers.

### Understanding the role of project manager

My role as project manager was not as concrete as it probably should have been. The difficulty was that I was still working on just about everything that anyone else was working on (writing code, documentation, researching etc.) whilst taking on the extra responsibilities of project manager. On top of this, tasks were very open-ended; it was difficult to say when they were complete.

Making the requirements for each task more clear would have solidified my responsibility as a project manager much more, as I would have been able to focus on seeing those tasks through to completion. Ultimately, as project manager, the responsibility of running the project falls on me so this should have been something I put through. It is certainly something I will keep in mind in the future.

## Working with cutting edge research

With every other project or assignment I've worked on, the answer has existed somewhere, and it was just my job to find and put that answer together. Here, that wasn't the case; what we were trying to do hadn't been done before, so we had to spend a good deal of time researching articles and recent papers (some as recent as 2023!) to get ideas.

This made the project especially difficult to plan for, because there was no solid way of knowing what we should be doing. I think as a team we took that as a reason to keep management loose, but in truth we could have still kept it rigorous enough by setting proper deadlines for tasks as we identified them, using task boards and such.

I learnt a lot from this part of the experience, in terms of getting ideas and discussing them with my teammates.

## Conclusion

The project was a success overall, despite it not going the way we initially intended. My overall grade was 78, which was enough for me; I was aiming to get at least 70 in every module to get a first overall, and considering how challenging this was, I was happy with the result.

I’m proud of the effort I put into this project; particularly into the final report, which made up most of that final mark, but I certainly could have done better in a number of aspects. There was a lot to take away from this project, and I’m glad to have had the experience.

Should I ever need to work in a team in the future, project manager or not, I have a much better idea of what’s needed from me individually, and others. As a result, I feel a lot more confident going forward, and hope to continue to improve in the future.

Thank you for reading!
`;