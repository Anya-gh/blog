export default `
# Music Humanisation

Given a score of music in some digital format, playing back a piece is trivial for computers. However, they struggle to induce the same tempo (changes in timing) and dynamics (changes in force or volume) that a human naturally exhibits. This causes playback from computers to sound robotic. In addition, scores usually include instructions from the composer as to how the performance of the piece should be played; these are often in Latin, and can have a dramatic effect on how the piece sounds overall. Computers fail to take this into account, and thus are incomparable to human players. A music humanisation system aims to solve this problem, by playing back a piece the way a human would with the capability to take instructions into account.

This project was a group project I completed in my 4th year with other university students on my course. In this post, I’ll go over my experience working on it and what I learned in the process. If you’d like to read the full report, you can find that here.

The idea for this project was proposed by a peer of mine, and I thought it had a great capacity for machine learning solutions, which I wanted to develop my skills with. I learnt not to jump into a project just because it sounded interesting, but, as I explain in the following section, there was good reason to believe this was feasible.

## Motivation

Generally speaking the system we were trying to create was a music generation system. Though there are different generation models, what is needed is always the same: a large quantity of data. For instance, if we were trying to reproduce human performances, we would need to supply the neural network with a large quantity of human performances of different pieces, and gradually it will learn to produce its own. This has been done many times before, and there are lots of sufficiently large repositories of music just for this purpose.

Generation models of this kind suffer from a few key weaknesses.
It’s not possible to create a performance from a specific piece; the performances produced will be arbitrary. In other words, it will both compose and play the piece itself.
The performance can’t be directed. The conductor plays a key role in live music performances, and these models have no means of adapting how they play the piece.

Whilst finding a problem is an important start, we also needed to be sure we could solve it. We knew at this stage that we could certainly encode the instructions and pass them into a neural network to train it; you can never be sure if it will learn the task properly, but we knew music was a popular field for machine learning and believed there would be a reasonably large amount of data. Finally, if it really did turn out to be too difficult to solve, that wouldn’t be an issue, since the point of this 4th year project wasn’t to produce a result, it was to show we were capable of undertaking a software engineering project as a group; not every project ‘succeeds’ so provided we document the difficulties, we would still be able to produce a good assignment overall.


## Team management

Since this was a group project, as a group we needed to decide how we would divide the responsibility of the project, and generally how we were going to run it. We decided I should be project manager, since I was comfortable making notes and directing meetings. Since I still wanted to focus on writing code, rather than managing the project my responsibility would primarily be in ensuring everyone was on track and managing meetings (i.e. taking minutes, deciding what tasks to focus on etc.). Beyond this we didn’t feel like further roles were necessary; everyone else would work on whatever task needed to be completed.

As for the methodology, we had a Kanban-style system, with a backlog of tasks to be completed that would be evaluated each week in a weekly meeting. We didn’t know exactly what the tasks would be before starting as this project involved a lot of unknowns, so we thought it best to be less rigorous with the structure of the project, so we could make changes as we needed to.

## Overview 

Data was a big bottleneck for this project, and constrained what we could and how we could do it. Simply, datasets that contained scores, performances and instructions were limited. We needed a means to extract instructions from the scores. With the instructions extracted, we needed to find a suitable architecture for a neural network to train.

### Instruction extraction

The first was OMR, which stands for Optical Music Recognition. This field focuses on reading musical notation from documents. The focus is typically on extracting information about the notes, but we thought we could try to use techniques from OMR to extract instructions. We were able to get a solution working with a machine learning model trained on scores from MuseScore.

The second was reverse engineering. Given both a performance and a score, the differences in the performance and the score can be thought of as to contain the instructions on the score. This is true assuming the human player played the notes as they were in the score and used the instructions on the score. Since this is what any good musician should do, we thought this was a reasonable assumption, and thus thought this could be an approach worth exploring. To be more specific, the approach involved analysing the differences in dynamics and tempo between the performance and the synthesised MIDI file of the score (provided we had it) and using this to extract the instructions.

We were able to implement solutions for both of these; you can find the details in the report.

### Models

Deciding what the architecture should be largely depends on the task and data available, as well as some experimentation to find the right hyper-parameters. The input, as it is with most music generation models, is a sequence of tokens, including the instructions encoded somewhere in the input (at this stage, it’s not really important to consider exactly where that is). We also know that we need to consider the input holistically; just like the position of a word matters in a sentence, the position of some verse in a music piece matters as well.
Based on this, recurrent neural networks stood out as the most appropriate option, but we were still aiming to try as many different models as possible. We ended up going with a custom transformer, based on Museformer.

### Testing

Finally, we needed a means to evaluate whether or not the system was successfully performing its task: it needed to produce a performance from a piece that sounded human, whilst following any instructions given to it. Judging this an abstract task - whether something sounds ‘human’ can only be determined by a human, after all. Therefore, we planned to give a survey to volunteers, allowing them to listen to our system, robotic pieces generated by synthesising software, and real human performances, and seeing if they could distinguish which was which. This is otherwise generally known as a Turing test, and indistinguishability was a sensible benchmark to aim for.

## Evaluation

Like all projects, some parts were successful, some were not. That said, this one in particular had a number of challenges, and, difficult as they were to deal with, I learnt a lot from them.

### Planning and design
There were a number of oversights we made when planning the project. The biggest one was data. We had planned for a lack of the exact type of data we wanted and designed instruction extraction systems to handle this. In hindsight, rather than anticipate what kind of data there would be, it would’ve been much better to simply check. We knew it would take time to find the right dataset, so we wanted to put this off until we needed to, but it caused problems later as I’ll discuss in those sections.
### Reverse engineering
At the time, this sounded like a good idea because of the data problem; naturally finding data sets that just had scores and performances would be simple, so if we had an extraction solution that only needed scores and performances it would make data less of a problem. In reality, it was much too ambitious. This is essentially a level beyond Fourier analysis, which is a complicated enough as it is, and there was no work at all in this area. As a result, the solution we ended up with worked, but without asking the musician that performed there was no way of knowing for sure - even if we could ask them, it’s very unlikely that they would remember what instructions they followed.
This in itself was a reason to shelf this idea. Not having a verifiable means to test a system is problematic, as it becomes a challenge to use the system at all if we don’t know whether or not it works. The main takeaway from this was to consider a different perspective as to whether or not this system was worth working on.

### Team

Two team members contributed very little. From one, I understood they were dealing with some personal issues, and so they were not so much of a problem as they had made me aware in advance. The other did not seem to understand how little they’d done, and, despite telling me there were no issues, completed tasks to a poor standard or not at all.
Our development methodology meant trusting individual members. As the project manager I did not want to seem overbearing and impair anyone’s work, as I didn’t know better than anyone else. My responsibility was just to make sure everyone was on board with what was going on, and to be the first point of contact for issues.
I think the key issue here was me not being able to identify what was needed from me. Different people want different things from a manager, and it’s important to recognise that. Some people wanted me to be as hands off as possible because they knew what they were doing, whilst others were lost and wanted guidance in some way. Identifying the individual needs of each team member is an important skill I failed to recognise, but is one I’ll keep in mind for the future. For this person, I should have been more hands-on and done a better job monitoring how their tasks were progressing, instead of waiting until the next meeting.
Though it was a challenge at the time, I learnt a lot from it, and hopefully the experience will aid me in future endeavours, outside of just software engineering.

### Data

Data was the primary issue in the project. We decided against using the reverse engineering solution as we couldn’t test it, and the OMR solution was difficult to use since we couldn’t find datasets that had scores, images, and performances.
To reiterate, three inputs were needed for the neural network: the score of the piece, in MIDI format, a human performance of the piece, in MIDI format, and the instructions, in plain text. Because of our OMR solution, we only needed to get datasets that contained the MIDI score, an image of the score (PDF, JPG etc.) and the MIDI performance. We thought datasets of this kind would be easier to find, but this was not the case.
In the end, we found a dataset that did contain scores, performances and instructions, but the quality was not high and the size was limited. In the end, we could see (using TensorBoard) that the models were far from converging, and just listening to the pieces proved that they were far from the standard we had pushed for.
We tried a number of things to make our models more efficient, and most of them were effective to some degree. To name a few: Bayesian compression, attention masking, flash attention, transfer learning.

### Testing

We weren’t able to test the system with the survey as we had intended. Despite working longer than the recommended hours per week the system still wasn’t where we wanted it to be, and from internal testing we knew the system wasn’t up to standards. Rather than test the system despite being almost certain what the results would be, we decided instead to just spend as much time as possible attempting to find solutions to our data bottleneck.
In the end, we geared the project away from delivering a final product, and more into a research project. Our supervisor found this acceptable since the field was so novel and so little had been done in it before, and we had plenty of techniques and solutions to problems that held merit on their own, despite not producing a strong final product.

## Conclusion

The project was a success overall, despite it not going the way we initially intended. My overall grade was 78, which was enough for me; I was aiming to get at least 70 in every module to get a first overall, and considering how challenging this was, I was happy with the result.

I’m proud of the effort I put into this project; particularly into the final report, which made up most of that final mark, but I certainly could have done better in a number of aspects. There was a lot to take away from this project, and I’m glad to have had the experience.

Should I ever need to work in a team in the future, project manager or not, I have a much better idea of what’s needed from me individually, and others. As a result, I feel a lot more confident going forward, and hope to continue to improve in the future.
`;