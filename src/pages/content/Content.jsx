import { useParams } from 'react-router-dom';
import ContentContainer from '../../components/contentContainer/ContentContainer';
import Footer from '../../components/footer/Footer';
import Help from '../../components/help/Help';
import MainNavbar from '../../components/mainNavbar/MainNavbar';
import './content.scss';

function Content() {
  const { contentName } = useParams();
  return (
    <div>
      <MainNavbar />
      <ContentContainer />
      {/* -------------------GET HELP------------------- */}
      <Help />
      <Footer />
    </div>
  );
}

export default Content;
