import {
  saveUser,
  checkCorporationNumber,
  useCheckCorporationNumber,
} from "@/lib/api";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import fetch from "cross-fetch";

jest.mock("cross-fetch");

const base_api_url = process.env.NEXT_PUBLIC_BASE_API_URL;

describe("API utility functions", () => {
  const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

  describe("saveUser", () => {
    it("sends correct data and returns successful response", async () => {
      const mockResponse = {};

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const userData = {
        firstName: "John",
        lastName: "Doe",
        phone: "+1234567890",
        corporationNumber: "123456789",
      };

      const response = await saveUser(userData);

      expect(mockFetch).toHaveBeenCalledWith(
        `${base_api_url}/profile-details`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        }
      );

      expect(response).toEqual(expect.any(Object));
    });

    it("throws an error when response is not ok", async () => {
      const errorMessage = { message: "Invalid phone number" };

      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: async () => errorMessage,
      } as Response);

      const userData = {
        firstName: "John",
        lastName: "Doe",
        phone: "+2134567890",
        corporationNumber: "123456789",
      };

      await expect(saveUser(userData)).rejects.toThrow("Invalid phone number");
    });
  });

  describe("checkCorporationNumber", () => {
    it("returns valid status of a corporation number when successful", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ valid: true }),
      } as Response);

      const corporationNumber = "123456789";
      const result = await checkCorporationNumber(corporationNumber);

      expect(mockFetch).toHaveBeenCalledWith(
        `${base_api_url}/corporation-number/${corporationNumber}`
      );

      expect(result).toBe(true);
    });

    it("returns undefined when corporation number is less than 9 digits", async () => {
      const corporationNumber = "12345"; // less than 9 digits
      const result = await checkCorporationNumber(corporationNumber);

      expect(mockFetch).not.toHaveBeenCalled();
      expect(result).toBeUndefined();
    });

    it("returns invalid status if corporation number is not valid", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ valid: false }),
      } as Response);

      const corporationNumber = "123456788";
      const result = await checkCorporationNumber(corporationNumber);

      expect(mockFetch).toHaveBeenCalledWith(
        `${base_api_url}/corporation-number/${corporationNumber}`
      );

      expect(result).toBe(false);
    });
  });

  describe("useCheckCorporationNumber", () => {
    const queryClient = new QueryClient();

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    it("returns valid corporation number when the number is valid", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ valid: true }),
      } as Response);

      const { result } = renderHook(
        () => useCheckCorporationNumber("123456789"),
        { wrapper }
      );

      await waitFor(() => expect(result.current.isFetching).toBe(false));

      expect(result.current.data).toBe(true);
    });

    it("does not trigger fetch if the corporation number length is less than 9", async () => {
      const { result } = renderHook(
        () => useCheckCorporationNumber("12345"), // less than 9 digits
        { wrapper }
      );

      // Since number is less than 9 digits, expect not to fetch
      expect(result.current.isFetching).toBe(false);
      expect(mockFetch).not.toHaveBeenCalled();
    });

    it("returns invalid corporation number when the number is invalid", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ valid: false }),
      } as Response);

      const { result } = renderHook(
        () => useCheckCorporationNumber("987654321"),
        { wrapper }
      );

      await waitFor(() => expect(result.current.isFetching).toBe(false));

      expect(result.current.data).toBe(false);
    });
  });
});
