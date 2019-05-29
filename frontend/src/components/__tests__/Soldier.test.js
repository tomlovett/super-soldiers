import React from 'react';
import { shallow } from 'enzyme';
import Soldier from '../Soldier';
import { withNickname, withoutNickname } from '../../utils/fixtures/soldiers';

describe('<Soldier />', () => {
  it('renders', () => {
    const wrapper = shallow(<Soldier soldier={withNickname()} />)

    expect(wrapper.exists()).toBeTruthy();
  });

  describe('with nickname', () => {
    const wrapper = shallow(<Soldier soldier={withNickname()} />)

    it('displays the nickname', () => {
      const nameText = wrapper.find('.col-6').text();

      expect(nameText).toBe('Joe "Coastie" Smith');
    });
  });

  describe('without nickname', () => {
    const wrapper = shallow(<Soldier soldier={withoutNickname()} />)

    it('displays the soldiers name', () => {
      const nameText = wrapper.find('.col-6').text();

      expect(nameText).toBe('Crash Test Dummy');
    });
  });
});
