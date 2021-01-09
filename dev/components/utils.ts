import {LoremIpsum} from "lorem-ipsum";

const generator = require('random-seed');

export function Lorem(seed = "1") {
  return new LoremIpsum({
    random: generator(seed).random,
    sentencesPerParagraph: {
      max: 8,
      min: 4
    },
    wordsPerSentence: {
      max: 16,
      min: 4
    }
  });
}

