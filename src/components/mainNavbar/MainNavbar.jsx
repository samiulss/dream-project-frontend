import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/freeLogo.png';
import { ContentState } from '../../context/StateContext';
import MobileSidebar from '../commons/mobileSidebar/MobileSidebar';
import Login from '../modals/login/Login';
import './mainNavbar.scss';

function MainNavbar() {
  const { loggedInUser, setShowLoginModal } = ContentState();
  const [showGrid, setShowGrid] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showMyAccount, setShowMyAccount] = useState(false);
  const [btn, setBtn] = useState('login');

  const { pathname } = useLocation();

  // HANDLE LOGOUT
  const logOut = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  const menuNames = [
    'Profile',
    'Upload',
    'Message',
    'File status',
    'Balance',
    'Download',
    'My Content',
    'Following',
    'Fovourite',
  ];
  const pathnames = [
    '/profile',
    '/upload',
    '/message',
    '/file-status',
    '/balance',
    '/download-list',
    '/my-content',
    '/following',
    '/favourite',
  ];

  const menu = [
    {
      menuNames,
      pathnames,
    },
  ];

  return (
    <nav
      className={`${
        pathname !== '/content'
          ? 'navbar navbar-expand-lg base-bg-color-1 position-sticky'
          : 'navbar navbar-expand-lg base-bg-color-1'
      }`}
    >
      <div className="container-fluid">
        {/* ---------------NAV LEFT--------------- */}
        <Link to="/">
          <img className="site-logo me-4" title="Home" src={logo} alt="" />
        </Link>

        <div className="icons-for-mobile-device">
          <i
            onClick={() => setShowNotification(
              !showNotification,
              setShowGrid(false),
              setShowMyAccount(false)
            )}
            className="fa-solid fa-bell"
            role="button"
          />
        </div>

        {/* ---------------toggle mobile sidebar--------------- */}
        {loggedInUser && (
        <div className="mobile-sidebar">
          <MobileSidebar
            menu={menu}
            bgColor="#191f2f"
            linkColor="base-color-1"
          />
        </div>
        )}

        <div className="nav-menu position-relative">
          <ul className="d-flex align-items-center me-auto mb-0 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Font
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Vector
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Template
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                More
              </a>
              <ul className="dropdown-menu bg-info">
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item border rounded-pill hire-us-btn gradient-button">
              <a className="nav-link" href="#">
                Hire Us
              </a>
            </li>
          </ul>
        </div>

        {/* ---------------NAV RIGHT--------------- */}
        {loggedInUser ? (
          <div className="nav-right me-4 position-relative align-items-center">
            {/* ---------------GRID MENU--------------- */}
            <div
              onClick={() => setShowGrid(
                !showGrid,
                setShowNotification(false),
                setShowMyAccount(false)
              )}
              className="grid-menu d-flex align-items-center"
            >
              <span className="svg-icon menu-icons grid-icon" />
            </div>

            {/* ---------------NOTIFICATION MENU--------------- */}
            <div
              onClick={() => setShowNotification(
                !showNotification,
                setShowGrid(false),
                setShowMyAccount(false)
              )}
              className="notification d-flex align-items-center"
            >
              <div className="position-relative mt-2">
                <span className="svg-icon menu-icons notification-icon" />
                <span className="position-absolute start-100 translate-middle badge d-flex justify-content-center rounded-circle">
                  01
                </span>
              </div>
            </div>

            {/* ---------------MY ACCOUNT MENU--------------- */}
            <div
              onClick={() => setShowMyAccount(
                !showMyAccount,
                setShowGrid(false),
                setShowNotification(false)
              )}
              className="my-account d-flex align-itmes-center"
            >
              <span className="svg-icon menu-icons avater-icon" />
            </div>
          </div>
        ) : (
          <span
            onClick={() => setShowLoginModal(true)}
            className="text-white btn rounded-4"
          >
            Log in
          </span>
        )}
        <Login btn={btn} setBtn={setBtn} />

        {/* ---------------GRID DROPDOWN MENU--------------- */}
        {showGrid && (
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
        {showNotification && (
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
        {showMyAccount && (
          <div className="account-dropdown-box ps-1">
            <h5 className="ps-2">My Account</h5>
            <div className="menu-list">
              <ul className="mb-0">
                <Link to="/upload">
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
                <Link to="/favourite">
                  <li>
                    <i className="fa-regular fa-heart" />
                    Favourite
                  </li>
                </Link>
                <li>
                  <i className="fa-solid fa-folder-plus" />
                  Collection
                </li>

                {/* ---------------log out button--------------- */}
                <li
                  onClick={logOut}
                  className="justify-content-end pe-0 log-out-btn"
                >
                  Log out
                  <i className="fa-solid fa-power-off ms-2" />
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default MainNavbar;
