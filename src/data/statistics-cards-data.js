import {
  BanknotesIcon,
  UserPlusIcon,
  UserIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";

export const statisticsCardsData = [
  {
    color: "blue",
    icon: BanknotesIcon,
    title: "Today's Money",
    value: "₹24,000",
    footer: {
      color: "text-green-500",
      value: "+22%",
      label: "than last week",
    },
  },
  {
    color: "pink",
    icon: UserIcon,
    title: "Today's Users",
    value: "19",
    footer: {
      color: "text-green-500",
      value: "+3%",
      label: "than last month",
    },
  },
  {
    color: "green",
    icon: UserPlusIcon,
    title: "New Clients",
    value: "16",
    footer: {
      color: "text-red-500",
      value: "-2%",
      label: "than last week",
    },
  },
  {
    color: "orange",
    icon: ChartBarIcon,
    title: "Sales",
    value: "₹1,63,000",
    footer: {
      color: "text-green-500",
      value: "+5%",
      label: "than last week",
    },
  },
];

export default statisticsCardsData;
