// src/services/noteService.ts

import axios from "axios";
import type { Note } from '../types/note';

interface NoteHttpResponse {
    results: Note[];
    total_pages: number;
}

export const fetchNote = async (page: number = 1, perPage: number = 12): Promise<NoteHttpResponse> => {
    const token = import.meta.env.VITE_NOTEHUB_TOKEN;

    const response = await axios.get<NoteHttpResponse>(
        `https://notehub-public.goit.study/api/notes?page=${page}&perPage=${perPage}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
    );
    return response.data;
}