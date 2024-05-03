import React from "react";
import { StyleSheet, View, Text, Modal, SafeAreaView,TouchableOpacity } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FontAwesome5 } from "@expo/vector-icons";
import { BOX, TEXT } from "../style";

const GOOD_STATUS_COLOR = "#7ac79d";
const BAD_STATUS_COLOR = "#f5ac40";

function ResultModal({
  modalVisible,
  bmiPoint,
  bmiStatus,
  bmiInterpretation,
  onModalConfirm,
}) {
  return (
    // https://reactnative.dev/docs/modal
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.headerText}>Your Result</Text>

          <View style={styles.contentBox}>
            <Text
              style={[
                styles.bmiStatusText,
                {
                  color:
                    bmiStatus === "NORMAL"
                      ? GOOD_STATUS_COLOR
                      : BAD_STATUS_COLOR,
                },
              ]}
            >
              {bmiStatus}
            </Text>

            <Text style={styles.bmiPointText}>{bmiPoint}</Text>

            <Text style={styles.bmiInterpretationText}>
              {bmiInterpretation}
            </Text>
          </View>

          
          <TouchableOpacity onPress={onModalConfirm}
                      style={{height:hp(7),width:wp(93),backgroundColor:'#a2ed3a',borderRadius:10}}
                      className=" flex items-center justify-center mx-auto border-[2px]"
                    >
                        <Text style={{fontSize:hp(2.5),color:'#131313'}} className=" font-bold tracking-wide">
                        RE-CALCULATE
                        </Text>
        </TouchableOpacity>

        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1d2236",
  },
  content: {
    flex: 1,
    padding: 15,
  },
  headerText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  contentBox: {
    ...BOX,
    justifyContent: "space-evenly",
    marginVertical: 15,
  },
  bmiStatusText: {
    ...TEXT,
    fontSize: 24,
    fontWeight: "bold",
  },
  bmiPointText: {
    ...TEXT,
    fontSize: 70,
    fontWeight: "bold",
  },
  bmiInterpretationText: {
    ...TEXT,
    fontSize: 18,
    lineHeight: 30,
    fontWeight: "500",
  },
});

export default React.memo(ResultModal);