import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer } from 'react';
// utils
import axios from '../utils/axios';
import { isValidToken, setSession } from '../utils/jwt';
import { serverUrl } from '../config';

// ----------------------------------------------------------------------

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
  REGISTER: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

const AuthContext = createContext({
  ...initialState,
  method: 'jwt',
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
});

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
  children: PropTypes.node,
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);

          const user = {
            userId : localStorage.getItem("userId"),
            username : localStorage.getItem("username"),
            firstname : localStorage.getItem("firstname"),
            lastname : localStorage.getItem("lastname"),
            initials : localStorage.getItem("initials"),
            email : localStorage.getItem("email"),
            title : localStorage.getItem("title"),
            cutomerId : localStorage.getItem("cutomerId"),
            access : localStorage.getItem("access"),
            UAL : localStorage.getItem("UAL"),
            accessPricing : localStorage.getItem("accessPricing"),
            createdDate : localStorage.getItem("created_date")
          }

          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              user,
            },
          });
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const login = async (email, password) => {
    const response = await axios.post((`${serverUrl}/api/auth/login`), {
      email,
      password,
    });

    // const user = _userList.filter((item) => item.email === email);
    // if (password !== '1234') return;

    const { action, data, accessToken } = response.data;

    if (action === 'success') {
      setSession(accessToken);
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('userId', data[0].id);
      localStorage.setItem('username', data[0].username);
      localStorage.setItem('firstname', data[0].first_name);
      localStorage.setItem('lastname', data[0].last_name);
      localStorage.setItem('initials', data[0].initials);
      localStorage.setItem('email', data[0].email);
      localStorage.setItem('title', data[0].title);
      localStorage.setItem('customerId', data[0].customer_id);
      localStorage.setItem('access', data[0].access);
      localStorage.setItem('UAL', data[0].access_level);
      localStorage.setItem('accessPricing', data[0].access_pricing);
      localStorage.setItem('createdDate', data[0].created_date);

      dispatch({
        type: 'LOGIN',
        payload: {
          user: data,
        },
      });
    }

    return action;
  };

  const register = async (email, password, firstName, lastName) => {
    const response = await axios.post('/api/account/register', {
      email,
      password,
      firstName,
      lastName,
    });
    const { accessToken, user } = response.data;

    localStorage.setItem('accessToken', accessToken);

    dispatch({
      type: 'REGISTER',
      payload: {
        user,
      },
    });
  };

  const logout = async () => {
    setSession(null);
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
