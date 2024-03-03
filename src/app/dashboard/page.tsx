'use client';
import { logoutUser } from "@/redux/slices/auth_slice";
import { useAppSelector, useAppDispatch } from "../../redux/hooks"
import { selectNotes, removeNote } from "../../redux/slices/note_slice"
import { useRouter } from 'next/navigation'
import styles from './dashboard.module.css'

const DashboardPage = (): JSX.Element => {
    const router = useRouter()
    const notesData = useAppSelector(selectNotes);
    const dispatch = useAppDispatch();
  
    const deleteNote = (noteId: string) => {
      dispatch(removeNote(noteId))
    }
  
    return <div>
      {notesData.notes.map((note) => {
        return <div key={note.id}>
          <h1>{note.heading}</h1>
          <p>{note.content}</p>
          <button onClick={() => deleteNote(note.id)}>Delete Note</button>
        </div>
      })}
      <button onClick={() => dispatch(logoutUser()).then(()=> router.push('/'))}>Logout User</button>
    </div>
}


export default DashboardPage;