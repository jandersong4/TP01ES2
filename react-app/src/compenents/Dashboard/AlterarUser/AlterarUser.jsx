import axios from 'axios';
import { useEffect, useState } from 'react';
import {Form, Button} from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import d20_logo from '../../../assets/d20_logo.png'


import './AlterarUser.css'

export default function AlterarUser() {

    const history = useHistory();

    const{id} = useParams();

    const [user, setUser] = useState(false);

    const [formValues, setFormValues] = useState({
        full_name: '',
        username: '',
        email: '',
        role: '',
        image: '',
    });


    useEffect(() =>{
        axios.get(`/users/user/${id}`).then(res => setUser(res.data))
        .catch(err => console.log(err));
    },[]);
    
    useEffect(() =>{
        if(user) setFormValues({full_name: user.full_name, username: user.username, role: user.role, image: user.image})
    }, [user]);

    const inputChange = (event) => {
        if(event.target.name === "full_name")
            setFormValues({...formValues, name: event.target.value})
        if(event.target.name === "username")
            setFormValues({...formValues, username: event.target.value})
        if(event.target.name === "email")
            setFormValues({...formValues, email: event.target.value})
        if(event.target.name === "role")
            setFormValues({...formValues, role: event.target.value})
        if(event.target.name === "image")
            setFormValues({...formValues, image: event.target.value})
        console.log(formValues)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put(`/users/user/${id}`, formValues)
            .then((res) => history.push('/dashboard/users'))
            .catch((err) => console.log(err.response))
    }

    return (
        
        <div className="CadastroUser">
            <h1 className="Titulo">Crie sua partida.</h1>
            <img src={d20_logo} className="rotateCadastro" />
            
            <Form onSubmit={handleSubmit} className="formUser">
                <Form.Group controlId="formbasicName">
                    <Form.Control name="full_name"  defaultValue={user.full_name} onChange={inputChange} type="text" placeholder="full_name"/>
                </Form.Group>
                <Form.Group controlId="formbasicName">
                    <Form.Control name="username" defaultValue={user.username} onChange={inputChange} type="text" placeholder="username"/>
                </Form.Group>
                <Form.Group controlId="formbasicName">
                    <Form.Control name="email" defaultValue={user.email} onChange={inputChange} type="text" placeholder="email"/>
                </Form.Group>
                <Form.Group controlId="formbasicName">
                    <Form.Control name="role" defaultValue={user.role} onChange={inputChange} type="text" placeholder="password"/>
                </Form.Group>
                <Form.Group controlId="formbasicImage">
                    <Form.Control name="image" defaultValue={user.image} onChange={inputChange} type="text" placeholder="Image"/>
                </Form.Group>
                <Button className="ButtonCadastro" variant="warning" type="submit">Editar Usuario</Button>
            </Form>
        </div>
    )
}
