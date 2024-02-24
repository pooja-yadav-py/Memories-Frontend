import React, { useState,useEffect } from "react";
import axios from "axios";
import {  Container } from "@mui/system";
import { Chart as Chartjs,defaults } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2"; 
import {
    Grid,
    Typography
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import sourceData from "./data/sourceData.json";
// defaults.responsive=true;
let drawerWidth = 240;
const useStyles = makeStyles({
appbar: {
    width: "100%",
},
appBarShift: {
    width: `calc(100% - ${drawerWidth}px)!important`,
    marginLeft: "16%!important",
},
});
function MemoryChart(props) {
    const classes = useStyles();
    const [showChart,setShowChart] = useState([]);
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    useEffect(()=>{
        memoryChart();
    },[])
    
    const memoryChart = async () =>{
        try{
            const token = window.localStorage.getItem("token");
            const headers = {
                "content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            };

            // Make API request to get user memories
            const result = await axios.get(
                `${process.env.REACT_APP_BASE_URL}memory/report/daywise`,{headers: headers}
            );
            if(result.data.success===true){
                setShowChart(result.data.data)
            }else{
                alert(result.data.message)
            }
        }catch(error){
            console.log(error)
        }
    }
    
  return (
    <>
      <Container 
        minwidth="sm"
        className={props.open ? classes.appBarShift : classes.appbar}
      >
        <Grid container sx={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
            <Grid item sx={{width:'700px'}}>
                <Typography variant="h5">Create Memory Daywise</Typography>
                <Bar
                    data={{
                        labels: showChart && showChart.map((data) => {
                            const [day, month, year] = data._id.split('/');
                            return `${day}-${monthNames[parseInt(month, 10) - 1]}-${year}`;
                        }),
                            
                        datasets: [
                            {
                                label: "memory",
                                data: showChart && showChart.map((data) => data.count),
                                backgroundColor:[
                                    "rgb(128, 165, 0)",
                                    "rgb(228, 128, 128)"
                                ],
                                barThickness: 36,
                                borderRadius:1
                            },
                            
                        ],
                    }}
                    options={{
                        scales: {
                            y: {
                                ticks: {
                                    stepSize: 1 // Set step size to 1 to display only integer values
                                }
                            }
                        }
                    }}
                />
                {/* <Line
                    data={{
                        labels: sourceData.map((data) => data.year),
                        datasets: [
                            {
                                label: "demo",
                                data: sourceData.map((data) => data.population),
                                barThickness: 36,
                                borderRadius:1,
                                borderColor:"blue"
                            },
                        ],
                    }}
                /> */}
                
            </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default MemoryChart;
