import { DefaultLayout, Content } from "~/compoment/Layout";
import { widthContext } from "~/compoment/Layout/DefaultLayout";
import { useContext } from "react";
import ServiceRegistration from "~/compoment/Layout/DefaultLayout/ServiceRegistration";
function PageServiceRegistration() {
  return (
    <>
      <DefaultLayout layout={<ServiceRegistration />} />
    </>
  );
}
export default PageServiceRegistration;
