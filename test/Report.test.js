import Report from "../src/components/Report";

import React from "react";
import { configure, shallow, Link } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({
  adapter: new Adapter(),
});

describe("Report Component Tests", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Report />);
  });

  test("Should be available to Report answer onload", () => {
    expect(wrapper.find("#report").text()).toBe("Report");
  });

  test("Should be displayed as Reported when clicked", () => {
    wrapper.find("#report").simulate("click");
    expect(wrapper.find("#report").text()).toBe("Reported");
  });

  test("Should be able to un-report when clicked from a Reported state", () => {
    wrapper.find("#report").simulate("click");
    expect(wrapper.find("#report").text()).toBe("Reported");
    wrapper.find("#report").simulate("click");
    expect(wrapper.find("#report").text()).toBe("Report");
  });
});
