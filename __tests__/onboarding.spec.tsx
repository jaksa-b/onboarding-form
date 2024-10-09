import Onboarding from "@/app/onboarding/page";
import { render, screen } from "@testing-library/react";

test("should show onboarding form", () => {
  render(<Onboarding />);
  const inputNode = screen.getByText("First name");

  // Events and assertions...

  expect(inputNode).not.toBeNull();
});
