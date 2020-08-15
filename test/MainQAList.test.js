import MainQAList from "../src/components/MainQAList";

import React from "react";
import { configure, shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({
  adapter: new Adapter(),
});

describe("Main QA Component Test Suite", () => {
  let wrapper, testData;

  beforeEach(() => {
    testData = {
      product_id: "9",
      results: [
        {
          question_id: 50,
          question_body: "What fabric is the bottom made of?",
          question_date: "2019-06-28T00:00:00.000Z",
          asker_name: "l33tgamer",
          question_helpfulness: 1,
          reported: 0,
          answers: {
            "58": {
              id: 58,
              body: "Its a rubber sole",
              date: "2019-11-28T00:00:00.000Z",
              answerer_name: "n00bgamer",
              helpfulness: 9,
              photos: [],
            },
          },
        },
      ],
    };

    wrapper = mount(<MainQAList data={testData.results} />);
  });

  test("Should populate the Question", () => {
    expect(wrapper.exists(".questionBody")).toBe(true);
  });

  test("Should populate the Answers", () => {
    expect(wrapper.exists(".answerBody")).toBe(true);
  });

  test("Should populate the Answerers Name", () => {
    expect(wrapper.exists(".answerName")).toBe(true);
  });

  test("Should have a reported feature", () => {
    expect(wrapper.exists(".reported")).toBe(true);
  });
});
