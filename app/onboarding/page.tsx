"use client";
import React, { useState } from "react";
import {
  Container,
  Card,
  CardBody,
  CardHeader,
  Heading,
} from "@chakra-ui/react";

import UserStepForm from "@/components/onboarding/UserStepForm";
import { User } from "@/types";

const Onboarding = () => {
  const [step, setStep] = useState(1);

  const onSubmitUserForm = (values: User) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setStep(2);
    }, 1000);
  };

  return (
    <Container maxW="lg">
      <Heading size="xs" mt={8} textAlign="center">
        Step {step} of 5
      </Heading>
      <Card mt={28}>
        <CardHeader>
          <Heading size="lg" textAlign="center">
            Onboarding form
          </Heading>
        </CardHeader>
        <CardBody>
          {step === 1 ? <UserStepForm onSubmit={onSubmitUserForm} /> : null}
        </CardBody>
      </Card>
    </Container>
  );
};

export default Onboarding;
