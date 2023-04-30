export interface PriorityContent {
  text: string;
  color: string;
  value: string;
}

export const priorityContent: PriorityContent[] = [
  {
    text: "Very High",
    value: "very-high",
    color: "red",
  },
  {
    text: "High",
    value: "high",
    color: "orange",
  },
  {
    text: "Medium",
    value: "normal",
    color: "green",
  },
  {
    text: "Low",
    value: "low",
    color: "blue",
  },
  {
    text: "Very Low",
    value: "very-low",
    color: "purple",
  },
];
