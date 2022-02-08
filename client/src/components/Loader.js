import React from 'react';
import { PuffLoader } from 'react-spinners';

import './css/Loader.css';

const Loader = ({ loading }) => {
  return (
    <div className='loader'>
      <PuffLoader loading={loading ?? undefined ?? true} />
    </div>
  );
};

export default Loader;
