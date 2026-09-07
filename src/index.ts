export { CountryModal } from "./components/country.modal";
export { CitiesModal } from "./components/city.modal";
export { PhoneNumberModal } from "./components/phone-number.modal";
export { countries } from "./data/countries";

export const formatPhoneNumber = (value: string) => {
  if (!value) return value;
  const cleaned = value.replace(/[^\d]/g, "");
  return cleaned.slice(0, 15);
};
