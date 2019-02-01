import React from 'react';
import {shallow, mount} from 'enzyme';


import AccountInfoForm from '../../../components/forms/AccountInfoForm';

describe('<AccountInfoForm />', () => {
    it('Renders without crashing', () => {
        shallow(<AccountInfoForm/>);
    });

    
  })