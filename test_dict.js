const { argv } = require('process');
const http = require("https");
const fs = require("fs");
const path = require("path/posix");

const app_id = "my_app_id"; // insert your APP Id
const app_key = "my_app_key"; // insert your APP Key
const wordId = process.argv[2];
const fields = "";
const strictMatch = "false";

argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
});

const options = {
  host: 'od-api.oxforddictionaries.com',
  port: '443',
  path: '/api/v2/entries/en-gb/' + wordId + '?fields=' + fields + '&strictMatch=' + strictMatch,
  method: "GET",
  headers: {
    'app_id': '248622cf',
    'app_key': 'fa7baa2f3b0c344af4af4c13a60299d5'
  }
};

http.get(options, (resp) => {
    let body = '';
    resp.on('data', (d) => {
        body += d;
    });
    resp.on('end', () => {
        let parsed = JSON.stringify(body);
        getText(parsed);
        //console.log(parsed);
    });
});

function getText(data) {
  const obj = JSON.parse(data)
  const myJSON = JSON.stringify(obj, null, 4);
  console.log(obj);
  fs.writeFile('output.json', myJSON, function(err) {
      if (err) throw err;
      console.log('\n saved');
  });
}