import React, { useState } from "react";
import { Button, Link, Grid, IconButton } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import {createAnswer} from "./RequestAPI.jsx";

//  * Answer a Question Modal Form Elements/Details *
//  Access: From the answer link on each question

//  1. Your Answer (required) -
//    a. textarea
//    b. Max 1000 characters

//  2. What is your nickname (required)
//    a. input
//    b. Max 60 characters
//    c. placeholder = "Example: jack543!"
//    d. text under = “For privacy reasons, do not use your full name or email address”

//  3. Your email (required)
//    a. input (email)
//    b. Max 60 characters
//    c. placeholder = "Example: jack@email.com"
//    d. text under = “For authentication reasons, you will not be emailed”

//  4. Upload your photos
//    a. button, when clicked, open a window where images can be selected
//    b. after upload, a thumbnail showing the image should appear
//    c. allow 5 images to be uploaded
//    d. button disappears after 5 images upload

//  5. Submit Answer
//    a. button, should validate inputs when clicked
//    b. placeholder = “Why did you like the product or not?”
//    c. if any fields are invalid
//      i.  prevent submission
//      ii. give warning message = “You must enter the following: {...} ”
//    d. field is invalid if any required field is blank or email is not in correct format
//    e. images selected are invalid or unable to be uploaded

const AddAnswer = ({questionID}) => {
  // Functions to handle Modal Open, Close, Cancel
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleCancel = () => {
    resetFields();
    setOpen(false);
  };

  // Function to reset state values
  const resetFields = () => {
    updateName("");
    updateEmail("");
    updateBody("");
    setErrors({});
  };

  // Function to handle field validation
  const validate = () => {
    let temp = {};
    temp.name = name ? "" : "The Name field is required.";
    temp.email = /^\S+@\S+\.\S+$/.test(email)
      ? ""
      : "Email is not valid and is required.";
    temp.body = body ? "" : "The Answer field is required.";
    setErrors({ ...temp });
    return Object.values(temp).every((field) => field === "");
  };

  // Function to handle form submission
  const handleSubmit = () => {
    if (validate()) {
      let answer = {
        name: name,
        email: email,
        body: body
      }
      // Submit Form Values to API Post request
      // Then reset forms and close modal
      createAnswer(questionID, answer)
      resetFields();
      handleClose();
    }
  };

  // States that hold form values
  const [name, updateName] = useState("");
  const [email, updateEmail] = useState("");
  const [body, updateBody] = useState("");
  const [errors, setErrors] = useState({});

  return (
    <div>
      <Link
        id="openAddAnswer"
        variant="caption"
        color="inherit"
        onClick={handleClickOpen}
      >
        Add Answer
      </Link>
      <Dialog
        id="answerDialog"
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          <Grid container justify="flex-end" alignItems="flex-start">
            <IconButton
              id="closeIcon"
              edge="end"
              size="small"
              color="secondary"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Grid>
          Add a Answer
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a answer to this question please enter your name and email
            address along with your answer.
          </DialogContentText>
          <TextField
            margin="dense"
            id="name"
            label="Name"
            type="text"
            value={name}
            fullWidth
            required
            defaultValue={name}
            onChange={(event) => {
              updateName(event.target.value);
            }}
            {...(errors.name && { error: true, helperText: errors.name })}
            {...(!errors.name && {
              helperText:
                "For privacy reasons, do not use your full name or email address",
            })}
            inputProps={{ maxLength: 60 }}
            placeholder="Example: jack543!"
          />
          <TextField
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            value={email}
            fullWidth
            required
            defaultValue={email}
            onChange={(event) => {
              updateEmail(event.target.value);
            }}
            {...(errors.email && { error: true, helperText: errors.email })}
            {...(!errors.email && {
              helperText: "For authentication reasons, you will not be emailed",
            })}
            inputProps={{ maxLength: 60 }}
            placeholder="Example: jack@email.com"
          />
          <TextField
            id={("standard-textarea", "answer")}
            label="Answer"
            fullWidth
            multiline
            required
            value={body}
            defaultValue={body}
            onChange={(event) => {
              updateBody(event.target.value);
            }}
            {...(errors.body && { error: true, helperText: errors.body })}
            inputProps={{ maxLength: 1000 }}
            placeholder="What is your answer to this question?"
          />
        </DialogContent>
        <DialogActions>
          <Button id="cancelButton" onClick={handleCancel} color="inherit">
            Cancel
          </Button>
          <Button id="submitButton" onClick={handleSubmit} color="inherit">
            Submit Answer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddAnswer;
