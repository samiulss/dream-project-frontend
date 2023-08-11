import { Link } from 'react-router-dom';
import logo from '../../assets/freeLogo.png';
import './footer.scss';

function Footer() {
  return (
    <footer className="container-fluid footer">
      <div className="row">
        <div className="col-md-3">
          <h5>Content</h5>
          <ul>
            <li>Calendar of festivities</li>
            <li>New assets</li>
            <li>The most popular content</li>
            <li>Search trends</li>
            <li>Blog</li>
          </ul>
        </div>
        <div className="col-md-3">
          <h5>Information</h5>
          <ul>
            <li>Pricing</li>
            <li>About us</li>
            <li>Business</li>
            <li>Sell your content</li>
          </ul>
        </div>
        <div className="col-md-3">
          <h5>Support</h5>
          <ul>
            <li>FAQ</li>
            <li>Help Centre</li>
            <li>How it Works</li>
            <li>Be A Member</li>
          </ul>
        </div>
        <div className="col-md-3">
          <h5>Legal</h5>
          <ul>
            <li>Terms and conditions</li>
            <li>license agreement</li>
            <li>Privacy policy</li>
            <li>Copyright information</li>
            <li>Cookies policy</li>
          </ul>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="follow-us d-flex mb-5">
            <span className="base-color-1 fs-5 fw-semibold">Folow Us</span>
            <div className="icons d-flex">
              <Link to="https://www.facebook.com/noxakar" target="_blank">
                <i className="fa-brands fa-facebook" />
              </Link>
              <i className="fa-brands fa-instagram" />
              <i className="fa-brands fa-behance" />
              <i className="fa-brands fa-dribbble" />
              <i className="fa-brands fa-youtube" />
              <i className="fa-brands fa-twitter" />
              <i className="fa-brands fa-linkedin" />
              <i className="fa-brands fa-pinterest" />
            </div>
          </div>
        </div>
      </div>
      <hr className="text-white" />

      <div className="copyright mt-4">
        <img className="me-3" src={logo} alt="" />
        {' '}
        <span className="text-white">
          Copyright &#169;
          {' '}
          {new Date().getFullYear()}
          {' '}
          All rights reserved
        </span>
      </div>
    </footer>
  );
}

export default Footer;
