export type User = {
  id: string;
  name: string;
  email: string;
  phone: string | null; // Added field
  image: string | null;
  username: string | null;
  role: "superadmin" | "admin" | "user";
};

export const mockUsers: User[] = [
  {
    id: "usr_1",
    name: "Andi Siregar",
    email: "andi.siregar@example.com",
    phone: "+62 812-9988-7766",
    image: null,
    username: "andisrg",
    role: "superadmin",
  },
  {
    id: "usr_2",
    name: "Siti Aminah",
    email: "siti.aminah@laundry.com",
    phone: "+62 853-1122-3344",
    image: "https://github.com/shadcn.png",
    username: "sitilaundry",
    role: "admin",
  },
  {
    id: "usr_3",
    name: "Joko Anwar",
    email: "joko.anwar@gmail.com",
    phone: "+62 813-7766-5544",
    image: null,
    username: "joko_films",
    role: "user",
  },
  {
    id: "usr_4",
    name: "Michael Tan",
    email: "michael.tan@business.net",
    phone: "+62 859-2233-6633", // Example of missing phone
    image: null,
    username: null,
    role: "user",
  },
  {
    id: "usr_5",
    name: "Putri Indah",
    email: "putri.indah@yahoo.com",
    phone: "+62 859-2233-4455",
    image: null,
    username: "putri_i",
    role: "user",
  },
];
