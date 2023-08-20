import ContentContainer from '../../components/contentContainer/ContentContainer';
import Footer from '../../components/footer/Footer';
import Help from '../../components/help/Help';
import MainNavbar from '../../components/mainNavbar/MainNavbar';
import './content.scss';

function Content() {
  return (
    <>
      <MainNavbar />
      <ContentContainer />
      {/* -------------------GET HELP------------------- */}
      <Help />
      <Footer />
    </>
  );
}

export default Content;
