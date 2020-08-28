const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/QA', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});


const Question = mongoose.model('question', {
  product_id: { type: Number },
  question_id: { type: Number, required: true, unique: true },
  question_body: { type: String, required: true },
  question_date: { type: Date, default: Date.now, required: true },
  asker_name: { type: String, required: true },
  question_helpfulness: { type: Number, default: 0 },
  reported: { type: Number, default: 0 },
  answers: { type: Object },
});

const Answer = mongoose.model('answer', {
  product_id: { type: Number },
  question_id: { type: Number},
  id: { type: Number, required: true, unique: true, default: 1 },
  body: { type: String },
  date: { type: Date, default: Date.now },
  answerer_name: { type: String },
  helpfulness: { type: Number, default: 0 },
  reported: { type: Number, default: 0},
  photos: { type: Array },
});

const QAs = mongoose.model('qas', {
  product_id: { type: Number, unique: true },
  results: { type: Array },
});

module.exports= { Question, Answer, QAs };

