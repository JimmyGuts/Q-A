import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Button, Link } from "@material-ui/core";
import SearchBar from "./SearchBar.jsx";
import AddQuestion from "./AddQuestion.jsx";
import MainQAList from "./MainQAList.jsx";
import Helpful from "./Helpful.jsx";

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
    background: "FFF",
  },
}));

const App = () => {
  const classes = useStyles();
  return (
    <Grid container spacing={5} className={classes.grid}>
      <span id="title">QUESTIONS & ANSWERS</span>
      <Grid container item xs={12} spacing={2} className={classes.grid}>
        <Grid id="searchBar" item xs={12}>
          <SearchBar />
        </Grid>
        <Grid container item xs={9} direction="column">
          <Paper item className={classes.paper}>
            <MainQAList />
          </Paper>
        </Grid>
        <Grid container item xs={3} justify={"space-evenly"}>
          <Grid id="helpfulQuestion" item>
            <Helpful storedCount={5}/>
          </Grid>
          <Grid item>|</Grid>
          <Link id="AddAnswer" href="#" color="inherit">
            Add Answer
          </Link>
        </Grid>
        <Grid container item xs={9}>
          <Grid item xs={4}>
            <Button variant="outlined" className={classes.button}>
              MORE ANSWERED QUESTIONS
            </Button>
          </Grid>
          <Grid id="addQuestion" item xs={4}>
            <AddQuestion />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default App;
