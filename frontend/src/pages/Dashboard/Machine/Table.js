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
import { Chart, PieController, ArcElement, CategoryScale, Legend, Tooltip } from 'chart.js';

Chart.register(PieController, ArcElement, CategoryScale, Legend, Tooltip);



registerLocale('fr', fr);
setDefaultLocale('fr');


function Table() {

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [isFilterCollapsed, setIsFilterCollapsed] = useState(true);
  const [isSearchCollapsed, setIsSearchCollapsed] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);


  const toggleFilterContent = () => {
    setIsFilterCollapsed(!isFilterCollapsed);
  };


  const [avgTu, setAvgTu] = useState(904.036);
  const [avgTa, setAvgTa] = useState(248.068);
  const myPieChartRef = useRef(null);
  const chartRef = useRef(null);



  const [posts, setPosts] = useState([]);




  const [selectedImageUrl, setSelectedImageUrl] = useState(null);

  useEffect(() => {
    fetch(baseUrl + 'getTables')
      .then((response) => response.json())
      .then((data) => {
        setPosts(data.data);
        if (data.data.length > 0 && data.data[0].Image) {
          const base64Image = btoa(
            new Uint8Array(data.data[0].Image.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ''
            )
          );
          const imageUrl = 'data:image/jpeg;base64,' + base64Image;
          setSelectedImageUrl(imageUrl);
        }
      })
      .catch((error) => console.error(error));
  }, []);


  const renderEtat = (etat) => {
    switch (etat) {
      case 'Arrêt':
        return <div style={{ backgroundColor: '#ec101091', color: '#C41313', borderRadius: '5px', width: '85px', height: '24px', textAlign: 'center', fontSize:'14px' }}>Arrêt</div>;
      case 'Production':
        return <div style={{ backgroundColor: '#5db82191', color: '#3B671D', borderRadius: '5px', width: '85px', height: '24px', textAlign: 'center', fontSize:'14px' }}>Production</div>;
      case 'Attente':
        return <div style={{ backgroundColor: '#f0ab259e', color: '#9F721C', borderRadius: '5px', width: '85px',height: '24px', textAlign: 'center', fontSize:'14px' }}>Attente</div>;
      default:
        return null;
    }
  }

  const handlePostSelection = (post) => {
    setSelectedPost(post);
    // Convert the binary image data to a Base64 encoded string
    const base64Image = btoa(
      new Uint8Array(post.Image.data).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ''
      )
    );

    // Create a data URL for the image
    const imageUrl = 'data:image/jpeg;base64,' + base64Image;
    setSelectedImageUrl(imageUrl);
    console.log(imageUrl);

    const fetchPostData = async () => {
      try {
        const responseTu = await fetch(baseUrl + `getTu?poste=${post['Code Poste']}`);
        const dataTu = await responseTu.json();
        setAvgTu(dataTu.data);
      } catch (error) {
        console.error(error);
      }

      try {
        const responseTa = await fetch(baseUrl + `getTa?poste=${post['Code Poste']}`);
        const dataTa = await responseTa.json();
        setAvgTa(dataTa.data);
      } catch (error) {
        console.error(error);
      }
    };

    // Call the async function
    fetchPostData();
  };


  // Effect to initialize the chart
  useEffect(() => {
    if (myPieChartRef.current) {
      const ctx = myPieChartRef.current.getContext('2d');
      if (ctx) {
        // Create a new chart instance
        chartRef.current = new Chart(ctx, {
          type: 'doughnut',
          data: {
            datasets: [{
              data: [avgTu, avgTa],
              backgroundColor: ['#5EA131', '#1F69EF69']
            }],
            labels: ['Taux de production  (%) ', 'Taux d’arrêt  (%) ']
          }
        });
      }
    }
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []); // Empty dependency array ensures this runs only on mount and unmount

  // Effect to update chart data when avgTu or avgTa change
  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.data.datasets[0].data = [avgTu, avgTa];
      chartRef.current.update();
    }
  }, [avgTu, avgTa]);








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





  return (
    <>   <br />

      <div className="parent-container">
        <div className="collapsible-tauxT">
          <div className="header-chart1">
            <span>Code Poste</span>
            <span>Désignation Poste</span>
            <span>Etat</span>
          </div>
          <div className="collapsible-container">
            {posts.map((post, index) => (
              <div
                className={`collapsible-table ${selectedPost === post ? 'selected-post' : ''}`}
                key={index}
                onClick={() => handlePostSelection(post)}
              >
                <div className="header-data">
                  <span>{post['Code Poste']}</span>
                  <span>{post['Designation Poste'].replace(/\r/g, '')}</span>
                  <span>{renderEtat(post.Etat)}</span>
                </div>
              </div>
            ))}
          </div>


        </div>


        <div className="container1">
          <div className="filter-component1">
            <div className="header-chart">
              <span>Code Poste</span>
              <span>{selectedPost ? selectedPost['Code Poste'] : 'P214'}</span>
            </div>
            <div className="header-chartP">
              <span>Désignation Poste</span>
              <div style={{ fontSize: '17px', textAlign: 'end' }}>
                {selectedPost ? selectedPost['Designation Poste'].replace(/\r/g, '') : 'Ebavureuse - Mat:01050117'}
              </div>
            </div>
            <br />
            <div className="KTA">
              <div className="parent-container1">
                <div className="pie-chart-container">
                  <canvas ref={myPieChartRef}></canvas>
                </div>
                <div className="image-container">
                  <img src={selectedImageUrl} alt={selectedImageUrl} />
                </div>
              </div>
            </div>

          </div>
        </div>




      </div>



    </>
  )
}

export default Table