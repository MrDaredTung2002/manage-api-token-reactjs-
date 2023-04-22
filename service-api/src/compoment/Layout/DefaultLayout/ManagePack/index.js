import {
  faCalendar,
  faMagnifyingGlass,
  faUpload,
  faClockRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLayoutEffect, useEffect, useContext, useState } from "react";
import style from "~/compoment/Style/managePack.module.css";
import AdminStyle from "./ManagePack.module.scss";
import classNames from "classnames/bind";
function ManagePack() {
  const cx = classNames.bind(AdminStyle);

  const init = {
    fistName: "",
    lastName: "",
    user: "",
    email: "",
    phone: "",
    isOnline: "",
    packTotal: 0,
    member: "",
    id: 5,
    pack: [
      {
        serviceEnd: "",
        serviceStart: "",
        status: "",
        pay: "",
        version: "",
        coutPack: 1,
        totalPrice: 3950000,
        expiry: "",
        idUser: 5,
        id: 10,
        name: "",
        price: "",
        duration: "",
        active: "",
        information: ["", ""],
        date: "",
        API: [
          {
            name: "",
            url: "",
            description: "",
            policy: "",
          },
        ],
      },
    ],
  };

  const [dataUser, setDataUser] = useState(init);
  useLayoutEffect(() => {
    fetch("http://localhost:3000/online/999999")
      .then((response) => response.json())
      .then((user) => {
        fetch("http://localhost:3000/user/" + user.idOnline)
          .then((response) => response.json())
          .then((res) => {
            setDataUser(res);
          });
      });
  }, []);
  return (
    <>
      <div className={style.managePack}>
        <div className={style.searchPack}>
          <div className={style.searchDate}>
            <form>
              <input type={"text"} placeholder={"Ngày mua"}></input>
              <FontAwesomeIcon icon={faCalendar} />
            </form>
          </div>
          <div className={style.searchDate}>
            <form>
              <input type={"text"} placeholder={"Ngày bắt đầu dịch vụ"}></input>
              <FontAwesomeIcon icon={faCalendar} />
            </form>
          </div>
          <div className={style.searchDate}>
            <form>
              <input type={"text"} placeholder={"Ngày hết hạn"}></input>
              <FontAwesomeIcon icon={faCalendar} />
            </form>
          </div>
          <div className={style.searchName}>
            <form>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
              <input type={"text"} placeholder={"Tìm theo tên pakage"} />
            </form>
          </div>
        </div>
        <div className={style.manageTable}>
          <table className={style.manageDes}>
            <tbody>
              <tr>
                <th>TÊN PACKAGE</th>
                <th>NGÀY MUA</th>
                <th>NGÀY BẮT ĐẦU DỊCH VỤ</th>
                <th>NGÀY HẾT HẠN</th>
                <th>TRẠNG THÁI</th>
                <th>Thao tác</th>
              </tr>
            </tbody>
          </table>
          <table className={style.manageInfo}>
            <tbody>
              {dataUser.pack.map((data, i) => {
                var styleStatus;
                if (data.status === "Chờ phê duyệt") {
                  styleStatus = "approve";
                } else if (data.status === "Đang hoạt động") {
                  styleStatus = "active";
                }
                return (
                  <tr key={i}>
                    <th>{data.name}</th>
                    <th>{data.purchaseDate}</th>
                    <th>{data.serviceStart}</th>
                    <th>{data.serviceEnd}</th>
                    <th className={style.packExpired + " " + cx(styleStatus)}>
                      <p className={styleStatus}>{data.status}</p>
                    </th>
                    <th>
                      <FontAwesomeIcon icon={faUpload} />
                      <FontAwesomeIcon icon={faClockRotateLeft} />
                    </th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default ManagePack;
