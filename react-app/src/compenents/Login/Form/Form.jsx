import "./Form.css";
import d20_logo from "../../../assets/d20_logo.png";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Form() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post("/users/login", { email, password })
      .then((res) => history.push("/dashboard"))
      .catch((err) => alert(err));
  }

  return (
    <form method="POST" onSubmit={handleSubmit}>
      <img className="Imagem_login" src={d20_logo} alt="logo" />
      <label htmlFor="email">
        <p>Login:</p>
      </label>
      <input
        type="text"
        placeholder="Digite seu email"
        name="email"
        className="Espaco_email"
        required
        onChange={handleEmailChange}
        value={email}
      />
      <input
        id="form-bottom"
        type="password"
        placeholder="Digite sua senha"
        value={password}
        name="password"
        required
        onChange={handlePasswordChange}
      />
      <button className="button" type="submit">
        Entrar
      </button>
    </form>
  );
}
