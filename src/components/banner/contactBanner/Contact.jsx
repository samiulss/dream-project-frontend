import image1 from '../../../assets/images/PNG-3.png';
import './contact.scss';

function Contact() {
  return (
    <div className="contact rounded-4">
      <div className="row m-0 w-100 align-items-center">
        <div className="col-md-6">
          <div className="fit-with-content">
            <h2 className="text-white">
              We provide you the most
              {' '}
              <br />
              {' '}
              up-to-date
              {' '}
              <span className="base-color-2 fw-bold">Websites</span>
              {' '}
              <br />
              {' '}
              at affordable prices
            </h2>
            <button type="button" className="btn w-100 p-0 base-color-1 bg-white">How to contact</button>
          </div>
        </div>
        <div className="col-md-6 sliding-image text-end">
          <img className="img-fluid" src={image1} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Contact;
