import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { rootUrl } from '../../../config/backendUrl';
import logo from '../../assets/freeLogo.png';
import { ContentState } from '../../context/StateContext';
import MobileSidebar from '../commons/mobileSidebar/MobileSidebar';
import './navbar.scss';

function Navbar() {
  const {
    loggedInUser, setShowLoginModal, setContents, setHomeSearch
  } = ContentState();
  const navigate = useNavigate();
  const [searchBox, setSearchBox] = useState(false);
  const [showResult, setShowResult] = useState([]);
  const [resultId, setResultId] = useState('');
  const [searchItem, setSearchItem] = useState(0);

  const checkLogin = () => {
    if (!loggedInUser) {
      setShowLoginModal(true);
    } else {
      navigate('/profile');
    }
  };

  // handle search result
  const handleSearch = async (e) => {
    if (e.target.value === '') {
      setShowResult([]);
      setSearchBox(false);
      setSearchItem(0);
      return;
    }
    setHomeSearch(true);
    const headers = {
      'Content-type': 'application/json; charset=UTF-8',
    };
    try {
      const { data } = await axios.get(
        `${rootUrl}/api/?search=${e.target.value}`,
        headers
      );

      setSearchBox(true);
      const key = 'title';
      const unique = [
        ...new Map(data.map((item) => [item[key], item])).values(),
      ];
      setShowResult(unique);
    } catch (error) {
      console.log(error.message);
    }
  };

  // handle search list with arrow key
  const handleArrowKey = (e) => {
    if (e.keyCode === 38 && searchItem > -1) {
      setSearchItem((prev) => prev - 1);
      setResultId(showResult[searchItem]?._id);
    }
    if (e.keyCode === 40 && searchItem !== showResult.length) {
      setSearchItem((prev) => prev + 1);
      setResultId(showResult[searchItem]?._id);
    }
  };

  // handle search submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (e.target[0].value === '') {
      toast.error('Plese type something');
      return;
    }
    const headers = {
      'Content-type': 'application/json; charset=UTF-8',
    };
    const selectCatagory = {
      catagoryName: null,
    };
    try {
      const { data } = await axios.post(
        `${rootUrl}/api/searchContents?keyword=${e.target[0].value}`,
        selectCatagory,
        headers
      );
      navigate('/contents');
      setSearchBox(false);
      setContents(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  let menuNames = [];
  let pathnames = [];

  if (loggedInUser?.role === 'user') {
    menuNames = [
      'Profile',
      'Fovourite',
      'Following',
    ];
    pathnames = [
      '/profile',
      '/favourite',
      '/following',
    ];
  }
  if (loggedInUser?.role === 'seller') {
    menuNames = [
      'Profile',
      'Fovourite',
      'Following',
      'Upload',
      'Message',
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
      '/message',
      '/file-status',
      '/message',
      'download-list',
      '/my-content',
    ];
  }

  const menu = [
    {
      menuNames,
      pathnames,
    },
  ];

  return (
    <nav className="navbar navbar-expand-lg mb-4 pt-4">
      <div className="container-fluid p-0">
        <Link to="/">
          <img className="site-logo me-4" title="Home" src={logo} alt="" />
        </Link>

        {/* ---------------toggle mobile sidebar--------------- */}
        {loggedInUser ? (
          <MobileSidebar
            menu={menu}
            bgColor="#191f2f"
            linkColor="base-color-1"
          />
        ) : (
          <span
            onClick={() => setShowLoginModal(true)}
            className="text-white btn rounded-4 login-mobile-device"
          >
            Log in
          </span>
        )}

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 align-items-center">
            <li className="nav-item">
              <Link className="nav-link" to="/client">
                Our Client
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/project">
                Our Project
              </Link>
            </li>
            {/* <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Dropdown
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Action</a></li>
                <li><a className="dropdown-item" href="#">Another action</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </li> */}
            <li className="nav-item border rounded-pill hire-us-btn">
              <a className="nav-link" href="#">
                Hire Us
              </a>
            </li>
          </ul>

          {/* ------------------SEARCH BOX DESIGN------------------ */}
          <form onSubmit={handleSubmit} className="d-flex border rounded-pill" role="search">
            <input
              onChange={handleSearch}
              className="form-control shadow-none bg-transparent text-white border border-0 border-end rounded-0"
              type="search"
              placeholder="Search..."
              aria-label="Search"
              onKeyDown={handleArrowKey}
            />
            <button className="btn pb-0" type="submit">
              <span className="svg-icon search" />
            </button>
            {searchBox && showResult.length && (
            <div className="search-list-container position-absolute pt-2">
              <ul>
                {showResult.map((result) => (
                  <li
                    key={result._id}
                    onClick={() => setSearchBox(false)}
                    className={
                        resultId === result._id
                          ? 'p-2 base-bg-color-2 text-white'
                          : 'p-2 text-dark'
                      }
                  >
                    {result.title}
                  </li>
                ))}
              </ul>
            </div>
            )}
          </form>
          <div onClick={checkLogin} className="user-profile">
            <span className="svg-icon avater" />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
