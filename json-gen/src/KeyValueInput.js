import React from "react";

const KeyValueInput = ({ index, keyValue, onChange }) => {
  const { key, value } = keyValue;

  const handleInputChange = (event, field) => {
    const updatedValue = event.target.value;
    onChange(index, field === "key" ? updatedValue : key, field === "value" ? updatedValue : value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Key"
        value={key}
        onChange={(e) => handleInputChange(e, "key")}
      />
      <input
        type="text"
        placeholder="Enter Value"
        value={value}
        onChange={(e) => handleInputChange(e, "value")}
      />
    </div>
  );
};

export default KeyValueInput;
