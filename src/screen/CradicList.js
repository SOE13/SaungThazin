import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../contacts/thems';
import Header from '../component/Header';
import NoData from '../component/NoData';
import firestore from '@react-native-firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Cradic from '../component/Cradic';

const CradicList = ({navigation}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [lastData, setLastData] = useState(0);
  const [latest, setLatest] = useState();

  const getAllUsers = async () => {
    firestore()
      .collection('cradic')
      .orderBy('date', 'desc')
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
  const getFirstUsers = async () => {
    firestore()
      .collection('cradic')
      .orderBy('date', 'desc')
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
    getAllUsers();
  }, [lastData]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setLoading(true);
      getFirstUsers();
    });

    return unsubscribe;
  }, [navigation]);

  const loadMoreItem = () => {
    setLastData(latest);
  };

  giveFun = () => {
    getFirstUsers();
    getFirstUsers();
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
      <Header title="Cradic List">
        <Ionicons
          name="md-list-outline"
          size={25}
          style={styles.icon}
          onPress={() => navigation.navigate('PaymentListScreen')}
        />
      </Header>
      {data.length == 0 && <NoData />}

      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item}) => <Cradic fun={giveFun} item={item} />}
        contentContainerStyle={{padding: 20}}
        ListFooterComponent={renderLoader}
        onEndReached={loadMoreItem}
        onEndReachedThreshold={0}
      />
    </SafeAreaView>
  );
};

export default CradicList;

const styles = StyleSheet.create({
  icon: {
    marginRight: 10,
    marginLeft: 10,
    color: COLORS.white,
  },
  loaderStyle: {
    marginVertical: 16,
    alignItems: 'center',
  },
});
