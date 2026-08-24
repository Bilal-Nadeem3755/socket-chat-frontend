export function getDateLabel(dateString) {
  const messageDate = new Date(dateString);

  const today = new Date();
  const yesterday = new Date();

  yesterday.setDate(today.getDate() - 1);

  if (messageDate.toDateString() === today.toDateString()) {
    return "Today";
  }

  if (messageDate.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  }

  return messageDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
