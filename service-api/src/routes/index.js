import PageDefaultLayout from "~/pages/PageDefaultLayout";
import PageSingUpToPurchase from "~/pages/PageSingUpToPurchase";
import PageConfirmRegistration from "~/pages/PageConfirmRegistration";
import PageSuccessfulRegistration from "~/pages/PageSuccessfulRegistration";
import PageServiceRegistration from "~/pages/PageServiceRegistration";
import PageManagePack from "~/pages/PageManagePack";
import PageRegister from "~/pages/PageRegister";
import PageAdminManagePack from "~/pages/PageAdminManagePack";
import PageManageApiToken from "~/pages/PageManageApiToken";
import PageAdminManageOder from "~/pages/PageAdminManageOder";
import PageAdminManageApiToken from "~/pages/PageAdminManageApiToken";

const publicRoutes = [
  { path: "/", compoment: PageDefaultLayout, layout: PageDefaultLayout },
  {
    path: "/PageSingUpToPurchase",
    compoment: PageSingUpToPurchase,
    layout: PageSingUpToPurchase,
  },
  {
    path: "/PageServiceRegistration",
    compoment: PageServiceRegistration,
    layout: PageServiceRegistration,
  },
  {
    path: "/PageConfirmRegistration",
    compoment: PageConfirmRegistration,
    layout: PageConfirmRegistration,
  },
  {
    path: "/PageSuccessfulRegistration",
    compoment: PageSuccessfulRegistration,
    layout: PageSuccessfulRegistration,
  },
  {
    path: "/PageManagePack",
    compoment: PageManagePack,
    layout: PageManagePack,
  },
  {
    path: "/PageManageApiToken",
    compoment: PageManageApiToken,
    layout: PageManageApiToken,
  },
  {
    path: "/PageRegister",
    compoment: PageRegister,
    layout: PageRegister,
  },
  {
    path: "/PageAdminManagePack",
    compoment: PageAdminManagePack,
    layout: PageAdminManagePack,
  },
  {
    path: "/PageAdminManageOder",
    compoment: PageAdminManageOder,
    layout: PageAdminManageOder,
  },
  {
    path: "/PageAdminManageApiToken",
    compoment: PageAdminManageApiToken,
    layout: PageAdminManageApiToken,
  },
];
const privateRoutes = [];
export { publicRoutes, privateRoutes };
