import { useColors } from 'catppuccin-chakra-ui-theme'
import { Field, Formik, FormikErrors } from 'formik'
import { useAtomValue } from 'jotai'
import { useUpdateAtom } from 'jotai/utils'

import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react'

import { fairDriveLogin } from '../../fairdrive'
import { fdpAtom, userAtom } from '../../store'
import Navbar from '../Navbar'

interface LoginFormValues {
  username: string
  password: string
}

const LoginFormInitialValues: LoginFormValues = {
  username: '',
  password: '',
}

export default function Login() {
  const toast = useToast()
  const fdp = useAtomValue(fdpAtom)
  const setUser = useUpdateAtom(userAtom)
  const { crust } = useColors()

  const handleLogin = async (values: LoginFormValues) => {
    try {
      await fairDriveLogin(values.username, values.password, fdp)
      toast.closeAll()
      setUser({
        username: values.username,
        password: values.password,
      })
    } catch (error: any) {
      console.log(error)
      toast({
        title: 'Login failed',
        description: 'Please try again.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  }

  const handleValidation = (values: LoginFormValues) => {
    const errors: FormikErrors<LoginFormValues> = {}

    if (!values.username) {
      errors.username = 'username is required'
    }

    if (!values.password) {
      errors.password = 'password is required'
    }

    return errors
  }

  return (
    <>
      <Navbar />
      <Formik
        validateOnMount
        onSubmit={handleLogin}
        validate={handleValidation}
        initialValues={LoginFormInitialValues}
      >
        {({ handleSubmit, isValid, isSubmitting, errors, touched }) => (
          <Box mt={10}>
            <VStack gap={5}>
              <VStack gap={1}>
                <Heading fontSize="5xl">Please login</Heading>
                <Text variant="c-subtext0">to your Fairdrive account</Text>
              </VStack>

              <VStack
                bg={crust}
                p={8}
                rounded="lg"
                boxShadow="lg"
                align="stretch"
                gap={3}
                w={['xs', 'sm', 'md', 'lg']}
              >
                <FormControl
                  isRequired
                  isInvalid={touched.username && !!errors.username}
                >
                  <FormLabel>Username</FormLabel>
                  <Field as={Input} name="username" id="username" />
                  <FormErrorMessage>{errors.username}</FormErrorMessage>
                </FormControl>

                <FormControl
                  isRequired
                  isInvalid={touched.password && !!errors.password}
                >
                  <FormLabel>Password</FormLabel>
                  <Field
                    as={Input}
                    type="password"
                    name="password"
                    id="password"
                  />
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>

                <Button
                  isLoading={isSubmitting}
                  isDisabled={!isValid}
                  onClick={() => handleSubmit()}
                >
                  Login
                </Button>
                <Text align="center" variant="c-subtext0">
                  Don&apos;t have an account?{' '}
                  <Link href="https://fairdrive.vercel.app/register" isExternal>
                    Register
                  </Link>
                </Text>
              </VStack>
            </VStack>
          </Box>
        )}
      </Formik>
    </>
  )
}
