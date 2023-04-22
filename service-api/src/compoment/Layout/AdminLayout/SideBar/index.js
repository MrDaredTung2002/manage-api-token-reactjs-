import style from "~/compoment/Style/sidebar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { datas } from "~/compoment/Layout/AdminLayout";
function SideBar() {
  const setDatas = useContext(datas);
  const activePack = setDatas.tagName === "QUẢN LÝ PACKAGE" ? style.active : "";
  const activeAPI =
    setDatas.tagName === "QUẢN LÝ API KEY/TOKEN" ? style.active : "";
  const activeOder =
    setDatas.tagName === "QUẢN LÝ ĐẶT HÀNG" ? style.active : "";
  return (
    <>
      <div className={style.sideBar} style={{ width: setDatas.widthNabar }}>
        <div className={style.iconMenu}>
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="grid"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            className="svg-inline--fa fa-grid fa-lg">
            <path
              fill="currentColor"
              d="M0 72C0 49.9 17.9 32 40 32H88c22.1 0 40 17.9 40 40v48c0 22.1-17.9 40-40 40H40c-22.1 0-40-17.9-40-40V72zM0 232c0-22.1 17.9-40 40-40H88c22.1 0 40 17.9 40 40v48c0 22.1-17.9 40-40 40H40c-22.1 0-40-17.9-40-40V232zM128 392v48c0 22.1-17.9 40-40 40H40c-22.1 0-40-17.9-40-40V392c0-22.1 17.9-40 40-40H88c22.1 0 40 17.9 40 40zM160 72c0-22.1 17.9-40 40-40h48c22.1 0 40 17.9 40 40v48c0 22.1-17.9 40-40 40H200c-22.1 0-40-17.9-40-40V72zM288 232v48c0 22.1-17.9 40-40 40H200c-22.1 0-40-17.9-40-40V232c0-22.1 17.9-40 40-40h48c22.1 0 40 17.9 40 40zM160 392c0-22.1 17.9-40 40-40h48c22.1 0 40 17.9 40 40v48c0 22.1-17.9 40-40 40H200c-22.1 0-40-17.9-40-40V392zM448 72v48c0 22.1-17.9 40-40 40H360c-22.1 0-40-17.9-40-40V72c0-22.1 17.9-40 40-40h48c22.1 0 40 17.9 40 40zM320 232c0-22.1 17.9-40 40-40h48c22.1 0 40 17.9 40 40v48c0 22.1-17.9 40-40 40H360c-22.1 0-40-17.9-40-40V232zM448 392v48c0 22.1-17.9 40-40 40H360c-22.1 0-40-17.9-40-40V392c0-22.1 17.9-40 40-40h48c22.1 0 40 17.9 40 40z"
              className=""></path>
          </svg>
          <div className={style.sideBarMenu}>
            <div className={style.sideBarItem + " " + activePack}>
              <span>
                <Link
                  onClick={() => {
                    localStorage.setItem("tagName", "QUẢN LÝ PACKAGE");
                    setDatas.setTagName("QUẢN LÝ PACKAGE");
                  }}
                  to={"/PageAdminManagePack"}>
                  QUẢN LÝ PACKAGE
                </Link>
              </span>
              <div>
                <FontAwesomeIcon icon={faChevronRight} />
              </div>
            </div>
            <div className={style.sideBarItem + " " + activeAPI}>
              <span>
                <Link
                  onClick={() => {
                    localStorage.setItem("tagName", "QUẢN LÝ API KEY/TOKEN");
                    setDatas.setTagName("QUẢN LÝ API KEY/TOKEN");
                  }}
                  to={"/PageAdminManageApiToken"}>
                  QUẢN LÝ API KEY/TOKEN
                </Link>
              </span>
              <div>
                <FontAwesomeIcon icon={faChevronRight} />
              </div>
            </div>
            <div className={style.sideBarItem + " " + activeOder}>
              <span>
                <Link
                  onClick={() => {
                    localStorage.setItem("tagName", "QUẢN LÝ ĐẶT HÀNG");
                    setDatas.setTagName("QUẢN LÝ ĐẶT HÀNG");
                  }}
                  to={"/PageAdminManageOder"}>
                  QUẢN LÝ ĐẶT HÀNG
                </Link>
              </span>
              <div>
                <FontAwesomeIcon icon={faChevronRight} />
              </div>
            </div>
          </div>
        </div>

        <div
          className={style.iconCloseNab}
          onClick={() => {
            if (setDatas.widthNabar == 0) {
              setDatas.setWidthNabar("25%");
              setDatas.setWidthHeader("75%");
              setDatas.setWidthContent("75%");
              setDatas.setIsNabar(false);
            } else {
              setDatas.setWidthNabar("0");
              setDatas.setWidthHeader("100%");
              setDatas.setWidthContent("100%");
              setDatas.setIsNabar(true);
            }
          }}>
          <FontAwesomeIcon
            icon={setDatas.isNabar ? faAngleRight : faAngleLeft}
          />
        </div>
      </div>
    </>
  );
}

export default SideBar;
