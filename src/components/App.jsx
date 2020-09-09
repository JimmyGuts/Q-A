import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SearchBar from "./SearchBar.jsx";
import AddQuestion from "./AddQuestion.jsx";
import MainQAList from "./MainQAList.jsx";
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
    maxHeight: "50%",
    background: "#white",
    direction: "column",
    justify: "space-evenly",
    alignItems: "stretch",
  },
  button: {
    color: "inherit",
  },
}));

// Overall App Component
const App = ({ productID }) => {
  const classes = useStyles();

  // Variable for the Current Product
  let product_id = productID;

  // Hooks
  const [isLoaded, setIsLoaded] = useState(false);
  const [product, setProduct] = useState({ results: [] });
  const [questionCount, setQuestionCount] = useState(2);
  const [query, setQuery] = useState("");

  // Request to get the specified Product's Questions and Answers.
  useEffect(() => {
    updateDisplay();
  }, []);

  const updateDisplay = () => {
    setIsLoaded(false);
    getProductQA(product_id).then((results) => {
      setProduct(results);
      setIsLoaded(true);
    });
  };

  // Search query filter function
  let filter = () => {
    let questionsArray = product.results;
    let filteredResults = [];
    for (let i = 0; i < questionsArray.length; i++) {
      let found = false;
      let currentQuestion = questionsArray[i];
      if (currentQuestion.question_body.toLowerCase().includes(query)) {
        found = true;
      }
      for (let key in currentQuestion.answers) {
          let currentAnswer = currentQuestion.answers[key];
          if ((currentAnswer.body) !== undefined){
          if (
            currentAnswer.body.toLowerCase().includes(query) ||
            currentAnswer.answerer_name.toLowerCase().includes(query)
          ) {
            found = true;
          }
        } else {
          continue;
        }
      }
      if (found) {
        filteredResults.push(currentQuestion);
      }
    }
    return filteredResults;
  };

  const handleSearch = (value) => {
    setQuery(value);
  };
  let filteredData = filter("");

  // Update number of Questions displayed
  const updateQuestionCount = () => {
    setQuestionCount((prevCount) => prevCount + 2);
  };

  if (!isLoaded) {
    return (
      <Grid container justify="center" alignItems="center">
        <CircularProgress size={200} />
      </Grid>
    );
  } else {
    return (
      <Grid container className={classes.grid}>
        <Grid item>
          <Typography id="title" variant="h5">
            QUESTIONS & ANSWERS
          </Typography>
        </Grid>

        <Grid container item xs={12}>
          <Grid item xs={12} style={{ marginBottom: "15px" }}>
            <SearchBar id="searchBar" handleSearch={handleSearch} />
          </Grid>
        </Grid>

        <Grid container item xs={12} style={{ marginBottom: "15px" }}>
          <MainQAList
            data={filteredData.slice(0, questionCount)}
            updateDisplay={updateDisplay}
          />
        </Grid>

        <Grid container item xs={12} style={{ marginBottom: "20px" }}>
          <Box mx={1} mt={2}>
            {filteredData.length > questionCount ? (
              <Button
                id="moreQuestions"
                className={classes.button}
                variant="outlined"
                color="inherit"
                onClick={updateQuestionCount}
              >
                <Typography variant="button">
                  MORE ANSWERED QUESTIONS
                </Typography>
              </Button>
            ) : null}
          </Box>

          <Box mx={1} mt={2}>
            <AddQuestion
              id="addQuestion"
              productID={product_id}
              updateDisplay={updateDisplay}
            />
          </Box>
        </Grid>
      </Grid>
    );
  }
};

export default App;
