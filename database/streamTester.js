const faker = require('faker');
const LoremIpsum = require('lorem-ipsum').LoremIpsum;
const fs = require('fs');
const fastcsv = require('@fast-csv/format');
const fastcsvStream = fastcsv.format({headers: false})

const writeStreamQuestions = fs.createWriteStream('./data.csv');
const writeStreamAnswers = fs.createWriteStream('./dataA.csv');

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 3,
  }
});

let fakeListFiller = (howMany) => {
  writeStreamQuestions.write('product_id,question_id,question_body,question_date,asker_name,question_helpfulness,reported,answers' + '\n', 'utf8');
  writeStreamAnswers.write('question_id,id,body,date,answerer_name,helpfulness,reported,photos' + '\n', 'utf8');
  let product_id = 1;
  let question_id = 1;
  let answer_id = 1;
  let start = Date.now();
  let counter = 0;

  for (let i = 1; i < howMany; i++) {

    let fakeQuestion = (question_id, isLast) => {
      let fakeAnswer = (answer_id) => {
        let aBody = lorem.generateSentences(1);
        let aDate = faker.date.past(3);
        let aName = faker.name.firstName() + ' ' + faker.name.lastName();
        let aHelpful = (Math.floor(Math.random() * (20 - 1) + 1));
        let aPhotos = [];
        let aPhotoGenerator = () => {
          let rando = (Math.floor(Math.random() * 6))
          for (let j = 0; j < rando; j++) {
            let randoImage = (Math.floor(Math.random() * (1000 - 1) + 1))
            let aFakePhoto = `https://picsum.photos/id/${randoImage}/800/600`
            aPhotos.push(aFakePhoto)
          }
        };
        aPhotoGenerator();
        return ({
          'question_id': question_id,
          'id': answer_id,
          'body': aBody,
          'date': aDate,
          'answerer_name': aName,
          'helpfulness': aHelpful,
          'reported': 0,
          'photos': aPhotos,
        });
      };

      let makeAnswers = (isLast) => {
        let randomizer = (Math.floor(Math.random() * (2 - 0 + 1) + 1));
        for (let j = 0; j < randomizer; j++) {
          // let iterationAnswer = JSON.stringify(fakeAnswer(answer_id));
          let iterationAnswer = fakeAnswer(answer_id);
          fakeAnswerObj[answer_id] = iterationAnswer;
          answer_id++;
          // fastcsv.write(iterationAnswer, {headers: false}).pipe(writeStreamAnswers);
          fastcsvStream.pipe(writeStreamAnswers).on('end', () => process.exit());
          fastcsvStream.write(iterationAnswer);
          fastcsvStream.end();

        }
      }

      let fakeAnswerObj = {};
      makeAnswers(isLast);

      let qBLength = (Math.floor(Math.random() * (15 - 5) + 5));
      let qBody = lorem.generateWords(qBLength);
      let qDate = faker.date.past(3);
      let qName = faker.name.firstName() + ' ' + faker.name.lastName();
      let qHelpful = (Math.floor(Math.random() * (30 - 1) + 1));
      return ({
        'product_id': product_id,
        'question_id': question_id,
        'question_body': qBody,
        'question_date': qDate,
        'asker_name': qName,
        'question_helpfulness': qHelpful,
        'reported': 0,
        'answers': fakeAnswerObj,
      });
    };

    let makeQuestions = (howMany) => {
      let rando = (Math.floor(Math.random() * (3 - 0 + 1) + 1));
      for (let x = 0; x < rando; x++) {
        // fastcsv.write(JSON.stringify(fakeQuestion(question_id, true)), {headers: false}).pipe(writeStreamQuestions);
        question_id++;
      }
      counter++;
      product_id++;
    }

    makeQuestions(howMany);
    if (counter === howMany) {
      break;
    }
  }
  let timeTaken = Date.now() - start;
  console.log('Finished! Time Taken:', timeTaken)
}

fakeListFiller(2);


//** mongoimport --db QA --collection questions --type csv --headerline --file /Users/jamesgutowski/Documents/GalvanizeThings/SDC/Questions-and-Answers/database/data.csv **//
//** mongoimport --db QA --collection answers --type csv --headerline --file /Users/jamesgutowski/Documents/GalvanizeThings/SDC/Questions-and-Answers/database/dataA.csv **//




