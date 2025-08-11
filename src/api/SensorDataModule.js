// sensorDataModule.js
let fiveMinuteData = [];
let lastUpdateTimestamp = null;

export const setFiveMinuteData = (data) => {
  fiveMinuteData = data;
  lastUpdateTimestamp = Date.now();
};

export const getFiveMinuteData = () => {
  return fiveMinuteData.slice(0, Math.min(fiveMinuteData.length, 1000)
  );

};

export const getLastUpdateTimestamp = () => {
  return lastUpdateTimestamp;
};

// Helper function to check if data is available
export const hasData = () => {
  return fiveMinuteData.length > 0;
};

// Get the number of sensors in the data
export const getSensorCount = () => {
  if (fiveMinuteData.length > 0 && Array.isArray(fiveMinuteData[0].values)) {
    return fiveMinuteData[0].values.length;
  }
  return 0;
};