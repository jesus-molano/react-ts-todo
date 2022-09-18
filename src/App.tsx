import { useEffect, useMemo, useState } from 'react'
import NoteCard from './components/NoteCard'
import NoteModal from './components/NoteModal'
import api from './api'
import type { Note } from './types'
import './app.css'

function App() {
  const [notes, setNotes] = useState<Note[]>(api.notes.list)
  const [draft, setDraft] = useState<null | Partial<Note>>(null)
  const [view, setView] = useState<'active' | 'archived'>('active')
  const matches = useMemo(() => {
    return notes.filter((note) => {
      if (view === 'active') {
        return !note.archived
      } else if (view === 'archived') {
        return note.archived
      }
    })
  }, [notes, view])

  useEffect(() => {
    api.notes.set(notes)
  }, [notes])

  const handleArchive = (id: Note['id']) => {
    setNotes((notes) =>
      notes.map((note) => {
        if (note.id !== id) return note
        return {
          ...note,
          archived: !note.archived,
        }
      })
    )
  }
  const handleDelete = (id: Note['id']) => {
    setNotes((notes) => notes.filter((note) => note.id !== id))
  }
  const handleEdit = (note: Note) => {
    setDraft(note)
  }
  const handleDraftChange = (field: string, value: string) => {
    setDraft((draft) => ({
      ...draft,
      [field]: value,
    }))
  }
  const handleCancel = () => {
    setDraft(null)
  }
  const handleSave = () => {
    if (draft?.id) {
      setNotes((notes) =>
        notes.map((note) => {
          if (note.id !== draft.id) return note
          return {
            ...draft,
            lastEdited: new Date().toLocaleString(),
          } as Note
        })
      )
    } else {
      setNotes((notes) =>
        notes.concat({
          id: String(+new Date()),
          lastEdited: new Date().toLocaleString(),
          ...(draft as Omit<Note, 'id' | 'lastEdited'>),
        })
      )
    }
    return setDraft(null)
  }

  return (
    <main>
      <div className='create-note'>
        <h1>My notes</h1>
        <div className='menu-buttons'>
          <button
            className='nes-btn is-success'
            onClick={() => setDraft({ title: '', content: '' })}
          >
            Create note
          </button>
          <button
            className='nes-btn'
            onClick={() =>
              setView((view) => (view === 'archived' ? 'active' : 'archived'))
            }
          >
            {view === 'active' ? 'Show archived notes' : 'Show active notes'}
          </button>
        </div>
      </div>
      <div className='notes-list'>
        {matches.length ? (
          matches.map((note) => (
            <NoteCard
              note={note}
              key={note.id}
              onArchive={handleArchive}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))
        ) : (
          <p className='notes-placeholder'>This is empty!</p>
        )}
      </div>
      {draft && (
        <NoteModal
          note={draft}
          onClose={handleCancel}
          onChange={handleDraftChange}
          onSave={handleSave}
        />
      )}
    </main>
  )
}

export default App
