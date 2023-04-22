import { AdminLayout, Content } from "~/compoment/Layout";
import { useContext } from "react";
import AdminManagePack from "~/compoment/Layout/AdminLayout/AdminManagePack";
function PageAdminManagePack() {
  return (
    <>
      <AdminLayout layout={<AdminManagePack />} />
    </>
  );
}
export default PageAdminManagePack;
