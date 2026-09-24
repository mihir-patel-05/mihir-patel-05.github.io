// Books shown around the library. The "reading" entry lies open on the reading chair; favorites are
// planned for a shelf of their own. Colors are the cover's hex, used for the 3D binding.
export type ShelfRead = { title: string; author: string; status: "reading" | "favorite"; color: number; note?: string };

export const reading: ShelfRead[] = [
  { title: "The Secret of Secrets", author: "Dan Brown", status: "reading", color: 0x8e1f1c },
];

export const currentRead = reading.find(book => book.status === "reading");
