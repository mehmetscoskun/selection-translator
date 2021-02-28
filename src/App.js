import React, { useState, useCallback } from "react";
import { translateText } from "./translate/translateText";
import "./App.css";
import "./button.css";

const languageCodes = {
  english: "en",
  turkish: "tr",
  dutch: "nl",
};

const findSelectedText = () => {
  console.log("selectedText1");
  const selectedText = window.getSelection().toString();
  const translatedText = translateText(selectedText, languageCodes.turkish);

  console.log("selectedText2", selectedText);
  if (translatedText || translatedText.length) {
    return translatedText[0];
  }

  return "Herhangi bir anlam bulunamadi";
};

function App() {
  const [selectedText, setSelectedText] = useState("");
  const handleClick = useCallback(async (e) => {
    // eslint-disable-next-line no-undef
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    // eslint-disable-next-line no-undef
    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        function: findSelectedText,
      },
      (injResult) => {
        console.log("injResult", injResult);
        setSelectedText(injResult[0].result);
      }
    );
  }, []);

  return (
    <div className="App">
      <p id="selectedTextContent">{selectedText}</p>
      <button id="selectText" onClick={handleClick}></button>
    </div>
  );
}

export default App;
