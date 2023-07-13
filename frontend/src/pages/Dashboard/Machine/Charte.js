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
registerLocale('fr', fr);
setDefaultLocale('fr');


function Charte() {
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
        <div className="collapsible-taux">
          <div className="header-chart" >
            Taux de rendement synthétique
          </div>
          <div className='show-content'>
            <div className='row'>
              <div className="parenttrs">
                <ResponsiveContainer width={'99%'} height={'99%'}>
                  <BarChart
                    width={500}
                    height={300}
                    data={Object.keys(filtered).length === 0 ? m : filtered}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="poste" />
                    <YAxis datakey="taux" tickFormatter={formatter} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="tauxProductivite" fill="#1F69EF" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>



        </div>
        <div className="container">
          <div className="filter-component">
            <div className="header-chart" onClick={toggleFilterContent}>
              Période
              <IconButton onClick={toggleFilterContent}>
                {isFilterCollapsed ? <ExpandMore /> : <ExpandLess />}
              </IconButton>
            </div>
            <div className={`content ${isFilterCollapsed ? '' : 'show-content'}`}>
              <div className="column">
                
                <div className="parent1">
      <div className="choice" onClick={() => handlePeriodSelection('seance')}>Séance</div>
      <div className="choice" onClick={() => handlePeriodSelection('day')}>Jour</div>
      <div className="choice" onClick={() => handlePeriodSelection('week')}>Semaine</div>
      <div className="choice" onClick={() => handlePeriodSelection('month')}>Mois</div>
      <div className="choice" onClick={() => handlePeriodSelection('quarter')}>Trimestre</div>
    </div>

    <Dialog onClose={handleClose} open={dialogOpen} PaperProps={{style: {width: '22%', height: '60%'}}}>
      <DialogTitle>Choisissez une période</DialogTitle>
      <DialogContent>
        {selectedPeriod === 'seance' && (
          <>
            <Button onClick={() => console.log('Matin')}>Matin</Button>
            <Button onClick={() => console.log('Soir')}>Soir</Button>
            <Button onClick={() => console.log('Nuit')}>Nuit</Button>
          </>
        )}
        {selectedPeriod !== 'seance' && (
          <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          open={isOpen}
          onInputClick={() => setIsOpen(!isOpen)}
          calendarClassName="custom-datepicker"
          dateFormat={selectedPeriod === 'month' ? 'MM/yyyy' : 'MM/dd/yyyy'}
          showMonthYearPicker={selectedPeriod === 'month'}
          showWeekNumbers={selectedPeriod === 'week'}
          monthsShown={selectedPeriod === 'quarter' ? 3 : 1}
        />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>

              </div>

            </div>
          </div>
          <div className="search-component">
            <div className="collapsible-box1">
              <div className="header-chart" onClick={toggleSearchContent}>
                Poste
                <IconButton onClick={toggleSearchContent}>
                  {isSearchCollapsed ? <ExpandMore /> : <ExpandLess />}
                </IconButton>
              </div>
              <div className={`content ${isSearchCollapsed ? '' : 'show-content'}`}>
                <div className='selectcont'>
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
                  <div className="checkboxdiv"><input type='checkbox' ref={checkboxRefA} onChange={event => handleChangeGroupe(event, "A")} />A(0..99)</div>
                  <div className="checkboxdiv"><input type='checkbox' ref={checkboxRefB} onChange={event => handleChangeGroupe(event, "B")} />B(100..199)</div>
                  <div className="checkboxdiv"><input type='checkbox' ref={checkboxRefC} onChange={event => handleChangeGroupe(event, "C")} />C(200..299)</div>
                  <div className="checkboxdiv"><input type='checkbox' ref={checkboxRefD} onChange={event => handleChangeGroupe(event, "D")} />D(300..399)</div>
                </div>
              </div>
            </div>
          </div>
          <div className="filter-component">
            <Operation />
          </div>
        </div>


      </div>

    </>
  )
}

export default Charte