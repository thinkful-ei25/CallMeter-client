import React from 'react';
import {shallow, mount} from 'enzyme';


import { SetupContainer } from '../../../components/containers/SetupContainer';

describe('<SetupContaner />', () => {
    it('Renders without crashing', () => {
        shallow(<SetupContainer/>);
    });

    
  })