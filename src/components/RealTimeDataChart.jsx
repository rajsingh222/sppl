import React, { useEffect, useRef } from 'react';
import { Box, Heading, Container } from '@chakra-ui/react';
import Chart from 'chart.js/auto';

const RealTimeDataChart = () => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    // Initialize Firebase and Chart.js
    const initializeFirebaseAndChart = async () => {
      // Import Firebase modules
      const { initializeApp } = await import("https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js");
      const {
        getDatabase,
        ref,
        query,
        orderByKey,
        limitToLast,
        onValue,
        remove
      } = await import("https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js");

      const firebaseConfig = {
        apiKey: "AIzaSyDYF3_IDFcnlOcZIAojphCry6Zj-7kan0s",
        authDomain: "real-time-data-sppl-7dfa5.firebaseapp.com",
        databaseURL: "https://real-time-data-sppl-7dfa5-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "real-time-data-sppl-7dfa5",
        storageBucket: "real-time-data-sppl-7dfa5.appspot.com",
        messagingSenderId: "851842591458",
        appId: "1:851842591458:web:e80db919cbee5e48020cbb",
        measurementId: "G-588TQ5X16Q"
      };

      const app = initializeApp(firebaseConfig);
      const db = getDatabase(app);
      const sensorsRef = ref(db, "sensors");
      const lastBatchQuery = query(sensorsRef, orderByKey(), limitToLast(5));

      // Initialize Chart
      const ctx = chartRef.current.getContext("2d");
      const chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: [],
          datasets: [
            {
              label: "Sensor 1",
              data: [],
              borderColor: "red",
              pointRadius: 0,
              tension:0.1,
              fill: false
            },
            {
              label: "Sensor 2",
              data: [],
              borderColor: "blue",
              pointRadius: 0,
              tension:0.1,
              fill: false
            },
            {
              label: "Sensor 3",
              data: [],
              borderColor: "green",
              pointRadius: 0,
              tension:0.1,
              fill: false
            },
            {
              label: "Sensor 4",
              data: [],
              borderColor: "orange",
              pointRadius: 0,
              tension:0.1,
              fill: false
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: false,
          scales: {
            y: {
              min: -3,
              max: 5,
              fill: false,
              title: {
                display: true,
                text: "Sensor Value"
              }
            },
            x: {
              title: {
                display: true,
                text: "Timestamp"
              }
            }
          }
        }
      });

      chartInstanceRef.current = chart;

      function updateChart(dataArray) {
        const labels = dataArray.map(d => d.timestamp);
        const piezo1 = dataArray.map(d => d.piezo1);
        const piezo2 = dataArray.map(d => d.piezo2);
        const piezo3 = dataArray.map(d => d.piezo3);
        const piezo4 = dataArray.map(d => d.piezo4);

        chart.data.labels = labels;
        chart.data.datasets[0].data = piezo1;
        chart.data.datasets[1].data = piezo2;
        chart.data.datasets[2].data = piezo3;
        chart.data.datasets[3].data = piezo4;

        chart.update();
      }

      let timeoutHandle;

      function resetTimeout() {
        if (timeoutHandle) clearTimeout(timeoutHandle);
        timeoutHandle = setTimeout(() => {
          console.warn("No new data in 10 seconds. Clearing the database.");
          remove(sensorsRef)
            .then(() => {
              console.log("Database cleared.");
              chart.update();
            })
            .catch(err => console.error("Failed to clear database:", err));
        }, 20000); // 20 seconds
      }

      onValue(lastBatchQuery, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const dataArrays = Object.values(data).flatMap(batch => batch.data || []);
          //const lastBatchKey = Object.keys(data)[0];
          //const dataArray = data[lastBatchKey].data;
          updateChart(dataArrays);
          resetTimeout();
        }
      });
    };

    initializeFirebaseAndChart();

    // Cleanup function
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  return (
    <Container maxW="full" p={4}>
      <Box 
        w="full" 
        h="full"
        bg="white"
        borderRadius="md"
        boxShadow="md"
        p={4}
      >
        <canvas 
          ref={chartRef}
          style={{ 
            width: '100%', 
            height: '100%' 
          }}
        />
      </Box>
    </Container>
  );
};

export default RealTimeDataChart;