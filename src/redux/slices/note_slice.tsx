import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist';

const persistConfig = {
  key: "notes",
  storage: storage,
};

type Note = {
    id: string;
    heading: string;
    content: string;
}

interface NoteState {
    notes: Array<Note>
}

const initialState: NoteState = {
    notes: [
        { id: '1', heading: 'Todo for the day', content: '' },
        { id: '0', heading: 'Todo for the day w', content: '' }
    ]
}

export const noteSlice = createSlice({
    name: "notes",
    initialState: initialState,
    reducers: {
        addNote: (state, action: PayloadAction<Note>) => {
            const note = action.payload;
            state.notes.push(note);
        },
        removeNote: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            const notes = state.notes.filter((note:any) => note.id !== id);
            state.notes = notes;
        }
    }
})

export const { addNote, removeNote } = noteSlice.actions

export const selectNotes = (state: RootState) => state.notes;

export default persistReducer(persistConfig,noteSlice.reducer);