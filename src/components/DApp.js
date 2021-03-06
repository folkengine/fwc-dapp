import React from "react";
import { newContextComponents } from "drizzle-react-components";
import { DrizzleContext } from "drizzle-react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import WagerList from './WagerList';

const { AccountData, ContractData, ContractForm } = newContextComponents;

export default () => (
  <DrizzleContext.Consumer>
    {drizzleContext => {
      const { drizzle, drizzleState, initialized } = drizzleContext;
      if (!initialized) {
        return "Loading...";
      }
      
      const { accounts } = drizzleState;
      return (
        <div className="App">
          <ToastContainer />
         
          <div className="section">
            <AccountData drizzle={drizzle} drizzleState={drizzleState} accountIndex="0" units="ether" precision="3" />
          </div>
          
          <div className="section">
            <h2>FWC</h2>
            <p>
              <strong>Total Supply: </strong>
              <ContractData
                drizzle={drizzle}
                drizzleState={drizzleState}
                contract="FWC"
                method="totalSupply"
                methodArgs={[{ from: accounts[0] }]}
              />{" "}
              <ContractData
                drizzle={drizzle}
                drizzleState={drizzleState}
                contract="FWC"
                method="symbol"
                hideIndicator
              />
            </p>
            <p>
              <strong>Is Minter: </strong>
              <ContractData
                drizzle={drizzle}
                drizzleState={drizzleState}
                contract="FWC"
                method="isMinter"
                methodArgs={[accounts[0]]}
              />
            </p>
            <p>
              <strong>My Balance: </strong>
              <ContractData
                drizzle={drizzle}
                drizzleState={drizzleState}
                contract="FWC"
                method="balanceOf"
                methodArgs={[accounts[0]]}
              />&nbsp; FWC
            </p>
            <h3>Make Wager</h3>
            <ContractForm
              drizzle={drizzle}
              drizzleState={drizzleState}
              contract="FWC"
              method="makeWager"
              labels={["Amount", "Description"]}
            />
            <h3>Accept Wager</h3>
            <ContractForm
              drizzle={drizzle}
              drizzleState={drizzleState}
              contract="FWC"
              method="acceptWager"
              labels={["Action ID"]}
            />
            <h3>Accept Defeat</h3>
            <ContractForm
              drizzle={drizzle}
              drizzleState={drizzleState}
              contract="FWC"
              method="youWin"
              labels={["Action ID"]}
            />
            <h3>Send Tokens</h3>
            <ContractForm
              drizzle={drizzle}
              drizzleState={drizzleState}
              contract="FWC"
              method="transfer"
              labels={["To Address", "Amount to Send"]}
            />
            <h3>Mint Tokens</h3>
            <ContractForm
              drizzle={drizzle}
              drizzleState={drizzleState}
              contract="FWC"
              method="mint"
              labels={["To Address", "Amount to Mint"]}
            />
            <hr />
            <h1>Action</h1>
            <WagerList
              drizzle={drizzle}
              drizzleState={drizzleState}
              contract="FWC" />
          </div>
        </div >
      );
    }}
  </DrizzleContext.Consumer>
);
