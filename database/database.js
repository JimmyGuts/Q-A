const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/QA', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
const Schema = mongoose.Schema;

const qSchema = new Schema ({
  product_id: { type: Number },
  question_id: { type: Number, required: true, unique: true },
  question_body: { type: String, required: true },
  question_date: { type: Date, default: Date.now, required: true },
  asker_name: { type: String, required: true },
  question_helpfulness: { type: Number, default: 0 },
  reported: { type: Number, default: 0 },
  answers: { type: Object, required: true, default: {} },
}, { minimize: false} );

const Question = mongoose.model('question', qSchema);

const aSchema = new Schema ({
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

const Answer = mongoose.model('answer', aSchema);


module.exports = { Question, Answer };

