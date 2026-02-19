import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { generateId } from '../../utils/generateId';
import { Todo, CreateTodoPayload } from '../../types';

interface TodosState {
  items: Todo[];
}

const initialState: TodosState = {
  items: [],
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
