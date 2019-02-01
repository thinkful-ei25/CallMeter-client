import React from 'react';
import {shallow, mount} from 'enzyme';


import IndividualContactBody from '../../../components/contacts/IndividualContactBody';

describe('<IndividualContactBody />', () => {
    const client = {"id": "5c4f67517133351df75cde21",
            "company": "JacksonCorp",
            "userId": "5c4152a0c18bc9558709bae0",
            "firstName": "Joe",
            "lastName": "Jackson",
            "hourlyRate": 88,
            "phoneNumber": "+15555424234",
            "email": "joe@jacksoncorp.com",
            "address": {
              "streetOne": "100 Lonely Street",
              "streetTwo": "NW",
              "city": "New Orleans",
              "state": "LA",
              "zip": 14568
            },
            "photo": "data:image/jpeg;base64,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",
            "invoice": [],
            "__v": 0,
            "category": "Musician" 
        }

    const clientWithoutAddress = {
        "id": "5c4f67517133351df75cde21",
            "company": "JacksonCorp",
            "userId": "5c4152a0c18bc9558709bae0",
            "firstName": "Joe",
            "lastName": "Jackson",
            "hourlyRate": 88,
            "phoneNumber": "+15555424234",
            "email": "joe@jacksoncorp.com",
            "photo": "data:image/jpeg;base64,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",
            "invoice": [],
            "__v": 0,
            "category": "Musician"

    }
    it('Renders without crashing', () => {
        shallow(<IndividualContactBody client={client}/>);
    });

    it('Should render two buttons and fire setBody when each is clicked', () => {
        const setBody = jest.fn()
        const wrapper = shallow(<IndividualContactBody client={client} setBody={setBody}/>)
        const buttons = wrapper.find('button')
        expect(buttons.length).toEqual(2)
        const firstButton = buttons.first()
        firstButton.simulate('click')
        expect(setBody).toHaveBeenCalled()
        const secondButton = buttons.at(1)
        secondButton.simulate('click')
        expect(setBody).toHaveBeenCalled()
        
        
    })

    it('Should render empty string if client has no address', () => {
        const wrapper = shallow(<IndividualContactBody client={clientWithoutAddress}/>)
        const fields = wrapper.find('.details-wrap')
        expect(fields.length).toEqual(7)
        const address = fields.at(3)
        const city = fields.at(4)
        const state = fields.at(5)
        const zip = fields.at(6)
        expect(address.text()).toEqual('Street Address:  ')
        expect(city.text()).toEqual('City:  ')
        expect(state.text()).toEqual('State:  ')
        expect(zip.text()).toEqual('State:  ')
    })

    it('Should render invoices', () => {
    const wrapper = shallow(<IndividualContactBody client={clientWithoutAddress} invoicesHTML={<div>Invoices</div>}/>)
        const invoiceList = wrapper.find('.invoice-list')
        expect(invoiceList.length).toEqual(1) 
        expect(invoiceList.text()).toEqual('Invoices')
    })

    
  })