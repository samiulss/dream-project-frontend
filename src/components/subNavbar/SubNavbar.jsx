import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ContentState } from '../../context/StateContext';
import './subNavbar.scss';

function SubNavbar() {
  const { setCatagory, setHomeSearch } = ContentState();
  const [dropdown, setDropDown] = useState(false);
  return (
    <div className="sub-navbar border border-1 rounded-pill mb-4 position-relative">
      <ul onClick={() => setHomeSearch(true)} className="sub-navbar-list">
        <Link className="nav-link" to="/contents">
          <li onClick={() => setCatagory('Font')}>Font</li>
        </Link>
        <Link className="nav-link" to="/contents">
          <li onClick={() => setCatagory('Vector')}>Vector</li>
        </Link>
        <Link className="nav-link mini-device" to="/contents">
          <li onClick={() => setCatagory('Web Design')}>Web Design</li>
        </Link>
        <Link className="nav-link dropdown-for-mobile" to="/contents">
          <li onClick={() => setCatagory('PSD')}>PSD</li>
        </Link>
        <Link className="nav-link dropdown-for-mobile" to="/contents">
          <li onClick={() => setCatagory('Image')}>Image</li>
        </Link>
        <Link className="nav-link dropdown-for-mobile" to="/contents">
          <li onClick={() => setCatagory('Wallpaper')}>Wallpaper</li>
        </Link>
        <li
          onClick={() => setDropDown(!dropdown)}
          className="nav-item dropdown opacity-100"
        >
          <span className="nav-link dropdown-toggle" role="button">
            More
          </span>
        </li>
      </ul>

      {dropdown && (
        <div>
          <ul className="dropdown-mobile-menu position-absolute bg-white rounded-3 mb-0">
            <Link className="nav-link dropdown-for-mobile" to="/content">
              <li className="d-toggle">Web Template</li>
            </Link>

            <Link className="nav-link dropdown-for-mobile" to="/content">
              <li>PSD</li>
            </Link>

            <Link className="nav-link dropdown-for-mobile" to="/content">
              <li>Image</li>
            </Link>

            <Link className="nav-link dropdown-for-mobile" to="/content">
              <li>Wallpaper</li>
            </Link>
          </ul>
        </div>
      )}
    </div>
  );
}

export default SubNavbar;
