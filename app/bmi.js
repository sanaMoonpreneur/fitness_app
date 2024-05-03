import React, { useState } from "react";
import { StyleSheet, SafeAreaView, View, Text,TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Constants from "expo-constants";
import GenderSelection from "../components/GenderSelection";
import HeightSelection from "../components/HeightSelection";
import UnitSelection from "../components/UnitSelection";
import ResultModal from "../components/ResultModal";
import { ROW, CENTER, TEXT } from "../style";
import {
  DEFAULT_VALUE,
  MAX_AGE,
  MAX_WEIGHT,
  MIN_AGE,
  MIN_WEIGHT,
} from "../constants/theme";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useRouter } from "expo-router";

export default function BMICalculator() {
  const router=useRouter();
  const [gender, setGender] = useState(DEFAULT_VALUE.gender);
  const [height, setHeight] = useState(DEFAULT_VALUE.height);
  const [weight, setWeight] = useState(DEFAULT_VALUE.weight);
  const [age, setAge] = useState(DEFAULT_VALUE.age);
  const [bmiPoint, setBmiPoint] = useState(0);
  const [bmiStatus, setBmiStatus] = useState("NORMAL");
  const [bmiInterpretation, setBmiInterpretation] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const calculate = () => {
    const point = weight / (height / 100) ** 2;

    if (point < 18.5) {
      setBmiStatus("UNDERWEIGHT");
      setBmiInterpretation(
        "You have a higher than normal body weight.\nTry to exercise more."
      );
    } else if (point < 25) {
      setBmiStatus("NORMAL");
      setBmiInterpretation("You have a normal body weight.\nGood job!");
    } else {
      setBmiStatus("OVERWEIGHT");
      setBmiInterpretation(
        "You have a higher than normal body weight.\nTry to exercise more."
      );
    }

    setBmiPoint(point.toFixed(2));
    setModalVisible(true);
  };

  const reset = () => {
    setGender(DEFAULT_VALUE.gender);
    setHeight(DEFAULT_VALUE.height);
    setWeight(DEFAULT_VALUE.weight);
    setAge(DEFAULT_VALUE.age);
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <TouchableOpacity
         onPress={()=>router.back()}
         className=" mx-4 mt-12 absolute flex justify-center items-center pr-1 rounded-full "
         style={{height:hp(5.5), width:hp(5.5),backgroundColor:'#a2ed3a'}}
        >
          <Ionicons name="caret-back-outline" size={hp(4)} color="#131313" />
      </TouchableOpacity>
      
      <Text style={{fontSize:40,color:'#ededed',alignSelf:'center',fontWeight: 'bold',marginTop:10}}>BMI </Text>
        <Text style={{fontSize:hp(2),color:'#a2ed3a',alignSelf:'center',marginTop:5,marginBottom:10}} 
                 className="font-bold tracking-wider ">
                   Know Your Body
        </Text>
      

      <View style={styles.content}>
        <View style={styles.section}>
          <View style={styles.genderSelection}>
            <GenderSelection
              label="MALE"
              iconName="mars"
              iconColor="#a2ed3a"
              isActive={gender === "male"}
              setActive={() => setGender("male")}
            />
            <GenderSelection
              label="FEMALE"
              iconName="venus"
              iconColor="#a2ed3a"
              isActive={gender === "female"}
              setActive={() => setGender("female")}
            />
          </View>
        </View>
        
        <HeightSelection
          style={styles.section}
          height={height}
          setHeight={setHeight}
        />

        <View style={styles.section}>
          <View style={styles.weightAndAgeSelection}>
            <UnitSelection
              label="WEIGHT kg"
              value={weight}
              minValue={MIN_WEIGHT}
              maxValue={MAX_WEIGHT}
              setValue={setWeight}
            />
            
            <UnitSelection
              label="AGE"
              value={age}
              minValue={MIN_AGE}
              maxValue={MAX_AGE}
              setValue={setAge}
            />
          </View>
        </View>

        <TouchableOpacity onPress={calculate}
                      style={{height:hp(7),width:wp(93),backgroundColor:'#a2ed3a',borderRadius:10}}
                      className=" flex items-center justify-center mx-auto border-[2px]"
                    >
                        <Text style={{fontSize:hp(2.5),color:'#131313'}} className=" font-bold tracking-wide">
                           CALCULATE
                        </Text>
        </TouchableOpacity>

        <ResultModal
          modalVisible={modalVisible}
          bmiPoint={bmiPoint}
          bmiStatus={bmiStatus}
          bmiInterpretation={bmiInterpretation}
          onModalConfirm={reset}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#131313",
    paddingTop: Constants.statusBarHeight,
  },
  content: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  header: {
    justifyContent:'flex-start',
    height: 70,
    borderBottomWidth: 5,
    borderBottomColor: "#16192e",
  },
  headerText: {
    ...TEXT,
    color:'#a2ed3a',
    fontSize: 24,
    fontWeight: "bold",
    marginTop:10,
    marginLeft:30
  },
  section: {
    flex: 1 / 3,
    marginVertical: 5,
  },
  genderSelection: {
    ...ROW,
    marginHorizontal: -10,
  },
  weightAndAgeSelection: {
    ...ROW,
    marginHorizontal: -10,
  },
});