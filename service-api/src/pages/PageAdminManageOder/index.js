import { AdminLayout, Content } from "~/compoment/Layout";
import { useContext } from "react";
import AdminManageOder from "~/compoment/Layout/AdminLayout/AdminManageOder";
function PageAdminManageOder() {
  return (
    <>
      <AdminLayout layout={<AdminManageOder />} />
    </>
  );
}
export default PageAdminManageOder;
