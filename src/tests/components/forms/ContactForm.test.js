import React from 'react';
import {shallow, mount} from 'enzyme';


import ContactForm from '../../../components/forms/ContactForm';

describe('<ContactForm />', () => {
    it('Renders without crashing', () => {
        shallow(<ContactForm/>);
    });

    
  })