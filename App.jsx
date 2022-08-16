import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect } from "react";
import { useStateValue } from "./context/StateProvider";
import { useTitle } from "./hooks/useTitle";
import { ToastContainer } from "react-toastify";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Checkout from "./components/checkout/Checkout";
import Payment from "./components/payment/Payment";
import Orders from "./components/orders/Orders";
import Login from "./components/login/Login";
import { aboutMe } from "./api/user-api";
import { getToken } from "./services/authService";
import "react-toastify/dist/ReactToastify.css"
import "./App.css";


function App() {
  const [, dispatch] = useStateValue();
  const token = getToken()
  useTitle("MyZone");
  useEffect(() => {
    if (token) {
      aboutMe()
        .then((about) => {
          dispatch({
            type: "SET_USER",
            user: about
          });
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }, [token, dispatch]);

  return (
    <>
      <Router>
        <ToastContainer />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Home />
              </>
            }
          />

          <Route
            path="/checkout"
            element={props => <ProtectedRoute
              props={props}
              component={
                <>
                  <Header />
                  <Checkout />
                </>
              }
            />}
          />

          <Route
            path="/payment"
            element={token ? <Payment /> : <Navigate to="/login" />}
          />

          <Route
            path="/orders"
            element={false ? <Orders /> : <Navigate to="/login" />}
          />

          <Route
            path="/login"
            element={!token ? <Login /> : <Navigate to="/" />}
          />

        </Routes>
      </Router>
    </>
  );
}

export default App;
