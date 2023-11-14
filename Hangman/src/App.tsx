import {useCallback, useEffect, useState} from "react"
import words from "./wordList.json"
import { HangmanDrawing } from "./HangmanDrawing";
import { HangmanWord } from "./HagnmanWord";
import { Keyboard } from "./Keyboard";

function App() {
  const [wordToGuess, setWordToGuess]=useState(
    () => {
      return words[Math. floor (Math. random() * words.length)]
    }
  );
  
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  const incorrectLetters = guessedLetters.filter(
        letter => !wordToGuess.includes(letter))

{/* Conectando los eventos del teclado con logica de React-TS*/}

const addGuessedLetter = useCallback(
  (letter:string)  => {
    if(guessedLetters.includes(letter))  return
    setGuessedLetters(currentLetters => [...currentLetters,letter])
  },[guessedLetters]
)

useEffect(() => {
  const handler = (e: KeyboardEvent) =>{
    const key = e.key

    if(!key.match(/^[a-z]$/)) return

    e.preventDefault()
    addGuessedLetter(key)
    console.log(guessedLetters)
    console.log(incorrectLetters)
  }

  document.addEventListener("keypress",handler)

  return() => {
    document.removeEventListener("keypress",handler)
  }
}, [guessedLetters])
//Haciendo referencia al array donde guardamos las letras

//Logica para determinar si gano o perdio
const isLoser = incorrectLetters.length >= 6
const isWinner = wordToGuess.split("").every(letter => 
  guessedLetters.includes(letter))

  return (
    <div
      style={{
        //Estilo del contenedor de los elementos
        maxWidth:"800 px",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        margin: "0 auto",
        alignItems: "center"
      }}>
        {/* Actualizando la carga de estado del juego */}
        <div style={{fontSize:"2rem", textAlign:"center"}}>
            {isWinner && "Has ganado! - Recarga para jugar de Nuevo!"}
            {isLoser && "Buen intento - Recarga para jugar de Nuevo!"}
        </div>
        <HangmanDrawing numberofGuesses={incorrectLetters.length}/>
        <HangmanWord guessedLetters={guessedLetters} wordtoGuess={wordToGuess}/>
        <div style={{alignSelf:"stretch"}}>
          {/* Añadiendo las funciones a Keyboard para implementar la logica de los botones para cada letra */}
          <Keyboard 
          disabled={isWinner || isLoser}
          activeLetters={guessedLetters.filter(letter =>
            wordToGuess.includes(letter)
          )}
          inactiveLetters = {incorrectLetters}
          addGuessedLetter  = {addGuessedLetter}
          />
        </div>
    </div>
  ) 
}

export default App