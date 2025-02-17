import moment from "moment";

export const formatAMPM = (time: string) => {
  return moment(time, "HH:mm:ss").format("h:mm A"); // Returns "5:30 PM"
};
