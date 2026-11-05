export type CampusEvent = {
  id: number;
  title: string;
  date: string;
  place: string;
  seats: number;
};

export const events: CampusEvent[] = [
  {
    id: 1,
    title: "React study night",
    date: "2026-10-22",
    place: "Room 302",
    seats: 2,
  },
  {
    id: 2,
    title: "TypeScript workshop",
    date: "2026-10-25",
    place: "Lab 101",
    seats: 15,
  },
  {
    id: 3,
    title: "Frontend architecture talk",
    date: "2026-10-28",
    place: "Auditorium A",
    seats: 30,
  },
  {
    id: 4,
    title: "UI/UX design critique",
    date: "2026-11-02",
    place: "Room 405",
    seats: 10,
  },
];
