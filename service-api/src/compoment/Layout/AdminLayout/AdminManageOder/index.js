import {
  faCalendar,
  faMagnifyingGlass,
  faChevronLeft,
  faChevronRight,
  faChevronDown,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "~/compoment/Style/managePack.module.css";
import classNames from "classnames/bind";
import { useEffect, useState, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import AdminStyle from "./AdminManageOder.module.scss";
const cx = classNames.bind(AdminStyle);
function AdminManageOder() {
  const [forms, setForms] = useState([]);
  const [operation, setOperation] = useState("");
  const [activePack, setActivePack] = useState(true);
  const [user, setUser] = useState([]);
  const [pack, setPack] = useState({});
  const init = [
    {
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
          totalPrice: "",
          expiry: "",
          idUser: "",
          id: "",
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
    },
  ];
  const date = new Date();
  const getDay = date.getDate();
  const getMonth = date.getMonth();
  const getYear = date.getFullYear();
  const getHours = date.getHours();
  const getMinutes = date.getMinutes();
  const getSeconds = date.getSeconds();

  const serviceStart = `${getDay < 10 ? "0" + getDay : getDay}/${
    getMonth + 1 < 10 ? "0" + (getMonth + 1) : getMonth + 1
  }/${getYear} | ${getHours < 10 ? "0" + getHours : getHours}:${
    getMinutes < 10 ? "0" + getMinutes : getMinutes
  }:${getSeconds < 10 ? "0" + getSeconds : getSeconds}`;
  const [dataUser, setDataUser] = useState(init);
  const [dataUserPre, setDataUserPre] = useState(init);

  function handleDeleteFormApi() {
    setForms(forms.splice(1, forms.length));
  }
  useLayoutEffect(() => {
    fetch("http://localhost:3000/user")
      .then((response) => response.json())
      .then((res) => {
        setDataUser(res);
        setDataUserPre(res);
      });
  }, []);
  function handleApprove() {
    for (var i = 0; i < user.pack.length; i++) {
      if (pack.idPack === user.pack[i].idPack) {
        user.pack[i] = {
          ...user.pack[i],
          status: "Đang hoạt động",
          serviceStart: serviceStart,
          serviceEnd: `${getDay < 10 ? "0" + getDay : getDay}/${
            getMonth + 1 < 10 ? "0" + (getMonth + 1) : getMonth + 1
          }/${Number(getYear) + user.pack[i].year} | ${
            getHours < 10 ? "0" + getHours : getHours
          }:${getMinutes < 10 ? "0" + getMinutes : getMinutes}:${
            getSeconds < 10 ? "0" + getSeconds : getSeconds
          }`,
        };
      }
    }
    const option = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };
    fetch("http://localhost:3000/user/" + user.id, option)
      .then((response) => response.json())
      .then((res) => {
        return (window.location = "/PageAdminManageOder");
      });
  }
  function handleActivePack() {
    setActivePack(!activePack);
  }
  function handleRecall(datas, data) {
    setOperation("handleOderBrowse");
    setUser(datas);
    setPack(data);
  }
  function handleStatus(datas, data) {
    setOperation("handleOderRecall");
    setUser(datas);
    setPack(data);
  }
  function handleSearchOder(value) {
    let newDataUser = [];
    for (let i = 0; i < dataUser.length; i++) {
      var nameUp = dataUserPre[i].user.toUpperCase();
      var nameLow = dataUserPre[i].user.toLowerCase();
      var valueUp = value.toUpperCase();
      var valueLow = value.toLowerCase();
      console.log(nameUp);
      console.log(valueUp);
      console.log(nameUp.search(valueUp));
      if (nameUp.search(valueUp) != -1 || nameLow.search(valueLow) != -1) {
        newDataUser = newDataUser.concat(dataUserPre[i]);
      }
    }
    if (value === "") {
      setDataUser(dataUserPre);
    } else {
      setDataUser(newDataUser);
    }
  }
  console.log(dataUser);
  return (
    <>
      <div
        className={style.managePack}
        style={{ display: operation === "" ? "block" : "none" }}>
        <div className={style.searchPack + " " + AdminStyle.searchPack}>
          <div className={style.searchDate}>
            <form>
              <input type={"text"} placeholder={"Thời gian đặt hàng"}></input>
              <FontAwesomeIcon icon={faCalendar} />
            </form>
          </div>
          <div className={style.searchDate}>
            <form>
              <input type={"text"} placeholder={"Thời gian bắt đầu"}></input>
              <FontAwesomeIcon icon={faCalendar} />
            </form>
          </div>
          <div className={style.searchDate}>
            <form>
              <input type={"text"} placeholder={"Thời gian hết hạn"}></input>
              <FontAwesomeIcon icon={faCalendar} />
            </form>
          </div>
          <div className={style.searchName}>
            <form>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
              <input
                onChange={(e) => handleSearchOder(e.target.value)}
                type={"text"}
                placeholder={"Tìm theo tên đăng nhập, tên pakage"}
              />
            </form>
          </div>
        </div>
        <div className={style.manageTable + " " + AdminStyle.manageTable}>
          <table className={style.manageDes + " " + AdminStyle.manageDes}>
            <tbody>
              <tr>
                <th>TÊN PACKAGE</th>
                <th>TÊN ĐĂNG NHẬP</th>
                <th>HOẠT ĐỘNG</th>
                <th>THỜI GIAN ĐẶT HÀNG</th>
                <th>THỜI GIAN BẮT ĐẦU</th>
                <th>THỜI GIAN HẾT HẠN</th>
                <th>PHIÊN BẢN</th>
                <th>TRẠNG THÁI</th>
                <th>THAO TÁC</th>
              </tr>
            </tbody>
          </table>
          <table className={style.manageInfo + " " + AdminStyle.manageInfo}>
            <tbody>
              {dataUser.map((datas, i) =>
                datas.pack.map((data, i) => {
                  var styleStatus;
                  if (data.status === "Chờ phê duyệt") {
                    styleStatus = "approve";
                  } else if (data.status === "Đang hoạt động") {
                    styleStatus = "active";
                  }
                  return (
                    <tr key={i}>
                      <th>{data.name}</th>
                      <th>{datas.user}</th>
                      <th>{datas.member}</th>
                      <th>{data.purchaseDate}</th>
                      <th>{data.serviceStart}</th>
                      <th>{data.serviceEnd}</th>
                      <th>{data.version}</th>
                      <th
                        className={
                          style.packExpired + " " + cx(styleStatus, "default")
                        }>
                        <p>{data.status}</p>
                      </th>
                      <th>
                        <div className={AdminStyle.operation}>
                          <svg
                            onClick={() => handleRecall(datas, data)}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512">
                            <path d="M32.5 224H24c-13.3 0-24-10.7-24-24V72c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2L82.6 96.6c87.6-86.5 228.7-86.2 315.8 1c87.5 87.5 87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3c-62.2-62.2-162.7-62.5-225.3-1L169 183c6.9 6.9 8.9 17.2 5.2 26.2s-12.5 14.8-22.2 14.8H32.5z" />
                          </svg>
                          <svg
                            onClick={() => handleStatus(datas, data)}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 576 512">
                            <path d="M454.4 93c7.3 8.8 6.1 21.6-2 29.7c-10.6 10.6-28.2 8.6-38-2.7C376.2 75.9 319.9 48 257 48C142.1 48 49 141.1 49 256v24.9c0 6.1-.2 12.2-.6 18.3C47.7 311.2 37.6 320 25.6 320C11.1 320 .1 307 .7 292.5c.2-3.9 .3-7.7 .3-11.6V256C1 114.6 115.6 0 257 0c79.4 0 150.4 36.2 197.4 93zm19.3 89.6c13.1-6.5 29-.2 32.4 14.1c4.5 19.1 6.9 39 6.9 59.4v24.9c0 5.4-.1 10.9-.2 16.3C512.6 310 502 320 489.2 320c-13.7 0-24.6-11.5-24.4-25.3c.1-4.6 .1-9.2 .1-13.8V256c0-15.1-1.6-29.8-4.6-43.9c-2.5-11.8 2.5-24.2 13.3-29.6zM257 80c97.2 0 176 78.8 176 176v24.9c0 27.7-1.7 55.3-5 82.7c-1.4 11.7-11.5 20.3-23.3 20.3c-14.7 0-25.9-13.2-24.2-27.8c3-24.9 4.4-50.1 4.4-75.3V256c0-70.7-57.3-128-128-128c-11.6 0-22.8 1.5-33.4 4.4c-10.6 2.9-22.3 .4-29.4-7.9c-10.4-12.1-6.9-30.9 8.3-35.9C219.6 83 238 80 257 80zM151.7 148.7c8.2 9.6 7.5 23.8 .2 34.2C137.5 203.6 129 228.8 129 256v24.9c0 28.9-3.3 57.7-9.7 85.8C116.9 377 107.6 384 97.1 384c-15.9 0-27.3-15.6-23.9-31.1c5.2-23.6 7.8-47.7 7.8-71.9V256c0-40.6 13.7-78 36.8-107.7c8.5-11 24.8-10.2 33.9 .4zM257 160c53 0 96 43 96 96v24.9c0 39.7-3.9 79.3-11.6 118.1c-2 10-10.8 17-21 17c-14.2 0-24.5-13.3-21.8-27.2c6.9-35.5 10.4-71.6 10.4-107.9V256c0-28.7-23.3-52-52-52s-52 23.3-52 52v24.9c0 40.5-5.3 80.7-15.9 119.7c-2.5 9.2-10.9 15.4-20.4 15.4c-14.8 0-25.3-14.6-21.5-29c9.1-34.6 13.8-70.2 13.8-106.1V256c0-53 43-96 96-96zm24 96v24.9c0 65.8-12.1 131-35.7 192.4l-5.9 15.3c-4.8 12.4-18.6 18.5-31 13.8s-18.5-18.6-13.8-31l5.9-15.3C222 400.2 233 340.8 233 280.9V256c0-13.3 10.7-24 24-24s24 10.7 24 24z" />
                          </svg>
                        </div>
                      </th>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        <footer className={cx("footer")}>
          <div className={cx("result")}>Hiển thị 01-10 trên 102 kết quả</div>
          <div className={cx("pagesResult")}>
            <span>
              <FontAwesomeIcon icon={faChevronLeft} />
            </span>
            <span className={cx("active")}>01</span>
            <span>02</span>
            <span>03</span>
            <p>...</p>
            <span>102</span>
            <span>
              <FontAwesomeIcon icon={faChevronRight} />
            </span>
            <span>
              10/trang
              <FontAwesomeIcon icon={faChevronDown} />
            </span>
          </div>
        </footer>
      </div>
      <div
        className={cx("LayoutCreatePack")}
        style={{ display: operation === "handleOderRecall" ? "flex" : "none" }}>
        <div className={cx("createPack")}>
          <div className={cx("createPackTitle")}>
            <h4>XỬ LÝ ĐẶT HÀNG</h4>
          </div>
          <div className={cx("infoPack")}>
            <form>
              <label>
                <span>Tên đăng nhập: </span>
                <p>{user.user}</p>
              </label>
              <label>
                <span>Tên package: </span>
                <p>{pack.name}</p>
              </label>
            </form>
            <form>
              <label>
                <span>Phiên bản: </span>
                <p>{pack.version}</p>
              </label>
              <label>
                <span>Hình thức thanh toán: </span>
                <p>{pack.pay}</p>
              </label>
            </form>
            <form>
              <label>
                <span>Hoạt động: </span>
                <p>{user.member}</p>
              </label>
              <label>
                <span>Thời gian đặt hàng: </span>
                <p>{pack.purchaseDate}</p>
              </label>
            </form>
          </div>
          <div className={cx("btn-submit")}>
            <div className={cx("btn-next")}>
              <button>
                <Link
                  to={"/PageAdminManageOder"}
                  onClick={() => handleApprove()}>
                  Phê duyệt
                </Link>
              </button>
            </div>
            <div className={cx("btn-refuse")}>
              <button>
                <Link to={"/PageAdminManageOder"}>Từ chối</Link>
              </button>
            </div>
            <div className={cx("btn-pre")}>
              <button>
                <Link
                  to={"/PageAdminManageOder"}
                  onClick={() => setOperation("")}>
                  Hủy
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className={cx("LayoutCreatePack")}
        style={{ display: operation === "handleOderBrowse" ? "flex" : "none" }}>
        <div className={cx("createPack")}>
          <div className={cx("createPackTitle")}>
            <h4>XỬ LÝ ĐẶT HÀNG</h4>
          </div>
          <div className={cx("infoPack")}>
            <form>
              <label>
                <span>Tên đăng nhập: </span>
                <p>{user.user}</p>
              </label>
              <label>
                <span>Tên package: </span>
                <p>{pack.name}</p>
              </label>
            </form>
            <form>
              <label>
                <span>Phiên bản: </span>
                <p>{pack.version}</p>
              </label>
              <label>
                <span>Hình thức thanh toán: </span>
                <p>{pack.pay}</p>
              </label>
            </form>
            <form>
              <label>
                <span>Hoạt động: </span>
                <p>{user.member}</p>
              </label>
              <label>
                <span>Thời gian đặt hàng: </span>
                <p>{pack.purchaseDate}</p>
              </label>
            </form>
            <form>
              <label>
                <span>Lý do: </span>
                <input type={"text"} placeholder={"Nhập Lý do"} />
              </label>
            </form>
          </div>
          <div className={cx("btn-submit")}>
            <div className={cx("btn-next")}>
              <button>
                <Link to={"/PageAdminManageOder"}>Thu hồi</Link>
              </button>
            </div>
            <div className={cx("btn-pre")}>
              <button>
                <Link
                  to={"/PageAdminManageOder"}
                  onClick={() => setOperation("")}>
                  Hủy
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export { cx };
export default AdminManageOder;
