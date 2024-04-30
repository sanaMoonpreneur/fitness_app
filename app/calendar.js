import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView,
TouchableWithoutFeedback,Keyboard ,SafeAreaView} from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useRouter } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CalendarScreen = () => {
  const router=useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState({});
  const [task, setTask] = useState('');
  const [time, setTime] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  // Function to read tasks from AsyncStorage
  async function readTasks() {
    try {
      const data = await AsyncStorage.getItem('tasks');
      if (data !== null) {
        setItems(JSON.parse(data));
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Load tasks from AsyncStorage when component mounts
  useEffect(() => {
    readTasks();
    setIsLoading(false);
  }, []);

  // Function to handle task submission
  const handleTaskSubmit = () => {
    const newItems = { ...items };
    if (newItems[selectedDate]) {
      newItems[selectedDate].push({ name: task, time: time });
    } else {
      newItems[selectedDate] = [{ name: task, time: time }];
    }
    setItems(newItems);
    AsyncStorage.setItem('tasks', JSON.stringify(newItems)); // Save tasks to AsyncStorage
    setTask('');
    setTime('');
  };

  // Function to handle day press in the calendar
  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="blue" />
        
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}  style={styles.container}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}  accessible={false}> 
   
    
      <View style={{ flex: 1 ,marginTop:40,backgroundColor:'#131313'}} >
      <Text style={{fontSize:30,color:'#ededed',alignSelf:'center',fontWeight: 'bold',marginVertical:20}}>Calendar</Text>
        <Agenda
        style={{backgroundColor:'green'}}
          theme={{
         
            agendaDayTextColor: 'yellow',
            agendaDayNumColor: 'green',
            agendaTodayColor: 'red',
            //agendaKnobColor: 'blue',
           
          }}
          showClosingKnob={true}
          items={items}
          renderItem={(item, firstItemInDay) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemTime}>{item.time}</Text>
            </View>
          )}
          renderEmptyDate={() => (
            <View style={styles.emptyDateContainer}>
              <Text style={styles.emptyDateText}>No tasks</Text>
            </View>
          )}
          onDayPress={onDayPress}
        />
       
        <TextInput
          style={styles.input1}
          placeholder="Enter Workout Chart"
          multiline={true}
          numberOfLines={10}
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <TextInput
          style={styles.input2}
          placeholder="Enter Time"
          value={time}
          onChangeText={(text) => setTime(text)}
        />
        <TouchableOpacity style={styles.button} onPress={handleTaskSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
       
      </View>
    
     </TouchableWithoutFeedback> 
     </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
    container:{
     flex:1,
     backgroundColor:'#131313',
     
    },
  itemContainer: {
    padding: 10,
    backgroundColor: '#F5F5F5',
    marginVertical: 5,
    borderRadius: 8,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  itemTime: {
    fontSize: 14,
    color: '#666',
  },
  emptyDateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyDateText: {
    fontSize: 16,
    color: '#999',
  },
  input1: {
    borderWidth: 2,
    width: 200,
    alignSelf: 'center',
    height: 40,
    borderRadius: 20,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
  },
  input2: {
    borderWidth: 2,
    width: 200,
    alignSelf: 'center',
    height: 40,
    borderRadius: 20,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
    marginTop: 20,
  },
  button: {
    backgroundColor: 'lavender',
    width: 150,
    alignSelf: 'center',
    height: 40,
    marginTop: 30,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default CalendarScreen;
