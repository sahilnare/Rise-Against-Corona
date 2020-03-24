/* global google */
import React from 'react';
import { withFirebaseHOC } from '../../../firebase'
import { withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer } from "react-google-maps";
import Marker from "./Marker";

const MapContainer = withScriptjs(withGoogleMap((props) => {
    const marker = (<Marker
                      position={{ lat: props.directions.latlong.lat, lng: props.directions.latlong.lon }}
                    />)

      return (
              <GoogleMap
                defaultZoom={14}
                center={ { lat: props.directions.latlong.lat, lng: props.directions.latlong.lon } }
                >
                {props.directions && <DirectionsRenderer directions={props.directions} />}
                {marker}
              </GoogleMap>
      );
  }
))

export default MapContainer;
