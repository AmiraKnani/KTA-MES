import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState, useRef } from 'react';
import IconButton from '@mui/material/IconButton';
import { ExpandMore, ExpandLess } from '@material-ui/icons';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Card from './Card';
import '../../../css/Filtre.css'


function Operation(props) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const toggleContent = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    
    <div className="collapsible-box1">
      <div className="header-chart" onClick={toggleContent}>
        Opération
        <IconButton onClick={toggleContent}>
          {isCollapsed ? <ExpandMore /> : <ExpandLess />}
        </IconButton>
      </div>
      <div className={`content ${isCollapsed ? '' : 'show-content'}`}>
        <div className="column">
          
        </div>
      </div>
    </div>
  
    
    

    
  );
}

export default Operation;







