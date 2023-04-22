import { DefaultLayout, Content } from "~/compoment/Layout";
import { widthContext } from "~/compoment/Layout/DefaultLayout";
import { useContext } from "react";
import ManageApi from "~/compoment/Layout/DefaultLayout/ManageApiToken";
import ServiceRegistration from "~/compoment/Layout/DefaultLayout/ServiceRegistration";
function PageDefaultLayout() {
  return (
    <>
      <DefaultLayout />
    </>
  );
}
export default PageDefaultLayout;
