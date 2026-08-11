interface CareerStatusBadgeProps {
  status:
    | "APPLIED"
    | "SHORTLISTED"
    | "INTERVIEW"
    | "SELECTED"
    | "HIRED"
    | "REJECTED";
}

export default function CareerStatusBadge({
  status,
}: CareerStatusBadgeProps) {

  const colors = {
    APPLIED: "bg-blue-100 text-blue-700",

    SHORTLISTED:
      "bg-yellow-100 text-yellow-700",

    INTERVIEW:
      "bg-purple-100 text-purple-700",

    SELECTED:
      "bg-indigo-100 text-indigo-700",

    HIRED:
      "bg-green-100 text-green-700",

    REJECTED:
      "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        colors[status]
      }`}
    >
      {status}
    </span>
  );
}