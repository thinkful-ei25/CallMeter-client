import React from 'react';
import {shallow, mount} from 'enzyme';


import Invoices from '../../pages/Invoices';

describe('<Invoices />', () => {
    it('Renders without crashing', () => {
        shallow(<Invoices/>);
    });

    
  })