import React, { useState } from "react";
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
  // Functions to handle Modal Open, Close, Cancel
  const [open, setOpen] = React.useState(false);
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
    temp.email = /^\S+@\S+\.\S+$/.test(email) ? "" : "Email is not valid and is required.";
    temp.body = body ? "" : "The Answer field is required.";
    setErrors({ ...temp });
    return Object.values(temp).every((field) => field === "");
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault;
    if (validate()) {
      // window.alert("testing...");

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
      <Link variant="caption" color="inherit" onClick={handleClickOpen}>
        Add Answer
      </Link>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add a Answer</DialogTitle>
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
            id="standard-textarea"
            label="Answer"
            fullWidth
            multiline
            required
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
          <Button onClick={handleCancel} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="inherit">
            Submit Answer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

//   const [open, setOpen] = useState(false);

//   // States that hold form values
//   const [name, updateName] = useState("");
//   const [email, updateEmail] = useState("");
//   const [body, updateBody] = useState("");

//   // Are fields valid
//   const [nameIsValid, nameValidation] = useState(true);
//   const [emailIsValid, emailValidation] = useState(true);
//   const [bodyIsValid, bodyValidation] = useState(true);

//   // Toggles normal and error forms
//   const validateForm = () => {
//     name ? nameValidation(true) : nameValidation(false);
//     email ? emailValidation(true) : emailValidation(false);
//     body ? bodyValidation(true) : bodyValidation(false);
//   };

//   const handleSubmit = () => {
//     validateForm();
//     if (nameIsValid && emailIsValid && bodyIsValid) {
//       // Submit Form
//       // Clear State
//       updateName("");
//       updateEmail("");
//       updateBody("");
//     }
//   };

//   // Handlers to Open and Close form
//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <div>
//       <Link variant="caption" color="inherit" onClick={handleClickOpen}>
//         Add Answer
//       </Link>
//       <Dialog
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="form-dialog-title"
//       >
//         <DialogTitle id="form-dialog-title">Add a Question</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             To add a answer to this question please enter a nickname and email
//             address along with your answer.
//           </DialogContentText>
//           {nameIsValid ? (
//             <TextField
//               margin="dense"
//               id="name"
//               label="Name"
//               type="text"
//               error={false}
//               defaultValue={name}
//               onChange={(event) => {
//                 updateName(event.target.value);
//               }}
//               fullWidth
//               required
//               inputProps={{ maxLength: 60 }}
//               placeholder="Example: jack543!"
//               helperText="For privacy reasons, do not use your full name or email address"
//             />
//           ) : (
//             <TextField
//               margin="dense"
//               id="name"
//               label="Name"
//               type="text"
//               defaultValue={name}
//               error
//               onChange={(event) => {
//                 updateName(event.target.value);
//               }}
//               fullWidth
//               required
//               inputProps={{ maxLength: 60 }}
//               placeholder="Example: jack543!"
//               helperText="You must enter a Name"
//             />
//           )}
//           {emailIsValid ? (
//             <TextField
//               margin="dense"
//               id="email"
//               label="Email Address"
//               type="email"
//               defaultValue={email}
//               onChange={(event) => {
//                 updateEmail(event.target.value);
//               }}
//               fullWidth
//               required
//               inputProps={{ maxLength: 60 }}
//               placeholder="Example: jack@email.com"
//               helperText="For authentication reasons, you will not be emailed"
//             />
//           ) : (
//             <TextField
//               margin="dense"
//               id="email"
//               label="Email Address"
//               type="email"
//               defaultValue={email}
//               error
//               onChange={(event) => {
//                 updateEmail(event.target.value);
//               }}
//               fullWidth
//               required
//               inputProps={{ maxLength: 60 }}
//               placeholder="Example: jack@email.com"
//               helperText="You must enter an email address"
//             />
//           )}
//           {bodyIsValid ? (
//             <TextField
//               id="standard-textarea"
//               label="Answer"
//               defaultValue={body}
//               onChange={(event) => {
//                 updateBody(event.target.value);
//               }}
//               rows={2}
//               fullWidth
//               multiline
//               required
//               inputProps={{ maxLength: 1000 }}
//               placeholder="What is your answer to this question?"
//             />
//           ) : (
//             <TextField
//               id="standard-textarea"
//               label="Answer"
//               defaultValue={body}
//               error
//               onChange={(event) => {
//                 updateBody(event.target.value);
//               }}
//               rows={2}
//               fullWidth
//               multiline
//               required
//               inputProps={{ maxLength: 1000 }}
//               placeholder="What is your answer to this question?"
//               helperText="You must enter an answer."
//             />
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color="inherit">
//             Cancel
//           </Button>
//           <Button onClick={handleSubmit} color="inherit">
//             Submit Answer
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

export default AddAnswer;
