const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/QA', {useNewUrlParser: true, useUnifiedTopology: true});

const Question = mongoose.model('question', {
  question_id: { type: Number, required: true, unique: true },
  question_body: { type: String, required: true },
  question_date: { type: Date, default: Date.now, required: true },
  asker_name: { type: String, required: true },
  question_helpfulness: { type: Number, default: 0 },
  reported: { type: Number, default: 0 },
  answers: { any: Object },
});

const Answer = mongoose.model('answer', {
  id: { type: Number, unique: true },
  body: { type: String },
  date: { type: Date, default: Date.now },
  answerer_name: { type: String },
  helpfulness: { type: Number, default: 0 },
  photos: { any: Array },
});

const QAs = mongoose.model('qas', {
  product_id: { type: String },
  results: { type: Array },
});

module.exports= {
  Question: Question,
  Answer: Answer,
  QAs: QAs,
}
