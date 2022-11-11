"use client";
import { useEffect, useState } from "react";
import { useChannel } from "./ReactEffect";
import styles from "./Chat.module.scss";
import Head from "next/head";

export default function ChatComponent() {
  let inputBox: any = null;
  let messageEnd: any = null;

  const [messageText, setMessageText] = useState("");
  const [receivedMessages, setMessages]: [any, Function] = useState([]);
  const messageTextisEmpty = messageText.trim().length === 0;

  const [channel, ably]: any = useChannel(
    "chat-app-pierregueroult",
    (message: any) => {
      const history = receivedMessages.slice(-199);
      setMessages([...history, message]);
    }
  );

  const sendChatMessage = (messageText: string) => {
    channel.publish({ name: "chat-message", data: messageText });
    setMessageText("");
    inputBox.focus();
  };

  const handleFormSubmission = (event: any) => {
    event.preventDefault();
    sendChatMessage(messageText);
    inputBox.value = "";
  };

  const handleKeyPress = (event: any) => {
    if (event.charCode !== 13 || messageTextisEmpty) {
      return;
    }
    sendChatMessage(messageText);
    inputBox.value = "";
    event.preventDefault();
  };

  const messages = receivedMessages.map((message: any, index: number) => {
    const author = message.connectionId === ably.connection.id ? "me" : "other";
    return (
      <span key={index} data-author={author}>
        {message.data}
      </span>
    );
  });

  useEffect(() => {
    messageEnd.scrollIntoView({ behavior: "smooth" });
  });

  return (
    <article className={styles.article}>
      <Head>
        <title>Page pour Chatter</title>
      </Head>
      <div className={styles.chatBox}>
        {messages}
        <div
          ref={(element) => {
            messageEnd = element;
          }}
        ></div>
      </div>
      <form onSubmit={handleFormSubmission} className={styles.form}>
        <textarea
          ref={(element) => {
            inputBox = element;
          }}
          placeholder="écrit un message ici ..."
          onChange={(e) => setMessageText(e.target.value)}
          onKeyPress={handleKeyPress}
          className={styles.input}
        />
        <button
          type="submit"
          disabled={messageTextisEmpty}
          className={styles.button}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L277.3 424.9l-40.1 74.5c-5.2 9.7-16.3 14.6-27 11.9S192 499 192 488V392c0-5.3 1.8-10.5 5.1-14.7L362.4 164.7c2.5-7.1-6.5-14.3-13-8.4L170.4 318.2l-32 28.9 0 0c-9.2 8.3-22.3 10.6-33.8 5.8l-85-35.4C8.4 312.8 .8 302.2 .1 290s5.5-23.7 16.1-29.8l448-256c10.7-6.1 23.9-5.5 34 1.4z" />
          </svg>
        </button>
      </form>
    </article>
  );
}
