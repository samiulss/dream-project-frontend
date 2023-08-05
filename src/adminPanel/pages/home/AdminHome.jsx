import axios from 'axios';
import {
  lazy,
  Suspense,
  useEffect,
  useState
} from 'react';
import Spinner from '../../../components/commons/spinner/Spinner';
import { ContentState } from '../../../context/StateContext';
import './adminHome.scss';

const PendingContent = lazy(() => import('../../components/pendingContent/PendingContent'));

function AdminHome() {
  const { fetchAgain } = ContentState();
  const [contents, setContents] = useState([]);

  // FETCH ALL PENDING CONTENT
  const fetchPendindContent = async () => {
    const config = {
      'Content-type': 'application/json; charset=UTF-8',
    };
    try {
      const { data } = await axios.get('http://localhost:5000/api/pendingContent', config);
      setContents(data);
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchPendindContent();
  }, [fetchAgain]);

  return (
    <div className="dashboard">
      {/* ------------NAVBAR------------ */}

      <main className="container-fluid">
        <div className="row">

          {/* ------------LEFT SIDEBAR------------ */}
          <div className="col-2 left-sidebar text-white">
            <div className="position-sticky">
              <div className="header">
                <h3>Dashboard</h3>
              </div>

              <div className="menu d-flex flex-column align-items-center">
                <ul>
                  <li className="base-color-1">
                    Profile
                  </li>

                  <li className="base-color-1">
                    Message
                    <span className="ms-5 d-inline-block rounded-5 text-white message-notification">01</span>
                  </li>

                  <li className="base-color-1">Pending</li>

                  <li className="base-color-1">Balance</li>

                  <li className="base-color-1">
                    Download
                  </li>

                  <li className="base-color-1">My Content</li>
                </ul>
              </div>
            </div>
          </div>

          {/* ------------MAIN CONTENTR------------ */}
          <div className="col-10 main-content d-flex align-items-start justify-content-center p-0">

            {/* ----------FILE STATUS SELTION---------- */}
            <div className="file-status w-100">
              <h4 className="text-center base-color-1 fw-semibold mb-4 mt-4">
                Pending content -
                {' '}
                {contents.length}
              </h4>
              <div className="file-status-list position-relative">
                <table className="w-100">
                  {/* ----------TABLE HEADING---------- */}
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Item Name</th>
                      <th>Date</th>
                      <th role="button" className="position-relative">Action</th>
                    </tr>
                  </thead>
                  <Suspense fallback={<Spinner />}>
                    {
                        contents.map((content, index) => (
                          <PendingContent
                            key={content._id}
                            content={content}
                            index={index}
                          />
                        ))
                    }
                  </Suspense>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminHome;
