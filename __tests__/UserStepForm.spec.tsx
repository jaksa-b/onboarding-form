import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserStepForm from "@/components/onboarding/UserStepForm";
import fetchMock from "jest-fetch-mock";

beforeEach(() => {
  fetchMock.resetMocks();
});

fetchMock.mockResponseOnce(JSON.stringify({ valid: true }));

describe("UserStepForm", () => {
  const mockOnSubmit = jest.fn();

  const fillForm = async (
    firstName = "",
    lastName = "",
    phone = "",
    corporationNumber = ""
  ) => {
    fireEvent.change(screen.getByTestId("firstName"), {
      target: { value: firstName },
    });
    fireEvent.change(screen.getByTestId("lastName"), {
      target: { value: lastName },
    });
    fireEvent.change(screen.getByTestId("phone"), { target: { value: phone } });
    fireEvent.change(screen.getByTestId("corporationNumber"), {
      target: { value: corporationNumber },
    });
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));
  };

  beforeEach(() => {
    jest.clearAllMocks();
    render(<UserStepForm onSubmit={mockOnSubmit} />);
  });

  it("should validate the form and show error if first name is too short", async () => {
    await fillForm("A", "Doe", "+1234567890", "123456789");

    await waitFor(() => {
      const firstNameError = screen.getByTestId("firstNameError");
      expect(firstNameError).toHaveTextContent("Too Short!");
    });
  });

  it("should validate the form and show error if first name is too long", async () => {
    const longName = "A".repeat(51); // Exceeding max length of 50
    await fillForm(longName, "Doe", "+1234567890", "123456789");

    await waitFor(() => {
      const firstNameError = screen.getByTestId("firstNameError");
      expect(firstNameError).toHaveTextContent("Too Long!");
    });
  });

  it("should validate the form and show error if last name is too short", async () => {
    await fillForm("John", "D", "+1234567890", "123456789");

    await waitFor(() => {
      const firstNameError = screen.getByTestId("lastNameError");
      expect(firstNameError).toHaveTextContent("Too Short!");
    });
  });

  it("should validate the form and show error if last name is too long", async () => {
    const longName = "A".repeat(51); // Exceeding max length of 50
    await fillForm("John", longName, "+1234567890", "123456789");

    await waitFor(() => {
      const firstNameError = screen.getByTestId("lastNameError");
      expect(firstNameError).toHaveTextContent("Too Long!");
    });
  });

  it("should show error if phone number is invalid", async () => {
    await fillForm("John", "Doe", "12345", "123456789");

    await waitFor(() => {
      const phoneError = screen.getByText("Phone number is not valid");
      expect(phoneError).toBeInTheDocument();
    });
  });

  it("should not show error if phone number is valid", async () => {
    await fillForm("John", "Doe", "+13062776103", "123456789");

    await waitFor(() => {
      expect(() => screen.getByText("Phone number is not valid")).toThrow(
        "Unable to find an element"
      );
    });
  });

  it("should show error if corporation number is invalid", async () => {
    await fillForm("John", "Doe", "+1234567890", "1234");

    await waitFor(() => {
      const corporationNumberError = screen.getByText(
        "Please enter 9 digit number"
      );
      expect(corporationNumberError).toBeInTheDocument();
    });
  });

  it("should show an error if corporation number is invalid from the API", async () => {
    // Mock the response for corporation number check
    fetchMock.mockResponseOnce(JSON.stringify({ valid: false }));

    await fillForm("John", "Doe", "+1234567890", "123456780");

    await waitFor(() => {
      const corporationNumberError = screen.getByText(
        "Invalid corporation number"
      );
      expect(corporationNumberError).toBeInTheDocument();
    });
  });

  it("should not show error if corporation number is valid from the API", async () => {
    // Mock the response for corporation number check
    fetchMock.mockResponseOnce(JSON.stringify({ valid: false }));

    await fillForm("John", "Doe", "+1234567890", "123456789");

    await waitFor(() => {
      expect(() => screen.getByText("Invalid corporation number")).toThrow(
        "Unable to find an element"
      );
    });
  });

  it("should call onSubmit if form inputs are valid", async () => {
    await fillForm("John", "Doe", "+12345678900", "123456789");
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        firstName: "John",
        lastName: "Doe",
        phone: "+12345678900",
        corporationNumber: "123456789",
      });
    });
  });
});
