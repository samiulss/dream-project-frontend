/* eslint-disable react/prop-types */
import moment from 'moment';
import ConfirmModal from '../modal/reviewContent/ConfirmModal';

function PendingContentList({ content, index }) {
  const {
    title, createdAt
  } = content;

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
            />
          </td>
        </tr>
      </tbody>
    </>
  );
}

export default PendingContentList;
