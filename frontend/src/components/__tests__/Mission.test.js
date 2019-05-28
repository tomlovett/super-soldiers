import React from 'react';
import { shallow } from 'enzyme';
import Mission from '../Mission';
import * as missionFixtures from '../../utils/fixtures/missions';

const clickEditButton = () => wrapper.find('button[name="Edit"]').simulate('click');

const mission = missionFixtures.missionWithSoldiers();
const onSubmit = jest.fn();
const onDelete = jest.fn();
const onCancel = jest.fn();

const wrapper = shallow(<Mission mission={mission} onSubmit={onSubmit} onDelete={onDelete} onCancel={onCancel} />);

describe('<Mission />', () => {

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

  describe('with editing', () => {
    // const wrapper = shallow(<Mission mission={mission} onSubmit={onSubmit} onDelete={onDelete} onCancel={onCancel} />);

    it('shows MissionForm when "edit" button is clicked', () => {
      expect(wrapper.find('MissionForm').exists()).toBeFalsy();
      wrapper.find('button[name="Edit"]').simulate('click');

      expect(wrapper.find('MissionForm').exists()).toBeTruthy();
    });

    it('allows the user to edit data', () => {
      wrapper.find('input[name="name"]').simulate('change', { target: { value: 'Edited Mission'} });

      expect(wrapper.find('input[name="name"]').props().value).toBe('Edited Mission');
    });

    it('returns the data to original state when "Cancel" is clicked', () => {
      wrapper.find('input[name="cancel"]').simulate('click');

      expect(wrapper.find('MissionForm').exists()).toBeFalsy();
      expect(wrapper.find('th').text()).toBe('Test Mission');
    });

    it('fires "onSave" when save is clicked', () => {
      wrapper.find('button[name="Edit"]').simulate('click');
      wrapper.find('input[name="name"]').simulate('change', { target: { value: 'Edited Mission'} });

      wrapper.find('input[type="submit"]').simulate('click');

      expect(wrapper.find('MissionForm').exists()).toBeFalsy();
      expect(onCancel).toHaveBeenCalledWith({name: 'Edited Mission'});
    });

    it('fires "onDelete" when delete is clicked', () => {
      wrapper.find('button[name="Edit"]').simulate('click');
      wrapper.find('input[name="delete"]').simulate('click');

      expect(onDelete).toHaveBeenCalled();
    });
  });
});
