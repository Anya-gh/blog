export default `
# Music Humanisation

Given a score of music in some digital format, playing back a piece is trivial for computers. However, they struggle to induce the same tempo (changes in timing) and dynamics (changes in force or volume) that a human naturally exhibits. This causes playback from computers to sound robotic. In addition, scores usually include instructions from the composer as to how the performance of the piece should be played; these are often in Latin, and can have a dramatic effect on how the piece sounds overall. Computers fail to take this into account, and thus are incomparable to human players. A music humanisation system aims to solve this problem, by playing back a piece the way a human would with the capability to take instructions into account.

This project was a group project I completed in my 4th year with other university students on my course.

## Motivation

Generally speaking the system we’re trying to create is a music generation system. Though there are different generation models, what is needed is always the same: a large quantity of data. For instance, if we’re trying to reproduce human performances, we need to supply the neural network with a large quantity of human performances of different pieces, and gradually it will learn to produce its own. This has been done many times before, and there are lots of sufficiently large repositories of music just for this purpose.

Generation models of this kind suffer from a few key weaknesses.
It’s not possible to create a performance from a specific piece; the performances produced will be arbitrary. In other words, it will both compose and play the piece itself.
The performance can’t be directed. The conductor plays a key role in live music performances, and these models have no means of adapting how they play the piece.

## Design

To overcome these weaknesses, we have to make some changes to how the models are designed. First of all, we cannot use the generic generative model architecture. In this kind of architecture, there’s no target for the neural network; it’s not aiming to produce any specific kind of music, just something that sounds human. We need to specify an actual target, to ensure it actually plays the piece we give it. Second, we have to pass the relevant instructions to the model in its input, so it has the capacity to use them.

Naturally, if we’re changing the architecture of the model, the requirements for data change as well. A repository of human performances alone is not enough; we also need the score they were playing, and the instructions on it. 

Whilst we can be ambitious and hope to find a repository with pairs of performances and scores, it’s much less sensible to hope to find a repository that includes instructions. Therefore, the primary challenge of this project was engineering clever solutions to extract these instructions.

### OMR

OMR stands for Optical Music Recognition. This field focuses on reading musical notation from documents. The focus is typically on extracting information about the notes, but we thought we could try to use techniques from OMR to extract instructions.

### Reverse engineering

Given both a performance and a score, the differences in the performance and the score can be thought of as to contain the instructions on the score. This is true assuming the human player  played the notes as they were in the score and used the instructions on the score. Since this is what any good musician should do, we thought this was a reasonable assumption, and thus thought this could be an approach worth exploring. To be more specific, the approach involved analysing the differences in dynamics and tempo between the performance and the synthesised MIDI file of the score (provided we had it) and using this to extract the instructions.

## Team management

Since this was a group project, as a group we needed to decide how we would divide the responsibility of the project, and generally how we were going to run it. We decided I should be project manager, since I was comfortable making notes and directing meetings. Since I still wanted to focus on writing code, rather than managing the project my responsibility would primarily be in ensuring everyone was on track and managing meetings (i.e. taking minutes, deciding what tasks to focus on etc.). Beyond this we didn’t feel like further roles were necessary; everyone else would work on whatever task needed to be completed.

As for the methodology, we had a Kanban-style system, with a backlog of tasks to be completed that would be evaluated each week in a weekly meeting. We didn’t know exactly what the tasks would be before starting as this project involved a lot of unknowns, so we thought it best to be less rigorous with the structure of the project, so we could make changes as we needed to.

## Implementation

As this was a group project, I can only discuss the parts I worked on. 

### Reverse engineering

The primary driver of this system was digital signal processing. Since we want to compare the performance to the score, we need to find a suitable format to represent both of them, and waveforms make the most sense in this case. This means we need a MIDI of the score to synthesise, which was available in the dataset we had.

From there, we needed to compare them. This is not as simple as it may seem however; because they’re both in the same format, it may seem like we can do some sort of extension of subtracting one file from the other. This is essentially the same as comparing the euclidean distance between both files, and taking note of points where it’s larger than average. However, even though the human player is playing the same piece, the tempo will be different; if it’s not, there’s no point in comparing the files because they’ll essentially be the same. This means though that at one time point, where the human player might be playing some note, a different note may be played in the other piece. Therefore, we need to find a mapping of notes between both pieces, and compare notes from the human performance to the the place in the score where they’re mapped to.

This can be abstracted to a more general computation problem of finding a least-cost mapping between two sequences. Understanding it as such, I found a suitable algorithm for this problem: dynamic time warping.

Implementing this algorithm in practice posed a few problems. The major one was the mistakes in the human performances; despite them being taken from a competition, in which mistakes should be as few as possible, there were many and we couldn’t simply ignore them. We needed to find a method to prune them.
To do this, instead of finding a mapping between the pieces overall, we found a mapping between pitch sequences. For each pitch, we extracted the notes that were played in each piece, which made it clear where the mistakes where. By enforcing a one-to-one mapping, any notes that were not mapped to another in the other piece were mistakes, and so could be removed. That way, albeit with different timing, the notes in both pieces would be the same.
`;