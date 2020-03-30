import React from "react"
import { Link } from "gatsby"

import Layout from '../components/layout'
import Code from '../components/code'

export default () => <Layout>
    <div className='content'>
      <p>
        Ever struggled with <b>huge GeoJSON-Files</b> for your web project? BrokJSON is your space-saving alternative! Depending on your data you can save up to 80%. <b>Withouth losing any information!</b> How? Because it is based on the same ideas as GeoJSON but reduces redundancies. Look at this example:
      </p>
      <p>This <b>BrokJSON</b> contains two points and data for each point.</p>
      <Code>{
`{
  "properties": ["id", "title", "value"],
  "geometries": [{
    "type": "Point",
    "features": [
      [[8.5402, 47.3782], [1, "Datapoint 1", 343]],
      [[8.5637, 47.4504], [1, "Datapoint 2", 14]]
    ]
  }
]}`
      }</Code>

      <p>The same file as a <b>GeoJSON</b>: Huge!</p>
      <Code>
      {`{
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
      "coordinates": [8.5402,47.3782]
    }
  },
  {
    "type": "Feature",
    "properties": {
      "id": 1,
      "title": "Datapoint 2",
      "value": 14
    },
    "geometry": {
      "type": "Point",
      "coordinates": [8.5637,47.4504]
    }
  }]
}`}
      </Code>

      <p>
        Get <b>BrokJSON</b> <Link to='/installation'>for your system!</Link>
      </p>
       
    </div>
  </Layout>
