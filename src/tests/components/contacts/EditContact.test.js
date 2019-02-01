import React from 'react';
import {shallow, mount} from 'enzyme';


import EditContact from '../../../components/contacts/EditContact';

describe('<DeleteContact />', () => {
    it('Renders without crashing', () => {
        shallow(<EditContact />);
    });

    
  })