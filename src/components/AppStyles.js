import styled from 'styled-components';

import STYLE_CONSTANTS from '../constants/StyleConstants';

export const StyledApp = styled.div`
  height: 100%;
  font-size: ${STYLE_CONSTANTS.STANDARD_FONT_SIZE};
  font-family: ${STYLE_CONSTANTS.TEXT_FONT_FAMILY};
`;

export const StyledAppHolder = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;
