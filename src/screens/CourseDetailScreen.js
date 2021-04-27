import React from 'react';
import { SafeAreaView, ScrollView, Text, View} from 'react-native';

const Field = ({label, value}) =>{
    return(
        <View>
            <Text>{label}</Text>
            <Text>{value}</Text>
        </View>
    );
};

const CourseDetailScreen = () =>{
    const course = {
        "id": "F101",
        "title": "Computer Science: Concepts, Philosophy, and Connections",
        "meets": "MWF 11:00-11:50"
    }
    return (
        <SafeAreaView>
            <ScrollView>
                <Field label = 'ID' value = {course.id}/>
                <Field label="Meeting times" value={course.meets} />
                <Field label="Title" value={course.title} />
            </ScrollView>
        </SafeAreaView>
    );
};
export default CourseDetailScreen