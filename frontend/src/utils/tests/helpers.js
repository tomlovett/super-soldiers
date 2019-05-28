export const click = (wrapper, name) => wrapper.find(`button[name="${name}"]`).simulate('click');

export const clickSubmit = (wrapper) => wrapper.find('input[type="submit"]').simulate('click');

export const editInput = (wrapper, name, data) => wrapper.find(`input[name="${name}"]`).simulate('change', { target: { value: data } });

export const getInputValue = (wrapper, name) => wrapper.find(`input[name="${name}"]`).props().value
