import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, Text,TouchableOpacity,View } from 'react-native';
import { FadeInDown } from 'react-native-reanimated';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Anticons from 'react-native-vector-icons/AntDesign';
import Animated from 'react-native-reanimated';

export default function exerciseDetails() {
    const item = useLocalSearchParams();
    const router=useRouter();

  return (
    <View className="flex flex-1" style={{backgroundColor:'#131313'}}>
      <View className="shadow-md  rounded-b-[40px]" >
      <Image 
       source={{uri:item.gifUrl}}
       contentFit='cover'
       style={{width:wp(100),height:wp(100)}}
       className="rounded-b-[40px]"
      />
      </View>

      <TouchableOpacity onPress={()=>router.back()}
      className="mx-2 absolute rounded-full mt-2 right-0"
      >
       <Anticons name="closecircle" size={hp(4.5)} color="#192126"/>
      </TouchableOpacity>
      
      <ScrollView className="max-4 space-y-2 mt-3 p-5" showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom:60}}>
        <Animated.Text
          entering={FadeInDown.duration(300).springify()}
          style={{fontSize:hp(3.5),color:'#a2ed3a'}}
          className="font-semibold  tracking-wide"
        >
            {item.name}
        </Animated.Text>

        <Animated.Text
          entering={FadeInDown.delay(200).duration(300).springify()}
          style={{fontSize:hp(2),color:'#a2ed3a'}}
          className=" font-bold tracking-wide"
        >
           Equipment <Text className="font-bold " style={{color:'#ededed'}}> 
             {item?.equipment}</Text>
           </Animated.Text>

        <Animated.Text
          entering={FadeInDown.delay(200).duration(300).springify()}
          style={{fontSize:hp(2),color:'#a2ed3a'}}
          className=" font-bold tracking-wide"
        >
           Muscle <Text className="font-bold " style={{color:'#ededed'}}>
             {item?.secondaryMuscles}</Text>
           </Animated.Text>

        <Animated.Text
          entering={FadeInDown.delay(300).duration(300).springify()}
          style={{fontSize:hp(2),color:'#a2ed3a'}}
          className="font-bold tracking-wide"
        >
           Target <Text className="font-bold " style={{color:'#ededed'}}>
            {item?.target}</Text>
        </Animated.Text>

        <Animated.Text
          entering={FadeInDown.delay(400).duration(300).springify()}
          style={{fontSize:hp(3),color:'#a2ed3a'}}
          className=" tracking-wide font-bold "
        >
           Instructions
        </Animated.Text>

       {
        item.instructions.split(',').map((instruction,index)=>{
            return(
                <Animated.Text
                      entering={FadeInDown.delay((index+6)*100).duration(300).springify()}
                      key={instruction}
                      style={{fontSize:hp(1.7),color:'#ededed'}}
                      
                >
                 {instruction}
                </Animated.Text>
            )
        })
       }

      </ScrollView>

    </View>
    
  );
}
