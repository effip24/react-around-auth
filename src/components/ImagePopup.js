const ImagePopup = ({ onClose, card, name }) => {
  return (
    <div className={`popup popup_window_image ${Object.keys(card).length !== 0 ? "popup_opened" : ""}`}>
      <div className="popup__container popup__container_type_image">
        <button aria-label="close" type="button" className="popup__close popup__close_image" onClick={onClose}></button>
        <img src={card ? card.link : "#"} alt={name} className="popup__image" />
        <p className="popup__description">{card ? card.name : ""}</p>
      </div>
    </div>
  );
};
export default ImagePopup;
