
function Card(props){
    return(
      <div  className="card text-center">
      <div className="bosx1">
      <h5 className="card-title">{props.title}</h5>
      <h3 className="incard card-text">{props.data}</h3>
      </div>
      </div>
    );
  }
  export default Card;
