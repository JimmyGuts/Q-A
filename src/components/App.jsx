import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, Typography, Box } from "@material-ui/core";
import SearchBar from "./SearchBar.jsx";
import AddQuestion from "./AddQuestion.jsx";
import MainQAList from "./MainQAList.jsx";
import sampleData from "../sampleQuestion";

const useStyles = makeStyles((theme) => ({
  grid: {
    width: "100%",
    margin: "0px",
    background: "#white",
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
    <Grid container className={classes.grid} direction="column">
      <Grid item>
        <Typography id="title">QUESTIONS & ANSWERS</Typography>
      </Grid>

      <Grid container item xs={12} className={classes.grid}>
        <Grid item xs={12}>
          <SearchBar id="searchBar" />
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <MainQAList data={sampleData} />
      </Grid>

      <Grid container item>
        <Box mx={1} mt={2}>
          <Button
            id="moreQuestions"
            variant="outlined"
            className={classes.button}
          >
            <Typography variant="button">MORE ANSWERED QUESTIONS</Typography>
          </Button>
        </Box>

        <Box mx={1} mt={2}>
          <AddQuestion id="addQuestion" />
        </Box>
      </Grid>
    </Grid>
  );
};

export default App;
