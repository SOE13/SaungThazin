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
import NoData from '../component/NoData';
import firestore from '@react-native-firebase/firestore';
import Profit from '../component/Profit';

const YearlyScreen = ({navigation}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [lastData, setLastData] = useState(0);
  const [latest, setLatest] = useState();

  const getAllProfit = async () => {
    firestore()
      .collection('yearlyProfit')
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
    setLoading(true);
    firestore()
      .collection('yearlyProfit')
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
      <Header title="Yearly" />

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
                {item.year}
              </Text>
            }
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

export default YearlyScreen;

const styles = StyleSheet.create({});
