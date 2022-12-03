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
} from '../animations'
import Layout from '../components/Layout'
import useColors from '../hooks/useColors'

const AppUI = dynamic(() => import('../components/AppUI'), { ssr: false })

const Home: NextPage = () => {
  const { rosewater } = useColors()

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
              <Text as={motion.p} variants={TEXT_VARIANTS} variant="subtext">
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
              <NextLink href="/slideshow">
                <Button
                  as={motion.button}
                  variants={TEXT_VARIANTS}
                  size={{ base: 'sm', sm: 'md' }}
                >
                  Start presenting
                </Button>
              </NextLink>
            </Box>
          </VStack>

          <AppUI />
        </Stack>
      </Container>
    </Layout>
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
