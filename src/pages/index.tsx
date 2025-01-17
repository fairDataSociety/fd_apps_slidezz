import { useColors } from 'catppuccin-chakra-ui-theme'
import { motion } from 'framer-motion'
import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import NextLink from 'next/link'
import React from 'react'

import {
  Box,
  Button,
  Container,
  Heading,
  Highlight,
  Stack,
  Text,
  TextProps,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react'

import {
  CONTAINER_VARIANTS,
  TEXT_UNDERLINE_VRIANTS,
  TEXT_VARIANTS,
  WAVE_VARIANTS,
} from '../animations'
import '../components/AppUI'
import Navbar from '../components/Navbar'
import Wave from '../components/Svg/Wave'

const AppUI = dynamic(() => import('../components/AppUI'), { ssr: false })

const Home: NextPage = () => {
  const { rosewater, overlay0, overlay1, surface2 } = useColors()

  return (
    <Box position="relative" minH="100vh">
      <Navbar />
      <Container mt={{ base: '3rem', lg: '7rem' }} maxW="container.xl">
        <Stack
          h="full"
          direction={{ base: 'column', lg: 'row' }}
          align="flex-start"
          justify="center"
          gap={8}
        >
          <VStack
            as={motion.div}
            variants={CONTAINER_VARIANTS}
            initial="hide"
            animate="show"
            pt={5}
            align="flex-start"
            gap={4}
          >
            <Heading fontSize={{ base: '4xl', md: '6xl' }}>
              <TextWithUnderline as="span">Make</TextWithUnderline>
              <br />
              <TextWithUnderline as="span">slideshows</TextWithUnderline>
            </Heading>

            <Box overflow="hidden">
              <Text as={motion.p} variants={TEXT_VARIANTS} variant="c-subtext0">
                <Highlight
                  query="Fairdrive"
                  styles={{
                    px: '2',
                    py: '1',
                    rounded: 'full',
                    color: useColorModeValue('gray.100', 'gray.800'),
                    bg: rosewater,
                  }}
                >
                  Slidezz lets you make slideshows and save/share them on
                  Fairdrive.
                </Highlight>
              </Text>
            </Box>

            <Box overflow="hidden">
              <NextLink
                href={`/slideshow${
                  process.env.NEXT_PUBLIC_IS_STATIC ? '.html' : ''
                }`}
              >
                <Button
                  as={motion.button}
                  variants={TEXT_VARIANTS}
                  size={{ base: 'sm', sm: 'md' }}
                >
                  Start presenting
                </Button>
              </NextLink>
            </Box>
            <Wave
              wave="wave1"
              fill={overlay0}
              variants={WAVE_VARIANTS}
              w="full"
              h="25rem"
              position="absolute"
              bottom={0}
              right={0}
              zIndex={-100}
            />
            <Wave
              wave="wave2"
              fill={overlay1}
              variants={WAVE_VARIANTS}
              w="full"
              h="12rem"
              position="absolute"
              bottom={0}
              right={0}
              zIndex={-100}
            />

            <Wave
              wave="wave3"
              fill={surface2}
              variants={WAVE_VARIANTS}
              w="full"
              h="8rem"
              position="absolute"
              bottom={0}
              right={0}
              zIndex={-100}
            />
          </VStack>

          <AppUI />
        </Stack>
      </Container>
    </Box>
  )
}

const TextWithUnderline: React.FC<
  { children: React.ReactNode } & TextProps
> = ({ children, ...props }) => {
  const { rosewater } = useColors()

  return (
    <Text position="relative" {...props}>
      {children}
      <Box
        as={motion.div}
        variants={TEXT_UNDERLINE_VRIANTS}
        bottom={0}
        left={0}
        position="absolute"
        h={{ base: '0.8rem', md: '1rem' }}
        zIndex={-1}
        background={rosewater}
      />
    </Text>
  )
}

export default Home
