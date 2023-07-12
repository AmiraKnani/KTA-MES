import CardTaux from './CardTaux'
function Taux(props) {
    const trs = 25.5
    const td = 12.5
    const tp = 42.8
    const tq = 90.8
    const trg = (trs + td + tp + tq) / 4
    return (
        <div className="collapsible-box">
            <div className='show-content'>
                <div className='row'>
                    <div className="parent">
                        <div className='box1'> <center> <CardTaux
                            className='box1'
                            title={<span style={{ color: '#1F69EF' }}>{"Taux de rendement synthétique"}</span>}
                            data1={<span style={{ color: '#1F69EF' }}>{'TRS(%)'}</span>}
                            data2={<span style={{ color: '#1F69EF' }}>{trs + "%"}</span>}
                        /></center></div>
                        <div className='box1'> <center><CardTaux
                            className='box1'
                            title={<>Taux de<br />disponibilité</>}
                            data1={<div>{"TD(%)"}</div>}
                            data2={<div>{td + "%"}</div>}
                        /></center></div>
                        <div className='box1'> <center><CardTaux
                            className='box1'
                            title={<>Taux de<br />performance</>}
                            data1={<div>{"TP(%)"}</div>}
                            data2={<div>{tp + "%"}</div>}
                        />
                        </center></div>
                        <div className='box1'> <center> <CardTaux className='box1' title={<>Taux de<br />qualité</>} data1={"TQ(%)"} data2={tq + "%"} /></center></div>
                        <div className='box1'> <center><CardTaux className='box1' title={<>Taux de rendement<br />globale</>} data1={"TRG(%)"} data2={trg + "%"} /></center></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Taux;
