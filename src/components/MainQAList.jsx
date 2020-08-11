import React from "react";
import { Grid, Typography, Link, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Helpful from "./Helpful.jsx";
import moment from "moment";

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

// Component for the Q&A List section
const MainQAList = ({ data }) => {
  const classes = useStyles();

  const questionList = data.results.map((question) => {
    return Question(question);
  });

  return <Box>{questionList}</Box>;
};

// Component for the Questions
const Question = (question) => {
  const classes = useStyles();

  const answerList = Object.values(question.answers).map((answer) => {
    return Answers(answer);
  });

  return (
    <Grid container>
      <Grid container xs={9}>
        <Box mr={3}>
          <Typography>Q:</Typography>
        </Box>

        <Box>
          <Typography>{question.question_body}</Typography>
        </Box>
      </Grid>

      <Grid container xs={3}>
        <Box mx={1}>
          <Helpful storedCount={5} />
        </Box>
        <Box mx={1}>
          <Typography>|</Typography>
        </Box>
        <Box mx={1}>
          <Link id="AddAnswer" href="#" color="inherit">
            <Typography variant="caption">Add Answer</Typography>
          </Link>
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
    <Grid container key={answer.id} className={classes.answerStyles} xs={12}>
      <Box mr={3}>
        <Typography>A:</Typography>
      </Box>
      <Box>
        <Typography>{answer.body}</Typography>
      </Box>

      <Grid container item>
        <Box ml={5}>
          <Typography variant="caption">
            by {answer.answerer_name}, {moment(answer.date).format("LL")}
          </Typography>
        </Box>
        <Box mx={2}>
          <Typography variant="caption">|</Typography>
        </Box>
        <Box mx={1}>
          <Helpful storedCount={answer.helpfulness} />
        </Box>
        <Box mx={2}>
          <Typography variant="caption">|</Typography>
        </Box>
        <Box mx={1}>
          <Typography variant="caption">
            <Link
              href="#"
              color="inherit"
              onClick={() => {
                alert("Reported!!!");
              }}
            >
              Report
            </Link>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default MainQAList;
