import React, { useState, useRef, useEffect } from "react";
import { Button, CircularProgress, TextField, InputAdornment } from "@mui/material";
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import EditIcon from '@mui/icons-material/Edit';
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
        // if (!isMicOn) {
        //     console.log("mic on ",isMicOn);
        //     setIsEditable(true); // Make text field editable when stopping the mic
        //      recognition.continuous = true;
        //     recognition.start();
        // }else{
        //     console.log("mic off ",isMicOn);
        //     recognition.continuous = false;
        //     recognition.stop();
        // }
    };

    useEffect(() => {
        if (!isMicOn) {
            setSpeechText("Off")
            console.log("effect mic off ", isMicOn);
            recognition.continuous = false;
            recognition.stop();
        }
        else {
            console.log("effect mic on ", isMicOn);
            recognition.continuous = true;
            recognition.start();

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
        }
    }, [isMicOn])



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
                onChange={(e) => setSpeechText(e.target.value)}
                margin="normal"
                variant="outlined"
                multiline
                rows={4}
                disabled={!isEditable}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <EditIcon
                                onClick={handleEditClick}
                                style={{ cursor: 'pointer' }}
                            />
                        </InputAdornment>
                    ),
                }}
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
                placeholder="Output change be shown here..."
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