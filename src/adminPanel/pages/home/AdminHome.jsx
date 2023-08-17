import { Toaster } from 'react-hot-toast';
import { Link, useLocation } from 'react-router-dom';
import AdminDashboard from '../../components/adminDashboard/AdminDashboard';
import NavbarAdmin from '../../components/navbarAdmin/NavbarAdmin';
import PendingContent from '../pendingContent/PendingContent';
import './adminHome.scss';

function AdminHome() {
  const { pathname } = useLocation();

  return (
    <div className="dashboard admin-dashboard">

      {/* ------------NAVBAR------------ */}
      <NavbarAdmin />

      <main className="container-fluid">
        <div className="row">

          {/* ------------LEFT SIDEBAR------------ */}
          <div className="col-2 left-sidebar text-white bg-secondary bg-gradient">
            <div className="position-sticky">
              <div className="header">
                <Link to="/admin-panel">
                  <h5 className="text-white ms-3">Dashboard</h5>
                </Link>
              </div>

              <div className="menu d-flex flex-column ms-3">
                <ul>
                  <Link to="/admin-panel/pending">
                    <li className={`${pathname === '/admin-panel/pending' && 'text-dark'}`}>
                      Pending
                    </li>
                  </Link>

                  <li>
                    Reports
                    <span className="ms-1 d-inline-block rounded-5 text-white message-notification">01</span>
                  </li>

                  <li>User</li>

                  <li>Money</li>

                  <li>
                    Download
                  </li>

                  <li>All Content</li>
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

            {/* ----------MAIN DASHBOARD---------- */}
            {pathname === '/admin-panel' && (
            <AdminDashboard />
            )}

          </div>
        </div>
      </main>
      <Toaster />
    </div>
  );
}

export default AdminHome;
