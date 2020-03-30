import React from "react"
import { Link } from "gatsby"

import Layout from '../components/layout'
import Code from '../components/code'

export default () => <Layout>
    <div className='content'>
      <h2>Installation</h2>
      <p>
        Download prefered version:
      </p>
      <h3>JavaScript</h3>
      <Code hideClipboard={true}>npm install brokjson</Code>
        Or download sourcecode and <a href='https://github.com/simonhuwiler/brokJSON_js' target='_blank' rel="noopener noreferrer">install manually</a>.
      <p>
        Further information:
      </p>
      <ul>
        <li>npm: <a href='https://www.npmjs.com/package/brokjson' target='_blank' rel="noopener noreferrer">https://www.npmjs.com/package/brokjson</a></li>
        <li>Source: <a href='https://www.github.com/simonhuwiler/brokJSON_js' target='_blank' rel="noopener noreferrer">https://www.github.com/simonhuwiler/brokJSON_js</a></li>
      </ul>

      <h3>Python</h3>
      <Code hideClipboard={true}>pip install brokjson</Code>
      <p>
        Further information:
      </p>
      <ul>
        <li>PyPi: <a href='https://www.pypi.org/project/brokJSON/' target='_blank' rel="noopener noreferrer">https://www.pypi.org/project/brokJSON/</a></li>
        <li>Source: <a href='https://www.github.com/simonhuwiler/brokJSON_py' target='_blank' rel="noopener noreferrer">https://www.github.com/simonhuwiler/brokJSON_py</a></li>
      </ul>

      <h3>Other languages</h3>
      No converter for your prefered language? Write one, it's easy! See <Link to='/specification'>Specification</Link>.

      <h3>Example in JavaScript</h3>
      See full documentation <a href='https://www.github.com/simonhuwiler/brokJSON_js' target='_blank' rel="noopener noreferrer">on GitHub</a>.
      <p>Convert from BrokJSON to GeoJSON:</p>
      <Code>
{`brok = require('brokjson');

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

// Log it
console.log(geojson);`}
      </Code>

      <p>Convert from GeoJSON to BrokJSON:</p>
      <Code>
{`brok = require('brokjson');

// Load your GeoJSON
var data = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "id": 1,
        "title": "Datapoint 1",
        "value": 343
      },
      "geometry": {
        "type": "Point",
        "coordinates": [8.5402, 47.3782]
      }
    }
  ]
};

// Convert your GeoJSON to BrokJSON
const brokdata = brok.geo2brok(data);

// Log it
console.log(brokdata);`}
      </Code>

      <h3>Example with MapBox GL</h3>
      The idea behind BrokJSON: <b>RAM is mightier than the bandwidth</b> - better download a manageable BrokJSON and convert it on runtime to GeoJSON than loading a huge GeoJSON. With MapBox GL, this would look like this:
      <Code>
{`import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import brok from 'brokjson'

// Load your converted BrokJSON-file
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
`}
      </Code>


       
    </div>
  </Layout>
