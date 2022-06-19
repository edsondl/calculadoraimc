import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Vibration, Pressable, Keyboard, } from 'react-native';
import ResultImc from './ResultImc';
import styles from './style';

export default function Form(props) {
    const [height, setHeight] = useState(null);
    const [weight, setWeight] = useState(null);
    const [messageImc, setMessageImc] = useState("Fill in weight and height");
    const [imc, setImc] = useState(null);
    const [textButton, setTextButton] = useState("Calculate");
    const [errorMessage, setErrorMessage] = useState(null);

    function imcCalculator() {
        let heightFormat = height.replace(",",".");
        return setImc((weight / (heightFormat * heightFormat)).toFixed(2));
}

function verificationImc() {
    if (imc == null) {
        Vibration.vibrate();
        setErrorMessage("Required field");
    }
}

    function validationImc() {
        if (weight != null && height != null) {
            imcCalculator();
            setHeight(null);
            setWeight(null);
            setMessageImc("Your imc: ");
            setTextButton("Recalculate");
            setErrorMessage(null);
            return
        }
        verificationImc();
        setImc(null);
        setTextButton("Calculate");
        setMessageImc("Fill in weight and height");
}

    return (
        <Pressable onPress={Keyboard.dismiss} style={
            styles.formContext
        }>
            <View style={
                styles.form
            }>
                <Text style={
                    styles.formLabel
                }>Height</Text>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
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
                <Text style={styles.errorMessage}>{errorMessage}</Text>
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
        </Pressable>
    );
}
