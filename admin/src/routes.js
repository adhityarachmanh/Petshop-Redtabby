// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import Notifications from "@material-ui/icons/Notifications";

// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import TableList from "views/TableList/TableList.jsx";
import Typography from "views/Typography/Typography.jsx";
import Icons from "views/Icons/Icons.jsx";
import NotificationsPage from "views/Notifications/Notifications.jsx";
import ManageShop from "views/ManageShop/ManageShop";
import ManageItem from "views/ManageItem/ManageItem";
import EditItemShop from "views/ManageItem/manage/EditItemShop";
import AddItemShop from "views/ManageItem/manage/AddItemShop";
import ManageUser from "views/ManageUser/ManageUser";
import OrderSuccess from "views/ManageOrder/OrderSuccess";
import OrderWaiting from "views/ManageOrder/OrderWaiting";
import ManageGrooming from "views/ManageGrooming/ManageGrooming";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/manage-shop",
    name: "Manage Shop",
    icon: "content_paste",
    component: ManageShop,
    layout: "/admin"
  },
  {
    path: "/manage-order-success",
    name: "Manage Order (Success)",
    icon: "store",
    component: OrderSuccess,
    layout: "/admin"
  },
  {
    path: "/manage-order-waiting",
    name: "Manage Order (Waiting)",
    icon: "store",
    component: OrderWaiting,
    layout: "/admin"
  },
  {
    path: "/manage-grooming",
    name: "Manage Grooming",
    icon: "pets",
    component: ManageGrooming,
    layout: "/admin"
  },
  {
    path: "/manage-users",
    name: "Manage User",
    icon: "person",
    component: ManageUser,
    layout: "/admin"
  },
  {
    cabang: true,
    path: "/manage-item/:category",
    component: ManageItem,
    layout: "/admin"
  },
  {
    cabang: true,
    path: "/edit-item/:category/:id",
    component: EditItemShop,
    layout: "/admin"
  },
  {
    cabang: true,
    path: "/add-item/:category",
    component: AddItemShop,
    layout: "/admin"
  }
  // {
  //   path: "/table",
  //   name: "Table List",
  //   icon: "content_paste",
  //   component: TableList,
  //   layout: "/admin"
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   rtlName: "طباعة",
  //   icon: LibraryBooks,
  //   component: Typography,
  //   layout: "/admin"
  // },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   rtlName: "الرموز",
  //   icon: BubbleChart,
  //   component: Icons,
  //   layout: "/admin"
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   rtlName: "إخطارات",
  //   icon: Notifications,
  //   component: NotificationsPage,
  //   layout: "/admin"
  // }
];

export default dashboardRoutes;
