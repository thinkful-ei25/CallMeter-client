import React from 'react';
import {shallow, mount} from 'enzyme';


import LandingHeader from '../../../components/navigation/LandingHeader';

describe('<LandingHeader />', () => {
    it('Renders without crashing', () => {
        shallow(<LandingHeader/>);
    });

    
  })