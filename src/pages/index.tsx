import type { NextPage } from 'next'
import {
  Heading,
  Text,
  Stack,
  VStack,
  Box,
  HStack,
  Image,
  useColorModeValue,
  Container,
  Button,
  chakra,
} from '@chakra-ui/react'
import Layout from '../components/Layout/Layout'
import NextLink from 'next/link'
import { isValidMotionProp, motion } from 'framer-motion'
import React from 'react'

const Home: NextPage = () => {
  return (
    <Layout>
      <Container mt={{ base: '3rem', lg: '7rem' }} maxW="container.xl">
        <Stack
          h="full"
          direction={{ base: 'column', lg: 'row' }}
          align="flex-start"
          justify="center"
          gap={5}
        >
          <VStack pt={5} align="flex-start" gap={4}>
            <Heading fontSize={{ base: '4xl', md: '6xl' }}>
              <AnimatedText>Make</AnimatedText>{' '}
              <AnimatedText delay={0.7}>slideshows</AnimatedText>
            </Heading>

            <Text variant="subtext">
              Slidezz let you make slideshows and save/share them on Fairdrive
            </Text>

            <NextLink href="/slideshow">
              <Button>Start presenting</Button>
            </NextLink>
          </VStack>

          <Box
            w={{ base: 'full', md: '90%' }}
            bg={useColorModeValue('latte-crust', 'frappe-crust')}
            rounded="md"
            boxShadow="lg"
          >
            <HStack p={2}>
              <Box
                w="0.5rem"
                h="0.5rem"
                rounded="full"
                bg={useColorModeValue('latte-subtext0', 'frappe-subtext0')}
              ></Box>
              <Box
                w="0.5rem"
                h="0.5rem"
                rounded="full"
                bg={useColorModeValue('latte-subtext0', 'frappe-subtext0')}
              ></Box>
              <Box
                w="0.5rem"
                h="0.5rem"
                rounded="full"
                bg={useColorModeValue('latte-subtext0', 'frappe-subtext0')}
              ></Box>
            </HStack>

            <Box w="full" px={2} py={2}>
              <Image
                alt="app screenshot"
                w="98%"
                mx="auto"
                h="full"
                objectFit="contain"
                src="/images/app-screenshot.png"
              />
            </Box>
          </Box>
        </Stack>
      </Container>
    </Layout>
  )
}

const FramerBox = chakra(motion.div, {
  shouldForwardProp: isValidMotionProp,
})

const AnimatedText = ({
  children,
  delay = 0,
  duration = 0.7,
}: {
  children: React.ReactNode
  delay?: number
  duration?: number
}) => {
  return (
    <Text as="span" position="relative">
      {children}
      <FramerBox
        initial={{ width: '0%' }}
        animate={{
          width: '100%',
          transition: {
            duration: duration,
            delay: delay,
          },
        }}
        bottom={0}
        left={0}
        position="absolute"
        h={{ base: '0.8rem', md: '1rem' }}
        zIndex={-1}
        background={useColorModeValue('latte-rosewater', 'frappe-rosewater')}
      />
    </Text>
  )
}

export default Home
