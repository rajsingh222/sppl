import React, { useState, useEffect } from "react";
import { Box, Text, Flex, Grid, Spinner, Icon } from "@chakra-ui/react";

function WeatherCard({ city }) {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Replace with your own OpenWeatherMap API key and city
    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
    const CITY = city;
    const UNITS = "metric"; // "metric" for Celsius, "imperial" for Fahrenheit

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&units=${UNITS}&appid=${API_KEY}`
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch weather data");
                }

                const data = await response.json();
                setWeatherData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, [API_KEY, CITY]);

    const getSvgUrl = (weatherDesc, temperature) => {
        // Use lowercase for robust comparisons
        const desc = weatherDesc?.toLowerCase() || "";
        console.log(desc, temperature);

        if (desc.includes("clear")) {
            return "/WeatherIcon/static/day.svg";
        }
        if (desc.includes("rain")) {
            return "/WeatherIcon/static/rainy-7.svg";
        }
        if (temperature < 0) {
            return "/WeatherIcon/static/snowy-5.svg";
        }
        if (desc.includes("cloud")) {
            return "/WeatherIcon/static/cloudy-day-3.svg";
        }
        // Default icon if no condition is met
        return "/WeatherIcon/static/day.svg";
    };

    // Loading state
    if (loading) {
        return (
            <Box 
                borderRadius="lg" 
                bg="#f5f5f5" 
                p={4} 
                display="flex" 
                justifyContent="center" 
                alignItems="center" 
                height="100%" 
                minHeight="200px"
                boxShadow="md"
            >
                <Spinner color="blue.500" />
            </Box>
        );
    }

    // Error state
    if (error) {
        return (
            <Box 
                borderRadius="lg" 
                bg="#f5f5f5" 
                p={4} 
                color="red.500" 
                textAlign="center"
                boxShadow="md"
            >
                Error: {error}
            </Box>
        );
    }

    // No data state
    if (!weatherData) {
        return (
            <Box 
                borderRadius="lg" 
                bg="#f5f5f5" 
                p={4} 
                textAlign="center"
                boxShadow="md"
            >
                No weather data available.
            </Box>
        );
    }

    // Extract needed fields
    const {
        main: { temp, temp_min, temp_max, humidity, pressure },
        weather,
    } = weatherData;

    // weather[0] usually contains main conditions (e.g., "Clouds", "Rain")
    const weatherMain = weather[0]?.main || "Unknown";
    const weatherDesc = weather[0]?.description || "N/A";

    // Convert to integer
    const temperature = Math.round(temp);
    const minTemperature = Math.round(temp_min);
    const maxTemperature = Math.round(temp_max);

    // Get weather icon
    const svgUrl = getSvgUrl(weatherDesc, temperature);

    return (
        <Box
            boxShadow="md"
            width="100%"
            height="100%"
            borderRadius="lg"
            bg="#f5f5f5"
            fontFamily="system-ui, sans-serif"
            userSelect="none"
            overflow="hidden"
            maxWidth="400px"
            mx="auto"
        >
            {/* Header */}
            <Flex 
                alignItems="center" 
                p={3} 
                borderBottom="1px solid" 
                borderColor="gray.100"
            >
                <Box mr={2}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M12.8 19.6A2 2 0 1 0 14 16H2" />
                        <path d="M17.5 8a2.5 2.5 0 1 1 2 4H2" />
                        <path d="M9.8 4.4A2 2 0 1 1 11 8H2" />
                    </svg>
                </Box>
                <Text 
                    fontSize="md" 
                    fontWeight="700" 
                    color="gray.800"
                >
                    Weather
                </Text>
            </Flex>

            {/* Main Content */}
            <Flex 
                direction={{ base: "column", sm: "row" }} 
                p={3}
                alignItems="center"
            >
                {/* Left Side - Temperature Info */}
                <Flex 
                    direction="column" 
                    width={{ base: "100%", sm: "50%" }} 
                    alignItems="center" 
                    mb={{ base: 4, sm: 0 }}
                >
                    <Text fontSize="md" color="gray.600" mb={1}>
                        {CITY}
                    </Text>
                    <Text 
                        fontSize={{ base: "3xl", sm: "4xl" }} 
                        fontWeight="bold" 
                        color="orange.400"
                        lineHeight="1"
                    >
                        {temperature}°C
                    </Text>
                    <Flex align="center" mt={1} mb={2}>
                        <Text fontSize="sm" color="blue.400" mr={1}>
                            {minTemperature}°C
                        </Text>
                        <Text fontSize="sm" color="gray.500" mx={1}>
                            /
                        </Text>
                        <Text fontSize="sm" color="orange.400" ml={1}>
                            {maxTemperature}°C
                        </Text>
                    </Flex>
                    <Text 
                        fontSize="sm" 
                        color="gray.600" 
                        textTransform="capitalize"
                    >
                        {weatherDesc}
                    </Text>
                </Flex>

                {/* Right Side - Weather Icon */}
                <Flex 
                    width={{ base: "100%", sm: "50%" }} 
                    justifyContent="center" 
                    alignItems="center"
                >
                    <Box 
                        width={{ base: "120px", sm: "140px" }} 
                        height="auto"
                    >
                        <img 
                            src={svgUrl} 
                            alt={weatherMain} 
                            style={{ width: "100%", height: "auto" }} 
                        />
                    </Box>
                </Flex>
            </Flex>

            {/* Details Grid */}
            <Grid 
                templateColumns={{ base: "repeat(1, 1fr)", sm: "repeat(2, 1fr)" }}
                bg="gray.50"
                gap={1}
                p={2}
            >
                {/* Humidity */}
                <Flex 
                    align="center" 
                    justify="space-between" 
                    p={2} 
                    borderRadius="md"
                    bg="white"
                >
                    <Flex align="center">
                        <Box mr={2} color="blue.500">
                            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 -960 960 960" fill="currentColor">
                                <path d="M580-240q25 0 42.5-17.5T640-300q0-25-17.5-42.5T580-360q-25 0-42.5 17.5T520-300q0 25 17.5 42.5T580-240Zm-202-2 260-260-56-56-260 260 56 56Zm2-198q25 0 42.5-17.5T440-500q0-25-17.5-42.5T380-560q-25 0-42.5 17.5T320-500q0 25 17.5 42.5T380-440ZM480-80q-137 0-228.5-94T160-408q0-100 79.5-217.5T480-880q161 137 240.5 254.5T800-408q0 140-91.5 234T480-80Zm0-80q104 0 172-70.5T720-408q0-73-60.5-165T480-774Q361-665 300.5-573T240-408q0 107 68 177.5T480-160Zm0-320Z" />
                            </svg>
                        </Box>
                        <Text fontSize="xs" color="gray.600">
                            Air humidity
                        </Text>
                    </Flex>
                    <Text fontSize="xs" fontWeight="medium">
                        {humidity}%
                    </Text>
                </Flex>

                {/* Air pressure */}
                <Flex 
                    align="center" 
                    justify="space-between" 
                    p={2} 
                    borderRadius="md"
                    bg="white"
                >
                    <Flex align="center">
                        <Box mr={2} color="red.500">
                            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 -960 960 960" fill="currentColor">
                                <path d="M760-640q-17 0-28.5-11.5T720-680q0-8 3.5-15.5T732-708q12-12 55-27l43-15q-8 23-15 43-6 17-13.5 33T788-652q-5 5-12.5 8.5T760-640ZM160-120q-33 0-56.5-23.5T80-200v-560q0-33 23.5-56.5T160-840h240q33 0 56.5 23.5T480-760v327q9-3 19-5t21-2q50 0 85 35t35 85v80q0 17 11.5 28.5T680-200q17 0 28.5-11.5T720-240v-200h-40v-57q-54-23-87-72t-33-111q0-83 58.5-141.5T760-880q83 0 141.5 58.5T960-680q0 62-33 111t-87 72v57h-40v200q0 50-35 85t-85 35q-50 0-85-35t-35-85v-80q0-17-11.5-28.5T520-360q-17 0-28.5 11.5T480-320v120q0 33-23.5 56.5T400-120H160Zm600-440q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM160-200h240v-80l-80 80v-113l80-80v-87l-80 80v-113l80-80v-87l-80 80v-113l47-47H193l47 47v113l-80-80v87l80 80v113l-80-80v87l80 80v113l-80-80v80Z" />
                            </svg>
                        </Box>
                        <Text fontSize="xs" color="gray.600">
                            Air pressure
                        </Text>
                    </Flex>
                    <Text fontSize="xs" fontWeight="medium">
                        {pressure} mBar
                    </Text>
                </Flex>

                {/* Soil moisture */}
                <Flex 
                    align="center" 
                    justify="space-between" 
                    p={2} 
                    borderRadius="md"
                    bg="white"
                >
                    <Flex align="center">
                        <Box mr={2} color="green.500">
                            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 -960 960 960" fill="currentColor">
                                <path d="M481-300q66 0 112.5-46T640-458q0-32-12-60.5T593-569L480-680 367-569q-23 22-35 50.5T320-458q0 66 47.5 112T481-300Zm-81-160q0-15 6-28t17-24l57-56 57 56q11 11 17 24t6 28H400ZM160-160v-480l320-240 320 240v480H160Zm80-80h480v-360L480-780 240-600v360Z" />
                            </svg>
                        </Box>
                        <Text fontSize="xs" color="gray.600">
                            Soil moisture
                        </Text>
                    </Flex>
                    <Text fontSize="xs" fontWeight="medium">
                        63%
                    </Text>
                </Flex>

                {/* Ambient light */}
                <Flex 
                    align="center" 
                    justify="space-between" 
                    p={2} 
                    borderRadius="md"
                    bg="white"
                >
                    <Flex align="center">
                        <Box mr={2} color="yellow.600">
                            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 -960 960 960" fill="currentColor">
                                <path d="M480-28 346-160H160v-186L28-480l132-134v-186h186l134-132 134 132h186v186l132 134-132 134v186H614L480-28Zm0-252q83 0 141.5-58.5T680-480q0-83-58.5-141.5T480-680q-83 0-141.5 58.5T280-480q0 83 58.5 141.5T480-280Zm0-80q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35Z" />
                            </svg>
                        </Box>
                        <Text fontSize="xs" color="gray.600">
                            Ambient light
                        </Text>
                    </Flex>
                    <Text fontSize="xs" fontWeight="medium">
                        0 lux
                    </Text>
                </Flex>
            </Grid>
        </Box>
    );
}

export default WeatherCard;