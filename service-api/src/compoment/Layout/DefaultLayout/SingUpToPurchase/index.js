import { text } from "@fortawesome/fontawesome-svg-core";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useEffect, useLayoutEffect, useState, useMemo } from "react";
import style from "~/compoment/Style/purchase.module.css";
import { data } from "autoprefixer";
function SingUpToPurchase() {
  const [version, setVersion] = useState("Thử nghiệm");
  const [dataPack, setDataPack] = useState({
    price: "1",
    API: [
      {
        name: "",
        url: "",
        description: "",
        policy: "",
      },
    ],
  });
  const [purchaseCout, setPurchaseCout] = useState(1);
  function handleCoutUp() {
    setPurchaseCout(() => purchaseCout + 1);
  }
  function handleCoutDow() {
    if (purchaseCout !== 0) {
      setPurchaseCout(() => purchaseCout - 1);
    }
  }
  const date = new Date();
  const getDay = date.getDate();
  const getMonth = date.getMonth();
  const getYear = date.getFullYear();
  const getHours = date.getHours();
  const getMinutes = date.getMinutes();
  const getSeconds = date.getSeconds();
  const timeNow = `${getDay < 10 ? "0" + getDay : getDay}/${
    getMonth + 1 < 10 ? "0" + (getMonth + 1) : getMonth + 1
  }/${getYear} | ${getHours < 10 ? "0" + getHours : getHours}:${
    getMinutes < 10 ? "0" + getMinutes : getMinutes
  }:${getSeconds < 10 ? "0" + getSeconds : getSeconds}`;
  useEffect(() => {
    fetch("http://localhost:3000/userRegisterPack/10")
      .then((response) => response.json())
      .then((res) => setDataPack(res));
  }, []);
  function handleConfirm(res) {
    const data = {
      ...dataPack,
      serviceStart: "",
      serviceEnd: "",
      version: version,
      coutPack: purchaseCout,
      totalPrice: purchaseCout * dataPack.price,
      purchaseDate: timeNow,
    };
    console.log(data);
    const option = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch("http://localhost:3000/userRegisterPack/10", option)
      .then((response) => response.json())
      .then((res) => res);
  }
  function handleSelectVersion(value) {
    setVersion(value);
  }
  return (
    <>
      <div className={style.purchase}>
        <div className={style.purchaseTitle}>
          <span>ĐĂNG KÝ MUA HÀNG</span>
        </div>
        <div className={style.purchaseBlock}>
          <div className={style.purchaseInformation}>
            <div className={style.purchaseVersion}>
              <span>Phiên bản:</span>
              <div>
                <input
                  onClick={() => handleSelectVersion("Thử nghiệm")}
                  type={"radio"}
                  value={"thu_nghiem"}
                  name={"phurchaseVersion"}
                  id={"thu_nghiem"}
                />
                <label htmlFor={"thu_nghiem"}>THỬ NGHIỆM</label>
              </div>
              <div>
                <input
                  onClick={() => handleSelectVersion("Ứng dụng")}
                  type={"radio"}
                  value={"ung_dung"}
                  name={"phurchaseVersion"}
                  id={"ung_dung"}
                />
                <label htmlFor={"ung_dung"}>ỨNG DỤNG</label>
              </div>
            </div>
            <div className={style.purchaseTotal}>
              <span>Tính giá chi tiết</span>
              <table border={0}>
                <tbody>
                  <tr className={style.purchaseDes}>
                    <td>Gói sản phẩm/Dịch vụ</td>
                    <td>Đơn vị tính</td>
                    <td>Số lượng</td>
                    <td>Đơn giá (VND)</td>
                    <td>Thành tiền</td>
                  </tr>
                  <tr className={style.purchaseValue}>
                    <td>{dataPack.name}</td>
                    <td>{dataPack.date} Tháng</td>
                    <td className={style.purchaseCout}>
                      <button onClick={handleCoutDow}>-</button>
                      <span>{purchaseCout}</span>
                      <button onClick={handleCoutUp}>+</button>
                    </td>
                    <td>{dataPack.price} VND</td>
                    <td>{purchaseCout * Number(dataPack.price)} VND</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className={style.purchaseResources}>
              <span>Thông tin tài nguyên</span>
              <p>Ngày hết hạn: </p>
              <p className={style.purchaseExpired}>
                {getDay}/{getMonth + 1}/{getYear + 1}
              </p>
            </div>
          </div>
          <div className={style.purchaseTableApi}>
            <table border={0}>
              <tbody>
                <tr className={style.desApi}>
                  <td>TÊN API</td>
                  <td>URL</td>
                  <td>MÔ TẢ</td>
                  <td>POLICY</td>
                </tr>
              </tbody>
            </table>
            <table>
              <tbody>
                {dataPack.API.map((api, i) => (
                  <tr className={style.infoApi} key={i}>
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
        <div className={style.purchaseButton}>
          <button className={style.purchaseButtonCance}>
            <Link to={"/"}>Hủy</Link>
          </button>
          <button className={style.purchaseButtonSub}>
            <Link
              to={"/PageConfirmRegistration"}
              onClick={() => handleConfirm()}>
              Xác nhận
            </Link>
          </button>
        </div>
      </div>
    </>
  );
}

export default SingUpToPurchase;
