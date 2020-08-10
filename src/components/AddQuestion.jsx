import React from "react";
import { Grid, Button, Icon } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

//  * Ask a Question Modal Form Elements/Details *
//  Access: Ask a question Modal should pop up when button is clicked

//  1. User Question (required) -
//    a. textarea
//    b. Max 1000 characters

//  2. User nickname (required)
//    a. input
//    b. Max 60 characters
//    c. placeholder = "Example: jackson11!"
//    d. text under = “For privacy reasons, do not use your full name or email address”

//  3. User email (required)
//    a. input (email)
//    c. placeholder = "Example: jack@email.com"
//    b. Max 60 characters
//    d. text under = “For authentication reasons, you will not be emailed”

//  4. Submit Button
//    a. button, should validate inputs when clicked
//    b. placeholder = “Why did you like the product or not?”
//    c. if any fields are invalid
//      i.  prevent submission
//      ii. give warning message = “You must enter the following: {...} ”
//    d. field is invalid if any required field is blank or email is not in correct format

const AddQuestion = () => {
  return (
    <Grid container spacing={3} justify="flex-start" alignItems="center">
      <Grid item>
        <Button variant="outlined" endIcon={<AddIcon />}>
          ADD A QUESTION
        </Button>
      </Grid>
    </Grid>
  );
};

export default AddQuestion;
