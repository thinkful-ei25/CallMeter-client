import React from 'react';
import {shallow, mount} from 'enzyme';

import { RequiresLogin } from '../../../components/_utils/index._utils';

describe('<Answerer />', () => {
    it('Renders without crashing', () => {
        shallow(<RequiresLogin/>);
    });

    
  })