import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";

const PieChart = () => {
  const defectTypeAndCount = useSelector((state) => state.dataset.typeA);
  const [currentData, setCurrentDate] = useState(defectTypeAndCount);
  const [label, setlabel] = useState([]);
  const [piecount, setPieCount] = useState([]);
  const [pieDatae, setPieDatae] = useState({});

  const relo = () => {
    const lble = [];
    const dta = [];
    const l = defectTypeAndCount.map((ele) => {
      lble.push(ele.Defecttype);
      dta.push(ele.count);
      setlabel(lble);
      setPieCount(dta);
    });

    setPieDatae({
      labels: label,
      datasets: [
        {
          label: "Defect Types And Count",
          data: dta,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 19, 34, 0.1)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    });
  };
  useEffect(() => {
    relo();
  }, []);

  return (
    <>
      <Pie data={pieDatae} />
    </>
  );
};
export default PieChart;
