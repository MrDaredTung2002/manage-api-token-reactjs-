import { cx } from "../index";
function CreateApi() {
  return (
    <>
      <form>
        <label>
          <span>Tên API</span>
          <p>*</p>
        </label>
        <input className={cx("nameApi")} type={"text"} />
      </form>
      <form>
        <label className={cx("createPolicy")}>
          <span>Policy</span>
          <p>*</p>
        </label>
        <select>
          <option>Đồng</option>
          <option>Bạc</option>
          <option>Vàng</option>
          <option>Kim cương</option>
        </select>
      </form>
    </>
  );
}

export default CreateApi;
