import { useState, useEffect } from "react";
import { useParams,Link,useHistory } from "react-router-dom";
import axios from 'axios';
import { Button, Card } from "react-bootstrap";
import './UserProfile.css';


export default function UserProfile(props) {
    const history = useHistory();
    const [user, setUser] = useState({UserId:0});
    let { id } = useParams();

    console.log(id);
    
    useEffect(() =>
        axios.get(`/users/user/${id}`)
        .then((res) => {console.log(res); 
        setUser(res.data)})
        .catch( (err) => console.log(err.response) ),
        [id])
    const disableButton = () =>( (props.user.role !== 'admin')) ? true : false;


    const handleDelete = (event) => {
        event.preventDefault();
        axios.delete(`/users/user/${id}`)
        .then((res) => history.push('/dashboard/users'))
        .catch( (err) => console.log(err.response) );
    }
    return (
        <div className="UserProfile">
            <Card style = {{width: '20rem'}}>
                <Card.Img  variant="top" src={user ? user.image : ''} />
                <Card.Body>
                    <Card.Title className="Title">{user ? user.username : ''}</Card.Title>
                    <Link style={disableButton() ? {pointerEvents: 'none'} : null} to={`/dashboard/users/edit/${id}`}>
                        <Button className="Button1" disabled={disableButton() ? true : false} variant="warning">
                            Editar Usuário
                        </Button>
                    </Link>
                    <Button disabled={disableButton() ? true : false} onClick={handleDelete} variant="danger">
                        Deletar Usuário
                    </Button>
                </Card.Body>
            </Card>
        </div>
    )
}
