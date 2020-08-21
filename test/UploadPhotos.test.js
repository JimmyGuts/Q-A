import UploadPhotos from "../src/components/UploadPhotos.jsx";

import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { ExpansionPanelActions } from "@material-ui/core";
configure({
  adapter: new Adapter(),
});

describe("Upload Photos test Suite", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<UploadPhotos updatePhotos={() => {}} />);
  });

  test("Should contain 5 upload fields", () => {
    expect(wrapper.exists("#uploadOne")).toBe(true);
    expect(wrapper.exists("#uploadTwo")).toBe(true);
    expect(wrapper.exists("#uploadThree")).toBe(true);
    expect(wrapper.exists("#uploadFour")).toBe(true);
    expect(wrapper.exists("#uploadFive")).toBe(true);
  });
});
