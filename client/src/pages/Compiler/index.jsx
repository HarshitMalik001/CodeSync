import React, { useState, useEffect, useRef } from "react";
import codeSnippets from "../../components/codeSnippets";
import ACTIONS from "../../Action";

// Function to create a submission
const createSubmission = async (languageId, code, input) => {
  const url = "https://judge0-ce.p.rapidapi.com/submissions?fields=*";
  const options = {
    method: "POST",
    headers: {
      "x-rapidapi-key": "5ac47ae538msh90fce1baad47ea3p195c46jsnc31aa49e3713",
      "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      language_id: languageId,
      source_code: code,
      stdin: input,
    }),
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result.token;
  } catch (error) {
    console.error("Error creating submission:", error);
    throw new Error("Failed to create submission.");
  }
};

// Function to get the result of a submission
const getSubmission = async (token) => {
  const url = `https://judge0-ce.p.rapidapi.com/submissions/${token}?base64_encoded=true&fields=*`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "5ac47ae538msh90fce1baad47ea3p195c46jsnc31aa49e3713",
      "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching submission:", error);
    throw new Error("Failed to fetch submission result.");
  }
};

const CompilerPage = ({ socketRef, roomId, onCodeChange }) => {
  const [language, setLanguage] = useState("javascript");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState(codeSnippets[language]);
  const editorRef = useRef(null);

  const compileCode = async () => {
    setLoading(true);
    setOutput("");

    try {
      const languageCodes = {
        javascript: 93,
        java: 91,
        c: 54,
        python: 92,
        cpp: 50,
      };

      const languageId = languageCodes[language];
      const token = await createSubmission(languageId, code, input);

      if (!token) {
        throw new Error("Failed to retrieve token.");
      }

      let result;
      do {
        result = await getSubmission(token);
      } while (result.status.id < 3);

      const decodedOutput = result.stdout
        ? atob(result.stdout)
        : result.stderr
          ? atob(result.stderr)
          : "No output.";
      setOutput(decodedOutput);
    } catch (error) {
      console.error(error);
      setOutput("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;

      // Insert 4 spaces
      // setCode(
      //   (prevCode) =>
      //     prevCode.substring(0, start) + "    " + prevCode.substring(end)
      // );
      // Move the cursor
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 4;
      }, 0);
    }

    // Handle auto-closing brackets and quotes
    const char = e.key;
    const closingChars = {
      "(": ")",
      "[": "]",
      "{": "}",
      '"': '"',
      "'": "'",
    };

    if (closingChars[char]) {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;

      // Insert the character and its closing counterpart
      setCode(
        (prevCode) =>
          prevCode.substring(0, start) +
          char +
          closingChars[char] +
          prevCode.substring(end)
      );
      // Move the cursor between the characters
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 1;
      }, 0);
    }
  };


  useEffect(() => {
    setCode(codeSnippets[language]);
  }, [language]);

  const myChange = (e) => {
    const newCode = e.target.value;
    setCode(newCode);
    if (socketRef.current) {
      socketRef.current.emit(ACTIONS.CODE_CHANGE, { roomId, newCode });
    }
  }


  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on(ACTIONS.CODE_CHANGE, (codeRec) => {
        if (code !== codeRec.code) {
          setCode(codeRec.code);
        }
      });
      return () => {
        socketRef.current.off(ACTIONS.CODE_CHANGE);
      };
    }
  }, [code]);





  return (

    <div className="absolute top-10 left-28 rounded-xl flex h-[80vh] w-[80vw] bg-gray-900 text-white">

      {/* Left Section: Code Editor */}

      <div className="w-2/3 p-6">

        <textarea
          id="code"
          ref={editorRef}
          value={code}
          onChange={myChange}
          onKeyDown={handleKeyDown} rows="10"
          className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none mb-4"
          placeholder="Write your code here..."
        ></textarea>

      </div>

      {/* Right Section: Language Selector, Compile Button, Input, Output */}
      <div className="w-1/3 p-6 flex flex-col">

        {/* Language Selector and Compile Button */}
        <div className="flex gap-4 mb-6">
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none"
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="c">C</option>
            <option value="cpp">C++</option>
          </select>
          <button
            onClick={compileCode}
            disabled={loading}
            className={`w-full ${loading ? "bg-gray-600" : "bg-blue-600 hover:bg-blue-700"} text-white font-semibold py-3 rounded-lg transition-all`}
          >
            {loading ? "Compiling..." : "Compile"}
          </button>
        </div>

        {/* Input/Output Section */}
        <div className="flex flex-col gap-4">

          {language !== "javascript" && (
            <>
              <label htmlFor="input" className="block text-lg font-semibold">
                Input
              </label>
              <textarea
                id="input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows="5"
                className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none"
                placeholder="Enter input for your code..."
              ></textarea>
            </>
          )}

          {/* Output Display */}
          <label htmlFor="output" className="block text-lg font-semibold">
            Output
          </label>
          <textarea
            id="output"
            value={output}
            readOnly
            rows="5"
            className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none"
            placeholder="Compilation output will appear here..."
          ></textarea>
        </div>

      </div>
    </div>

  );
};

export default CompilerPage;
