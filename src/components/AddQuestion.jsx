import React, { useState } from "react";
import { createQuestion } from "./RequestAPI.jsx";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
import {
  Button,
  Grid,
  IconButton,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core/";

// ******************************
// *** Add Question Component ***
// ******************************

const AddQuestion = ({ productID, updateDisplay }) => {
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
    let valid = {};
    valid.name = name ? "" : "The Name field is required.";
    valid.email = /^\S+@\S+\.\S+$/.test(email) ? "" : "Email is not valid and is required.";
    valid.body = body ? "" : "The Question field is required.";
    setErrors({ ...valid });
    return Object.values(valid).every((field) => field === "");
  };

  // Function to handle form submission
  const handleSubmit = () => {
    if (validate()) {
      let question = {
        name: name,
        email: email,
        body: body,
      };
      createQuestion(productID, question)
        .then(handleCancel())
        .then(() => updateDisplay(productID));``
    }
  };

  // States that hold form values
  const [name, updateName] = useState("");
  const [email, updateEmail] = useState("");
  const [body, updateBody] = useState("");
  const [errors, setErrors] = useState({});

  return (
    <div>
      <Button
        id="openAddQuestion"
        variant="outlined"
        color="inherit"
        onClick={handleClickOpen}
        endIcon={<AddIcon color="primary" />}
      >
        ADD A QUESTION
      </Button>
      <Dialog
        id="questionDialog"
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
          Add a Question
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a question for this product please enter a nickname and email
            address along with your question.
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
            placeholder="Example: jackson11!"
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
            id={("standard-textarea", "question")}
            label="Question"
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
            placeholder="What is your question about the product?"
          />
        </DialogContent>
        <DialogActions>
          <Button id="cancelButton" onClick={handleCancel} color="inherit">
            Cancel
          </Button>
          <Button id="submitButton" onClick={handleSubmit} color="inherit">
            Submit Question
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddQuestion;
