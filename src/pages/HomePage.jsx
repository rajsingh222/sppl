// import React from 'react';
// import { Box, Flex, Heading, Text, Button, useColorModeValue, VStack } from '@chakra-ui/react';

// const HomePage = () => {
//   const bg = useColorModeValue('gray.50', 'gray.800');

//   return (
//     <Flex flex="1" direction="column" bg={"FFFDD0"} maxHeight={"90vh"} overflowY={"auto"} width={"full"}>
//       {/* Hero Section */}
//       <Flex
//         flex="1"
//         direction={{ base: 'column', lg: 'row' }}
//         p={6}
//         bgPosition="center"
//         align="center"
//         justify="center"
//         textAlign="center"
//         color="white"
//       >
//         <Box maxW="85%" height="400px" p={6} bg="rgba(255, 255, 255, 0.6)" borderRadius="md" shadow="md" color="black">
//           <Heading size="xl" mb={4}>Ensuring Structural Integrity, Safety & Longevity</Heading>
//           <Text fontSize="lg">
//           At Sanrachna Prahari Pvt. Ltd, we are pioneering the future of 
//           Health Monitoring (SHM) in India. Specializing in cutting-edge technologies for 
//           assessing and maintaining the integrity of all civil infrastructure, especially 
//           bridges and buildings, we offer comprehensive solutions designed to ensure the
//            longevity and safety of critical structures. From high-rise buildings and heritage
//             monuments to industrial plants and transportation networks, our mission is
//              to revolutionize infrastructure management through innovation, research, and
//               expert training. Incubated in Foundation for Innovation & Technology Transfer 
//               (FITT), IIT Delhi, Sanrachna Prahari has distinguished faculty of IIT Delhi, as part of the core team.
//           </Text>
//           <Button mt={4} colorScheme="green" size="lg">
            
//             Get Started
//           </Button>
//         </Box>
//       </Flex>

//       {/* Section: How It Works */}
//       <Box py={10} textAlign="center">
//         <Heading size="lg" mb={6}>How Structural Health Monitoring Works</Heading>
//         <Flex wrap="wrap" justify="center" maxW="1200px" mx="auto" gap={6}>
//           <Box p={6} borderRadius="md" bg="white" shadow="md" textAlign="center" w="300px">
//             <Heading size="md" mb={2}>📡 Sensors & Data Collection</Heading>
//             <Text>Our high-precision sensors continuously track vibrations, stress, and temperature changes.</Text>
//           </Box>
//           <Box p={6} borderRadius="md" bg="white" shadow="md" textAlign="center" w="300px">
//             <Heading size="md" mb={2}>📊 AI-Powered Insights</Heading>
//             <Text>Advanced machine learning models analyze data in real-time to detect anomalies.</Text>
//           </Box>
//           <Box p={6} borderRadius="md" bg="white" shadow="md" textAlign="center" w="300px">
//             <Heading size="md" mb={2}>🛠 Predictive Maintenance</Heading>
//             <Text>Proactive monitoring helps schedule maintenance before major failures occur.</Text>
//           </Box>
//         </Flex>
//       </Box>

//       {/* Section: Why Choose Us */}
//       <Box py={10} bg="gray.100" textAlign="center">
//         <Heading size="lg" mb={6}>Why Choose Our SHM Solutions?</Heading>
//         <Flex wrap="wrap" justify="center" maxW="1200px" mx="auto" gap={6}>
//           <Box p={6} borderRadius="md" bg="white" shadow="md" w="300px">
//             <Heading size="md" mb={2}>🚀 Real-Time Alerts</Heading>
//             <Text>Instant notifications about critical changes in structure integrity.</Text>
//           </Box>
//           <Box p={6} borderRadius="md" bg="white" shadow="md" w="300px">
//             <Heading size="md" mb={2}>📈 Data-Driven Decisions</Heading>
//             <Text>Make informed decisions based on AI-powered reports.</Text>
//           </Box>
//           <Box p={6} borderRadius="md" bg="white" shadow="md" w="300px">
//             <Heading size="md" mb={2}>🔧 Cost-Effective Solutions</Heading>
//             <Text>Reduce repair costs by detecting potential failures early.</Text>
//           </Box>
//         </Flex>
//       </Box>

//       {/* Section: Case Studies */}
//       <Box py={10} textAlign="center">
//         <Heading size="lg" mb={6}>Real-World Impact</Heading>
//         <Flex wrap="wrap" justify="center" maxW="1200px" mx="auto" gap={6}>
//           <Box p={6} borderRadius="md" bg="white" shadow="md" w="300px">
//             <Heading size="md" mb={2}>🏗 Bridges</Heading>
//             <Text>Our SHM system detected early corrosion signs, preventing a major collapse.</Text>
//           </Box>
//           <Box p={6} borderRadius="md" bg="white" shadow="md" w="300px">
//             <Heading size="md" mb={2}>🏢 High-Rise Buildings</Heading>
//             <Text>Monitored structural stress during an earthquake, ensuring safety.</Text>
//           </Box>
//           <Box p={6} borderRadius="md" bg="white" shadow="md" w="300px">
//             <Heading size="md" mb={2}>🚄 Railways</Heading>
//             <Text>Detected cracks in railway tracks before they led to accidents.</Text>
//           </Box>
//         </Flex>
//       </Box>

//       {/* Section: Call to Action */}
//       <Box py={10} bg="green.300" color="white" textAlign="center" borderRadius="md">
//         <Heading size="lg" mb={4}>Secure Your Infrastructure Today</Heading>
//         <Text fontSize="lg" mb={4}>
//           Get in touch to deploy our advanced SHM technology and protect your assets.
//         </Text>
//         <Button size="lg" colorScheme="whiteAlpha">Contact Us</Button>
//       </Box>
//     </Flex>
//   );
// };

// export default HomePage;


// import React from 'react';
// import { Box, Flex, Heading, Text, Button, useColorModeValue } from '@chakra-ui/react';

// const HomePage = () => {
//   const bg = useColorModeValue('gray.50', 'gray.800');

//   return (
//     <Flex flex="1" direction="column" bg="#FFFDD0" maxHeight="90vh" overflowY="auto" width="full">
      
//       {/* Hero Section */}
//       <Flex
//         flex="1"
//         direction={{ base: 'column', lg: 'row' }}
//         p={{ base: 4, md: 6 }}
//         align="center"
//         justify="center"
//         textAlign="center"
//       >
//         <Box
//           maxW={{ base: '100%', md: '85%' }}
//           minH={{ base: 'auto', md: '400px' }}
//           p={{ base: 4, md: 6 }}
//           bg="rgba(255, 255, 255, 0.6)"
//           borderRadius="md"
//           shadow="md"
//           color="black"
//         >
//           <Heading size={{ base: 'lg', md: 'xl' }} mb={4}>
//             Ensuring Structural Integrity, Safety & Longevity
//           </Heading>
//           <Text fontSize={{ base: 'md', md: 'lg' }}>
//            At Sanrachna Prahari Pvt. Ltd, we are pioneering the future of 
//       Health Monitoring (SHM) in India. Specializing in cutting-edge technologies for 
//       assessing and maintaining the integrity of all civil infrastructure, especially 
//        bridges and buildings, we offer comprehensive solutions designed to ensure the
//         longevity and safety of critical structures. From high-rise buildings and heritage
//          monuments to industrial plants and transportation networks, our mission is
//            to revolutionize infrastructure management through innovation, research, and
//              expert training. Incubated in Foundation for Innovation & Technology Transfer 
//              (FITT), IIT Delhi, Sanrachna Prahari has distinguished faculty of IIT Delhi, as part of the core team.
//           </Text>
//           <Button mt={4} colorScheme="green" size={{ base: 'md', md: 'lg' }}>
//             Get Started
//           </Button>
//         </Box>
//       </Flex>

//       {/* How It Works */}
//       <Box py={{ base: 6, md: 10 }} textAlign="center">
//         <Heading size={{ base: 'md', md: 'lg' }} mb={6}>
//           How Structural Health Monitoring Works
//         </Heading>
//         <Flex wrap="wrap" justify="center" maxW="1200px" mx="auto" gap={6}>
//           {[
//             { title: '📡 Sensors & Data Collection', desc: 'Our high-precision sensors continuously track...' },
//             { title: '📊 AI-Powered Insights', desc: 'Advanced machine learning models analyze data...' },
//             { title: '🛠 Predictive Maintenance', desc: 'Proactive monitoring helps schedule maintenance...' },
//           ].map((item, idx) => (
//             <Box
//               key={idx}
//               p={{ base: 4, md: 6 }}
//               borderRadius="md"
//               bg="white"
//               shadow="md"
//               textAlign="center"
//               w={{ base: '100%', sm: '300px' }}
//             >
//               <Heading size="md" mb={2}>{item.title}</Heading>
//               <Text>{item.desc}</Text>
//             </Box>
//           ))}
//         </Flex>
//       </Box>

//       {/* Why Choose Us */}
//       <Box py={{ base: 6, md: 10 }} bg="gray.100" textAlign="center">
//         <Heading size={{ base: 'md', md: 'lg' }} mb={6}>
//           Why Choose Our SHM Solutions?
//         </Heading>
//         <Flex wrap="wrap" justify="center" maxW="1200px" mx="auto" gap={6}>
//           {[
//             { title: '🚀 Real-Time Alerts', desc: 'Instant notifications about critical changes...' },
//             { title: '📈 Data-Driven Decisions', desc: 'Make informed decisions based on AI-powered reports.' },
//             { title: '🔧 Cost-Effective Solutions', desc: 'Reduce repair costs by detecting potential failures early.' },
//           ].map((item, idx) => (
//             <Box
//               key={idx}
//               p={{ base: 4, md: 6 }}
//               borderRadius="md"
//               bg="white"
//               shadow="md"
//               w={{ base: '100%', sm: '300px' }}
//             >
//               <Heading size="md" mb={2}>{item.title}</Heading>
//               <Text>{item.desc}</Text>
//             </Box>
//           ))}
//         </Flex>
//       </Box>

//       {/* Case Studies */}
//       <Box py={{ base: 6, md: 10 }} textAlign="center">
//         <Heading size={{ base: 'md', md: 'lg' }} mb={6}>Real-World Impact</Heading>
//         <Flex wrap="wrap" justify="center" maxW="1200px" mx="auto" gap={6}>
//           {[
//             { title: '🏗 Bridges', desc: 'Our SHM system detected early corrosion signs...' },
//             { title: '🏢 High-Rise Buildings', desc: 'Monitored structural stress during an earthquake...' },
//             { title: '🚄 Railways', desc: 'Detected cracks in railway tracks before they led to accidents.' },
//           ].map((item, idx) => (
//             <Box
//               key={idx}
//               p={{ base: 4, md: 6 }}
//               borderRadius="md"
//               bg="white"
//               shadow="md"
//               w={{ base: '100%', sm: '300px' }}
//             >
//               <Heading size="md" mb={2}>{item.title}</Heading>
//               <Text>{item.desc}</Text>
//             </Box>
//           ))}
//         </Flex>
//       </Box>

//       {/* Call to Action */}
//       <Box py={{ base: 6, md: 10 }} bg="green.300" color="white" textAlign="center" borderRadius="md">
//         <Heading size={{ base: 'md', md: 'lg' }} mb={4}>Secure Your Infrastructure Today</Heading>
//         <Text fontSize={{ base: 'md', md: 'lg' }} mb={4}>
//           Get in touch to deploy our advanced SHM technology and protect your assets.
//         </Text>
//         <Button size={{ base: 'md', md: 'lg' }} colorScheme="whiteAlpha">Contact Us</Button>
//       </Box>

//     </Flex>
//   );
// };

// export default HomePage;



// import React from 'react';
// import { Box, Flex, Heading, Text, Button, useColorModeValue } from '@chakra-ui/react';

// const HomePage = () => {
//   const bg = useColorModeValue('gray.50', 'gray.800');

//   return (
//     <Box position="relative" width="100%" minHeight="100vh" overflow="hidden">
//       {/* Background Video */}
//       <video
//         autoPlay
//         loop
//         muted
//         playsInline
//         style={{
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           minWidth: '100%',
//           minHeight: '100%',
//           objectFit: 'cover',
//           zIndex: -1,
//           opacity: 0.4, // Controls transparency
//         }}
//       >
//         <source src="/ProjectVideo/myvideo.mp4" type="video/mp4" />
//         Your browser does not support HTML5 video.
//       </video>

//       {/* Foreground Content */}
//       <Flex flex="1" direction="column" maxHeight="90vh" overflowY="auto" width="full">
        
//         {/* Hero Section */}
//         <Flex
//           flex="1"
//           direction={{ base: 'column', lg: 'row' }}
//           p={{ base: 4, md: 6 }}
//           align="center"
//           justify="center"
//           textAlign="center"
//         >
//           <Box
//             maxW={{ base: '100%', md: '85%' }}
//             minH={{ base: 'auto', md: '400px' }}
//             p={{ base: 4, md: 6 }}
//             bg="rgba(255, 255, 255, 0.6)"
//             borderRadius="md"
//             shadow="md"
//             color="black"
//           >
//             <Heading size={{ base: 'lg', md: 'xl' }} mb={4}>
//               Ensuring Structural Integrity, Safety & Longevity
//             </Heading>
//             <Text fontSize={{ base: 'md', md: 'lg' }}>
//               At Sanrachna Prahari Pvt. Ltd, we are pioneering the future of 
//               Structural Health Monitoring (SHM) in India. Specializing in cutting-edge technologies for 
//               assessing and maintaining the integrity of all civil infrastructure, especially 
//               bridges and buildings, we offer comprehensive solutions designed to ensure the
//               longevity and safety of critical structures. From high-rise buildings and heritage
//               monuments to industrial plants and transportation networks, our mission is
//               to revolutionize infrastructure management through innovation, research, and
//               expert training. Incubated in Foundation for Innovation & Technology Transfer 
//               (FITT), IIT Delhi, Sanrachna Prahari has distinguished faculty of IIT Delhi, as part of the core team.
//             </Text>
//             <Button mt={4} colorScheme="green" size={{ base: 'md', md: 'lg' }}>
//               Get Started
//             </Button>
//           </Box>
//         </Flex>

//         {/* How It Works */}
//         <Box py={{ base: 6, md: 10 }} textAlign="center">
//           <Heading size={{ base: 'md', md: 'lg' }} mb={6}>
//             How Structural Health Monitoring Works
//           </Heading>
//           <Flex wrap="wrap" justify="center" maxW="1200px" mx="auto" gap={6}>
//             {[
//               { title: '📡 Sensors & Data Collection', desc: 'Our high-precision sensors continuously track...' },
//               { title: '📊 AI-Powered Insights', desc: 'Advanced machine learning models analyze data...' },
//               { title: '🛠 Predictive Maintenance', desc: 'Proactive monitoring helps schedule maintenance...' },
//             ].map((item, idx) => (
//               <Box
//                 key={idx}
//                 p={{ base: 4, md: 6 }}
//                 borderRadius="md"
//                 bg="rgba(255,255,255,0.85)"
//                 shadow="md"
//                 textAlign="center"
//                 w={{ base: '100%', sm: '300px' }}
//               >
//                 <Heading size="md" mb={2}>{item.title}</Heading>
//                 <Text>{item.desc}</Text>
//               </Box>
//             ))}
//           </Flex>
//         </Box>

//         {/* Why Choose Us */}
//         <Box py={{ base: 6, md: 10 }} bg="rgba(240,240,240,0.85)" textAlign="center">
//           <Heading size={{ base: 'md', md: 'lg' }} mb={6}>
//             Why Choose Our SHM Solutions?
//           </Heading>
//           <Flex wrap="wrap" justify="center" maxW="1200px" mx="auto" gap={6}>
//             {[
//               { title: '🚀 Real-Time Alerts', desc: 'Instant notifications about critical changes...' },
//               { title: '📈 Data-Driven Decisions', desc: 'Make informed decisions based on AI-powered reports.' },
//               { title: '🔧 Cost-Effective Solutions', desc: 'Reduce repair costs by detecting potential failures early.' },
//             ].map((item, idx) => (
//               <Box
//                 key={idx}
//                 p={{ base: 4, md: 6 }}
//                 borderRadius="md"
//                 bg="rgba(255,255,255,0.85)"
//                 shadow="md"
//                 w={{ base: '100%', sm: '300px' }}
//               >
//                 <Heading size="md" mb={2}>{item.title}</Heading>
//                 <Text>{item.desc}</Text>
//               </Box>
//             ))}
//           </Flex>
//         </Box>

//         {/* Case Studies */}
//         <Box py={{ base: 6, md: 10 }} textAlign="center">
//           <Heading size={{ base: 'md', md: 'lg' }} mb={6}>Real-World Impact</Heading>
//           <Flex wrap="wrap" justify="center" maxW="1200px" mx="auto" gap={6}>
//             {[
//               { title: '🏗 Bridges', desc: 'Our SHM system detected early corrosion signs...' },
//               { title: '🏢 High-Rise Buildings', desc: 'Monitored structural stress during an earthquake...' },
//               { title: '🚄 Railways', desc: 'Detected cracks in railway tracks before they led to accidents.' },
//             ].map((item, idx) => (
//               <Box
//                 key={idx}
//                 p={{ base: 4, md: 6 }}
//                 borderRadius="md"
//                 bg="rgba(255,255,255,0.85)"
//                 shadow="md"
//                 w={{ base: '100%', sm: '300px' }}
//               >
//                 <Heading size="md" mb={2}>{item.title}</Heading>
//                 <Text>{item.desc}</Text>
//               </Box>
//             ))}
//           </Flex>
//         </Box>

//         {/* Call to Action */}
//         <Box py={{ base: 6, md: 10 }} bg="rgba(72,187,120,0.9)" color="white" textAlign="center" borderRadius="md">
//           <Heading size={{ base: 'md', md: 'lg' }} mb={4}>Secure Your Infrastructure Today</Heading>
//           <Text fontSize={{ base: 'md', md: 'lg' }} mb={4}>
//             Get in touch to deploy our advanced SHM technology and protect your assets.
//           </Text>
//           <Button size={{ base: 'md', md: 'lg' }} colorScheme="whiteAlpha">Contact Us</Button>
//         </Box>

//       </Flex>
//     </Box>
//   );
// };

// export default HomePage;




// import React from 'react';
// import BottomSlider from '../components/Card';
// import { Link as RouterLink } from 'react-router-dom';
// import { Box, Flex, Heading, Text, Button } from '@chakra-ui/react';
// import TypewriterText from '../components/TypeWriterText';


// const HomePage = () => {
//   return (
//     <Box position="relative" width="100%" minHeight="100vh" overflow="hidden" bg="transparent">
//       {/* Background Video */}
//       <video
//         autoPlay
//         loop
//         muted
//         playsInline
//         preload="auto"
//         style={{
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           width: '100%',
//           height: '100%',
//           objectFit: 'cover',
//           zIndex: -2,
//         }}
//       >
//         <source src="/ProjectVideo/my.mp4" type="video/mp4" />
//         Your browser does not support HTML5 video.
//       </video>

      

//       {/* Dark Overlay for better text visibility */}
//       <Box
//         position="fixed"
//         top={0}
//         left={0}
//         w="100%"
//         h="100%"
//         bg="rgba(0,0,0,0.4)"
//         zIndex={-1}
//       />

//       {/* Foreground Content */}
//       <Flex flex="1" direction="column" maxHeight="90vh" overflowY="auto" width="full">

//         {/* Hero Section */}
//         <Flex
//           flex="1"
//           direction={{ base: 'column', lg: 'row' }}
//           p={{ base: 4, md: 6 }}
//           align="center"
//           justify="center"
//           textAlign="center"
//         >
//           <Box
//             // maxW={{ base: '100%', md: '85%' }}
//             // minH={{ base: 'auto', md: '400px' }}
//             // p={{ base: 4, md: 6 }}
//             // bg="rgba(113, 88, 38, 0.95)"
//             // borderRadius="md"
//             // shadow="md"
            
//             // color="black"
//             maxW={{ base: '100%', md: '85%' }}
//   minH={{ base: 'auto', md: '400px' }}
//   p={{ base: 4, md: 6 }}
//   // bg="rgba(113, 88, 38, 0.65)" // reduced opacity from 0.95 to 0.65
//   borderRadius="md"
//   shadow="md"
//   backdropFilter="blur(2px)"   // slight blur so text is readable
//   color="black"
//           >

// <Heading
//   size={{ base: 'lg', md: '2xl' }}
//   mb={4}
//   fontFamily="'Poppins', sans-serif"
//   fontWeight="extrabold"
//   justify="center"
//   marginTop={20}
//   color="#ffc813ff" // Mustard yellow
//   textTransform="uppercase"
//   textShadow="1px 1px 4px rgba(0, 0, 0, 0.6)"
// >
//   Sanrachna Prahari Pvt Ltd
// </Heading>

//             <Text
//   fontFamily="'Poppins', sans-serif"
//   fontWeight="bold"
//   fontSize={{ base: 'md', md: 'lg' }}
//   color="white"
//   textShadow="1px 1px 3px rgba(0, 0, 0, 1)"
//   mb={4}
// >
//   Ensuring Structural Integrity, Safety & Longevity
// </Text>
//             {/* <Button mt={4} colorScheme="yellow" size={{ base: 'md', md: 'lg' }}>
//               Get Started
//             </Button> */}

//             <Flex mt={6} gap={4} justify="center" flexWrap="wrap">
//   {/* <Button
//     size={{ base: 'md', md: 'lg' }}
//     bg="yellow.400"
//     _hover={{ bg: 'yellow.500', transform: 'scale(1.05)' }}
//     color="black"
//     fontWeight="bold"
//     shadow="lg"
//     transition="all 0.2s"
//   >
//     Get Started
//   </Button> */}

//    <Button
//       as={RouterLink}
//       to="/Project"
//       size={{ base: 'md', md: 'lg' }}
//       position="relative"
//       overflow="hidden"
//       bgGradient="linear(to-r, yellow.400, yellow.500)"
//       color="black"
//       fontWeight="bold"
//       shadow="lg"
//       transition="all 0.3s ease"
//       _hover={{
//         transform: 'scale(1.05)',
//       }}
//       role="group"
//     >
//       {/* Sliding highlight effect */}
//       <Box
//         position="absolute"
//         top="0"
//         left="-100%"
//         w="100%"
//         h="100%"
//         bg="rgba(255, 255, 255, 0.3)"
//         transition="left 0.4s ease"
//         _groupHover={{ left: "0%" }}
//       />
//       Get Started
//     </Button>

//      <Button
//       size={{ base: 'md', md: 'lg' }}
//       position="relative"
//       overflow="hidden"
//       bg="black"
//       color="white"
//       fontWeight="bold"
//       shadow="lg"
//       transition="all 0.3s ease"
//       _hover={{
//         bg: 'gray.800',
//         transform: 'scale(1.05)',
//       }}
//       role="group"
//     >
//       {/* Sliding highlight effect */}
//       <Box
//         position="absolute"
//         top="0"
//         left="-100%"
//         w="100%"
//         h="100%"
//         bg="rgba(255, 255, 255, 0.15)"
//         transition="left 0.4s ease"
//         _groupHover={{ left: "0%" }}
//       />
//       Learn More
//     </Button>

//   {/* <Button
//     size={{ base: 'md', md: 'lg' }}
//     bg="black"
//     _hover={{ bg: 'gray.800', transform: 'scale(1.05)' }}
//     color="white"
//     fontWeight="bold"
//     shadow="lg"
//     transition="all 0.2s"
//   >
//     Learn More
//   </Button> */}
// </Flex>

// <div className="section-container">
//       <TypewriterText 
//         text="Att Sanrachna Prahari Pvt. Ltd, we are pioneering the future of Structural 
//         Health Monitoring (SHM) in India." 
//         speed={70} 
//       />
//     </div>
             
//           </Box>
//         </Flex>

//         {/* <TypewriterParagraph */}

//         {/* How It Works */}
//         <Box py={{ base: 6, md: 10 }} textAlign="center">
//           {/* <Heading size={{ base: 'md', md: 'lg' }} mb={6}>
//             How Structural Health Monitoring Works
//           </Heading> */}

//           <Heading
//   size={{ base: 'md', md: 'lg' }}
//   mb={6}
//   fontFamily="'Poppins', sans-serif"
//   fontWeight="bold"
//   color="#ffffffff" // Dark mustard yellow
//   textShadow="1px 1px 3px rgba(0, 0, 0, 1)"
// >

//   How Structural Health Monitoring Works
// </Heading>



// <Box mt={4}>
//         <BottomSlider />
//       </Box>

//           {/* <Flex wrap="wrap" justify="center" maxW="1200px" mx="auto" gap={6}>
//             {[
//               { title: '📡 Sensors & Data Collection', desc: 'Our high-precision sensors continuously track...' },
//               { title: '📊 AI-Powered Insights', desc: 'Advanced machine learning models analyze data...' },
//               { title: '🛠 Predictive Maintenance', desc: 'Proactive monitoring helps schedule maintenance...' },
//             ].map((item, idx) => (
//               <Box
//                 key={idx}
//                  p={{ base: 4, md: 6 }}
//                 borderRadius="md"
//                 bg="rgba(255,255,255,0.85)"
//                 shadow="md"
//                 textAlign="center"
//                 w={{ base: '100%', sm: '300px' }}
//                >
//                 <Heading size="md" mb={2}>{item.title}</Heading>
//                  <Text>{item.desc}</Text>
//                </Box>
//             ))}
//           </Flex> */}

          

        

//         </Box>

        
        

//         {/* Why Choose Us */}
//         {/* <Box py={{ base: 6, md: 10 }} bg="rgba(240,240,240,0.85)" textAlign="center">
//           <Heading size={{ base: 'md', md: 'lg' }} mb={6}>
//             Why Choose Our SHM Solutions?
//           </Heading>
//           <Flex wrap="wrap" justify="center" maxW="1200px" mx="auto" gap={6}>
//             {[
//               { title: '🚀 Real-Time Alerts', desc: 'Instant notifications about critical changes...' },
//               { title: '📈 Data-Driven Decisions', desc: 'Make informed decisions based on AI-powered reports.' },
//               { title: '🔧 Cost-Effective Solutions', desc: 'Reduce repair costs by detecting potential failures early.' },
//             ].map((item, idx) => (
//               <Box
//                 key={idx}
//                 p={{ base: 4, md: 6 }}
//                 borderRadius="md"
//                 bg="rgba(255,255,255,0.85)"
//                 shadow="md"
//                 w={{ base: '100%', sm: '300px' }}
//               >
//                 <Heading size="md" mb={2}>{item.title}</Heading>
//                 <Text>{item.desc}</Text>
//               </Box>
//             ))}
//           </Flex>
//         </Box> */}

//         {/* Case Studies */}
//         {/* <Box py={{ base: 6, md: 10 }} textAlign="center">
//           <Heading size={{ base: 'md', md: 'lg' }} mb={6}>Real-World Impact</Heading>
//           <Flex wrap="wrap" justify="center" maxW="1200px" mx="auto" gap={6}>
//             {[
//               { title: '🏗 Bridges', desc: 'Our SHM system detected early corrosion signs...' },
//               { title: '🏢 High-Rise Buildings', desc: 'Monitored structural stress during an earthquake...' },
//               { title: '🚄 Railways', desc: 'Detected cracks in railway tracks before they led to accidents.' },
//             ].map((item, idx) => (
//               <Box
//                 key={idx}
//                 p={{ base: 4, md: 6 }}
//                 borderRadius="md"
//                 bg="rgba(255,255,255,0.85)"
//                 shadow="md"
//                 w={{ base: '100%', sm: '300px' }}
//               >
//                 <Heading size="md" mb={2}>{item.title}</Heading>
//                 <Text>{item.desc}</Text>
//               </Box>
//             ))}
//           </Flex>
//         </Box> */}

//         {/* Call to Action */}
//         {/* <Box py={{ base: 6, md: 10 }} bg="rgba(72,187,120,0.9)" color="white" textAlign="center" borderRadius="md">
//           <Heading size={{ base: 'md', md: 'lg' }} mb={4}>Secure Your Infrastructure Today</Heading>
//           <Text fontSize={{ base: 'md', md: 'lg' }} mb={4}>
//             Get in touch to deploy our advanced SHM technology and protect your assets.
//           </Text>
//           <Button size={{ base: 'md', md: 'lg' }} colorScheme="whiteAlpha">Contact Us</Button>
//         </Box> */}

//       </Flex>
//     </Box>
//   );
// };

// export default HomePage;


import React from 'react';
import CustomCard from '../components/Card3';
import BottomSlider from '../components/Card';
import Footer from '../components/Footer';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Flex, Heading, Text, Button } from '@chakra-ui/react';
import TypewriterText from '../components/TypeWriterText';

const HomePage = () => {
  return (
    <Box
      position="relative"
      width="100%"
      height="100vh"        // Use full viewport height
      overflow="hidden"     // Hide any overflow on body
      bg="transparent"
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -2,
        }}
      >
        <source src="/ProjectVideo/my.mp4" type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>

      {/* Dark Overlay */}
      <Box
        position="fixed"
        top={0}
        left={0}
        w="100%"
        h="100%"
        bg="rgba(0,0,0,0.4)"
        zIndex={-1}
      />

      {/* Foreground Content */}
      <Flex
        direction="column"
        height="100%"        // Make flex take full height
        overflowY="auto"     // Single scrollbar on entire page
        width="100%"
      >
        {/* Hero Section */}
        <Flex
          direction={{ base: 'column', lg: 'row' }}
          p={{ base: 4, md: 6 }}
          align="center"
          justify="center"
          textAlign="center"
          flexShrink={0}       // Prevent shrinking
        >
          <Box
            maxW={{ base: '100%', md: '85%' }}
            minH={{ base: 'auto', md: '400px' }}
            p={{ base: 4, md: 6 }}
            borderRadius="md"
            shadow="md"
            backdropFilter="blur(2px)"
            color="black"
          >
            <Heading
              size={{ base: 'lg', md: '2xl' }}
              mb={4}
              fontFamily="'Poppins', sans-serif"
              fontWeight="extrabold"
              marginTop={20}
              color="#ffc813ff" // Mustard yellow
              textTransform="uppercase"
              textShadow="1px 1px 4px rgba(0, 0, 0, 0.6)"
              justify="center"
            >
              Sanrachna Prahari Pvt Ltd
            </Heading>

            <Text
              fontFamily="'Poppins', sans-serif"
              fontWeight="bold"
              fontSize={{ base: 'md', md: 'lg' }}
              color="white"
              textShadow="1px 1px 3px rgba(0, 0, 0, 1)"
              mb={4}
            >
              Ensuring Structural Integrity, Safety & Longevity
            </Text>

            <Flex mt={6} gap={4} justify="center" flexWrap="wrap">
              <Button
                as={RouterLink}
                to="/Project"
                size={{ base: 'md', md: 'lg' }}
                position="relative"
                overflow="hidden"
                bgGradient="linear(to-r, yellow.400, yellow.500)"
                color="black"
                fontWeight="bold"
                shadow="lg"
                transition="all 0.3s ease"
                _hover={{ transform: 'scale(1.05)' }}
                role="group"
              >
                <Box
                  position="absolute"
                  top="0"
                  left="-100%"
                  w="100%"
                  h="100%"
                  bg="rgba(255, 255, 255, 0.3)"
                  transition="left 0.4s ease"
                  _groupHover={{ left: '0%' }}
                />
                Get Started
              </Button>

              <Button
                size={{ base: 'md', md: 'lg' }}
                position="relative"
                overflow="hidden"
                bg="black"
                color="white"
                fontWeight="bold"
                shadow="lg"
                transition="all 0.3s ease"
                _hover={{ bg: 'gray.800', transform: 'scale(1.05)' }}
                role="group"
              >
                <Box
                  position="absolute"
                  top="0"
                  left="-100%"
                  w="100%"
                  h="100%"
                  bg="rgba(255, 255, 255, 0.15)"
                  transition="left 0.4s ease"
                  _groupHover={{ left: '0%' }}
                />
                Learn More
              </Button>
            </Flex>

            <Box className="section-container" mt={1}>
              <TypewriterText
                text="Att Sanrachna Prahari Pvt Ltd, we are pioneering the future of Structural Health Monitoring (SHM) in India."
                speed={70}
              />
            </Box>
          </Box>
        </Flex>

        {/* How It Works Section */}
        <Box py={{ base: 6, md: 5 }} textAlign="center" flex="1">
          <Heading
            size={{ base: 'md', md: 'lg' }}
            // mb={6}
            fontFamily="'Poppins', sans-serif"
            fontWeight="bold"
            color="#ffffffff"
            textShadow="1px 1px 3px rgba(0, 0, 0, 1)"
          >
            How Structural Health Monitoring Works
          </Heading>



          <Box mt={1}>
            <BottomSlider />
          </Box>
        </Box>

        <CustomCard/>

       


        <Box py={{ base: 6, md: 5 }} textAlign="center" flex="1">
          <Heading
            size={{ base: 'md', md: 'lg' }}
            // mb={6}
            fontFamily="'Poppins', sans-serif"
            fontWeight="bold"
            color="#ffffffff"
            textShadow="1px 1px 3px rgba(0, 0, 0, 1)"
          >
            Why Choose Our SHM Solutions?
          </Heading>

          <Box mt={1}>
            <BottomSlider />
          </Box>
        </Box>

         <Box py={{ base: 6, md: 5 }} textAlign="center" flex="1">
          <Heading
            size={{ base: 'md', md: 'lg' }}
            // mb={6}
            fontFamily="'Poppins', sans-serif"
            fontWeight="bold"
            color="#ffffffff"
            textShadow="1px 1px 3px rgba(0, 0, 0, 1)"
          >
            Real-World Impact
          </Heading>

          <Box mt={1}>
            <BottomSlider />
          </Box>
        </Box>


      <>
      <Footer/>

      <CustomCard/>
      
      </>
      </Flex>
    </Box>
  );
};

export default HomePage;

