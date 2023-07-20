import CardTaux from './CardTaux'
import { useEffect, useState } from 'react';
import axios from 'axios';
function Taux(props) {
    const [TRS, setTRS] = useState(null);
    const [TD, setTD] = useState(null);
    const [TP, setTP] = useState(null);
    const [TQ, setTQ] = useState(null);
    const [TRG, setTRG] = useState(null);

//TRS 
async function getTRS() {
    try {
      const response = await axios.get('http://localhost:5000/api/TRS');
      const TRS = response.data.data; 
      return TRS;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  
  useEffect(() => {
    async function fetchData() {
      const TRSData = await getTRS();
      setTRS(TRSData);
    }
    fetchData();
  }, []);

//TD
async function getTD() {
    try {
      const response = await axios.get('http://localhost:5000/api/TD');
      const TD = response.data.data; 
      return TD;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  
  useEffect(() => {
    async function fetchData() {
      const TDData = await getTD();
      setTD(TDData);
    }
    fetchData();
  }, []);

  //TP
async function getTP() {
    try {
      const response = await axios.get('http://localhost:5000/api/TP');
      const TP = response.data.data; 
      return TP;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  
  useEffect(() => {
    async function fetchData() {
      const TPData = await getTP();
      setTP(TPData);
    }
    fetchData();
  }, []);

    //TQ
async function getTQ() {
    try {
      const response = await axios.get('http://localhost:5000/api/TQ');
      const TQ = response.data.data; 
      return TQ;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  
  useEffect(() => {
    async function fetchData() {
      const TQData = await getTQ();
      setTQ(TQData);
    }
    fetchData();
  }, []);


      //TRG
async function getTRG() {
    try {
      const response = await axios.get('http://localhost:5000/api/TRG');
      const TRG = response.data.data; 
      return TRG;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  
  useEffect(() => {
    async function fetchData() {
      const TRGData = await getTRG();
      setTRG(TRGData);
    }
    fetchData();
  }, []);

  


    return (
        <div className="collapsible-box2">
            <div className='show-content'>
                <div className='row'>
                    <div className="parent">
                        <div className='box1'> <center> <CardTaux
                            className='box1'
                            title={<span style={{ color: '#1F69EF' }}>{"Taux de rendement synthétique"}</span>}
                            data1={<span style={{ color: '#1F69EF' }}>{'TRS'}</span>}
                            data2={<span style={{ color: '#1F69EF' }}>{parseFloat(TRS).toFixed(1) + "%"}</span>}
                        /></center></div>
                        <div className='box1'> <center><CardTaux
                            className='box1'
                            title={<>Taux de<br />disponibilité</>}
                            data1={<div>{"TD"}</div>}
                            data2={<div>{parseFloat(TD).toFixed(1) + "%"}</div>}
                        /></center></div>
                        <div className='box1'> <center><CardTaux
                            className='box1'
                            title={<>Taux de<br />performance</>}
                            data1={<div>{"TP"}</div>}
                            data2={<div>{parseFloat(TP).toFixed(1) + "%"}</div>}
                        />
                        </center></div>
                        <div className='box1'> <center> <CardTaux className='box1' title={<>Taux de<br />qualité</>} data1={"TQ"} data2={parseFloat(TQ).toFixed(1) + "%"} /></center></div>
                        <div className='box1'> <center><CardTaux className='box1' title={<>Taux de rendement<br />globale</>} data1={"TRG"} data2={parseFloat(TRG).toFixed(1) + "%"} /></center></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Taux;
