import React from 'react';
import { shallow } from 'enzyme';
import { SoldiersContainer } from '../../containers/SoldiersContainer';
import { withNickname, withoutNickname } from '../../../utils/fixtures/soldiers';

const actions = {
  fetchSoldiers: jest.fn()
};

const soldiers = [
  withoutNickname(),
  withNickname()
];

const userWithToken = { token: 'auth token' };

describe('<SoldiersContainer />', () => {
  // describe without auth token
    // it redirects

  describe('with empty Soldiers in props', () => {
    shallow(<SoldiersContainer actions={actions} user={userWithToken} soldiers={[]} history={{}} />);

    it('fetches soldiers', () => {
      expect(actions.fetchSoldiers).toHaveBeenCalled();
    });
  });

  describe('with Soldiers in props', () => {
    const wrapper = shallow(<SoldiersContainer actions={actions} user={userWithToken} soldiers={soldiers} history={{}} />);

    it('renders', () => {
      expect(wrapper.exists()).toBeTruthy();
    });

    it('renders all soldiers', () => {
      const soldierRows = wrapper.find('div[name="soldiers"]').find('.row');

      expect(soldierRows.length).toBe(soldiers.length);
    });
  });

  // it allows the user to create a soldier

  // allows the user to edit a soldier

  // it allows the user to delete a soldier
});
