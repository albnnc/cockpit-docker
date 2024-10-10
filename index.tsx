/// <reference path="./global.d.ts" />
import * as objectGroupByPolyfill from "core-js/es/object/group-by.js";
import { createRoot } from "react-dom/client";
import { App } from "./app.tsx";
import { initI18Next } from "./utils/init_i18next.ts";

initI18Next();

const rootContainer = document.getElementById("root");
const root = createRoot(rootContainer!);
root.render(<App />);

// Preventing polyfills exclusion from output.
export { objectGroupByPolyfill };
