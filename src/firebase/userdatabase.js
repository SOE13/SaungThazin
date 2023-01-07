import firestore from '@react-native-firebase/firestore';

export const createUser = (name, account, accountNo, imageUri) => {
  return firestore().collection('user').add({
    name,
    account,
    accountNo,
    imageUri,
    amount: 0,
    deleted: false,
  });
};

export const updateAmountRecord = (
  name,
  account,
  accountNo,
  imageUri,
  amount,
) => {
  const date = new Date();
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
  let day = date.getDate();
  let month = tempMonth[date.getMonth()];
  let year = date.getFullYear();
  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }
  const time = formatAMPM(date);
  return firestore().collection('record').add({
    name,
    account,
    accountNo,
    imageUri,
    amount,
    date: firestore.FieldValue.serverTimestamp(),
    day,
    month,
    year,
    time,
  });
};
