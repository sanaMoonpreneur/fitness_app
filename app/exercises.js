import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect,useState} from 'react';
import { StatusBar, Text,TouchableOpacity,View ,Image} from 'react-native';
import { fetchExercisesByBodypart } from '../api/exerciseDB';
import { demoExercises } from '../constants';
import { ScrollView } from 'react-native-virtualized-view';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ExerciseList from '../components/ExerciseList'; 


export default function Exercises() {
  const router=useRouter();
  const [exercises,setExercises]=useState([]);
  const item=useLocalSearchParams();
  
  console.log('got item:',item);

  useEffect(()=>{
    if(item) getExercises(item.name);
  },[item]);

  const getExercises = async (bodypart)=>{
    let data = await fetchExercisesByBodypart(bodypart);
    //console.log('got data:',data);
    setExercises(data);
  }

  return (
    <ScrollView style={{backgroundColor:'#131313'}}>
      <StatusBar style="light"/>
      <Image
        source={item.image}
        style={{width:wp(100),height:hp(45)}}
        className="rounded-b-[40px]"
      />
      <TouchableOpacity
         onPress={()=>router.back()}
         className=" mx-4 absolute flex justify-center items-center pr-1 rounded-full"
         style={{height:hp(5.5), width:hp(5.5), marginTop:hp(7),backgroundColor:'#a2ed3a'}}
        >
          <Ionicons name="caret-back-outline" size={hp(4)} color="#192126" />
      </TouchableOpacity>

      
      <View className="mx-4 space-y-3 mt-4">
          <Text style={{fontSize:hp(3),color:'#ededed'}} className="font-semibold ">
            {item.name} exercise
          </Text>
          <View className="mb-10">
            <ExerciseList data={exercises}/>
          </View> 
      </View>

    </ScrollView>
  );
}