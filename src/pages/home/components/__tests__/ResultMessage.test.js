import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import ResultMessage from '../ResultMessage';

describe('<ResultMessage />', () => {
  let initialProps;

  beforeEach(() => {
    initialProps = {
      title: 'Test title',
      description: 'Test description',
      isFailure: false,
    };
  });

  it('renders with default attributes', () => {
    const wrapper = shallow(
      <ResultMessage
        {...initialProps}
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders with custom size', () => {
    const customProps = { ...initialProps, size: 'small' };
    const wrapper = shallow(<ResultMessage {...customProps} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders with isFailure prop set to true', () => {
    const customProps = { ...initialProps, isFailure: true };
    const wrapper = shallow(<ResultMessage {...customProps} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
