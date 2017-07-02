import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { divIcon } from 'leaflet';
import './map.scss';

export default class LeafletMap extends Component {
  static propTypes = {
    data: PropTypes.array
  };

  constructor(props) {
    super(props);
    this.state = {
      lat: -28.8688,
      lng: 141.2093,
      zoom: 4,
      trendsNumber: 6,
    };
  }
  componentDidMount() {
    this.mapApi = this.refs.map.leafletElement;
    setTimeout(() => {
      this.mapApi.invalidateSize();
    }, 100);
  }

  handleZoomEvent = (e) => {
    let zoom = this.refs.map.leafletElement.getZoom();
    this.setState({
      zoom: zoom
    });
    if (zoom < 5) {
      this.setState({
        trendsNumber: 6
      });
    } else {
      this.setState({
        trendsNumber: 18
      });
    }
  }
  markerPositionOptions = (zoom) => {
    let anchorPosiion = {
      8: {
        anchorX: 0,
        anchorY: -100,
        addXnum: -60,
        addYnum: 40
      },
      7: {
        anchorX: 30,
        anchorY: -80,
        addXnum: -60,
        addYnum: 50,

      },
      6: {
        anchorX: 20,
        anchorY: -80,
        addXnum: -55,
        addYnum: 40,

      },
      5: {
        anchorX: 0,
        anchorY: -60,
        addXnum: -20,
        addYnum: 20,

      },
      4: {
        anchorX: 0,
        anchorY: -40,
        addXnum: 10,
        addYnum: 25,

      },
      3: {
        anchorX: 0,
        anchorY: 0,
        addXnum: 0,
        addYnum: 10,

      },
      2: {
        anchorX: 0,
        anchorY: -10,
        addXnum: 10,
        addYnum: 5,

      },
      1: {
        anchorX: 0,
        anchorY: -10,
        addXnum: 0,
        addYnum: 10,

      },
      0: {
        anchorX: 0,
        anchorY: -10,
        addXnum: 0,
        addYnum: 10,

      }
    };
    return (anchorPosiion[zoom]);
  }
  getTrendRate = (num) => {
    let oneThirdOfTrendsNumber = this.state.trendsNumber / 3;
    if (num < oneThirdOfTrendsNumber) {
      return '1';
    } else if (num > oneThirdOfTrendsNumber / 3 && num < oneThirdOfTrendsNumber*2) {
      return '2';
    } else {
      return '3';
    }
  }

  getZoomClassName = () => {
    let z = this.state.zoom;
    if (z >= 6) {
      return 'near';
    } else if (this.state.zoom < 3) {
      return 'far';
    } else {
      return 'middle';
    }
  }

  renderTrendsMarkers = (data) => {
    let markers = [];
    const citiesLatLng = {
      'Sydney' : [-33.8688, 151.2093],
      'Melbourne' : [-37.83148, 144.88083],
      'Adelaide' : [-34.92647, 138.58154],
      'Brisbane' : [-27.47416, 153.01758],
      'Perth' : [-31.96148, 115.8522],
      'New Zealand' : [-43.5321, 172.6362]
    };

    if (Array.isArray(data)) {
      let markerPosition;
      if (data) {
        data.forEach((trendsArray, j) => {
          let adjustPosition = this.markerPositionOptions(this.state.zoom);
          var anchorX= adjustPosition.anchorX;
          var anchorY= adjustPosition.anchorY;
          if (trendsArray.locations[0].name) {
            markerPosition = citiesLatLng[trendsArray.locations[0].name];
          }
          trendsArray.trends.forEach((t, i) => {
            if (i > this.state.trendsNumber) {
              return false;
            }
            anchorX += (t.name.length * 6) - (adjustPosition.addXnum);
            if (i % 3 === 0) {
              anchorY += adjustPosition.addYnum;
              anchorX = adjustPosition.addXnum;
            }
            let rate = this.getTrendRate(i);
            let zoomLevel = this.getZoomClassName();

            const icon = divIcon({
              className: `trend-rate${rate}-${zoomLevel}`,
              html: t.name,
              iconSize:null,
              iconAnchor:[anchorX, anchorY] });
            markers.push(<Marker
              draggable
              key={j+`${i}`}
              onClick={() => { console.log('icon been clicked '); }}
              position={markerPosition}
              icon={icon} >
            </Marker>);
          });
        });
      }
    }
    return markers;
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <Map
        ref="map"
        center={position}
        zoom={this.state.zoom}
        minZoom={2}
        maxZoom={8}
        className={'mapContainer'}
        onZoomend={(e) => { this.handleZoomEvent(e); }}>
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
        />
        {this.renderTrendsMarkers(this.props.data)}
      </Map>
    );
  }
}
