import React from 'react';
import {shallow, mount} from 'enzyme';


import Calls from '../../pages/Calls';

describe('<Calls/>', () => {
    it('Renders without crashing', () => {
        shallow(<Calls/>);
    });

    
  })