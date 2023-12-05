import './RodadaCard.css'


export default function RodadaCard(props) {
    return (
        <div className="UserCard grid-item">
            <p className="name">{props.rodada.UserId}</p>
            <p className="name">{props.rodada.d4}</p>
            <p className="name">{props.rodada.d6}</p>
            <p className="name">{props.rodada.d8}</p>
            <p className="name">{props.rodada.d10}</p>
            <p className="name">{props.rodada.d12}</p>
            <p className="name">{props.rodada.d20}</p>
            
        </div>
    )
}
