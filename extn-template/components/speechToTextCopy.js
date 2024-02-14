import React, { useState, useRef, useEffect } from "react";
import { Button, CircularProgress, TextField } from "@mui/material";
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import Type2Ask from "~components/typeToAsk"
import { askGPT } from './askGPT.js';


const SpeechToText = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    const [speechText, setSpeechText] = useState("");
    const [isMicOn, setIsMicOn] = useState(false);
    const [promptAns, setPromptAns] = useState('');
    const [isEditable, setIsEditable] = useState(false);

    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    const toggleMic = () => {
        setIsMicOn(!isMicOn);
    };

    useEffect(() => {
        if (isMicOn) {
            // recognition.continuous = false;
            // recognition.stop();
            setSpeechText(" ")
        }
        else {
            // recognition.continuous = true;
            // recognition.start();
        }
    }, [isMicOn])

    recognition.onresult = (event) => {
        const transcript = Array.from(event.results).map(r => r[0]).map(r => r.transcript)
        console.log(transcript);
        setSpeechText(transcript);
    }

    recognition.addEventListener('end', () => {
        if (isMicOn) {
            recognition.start()
        }
        else {
            recognition.stop()
            console.log(speechText);
        }
    })

    const sendSpeech = () => {
        // return speechText.join(' ');
        let promptAns = askGPT(speechText);
        console.log(promptAns);
        promptAns.then((promptAns) => {
            // console.log(promptAns);
            setPromptAns(`${promptAns}`);
        }
        );

    }

    const handleEditClick = () => {
        setIsEditable(true);
    };

    return (
        <div className="speechToText">
            <Button
                variant="contained"
                color="primary"
                startIcon={isMicOn ? <CircularProgress size={24} /> : <MicIcon />}
                onClick={toggleMic}
            >
                {isMicOn ? "Listening..." : "Mic"}
            </Button>

            <TextField
                fullWidth
                label="Transcript"
                value={speechText}
                margin="normal"
                variant="outlined"

                multiline
                rows={4}
                disabled
            />

           

            <Button
                variant="contained"
                color="secondary"
                onClick={sendSpeech}
            >
                Send
            </Button>

            <textarea
                className="output-field"
                placeholder="Output will be shown here..."
                value={promptAns}
                readOnly
            />

            {/* <Type2Ask getSpeech={speechText} /> */}
        </div>
    );
};

export default SpeechToText;

// const SpeechToText = () => {
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
//     // const SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;
//     const recognition = new SpeechRecognition();
//     const speechRecognitionList = new SpeechGrammarList();

//     recognition.grammars = speechRecognitionList;
//     recognition.lang = "en-US";
//     recognition.interimResults = true;
//     recognition.maxAlternatives = 1;
//     const [speechText, setSpeechText] = useState();
//     const [isMicOn, setIsMicOn] = useState(false);
//     const [audioResponse, setAudioResponse] = useState();

//     let micVariable = false;
//     const speechConverter = (e) => {
//         console.log("mic clicked ", isMicOn);
//         //switch mic on and off
//         e.preventDefault()
//         if (isMicOn) {
//             setIsMicOn(false);
//         }
//         else {
//             setIsMicOn(true);
//         }
//     }
//     useEffect(() => {
//         if (isMicOn) {
//             // recognition.continuous = false;
//             recognition.stop();
//             setSpeechText(" ")
//         }
//         else {
//             // recognition.continuous = true;
//             recognition.start();
//         }
//     }, [isMicOn])



//     recognition.onresult = (event) => {


//         const transcript = Array.from(event.results).map(r => r[0]).map(r => r.transcript)
//         console.log(transcript);
//         setSpeechText(transcript);

//     }
//     recognition.addEventListener('end', () => {
//         if (isMicOn) {
//             recognition.start()
//         }
//         else {
//             recognition.stop()
//             console.log(speechText);
//         }
//     })
//     const sendSpeech = () => {
//         console.log(speechText);
//         return speechText;

//     }

//     return (
//         <>

//             <div className="speechToText">
//                 <button onClick={speechConverter}>Mic</button>
//                 <button onClick={sendSpeech}>Send</button>
//                 {/* <p>{speechText}</p> */}

//                 <Type2Ask getSpeech={speechText} />
//             </div>
//         </>
//     )
// }

// export default SpeechToText;