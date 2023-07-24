import React from "react";

const JSONDisplay = ({ json }) => {
  const jsonString = JSON.stringify(json, null, 2);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(jsonString);
    alert("JSON copied to clipboard!");
  };

  return (
    <div>
      <textarea rows={10} value={jsonString} readOnly />
      <button onClick={copyToClipboard}>Copy JSON</button>
    </div>
  );
};

export default JSONDisplay;
