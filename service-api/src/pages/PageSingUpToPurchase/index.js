import { DefaultLayout, Content } from "~/compoment/Layout";
import { widthContext } from "~/compoment/Layout/DefaultLayout";
import { useContext } from "react";
import SingUpToPurchase from "~/compoment/Layout/DefaultLayout/SingUpToPurchase";
function PageSingUpToPurchase() {
  return (
    <>
      <DefaultLayout layout={<SingUpToPurchase />} />
    </>
  );
}
export default PageSingUpToPurchase;
