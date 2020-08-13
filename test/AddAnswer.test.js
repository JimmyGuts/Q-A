import AddAnswer from "../src/components/AddAnswer";

import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({
  adapter: new Adapter(),
});

describe("Add Answer Test Suite", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<AddAnswer />);
  });

  // Test for existing fields
  test("Should contain a Name field.", () => {
    expect(wrapper.exists("#name")).toBe(true);
  });
  test("Should contain a Email field.", () => {
    expect(wrapper.exists("#email")).toBe(true);
  });
  test("Should contain a Answer field.", () => {
    expect(wrapper.exists("#answer")).toBe(true);
  });

  // Test for populating fields
  test("Should populate name.", () => {
    let testValue = "john456";
    let field = "name";
    wrapper
      .find(`#${field}`)
      .simulate("change", { target: { value: `${testValue}` } });
    expect(wrapper.find(`#${field}`).prop("value")).toEqual(`${testValue}`);
  });

  test("Should populate email.", () => {
    let testValue = "john456@email.com";
    let field = "email";
    wrapper
      .find(`#${field}`)
      .simulate("change", { target: { value: `${testValue}` } });
    expect(wrapper.find(`#${field}`).prop("value")).toEqual(`${testValue}`);
  });

  test("Should populate answer.", () => {
    let testValue = "Does it come with batteries.";
    let field = "answer";
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
    expect(wrapper.find("#answer").prop("error")).toEqual(true);
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

  test("Should validate the answer body.", () => {
    wrapper.find("#answer").simulate("change", { target: { value: "" } });
    wrapper.find("#submitButton").simulate("click");
    expect(wrapper.find("#answer").prop("helperText")).toEqual(
      "The Answer field is required."
    );
  });

  // Test for opening, closing modal and resetting fields
  test("Should reset fields when the Cancel button is clicked.", () => {
    wrapper
      .find("#name")
      .simulate("change", { target: { value: "Mike Jones" } });
    expect(wrapper.find("#name").prop("value")).toEqual("Mike Jones");
    wrapper.find("#cancelButton").simulate("click");
    expect(wrapper.find("#name").prop("value")).toEqual("");
    expect(wrapper.find("#email").prop("value")).toEqual("");
    expect(wrapper.find("#answer").prop("value")).toEqual("");
  });

  test("Should open modal when Add Answer link is clicked.", () => {
    wrapper.find("#openAddAnswer").simulate("click");
    expect(wrapper.find("#answerDialog").prop("open")).toBe(true);
  });

  test("Should close modal when Close icon button is clicked.", () => {
    wrapper.find("#closeIcon").simulate("click");
    expect(wrapper.find("#answerDialog").prop("open")).toBe(false);
  });
});
