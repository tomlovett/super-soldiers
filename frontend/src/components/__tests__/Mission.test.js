import React from 'react';
import { shallow } from 'enzyme';
import Mission from '../Mission';
import * as missionFixtures from '../../utils/fixtures/missions';

describe('<Mission />', () => {
  const mission = missionFixtures.missionWithSoldiers();
  const onSubmit = jest.fn();
  const onDelete = jest.fn();

  const wrapper = shallow(<Mission mission={mission} onSubmit={onSubmit} onDelete={onDelete} />);

  it('renders', () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('displays the Mission name', () => {
    expect(wrapper.find('th').text()).toBe(mission.name);
  });

  it('displays soldiers', () => {
    const soldiers = wrapper.find('td').at(0).text();

    expect(soldiers.split(',').length).toBe(mission.soldiers.length);
  });
});
