// Books shown around the library. The "reading" entry lies open on the reading chair; favorites stand
// together on a shelf of their own. Colors are the cover's hex, used for the 3D binding.
export type ShelfRead = { title: string; author: string; status: "reading" | "favorite"; color: number; note?: string };

export const reading: ShelfRead[] = [
  { title: "The Secret of Secrets", author: "Dan Brown", status: "reading", color: 0x8e1f1c },
  { title: "Animal Farm", author: "George Orwell", status: "favorite", color: 0x5a2a27 },
  { title: "1984", author: "George Orwell", status: "favorite", color: 0x22303a },
  { title: "The Handmaid's Tale", author: "Margaret Atwood", status: "favorite", color: 0x6b2f33 },
  { title: "The Republic", author: "Plato", status: "favorite", color: 0x2e4034 },
];

export const currentRead = reading.find(book => book.status === "reading");
export const favorites = reading.filter(book => book.status === "favorite");
