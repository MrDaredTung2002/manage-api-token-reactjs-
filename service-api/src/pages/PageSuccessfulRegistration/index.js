import { DefaultLayout, Content } from "~/compoment/Layout";
import { widthContext } from "~/compoment/Layout/DefaultLayout";
import { useContext } from "react";
import SuccessfulRegistration from "~/compoment/Layout/DefaultLayout/SuccessfulRegistration";
function PageSuccessfulRegistration() {
  return (
    <>
      <DefaultLayout layout={<SuccessfulRegistration />} />
    </>
  );
}
export default PageSuccessfulRegistration;
