import './adminLogin.scss';

function AdminLogin() {
  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-3 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card bg-dark text-white"
              style={{ borderRadius: '1rem' }}
            >
              <div className="card-body p-5 text-center">
                <form action="#">
                  <div className="mt-md-4 pb-5">
                    <h2 className="fw-bold mb-2 text-uppercase">Admin Login</h2>
                    <p className="text-white-50 mb-5">
                      Please enter your email and password!
                    </p>

                    <div className="form-outline form-white mb-4">
                      <input
                        type="email"
                        className="form-control form-control-lg"
                        placeholder="Email"
                      />
                    </div>

                    <div className="form-outline form-white mb-4">
                      <input
                        type="password"
                        className="form-control form-control-lg"
                        placeholder="Password"
                      />
                    </div>

                    <p className="small mb-5 pb-lg-2">
                      <a className="text-white-50" href="#!">
                        Forgot password?
                      </a>
                    </p>

                    <button
                      className="btn btn-outline-light text-white btn-lg px-5"
                      type="submit"
                    >
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AdminLogin;
