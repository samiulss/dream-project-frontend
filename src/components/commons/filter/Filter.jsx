import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ContentState } from '../../../context/StateContext';
import './filter.scss';

function Filter({ contentUpload, closeCatagory, setCloseCatagory }) {
  const { catagory, setCatagory } = ContentState();
  const [customSelect, setCustomSelect] = useState(false);

  const { pathname } = useLocation();
  useEffect(() => {
    setCatagory(null);
  }, [pathname]);

  useEffect(() => {
    document.body.addEventListener('click', () => {
      if (!contentUpload) {
        setCustomSelect(false);
      }
    });
  }, []);

  useEffect(() => {
    if (closeCatagory) {
      setCustomSelect(false);
    }
  }, [closeCatagory]);

  const handleShowCatagory = (e) => {
    setCustomSelect(!customSelect);
    e.stopPropagation();
    if (contentUpload) {
      setCloseCatagory(false);
    }
  };

  return (
    <div
      onClick={(e) => handleShowCatagory(e)}
      className="custom-select custom-border-color d-flex"
    >
      <span className="me-2 p-1">{catagory || 'Catagory'}</span>
      <i className="fa-solid fa-caret-down text-dark" />
      <div
        style={{ top: contentUpload && '36px' }}
        className={`${
          customSelect ? 'select-menu overflow-y-auto rounded-4' : 'd-none'
        }`}
      >
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
