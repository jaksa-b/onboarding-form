"use client";
import React from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Grid,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { Field, FieldProps, Form, Formik } from "formik";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { checkCorporationNumber } from "@/lib/user";
import { User } from "@/types";

interface UserStepFormProps {
  onSubmit: (values: User) => void;
}

const UserStepForm = ({ onSubmit }: UserStepFormProps) => {
  const initialValues: User = {
    firstName: "",
    lastName: "",
    phone: "",
    corporationNumber: "",
  };

  const validateCorporationNumber = async (number: string) => {
    if (number?.length !== 9) return;
    return await checkCorporationNumber(number);
  };

  function onHandleSubmit(values: User) {
    onSubmit(values);
  }

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
      .test(
        "corporationNumber",
        "Invalid corporation number",
        async (value = "") => {
          return await validateCorporationNumber(value);
        }
      )
      .required("Required"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SignupSchema}
      onSubmit={onHandleSubmit}
    >
      {(props) => (
        <Form>
          <Grid gap={4}>
            <Field id="firstName" name="firstName">
              {({ field, meta }: FieldProps) => (
                <FormControl isInvalid={Boolean(meta.error && meta.touched)}>
                  <FormLabel htmlFor="first-name">First Name</FormLabel>
                  <Input
                    {...field}
                    size="lg"
                    id="firstName"
                    placeholder="Enter name"
                    data-testid="firstName"
                    aria-label="First name"
                  />
                  <FormErrorMessage data-testid="firstNameError">
                    {meta.error}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field id="lastName" name="lastName">
              {({ field, meta }: FieldProps) => (
                <FormControl isInvalid={Boolean(meta.error && meta.touched)}>
                  <FormLabel htmlFor="last-name">Last Name</FormLabel>
                  <Input
                    {...field}
                    size="lg"
                    placeholder="Enter last name"
                    id="last-name"
                    data-testid="lastName"
                  />
                  <FormErrorMessage data-testid="lastNameError">
                    {meta.error}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field id="phone" name="phone">
              {({ field, meta }: FieldProps) => (
                <FormControl isInvalid={Boolean(meta.error && meta.touched)}>
                  <FormLabel htmlFor="phone-number">Phone Number</FormLabel>
                  <Input
                    {...field}
                    size="lg"
                    placeholder="Enter number"
                    id="phone-number"
                    data-testid="phone"
                  />
                  <FormErrorMessage data-testid="phoneError">
                    {meta.error}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field id="corporationNumber" name="corporationNumber">
              {({ field, meta }: FieldProps) => (
                <FormControl isInvalid={Boolean(meta.error && meta.touched)}>
                  <FormLabel htmlFor="last-name">Corporation Number</FormLabel>
                  <Input
                    {...field}
                    size="lg"
                    placeholder="Corporation number"
                    id="corporation-number"
                    data-testid="corporationNumber"
                  />
                  <FormErrorMessage data-testid="corporationNumberError">
                    {meta?.error}
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
  );
};

export default UserStepForm;
