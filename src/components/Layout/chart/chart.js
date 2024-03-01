import React, { useState, useEffect } from "react";
import axios from "axios";
import TurnRightIcon from "@mui/icons-material/TurnRight";
import BarChartIcon from "@mui/icons-material/BarChart";
import { Container } from "@mui/system";
import { Chart as Chartjs, defaults } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { Grid, Typography, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { reportButton } from "./memoryLikeChartStyle";
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
  const [showChart, setShowChart] = useState([]);
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
  const isAdmin = window.localStorage.getItem("isAdmin") === "true"; // Parse boolean value

  useEffect(() => {
    if (isAdmin) {
      memoryChart(false);
    } else {
      memoryChart(true);
    }
  }, []);

  const memoryChart = async (report) => {
    console.log(report);
    try {
      const token = window.localStorage.getItem("token");
      const headers = {
        "content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      // Make API request to get user memories
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}memory/report/daywise`,
        { params: { report }, headers: headers }
      );
      if (result.data.success === true) {
        setShowChart(result.data.data);
      } else {
        alert(result.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container
        minwidth="sm"
        className={props.open ? classes.appBarShift : classes.appbar}
      >
        <Grid
          container
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid item sx={{ width: "700px" }}>
            <Grid
              item
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography variant="h5">Created Memory Daywise</Typography>
              {isAdmin && (
                <Grid item>
                  <Button
                    variant="contained"
                    sx={reportButton}
                    onClick={() => memoryChart(false)}
                  >
                    <BarChartIcon /> All Users
                  </Button>

                  <Button
                    variant="contained"
                    sx={reportButton}
                    onClick={() => memoryChart(true)}
                  >
                    <BarChartIcon /> loggedIn User
                  </Button>
                </Grid>
              )}
            </Grid>

            <Bar
              data={{
                labels:
                  showChart &&
                  showChart.map((data) => {
                    const [day, month, year] = data._id.split("/");
                    return `${day}-${
                      monthNames[parseInt(month, 10) - 1]
                    }-${year}`;
                  }),

                datasets: [
                  {
                    label: "memory",
                    data: showChart && showChart.map((data) => data.count),
                    backgroundColor: ["rgb(128, 165, 0)", "rgb(228, 128, 128)"],
                    barThickness: 36,
                    borderRadius: 1,
                  },
                ],
              }}
              options={{
                scales: {
                  y: {
                    ticks: {
                      stepSize: 1, // Set step size to 1 to display only integer values
                    },
                  },
                },
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default MemoryChart;
