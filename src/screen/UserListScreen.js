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
import Ionicons from 'react-native-vector-icons/Ionicons';
import UserList from '../component/UserList';
import NoData from '../component/NoData';
import firestore from '@react-native-firebase/firestore';

const UserListScreen = ({navigation}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastUser, setLastUser] = useState(0);
  const [latest, setLatest] = useState();

  const getAllUsers = async () => {
    setLoading(true);
    firestore()
      .collection('user')
      .where('deleted', '==', false)
      .orderBy('name')
      .startAfter(lastUser)
      .limit(5)
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
          setLoading(false);
        },
      );
  };

  useEffect(() => {
    setLoading(true);
    getAllUsers();
  }, [lastUser]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setLoading(true);
      getAllUsers();
    });

    return unsubscribe;
  }, [navigation]);

  const loadMoreItem = () => {
    setLastUser(latest);
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
      <Header title="User Lists">
        <Ionicons
          name="md-list-outline"
          size={25}
          style={styles.icon}
          onPress={() => {
            navigation.navigate('UserAmountUpdateList');
          }}
        />
        <Ionicons
          name="person-add"
          size={25}
          style={styles.icon}
          onPress={() => {
            navigation.navigate('UserCreateScreen');
          }}
        />
      </Header>
      {data.length == 0 && <NoData />}
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <UserList navigation={navigation} item={item} />
        )}
        contentContainerStyle={{padding: 20}}
        ListFooterComponent={renderLoader}
        onEndReached={loadMoreItem}
        onEndReachedThreshold={0}
      />
    </SafeAreaView>
  );
};

export default UserListScreen;

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
