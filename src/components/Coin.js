import React, { useEffect, useState } from "react";
import "./Coin.css";
import {Button} from "web3uikit";
import {useWeb3ExecuteFunction, useMoralis} from 'react-moralis';

//this is where we build our executing smart contract functionality

function Coin({perc, setPerc, token, setModalToken, setVisible}) {

  const [color, setColor] = useState();

  const contractProcessor = useWeb3ExecuteFunction();
  const {isAuthenticated} = useMoralis();//you have to connecrt your wallet int order to authenticate and vote

  useEffect(() => {
    if(perc < 50){
      setColor("red");
    }
    else if(perc >= 50){
      setColor("green");
    }
  }, [perc]);


async function vote(upDown){
let options = {
  contractAddress: "0x2feAc795E78c71440fDD58faacd0BeEED19F0FA1",
  functionName: "vote",
  abi: [{"inputs":[{"internalType":"string","name":"_ticker","type":"string"},{"internalType":"bool","name":"_vote","type":"bool"}],"name":"vote","outputs":[],"stateMutability":"nonpayable","type":"function"}],
  params: {
    _ticker: token,
    _vote: upDown
  },
}


  /* await contractProcessor.fetch({
    params:options,
    onSuccess: () => {
      console.log('vote successful')
    },
    onError: (error) => {
      alert(error.data.message)
    }
  }) */
  
  await contractProcessor.fetch({
   params:options,
   onSuccess: () => {
     console.log('vote successful')
   },
   onError: (error) => {
      alert(error.data.message)
    }
  })
}


  return (
    <>
    <div>
     <div className = "token">{token}</div>
        <div className = "circle" 
        style = {{
            boxShadow: `0 0 20px ${color}`
          }}>

          <div className = "wave" 
          style = {{ 
            backgroundColor: color,
            marginTop: `${100 - perc}%`,
            boxShadow: `0 0 20px ${color}`
           
          }}>

          </div>

          <div className = "percentage">
            {perc}%
          </div>

        </div>
         <div className = "votes">
              <Button 
              onClick = {() => {
                if(isAuthenticated){
                  vote(true)
                }
                else{
                  alert("You need to connect your wallet to vote")
                }
              }
            }
              text = "Up"
              theme = "primary"
              type = "button"
              />
              <Button 
              onClick = {() => {if(isAuthenticated){
                vote(false)
              }
              else{
                alert("You need to connect your wallet to vote")
              }
            }}
              color = "red"
              text = "Down"
              theme = "colored"
              type = "button"
              />
         </div>
          <div className = "votes">
            <Button 
            onClick = {() => {
              setModalToken(token);
              setVisible(true);
            }}
            text = "More Info"
            theme = "translucent"
            type = "button"
            />
          </div>
    </div>

    </>
  );
}

export default Coin;
