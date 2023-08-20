import moment from 'moment';
import ConfirmModal from '../../adminPanel/components/modal/reviewContent/ConfirmModal';
import { ContentState } from '../../context/StateContext';

function DataTable({ data, cancelPending, handleSeen }) {
  const {
    setOnScreen, setOnScreenData, fatchAgain, setFetchAgain
  } = ContentState();
  const {
    notificationData, dHistoryData, fileStatusData, downloadListData, index, item
  } = data;
  const { content } = item;

  return (
    <tbody>
      <tr>
        <td className={`${notificationData && item.status === 'unseen' ? 'fw-bold text-primary' : ''}`}>{index + 1}</td>
        {notificationData && <td className={`${item.status === 'unseen' ? 'fw-bold text-primary' : ''}`}>{content?.title}</td>}
        {(dHistoryData || downloadListData || fileStatusData) && <td>{item?.title}</td>}
        <td className={`${notificationData && item.status === 'unseen' ? 'fw-bold text-primary' : ''}`}>
          {(dHistoryData || notificationData || fileStatusData) && (
          <span>
            {moment(item.createdAt).format('L')}
            {' '}
            <span className="ms-2">
              {moment(item.createdAt).format('LT')}
            </span>
          </span>
          )}

          {downloadListData && <span>{item.downloadCount}</span>}
        </td>
        <td>
          {fileStatusData && (
          <span
            className={`${
              (item.status === 'Pending' && 'text-warning')
                  || (item.status === 'Approved' && 'text-success')
                  || (item.status === 'Rejected' && 'text-danger')
            }`}
          >
            {item.status}
          </span>
          )}
          {(dHistoryData || downloadListData) && <span>{item.licence}</span>}
          {notificationData && (
          <>
            {
                item.status === 'unseen'
                  ? (
                    <button
                      onClick={() => {
                        setOnScreen(true);
                        setOnScreenData({
                          title: content?.title,
                          msg: `Your content ${content?.status === 'Approved' ? 'is live now and ready for download' : `has been rejected for ${item.message}`}`
                        });
                        handleSeen(item._id);
                        setFetchAgain(!fatchAgain);
                      }}
                      className="btn btn-primary"
                    >
                      View
                    </button>
                  )
                  : (
                    <button
                      onClick={() => {
                        setOnScreen(true);
                        setOnScreenData({
                          title: content?.title,
                          msg: `Your content ${content?.status === 'Approved' ? 'is live now and ready for download' : `has been rejected for ${item.message}`}`,
                        });
                      }}
                      className="btn btn-secondary"
                    >
                      View
                    </button>
                  )
                }
          </>
          )}
        </td>
        {fileStatusData && (
        <td className="p-0">
          <ConfirmModal content={item} fileState />
        </td>
        )}
        {item.status === 'Pending' && (
        <td>
          <i
            onClick={() => cancelPending(item._id)}
            title="Cancel"
            className="fa-solid fa-xmark text-danger"
            role="button"
          />
        </td>
        )}
        {fileStatusData && item.status === 'Rejected' && (
        <td>
          <p
            style={{ width: '80px' }}
            onClick={() => {
              setOnScreen(true);
              setOnScreenData({ title: 'Rejected', msg: item.rejectCause });
            }}
            className="bg-danger-subtle see-why-btn text-danger rounded-4 mb-0 text-center"
            type="button"
          >
            See Why
          </p>
        </td>
        )}
      </tr>
    </tbody>
  );
}

export default DataTable;
