import React from 'react';
import {shallow, mount} from 'enzyme';


import AddContact from '../../../components/contacts/AddContact';

describe('<AddContact />', () => {
    it('Renders without crashing', () => {
        shallow(<AddContact/>);
    });

    
  })