
import React from "react"
import Helmet from "react-helmet"

export default () => (
  <Helmet>
    <title>BrokJSON - The space saving GeoJSON alternative</title>
    <meta name="description" content="BrokJSON is a file type to store geographical information." />
    <meta name="author" content="Simon Huwiler" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    
    <meta name="description" content="BrokJSON - Your space saving GeoJSON alternative" />
    <meta name="keywords" content="brok,json,geo,qgis,geographical,gis,spatial,geojson,javascript" />

    <meta property="og:url"           content="https://www.brokjson.dev" />
    <meta property="og:type"          content="website" />
    <meta property="og:title"         content="BrokJSON - Geographical data for the web" />
    <meta property="og:description"   content="Your space saving GeoJSON alternative" />
    <meta property="og:image"         content="https://www.brokjson.dev/teaser_2.png" />
    
    <meta name="twitter:card" content="summary_large_image"/>
    <meta name="twitter:url" content="https://www.brokjson.dev" />
    <meta name="twitter:title" content="BrokJSON - Geographical data for the web"/>
    <meta name="twitter:description" content="Your space saving GeoJSON alternative"/>
    <meta name="twitter:image" content="https://www.brokjson.dev/teaser_2.png"/>        
  </Helmet>
);