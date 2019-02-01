import React from 'react';
import {shallow, mount} from 'enzyme';



import DeleteContact from '../../../components/contacts/DeleteContact';


describe('<DeleteContact />', () => {
    it('Renders without crashing', () => {
        shallow(<DeleteContact />);
    });
    it('should render buttons, fire dispatch, and redirect on click of delete button', () => {
        const toggle = jest.fn()
        const dispatch = jest.fn()
        const redirect = jest.fn()
        const id='12345'
        const wrapper = shallow(<DeleteContact id={id} dispatch={dispatch} redirect={redirect} toggle={toggle}  />)
        const buttons = wrapper.find('button')
        expect(buttons.length).toEqual(2)
        const firstButton = buttons.first()
        firstButton.simulate('click')
        expect(dispatch).toHaveBeenCalled()
        expect(redirect).toHaveBeenCalled()
        const secondButton = buttons.at(1)
        secondButton.simulate('click')
        expect(toggle).toHaveBeenCalled()
        
    })



    
  })