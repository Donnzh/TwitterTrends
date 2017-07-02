import { connect } from 'react-redux';
import {
  requestTrendsData,
  INIT_MAP_STATE
} from 'redux/modules/mapView';

import HomeView from '../components/HomeView';

const mapDispatchToProps = {
  requestTrendsData
};

const mapStateToProps = (state) => {
  const {
    trendsData
  } = state.map || INIT_MAP_STATE;
  return {
    trendsData
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
