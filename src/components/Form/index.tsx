import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Vibration, Pressable, Keyboard, FlatList, } from 'react-native';
import ResultImc from './ResultImc';
import styles from './style';

export default function Form(props) {
    const [height, setHeight] = React.useState(null);
    const [weight, setWeight] = React.useState(null);
    const [messageImc, setMessageImc] = useState("Fill in weight and height");
    const [imc, setImc] = useState(null);
    const [textButton, setTextButton] = useState("Calculate");
    const [errorMessage, setErrorMessage] = useState(null);
    const [imcList, setImcList] = useState([]);

    function imcCalculator() {
        let heightFormat = height.replace(",",".");
        let totalImc =  (weight / (heightFormat * heightFormat)).toFixed(2);
        setImcList ((arr) => [...arr, {id: new Date().getTime(), imc:totalImc }]);
        setImc(totalImc);
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
            }
            else {
        verificationImc();
        setImc(null);
        setTextButton("Calculate");
        setMessageImc("Fill in weight and height");
}
    }

    return (
       
            <View style={
                styles.formContext
            }>
                {imc == null ?
                 <Pressable onPress={Keyboard.dismiss} style={
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
                </Pressable>
                :
                <View style={styles.exhibitionResultImc}>
            <ResultImc messageResultImc={messageImc}
                resultImc={imc}></ResultImc>
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
                }
                <FlatList
                showsVerticalScrollIndicator={false}
                style={styles.listImcs}
                data={imcList.reverse()}
                renderItem={({item}) => {
                return (
                    <Text style={styles.resultImcItem}>
                      <Text style={styles.textResultItemList}>Result Imc =</Text>
                      {item.imc}
                    </Text>
                )
                      }}
                      keyExtractor={(item) => {
                        item.id;
                      }}>
            </FlatList>
        </View>
    );
}
