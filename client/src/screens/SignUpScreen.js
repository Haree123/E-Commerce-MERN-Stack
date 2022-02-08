import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import './css/Signup.css';
import Loader from '../components/Loader';
import { authAction } from '../redux/authRedux';

const SignUpScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [phoneNo, setPhoneNo] = useState();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const Submit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      setMessage('Please Enter All Fields');
    } else {
      if (password === confirmPassword) {
        let details = { name, email, password, phoneNo };
        setLoading(true);
        return await axios
          .post('/signup', details)
          .then((response) => {
            if (response.data.message === 'User Already exists') {
              setMessage('User Already Exists');
            }
            if (response.data.message === 'Registered') {
              navigate('/', { replace: true });
              dispatch(
                authAction({
                  authenticated: true,
                  name: response.data.name,
                  email: response.data.email,
                })
              );
            }
          })
          .catch((err) => {
            console.log(err);
            dispatch(
              authAction({
                authenticated: false,
                name: null,
                email: null,
              })
            );
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }
  };

  return loading ? (
    <>
      <Loader loading={loading} />
    </>
  ) : (
    <div className='signup'>
      <p className='signup-title'>SIGN UP</p>

      <form className='signup-form' onSubmit={(e) => Submit(e)}>
        <p>Name *</p>
        <input
          type='text'
          defaultValue={name}
          onChange={(e) => setName(e.target.value)}
        />
        <p>Phone Number</p>
        <input
          type='number'
          value={phoneNo}
          onChange={(e) => setPhoneNo(e.target.value)}
        />
        <p>Email *</p>
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p>Password *</p>
        <input
          type='password'
          value={password}
          autoComplete='off'
          onChange={(e) => setPassword(e.target.value)}
        />
        <p>Confirm Password *</p>
        <input
          type='password'
          value={confirmPassword}
          autoComplete='off'
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <br />
        {setMessage && <p>{message}</p>}
        {setMessage && <br />}
        <button className='signup-submit' type='submit'>
          REGISTER
        </button>
        <p>
          <small>
            Have an Account?{' '}
            <span>
              <Link className='link-tag-nostyle' to='/signin'>
                <b>Sign In</b>
              </Link>
            </span>
          </small>
        </p>
      </form>
    </div>
  );
};

export default SignUpScreen;
