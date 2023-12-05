import "./Login.css";
// import Welcome from "./Welcome/Welcome";
import Form from "./Form/Form";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function Login() {
  const history = useHistory();

  axios.get("/users/me").then((res) => history.push("/dashboard"));

  return (
    <div className="host">
      <div class="wellcome">
        <p>Acesse sua conta!</p>
      </div>
      <div class="form">
        <Form />
      </div>
      {/* <section className="container"> */}
      {/* <div className="right">
        <Form />
      </div> */}
      {/* </section> */}
    </div>
  );
}
