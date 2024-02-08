import * as Dialog from "@radix-ui/react-dialog";



interface NoteCardsProps{
  note: {
    date: Date,
    content: string
 }
}


export const CardNote = (props: NoteCardsProps) => {
  return (
      <Dialog.Root>
          <Dialog.Trigger className="rounded-md text-left flex flex-col bg-slate-800 p-5gap-3 overflow-hidden relative outline-none hover:ring-2">
            <span className="text-sm font-medium text-slate-300"> {props.note.date.toISOString()}</span>
            <p className="text-sm leading-6 text-slate-400"> {props.note.content} </p>


            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none"></div>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="inset-0 fixed bg-black/50"/>
            <Dialog.Content className="fixed rounded-md 
            left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
            max-w-[640px] w-full bg-slate-700 outline-none
            flex flex-col"> cu </Dialog.Content>
            <div className="flex flex-1 flex-col gap-3 p-5 ">
              <span className="text-sm font-medium text-slate-300"> {props.note.date.toISOString()}</span>
              <p className="text-sm leading-6 text-slate-400"> {props.note.content} </p>
            </div>
          </Dialog.Portal>
      </Dialog.Root>
      
        
  )
}
