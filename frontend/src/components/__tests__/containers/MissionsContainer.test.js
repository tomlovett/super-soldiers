import React from 'react';
import { shallow } from 'enzyme';
import { MissionsContainer } from '../../containers/MissionsContainer';
import * as missionFixtures from '../../../utils/fixtures/missions';

const actions = { fetchMissions: jest.fn() };
// const missionWithSoldiers = {
//   id: 0,
//   name: 'Test Mission',
//   soldiers: [
//     { id: 0, first_name: 'Crash Test', last_name: 'Dummy'},
//     { id: 1, nickname: 'Oscar' },
//   ]
// }
const missions = [missionFixtures.missionWithSoldiers(), missionFixtures.missionWithSoldiers({id: 1})];
const userWithToken = { token: 'authToken' };



const wrapper = shallow(<MissionsContainer actions={actions} user={userWithToken} missions={missions} />);

describe('<MissionsContainer />', () => {
  it('renders', () => {
    expect(wrapper.find('h2').text()).toBe('Missions');
  });

  it('renders missions as Mission components', () => {
    expect(wrapper.find('Mission').length).toBe(2);
  });

  // describe Add
  // it('renders Add Mission section', () => {
  //   expect(wrapper.find('MissionForm').length).toBe(1);
  // });

  // describe Delete

  // describe Edit

  // it('allows the user to edit missions', () => {
  //   const missionRow = wrapper.find('tbody').find('tr');
  //   const editButton = missionRow.find('button').at(0);
  //   expect(editButton.text()).toBe('Edit');
  //
  //   editButton.simulate('click');
  //
  //   expect(wrapper.find('tbody').find('MissionForm').length).toBe(1);
  // });
});
