import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  useState,
  useLayoutEffect,
  useContext,
  useCallback,
  memo,
} from "react";
import style from "~/compoment/Style/service.module.css";
import { widthContext } from "~/compoment/Layout/DefaultLayout";
function ServiceRegistration() {
  const setWidthContext = useContext(widthContext);
  const [packs, setPacks] = useState([]);
  useLayoutEffect(() => {
    fetch("http://localhost:3000/package")
      .then((res) => res.json())
      .then((packages) => setPacks(packages));
  }, []);
  function handleSelectPack(pack, length) {
    var charSet =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789";
    var randomString = "";
    for (var i = 0; i < length; i++) {
      var randomPoz = Math.floor(Math.random() * charSet.length);
      randomString += charSet.substring(randomPoz, randomPoz + 1);
    }
    const data = {
      idUser: setWidthContext.idUser,
      idPack: randomString,
      ...pack,
    };
    const option = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch("http://localhost:3000/userRegisterPack/10", option)
      .then((response) => response.json())
      .then((callback) => callback);
  }
  return (
    <div className={style.service}>
      <div className={style.serviceTable}>
        <div className={style.serviceList}>
          {packs.map((pack) => {
            const active = pack.active === "true" ? style.active : " ";
            return (
              <div className={style.serviceItem + " " + active} key={pack.id}>
                <div className={style.packageName}>{pack.name}</div>
                <div className={style.packagePrice}>{pack.price}</div>
                <div className={style.packageDuration}>{pack.duration}</div>
                <button className={style.packageButton}>
                  <Link
                    onClick={() => handleSelectPack(pack, 20)}
                    to="/PageSingUpToPurchase">
                    Mua ngay
                  </Link>
                </button>
                <div className={style.packageDecriptionList}>
                  {pack.information.map((info, i) => (
                    <div className={style.packageDecriptionItem} key={i + 1000}>
                      <FontAwesomeIcon icon={faCheck} />
                      <span>{info}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default memo(ServiceRegistration);
