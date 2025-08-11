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




import React from 'react';
import { Box, Flex, Heading, Text, Button } from '@chakra-ui/react';


const HomePage = () => {
  return (
    <Box position="relative" width="100%" minHeight="100vh" overflow="hidden" bg="transparent">
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

      

      {/* Dark Overlay for better text visibility */}
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
      <Flex flex="1" direction="column" maxHeight="90vh" overflowY="auto" width="full">

        {/* Hero Section */}
        <Flex
          flex="1"
          direction={{ base: 'column', lg: 'row' }}
          p={{ base: 4, md: 6 }}
          align="center"
          justify="center"
          textAlign="center"
        >
          <Box
            maxW={{ base: '100%', md: '85%' }}
            minH={{ base: 'auto', md: '400px' }}
            p={{ base: 4, md: 6 }}
            bg="rgba(255, 255, 255, 0.7)"
            borderRadius="md"
            shadow="md"
            color="black"
          >

<Heading
  size={{ base: 'lg', md: '2xl' }}
  mb={4}
  fontFamily="'Poppins', sans-serif"
  fontWeight="extrabold"
  justify="center"
  marginTop={20}
  color="#ffc813ff" // Mustard yellow
  textTransform="uppercase"
  textShadow="1px 1px 4px rgba(0, 0, 0, 0.6)"
>
  Sanrachna Prahari Pvt. Ltd
</Heading>

            <Text
  fontFamily="'Poppins', sans-serif"
  fontWeight="bold"
  fontSize={{ base: 'md', md: 'lg' }}
  color="black"
  mb={4}
>
  Ensuring Structural Integrity, Safety & Longevity
</Text>
            {/* <Button mt={4} colorScheme="yellow" size={{ base: 'md', md: 'lg' }}>
              Get Started
            </Button> */}

            <Flex mt={6} gap={4} justify="center" flexWrap="wrap">
  <Button
    size={{ base: 'md', md: 'lg' }}
    bg="yellow.400"
    _hover={{ bg: 'yellow.500', transform: 'scale(1.05)' }}
    color="black"
    fontWeight="bold"
    shadow="lg"
    transition="all 0.2s"
  >
    Get Started
  </Button>

  <Button
    size={{ base: 'md', md: 'lg' }}
    bg="black"
    _hover={{ bg: 'gray.800', transform: 'scale(1.05)' }}
    color="white"
    fontWeight="bold"
    shadow="lg"
    transition="all 0.2s"
  >
    Learn More
  </Button>
</Flex>


             
          </Box>
        </Flex>

        {/* <TypewriterParagraph */}

        {/* How It Works */}
        <Box py={{ base: 6, md: 10 }} textAlign="center">
          {/* <Heading size={{ base: 'md', md: 'lg' }} mb={6}>
            How Structural Health Monitoring Works
          </Heading> */}

          <Heading
  size={{ base: 'md', md: 'lg' }}
  mb={6}
  fontFamily="'Poppins', sans-serif"
  fontWeight="bold"
  color="#b58900" // Dark mustard yellow
  textShadow="1px 1px 3px rgba(0, 0, 0, 0.6)"
>
  How Structural Health Monitoring Works
</Heading>

          <Flex wrap="wrap" justify="center" maxW="1200px" mx="auto" gap={6}>
            {[
              { title: '📡 Sensors & Data Collection', desc: 'Our high-precision sensors continuously track...' },
              { title: '📊 AI-Powered Insights', desc: 'Advanced machine learning models analyze data...' },
              { title: '🛠 Predictive Maintenance', desc: 'Proactive monitoring helps schedule maintenance...' },
            ].map((item, idx) => (
              <Box
                key={idx}
                p={{ base: 4, md: 6 }}
                borderRadius="md"
                bg="rgba(255,255,255,0.85)"
                shadow="md"
                textAlign="center"
                w={{ base: '100%', sm: '300px' }}
              >
                <Heading size="md" mb={2}>{item.title}</Heading>
                <Text>{item.desc}</Text>
              </Box>
            ))}
          </Flex>

        

        </Box>
        

        {/* Why Choose Us */}
        <Box py={{ base: 6, md: 10 }} bg="rgba(240,240,240,0.85)" textAlign="center">
          <Heading size={{ base: 'md', md: 'lg' }} mb={6}>
            Why Choose Our SHM Solutions?
          </Heading>
          <Flex wrap="wrap" justify="center" maxW="1200px" mx="auto" gap={6}>
            {[
              { title: '🚀 Real-Time Alerts', desc: 'Instant notifications about critical changes...' },
              { title: '📈 Data-Driven Decisions', desc: 'Make informed decisions based on AI-powered reports.' },
              { title: '🔧 Cost-Effective Solutions', desc: 'Reduce repair costs by detecting potential failures early.' },
            ].map((item, idx) => (
              <Box
                key={idx}
                p={{ base: 4, md: 6 }}
                borderRadius="md"
                bg="rgba(255,255,255,0.85)"
                shadow="md"
                w={{ base: '100%', sm: '300px' }}
              >
                <Heading size="md" mb={2}>{item.title}</Heading>
                <Text>{item.desc}</Text>
              </Box>
            ))}
          </Flex>
        </Box>

        {/* Case Studies */}
        <Box py={{ base: 6, md: 10 }} textAlign="center">
          <Heading size={{ base: 'md', md: 'lg' }} mb={6}>Real-World Impact</Heading>
          <Flex wrap="wrap" justify="center" maxW="1200px" mx="auto" gap={6}>
            {[
              { title: '🏗 Bridges', desc: 'Our SHM system detected early corrosion signs...' },
              { title: '🏢 High-Rise Buildings', desc: 'Monitored structural stress during an earthquake...' },
              { title: '🚄 Railways', desc: 'Detected cracks in railway tracks before they led to accidents.' },
            ].map((item, idx) => (
              <Box
                key={idx}
                p={{ base: 4, md: 6 }}
                borderRadius="md"
                bg="rgba(255,255,255,0.85)"
                shadow="md"
                w={{ base: '100%', sm: '300px' }}
              >
                <Heading size="md" mb={2}>{item.title}</Heading>
                <Text>{item.desc}</Text>
              </Box>
            ))}
          </Flex>
        </Box>

        {/* Call to Action */}
        <Box py={{ base: 6, md: 10 }} bg="rgba(72,187,120,0.9)" color="white" textAlign="center" borderRadius="md">
          <Heading size={{ base: 'md', md: 'lg' }} mb={4}>Secure Your Infrastructure Today</Heading>
          <Text fontSize={{ base: 'md', md: 'lg' }} mb={4}>
            Get in touch to deploy our advanced SHM technology and protect your assets.
          </Text>
          <Button size={{ base: 'md', md: 'lg' }} colorScheme="whiteAlpha">Contact Us</Button>
        </Box>

      </Flex>
    </Box>
  );
};

export default HomePage;

