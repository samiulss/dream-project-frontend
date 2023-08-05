import axios from 'axios';
import {
    lazy, Suspense, useEffect, useState
} from 'react';
import Spinner from '../../../components/commons/spinner/Spinner';
import { ContentState } from '../../../context/StateContext';

const PendingContentList = lazy(() => import('../../components/pendingContentList/PendingContentList'));

function PendingContent() {
  const { fetchAgain } = ContentState();
  const [contents, setContents] = useState([]);

  // FETCH ALL PENDING CONTENT
  const fetchPending = async () => {
    const config = {
      'Content-type': 'application/json; charset=UTF-8',
    };
    try {
      const { data } = await axios.get('https://dream-project-backend.onrender.com/api/pendingContent', config);
      setContents(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchPending();
  }, [fetchAgain]);
  return (
    <div className="file-status w-100">
      <h4 className="text-center base-color-1 fw-semibold mb-4 mt-4">
        Pending content -
        {' '}
        {contents.length}
      </h4>
      <div className="file-status-list position-relative overflow-x-auto">
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
                  <PendingContentList
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
  );
}

export default PendingContent;
