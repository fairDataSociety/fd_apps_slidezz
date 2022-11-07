import { isValidMotionProp, motion } from 'framer-motion'
import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import NextLink from 'next/link'
import React from 'react'

import {
  Button,
  Container,
  Heading,
  Stack,
  Text,
  VStack,
  chakra,
  useColorModeValue,
} from '@chakra-ui/react'

import Layout from '../components/Layout/Layout'

const AppUI = dynamic(() => import('../components/AppUI/AppUI'), { ssr: false })

const Home: NextPage = () => {
  return (
    <Layout>
      <Container mt={{ base: '3rem', lg: '7rem' }} maxW="container.xl">
        <Stack
          h="full"
          direction={{ base: 'column', lg: 'row' }}
          align="flex-start"
          justify="center"
          gap={8}
        >
          <VStack pt={5} align="flex-start" gap={4}>
            <Heading fontSize={{ base: '4xl', md: '6xl' }}>
              <AnimatedText>Make</AnimatedText>
              <br />
              <AnimatedText delay={0.7}>slideshows</AnimatedText>
            </Heading>

            <Text variant="subtext">
              Slidezz let you make slideshows and save/share them on Fairdrive
            </Text>

            <NextLink href="/slideshow">
              <Button size={{ base: 'sm', sm: 'md' }}>Start presenting</Button>
            </NextLink>
          </VStack>

          <AppUI />
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
