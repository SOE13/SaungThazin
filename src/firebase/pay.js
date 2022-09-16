import firestore from '@react-native-firebase/firestore'

export const addPay = (item, pay) => {
   const date = new Date();
    const tempMonth = ["Jan","Feb","Mar","Apr","May","Jun"
    ,"Jul","Aug","Sep","Oct","Nov","Dec"];
    let day = date.getDate();
    let month = tempMonth[date.getMonth()];
    let year = date.getFullYear();
    function formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }
    const time = formatAMPM(date)
    return firestore().collection('pay').add({
       item,day,month,year,time, date: firestore.FieldValue.serverTimestamp(),
    }).then(() => {
       firestore()
        .collection('cradic')
        .doc(item.id)
        .update({cradicAmount:item.cradicAmount-parseInt(pay)})
    })
}

export const addPayAll = (item) => {
    const date = new Date();
    const tempMonth = ["Jan","Feb","Mar","Apr","May","Jun"
    ,"Jul","Aug","Sep","Oct","Nov","Dec"];
    let day = date.getDate();
    let month = tempMonth[date.getMonth()];
    let year = date.getFullYear();
    function formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }
    const time = formatAMPM(date)
    return firestore().collection('pay').add({
       item,day,month,year,time, date: firestore.FieldValue.serverTimestamp(),
    }).then(() => {
       firestore()
        .collection('cradic')
        .doc(item.id)
        .delete()
    })
}