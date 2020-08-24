import React, { useState } from "react";
import { Typography, Link, Box } from "@material-ui/core";
import { reportQuestion, reportAnswer } from "../components/RequestAPI.jsx";

// ************************
// *** Report Component ***
// ************************

const Report = ({ questionID, answerID }) => {
  const [isReported, setReported] = useState(false);
  const [reportText, setReportText] = useState("Report");

  // Send request to API to report question
  const QuestionReported = (questionID) => {
    reportQuestion(questionID)
      .then(setReported((prevReport) => !prevReport))
      .then(
        setReportText((prevReportText) =>
          prevReportText === "Report" ? "Reported" : "Report"
        )
      );
  };

  // Send request to API to report answer
  const AnswerReported = (answerID) => {
    reportAnswer(answerID)
      .then(setReported((prevReport) => !prevReport))
      .then(
        setReportText((prevReportText) =>
          prevReportText === "Report" ? "Reported" : "Report"
        )
      );
  };

  // Click handler
  const markReported = () => {
    if (!isReported && questionID) {
      QuestionReported(questionID);
    } else if (!isReported && answerID) {
      AnswerReported(answerID);
    }
  };

  return (
    <Box borderColor="#3f50b5" borderLeft={2} paddingLeft={2} paddingRight={2}>
      <Typography variant="caption">
        <Link
          id="report"
          style={isReported ? { color: "red" } : { color: "inherit" }}
          onClick={markReported}
        >
          {reportText}
        </Link>
      </Typography>
    </Box>
  );
};

export default Report;
