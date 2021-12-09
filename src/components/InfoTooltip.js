import successIcon from "../images/sucess.svg";
import failIcon from "../images/fail.svg";

const InfoTooltip = ({ isOpen, message, success, onClose }) => {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container popup__container_type_info">
        <button aria-label="close" type="button" className="popup__close" onClick={onClose}></button>
        <img src={success ? successIcon : failIcon} alt="info icon" className="info__icon"></img>
        <p className="info__message">{message}</p>
      </div>
    </div>
  );
};
export default InfoTooltip;
