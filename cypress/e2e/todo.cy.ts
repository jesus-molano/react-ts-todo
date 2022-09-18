describe('Todo app', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
  })
  it('shows a placeholder when no todos are found', () => {
    localStorage.setItem('todos', '[]')
    cy.visit('/')
    cy.contains('This is empty!')
  })
  it('shows a todo for each todo in localStorage', () => {
    const todos = [
      {
        id: 'note',
        title: 'First note',
        lastEdited: (new Date()).toLocaleString(),
        archived: false,
        content: 'Some content'
      },
      {
        id: 'note2',
        title: 'Second note',
        lastEdited: (new Date()).toLocaleString(),
        archived: false,
        content: 'Some content'
      }
    ]
    localStorage.setItem('todos', JSON.stringify(todos))
    cy.visit('/')
    cy.get(`[data-testid^="note-"]`).should("have.length", todos.length)
  })
  it('removes a todo', () => {
    const todos = [
      {
        id: 'note',
        title: 'First note',
        lastEdited: (new Date()).toLocaleString(),
        archived: false,
        content: 'Some content'
      },
      {
        id: 'note2',
        title: 'Second note',
        lastEdited: (new Date()).toLocaleString(),
        archived: false,
        content: 'Some content'
      }
    ]
    localStorage.setItem('todos', JSON.stringify(todos))
    cy.visit('/')
    cy.get(`[data-testid="note-note"] [data-testid='delete']`).click()
    cy.get(`[data-testid^=note-]`).should("have.length", todos.length - 1)
  })
})