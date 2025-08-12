import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Heading,
  Text,
  Button
} from "@chakra-ui/react";

export default function CustomCard() {
  return (
    <Card
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg="white"
      color="black"
      m="auto"
      mt={6}
      shadow="lg"
    >
      <Image
        src="/images/p1.avif"
        alt="Real-time structural monitoring for bridges"
        objectFit="cover"
        height="200px"
        width="100%"
      />

      <CardHeader>
        <Heading size="md">Real-time Structural Monitoring</Heading>
      </CardHeader>

      <CardBody>
        <Text>
          This system continuously monitors structural health and detects early
          warning signs to prevent catastrophic failures.
        </Text>
      </CardBody>

      <CardFooter gap={2}>
        <Button colorScheme="yellow">Buy now</Button>
        <Button variant="outline">Learn more</Button>
      </CardFooter>
    </Card>
  );
}
