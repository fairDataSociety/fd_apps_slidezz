import {
  VStack,
  Heading,
  Text,
  useColorModeValue,
  FormControl,
  FormLabel,
  Input,
  Button,
  Link,
} from "@chakra-ui/react";

export default function Login() {
  return (
    <VStack gap={5}>
      <VStack gap={1}>
        <Heading fontSize="5xl">Please login</Heading>
        <Text variant="subtext">to import files from Fairdrive</Text>
      </VStack>

      <VStack
        bg={useColorModeValue("crust.50", "crust.700")}
        p={8}
        rounded="lg"
        boxShadow="lg"
        align="stretch"
        gap={3}
        w={{ base: "sm", md: "md", lg: "lg" }}
      >
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input />
        </FormControl>

        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input />
        </FormControl>

        <Button>Login</Button>
        <Text align="center" variant="subtext">
          Don't have an account?{" "}
          <Link
            color="rosewater.300"
            href="https://fairdrive.vercel.app/register"
            isExternal
          >
            Register
          </Link>
        </Text>
      </VStack>
    </VStack>
  );
}
