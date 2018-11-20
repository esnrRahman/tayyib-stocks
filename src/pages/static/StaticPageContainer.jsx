import React from 'react';
import PropTypes from 'prop-types';

import AboutUsContent from './content/AboutUsContent';
import ShariahComplianceContent from './content/ShariahComplianceContent';
import HelpfulWebsitesContent from './content/HelpfulWebsitesContent';

import StaticPageContainerHolder from './StaticPageContainerStyles';

const StaticPageContainer = (props) => {
  const getStaticContent = () => {
    switch (props.location.pathname) {
      case '/about_us':
        return (<AboutUsContent />);
      case '/shariah_compliance':
        return (<ShariahComplianceContent />);
      case '/helpful_websites':
        return (<HelpfulWebsitesContent />);
      default:
        return null;
    }
  };

  return (
    <StaticPageContainerHolder>
      {
       getStaticContent()
     }
    </StaticPageContainerHolder>
  );
};

StaticPageContainer.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }),
};

export default StaticPageContainer;
