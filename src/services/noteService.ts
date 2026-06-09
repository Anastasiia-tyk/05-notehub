// src/services/noteService.ts

import axios from "axios";
import type { Note } from '../types/note';

interface NoteHttpResponse {
    results: Note[];
    total_pages: number;
}

export const fetchNotes = async (page: number = 1, perPage: number = 12, search: string = "") => {
    const token = import.meta.env.VITE_NOTEHUB_TOKEN;

    const response = await axios.get<NoteHttpResponse>(
        `https://notehub-public.goit.study/api/notes`,
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

export const createNote = async (noteData: { title: string; content: string; tag: string }) => {
    const token = import.meta.env.VITE_NOTEHUB_TOKEN;

    const response = await axios.post<Note>(
        `https://notehub-public.goit.study/api/notes`,
        noteData,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    return response.data;
};

export const deleteNote = async (id: string) => {
    const token = import.meta.env.VITE_NOTEHUB_TOKEN;
    
    const response = await axios.delete<Note>(
        `https://notehub-public.goit.study/api/notes/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    return response.data;
};