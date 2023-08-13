import axios from 'axios';
import {
  lazy, Suspense, useEffect, useState
} from 'react';
import { useParams } from 'react-router-dom';
import { rootUrl } from '../../../config/backendUrl';
import Loadng from '../commons/loading/Loadng';
import Spinner from '../commons/spinner/Spinner';
import MainNavbar from '../mainNavbar/MainNavbar';

const Profile = lazy(() => import('../profile/Profile'));

function SellerContentProfile() {
  const { sellerId } = useParams();

  const [contents, setContents] = useState([]);

  //
  const fetchSellerProfile = async () => {
    try {
      const { data } = await axios.get(
        `${rootUrl}/api/sellerProfile?sellerId=${sellerId}`
      );
      setContents(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchSellerProfile();
  }, []);

  return (
    <div>
      <MainNavbar />
      {contents.length ? (
        <Suspense fallback={<Spinner />}>
          <Profile fullDetails={false} contents={contents} />
        </Suspense>
      ) : (
        <div className="no-contentloading d-flex align-items-center justify-content-center vh-100">
          <Loadng />
        </div>
      )}
    </div>
  );
}

export default SellerContentProfile;
