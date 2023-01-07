import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  ToastAndroid,
  Image,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../contacts/thems';
import Button from '../component/Button';
import {images} from '../contacts/images';
import {launchImageLibrary} from 'react-native-image-picker';
import Apploder from '../component/Apploder';
import storage from '@react-native-firebase/storage';
import {createUser} from '../firebase/userdatabase';

const UserCreateScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [account, setAccount] = useState('');
  const [accountNo, setAccountNo] = useState('');

  const [activeInput, setActiveInput] = useState(null);
  const [loading, setLoading] = useState(true);

  const [imageUrl, setImageUrl] = useState('');

  const handleOnPress = async () => {
    setLoading(false);
    let imageUri = '';
    if (name !== '' && account !== '' && accountNo !== '') {
      if (imageUrl != '') {
        const reference = storage().ref('/images/user/' + accountNo);
        await reference.putFile(imageUrl).then(() => {
          console.log('image uploaded');
        });
        let uri = reference.getDownloadURL().then(downloadURL => {
          createUser(name, account, accountNo, downloadURL);
          ToastAndroid.show('Created', ToastAndroid.SHORT);
          setLoading(true);
        });
      } else {
        createUser(name, account, accountNo, imageUri);
        ToastAndroid.show('Created', ToastAndroid.SHORT);
        setLoading(true);
      }

      navigation.goBack();
    } else {
      Alert.alert('', 'Please fill All field !', [{text: 'Okay'}]);
      setLoading(true);
    }
  };

  const selectedImage = () => {
    launchImageLibrary({mediaType: 'photo'}, ({assets}) => {
      if (assets && assets.length > 0) {
        setImageUrl(assets[0].uri);
      }
    });
  };

  return (
    <ScrollView style={{backgroundColor: COLORS.backgroung}}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Create User</Text>

        {imageUrl == '' ? (
          <TouchableOpacity onPress={selectedImage} style={styles.formImage}>
            <Image
              style={styles.image}
              source={images('user')}
              resizeMode="stretch"
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={selectedImage} style={styles.formImage}>
            <Image
              source={{uri: imageUrl}}
              resizeMode={'stretch'}
              style={styles.image}
            />
          </TouchableOpacity>
        )}

        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>Name</Text>
          <TextInput
            onFocus={() => setActiveInput('name')}
            value={name}
            placeholder="Name"
            onChangeText={value => setName(value)}
            style={{
              color: COLORS.black,
              padding: 10,
              backgroundColor: COLORS.white,
              borderRadius: 5,
              paddingVertical: 10,
              borderWidth: 1,
              borderColor:
                activeInput == 'name' ? COLORS.primary : COLORS.white,
            }}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>Account</Text>
          <TextInput
            onFocus={() => setActiveInput('account')}
            value={account}
            placeholder="Kpay, wavepay"
            onChangeText={value => setAccount(value)}
            style={{
              color: COLORS.black,
              padding: 10,
              backgroundColor: COLORS.white,
              borderRadius: 5,
              paddingVertical: 10,
              borderWidth: 1,
              borderColor:
                activeInput == 'account' ? COLORS.primary : COLORS.white,
            }}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>Account NO</Text>
          <TextInput
            onFocus={() => setActiveInput('accountNo')}
            value={accountNo}
            keyboardType={'number-pad'}
            placeholder="0900000001"
            onChangeText={value => setAccountNo(value)}
            style={{
              color: COLORS.black,
              padding: 10,
              backgroundColor: COLORS.white,
              borderRadius: 5,
              paddingVertical: 10,
              borderWidth: 1,
              borderColor:
                activeInput == 'accountNo' ? COLORS.primary : COLORS.white,
            }}
          />
        </View>

        <Button
          handleOnPress={handleOnPress}
          label={'Create'}
          isPrimary={true}
          style={{marginVertical: 20, paddingVertical: 10, marginBottom: 20}}
        />
      </SafeAreaView>

      {loading == false && <Apploder />}
    </ScrollView>
  );
};

export default UserCreateScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroung,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    alignItems: 'center',
    textAlign: 'center',
    marginVertical: 20,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  formGroup: {
    marginBottom: 20,
  },
  formLabel: {
    fontSize: 18,
    opacity: 0.5,
    marginBottom: 5,
    color: COLORS.black,
  },
  formImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    margin: 10,
  },
});
