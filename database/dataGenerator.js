const faker = require('faker');
const LoremIpsum = require('lorem-ipsum').LoremIpsum;
const fs = require('fs');

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
  fs.appendFileSync('./data.json', '[');
  fs.appendFileSync('./dataA.json', '[');
  let product_id = 4001007;
  let question_id = 10000010;
  let answer_id = 19999639;
  let start = Date.now();
  let counter = 0;

  for (let i = 1; i < howMany + 100; i++) {

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
          let iterationAnswer = fakeAnswer(answer_id);
          fakeAnswerObj[answer_id] = iterationAnswer;
          answer_id++;
          fs.appendFileSync('./dataA.json', JSON.stringify(iterationAnswer, null, 3));
          if (j >= randomizer - 1) {
            if (isLast) {
              break;
            } else {
              fs.appendFileSync('./dataA.json', ',');
            }
          } else {
            fs.appendFileSync('./dataA.json', ',');
          }
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
        counter++;
        if ((counter >= howMany) && (x >= rando - 1)) {
          fs.appendFileSync('./data.json', JSON.stringify(fakeQuestion(question_id, true), null, 3));
        } else {
          fs.appendFileSync('./data.json', JSON.stringify(fakeQuestion(question_id, false), null, 3));
        }
        question_id++;

        if (counter >= howMany) {
          if (x >= rando - 1) {
            break;
          } else {
            fs.appendFileSync('./data.json', ',');
          }
        } else {
          fs.appendFileSync('./data.json', ',');
        }

      }
      product_id++;
    }


    if (counter >= howMany) {
      break;
    } else {
      makeQuestions(howMany);
    }
  }
  fs.appendFileSync('./data.json', ']');
  fs.appendFileSync('./dataA.json', ']');
  let timeTaken = Date.now() - start;
  console.log('Finished! Time Taken:', timeTaken)
  console.log('Final Product ID: ', product_id)
  console.log('Final Question ID: ', question_id)
  console.log('Final Answer ID: ', answer_id)
}

fakeListFiller(1000000);


//** mongoimport --db QA --collection questions --file /Users/jamesgutowski/Documents/GalvanizeThings/SDC/Questions-and-Answers/database/data.json --jsonArray **//
//** mongoimport --db QA --collection answers --file /Users/jamesgutowski/Documents/GalvanizeThings/SDC/Questions-and-Answers/database/dataA.json --jsonArray **//




