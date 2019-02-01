import React from 'react';
import {shallow, mount} from 'enzyme';


import SubNav from '../../../components/navigation/SubNav';

describe('<SubNav />', () => {
    let page = 'individual-contact'
    let view = 'all'
    const toggleView = jest.fn()
    let action = 'view'
    const handleAction = jest.fn()
    let searchTerm = ''
    const setSearchTerm = jest.fn()
    const toggleAddClientForm = jest.fn()
    
    it('Renders without crashing', () => {
        shallow(<SubNav/>);
    });

    it('Should render the individual contact page if page is set to individual-contact ', () => {
        const wrapper = shallow(<SubNav page={page} />)
        expect(wrapper.exists('.search')).toEqual(false)
    })

    it('Should fire functions on events', () => {
        const wrapperIndividualContact = shallow(<SubNav toggleView={toggleView} page={page} handleAction={handleAction}/>)
        const viewSelectIC = wrapperIndividualContact.find('select')
        expect(viewSelectIC.length).toEqual(2)
        const wrapperElse = shallow(<SubNav toggleView={toggleView} setSearchTerm={setSearchTerm} toggleAddClientForm={toggleAddClientForm}/>)
        const viewSelectE = wrapperElse.find('select')
        expect(viewSelectE.length).toEqual(1)
        const selectAView = viewSelectIC.first()
        selectAView.simulate('change')
        expect(toggleView).toHaveBeenCalled()
        const Actions = viewSelectIC.at(1)
        Actions.simulate('change')
        expect(handleAction).toHaveBeenCalled()
        const selectView = viewSelectE
        selectView.simulate('change')
        expect(toggleView).toHaveBeenCalled()
        const searchBox = wrapperElse.find('input')
        searchBox.simulate('change')
        expect(setSearchTerm).toHaveBeenCalled()
        const addContactButton = wrapperElse.find('button')
        addContactButton.simulate('click')
        expect(toggleAddClientForm).toHaveBeenCalled()
        
    })


    
  })