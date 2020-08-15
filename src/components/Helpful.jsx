import React, { useState } from "react";
import { Grid, Typography, Link, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {markQuestionHelpful, markAnswerHelpful} from "../components/RequestAPI.jsx";

// *** Helpful ***
// - link and count.
// - Increase and decreases when clicked. Only allow one click
// - used for both questions and answers. Pass in count value from props

const useStyles = makeStyles((theme) => ({
  helpfulStyles: {
    color: "inherit",
  },
  linkStyles: {
    color: "inherit",
  },
}));

const Helpful = ({ storedCount, questionID , answerID}) => {
  const classes = useStyles();
  const [count, setCount] = useState(storedCount);
  const [helpfulness, setHelpful] = useState(false);


  // Increases Count and toggle to helpful
  const incrementQuestionCount = () => {
    markQuestionHelpful(questionID)
    .then(() => setCount((prevCount) => prevCount + 1))
    .then(() => setHelpful((prevHelpful) => !prevHelpful))
  };

  // Increases Count and toggle to helpful
  const incrementAnswerCount = () => {
    markAnswerHelpful(answerID)
    .then(() => setCount((prevCount) => prevCount + 1))
    .then(() => setHelpful((prevHelpful) => !prevHelpful))
  };

  // Click handler conditional statement
  const isHelpful = () => {
    if (!helpfulness && questionID) {
      incrementQuestionCount();
    } else if (!helpfulness && answerID) {
      incrementAnswerCount();
    }
  };

  return (
    <Grid container className={classes.helpfulStyles}>
      <Box>
        <Typography variant="caption">Helpful?</Typography>
      </Box>

      <Box mx={1}>
        <Typography variant="caption">
          <Link
            href="#"
            id="helpfulClick"
            className={classes.linkStyles}
            onClick={isHelpful}
            color="secondary"
          >
            Yes
          </Link>
        </Typography>
      </Box>

      <Box>
        <Typography
          variant="caption"
          className={`clicks-${count}`}
          style={helpfulness ? { color: "green" } : { color: "inherit" }}
        >
          ({count})
        </Typography>
      </Box>
    </Grid>
  );
};

export default Helpful;
