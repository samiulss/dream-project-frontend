import axios from 'axios';
import {
  lazy, Suspense, useEffect, useState
} from 'react';
import { useParams } from 'react-router-dom';
import { rootUrl } from '../../../config/backendUrl';
import Loading from '../commons/loading/Loading';
import Spinner from '../commons/spinner/Spinner';
import MainNavbar from '../mainNavbar/MainNavbar';

const Profile = lazy(() => import('../profile/Profile'));

function SellerContentProfile() {
  const { sellerId } = useParams();

  const [contents, setContents] = useState([]);
  const [sellerProfile, setSellerProfile] = useState(null);

  // FETCH SELLER PROFILE AND CONTENTS
  const fetchSellerProfile = async () => {
    try {
      let { data } = await axios.get(
        `${rootUrl}/api/sellerProfile?sellerId=${sellerId}`
      );
      setSellerProfile(data[0].author);
      data = data.reverse();
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
          <Profile fullDetails={false} contents={contents} sellerProfile={sellerProfile} />
        </Suspense>
      ) : (
        <div className="no-contentloading d-flex align-items-center justify-content-center vh-100">
          <Loading />
        </div>
      )}
    </div>
  );
}

export default SellerContentProfile;
