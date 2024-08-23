import ReactDOM from "react-dom/client";
import { createBrowserRouter, BrowserRouter, Routes, Route, createRoutesFromElements, RouterProvider, Link, Outlet } from "react-router-dom";
import Login from "../pages/Login";
import CreateAccount from "../pages/CreateAccount";
import Landing from "../pages/Landing";


function Router() {
    const Router = createBrowserRouter(
        createRoutesFromElements(
          <Route exact path="/" element={<Root />}>   
          <Route index element={<Landing/>}/>
          <Route path="/login" element={< Login />} />
          <Route path="/create-account" element={< CreateAccount />} />

        </Route>
        )
      )
  return (
    <RouterProvider router={Router}/>
  );
}
const Root = () => {
  return(
  <>
  <div>
  <Outlet/>
  </div>
  </>
  );
}
export default Router;
