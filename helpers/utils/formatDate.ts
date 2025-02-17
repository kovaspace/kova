import moment from "moment";

export const formatDate = (date: string) => {
  return moment(date, "YYYY-MM-DD").format("MMM D, YYYY"); // Example: "Dec 18, 2024"
};
