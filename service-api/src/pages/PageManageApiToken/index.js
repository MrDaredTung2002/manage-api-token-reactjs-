import { DefaultLayout, Content } from "~/compoment/Layout";
import ManageApiToken from "~/compoment/Layout/DefaultLayout/ManageApiToken";
function PageManageApiToken() {
  return (
    <>
      <DefaultLayout layout={<ManageApiToken />} />
    </>
  );
}
export default PageManageApiToken;
