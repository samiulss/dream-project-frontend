import bannerImage from '../../assets/images/banner.png';
import './header.scss';

function Header() {
  return (
    <>
      <div className="col-md-6">
        <h1 className="mb-5 text-white">
          Do you need
          {' '}
          <span className="fw-bold">Website</span>
          {' '}
          <br />
          {' '}
          for startup?
          {' '}
          <br />
          {' '}
          or looking for creative
          {' '}
          <br />
          {' '}
          <span className="fw-bold">Graphic Design</span>
          {' '}
          <br />
          {' '}
          for your business?
          <button type="button" className="btn border rounded-0 ms-3 p-1 ps-2 pe-2 text-white">Contact Us</button>
        </h1>
      </div>

      <div className="col-md-6 banner-img">
        <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={bannerImage} className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src={bannerImage} className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src={bannerImage} className="d-block w-100" alt="..." />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
