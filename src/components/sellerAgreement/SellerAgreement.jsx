import axios from 'axios';
import toast from 'react-hot-toast';
import { rootUrl } from '../../../config/backendUrl';
import { config } from '../../../config/tokenVerify';
import { ContentState } from '../../context/StateContext';

function SellerAgreement() {
  const { auth, loggedInUser, setPopUpModal } = ContentState();

  // BECOME A SELLER
  const handleBeSeller = async () => {
    try {
      const { data } = await axios.post(
        `${rootUrl}/api/becomeSeller`,
        { email: loggedInUser.email },
        config(auth)
      );
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
      toast.success('You are a seller now');
      setPopUpModal(false);
      localStorage.setItem('token', data);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
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
        <button
          onClick={handleBeSeller}
          className="btn base-bg-color-2 text-white"
        >
          Agree
        </button>
      </div>
    </div>
  );
}

export default SellerAgreement;
