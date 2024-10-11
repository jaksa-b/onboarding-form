"use client";
import React, { useState } from "react";
import {
  Container,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Alert,
  AlertIcon,
  AlertDescription,
  Button,
} from "@chakra-ui/react";

import UserStepForm from "@/components/onboarding/UserStepForm";
import { Respose, User } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { saveUser } from "@/lib/api";
import { ArrowBackIcon, CheckCircleIcon } from "@chakra-ui/icons";
import Link from "next/link";

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [userFormError, setUserFormError] = useState("");

  const mutation = useMutation({
    mutationFn: saveUser,
    onSuccess: () => {
      setStep(2);
    },
    onError: (error: Respose) => {
      setUserFormError(error?.message);
    },
  });

  const onSubmitUserForm = async (values: User) => {
    mutation.mutate(values);
  };

  return (
    <Container maxW="lg">
      <Heading size="xs" mt={8} textAlign="center">
        Step {step} of 5
      </Heading>
      {step === 1 ? (
        <Card mt={28} mb={4}>
          <CardHeader>
            <Heading size="2xl" textAlign="center">
              Tell us about your business
            </Heading>
          </CardHeader>
          <CardBody>
            <UserStepForm onSubmit={onSubmitUserForm} />
            {userFormError ? (
              <Alert status="error" mt={2}>
                <AlertIcon />
                <AlertDescription>{userFormError}</AlertDescription>
              </Alert>
            ) : null}
          </CardBody>
        </Card>
      ) : null}
      {step === 2 ? (
        <Container textAlign="center">
          <Heading size="lg" mt={8} textAlign="center">
            Congratulations <CheckCircleIcon />
          </Heading>
          <Link href="/">
            <Button colorScheme="teal" mt={4} leftIcon={<ArrowBackIcon />}>
              back to home
            </Button>
          </Link>
        </Container>
      ) : null}
    </Container>
  );
};

export default Onboarding;
