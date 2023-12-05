import axios from "axios";
import { useState, useEffect } from "react";
import { Nav, Button } from "react-bootstrap";
import { useHistory } from "react-router";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import "./Dashboard.css";
import d20_logo from "../../assets/d20_logo.png";
import Match from "./Match/Match";
import MatchProfile from "./MatchProfile/MatchProfile";
import CadastroMatch from "./CadastroMatch/CadastroMatch";
import AlterarMatch from "./AlterarMatch/AlterarMatch";
import Users from "./Users/Users";
import UserProfile from "./UserProfile/UserProfile";
import CadastroUser from "./CadastroUser/CadastroUser";
import AlterarUser from "./AlterarUser/AlterarUser";
import MatchCard from "./MatchCard/MatchCard";

export default function Dashboard() {
  const [user, setUser] = useState(false);

  useEffect(() => {
    axios
      .get("/users/me")
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err.response));
  }, []);

  const history = useHistory();

  const handleLogout = () => {
    axios.get("/users/logout");
    history.push("/");
  };

  const matchRoute = useRouteMatch();

  const [match, setMatch] = useState();

  useEffect(() => {
    axios
      .get("/matchs/ler10")
      .then((res) => setMatch(res.data))
      .catch((err) => console.log(err.response));
  }, []);

  let loadedMatchs = [];

  const matchsToCards = (element, index) => (
    <Link
      className="hoverable"
      key={index}
      to={`${matchRoute.path}/matchs/${element.id}`}
    >
      <MatchCard key={index} user={element} />
    </Link>
  );

  if (match) loadedMatchs = match.map(matchsToCards);

  if (user) {
    return (
      <div className="Dashboard">
        <Nav className="flex-column">
          <Nav.Item as="h1">Dashboard</Nav.Item>
          <img width="130" height="130" src={user.image} alt="User" />
          <Nav.Item className="dashboard_name">NOME: {user.full_name}</Nav.Item>
          <Nav.Item className="dashboard_name">
            NICK NAME: {user.username}
          </Nav.Item>
          {/* <hr /> */}
          <Button
            className="button_dashboard"
            variant="dark"
            size="lg"
            as={Link}
            to="/dashboard/users"
          >
            Usuários
          </Button>
          <Button
            className="button_dashboard"
            variant="dark"
            size="lg"
            as={Link}
            to="/dashboard/matchs"
          >
            Partidas
          </Button>
          <Button
            className="button_dashboard"
            variant="dark"
            size="lg"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Nav>

        <Switch>
          <Route path="/dashboard/users/cadastro">
            <CadastroUser />
          </Route>
          <Route path="/dashboard/users/edit/:id">
            <AlterarUser />
          </Route>
          <Route path="/dashboard/users/:id">
            <UserProfile user={user} />
          </Route>
          <Route path="/dashboard/users">
            <Users />
          </Route>
          <Route path="/dashboard/matchs/cadastro">
            <CadastroMatch />
          </Route>
          <Route path="/dashboard/matchs/edit/:id">
            <AlterarMatch user={user} />
          </Route>
          <Route path="/dashboard/matchs/:id">
            <MatchProfile user={user} />
          </Route>
          <Route path="/dashboard/matchs">
            <Match />
          </Route>
        </Switch>
      </div>
    );
  } else {
    return <h1>Loading</h1>;
  }
}
