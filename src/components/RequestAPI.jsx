import axios from "axios";

// ***************************
// *** API Requests Routes ***
// ***************************

const url = 'http://localhost:8080';

// Get Question and Answers object
const getProductQA = (product_id) => {
  return axios
    .get(url + `/qa/${product_id}/`, {
      params: {
        product_id: product_id,
        count: 100,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

//Post Question to API
const createQuestion = (productID, question) => {
  return axios
    .post(url + `/qa/${productID}/`, {
      name: question.name,
      email: question.email,
      body: question.body,
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};

//Post Answers to API
const createAnswer = (questionID, answer) => {
  return axios
    .post(`http://52.26.193.201:3000/qa/${questionID}/answers`, {
      name: answer.name,
      email: answer.email,
      body: answer.body,
      photos: answer.photos,
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};

// Put to mark a Question Helpful
const markQuestionHelpful = (question_id) => {
  return axios
    .put(`http://52.26.193.201:3000/qa/question/${question_id}/helpful`)
    .catch((error) => {
      console.log(error);
    });
};

// Put to mark an Answer Helpful
const markAnswerHelpful = (answer_id) => {
  return axios
    .put(`http://52.26.193.201:3000/qa/answer/${answer_id}/helpful`)
    .catch((error) => {
      console.log(error);
    });
};

// Put to Report a Question
const reportQuestion = (question_id) => {
  return axios
    .put(`http://52.26.193.201:3000/qa/question/${question_id}/report`)
    .catch((error) => {
      console.log(error);
    });
};

// Put to Report an Answer
const reportAnswer = (answer_id) => {
  return axios
    .put(`http://52.26.193.201:3000/qa/answer/${answer_id}/report`)
    .catch((error) => {
      console.log(error);
    });
};

export {
  getProductQA,
  createAnswer,
  createQuestion,
  markQuestionHelpful,
  markAnswerHelpful,
  reportQuestion,
  reportAnswer,
};
