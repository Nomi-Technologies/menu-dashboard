/*
Deals with saving and fetching registration data from local storage
*/

export const setRegistrationData = (data) => {
  typeof window !== "undefined" &&
    localStorage.setItem("registrationData", JSON.stringify(data));
};

export const fetchRegistrationData = () => {
  const data =
    typeof window !== "undefined"
      ? localStorage.getItem("registrationData")
      : null;
  if (data !== null) return JSON.parse(data);
  else return data;
};

export const removeRegistrationData = () => {
  typeof window !== "undefined" && localStorage.removeItem("registrationData");
};
