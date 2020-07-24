import React from "react";
import { RecoilRoot } from "recoil";
import "./App.css";
import Counter from "./functions/counter";
import Layout from "./components/Layout2";


function App() {
  return (
    <RecoilRoot>
      <Counter />
      <Layout/>
    </RecoilRoot>
  );
}

export default App;
