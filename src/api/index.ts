import { Note } from "../types"

const api = {
  notes: {
    list: () => {
      try {
        const todos = JSON.parse(localStorage.getItem('todos') || '')
        return todos
      } catch (error) {
        return []    
      }
    },
    set: (notes: Note[]) => {
      localStorage.setItem('todos', JSON.stringify(notes))
    }
  },
}
export default api