import Logo from './assets/Logo.svg';
import { CardNew } from './components/cardNew/CardNew.tsx';
import { CardNote } from './components/cardNotes/CardNote.tsx';
import { useState } from 'react';

interface Note {
    id: string
    date: Date
    content: string
  
}


function App() {

  const [notes, setNotes] = useState<Note[]>([]);
  
  function onNoteCreated(content: string){
    
    const newNote = {
      id: crypto.randomUUID(), 
      date: new Date(), 
      content
    }
    setNotes([newNote,...notes ]);
  }



  return (
    <div className='mx-auto max-w-6xl my-12 space-y-6'>
      <img src={Logo} />

      <form action="" className='w-full'>
        <input type="text"
          name=""
          placeholder="Busque suas notas"
          className='w-full bg-transparent text-3xl font-semibold tracking-tighter outline-none placeholder:text-slate-500'
        />
      </form>
      <div className='grid grid-cols-3 gap-6 auto-rows-[250px] '>
        <CardNew onNoteCreated={onNoteCreated} />
        {notes.map(note => { return <CardNote key={note.id} note={note}/> })}
        
      </div>


    </div>
  )
}

export default App
