import { useEffect, useRef, useState } from "react";

const useSpeechRecognition = ({
  onCommand,
  continuous = false,
  lang = "en-IN",
}) => {
  const recognitionRef = useRef(null);
  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;

    recognition.continuous = continuous;
    recognition.interimResults = false;
    recognition.lang = lang;

    recognition.onstart = () => setListening(true);

    recognition.onend = () => setListening(false);

    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript
        .toLowerCase()
        .trim();

      if (onCommand) {
        onCommand(transcript);
      }
    };

    recognition.onerror = (error) => {
      console.error("Speech recognition error:", error);
      setListening(false);
    };

    return () => {
      recognition.stop();
    };
  }, [onCommand, continuous, lang]);

  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  return {
    listening,
    supported,
    startListening,
    stopListening,
  };
};

export default useSpeechRecognition;
