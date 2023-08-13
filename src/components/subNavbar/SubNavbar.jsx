import { useState } from 'react';
import { Link } from 'react-router-dom';
import './subNavbar.scss';
import { ContentState } from '../../context/StateContext';

function SubNavbar() {
  const { setMenuCatagory } = ContentState();
  const [dropdown, setDropDown] = useState(false);
  return (
    <div className="sub-navbar border border-1 rounded-pill mb-4 position-relative">
      <ul className="sub-navbar-list">
        <Link className="nav-link" to="/content">
          <li onClick={() => setMenuCatagory('Font')}>Font</li>
        </Link>
        <Link className="nav-link" to="/content">
          <li onClick={() => setMenuCatagory('Vector')}>Vector</li>
        </Link>
        <Link className="nav-link mini-device" to="/content">
          <li onClick={() => setMenuCatagory('Web Template')}>Web Template</li>
        </Link>
        <Link className="nav-link dropdown-for-mobile" to="/content">
          <li onClick={() => setMenuCatagory('PSD')}>PSD</li>
        </Link>
        <Link className="nav-link dropdown-for-mobile" to="/content">
          <li onClick={() => setMenuCatagory('Image')}>Image</li>
        </Link>
        <Link className="nav-link dropdown-for-mobile" to="/content">
          <li onClick={() => setMenuCatagory('Wallpaper')}>Wallpaper</li>
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
