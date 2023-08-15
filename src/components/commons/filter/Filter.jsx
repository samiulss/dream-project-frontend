import { useState } from 'react';
import './filter.scss';

function Filter({ catagory, setCatagory }) {
  const [customSelect, setCustomSelect] = useState(false);

  return (
    <div onClick={() => setCustomSelect(!customSelect)} className="custom-select custom-border-color d-flex">
      <span className="me-2 p-1">{catagory || 'Catagory'}</span>
      <i className="fa-solid fa-caret-down text-dark" />
      <div className={`${!customSelect ? 'd-none' : 'select-menu overflow-y-auto rounded-4'}`}>
        <ul>
          <li onClick={() => setCatagory('PSD')}>
            <i className="fa-regular fa-file-lines" />
            PSD
          </li>
          <li onClick={() => setCatagory('Font')}>
            <i className="fa-solid fa-font" />
            Font
          </li>
          <li onClick={() => setCatagory('Image')}>
            <i className="fa-regular fa-image" />
            Image
          </li>
          <li onClick={() => setCatagory('Vector')}>
            <i className="fa-solid fa-vector-square" />
            Vector
          </li>
          <li onClick={() => setCatagory('Website')}>
            <i className="fa-solid fa-earth-americas" />
            Website
          </li>
          <li onClick={() => setCatagory('Wallpaper')}>
            <i className="fa-regular fa-image" />
            Wallpaper
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Filter;
