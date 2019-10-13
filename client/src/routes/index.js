import { Login, Scheduler, Register } from "../pages";

const routes = [
  {
    path: "/login",
    component: Login,
    exact: true
  },
  {
    path: "/register",
    component: Register,
    exact: true
  },
  {
    path: "/",
    component: Scheduler,
    exact: true,
    protected: true
  }
];

export default routes;
