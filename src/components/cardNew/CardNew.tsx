import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from 'sonner'

interface CardNewProps {
    onNoteCreated: (content: string) => void
}
let speechRecognition: SpeechRecognition | null = null;

export const CardNew = ({ onNoteCreated }: CardNewProps) => {
    // estados
    const [shouldShowOnBoarding, setShouldShowOnBoarding] = useState(true);
    const [content, setContent] = useState('');
    const [recording, setRecording] = useState(false);

    // função para inserir texto
    const handleStartEdition = () => {
        setShouldShowOnBoarding(false);
    }
    // função para pegar o que é digitado no formulario
    function handleContentChanged(event: ChangeEvent<HTMLTextAreaElement>) {

        setContent(event.target.value);

        if (event.target.value === '') {
            setShouldShowOnBoarding(true);
        }
    }

    // função para salvar as notas
    const handleSaveNote = (event: FormEvent) => {
    // verificando se a nota esta preenchida, para que possa ser criada
        if(content ===''){
            return
        }

        // criando nota
        event.preventDefault();

        onNoteCreated(content)
        setContent('')
        setShouldShowOnBoarding(true)
        toast.success("Nota Criada com sucesso!")

    }
    // função para inicar gravação de audio!
    const handleStartRecording = () => {
        // verificando se o navgador suporta a API
        const isSpeechApiAvailable ='SpeechRecognition' in window || "webkitSpeechRecognition" in window;

        if(!isSpeechApiAvailable){
            alert("infelizmente seu navagador não  suporta essa funcionalidade")
            return;
        }
        setRecording(true);
        setShouldShowOnBoarding(false);
        const SpeechRecognitionAPI = window.SpeechRecognition  || window.webkitSpeechRecognition;

        speechRecognition = new SpeechRecognitionAPI();


        speechRecognition.lang = 'pt-br';
        // so vai parar quando falar 'pare'
        speechRecognition.continuous = true;
        // se não entender a api vai encontrar uma plavra parecida
        speechRecognition.maxAlternatives = 1;
        // escreve enquanto voce fala
        speechRecognition.interimResults =true;


        speechRecognition.onresult = (event) =>{
           const transcption = Array.from(event.results).reduce((text, result) => {
            return text.concat(result[0].transcript)
           },'')

           setContent(transcption)
        }   
        speechRecognition.onerror = (event) => {
            console.error(event);
        }

        speechRecognition.start();
    }

    const handleStopRecording = () => {
        setRecording(false);

        if(speechRecognition !== null){
            speechRecognition.stop();
        }

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
                <Dialog.Content className="fixed md:rounded-md overflow-hidden inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-fullmd:h-[60vh] bg-slate-700 outline-none flex flex-col">
                    <form  className="flex-1 flex flex-col">
                        <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100">
                            <X className="size-5" />
                        </Dialog.Close>
                        <div className="flex flex-1 flex-col gap-3 p-5 ">
                            <span className="text-sm font-medium text-slate-300">  </span>
                            {shouldShowOnBoarding ? (
                                <p className="text-sm leading-6 text-slate-400">
                                    Comece <button className="font-medium text-lime-400 hover:underline" type="button" onClick={handleStartRecording}> gravando uma nota  </button> em audio <button className="font-medium text-lime-400 hover:underline" type="button" 
                                    onClick={handleStartEdition} >ou se preferir ultilize apenas texto</button>
                                </p>
                            ) : (
                                <textarea
                                    className="text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none"
                                    onChange={handleContentChanged}
                                    autoFocus
                                    value={content} />
                            )}
                        </div>

                        {recording ? (
                        <button type="button" onClick={handleStopRecording}
                         className="w-full flex items-center justify-center gap-2 font-medium bg-slate-900 py-4 text-center text-sm outline-none text-white hover:bg-lime-500"
                        >
                        <div className="size-3 rounded-full bg-red-500 animate-pulse"  />
                            Gravando! ( clique para interromper)
                        </button>
                        ) : (
                            <button  onClick={handleSaveNote} type="submit"
                             className="w-full font-medium bg-lime-400 py-4 text-center text-sm outline-none text-lime-950 hover:bg-lime-500"
                            >
                                Salvar Nota?
                            </button>
                        )}
                    </form>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}