import React,{useState}from 'react'
import { useDispatch,useSelector } from 'react-redux';
import {FormGroup,Checkbox,Paper,FormControlLabel,Button,TextField} from '@mui/material'
import { DatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import { yellow } from '@mui/material/colors'
import { filterHandler} from '../../features/filter/filterSlice';
import './Dashboard.modules.css'
function Dashboard() {
    const [value,setValue] = useState({fromd:"",tod:""})
    const [checkedValues,setCheckedValues] =useState({
        fromDate:"",
        toDate:"",
        type1:"",
        type2:"",
        Scratch:"",
        Discoloration:"",
        ForeignParticle:"",
        All:""

    })
    const dispatch = useDispatch()
    return (
       
           <Paper elevation={3} className="form">
           <div>
           <LocalizationProvider dateAdapter={AdapterDateFns}>
  <DatePicker
    label="From Date"
    value={value.fromd}
    sx={{backgroundColor:'black'}}
    onChange={(value) => {  
        setValue((prev)=>{return{...prev,fromd:value}})
        setCheckedValues({...checkedValues,
          fromDate:value
      });
    }}
    renderInput={(params) => <TextField {...params} />}
  />
   <DatePicker
    label="to"
    value={value.tod}
    onChange={(value) => {
        setValue((prev)=>{return{...prev,tod:value}})
      setCheckedValues({...checkedValues,
          toDate:value
      });
    }}
    renderInput={(params) => <TextField {...params} />}
  />
</LocalizationProvider>
  
           </div>
               <FormGroup className="checks">
               Bottle Types
               <FormControlLabel control={<Checkbox />} label="Type 1" onChange={(e)=>{
                   setCheckedValues((prev)=>{ 
                       return {...prev,type1:e.target.value}
                       
                   })
               }}/>
               <FormControlLabel control={<Checkbox />} label="Type 2" onChange={(e)=>{
                   setCheckedValues((prev)=>{ 
                       return {...prev,type2:e.target.value}
                       
                   })
               }}/>
               </FormGroup>
               <FormGroup className="checks">
              <span> Defect Types</span>
               <FormControlLabel control={<Checkbox />} label="Scratch" onChange={(e)=>{
                   setCheckedValues((prev)=>{ 
                       return {...prev,Scratch:e.target.value}
                       
                   })
               }}/>
               <FormControlLabel control={<Checkbox />} label="Foreign Particle" onChange={(e)=>{
                   console.log(e)
                   setCheckedValues((prev)=>{ 
                       return {...prev,ForeignParticl:e.target.value}
                       
                   })
               }} />
               <FormControlLabel control={<Checkbox />} label="Discoloration"  onChange={(e)=>{
                   setCheckedValues((prev)=>{ 
                       return {...prev,Discoloration:e.target.value}
                       
                   })
               }}/>
               <FormControlLabel control={<Checkbox />} label="All"  onChange={(e)=>{
                   console.log('clicked')
                   setCheckedValues((prev)=>{ 
                       return {...prev,All:e.target.value}
                       
                   })
               }}/>
               </FormGroup>
               <Button type="submit" variant="contained" onSubmit={(e)=>{
                   e.preventDefault()
               dispatch(filterHandler({
                   filterValues:{
                ...checkedValues     
               }}))
               console.log('clicked')
               }}>Submit</Button>
           </Paper>
    )
}

export default Dashboard
