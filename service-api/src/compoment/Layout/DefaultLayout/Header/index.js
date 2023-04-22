import style from "~/compoment/Style/header.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faServer,
  faChevronDown,
  faBell,
  faNewspaper,
} from "@fortawesome/free-solid-svg-icons";
import { widthContext } from "~/compoment/Layout/DefaultLayout";
import { useContext, useState, memo } from "react";

function Header() {
  const [sevice, setSevice] = useState(false);
  const [menu, setMenu] = useState(true);
  const setWidthContext = useContext(widthContext);
  return (
    <>
      <div
        className={style.header}
        style={{ width: setWidthContext.widthHeader }}>
        <div className={style.tagName}>{setWidthContext.tagName}</div>
        <div className={style.headerLine}>
          <div className={style.headerIcon} onClick={() => setSevice(!sevice)}>
            <FontAwesomeIcon icon={faNewspaper} />
            <div style={{ display: sevice ? "flex" : "none" }}>
              <FontAwesomeIcon icon={faServer} />
              <span>
                <Link to={"/PageServiceRegistration"}>Đăng kí dịch vụ</Link>
              </span>
            </div>
            <FontAwesomeIcon icon={faBell} />
          </div>
          <div className={style.headerUser}>
            <span>Xin chào [{setWidthContext.nameUser}]!</span>
            <FontAwesomeIcon
              icon={faChevronDown}
              onClick={() => setMenu(!menu)}
            />
          </div>

          <div
            className={style.menu}
            style={{ display: menu ? "none" : "block" }}>
            <div className={style.menuItem}>Thong tin</div>
            <div className={style.menuItem}>
              <Link to={"/PageRegister"}>Dang xuat</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(Header);
