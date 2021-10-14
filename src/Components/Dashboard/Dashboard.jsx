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
  const [checkedValues, setCheckedValues] = useState({
    fromDate: "",
    toDate: "",
    typeA: "",
    typeB: "",
    Scratches: "",
    Discoloration: "",
    "Foreign Particles": "",
    All: "",
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
    console.log(checkedValues);
    axios.post("/data/filter", checkedValues, config).then((res) => {
      console.log(res.data);
      dispatch(defectSettingHandler({ typeA: res.data }));
    });
  };
  useEffect(() => {
    // axios.get("/data").then((res) => {
    //     const [typea, typeb] = res.data;
    //     dispatch(defectSettingHandler({ typeA: typea, typeB: typeb }));
    //   });
    // console.log("executed")
    // axios.post('/data/filter',{filterString:"",queryParams:[]},config).then(res=>{
    //   console.log(res)
    // }).catch(err=>console.error(err))
  }, []);

  return (
    <Grid container xs={12}>
      <Grid xs={12}>
        <Paper elevation={3} className="form">
          <div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="From Date"
                value={value.fromd}
                sx={{ backgroundColor: "black" }}
                onChange={(value) => {
                  setValue((prev) => {
                    return { ...prev, fromd: value };
                  });
                  setCheckedValues({ ...checkedValues, fromDate: value });
                }}
                renderInput={(params) => <TextField {...params} />}
              />
              <DatePicker
                label="to"
                value={value.tod}
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
            <FormControlLabel
              control={<Checkbox />}
              label="TypeA"
              onChange={(e) => {
                setCheckedValues((prev) => {
                  return { ...prev, typeA: e.target.value };
                });
              }}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="TypeB"
              onChange={(e) => {
                setCheckedValues((prev) => {
                  return { ...prev, typeB: e.target.value };
                });
              }}
            />
          </FormGroup>
          <FormGroup className="checks">
            <span> Defect Types</span>
            <FormControlLabel
              control={<Checkbox />}
              label="Scratch"
              onChange={(e) => {
                console.log(e.target.value);
                setCheckedValues((prev) => {
                  return { ...prev, Scratches: e.target.value };
                });
              }}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Foreign Particle"
              onChange={(e) => {
                console.log(e);
                setCheckedValues((prev) => {
                  return { ...prev, "Foreign Particles": e.target.value };
                });
              }}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Discoloration"
              onChange={(e) => {
                setCheckedValues((prev) => {
                  return { ...prev, Discoloration: e.target.value };
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
          </FormGroup>
          <Button type="submit" onClick={applyFilterHandler}>
            Submit
          </Button>
        </Paper>
      </Grid>

      <Grid xs={6}>
        <Paper className="bar-chart" onClick={changeToTableHandler}>
          <DynamicChart />
        </Paper>
      </Grid>
      {table ? (
        <>
          <Grid xs={2}>
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
