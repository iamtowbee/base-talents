import { formatDistanceToNow } from "date-fns";

export const formatDueDate = (date: Date) => {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};
