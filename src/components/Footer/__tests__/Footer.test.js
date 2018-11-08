import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Footer from '../Footer';

describe('<Footer />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Footer />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
