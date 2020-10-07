import React from "react";
import Hello from "./Hello";
import { shallow } from "enzyme";

it("renders with the provided name", () => {
  const wrapper = shallow(<Hello name="Jack" />);
  expect(wrapper.find("p").text()).toEqual("Hello, Jack!");
});

it('renders "unknown" if no name is provided', () => {
  const wrapper = shallow(<Hello />);
  expect(wrapper.find("p").text()).toEqual("Hello, Unknown!");
});
