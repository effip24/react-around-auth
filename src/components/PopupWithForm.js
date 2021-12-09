const PopupWithForm = ({ name, title, submit, onClose, isOpen, onSubmit, submitButtonState, children, type }) => {
  return (
    <div className={`popup popup_window_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button aria-label="close" type="button" className="popup__close" onClick={onClose}></button>
        <form onSubmit={onSubmit} noValidate name={name} className={`popup__form ${type}`}>
          <h2 className="popup__title">{title}</h2>
          {children}
          <button className={`popup__submit ${submitButtonState}`} type="submit">
            {submit}
          </button>
        </form>
      </div>
    </div>
  );
};
export default PopupWithForm;
