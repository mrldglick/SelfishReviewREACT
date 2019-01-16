// import React from 'react';
//
// function FilterSidebar({ options, handleChange }) {
//   return(
//     <aside>
//       {options.map((option, i) =>
//         <div key={i} className="field">
//           <label className="checkbox" htmlFor={option.value}>{option.label}</label>
//           <input type="checkbox" name={option.value} onChange={handleChange}
//             checked={option.active}/>
//         </div>)}
//     </aside>
//   );
// }
//
// export default FilterSidebar;

import React from 'react';

const FilterSideBar = ({ options, handleChange }) => {

  const allTrue = options.every(option => option.active === true);

  return(
    <aside className=''>
      <div className='field'>
        <label
          className="checkbox"
          htmlFor='all' >Selected All</label>
        <input
          onChange={ handleChange }
          type='checkbox'
          name='all'
          checked={allTrue}/>
      </div>
      {options && options.map((option, i) =>
        <div key={i} className='field'>
          <label
            className="checkbox"
            htmlFor={ option.value }>{option.label}</label>
          <input
            onChange={ handleChange }
            type='checkbox'
            checked={option.active}
            name={option.value}/>
        </div>
      )}
    </aside>
  );
};

export default FilterSideBar;
