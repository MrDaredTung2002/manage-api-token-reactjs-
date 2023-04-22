import style from "~/compoment/Style/sidebar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { widthContext } from "~/compoment/Layout/DefaultLayout";
function SideBar() {
  const setWidthContext = useContext(widthContext);
  const activePack =
    setWidthContext.tagName === "QUẢN LÝ GÓI DỊCH VỤ" ? style.active : "";
  const activeAPI =
    setWidthContext.tagName === "QUẢN LÝ API/TOKEN" ? style.active : "";
  return (
    <>
      <div
        className={style.sideBar}
        style={{ width: setWidthContext.widthNabar }}>
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
                    localStorage.setItem("data", "QUẢN LÝ GÓI DỊCH VỤ");
                    setWidthContext.setTagName("QUẢN LÝ GÓI DỊCH VỤ");
                  }}
                  to={"/PageManagePack"}>
                  QUẢN LÝ GÓI DỊCH VỤ
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
                    localStorage.setItem("data", "QUẢN LÝ API/TOKEN");
                    setWidthContext.setTagName("QUẢN LÝ API/TOKEN");
                  }}
                  to={"/PageManageApiToken"}>
                  QUẢN LÝ API/TOKEN
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
            if (setWidthContext.widthNabar == 0) {
              setWidthContext.setWidthNabar("25%");
              setWidthContext.setWidthHeader("75%");
              setWidthContext.setWidthContent("75%");
              setWidthContext.setIsNabar(false);
            } else {
              setWidthContext.setWidthNabar("0");
              setWidthContext.setWidthHeader("100%");
              setWidthContext.setWidthContent("100%");
              setWidthContext.setIsNabar(true);
            }
          }}>
          <FontAwesomeIcon
            icon={setWidthContext.isNabar ? faAngleRight : faAngleLeft}
          />
        </div>
      </div>
    </>
  );
}

export default SideBar;
