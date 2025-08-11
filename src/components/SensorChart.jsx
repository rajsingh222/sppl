import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer,
} from "recharts";

const SensorChart = ({ width = "100%", height = "100%" }) => {
  const [data, setData] = useState([]);
  const [sensor, setSensor] = useState("vw_1"); // default selected sensor

  useEffect(() => {
    axios.get("https://spplindia.org/api/get_last_20.php")

      .then((res) => {
        const formatted = res.data.map((row, i) => {
          const parsed = {
            time: row.date_time,
            ...Object.fromEntries(
              Object.entries(row)
                .filter(([k]) => k.startsWith("vw_") || k.startsWith("vwt_"))
            )
          };

          try {
            const tm1 = JSON.parse(row.tm_1);
            const tm2 = JSON.parse(row.tm_2);
            parsed["tm_1_x"] = tm1.X;
            parsed["tm_1_y"] = tm1.Y;
            parsed["tm_1_z"] = tm1.Z;
            parsed["tm_2_x"] = tm2.X;
            parsed["tm_2_y"] = tm2.Y;
            parsed["tm_2_z"] = tm2.Z;
          } catch (e) {
            // skip parsing errors
          }

          return parsed;
        });

        setData(formatted);
      });
  }, []);

  const renderLines = () => {
    if (sensor.startsWith("tm_")) {
      return (
        <>
          <Line type="monotone" dataKey={`${sensor}_x`} stroke="#8884d8" name="X" />
          <Line type="monotone" dataKey={`${sensor}_y`} stroke="#82ca9d" name="Y" />
          <Line type="monotone" dataKey={`${sensor}_z`} stroke="#ffc658" name="Z" />
        </>
      );
    }
    return <Line type="monotone" dataKey={sensor} stroke="#8884d8" name={sensor} />;
  };

  const sensorOptions = [
    "tm_1", "tm_2",
    ...Array.from({ length: 10 }, (_, i) => `vw_${i + 1}`),
  ];

  return (
    <div>
      <select value={sensor} onChange={(e) => setSensor(e.target.value)} style={{ marginBottom: 10 }}>
        {sensorOptions.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      <ResponsiveContainer width={width} height={height}>
        <LineChart data={data}>
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          {renderLines()}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SensorChart;
