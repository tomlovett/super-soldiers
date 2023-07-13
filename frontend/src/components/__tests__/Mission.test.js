import React from 'react'
import { shallow, mount } from 'enzyme'
import Mission from '../Mission'
import * as missionFixtures from '../../utils/fixtures/missions'
import { click, submitForm, editInput, getInputValue } from '../../utils/tests/helpers'

const mission = missionFixtures.missionWithSoldiers()
const onSubmit = jest.fn().mockName('onSubmit')
const onDelete = jest.fn().mockName('onDelete')
const onCancel = jest.fn().mockName('onCancel')

const wrapper = shallow(<Mission mission={mission} onSubmit={onSubmit} onDelete={onDelete} onCancel={onCancel} />)

describe('<Mission />', () => {
	it('renders', () => {
		expect(wrapper.exists()).toBeTruthy()
	})

	it('displays the Mission name', () => {
		expect(wrapper.find('h6').text()).toBe(mission.name)
	})

	it('displays soldiers', () => {
		const soldiers = wrapper.find('p').text()

		expect(soldiers.split(',').length).toBe(mission.soldiers.length)
	})

	describe('editing Mission with MissionForm', () => {
		const wrapper = mount(<Mission mission={mission} onSubmit={onSubmit} onDelete={onDelete} onCancel={onCancel} />)

		it('shows MissionForm when "edit" button is clicked', () => {
			expect(wrapper.find('MissionForm').exists()).toBeFalsy()
			click(wrapper, 'edit')

			expect(wrapper.find('MissionForm').exists()).toBeTruthy()
		})

		it('allows the user to edit data', () => {
			editInput(wrapper, 'name', 'Edited Mission')

			expect(getInputValue(wrapper, 'name')).toBe('Edited Mission')
		})

		it('returns the data to original state when "Cancel" is clicked', () => {
			click(wrapper, 'cancel')

			expect(wrapper.find('MissionForm').exists()).toBeFalsy()
			expect(wrapper.find('h6').text()).toBe('Test Mission')
		})

		it('fires "onSave" when save is clicked', () => {
			click(wrapper, 'edit')
			editInput(wrapper, 'name', 'Edited Mission')

			submitForm(wrapper)

			setTimeout(() => {
				expect(onSubmit).toHaveBeenCalledWith({name: 'Edited Mission'})
				expect(wrapper.find('MissionForm').exists()).toBeFalsy()
			}, 200)
		})

		it('fires "onDelete" when delete is clicked', () => {
			setTimeout(() => {
				click(wrapper, 'edit')
				click(wrapper, 'delete')

				expect(onDelete).toHaveBeenCalled()
			}, 200)
		})
	})
})
