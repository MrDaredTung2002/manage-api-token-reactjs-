import { AdminLayout, Content } from "~/compoment/Layout";
import { useContext } from "react";
import AdminManageApiToken from "~/compoment/Layout/AdminLayout/AdminManageApiToken";
function PageAdminManageApiToken() {
  return (
    <>
      <AdminLayout layout={<AdminManageApiToken />} />
    </>
  );
}
export default PageAdminManageApiToken;
