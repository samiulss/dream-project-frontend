import { WhatsAppWidget } from 'react-whatsapp-widget';
import 'react-whatsapp-widget/dist/index.css';
// import { ReactComponent as CompanyIcon } from '../../assets/icons/whatsapp.png';
import { Toaster } from 'react-hot-toast';
import './help.scss';

function Help() {
  return (
    <>
      <Toaster />
      <WhatsAppWidget
        phoneNumber="8801783086680"
        replyTimeText="Typically replies within an hour"
        companyName="Noxakar"
      />
    </>
  );
}

export default Help;
