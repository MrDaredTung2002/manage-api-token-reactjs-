import { DefaultLayout, Content } from "~/compoment/Layout";
import { widthContext } from "~/compoment/Layout/DefaultLayout";
import { useContext } from "react";
import ConfirmRegistration from "~/compoment/Layout/DefaultLayout/ConfirmRegistration";
function PageConfirmRegistration() {
  return (
    <>
      <DefaultLayout layout={<ConfirmRegistration />} />
    </>
  );
}
export default PageConfirmRegistration;
