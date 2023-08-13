import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { rootUrl } from '../../../config/backendUrl';
import { config } from '../../../config/tokenVerify';
import { ContentState } from '../../context/StateContext';

function SellerAgreement() {
  const { auth, loggedInUser, setPopUpModal } = ContentState();

  const navigate = useNavigate();

  // BECOME A SELLER
  const handleBeSeller = async () => {
    const user = {
      userId: loggedInUser.id
    };
    try {
      const { data } = await axios.post(
        `${rootUrl}/api/beSeller`,
        user,
        config(auth)
      );
      setPopUpModal(false);
      localStorage.setItem('token', data.token);
      navigate('/upload');
      window.location.reload();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus
      praesentium esse illo aut voluptatibus molestiae at, suscipit tempora
      accusamus! Alias consectetur delectus aperiam placeat libero odit nihil
      voluptatem dolor fugit!
      <div className="text-end">
        <button onClick={handleBeSeller} className="btn base-bg-color-2 text-white">Agree</button>
      </div>
    </div>
  );
}

export default SellerAgreement;
