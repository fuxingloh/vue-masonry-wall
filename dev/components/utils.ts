import {LoremIpsum} from "lorem-ipsum";
import Rand from 'rand-seed';

export function Lorem(seed = "1") {
  const random = new Rand(seed);
  return new LoremIpsum({
    random: () => random.next(),
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

export function loremItems(seed: string, count: number, options = {
  title: (lorem: LoremIpsum) => lorem.generateWords(2),
  content: (lorem: LoremIpsum) => lorem.generateSentences(1),
}) {
  const lorem = Lorem(seed)
  return items(count, i => {
    return {
      i,
      title: options.title(lorem),
      content: options.content(lorem),
    };
  })
}

export function items<T>(count: number, func: (i: number) => T): T[] {
  return [...Array(count).keys()].map((i) => {
    return func(i);
  })
}
