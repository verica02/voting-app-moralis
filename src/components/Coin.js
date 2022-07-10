import React, { useEffect, useState } from "react";
import "./Coin.css";

import { useWeb3ExecuteFunction, useMoralis } from "react-moralis";
import styled, { css } from 'styled-components'


function Coin({ perc, token, setModalToken, setVisible }) {
  const [color, setColor] = useState();
  const contractProcessor = useWeb3ExecuteFunction();
  const { isAuthenticated} = useMoralis();


  useEffect(() => {
    if (perc < 50) {
      setColor("#c43d08");
    } else {
      setColor("green");
    }
  }, [perc]);


  async function vote(upDown){

    let options = {
      contractAddress: "0x2feAc795E78c71440fDD58faacd0BeEED19F0FA1",
      functionName: "vote",
      abi: [
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "_ticker",
              "type": "string"
            },
            {
              "internalType": "bool",
              "name": "_vote",
              "type": "bool"
            }
          ],
          "name": "vote",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ],
      params: {
        _ticker: token,
        _vote: upDown,
      },
    }


    await contractProcessor.fetch({
      params: options,
      onSuccess: () => {
        console.log("vote succesful");
      },
      onError: (error) => {
        alert(error.data.message)
      }
    });

  }

  return (
    <>
      <div>
        <div className="token">{token}</div>
        <div className="circle">
          <div
            className="wave"
            style={{
              marginTop: `${100 - perc}%`,
              boxShadow: `0 0 30px ${color}`,
              backgroundColor: color,
            }}
          ></div>
          <div className="percentage">{perc}%</div>
        </div>

        <div className="votes">
          <Button1 
            onClick={() => {
              if(isAuthenticated){
                vote(true)
              }else{
                alert("Authenicate to Vote")
              }}} 
           >⬆</Button1>

          <Button2
            color="red"
            onClick={() => {
              if(isAuthenticated){
                vote(false)
              }else{
                alert("Authenicate to Vote")
              }}}
           
          >⬇</Button2>

        </div>
        <div className="votes">
            <Button
            onClick={()=>{
              setModalToken(token)
              setVisible(true);
            }}
          >INFO</Button>
        </div>
      </div>
    </>
  );
}

export default Coin;

const Button = styled.button`
  background: #f0e6ab;
  border-radius: 10px;
  border: none;
  color: #f4ac65;
  margin: 0 1em;
  padding: 1em 1em;

  &:hover {
    background: #f1f4f6;
    color: #f4ac65;
  }
  cursor: pointer;
`
const Button1 = styled.button`
  background: #98e8d0;
  border-radius: 10px;
  border: none;
  color: green;
  font-size: 2em;
  margin: 0 1em;
  padding: 0.05em 0.4em;
  box-shadow: 1.5px 2px 4px 0 rgba(0,0,0,.3),
  inset -5px -1px 6px 0.5px rgba(0,0,0,0.2),
  inset 2px 2px 2px 0 hsla(0,0%,100%,0.4);
  cursor: pointer;
`
const Button2 = styled.button`
  background: #f0abb1;
  border-radius: 10px;
  border: none;
  color: red;
  font-size: 2em;
  margin: 0 1em;
  padding: 0.05em 0.4em;
  box-shadow: 1.5px 2px 4px 0 rgba(0,0,0,.3),
  inset -5px -1px 6px 0.5px rgba(0,0,0,0.2),
  inset 2px 2px 2px 0 hsla(0,0%,100%,0.4);
  cursor: pointer;
`