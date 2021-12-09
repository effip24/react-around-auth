import { useState } from "react";
import { Link, withRouter } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email && password) {
      onLogin(email, password);
    }
    return;
  };

  return (
    <section className="authenticate">
      <div className="authenticate__from-container">
        <form name="login" action="#" className="authenticate__form" onSubmit={handleSubmit}>
          <div className="authenticate__title-container">
            <h3 className="authenticate__title">Log in</h3>
            <div className="authenticate__input-container">
              <input
                required
                name="email"
                type="email"
                placeholder="Email"
                className="authenticate__input"
                value={email}
                onChange={handleEmailChange}
              ></input>

              <input
                required
                name="password"
                type="password"
                placeholder="password"
                className="authenticate__input"
                value={password}
                onChange={handlePasswordChange}
              ></input>
            </div>
          </div>
          <div className="authenticate__submit-container">
            <button className="authenticate__submit" type="submit">
              Log in
            </button>
            <Link className="authenticate__link" to="/signup">
              Not a member yet? Sign up here!
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};
export default withRouter(Login);
