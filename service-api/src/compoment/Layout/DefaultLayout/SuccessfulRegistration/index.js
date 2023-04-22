import { faCircleCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";
import style from "~/compoment/Style/registrationPack.module.css";
function SuccessfulRegistration() {
  const [close, setClose] = useState("flex");
  function handleCloseNoti() {
    setClose("none");
  }
  return (
    <>
      <div style={{ display: close }} className={style.successfulRegis}>
        <div className={style.notify}>
          <div className={style.closeNotify} onClick={handleCloseNoti}>
            <FontAwesomeIcon icon={faXmark} />
          </div>
          <div className={style.notifyIcon}>
            <FontAwesomeIcon icon={faCircleCheck} />
          </div>
          <span className={style.notifyAlert}>
            Anh/Chị đã đăng kí gói thành công!
          </span>
          <div className={style.canceNotify}>
            <button onClick={handleCloseNoti}>
              <Link to={"/PageManagePack"}>Đóng</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SuccessfulRegistration;
