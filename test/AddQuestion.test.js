import AddQuestion from "../src/components/AddQuestion";

import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({
  adapter: new Adapter(),
});

describe("Add Question Test Suite", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<AddQuestion />);
  });

  // Test for existing fields
  test("Should contain a Name field.", () => {
    expect(wrapper.exists("#name")).toBe(true);
  });
  test("Should contain a Email field.", () => {
    expect(wrapper.exists("#email")).toBe(true);
  });
  test("Should contain a Question field.", () => {
    expect(wrapper.exists("#question")).toBe(true);
  });

  // Test for populating fields
  test("Should populate name.", () => {
    let testValue = "james123";
    let field = "name";
    wrapper
      .find(`#${field}`)
      .simulate("change", { target: { value: `${testValue}` } });
    expect(wrapper.find(`#${field}`).prop("value")).toEqual(`${testValue}`);
  });

  test("Should populate email.", () => {
    let testValue = "james@email.com";
    let field = "email";
    wrapper
      .find(`#${field}`)
      .simulate("change", { target: { value: `${testValue}` } });
    expect(wrapper.find(`#${field}`).prop("value")).toEqual(`${testValue}`);
  });

  test("Should populate question.", () => {
    let testValue = "Does it come with batteries.";
    let field = "question";
    wrapper
      .find(`#${field}`)
      .simulate("change", { target: { value: `${testValue}` } });
    expect(wrapper.find(`#${field}`).prop("value")).toEqual(`${testValue}`);
  });

  // Test for field validation
  test("Should populate failed validation error when fields are blank.", () => {
    wrapper.find("#submitButton").simulate("click");
    expect(wrapper.find("#name").prop("error")).toEqual(true);
    expect(wrapper.find("#email").prop("error")).toEqual(true);
    expect(wrapper.find("#question").prop("error")).toEqual(true);
  });

  test("Should validate the name field.", () => {
    wrapper.find("#name").simulate("change", { target: { value: "" } });
    wrapper.find("#submitButton").simulate("click");
    expect(wrapper.find("#name").prop("helperText")).toEqual(
      "The Name field is required."
    );
  });

  test("Should validate email address.", () => {
    wrapper.find("#email").simulate("change", { target: { value: "jack" } });
    wrapper.find("#submitButton").simulate("click");
    expect(wrapper.find("#email").prop("error")).toBe(!undefined);
    wrapper.find("#email").simulate("change", { target: { value: "jack@" } });
    wrapper.find("#submitButton").simulate("click");
    expect(wrapper.find("#email").prop("error")).toBe(!undefined);
    wrapper
      .find("#email")
      .simulate("change", { target: { value: "jack@aol" } });
    wrapper.find("#submitButton").simulate("click");
    expect(wrapper.find("#email").prop("error")).toBe(!undefined);
    wrapper
      .find("#email")
      .simulate("change", { target: { value: "jack@aol." } });
    wrapper.find("#submitButton").simulate("click");
    expect(wrapper.find("#email").prop("error")).toBe(!undefined);
    wrapper
      .find("#email")
      .simulate("change", { target: { value: "jack@aol.com" } });
    wrapper.find("#submitButton").simulate("click");
    expect(wrapper.find("#email").prop("error")).toBe(undefined);
  });

  test("Should validate the question body.", () => {
    wrapper.find("#question").simulate("change", { target: { value: "" } });
    wrapper.find("#submitButton").simulate("click");
    expect(wrapper.find("#question").prop("helperText")).toEqual(
      "The Question field is required."
    );
  });

  // Test for opening, closing modal and resetting fields
  test("Should reset fields when the Cancel button is clicked.", () => {
    wrapper
      .find("#name")
      .simulate("change", { target: { value: "John Smith" } });
    expect(wrapper.find("#name").prop("value")).toEqual("John Smith");
    wrapper.find("#cancelButton").simulate("click");
    expect(wrapper.find("#name").prop("value")).toEqual("");
    expect(wrapper.find("#email").prop("value")).toEqual("");
    expect(wrapper.find("#question").prop("value")).toEqual("");
  });

  test("Should open modal when ADD A QUESTION button is clicked.", () => {
    wrapper.find("#openAddQuestion").simulate("click");
    expect(wrapper.find("#questionDialog").prop("open")).toBe(true);
  });

  test("Should close modal when Close icon button is clicked.", () => {
    wrapper.find("#closeIcon").simulate("click");
    expect(wrapper.find("#questionDialog").prop("open")).toBe(false);
  });
});
