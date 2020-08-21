import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { TextField, Grid, Button, Card, CardMedia } from "@material-ui/core";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
    style: {
      minWidth: 50,
      paddingRight: 10,
    },
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "theme.palette.background.paper",
  },
}));

const UploadPhotos = ({ updatePhotos }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const [photo1, setPhoto1] = useState("");
  const [photo2, setPhoto2] = useState("");
  const [photo3, setPhoto3] = useState("");
  const [photo4, setPhoto4] = useState("");
  const [photo5, setPhoto5] = useState("");
  const [photo1Status, setPhoto1Status] = useState(false);
  const [photo2Status, setPhoto2Status] = useState(false);
  const [photo3Status, setPhoto3Status] = useState(false);
  const [photo4Status, setPhoto4Status] = useState(false);
  const [photo5Status, setPhoto5Status] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Functions for Photos
  const handleAddPhoto = (newPhoto, index) => {
    if (newPhoto) {
      // updatePhotos((prevPhotos) => [...prevPhotos, newPhoto]);
      updatePhotos((prevPhotos) => {
        let updatedCollection = prevPhotos;
        updatedCollection.splice(index, 1, newPhoto);
        // console.log(updatedCollection);
        return updatedCollection;
      });
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="One" {...a11yProps(0)} />
          <Tab
            label="Two"
            disabled={!photo1 ? true : false}
            {...a11yProps(1)}
          />
          <Tab
            label="Three"
            disabled={!photo2 ? true : false}
            {...a11yProps(2)}
          />
          <Tab
            label="Four"
            disabled={!photo3 ? true : false}
            {...a11yProps(3)}
          />
          <Tab
            label="Five"
            disabled={!photo4 ? true : false}
            {...a11yProps(4)}
          />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
        <Button
          onClick={() => {
            setPhoto1Status(true);
            handleAddPhoto(photo1, 0);
          }}
          variant={photo1Status ? "contained" : "outlined"}
          color="primary"
          component="span"
        >
          {photo1Status ? "Uploaded" : "Upload"}
        </Button>
        <TextField
          id={("standard-textarea", "uploadOne")}
          label="First Photo URL"
          fullWidth
          multiline
          value={photo1}
          defaultValue={photo1}
          onChange={(event) => {
            setPhoto1(event.target.value);
          }}
          // {...(errors.body && { error: true, helperText: errors.body })}
          inputProps={{ maxLength: 1000 }}
          placeholder="Enter your photo url?"
        />
        {photo1Status ? (
          <Grid container item>
            <Card className={classes.root}>
              <CardMedia component="img" src={photo1}></CardMedia>
            </Card>
          </Grid>
        ) : null}
      </TabPanel>

      <TabPanel value={value} index={1}>
        <Button
          onClick={() => {
            setPhoto2Status(true);
            handleAddPhoto(photo2, 1);
          }}
          variant={photo2Status ? "contained" : "outlined"}
          color="primary"
          component="span"
        >
          {photo2Status ? "Uploaded" : "Upload"}
        </Button>
        <TextField
          id={("standard-textarea", "uploadTwo")}
          label="Second Photo URL"
          fullWidth
          multiline
          value={photo2}
          defaultValue={photo2}
          onChange={(event) => {
            setPhoto2(event.target.value);
          }}
          // {...(errors.body && { error: true, helperText: errors.body })}
          inputProps={{ maxLength: 1000 }}
          placeholder="Enter your photo url?"
        />
        {photo2Status ? (
          <Grid container item>
            <Card className={classes.root}>
              <CardMedia component="img" src={photo2}></CardMedia>
            </Card>
          </Grid>
        ) : null}
      </TabPanel>

      <TabPanel value={value} index={2}>
        <Button
          onClick={() => {
            setPhoto3Status(true);
            handleAddPhoto(photo3, 2);
          }}
          variant={photo3Status ? "contained" : "outlined"}
          color="primary"
          component="span"
        >
          {photo3Status ? "Uploaded" : "Upload"}
        </Button>
        <TextField
          id={("standard-textarea", "uploadThree")}
          label="Third Photo URL"
          fullWidth
          multiline
          value={photo3}
          defaultValue={photo3}
          onChange={(event) => {
            setPhoto3(event.target.value);
          }}
          // {...(errors.body && { error: true, helperText: errors.body })}
          inputProps={{ maxLength: 1000 }}
          placeholder="Enter your photo url?"
        />
        {photo2Status ? (
          <Grid container item>
            <Card className={classes.root}>
              <CardMedia component="img" src={photo3}></CardMedia>
            </Card>
          </Grid>
        ) : null}
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Button
          onClick={() => {
            setPhoto4Status(true);
            handleAddPhoto(photo4, 3);
          }}
          variant={photo4Status ? "contained" : "outlined"}
          color="primary"
          component="span"
        >
          {photo4Status ? "Uploaded" : "Upload"}
        </Button>
        <TextField
          id={("standard-textarea", "uploadFour")}
          label="Fourth Photo URL"
          fullWidth
          multiline
          value={photo4}
          defaultValue={photo4}
          onChange={(event) => {
            setPhoto4(event.target.value);
          }}
          // {...(errors.body && { error: true, helperText: errors.body })}
          inputProps={{ maxLength: 1000 }}
          placeholder="Enter your photo url?"
        />
        {photo4Status ? (
          <Grid container item>
            <Card className={classes.root}>
              <CardMedia component="img" src={photo4}></CardMedia>
            </Card>
          </Grid>
        ) : null}
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Button
          onClick={() => {
            setPhoto5Status(true);
            handleAddPhoto(photo5, 4);
          }}
          variant={photo5Status ? "contained" : "outlined"}
          color="primary"
          component="span"
        >
          {photo5Status ? "Uploaded" : "Upload"}
        </Button>
        <TextField
          id={("standard-textarea", "uploadFive")}
          label="Fifth Photo URL"
          fullWidth
          multiline
          value={photo5}
          defaultValue={photo5}
          onChange={(event) => {
            setPhoto5(event.target.value);
          }}
          // {...(errors.body && { error: true, helperText: errors.body })}
          inputProps={{ maxLength: 1000 }}
          placeholder="Enter your photo url?"
        />
        {photo5Status ? (
          <Grid container item>
            <Card className={classes.root}>
              <CardMedia component="img" src={photo5}></CardMedia>
            </Card>
          </Grid>
        ) : null}
      </TabPanel>
    </div>
  );
};

export default UploadPhotos;
