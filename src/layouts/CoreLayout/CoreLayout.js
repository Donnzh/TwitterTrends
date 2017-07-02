import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './CoreLayout.scss';
import Nav from 'components/Nav';
// import '../../styles/core.scss';

class CoreLayout extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  }

  render() {
    const { children } = this.props;
    return (
      <div className={'mainContainer'}>
        <Nav />
        {children}
      </div>
    );
  }
}

export default CoreLayout;
