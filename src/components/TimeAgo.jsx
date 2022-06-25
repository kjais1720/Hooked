import React from "react";
import { parseISO, formatDistanceToNow } from "date-fns";

export const TimeAgo = ({ timestamp }) => {
  let timeAgo = "";
  const date = parseISO(timestamp);
  if (timestamp) {
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
  }
  const formattedDate = date.toString().slice(0, 24);
  return (
    <div className="tooltip tooltip-right" data-tip={formattedDate}>
        <i>{timeAgo}</i>
    </div>
  );
};
