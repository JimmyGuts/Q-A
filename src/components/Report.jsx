import React, { useState } from "react";
import { Typography, Link } from "@material-ui/core";

// *** Report ***
// - reports an answer
// - when click, change toggle text to/from "report" to "reported"
// - (TODO)should send Put req uest to update api


const Report = () => {

  const [isReported, setReported] = useState(false);
  const [reportText, setReportText] = useState("Report");

  return (
    <Typography variant="caption">
      <Link
        id="report"
        style={isReported ? { color: "red" } : { color: "inherit" }}
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
