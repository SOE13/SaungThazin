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
import NoData from '../component/NoData';
import Apploder from '../component/Apploder';
import firestore from '@react-native-firebase/firestore';
import DateTimePicker from '@react-native-community/datetimepicker';
import Payment from '../component/Payment';

const PaymentList = ({navigation}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const [lastData, setLastData] = useState(0);
  const [latest, setLatest] = useState();

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
      .collection('pay')
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
      });
  };

  const getAllTransfer = () => {
    setLoading(true);
    setRefreshing(true);
    firestore()
      .collection('pay')
      .orderBy('date', 'desc')
      .startAfter(lastData)
      .limit(4)
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
    setLoading(true);
    setRefreshing(true);
    firestore()
      .collection('pay')
      .orderBy('date', 'desc')
      .limit(4)
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
  }, [lastData]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setLoading(true);
      getFirstTransfer();
    });

    return unsubscribe;
  }, [navigation]);
  const loadMoreItem = () => {
    setLastData(latest);
  };

  const renderLoader = () => {
    return loading ? (
      <View style={styles.loaderStyle}>
        <ActivityIndicator size="large" color="#aaa" />
      </View>
    ) : null;
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.backgroung}}>
      <Header title="Payment List">
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
        renderItem={({item}) => <Payment items={item} />}
        contentContainerStyle={{padding: 20}}
        ListFooterComponent={renderLoader}
        onEndReached={loadMoreItem}
        onEndReachedThreshold={0}
      />
    </SafeAreaView>
  );
};

export default PaymentList;

const styles = StyleSheet.create({
  icon: {
    marginRight: 10,
    marginLeft: 10,
    color: COLORS.white,
    padding: 10,
  },
  loaderStyle: {
    marginVertical: 16,
    alignItems: 'center',
  },
});
