import Logo from './assets/Logo.svg';
import { CardNew } from './components/cardNew/CardNew.tsx';
import { CardNote } from './components/cardNotes/CardNote.tsx';
import { ChangeEvent, useState } from 'react';

interface Note {
  id: string
  date: Date
  content: string

}


function App() {
  const [search, setSearch] = ('')
  const [notes, setNotes] = useState<Note[]>(() => {
    const notesOnStorage = localStorage.getItem("notes");

    if (notesOnStorage) {
      return JSON.parse(notesOnStorage);
    }

    return [];
  });


  function onNoteCreated(content: string) {

    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content
    }
    const notesArray = [newNote, ...notes]
    setNotes(notesArray);

    localStorage.setItem('notes', JSON.stringify(notesArray))
  }

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    const query = event.target.value;

    setSearch(query);
  }

  const filterNotes = search !== '' 
  ? notes.filter(note => note.content.includes(search))
  : notes

  return (
    <div className='mx-auto max-w-6xl my-12 space-y-6'>
      <img src={Logo} />

      <form action="" className='w-full'>
        <input type="text"
          name=""
          placeholder="Busque suas notas"
          className='w-full bg-transparent text-3xl font-semibold tracking-tighter outline-none placeholder:text-slate-500'
          onChange={handleSearch}
        />
      </form>
      <div className='grid grid-cols-3 gap-6 auto-rows-[250px] '>
        <CardNew onNoteCreated={onNoteCreated} />
        {filterNotes.map(note => { return <CardNote key={note.id} note={note} /> })}

      </div>


    </div>
  )
}

export default App
