import Onboarding from "@/app/onboarding/page";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UserStepForm from "@/components/onboarding/UserStepForm";

describe("Onboarding", () => {
  it("should show onboarding form", () => {
    render(<Onboarding />);

    const inputNode = screen.getByText("First Name");

    expect(inputNode).not.toBeNull();
  });

  it("should submit form", async () => {
    const handleSubmit = jest.fn();

    render(<UserStepForm onSubmit={handleSubmit} />);

    const user = userEvent.setup();

    const testData = {
      firstName: "John",
      lastName: "Doe",
      phone: "+13062776103",
      corporationNumber: "826417395",
    };

    const firstName = screen.getByTestId("firstName");
    const lastName = screen.getByTestId("lastName");
    const phone = screen.getByTestId("phone");
    const corporationNumber = screen.getByTestId("corporationNumber");

    await user.type(firstName, testData.firstName);
    await user.type(lastName, testData.lastName);
    await user.type(phone, testData.phone);
    await user.type(corporationNumber, testData.corporationNumber);

    await user.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() =>
      expect(handleSubmit).toHaveBeenCalledWith({
        firstName: testData.firstName,
        lastName: testData.lastName,
        phone: testData.phone,
        corporationNumber: testData.corporationNumber,
      })
    );
  });
});
