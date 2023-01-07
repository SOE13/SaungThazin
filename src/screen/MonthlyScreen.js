import {
  ActivityIndicator,
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../contacts/thems';
import Header from '../component/Header';
import NoData from '../component/NoData';
import firestore from '@react-native-firebase/firestore';
import Profit from '../component/Profit';
import Entypo from 'react-native-vector-icons/Entypo';
import MonthPicker from 'react-native-month-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';

const MontelyScreen = ({navigation}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const [lastData, setLastData] = useState(0);
  const [latest, setLatest] = useState();

  function onChange(date) {
    setLoading(true);
    let month = date.toString().slice(4, 7);
    let year = date.toString().slice(11, 15);
    firestore()
      .collection('monthlyProfit')
      .where('month', '==', month)
      .where('year', '==', parseInt(year))
      .orderBy('createdAt', 'desc')
      .get()
      .then(querySnapshot => {
        let temp = [];
        querySnapshot.forEach(doc => {
          temp.push({id: doc.id, ...doc.data()});
        });
        setData(temp);
        setLoading(false);
        setShow(false);
      });
    setShow(false);
  }

  const getAllProfit = async () => {
    firestore()
      .collection('monthlyProfit')
      .orderBy('createdAt', 'desc')
      .startAfter(lastData)
      .limit(4)
      .get()
      .then(
        querySnapshot => {
          let temp = [];
          querySnapshot.forEach(doc => {
            temp.push({id: doc.id, ...doc.data()});
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
  const getFirstProfit = async () => {
    firestore()
      .collection('monthlyProfit')
      .orderBy('createdAt', 'desc')
      .limit(4)
      .get()
      .then(
        querySnapshot => {
          let temp = [];
          querySnapshot.forEach(doc => {
            temp.push({id: doc.id, ...doc.data()});
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
    getAllProfit();
  }, [lastData]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setLoading(true);
      getFirstProfit();
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
      <Header title="Monthly">
        <Ionicons
          name="search"
          size={25}
          style={styles.icon}
          onPress={() => setShow(true)}
        />
      </Header>

      {data.length == 0 && <NoData />}

      <FlatList
        data={data}
        keyExtractor={item => Math.random()}
        renderItem={({item}) => (
          <Profit
            item={item}
            children={
              <Text
                style={{color: COLORS.black, fontSize: 12, textAlign: 'right'}}>
                {item.month}, {item.year}
              </Text>
            }
          />
        )}
        contentContainerStyle={{padding: 20}}
        ListFooterComponent={renderLoader}
        onEndReached={loadMoreItem}
        onEndReachedThreshold={0}
      />

      <Modal transparent visible={show}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <View style={{alignItems: 'center'}}>
              <View style={styles.modalHeader}>
                <Text
                  style={{
                    fontSize: 18,
                    color: COLORS.black,
                    fontWeight: 'bold',
                  }}>
                  Select Month
                </Text>
                <TouchableOpacity onPress={() => setShow(false)}>
                  <Entypo
                    name="circle-with-cross"
                    size={30}
                    color={COLORS.black}
                  />
                </TouchableOpacity>
              </View>
              <MonthPicker
                selectedDate={new Date()}
                nextIcon={
                  <Entypo
                    name="chevron-with-circle-right"
                    size={25}
                    color={COLORS.black}
                  />
                }
                prevIcon={
                  <Entypo
                    name="chevron-with-circle-left"
                    size={25}
                    color={COLORS.black}
                  />
                }
                yearTextStyle={{color: 'black', fontSize: 18}}
                onMonthChange={date => onChange(date)}
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default MontelyScreen;

const styles = StyleSheet.create({
  icon: {
    marginRight: 10,
    marginLeft: 10,
    color: COLORS.white,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 15,
    elevation: 20,
  },
  modalHeader: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
