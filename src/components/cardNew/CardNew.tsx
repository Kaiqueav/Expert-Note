import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast} from 'sonner'

interface CardNewProps {
    onNoteCreated : (content: string) => void
}

export const CardNew = ({ onNoteCreated }:CardNewProps) => {

    const [shouldShowOnBoarding, setShouldShowOnBoarding] = useState(true);
    const [content, setContent] = useState('');

    const handleStartEdition = () =>{
        setShouldShowOnBoarding(false);
    }


    function handleContentChanged(event: ChangeEvent<HTMLTextAreaElement>) {
        
        setContent(event.target.value);

        if(event.target.value===''){
            setShouldShowOnBoarding(true);
        }
    }


    const handleSaveNote = (event: FormEvent) =>{
        event.preventDefault();
    
        onNoteCreated(content)
        setContent('')

        toast.success("Nota Criada com sucesso!")

    }


    return (
        <Dialog.Root>
            <Dialog.Trigger className="rounded-md flex flex-col bg-slate-700 p-5 text-left gap-3 hover:ring-2">
                <span className="text-sm font-medium text-slate-200"> Adicionar Nota</span>
                <p className="text-sm leading-6 text-slate-600">
                    Grave uma nota em audio que sera convertida em texto  automaticamente
                </p>
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className="inset-0 fixed bg-black/50" />
                <Dialog.Content className="fixed rounded-md overflow-hidden left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full bg-slate-700 outline-none flex flex-col">
                    <form onSubmit={handleSaveNote} className="flex-1 flex flex-col">
                        
                    
                    <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100">
                        <X className="size-5" />
                    </Dialog.Close>
                    <div className="flex flex-1 flex-col gap-3 p-5 ">
                        <span className="text-sm font-medium text-slate-300">  </span>


                        {shouldShowOnBoarding ?(
                            <p className="text-sm leading-6 text-slate-400">
                            Comece <button className="font-medium text-lime-400 hover:underline">gravando uma nota  </button> em audio <button className="font-medium text-lime-400 hover:underline"   onClick={handleStartEdition} >ou se preferir ultilize apenas texto</button> 
                            </p>
                         ) : (
                            <textarea
                             className="text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none" 
                             onChange={handleContentChanged}
                             autoFocus
                             value={content}/>
                         )}
                        
                    </div>

                    <button type="submit" className="w-full font-medium bg-lime-400 py-4 text-center text-sm outline-none text-lime-950 hover:bg-lime-500"

                    >
                        Salvar Nota?
                    </button>
                    </form>
                </Dialog.Content>

            </Dialog.Portal>


        </Dialog.Root>

    )
}