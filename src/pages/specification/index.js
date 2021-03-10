import React from 'react';

import Layout from '../../components/layout'
import Code from '../../components/code'
import './styles.scss';

function Specification() {

  return (
    <Layout>
      <div id='specification' className='content'>
        <h2>Specification</h2>
        <p>
          Every BrokJSON MUST BE a valid JSON object. BrokJSON uses the same way to store geographical information as GeoJSON. Therefore this specification will not describe Geometry Objects. See the <a href='https://tools.ietf.org/html/rfc7946' target='_blank' rel="noopener noreferrer">GeoJSON Specification</a>. A BrokJSON-Converter is not interested in knowing the Geometry Object Type (Point, Polygone, etc.). It will just take Objects from GeoJSON and convert it to BrokJSON.
        </p>

        <h3>The structure</h3>
        <p>
          A BrokJSON follows this structure whereas <C>properties</C> and <C>foreignMembers</C> are optional:
        </p>
      
        <Code hideClipboard={true}>
{`{
  "properties": [],
  "foreignMembers": [],
  "geometries": []
}`}
        </Code>

        <h3>properties (Array, optional)</h3>
        <p>Contains all property keys from each GeoJSON-Feature properties.</p>

        <p>
          <b>Example</b><br />
          This GeoJSON-Feature...
        </p>
        <Code hideClipboard={true}>
{`"features": [
  {
    "type": "Feature",
    "properties": {
      "prop1": 1,
      "prop2": 2
    },
    "geometry": {/* ... */}
  }
]`}
        </Code>

      <p>... leads to this BrokJSON-<C>property</C>-Array:</p>
      <Code hideClipboard>["prop1", "prop2"]</Code>

      <h3>foreignMembers (Array, optional)</h3>
      <p>Contains all member keys found on all feature root node except <C>type</C>, <C>properties</C> and <C>geometry</C>. Can be used to store bbox, id or not defined members.</p>
      <p>
        <b>Example:</b><br />
        In GeoJSON, non-geometry-data should be stored under <C>property</C>. But sometimes, there will be information stored directly in the <C>feature</C>-Object. The keys of this custom members will be stored in <C>foreignMembers</C>. Look at this GeoJSON-Feature:
      </p>
      <Code hideClipboard={true}>
{`{
  "type": "Feature",
  "properties": { /* ... */},
  "id": 4,
  "title": "The Univers",
  "geometry": { /* ... */ }
}`}
      </Code>
      <p>
        It contains <C>id</C> and <C>title</C>. Both are not official GeoJSON-Members. The BrokJSON-<C>foreignMember</C>-Array will look like this:
      </p>
      <Code hideClipboard>["id", "title"]</Code>

      <h3>geometries (Array)</h3>
      <p>
        <C>geometries</C> contains an array of <C>GeometryGroup</C>.
      </p>

      <h3>GeometryGroup</h3>
      <p>
        Each <C>GeometryGroup</C> contains geometries of the same type (Points, Polygones, etc.). There can by more than one <C>GeometryGroup</C> with the same type! A <C>GeometryGroup</C> has two members, <C>type</C> and <C>features</C>, both required.<br />
      </p>
      <p>
        <C>type:</C> The type of the following geometries. The type must not be a valid GeoJSON-Type, BrokJSON copies every type.<br />
        <C>features:</C> Contains multiple BrokJSON-features. These features contains data like the geometries or the property-data.
      </p>

      <p>
        <b>Example:</b><br />
        The following GeoJSON contains two points. BrokJSON will create <b>one</b> <C>GeometryGroup</C>, because both geometries have the same type.
      </p>

      <Code hideClipboard={true}>
{`{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [8.5402,47.3782]
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [8.5637,47.4504]
      }
    }
  ]
}`}
      </Code>
      And the corresponding BrokJSON:
      <Code hideClipboard={true}>
{`{
  "geometries": [
    {"type": "Point", "features": [ // GeometryGroup
      [[8.5402, 47.3782]], // Feature 1
      [[8.5637, 47.4504]] // Feature 2
    ]}
  ]
}`}
      </Code>

      <b>Be aware: The order of features must be preserved!</b> It MAY BE necessary to create multiple <C>GeometryGroups</C> of the same type.
      This GeoJSON-Example contains two <C>Points</C> and one <C>MultiPoint</C>. But the Points are not direct neighbors, they are interrupted by a MultiPoint-Feature.

      <Code hideClipboard={true}>
{`
  "type": "FeatureCollection",
  "features": [
      {
          "type": "Feature",
          "geometry": {
              "type": "Point",
              "coordinates": [8.5402,47.3782]
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "MultiPoint",
              "coordinates": [[8.5637,47.4504]]
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Point",
              "coordinates": [8.5637,47.4504]
          }
      }
  ]
}`}
      </Code>

      The corresponding BrokJSON will therefore have three <C>GeometryGroups</C>.
      <Code hideClipboard={true}>
{`{
  "geometries": [
    {"type": "Point", "features": [[[8.5402, 47.3782]]]},
    {"type": "MultiPoint", "features": [[[[8.5637, 47.4504]]]]},
    {"type": "Point", "features": [[[8.5637, 47.4504]]]}
  ]
}`}
      </Code>

      <h3>BrokJSON-Feature</h3>
      <p>
        A BrokJSON-Feature is an array with three possible entries:
      </p>
      <p>
        <C>Index 0:</C><br />
        The coordinates of the GeoJSON-Feature as defined by GeoJSON
      </p>
      <p>
        <C>Index 1 (optional):</C><br />
        The values of the properties as an array. They MUST BE stored in the same order as the corresponding keys in the <C>properties</C>-Array at the beginning of a BrokJSON.
        It MAY NOT have the same length as the <C>properties</C>-Array. Does a GeoJSON-Feature not contains a key from BrokJSON-<C>features</C>, it will not be added to the array. Contains the GeoJSON-Feature keys later in the BrokJSON-<C>features</C>-Array, there will be added <C>null</C>-values. Converting a BrokJSON to GeoJSON, null-values will be skiped.
      </p>
      <p>
        <C>Index 2 (optional):</C><br />
        Contains all other members of a feature like bbox or custom properties as an array. They MUST BE stored in the same order as the corresponding keys in the <C>foreignMembers</C>-Array at the beginning of the BrokJSON. It MAY NOT have the same length as the <C>properties</C>-Array.
      </p>

      <p>
        <b>Example:</b><br />
        Have a look at this GeoJSON-Feature. It contains foreignMembers ("name") and two properties ("id" and "title").
      </p>
      <Code hideClipboard={true}>
{`{
  "type": "Feature",
  "name": "Georg",
  "properties": {
    "id": 1,
    "title": "Hello world"
  },
  "geometry": {
    "type": "Point",
    "coordinates": [8.5402,47.3782]
  }
}`}
      </Code>

      The corresponding BrokJSON-<C>feature</C> looks like this:
      <Code hideClipboard={true}>
{`[
  [8.5402, 47.3782], // Index 0: The coordinates
  [1,"Hello world"], // Index 1: The values of the properties, corresponding to the keys in "properties"
  ["Georg"] // Index 2: The values of all unknown members, corresponding to the keys in "foreignMembers"
]`}
      </Code>

      <h3>GeometryCollections</h3>
      <p>
        GeoJSONs GeometryCollections are a bit special. In BrokJSON, a <C>GeometryGroup</C> with the type <C>GeometryCollection</C> will contain again <C>GeometryGroups</C> as features.
      </p>
      <p>
        <b>Example</b><br />
        Have a look at this BrokJSON. It contains a <C>GeometryCollection</C>. The <C>GeometryCollection</C> contains two <C>GeometryGroups</C>, <C>Point</C> and <C>LineString</C>.
      </p>
      <Code hideClipboard={true}>
{`{
  "props": [],
  "geometries": [
    {
      "type": "GeometryCollection",
      "features": [{
        "type": "Point",
        "features": [
          [[100, 0.0]]
        ]
      },
      {
        "type": "LineString",
        "features": [
          [[101.0, 0.0],[102.0, 1.0]]
        ]
      }]
  }]
}`}
      </Code>

      <h3>Unknown Properties</h3>
      BrokJSON will adopt every unknown property on the root node. The following GeoJSON contains an unspecified member called <C>myCustomProperty</C>.

      <Code hideClipboard={true}>
{`{
  "type": "FeatureCollection",
  "myCustomProperty": "I love frogs!",
  "features": []
}`}
      </Code>

      This custom property will be stored the same way in a BrokJSON:
      <Code hideClipboard={true}>
{`{
  "myCustomProperty": "I love frogs!",
  "geometries": []
}`}
      </Code>

      <h3>featureCollection</h3>
      A GeoJSON with more than one feature contains the member `featureCollection`. This keyword will not be transfered to BrokJSON, because every BrokJSON IS a featureCollection.      

    </div>
  </Layout>
  );
}

function C(props)
{
  return <span className='codeInline'>{props.children}</span>
}

export default Specification;