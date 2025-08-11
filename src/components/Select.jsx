import { Select } from "@chakra-ui/react";

const SelectMenu = ({ sensorsNumber, onChange }) => {
  return (
    <Select
      placeholder="Select Sensor"
      width="240px"
      size="sm"
      mx="auto"
      pt="1rem"
      borderRadius="0.5rem"
      color="blue.900"
      fontWeight="bold"
      onChange={(e) => {
        const sensorIndex = parseInt(e.target.value.replace("Sensor ", ""), 10);
        if (onChange) onChange(sensorIndex);
      }}
    >
      {Array.from({ length: sensorsNumber }, (_, i) => (
        <option key={i} value={`Sensor ${i + 1}`}>
          Sensor {i + 1}
        </option>
      ))}
    </Select>
  );
};

export default SelectMenu;
