import React from 'react';
import {shallow, mount} from 'enzyme';


import LoginForm from '../../../components/forms/LoginForm';

describe('<LoginForm />', () => {
    it('Renders without crashing', () => {
        shallow(<LoginForm/>);
    });

    
  })