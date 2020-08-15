import Report from "../src/components/Report";

import React from "react";
import { configure, shallow, Link } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({
  adapter: new Adapter(),
});

describe("Report Component Test Suite", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Report questionID={175} answerID={555}/>);
  });

  test("Should be available to Report answer onload", () => {
    expect(wrapper.find("#report").text()).toBe("Report");
  });

  test("Should be displayed as Reported when clicked", () => {
    wrapper.find("#report").simulate("click");
    expect(wrapper.find("#report").text()).toBe("Reported");
  });


});
