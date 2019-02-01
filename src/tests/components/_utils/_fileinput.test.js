import React from 'react';
import {shallow, mount} from 'enzyme';

import { FileInput } from '../../../components/_utils/index._utils';

describe('<FileInput />', () => {
    it('Renders without crashing', () => {
        shallow(<FileInput/>);
    });

    
  })