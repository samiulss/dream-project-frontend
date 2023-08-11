import { useEffect, useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link, useLocation } from 'react-router-dom';
import { ContentState } from '../../../context/StateContext';
import './mobileSidebar.scss';

function MobileSidebar({ menu, bgColor, linkColor }) {
  const { loggedInUser, setShowLoginModal } = ContentState();
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
    window.location.reload();
  };

  return (
    <>
      <button onClick={handleShow} className="navbar-toggler shadow-none" type="button">
        <span className="navbar-toggler-icon" />
      </button>

      <Offcanvas style={{ backgroundColor: bgColor }} show={show} onHide={handleClose} placement="start" className="w-50 mobile-sidebar-menu">
        <Offcanvas.Body className="p-0">
          <div className="position-sticky">
            <div className="header text-white">
              <h3 className="ms-3">Dashboard</h3>
            </div>

            <div className="menu d-flex flex-column ms-3">
              <ul>
                {
                    menu[0].menuNames.map((m, i) => (
                      <Link key={i} to={menu[0].pathnames[i]}>
                        <li className={`${pathname === menu[0].pathnames[i] && linkColor}`}>
                          {m}
                        </li>
                      </Link>
                    ))
                  }

                {/* ---------------log out button--------------- */}
                <li onClick={logOut} className="justify-content-end pe-0 log-out-btn">
                  Log out
                  <i className="fa-solid fa-power-off ms-2" />
                </li>

              </ul>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default MobileSidebar;
