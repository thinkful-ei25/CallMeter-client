import React from 'react';
import {shallow, mount} from 'enzyme';


import Settings from '../../pages/Settings';

describe('<Settings />', () => {
    it('Renders without crashing', () => {
        shallow(<Settings/>);
    });

    
  })