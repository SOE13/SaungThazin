import firestore from '@react-native-firebase/firestore'
import { cradicAdd } from './cradic';
export const addNewTransition = (description,option,formUser,fromAmount,customer,toAmount,profit,operator,cradic,imageUri) => {
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

    return firestore().collection('transition').add({
        description, option, formUser, fromAmount, customer,
        toAmount, profit, operator, imageUri, date: firestore.FieldValue.serverTimestamp(),
        day,month,year,time
    }).then(() => {
        cradic&&cradicAdd(description,option,customer,toAmount,profit,operator)
        if (option === 'Cash Out') {
            let amount=parseInt(formUser.amount)+parseInt(toAmount)
            firestore()
                .collection('user')
                .doc(formUser.id)
                .update({ amount })
        } else {
            let amount=parseInt(formUser.amount)-parseInt(toAmount)
            firestore()
                .collection('user')
                .doc(formUser.id)
                .update({ amount })
        }
    })
}

