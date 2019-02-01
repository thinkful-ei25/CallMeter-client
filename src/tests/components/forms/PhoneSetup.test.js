
import React from 'react';
import {shallow, mount} from 'enzyme';


import PhoneSetup from '../../../components/forms/PhoneSetup';

describe('<PhoneSetup />', () => {
    it('Renders without crashing', () => {
        shallow(<PhoneSetup/>);
    });

    
  })