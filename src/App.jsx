import { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getLanguages, translateText } from "./redux/actions/translateActions"
import store from "./redux/store"
import Select from 'react-select'
import { setAnswer } from "./redux/slices/translateSlice"


const App = () => {
  const dispatch = useDispatch()
  const languageSlice = useSelector(store => store.languageSlice)
  const translateSlice = useSelector(store => store.translateSlice)

  const [text, setText] = useState('')

  const [sourceLang, setSourceLang] = useState({
    "value": "az",
    "label": "Azerbaijani"
  })
  const [targetLang, setTargetLang] = useState(
    {
      "value": "en",
      "label": "English"
    }
  )


  useEffect(() => {
    dispatch(getLanguages())
  }, [])

  
  /*converting {code,name} into {values,label}*/
  const data = useMemo(
    () =>
      languageSlice.languages.map((i) => ({
        value: i.code,
        label: i.name,
      })),
    [languageSlice.languages]
  )

  const handleSwap = () => {
    // Get the current state values before the change
    const currentSourceLang = sourceLang;
    const currentTargetLang = targetLang;

    // Swap language selections
    setSourceLang(currentTargetLang);
    setTargetLang(currentSourceLang);

    setText(translateSlice.answer)

    dispatch(setAnswer(text))
  };



  return (
    <div id="main-page">
      <div className="container">
        <h1>Translater+</h1>

        {/*Top side*/}
        <div className="upper">

          <Select
            value={sourceLang}
            onChange={setSourceLang}
            className="select"
            options={data}
            isLoading={languageSlice.isLoading}
            isDisabled={languageSlice.isLoading}
          />

          <button onClick={handleSwap}
          >Change</button>

          <Select
            value={targetLang}
            onChange={setTargetLang}
            className="select"
            options={data}
            isLoading={languageSlice.isLoading}
            isDisabled={languageSlice.isLoading}
          />
        </div>

        {/*Middle side*/}
        <div className="middle">

          <div>
            <textarea value={text}
            onChange={(e) => setText(e.target.value)} />
          </div>

          <div>
            <textarea disabled
              value={translateSlice.answer} />
            {translateSlice.isLoading &&
              <div className="wrapper">
                <section class="dots-container">
                  <div class="dot"></div>
                  <div class="dot"></div>
                  <div class="dot"></div>
                  <div class="dot"></div>
                </section>

              </div>

            }
          </div>

        </div>

        {/*Bottom side*/}
        <button onClick={() => dispatch(translateText({ text, sourceLang, targetLang }))}
        >Translate
        </button>
      </div>
    </div>

  )
}

export default App