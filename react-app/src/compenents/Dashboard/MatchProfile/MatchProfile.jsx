import { useState, useEffect } from "react";
import { useParams,Link,useHistory } from "react-router-dom";
import axios from 'axios';
import { Button, Card } from "react-bootstrap";
import './MatchProfile.css';
import PlayTable from '../PlayTable/PlayTable';



export default function MatchProfile(props) {
    const history = useHistory();
    const [match, setMatch] = useState({UserId:0});
    let { id } = useParams();

    console.log(id);
    
    useEffect(() =>
        axios.get(`/matchs/${id}`)
        .then((res) => {console.log(res); 
        setMatch(res.data)})
        .catch( (err) => console.log(err.response) ),
        [id])
    
    const disableButton = () =>{
        if((props.user.role !== 'admin') && props.user.id !== (match ? match.UserId : null)){
            return true
        }return false
    }

    const handleDelete = (event) => {
        event.preventDefault();
        axios.delete(`/matchs/${id}`)
        .then((res) => history.push('/dashboard/matchs'))
        .catch( (err) => console.log(err.response) );
    }

///////////////////////////////////////////////FUNCOES ROLAGEM DE DADOS/////////////////////////////////////

function Getrand(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min
  }


function rolagemDado(){
    const senddata = {
        IdDaPartida: `${id}`
    };

    senddata.d4 = Getrand(1,4);
    senddata.d6 = Getrand(1,6);
    senddata.d8 = Getrand(1,8);
    senddata.d10 = Getrand(1,10);
    senddata.d12 = Getrand(1,12);
    senddata.d20 = Getrand(1,20);

    axios.post(`/plays`, senddata)
        .then((res) =>(
            axios.get(`/plays/listaJogadas/${id}`)
        .then((res) =>setPlay(res.data))
        .catch((err) => console.log(err.response))
        ))
        .catch((err) => console.log(err.response))

}


const[play, setPlay] = useState([]);
useEffect(()=>
    axios.get(`/plays/listaJogadas/${id}`)
        .then((res) =>setPlay(res.data))
        .catch((err) => console.log(err.response)),
           
[]);


console.log('xxxx-', match)


/////////////////////////////////////////////////////////////////////////////////////////////////////////////
    return (
        <div className="MatchProfile">
            <Card style = {{width: '20rem'}}>
            <div style={{backgroundColor:'yellow'}} >MESTRE: {match.matchUserData ? match.matchUserData.username : '' } </div>
                <Card.Img  variant="top" src={match ? match.image : ''} />
                <Card.Body>
                    <Card.Title className="Title">{match ? match.name : ''}</Card.Title>
                    <Link style={disableButton() ? {pointerEvents: 'none'} : null} to={`/dashboard/matchs/edit/${id}`}>
                        <Button className="Button1" disabled={disableButton() ? true : false} variant="warning">
                            Editar Partida
                        </Button>
                    </Link>
                    <Button className="Button1" disabled={disableButton() ? true : false} onClick={handleDelete} variant="danger">
                        Deletar Partida
                    </Button>
                </Card.Body>
            </Card>
            <div className="Tabela"><PlayTable data = {play} /></div>
            <div className="Button2"><Button variant="success" onClick={()=> rolagemDado()}> Rolar dados</Button></div>   
        </div>
    )
}
