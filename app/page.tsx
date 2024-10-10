import { Link } from "@chakra-ui/next-js";
import { Button, Container, Heading } from "@chakra-ui/react";

export default function Home() {
  return (
    <div>
      <main>
        <Container width="sm" mt={52}>
          <Heading size="2xl" p={4}>
            Welcome
          </Heading>
          <Link href="/onboarding">
            <Button colorScheme="teal" size="lg" width="100%">
              Start Your Journey
            </Button>
          </Link>
        </Container>
      </main>
    </div>
  );
}
