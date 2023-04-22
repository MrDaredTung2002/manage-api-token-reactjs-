import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import style from "~/compoment/Style/register.module.css";
function Register() {
  const [nextPage, setNextPage] = useState(true);
  const [online, setOnline] = useState(true);
  const [valueFistName, setValueFistName] = useState("");
  const [valueLastName, setValueLastName] = useState("");
  const [valueUser, setValueUser] = useState("");
  const [valueEmail, setValueEmail] = useState("");
  const [valuePhone, setValuePhone] = useState("");

  const [messFistName, setMessFistName] = useState("");
  const [messLastName, setMessLastName] = useState("");
  const [messUser, setMessUser] = useState("");
  const [messEmall, setMessEmall] = useState("");
  const [messPhone, setMessPhone] = useState("");

  const refUser = useRef();
  const refEmail = useRef();
  const refPhone = useRef();

  var handleFormValidate = {
    handleMinUser: function (value, action, input) {
      if (value.length > 8) {
        input(value);
        action("");
      } else {
        action("Vui lòng nhập tài khoản người dùng trên 8 kí tự!");
      }
    },
    handleConfirmSpace: function (value, action, input) {
      if (value.includes(" ")) {
        action("Không được chứa dấu cách!");
      } else if (value === "") {
        action("Không được để trống!");
      } else {
        input(value);
        action("");
      }
    },
    handleEmail: function (value, action, input) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        input(value);
        action("");
      } else {
        action("Vui lòng nhập đúng định dạng!");
      }
    },
    handlePhone: function (value, action, input) {
      if (value.match(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g)) {
        input(value);
        action("");
      } else {
        action("Vui lòng nhập đúng định dạng 10 số!");
      }
    },
  };
  function handleMessFistName(e) {
    handleFormValidate.handleConfirmSpace(e, setMessFistName, setValueFistName);
  }
  function handleMessLastName(e) {
    handleFormValidate.handleConfirmSpace(e, setMessLastName, setValueLastName);
  }
  function handleMessUser(e) {
    handleFormValidate.handleMinUser(e, setMessUser, setValueUser);
  }
  function handleMessEmall(e) {
    handleFormValidate.handleEmail(e, setMessEmall, setValueEmail);
  }
  function handleMessPhone(e) {
    handleFormValidate.handlePhone(e, setMessPhone, setValuePhone);
  }
  function setIdOnline(user, usersId) {
    const option = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        idOnline: usersId,
      }),
    };
    console.log();
    fetch("http://localhost:3000/online/999999", option)
      .then((response) => response.json())
      .then((callback) => {
        setValueFistName(user.fistName);
        setValueLastName(user.lastName);
        setNextPage(!nextPage);
      });
    fetch("http://localhost:3000/userRegisterPack/10")
      .then((response) => response.json())
      .then((res) => {
        const option = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify({
            ...res,
            idUser: usersId,
          }),
        };
        fetch("http://localhost:3000/userRegisterPack/10", option)
          .then((response) => response.json())
          .then((res) => res);
      });
  }
  function subInfoUser(callback) {
    if (
      valueFistName !== "" &&
      valueLastName !== "" &&
      valueUser !== "" &&
      valueEmail !== "" &&
      valuePhone !== ""
    ) {
      const dataUser = {
        fistName: valueFistName,
        lastName: valueLastName,
        user: valueUser,
        email: valueEmail,
        phone: valuePhone,
        isOnline: "false",
        packTotal: 0,
        member: "Mua mới",
        apiKey: [
          {
            exspriseTime: "",
            domain: "",
            ip: "",
            key: "",
          },
        ],
        token: [{ consumerKey: "", consumerSelect: "" }],
        pack: [
          {
            version: "",
            purchaseDate: "",
            coutPack: "",
            totalPrice: "",
            idUser: "",
            serviceEnd: "",
            serviceStart: "",
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
      var option = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataUser),
      };
      fetch("http://localhost:3000/user", option)
        .then((response) => response.json())
        .then((user) => {
          setIdOnline(user, user.id);
          setNextPage(!nextPage);
        });
    }
  }
  function selectLogin() {
    setOnline(false);
  }
  function selectRegister() {
    setOnline(true);
  }
  function handleLogin() {
    fetch("http://localhost:3000/user")
      .then((response) => response.json())
      .then((users) => {
        for (let i = 0; i < users.length; i++) {
          if (
            users[i].user === refUser.current.value &&
            users[i].email === refEmail.current.value &&
            users[i].phone === refPhone.current.value
          ) {
            setIdOnline(users[i], users[i].id);
          }
        }
      });
  }
  return (
    <>
      <div className={style.registerLayout}>
        <div
          className={style.register}
          style={{ display: nextPage ? "block" : "none" }}>
          <div
            className={style.registerTable}
            style={{ display: online ? "block" : "none" }}>
            <div className={style.registerTitle}>
              <h3>Đăng kí tài khoản</h3>
            </div>
            <div className={style.registerInfo}>
              <div className={style.registerName}>
                <form>
                  <label htmlFor="fistName">
                    <span>Họ</span>
                    <p>*</p>
                  </label>
                  <input
                    type={"text"}
                    id={"fistName"}
                    placeholder={"Nhập vào Họ"}
                    onBlur={(e) => handleMessFistName(e.target.value)}
                  />
                  <div className={style.registerMess}>{messFistName}</div>
                </form>
              </div>
              <div className={style.registerName}>
                <form>
                  <label htmlFor="lastName">
                    <span>Tên</span>
                    <p>*</p>
                  </label>
                  <input
                    onBlur={(e) => {
                      handleMessLastName(e.target.value);
                    }}
                    type={"text"}
                    id={"lastName"}
                    placeholder={"Nhập vào Tên"}
                  />
                  <span className={style.registerMess}>{messLastName}</span>
                </form>
              </div>
              <div className={style.registerName}>
                <form>
                  <label htmlFor="user">
                    <span>Tên đăng nhập</span>
                    <p>*</p>
                  </label>
                  <input
                    type={"text"}
                    id={"user"}
                    placeholder={"Nhập tên đăng nhập"}
                    onBlur={(e) => {
                      handleMessUser(e.target.value);
                    }}
                  />
                  <div className={style.registerMess}>{messUser}</div>
                </form>
              </div>
              <div className={style.registerName}>
                <form>
                  <label htmlFor="email">
                    <span>Email</span>
                    <p>*</p>
                  </label>
                  <input
                    type={"text"}
                    id={"email"}
                    placeholder={"Nhập vào email"}
                    onBlur={(e) => {
                      handleMessEmall(e.target.value);
                    }}
                  />
                  <div className={style.registerMess}>{messEmall}</div>
                </form>
              </div>
              <div className={style.registerName}>
                <form>
                  <label htmlFor="phone">
                    <span>Số điện thoại</span>
                    <p>*</p>
                  </label>
                  <input
                    type={"text"}
                    id={"phone"}
                    placeholder={"Nhập số điện thoại"}
                    onBlur={(e) => {
                      handleMessPhone(e.target.value);
                    }}
                  />
                  <div className={style.registerMess}>{messPhone}</div>
                </form>
              </div>
            </div>
            <div className={style.registerButton}>
              <button onClick={selectLogin}>Quay lại</button>
              <button className={style.buttonActive} onClick={subInfoUser}>
                Đăng kí
              </button>
            </div>
          </div>
          <div
            className={style.registerTable}
            style={{ display: online ? "none" : "block" }}>
            <div className={style.registerTitle}>
              <h3>Đăng nhập tài khoản</h3>
            </div>
            <div className={style.registerInfo}>
              <div className={style.registerName}>
                <form>
                  <label htmlFor="user">
                    <span>Tên đăng nhập</span>
                    <p>*</p>
                  </label>
                  <input
                    ref={refUser}
                    type={"text"}
                    id={"user"}
                    placeholder={"Nhập tên đăng nhập"}
                  />
                </form>
              </div>
              <div className={style.registerName}>
                <form>
                  <label htmlFor="email">
                    <span>Email</span>
                    <p>*</p>
                  </label>
                  <input
                    ref={refEmail}
                    type={"text"}
                    id={"email"}
                    placeholder={"Nhập vào email"}
                  />
                </form>
              </div>
              <div className={style.registerName}>
                <form>
                  <label htmlFor="phone">
                    <span>Số điện thoại</span>
                    <p>*</p>
                  </label>
                  <input
                    ref={refPhone}
                    type={"text"}
                    id={"phone"}
                    placeholder={"Nhập số điện thoại"}
                  />
                </form>
              </div>
            </div>
            <div className={style.registerButton}>
              <button onClick={selectRegister}>Đăng kí</button>
              <button className={style.buttonActive} onClick={handleLogin}>
                Đăng Nhập
              </button>
            </div>
          </div>
        </div>
        <div
          className={style.welcome}
          style={{ display: nextPage ? "none" : "block" }}>
          <div className={style.hello}>
            Xin chào {valueFistName}
            {valueLastName}
          </div>
          <button>
            <Link to={"/"}>Tiếp tục</Link>
          </button>
        </div>
      </div>
    </>
  );
}
export default Register;
