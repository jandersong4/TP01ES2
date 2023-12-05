import axios from 'axios';
import {useState, useEffect} from 'react'
import {Link, useRouteMatch} from 'react-router-dom'
import { Button } from 'react-bootstrap';
import './Users.css';
import UserCard from '../UserCard/UserCard'

export default function User() {
    const match = useRouteMatch()
    const[user, setUser] = useState();
    useEffect(()=>
        axios.get('/users')
            .then((res) =>setUser(res.data))
            .catch((err) => console.log(err.response)),    
    []);

    let loadedUsers = [];
    const usersToCards = (element, index) =>
        <Link className="hoverable2" key={index}
         to={`${match.path}/${element.id}`}>
             <UserCard key={index} user={element} />
         </Link>
         if(user) loadedUsers = user.map(usersToCards)


    return (
        <div className="User">
            <Link to= {`${useRouteMatch().path}/cadastro`}>
                <Button className="botaoCadastro2">
                    Cadastrar Usuário
                    </Button>
            </Link>
            <div className="itens2">
                {loadedUsers}
            </div>
            
        </div>
    )
}
