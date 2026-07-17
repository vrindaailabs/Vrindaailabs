interface BadgeProps {
  text: string;
}

export default function Badge({
  text,
}: BadgeProps) {
  return (
    <span className="inline-block rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700">
      {text}
    </span>
  );
}