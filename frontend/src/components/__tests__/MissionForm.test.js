import React from 'react';
import { shallow } from 'enzyme';
import MissionForm from '../MissionForm';

const missionWithSoldiers = {
  id: 0,
  name: 'Test Mission',
  soldiers: [
    { id: 0, first_name: 'Crash Test', last_name: 'Dummy'},
    { id: 1, nickname: 'Oscar' },
  ]
};

const onSubmit = jest.fn().mockName('onSubmit');
const onDelete = jest.fn().mockName('onDelete');

describe('<MissionForm />', () => {
  describe('with Mission prop', () => {
    const wrapper = shallow(<MissionForm mission={missionWithSoldiers} onSubmit={onSubmit} onDelete={onDelete} />);

    it('populates the form with passed-in data', () => {
      const nameInput = wrapper.find('input[name="name"]');

      expect(nameInput.props().value).toBe('Test Mission');
    });

    it('allows the user to change the data', () => {
      const nameInput = wrapper.find('input[name="name"]');

      nameInput.simulate('change', { target: { value: 'Edited Mission'} } );

      const secondCheck = wrapper.find('input[name="name"]');
      expect(secondCheck.props().value).toBe('Edited Mission');
    });

    it('fires onSubmit when "Save" button is clicked', () => {
      const saveButton = wrapper.find('input[type="submit"]');

      saveButton.simulate('click');

      expect(onSubmit).toHaveBeenCalled();
    });
  });

  describe('without Mission prop', () => {
    const wrapper = shallow(<MissionForm onSubmit={onSubmit} onDelete={onDelete} />);
    const saveButton = wrapper.find('input[type="submit"]');

    it('renders', () => {
      expect(wrapper.exists()).toBeTruthy();
    });

    it('will not call "onSubmit" with empty data', () => {
      saveButton.simulate('click');

      expect(onSubmit).not.toHaveBeenCalled();
    });

    it('allows the user to change the data', () => {
      const nameInput = wrapper.find('input[name="name"]');

      nameInput.simulate('change', { target: { value: 'Edited Mission'} } );

      const secondCheck = wrapper.find('input[name="name"]');
      expect(secondCheck.props().value).toBe('Edited Mission');
    });

    it('fires onSubmit when "Save" button is clicked', () => {
      saveButton.simulate('click');

      expect(onSubmit).toHaveBeenCalled();
    });
  });

  describe('without "OnDelete" prop', () => {
    const wrapper = shallow(<MissionForm onSubmit={onSubmit} />);
    const deleteButton = wrapper.find('button[name="delete"]');

    it('does not render "Delete" button', () => {
      expect(deleteButton.length).toBe(0);
    });
  });

  describe('with "OnDelete" prop', () => {
    const wrapper = shallow(<MissionForm onSubmit={onSubmit} onDelete={onDelete} />);
    const deleteButton = wrapper.find('button[name="delete"]');

    it('renders "Delete" button', () => {
      expect(deleteButton.length).toBe(1);
    });

    it('fires onDelete when "Delete" button is clicked', () => {
      deleteButton.simulate('click');

      expect(onDelete).toHaveBeenCalled();
    });
  });
});
