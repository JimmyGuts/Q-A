import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SearchBar from "./SearchBar.jsx";
import AddQuestion from "./AddQuestion.jsx";
import MainQAList from "./MainQAList.jsx";
import sampleData from "../sampleQuestion";
import { getProductQA } from "../components/RequestAPI.jsx";
import {
  Grid,
  Button,
  Typography,
  Box,
  CircularProgress,
} from "@material-ui/core";

// Styles for overall component
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

// Overall App Component
const App = ({productID}) => {
  const classes = useStyles();

  // Variable for the Current Product
  let product_id = productID !== undefined ? productID : 80;
  
  // Question Objects from API
  const [isLoaded, setIsLoaded] = useState(false);
  const [product, setProduct] = useState(sampleData);

  // Request to get the specified Product's Questions and Answers.
  useEffect(() => {
      getProductQA(product_id)
      .then((results) => {
        setProduct(results)
        setIsLoaded(true)
      }) 
  }, []);

  if (!isLoaded) {
    return (
      <Grid container justify="center" alignItems="center">
        <CircularProgress size={300} />
      </Grid>
    );
  } else {
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
          <MainQAList data={product} />
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
  }
};

export default App;
