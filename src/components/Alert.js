import { useEffect } from 'react';

const Alert = ({ type, msg, removeAlert, list }) => {
  useEffect(() => {
    const timeOut = setTimeout(() => {
      removeAlert();
    }, 3500);
    return () => clearTimeout(timeOut);
  }, [list, removeAlert]);
  return <p className={`alert show-alert alert-${type}`}>{msg}</p>;
};

export default Alert;
