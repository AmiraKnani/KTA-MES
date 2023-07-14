import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { useEffect, useState, useRef } from 'react';
import makeAnimated from 'react-select/animated';
import Select from 'react-select';
import '../../../css/Chart.css';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleDown, faSearch } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import IconButton from '@mui/material/IconButton';
import { ExpandMore, ExpandLess } from '@material-ui/icons';
import Operation from './Operation';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Card from './Card';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../../../css/Filtre.css'
import { registerLocale, setDefaultLocale } from "react-datepicker";
import fr from 'date-fns/locale/fr'; // or your preferred locale
import Footer from '../../../components/Footer';
import prod from '../../../images/prod.png'
import prod1 from '../../../images/prod1.png'

registerLocale('fr', fr);
setDefaultLocale('fr');


function Table() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [isFilterCollapsed, setIsFilterCollapsed] = useState(true);
  const [isSearchCollapsed, setIsSearchCollapsed] = useState(true);
  const toggleFilterContent = () => {
    setIsFilterCollapsed(!isFilterCollapsed);
  };



  const handlePeriodSelection = (period) => {
    setSelectedPeriod(period);
    setDialogOpen(true);
  }

  const handleClose = () => {
    setDialogOpen(false);
  }

  const toggleSearchContent = () => {
    setIsSearchCollapsed(!isSearchCollapsed);
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: '#6d6fb3',
      border: 'none',
      boxShadow: 'none',
      color: 'white'
    }),
    placeholder: (provided) => ({
      ...provided,
      color: 'white',
    }),


  };
  const [filtered, setFiltered] = useState([])
  const checkboxRefA = useRef()
  const checkboxRefB = useRef()
  const checkboxRefC = useRef()
  const checkboxRefD = useRef()
  const selecRef = useRef()
  //csv data

  const [backendData, setBackenData] = useState([{}])
  useEffect(() => {
    fetch("/data").then(
      response => response.json()
    ).then(
      data => {
        setBackenData(data)
      }
    )
  }
  )
  var m = backendData.data


  //mongodb data
  {/*const [backendData, setBackendData] = useState([]);

  useEffect(() => {
    fetch('/data')
      .then(response => response.json())
      .then(result => {
        setBackendData(result);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  var m = backendData.data*/}




  let posts = []


  let obj = []
  const handleChangeSelect = selectedOption => {
    checkboxRefA.current.checked = false
    checkboxRefB.current.checked = false
    checkboxRefC.current.checked = false
    checkboxRefD.current.checked = false
    setFiltered(selectedOption)
    let aux = []
    let temp = []
    for (let i = 0; i < Object.keys(selectedOption).length; i++) {
      aux = {
        poste: selectedOption[i].value,
        tauxProductivite: selectedOption[i].taux
      }
      temp.push(aux)
    }
    setFiltered(temp)
  }





  const handleChangeGroupe = (event, groupe) => {
    let aux = []
    //test if the action was to check or uncheck
    if (event.target.checked) {
      // add the elements with matching Group to the Filtered object
      let leng = Object.keys(m).length
      for (let o = 0; o < leng; o++) {
        switch (groupe) {
          case "A":
            if (m[o].poste[2] === "0") {
              const objectExists = filtered.some(item => item.poste === m[o].poste && item.tauxProductivite === m[o].tauxProductivite);
              if (!objectExists) {
                aux.push(m[o])
              }
            }
            break;
          case "B":
            if (m[o].poste[2] === "1") {
              const objectExists = filtered.some(item => item.poste === m[o].poste && item.tauxProductivite === m[o].tauxProductivite);
              if (!objectExists) {
                aux.push(m[o])
              }
            }
            break;
          case "C":
            if (m[o].poste[2] === "2") {
              const objectExists = filtered.some(item => item.poste === m[o].poste && item.tauxProductivite === m[o].tauxProductivite);
              if (!objectExists) {
                aux.push(m[o])
              }
            }
            break;
          default:
            const objectExists = filtered.some(item => item.poste === m[o].poste && item.tauxProductivite === m[o].tauxProductivite);
            if (!objectExists) {
              if (m[o].poste[2] === "3") {
                aux.push(m[o])
              }
            }
        }
      }
      let merged = [...aux, ...filtered];
      setFiltered(merged)
    } else {
      //delete matching elements from the Filtered Object
      let aux = filtered
      let leng = Object.keys(filtered).length
      let k = 0
      for (let o = 0; o < leng; o++) {
        switch (groupe) {
          case "A":
            if (aux[k].poste[2] === "0") {
              aux.splice(k, 1)
              k--
            }
            k++
            break;
          case "B":
            if (aux[k].poste[2] === "1") {
              aux.splice(k, 1)
              k--
            }
            k++
            break;
          case "C":
            if (aux[k].poste[2] === "2") {
              aux.splice(k, 1)
              k--
            }
            k++
            break;
          default:
            if (aux[k].poste[2] === "3") {
              aux.splice(k, 1)
              k--
            }
            k++
        }

      }
      setFiltered(aux)
    }
  };

  for (let j = 0; j < backendData.numPostes; j++) {
    let label = "Poste " + backendData.data[j].poste.substring(2);
    obj = {
      value: backendData.data[j].poste,
      taux: backendData.data[j].tauxProductivite,
      label: label
    }
    posts.push(obj)
  }


  const [startDate, setStartDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(true);



  const formatter = (value) => `${value * 100}%`;
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="Poste"><span style={{ color: 'white' }}>{`Poste:${payload[0].payload.poste}`}</span></p>
          <p className="Taux"><span style={{ color: 'white' }}>{`Taux: ${(Number(payload[0].payload.tauxProductivite) * 100).toFixed(1)}%`}</span></p>
        </div>
      );
    }



    return null;
  };



  return (
    <>  {/*<div className='selectcont'> 
     <Select
    className='select'
    ref={selecRef}
    closeMenuOnSelect={true}
    components={{
      DropdownIndicator: () => (
        <FontAwesomeIcon className="ddind" icon={faSearch} />
      ),
    }}
    styles={customStyles}
    placeholder="Search"
    isMulti
    options={posts}
    onChange={handleChangeSelect}
    /></div>
    <div className="checkcontainer">
      <div className="checkboxdiv"><input type='checkbox' ref={checkboxRefA} onChange={event => handleChangeGroupe(event, "A")}/>A(0..99)</div>
      <div className="checkboxdiv"><input type='checkbox' ref={checkboxRefB} onChange={event => handleChangeGroupe(event, "B")}/>B(100..199)</div>
      <div className="checkboxdiv"><input type='checkbox' ref={checkboxRefC} onChange={event => handleChangeGroupe(event, "C")}/>C(200..299)</div>
      <div className="checkboxdiv"><input type='checkbox' ref={checkboxRefD} onChange={event => handleChangeGroupe(event, "D")}/>D(300..399)</div>
    </div> */}  <br />

      <div className="parent-container">
        <div className="collapsible-tauxT">
          <div className="header-chart1" >
            Code Poste <tr/> Désignation Poste <tr /> Etat
          </div>
          <br />
          <div className="collapsible-table">
            <div className="header-data" >
              P214 <tr/> Ebavureuse - Mat:01050117  <tr /> <div style={{backgroundColor: '#5db82191', color: '#3B671D', borderRadius: '5px'}}>Production</div>
            </div></div>
            <div className="collapsible-table">
            <div className="header-data" >
              P043 <tr/> Poste Etanchéité  <tr /> <div style={{backgroundColor: '#f0ab259e', color: '#9F721C', borderRadius: '5px', minWidth: '76px',textAlign:'center'}}>   Attente   </div>
            </div></div>
            <div className="collapsible-table">
            <div className="header-data" >
              P046 <tr/> Brasage-Chargement (FO-01)  <tr /> <div style={{backgroundColor: '#ec101091', color: '#C41313', borderRadius: '5px', minWidth: '76px',textAlign:'center'}}>Arrêt</div>
            </div></div>
            <div className="collapsible-table">
            <div className="header-data" >
              P214 <tr/> Ebavureuse - Mat:01050117  <tr /> <div style={{backgroundColor: '#5db82191', color: '#3B671D', borderRadius: '5px'}}>Production</div>
            </div></div>

        </div>

        <div className="container">
          <div className="filter-component">
            <div className="header-chart" >
              Code Poste <tr/> P214 
              </div>
              <div className="header-chartP" >
              Désignation Poste   <div style={{ fontSize: '17px' , textAlign: 'end'}} > Ebavureuse - Mat:01050117</div>
              </div>
              <div className="KTA">
              <div className="parent-container">
            <img src={prod} alt="KTA prod"  /><img src={prod1} alt="KTA prod"  /></div>
          </div>
            
            
          </div>
          
          
        </div>

        
      </div>
      <br/><br/>


    </>
  )
}

export default Table