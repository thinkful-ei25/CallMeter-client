import React from 'react';
import {shallow, mount} from 'enzyme';

import InProgress from '../../../components/browserPhone/InProgress';

describe('<InProgress/>', () => {
    it('Renders without crashing', () => {
        
        shallow(<InProgress/>);
    });

    it('Should fire Hangup function on click', () => {
        const hangup = jest.fn()
        const wrapper = shallow(<InProgress hangup={hangup} />)
        let hangupDiv = wrapper.find('.callAccept')
        hangupDiv.simulate('click')
        expect(hangup).toHaveBeenCalled()

    })

    
  })