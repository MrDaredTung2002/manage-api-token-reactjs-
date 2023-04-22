import { faEyeSlash, faEye, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "~/compoment/Style/ManageApiToken.module.css";
import AdminStyle from "./AdminManageApiToken.module.scss";
import classNames from "classnames/bind";
import { useEffect, useState, useRef } from "react";
const cx = classNames.bind(AdminStyle);
function AdminManageApiToken() {
  const [searchInput, setSearchInput] = useState("");
  const [option, setOption] = useState(true);
  const [valueSelect, setValueSelect] = useState("");
  const [inputText, setInputText] = useState(true);
  const [iconEye, setIconEye] = useState(true);
  const [focus, setFocus] = useState(false);
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
          apiKey: [
            {
              exspriseTime: "",
              domain: "",
              ip: "",
            },
          ],
          token: [
            {
              consumerKey: "",
              consumerSelect: "",
            },
          ],
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
  const refNameUser = useRef();
  const refExspriseTime = useRef();
  const refDomain = useRef();
  const refIP = useRef();
  const [viewUser, setViewUser] = useState({
    fistName: "",
    lastName: "",
    user: "",
    email: "",
    phone: "",
    isOnline: "",
    packTotal: 0,
    member: "",
    id: 5,
    token: [
      {
        consumerKey: "",
        consumerSelect: "",
      },
    ],
    apiKey: [
      {
        name: "",
        url: "",
        description: "",
        policy: "",
      },
    ],
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
        apiKey: [
          {
            exspriseTime: "",
            domain: "",
            ip: "",
          },
        ],
      },
    ],
  });
  const [users, setUsers] = useState(init);
  const [nameUsers, setNameUsers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/user")
      .then((response) => response.json())
      .then((res) => {
        let arr = [];
        for (let i = 0; i < res.length; i++) {
          arr[i] = res[i].user;
        }
        setNameUsers(arr.sort());
        setUsers(res);
      });
  }, []);
  function handleSelectApi() {
    setOption(true);
  }
  function handleSelectToken() {
    setOption(false);
  }
  function handleSelectConsumer(value) {
    setValueSelect(value);
  }
  function handleSlashConsumer() {
    setInputText(!inputText);
    setIconEye(!iconEye);
  }
  function selectUser(nameUser) {
    setFocus(!focus);
    let user = {};
    for (let i = 0; i < nameUsers.length; i++) {
      if (nameUser === users[i].user) {
        user = users[i];
        setViewUser(users[i]);
      }
    }
    console.log(user);
    refNameUser.current.value = user.user;
    refIP.current.value = user.apiKey[0].ip;
    refDomain.current.value = user.apiKey[0].domain;
    refExspriseTime.current.value = user.apiKey[0].exspriseTime;
  }
  function handleSearch(value) {
    setSearchInput(value);
    if (value !== "") {
      setFocus(true);
    } else {
    }
  }
  return (
    <>
      <div className={style.manageApi}>
        <div className={cx("searchApiToken")}>
          <form>
            <label>
              Tên đăng nhập <p>*</p>
            </label>
            <input
              onChange={(e) => {
                handleSearch(e.target.value);
              }}
              onFocus={() => setFocus(true)}
              type={"text"}
              placeholder={"Tìm theo tên người dùng"}
              ref={refNameUser}
            />
            <div
              className={cx("selectUserTable")}
              style={{ display: focus ? "block" : "none" }}>
              {nameUsers.map((nameUser, i) => {
                return (
                  <div
                    key={i}
                    className={cx("selectUser")}
                    onClick={() => selectUser(nameUser)}>
                    {nameUser}
                  </div>
                );
              })}
            </div>
          </form>
        </div>
        <div className={style.manageOption + " " + cx("manageOption")}>
          <div className={style.selectApi}>
            <button
              className={cx(option ? "active" : "")}
              onClick={() => {
                handleSelectApi();
              }}
              htmlFor="api">
              API KEY
            </button>
          </div>
          <div className={style.selectToken}>
            <button
              className={cx(!option ? "active" : "")}
              htmlFor="token"
              onClick={() => {
                handleSelectToken();
              }}>
              TOKEN
            </button>
          </div>
        </div>
        <div
          className={style.createAip}
          style={{ display: option == true ? "block" : "none" }}>
          <div className={style.createAipInfo}>
            <form>
              <label htmlFor="apiDate">
                <span>Exsprise time</span> <p>*</p>
              </label>
              <input
                onChange={() => {}}
                type={"text"}
                id={"apiDate"}
                ref={refExspriseTime}
              />
            </form>
          </div>
          <div className={style.createAipInfo}>
            <form>
              <label htmlFor="apiDomain">
                <span>Domain</span> <p>*</p>
              </label>

              <input ref={refDomain} type={"text"} id={"apiDomain"} />
            </form>
          </div>
          <div className={style.createAipInfo}>
            <form>
              <label htmlFor="apiIp">
                <span>IP</span> <p>*</p>
              </label>
              <input ref={refIP} type={"text"} id={"apiIp"} />
            </form>
          </div>

          <div className={style.createKey} style={{ display: "block" }}>
            <form>
              <label htmlFor="apiKey">
                <span>API KEY:</span>
              </label>
              <div className={style.createApiKey}>
                <span>{viewUser.apiKey[0].key}</span>
              </div>
            </form>
          </div>
          <div className={style.buttonCreateApi}>
            <button>Thu hồi</button>
          </div>
        </div>
        <div
          className={style.createAip}
          style={{ display: !option == true ? "block" : "none" }}>
          <div className={style.createAipInfo}>
            <form>
              <label htmlFor="tokenKey">
                <span>Consumer Key</span> <p>*</p>
              </label>
              <input type={"text"} id={"tokenKey"} />
            </form>
          </div>
          <div className={style.createAipInfo}>
            <form>
              <label htmlFor="tokenSelect">
                <span>Consumer Select</span> <p>*</p>
              </label>
              <input
                value={valueSelect}
                onChange={(e) => handleSelectConsumer(e.target.value)}
                type={inputText ? "password" : "text"}
                id={"tokenSelect"}></input>
              <div className={style.consumerIcon} onClick={handleSlashConsumer}>
                <FontAwesomeIcon icon={iconEye ? faEyeSlash : faEye} />
              </div>
            </form>
          </div>
          <div className={style.buttonCreateApi}>
            <button>Thu hồi</button>
          </div>
        </div>
      </div>
    </>
  );
}
export { cx };
export default AdminManageApiToken;
