import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../Loading/loading";
import { Container } from "@mui/system";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Chart as Chartjs, defaults } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import {header,cardContent,card} from './memoryLikeChartStyle.js';

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
function MemoryChart({ open, setOpen, fetchMemories, memories }) {
  const classes = useStyles();
  const [showChart, setShowChart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [res,setRes]= useState(false);

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  useEffect(() => {
    fetchMemories();
    memoryChart(memories[9]._id);
  }, []);
  console.log(memories);
  const memoryChart = async (id) =>{
    console.log(id);
    setLoading(true);
    try{
        const token = window.localStorage.getItem("token");
        const headers = {
            "content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        };

        // Make API request to get user memories
        const result = await axios.get(
            `${process.env.REACT_APP_BASE_URL}memory/likereport/daywise`,
            {headers: headers,
              params: {
              id: id
            }}
        );
        if(result.data.success===true){
            setShowChart(result.data.data)
        }else{
            alert(result.data.message)
            setRes(true);
        }
    }catch(error){
        console.log(error)
    }finally {
      setLoading(false);
    }
}

  return (
    <>
    {loading && res===false ? (
        <Loading />
      ) : (
      <Container
        minwidth="sm"
        className={open ? classes.appBarShift : classes.appbar}
      >
        <Grid
          container
          sx={{
            width: "100%",
            display: "flex",
            // justifyContent: "center",
            alignItems: "center",
            justifyContent:"space-around"
          }}
        >
          <Grid item >
            <Typography variant="h5" sx={{marginTop:'-20px',marginBottom:'10px'}}>Memories List</Typography>
            <Paper sx={{ width: "100%" }}>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow >
                      <TableCell sx={header} align="left">User Name</TableCell>
                      <TableCell sx={header} align="left">Memory Title</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {memories.map((column) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} onClick={()=>{memoryChart(column._id)}}>
                          <TableCell key={column.tag}>{column.name}</TableCell>
                          <TableCell key={column._id}>{column.title}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
          <Grid item sx={{width:'70%'}}>
            {showChart.length==0?
            <Card sx={card}>
              <CardContent sx={cardContent}>
                <Typography gutterBottom variant="h5" component="div">
                  No Like On This Memory
                </Typography>
              </CardContent>
            </Card>
            :
            <Bar
                data={{
                    labels: showChart && showChart.map((data) => {
                        const [day, month, year] = data.date.split('/');
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
                    },
                    plugins:{
                      title:{
                        display: true,
                        text:"Memory Like Chart",
                        font: {
                          size: 16
                        }
                      }
                    }
                }}
            />
            }    
          </Grid>
        </Grid>
      </Container>
      )
    }
    </>
  );
}

export default MemoryChart;
