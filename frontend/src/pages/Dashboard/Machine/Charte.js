import Dialog from '@mui/material/Dialog';
import { AreaChart, Area } from 'recharts';
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
import ChartsTaux from '../Machine/CardTaux'


registerLocale('fr', fr);
setDefaultLocale('fr');



function Charte() {

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogOpen1, setDialogOpen1] = useState(false);
  const [dialogOpen2, setDialogOpen2] = useState(false);
  const [dialogOpen3, setDialogOpen3] = useState(false);
  const [dialogOpen4, setDialogOpen4] = useState(false);
  const [dialogOpen5, setDialogOpen5] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [isFilterCollapsed, setIsFilterCollapsed] = useState(true);
  const [isSearchCollapsed, setIsSearchCollapsed] = useState(true);
  const [isOpCollapsed, setIsOpCollapsed] = useState(true);
  const [endDate, setEndDate] = useState(null);

  // inside your component
  const [selectedPeriod1, setSelectedPeriod1] = useState('quarter');
  const [year, setYear] = useState(2023);
  const [yearError, setYearError] = useState('');

  // Handler for year input
  const handleYearChange = (event) => {
    const newYear = event.target.value;

    // Check if the input is a valid year
    if (newYear >= 1900 && newYear <= new Date().getFullYear()) {
      setYearError('');  // Clear any previous error
      setYear(newYear);
    } else {
      setYearError('Veuillez introduire une année valide');
    }
  }


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

  const numberToMonth = (num) => {
    const months = {
      1: 'Janvier',
      2: 'Février',
      3: 'Mars',
      4: 'Avril',
      5: 'Mai',
      6: 'Juin',
      7: 'Juillet',
      8: 'Août',
      9: 'Septembre',
      10: 'Octobre',
      11: 'Novembre',
      12: 'Décembre'
    };
    return months[num];
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

  const handleClose4 = () => {
    setDialogOpen4(false);
  }

  const handleClose5 = () => {
    setDialogOpen5(false);
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

  const [operations, setOperations] = useState([]);
  const [selectedOperation, setSelectedOperation] = useState(null);
  const [shouldDisplayData10, setShouldDisplayData10] = useState(false);
  const [fetchedOperations, setFetchedOperations] = useState([]);
  // Fetch operations
  useEffect(() => {
    fetch('http://localhost:5000/api/Operation')
      .then(response => response.json())
      .then(data => {
        const fetchedOperations = data.map((operation) => ({
          value: operation,
          label: operation,
        }));
        setOperations(fetchedOperations);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  useEffect(() => {
    if (selectedOperation) {
      fetch(`http://localhost:5000/api/OP?designationOperation=${selectedOperation.value}`)
        .then(response => response.json())
        .then(data => {
          const posts = data.posts.map((post) => ({
            value: post.poste,
            label: "Poste " + post.poste.substring(1),
            taux: parseFloat(post.taux).toFixed(2)/100,
          }));
          setFiltered(posts);
        })
        .catch(error => console.error('Error:', error));
    }
  }, [selectedOperation]);
  
  
  

  const handleChangeSelect1 = selectedOption => {
    // If selectedOption is not an array, wrap it in an array
    const optionsArray = Array.isArray(selectedOption) ? selectedOption : [selectedOption];
  
    const transformedOptions = optionsArray.map(option => ({
      poste: option.value,
      label: option.label,
      avgTRS: option.avgTRS, // Note: avgTRS might not be available in the object
    }));
  
    setFiltered(transformedOptions);
    setSelectedOperation(optionsArray[0]); // If you want to select the first option
  };
  
  



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
  const formattedDate1 = format(startDate, 'M');
  const formattedDate2 = format(startDate, 'yyyy');
  
  const handleButtonClick3 = () => {
    console.log(formattedDate)
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
          console.log(obj)
        });
        setJourPosts(fetchedPosts);
        setPosts(fetchedPosts);  
        setShouldDisplayData3(true); 
        console.log(fetchedPosts)
      })
      .catch(error => console.error('Error:', error));
    };




  const [SemainePosts, setSemainePosts] = useState([]);
  const [shouldDisplayData9, setShouldDisplayData9] = useState(false);

  const handleButtonClick9 = () => {
    fetch(`http://localhost:5000/api/Semaine?date=${formattedDate}`)
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
        setSemainePosts(fetchedPosts);
        setPosts(fetchedPosts);  
        setShouldDisplayData9(true); 
        console.log(fetchedPosts)
      })
      .catch(error => console.error('Error:', error));
    };


  

  const [MoisPosts, setMoisPosts] = useState([]);
  const [shouldDisplayData4, setShouldDisplayData4] = useState(false);

  const handleButtonClick4 = () => {
    console.log(formattedDate1)
    console.log(formattedDate2)
    fetch(`http://localhost:5000/api/Mois?date=${formattedDate1}&annee=${formattedDate2}`)
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
        setMoisPosts(fetchedPosts);
        setPosts(fetchedPosts);  
        setShouldDisplayData4(true); 
        console.log(fetchedPosts)
      })
      .catch(error => console.error('Error:', error));
  };

  const [Tri1Posts, setTri1Posts] = useState([]);
  const [shouldDisplayData5, setShouldDisplayData5] = useState(false);

  useEffect(() => {
    // Appending formattedDate to the fetch URL
    console.log(year)
    fetch(`http://localhost:5000/api/getTrimestre1?annee=${year}`)
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
        setTri1Posts(fetchedPosts);
        console.log(fetchedPosts)
      })
      .catch(error => console.error('Error:', error));
  }, [year]);


  const handleButtonClick5 = () => {
    setPosts(Tri1Posts);
    setShouldDisplayData5(true);
  };

  const [Tri2Posts, setTri2Posts] = useState([]);
  const [shouldDisplayData6, setShouldDisplayData6] = useState(false);

  useEffect(() => {
    // Appending formattedDate to the fetch URL
    fetch(`http://localhost:5000/api/getTrimestre2?annee=${year}`)
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
        setTri2Posts(fetchedPosts);
        console.log(fetchedPosts)
      })
      .catch(error => console.error('Error:', error));
  }, [year]);


  const handleButtonClick6 = () => {
    setPosts(Tri2Posts);
    setShouldDisplayData6(true);
  };

  const [Tri3Posts, setTri3Posts] = useState([]);
  const [shouldDisplayData7, setShouldDisplayData7] = useState(false);

  useEffect(() => {
    // Appending formattedDate to the fetch URL
    fetch(`http://localhost:5000/api/getTrimestre3?annee=${year}`)
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
        setTri3Posts(fetchedPosts);
        console.log(fetchedPosts)
      })
      .catch(error => console.error('Error:', error));
  }, [year]);


  const handleButtonClick7 = () => {
    setPosts(Tri3Posts);
    setShouldDisplayData7(true);
  };

  const [Tri4Posts, setTri4Posts] = useState([]);
  const [shouldDisplayData8, setShouldDisplayData8] = useState(false);

  useEffect(() => {
    // Appending formattedDate to the fetch URL
    fetch(`http://localhost:5000/api/getTrimestre4?annee=${year}`)
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
        setTri4Posts(fetchedPosts);
        console.log(fetchedPosts)
      })
      .catch(error => console.error('Error:', error));
  }, [year]);


  const handleButtonClick8 = () => {
    setPosts(Tri4Posts);
    setShouldDisplayData8(true);
  };




  const [selectedOptionState, setSelectedOptionState] = useState(null);
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
    setSelectedOptionState(selectedOption[0]);
    console.log(selectedOption[0])

  }





  // Define a new state for fetched data
  const [fetchedData, setFetchedData] = useState([]);

  useEffect(() => {
    if (selectedOptionState) {
      const fetchData = async () => {
        try {
          console.log('Fetching data with ID', selectedOptionState.value);
          const response = await fetch(`http://localhost:5000/api/getTp?id=${selectedOptionState.value}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const responseJson = await response.json();
          console.log('Response:', responseJson);

          if (!responseJson.data) {
            throw new Error('Data is undefined');
          }

          const fetchedPosts = responseJson.data.map((post, index) => {
            return {
              poste: post["Nom périodicité"],
              tauxProductivite: post["Taux Performance"] / 100
            };
          });


          setFetchedData(fetchedPosts);
          console.log('Fetched posts:', fetchedPosts);
        } catch (error) {
          console.error('Error:', error);
        }
      };
      fetchData();
    }
  }, [selectedOptionState]);

  // Define a new state for fetched data
  const [fetchedData1, setFetchedData1] = useState([]);

  useEffect(() => {
    if (selectedOptionState) {
      const fetchData = async () => {
        try {
          console.log('Fetching data with ID', selectedOptionState.value);
          const response = await fetch(`http://localhost:5000/api/getTq?id=${selectedOptionState.value}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const responseJson = await response.json();
          console.log('Response:', responseJson);

          if (!responseJson.data) {
            throw new Error('Data is undefined');
          }

          const fetchedPosts = responseJson.data.map((post, index) => {
            return {
              poste: post["Nom périodicité"],
              tauxProductivite: post["Taux Qualité"] / 100
            };
          });


          setFetchedData1(fetchedPosts);
          console.log('Fetched posts:', fetchedPosts);
        } catch (error) {
          console.error('Error:', error);
        }
      };
      fetchData();
    }
  }, [selectedOptionState]);


  // Define a new state for fetched data
  const [fetchedData2, setFetchedData2] = useState([]);

  useEffect(() => {
    if (selectedOptionState) {
      const fetchData = async () => {
        try {
          console.log('Fetching data with ID', selectedOptionState.value);
          const response = await fetch(`http://localhost:5000/api/getTrg?id=${selectedOptionState.value}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const responseJson = await response.json();
          console.log('Response:', responseJson);

          if (!responseJson.data) {
            throw new Error('Data is undefined');
          }

          const fetchedPosts = responseJson.data.map((post, index) => {
            return {
              poste: post["Nom périodicité"],
              tauxProductivite: post["trg"] / 100
            };
          });


          setFetchedData2(fetchedPosts);
          console.log('Fetched posts:', fetchedPosts);
        } catch (error) {
          console.error('Error:', error);
        }
      };
      fetchData();
    }
  }, [selectedOptionState]);


  // Define a new state for fetched data
  const [fetchedData3, setFetchedData3] = useState([]);

  useEffect(() => {
    if (selectedOptionState) {
      const fetchData = async () => {
        try {
          console.log('Fetching data with ID', selectedOptionState.value);
          const response = await fetch(`http://localhost:5000/api/getTre?id=${selectedOptionState.value}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const responseJson = await response.json();
          console.log('Response:', responseJson);

          if (!responseJson.data) {
            throw new Error('Data is undefined');
          }

          const fetchedPosts = responseJson.data.map((post, index) => {
            return {
              poste: post["Nom périodicité"],
              tauxProductivite: post["tre"] / 100
            };
          });
          setFetchedData3(fetchedPosts);
          console.log('Fetched posts:', fetchedPosts);
        } catch (error) {
          console.error('Error:', error);
        }
      };
      fetchData();
    }
  }, [selectedOptionState]);


  const [Tp1, setTp1] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/getTp1')
      .then(response => response.json())
      .then(data => {
        const fetchedPosts = data.data.map((post, index) => {
          return {
            poste: post["Nom périodicité"],
            tauxProductivite: post["Taux Performance"] / 100
          };
        });
        setTp1(fetchedPosts);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  const [Tq1, setTq1] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/getTq1')
      .then(response => response.json())
      .then(data => {
        const fetchedPosts = data.data.map((post, index) => {
          return {
            poste: post["Nom périodicité"],
            tauxProductivite: post["Taux Qualité"] / 100
          };
        });
        setTq1(fetchedPosts);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  const [Trg, setTrg] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/getTrg1')
      .then(response => response.json())
      .then(data => {
        const fetchedPosts = data.data.map((post, index) => {
          return {
            poste: post["Nom périodicité"],
            tauxProductivite: post["trg"] / 100
          };
        });
        setTrg(fetchedPosts);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  const [Tre, setTre] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/getTre1')
      .then(response => response.json())
      .then(data => {
        const fetchedPosts = data.data.map((post, index) => {
          return {
            poste: post["Nom périodicité"],
            tauxProductivite: post["tre"] / 100
          };
        });
        setTre(fetchedPosts);
      })
      .catch(error => console.error('Error:', error));
  }, []);




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

  const handleDialogOpen4 = (period) => {
    setSelectedPeriod(period);
    setDialogOpen4(true);
  }
  const handleDialogOpen5 = (period) => {
    setSelectedPeriod(period);
    setDialogOpen5(true);
  }



  const [isOpen, setIsOpen] = useState(true);



  const formatter = (value) => `${value * 100}%`;


  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="Poste"><span style={{ color: 'white' }}>{`Poste: ${payload[0].payload.value}`}</span></p>
          <p className="Taux"><span style={{ color: 'white' }}>{`Taux: ${(Number(payload[0].payload.taux) * 100).toFixed(2)}%`}</span></p>
        </div>
      );
    }



    return null;
  };

  const CustomTooltip1 = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip1">
          <p className="Poste">
            <span style={{ color: 'white' }}>
              {`Mois: ${numberToMonth(payload[0].payload.poste)}`}
            </span>
          </p>
          <p className="Taux"><span style={{ color: 'white' }}>{`Taux: ${(Number(payload[0].payload.tauxProductivite) * 100).toFixed(2)}%`}</span></p>
        </div>
      );
    }



    return null;
  };

  const CustomTooltip2 = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip2">
          <p className="Poste">
            <span style={{ color: 'white' }}>
              {`Mois: ${numberToMonth(payload[0].payload.poste)}`}
            </span>
          </p>
          <p className="Taux"><span style={{ color: 'white' }}>{`Taux: ${(Number(payload[0].payload.tauxProductivite) * 100).toFixed(2)}%`}</span></p>
        </div>
      );
    }



    return null;
  };

  const CustomTooltip3 = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip3">
          <p className="Poste">
            <span style={{ color: 'white' }}>
              {`Mois: ${numberToMonth(payload[0].payload.poste)}`}
            </span>
          </p>
          <p className="Taux"><span style={{ color: 'white' }}>{`Taux: ${(Number(payload[0].payload.tauxProductivite) * 100).toFixed(2)}%`}</span></p>
        </div>
      );
    }



    return null;
  };

  const CustomTooltip4 = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip4">
          <p className="Poste">
            <span style={{ color: 'white' }}>
              {`Mois: ${numberToMonth(payload[0].payload.poste)}`}
            </span>
          </p>
          <p className="Taux"><span style={{ color: 'white' }}>{`Taux: ${(Number(payload[0].payload.tauxProductivite) * 100).toFixed(2)}%`}</span></p>
        </div>
      );
    }



    return null;
  };





  return (
    <>

      

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
                    <YAxis dataKey="taux" tickFormatter={formatter} domain={[0.805, 0.815]} tick={props => (
                      <text {...props} fontSize={16} fontFamily='Arial'>
                        {props.payload.value}
                      </text>
                    )} />
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
          <div className="filterBy">Filtrer par</div>
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
                  <div className="choice" onClick={() => handleDialogOpen4('month')}>Mois</div>
                  <div className="choice" onClick={() => handleDialogOpen5('quarter')}>Trimestre</div>


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

                <Dialog onClose={handleClose2} open={dialogOpen2} PaperProps={{ style: { width: '22%', height: '57%' } }}>
                  <DialogTitle>Choisissez un jour</DialogTitle>
                  <DialogContent>
                    {selectedPeriod === 'day' && (
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => { handleDateChange(date); handleButtonClick3();  }}
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

                <Dialog onClose={handleClose3} open={dialogOpen3} PaperProps={{ style: { width: '22%', height: '60%' } }}>
                  <DialogTitle>Choisissez une semaine</DialogTitle>
                  <DialogContent>
                    {selectedPeriod === 'week' && (
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => { handleButtonClick9(); handleDateChange(date); }}
                        open={isOpen}
                        onInputClick={() => setIsOpen(!isOpen)}
                        calendarClassName="custom-datepicker"
                        dateFormat="dd/MM/yyyy"
                        showWeekNumbers={selectedPeriod === 'week'}
                        filterDate={(date) => date.getDay() === 1}
                      />
                    )}
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose3}>Close</Button>
                  </DialogActions>
                </Dialog>

                <Dialog onClose={handleClose4} open={dialogOpen4} PaperProps={{ style: { width: '20%', height: '44%' } }}>
                  <DialogTitle>Choisissez un mois</DialogTitle>
                  <DialogContent>
                    {selectedPeriod === 'month' && (
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => { handleButtonClick4(); handleDateChange(date); }}
                        open={isOpen}
                        onInputClick={() => setIsOpen(!isOpen)}
                        calendarClassName="custom-datepicker"
                        dateFormat="MM/yyyy"
                        showMonthYearPicker={selectedPeriod === 'month'}

                      />
                    )}
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose4}>Close</Button>
                  </DialogActions>
                </Dialog>
                <Dialog onClose={handleClose5} open={dialogOpen5} PaperProps={{ style: { width: '18%', height: '54%' } }}>
                  <DialogTitle>Choisissez un trimestre</DialogTitle>
                  <DialogContent>
                    {selectedPeriod === 'quarter' && (
                      <>
                        <Button onClick={handleButtonClick5}>Janvier-Mars</Button>
                        <br />
                        <Button onClick={handleButtonClick6}>Avril-Juin</Button>
                        <Button onClick={handleButtonClick7}>Juillet-Septembre</Button>
                        <Button onClick={handleButtonClick8}>Octobre-Decembre</Button>
                        <div style={{ marginTop: '20px' }}>
                          <input
                            type="number"
                            value={year}
                            onChange={handleYearChange}
                            placeholder="Enter a year"
                          />
                          {yearError && <p>{yearError}</p>}
                        </div>
                      </>
                    )}
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose5}>Close</Button>
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
              <div className={`content ${isSearchCollapsed ? '' : 'show-content'}`} >
                <div className='selectcont' >
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
                <div className="checkcontainer" >
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
                    options={operations}
                    onChange={handleChangeSelect1}
                  />
                  </div></div></div>
          </div>
        </div>


      </div>

      <div className="grid-container">
        <div className="item">
          <div className="collapsible-boxtaux cbtd">
            <div className="headertaux ctd" >
              Taux de performance
            </div>
            <div className='show-content'>
              <div className='row'>
                <div className="parenttrs">
                  <div className='insidetaux' >
                    <ResponsiveContainer width={'100%'} height={'99%'}>
                      <AreaChart
                        width={750}
                        height={250}
                        data={Object.keys(fetchedData).length === 0 ? Tp1 : fetchedData}
                        margin={{
                          top: 20,
                          right: 0,
                          left: 0,
                          bottom: 0,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="poste" />
                        <YAxis tickFormatter={formatter} domain={[0.92, 0.96]} tick={props => (
                          <text {...props} fontSize={16} fontFamily='Arial'>
                            {props.payload.value}
                          </text>
                        )} />
                        <Tooltip content={<CustomTooltip1 />} />
                        <Area type="monotone" dataKey="tauxProductivite" stroke="#1F69EF" fill="#1F69EF" />
                      </AreaChart>

                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="item">
          <div className="collapsible-boxtaux cbtd1">
            <div className="headertaux ctd1" >
              Taux de qualité
            </div>
            <div className='show-content'>
              <div className='row'>
                <div className="parenttrs">
                  <div className='insidetaux' >
                    <ResponsiveContainer width={'100%'} height={'99%'}>
                      <AreaChart
                        width={750}
                        height={250}
                        data={Object.keys(fetchedData1).length === 0 ? Tq1 : fetchedData1}
                        margin={{
                          top: 20,
                          right: 0,
                          left: 0,
                          bottom: 0,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="poste" />
                        <YAxis tickFormatter={formatter} domain={[0.92, 0.96]} tick={props => (
                          <text {...props} fontSize={16} fontFamily='Arial'>
                            {props.payload.value}
                          </text>
                        )} />
                        <Tooltip content={<CustomTooltip2 />} />
                        <Area type="monotone" dataKey="tauxProductivite" stroke="#3367A8" fill="#3367A8" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </div></div>
        <div className="item">
          <div className="collapsible-boxtaux cbtd2">
            <div className="headertaux ctd2" >
              Taux de rendement globale
            </div>
            <div className='show-content'>
              <div className='row'>
                <div className="parenttrs">
                  <div className='insidetaux' >
                    <ResponsiveContainer width={'100%'} height={'99%'}>
                      <AreaChart
                        width={750}
                        height={250}
                        data={Object.keys(fetchedData2).length === 0 ? Trg : fetchedData2}
                        margin={{
                          top: 20,
                          right: 0,
                          left: 0,
                          bottom: 0,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="poste" />
                        <YAxis tickFormatter={formatter} domain={[0.62, 0.7]} tick={props => (
                          <text {...props} fontSize={16} fontFamily='Arial'>
                            {props.payload.value}
                          </text>
                        )} />
                        <Tooltip content={<CustomTooltip3 />} />
                        <Area type="monotone" dataKey="tauxProductivite" stroke="#C18A20" fill="#C18A20" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="item">
          <div className="collapsible-boxtaux cbtd3">
            <div className="headertaux ctd3" >
              Taux de rendement économique
            </div>
            <div className='show-content'>
              <div className='row'>
                <div className="parenttrs">
                  <div className='insidetaux' >
                    <ResponsiveContainer width={'100%'} height={'99%'}>
                      <AreaChart
                        width={750}
                        height={250}
                        data={Object.keys(fetchedData3).length === 0 ? Tre : fetchedData3}
                        margin={{
                          top: 20,
                          right: 0,
                          left: 0,
                          bottom: 0,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="poste" />
                        <YAxis tickFormatter={formatter} domain={[0.52, 0.6]} tick={props => (
                          <text {...props} fontSize={16} fontFamily='Arial'>
                            {props.payload.value}
                          </text>
                        )} />
                        <Tooltip content={<CustomTooltip4 />} />
                        <Area type="monotone" dataKey="tauxProductivite" stroke="#5EA131" fill="#5EA131" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Charte