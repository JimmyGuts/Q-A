import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Button, Link } from "@material-ui/core";
import SearchBar from "./SearchBar.jsx";
import AddQuestion from "./AddQuestion.jsx";

const useStyles = makeStyles((theme) => ({
  grid: {
    width: "100%",
    margin: "0px",
    background: "#F1F1F1",
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
          <SearchBar />
        </Grid>
        <Grid item xs={9}>
          <Paper className={classes.paper}>Q&A MESSAGES</Paper>
        </Grid>
        <Grid container item xs={3} justify={"space-evenly"}>
          <Grid item>
            Helpful <span>Yes</span> (2)
          </Grid>
          <Grid item>|</Grid>
          <Link href="#" color="inherit">
            Add Answer
          </Link>
        </Grid>
        <Grid container item xs={9}>
          <Grid item xs={4}>
            <Button variant="outlined" className={classes.button}>
              MORE ANSWERED QUESTIONS
            </Button>
          </Grid>
          <Grid item xs={4}>
            <AddQuestion />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default App;
