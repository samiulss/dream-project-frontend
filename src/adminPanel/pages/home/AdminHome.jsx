import { Toaster } from 'react-hot-toast';
import { Link, useLocation } from 'react-router-dom';
import PendingContent from '../pendingContent/PendingContent';
import './adminHome.scss';

function AdminHome() {
  const { pathname } = useLocation();

  return (
    <div className="dashboard admin-dashboard">
      <main className="container-fluid">
        <div className="row">

          {/* ------------LEFT SIDEBAR------------ */}
          <div className="col-2 left-sidebar text-white">
            <div className="position-sticky">
              <div className="header">
                <Link to="/admin-panel">
                  <h3 className="text-white">Dashboard</h3>
                </Link>
              </div>

              <div className="menu d-flex flex-column align-items-center">
                <ul>
                  <Link to="/admin-panel/pending">
                    <li className="base-color-1">
                      Pending
                    </li>
                  </Link>

                  <li className="base-color-1">
                    Reports
                    <span className="ms-5 d-inline-block rounded-5 text-white message-notification">01</span>
                  </li>

                  <li className="base-color-1">User</li>

                  <li className="base-color-1">Money</li>

                  <li className="base-color-1">
                    Download
                  </li>

                  <li className="base-color-1">All Content</li>
                </ul>
              </div>
            </div>
          </div>

          {/* ------------MAIN CONTENTR------------ */}
          <div className="col-10 main-content d-flex align-items-start justify-content-center p-0">

            {/* ----------PENDING CONTENT SELTION---------- */}
            {pathname === '/admin-panel/pending' && (
            <PendingContent />
            )}
          </div>
        </div>
      </main>
      <Toaster />
    </div>
  );
}

export default AdminHome;
