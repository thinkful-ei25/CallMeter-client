import React from 'react';
import {shallow, mount} from 'enzyme';


import Menu from '../../../components/navigation/Menu';

describe('<Menu />', () => {
    it('Renders without crashing', () => {
        shallow(<Menu/>);
    });

    
  })