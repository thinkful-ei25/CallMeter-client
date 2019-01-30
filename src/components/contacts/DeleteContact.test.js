import React from 'react';
import {shallow, mount} from 'enzyme';


import DeleteContact from './DeleteContact';

describe('<DeleteContact />', () => {
    it('Renders without crashing', () => {
        shallow(<DeleteContact />);
    });

    
  })