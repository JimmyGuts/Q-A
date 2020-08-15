import React, { useState, useEffect } from "react";
import moment from "moment";
import { Grid, Typography, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Helpful from "./Helpful.jsx";
import Report from "./Report.jsx";
import AddAnswer from "./AddAnswer.jsx";

// Styles for the Q&A section
const useStyles = makeStyles((theme) => ({
  main: {
    maxHeight: "400px",
    overflow: "auto",
  },
  questionStyles: {
    textAlign: "left",
    color: "#101010",
    fontSize: ".5rem",
  },
  answerStyles: {
    textAlign: "left",
    color: "#777",
  },
}));

// Main Component for the Q&A List section
const MainQAList = ({ data }) => {
  const classes = useStyles();

  const questionList = data.map((question) => {
    return <Question question={question}/>
  });

  return <Box className={("main", classes.main)}>{questionList}</Box>;
};

// Component for the Questions
const Question = ({question}) => {
  const classes = useStyles();

  const answerList = Object.values(question.answers).map((answer) => 
     <Answers answer={answer} />
  );

  return (
    <Grid key={question.question_id} container>
      <Grid container item xs={8}>
        <Box mr={3}>
          <Typography>Q:</Typography>
        </Box>

        <Box>
          <Typography className="questionBody">
            {question.question_body}
          </Typography>
        </Box>
      </Grid>

      <Grid container item xs={4}>
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
          <Report className="reported" questionID={question.question_id} />
        </Box>
        <Box mx={1}>
          <Typography>|</Typography>
        </Box>
        <Box mx={1}>
          <AddAnswer questionID={question.question_id} />
        </Box>
      </Grid>

      <Grid container item xs={12}>
        <Typography>{answerList}</Typography>
      </Grid>
    </Grid>
  );
};

// Component for the Answers
const Answers = ({answer}) => {
  const classes = useStyles();

  return (
    <Grid container key={answer.id} className={classes.answerStyles}>
      <Grid container item>
        <Box mr={3}>
          <Typography>A:</Typography>
        </Box>
        <Box>
          <Typography className="answerBody">{answer.body}</Typography>
        </Box>
      </Grid>

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
          <Report className="reported" answerID={answer.id} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default MainQAList;
