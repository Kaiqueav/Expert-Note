import Logo from './assets/Logo.svg';

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


    </div>
  )
}

export default App
