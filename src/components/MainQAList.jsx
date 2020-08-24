import React, { useState } from "react";
import moment from "moment";
import {
  Grid,
  Typography,
  Box,
  Link,
  Card,
  CardMedia,
  CardContent,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Helpful from "./Helpful.jsx";
import Report from "./Report.jsx";
import AddAnswer from "./AddAnswer.jsx";
import AddPhotos from "./AddPhotos.jsx";

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
  seller: {
    fontWeight: "Bold",
    color: "black",
  },
  // separator: {
  //   color="secondary"
  // },
}));

// Main Component for the Q&A List section
const MainQAList = ({ data, updateDisplay }) => {
  const classes = useStyles();

  const questionList = data.map((question) => {
    return (
      <Question
        key={question.question_id}
        question={question}
        updateDisplay={updateDisplay}
      />
    );
  });

  return <Box className={("main", classes.main)}>{questionList}</Box>;
};

// Component for the Questions
const Question = ({ question, updateDisplay }) => {
  const classes = useStyles();
  const [answerCount, setAnswerCount] = useState(2);
  let totalAnswers = Object.values(question.answers).length;

  // Update number of Answers displayed
  const updateAnswerCount = () => {
    setAnswerCount((prevCount) => (prevCount === 2 ? totalAnswers : 2));
  };
  const answerList = Object.values(question.answers)
    .slice(0, answerCount)
    .map((answer) => (
      <Answers key={answer.id} answer={answer} updateDisplay={updateDisplay} />
    ));

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
          <Typography color="primary">|</Typography>
        </Box>
        <Box mx={1}>
          <Report className="reported" questionID={question.question_id} />
        </Box>
        <Box mx={1}>
          <Typography color="primary">|</Typography>
        </Box>
        <Box mx={1}>
          <AddAnswer
            questionID={question.question_id}
            updateDisplay={updateDisplay}
          />
        </Box>
      </Grid>

      <Grid container item xs={12}>
        <Typography>{answerList}</Typography>
      </Grid>

      <Grid container>
        {totalAnswers > 2 ? (
          <Link onClick={updateAnswerCount}>
            <Typography variant="caption">
              {answerCount === 2 ? "See All Answers" : "Collapse Answers"}
            </Typography>
          </Link>
        ) : null}
      </Grid>
    </Grid>
  );
};

// Component for the Answers
const Answers = ({ answer }) => {
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
            by{" "}
            <Typography
              display="inline"
              variant="caption"
              className={
                answer.answerer_name.toLowerCase() === "seller"
                  ? classes.seller
                  : null
              }
            >
              {answer.answerer_name}
            </Typography>
            , {moment(answer.date).format("LL")}
          </Typography>
        </Box>

        <Box mx={2}>
          <Typography variant="caption" color="primary">
            |
          </Typography>
        </Box>

        <Box mx={1}>
          <Helpful storedCount={answer.helpfulness} answerID={answer.id} />
        </Box>

        <Box mx={2}>
          <Typography variant="caption" color="primary">
            |
          </Typography>
        </Box>

        <Box mx={1}>
          <Report className="reported" answerID={answer.id} />
        </Box>
      </Grid>

      <Grid container item>
        {answer.photos.map((photo, i) => 
          <AddPhotos key={i} photo={photo} />
        )}
      </Grid>
    </Grid>
  );
};

export default MainQAList;
