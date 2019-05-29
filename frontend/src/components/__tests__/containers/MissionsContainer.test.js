import React from 'react';
import { shallow, mount } from 'enzyme';
import { MissionsContainer } from '../../containers/MissionsContainer';
import { missionWithSoldiers } from '../../../utils/fixtures/missions';
import { click, editInput, submitForm } from '../../../utils/tests/helpers';


const userWithToken = { token: 'authToken' };

const fetchMissions = jest.fn().mockName('fetchMissions')
const deleteMission = jest.fn().mockName('deleteMission')
const updateMission = jest.fn().mockName('updateMission')
const addMission = jest.fn().mockName('addMission')

describe('<MissionsContainer />', () => {
  const actions = { fetchMissions };
  const missions = [
    missionWithSoldiers(),
    missionWithSoldiers({id: 2})
  ];
  const wrapper = shallow(<MissionsContainer actions={actions} user={userWithToken} missions={missions} />);

  it('renders', () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('renders missions as Mission components', () => {
    expect(wrapper.find('Mission').length).toBe(2);
  });

  describe('create mission', () => {
    const actions = {
      fetchMissions,
      addMission
    };
    const wrapper = mount(<MissionsContainer actions={actions} user={userWithToken} missions={[]} />);

    const MissionForm = wrapper.find('MissionForm');

    it('renders "New Mission" form', () => {
      expect(MissionForm.exists()).toBeTruthy();
    });

    it('sends "addMission" action when new mission is submitted', () => {
      MissionForm.setState({ name: 'New Mission' });
      submitForm(MissionForm);

      const { calls } = addMission.mock
      expect(calls.length).toBe(1);
      expect(calls[0]).toEqual([{ name: 'New Mission' }, "authToken"]);
      wrapper.unmount();
    });
  });

  describe('edit mission', () => {
    const actions = {
      fetchMissions,
      updateMission
    }
    const missions = [{ name: 'Test Mission', id: 1, soldiers: [] }];
    const wrapper = mount(<MissionsContainer actions={actions} user={userWithToken} missions={missions} />);

    click(wrapper, 'edit');

    const editWrapper = wrapper.find('Mission').find('MissionForm');

    editInput(editWrapper, 'name', 'Edited Mission');
    submitForm(editWrapper.find('form'));

    it('sends "updateMission" action with edited mission values', () => {
      const { calls } = updateMission.mock;

      expect(calls.length).toBe(1);
      expect(calls[0][0]).toEqual({
        id: 1,
        name: 'Edited Mission',
        soldiers: []
      });
      expect(calls[0][1]).toEqual("authToken");
    });
    wrapper.unmount();
  });

  describe('delete mission', () => {
    const actions = {
      fetchMissions,
      deleteMission
    };
    const missions = [{ name: 'Test Mission', id: 1, soldiers: [] }];

    const wrapper = mount(<MissionsContainer actions={actions} user={userWithToken} missions={missions} />);

    click(wrapper, 'edit');
    click(wrapper.find('Mission').find('MissionForm'), 'delete');

    it('sends "deleteMission" action with mission data', () => {
      const { calls } = deleteMission.mock;

      expect(calls.length).toBe(1);
      expect(calls[0][0]).toEqual({
        id: 1,
        name: 'Test Mission',
        soldiers: []
      });
      expect(calls[0][1]).toEqual("authToken");
    });
  });
});
