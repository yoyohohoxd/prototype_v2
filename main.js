import fetch from 'node-fetch';
import { argv, exit } from 'process';
import fs from 'fs';
import express from 'express';
import http from 'http';

const apiData = {
  url: 'https://dictionaryapi.com/api/v3/references/thesaurus/json/',
  word: process.argv[2],
  key: '?key=71bc53b3-250e-4d40-9e89-11f3712c4100',
}

const {url, word, key} = apiData;
const apiUrl = `${url}${word}${key}`;
const app = express();
const port = 3000;
let opposite = "";

app.get('/', (req, res) => {
  res.send(`${opposite}`);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

fetch(apiUrl)
  .then( (data) => data.json())
  .then( (word) => createFile(word))

const createFile = (data) => {
  let parsed = JSON.stringify(data, null, 4);
  fs.writeFile('output.json', parsed, function(err) {
    if (err) throw err;
    console.log('\nSAVED\n');
  });

  const randomWord = verifyWord(data);
  if (randomWord >= 0) {
    console.log("Picked word number: " + (randomWord + 1) + " out of " + data[0].meta.ants[0].length + " possible.");
    console.log("The opposite is: " + data[0].meta.ants[0][randomWord]);
    opposite = data[0].meta.ants[0][randomWord];
  }
}

function verifyWord(data) {
  console.log("\n\nThe original word was: " + word + "\nAnd this is the length of the array for this word: " + data[0].meta.ants[0].length);
  if (data[0].meta.ants[0].length >= 1) {
    let numberOfWords = data[0].meta.ants[0].length;
    let randomWord = Math.floor(Math.random() * numberOfWords)
    return randomWord
  } else {
    console.log(data[0].meta.ants[0].length);
    console.log("There are no antonyms for this word.");
  }
}