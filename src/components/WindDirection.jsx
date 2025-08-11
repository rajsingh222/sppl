import React, { useState, useEffect, useRef } from 'react';
import { Box, Heading, Spinner, Text } from '@chakra-ui/react';

const WindDirection = ({
    city,
    apiKey,
    sliceColor = '#317AC7',
    baseColor = '#f3f3f3',
}) => {
    const [windDirectionDegrees, setWindDirectionDegrees] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        const fetchWindDirection = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
                );
                if (!response.ok) {
                    throw new Error('Failed to fetch weather data');
                }
                const data = await response.json();
                setWindDirectionDegrees(data.wind.deg);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchWindDirection();
    }, [city, apiKey]);

    useEffect(() => {
        if (canvasRef.current && windDirectionDegrees !== null) {
            drawWindDirection(
                'windDirectionCanvas',
                windDirectionDegrees,
                sliceColor,
                baseColor
            );
        }
    }, [windDirectionDegrees, sliceColor, baseColor]);

    function drawWindDirection(
        canvasId,
        windDirectionDegrees,
        sliceColor,
        baseColor
    ) {
        const canvas = document.getElementById(canvasId);
        const ctx = canvas.getContext('2d');
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = Math.min(centerX, centerY) - 20;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the base circle (using baseColor)
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.fillStyle = baseColor;
        ctx.fill();
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Draw angle labels
        const angleLabels = [0, 45, 90, 135, 180, 225, 270, 315];
        angleLabels.forEach((angle) => {
            const radians = (angle - 90) * (Math.PI / 180);
            const x = centerX + (radius + 10) * Math.cos(radians);
            const y = centerY + (radius + 10) * Math.sin(radians);
            ctx.fillStyle = 'black'; // Set the fill color to black
            ctx.fillText(`${angle}°`, x, y);
        });

        // Draw concentric circles
        const numCircles = 3;
        for (let i = 1; i <= numCircles; i++) {
            const currentRadius = (radius * i) / numCircles;
            ctx.beginPath();
            ctx.arc(centerX, centerY, currentRadius, 0, 2 * Math.PI);
            ctx.strokeStyle = 'lightgray';
            ctx.lineWidth = 0.5;
            ctx.stroke();
        }

        // Draw the wind direction slice (using sliceColor)
        const startAngle = -Math.PI / 2;
        const endAngle = startAngle + (windDirectionDegrees * Math.PI) / 180;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.fillStyle = sliceColor;
        ctx.fill();
        ctx.closePath();
    }

    if (loading) {
        return (
            <Box textAlign="center" p={8}
                boxShadow="lg"

            >
                <Spinner size="xl" />
                <Heading size="md" mt={2}>Loading Wind Direction...</Heading>
            </Box>
        );
    }

    if (error) {
        return (
            <Box textAlign="center" p={8} color="red.500">
                <Heading size="md">Error: {error}</Heading>
                <Text>{error}</Text>
            </Box>
        );
    }

    return (
        <Box textAlign="center" transform="scaleY(0.9) scaleX(0.95)" bg='#f3f3f3' borderRadius="1em"
        // border="1px solid green"
        >
            <Heading size="sm" >Wind Direction</Heading>
            <Box display="flex" justifyContent="center" bg='#f3f3f3' borderRadius='1em'>
                <canvas id="windDirectionCanvas" width="200" height="200" ref={canvasRef} />
            </Box>
        </Box>

    );
};

export default WindDirection;