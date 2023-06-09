import "./js/init";
import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import ChatRoom from "./components/chat";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChatRoom />
  </React.StrictMode>
);
