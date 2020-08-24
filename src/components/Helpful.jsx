import React, { useState } from "react";
import { Grid, Typography, Link, Box } from "@material-ui/core";
import {
  markQuestionHelpful,
  markAnswerHelpful,
} from "../components/RequestAPI.jsx";

// *************************
// *** Helpful Component ***
// *************************

const Helpful = ({ storedCount, questionID, answerID }) => {
  const [count, setCount] = useState(storedCount);
  const [helpfulness, setHelpful] = useState(false);

  // Answers: Increases Count and toggle to helpful
  const incrementQuestionCount = () => {
    markQuestionHelpful(questionID)
      .then(() => setCount((prevCount) => prevCount + 1))
      .then(() => setHelpful((prevHelpful) => !prevHelpful));
  };

  // Questions: Increases Count and toggle to helpful
  const incrementAnswerCount = () => {
    markAnswerHelpful(answerID)
      .then(() => setCount((prevCount) => prevCount + 1))
      .then(() => setHelpful((prevHelpful) => !prevHelpful));
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
    <Grid container>
      <Box>
        <Typography variant="caption">Helpful?</Typography>
      </Box>

      <Box mx={1}>
        <Typography variant="caption">
          <Link
            style={{ color: "inherit" }}
            id="helpfulClick"
            onClick={isHelpful}
          >
            Yes
          </Link>
        </Typography>
      </Box>

      <Box>
        <Typography
          variant="caption"
          className={`clicks-${count}`}
          style={helpfulness ? { color: "green" } : null}
        >
          ({count})
        </Typography>
      </Box>
    </Grid>
  );
};

export default Helpful;
