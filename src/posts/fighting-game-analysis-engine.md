export default `
---
title: Fighting Game Analysis Engine
description: An analysis engine for Guilty Gear Strive (GGST). Analysis engines are common in chess, where they rate each players moves; I built it for a similar purpose in GGST.
status: COMPLETE
date: 9th Aug, 2023
category: Projects
---

Analysis engines are tools to get better at games; each action is given a score, which lets players identify their mistakes (if an action they made has a poor score, then it's a mistake), and shows them what they should have done instead. These are very common in chess, but I wanted to apply them to my favourite genre: fighting games. Many people like the idea of fighting games but struggle to get started due to the difficulty, and I wanted to use analysis engines as a means to help those players. The game I picked to develop it for was Guilty Gear Strive. Fighting games don't have turns, but actions can be still be thought of as objectively 'good' or 'bad', albeit with less certainty.

## What is a fighting game?

Fighting games are traditionally 1v1 multiplayer competitive games; both players control a character, with the objective being to reduce your opponent's character's HP (health points) to 0, by attacking them. Each character has strengths and weaknesses: some are best up close, whilst some prefer being as far away as possible. Each character can perform different attacks, and the primary objective of the game is to guess which attacks your opponent will use. Every attack has a counter attack, like rock-paper-scissors; the challenge is in guessing correctly, which experienced players do by understanding the situation, the characters, and their opponents habits. These games are designed this way because fighting games aren't turn based; you can't see your opponent's attack before responding with your own, you have to guess and attack appropriately. In addition to attacks, there are lots of different things a character can do (such as dashing and jumping), so we use the term "options" analogously to how the term "moves" is used in chess. 

## Motivation

Fighting games are very close to my heart, and I’ve loved them since I played Tekken 7 for the first time, about 6-7 years ago. However, they’re notoriously difficult to get into. Newcomers struggle with the high barrier of execution and the quick decision making. As such, it takes a lot of time and energy to learn to play a fighting game, and most people give up on them before really giving them a proper chance.

Some of this is inevitable; fighting games aren’t for everyone. However, lots of people love the idea of fighting games, they just can’t see themselves overcoming that initial struggle. The idea to develop an analysis engine for fighting games came from my time learning chess.

During the lockdown, my friends and I started playing chess. We’re all competitive, and so we were all trying to get better as fast as we could. Most chess websites, including the one we were using, allow you to go back and watch your replays with an analysis engine. It’s purpose is to score each move at each turn - this allows you to see clearly where you’ve made mistake, why it was a mistake and what you should have done instead. This is useful for every level of player, but especially useful for new players, because it means you don’t have to spend hours studying theory; you can jump in and play some matches, and learn from your mistakes as you go along. 

Fighting games are quite different to chess, but similar in the way you think about what options are best. I thought a similar thing could work, so I decided on it as my 3rd year project at university.

## Design

In chess, analysis engines are fairly simple; there's a set of moves that can be played in any given position, and a score is given to each move. Fortunately, something similar can be done for fighting games. By displaying the score for each option, the player can use this information to determine whether the option they chose was a mistake or not. However, assigning these scores is a little less straightforward. In chess, if a move has a response that causes the game to swing in the opponent's favour, it's a bad move regardless of how difficult the response is to find. The same is not true in fighting games; every option has a counter. Instead, we want to prefer options which have unlikely counters. Some counters are less likely than others depending on the situation; if an option is a counter to only a single option, but is countered itself by all the other good options the opponent has, it's not a very good counter, so it's unlikely the opponent will use it. As such, it's sufficient to design an analysis engine that simply finds the likeliness of any option being chosen assuming optimal play. The more likely an option is, the better it is, and this it directly correlates to its score.

Rather than decide on a machine learning model at this point, I knew I could just test a number of different models and pick the best one, so I didn’t need to commit to a single one. The input to these models would be the same anyway, so knowing which models I’d be using in advance wasn’t really necessary.

Data was the real issue. I knew this would be an issue since I’d have to scrape it from in-game replays, and I wasn’t sure how much I could get. I knew I wouldn’t have enough for a neural network. Since the game has no API, I planned to read the game’s memory addresses for all the information about the current state of the game, and use this to create a state that could be used as input for the machine learning models, with the output being each option and its score.

## Implementation

The first thing to implement was the scraper. This, unfortunately, was also what took most of my time. I had two terms (4/5 months) to complete the project, and so I wasn’t able to do everything I wanted in the aim of meeting the objectives I had set. The issue was that for every value of the state I needed, I had to find the relevant memory address. This involves changing that value in-game, watching the memory addresses to see which had changed, and repeating until there was only the correct memory address left. In reality, this isn’t how it went; for the value that represented the state that a character was in (e.g. using an attack, jumping etc.), even after repeating this process multiple times there were still hundreds of memory addresses to sift through. I ended up having to pick one at random hoping it would work, and then try again if it didn’t.

On the contrary, implementing the machine learning models was very simple; Python offers a wide variety of great machine learning libraries, like PyTorch and Scikit-learn. I used the latter, since I wasn’t using neural networks.

## Learnings

The most important lesson I learnt from this project was in scoping out the project. I didn’t consider how big an issue gathering data in this way would be. When I went to go and implement the scraper, it was a few weeks before I was even able to write any code, as I just spent that time trying to understand what I needed to do. In the end, the scraper was the least interesting part as well. Had I picked a game that was more friendly to third-party applications (such as Rivals of Aether), I would have been able to spend more of my time focusing on what mattered. Data will always be an issue, but it’s good practice to do what’s possible to mitigate it as best as possible. Ultimately, things like this are a matter of experience, and I’m glad to have it now as to not make the same mistake in the future.

Otherwise, I’m still proud of this project overall. I was very happy with the final report I produced, which did quite well (achieved a first), and the design I came up with was novel in some important ways. As much as I’d like to take a stab at this again in the future, I don’t think I’ll be doing so unless I ever find a fighting game I enjoy that’s also friendly to hobbyist programmers like me, simply because there’re projects I’d rather be working on.
`;