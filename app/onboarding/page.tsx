"use client";
import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Container,
  Grid,
  Card,
  CardBody,
  CardHeader,
  Heading,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { ArrowForwardIcon } from "@chakra-ui/icons";

const Onboarding = () => {
  const [input, setInput] = useState("");

  function validateName(value) {
    let error;
    if (!value) {
      error = "Name is required";
    } else if (value.toLowerCase() !== "naruto") {
      error = "Jeez! You're not a fan 😱";
    }
    return error;
  }

  return (
    <Container maxW="lg">
      <Heading size="xs" mt={8} textAlign="center">
        Step 1 of 5
      </Heading>
      <Card mt={28}>
        <CardHeader>
          <Heading size="lg" textAlign="center">
            Onboarding form
          </Heading>
        </CardHeader>
        <CardBody>
          <Formik
            initialValues={{ firstName: "", lastName: "" }}
            onSubmit={(values, actions) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                actions.setSubmitting(false);
              }, 1000);
            }}
          >
            {(props) => (
              <Form>
                <Grid gap={4}>
                  <Field name="firstName" validate={validateName}>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.firstName && form.touched.firstName
                        }
                      >
                        <FormLabel htmlFor="first-name">First Name</FormLabel>
                        <Input
                          {...field}
                          size="lg"
                          placeholder="Enter name"
                          id="first-name"
                        />
                        <FormErrorMessage>
                          {form.errors.firstName}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="lastName" validate={validateName}>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.lastName && form.touched.lastName
                        }
                      >
                        <FormLabel htmlFor="last-name">Last Name</FormLabel>
                        <Input
                          {...field}
                          size="lg"
                          placeholder="Enter last name"
                          id="last-name"
                        />
                        <FormErrorMessage>
                          {form.errors.lastName}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="phoneNumber">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.phoneNumber && form.touched.phoneNumber
                        }
                      >
                        <FormLabel htmlFor="last-name">Phone Number</FormLabel>
                        <Input
                          {...field}
                          size="lg"
                          placeholder="Enter number"
                          id="phone-number"
                        />
                        <FormErrorMessage>
                          {form.errors.phoneNumber}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="corporationNumber">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.corporationNumber &&
                          form.touched.corporationNumber
                        }
                      >
                        <FormLabel htmlFor="last-name">
                          Corporation Number
                        </FormLabel>
                        <Input
                          {...field}
                          size="lg"
                          placeholder="Corporation number"
                          id="corporation-number"
                        />
                        <FormErrorMessage>
                          {form.errors.corporationNumber}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </Grid>
                <Button
                  mt={4}
                  colorScheme="teal"
                  isLoading={props.isSubmitting}
                  type="submit"
                  width="100%"
                  loadingText="Submitting"
                  size="lg"
                  rightIcon={<ArrowForwardIcon />}
                >
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </CardBody>
      </Card>
    </Container>
  );
};

export default Onboarding;
