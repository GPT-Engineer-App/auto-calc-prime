import React, { useState, useEffect } from "react";
import { ChakraProvider, Box, VStack, Heading, Text, Button, Input, useToast } from "@chakra-ui/react";
import { FaSync, FaClipboardList } from "react-icons/fa";
import { extendTheme } from "@chakra-ui/react";

// Theme customization
const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "gray.50",
        color: "gray.700",
      },
    },
  },
});

// Helper function to check if number is prime
const isPrime = (num) => {
  for (let i = 2, s = Math.sqrt(num); i <= s; i++) if (num % i === 0) return false;
  return num > 1;
};

// Helper function to generate Mersenne primes
const generateMersennePrimes = (limit) => {
  const primes = [];
  for (let i = 2; i <= limit; i++) {
    const mersenneCandidate = Math.pow(2, i) - 1;
    if (isPrime(mersenneCandidate)) {
      primes.push(mersenneCandidate);
    }
  }
  return primes;
};

const Index = () => {
  const [limit, setLimit] = useState(31); // Reasonable default to prevent excessive computation
  const [mersennePrimes, setMersennePrimes] = useState([]);
  const toast = useToast();

  useEffect(() => {
    // Generate initial set of Mersenne primes
    setMersennePrimes(generateMersennePrimes(limit));
  }, [limit]);

  const handleGenerate = () => {
    try {
      const primes = generateMersennePrimes(limit);
      setMersennePrimes(primes);
      toast({
        title: "Mersenne Primes Generated!",
        description: `Found ${primes.length} Mersenne primes.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while generating primes.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl" p={10}>
        <VStack spacing={8}>
          <Heading as="h1" size="2xl">
            Mersenne Prime Generator
          </Heading>
          <Text>
            Connect and collaborate to generate Mersenne primes. A Mersenne prime is a prime of the form 2<sup>p</sup>−1.
          </Text>
          <Input placeholder="Enter limit for prime generation" value={limit} onChange={(e) => setLimit(e.target.value)} type="number" min={3} max={31} />
          <Button leftIcon={<FaSync />} colorScheme="teal" onClick={handleGenerate}>
            Generate
          </Button>
          <Box as="pre" overflowX="auto" p={5} bg="white" boxShadow="md">
            {mersennePrimes.length > 0 ? (
              mersennePrimes.map((prime, index) => (
                <Text key={index} as="span" p={1} m={1} bg="gray.100" borderRadius="md">
                  {prime}
                </Text>
              ))
            ) : (
              <Text>No Mersenne primes generated yet.</Text>
            )}
          </Box>
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default Index;
