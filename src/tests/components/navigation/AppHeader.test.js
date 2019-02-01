import React from 'react';
import {shallow, mount} from 'enzyme';


import AppHeader from '../../../components/navigation/AppHeader';

describe('<AppHeader />', () => {
    it('Renders without crashing', () => {
        shallow(<AppHeader/>);
    });

    
  })