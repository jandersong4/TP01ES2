import axios from 'axios';
import { useState } from 'react';
import {Form, Button} from 'react-bootstrap';
import d20_logo from '../../../assets/d20_logo.png'
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';


import './AlterarMatch.css'

export default function AlterarMatch() {
    const [formValues, setFormValues] = useState({
        name: '',
        image: '',
    })
    const inputChange = (event) => {
        if(event.target.name === "name")
            setFormValues({...formValues, name: event.target.value})
        if(event.target.name === "image")
            setFormValues({...formValues, image: event.target.value})
        console.log(formValues)
    }

    const history = useHistory();

    let {id} =useParams();
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put(`/matchs/${id}`, formValues)
            .then((res) => history.push('/dashboard/matchs'))
            .catch((err) => console.log(err.response))
    }
 
    return (
        
        <div className="CadastroMatch">
            <h1 className="Titulo">Crie sua partida.</h1>
            <img src={d20_logo} className="rotateCadastro" />
            
            <Form onSubmit={handleSubmit} className="formMatch">
                <Form.Group controlId="formbasicName">
                    <Form.Control name="name" onChange={inputChange} type="text" placeholder="Nome"/>
                </Form.Group>
                <Form.Group controlId="formbasicImage">
                    <Form.Control name="image" onChange={inputChange} type="text" placeholder="Image"/>
                </Form.Group>
                <Button className="ButtonCadastro" variant="warning" type="submit">Concluir Edição</Button>
            </Form>
        </div>
    )
}
 