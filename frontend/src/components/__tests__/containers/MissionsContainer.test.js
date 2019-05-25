import React from 'react';
import { shallow } from 'enzyme';
import { MissionsContainer } from '../../containers/MissionsContainer';

const actions = { fetchMissions: jest.fn() };
const missionWithSoldiers = {
  id: 0,
  name: 'Test Mission',
  soldiers: [
    { id: 0, first_name: 'Crash Test', last_name: 'Dummy'},
    { id: 1, nickname: 'Oscar' },
  ]
}
const userWithToken = { token: 'authToken' };

const wrapper = shallow(<MissionsContainer actions={actions} user={userWithToken} missions={[missionWithSoldiers]} />);

describe('<MissionsContainer />', () => {
  it('renders', () => {
    expect(wrapper.find('h2').text()).toBe('Missions');
  });

  it('renders missions with soldier names', () => {
    const tbody = wrapper.find('tbody');

    expect(tbody.find('tr').length).toBe(1);
    expect(tbody.find('th').text()).toBe('Test Mission');
    expect(tbody.find('td').at(0).text()).toBe('Crash Test Dummy, Oscar');
  });

  it('renders Add Mission section', () => {
    expect(wrapper.find('MissionForm').length).toBe(1);
  });

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
