import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SearchBar from "./SearchBar.jsx";
import AddQuestion from "./AddQuestion.jsx";
import MainQAList from "./MainQAList.jsx";
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
    maxHeight: "50%",
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
  button: {
    color: "inherit",
  },
}));

// Overall App Component
const App = ({ productID }) => {
  const classes = useStyles();

  // Variable for the Current Product
  let product_id = productID !== undefined ? productID : 32;
  // productID !== undefined ? productID : parseInt(Math.random() * 100);

  // Hooks
  const [isLoaded, setIsLoaded] = useState(false);
  const [product, setProduct] = useState(sampleData);
  const [query, setQuery] = useState("");
  const [questionCount, setQuestionCount] = useState(2);

  // Request to get the specified Product's Questions and Answers.
  useEffect(() => {
    updateDisplay();
  }, []);

  const updateDisplay = () => {
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
        if (
          currentAnswer.body.toLowerCase().includes(query) ||
          currentAnswer.answerer_name.toLowerCase().includes(query)
        ) {
          found = true;
        }
      }
      if (found) {
        filteredResults.push(currentQuestion);
      }
    }
    return filteredResults;
  };
  let filteredData = filter();

  // Update number of Questions displayed
  const updateQuestionCount = () => {
    setQuestionCount((prevCount) => prevCount + 2);
  };

  if (!isLoaded) {
    return (
      <Grid container justify="center" alignItems="center">
        <CircularProgress size={300} />
      </Grid>
    );
  } else {
    return (
      <Grid container className={classes.grid}>
        <Grid item>
          <Typography id="title">QUESTIONS & ANSWERS</Typography>
        </Grid>

        <Grid container item xs={12}>
          <Grid item xs={12}>
            <SearchBar id="searchBar" setQuery={setQuery} />
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <MainQAList
            data={filteredData.slice(0, questionCount)}
            updateDisplay={updateDisplay}
          />
        </Grid>

        <Grid container item>
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
