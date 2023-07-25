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
import fr from 'date-fns/locale/fr';
import { format } from 'date-fns';
import { getWeek } from 'date-fns';


registerLocale('fr', fr);
setDefaultLocale('fr');



function Charte() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogOpen1, setDialogOpen1] = useState(false);
  const [dialogOpen2, setDialogOpen2] = useState(false);
  const [dialogOpen3, setDialogOpen3] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [isFilterCollapsed, setIsFilterCollapsed] = useState(true);
  const [isSearchCollapsed, setIsSearchCollapsed] = useState(true);
  const [isOpCollapsed, setIsOpCollapsed] = useState(true);
  const [endDate, setEndDate] = useState(null);


  const toggleFilterContent = () => {
    setIsFilterCollapsed(!isFilterCollapsed);
  };


  const handleWeekChange = (weekStart, weekEnd) => {
    const formattedStart = format(weekStart, 'dd/MM/yyyy');
    const formattedEnd = format(weekEnd, 'dd/MM/yyyy');

    setStartDate(formattedStart);
    setEndDate(formattedEnd);
  }

  const handleDateChange = (period) => {
    // Check if period is a Date object or a string
    if (period instanceof Date) {
      setStartDate(period);
    } else {
      setSelectedPeriod(period);
      setDialogOpen(true);
    }

  };


  const handleClose = () => {
    setDialogOpen(false);
  }

  const handleClose1 = () => {
    setDialogOpen1(false);
  }
  const handleClose2 = () => {
    setDialogOpen2(false);
  }

  const handleClose3 = () => {
    setDialogOpen3(false);
  }

  const toggleSearchContent = () => {
    setIsSearchCollapsed(!isSearchCollapsed);
  };

  const toggleOpContent = () => {
    setIsOpCollapsed(!isOpCollapsed);
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


  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/api/Poste')
      .then(response => response.json())
      .then(data => {
        const fetchedPosts = data.posts.map((post, index) => {
          let label = "Poste " + post.poste.substring(1);
          let obj = {
            value: post.poste,
            label: label,
            taux: post.taux / 100
          }
          return obj;
        });
        setPosts(fetchedPosts);
      })
      .catch(error => console.error('Error:', error));
  }, []);


  const [matinPosts, setMatinPosts] = useState([]);
  const [shouldDisplayData, setShouldDisplayData] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/api/Matin')
      .then(response => response.json())
      .then(data => {
        const fetchedPosts = data.posts.map((post, index) => {
          let label = "Poste " + post.poste.substring(1);
          let obj = {
            value: post.poste,
            label: label,
            taux: post.taux / 100
          }
          return obj;
        });
        setMatinPosts(fetchedPosts);
      })
      .catch(error => console.error('Error:', error));
  }, []);


  const handleButtonClick = () => {
    setPosts(matinPosts);
    setShouldDisplayData(true);
  };

  const [SoirPosts, setSoirPosts] = useState([]);
  const [shouldDisplayData1, setShouldDisplayData1] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/api/Soir')
      .then(response => response.json())
      .then(data => {
        const fetchedPosts = data.posts.map((post, index) => {
          let label = "Poste " + post.poste.substring(1);
          let obj = {
            value: post.poste,
            label: label,
            taux: post.taux / 100
          }
          return obj;
        });
        setSoirPosts(fetchedPosts);
      })
      .catch(error => console.error('Error:', error));
  }, []);


  const handleButtonClick1 = () => {
    setPosts(SoirPosts);
    setShouldDisplayData1(true);
  };


  const [NuitPosts, setNuitPosts] = useState([]);
  const [shouldDisplayData2, setShouldDisplayData2] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/api/Nuit')
      .then(response => response.json())
      .then(data => {
        const fetchedPosts = data.posts.map((post, index) => {
          let label = "Poste " + post.poste.substring(1);
          let obj = {
            value: post.poste,
            label: label,
            taux: post.taux / 100
          }
          return obj;
        });
        setNuitPosts(fetchedPosts);
      })
      .catch(error => console.error('Error:', error));
  }, []);


  const handleButtonClick2 = () => {
    setPosts(NuitPosts);
    setShouldDisplayData1(true);
  };

  const [JourPosts, setJourPosts] = useState([]);
  const [shouldDisplayData3, setShouldDisplayData3] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const formattedDate = format(startDate, 'dd/MM/yyyy');

  useEffect(() => {
    // Appending formattedDate to the fetch URL
    fetch(`http://localhost:5000/api/Jour?date=${formattedDate}`)
      .then(response => response.json())
      .then(data => {
        const fetchedPosts = data.posts.map((post, index) => {
          let label = "Poste " + post.poste.substring(1);
          let obj = {
            value: post.poste,
            label: label,
            taux: post.taux / 100
          }
          return obj;
        });
        setJourPosts(fetchedPosts);
        console.log(fetchedPosts)
      })
      .catch(error => console.error('Error:', error));
  }, [startDate]);  // adding startDate as a dependency



  const handleButtonClick3 = () => {
    setPosts(JourPosts);
    setShouldDisplayData3(true);
  };











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
        taux: selectedOption[i].taux
      }
      temp.push(aux)
    }
    setFiltered(temp)
  }


  if (posts[0]) {
    console.log(posts[0].value);
  }


  const handleChangeGroupe = (event, groupe) => {
    let aux = []
    //test if the action was to check or uncheck
    if (event.target.checked) {
      // add the elements with matching Group to the Filtered object
      let leng = Object.keys(posts).length
      for (let o = 0; o < leng; o++) {
        switch (groupe) {
          case "A":
            if (posts[o] && posts[o].value[1] === "0") {
              const objectExists = filtered.some(item => item.poste === posts[o].value && item.tauxTRS === posts[o].taux);
              if (!objectExists) {
                aux.push(posts[o])
              }
            }
            break;
          case "B":
            if (posts[o] && posts[o].value[1] === "1") {
              const objectExists = filtered.some(item => item.poste === posts[o].poste && item.tauxTRS === posts[o].taux);
              if (!objectExists) {
                aux.push(posts[o])
              }
            }
            break;
          case "C":
            if (posts[o] && posts[o].value[1] === "2") {
              const objectExists = filtered.some(item => item.poste === posts[o].poste && item.tauxTRS === posts[o].taux);
              if (!objectExists) {
                aux.push(posts[o])
              }
            }
            break;
          default:
            const objectExists = filtered.some(item => item.poste === posts[o].poste && item.tauxTRS === posts[o].taux);
            if (!objectExists) {
              if (posts[o] && posts[o].value[1] === "3") {
                aux.push(posts[o])
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
            if (aux[k] && aux[k].value[1] === "0") {
              aux.splice(k, 1)
              k--
            }
            k++
            break;
          case "B":
            if (aux[k] && aux[k].value[1] === "1") {
              aux.splice(k, 1)
              k--
            }
            k++
            break;
          case "C":
            if (aux[k] && aux[k].value[1] === "2") {
              aux.splice(k, 1)
              k--
            }
            k++
            break;
          default:
            if (aux[k] && aux[k].value[1] === "3") {
              aux.splice(k, 1)
              k--
            }
            k++
        }

      }
      setFiltered(aux)
    }
  };



  const handleDialogOpen1 = (period) => {
    setSelectedPeriod(period);
    setDialogOpen1(true);
  }

  const handleDialogOpen2 = (period) => {
    setSelectedPeriod(period);
    setDialogOpen2(true);
  }
  const handleDialogOpen3 = (period) => {
    setSelectedPeriod(period);
    setDialogOpen3(true);
  }



  const [isOpen, setIsOpen] = useState(true);



  const formatter = (value) => `${value * 100}%`;

  console.log(formattedDate);
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="Poste"><span style={{ color: 'white' }}>{`Poste:${payload[0].payload.poste}`}</span></p>
          <p className="Taux"><span style={{ color: 'white' }}>{`Taux: ${(Number(payload[0].payload.taux) * 100).toFixed(1)}%`}</span></p>
        </div>
      );
    }



    return null;
  };



  return (
    <>
      <br />

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
                    data={Object.keys(filtered).length === 0 ? posts : filtered}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="value" />
                    <YAxis dataKey="taux" tickFormatter={formatter} domain={[0.805, 0.815]} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="taux" name="Taux de rendement synthétique" fill="#1F69EF" />
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

                  <div className="choice" onClick={() => handleDialogOpen1('seance')}>Séance</div>
                  <div className="choice" onClick={() => handleDialogOpen2('day')}>Jour</div>
                  <div className="choice" onClick={() => handleDialogOpen3('week')}>Semaine</div>
                  <div className="choice" onClick={() => handleDialogOpen2('month')}>Mois</div>
                  <div className="choice" onClick={() => handleDialogOpen2('quarter')}>Trimestre</div>


                </div>

                <Dialog onClose={handleClose1} open={dialogOpen1} PaperProps={{ style: { width: '18%', height: '23%' } }}>
                  <DialogTitle>Choisissez une séance</DialogTitle>
                  <DialogContent>
                    {selectedPeriod === 'seance' && (
                      <>
                        <Button onClick={handleButtonClick}>Matin</Button>
                        <Button onClick={handleButtonClick1}>Soir</Button>
                        <Button onClick={handleButtonClick2}>Nuit</Button>
                      </>
                    )}
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose1}>Close</Button>
                  </DialogActions>
                </Dialog>

                <Dialog onClose={handleClose2} open={dialogOpen2} PaperProps={{ style: { width: '22%', height: '55%' } }}>
                  <DialogTitle>Choisissez un jour</DialogTitle>
                  <DialogContent>
                    {selectedPeriod !== 'seance' && (
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => { handleButtonClick3(); handleDateChange(date); }}
                        open={isOpen}
                        onInputClick={() => setIsOpen(!isOpen)}
                        calendarClassName="custom-datepicker"
                        dateFormat="dd/MM/yyyy"
                      />
                    )}
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose2}>Close</Button>
                  </DialogActions>
                </Dialog>

                <Dialog onClose={handleClose3} open={dialogOpen3} PaperProps={{ style: { width: '22%', height: '55%' } }}>
                  <DialogTitle>Choisissez une semaine</DialogTitle>
                  <DialogContent>
                    {selectedPeriod !== 'seance' && selectedPeriod !== 'day' && (
                      <DatePicker
                      selected={startDate}
                      onChange={(date) => { handleButtonClick3(); handleDateChange(date); }}
                        open={isOpen}
                        onInputClick={() => setIsOpen(!isOpen)}
                        calendarClassName="custom-datepicker"
                        dateFormat="dd/MM/yyyy"
                        showMonthYearPicker={selectedPeriod === 'month'}
                        showWeekNumbers={selectedPeriod === 'week'}
                        monthsShown={selectedPeriod === 'quarter' ? 3 : 1}
                      />
                    )}
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose3}>Close</Button>
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
            <div className="collapsible-box1">
              <div className="header-chart" onClick={toggleOpContent}>
                Opération
                <IconButton onClick={toggleOpContent}>
                  {isOpCollapsed ? <ExpandMore /> : <ExpandLess />}
                </IconButton>
              </div>
              <div className={`content ${isOpCollapsed ? '' : 'show-content'}`}>
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
                  /></div></div></div>
          </div>
        </div>


      </div>

    </>
  )
}

export default Charte