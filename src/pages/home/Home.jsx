import Contact from '../../components/banner/contactBanner/Contact';
import Services from '../../components/banner/services/Services';
import Button from '../../components/commons/Button';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import Help from '../../components/help/Help';
import JoinButtons from '../../components/joinButtons/JoinButtons';
import Navbar from '../../components/navbar/Navbar';
import SubNavbar from '../../components/subNavbar/SubNavbar';
import './home.scss';

function Home() {
  return (
    <div className="home p-0">

      {/* -------------------BANNER AND HEADER SECTION------------------- */}
      <section className="gradient-background pb-5">

        {/* -------------------NAV SECTION------------------- */}
        <div className="container">
          <Navbar />
          <SubNavbar />

          {/* -------------------HEADER SECTION------------------- */}
          <div className="row align-items-center banner-area">
            <Header />
          </div>
          <div className="row">
            <div className="col-md-3 three-btns">
              <JoinButtons />
            </div>
          </div>
        </div>
      </section>

      <Button btn="signUp" />

      {/* -------------------CONTACT BANNER SECTION------------------- */}
      <section className="contact-banner">
        <Contact />
      </section>

      <Button />

      {/* -------------------SERVICES BANNER SECTION------------------- */}
      <section className="services-banner">
        <Services />
      </section>

      {/* -------------------GET HELP------------------- */}
      <Help />

      {/* -------------------FOOTER SECTION------------------- */}
      <Footer />
    </div>
  );
}

export default Home;
