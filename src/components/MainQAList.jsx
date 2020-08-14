import React, { useState, useEffect } from "react";
import moment from "moment";
import { Grid, Typography, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Helpful from "./Helpful.jsx";
import Report from "./Report.jsx";
import AddAnswer from "./AddAnswer.jsx";

// Styles for the Q&A section
const useStyles = makeStyles((theme) => ({
  questionStyles: {
    textAlign: "left",
    color: "#101010",
  },
  answerStyles: {
    textAlign: "left",
    color: "#777",
  },
}));

// Main Component for the Q&A List section
const MainQAList = ({ data }) => {
  const questionList = data.results.map((question) => {
    return Question(question);
  });

  return <Box className="main">{questionList}</Box>;
};

// Component for the Questions
const Question = (question) => {
  const classes = useStyles();

  const answerList = Object.values(question.answers).map((answer) => {
    return Answers(answer);
  });

  return (
    <Grid key={question.question_id} container>
      <Grid container item xs={9}>
        <Box mr={3}>
          <Typography>Q:</Typography>
        </Box>

        <Box>
          <Typography className="questionBody">
            {question.question_body}
          </Typography>
        </Box>
      </Grid>

      <Grid container item xs={3}>
        <Box mx={1}>
          <Helpful
            storedCount={question.question_helpfulness}
            questionID={question.question_id}
          />
        </Box>
        <Box mx={1}>
          <Typography>|</Typography>
        </Box>
        <Box mx={1}>
          <AddAnswer />
        </Box>
      </Grid>

      <Grid container item xs={12}>
        <Typography>{answerList}</Typography>
      </Grid>
    </Grid>
  );
};

// Component for the Answers
const Answers = (answer) => {
  const classes = useStyles();

  return (
    <Grid container key={answer.id} className={classes.answerStyles}>
      <Box mr={3}>
        <Typography>A:</Typography>
      </Box>
      <Box>
        <Typography className="answerBody">{answer.body}</Typography>
      </Box>

      <Grid container item>
        <Box ml={5}>
          <Typography variant="caption" className="answerName">
            by {answer.answerer_name}, {moment(answer.date).format("LL")}
          </Typography>
        </Box>

        <Box mx={2}>
          <Typography variant="caption">|</Typography>
        </Box>

        <Box mx={1}>
          <Helpful storedCount={answer.helpfulness} answerID={answer.id} />
        </Box>

        <Box mx={2}>
          <Typography variant="caption">|</Typography>
        </Box>

        <Box mx={1}>
          <Report className="reported" />
        </Box>
      </Grid>
    </Grid>
  );
};

export default MainQAList;
