import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Card,
  CardMedia,
  CardActionArea,
  Dialog,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 150,
    maxHeight: 150,
    marginLeft: "40px",
  },
  view: {
    maxWidth: "1000px",
    maxHeight: "750px"
  }
}));

const AddPhotos = (photo) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Card className={classes.root}>
        <CardActionArea onClick={handleClickOpen}>
          <CardMedia component="img" src={Object.values(photo)}></CardMedia>
        </CardActionArea>
      </Card>
      <Dialog id="answerDialog" open={open} onClose={handleClose} maxWidth="xl">
        <DialogContent onClick={handleClose}>
          <Box className={classes.view} component="img" src={Object.values(photo)} ></Box>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default AddPhotos;
