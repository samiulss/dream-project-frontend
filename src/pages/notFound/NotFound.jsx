import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="vh-100 d-flex align-items-center justify-content-center flex-column">
      <h2>Page not found</h2>
      <Link to="/">Home</Link>
    </div>
  );
}

export default NotFound;
