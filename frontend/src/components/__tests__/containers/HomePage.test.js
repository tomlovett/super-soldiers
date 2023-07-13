import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import { HomePage } from '../../containers/HomePage'

const authenticate = jest.fn().mockName('authenticate')
const querySelf = jest.fn().mockImplementation(() => Promise.resolve())

const actions = {
	authenticate,
	querySelf
}

const userWithToken = { token: 'authToken' }

describe('<HomePage />', () => {
	it('renders', () => {
		const wrapper = shallow(<HomePage actions={{}} user={{}} history={{}} />)

		expect(wrapper.find('HomePage').exists()).toBeTruthy
	})

	it('renders a Login form and a Register form', () => {
		const wrapper = shallow(<HomePage actions={{}} user={{}} history={{}} />)

		const loginForm = wrapper.find('LoginForm').at(0)
		const registerForm = wrapper.find('LoginForm').at(1)

		expect(wrapper.find('LoginForm').length).toBe(2)
		expect(loginForm.prop('showRegisterFields')).not.toBeTruthy()
		expect(registerForm.prop('showRegisterFields')).toBeTruthy()
	})

	describe('with user.token present in state', () => {
		it('queries self and reroutes to /missions', () => {
			const spy = sinon.spy(HomePage.prototype, 'querySelfAndRedirectToMissions')
			const history = { push: () => {} }

			shallow(<HomePage actions={actions} user={userWithToken} history={history} />)

			expect(spy.called).toBeTruthy()
			expect(querySelf.mock.calls.length).toBe(1)
		})
	})
})
