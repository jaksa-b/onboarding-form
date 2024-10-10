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
import { Field, Form, Formik, useFormik } from "formik";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import * as Yup from "yup";
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

  const checkCorporationNumber = async (number: string) => {
    console.log("checkCorporationNumber", number);
    if (number?.length !== 9) return;

    return true;
  };

  function onHandleSubmit(values: User) {
    console.log(values);

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
      .required("Required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: SignupSchema,
    onSubmit: onHandleSubmit,
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SignupSchema}
      /* onSubmit={(values: User, actions: FormikHelpers<User>) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 1000);
      }} */

      onSubmit={onHandleSubmit}
    >
      {(props) => (
        <Form>
          <Grid gap={4}>
            <Field id="firstName" name="firstName">
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.firstName && form.touched.firstName}
                >
                  <FormLabel htmlFor="first-name">First Name</FormLabel>
                  <Input
                    {...field}
                    size="lg"
                    placeholder="Enter name"
                    id="first-name"
                    data-testid="firstName"
                  />
                  <FormErrorMessage>{form.errors.firstName}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field id="lastName" name="lastName">
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.lastName && form.touched.lastName}
                >
                  <FormLabel htmlFor="last-name">Last Name</FormLabel>
                  <Input
                    {...field}
                    size="lg"
                    placeholder="Enter last name"
                    id="last-name"
                    data-testid="lastName"
                  />
                  <FormErrorMessage>{form.errors.lastName}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field id="phone" name="phone">
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.phone && form.touched.phone}
                >
                  <FormLabel htmlFor="phone-number">Phone Number</FormLabel>
                  <Input
                    {...field}
                    size="lg"
                    placeholder="Enter number"
                    id="phone-number"
                    data-testid="phone"
                  />
                  <FormErrorMessage>{form.errors.phone}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field id="corporationNumber" name="corporationNumber">
              {({ field, form }) => (
                <FormControl
                  /* onBlur={(e) => {
                          checkCorporationNumber(e.target.value);
                        }} */
                  isInvalid={
                    form.errors.corporationNumber &&
                    form.touched.corporationNumber
                  }
                >
                  <FormLabel htmlFor="last-name">Corporation Number</FormLabel>
                  <Input
                    {...field}
                    size="lg"
                    placeholder="Corporation number"
                    id="corporation-number"
                    data-testid="corporationNumber"
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
  );
};

export default UserStepForm;
