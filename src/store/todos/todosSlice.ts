import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { generateId } from '../../utils/generateId';
import { Todo, CreateTodoPayload } from '../../types';

interface TodosState {
  items: Todo[];
}

const initialState: TodosState = {
  items: [
    {
      id: 'demo-todo-1',
      title: 'Prepare interview demo',
      notes: 'Make sure app runs smoothly',
      completed: true,
      createdAt: '2026-02-18T10:00:00.000Z',
    },
    {
      id: 'demo-todo-2',
      title: 'Review Redux patterns',
      notes: 'Slices, selectors, async thunks',
      completed: false,
      createdAt: '2026-02-19T10:00:00.000Z',
    },
    {
      id: 'demo-todo-3',
      title: 'Buy groceries',
      notes: 'Milk, eggs, bread, vegetables',
      completed: false,
      dueDate: '2026-02-21',
      createdAt: '2026-02-19T14:00:00.000Z',
    },
  ],
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<CreateTodoPayload>) => {
      const newTodo: Todo = {
        id: generateId(),
        title: action.payload.title,
        notes: action.payload.notes,
        completed: false,
        dueDate: action.payload.dueDate,
        createdAt: new Date().toISOString(),
      };
      state.items.push(newTodo);
    },
    updateTodo: (state, action: PayloadAction<{ id: string; updates: Partial<Todo> }>) => {
      const index = state.items.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload.updates };
      }
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((t) => t.id !== action.payload);
    },
    toggleTodoComplete: (state, action: PayloadAction<string>) => {
      const todo = state.items.find((t) => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
});

export const { addTodo, updateTodo, deleteTodo, toggleTodoComplete } = todosSlice.actions;
export default todosSlice.reducer;
