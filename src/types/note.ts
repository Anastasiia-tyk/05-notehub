// src/types/note.ts

export type NoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

export interface Note {
    id: number;
    title: string;
    content: string;
    createdAt: number;
    updatedAt: number;
    tag: string;
}