import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, Platform, SafeAreaView, TouchableOpacity } from 'react-native';
import Currency from './Currency';



export default class App extends Component {
  constructor() {
    super()
    this.state = {
      currency1: "USD",
      amount1: 1,
      currency2: "CAD",
      amount2: 0,
      exchangeRate: 0
    };

    this.convertCurrency = this.convertCurrency.bind(this);
    this.getData1 = this.getData1.bind(this);
    this.getData2 = this.getData2.bind(this);
    this.setData1 = this.setData1.bind(this);
    this.setData2 = this.setData2.bind(this);

    this.convertCurrency();
    this.lastState = this.state;

  }

  convertCurrency() {
    console.log("Currency converter was called.")
    const endPoint = `https://api.exchangerate-api.com/v4/latest/${this.state.currency1}`;

    fetch(endPoint)
    .then(response => {
    console.log("Received response from api site.");
    return response.json();
    })
    .then(data => {
    console.log("Received json-parsed data...");
    const rate = data.rates[this.state.currency2];
    this.setState({exchangeRate: rate});
    const conversion = rate * this.state.amount1;
    console.log("Converted amount is: " + (conversion));
    this.setState({amount2:conversion});

    this.child.updateCurrencyAndAmount(this.state.currency1, this.state.amount1);
    this.child2.updateCurrencyAndAmount(this.state.currency2, conversion);
    })
    .catch(err => console.log(`Error: ${err}.`))
  }

  getData1() {
    return {currency: this.state.currency1, amount: this.state.amount1}
  }

  getData2() {
    return {currency: this.state.currency2, amount: this.state.amount2}
  }


  setData1(currency, amount) {
    //this.lastState = {};
    console.log("Currency to update in app is: " + currency + " and amount: " + amount)
    this.setState({currency1: currency});
    this.setState({amount1: amount});
    if (this.lastState.currency1 != this.state.currency1 || this.lastState.currency2 != this.state.currency2 ||
      this.lastState.amount1 != this.state.amount1 || this.lastState.amount2 != this.state.amount2) {
      this.child2.setState({amount: "Calculating..."});
    }
    console.log(`Updated currency in App() is: ${this.state.currency1} and amount: ${this.state.amount1}`)
  }

  componentDidUpdate() {
    console.log("-----------------")
    console.log(this.lastState)
    console.log(this.state)
    if (this.lastState.currency1 != this.state.currency1 || this.lastState.currency2 != this.state.currency2 ||
      this.lastState.amount1 != this.state.amount1 || this.lastState.amount2 != this.state.amount2) {
      console.log(`Updated currency in callback is: ${this.state.currency1} and amount: ${this.state.amount1}`)
      this.convertCurrency();
      this.lastState = this.state;
    }
  }

  setData2(currency, amount) {
    this.setState({currency2: currency});
    this.setState({amount2: amount});
  }

  render() {
  return (
    <SafeAreaView style={styles.container}>
      <Image source={require("./assets/dollar-sign.jpg")} style={styles.logo}/>
      <Text style={styles.title}>MADS Lab Test 2 Exchange Calculator</Text>
      <Text style={{textAlign: "center", fontSize: 12, marginTop: 10, marginBottom: 10, marginLeft: 50, marginRight: 50}}>Choose the currencies and the amounts to get the exchange rate</Text>

      <Currency inputAllowed={true} ref={child=>{this.child=child}} style={{margin:0}} amount={this.state.amount1} getData={this.getData1} setData={this.setData1} updateConversion={this.convertCurrency}/>

      <View style={styles.swapContainer}>
        <TouchableOpacity style={{margin:10}} onPress={()=>{
          console.log("Swap button was pressed!");
          const currencyTemp = this.state.currency2;

          this.state.currency2 = this.state.currency1;

          this.state.currency1 = currencyTemp;

          this.convertCurrency();

        }}>

        <Text style={styles.swapButton}>Swap</Text>
        </TouchableOpacity>

        <Text style={{alignSelf:"center", color:"darkgreen", fontWeight:"bold", marginLeft: 20, marginTop: Platform.OS == "ios" ? 80: 10}}>1 {this.state.currency1} = {this.state.exchangeRate} {this.state.currency2}</Text>        
      </View>

      <Currency inputAllowed={false} ref={child=>{this.child2=child}} style={{margin:0}} amount={this.state.amount2} getData={this.getData2} setData={this.setData2} updateConversion={this.convertCurrency}/>

    </SafeAreaView>
  );
      }
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    marginTop: Platform.OS == "ios" ? 0: 30,
    backgroundColor: '#fff',
    alignItems: 'center',
    //justifyContent: 'space-around',
  },
  logo: {
    width: 200,
    height: 200
  },
  title: {
    marginTop: 30,
    fontSize: 20,
    fontWeight: "bold",
    color: "green"
  },
  swapButton: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: "green",
    color: "white",
    borderRadius: 5,
    borderColor: "black",
    borderWidth: 1,
    marginTop: Platform.OS == "ios" ? 80: 10,
  },
  swapContainer: {
    flexDirection: "row",
  }
});
