import React from 'react';

const Sorter = ({ defaultValue, handleChange, options}) => {
  return (
    <div className="field">
      <label className="label">Sort</label>
      <div className="select">
        <select onChange={handleChange} defaultValue={defaultValue}>
          {options.map(option =>
            <option key={option.value}
              value={option.value}
            >{option.label}</option>)}
        </select>
      </div>
    </div>
  );
};

export default Sorter;
