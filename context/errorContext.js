import React, {createContext, useState} from 'react';

export const errorContext = createContext();

const ErrorContextProvider = props => {
  const [errorMsg, setMsg] = useState({});
  const [errorStatus, setStatus] = useState(null);
  const [errorId, setId] = useState(null);

  const getErrors = (msg_, status_, id_ = null) => {
    setMsg(msg_);
    setStatus(status_);
    setId(id_);
  };

  const clearErrors = () => {
    setMsg({});
    setStatus(null);
    setId(null);
  };

  return (
    <errorContext.Provider
      value={{errorMsg, errorStatus, errorId, getErrors, clearErrors}}>
      {props.children}
    </errorContext.Provider>
  );
};

export default ErrorContextProvider;
