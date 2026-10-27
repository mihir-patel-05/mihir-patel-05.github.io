// What I'm reading and the books I'd recommend.
export type Book = { title: string; author: string; status: "reading" | "favorite" };

export const reading: Book[] = [
  { title: "The Secret of Secrets", author: "Dan Brown", status: "reading" },
  { title: "Animal Farm", author: "George Orwell", status: "favorite" },
  { title: "1984", author: "George Orwell", status: "favorite" },
  { title: "The Handmaid's Tale", author: "Margaret Atwood", status: "favorite" },
  { title: "The Republic", author: "Plato", status: "favorite" },
];

export const currentRead = reading.find(book => book.status === "reading");
export const favorites = reading.filter(book => book.status === "favorite");
