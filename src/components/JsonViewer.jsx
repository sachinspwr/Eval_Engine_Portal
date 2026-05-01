import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import json from 'react-syntax-highlighter/dist/esm/languages/hljs/json';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

SyntaxHighlighter.registerLanguage('json', json);

const JsonViewer = ({ data }) => {
  const formattedJson = JSON.stringify(data, null, 2);

  return (
    <SyntaxHighlighter
      language="json"
      style={atomOneDark}
      customStyle={{
        background: 'transparent',
        padding: 0,
        margin: 0,
        fontSize: '0.875rem',
      }}
    >
      {formattedJson}
    </SyntaxHighlighter>
  );
};

export default JsonViewer;