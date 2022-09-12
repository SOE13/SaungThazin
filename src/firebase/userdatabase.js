import firestore from '@react-native-firebase/firestore'

export const createUser = (name, account, accountNo, imageUri) => {
    return firestore().collection('user').add({
        name,account,accountNo,imageUri,amount:0
    })
 }