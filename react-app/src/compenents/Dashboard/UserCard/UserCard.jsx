import './UserCard.css'
// import Card from 'react-bootstrap/Card'
// import { Button } from 'react-bootstrap';

export default function UserCard(props) {
    return (
        <div className="UserCard grid-item">
            <img src={props.user.image} alt="usuario /"/>
            <p className="name">{props.user.username}</p>
            <p className="desciption">{props.user.description}</p>
        </div>

            // <div>
            //       <Card bg={'Light'} style={{ width: '13rem' }}>
            // <Card.Img variant="top" src={props.user.image} alt="match /"  />
            // <Card.Body>
            //     <Card.Title className="Title">{props.user.name}</Card.Title>
            //     <Button variant="primary">Go somewhere</Button>
            // </Card.Body>
            // </Card>

            // </div>
              

    )
}
 