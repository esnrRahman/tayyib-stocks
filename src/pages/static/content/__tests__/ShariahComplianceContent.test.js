import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import ShariahComplianceContent from '../ShariahComplianceContent';

describe('<ShariahComplianceContent />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<ShariahComplianceContent />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
