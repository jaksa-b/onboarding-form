"use client";
import React, { useEffect } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Grid,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { User } from "@/types";
import { useCheckCorporationNumber } from "@/lib/api";

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

  const phoneRegExp =
    /^[+][1]\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object().shape({
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
        .matches(/^[0-9]{9}$/, "Please enter 9 digit number")
        .required("Required"),
    }),
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  const { values, setFieldError, isSubmitting } = formik;

  const {
    data: isValidCorporationNumber,
    error: corporationNumberError,
    isFetching,
  } = useCheckCorporationNumber(values.corporationNumber);

  useEffect(() => {
    if (!isFetching && values.corporationNumber.length === 9) {
      if (corporationNumberError || !isValidCorporationNumber) {
        setFieldError("corporationNumber", "Invalid corporation number");
      }
    }
  }, [
    isFetching,
    isValidCorporationNumber,
    corporationNumberError,
    values.corporationNumber,
    setFieldError,
  ]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid gap={4}>
        <FormControl
          isInvalid={!!formik.errors.firstName && formik.touched.firstName}
        >
          <FormLabel htmlFor="first-name">First Name</FormLabel>
          <Input
            id="firstName"
            {...formik.getFieldProps("firstName")}
            placeholder="Enter name"
            size="lg"
            aria-label="First name"
            data-testid="firstName"
          />
          <FormErrorMessage data-testid="firstNameError">
            {formik.errors.firstName}
          </FormErrorMessage>
        </FormControl>

        <FormControl
          isInvalid={!!formik.errors.lastName && formik.touched.lastName}
        >
          <FormLabel htmlFor="last-name">Last Name</FormLabel>
          <Input
            id="lastName"
            {...formik.getFieldProps("lastName")}
            placeholder="Enter last name"
            size="lg"
            aria-label="Last name"
            data-testid="lastName"
          />
          <FormErrorMessage data-testid="lastNameError">
            {formik.errors.lastName}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!formik.errors.phone && formik.touched.phone}>
          <FormLabel htmlFor="phone">Phone Number</FormLabel>
          <Input
            id="phone"
            {...formik.getFieldProps("phone")}
            placeholder="Enter phone number"
            size="lg"
            aria-label="Phone number"
            data-testid="phone"
          />
          <FormErrorMessage data-testid="phoneError">
            {formik.errors.phone}
          </FormErrorMessage>
        </FormControl>

        <FormControl
          isInvalid={
            !!formik.errors.corporationNumber &&
            formik.touched.corporationNumber
          }
        >
          <FormLabel htmlFor="corporation-number">Corporation Number</FormLabel>
          <Input
            id="corporationNumber"
            {...formik.getFieldProps("corporationNumber")}
            placeholder="Enter 9 digit corporation number"
            size="lg"
            aria-label="Corporation number"
            data-testid="corporationNumber"
          />
          <FormErrorMessage data-testid="corporationNumberError">
            {formik.errors.corporationNumber}
          </FormErrorMessage>
        </FormControl>
      </Grid>

      <Button
        mt={4}
        colorScheme="teal"
        isLoading={isSubmitting}
        type="submit"
        width="100%"
        loadingText="Submitting"
        size="lg"
        rightIcon={<ArrowForwardIcon />}
      >
        Submit
      </Button>
    </form>
  );
};

export default UserStepForm;
