import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../contacts/thems';
import Button from '../component/Button';
import Entypo from 'react-native-vector-icons/Entypo';
import {images} from '../contacts/images';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import Apploder from '../component/Apploder';
import firestore from '@react-native-firebase/firestore';
import {addNewTransition} from '../firebase/transitiondatabase';
import UserList from '../component/UserList';

const TransferCreateScreen = ({navigation}) => {
  const [fromVisible, setFromVisible] = useState(false);
  const [toVisible, setToVisible] = useState(false);
  const [optionVisible, setOptionVisible] = useState(false);
  const [cradicVisible, setCradicVisible] = useState(false);
  const [activeInput, setActiveInput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const [description, setDescription] = useState('');
  const [option, setOption] = useState('');
  const [profit, setProfit] = useState(0);
  const [agent, setAgent] = useState(0);
  const [operator, setOperator] = useState('');
  const [cradic, setCradic] = useState(false);
  const [formUser, setFromUser] = useState({});
  const [customer, setCustomer] = useState('');
  const [fromAmount, setFromAmount] = useState(0);
  const [toAmount, settoAmount] = useState(0);
  const [counter, setCounter] = useState({});

  const [imageUrl, setImageUrl] = useState('');

  const [lastUser, setLastUser] = useState(0);
  const [latest, setLatest] = useState();

  const getCounter = async () => {
    firestore()
      .collection('user')
      .doc('ABC0123456789')
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          setCounter(documentSnapshot.data());
        }
      });
  };

  const getAllUser = async () => {
    setLoading(true);
    firestore()
      .collection('user')
      .where('deleted', '==', false)
      .orderBy('name')
      .startAfter(lastUser)
      .limit(3)
      .get()
      .then(
        querySnapshot => {
          let temp = [];
          querySnapshot.forEach(doc => {
            temp.push({id: doc.id, ...doc.data()});
            setLatest(doc);
          });
          setUsers([...users, ...temp]);
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
    getAllUser();
  }, [lastUser]);

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

  useEffect(() => {
    getCounter();
  }, []);

  const selectedImage = () => {
    launchImageLibrary({mediaType: 'photo'}, ({assets}) => {
      if (assets && assets.length > 0) {
        setImageUrl(assets[0].uri);
      }
    });
  };

  const fromVisibleToggle = () => {
    setFromVisible(!fromVisible);
  };
  const selectFromuser = value => {
    setFromUser(value);
    fromVisibleToggle();
  };

  const toVisibleToggle = () => {
    setToVisible(!toVisible);
  };
  const selectCostomer = value => {
    setCustomer(value);
    toVisibleToggle();
  };

  const optionVisibleToggle = () => {
    setOptionVisible(!optionVisible);
  };
  const selectOption = value => {
    setOption(value);
    optionVisibleToggle();
  };

  const cradicVisibleToggle = () => {
    setCradicVisible(!cradicVisible);
  };
  const selectCardic = value => {
    setCradic(value);
    cradicVisibleToggle();
  };

  const handleOnPress = async () => {
    setLoading(false);
    if (option === 'Cash Out') {
      if (parseInt(counter.amount) > parseInt(toAmount)) {
        let imageUri = '';
        if (
          description !== '' &&
          option !== '' &&
          Object.keys(formUser).length !== 0 &&
          fromAmount !== 0 &&
          customer !== '' &&
          toAmount !== 0 &&
          operator !== '' &&
          agent !== 0
        ) {
          if (imageUrl != '') {
            const reference = storage().ref(
              '/images/transfer/' + customer + fromAmount.accountNo,
            );
            await reference.putFile(imageUrl).then(() => {
              console.log('image uploaded');
            });
            let uri = reference.getDownloadURL().then(downloadURL => {
              addNewTransition(
                description,
                option,
                formUser,
                counter,
                fromAmount,
                customer,
                toAmount,
                profit,
                agent,
                operator,
                cradic,
                downloadURL,
              );
              ToastAndroid.show('Done', ToastAndroid.SHORT);
              setLoading(true);
            });
          } else {
            addNewTransition(
              description,
              option,
              formUser,
              counter,
              fromAmount,
              customer,
              toAmount,
              profit,
              agent,
              operator,
              cradic,
              imageUri,
            );
            ToastAndroid.show('Done', ToastAndroid.SHORT);
            setLoading(true);
          }
          navigation.goBack();
        } else {
          Alert.alert('', 'Please fill All field !', [{text: 'Okay'}]);
          setLoading(true);
        }
      } else {
        Alert.alert('', 'Counter does not have enoungt amount!', [
          {text: 'Okay'},
        ]);
      }
    } else {
      if (parseInt(formUser.amount) > parseInt(fromAmount)) {
        let imageUri = '';
        if (
          description !== '' &&
          option !== '' &&
          Object.keys(formUser).length !== 0 &&
          fromAmount !== 0 &&
          customer !== '' &&
          toAmount !== 0 &&
          operator !== '' &&
          agent !== 0
        ) {
          if (imageUrl != '') {
            const reference = storage().ref(
              '/images/transfer/' + customer + fromAmount.accountNo,
            );
            await reference.putFile(imageUrl).then(() => {
              console.log('image uploaded');
            });
            let uri = reference.getDownloadURL().then(downloadURL => {
              addNewTransition(
                description,
                option,
                formUser,
                counter,
                fromAmount,
                customer,
                toAmount,
                profit,
                agent,
                operator,
                cradic,
                downloadURL,
              );
              ToastAndroid.show('Done', ToastAndroid.SHORT);
              setLoading(true);
            });
          } else {
            addNewTransition(
              description,
              option,
              formUser,
              counter,
              fromAmount,
              customer,
              toAmount,
              profit,
              agent,
              operator,
              cradic,
              imageUri,
            );
            ToastAndroid.show('Done', ToastAndroid.SHORT);
            setLoading(true);
          }
          navigation.goBack();
        } else {
          Alert.alert('', 'Please fill All field !', [{text: 'Okay'}]);
          setLoading(true);
        }
      } else {
        Alert.alert('', 'User Account does not have enoungt amount!', [
          {text: 'Okay'},
        ]);
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Add Transition</Text>

      <View style={styles.formGroup}>
        <Text style={styles.formLabel}>Description</Text>
        <TextInput
          onFocus={() => setActiveInput('description')}
          value={description}
          placeholder="Description"
          onChangeText={value => setDescription(value)}
          style={{
            color: COLORS.black,
            padding: 10,
            backgroundColor: COLORS.white,
            borderRadius: 5,
            paddingVertical: 5,
            borderWidth: 1,
            borderColor:
              activeInput == 'description' ? COLORS.primary : COLORS.white,
          }}
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.formLabel}>Option</Text>
        {option === '' ? (
          <TouchableOpacity onPress={optionVisibleToggle} style={styles.option}>
            <Text style={{color: '#919191'}}>Option</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.optionItem}
            onPress={optionVisibleToggle}>
            <Text style={{color: COLORS.black}}>{option}</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={{...styles.formGroup, flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 1, paddingHorizontal: 10}}>
          {Object.keys(formUser).length === 0 ? (
            <Text style={styles.formLabel}>User</Text>
          ) : (
            <Text style={styles.formLabel}>
              {formUser.account.length > 7
                ? formUser.account.slice(0, 7) + '...'
                : formUser.account}
            </Text>
          )}
          {Object.keys(formUser).length === 0 ? (
            <TouchableOpacity onPress={fromVisibleToggle}>
              <Image
                style={styles.userItem}
                source={images('user')}
                resizeMode="stretch"
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={fromVisibleToggle}>
              {formUser.imageUri === '' ? (
                <Image
                  style={styles.userItem}
                  source={images('user')}
                  resizeMode="stretch"
                />
              ) : (
                <Image
                  resizeMode="stretch"
                  style={styles.userItem}
                  source={{uri: formUser.imageUri}}
                />
              )}
            </TouchableOpacity>
          )}
        </View>
        <View style={{flex: 3}}>
          <Text style={styles.formLabel}>Amount</Text>
          <TextInput
            onFocus={() => setActiveInput('fromAmount')}
            value={fromAmount}
            keyboardType={'number-pad'}
            placeholder="Amount"
            onChangeText={value => setFromAmount(value)}
            style={{
              color: COLORS.black,
              padding: 10,
              backgroundColor: COLORS.white,
              borderRadius: 5,
              paddingVertical: 8,
              borderWidth: 1,
              borderColor:
                activeInput == 'fromAmount' ? COLORS.primary : COLORS.white,
              textAlign: 'right',
            }}
          />
        </View>
      </View>
      {/* to amount */}

      <View style={{...styles.formGroup, flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 1, paddingHorizontal: 10}}>
          <Text style={styles.formLabel}>Customer</Text>

          <TouchableOpacity onPress={toVisibleToggle}>
            {customer === '' ? (
              <Image
                style={styles.userItem}
                source={images('user')}
                resizeMode="stretch"
              />
            ) : (
              <Image
                style={styles.userItem}
                source={images(customer)}
                resizeMode="stretch"
              />
            )}
          </TouchableOpacity>
        </View>
        <View style={{flex: 3}}>
          <Text style={styles.formLabel}>Amount</Text>
          <TextInput
            onFocus={() => setActiveInput('toAmount')}
            value={toAmount}
            keyboardType={'number-pad'}
            placeholder="Amount"
            onChangeText={value => settoAmount(value)}
            style={{
              color: COLORS.black,
              padding: 10,
              backgroundColor: COLORS.white,
              borderRadius: 5,
              paddingVertical: 8,
              borderWidth: 1,
              borderColor:
                activeInput == 'toAmount' ? COLORS.primary : COLORS.white,
              textAlign: 'right',
            }}
          />
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.formLabel}>Profit</Text>
        <TextInput
          onFocus={() => setActiveInput('profit')}
          value={profit}
          keyboardType={'number-pad'}
          placeholder="Profit"
          onChangeText={value => setProfit(value)}
          style={{
            color: COLORS.black,
            padding: 10,
            backgroundColor: COLORS.white,
            borderRadius: 5,
            paddingVertical: 5,
            borderWidth: 1,
            borderColor:
              activeInput == 'profit' ? COLORS.primary : COLORS.white,
            textAlign: 'right',
          }}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.formLabel}>Agent Fees</Text>
        <TextInput
          onFocus={() => setActiveInput('agent')}
          value={agent}
          keyboardType={'number-pad'}
          placeholder="Profit"
          onChangeText={value => setAgent(value)}
          style={{
            color: COLORS.black,
            padding: 10,
            backgroundColor: COLORS.white,
            borderRadius: 5,
            paddingVertical: 5,
            borderWidth: 1,
            borderColor: activeInput == 'agent' ? COLORS.primary : COLORS.white,
            textAlign: 'right',
          }}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.formLabel}>Operator</Text>
        <TextInput
          onFocus={() => setActiveInput('operator')}
          value={operator}
          placeholder="Operator"
          onChangeText={value => setOperator(value)}
          style={{
            color: COLORS.black,
            padding: 10,
            backgroundColor: COLORS.white,
            borderRadius: 5,
            paddingVertical: 5,
            borderWidth: 1,
            borderColor:
              activeInput == 'operator' ? COLORS.primary : COLORS.white,
          }}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.formLabel}>Paid Or Cradic</Text>
        {cradic === '' ? (
          <TouchableOpacity
            onPress={cradicVisibleToggle}
            style={styles.option}
          />
        ) : (
          <TouchableOpacity
            style={styles.optionItem}
            onPress={cradicVisibleToggle}>
            {cradic ? (
              <Text style={{color: COLORS.black}}>Cradic</Text>
            ) : (
              <Text style={{color: COLORS.black}}>Paid</Text>
            )}
          </TouchableOpacity>
        )}
      </View>

      {imageUrl == '' ? (
        <TouchableOpacity onPress={selectedImage} style={styles.formImage}>
          <Text style={styles.formImageText}>+ add image </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={selectedImage}>
          <Image
            source={{uri: imageUrl}}
            resizeMode={'cover'}
            style={{
              width: '100%',
              borderRadius: 5,
              height: 150,
              marginBottom: 10,
            }}
          />
        </TouchableOpacity>
      )}

      <Button
        handleOnPress={handleOnPress}
        label={'Add'}
        isPrimary={true}
        style={{marginVertical: 20, paddingVertical: 10, marginBottom: 20}}
      />
      <View style={{height: 50}}></View>

      {/* from user modal */}
      <Modal transparent visible={fromVisible}>
        <View style={styles.modalBackground}>
          <View
            style={{...styles.modalContainer, width: '95%', height: '100%'}}>
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity
                style={styles.modalHeader}
                onPress={fromVisibleToggle}>
                <Entypo
                  name="circle-with-cross"
                  size={30}
                  color={COLORS.black}
                />
              </TouchableOpacity>
              <View style={{width: '100%', alignContent: 'center'}}>
                <FlatList
                  data={users}
                  keyExtractor={item => item.id}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      style={styles.userItemContainer}
                      onPress={() => selectFromuser(item)}>
                      <View style={styles.userItemImage}>
                        {item.imageUri ? (
                          <Image
                            resizeMode="stretch"
                            style={styles.userImage}
                            source={{uri: item.imageUri}}
                          />
                        ) : (
                          <Image
                            style={styles.userImage}
                            source={images('user')}
                            resizeMode="stretch"
                          />
                        )}
                        <Text style={styles.userItemName}>{item.name}</Text>
                      </View>
                      <View style={styles.userItemWapper}>
                        <Text style={styles.userItemAmount}>
                          {item.amount} Kyats
                        </Text>
                        <View style={styles.userItemAccountText}>
                          <Text style={{color: COLORS.black}}>Account</Text>
                          <Text style={{color: COLORS.black}}>
                            {' '}
                            : {item.account}
                          </Text>
                        </View>
                        <View style={styles.userItemAccountText}>
                          <Text style={{color: COLORS.black}}>Account No</Text>
                          <Text style={{color: COLORS.black}}>
                            {' '}
                            : {item.accountNo}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  )}
                  contentContainerStyle={{padding: 20}}
                  ListFooterComponent={renderLoader}
                  onEndReached={loadMoreItem}
                  onEndReachedThreshold={0}
                />
                {/* <ScrollView style={{marginBottom: 45}}>
                  {users.map((user, i) => {
                    return (
                      <TouchableOpacity
                        key={i}
                        style={styles.userItemContainer}
                        onPress={() => selectFromuser(user)}>
                        <View style={styles.userItemImage}>
                          {user.imageUri ? (
                            <Image
                              resizeMode="stretch"
                              style={styles.userImage}
                              source={{uri: user.imageUri}}
                            />
                          ) : (
                            <Image
                              style={styles.userImage}
                              source={images('user')}
                              resizeMode="stretch"
                            />
                          )}
                          <Text style={styles.userItemName}>{user.name}</Text>
                        </View>
                        <View style={styles.userItemWapper}>
                          <Text style={styles.userItemAmount}>
                            {user.amount} Kyats
                          </Text>
                          <View style={styles.userItemAccountText}>
                            <Text style={{color: COLORS.black}}>Account</Text>
                            <Text style={{color: COLORS.black}}>
                              {' '}
                              : {user.account}
                            </Text>
                          </View>
                          <View style={styles.userItemAccountText}>
                            <Text style={{color: COLORS.black}}>
                              Account No
                            </Text>
                            <Text style={{color: COLORS.black}}>
                              {' '}
                              : {user.accountNo}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView> */}
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* to modal */}
      <Modal transparent visible={toVisible}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity
                style={styles.modalHeader}
                onPress={toVisibleToggle}>
                <Entypo
                  name="circle-with-cross"
                  size={30}
                  color={COLORS.black}
                />
              </TouchableOpacity>

              <View style={styles.modalIconWapper}>
                <TouchableOpacity onPress={() => selectCostomer('kbzpay')}>
                  <Image
                    style={styles.image}
                    source={images('kbzpay')}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => selectCostomer('wave')}>
                  <Image
                    style={styles.image}
                    source={images('wave')}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => selectCostomer('cbpay')}>
                  <Image
                    style={styles.image}
                    source={images('cbpay')}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => selectCostomer('cbbank')}>
                  <Image
                    style={styles.image}
                    source={images('cbbank')}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.modalIconWapper}>
                <TouchableOpacity onPress={() => selectCostomer('okdollor')}>
                  <Image
                    style={styles.image}
                    source={images('okdollor')}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => selectCostomer('ayapay')}>
                  <Image
                    style={styles.image}
                    source={images('ayapay')}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => selectCostomer('ayabank')}>
                  <Image
                    style={styles.image}
                    source={images('ayabank')}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => selectCostomer('abank')}>
                  <Image
                    style={styles.image}
                    source={images('abank')}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.modalIconWapper}>
                <TouchableOpacity onPress={() => selectCostomer('mab')}>
                  <Image
                    style={styles.image}
                    source={images('mab')}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => selectCostomer('mpitesan')}>
                  <Image
                    style={styles.image}
                    source={images('mpitesan')}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => selectCostomer('onepay')}>
                  <Image
                    style={styles.image}
                    source={images('onepay')}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => selectCostomer('truemoney')}>
                  <Image
                    style={styles.image}
                    source={images('truemoney')}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.modalIconWapper}>
                <TouchableOpacity onPress={() => selectCostomer('uabpay')}>
                  <Image
                    style={styles.image}
                    source={images('uabpay')}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => selectCostomer('yoma')}>
                  <Image
                    style={styles.image}
                    source={images('yoma')}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => selectCostomer('cash')}>
                  <Image
                    style={styles.image}
                    source={images('cash')}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => selectCostomer('topUp')}>
                  <Image
                    style={styles.image}
                    source={images('topUp')}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* cradic or paid modal */}
      <Modal transparent visible={cradicVisible}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity
                style={styles.modalHeader}
                onPress={cradicVisibleToggle}>
                <Entypo
                  name="circle-with-cross"
                  size={30}
                  color={COLORS.black}
                />
              </TouchableOpacity>
              <View style={{width: '100%', alignContent: 'center'}}>
                <TouchableOpacity
                  style={styles.optionItem}
                  onPress={() => selectCardic(false)}>
                  <Text style={{color: COLORS.black}}>Paid</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.optionItem}
                  onPress={() => selectCardic(true)}>
                  <Text style={{color: COLORS.black}}>Cradic</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* option modal */}
      <Modal transparent visible={optionVisible}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity
                style={styles.modalHeader}
                onPress={optionVisibleToggle}>
                <Entypo
                  name="circle-with-cross"
                  size={30}
                  color={COLORS.black}
                />
              </TouchableOpacity>
              <View style={{width: '100%', alignContent: 'center'}}>
                <TouchableOpacity
                  style={styles.optionItem}
                  onPress={() => selectOption('Cash In')}>
                  <Text style={{color: COLORS.black}}>Cash In</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.optionItem}
                  onPress={() => selectOption('Cash Out')}>
                  <Text style={{color: COLORS.black}}>Cash Out</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.optionItem}
                  onPress={() => selectOption('Transfer Money')}>
                  <Text style={{color: COLORS.black}}>Transfer Money</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.optionItem}
                  onPress={() => selectOption('Top Up')}>
                  <Text style={{color: COLORS.black}}>Top Up</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.optionItem}
                  onPress={() => selectOption('Other')}>
                  <Text style={{color: COLORS.black}}>Other</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default TransferCreateScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroung,
    padding: 20,
  },
  header: {
    fontSize: 24,
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  formGroup: {
    marginBottom: 20,
  },
  formLabel: {
    fontSize: 15,
    opacity: 0.5,
    marginBottom: 5,
    color: COLORS.black,
  },
  option: {
    color: COLORS.black,
    padding: 10,
    backgroundColor: COLORS.white,
    borderRadius: 5,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: COLORS.white,
    height: 40,
  },
  optionItem: {
    color: COLORS.black,
    padding: 10,
    backgroundColor: COLORS.lightGray,
    borderRadius: 5,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    height: 40,
    width: '100%',
    justifyContent: 'center',
    marginVertical: 2,
  },
  userItem: {
    color: COLORS.black,
    backgroundColor: COLORS.lightGray,
    paddingVertical: 10,
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 50,
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
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  formImage: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: COLORS.primary + '70',
    marginBottom: 10,
    borderRadius: 10,
  },
  formImageText: {
    color: COLORS.black,
    fontSize: 15,
  },
  userItemContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    padding: 10,
    backgroundColor: COLORS.lightGray,
    color: COLORS.black,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },
  userItemWapper: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userItemImage: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userItemName: {
    fontSize: 14,
    padding: 10,
    color: COLORS.black,
  },
  userItemAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: COLORS.black,
  },
  userItemAccountText: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: '100%',
    marginHorizontal: 5,
    color: COLORS.black,
    fontSize: 12,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    margin: 10,
  },
  modalIconWapper: {
    flexDirection: 'row',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 15,
    margin: 10,
  },
});
