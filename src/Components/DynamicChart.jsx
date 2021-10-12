import React,{useState,useEffect} from "react";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";

const GroupedBar = () => {
  const defectTypeAndCount = useSelector((state) => state.dataset.typeA);
  const selectedfilterValues = useSelector((state) => state.filter)
  
  const selFilterValues = [];
  for (const [key,value] of Object.entries(selectedfilterValues)){
    if(value==="on"){
      selFilterValues.push(key)
    }
  }
  const [label, setlabel] = useState([]);
  const [piecount, setPieCount] = useState([]);
  const [cDatae, setCDatae] = useState({});

const dyData=()=>{

  const lble = [];
  const dta = [];
  const l = defectTypeAndCount.map((ele) => {
    if(selFilterValues.includes(ele.Defecttype)){
      dta.push(ele.count);
      lble.push(ele.Defecttype);
      setlabel((prev)=>[...prev,lble])
      setPieCount(dta);
      console.log(ele.Defecttype)
    }
  });
  const data = {
    labels: label,
    datasets: "",
  };
}
  
  
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  useEffect(()=>{
    dyData()
  },[])
  
  return(
  <>
    <Bar data={data} options={options} />
  </>
)}

export default GroupedBar;
