import React, { useState } from "react";
import { Grid, Typography, Link, Box } from "@material-ui/core";
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
    <Grid container className={classes.helpfulStyles}>
      <Box>
        <Typography variant="caption">Helpful?</Typography>
      </Box>

      <Box mx={1}>
        <Typography variant="caption">
          <Link
            href="#"
            id="helpfulClick"
            className={classes.linkStyles}
            onClick={isHelpful}
          >
            Yes
          </Link>
        </Typography>
      </Box>

      <Box>
        <Typography variant="caption" className={`clicks-${count}`}>
          ({count})
        </Typography>
      </Box>
    </Grid>
  );
};

export default Helpful;
