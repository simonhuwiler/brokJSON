import React from 'react';
import Code from '../code'
import {Link} from "react-router-dom";


const ex1 = `brok = require('brokjson');

// Load your BrokJSON
var data = {
  "properties": ["id", "title", "value"],
  "geometries": [{
    "type": "Point",
    "features": [
      [[8.5402, 47.3782], [1, "Datapoint 1", 343]],
      [[8.5637, 47.4504], [1, "Datapoint 2", 14]]
    ]
  }
]};

// Convert your BrokJSON to GeoJSON
const geojson = brok.brok2geo(data);

// Inspect it
console.log(geojson);`

const ex2 = `import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import brok from 'brokjson'

// Load your convertet BrokJson-file
import data from './data.brokjson'

// Init Mapbox
mapboxgl.accessToken = '<your access token here>';
map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v9'
})

// Load Data after map initialization
map.on('load', () => {

  // Add Data, convert it to GeoJSON!
  map.addSource('data', {
    type: 'geojson',
    data: brok.brok2geo(data)
  })

  // Style Layer
  map.addLayer({
    id: 'data',
    type: 'circle',
    source: 'data',
    paint: {
      'circle-radius': 2,
      'circle-color': '#bada55'
    }
  })
});

`


function Installation() {
  return (
    <div className='content'>
      <h2>Installation</h2>
      <p>
        Download for your prefered language
      </p>
      <ul>
        <li><b>JavaScript</b>: See <a href='https://github.com/simonhuwiler/brokJSON_js' target='_blank'>https://github.com/simonhuwiler/brokJSON_js</a></li>
        <li><b>Python</b>: See <a href='https://github.com/simonhuwiler/brokJSON_py' target='_blank'>https://github.com/simonhuwiler/brokJSON_py</a></li>
        <li>Your language not there? Write a converter! See <Link to='/specification'>Specification</Link>.</li>
      </ul>

      <h3>Example in JavaScript</h3>
      <p>Install by NPM or <a href='https://github.com/simonhuwiler/brokJSON_js' target='_blank'>download</a> the source code</p>
      <Code hideClipboard={true}>npm install brokjson</Code>

      <p>Include BrokJSON and convert</p>
      <Code>{ex1}</Code>

      <h3>Example with MapBox</h3>
      The idea behind BrokJSON: <b>RAM is mightier than the bandwidth</b> - download the small BrokJSON and convert it on runtime to GeoJSON than loading a huge GeoJSON.
      <Code>{ex2}</Code>


       
    </div>
  );
}

export default Installation;
