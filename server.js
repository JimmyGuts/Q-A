const express = require("express");
const compression = require("compression");
const { Question, Answer } = require('./database/database');

const app = express();
const Port = process.env.port || 8080;

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// for modules
app.use(express.static("public"));

// for proxy
app.use("/products/:product_id", express.static("public"));

// Mock Data

const mockGetQAs = {
    "product_id": "1",
    "results": [
        {
            "question_id": 5,
            "question_body": "Can I wash it?",
            "question_date": "2018-02-08T00:00:00.000Z",
            "asker_name": "cleopatra",
            "question_helpfulness": 36,
            "reported": 0,
            "answers": {
                "46": {
                    "id": 46,
                    "body": "I've thrown it in the wash and it seems fine",
                    "date": "2018-02-08T00:00:00.000Z",
                    "answerer_name": "marcanthony",
                    "helpfulness": 98,
                    "photos": []
                },
                "64": {
                    "id": 64,
                    "body": "It says not to",
                    "date": "2018-03-08T00:00:00.000Z",
                    "answerer_name": "ceasar",
                    "helpfulness": 1,
                    "photos": []
                },
                "96": {
                    "id": 96,
                    "body": "I wouldn't machine wash it",
                    "date": "2018-03-08T00:00:00.000Z",
                    "answerer_name": "ceasar",
                    "helpfulness": 1,
                    "photos": []
                },
                "101": {
                    "id": 101,
                    "body": "Only if you want to ruin it!",
                    "date": "2018-03-08T00:00:00.000Z",
                    "answerer_name": "ceasar",
                    "helpfulness": 7,
                    "photos": []
                },
                "107": {
                    "id": 107,
                    "body": "Yes",
                    "date": "2018-03-08T00:00:00.000Z",
                    "answerer_name": "Seller",
                    "helpfulness": 92,
                    "photos": []
                },
                "124794": {
                    "id": 124794,
                    "body": "The cake is a lie!",
                    "date": "2019-10-21T00:00:00.000Z",
                    "answerer_name": "Rolf",
                    "helpfulness": 1,
                    "photos": []
                },
                "124795": {
                    "id": 124795,
                    "body": "the cake is a lie!",
                    "date": "2019-10-21T00:00:00.000Z",
                    "answerer_name": "turkeyboi",
                    "helpfulness": 1,
                    "photos": []
                },
                "124802": {
                    "id": 124802,
                    "body": "Onsies are the best! It runs true to size.",
                    "date": "2020-02-05T00:00:00.000Z",
                    "answerer_name": "jabroni12",
                    "helpfulness": 1,
                    "photos": []
                },
                "124803": {
                    "id": 124803,
                    "body": "I think it runs super super small and it shrinks in the wash even more",
                    "date": "2020-02-05T00:00:00.000Z",
                    "answerer_name": "needMoreAnswers12",
                    "helpfulness": 1,
                    "photos": []
                },
                "124805": {
                    "id": 124805,
                    "body": "No idea about whatever the product is but who wants this dog?",
                    "date": "2020-02-06T00:00:00.000Z",
                    "answerer_name": "edt123343",
                    "helpfulness": 1,
                    "photos": []
                },
                "124806": {
                    "id": 124806,
                    "body": "No idea about whatever the product is but who wants this dog?",
                    "date": "2020-02-06T00:00:00.000Z",
                    "answerer_name": "edt123343",
                    "helpfulness": 1,
                    "photos": []
                },
                "124807": {
                    "id": 124807,
                    "body": "No idea about whatever the product is but who wants this dog?",
                    "date": "2020-02-06T00:00:00.000Z",
                    "answerer_name": "edt123343",
                    "helpfulness": 1,
                    "photos": []
                },
                "124808": {
                    "id": 124808,
                    "body": "No idea about whatever the product is but who wants this dog?",
                    "date": "2020-02-06T00:00:00.000Z",
                    "answerer_name": "edt123343dasfs",
                    "helpfulness": 1,
                    "photos": []
                },
                "124809": {
                    "id": 124809,
                    "body": "No idea about whatever the product is but who wants this dog?",
                    "date": "2020-02-06T00:00:00.000Z",
                    "answerer_name": "edt123343dasfs",
                    "helpfulness": 1,
                    "photos": []
                },
                "124810": {
                    "id": 124810,
                    "body": "No idea about whatever the product is but who wants this dog?",
                    "date": "2020-02-06T00:00:00.000Z",
                    "answerer_name": "edt123343dasfs",
                    "helpfulness": 1,
                    "photos": []
                },
                "124811": {
                    "id": 124811,
                    "body": "No idea about whatever the product is but who wants this dog?",
                    "date": "2020-02-06T00:00:00.000Z",
                    "answerer_name": "edt123343dasfs",
                    "helpfulness": 1,
                    "photos": []
                },
                "124813": {
                    "id": 124813,
                    "body": "No idea about whatever the product is but who wants this dog?",
                    "date": "2020-02-06T00:00:00.000Z",
                    "answerer_name": "edt123343dasfs",
                    "helpfulness": 3,
                    "photos": [
                        "https://cdn.pixabay.com/photo/2015/03/26/09/54/pug-690566__480.jpg"
                    ]
                },
                "125012": {
                    "id": 125012,
                    "body": "Turducken ham andouille, salami t-bone beef ribs chicken landjaeger brisket short loin. Chislic jowl strip steak alcatra leberkas ham",
                    "date": "2020-08-22T00:00:00.000Z",
                    "answerer_name": "Seller",
                    "helpfulness": 3,
                    "photos": [
                        "https://images.unsplash.com/photo-1595929287357-74f1d41d5a5e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
                        "https://images.unsplash.com/photo-1591666364378-41827ac86234?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
                        "https://images.unsplash.com/photo-1562379325-53e142de2dee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
                        "https://images.unsplash.com/photo-1541787457429-b1766a4766b6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
                        "https://images.unsplash.com/photo-1502242938534-55f6b1b5f4e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
                    ]
                },
                "125013": {
                    "id": 125013,
                    "body": "Frankfurter bacon pork loin filet mignon, salami turducken turkey pork chop meatloaf kielbasa kevin",
                    "date": "2020-08-22T00:00:00.000Z",
                    "answerer_name": "Seller",
                    "helpfulness": 2,
                    "photos": [
                        "https://images.unsplash.com/photo-1512327536842-5aa37d1ba3e3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
                        "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
                        "https://images.unsplash.com/photo-1514989940723-e8e51635b782?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
                        "https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
                        "https://images.unsplash.com/photo-1459173422306-0ce3fb37f832?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
                    ]
                },
                "125019": {
                    "id": 125019,
                    "body": "gasgfsdf",
                    "date": "2020-08-25T00:00:00.000Z",
                    "answerer_name": "TESTER",
                    "helpfulness": 0,
                    "photos": []
                }
            }
        },
        {
            "question_id": 1,
            "question_body": "What fabric is the top made of?",
            "question_date": "2018-01-04T00:00:00.000Z",
            "asker_name": "yankeelover",
            "question_helpfulness": 9,
            "reported": 0,
            "answers": {
                "5": {
                    "id": 5,
                    "body": "Something pretty soft but I can't be sure",
                    "date": "2018-01-04T00:00:00.000Z",
                    "answerer_name": "metslover",
                    "helpfulness": 10,
                    "photos": [
                        "https://images.unsplash.com/photo-1530519729491-aea5b51d1ee1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80",
                        "https://images.unsplash.com/photo-1511127088257-53ccfcc769fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
                        "https://images.unsplash.com/photo-1500603720222-eb7a1f997356?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1653&q=80"
                    ]
                },
                "7": {
                    "id": 7,
                    "body": "Its the best! Seriously magic fabric",
                    "date": "2018-01-04T00:00:00.000Z",
                    "answerer_name": "metslover",
                    "helpfulness": 9,
                    "photos": []
                },
                "8": {
                    "id": 8,
                    "body": "DONT BUY IT! It's bad for the environment",
                    "date": "2018-01-04T00:00:00.000Z",
                    "answerer_name": "metslover",
                    "helpfulness": 8,
                    "photos": []
                },
                "95": {
                    "id": 95,
                    "body": "Supposedly suede, but I think its synthetic",
                    "date": "2018-12-04T00:00:00.000Z",
                    "answerer_name": "metslover",
                    "helpfulness": 3,
                    "photos": []
                }
            }
        },
        {
            "question_id": 35453,
            "question_body": "Does this test work?",
            "question_date": "2019-10-18T00:00:00.000Z",
            "asker_name": "Axel",
            "question_helpfulness": 0,
            "reported": 0,
            "answers": {}
        },
        {
            "question_id": 35477,
            "question_body": "What are the benefits of a onsie?",
            "question_date": "2020-01-31T00:00:00.000Z",
            "asker_name": "edt123",
            "question_helpfulness": 0,
            "reported": 0,
            "answers": {}
        }
    ]
};

// API Methods

// Get Question and Answers object - getProductQA
app.get(`/qa/:product_id`, async (req, res) => {
    const startTime = Date.now();
    const product_id = req.params.product_id;
    let result = await Question.find({ product_id: product_id });
    let QAObj = {
        product_id: product_id,
        results: result,
    }
    res.status(200);
    console.log('Page Loaded! Time Taken: ' + (Date.now() - startTime));
    res.send(QAObj);
});

//Post Question to API - createQuestion
app.post(`/qa/:product_id`, async (req, res) => {
    const startTime = Date.now();
    const product_id = req.params.product_id;
    let getTheID = await Question.find().sort({ question_id: -1 }).limit(1);
    let currentQID;
    if (getTheID.length > 0) {
        currentQID = getTheID[0].question_id + 1;
    } else {
        currentQID = 1;
    }
    const name = req.body.name;
    const email = req.body.email;
    const bodyQ = req.body.body;
    Question.create({
        product_id: product_id,
        question_id: currentQID,
        question_body: bodyQ,
        asker_name: name,
        answers: {
        },
    })
        .catch((err) => {
            console.log(err);
        })
    res.status(201);
    console.log('Question Complete! Time Taken: ' + (Date.now() - startTime));
    res.send('Question Created!');
});

//Post Answers to API - createAnswer
app.post(`/qa/:question_id/answers`, async (req, res) => {
    const startTime = Date.now();
    const question_id = req.params.question_id;
    const getAnswersID = await Answer.find().sort({ id: -1 }).limit(1);
    const currentAID = getAnswersID[0].id + 1;
    const name = req.body.name;
    const email = req.body.email;
    const body = req.body.body;
    const photos = req.body.photos;
    Answer.create({
        question_id: question_id,
        id: currentAID,
        body: body,
        answerer_name: name,
        photos: photos,
    })
        .then(async () => {
            const answer = await Answer.findOne({ id: currentAID });
            const question = await Question.findOne({ question_id: question_id });
            const product_id = await question.product_id;
            await Question.updateOne({ question_id: question_id }, { $set: { ['answers.' + `"${currentAID}"`]: answer } });
        })
    res.status(201)
    console.log(('Answer Complete! Time Taken: ' + (Date.now() - startTime)));
    res.send('Answer Created!');
});

// Put to mark a Question Helpful - markQuestionHelpful
app.put(`/qa/question/:question_id/helpful`, async (req, res) => {
    const startTime = Date.now();
    const question_id = req.params.question_id;
    await Question.findOneAndUpdate({question_id: question_id}, {$inc: {'question_helpfulness': 1}});
    console.log('Question Helpful Complete! Time Taken: ' + (Date.now() - startTime));
    res.send('Question Marked as Helpful!');
});

// Put to mark an Answer Helpful - markAnswerHelpful
app.put(`/qa/answer/:answer_id/helpful`, async (req, res) => {
    const startTime = Date.now();
    const answer_id = req.params.answer_id;
    await Answer.findOneAndUpdate({id: answer_id}, {$inc: {'helpfulness': 1}});
    const answer = await Answer.findOne({id: answer_id});
    const question_id = answer.question_id;
    await Question.findOneAndUpdate({question_id: question_id}, {$inc: {['answers.' + `"${answer_id}".` + 'helpfulness']: 1}})
    console.log('Answer Helpful Complete! Time Taken: ' + (Date.now() - startTime));
    res.send('Answer Marked as Helpful!');
});

// Put to Report a Question - reportQuestion
app.put(`/qa/question/:question_id/report`, async (req, res) => {
    const startTime = Date.now();
    const question_id = req.params.question_id;
    await Question.findOneAndRemove({question_id: question_id});
    console.log('Question Reported Complete! Time Taken: ' + (Date.now() - startTime));
    res.send('Question Reported!');
});

// Put to Report an Answer - reportAnswer
app.put(`/qa/answer/:answer_id/report`, async (req, res) => {
    const startTime = Date.now();
    const answer_id = req.params.answer_id;
    const answer = await Answer.findOne({id: answer_id});
    await Answer.findOneAndRemove({id: answer_id});
    const question_id = answer.question_id;
    await Question.findOneAndUpdate({question_id: question_id}, {$unset:{['answers.' + `"${answer_id}"`]: ""}})
    console.log('Answer Reported Complete! Time Taken: ' + (Date.now() - startTime));
    res.send('Answer Reported!');
});


app.listen(Port, () => {
    console.log(`Server is listening on Port ${Port}...`);
});
