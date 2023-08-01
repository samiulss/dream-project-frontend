import { Link } from 'react-router-dom';
import logo from '../../assets/freeLogo.png';
import './navbar.scss';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg mb-4 pt-4">
      <div className="container-fluid p-0">
        <Link to="/">
          <img className="site-logo me-4" title="Home" src={logo} alt="" />
        </Link>
        <button className="navbar-toggler shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 align-items-center">
            <li className="nav-item">
              <Link className="nav-link" to="/client">Our Client</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/project">Our Project</Link>
            </li>
            {/* <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Dropdown
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Action</a></li>
                <li><a className="dropdown-item" href="#">Another action</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </li> */}
            <li className="nav-item">
              <a className="nav-link " href="#">About Us</a>
            </li>
            <li className="nav-item border rounded-pill hire-us-btn">
              <a className="nav-link" href="#">Hire Us</a>
            </li>
          </ul>

          {/* ------------------SEARCH BOX DESIGN------------------ */}
          <form className="d-flex border rounded-pill" role="search">
            <input className="form-control shadow-none bg-transparent text-white border border-0 border-end rounded-0" type="search" placeholder="Search..." aria-label="Search" />
            <button className="btn pb-0" type="button">
              <span className="svg-icon search" />
            </button>
          </form>
          <div className="user-profile" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            <span className="svg-icon avater" />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
