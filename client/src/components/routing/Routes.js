// import React from "react";
// import { Route, Switch } from "react-router-dom";
// import Register from "../auth/Register";
// import Login from "../auth/Login";
// import Alert from "../layout/Alert";
// import Dashboard from "../dashboard/Dashboard";
// import CreateProfile from "../profile-forms/CreateProfile";
// import EditProfile from "../profile-forms/EditProfile";
// import NotFound from "../layout/NotFound";
// import PrivateRoute from "../routing/PrivateRoute";

// const Routes = () => {
//   return (
//     <div>
//       <section className="container">
//         <Alert />
//         <Switch>
//           <Route exact path="/register" component={Register} />
//           <Route exact path="/login" component={Login} />
//           <PrivateRoute exact path="/dashboard" component={Dashboard} />
//           <PrivateRoute
//             exact
//             path="/create-profile"
//             component={CreateProfile}
//           />
//           <PrivateRoute exact path="/edit-profile" component={EditProfile} />
//           <Route component={NotFound} />
//         </Switch>
//       </section>
//     </div>
//   );
// };

// export default Routes;
