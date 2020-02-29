import React, { useState } from 'react';
import Code from '../code'
import {Link} from "react-router-dom";
import brok from 'brokjson'
import './style.scss';

const stringify = require("json-stringify-pretty-compact");

const VALID = {none: 0, geojson: 1, brokjson: 2, invalid: 99}

function Converter() {
  const [text, setText] = useState("");
  const [validation, setValidation] = useState(VALID.none)
  const [data, setData] = useState(null);
  const [minify, setMinify] = useState(false);

  const textareaChanged = e => {
    setText(e.target.value)

    try
    {
      const json = JSON.parse(e.target.value)
      if(json.hasOwnProperty('geometries'))
      {
        // Is BrokJSON
        try
        {
          const d = brok.brok2geo(json);
          setData(d);
          setValidation(VALID.brokjson);
        }
        catch(e) {
          setValidation(VALID.invalid)
        }

      }
      else
      {
        // Is GeoJSON
        setMinify(false)
        try
        {
          const d = brok.geo2brok(json);
          setData(d);
          setValidation(VALID.geojson);
        }
        catch(e) {
          setValidation(VALID.invalid)
        }
      }
    }
    catch(e)
    {
      setValidation(VALID.invalid)
    }

  }

  var code = "";
  if(validation === VALID.brokjson)
    code = JSON.stringify(data, null, 2);
  else if(validation === VALID.geojson)
  {
    if(!minify)
      code = stringify(data)
    else
      code = JSON.stringify(data)
  }

  return (
    <div id='converter' className='content'>
      <h2>Convert your GeoJSON or BrokJSON</h2>
      <div className='outer'>
        <textarea id='data' placeholder='Paste your GeoJSON or BrokJSON here!' value={text} onChange={textareaChanged}></textarea>
      </div>

      {validation == VALID.invalid &&
        <div className='invalid'>
          Invalid Input. Your Input is not a valid GeoJSON or BrokJSON.
        </div>
      }

      {validation == VALID.brokjson &&
        <>
          <h3>Here is your GeoJSON!</h3>
          <Code>{code}</Code>
        </>
      }

      {validation == VALID.geojson &&
        <>
          <h3>Here is your BrokJSON!</h3>
          <Code>{code}</Code>
          <span className='minify' onClick={() => setMinify(true)}>&#x1F449; Minify BrokJSON</span>
        </>
      }

       
    </div>
  );
}

export default Converter;