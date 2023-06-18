import { useEffect, useState } from "react";
import { over } from "stompjs";
<<<<<<< HEAD:frontend/src/pages/Chat.jsx
import SockJS from "sockjs-client";
// import "../../dist/output.css";
=======
import "../../dist/output.css";
>>>>>>> origin/main:frontend/src/components/Chat.jsx

var stompClient = null;
const ChatRoom = () => {
  const [privateChats, setPrivateChats] = useState(new Map());
  const [publicChats, setPublicChats] = useState([]);
  const [tab, setTab] = useState("CHATROOM");
  const [userData, setUserData] = useState({
    username: "",
    receivername: "",
    connected: false,
    message: "",
  });
  useEffect(() => {
    console.log(userData);
  }, [userData]);

  const connect = () => {
    stompClient = over(new WebSocket("ws://localhost:8080/ws"));

    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    setUserData({ ...userData, connected: true });
    stompClient.subscribe("/chatroom/public", onMessageReceived);
    stompClient.subscribe(
      "/user/" + userData.username + "/private",
      onPrivateMessage
    );
    userJoin();
  };

  const userJoin = () => {
    var chatMessage = {
      senderName: userData.username,
      status: "JOIN",
    };
    stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
  };

  const onMessageReceived = (payload) => {
    var payloadData = JSON.parse(payload.body);
    switch (payloadData.status) {
      case "JOIN":
        if (!privateChats.get(payloadData.senderName)) {
          privateChats.set(payloadData.senderName, []);
          setPrivateChats(new Map(privateChats));
        }
        break;
      case "MESSAGE":
        publicChats.push(payloadData);
        setPublicChats([...publicChats]);
        break;
    }
  };

  const onPrivateMessage = (payload) => {
    console.log(payload);
    var payloadData = JSON.parse(payload.body);
    if (privateChats.get(payloadData.senderName)) {
      privateChats.get(payloadData.senderName).push(payloadData);
      setPrivateChats(new Map(privateChats));
    } else {
      let list = [];
      list.push(payloadData);
      privateChats.set(payloadData.senderName, list);
      setPrivateChats(new Map(privateChats));
    }
  };

  const onError = (err) => {
    console.log(err);
  };

  const handleMessage = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, message: value });
  };
  const sendValue = () => {
    if (stompClient) {
      var chatMessage = {
        senderName: userData.username,
        message: userData.message,
        status: "MESSAGE",
      };
      console.log(chatMessage);
      stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: "" });
    }
  };

  const sendPrivateValue = () => {
    if (stompClient) {
      var chatMessage = {
        senderName: userData.username,
        receiverName: tab,
        message: userData.message,
        status: "MESSAGE",
      };

      if (userData.username !== tab) {
        privateChats.get(tab).push(chatMessage);
        setPrivateChats(new Map(privateChats));
      }
      stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: "" });
    }
  };

  const handleUsername = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, username: value });
  };

  const registerUser = () => {
    connect();
  };
  return (
    <div className="font-signifka-negative container relative ">
      {userData.connected ? (
        <div className="chat-box p-12">
          <div className="member-list  w-1/5 ">
            <ul>
              <li
                onClick={() => {
                  setTab("CHATROOM");
                }}
                className={`bg-palette-light-color-2 px-3   ${
                  tab === "CHATROOM" && "active"
                } `}
              >
                <p>Chatroom</p>
              </li>
              {[...privateChats.keys()].map((name, index) => (
                <li
                  onClick={() => {
                    setTab(name);
                  }}
                  className={`member px-3 ${tab === name && "active"} `}
                  key={index}
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>
          {tab === "CHATROOM" && (
            <div className="chat-content w-4/5">
              <ul className="chat-messages mb-5 h-4/5 ">
                {publicChats.map((chat, index) => (
                  <li
                    className={`message ${
                      chat.senderName === userData.username && "self"
                    }`}
                    key={index}
                  >
                    {chat.senderName !== userData.username && (
                      <div className="avatar bg-palette-light-color-2">
                        {chat.senderName}
                      </div>
                    )}
                    <div className="message-data">{chat.message}</div>
                    {chat.senderName === userData.username && (
                      <div className="avatar  bg-palette-light-color-3">
                        {chat.senderName}
                      </div>
                    )}
                  </li>
                ))}
              </ul>

              <div className="send-message spacing-x-2 flex w-full flex-wrap lg:flex-nowrap">
                <input
                  type="text"
                  className="input-message w-11/12 border border-palette-light-color-2 "
                  placeholder="enter the message"
                  value={userData.message}
                  onChange={handleMessage}
                />
                <button
                  type="button"
                  className="send-button mx-5 my-2   bg-palette-light-color-2"
                  onClick={sendValue}
                >
                  send
                </button>
              </div>
            </div>
          )}
          {tab !== "CHATROOM" && (
            <div className="chat-content">
              <ul className="chat-messages mb-5  h-4/5">
                {[...privateChats.get(tab)].map((chat, index) => (
                  <li
                    className={`message flex w-auto flex-row p-5 ${
                      chat.senderName === userData.username && "self"
                    }`}
                    key={index}
                  >
                    {chat.senderName !== userData.username && (
                      <div className="avatar bg-palette-light-color-2">
                        {chat.senderName}
                      </div>
                    )}
                    <div className="message-data">{chat.message}</div>
                    {chat.senderName === userData.username && (
                      <div className="avatar  bg-palette-light-color-3">
                        {chat.senderName}
                      </div>
                    )}
                  </li>
                ))}
              </ul>

              <div className="send-message  spacing-x-2 flex w-full flex-wrap lg:flex-nowrap">
                <input
                  type="text"
                  className="input-message border border-palette-light-color-2"
                  placeholder="enter the message"
                  value={userData.message}
                  onChange={handleMessage}
                />
                <button
                  type="button"
                  className="send-button mx-5 my-2 bg-palette-light-color-2"
                  onClick={sendPrivateValue}
                >
                  send
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="register ">
          <input
            className="border border-palette-light-color-2  focus:border-4 focus:border-palette-light-color-2"
            id="user-name"
            placeholder="Enter your name"
            name="userName"
            value={userData.username}
            onChange={handleUsername}
          />
          <button
            className="mx-5 bg-palette-light-color-2"
            type="button"
            onClick={registerUser}
          >
            connect
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatRoom;
