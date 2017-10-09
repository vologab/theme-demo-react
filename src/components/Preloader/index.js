import React from 'react';
import { CircularProgress } from 'material-ui/Progress';

import './Preloader.css';

const Preloader = () => <CircularProgress size={50} className="preloader" />;

export default Preloader;
