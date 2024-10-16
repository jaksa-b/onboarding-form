import { User } from "@/types";
import fetch from "cross-fetch";
import { useQuery } from "@tanstack/react-query";

const base_api_url = process.env.NEXT_PUBLIC_BASE_API_URL;

export const saveUser = async (values: User) => {
  const response = await fetch(`${base_api_url}/profile-details`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err?.message);
  }

  return response;
};

export const checkCorporationNumber = async (number: string) => {
  if (number?.length !== 9) return;

  const response = await fetch(`${base_api_url}/corporation-number/${number}`);

  const corporationNumber = await response?.json();
  return corporationNumber.valid;
};

export const useCheckCorporationNumber = (number: string) => {
  return useQuery(
    ["corporationNumber", number],
    () => checkCorporationNumber(number),
    {
      enabled: number.length === 9, // Only run if 9 digits are entered
      staleTime: 3600000, // Cache for 1 hour
      cacheTime: 3600000, // Cache time for 1 hour
    }
  );
};
