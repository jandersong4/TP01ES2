import axios from 'axios';
import { useState } from 'react';
import {Form, Button} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import d20_logo from '../../../assets/d20_logo.png'


import './CadastroUser.css'

export default function CadastroUser() {

    const history = useHistory();

    const [formValues, setFormValues] = useState({
        full_name:'',
        username:'',
        email:'',
        password:'',
        image:'',
    })
    const inputChange = (event) => {
        if(event.target.name === "full_name")
            setFormValues({...formValues, full_name: event.target.value})
        if(event.target.name === "username")
            setFormValues({...formValues, username: event.target.value})
        if(event.target.name === "email")
            setFormValues({...formValues, email: event.target.value})
        if(event.target.name === "password")
            setFormValues({...formValues, password: event.target.value})
        if(event.target.name === "image")
            setFormValues({...formValues, image: event.target.value})
        console.log(formValues)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('/users', formValues)
            .then((res) => history.push('/dashboard/users'))
            .catch((err) => console.log(err.response))
    }

    return (
        
        <div className="CadastroUser">
            <h1 className="Titulo">Cadastre um usuário.</h1>
            <img src={d20_logo} className="rotateCadastro" />
            
            <Form onSubmit={handleSubmit} className="formUser">
                <Form.Group controlId="formbasicName">
                    <Form.Control name="full_name" onChange={inputChange} type="text" placeholder="full_name"/>
                </Form.Group>
                <Form.Group controlId="formbasicName">
                    <Form.Control name="username" onChange={inputChange} type="text" placeholder="username"/>
                </Form.Group>
                <Form.Group controlId="formbasicName">
                    <Form.Control name="email" onChange={inputChange} type="text" placeholder="email"/>
                </Form.Group>
                <Form.Group controlId="formbasicName">
                    <Form.Control name="password" onChange={inputChange} type="password" placeholder="password"/>
                </Form.Group>
                <Form.Group controlId="formbasicImage">
                    <Form.Control name="image" onChange={inputChange} type="text" placeholder="Image"/>
                </Form.Group>
                <Button className="ButtonCadastro" variant="success" type="submit">Concluir Cadastro</Button>
            </Form>
        </div>
    )
}
