import React from 'react'
import Map, { AttributionControl, GeolocateControl , Layer, Marker, NavigationControl,
   Source } from "react-map-gl";
import { Feature } from 'geojson';
function MapBoxRoute(props:any) {


  return (
    <Source
    type="geojson"
    data={{
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: props.coordinates,
      },
      properties: {}, // You can add properties here if needed
    }}
  >
    <Layer
      type="line"
      layout={{ 'line-join': 'round', 'line-cap': 'square' }}
      paint={{ 'line-color': '#0462d4', 'line-width': 4 }}
    />
  </Source>
  )
}

export default MapBoxRoute