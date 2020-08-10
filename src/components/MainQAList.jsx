import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Helpful from "./Helpful.jsx";

const useStyles = makeStyles((theme) => ({
  questionStyles: {
    textAlign: "left",
    color: "red",
  },
  answerStyles: {
    textAlign: "left",
    color: "blue",
  },
}));

const MainQAList = () => {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid container>
        <Question />
      </Grid>

      <Grid container alignItems="flex-start">
        <Answers />
      </Grid>
    </Grid>
  );
};

const Question = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.questionStyles}>
      <Grid item xs={1}>
        <Typography>Q:</Typography>
      </Grid>
      <Grid item xs={11}>
        <Typography>
          Who What Which When where why whether how? Who What Which When where
          why whether how? Who What Which When where why whether how?
        </Typography>
      </Grid>
    </Grid>
  );
};

const Answers = () => {
  const classes = useStyles();
  const username = "User1234";
  const date = "January 1, 2019";

  return (
    <Grid container className={classes.answerStyles}>
      <Grid item xs={1}>
        <Typography>A:</Typography>
      </Grid>
      <Grid item xs={11}>
        <Typography>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam,
          deserunt. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Nam, deserunt.
        </Typography>
        <Grid container item>
          <Typography>
            by {username} {date}
          </Typography>
          <Typography>. | .</Typography>
          <Helpful />
          <Typography>. | .</Typography>
          <Typography>Report</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MainQAList;
