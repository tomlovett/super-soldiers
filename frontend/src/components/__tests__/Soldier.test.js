import React from 'react'
import { shallow, mount } from 'enzyme'
import Soldier from '../Soldier'
import { withNickname, withoutNickname } from '../../utils/fixtures/soldiers'
import { click } from '../../utils/tests/helpers'

const onSubmit = jest.fn()

describe('<Soldier />', () => {
	it('renders', () => {
		const wrapper = shallow(<Soldier soldier={withNickname()} onSubmit={onSubmit} />)

		expect(wrapper.exists()).toBeTruthy()
	})

	describe('with nickname', () => {
		const wrapper = shallow(<Soldier soldier={withNickname()} onSubmit={onSubmit} />)

		it('displays the nickname', () => {
			const nameText = wrapper.find('.col-6').text()

			expect(nameText).toBe('Joe "Coastie" Smith')
		})
	})

	describe('without nickname', () => {
		const wrapper = shallow(<Soldier soldier={withoutNickname()} onSubmit={onSubmit} />)

		it('displays the soldiers name', () => {
			const nameText = wrapper.find('.col-6').text()

			expect(nameText).toBe('Crash Test Dummy')
		})
	})

	describe('editing', () => {
		const soldier = withNickname()
		const wrapper = mount(<Soldier soldier={soldier} onSubmit={onSubmit} />)

		click(wrapper, 'edit')

		const SoldierForm = wrapper.find('SoldierForm')
		it('shows MissionForm', () => {
			expect(SoldierForm.exists()).toBeTruthy
		})

		it('passes Soldier data as a prop', () => {
			expect(SoldierForm.prop('soldier')).toEqual(soldier)
		})

		click(wrapper, 'cancel')

		it('returns to Soldier component on "cancel"', () => {
			expect(wrapper.find('SoldierForm').exists()).not.toBeTruthy()
		})

		wrapper.unmount()
	})
})
