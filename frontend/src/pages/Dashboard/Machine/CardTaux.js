
function CardTaux(props){
  return(
    <div  className="card text-center">
    <div className="bosx1">
    <h5 className="card-title">{props.title}</h5>
    <div className='containercard'>
    <div className="left">{props.data1}</div>
    <div className="right">{props.data2}</div>
    </div>
    </div>
    </div>
  );
}
  export default CardTaux;
