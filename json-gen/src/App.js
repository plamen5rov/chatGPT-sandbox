import React, { useState } from "react";
import KeyValueInput from "./KeyValueInput";
import JSONDisplay from "./JSONDisplay";

const App = () => {
  const [keyValuePairs, setKeyValuePairs] = useState([{ key: "", value: "" }]);
  const [jsonFiles, setJsonFiles] = useState([]);

  const addKeyValuePair = () => {
    setKeyValuePairs([...keyValuePairs, { key: "", value: "" }]);
  };

  const handleKeyValuePairChange = (index, key, value) => {
    const updatedPairs = [...keyValuePairs];
    updatedPairs[index] = { key, value };
    setKeyValuePairs(updatedPairs);
  };

  const createNewRecording = () => {
    const newRecording = keyValuePairs.map((pair) => ({ ...pair }));
    setJsonFiles([...jsonFiles, newRecording]);
  };

  const generateJSONFile = () => {
    setJsonFiles([...jsonFiles, keyValuePairs]);
  };

  return (
    <div>
      {keyValuePairs.map((pair, index) => (
        <KeyValueInput
          key={index}
          index={index}
          keyValue={pair}
          onChange={handleKeyValuePairChange}
        />
      ))}
      <button onClick={addKeyValuePair}>Add New Key-Value Pair</button>
      <button onClick={createNewRecording}>Create New Recording</button>
      <button onClick={generateJSONFile}>Generate JSON File</button>
      {jsonFiles.map((file, index) => (
        <JSONDisplay key={index} json={file} />
      ))}
    </div>
  );
};

export default App;
