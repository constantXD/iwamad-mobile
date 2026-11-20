import { Text } from "react-native";
import { useHolidays } from "../hooks/useHolidays";

type HolidayNoteProps = {
  date: string;
};

export function HolidayNote({ date }: HolidayNoteProps) {
  const year = Number(date.slice(0, 4));
  const { data, isPending, isError } = useHolidays(year);

  if (isPending) {
    return <Text>Checking holidays</Text>;
  }

  if (isError) {
    return <Text>Holidays unavailable</Text>;
  }

  const holiday = data.find((item) => item.date === date);

  if (holiday) {
    return <Text>Public holiday: {holiday.name}</Text>;
  }

  return <Text>Not a public holiday</Text>;
}
