import React from 'react'
import { shallow } from 'enzyme'
import MissionForm from '../MissionForm'
import { missionWithSoldiers } from '../../utils/fixtures/missions'
import { click, editInput, getInputValue } from '../../utils/tests/helpers'

const mission = missionWithSoldiers()

const onSubmit = jest.fn().mockName('onSubmit')
const onDelete = jest.fn().mockName('onDelete')

describe('<MissionForm />', () => {
	describe('with Mission prop', () => {
		const wrapper = shallow(<MissionForm mission={mission} onSubmit={onSubmit} onDelete={onDelete} />)

		it('renders', () => {
			expect(wrapper.exists()).toBeTruthy()
		})

		it('populates the form with passed-in data', () => {
			expect(getInputValue(wrapper, 'name')).toBe('Test Mission')
		})

		it('allows the user to change the data', () => {
			editInput(wrapper, 'name', 'Edited Mission')

			expect(getInputValue(wrapper, 'name')).toBe('Edited Mission')
		})

		// it('fires onSubmit when "Save" button is clicked', () => {
		//   clickSubmit(wrapper);
		//
		//   expect(onSubmit).toHaveBeenCalled();
		// });
	})

	describe('without Mission prop', () => {
		const wrapper = shallow(<MissionForm onSubmit={onSubmit} onDelete={onDelete} />)

		it('renders', () => {
			expect(wrapper.exists()).toBeTruthy()
		})

		// it('will not call "onSubmit" with empty data', () => {
		//   clickSubmit(wrapper);
		//
		//   expect(onSubmit).not.toHaveBeenCalled();
		// });

		it('allows the user to change the data', () => {
			editInput(wrapper, 'name', 'Edited Mission')

			expect(getInputValue(wrapper, 'name')).toBe('Edited Mission')
		})

		// it('fires onSubmit when "Save" button is clicked', () => {
		//   clickSubmit(wrapper);
		//
		//   expect(onSubmit).toHaveBeenCalled();
		// });
	})

	describe('without "OnDelete" prop', () => {
		const wrapper = shallow(<MissionForm onSubmit={onSubmit} />)
		const deleteButton = wrapper.find('button[name="delete"]')

		it('does not render "Delete" button', () => {
			expect(deleteButton.length).toBe(0)
		})
	})

	describe('with "OnDelete" prop', () => {
		const wrapper = shallow(<MissionForm onSubmit={onSubmit} onDelete={onDelete} />)
		const deleteButton = wrapper.find('button[name="delete"]')

		it('renders "Delete" button', () => {
			expect(deleteButton.length).toBe(1)
		})

		it('fires onDelete when "Delete" button is clicked', () => {
			click(wrapper, 'delete')

			expect(onDelete).toHaveBeenCalled()
		})
	})
})
