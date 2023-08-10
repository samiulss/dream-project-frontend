import { Link } from 'react-router-dom';
import logo from '../../../assets/freeLogo.png';
import MobileSidebar from '../../../components/commons/mobileSidebar/MobileSidebar';

function NavbarAdmin() {
  const menuNames = ['Pending', 'Reports', 'Users', 'Money', 'Download', 'All Content'];
  const pathnames = ['/admin-panel/pending'];

  const menu = [{
    menuNames,
    pathnames
  }];
  return (
    <nav className="navbar navbar-expand-lg base-bg-color-1 position-sticky z-3">
      <div className="container-fluid">

        {/* ---------------HOME BUTTON--------------- */}
        <Link to="/admin-panel">
          <img className="site-logo me-4" title="Home" src={logo} alt="" />
        </Link>

        <MobileSidebar menu={menu} bgColor="#2984ee" linkColor="text-dark" />

      </div>
    </nav>
  );
}

export default NavbarAdmin;
