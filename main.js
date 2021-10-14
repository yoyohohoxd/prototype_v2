import fetch from 'node-fetch';
import { argv, exit } from 'process';
import fs from 'fs';

const apiData = {
  url: 'https://dictionaryapi.com/api/v3/references/thesaurus/json/',
  word: process.argv[2],
  key: '?key=71bc53b3-250e-4d40-9e89-11f3712c4100',
}

const {url, word, key} = apiData;
const apiUrl = `${url}${word}${key}`;

fetch(apiUrl)
  .then( (data) => data.json())
  .then( (word) => findAnts(word))

const findAnts = (data) => {
  let parsed = JSON.stringify(data, null, 4);
  fs.writeFile('output.json', parsed, function(err) {
    if (err) throw err;
    console.log('\nSAVED');
  });

  const randomWord = verifyWord(data);
  if (randomWord >= 1) {
    console.log("Picked word number: " + randomWord + " out of " + data[0].meta.ants[0].length + " possible.");
    console.log("The opposite is: " + data[0].meta.ants[0][randomWord]);
    return data[0].meta.ants[0][randomWord];
  }
}

function verifyWord(data) {
  console.log("\n\nThe original word was: " + word + "\nAnd this is the length of the array for this word: " + data[0].meta.ants[0].length);
  if (data[0].meta.ants[0].length >= 1) {
    let numberOfWords = data[0].meta.ants[0].length;
    let randomWord = Math.floor(Math.random() * numberOfWords)
    console.log(randomWord);
    return randomWord
  } else {
    console.log(data[0].meta.ants[0].length);
    console.log("There are no antonyms for this word.");
  }
}