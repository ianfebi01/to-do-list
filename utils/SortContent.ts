export interface SortContent {
  text: string;
  value: string;
  icon: string;
}

export const sortContent: SortContent[] = [
  {
    text: "Terbaru",
    value: "sort-latest",
    icon: "latest",
  },
  {
    text: "Terlama",
    value: "sort-oldest",
    icon: "oldest",
  },
  {
    text: "A-Z",
    value: "sort-az",
    icon: "az",
  },
  {
    text: "Z-A",
    value: "sort-za",
    icon: "za",
  },
  {
    text: "Belum Selesai",
    value: "sort-unfinished",
    icon: "unfinished",
  },
];
