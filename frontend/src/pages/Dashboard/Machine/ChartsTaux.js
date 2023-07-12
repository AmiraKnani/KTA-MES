import { AreaChart,Area,BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../../../css/ChartsTaux.css'
function ChartsTaux(props) {

    var m=props.data.data
    const formatter = (value) => `${value*100}%`;
    const CustomTooltip = ({ active, payload, label }) => {
      if (active && payload && payload.length) {
        return (
          <div className="custom-tooltip">
            <p className="Poste">{`Poste:${payload[0].payload.poste}`}</p>
            <p className="Taux">{`Taux: ${(Number(payload[0].payload.tauxProductivite)*100).toFixed(1)}%`}</p>
          </div>
        );
      }
    
      return null;
    };
return(

<><div className="grid-container">
  <div className="item">
  <div className="collapsible-boxtaux cbtd">
    <div className="headertaux ctd" >
    Taux de disponibitlié
        </div>
    <div className='show-content'>
      <div className='row'>
      <div className="parenttrs">
        <div className='insidetaux' >
        <ResponsiveContainer width={'100%'} height={'99%'}>
           <AreaChart
          width={750}
          height={250}
          data={m}
          margin={{
            top: 20,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="poste" />
          <YAxis  tickFormatter={formatter}/>
          <Tooltip content={<CustomTooltip />}/>
          <Area type="monotone" dataKey="tauxProductivite" stroke="#19ACA3" fill="#19ACA3" />
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
    Production
        </div>
    <div className='show-content'>
      <div className='row'>
      <div className="parenttrs">
        <div className='insidetaux' >
        <ResponsiveContainer width={'100%'} height={'99%'}>
           <AreaChart
          width={750}
          height={250}
          data={m}
          margin={{
            top: 20,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="poste" />
          <YAxis  tickFormatter={formatter}/>
          <Tooltip content={<CustomTooltip />}/>
          <Area type="monotone" dataKey="tauxProductivite" stroke="#8ADEAC" fill="#8ADEAC" />
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
    Attente matiére
        </div>
    <div className='show-content'>
      <div className='row'>
      <div className="parenttrs">
        <div className='insidetaux' >
        <ResponsiveContainer width={'100%'} height={'99%'}>
           <AreaChart
          width={750}
          height={250}
          data={m}
          margin={{
            top: 20,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="poste" />
          <YAxis  tickFormatter={formatter}/>
          <Tooltip content={<CustomTooltip />}/>
          <Area type="monotone" dataKey="tauxProductivite" stroke="#9E4FFF" fill="#9E4FFF" />
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
    <div className="headertaux ctd" >
    Service
        </div>
    <div className='show-content'>
      <div className='row'>
      <div className="parenttrs">
        <div className='insidetaux' >
        <ResponsiveContainer width={'100%'} height={'99%'}>
           <AreaChart
          width={750}
          height={250}
          data={m}
          margin={{
            top: 20,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="poste" />
          <YAxis  tickFormatter={formatter}/>
          <Tooltip content={<CustomTooltip />}/>
          <Area type="monotone" dataKey="tauxProductivite" stroke="#41C3DF" fill="#41C3DF" />
        </AreaChart>
        </ResponsiveContainer>
        </div>
      </div> 
      </div>
    </div>
  </div>
  </div>
</div></>



    )
}
export default ChartsTaux;
