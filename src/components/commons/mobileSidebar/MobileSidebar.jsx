import { useEffect, useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link, useLocation } from 'react-router-dom';
import { ContentState } from '../../../context/StateContext';
import './mobileSidebar.scss';

function MobileSidebar({ menu, bgColor, linkColor }) {
  const { loggedInUser, setPopUpModal } = ContentState();
  const [show, setShow] = useState(false);
  const { pathname } = useLocation();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    handleClose();
  }, [pathname]);

  // HANDLE LOGOUT
  const logOut = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <>
      <button
        onClick={handleShow}
        className="navbar-toggler shadow-none"
        type="button"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <Offcanvas
        style={{ backgroundColor: bgColor }}
        show={show}
        onHide={handleClose}
        placement="start"
        className="w-50 mobile-sidebar-menu"
      >
        <Offcanvas.Body className="p-0">
          <div className="position-sticky position-relative">
            <div className="header text-white">
              <h3 className="ms-3">Dashboard</h3>
            </div>

            <div className="menu d-flex flex-column ms-3">
              <ul>
                {menu[0].menuNames.map((m, i) => (
                  <Link key={i} to={menu[0].pathnames[i]}>
                    <li
                      className={`${
                        pathname === menu[0].pathnames[i] && linkColor
                      }`}
                    >
                      {m}
                    </li>
                  </Link>
                ))}

                {loggedInUser?.role === 'user' && (
                  <div className="be-seller-btn">
                    <button
                      onClick={() => setPopUpModal(true)}
                      className="btn base-bg-color-1 text-white"
                    >
                      Be a Seller
                    </button>
                  </div>
                )}
              </ul>
            </div>
            {/* ---------------log out button--------------- */}
            <div
              onClick={logOut}
              className="justify-content-end m-0 mb-3 me-3 base-bg-color-1 text-white p-2 rounded-3 position-absolute end-0"
              type="button"
            >
              Log out
              <i className="fa-solid fa-power-off ms-2" />
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default MobileSidebar;
