export const getColorClass = (color: string): string | undefined => {
  switch (color) {
    case "primary":
      return "text-primary";
    case "white":
      return "text-white";
    case "red":
      return "text-red";
    case "blue":
      return "text-blue";
    case "purple":
      return "text-purple";
    case "orange":
      return "text-orange";
    case "green":
      return "text-green";
    default:
      return "text-primary";
  }
};
