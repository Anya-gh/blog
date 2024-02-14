const e=`
---
title: Fighting Game Analysis Engine
description: An analysis engine for Guilty Gear Strive (GGST). Analysis engines are common in chess, where they rate each players moves; I built it for a similar purpose in GGST.
status: COMPLETE
date: 9th Aug, 2023
category: Projects, Machine Learning
theme: ggst
credit: All credit goes to Arc System Works for the background image.
---

Analysis engines are tools to get better at games; each action is given a score, which lets players identify their mistakes (if an action they made has a poor score, then it's a mistake), and shows them what they should have done instead. These are very common in chess, but I wanted to apply them to my favourite genre: fighting games. Many people like the idea of fighting games but struggle to get started due to the difficulty, and I wanted to use analysis engines as a means to help those players. The game I picked to develop it for was Guilty Gear Strive. Fighting games don't have turns, but actions can be still be thought of as objectively 'good' or 'bad', albeit with less certainty.

## What is a fighting game?

Fighting games are traditionally 1v1 multiplayer competitive games; both players control a character, with the objective being to reduce your opponent's character's HP (health points) to 0, by attacking them. Each character has strengths and weaknesses: some are best up close, whilst some prefer being as far away as possible. Each character can perform different attacks, and the primary objective of the game is to guess which attacks your opponent will use. Every attack has a counter attack, like rock-paper-scissors; the challenge is in guessing correctly, which experienced players do by understanding the situation, the characters, and their opponents habits. These games are designed this way because fighting games aren't turn based; you can't see your opponent's attack before responding with your own, you have to guess and attack appropriately. In addition to attacks, there are lots of different things a character can do (such as dashing and jumping), so we use the term "options" analogously to how the term "moves" is used in chess.

## Motivation

Fighting games are very close to my heart, and I’ve loved them since I played Tekken 7 for the first time, about 6-7 years ago. However, they’re notoriously difficult to get into. Newcomers struggle with the high barrier of execution and the quick decision making. As such, it takes a lot of time and energy to learn to play a fighting game, and most people give up on them before really giving them a proper chance.

Some of this is inevitable; fighting games aren’t for everyone. However, lots of people love the idea of fighting games, they just can’t see themselves overcoming that initial struggle. The idea to develop an analysis engine for fighting games came from my time learning chess.

During the lockdown, my friends and I started playing chess. We’re all competitive, and so we were all trying to get better as fast as we could. Most chess websites, including the one we were using, allow you to go back and watch your replays with an analysis engine. It’s purpose is to score each move at each turn - this allows you to see clearly where you’ve made mistake, why it was a mistake and what you should have done instead. This is useful for every level of player, but especially useful for new players, because it means you don’t have to spend hours studying theory; you can jump in and play some matches, and learn from your mistakes as you go along.

Fighting games are quite different to chess, but similar in the way you think about what options are best. I thought a similar thing could work, so I decided on it as my 3rd year project at university.

## Overview

For this project, I chose Guilty Gear Strive (GGST) as the fighting game. There were three parts to this project: gathering data, designing the system and training a machine learning model.

### Reading memory to generate data

Like with most machine learning projects, data was the main issue. Since the game had no API, I had to manually extract the necessary data by reading the game's memory as it was running. This was a tedious process. I wanted, for every frame of the game, to know what was happening in the game, which is encoded in a set of key values (such as both players' positions). Each value has its own address in memory, that has to be found separately. To do this, one has to change the value (for instance with character position one of the characters would be moved in-game) and observe the memory addresses to see which memory addresses changed. After doing this enough times, there should only be one address left; the one that you are looking for.

In reality, this was not the case most of the time. There were a number of addresses that would change seemingly arbitrarily, or would change because of the value I was looking for but not contain the value itself. I did eventually get all the values, but it took up a large portion of the time I had for the project. 

To generate data, I used an in-game feature to play replays from high-level players in game, and ran my memory scraper in the background. The amount of data I was able to generate this way was limited, unfortunately.

### Designing the system

For the purposes of this post, whenever I use the term 'option', assume it to mean an action a player can take in any generic fighting game (e.g. moving back and forth).

Unlike chess, where it is not clear how good or bad a move is due to late rewards on actions, in fighting games, it's usually pretty clear whether it was good or bad in hindsight - if it hit them, then it was a good action to take.

Unfortunately, I couldn't take advantage of this. The data I had simply wasn't rich enough to track whether an option resulted in a good outcome, because there are many possible 'good outcomes', and I didn't have access to the data that would let me see them. Instead, I opted to simply track which options were being used by the best players in which states. As such, the machine learning function being learned was one mapping from the game state to a ranking of different options; this ranking could be interpreted as the likeliness of that option being used. 

### Choosing the right machine learning model

At this stage in time, I had no experience with machine learning, and naturally no experience with neural networks either. I talked to my supervisor, and they recommended that I stick to simple machine learning models. This made sense since I wasn't able to generate much data as well.

Given the machine learning function, logistic regression was an obvious standout, since the problem involved mapping to a set of probabilities. However, since the models were fairly quick to train, I tested a number of different models, and compared the results.

## Evaluation

This was a university project, and the aim wasn't to create the system I set out to make; it was simply to demonstrate that I was capable of undertaking such a project, and make good progress in every meaningful aspect of that undertaking. Despite the system not being where I wanted it to due to a lack of data, I achieved a first overall with my dissertation, so I was happy with the result, though I do think things could have gone better in a lot of aspects.

### Choosing a project

To some degree, I think the data problem was inevitable; the game I chose had no API, and memory reading is naturally far from ideal. I chose GGST since it was a game I personally liked a lot at the time, rather than one that i thought would be a good fit. Had I chose a game that had an API with this data available, the project would have been much smoother.

### Working in isolation

I think another big issue I had with the project was that it was entirely my own project. When I got stuck, there was no one to go to, since no one was doing the same project I was. That said, I still think there's a lot of value in getting input from peers even if they aren't completely involved. Simply sharing ideas can spark new ones, and this is something I've kept in mind since.

## Conclusion

Though the project was received well overall and I achieved a good grade, I wasn't very happy personally with how it went. It wasn't what I envisioned, and the process was not particularly enjoyable. It was an important learning experience however, and certainly made me more confident going forward.
`;export{e as default};
