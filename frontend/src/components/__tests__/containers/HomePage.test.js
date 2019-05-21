import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { HomePage } from '../../containers/HomePage';

const actions = {
  authenticate: jest.fn(),
  querySelf: jest.fn().mockImplementation(() => Promise.resolve())
};

const noUser = {};
const userWithToken = { token: 'authToken' };

describe('<HomePage />', () => {
  it('renders', () => {
    const wrapper = shallow(<HomePage actions={actions} user={noUser} />);

    expect(wrapper.find('h2').length).toBe(1);
  });

  it('renders a Login form and a Register form', () => {
    const wrapper = shallow(<HomePage actions={actions} user={noUser} />);

    const loginInstance = wrapper.find('LoginForm').at(0);
    const registerInstance = wrapper.find('LoginForm').at(1);

    expect(wrapper.find('LoginForm').length).toBe(2);
    expect(loginInstance.prop('showRegisterFields')).not.toBeTruthy();
    expect(registerInstance.prop('showRegisterFields')).toBeTruthy();
  })

  it('reroutes if state.user.token', () => {
    const spy = sinon.spy(HomePage.prototype, 'querySelfAndRedirectToMissions')

    const wrapper = shallow(<HomePage actions={actions} user={userWithToken} />);

    expect(spy.called).toBeTruthy();
  });
});
