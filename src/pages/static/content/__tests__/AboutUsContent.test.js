import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import AboutUsContent from '../AboutUsContent';

describe('<AboutUsContent />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<AboutUsContent />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
