import React, { useState } from "react";
import { Grid, Typography, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// Helpful link and count. Increase when clicked. Only allow one click

const useStyles = makeStyles((theme) => ({
  helpfulStyles: {
    color: "purple",
  },
}));

const Helpful = () => {
  const classes = useStyles();
  const [count, setCount] = useState(3);
  const [helpfulness, setHelpful] = useState(false);

  const incrementCount = () => {
    setCount((prevCount) => prevCount + 1);
    setHelpful(() => true);
  };

  const decrementCount = () => {
    setCount((prevCount) => prevCount - 1);
    setHelpful((prevHelpful) => !prevHelpful);
  };

  const isHelpful = () => {
    helpfulness ? decrementCount() : incrementCount();
  };

  return (
    <Grid container xs={12} className={classes.helpfulStyles}>
      <Typography>
        Helpful?
        <Link href="#" onClick={isHelpful}>
          Yes
        </Link>
        ({count})
      </Typography>
    </Grid>
  );
};

export default Helpful;
