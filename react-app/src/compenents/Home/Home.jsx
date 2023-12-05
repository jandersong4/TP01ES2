import "./Home.css";
import d20_logo from "../../assets/d20_logo.png";
import { Button } from "react-bootstrap";

export default function Home() {
  return (
    <div className="background">
      <div class="container">
        <img class="img-home" src={d20_logo} />
        <Button className="button" variant="danger" size="lg" href="/login">
          Login
        </Button>
      </div>
    </div>
  );
}
