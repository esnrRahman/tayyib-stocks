import React from 'react';
import { Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { StyledMessageHeader } from './ResultMessageStyles';

const ResultMessage = ({ size, title, description, isFailure }) => (
  <Message size={size || 'large'} positive={!isFailure} negative={isFailure}>
    <StyledMessageHeader>
      {title}
    </StyledMessageHeader>
    <p>
      {description}
    </p>
  </Message>
);

ResultMessage.propTypes = {
  size: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  isFailure: PropTypes.bool.isRequired,
};

export default ResultMessage;
