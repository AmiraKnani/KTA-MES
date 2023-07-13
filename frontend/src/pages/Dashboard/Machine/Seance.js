import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState, useRef } from 'react';
import IconButton from '@mui/material/IconButton';
import { ExpandMore, ExpandLess } from '@material-ui/icons';
import ProgressBar from 'react-bootstrap/ProgressBar';
import '../../../css/Seance.css'
import Card from './Card';

function Seance(props) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const moy = (Math.round((props.data.moy * 100) * 100) / 100) + "%";
  const toggleContent = () => {
    setIsCollapsed(!isCollapsed);
  };
  const num = props.data.moy * 100;
  const label = num.toFixed(1)
  const ppbar = (
    <ProgressBar className="progbar"
      label={label + "%"}
      variant={props.data.moy * 100 > 85 ? "success" ? props.data.moy * 100 > 50 : "warning" : "danger"}
      now={num} />
  );
  return (
    
    <div className="collapsible-box">
      <div className="header-chart" onClick={toggleContent}>
        Séance
        <IconButton onClick={toggleContent}>
          {isCollapsed ? <ExpandMore /> : <ExpandLess />}
        </IconButton>
      </div>
      <div className={`content ${isCollapsed ? '' : 'show-content'}`}>
        <div className="row">
          <div className="parent">
            <div className="box">
              <center>
                <Card
                  className="box-content"
                  title="Nbr Poste"
                  data={<span style={{ color: '#1F69EF' }}>{props.data.numPostes}</span>}
                />

              </center>
            </div>
            <div className="box">
              <center>
                <Card
                  className="box-content"
                  title="Durée totale"
                  data={<span style={{ color: '#1F69EF' }}>{"1058h:58"}</span>}
                />
              </center>
            </div>
            <div className="box">
              <center>
                <Card
                  className="box-content"
                  title="Durée séance"
                  data={<span style={{ color: '#1F69EF' }}>{"08:00"}</span>}
                />
              </center>
            </div>
            <div className="box">
              <center>
                <Card
                  className="box-content"
                  title="Durée écoulée"
                  data={<span style={{ color: '#1F69EF' }}>{"07:03"}</span>}
                />
              </center>
            </div>
            <div className="box">
              <center>
                <Card
                  className="box-content"
                  title="Taux D.E"
                  data={<span style={{ color: '#1F69EF' }}>{ppbar}</span>}
                />
              </center>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Seance;






