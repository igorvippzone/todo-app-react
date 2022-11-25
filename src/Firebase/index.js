import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAgOhPP1SsceKWQl1_6_c-MVKd6gUdbMRQ",
  authDomain: "todo-3a084.firebaseapp.com",
  databaseURL: "https://todo-3a084-default-rtdb.firebaseio.com",
  projectId: "todo-3a084",
  storageBucket: "todo-3a084.appspot.com",
  messagingSenderId: "907695679942",
  appId: "1:907695679942:web:9800e7b3e2d1c6e2842ac7",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };

export const setFetchTodos = (todos) =>
  fetch("https://todo-3a084-default-rtdb.firebaseio.com/todos.json", {
    method: "PUT",
    body: JSON.stringify(todos),
    headers: {
      "Content-Type": "application/json",
    },
  });
