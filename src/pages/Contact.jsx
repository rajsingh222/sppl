import React, { useState, useCallback } from "react";
import {
  Box,
  Flex,
  Text,
  Icon,
  VStack,
  SimpleGrid,
  Heading,
  Input,
  Textarea,
  Button,
  Checkbox,
  Link,
  useToast,
  useColorModeValue,
  FormControl,
  FormLabel,
  HStack,
  Image,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Tooltip,
  IconButton,
} from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
import { EmailIcon, PhoneIcon, SmallCloseIcon } from "@chakra-ui/icons";
import { FaMapMarkerAlt, FaFile, FaFacebook, FaTwitter, FaLinkedin, FaArrowUp } from "react-icons/fa";
import { motion } from "framer-motion";

const MotionVStack = motion(VStack);
const MotionBox = motion(Box);

export default function ContactPage() {
  const toast = useToast();
  const bgColor = useColorModeValue("gray.50", "gray.800");
  const cardBg = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.700", "gray.100");
  const accent = "blue.400";

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState([]);

  // Scroll-to-top visibility
  const [showScroll, setShowScroll] = useState(false);
  React.useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Dropzone configuration
  const onDrop = useCallback((acceptedFiles) => {
    const mapped = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: file.type.startsWith("image/")
          ? URL.createObjectURL(file)
          : null,
      })
    );
    setFiles((prev) => [...prev, ...mapped]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [], "application/pdf": [] },
    multiple: true,
  });

  // Remove file
  const removeFile = (name) => setFiles(files.filter((f) => f.name !== name));

  // Copy to clipboard
  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied!", description: text, status: "success", duration: 2000, isClosable: true });
    } catch {
      toast({ title: "Error", description: "Could not copy.", status: "error", duration: 2000, isClosable: true });
    }
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("message", message);
    files.forEach((f) => formData.append("attachments[]", f, f.name));

    fetch("https://spplindia.org/api/submit_contact.php", { method: "POST", body: formData })
      .then((res) => res.text())
      .then(() => {
        toast({ title: "Success", description: "Submitted successfully.", status: "success", duration: 3000, isClosable: true });
        setName(""); setEmail(""); setMessage(""); setFiles([]);
      })
      .catch(() => {
        toast({ title: "Error", description: "Submission failed.", status: "error", duration: 3000, isClosable: true });
      });
  };

  return (
    <Flex as="main" direction="column" align="center" bg={bgColor} p={6} w="100%" height='90vh' overflowY="auto">
      {/* Contact Info with Animations */}
      <SimpleGrid columns={[1, 1, 3]} spacing={8} w="full" maxW="1200px" pb={10} textAlign="center">
        {[
          { icon: EmailIcon, label: "Email Address", items: [
            { label: "ceo@spplindia.org", href: "mailto:ceo@spplindia.org" },
            { label: "hod-shm@spplindia.org", href: "mailto:hod-shm@spplindia.org" },
          ] },
          { icon: PhoneIcon, label: "Phone Number", items: [
            { label: "+91 70555 59999", onClick: () => handleCopy("+91 70555 59999") },
            { label: "+91 90139 99999", onClick: () => handleCopy("+91 90139 99999") },
          ] },
          { icon: FaMapMarkerAlt, label: "Our Address", items: [
            { label: "2-A-2A, Second Floor Research & Innovation Park IIT Delhi - 110016", onClick: () => handleCopy("2-A-2A, Second Floor Research & Innovation Park IIT Delhi - 110016, Delhi, India") },
            { label: "Delhi, India", onClick: () => handleCopy("2-A-2A, Second Floor Research & Innovation Park IIT Delhi - 110016, Delhi, India") },
          ] },
        ].map((card, i) => (
          <MotionVStack
            key={i}
            bg={cardBg} p={6} borderRadius="md" boxShadow="md"
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
          >
            <Icon as={card.icon} w={8} h={8} color={accent} />
            <Text fontWeight="bold" color={textColor}>{card.label}</Text>
            {card.items.map((it, idx) => (
              it.href ? (
                <Link key={idx} href={it.href} color={accent} _hover={{ textDecoration: 'underline' }}>{it.label}</Link>
              ) : (
                <Text key={idx} onClick={it.onClick} cursor="pointer" color={accent} _hover={{ textDecoration: 'underline' }}>{it.label}</Text>
              )
            ))}
          </MotionVStack>
        ))}
      </SimpleGrid>

      {/* Contact Form */}
      <Box bg={cardBg} w="full" maxW="800px" p={[6, 8]} borderRadius="md" boxShadow="md" mb={10}>
        <Heading as="h2" size="lg" textAlign="center" mb={2} color={textColor}>Contact Us</Heading>
        <Text textAlign="center" mb={8} color="gray.500">How Can We Help You?</Text>

        <Box as="form" onSubmit={handleSubmit}>
          <VStack spacing={5}>
            <Input placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} focusBorderColor={accent} bg="white" isRequired />
            <Input placeholder="Your Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} focusBorderColor={accent} bg="white" isRequired />
            <Textarea placeholder="Your Message" value={message} onChange={(e) => setMessage(e.target.value)} focusBorderColor={accent} bg="white" rows={6} isRequired />

            {/* Dropzone */}
            <FormControl w="full">
              <FormLabel>Attach Images and PDFs</FormLabel>
              <Box p={4} border="2px dashed" borderColor="gray.300" borderRadius="md" textAlign="center" cursor="pointer" {...getRootProps()}>
                <input {...getInputProps()} />
                <Text>{isDragActive ? 'Drop files here...' : 'Drag & drop, or click to select files'}</Text>
              </Box>
              {files.length > 0 && (
                <VStack mt={2} spacing={2} align="start">
                  {files.map((file) => (
                    <HStack key={file.name} p={2} borderWidth="1px" borderRadius="md" w="full" justifyContent="space-between">
                      <HStack>
                        {file.preview ? <Image src={file.preview} alt={file.name} boxSize="50px" objectFit="cover" /> : <Icon as={FaFile} boxSize="20px" />}
                        <Text fontSize="sm">{file.name}</Text>
                      </HStack>
                      <IconButton icon={<SmallCloseIcon />} variant="ghost" size="sm" colorScheme="red" onClick={() => removeFile(file.name)} />
                    </HStack>
                  ))}
                </VStack>
              )}
            </FormControl>

            <Checkbox colorScheme="blue" alignSelf="start" isRequired>I agree that my submitted data is being collected and stored</Checkbox>
            <Button type="submit" colorScheme="blue" size="md">Send Message</Button>
          </VStack>
        </Box>
      </Box>

      {/* FAQ Accordion */}
      <Box w="full" maxW="800px" mb={10}>
        <Accordion allowMultiple>
          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left">What is the response time?</Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>We aim to respond within 24–48 hours on business days.</AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left">Can I track my request?</Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>Yes, you will receive a tracking link in your email once your request is processed.</AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left">Do you offer support outside India?</Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>Currently, we provide support primarily within India but are expanding globally soon.</AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>

      {/* Social Media & Scroll Top */}
      <HStack spacing={4} mb={10}>
        <Tooltip label="Facebook"><Link href="#"><Icon as={FaFacebook} boxSize={6} /></Link></Tooltip>
        <Tooltip label="Twitter"><Link href="#"><Icon as={FaTwitter} boxSize={6} /></Link></Tooltip>
        <Tooltip label="LinkedIn"><Link href="https://www.linkedin.com/company/sanrachna-prahari-pvt-ltd"><Icon as={FaLinkedin} boxSize={6} /></Link></Tooltip>
      </HStack>

      {showScroll && (
        <IconButton position="fixed" bottom={8} right={8} icon={<FaArrowUp />} onClick={scrollToTop} colorScheme="blue" aria-label="Scroll to top" />
      )}
    </Flex>
  );
}
