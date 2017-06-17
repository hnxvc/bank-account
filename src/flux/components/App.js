import React, { Component } from 'react';
import './App.css';
import BankBalanceStore from '../store/BankBalanceStore';
import BankRewardsStore from '../store/BankRewardsStore';
import { Container } from 'flux/utils';
import BankActions from '../actions/BankActions';

class App extends Component {
  constructor(props) {
    super(props);

    BankActions.createAccount();
    this.state = {
      ammount: 0,
      balance: BankBalanceStore.getState()
    };
    this.handleChangeAmmount = this.handleChangeAmmount.bind(this);
    this.withdraw = this.withdraw.bind(this);
    this.deposit = this.deposit.bind(this);
    this.resetAmount = this.resetAmount.bind(this);
  }

  deposit() {
    BankActions.depositIntoAccount(Number(this.state.ammount));
    this.resetAmount();
  }

  withdraw() {
    BankActions.withdrawFromAccount(Number(this.state.ammount));
    this.resetAmount();
  }

  handleChangeAmmount(e) {
    this.setState({
      ammount: e.target.value
    });
  }

  resetAmount() {
    this.setState({
      ammount: 0
    });
  }

  render() {
    return (
      <div className="App">
        <section className="App-body">
          <header>FluxTrust Bank</header>
          <h1>Your balance is ${(this.state.balance)}</h1>
          <h2>Your Points Rewards Tier is {this.state.rewardsTier}</h2>
          <div className="atm">
            <input type="text"
              placeholder="Enter Ammount"
              value={this.state.ammount}
              onChange={this.handleChangeAmmount}
            /> <br />
            <button onClick={this.withdraw}>Withdraw</button>
            <button onClick={this.deposit}>Deposit</button>
          </div>
        </section>
      </div>
    );
  }
}

App.getStores = () => ([BankBalanceStore]);

App.calculateState = (prevState) => {
  return ({
    balance: BankBalanceStore.getState(),
    rewardsTier: BankRewardsStore.getState()
  });
};
const AppContainer = Container.create(App);

export default AppContainer;
