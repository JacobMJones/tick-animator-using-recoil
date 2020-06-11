import React from "react";
import { RecoilRoot } from "recoil";
import "./App.css";
import Counter from "./functions/counter";
import Layout from "./components/Layout";
import Loader from "./components/Loader";
function App() {
  return (
    <RecoilRoot>
      <Counter />
      {/* <Loader /> */}
      <Layout />
    </RecoilRoot>
  );
}

export default App;
