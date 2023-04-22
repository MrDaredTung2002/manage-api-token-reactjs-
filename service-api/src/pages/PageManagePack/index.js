import { DefaultLayout, Content } from "~/compoment/Layout";
import { widthContext } from "~/compoment/Layout/DefaultLayout";
import { useContext } from "react";
import ManagePack from "~/compoment/Layout/DefaultLayout/ManagePack";
function PageManagePack() {
  return (
    <>
      <DefaultLayout layout={<ManagePack />} />
    </>
  );
}
export default PageManagePack;
