/* eslint-disable react/prop-types */
import axios from 'axios';
import moment from 'moment';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Canvas from '../../../components/commons/offCanvas/Offcanvas';
import { ContentState } from '../../../context/StateContext';
import ConfirmModal from '../modal/reviewContent/ConfirmModal';

function PendingContent({ content, index }) {
  const {
    title, status, createdAt
  } = content;

  const { setFetchAgain } = ContentState();
  const [contentId, setContentId] = useState('');

  // HANDLE CONTENT
  const handleApprove = async () => {
    const config = {
      'Content-type': 'application/json; charset=UTF-8',
    };
    try {
      const { data } = await axios.post('http://localhost:5000/api/approve', { contentId }, config);
      toast.success(data);
      // setFetchAgain({});
    } catch (error) {
      console.log(error.message);
    }
  };

  // HANDLE CONTENT
  const handleReject = async () => {
    const config = {
      'Content-type': 'application/json; charset=UTF-8',
    };
    try {
      const { data } = await axios.post('http://localhost:5000/api/reject', { contentId }, config);
      toast.success(data);
      // setFetchAgain({});
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {/* ----------TABLE DATA---------- */}
      <tbody>
        <tr>
          <td>{index + 1}</td>
          <td>{title}</td>
          <td>
            <span className="me-2">{moment(createdAt).format('L')}</span>
            {moment(createdAt).format('LT')}
            <span />
          </td>
          <td>
            <ConfirmModal
              content={content}
              setContentId={setContentId}
              handleApprove={handleApprove}
              handleReject={handleReject}
            />
          </td>
          {status === 'Rejected' && (
          <td>
            <Canvas />
          </td>
          )}
        </tr>
      </tbody>
      <Toaster />
    </>
  );
}

export default PendingContent;
