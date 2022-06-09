import { useContext,useState } from "react";
import { DataContext } from "../contexts/DataContext";
import { NavBar } from "./NavBar";
import Table from "./Table";
import DoughnutChart from "./Graphs/DoughnutChart";
import "../styles/Graph.css"
import { Navigate } from "react-router";


function extractDurationTime(data) {
  let durationTimeData = data.items.map(item => {
    if(item.finished){
      return {
        url: item.url,
        data: item.endTime-item.startTime
      }
    }
    return {}
  }).filter(value => Object.keys(value).length !== 0);
  return durationTimeData;
}


function generateGraph(data){
  const details = data.details;
  const durationTimeData=extractDurationTime(details);
  return <DoughnutChart data={durationTimeData} title={"Durartion of Network Requests"} />
}



export default function NetworkRequests() {
  const dataContext = useContext(DataContext);
  const [graph,setGraph]=useState();
  let data = dataContext.data.data;
  data = data['network-requests'];

  const passData=(data)=>{
    setGraph(data);
  }

  return (
    <>
    {!data && (<Navigate to="/" />)}
    {data && (
      <div>
      <NavBar />
      <h1 style={{ textAlign: "center" }}>Network Requests</h1>
      <h5 style={{ textAlign: "center" }}>Network Requests Made by Main-Thread</h5>
      <div className="table-container">
        <Table id={'network-requests'} headings={data.details.headings} items={data.details.items} passData={passData} />
      </div>
      <div className="graph-container">
          {graph &&(generateGraph(data))}
        </div>
    </div>
    )}
    </>
    
  )
}
