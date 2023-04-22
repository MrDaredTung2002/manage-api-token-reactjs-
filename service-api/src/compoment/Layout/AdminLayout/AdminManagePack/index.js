import {
  faCalendar,
  faMagnifyingGlass,
  faChevronLeft,
  faChevronRight,
  faChevronDown,
  faPlus,
  faCircle,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "~/compoment/Style/managePack.module.css";
import CreateApi from "./createApi";
import AdminStyle from "./AdminManagePack.module.scss";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Fragment } from "react";
const cx = classNames.bind(AdminStyle);
function AdminManagePack() {
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
  const [users, setUsers] = useState(init);
  const [viewUser, setviewUser] = useState({
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
  });
  const [packs, setPacks] = useState(init);

  const [forms, setForms] = useState([]);
  const [operation, setOperation] = useState("");
  const [activePack, setActivePack] = useState(true);
  const [viewPack, setViewPack] = useState({
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
  });
  useEffect(() => {
    fetch("http://localhost:3000/user")
      .then((response) => response.json())
      .then((res) => {
        setUsers(res);
      });
  }, []);
  function handleCreateFormApi() {
    setForms(forms.concat([<CreateApi />]));
  }
  function handleDeleteFormApi() {
    setForms(forms.splice(1, forms.length));
  }

  function handleViewPack(pack, user) {
    setOperation("viewPack");
    setviewUser(user);
    setViewPack(pack);
    setActivePack(pack.status === "Đang hoạt động" ? true : false);
  }
  function handleDeletePack(pack, user, i) {
    let notify = "Bạn có chắc chắn muốn xóa package này?";
    if (window.confirm(notify)) {
      user.pack.splice(i, 1);
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
          return (window.location = "/PageAdminManagePack");
        });
    }
  }
  function handleActivePack() {
    setActivePack(!activePack);
    if (viewPack.status === "Đang hoạt động") {
      viewPack.status = "Ngừng hoạt động";
    } else {
      viewPack.status = "Đang hoạt động";
    }
  }

  function handleSavePack() {
    for (var i = 0; i < viewUser.length; i++) {
      if (viewPack.idPack === viewUser.pack[i].idPack) {
        viewUser.pack[i] = {
          ...viewUser.pack[i],
        };
      }
    }
    const option = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(viewUser),
    };
    fetch("http://localhost:3000/user/" + viewUser.id, option)
      .then((response) => response.json())
      .then((res) => {
        return (window.location = "/PageAdminManagePack");
      });
  }
  return (
    <>
      <div
        className={style.managePack}
        style={{ display: operation === "" ? "block" : "none" }}>
        <div className={style.searchPack + " " + AdminStyle.searchPack}>
          <div className={cx("btn-createPack")}>
            <button onClick={() => setOperation("createPack")}>
              <FontAwesomeIcon icon={faPlus} />

              <span>Tạo Package</span>
            </button>
          </div>
          <div className={style.searchDate}>
            <form>
              <input type={"text"} placeholder={"Thời gian tạo"}></input>
              <FontAwesomeIcon icon={faCalendar} />
            </form>
          </div>
          <div className={style.searchName}>
            <form>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
              <input type={"text"} placeholder={"Tìm theo API, tên pakage"} />
            </form>
          </div>
        </div>
        <div className={style.manageTable + " " + AdminStyle.manageTable}>
          <table className={style.manageDes + " " + AdminStyle.manageDes}>
            <tbody>
              <tr>
                <th>TÊN PACKAGE</th>
                <th>API</th>
                <th>THỜI GIAN TẠO/CẬP NHẬT</th>
                <th>PHIÊN BẢN</th>
                <th>TRẠNG THÁI</th>
                <th>Thao tác</th>
              </tr>
            </tbody>
          </table>
          <table className={style.manageInfo + " " + AdminStyle.manageInfo}>
            <tbody>
              {users.map((user) =>
                user.pack.map((pack, i) => {
                  var styleStatus;
                  if (pack.status === "Chờ phê duyệt") {
                    styleStatus = "approve";
                  } else if (pack.status === "Đang hoạt động") {
                    styleStatus = "active";
                  }
                  return (
                    <tr key={i}>
                      <th>{pack.name}</th>
                      <th>{pack.information[0]}</th>
                      <th>{pack.purchaseDate}</th>
                      <th>{pack.version}</th>
                      <th className={style.packExpired + " " + cx(styleStatus)}>
                        <p>{pack.status}</p>
                      </th>
                      <th>
                        <div className={AdminStyle.operation}>
                          <svg
                            onClick={() => handleViewPack(pack, user)}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512">
                            <path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z" />
                          </svg>
                          <svg
                            onClick={() => handleDeletePack(pack, user, i)}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512">
                            <path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
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
        style={{ display: operation === "createPack" ? "flex" : "none" }}>
        <div className={cx("createPack")}>
          <div className={cx("createPackTitle")}>
            <h4>TẠO MỚI PACKAGE</h4>
          </div>
          <div className={cx("infoPack")}>
            <form>
              <label>
                <span>Tên package</span>
                <p>*</p>
              </label>
              <select type={""} placeholder={"Gói nâng cao"}>
                <option>Gói miễn phí</option>
                <option>Gói cơ bản</option>
                <option>Gói nâng cao</option>
                <option>Gói không giới hạn</option>
              </select>
            </form>
            <form>
              <label>
                <span>Phiên bản</span>
                <p>*</p>
              </label>
              <input type={"radio"} id="thu_nghiem" name="version" />
              <label htmlFor="thu_nghiem">Thử nghiệm</label>
              <input type={"radio"} id={"ung_dung"} name="version" />
              <label htmlFor="ung_dung">Ứng dụng</label>
            </form>
            <div className={cx("createApi")}>
              <div>
                <CreateApi />
              </div>
              <div className={cx("btn-createApi")}>
                <FontAwesomeIcon
                  icon={faPlus}
                  onClick={() => handleCreateFormApi()}
                />
              </div>
              <div className={cx("btn-deleteApi")}>
                <FontAwesomeIcon
                  icon={faMinus}
                  onClick={() => handleDeleteFormApi()}
                />
              </div>
              {forms.map((form, i) => (
                <div key={i}>{form}</div>
              ))}
            </div>
          </div>
          <div className={cx("btn-submit")}>
            <div className={cx("btn-pre")}>
              <button>
                <Link
                  to={"/PageAdminManagePack"}
                  onClick={() => setOperation("")}>
                  Hủy
                </Link>
              </button>
            </div>
            <div className={cx("btn-next")}>
              <button>
                <Link to={"/PageAdminManagePack"}>Lưu</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className={cx("LayoutCreatePack")}
        style={{ display: operation === "viewPack" ? "flex" : "none" }}>
        <div className={cx("createPack")}>
          <div className={cx("createPackTitle")}>
            <h4>XEM PACKAGE</h4>
          </div>
          <div className={cx("infoPack")}>
            <div className={cx("option")}>
              <form>
                <label>
                  <span>Tên package :</span>
                </label>
                <span>{viewPack.name}</span>
              </form>
              <form>
                <span
                  className={cx("isActive")}
                  onClick={() => handleActivePack()}
                  style={{
                    backgroundColor: activePack ? "#2989df" : "#ccc",
                    justifyContent: activePack ? "end" : "start",
                  }}>
                  <FontAwesomeIcon icon={faCircle} />
                </span>
                <span>Đang hoạt động</span>
              </form>
            </div>
            <form>
              <label>
                <span>Phiên bản</span>
              </label>
              <span>{viewPack.version}</span>
            </form>
            <div className={cx("purchaseTableApi")}>
              <table border={0}>
                <tbody>
                  <tr className={cx("desApi")}>
                    <td>TÊN API</td>
                    <td>URL</td>
                    <td>MÔ TẢ</td>
                    <td>POLICY</td>
                  </tr>
                </tbody>
              </table>
              <table>
                <tbody>
                  {viewPack.API.map((api, i) => (
                    <tr className={cx("infoApi")} key={i}>
                      <td>{api.name}</td>
                      <td>{api.url}</td>
                      <td>{api.description}</td>
                      <td>{api.policy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className={cx("btn-submit")}>
            <div className={cx("btn-pre")}>
              <button>
                <Link
                  to={"/PageAdminManagePack"}
                  onClick={() => setOperation("")}>
                  Hủy
                </Link>
              </button>
            </div>
            <div className={cx("btn-next")}>
              <button>
                <Link
                  to={"/PageAdminManagePack"}
                  onClick={() => handleSavePack()}>
                  Lưu
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
export default AdminManagePack;
