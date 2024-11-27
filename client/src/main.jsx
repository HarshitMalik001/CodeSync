import { createRoot } from "react-dom/client";
import { App } from "./App";
import './tailwind.css';

const reactProjectRoot = createRoot(document.getElementById("root"));
reactProjectRoot.render(<App />)  
