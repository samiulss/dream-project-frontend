import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/freeLogo.png';
import './mainNavbar.scss';

function MainNavbar() {
  const [showGrid, setShowGrid] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showMyAccount, setShowMyAccount] = useState(false);

  const { pathname } = useLocation();

  return (
    <nav className={`${pathname !== '/content' ? 'navbar navbar-expand-lg base-bg-color-1 position-sticky' : 'navbar navbar-expand-lg base-bg-color-1'}`}>

      <div className="container-fluid">

        {/* ---------------NAV LEFT--------------- */}
        <Link to="/">
          <img className="site-logo me-4" title="Home" src={logo} alt="" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">Font</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Vector</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">Template</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Wallpaper</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                More
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Action</a></li>
                <li><a className="dropdown-item" href="#">Another action</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </li>
            <li className="nav-item border rounded-pill hire-us-btn gradient-button">
              <a className="nav-link" href="#">Hire Us</a>
            </li>
          </ul>

          {/* ---------------NAV RIGHT--------------- */}
          <div className="nav-right d-flex position-relative align-items-center">

            {/* ---------------GRID MENU--------------- */}
            <div onClick={() => setShowGrid(!showGrid, setShowNotification(false), setShowMyAccount(false))} className="grid-menu d-flex align-items-center">
              <span className="svg-icon menu-icons grid-icon" />
            </div>

            {/* ---------------NOTIFICATION MENU--------------- */}
            <div onClick={() => setShowNotification(!showNotification, setShowGrid(false), setShowMyAccount(false))} className="notification d-flex align-items-center">
              <div className="position-relative mt-2">
                <span className="svg-icon menu-icons notification-icon" />
                <span className="position-absolute start-100 translate-middle badge d-flex justify-content-center rounded-circle">
                  01
                </span>
              </div>
            </div>

            {/* ---------------MY ACCOUNT MENU--------------- */}
            <div onClick={() => setShowMyAccount(!showMyAccount, setShowGrid(false), setShowNotification(false))} className="my-account border rounded-4 d-flex align-itmes-center">
              <span className="text-white">My Account</span>
              <span className="svg-icon menu-icons avater-icon" />
            </div>

            {/* ---------------GRID DROPDOWN MENU--------------- */}
            {showGrid
            && (
            <div className="grid-dropdown-box rounded-1">
              <ul className="d-flex flex-wrap align-items-center justify-content-center m-0">
                <li>Our Client</li>
                <li>Our Project</li>
                <li>About Us</li>
                <li>Contact Us</li>
              </ul>
            </div>
            )}

            {/* ---------------NOTIFICATION DROPDOWN MENU--------------- */}
            {showNotification
            && (
            <div className="notification-dropdown-box">
              <h5>Notification</h5>
              <div className="notification-list d-flex align-items-center justify-content-center">
                <ul className="w-100">
                  <li>Business Web Template was approved</li>
                  <li>Illustration of Bird was rejected</li>
                </ul>
              </div>
            </div>
            )}

            {/* ---------------MY ACCOUNT DROPDOWN MENU--------------- */}
            {showMyAccount
            && (
            <div className="account-dropdown-box ps-1">
              <h5 className="ps-2">My Account</h5>
              <div className="menu-list">
                <ul className="mb-0">
                  <Link to="/dashboard">
                    <li>
                      <i className="fa-solid fa-border-all" />
                      DashBoard
                    </li>
                  </Link>
                  <Link to="/download-list">
                    <li>
                      <i className="fa-regular fa-circle-down" />
                      Download
                    </li>
                  </Link>
                  <li>
                    <i className="fa-regular fa-heart" />
                    Favourite
                  </li>
                  <li>
                    <i className="fa-solid fa-folder-plus" />
                    Collection
                  </li>
                  <li className="justify-content-end pe-0 log-out-btn">
                    Log out
                    <i className="fa-solid fa-power-off ms-2" />
                  </li>
                </ul>
              </div>
            </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default MainNavbar;
