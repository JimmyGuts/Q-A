import React, { useState } from "react";
import { Grid, Typography, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// *** Helpful ***
// - link and count.
// - Increase and decreases when clicked. Only allow one click
// - used for both questions and answers. Pass in count value from props

const useStyles = makeStyles((theme) => ({
  helpfulStyles: {
    color: "purple",
  },
}));

const Helpful = ({ storedCount }) => {
  const classes = useStyles();
  const [count, setCount] = useState(storedCount);
  const [helpfulness, setHelpful] = useState(false);

  // Increases Count and toggle to helpful
  const incrementCount = () => {
    setCount((prevCount) => prevCount + 1);
    setHelpful((prevHelpful) => !prevHelpful);
  };

  // Decreases Count and toggle to not helpful
  const decrementCount = () => {
    setCount((prevCount) => prevCount - 1);
    setHelpful((prevHelpful) => !prevHelpful);
  };

  // Click handler conditional statement
  const isHelpful = () => {
    helpfulness ? decrementCount() : incrementCount();
  };

  return (
    <Grid container xs={12} className={classes.helpfulStyles}>
      <Typography>
        Helpful?
        <Link href="#" className={"helpfulClick"} onClick={isHelpful}>
          Yes
        </Link>
        <span className={`clicks-${count}`}>({count})</span>
      </Typography>
    </Grid>
  );
};

export default Helpful;
