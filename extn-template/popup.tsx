import { useState } from "react"
// import Type2Ask from "~components/typeToAsk"
import SpeechToText from "~components/speechToText"


function IndexPopup() {
  const [data, setData] = useState("")

  return (
    <div
      style={{
        padding: 16
      }}>
      <h2>
        Ask GPT: Extension!
      </h2>
      <SpeechToText />
    </div>
  )
}

export default IndexPopup
