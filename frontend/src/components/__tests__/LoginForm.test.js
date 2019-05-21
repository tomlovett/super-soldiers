import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import LoginForm from '../LoginForm';

// const onSubmit = sinon.spy();
const onSubmit = jest.fn();

describe('<LoginForm />', () => {
  it('renders only "email" and "password" when `showRegisterFields` is falsey', () => {
    const onSubmit = jest.fn();
    const wrapper = shallow(<LoginForm onSubmit={onSubmit} />);

    const fields = wrapper.find('label').map(node => node.text());
    expect(fields).toEqual(['Email', 'Password']);
  });

  it('requires "email" and "password" when `showRegisterFields` is falsey', () => {
    const onSubmit = jest.fn();
    const wrapper = shallow(<LoginForm onSubmit={onSubmit} />);

    wrapper.find('input[name="email"]').simulate('change', { target: { value: 'e@mail.com' }})
    wrapper.find('input[name="password"]').simulate('change', { target: { value: 'pass' }})

    wrapper.find('input[type="submit"]').simulate('click');

    // expect(onSubmit.called).toBeTruthy();
    // expect(onSubmit).toHaveBeenCalled();
  });

  it('renders all fields when `showRegisterFields` is true', () => {
    const onSubmit = jest.fn();
    const wrapper = shallow(<LoginForm onSubmit={onSubmit} showRegisterFields />);

    const fields = wrapper.find('label').map(node => node.text());
    expect(fields).toEqual(['Email', 'Password', 'Confirm Password', 'Name']);
  });
})
