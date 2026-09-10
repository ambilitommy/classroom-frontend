import { Subject } from "@/types";

export const mockSubjects: Subject[] = [
  {
    id: 1,
    code: "CS201",
    name: "Data Structures and Algorithms",
    department: "CS",
    description: "Fundamental data structures and algorithm design techniques for solving computational problems.",
    createdAt: new Date("2026-01-15"),
  },
  {
    id: 2,
    code: "MATH301",
    name: "Linear Algebra",
    department: "Math",
    description: "Vectors, matrices, linear transformations, and applications of linear systems.",
    createdAt: new Date("2026-01-16"),
  },
  {
    id: 3,
    code: "ENG205",
    name: "Modern Literary Criticism",
    department: "English",
    description: "Critical approaches to interpreting modern literature across genres and cultures.",
    createdAt: new Date("2026-01-17"),
  },
];