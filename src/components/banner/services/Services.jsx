import image1 from '../../../assets/images/service-image.png';
import './services.scss';

function Services() {
  return (
    <div className="services text-dark">
      <div className="header text-center">
        <h3 className="base-bg-color-1 d-inline-block rounded-2 text-white fw-semibold">
          The services
          {' '}
          <span className="base-color-2">we provide to you</span>
        </h3>
      </div>
      <div className="row m-0">
        <div className="col-md-6 service-list">
          <ul>
            <li>
              <span><i className="fa-sharp fa-solid fa-arrow-right" /></span>
              Website Design
            </li>
            <li>
              <span><i className="fa-sharp fa-solid fa-arrow-right" /></span>
              Brand Identity
            </li>
            <li>
              <span><i className="fa-sharp fa-solid fa-arrow-right" /></span>
              Logo Design
            </li>
            <li>
              <span><i className="fa-sharp fa-solid fa-arrow-right" /></span>
              Book Cover Design
            </li>
            <li>
              <span><i className="fa-sharp fa-solid fa-arrow-right" /></span>
              Social Media Design
            </li>
            <li>
              <span><i className="fa-sharp fa-solid fa-arrow-right" /></span>
              Font Design
            </li>
            <li>
              <span><i className="fa-sharp fa-solid fa-arrow-right" /></span>
              Digital Illustration
            </li>
          </ul>
        </div>
        <div className="col-md-6">
          <img className="service-img" src={image1} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Services;
