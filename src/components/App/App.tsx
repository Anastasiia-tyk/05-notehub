// src/components/App/App.tsx

import css from './App.module.css';

import NoteList from '../NoteList/NoteList';

export default function App() {
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {/* Компонент SearchBox */}
        {/* Пагінація */}
        {/* Кнопка створення нотатки */}
      </header>
      <NoteList />
    </div>
  )
}
