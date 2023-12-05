import './MatchCard.css'
export default function MatchCard(props) {
    return (
        <div className="UserCard grid-item">
            <img src={props.user.image} alt="match /"/>
            <p className="name">{props.user.name}</p>
            <p className="desciption">{props.user.description}</p>
        </div>
              

    )
}
