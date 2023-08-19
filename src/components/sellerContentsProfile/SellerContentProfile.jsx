import axios from 'axios';
import {
  lazy, Suspense, useEffect, useState
} from 'react';
import { useParams } from 'react-router-dom';
import { rootUrl } from '../../../config/backendUrl';
import Spinner from '../commons/spinner/Spinner';
import MainNavbar from '../mainNavbar/MainNavbar';

const Profile = lazy(() => import('../profile/Profile'));

function SellerContentProfile() {
  const { sellerId } = useParams();

  const [contents, setContents] = useState([]);
  const [sellerProfile, setSellerProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // FETCH SELLER PROFILE AND CONTENTS
  const fetchSellerProfile = async () => {
    try {
      let { data } = await axios.get(
        `${rootUrl}/api/sellerProfile?sellerId=${sellerId}`
      );
      setLoading(false);
      setSellerProfile(data[0].author);
      data = data.reverse();
      setContents(data);
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchSellerProfile();
  }, []);

  return (
    <div>
      <MainNavbar />
      <Suspense fallback={<Spinner />}>
        {loading ? (
          <div className="d-flex align-items-center justify-content-center loading-spinner">
            <Spinner />
          </div>
        ) : (
          <Profile
            fullDetails={false}
            contents={contents}
            sellerProfile={sellerProfile}
          />
        )}
      </Suspense>
    </div>
  );
}

export default SellerContentProfile;
