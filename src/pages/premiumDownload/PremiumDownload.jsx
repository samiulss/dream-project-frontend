import { Link, useParams } from 'react-router-dom';
import { rootUrl } from '../../../config/backendUrl';
import { ContentState } from '../../context/StateContext';

function PremiumDownload() {
  const { loggedInUser } = ContentState();
  const { tranId } = useParams();

  return (
    <div className="d-flex flex-column align-items-center justify-content-center w-100 vh-100 bg-info">
      <h4>Payment success</h4>
      <Link
        to={`${rootUrl}/api/premiumFile?tranId=${tranId}&user=${loggedInUser.id}`}
        target="_blank"
        rel="noreferrer"
      >
        <button className="btn btn-success">Download file</button>
      </Link>
    </div>
  );
}

export default PremiumDownload;
