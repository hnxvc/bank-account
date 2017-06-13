import React, { Component } from 'react';
import './App.css';
import BankBalanceStore from '../store/BankBalanceStore';
import bankConstants from '../utils/constants';
import BankActions from '../actions/BankActions';

class App extends Component {
  constructor(props) {
    super(props);

    BankActions.createAccount();
    this.state = {
      ammount: 0,
      balance: BankBalanceStore.getState()
    };
    this.handleStoreChange = this.handleStoreChange.bind(this);
    this.handleChangeAmmount = this.handleChangeAmmount.bind(this);
    this.withdraw = this.withdraw.bind(this);
    this.deposit = this.deposit.bind(this);
  }

  componentDidMount() {
    this.storeSubscription = BankBalanceStore.addListener(this.handleStoreChange);
  }

  componentWillUnMount() {
    this.storeSubscription.remove();
  }

  handleStoreChange() {
    this.setState({
      balance: BankBalanceStore.getState()
    });
  }

  deposit() {
    BankActions.depositIntoAccount(this.state.ammount);
  }

  withdraw() {
    BankActions.withdrawFromAccount(this.state.ammount);
  }

  handleChangeAmmount(e) {
    this.setState({
      ammount: e.target.value
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to Bank Acount</h2>
        </div>
        <section className="App-body">
          <header>FluxTrust Bank</header>
          <h1>Your balance is ${(this.state.balance)}</h1>
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

export default App;
