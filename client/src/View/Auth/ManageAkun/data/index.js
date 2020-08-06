import Profile from "../sections/Profile";
import HistoryOrder from "../sections/HistoryOrder";
import MyGrooming from "../sections/MyGrooming";
import KartuSehat from "../sections/KartuSehat";

export const dataTabManageAkun = [
  {
    name: "Profile",
    icon: "person",
    component: Profile
  },
  {
    name: "History Order",
    icon: "history",
    component: HistoryOrder
  },
  {
    name: "My Grooming",
    icon: "pets",
    component: MyGrooming
  },
  {
    name: "Kartu Sehat",
    icon: "pets",
    component: KartuSehat
  }
];
