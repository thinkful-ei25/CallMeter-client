import React from 'react';
import {shallow, mount} from 'enzyme';



import UserSettings from '../../../components/forms/UserSettings';

describe('<UserSettings/>', () => {
    it('Renders without crashing', () => {
        shallow(<UserSettings/>);
    });

    
  })