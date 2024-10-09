"use client";
import React from "react";
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
import * as Yup from "yup";

const Onboarding = () => {
  const phoneRegExp =
    /^[+][1]\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

  const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    lastName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    phone: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Required"),
    corporationNumber: Yup.string()
      .matches(/^[0-9]*$/, "Numbers only")
      .min(9, "Please enter 9 digit number")
      .max(9, "Too long, please enter 9 digit number")
      .required("Required"),
  });

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
            initialValues={{
              firstName: "",
              lastName: "",
              phone: "",
              corporationNumber: "",
            }}
            validationSchema={SignupSchema}
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
                  <Field name="firstName">
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

                  <Field name="lastName">
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

                  <Field name="phone">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.phone && form.touched.phone}
                      >
                        <FormLabel htmlFor="phone-number">
                          Phone Number
                        </FormLabel>
                        <Input
                          {...field}
                          size="lg"
                          placeholder="Enter number"
                          id="phone-number"
                        />
                        <FormErrorMessage>{form.errors.phone}</FormErrorMessage>
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
