import SearchBar from "../src/components/SearchBar.jsx";

import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({
  adapter: new Adapter(),
});

describe("SearchBar Component Test Suite", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<SearchBar handleSearch={() => {}} />);
  });

  test("Should contain a Search field.", () => {
    expect(wrapper.exists("#search")).toBe(true);
  });

  test("Should store value typed in to the Search Bar", () => {
    wrapper.find("#search").simulate("change", { target: { value: "seller" } });
    expect(wrapper.find("#search").prop("value")).toEqual("seller");
  });
});
