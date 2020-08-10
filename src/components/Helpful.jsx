import React, { useState } from "react";
import { Grid, Typography, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// *** Helpful ***
// - link and count.
// - Increase and decreases when clicked. Only allow one click
// - used for both questions and answers. Pass in count value from props

const useStyles = makeStyles((theme) => ({
  helpfulStyles: {
    color: "inherit",
  },
  linkStyles: {
    color: "inherit",
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
      <Grid item xs={8}>
        <Typography>Helpful?</Typography>
      </Grid>

      <Grid item xs={3}>
        <Typography>
          <Link
            href="#"
            className={("helpfulClick", classes.linkStyles)}
            onClick={isHelpful}
          >
            Yes
          </Link>
        </Typography>
      </Grid>

      <Grid item xs={1}>
        <Typography className={`clicks-${count}`}>({count})</Typography>
      </Grid>
    </Grid>
  );
};

export default Helpful;
