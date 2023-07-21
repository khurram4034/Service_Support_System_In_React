// ** React Imports
import { createContext, useState, ReactNode, useEffect } from "react";

// ** Axios
import axios from "axios";
import { useNavigate } from "react-router-dom";
// ** Config
// import authConfig from 'src/configs/auth'

// ** Defaults
interface AuthProviderValue {
  user: null | { email: string; token: string };
  loading: boolean;
  setUser: (user: null | { email: string; token: string }) => void;
  setLoading: (loading: boolean) => void;
  login: (params: { username: string; password: string }) => void;
  logout: () => void;
}
const defaultProvider: AuthProviderValue = {
  user: null,
  loading: false,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
};
const AuthContext = createContext(defaultProvider);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  // ** States
  const [user, setUser] = useState<AuthProviderValue["user"]>(
    defaultProvider.user
  );
  const navigate = useNavigate();
  const [loading, setLoading] = useState<AuthProviderValue["loading"]>(
    defaultProvider.loading
  );

  useEffect(() => {
    if (localStorage.getItem("user")) {
      let data = localStorage.getItem("user");
      if (data) {
        setUser(JSON.parse(data));
      }
    }
    // const initAuth = async () => {
    //   const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
    //   if (storedToken) {
    //     setLoading(true)
    //     await axios
    //       .get(authConfig.meEndpoint, {
    //         headers: {
    //           Authorization: storedToken
    //         }
    //       })
    //       .then(async (response: AxiosResponse) => {
    //         setLoading(false)
    //         setUser({ ...response.data.userData })
    //       })
    //       .catch((error: AxiosError) => {
    //         localStorage.removeItem('userData')
    //         localStorage.removeItem('refreshToken')
    //         localStorage.removeItem('accessToken')
    //         setUser(null)
    //         setLoading(false)
    //         if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
    //           router.replace('/login')
    //         }
    //       })
    //   } else {
    //     setLoading(false)
    //   }
    // }
    // initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = async (params: {
    username: string;
    password: string;
  }) => {
    try {
      setLoading(true);
      let response = await axios.post(
        "https://wosh-test.herokuapp.com/api/authorization/service/login",
        null,
        {
          params,
        }
      );
      console.log(response);
      // setUser({
      //   email: params.username,
      //   token:
      //       });

      navigate("/");
      if (response.data) {
        setUser({ email: params.username, token: response.data.token });
        localStorage.setItem(
          "user",
          JSON.stringify({
            email: params.username,
            token: response.data.token,
          })
        );
      } else {
        console.log(response.statusText);
      }
      setLoading(false);
    } catch (error) {
      alert(error);
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.clear()
    navigate("/login");
  };

  const values: AuthProviderValue = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
