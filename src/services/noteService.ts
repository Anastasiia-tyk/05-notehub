// src/services/noteService.ts

import axios from "axios";
import type { Note, NoteTag } from '../types/note';

export interface FetchNotesResponse {
    notes: Note[];
    totalPages: number;
}

export interface CreateNoteInput {
    title: string;
    content: string;
    tag: NoteTag;
}

const BASE_URL = "https://notehub-public.goit.study/api/notes";

export const fetchNotes = async (page: number = 1, perPage: number = 12, search: string = ""): Promise<FetchNotesResponse> => {
    const token = import.meta.env.VITE_NOTEHUB_TOKEN;

    const response = await axios.get<FetchNotesResponse>(
        BASE_URL,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                page,
                perPage,
                search: search || undefined
            }
        }
    );
    return response.data;
};

export const createNote = async (noteData: CreateNoteInput): Promise<Note> => {
    const token = import.meta.env.VITE_NOTEHUB_TOKEN;

    const response = await axios.post<Note>(
        BASE_URL,
        noteData,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
    const token = import.meta.env.VITE_NOTEHUB_TOKEN;
    
    const response = await axios.delete<Note>(
        `${BASE_URL}/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    return response.data;
};