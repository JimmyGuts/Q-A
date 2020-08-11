import React from "react";
import { Button, Link } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

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

const AddAnswer = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Link variant="caption" color="inherit" onClick={handleClickOpen}>
        Add Answer
      </Link>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add a Question</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a answer to this question please enter a nickname and email
            address along with your answer.
          </DialogContentText>
          <TextField
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            required
            inputProps={{ maxLength: 60 }}
            placeholder="Example: jack543!"
            helperText="For privacy reasons, do not use your full name or email address"
          />
          <TextField
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            required
            inputProps={{ maxLength: 60 }}
            placeholder="Example: jack@email.com"
            helperText="For authentication reasons, you will not be emailed"
          />
          <TextField
            id="standard-textarea"
            label="Answer"
            rows={2}
            fullWidth
            multiline
            required
            inputProps={{ maxLength: 1000 }}
            placeholder="What is your answer to this question?"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleClose} color="inherit">
            Submit Answer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddAnswer;
