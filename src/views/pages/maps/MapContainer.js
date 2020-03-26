/* global google */
import React from 'react';
import { withFirebaseHOC } from '../../../firebase'
import { withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer, InfoBox } from "react-google-maps";
import Marker from "./Marker";

const MapContainer = withScriptjs(withGoogleMap((props) => {
    const markers = props.directions.map((dir, i) => <Marker
                      key={i}
                      position={{ lat: dir.lat, lng: dir.lon }}
                    >
                    {dir.isOpen && <InfoBox
                        onCloseClick={() => props.onToggleOpen(i)}
                        options={{ closeBoxURL: ``, enableEventPropagation: true }}
                      >
                        <div style={{ backgroundColor: `yellow`, opacity: 0.75, padding: `12px` }}>
                          <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
                            Hello, Kaohsiung!
                          </div>
                        </div>
                      </InfoBox>}
                    </Marker>)

      return (
              <GoogleMap
                defaultZoom={13}
                center={ { lat: props.directions[0].lat, lng: props.directions[0].lon } }
                >
                {/*props.directions[0] && <DirectionsRenderer directions={props.directions[0]} />*/}
                {markers}
              </GoogleMap>
      );
  }
))

export default MapContainer;
