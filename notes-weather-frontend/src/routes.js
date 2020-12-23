/*!

=========================================================
* Paper Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// import Dashboard from "./views/Dashboard";
// import Icons from "./views/Icons.js";
// import Maps from "./views/Map.js";
import NotesPage from './pages/notespage.component';
// import Notifications from "./views/Notifications.js";
import Searches from "../src/pages/searchespage.component"
// import TableList from "./views/Tables.js";
// import Typography from "./views/Typography.js";
// import UpgradeToPro from "./views/Upgrade.js";
// import UserPage from "./views/User.js";

var routes = [
  {
    path: "/notes",
    name: "Notes",
    icon: "nc-icon nc-paper",
    component: NotesPage,
    layout: "/admin",
  },
  {
    path: "/searches",
    name: "Weather Searches",
    icon: "nc-icon nc-globe-2",
    component: Searches,
    layout: "/admin",
  },
  // {
  //   path: "/dashboard",
  //   name: "Dashboard",
  //   icon: "nc-icon nc-bank",
  //   component: Dashboard,
  //   layout: "/admin",
  // },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "nc-icon nc-diamond",
  //   component: Icons,
  //   layout: "/admin",
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "nc-icon nc-pin-3",
  //   component: Maps,
  //   layout: "/admin",
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "nc-icon nc-bell-55",
  //   component: Notifications,
  //   layout: "/admin",
  // },
  // {
  //   path: "/user-page",
  //   name: "User Profile",
  //   icon: "nc-icon nc-single-02",
  //   component: UserPage,
  //   layout: "/admin",
  // },
  // {
  //   path: "/tables",
  //   name: "Table List",
  //   icon: "nc-icon nc-tile-56",
  //   component: TableList,
  //   layout: "/admin",
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "nc-icon nc-caps-small",
  //   component: Typography,
  //   layout: "/admin",
  // },
  // {
  //   pro: true,
  //   path: "/upgrade",
  //   name: "Upgrade to PRO",
  //   icon: "nc-icon nc-spaceship",
  //   component: UpgradeToPro,
  //   layout: "/admin",
  // }, 
];
export default routes;
