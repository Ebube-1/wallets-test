import React from "react";
import abi from "./abi.json";
import { ethers } from "ethers";
import './App.css'
import { useState } from "react";

const App = () => {
  const [userInput, setUserInput] = useState("");
  const [retrievedMessage, setRetrievedMessage] = useState("");
  const contractAddress = "0x472B39A9cfd617a37cA09b617BAB99Ed58aA5a74";

  async function requestAccounts() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  async function setUserMessage() {
    if(typeof window.ethereum !== undefined){
      await requestAccounts();

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const myContract = new ethers.Contract(contractAddress, abi, signer);

      try{
        const tx = await myContract.setMessage(userInput);
        const receipt = tx.wait();
        console.log("Successful  transaction", receipt);
      } catch (error) {
        console.log("failed  transaction", error);
      }
    }
  }

  async function getUserMessage() {
    if(typeof window.ethereum !== undefined){
      await requestAccounts();

      const provider = new ethers.BrowserProvider(window.ethereum);
      const myContract = new ethers.Contract(contractAddress, abi, provider);

      try{
        const tx = await myContract.getMessage()
        setRetrievedMessage(tx)
        console.log("Retrieval successful", tx);
      }catch (error){
        console.log("Retrieval failed", error);
      }
  }
}

    return (
      <div>
        <input type="text" placeholder="set your message" value ={userInput} onChange={(e)=> setUserInput(e.target.value)
        }/>
        <button onClick={setUserMessage} >setMessage</button>
        <button onClick={getUserMessage} >getMessage</button>
        <p>Message Retrieved: {retrievedMessage} </p>
     </div>
    );
  
}

export default App;
