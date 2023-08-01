import axios from 'axios';
import { useState } from 'react';
import googleIcon from '../../../assets/icons/google.svg';
import Loadng from '../../commons/loading/Loadng';
import './login.scss';

function Login() {
  const [btn, setBtn] = useState('login');
  const [showPass, setShowPass] = useState(false);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);
  const [otpEmail, setOtpEmail] = useState(null);

  // HANDLE LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const userData = {
      email: e.target[0].value,
      password: e.target[1].value
    };
    const config = {
      'Content-type': 'application/json; charset=UTF-8',
    };
    try {
      const { data } = await axios.post('https://dream-project-backend.onrender.com/api/login', userData, config);
      localStorage.setItem('user', JSON.stringify(data));
      setLoading(false);
      window.location.reload();
    } catch (error) {
      setLoading(false);
      setErr(error.response.data);
      console.log(error.response.data);
    }
  };

  // HANDLE SIGN UP
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    const userData = {
      name: e.target[0].value,
      email: e.target[1].value,
      password: e.target[2].value
    };
    const config = {
      'Content-type': 'application/json; charset=UTF-8',
    };
    try {
      const { data } = await axios.post('https://dream-project-backend.onrender.com/api/register', userData, config);
      localStorage.setItem('user', JSON.stringify(data));
      setLoading(false);
      window.location.reload();
    } catch (error) {
      setLoading(false);
      setErr(error.response.data);
    }
  };

  // HANDLE FORGET PASSWORD
  const handleForget = async (e) => {
    e.preventDefault();
    setLoading(true);

    const userData = {
      email: e.target[0].value,
    };
    const config = {
      'Content-type': 'application/json; charset=UTF-8',
    };
    try {
      const { data } = await axios.post('https://dream-project-backend.onrender.com/api/forgetPassword', userData, config);
      setOtpEmail(data);
      setBtn('verify');
      setLoading(false);
      setErr('An otp has been sent to your email');
    } catch (error) {
      setLoading(false);
      setErr(error.response.data);
    }
  };

  // VERIFY OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    const userData = {
      email: otpEmail.email,
      otp: e.target[0].value,
    };
    const config = {
      'Content-type': 'application/json; charset=UTF-8',
    };
    try {
      const { data } = await axios.post('https://dream-project-backend.onrender.com/api/verifyOtp', userData, config);
      console.log(data);
      setBtn('newPassword');
      setLoading(false);
      setErr(null);
    } catch (error) {
      setLoading(false);
      setErr(error.response.data);
    }
  };

  // RESET PASSWORD
  const handleChangePass = async (e) => {
    e.preventDefault();
    setLoading(true);

    const userData = {
      email: otpEmail.email,
      password: e.target[0].value,
    };
    const config = {
      'Content-type': 'application/json; charset=UTF-8',
    };
    try {
      const { data } = await axios.post('https://dream-project-backend.onrender.com/api/resetPassword', userData, config);
      console.log(data);
      setBtn('login');
      setLoading(false);
      setErr('Password change successfully');
    } catch (error) {
      setLoading(false);
      setErr(error.response.data);
    }
  };

  return (
    <>
      {/* <!-- Button trigger modal --> */}
      <button onClick={() => setBtn('login')} type="button" className="btn btn-login gradient-button border rounded-5" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Log In</button>
      <button onClick={() => setBtn('signup')} type="button" className="btn btn-signup border rounded-5 text-white" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Sign Up</button>

      {/* <!-- Modal --> */}
      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered login-modal">
          <div className="modal-content overflow-hidden">
            <div className="gradient-background">

              <div style={{ gap: '30%', height: '70px' }} className="modal-header login-modal border-0 rounded-0 justify-content-around p-0">
                <h1 onClick={() => setBtn('login')} className={`modal-title fs-5 text-white ${btn !== 'login' && 'opacity-50'}`} id="staticBackdropLabel">Log In</h1>
                <h1 onClick={() => setBtn('signup')} className={`modal-title fs-5 text-white ${btn !== 'signup' && 'opacity-50'}`}>Sign Up</h1>
              </div>
              <div title="Close" className="close-btn rounded-5 text-end" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <div className="terms-condition">
                <p className="text-center">
                  By creating an account you are accepting our
                  {' '}
                  <span className="fw-bold">Terms and Conditions</span>
                </p>
              </div>

              {/* --------------INPUT FORM-------------- */}
              <form
                onSubmit={
                (btn === 'login' ? handleLogin : undefined)
                || (btn === 'signup' ? handleSignup : undefined)
                || (btn === 'next' ? handleForget : undefined)
                || (btn === 'verify' ? handleVerifyOtp : undefined)
                || (btn === 'newPassword' ? handleChangePass : undefined)
              }
                className="w-100 mb-2"
              >
                {
                (btn === 'signup' || btn === 'verify')
                && (
                <div className="mb-3 input-box">
                  <label htmlFor="userName"><span className="svg-icon user-icon" /></label>
                  <input type="text" className="form-control pe-0 rounded-5 shadow-none" id="userName" placeholder={btn === 'signup' ? 'Your Name' : 'Code'} required />
                </div>
                )
              }
                {
                (btn === 'signup' || btn === 'login' || btn === 'next')
                && (
                <div className="mb-3 input-box">
                  <label htmlFor="email"><span className="svg-icon email-icon" /></label>
                  <input type="email" className="form-control pe-0 rounded-5 shadow-none" id="email" placeholder="Email Address" autoComplete="email" required />
                </div>
                )
                }

                {
                (btn === 'login' || btn === 'signup' || btn === 'newPassword')
                  && (
                  <div className="mb-3 input-box">
                    <label htmlFor="password"><span className="svg-icon password-icon" /></label>
                    <input style={{ paddingRight: '10px' }} type={showPass ? 'text' : 'password'} className="form-control rounded-5 shadow-none" id="password" placeholder={btn === 'newPassword' ? 'New password' : 'Password'} autoComplete="current-password" required />
                    { showPass
                      ? <span onClick={() => setShowPass(!showPass)} className="svg-icon hide-pass" />
                      : <span onClick={() => setShowPass(!showPass)} className="svg-icon show-pass" />}
                  </div>
                  )
                }

                {/* --------------ERROR MESSAGE-------------- */}
                {err && <p className="text-primary text-center">{err}</p>}

                {/* --------------SUBMIT BUTTONS-------------- */}
                {
                    btn === 'login'
                      && (
                      <button type="submit" className="btn w-100 rounded-5 gradient-button mb-2" disabled={loading}>
                        {loading ? <Loadng /> : 'Log In'}
                      </button>
                      )
                }
                {

                    btn === 'signup'
                      && (
                      <button type="submit" className="btn w-100 rounded-5 gradient-button mb-2" disabled={loading}>
                        {loading ? <Loadng /> : 'Sign Up'}
                      </button>
                      )
                }
                {

                    btn === 'next'
                      && (
                      <button type="submit" className="btn w-100 rounded-5 gradient-button mb-2" disabled={loading}>
                        {loading ? <Loadng /> : 'Next'}
                      </button>
                      )
                }
                {

                    btn === 'verify'
                      && (
                      <button type="submit" className="btn w-100 rounded-5 gradient-button mb-2" disabled={loading}>
                        {loading ? <Loadng /> : 'Verify'}
                      </button>
                      )
                }
                {

                    btn === 'newPassword'
                      && (
                      <button type="submit" className="btn w-100 rounded-5 gradient-button mb-2" disabled={loading}>
                        {loading ? <Loadng /> : 'Change password'}
                      </button>
                      )
                }
              </form>

              {/* --------------REMEMBER AND FORGET PASSWORD-------------- */}
              {(btn === 'signup' || btn === 'login')
                && (
                <div className="remember-forget-google d-flex justify-content-between">
                  <div className="remember">
                    <input type="checkbox" name="" id="remember" />
                    {' '}
                    <label htmlFor="remember">Remember me</label>
                  </div>
                  {
                  btn === 'login'
                    ? (
                      <div className="forget">
                        <p onClick={() => setBtn('next')}>Forget Password?</p>
                      </div>
                    )
                    : (
                      <div className="google-sign-up d-flex align-items-center justify-content-center">
                        <span>Continue with</span>
                        <img style={{ width: '28px' }} className="rounded-5 ms-2" src={googleIcon} alt="" />
                      </div>
                    )
                }
                </div>
                )}

              {/* --------------------GOOGLE LOGIN OR SIGN UP-------------------- */}
              {
                    btn === 'login'
                      ? (
                        <div className="text-center mb-2">
                          <button type="submit" className="btn google-btn rounded-5 border">
                            Continue with
                            <img style={{ width: '28px' }} className="rounded-5 ms-2" src={googleIcon} alt="" />
                          </button>
                        </div>
                      )

                      : ''
                }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
