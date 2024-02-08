import Logo from './assets/Logo.svg';
import { CardNew } from './components/cardNew/CardNew.tsx';
import { CardNote } from './components/cardNotes/CardNote.tsx';

const note = {
  date: new Date(),
  content: 'Hello world'
}

function App() {

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
         <CardNew/>
         <CardNote  note={note} /> 
      </div>
     

    </div>
  )
}

export default App
