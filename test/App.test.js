import App from "../src/components/App";

// Use the following lines in each test file
// Start here
import React from "react";
import { configure, shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({
  adapter: new Adapter(),
});
// End here

xdescribe("App Component Test Suite", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<App productID={36} />);
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
