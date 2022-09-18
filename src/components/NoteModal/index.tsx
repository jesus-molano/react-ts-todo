import { useEffect, useRef } from 'react'
import { Note } from '../../types'
import './note-modal.css'

type Props = {
  note: Partial<Note>
  onClose: VoidFunction
  onSave: VoidFunction
  onChange: (field: string, value: string) => void
}

function NoteModal({ onClose, onSave, onChange, note }: Props) {
  const dialogRef: React.MutableRefObject<HTMLDialogElement | null> =
    useRef(null)

  useEffect(() => {
    if (dialogRef.current) {
      !dialogRef.current?.open && dialogRef.current.showModal()
    }
  }, [])

  const handleClose = () => {
    onClose()
    dialogRef.current?.close
  }
  const handleSave = () => {
    onSave()
    dialogRef.current?.close
  }

  return (
    <dialog className='nes-dialog' id='dialog-default' ref={dialogRef}>
      <form method='dialog' onSubmit={(event) => event.preventDefault()}>
        <h3 className='title'>Create / edit note</h3>
        <div className='nes-field'>
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            id='title'
            className='nes-input'
            value={note.title}
            onChange={(event) => onChange('title', event.target.value)}
            required
          />
        </div>
        <div className='nes-field'>
          <label htmlFor='content'>Content</label>
          <textarea
            id='content'
            className='nes-textarea'
            value={note.content}
            onChange={(event) => onChange('content', event.target.value)}
            required
          />
        </div>
        <menu className='dialog-menu'>
          <button className='nes-btn' onClick={handleClose} type='button'>
            Close
          </button>
          <button
            type='button'
            className={`${!note.title ? 'is-disabled' : ''} nes-btn is-primary`}
            onClick={handleSave}
            disabled={note.title ? false : true}
          >
            Save
          </button>
        </menu>
      </form>
    </dialog>
  )
}

export default NoteModal
