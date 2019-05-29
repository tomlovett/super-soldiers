import React from 'react';
import { shallow } from 'enzyme';
import LoginForm from '../LoginForm';

const onSubmit = jest.fn();

describe('<LoginForm />', () => {
  describe('when props.showRegisterFields is false', () => {
    const wrapper = shallow(<LoginForm onSubmit={onSubmit} />);

    it('renders only "email" and "password"', () => {
      const fields = wrapper.find('label').map(node => node.text());
      expect(fields).toEqual(['Email', 'Password']);
    });
  });

  describe('when props.showRegisterFields is true', () => {
    it('renders all fields', () => {
      const wrapper = shallow(<LoginForm onSubmit={onSubmit} showRegisterFields />);

      const fields = wrapper.find('label').map(node => node.text());
      expect(fields).toEqual(['Email', 'Password', 'Confirm Password', 'Name']);
    });
  });
});
