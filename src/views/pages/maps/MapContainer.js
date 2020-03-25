/* global google */
import React from 'react';
import { withFirebaseHOC } from '../../../firebase'
import { withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer } from "react-google-maps";
import Marker from "./Marker";

const MapContainer = withScriptjs(withGoogleMap((props) => {
    const markers = props.directions.map(dir => <Marker
                      position={{ lat: dir.lat, lng: dir.lon }}
                    />)

      return (
              <GoogleMap
                defaultZoom={14}
                center={ { lat: props.directions[0].lat, lng: props.directions[0].lon } }
                >
                {props.directions && <DirectionsRenderer directions={props.directions} />}
                {markers}
              </GoogleMap>
      );
  }
))

export default MapContainer;
