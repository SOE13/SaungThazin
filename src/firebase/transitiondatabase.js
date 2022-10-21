import firestore from '@react-native-firebase/firestore'
import { cradicAdd } from './cradic';
export const addNewTransition = (description,option,formUser,counter,fromAmount,customer,toAmount,profit,agent,operator,cradic,imageUri) => {
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
        toAmount, profit,agent, operator, imageUri, date: firestore.FieldValue.serverTimestamp(),
        day,month,year,time,status:false
    }).then((data) => {
        dailyProfit(day,month,year,formUser,profit)
        monthlyProfit(month,year,formUser,profit)
        yearlyProfit(year, formUser, profit)
        cradic&&cradicAdd(data._documentPath._parts[1],description,option,customer,toAmount,profit,operator)
        if (option === 'Cash Out') {
            let countAmout=(parseInt(counter.amount)-parseInt(toAmount))+parseInt(profit)
            let amount = parseInt(formUser.amount) + parseInt(toAmount) + parseInt(agent)
            firestore()
                .collection('user')
                .doc(formUser.id)
                .update({ amount })
             firestore()
                .collection('user')
                .doc("ABC0123456789")
                .update({ amount:countAmout })
        } else {
             let countAmout=parseInt(counter.amount)+parseInt(toAmount)+parseInt(profit)
            let amount=(parseInt(formUser.amount)-parseInt(toAmount))+parseInt(agent)
            firestore()
                .collection('user')
                .doc(formUser.id)
                .update({ amount })
            firestore()
                .collection('user')
                .doc("ABC0123456789")
                .update({amount: countAmout })
        }
    })
}

const yearlyProfit = async (year, formUser, profit) => {
    firestore()
        .collection('yearlyProfit')
        .where('year', '==', year).where('formUserId','==',formUser.accountNo).get()
        .then((querySnapshot) => {
            if (querySnapshot._changes.length==0) {
                firestore().collection('yearlyProfit').add({formUserId:formUser.accountNo,formUser,profit,year,createdAt: firestore.FieldValue.serverTimestamp()})
            } else {
                 let temp = {}
                querySnapshot.forEach((doc) => {
                temp = { id: doc.id, ...doc.data() }
                })   
                let total = parseInt(temp.profit)+parseInt(profit)
                firestore().collection('yearlyProfit').doc(temp.id).update({profit:total})
                }
            })
}

const monthlyProfit = async (month,year, formUser, profit) => {
    firestore()
        .collection('monthlyProfit').where('month','==',month)
        .where('year', '==', year).where('formUserId','==',formUser.accountNo).get()
        .then((querySnapshot) => {
            if (querySnapshot._changes.length==0) {
                firestore().collection('monthlyProfit').add({formUserId:formUser.accountNo,formUser,profit,month,year,createdAt: firestore.FieldValue.serverTimestamp()})
            } else {
                 let temp = {}
                querySnapshot.forEach((doc) => {
                temp = { id: doc.id, ...doc.data() }
                })   
                let total = parseInt(temp.profit)+parseInt(profit)
                firestore().collection('monthlyProfit').doc(temp.id).update({profit:total})
                }
            })
}

const dailyProfit = async (day,month,year,formUser, profit) => {
    firestore()
        .collection('dailyProfit').where('day','==',day).where('month','==',month)
        .where('year', '==', year).where('formUserId','==',formUser.accountNo).get()
        .then((querySnapshot) => {
            if (querySnapshot._changes.length==0) {
                firestore().collection('dailyProfit').add({formUserId:formUser.accountNo,formUser,profit,day,month,year,createdAt: firestore.FieldValue.serverTimestamp()})
            } else {
                 let temp = {}
                querySnapshot.forEach((doc) => {
                temp = { id: doc.id, ...doc.data() }
                })   
                let total = parseInt(temp.profit)+parseInt(profit)
                firestore().collection('dailyProfit').doc(temp.id).update({profit:total})
                }
            })
}

