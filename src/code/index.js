import React from 'react';
import copy from 'copy-to-clipboard';

import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/tomorrow-night-eighties.css';

import './style.scss';

function Code(props)
{
  hljs.registerLanguage('javascript', javascript);
  hljs.configure({
    useBR: true
  });

  const hideClipboard = props.hasOwnProperty('hideClipboard') ? props.hideClipboard : false;
  const maxHeight = props.hasOwnProperty('maxHeight') ? props.maxHeight : 'auto';
  return (
    <pre style={{lineHeight: '1.5em'}}>
      <code dangerouslySetInnerHTML={{ __html: hljs.highlight('javascript', props.children).value }} style={{maxHeight: maxHeight}}/>
      {!hideClipboard &&
        <span className='copyClipboard' onClick={() => copy(props.children)}>Copy to clipboard</span>
      }
    </pre>
  );
}

export default Code;