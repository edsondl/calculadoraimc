import React, {useState} from 'react';
import {Text, View, TextInput, TouchableOpacity} from 'react-native';
import ResultImc from './ResultImc';
import styles from './style';

export default function Form() {
    const [height, setHeight] = useState(null);
    const [weight, setWeight] = useState(null);
    const [messageImc, setMessageImc] = useState("Fill in weight and height");
    const [imc, setImc] = useState(null);
    const [textButton, setTextButton] = useState("Calculator");

    function imcCalculator() {
        return setImc((weight / (height * height)).toFixed(2));

    }

    function validationImc() {
        if (weight != null && height != null) {
            imcCalculator();
            setHeight(null);
            setWeight(null);
            setMessageImc("Your imc: ");
            setTextButton("Recalculate");
            return
        }
        setImc(null);
        setTextButton("Calculator");
        setMessageImc("Fill in weight and height");
    }

    return (
        <View style={
            styles.formContext
        }>
            <View style={
                styles.form
            }>
                <Text style={
                    styles.formLabel
                }>Height</Text>
                <TextInput style={
                        styles.input
                    }
                    onChangeText={setHeight}
                    value={height}
                    placeholder="Ex: 1.75"
                    KeyboardType="numeric"></TextInput>
                <Text style={
                    styles.formLabel
                }>Peso</Text>
                <TextInput style={
                        styles.input
                    }
                    style={
                        styles.input
                    }
                    onChangeText={setWeight}
                    value={weight}
                    placeholder="Ex: 75.655"
                    KeyboardType="numeric"></TextInput>
                <TouchableOpacity style={
                        styles.buttonCalculator
                    }
                    onPress={
                        () => {
                            validationImc();
                        }
                }>
                    <Text style ={styles.textButtonCalculator}>
                        {textButton}</Text>
                </TouchableOpacity>
            </View>
            <ResultImc messageResultImc={messageImc}
                resultImc={imc}></ResultImc>
        </View>
    );
}
