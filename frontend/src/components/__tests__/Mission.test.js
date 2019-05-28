import React from 'react';
import { shallow, mount } from 'enzyme';
import Mission from '../Mission';
import * as missionFixtures from '../../utils/fixtures/missions';

const click = (wrapper, name) => wrapper.find(`button[name="${name}"`).simulate('click');

const clickSubmit = () => wrapper.find('button[type="submit"]').simulate('click');

const editInput = (wrapper, name, data) => wrapper.find(`input[name="${name}"]`).simulate(('change', { target: { value: data} }));

const mission = missionFixtures.missionWithSoldiers();
const onSubmit = jest.fn().mockName('onSubmit');
const onDelete = jest.fn().mockName('onDelete');
const onCancel = jest.fn().mockName('onCancel');

const wrapper = shallow(<Mission mission={mission} onSubmit={onSubmit} onDelete={onDelete} onCancel={onCancel} />);

describe('<Mission />', () => {

  it('renders', () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('displays the Mission name', () => {
    expect(wrapper.find('h6').text()).toBe(mission.name);
  });

  it('displays soldiers', () => {
    const soldiers = wrapper.find('p').text();

    expect(soldiers.split(',').length).toBe(mission.soldiers.length);
  });

  describe('editing Mission with MissionForm', () => {
    const wrapper = mount(<Mission mission={mission} onSubmit={onSubmit} onDelete={onDelete} onCancel={onCancel} />);

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
      wrapper.find('button[name="cancel"]').simulate('click');

      expect(wrapper.find('MissionForm').exists()).toBeFalsy();
      expect(wrapper.find('h6').text()).toBe('Test Mission');
    });

    it('fires "onSave" when save is clicked', () => {
      wrapper.find('button[name="Edit"]').simulate('click');
      wrapper.find('input[name="name"]').simulate('change', { target: { value: 'Edited Mission'} });

      wrapper.find('input[type="submit"]').simulate('click');

      setTimeout(() => {
        expect(onSubmit).toHaveBeenCalledWith({name: 'Edited Mission'});
        expect(wrapper.find('MissionForm').exists()).toBeFalsy();
      }, 200);
    });

    it('fires "onDelete" when delete is clicked', () => {
      setTimeout(() => {
        wrapper.find('button[name="Edit"]').simulate('click');
        wrapper.find('button[name="delete"]').simulate('click');

        expect(onDelete).toHaveBeenCalled();
      }, 200);
    });
  });
});
