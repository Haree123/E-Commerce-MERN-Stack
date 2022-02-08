import React from 'react';
import { Link } from 'react-router-dom';

const Checkout = ({ step1, step2, step3, step4 }) => {
  return (
    <div className='checkout'>
      {step1 ? (
        <Link>
          <p>SIGN IN</p>
        </Link>
      ) : (
        <p>SIGN IN</p>
      )}
      {step2 ? (
        <Link>
          <p>DELIVERY ADDRESS</p>
        </Link>
      ) : (
        <p>DELIVERY ADDRESS</p>
      )}
      {step3 ? (
        <Link>
          <p>ORDER SUMMARY</p>
        </Link>
      ) : (
        <p>ORDER SUMMARY</p>
      )}
      {step4 ? (
        <Link>
          <p>PAYMENT</p>
        </Link>
      ) : (
        <p>PAYMENT</p>
      )}
    </div>
  );
};

export default Checkout;
