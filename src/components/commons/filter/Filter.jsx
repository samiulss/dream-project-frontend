import { useState } from 'react';
import './filter.scss';

function Filter() {
  const [customSelect, setCustomSelect] = useState(false);
  const [option, setOption] = useState('Vector');
  return (
    <div onClick={() => setCustomSelect(!customSelect)} className="custom-select custom-border-color d-flex">
      <span className="me-2 p-1">{option}</span>
      <i className="fa-solid fa-caret-down text-dark" />
      <div className={`${!customSelect ? 'd-none' : 'select-menu rounded-4'}`}>
        <ul>
          <li onClick={() => setOption('Font')}>
            <i className="fa-solid fa-font" />
            Font
          </li>
          <li onClick={() => setOption('Vector')}>
            <i className="fa-solid fa-vector-square" />
            Vector
          </li>
          <li onClick={() => setOption('Website')}>
            <i className="fa-solid fa-earth-americas" />
            Website
          </li>
          <li onClick={() => setOption('Image')}>
            <i className="fa-regular fa-image" />
            Image
          </li>
          <li onClick={() => setOption('PSD')}>
            <i className="fa-regular fa-file-lines" />
            PSD
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Filter;
