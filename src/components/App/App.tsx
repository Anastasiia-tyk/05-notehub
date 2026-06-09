// src/components/App/App.tsx

import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

import css from "./App.module.css";

import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import NoteList from "../NoteList/NoteList";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";

import { fetchNotes } from "../../services/noteService";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const perPage = 12;

  const { data } = useQuery({
    queryKey: ["notes", currentPage, searchQuery],
    queryFn: () => fetchNotes(currentPage, perPage, searchQuery),
    placeholderData: keepPreviousData, 
  });

  const notes = data?.notes || [];
  const totalPages = data?.totalPages || 0;

  const updateSearchQuery = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
      setCurrentPage(1); 
    },
    300
  );

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={updateSearchQuery} />

        {totalPages > 1 && (
          <Pagination
            pageCount={totalPages}
            forcePage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}

        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      {notes.length > 0 && (
        <NoteList notes={notes} />
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onCancel={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}