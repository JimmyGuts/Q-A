import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SearchBar from "./SearchBar.jsx";
import AddQuestion from "./AddQuestion.jsx";
import MainQAList  from "./MainQAList.jsx";
import sampleData from "../sampleQuestion";
import { getProductQA } from "./RequestAPI.jsx";
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
    margin: "0 auto",
    maxWidth: "75%",
    maxHeight: "540px",
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
const App = ({ productID }) => {
  const classes = useStyles();

  // Variable for the Current Product
  let product_id = productID !== undefined ? productID : 64;


  // Hooks 
  const [isLoaded, setIsLoaded] = useState(false);
  const [product, setProduct] = useState(sampleData);
  const [query, setQuery] = useState(""); 
  
  // Request to get the specified Product's Questions and Answers.
  useEffect(() => {
    getProductQA(product_id)
    .then((results) => {
      setProduct(results);
      setIsLoaded(true);
    });
  }, []);

  // Search query filter function
  let filter = () => {  
    let questionsArray = product.results
    let filteredResults = []
    for (let i = 0; i < questionsArray.length; i++) {
      let found = false;
      let currentQuestion = questionsArray[i];
      if (currentQuestion.question_body.toLowerCase().includes(query) ) {
        found = true;
      }
      for ( let key in currentQuestion.answers ) {
        let currentAnswer = currentQuestion.answers[key];
        if ( currentAnswer.body.toLowerCase().includes(query) ) {
          found = true;
        } 
      }
      if (found) {
        filteredResults.push(currentQuestion);
      }
    }
    return filteredResults;
  } 
  let filteredData = filter()
 

  if (!isLoaded) {
    return (
      <Grid container justify="center" alignItems="center">
        <CircularProgress size={400} />
      </Grid>
    );
  } else {

    return (
      <Grid container className={classes.grid} >
        <Grid item>
          <Typography id="title">QUESTIONS & ANSWERS</Typography>
        </Grid>

        <Grid container item xs={12} >
          <Grid item xs={12}>
            <SearchBar id="searchBar" query={query} setQuery={setQuery}/>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <MainQAList data={filteredData} />
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
            <AddQuestion id="addQuestion" productID={product_id} />
          </Box>
        </Grid>
      </Grid>
    );
  }
};

export default App;
