import Login from "../components/Login/Login";
import Signup from '../components/Register/Register'

export const LINKS_WITHOUT_AUTH = [
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/register",
    name: "Signup",
    component: Signup
  }
];

export const LINKS_WITH_AUTH = [
  {
    path: "/login",
    name: "Login",
    component: Login
  }
];
