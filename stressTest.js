const fs = require('fs');
const csv = require('@fast-csv/format');
const csvStream = csv.format({headers: false});
const streamerProd = fs.createWriteStream('./stressTestProd.csv');
const streamerQ = fs.createWriteStream('./stressTestQ.csv');
const streamerA = fs.createWriteStream('./stressTestA.csv');


streamerProd.write('product_id' + '\n');
streamerQ.write('question_id' + '\n');
streamerA.write('answer_id' + '\n');

let fillCSVP = (howMany) => {
  for (let i = 0; i < howMany; i++) {
    let randomizer = (Math.floor(Math.random() * (4000000 - 1 + 1) + 1));
    // csvStream.pipe(streamer).on('end', () => process.exit());
    // csvStream.write(JSON.stringify(randomizer))
    streamerProd.write(JSON.stringify(randomizer) + '\n')
  }
}

let fillCSVQ = (howMany) => {
  for (let i = 0; i < howMany; i++) {
    let randomizer = (Math.floor(Math.random() * (10000000 - 1 + 1) + 1));
    // csvStream.pipe(streamer).on('end', () => process.exit());
    // csvStream.write(JSON.stringify(randomizer))
    streamerQ.write(JSON.stringify(randomizer) + '\n')
  }
}

let fillCSVA = (howMany) => {
  for (let i = 0; i < howMany; i++) {
    let randomizer = (Math.floor(Math.random() * (19000000 - 1 + 1) + 1));
    // csvStream.pipe(streamer).on('end', () => process.exit());
    // csvStream.write(JSON.stringify(randomizer))
    streamerA.write(JSON.stringify(randomizer) + '\n')
  }
}

fillCSVP(10000);
fillCSVQ(10000);
fillCSVA(10000);