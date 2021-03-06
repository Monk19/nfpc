import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DynamicChart from "../DynamicChart";
import { Bar, Pie } from "react-chartjs-2";
import PieChart from "../PieChart";
import LineChart from "../LineChart";
import DefectLogTables from "../DefectLogTables";
import axios from "axios";
import {
  FormGroup,
  Checkbox,
  Paper,
  FormControlLabel,
  Button,
  TextField,
  Grid,
} from "@mui/material";
import { DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
// import { yellow } from '@mui/material/colors'
import { filterHandler } from "../../features/filter/filterSlice";
import { defectSettingHandler } from "../../features/DatesettingSlice";
import "./Dashboard.modules.css";
function Dashboard() {
  const [value, setValue] = useState({ fromd: "", tod: "" });
  const filterConditions = useSelector((state) => state.filter);
  const [checkBox, setCheckBox] = useState(false)
  const x = new Date()
  let givenDate = `${x.getMonth()+1}/${x.getDate()}/${x.getFullYear()}`
  const [checkedValues, setCheckedValues] = useState({
    fromDate:givenDate,
    toDate: givenDate,
    typeA:false,
    typeB: false,
    Scratches: false,
    Discoloration: false,
    "Foreign Particles": false,
    All: false,
  });
 
 
 
  const defectTypes_Count = useSelector((state) => state.dataset.typeA);
  console.log(defectTypes_Count);
  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
  };
  const dispatch = useDispatch();

  const [table, setTable] = useState(true);
  const changeToTableHandler = () => {
    setTable(!table);
  };
  const applyFilterHandler = (e) => {
    dispatch(filterHandler({ ...checkedValues }));
    console.log(filterConditions);
    axios.post("/data/filter", checkedValues, config).then((res) => {
      console.log(res.data);
      dispatch(defectSettingHandler({ typeA: res.data }));
    });

 
  };
  

  useEffect(() => {
    axios.get("/data").then((res) => {
        const [typea, typeb] = res.data;
        dispatch(defectSettingHandler({ typeA: typea, typeB: typeb }));
      });
    // console.log("executed")
    // axios.post('/data/filter',{filterString:"",queryParams:[]},config).then(res=>{
    //   console.log(res)
    // }).catch(err=>console.error(err))
  }, []);

  return (
    <Grid container xs={12} >
    <h1>Dashboard</h1>
      <Grid xs={12}>
        <Paper elevation={3} className="form">
          <div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
              className="dtpicker"
                label="From Date"
                value={checkedValues.fromDate}
                sx={{ backgroundColor: "black" }}
                onChange={(value) => {
                  setValue((prev) => {
                    return { ...prev, fromd: value };
                  });
                  setCheckedValues({ ...checkedValues, fromDate:`${value.getMonth()+1}/${value.getDate()}/${value.getDate()}` });
                }}
                renderInput={(params) => <TextField {...params} />}
              />
              <DatePicker
                label="to"
                value={checkedValues.toDate}
                className="dtpicker"
                onChange={(value) => {
                  setValue((prev) => {
                    return { ...prev, tod: value };
                  });
                  setCheckedValues({ ...checkedValues, toDate: value });
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
          <FormGroup className="checks">
            Bottle Types
            <div>
            <FormControlLabel
              control={<Checkbox color="secondary" />}
              label="TypeA"
              onChange={(e) => {
                setCheckedValues((prev) => {
                  return { ...prev, typeA: !prev.typeA };
                });
              }}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="TypeB"
              onChange={(e) => {
                setCheckedValues((prev) => {
                  return { ...prev, typeB: !prev.typeB};
                });
              }}
            />
            </div>
          </FormGroup>
          <FormGroup className="checks">
            <span> Defect Types</span>
            <div>
            <FormControlLabel
              control={<Checkbox />}
              label="Scratch"
              onChange={(e) => {
                console.log(e.target.value);
                setCheckedValues((prev) => {
                  return { ...prev, Scratches: !prev.Scratches};
                });
              }}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Foreign Particle"
              onChange={(e) => {
                console.log(e);
                setCheckedValues((prev) => {
                  return { ...prev, "Foreign Particles": !prev["Foreign Particles"] };
                });
              }}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Discoloration"
              onChange={(e) => {
                setCheckedValues((prev) => {
                  return { ...prev, Discoloration: !prev.Discoloration };
                });
              }}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="All"
              onChange={(e) => {
                console.log("clicked");
                setCheckedValues((prev) => {
                  return { ...prev, All: e.target.value };
                });
              }}
            />
            </div>
          </FormGroup>
          <Button type="submit" className="submit-btn" onClick={applyFilterHandler} >
            Submit
          </Button>
        </Paper>
      </Grid>

      <Grid xs={4} >
        <Paper className="bar-chart" onClick={changeToTableHandler}>
          <DynamicChart />
        </Paper>
      </Grid>
      {table ? (
        <>
          <Grid xs={4}>
            <Paper className="bar-chart ">
              <PieChart />
            </Paper>
          </Grid>
          <Grid xs={4}>
            <Paper className=" bar-chart">
              <LineChart />
            </Paper>
          </Grid>
        </>
      ) : (
        <Grid xs={6}>
          <Paper className="bar-chart">
            <DefectLogTables />
          </Paper>
        </Grid>
      )}
      
    </Grid>
  );
}

export default Dashboard;
