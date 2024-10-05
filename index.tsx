import * as objectGroupByPolyfill from "core-js/es/object/group-by.js";
import { render } from "react-dom";
import { App } from "./app.tsx";

const root = document.getElementById("root");

render(<App />, root);

// Preventing polyfills exclusion from output.
export { objectGroupByPolyfill };
