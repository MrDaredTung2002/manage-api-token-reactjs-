import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLayoutEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import style from "~/compoment/Style/purchase.module.css";
function ConfirmRegistration() {
  const refUser = useRef();
  const refEmail = useRef();
  const refPhone = useRef();
  const link = useRef();
  const [pay, setPay] = useState("Chuyển khoản");
  const [error, setError] = useState("");
  function handleSubmit(e) {
    fetch("http://localhost:3000/userRegisterPack/10")
      .then((response) => response.json())
      .then((res) => {
        fetch("http://localhost:3000/user/" + res.idUser)
          .then((response) => response.json())
          .then((result) => {
            if (
              refUser.current.value === result.user &&
              refEmail.current.value === result.email &&
              refPhone.current.value === result.phone
            ) {
              var dataPack = [];
              for (let i = 0; i < result.packTotal; i++) {
                dataPack = [
                  {
                    ...result.pack[0],
                  },
                ].concat(dataPack);
              }
              const data = {
                ...result,
                member: "Mua mới",
                packTotal: result.packTotal + 1,
                pack: dataPack.concat([
                  {
                    ...res,
                    status: "Chờ phê duyệt",
                    pay: pay,
                  },
                ]),
              };
              console.log(data);
              const option = {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
              };
              fetch("http://localhost:3000/user/" + res.idUser, option)
                .then((response) => response.json())
                .then((callback) => {
                  return (window.location = "/PageSuccessfulRegistration");
                });
            } else {
              setError("Sai thông tin tài khoản!");
            }
          });
      });
  }
  return (
    <>
      <div className={style.purchase}>
        <div className={style.purchaseTitle}>
          <span>ĐĂNG KÝ MUA HÀNG</span>
        </div>
        <div className={style.purchaseBlock}>
          <div className={style.confirm}>
            <div className={style.confirmRegis}>
              <div className={style.confirmName}>
                <label htmlFor="name">Tên đăng nhập:</label>
                <input ref={refUser} id="name" type={"text"} />
              </div>
              <div className={style.confirmPhone}>
                <label htmlFor="phone">Số điện thoại:</label>
                <input ref={refPhone} id="phone" type={"text"} />
              </div>
              <div className={style.confirmEmail}>
                <label htmlFor="email">Email:</label>
                <input ref={refEmail} id="email" type={"text"} />
              </div>
              <div className={style.confirmTransfer}>
                <input
                  onClick={() => setPay("Tiền mặt")}
                  id="cash"
                  type={"radio"}
                  name={"transfer"}
                />
                <label htmlFor="cash">Tiền mặt</label>
                <input
                  defaultChecked
                  id="transfer"
                  type={"radio"}
                  name={"transfer"}
                  onClick={() => setPay("Chuyển khoản")}
                />
                <label htmlFor="transfer">Chuyển khoản</label>
              </div>
              <div style={{ color: "red" }}>{error}</div>
            </div>
          </div>
        </div>
        <div className={style.purchaseButton}>
          <button className={style.purchaseButtonCance}>
            <Link ref={link} to={"/"}>
              Hủy
            </Link>
          </button>
          <button className={style.purchaseButtonSub}>
            <Link to={""} onClick={(e) => handleSubmit(e)}>
              Xác nhận
            </Link>
          </button>
        </div>
      </div>
    </>
  );
}

export default ConfirmRegistration;
