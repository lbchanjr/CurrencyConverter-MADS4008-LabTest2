import React, {useState, Component} from 'react';
import { StyleSheet, Text, View, Image, Picker, Button, TextInput, Platform } from 'react-native';

export default class Currency extends Component {
    constructor(props) {
        super(props);

        const currencyInfo = this.props.getData();

        this.state = {
            currency: currencyInfo.currency,
            amount: currencyInfo.amount
        }
    

        console.log(`Data passed from parent has a currency of ${currencyInfo.currency} and an amount of ${currencyInfo.amount}`)
    
    }

    updateCurrencyAndAmount(newCurrency, newAmount) {
        this.setState({currency: newCurrency})
        this.setState({amount: newAmount});
        console.log(`Updating ${this.state.currency} amount to ${newAmount}`);
    }
        
    render() {
        return (
            
            <View style={styles.container}>
            {console.log(`Amount at start of render: ${this.state.amount}`)}
            <Picker style={{height: 30, width: 60, flexBasis: "40%"}}
            selectedValue={this.state.currency}
            onValueChange={(itemValue, itemIndex) => {
                console.log(`New currency selected. ${itemValue} using existing amount: ${this.state.amount}`)
                this.setState({currency: itemValue})
                this.props.setData(itemValue, this.state.amount);
            }} 
            >
            <Picker.Item label="USD" value="USD" />
            <Picker.Item label="CAD" value="CAD" />
            <Picker.Item label="EUR" value="EUR" />
            <Picker.Item label="GBP" value="GBP" />
            </Picker>

            <TextInput
                editable={this.props.inputAllowed}
                style={[styles.input, {borderWidth: this.props.inputAllowed == true ? 1:0}]}
                placeholder="Input amount"
                keyboardType="numbers-and-punctuation"
                onChangeText={(val)=>{
                    console.log(`Text input changed to: ${val}`);
                    this.setState({amount: val})
                    this.props.setData(this.state.currency, val);
                }}
                value={`${Math.round((Number(this.state.amount) + Number.EPSILON) * 100000) / 100000}`}
            />
            {console.log(`Amount after render: ${this.state.amount}`)}
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    input: {
        marginLeft: 15, 
        width: 100,
        borderRadius: 5,
        paddingRight: 10,
        fontWeight: "bold", 
        flexBasis: "40%", 
        fontSize: 15, 
        textAlign: "right", 
        marginTop: Platform.OS=='ios' ? 90:0,
        paddingTop: Platform.OS=='ios' ? 10:0,
        paddingBottom: Platform.OS=='ios' ? 10:0
    }
  });
  
