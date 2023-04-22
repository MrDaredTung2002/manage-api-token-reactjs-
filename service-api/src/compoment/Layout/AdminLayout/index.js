import style from "~/compoment/Style/content.module.css";
import { createContext, useState } from "react";
import Header from "./Header";
import SideBar from "./SideBar";
const datas = createContext();
function AdminLayout({ layout }) {
  const [tagName, setTagName] = useState(localStorage.getItem("tagName") || "");
  const [widthHeader, setWidthHeader] = useState("75%");
  const [widthNabar, setWidthNabar] = useState("25%");
  const [widthContent, setWidthContent] = useState("75%");
  const [isNabar, setIsNabar] = useState(false);
  const value = {
    tagName,
    widthHeader,
    widthNabar,
    isNabar,
    setWidthHeader,
    setWidthNabar,
    setWidthContent,
    setTagName,
    setIsNabar,
  };
  return (
    <>
      <datas.Provider value={value}>
        <Header />
        <div className={style.content} style={{ width: widthContent }}>
          {layout}
        </div>
        <SideBar />
      </datas.Provider>
    </>
  );
}
export { datas };
export default AdminLayout;
