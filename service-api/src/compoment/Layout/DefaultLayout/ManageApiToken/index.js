import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import style from "~/compoment/Style/ManageApiToken.module.css";

function ManageApi() {
  const date = new Date();
  const getDate = `${
    String(date.getDate()).length === 1 ? "0" + date.getDate() : date.getDate()
  }`;
  const getDay = `${
    String(date.getDay()).length === 1 ? "0" + date.getDay() : date.getDay()
  }`;
  const getHours = `${
    String(date.getHours()).length === 1
      ? "0" + date.getHours()
      : date.getHours()
  }`;
  const getMinutes = `${
    String(date.getMinutes()).length === 1
      ? "0" + date.getMinutes()
      : date.getMinutes()
  }`;
  const getSeconds = `${
    String(date.getSeconds()).length === 1
      ? "0" + date.getSeconds()
      : date.getSeconds()
  }`;
  const refDomain = useRef();
  const refIp = useRef();
  const refExspriseTime = useRef();
  const dateNow = `${getDate}/${getDay}/${date.getFullYear()} | ${getHours}:${getMinutes}:${getSeconds}`;
  const [display, setDisplay] = useState("none");
  const [key, setKey] = useState("");
  const [option, setOption] = useState(true);
  const [valueSelect, setValueSelect] = useState("");
  const [inputText, setInputText] = useState(true);
  const [iconEye, setIconEye] = useState(true);
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
  };
  const [user, setUser] = useState(init);
  const [apiKey, setApiKey] = useState([
    {
      exspriseTime: "",
      domain: "",
      ip: "",
    },
  ]);
  const [token, setToken] = useState([
    {
      consumerKey: "",
      consumerSelect: "",
    },
  ]);
  useEffect(() => {
    fetch("http://localhost:3000/online/999999")
      .then((response) => response.json())
      .then((res) => {
        fetch("http://localhost:3000/user/" + res.idOnline)
          .then((response) => response.json())
          .then((user) => {
            setUser(user);
            if (user.apiKey[0].exspriseTime === "") {
              refExspriseTime.current.value = dateNow;
            } else {
              refExspriseTime.current.value = user.apiKey[0].exspriseTime;
            }
            refDomain.current.value = user.apiKey[0].domain;
            refIp.current.value = user.apiKey[0].ip;
            if (user.apiKey[0].key !== "") {
              setKey(user.apiKey[0].key);
              setDisplay("flex");
            }
          });
      });
  }, []);
  function handleCreateKey(length) {
    let regex = new RegExp(
      /^(?!-)[A-Za-z0-9-]+([\-\.]{1}[a-z0-9]+)*\.[A-Za-z]{2,6}$/
    );
    if (refIp.current.value && regex.test(refDomain.current.value)) {
      var charSet =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789";
      var randomString = "";
      for (var i = 0; i < length; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz, randomPoz + 1);
      }
      setKey(randomString);
      setDisplay("flex");
      const data = {
        ...user,
        apiKey: [
          {
            exspriseTime: dateNow,
            domain: refDomain.current.value,
            ip: refIp.current.value,
            key: randomString,
          },
        ],
      };
      console.log(data);
      const option = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      fetch("http://localhost:3000/user/" + user.id, option);
    }
  }
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
  return (
    <>
      <div className={style.manageApi}>
        <div className={style.manageOption}>
          <div className={style.selectApi}>
            <input
              id="api"
              type={"radio"}
              defaultChecked={option}
              onClick={() => {
                handleSelectApi();
              }}
              name={"select"}
            />
            <label htmlFor="api">API KEY</label>
          </div>
          <div className={style.selectToken}>
            <input
              onClick={() => {
                handleSelectToken();
              }}
              id="token"
              type={"radio"}
              name={"select"}
            />
            <label htmlFor="token">TOKEN</label>
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
                ref={refExspriseTime}
                onChange={() => {}}
                type={"text"}
                id={"apiDate"}
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
              <input ref={refIp} type={"text"} id={"apiIp"} />
            </form>
          </div>
          <div className={style.buttonCreateApi}>
            <button onClick={() => handleCreateKey(652)} disabled>
              TẠO API KEY
            </button>
          </div>
          <div className={style.createKey} style={{ display: display }}>
            <form>
              <label htmlFor="apiKey">
                <span>API KEY:</span>
              </label>
              <div className={style.createApiKey}>
                <span>{key}</span>
              </div>
            </form>
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
            <button onClick={() => handleCreateKey(652)}>
              TẠO ACCESS TOKEN
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ManageApi;
