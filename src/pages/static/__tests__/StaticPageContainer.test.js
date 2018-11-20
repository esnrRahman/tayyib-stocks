import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import StaticPageContainer from '../StaticPageContainer';

describe('<StaticPageContainer />', () => {
  let wrapper;

  it('renders correctly for about_us', () => {
    const props = {
      location: {
        pathname: '/about_us',
      },
    };
    wrapper = shallow(<StaticPageContainer {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders correctly for shariah_compliance', () => {
    const props = {
      location: {
        pathname: '/shariah_compliance',
      },
    };
    wrapper = shallow(<StaticPageContainer {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders correctly for helpful_websites', () => {
    const props = {
      location: {
        pathname: '/helpful_websites',
      },
    };
    wrapper = shallow(<StaticPageContainer {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders correctly for anything_else', () => {
    const props = {
      location: {
        pathname: '/anything_else',
      },
    };
    wrapper = shallow(<StaticPageContainer {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
