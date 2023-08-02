import CardTaux from './CardTaux'
import { useEffect, useState } from 'react';
import { ProgressBar } from 'react-bootstrap';

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

  const progress2 = parseFloat(TRS).toFixed(1);

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
  const progress = parseFloat(TD).toFixed(1);

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
  const progress1 = parseFloat(TP).toFixed(1);

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
  const progress3 = parseFloat(TQ).toFixed(1);


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

  const progress4 = parseFloat(TRG).toFixed(1);




  return (
    <div className="collapsible-box2">
      <div className='show-content'>
        <div className='row'>
          <div className="parent">
            <div className='box1'> <center>
              <CardTaux
                className='box1'
                title={
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginLeft: '10px' }}>
                    <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#1F69EF', marginBottom: '-40px', marginTop: '10px' }}>{`${progress2}%`}</span>
                    <span style={{ fontSize: '10px', color: '#1F69EF', marginBottom: '-50px', marginRight: '10px' }}>
                      Taux de rendement synthétique (TRS)
                    </span>
                  </div>
                }
                data1={<div style={{ marginTop: '30px', marginBottom: '10px' }}>
                  <ProgressBar
                    now={progress2}
                    label={`${progress2}%`}
                    style={{ width: '1350%', height: '1.5rem', background: '#1f69ef80', marginRight: '10px', marginLeft: '-30px' }}
                  />
                </div>}
              /></center></div>
            <div className='box1'> <center><CardTaux
              className='box1'
              title={
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginLeft: '10px' }}>
                  <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#f0ab25', marginBottom: '-40px', marginTop: '10px' }}>{`${progress}%`}</span>
                  <span style={{ fontSize: '10px', color: '#f0ab25', marginBottom: '-60px', marginRight: '10px' }}>
                    Taux de disponibilité (TD)
                  </span>
                </div>
              }
              data1={<div className="custom-progress-bar" style={{ marginTop: '30px', marginBottom: '10px' }}>
                <ProgressBar
                  now={progress}
                  label={`${progress}%`}
                  style={{ width: '1350%', height: '1.5rem', background: '#f0ab2580', marginRight: '10px', marginLeft: '-30px' }}

                // Adjust height here for bigger appearance 
                />
              </div>}
            /></center></div>
            <div className='box1'> <center><CardTaux
              className='box1'
              title={
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginLeft: '10px' }}>
                  <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#5da421', marginBottom: '-40px', marginTop: '10px' }}>{`${progress1}%`}</span>
                  <span style={{ fontSize: '10px', color: '#5da421', marginBottom: '-60px', marginRight: '10px' }}>
                    Taux de performance (TP)
                  </span>
                </div>
              }
              data1={<div className="custom-progress-bar1" style={{ marginTop: '30px', marginBottom: '10px' }}>
                <ProgressBar
                  now={progress1}
                  label={`${progress1}%`}
                  style={{ width: '1350%', height: '1.5rem', background: '#5da42180', marginRight: '10px', marginLeft: '-30px' }}
                // Adjust height here for bigger appearance 
                />
              </div>}

            />
            </center></div>
            <div className='box1'> <center> <CardTaux
              className='box1'
              title={
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginLeft: '10px' }}>
                  <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#3367a8', marginBottom: '-40px', marginTop: '10px' }}>{`${progress3}%`}</span>
                  <span style={{ fontSize: '10px', color: '#3367a8', marginBottom: '-60px', marginRight: '10px' }}>
                    Taux de qualité (TQ)
                  </span>
                </div>
              }
              data1={<div className="custom-progress-bar3" style={{ marginTop: '30px', marginBottom: '10px' }}>
                <ProgressBar
                  now={progress3}
                  label={`${progress3}%`}
                  style={{ width: '1350%', height: '1.5rem', background: '#3367a880', marginRight: '10px', marginLeft: '-30px' }}
                // Adjust height here for bigger appearance 
                />
              </div>}
            /></center></div>
            <div className='box1'> <center><CardTaux className='box1' title={
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginLeft: '10px' }}>
                <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#ec101080', marginBottom: '-40px', marginTop: '10px' }}>{`${progress4}%`}</span>
                <span style={{ fontSize: '10px', color: '#ec101080', marginBottom: '-50px', marginRight: '10px' }}>
                  Taux de rendement globale (TRG)
                </span>
              </div>
            } data1={<div className="custom-progress-bar2" style={{ marginTop: '30px', marginBottom: '10px' }}>
              <ProgressBar
                now={progress4}
                label={`${progress4}%`}
                style={{ width: '1350%', height: '1.5rem', background: '#ec10106b', marginRight: '10px', marginLeft: '-30px' }}
              // Adjust height here for bigger appearance 
              />
            </div>} /></center></div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Taux;
