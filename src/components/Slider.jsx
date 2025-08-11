import Slider from "react-slick";
import { Box, Heading, Text } from "@chakra-ui/react";

const cardData = [
  { title: '📡 Sensors & Data Collection', desc: 'Our high-precision sensors continuously track...' },
  { title: '📊 AI-Powered Insights', desc: 'Advanced machine learning models analyze data...' },
  { title: '🛠 Predictive Maintenance', desc: 'Proactive monitoring helps schedule maintenance...' },
  { title: '🌉 Structural Analysis', desc: 'Real-time models assess bridge and building integrity...' },
  { title: '⚡ Instant Alerts', desc: 'Automatic notifications for anomalies or safety hazards...' },
  { title: '📈 Long-Term Trends', desc: 'Track structural performance over years for better planning...' },
];

export default function FeatureSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  return (
    <Box maxW="1200px" mx="auto" px={4}>
      <Slider {...settings}>
        {cardData.map((item, idx) => (
          <Box
            key={idx}
            p={{ base: 4, md: 6 }}
            borderRadius="md"
            bg="rgba(255,255,255,0.85)"
            shadow="md"
            textAlign="center"
            mx={2}
          >
            <Heading
              size="md"
              mb={2}
              fontFamily="'Poppins', sans-serif"
              fontWeight="bold"
            >
              {item.title}
            </Heading>
            <Text fontFamily="'Poppins', sans-serif">{item.desc}</Text>
          </Box>
        ))}
      </Slider>
    </Box>
  );
}
