import React from 'react';
import {shallow, mount} from 'enzyme';


import IndividualContact from '../../pages/IndividualContact';

describe('<IndividualContact />', () => {
    it('Renders without crashing', () => {
        shallow(<IndividualContact/>);
    });

    
  })