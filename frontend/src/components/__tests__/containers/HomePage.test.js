import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { HomePage } from '../../containers/HomePage';

const actions = {
  authenticate: jest.fn(),
  querySelf: jest.fn().mockImplementation(() => Promise.resolve())
};

const userWithToken = { token: 'authToken' };

describe('<HomePage />', () => {
  it('renders', () => {
    const wrapper = shallow(<HomePage actions={actions} user={{}} history={{}} />);

    expect(wrapper.find('HomePage').exists()).toBeTruthy;
  });

  it('renders a Login form and a Register form', () => {
    const wrapper = shallow(<HomePage actions={actions} user={{}} history={{}} />);

    const loginInstance = wrapper.find('LoginForm').at(0);
    const registerInstance = wrapper.find('LoginForm').at(1);

    expect(wrapper.find('LoginForm').length).toBe(2);
    expect(loginInstance.prop('showRegisterFields')).not.toBeTruthy();
    expect(registerInstance.prop('showRegisterFields')).toBeTruthy();
  });

  describe('with user.token present in state', () => {
    it('queries self and reroutes to /missions', () => {
      const spy = sinon.spy(HomePage.prototype, 'querySelfAndRedirectToMissions')

      shallow(<HomePage actions={actions} user={userWithToken} history={{}} />);

      expect(spy.called).toBeTruthy();
    });
  });
});
