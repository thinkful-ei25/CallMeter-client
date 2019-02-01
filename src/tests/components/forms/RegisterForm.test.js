import React from 'react';
import {shallow, mount} from 'enzyme';



import RegisterForm from '../../../components/forms/RegisterForm';

describe('<RegisterForm/>', () => {
    it('Renders without crashing', () => {
        shallow(<RegisterForm/>);
    });

    
  })