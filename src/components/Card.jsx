// // src/components/BottomSlider.jsx
// import { Box, Image, Text, Flex } from "@chakra-ui/react";
// import { motion } from "framer-motion";

// const MotionBox = motion(Box);

// const slidingCards = [
//   {
//     img: "/images/bridge.jpg",
//     text: "Real-time structural monitoring for bridges"
//   },
//   {
//     img: "/images/tunnel.jpg",
//     text: "AI-powered tunnel inspection"
//   },
//   {
//     img: "/images/building.jpg",
//     text: "Predictive maintenance for high-rises"
//   },
//   {
//     img: "/images/dam.jpg",
//     text: "Seismic safety assessment for dams"
//   },
//   {
//     img: "/images/heritage.jpg",
//     text: "Preservation of heritage structures"
//   },
//   {
//     img: "/images/railway.jpg",
//     text: "Track and railway structure monitoring"
//   }
// ];

// export default function BottomSlider() {
//   return (
//     <Box
//       position="relative"
//       width="100%"
//       bg="whiteAlpha.900"
//       overflow="hidden"
//       py={3}
//       borderTop="1px solid rgba(0,0,0,0.1)"
//     >
//       <MotionBox
//         display="flex"
//         gap={6}
//         animate={{ x: ["100%", "-100%"] }}
//         transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
//       >
//         {[...slidingCards, ...slidingCards].map((card, idx) => (
//           <Flex
//             key={idx}
//             minW="250px"
//             bg="white"
//             borderRadius="lg"
//             shadow="md"
//             overflow="hidden"
//             flexDirection="column"
//             _hover={{ transform: "scale(1.02)" }}
//             transition="all 0.2s ease"
//           >
//             <Image
//               src={card.img}
//               alt={card.text}
//               objectFit="cover"
//               height="140px"
//               width="100%"
//             />
//             <Box p={3}>
//               <Text fontSize="sm" fontWeight="medium" noOfLines={2}>
//                 {card.text}
//               </Text>
//             </Box>
//           </Flex>
//         ))}
//       </MotionBox>
//     </Box>
//   );
// }
// import React, { useState, useEffect } from "react";
// import "./BottomSlider.css";

// const slidingCards = [
//   { img: "/p1.avif", text: "Real-time structural monitoring for bridges" },
//   { img: "/p1.webp", text: "AI-powered tunnel inspection" },
//   { img: "/p2.avif", text: "Predictive maintenance for high-rises" },
//   { img: "/p3.avif", text: "Seismic safety assessment for dams" },
//   { img: "/p4.avif", text: "Preservation of heritage structures" },
//   { img: "/p3.avif", text: "Track and railway structure monitoring" }
// ];

// export default function BottomSlider() {
//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIndex((prev) => (prev + 1) % slidingCards.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   const visibleCards = [
//     slidingCards[index],
//     slidingCards[(index + 1) % slidingCards.length],
//     slidingCards[(index + 2) % slidingCards.length]
//   ];

//   return (
//     <div className="slider-container">
//       {visibleCards.map((card, idx) => (
//         <div key={idx} className="card">
//           <div className="image-container">
//             <img src={card.img} alt={card.text} />
//           </div>
//           <p>{card.text}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import "./BottomSlider.css";

const slidingCards = [
  { img: "/images/p1.avif", text: "Our high-precision sensors continuously track vibrations, stress, and temperature changes." },
  { img: "/images/p1.webp", text: "Advanced machine learning models analyze data in real-time to detect anomalies." },
  { img: "/images/p2.avif", text: "Proactive monitoring helps schedule maintenance before major failures occur." },
  { img: "/images/p3.avif", text: "Seismic safety assessment for dams" },
  { img: "/images/p4.avif", text: "Preservation of heritage structures" },
  { img: "/images/p3.avif", text: "Track and railway structure monitoring" }
];

export default function BottomSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slidingCards.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const visibleCards = [
    slidingCards[index],
    slidingCards[(index + 1) % slidingCards.length],
    slidingCards[(index + 2) % slidingCards.length]
  ];

  return (
    <div className="slider-container">
      {visibleCards.map((card, idx) => (
        <div key={idx} className="card">
          <div className="image-container">
            <img src={card.img} alt={card.text} />
          </div>
          <p>{card.text}</p>
        </div>
      ))}
    </div>
  );
}

