import App from "../src/components/App";

// Use the following lines in each test file
// Start here
import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({
  adapter: new Adapter(),
});
// End here

xdescribe("Basic Rendering", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  test(`Should contain title Question & Answers'`, () => {
    expect(wrapper.find("#title").text()).toBe("QUESTIONS & ANSWERS");
  });

  test(`Should contain a Search Bar component`, () => {
    expect(wrapper.exists("#searchBar")).toBe(true);
  });

  test("Should contain a More Answered Question button", () => {
    expect(wrapper.exists("#moreQuestions")).toBe(true);
  });

  test("Should contain a Add Question component", () => {
    expect(wrapper.exists("#addQuestion")).toBe(true);
  });
});
