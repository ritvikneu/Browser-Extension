import { useState } from 'react';
import * as React from 'react';
import {askGPT} from './askGPT.js';

const Type2Ask = (props) => {
  const [inputValue, setInputValue] = useState('');
  const [promptAns, setPromptAns] = useState('');

  const handleInputChange = (event) => {
    // const inputData = props.getSpeech();
    // setInputValue(inputData);
    setInputValue(event.target.value);
  };

  const handleButtonClick =  () => {
    try {
      const inputData = props.getSpeech;
      setInputValue(inputData);
      let promptAns =  askGPT(inputValue);
      console.log(promptAns);
      promptAns.then((promptAns) => { 
        // console.log(promptAns);
        setPromptAns(`${promptAns}`);
      }
      );
      
    } catch (error) {
      console.error('Error fetching GPT response:', error);
      // Optionally, display an error message to the user
    }
  };


  return (
    <div className="input-button-container">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        className="input-field"
        placeholder="Enter text here..."
      />
      {/* <p> {props.getSpeech} </p> */}
      <button className="button" onClick={handleButtonClick}>
        Submit
      </button>
      <textarea
        className="output-field"
        placeholder="Output will be shown here..."
        value={promptAns}
        readOnly
      />
    </div>
  );
};

export default Type2Ask;


//   return (
//     <div className="input-button-container">
//       {/* ... input and button elements ... */}
//       <textarea
//         className="output-field"
//         placeholder="Output will be shown here..."
//         value={promptAns} // Display the response
//         readOnly
//       />
//     </div>
//   );
// };

// export default Type2Ask;
