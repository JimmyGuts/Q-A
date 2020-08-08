import App from "../src/components/App";

// Create a file with the following lines of code and import into all test files
// Start here
import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({
  adapter: new Adapter(),
});
// End here

test(`Should contain the title 'Hello, World'`, () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find("#title").text()).toBe("Hello, World");
});
