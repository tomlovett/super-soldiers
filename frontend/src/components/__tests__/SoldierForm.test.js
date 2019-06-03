import React from 'react';
import { shallow } from 'enzyme';
import SoldierForm from '../SoldierForm';
import { withNickname } from '../../utils/fixtures/soldiers';
import { click, editInput, getInputValue } from '../../utils/tests/helpers';

const soldier = withNickname();

describe('<SoldierForm />', () => {
  describe('without Soldier prop', () => {
    it('renders', () => {
      const wrapper = shallow(<SoldierForm onSubmit={jest.fn()} />);

      expect(wrapper.exists()).toBeTruthy();
    });
  });

  describe('with Soldier prop', () => {
    const wrapper = shallow(<SoldierForm soldier={soldier} onSubmit={jest.fn()} />);

    it('renders', () => {
      expect(wrapper.exists()).toBeTruthy();
    })

    it('populates with Soldier data', () => {
      expect(getInputValue(wrapper, 'first_name')).toEqual('Joe');
      expect(getInputValue(wrapper, 'last_name')).toEqual('Smith');
    });
  });

  describe('editing', () => {
    const onSubmit = jest.fn().mockName('onSubmit');
    const wrapper = shallow(<SoldierForm onSubmit={onSubmit} />);

    editInput(wrapper, 'first_name', 'Bart');
    editInput(wrapper, 'last_name', 'Chrysler');

    it('updates the input', () => {
      expect(getInputValue(wrapper, 'first_name')).toEqual('Bart');
      expect(getInputValue(wrapper, 'last_name')).toEqual('Chrysler');
    });

    // wrapper.find('input[type="submit"]').simulate('click');
    //
    // it('submits the changed data with "save"', () => {
    //   const { calls } = onSubmit.mock;
    //   expect(calls.length).toBe(1);
    //   expect(calls[0][0]).toEqual({
    //     first_name: 'Bart',
    //     last_name: 'Chrysler'
    //   });
    // });
  });

  describe('delete', () => {
    const onDelete = jest.fn().mockName('onDelete');
    const wrapper = shallow(<SoldierForm soldier={soldier} onDelete={onDelete} onSubmit={jest.fn()} />);

    click(wrapper, 'delete');

    const { calls } = onDelete.mock;
    it('sends "onDelete" with Soldier Data', () => {
      expect(calls.length).toBe(1);
      expect(calls[0][0]).toEqual({
        id: 1,
        first_name: 'Joe',
        nickname: 'Coastie',
        last_name: 'Smith',
        gender: 'm',
        nationality: 'Testistan',
        is_alive: true
      });
    });
  });
});
