import { getFiveMinuteData } from './SensorDataModule';

// When you need the data
const currentFiveMinData = getFiveMinuteData();
console.log(`Got ${currentFiveMinData.length} data points`);