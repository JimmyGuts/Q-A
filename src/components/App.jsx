import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  grid: {
    width: "100%",
    margin: "0px",
    background: "lightgrey",
    direction: "column",
    justify: "space-evenly",
    alignItems: "stretch",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    background: theme.palette.success.light,
  },
}));

const App = () => {
  const classes = useStyles();
  return (
    <Grid container spacing={5} className={classes.grid}>
      <span id="title">QUESTIONS & ANSWERS</span>
      <Grid container item xs={12} spacing={2} className={classes.grid}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            HAVE A QUESTION? SEARCH FOR ANSWERS...
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <Paper className={classes.paper}>Q&A MESSAGES</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>HELPFUL? ADD ANSWER</Paper>
        </Grid>
        <Grid item xs={9}>
          <Paper className={classes.paper}>
            MORE ANSWERED QUESTIONS ADD A QUESTION
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default App;
