import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../contacts/thems';
import Header from '../component/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import UserList from '../component/UserList';
import NoData from '../component/NoData';
import firestore from '@react-native-firebase/firestore';
import DateTimePicker from '@react-native-community/datetimepicker';

const UserAmountUpdateList = ({navigation}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [latestData, setLatestData] = useState(0);
  const [latest, setLatest] = useState();

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
    setLoading(true);
    let year = currentDate.getFullYear();
    const tempMonth = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    let month = tempMonth[currentDate.getMonth()];
    let day = currentDate.getDate();
    firestore()
      .collection('record')
      .where('day', '==', day)
      .where('month', '==', month)
      .where('year', '==', year)
      .orderBy('date', 'desc')
      .get()
      .then(querySnapshot => {
        let temp = [];
        querySnapshot.forEach(doc => {
          temp.push(doc.data());
        });
        setData(temp);
        setLoading(false);
        setShow(false);
        setLatestData(0);
      });
  };

  const getAllTransfer = () => {
    firestore()
      .collection('record')
      .orderBy('date', 'desc')
      .startAfter(latestData)
      .limit(5)
      .get()
      .then(
        querySnapshot => {
          let temp = [];
          querySnapshot.forEach(doc => {
            temp.push(doc.data());
            setLatest(doc);
          });
          setData([...data, ...temp]);
          setLoading(false);
        },
        e => {
          console.log(e);
        },
      );
  };

  const getFirstTransfer = () => {
    firestore()
      .collection('record')
      .orderBy('date', 'desc')
      .limit(5)
      .get()
      .then(
        querySnapshot => {
          let temp = [];
          querySnapshot.forEach(doc => {
            temp.push(doc.data());
            setLatest(doc);
          });
          setData(temp);
          setLoading(false);
        },
        e => {
          console.log(e);
        },
      );
  };

  useEffect(() => {
    setLoading(true);
    getAllTransfer();
  }, [latestData]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setLoading(true);
      getFirstTransfer();
    });

    return unsubscribe;
  }, [navigation]);

  const renderLoader = () => {
    return loading ? (
      <View style={styles.loaderStyle}>
        <ActivityIndicator size="large" color="#aaa" />
      </View>
    ) : null;
  };
  const loadMoreItem = () => {
    setLatestData(latest);
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.backgroung}}>
      <Header title="Add Amount Record">
        <Ionicons
          name="search"
          size={25}
          style={styles.icon}
          onPress={() => setShow(true)}
        />
      </Header>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          onChange={onChange}
        />
      )}

      {data.length == 0 && <NoData />}

      <FlatList
        data={data}
        keyExtractor={item => Math.random()}
        renderItem={({item}) => (
          <UserList
            status={true}
            navigation={navigation}
            children={
              <Text style={{color: COLORS.black}}>
                {item.month} {item.day}, {item.year} {item.time}
              </Text>
            }
            item={item}
          />
        )}
        contentContainerStyle={{padding: 20}}
        ListFooterComponent={renderLoader}
        onEndReached={loadMoreItem}
        onEndReachedThreshold={0}
      />
    </SafeAreaView>
  );
};

export default UserAmountUpdateList;

const styles = StyleSheet.create({
  icon: {
    marginRight: 10,
    marginLeft: 10,
    color: COLORS.white,
  },
});
