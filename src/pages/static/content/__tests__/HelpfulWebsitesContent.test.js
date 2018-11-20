import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import HelpfulWebsitesContent from '../HelpfulWebsitesContent';

describe('<HelpfulWebsitesContent />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<HelpfulWebsitesContent />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
