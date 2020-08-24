import React, { useState } from "react";
import { createAnswer } from "./RequestAPI.jsx";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import UploadPhotos from "./UploadPhotos.jsx";
import {
  Button,
  Link,
  Box,
  Grid,
  IconButton,
  Typography,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

// ****************************
// *** Add Answer Component ***
// ****************************

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 80,
    maxHeight: 80,
    margin: "10px 10px",
  },
}));

const AddAnswer = ({ questionID, updateDisplay }) => {
  const classes = useStyles();

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
    updatePhotos("");
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
        body: body,
        photos: photos,
      };

      createAnswer(questionID, answer)
        .then(handleCancel())
        .then(() => updateDisplay());
    }
  };

  // States that hold form values
  const [name, updateName] = useState("");
  const [email, updateEmail] = useState("");
  const [body, updateBody] = useState("");
  const [photos, updatePhotos] = useState([]);
  const [errors, setErrors] = useState({});

  return (
    <React.Fragment>
      <Box paddingLeft={2} borderLeft={2} borderColor="#3f50b5">
        <Link
          id="openAddAnswer"
          variant="caption"
          color="inherit"
          onClick={handleClickOpen}
        >
          Add Answer
        </Link>
      </Box>
      <Dialog
        id="answerDialog"
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          <Grid container>
            <Grid container item xs={11}>
              <Typography variant="h6">Add a Answer</Typography>
            </Grid>
            <Grid container item xs={1}>
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
          </Grid>
        </DialogTitle>
        <DialogContent>
          <DialogContentText variant="body1">
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
            onChange={(event) => {
              updateBody(event.target.value);
            }}
            {...(errors.body && { error: true, helperText: errors.body })}
            inputProps={{ maxLength: 1000 }}
            placeholder="What is your answer to this question?"
          />

          <UploadPhotos updatePhotos={updatePhotos} />
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
    </React.Fragment>
  );
};

export default AddAnswer;
