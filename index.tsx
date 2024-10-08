/// <reference path="./global.d.ts" />
import * as objectGroupByPolyfill from "core-js/es/object/group-by.js";
import { createRoot } from "react-dom/client";
import { App } from "./app.tsx";

const rootContainer = document.getElementById("root");
const root = createRoot(rootContainer!);
root.render(<App />);

// Preventing polyfills exclusion from output.
export { objectGroupByPolyfill };
