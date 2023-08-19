import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/freeLogo.png';
import { ContentState } from '../../context/StateContext';
import MobileSidebar from '../commons/mobileSidebar/MobileSidebar';
import Login from '../modals/login/Login';
import './mainNavbar.scss';

function MainNavbar() {
  const {
    loggedInUser,
    setShowLoginModal,
    setCatagory,
    setResultFor,
    setHomeSearch,
    setContents,
    fetchAgain,
    setFetchAgain,
  } = ContentState();
  const [showGrid, setShowGrid] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showMyAccount, setShowMyAccount] = useState(false);
  const [btn, setBtn] = useState('login');

  useEffect(() => {
    document.body.addEventListener('click', () => {
      setShowGrid(false);
      setShowMyAccount(false);
      setShowNotification(false);
    });
  }, [showGrid, showNotification, showMyAccount]);

  const { pathname } = useLocation();

  // HANDLE LOGOUT
  const logOut = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    window.location.reload();
  };

  const fetchContentByMenu = (menu) => {
    setFetchAgain(!fetchAgain);
    setHomeSearch(true);
    setCatagory(menu);
    setContents([]);
    setResultFor('');
  };

  useEffect(() => {
    setShowMyAccount(false);
    setShowNotification(false);
    setShowGrid(false);
  }, [pathname]);

  let menuNames = [];
  let pathnames = [];

  if (loggedInUser?.role === 'user') {
    menuNames = ['Profile', 'Fovourite', 'Following'];
    pathnames = ['/profile', '/favourite', '/following'];
  }
  if (loggedInUser?.role === 'seller') {
    menuNames = [
      'Profile',
      'Fovourite',
      'Following',
      'Upload',
      'Notification',
      'File status',
      'Balance',
      'Download',
      'My Content',
    ];
    pathnames = [
      '/profile',
      '/favourite',
      '/following',
      '/upload',
      '/notification',
      '/file-status',
      '/balance',
      '/download-list',
      '/my-content',
    ];
  }

  const menu = [
    {
      menuNames,
      pathnames,
    },
  ];

  const goHome = () => {
    setCatagory(null);
    setResultFor('');
    setContents([]);
  };

  let prevScrollpos = window.pageYOffset;
  window.onscroll = () => {
    const currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
      document.getElementById('nav-scroll-up').style.top = '0';
    } else {
      document.getElementById('nav-scroll-up').style.top = '-58px';
    }
    prevScrollpos = currentScrollPos;
  };

  return (
    <nav
      id="nav-scroll-up"
      className={`${
        pathname !== '/content'
          ? 'navbar navbar-expand-md base-bg-color-1 position-sticky'
          : 'navbar navbar-expand-md base-bg-color-1'
      }`}
    >
      <div className="container-fluid">
        {/* ---------------NAV LEFT--------------- */}
        <Link to="/">
          <img
            onClick={goHome}
            className="site-logo me-4"
            title="Home"
            src={logo}
            alt="Home"
          />
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
            <li
              onClick={() => {
                fetchContentByMenu('Font');
              }}
              className="nav-item"
            >
              <Link to="/contents">Font</Link>
            </li>
            <li
              onClick={() => {
                fetchContentByMenu('Vector');
              }}
              className="nav-item"
            >
              <Link to="/contents">Vector</Link>
            </li>
            <li
              onClick={() => {
                fetchContentByMenu('Image');
              }}
              className="nav-item"
            >
              <Link to="/contents">Image</Link>
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
              <ul className="dropdown-menu mt-3 bg-white">
                <li onClick={() => fetchContentByMenu('PSD')}>
                  <Link to="/contents" className="dropdown-item">
                    PSD
                  </Link>
                </li>
                <li onClick={() => fetchContentByMenu('Wallpaper')}>
                  <Link to="/contents" className="dropdown-item">
                    Wallpaper
                  </Link>
                </li>
                <li onClick={() => fetchContentByMenu('Ai Image')}>
                  <Link to="/contents" className="dropdown-item">
                    Ai Image
                  </Link>
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
              onClick={(e) => {
                setShowGrid(!showGrid);
                setShowMyAccount(false);
                setShowNotification(false);
                e.stopPropagation();
              }}
              className="grid-menu d-flex align-items-center"
            >
              <span className="svg-icon menu-icons grid-icon" />
            </div>

            {/* ---------------NOTIFICATION MENU--------------- */}
            <div
              onClick={(e) => {
                setShowNotification(!showNotification);
                setShowGrid(false);
                setShowMyAccount(false);
                e.stopPropagation();
              }}
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
              onClick={(e) => {
                setShowMyAccount(!showMyAccount);
                setShowGrid(false);
                setShowNotification(false);
                e.stopPropagation();
              }}
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
                <hr className="mt-0 mb-0" />
                <li>Illustration of Bird was rejected</li>
                <hr className="mt-0 mb-0" />
                <li>Wallpaper of Bird was approved</li>
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
                <Link to="/profile">
                  <li>
                    <i className="fa-solid fa-user" />
                    Profile
                  </li>
                </Link>
                <Link to="/favourite">
                  <li>
                    <i className="fa-solid fa-heart" />
                    Favourite
                  </li>
                </Link>
                <Link to="/following">
                  <li>
                    <i className="fa-solid fa-users" />
                    Following
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
