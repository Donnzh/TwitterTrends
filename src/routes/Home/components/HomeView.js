import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Map from 'components/Map';
import TweetsPanel from 'components/TweetsPanel';
import './HomeView.scss';
import {
  Col
} from 'react-bootstrap';

export default class HomeView extends Component {
  static propTypes = {
    trendsData: PropTypes.array,
    requestTrendsData: PropTypes.func
  };
  componentDidMount() {
    this.props.requestTrendsData();
  }
  render() {
    return (
      <div>
        <Col md={12} lg={8}>
          <Map
            data={this.props.trendsData}
            className={'mapContainer'} />
        </Col>
        <Col md={12} lg={4}>
          <TweetsPanel />
        </Col>
      </div>
    );
  }
}
