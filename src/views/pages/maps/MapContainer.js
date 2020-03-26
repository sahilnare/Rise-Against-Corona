/* global google */
import React from 'react';
import { withFirebaseHOC } from '../../../firebase'
import { withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer, InfoWindow, Marker } from "react-google-maps";
import { Button } from 'reactstrap'
const locIcon = { url: require('../../../assets/images/location.png'), scaledSize: { width: 60, height: 60 } };

const MapContainer = withScriptjs(withGoogleMap((props) => {
    let markers
    if(props.currentAction === "donate") {
      if(Array.isArray(props.directions)) {
        markers = props.directions.map((dir, i) => {
                // console.log(props.onToggleOpen);
                return (
                  <Marker
                    position={{ lat: dir.lat, lng: dir.lon }}
                    onClick={() => props.onToggleOpen(i)}
                    icon={locIcon}
                    key={i}
                  >
                    {(props.currentAction === "donate" && dir.isOpen) && <InfoWindow onCloseClick={() => props.onToggleOpen(i)}>
                        <div style={{ padding: `12px` }}>
                          <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
                            <h4>{dir.name}</h4>
                            <h4>{dir.food}</h4>
                            <h4>{dir.medicine}</h4>
                            <Button
                              color="success"
                              onClick={() => {
                                // props.firebase.addDonation(dir.userId, props.userId, props.userName)
                                props.onToggleOpen(i)
                              }}
                              className="float-right"
                              size="sm"
                            >
                            Donate
                            </Button>
                          </div>
                        </div>
                      </InfoWindow>}
                  </Marker>
                )
              })
      }
      else {
        console.log(props.directions[1].lat, props.directions[1].isOpen)
        markers = Object.keys(props.directions).map((dir, i) => {
                console.log(props.directions[dir]);
                return (
                  <Marker
                    position={{ lat: props.directions[dir].lat, lng: props.directions[dir].lon }}
                    onClick={() => props.onToggleOpen(i)}
                    icon={locIcon}
                    key={i}
                  >
                    {props.directions[dir].isOpen && <InfoWindow onCloseClick={() => props.onToggleOpen(i)}>
                        <div style={{ padding: `12px` }}>
                          <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
                            <h4>{props.directions[dir].name}</h4>
                            <h4>{props.directions[dir].food}</h4>
                            <h4>{props.directions[dir].medicine}</h4>
                            <Button
                              color="success"
                              onClick={() => {
                                props.onToggleOpen(i)
                                // props.firebase.addDonation(props.directions[dir].userId, props.userId, props.userName)
                              }}
                              className="float-right"
                              size="sm"
                            >
                            Donate
                            </Button>
                          </div>
                        </div>
                      </InfoWindow>}
                  </Marker>
                )
              })
      }
    }
    else {
      markers = props.directions.map((dir, i) => {
              // console.log(props.onToggleOpen);
              return (
                <Marker
                  position={{ lat: dir.lat, lng: dir.lon }}
                  icon={locIcon}
                  key={i}
                >
                </Marker>
              )
            })
    }
    // console.log(props.directions);

      return (
              <GoogleMap
                defaultZoom={10}
                center={ { lat: props.directions[0].lat, lng: props.directions[0].lon } }
                >
                {/*props.directions[0] && <DirectionsRenderer directions={props.directions[0]} />*/}
                {markers}
              </GoogleMap>
      );
  }
))

export default MapContainer;
