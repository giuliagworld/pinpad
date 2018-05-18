import { expect } from "chai";
import React from "react";
import { shallow as _shallow, mount as _mount, configure as _configure } from "enzyme";
import jsdom from "jsdom";
import configure from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import App from '../src/components/App';

_configure({ adapter: new Adapter() });


describe('App', function () {
  it("displayValue's initial state is an empty string", function () {
    const wrapper = _mount(<App />);
    const valueDiv = wrapper.find('.display');
    expect(valueDiv.first().text()).equal('');
  });

  it("display's value is masked", function () {
    const wrapper = _mount(<App />);
    const button = wrapper.find('.btn').first();
    expect(button.getElement()).to.not.equal(undefined);

    button.simulate('click');

    const valueDiv = wrapper.find('.display').first();
    expect(valueDiv.text()).equal('*');
  });

  it("value is not undefined", function () {
    const wrapper = _mount(<App />);
    const valueDiv = wrapper.find('.hidden').first();
    expect(valueDiv.text()).to.not.equal(undefined);
  });
});