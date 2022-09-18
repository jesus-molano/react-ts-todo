import type { Note } from '../../types'
import './note-card.css'

type Props = {
  note: Note
  onArchive: (id: Note['id']) => void
  onDelete: (id: Note['id']) => void
  onEdit: (note: Note) => void
}

function NoteCard({ note, onArchive, onDelete, onEdit }: Props) {
  return (
    <div className='nes-container' data-testid={`note-${note.id}`}>
      <h3>{note.title}</h3>
      <p>Last edited: {note.lastEdited}</p>
      <div className='options-buttons'>
        <button className='nes-btn' onClick={() => onArchive(note.id)}>
          {note.archived ? 'activate' : 'archive'}
        </button>
        <button className='nes-btn is-primary' onClick={() => onEdit(note)}>
          editar
        </button>
        <button className='nes-btn is-error' onClick={() => onDelete(note.id)} data-testid='delete'>
          borrar
        </button>
      </div>
    </div>
  )
}
export default NoteCard
