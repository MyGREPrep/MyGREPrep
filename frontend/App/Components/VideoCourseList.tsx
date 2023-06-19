import { View, Text, StyleSheet  } from "react-native";
import React, { useEffect, useState } from "react";
import GlobalApi from "../Shared/GlobalApi";
import { FlatList } from "react-native";
import { Image } from "react-native";
import { TurboModuleRegistry } from "react-native";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function VideoCourseList() {
  const [videoList, setVideoList] = useState<any>([]);

  const navigation = useNavigation();

  const contentArray = [
    {
       "description":"In this section, you will cover quantitative section of GRE",
       "id":1,
       "image":"https://res.cloudinary.com/dknvsbuyy/image/upload/v1683300129/Banner_Disney_feecf97104.png",
       "name":"Quantitave Reasoning"
    },
    {
       "description":"In this section, you will cover verbal section of GRE",
       "id":2,
       "image":"https://res.cloudinary.com/dknvsbuyy/image/upload/v1683127062/Educational_App_Banner_0b6f001c1c.png",
       "name":"Verbal Learning"
    },
    {
        "description":"In this section, you will cover verbal section of GRE",
        "id":3,
        "image":"https://res.cloudinary.com/dknvsbuyy/image/upload/v1683127062/Educational_App_Banner_0b6f001c1c.png",
        "name":"Analytical Writing"
     }
 ]

  useEffect(() => {
    //  getVideoCourse();
    setVideoList(contentArray);
  }, []);

//   const getVideoCourse=async()=>{
//       const resp=(await GlobalApi.getVideoCourse()).data;
//       const result=resp.data.map((item)=>({
//           id:item.id,
//           name:item.attributes.title,
//           description:item.attributes.description,
//           image:item.attributes.image.data.attributes.url,
//           Topic:item.attributes.VideoTopic
//       }))
//     //   setVideoList(result);
//       console.log("LOL",result)
//   }
  const onPressCourse = (course) => {
    // navigation.navigate('course-detail',{courseData:course,
    // courseType:'video'})
    console.log("Pressed")
  };


  return (
     <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Verbal Reasoning</Text>
        <Text style={styles.sectionDescription}>Assesses your ability to analyze and evaluate written material and synthesize information obtained from it.</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quantitative Reasoning</Text>
        <Text style={styles.sectionDescription}>Tests your understanding of basic concepts of arithmetic, algebra, geometry, and data analysis.</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Analytical Writing</Text>
        <Text style={styles.sectionDescription}>Measures critical thinking and analytical writing skills, including your ability to articulate complex ideas clearly and effectively.</Text>
      </View>
    </View>
  );



}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      },
      section: {
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        marginBottom: 20,
        padding: 16,
        width: '100%',
      },
      sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
      },
      sectionDescription: {
        fontSize: 16,
        color: '#333',
      },
  });