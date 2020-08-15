import React, { useState } from "react";
import { Typography, Link } from "@material-ui/core";
import { reportQuestion, reportAnswer} from "../components/RequestAPI.jsx";

// *** Report ***
// - reports an question or answer
// - when click, change text to/from "report" to "reported"
// - (should send Put request to update api


const Report = ({questionID, answerID}) => {

  const [isReported, setReported] = useState(false);
  const [reportText, setReportText] = useState("Report");

  // Send request to API to report question
  const QuestionReported = (questionID) => {
    reportQuestion(questionID)
      .then(setReported((prevReport) => !prevReport))
      .then(setReportText((prevReportText) =>
      prevReportText === "Report" ? "Reported" : "Report"
    ))
  }

  // Send request to API to report answer
  const AnswerReported = (answerID) => {
    reportAnswer(answerID)
      .then(setReported((prevReport) => !prevReport))
      .then(setReportText((prevReportText) =>
      prevReportText === "Report" ? "Reported" : "Report"
    ))
  }

  // Click handler
  const markReported = () => {
    if (!isReported && questionID) {
      QuestionReported(questionID);
    } else if ( !isReported && answerID) {
      AnswerReported(answerID);
    }
  }

  return (
    <Typography variant="caption">
      <Link
        id="report"
        style={isReported ? { color: "red" } : { color: "inherit" }}
        href="#"
        onClick={markReported}
      >
        {reportText}
      </Link>
    </Typography>
  );
};

export default Report;
