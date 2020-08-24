import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Helpful from "./Helpful.jsx";
import Report from "./Report.jsx";
import AddAnswer from "./AddAnswer.jsx";
import AddPhotos from "./AddPhotos.jsx";
import moment from "moment";
import { Grid, Typography, Box, Link } from "@material-ui/core";

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
    color: "#606060",
  },
  answerDetail: {
    color: "#909090",
  },
  seller: {
    fontWeight: "Bold",
    color: "black",
  },
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
  const [sortedAnswers, sortAnswers] = useState([]);

  // Function to Sort by seller then most helpful.
  useEffect(() => {
    let ordered = Object.entries(question.answers).sort(function (a, b) {
      return b[1].helpfulness - a[1].helpfulness;
    });

    let sellers = [];
    for (let i = ordered.length - 1; i >= 0; i--) {
      if (ordered[i][1].answerer_name.toLowerCase() === "seller") {
        sellers.push(ordered[i]);
        ordered.splice(i, 1);
      }
    }
    let appliedSort = [...sellers, ...ordered];
    sortAnswers(appliedSort);
  }, []);

  let totalAnswers = sortedAnswers.length;

  // Update number of Answers displayed
  const updateAnswerCount = () => {
    setAnswerCount((prevCount) => (prevCount === 2 ? totalAnswers : 2));
  };
  const answerList = sortedAnswers
    .slice(0, answerCount)
    .map((answer) => (
      <Answers
        key={answer[0]}
        answer={answer[1]}
        updateDisplay={updateDisplay}
      />
    ));

  return (
    <Grid key={question.question_id} container style={{ marginBottom: 30 }}>
      <Grid container item xs={8}>
        <Grid container item xs={1}>
          <Box>
            <Typography>Q:</Typography>
          </Box>
        </Grid>
        <Grid container item xs={11}>
          <Box ml={-3}>
            <Typography className="questionBody">
              {question.question_body}
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Grid container item xs={4}>
        <Box paddingLeft={2} paddingRight={2}>
          <Helpful
            storedCount={question.question_helpfulness}
            questionID={question.question_id}
          />
        </Box>

        <Box>
          <Report className="reported" questionID={question.question_id} />
        </Box>

        <Box>
          <AddAnswer
            questionID={question.question_id}
            updateDisplay={updateDisplay}
          />
        </Box>
      </Grid>

      <Grid container item xs={12}>
        <Typography>{answerList}</Typography>
      </Grid>

      <Grid container item xs={12}>
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
    <Grid
      container
      key={answer.id}
      className={classes.answerStyles}
      style={{ marginBottom: 10 }}
    >
      <Grid container item xs={12}>
        <Grid container item xs={1}>
          <Box>
            <Typography>A:</Typography>
          </Box>
        </Grid>
        <Grid container item xs={9}>
          <Box ml={-4}>
            <Typography className="answerBody">{answer.body}</Typography>
          </Box>
        </Grid>
      </Grid>

      <Grid container item xs={12}>
        <Box ml={5} paddingRight={2} marginBottom={1}>
          <Typography
            variant="caption"
            id="answerName"
            className={classes.answerDetail}
          >
            {"by "}
            <Typography
              display="inline"
              variant="caption"
              className={
                (classes.answerDetail,
                answer.answerer_name.toLowerCase() === "seller"
                  ? classes.seller
                  : null)
              }
            >
              {answer.answerer_name}
            </Typography>
            , {moment(answer.date).format("LL")}
          </Typography>
        </Box>

        <Box
          className={classes.answerDetail}
          marginBottom={1}
          borderColor="#3f50b5"
          borderLeft={2}
          paddingLeft={2}
          paddingRight={2}
        >
          <Helpful storedCount={answer.helpfulness} answerID={answer.id} />
        </Box>

        <Box className={classes.answerDetail}>
          <Report className="reported" answerID={answer.id} />
        </Box>
      </Grid>

      <Grid container item xs={12}>
        {answer.photos.map((photo, i) => (
          <AddPhotos key={i} photo={photo} />
        ))}
      </Grid>
    </Grid>
  );
};

export default MainQAList;
