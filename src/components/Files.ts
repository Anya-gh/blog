import blog_part_1 from '../assets/posts/making-a-blog/part-1-(planning).md'
import blog_part_2 from '../assets/posts/making-a-blog/part-2-(ui-and-ux-design).md'
import blog_part_3 from '../assets/posts/making-a-blog/part-3-(development).md'
import fighting_game_analysis_engine from '../assets/posts/fighting-game-analysis-engine.md'
import learning_japanese from '../assets/posts/learning-japanese.md'
import music_humanisation from '../assets/posts/music-humanisation.md'


interface StringMap {
  [key: string]: string;
}

export const files: StringMap = {
  "making-a-blog/part-1-(planning)" : blog_part_1,
  "making-a-blog/part-2-(ui-and-ux-design)" : blog_part_2,
  "making-a-blog/part-3-(development)" : blog_part_3,
  "fighting-game-analysis-engine" : fighting_game_analysis_engine,
  "learning-japanese" : learning_japanese,
  "music-humanisation" : music_humanisation
}
