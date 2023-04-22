import Header from "./Header";
import SideBar from "./SideBar";
import { useState, createContext, memo, useLayoutEffect } from "react";
import style from "~/compoment/Style/content.module.css";
const widthContext = createContext();
function DefaultLayout({ layout }) {
  const [tagName, setTagName] = useState(localStorage.getItem("data") || "");
  const [idUser, setIdUser] = useState("");

  const [widthHeader, setWidthHeader] = useState("75%");
  const [widthNabar, setWidthNabar] = useState("25%");
  const [widthContent, setWidthContent] = useState("75%");
  const [isNabar, setIsNabar] = useState(false);
  const [nameUser, setNameUser] = useState("User_name");

  const handleGetUser = useLayoutEffect(() => {
    fetch("http://localhost:3000/online/999999")
      .then((response) => response.json())
      .then((res) => {
        fetch("http://localhost:3000/user" + "/" + res.idOnline)
          .then((response) => response.json())
          .then((data) => {
            setIdUser(data.id);
            setNameUser(data.fistName + data.lastName);
          });
      });
  }, []);
  const value = {
    widthHeader,
    widthNabar,
    isNabar,
    tagName,
    nameUser,
    idUser,
    setWidthHeader,
    setWidthNabar,
    setIsNabar,
    setWidthContent,
    setTagName,
  };
  return (
    <>
      <widthContext.Provider value={value}>
        <Header />
        <div className={style.content} style={{ width: widthContent }}>
          {layout}
        </div>
        <SideBar />
      </widthContext.Provider>
    </>
  );
}
export { widthContext };
export default memo(DefaultLayout);
