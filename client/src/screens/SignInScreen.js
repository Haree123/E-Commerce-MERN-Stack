import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import './css/Signin.css';
import Loader from './../components/Loader';
import { authAction } from '../redux/authRedux';

const SignInScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();

  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const from = state ? state.from.pathname : '/';

  const Submit = async (e) => {
    e.preventDefault();
    let data = { email, password };

    if (!email || !password) {
      setMessage('Please Enter All Fields');
    } else {
      setLoading(true);
      return await axios
        .post('/signin', data)
        .then((res) => {
          if (res.data.message === 'Invalid Credentials') {
            setMessage('Invalid Credentials');
          }
          if (res.data.message === 'Logged In') {
            dispatch(
              authAction({
                autenticated: true,
                name: res.data.name,
                email: res.data.email,
              })
            );
            localStorage.setItem('logged_in_status', JSON.stringify(true));
            navigate(from, { replace: true });
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return loading ? (
    <>
      <Loader loading={loading} />
    </>
  ) : (
    <>
      <div className='signin'>
        <p className='signin-title'>SIGN IN</p>
        <form className='signin-form' onSubmit={(e) => Submit(e)}>
          <p>Email</p>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p>Password</p>
          <input
            type='password'
            autoComplete='off'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          {setMessage && <p>{message}</p>}
          {setMessage && <br />}
          <button className='signin-submit' type='submit'>
            SIGN IN
          </button>
          <p>
            <small>
              Don't have an Account?{' '}
              <span>
                <Link className='link-tag-nostyle' to='/signup'>
                  <b>Sign Up</b>
                </Link>
              </span>
            </small>
          </p>
        </form>
      </div>
    </>
  );
};

export default SignInScreen;
