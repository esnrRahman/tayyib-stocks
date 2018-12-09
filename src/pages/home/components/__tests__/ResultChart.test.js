import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import ResultChart from '../ResultChart';

describe('<ResultChart />', () => {
  it('initial render', () => {
    const props = {
      chartValues: {
        debtPass: 10,
        debtFail: 0,
        cashPass: 33,
        cashFail: 10,
        receivablesPass: 15,
        receivablesFail: 0,
      },
    };
    const wrapper = shallow(
      <ResultChart
        {...props}
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
