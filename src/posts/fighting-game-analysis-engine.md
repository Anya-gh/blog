export default `
# Fighting Game Analysis Engine

Analysis engines are tools to get better at games; each action is given a score, which lets players identify their mistakes (if an action they made has a poor score, then it's a mistake), and shows them what they should have done instead. These are very common in chess, but I wanted to apply them to my favourite genre: fighting games. Many people like the idea of fighting games but struggle to get started due to the high barrier of entry in terms of difficulty, and I wanted to use this as a means to help those players. The game I picked to develop it for was Guilty Gear Strive. \n Fighting games don't have turns, but actions can be still be thought of as objectively 'good' or 'bad', albeit with less certainty.

## Design

### Chess

Chess is a mathematically "nice" game to analyse, particularly in the lens of Game Theory; a field of computer science that studies the interactions of different agents in an environment where each agent aims to maximise its own benefit. Chess fits into this nicely; it's a zero-sum two player game, which means one player's gain is equal in the same amount to the other player's loss, and vice versa.

### Fighting games

Designing an analysis engine for such a game is therefore quite simple; to rate each action, simply study all the possible continuations that can be reached and evaluate those. In practice, this is possible (though only very recently), albeit with very large amounts of data. 

Fighting games are similar in some aspects, and substantially different in others.

## Implementation and Deployment
`;