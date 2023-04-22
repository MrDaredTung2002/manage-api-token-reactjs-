import { Link } from "react-router-dom";
import style from "~/compoment/Style/header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faBell } from "@fortawesome/free-solid-svg-icons";
import { datas } from "~/compoment/Layout/AdminLayout";
import { useContext, useState, memo } from "react";

function Header() {
  const setDatas = useContext(datas);
  return (
    <>
      <div className={style.header} style={{ width: setDatas.widthHeader }}>
        <div className={style.tagName}>{setDatas.tagName}</div>
        <div className={style.headerLine}>
          <div className={style.headerIcon}>
            <FontAwesomeIcon icon={faBell} />
          </div>
          <div className={style.headerUser}>
            <span>Xin chào [{setDatas.nameUser}]!</span>
            <FontAwesomeIcon icon={faChevronDown} />
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(Header);
