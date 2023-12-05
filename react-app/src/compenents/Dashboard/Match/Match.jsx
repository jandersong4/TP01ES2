import axios from 'axios';
import {useState, useEffect} from 'react'
import {Link, useRouteMatch} from 'react-router-dom'
import { Button } from 'react-bootstrap';
import './Match.css';
import MatchCard from '../MatchCard/MatchCard'

export default function Match() {
    const matchRoute = useRouteMatch()
    const[match, setMatch] = useState();
    useEffect(()=>
        axios.get('/matchs')
            .then((res) =>setMatch(res.data))
            .catch((err) => console.log(err.response)),    
    []);
 
    let loadedMatchs = [];
    const matchsToCards = (element, index) =>
        <Link className="hoverable" key={index}
         to={`${matchRoute.path}/${element.id}`}>
             <MatchCard key={index} user={element} />
         </Link>
         if(match) loadedMatchs = match.map(matchsToCards)

 
    return (
        <div className="Match">
            <Link to= {`${useRouteMatch().path}/cadastro`}>
                <Button className="botaoCadastro">
                    Cadastrar Partida
                    </Button>
            </Link>
            <div className="itens">
                {loadedMatchs}
            </div>
            
        </div>
    )
}
 