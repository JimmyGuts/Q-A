import React, { useState } from "react";
import { makeStyles, Typography, Link } from "@material-ui/core";

// *** Report ***
// - reports an answer
// - when click, change toggle text to/from "report" to "reported"
// - (TODO)should send Put request to update api

const useStyles = makeStyles((theme) => ({
  Reported: {
    color: "red",
  },
  notReported: {
    color: "inherit",
  },
}));

const Report = () => {
  let classes = useStyles();

  const [isReported, setReported] = useState(false);
  const [reportText, setReportText] = useState("Report");

  return (
    <Typography variant="caption">
      <Link
        className={isReported ? classes.Reported : classes.notReported}
        href="#"
        onClick={() => {
          setReported((prevReport) => !prevReport);
          setReportText((prevReportText) =>
            prevReportText === "Report" ? "Reported" : "Report"
          );
        }}
      >
        {reportText}
      </Link>
    </Typography>
  );
};

export default Report;
