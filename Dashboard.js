import { SafeAreaView, StyleSheet, Alert, FlatList, RefreshControl, Text, View, Dimensions, Image, ScrollView, TouchableOpacity, Modal, TouchableWithoutFeedback, Pressable, ActivityIndicator, TurboModuleRegistry, BackHandler } from 'react-native'
import React, { useState, useEffect, useRef } from 'react';
import { CheckBox } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import api from './Helper/helper';

import AsyncStorage from '@react-native-async-storage/async-storage';
import currentdate from './constant/constant'
import { TextInput } from 'react-native-gesture-handler';
import moment from 'moment';
import DatePicker from 'react-native-date-picker'
import ChartView from 'react-native-highcharts';
import {
  wrapScrollView,
  useScrollIntoView,
} from 'react-native-scroll-into-view';
import * as Progress from 'react-native-progress';
import MonthPicker from 'react-native-month-picker';

const optionss = {
  // auto: ensure element appears fully inside the view (if not already inside). It may align to top or bottom.
  //  top: 0, 
  // bottom: 50,
  // center: 0,
  align: 'auto',
  thousandsSep: ',',
  decimalPoint: '.',
  // Animate the scrollIntoView() operation
  animated: true,

  // By default, scrollIntoView() calls are throttled a bit because it does not make much sense
  // to scrollIntoView() 2 elements at the same time (and sometimes even impossible)
  immediate: false,

  // Permit to add top/bottom insets so that element scrolled into view
  // is not touching directly the borders of the scrollview (like a padding)
  insets: {
    top: 20,
    bottom: 50,
  }
}
const CustomScrollView = wrapScrollView(ScrollView);

function JockeyDashBoard({ navigation, route }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <CustomScrollView overScrollMode="never" style={{ flex: 1 }}>
          <Dashboard route={route} navigation={navigation} />

        </CustomScrollView>
        {/* Footer */}
        <View style={styles.footer}>
          <Text numberOfLines={1} style={{ fontSize: 12, alignSelf: 'center', color: 'gray', width: '60%' }}>COPYRIGHT © Revalsys Technologies</Text>
          <View style={{ width: '37%', height: 46, alignItems: 'center', justifyContent: 'center', marginLeft: 20 }}>
            <Image
              style={{ height: 36, width: '98%', alignSelf: 'center', resizeMode: 'contain' }}
              source={require('./assets/Revalsys-logo.png')}
            /></View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const w = Dimensions.get('screen').width;
const h = Dimensions.get('screen').height;

const Dashboard = ({ navigation, route }) => {
  useEffect(() => {

    const backAction = () => {

      BackHandler.exitApp();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();

  }, []);
  /* useEffect(() => {
     const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
     return () => backHandler.remove()
   }, []) */
  const scrollIntoView = useScrollIntoView();
  const viewRef = useRef();
  const viewRef1 = useRef();
  const viewRef2 = useRef();
  const viewRef3 = useRef();
  const viewRef4 = useRef();
  const viewRef5 = useRef();
  const viewRef6 = useRef();
  const viewRef7 = useRef();
  const viewRef8 = useRef();
  const viewRef9 = useRef();
  const viewRef10 = useRef();
  const viewRef11 = useRef();
  const viewRef12 = useRef();
  const viewRef00 = useRef();
  const viewRefOrder = useRef();
  const viewRefbyPymnt = useRef();
  const viewFilterPymnt = useRef();

  const [ShowYearModal, setShowYearModal] = useState(false);
  const [YearData, setYearData] = useState([]);
  const Yeardata = (startYear) => {
    var currentYear = new Date().getFullYear(), years = [];
    startYear = startYear || 2019;
    while (startYear <= currentYear) {
      years.push(startYear++);
    }
    setYearData(years)
  }

  const data = [
    { month: 'January', startDate: 0 },
    { month: 'February', startDate: 1 },
    { month: 'March', startDate: 2 },
    { month: 'April', startDate: 3 },
    { month: 'May', startDate: 4 },
    { month: 'June', startDate: 5 },
    { month: 'July', startDate: 6 },
    { month: 'August', startDate: 7 },
    { month: 'September', startDate: 8 },
    { month: 'October', startDate: 9 },
    { month: 'November', startDate: 10 },
    { month: 'December', startDate: 11 },
  ];

  const [valueUI, setvalueUI] = useState("");
  const formated = moment(currentdate.cdate).format('YYYY');
  const [selectedYear, setSelectedYear] = useState('')
  const onChangeSS = async (item) => {
    setShowMonth(false);
    setvalueUI(item.month);
    var firstDay = new Date(formated, item.startDate + 0, 1);
    var lastDay = new Date(formated, item.startDate + 1, 0);

    let GetSiteId = await AsyncStorage.getItem('siteId');
    let siteId = route.params?.siteId
    const Request = {
      Date: moment(firstDay).format('DD MMM YYYY'),
      IsYear: isYear,
      PartnerId: GetSiteId == null ? JSON.parse(siteId) : JSON.parse(GetSiteId),
      StoreOrderStatus: ids.toString(),
      ToDate: moment(lastDay).format('DD MMM YYYY'),
      "BrandId": brandId,
      "DeviceType": deviceType

    }
    api.postData('api/sales/GetSales', Request).then((response) => {
      if (response != undefined && response != null) {
        if (response.data.ReturnCode == 0) {
          setResponseMessage(response.data.ReturnMessage);
          if (response.data.Data != undefined && response.data.Data != null) {
            let Orders = response.data.Data.salesWithDate
            //GetNumberOfPieces1(response.data.Data);
            let SalesDate = []
            let Salesas = []
            let SalesChart = []
            var SalesDateConst = 0;
            Orders.forEach(x => {
              Salesas.push(x.SalesCount);
              SalesDate.push(x.Day);
              SalesChart = Salesas;
              SalesDateConst = SalesDate;
            });

            console.log('SalesChart-->', SalesChart);
            setSalesCountForC2(SalesChart);
            setSalesCountForC2Days(SalesDateConst);

            let SalesDatessss = []
            let Salesss = []
            Orders.forEach(x => {
              Salesss.push(x.Sales);
              SalesDatessss.push(x.Day);

            });
            setSalesAmountChart2(Salesss);
            setSalesDays2(SalesDatessss);

            let AvgOrderArray = 0;
            let AVGSales = 0;
            let AvgslCont = 0;
            let AvgOrdersArray = []

            Orders.forEach(x => {

              AVGSales = x.Sales;
              AvgslCont = x.SalesCount;
              if (AVGSales == 0) {
                AvgOrdersArray.push(0)
              } else {
                AvgOrderArray = (AVGSales / AvgslCont).toFixed()
                AvgOrdersArray.push(parseInt(AvgOrderArray))
              }
            });
            setAverageOrderValueArray1(AvgOrdersArray);
          }
        }
        else {
          setResponseMessage('');
          setResponseMessage(response.data.ReturnMessage);
        }
      }
    });
    const RequestP = {
      Date: moment(firstDay).format('DD MMM YYYY'),
      PartnerId: GetSiteId == null ? JSON.parse(siteId) : JSON.parse(GetSiteId),
      IsYear: isYear,
      StoreOrderStatus: ids.toString(),
      ToDate: moment(lastDay).format('DD MMM YYYY'),
      "BrandId": brandId,
      "DeviceType": deviceType


    }
    api.postData('api/OrdersByOrderStatus/GetNumberOfPieces', RequestP)
      .then((response) => {
        if (response != undefined && response != null) {
          if (response.data.ReturnCode == 0) {
            setResponseMessage(response.data.ReturnMessage);
            if (response.data.Data != undefined && response.data.Data != null) {
              let LatOrders = response.data.Data;

              let numbrofpcesArray1 = []
              let NumberofDays = [];

              LatOrders.forEach(x => {
                numbrofpcesArray1.push(x.NumberOfPieces);
                NumberofDays.push(x.Day);
              });
              setNumberofPeaces1Days(NumberofDays);
              setnumberofPeices1(numbrofpcesArray1);
              console.log('TotalNumberOfPiecesArray---->', numbrofpcesArray1);
              console.log('NumberofDays--->', NumberofDays);
              /* ........................................................................... */
              let A = response.data.Data
              let B = salesData
              var C = [];
              let AvgOrdersArrayss = []

              for (var i = 0; i < A.length; i++) {
                if (A[i].NumberOfPiecesOfTheDay == 0) {
                  AvgOrdersArrayss.push(0)
                } else {
                  C = ((A[i].NumberOfPiecesOfTheDay / B[i].SalesCount).toFixed(0));
                  AvgOrdersArrayss.push(parseInt(C));
                }
              }
              setAverageNumberOfPcsGraf2(AvgOrdersArrayss);
              console.log('Average Pieces Per Order 2 : ----->', AvgOrdersArrayss)

            }
          }
          else {
            setResponseMessage('');
            setResponseMessage(response.data.ReturnMessage);
            // setLoader(false);
          }
        }
      });

    const RequestO = {
      Date: moment(firstDay).format('DD MMM YYYY'),
      isYear: isYear,
      PartnerId: GetSiteId == null ? JSON.parse(siteId) : JSON.parse(GetSiteId),
      StoreOrderStatus: ids.toString(),
      ToDate: moment(lastDay).format('DD MMM YYYY'),
      "BrandId": brandId,
      "DeviceType": deviceType


    }
    api.postData('api/SoldItems/GetSoldItems', RequestO)
      .then((response) => {
        if (response != undefined && response != null) {
          if (response.data.ReturnCode == 0) {
            setResponseMessage(response.data.ReturnMessage);
            if (response.data.Data != undefined && response.data.Data != null) {

              let SoldItems = response.data.Data
              let SubOrdersArray = []
              var SubOrderssss = 0;
              SoldItems.forEach(x => {
                SubOrdersArray.push(x.Items);
                SubOrderssss = SubOrdersArray;
              });

              setSubOrderGraf2(SubOrderssss);
              console.log('Sub OrdersArray ---->', SubOrderssss);

            }
          }
          else {
            setResponseMessage('');
            setResponseMessage(response.data.ReturnMessage);
            // setLoader(false);
            setTimeout(() => {
              setResponseMessage('')
            }, 5000);
          }
        }
      });
  }

  const onChangeYear = async (item) => {
    setShowYearModal(false);
    setSelectedYear(item);
    var firstDay = new Date(item, 0 + 0, 1);
    var lastDay = new Date(item, 11 + 1, 0);
    let GetSiteId = await AsyncStorage.getItem('siteId');
    let siteId = route.params?.siteId
    const Request = {
      Date: moment(firstDay).format('DD MMM YYYY'),
      IsYear: isYear,
      PartnerId: GetSiteId == null ? JSON.parse(siteId) : JSON.parse(GetSiteId),
      StoreOrderStatus: ids.toString(),
      ToDate: moment(lastDay).format('DD MMM YYYY'),
      "BrandId": brandId,
      "DeviceType": deviceType

    }
    api.postData('api/sales/GetSales', Request)
      .then((response) => {
        if (response != undefined && response != null) {
          if (response.data.ReturnCode == 0) {
            setResponseMessage(response.data.ReturnMessage);
            if (response.data.Data != undefined && response.data.Data != null) {
              let Orders = response.data.Data
              //GetNumberOfPieces1(response.data.Data);
              let SalesDate = []
              let Salesas = []
              let SalesChart = []
              var SalesDateConst = 0;
              Orders.forEach(x => {
                Salesas.push(x.SalesCount);
                SalesDate.push(x.Day);
                SalesChart = Salesas;
                SalesDateConst = SalesDate;
              });

              console.log('SalesChart-->', SalesChart);
              setSalesCountForC2(SalesChart);
              setSalesCountForC2Days(SalesDateConst);

              let SalesDatessss = []
              let Salesss = []
              Orders.forEach(x => {
                Salesss.push(x.Sales);
                SalesDatessss.push(x.Day);

              });
              setSalesAmountChart2(Salesss);
              setSalesDays2(SalesDatessss);

              let AvgOrderArray = 0;
              let AVGSales = 0;
              let AvgslCont = 0;
              let AvgOrdersArray = []

              Orders.forEach(x => {

                AVGSales = x.Sales;
                AvgslCont = x.SalesCount;
                if (AVGSales == 0) {
                  AvgOrdersArray.push(0)
                } else {
                  AvgOrderArray = (AVGSales / AvgslCont).toFixed()
                  AvgOrdersArray.push(parseInt(AvgOrderArray))
                }
              });
              setAverageOrderValueArray1(AvgOrdersArray);
            }
          }
          else {
            setResponseMessage('');
            setResponseMessage(response.data.ReturnMessage);
          }
        }
      });

    const RequestP = {
      Date: moment(firstDay).format('DD MMM YYYY'),
      PartnerId: GetSiteId == null ? JSON.parse(siteId) : JSON.parse(GetSiteId),
      IsYear: isYear,
      StoreOrderStatus: ids.toString(),
      ToDate: moment(lastDay).format('DD MMM YYYY'),
      "BrandId": brandId,
      "DeviceType": deviceType


    }
    api.postData('api/OrdersByOrderStatus/GetNumberOfPieces', RequestP)
      .then((response) => {
        if (response != undefined && response != null) {
          if (response.data.ReturnCode == 0) {
            setResponseMessage(response.data.ReturnMessage);
            if (response.data.Data != undefined && response.data.Data != null) {
              let LatOrders = response.data.Data;

              let numbrofpcesArray1 = []
              let NumberofDays = [];

              LatOrders.forEach(x => {
                numbrofpcesArray1.push(x.NumberOfPieces);
                NumberofDays.push(x.Day);
              });
              setNumberofPeaces1Days(NumberofDays);
              setnumberofPeices1(numbrofpcesArray1);
              console.log('TotalNumberOfPiecesArray---->', numbrofpcesArray1);
              console.log('NumberofDays--->', NumberofDays);
              /* ........................................................................... */
              let A = response.data.Data
              let B = salesData
              var C = [];
              let AvgOrdersArrayss = []

              for (var i = 0; i < A.length; i++) {
                if (A[i].NumberOfPiecesOfTheDay == 0) {
                  AvgOrdersArrayss.push(0)
                } else {
                  C = ((A[i].NumberOfPiecesOfTheDay / B[i].SalesCount).toFixed(0));
                  AvgOrdersArrayss.push(parseInt(C));
                }
              }
              setAverageNumberOfPcsGraf2(AvgOrdersArrayss);
              console.log('Average Pieces Per Order 2 : ----->', AvgOrdersArrayss)

            }
          }
          else {
            setResponseMessage('');
            setResponseMessage(response.data.ReturnMessage);
            // setLoader(false);
          }
        }
      });

    const RequestO = {
      Date: moment(firstDay).format('DD MMM YYYY'),
      isYear: isYear,
      PartnerId: GetSiteId == null ? JSON.parse(siteId) : JSON.parse(GetSiteId),
      StoreOrderStatus: ids.toString(),
      ToDate: moment(lastDay).format('DD MMM YYYY'),
      "BrandId": brandId,
      "DeviceType": deviceType


    }
    api.postData('api/SoldItems/GetSoldItems', RequestO)
      .then((response) => {
        if (response != undefined && response != null) {
          if (response.data.ReturnCode == 0) {
            setResponseMessage(response.data.ReturnMessage);
            if (response.data.Data != undefined && response.data.Data != null) {

              let SoldItems = response.data.Data
              let SubOrdersArray = []
              var SubOrderssss = 0;
              SoldItems.forEach(x => {
                SubOrdersArray.push(x.Items);
                SubOrderssss = SubOrdersArray;
              });

              setSubOrderGraf2(SubOrderssss);
              console.log('Sub OrdersArray ---->', SubOrderssss);

            }
          }
          else {
            setResponseMessage('');
            setResponseMessage(response.data.ReturnMessage);
            // setLoader(false);
            setTimeout(() => {
              setResponseMessage('')
            }, 5000);
          }
        }
      });
  }
  /* ........................................ */


  const [orderStatusValue, setOrderStatusValue] = useState([]);

  const [drawerVisible, setDraweVisible] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [sales, setSales] = useState(0);
  const [SalesLastDay, setSalesLastDay] = useState(0);
  const [productsSold, setProductsSold] = useState(0);
  const [regCount, setRegCount] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectDate, setSelectDate] = useState(moment(new Date()).format('DD MMM YYYY')); //moment(new Date()).format('DD MMM YYYY')
  const [date, setDate] = useState(new Date());
  const [datefrom, setDatefrom] = useState(new Date(moment(new Date()).subtract(7, 'days').format('DD MMM YYYY')));
  const [partners, setPartners] = useState();
  const [brandId, setBrandId] = useState(0);
  const [brandName, setBrandName] = useState('All');
  const [fromDate, setFromDate] = useState(moment(new Date()).subtract(7, 'days').format('DD MMM YYYY'));
  const [toDate, setToDate] = useState(currentdate.cdate);
  const [ordersCount, setOrdersCount] = useState(0);
  const [OrdermodalVisible, setOrderModalVisible] = useState(false);
  const [OrderStatusData, setOrderStatusData] = useState('');
  const [totalOrders, setTotalOrders] = useState(0);
  const [registratrationCount, setRegistratrationCount] = useState(0);
  const [salesGrafCount, setSalesGrafCount] = useState('');
  const [totalnumberOfPieces, setNumberOfPieces] = useState(0);
  const [totalnumberofPreacesArray, setTotalnumberofPreacesArray] = useState('');
  const [salesChartArray, setSalesChartArray] = useState('');
  const [averageOrderValue, setAverageOrderValue] = useState(0);
  const [averageOrderValueArray, setAverageOrderValueArray] = useState('');
  const [subOrders, setSubOrders] = useState(0);
  const [subOrderGraf, setSubOrderGraf] = useState('');
  const [averagePiecesPerOrder, setAveragePiecesPerOrder] = useState(0);
  const [averagePiecesPerOrdergraf, setAveragePiecesPerOrdergraf] = useState('');
  const [newCount, setNewCount] = useState(0);
  const [repeatCount, setRepeatCount] = useState(0);
  const [newCountGraf, setNewCountGraf] = useState([]);
  const [repeatCountsGraf, setRepeatCountsGraf] = useState([]);
  const [activationsCount, setActivationsCount] = useState(0);
  const [activationCountsGraf, setActivationCountsGraf] = useState([]);
  const [repeatCustomerCount, setRepeatCustomerCount] = useState(0);
  const [ActivationCustomerCounts, setActivationCustomerCount] = useState(0);
  const [oneWeekSaleArray, setOneWeekSaleArray] = useState([]);
  const [oneWeekProdustsSoldArray, setOneWeekProdustsSoldArray] = useState([]);
  const [produstsSoldArrayoriginal, setOneWeekProdustsSoldArrayoriginal] = useState([]);
  const [ProductsSoldDays, setProductsSoldDays] = useState([]);


  const [ordersByStatusName, setOrdersByStatusName] = useState('');
  const [ordersByStatus, setOrdersByStatus] = useState(0);
  const [orderByCourier, setOrdersByCourier] = useState(0);
  const [paymentPrepaidValue, setPaymentPrepaidValue] = useState(0);
  const [paymentNetBanking, setPaymentNetBankingname] = useState(0);
  const [paymentPrepaidName, setPaymentTypeName] = useState();
  const [prepaidTypeName, setPrepaidTypeName] = useState();
  const [salesDate, setSalesDate] = useState()
  const [ids, setIds] = useState([9, 16, 39, 42, 45, 29, 3, 10, 72, 26, 30, 48, 2, 24, 23, 25, 17, 59, 60, 70, 15, 34, 103, 107, 108, 50, 109]);
  const [open, setOpen] = useState(false);
  const [openfrom, setopenfrom] = useState(false);
  const [openBForm, setopenBForm] = useState(false);
  const [newClient, setNewClient] = useState(0);
  const [recurringClient, setRecsetLastWeekDaysOurringClient] = useState(0);
  const [trafficSalesData, setTrafficSalesData] = useState();
  const [percentageData, setNewPercentageData] = useState();
  const [genderProgress, setGenderProgress] = useState();
  const [salesDays, setSalesDays] = useState('');
  const [numberofPeacesDays, setNumberofPeacesDays] = useState('');
  const [subOrdersDays, setSubOrdersDays] = useState('');
  const [newCustomerDays, setNewCustomerDays] = useState('');
  const [repeatCustomerDays, setRepeatCustomerDays] = useState('');
  const [activationDays, setActivationDays] = useState('');
  const [lastWeekDays, setLastWeekDays] = useState('');
  /* ....................................................... */
  const [googleCount, setGoogleCount] = useState();
  const [jockeyCount, setJockeyCount] = useState();
  const [faceboobkCount, setFaceboobkCount] = useState();
  const [jockeyPC, setJockeyPC] = useState();
  const [googlePC, setGooglePC] = useState();
  const [faceboobkPC, setFaceboobkPC] = useState();
  const [PaymentTypeShow, setPaymentTypeShow] = useState(false);
  const [TrafficSales, setTrafficSalesShow] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [malePC, setMalePC] = useState(0);
  const [femalePC, setFemalePC] = useState(0);

  const [desktopPC, setDesktopPC] = useState(0);
  const [mobilePC, setMobilePC] = useState(0);
  const [deviceProgress, setDeviceProgress] = useState();
  /* /////////////////////////////////////////////////////////// */
  const [salesCountForC2, setSalesCountForC2] = useState([]);
  const [salesCountForC2Days, setSalesCountForC2Days] = useState('');
  const [salesAmountChart2, setSalesAmountChart2] = useState([]);
  const [salesDays2, setSalesDays2] = useState('');
  const [salesGrafCountWeekData, setSalesGrafCountWeekData] = useState([]);



  const [newCountArray2, setNewCountArray2] = useState('');
  const [newCountDay2, setNewCountDay2] = useState('');
  const [repeatCountDays, setRepeatCountDays] = useState('');
  const [repeatCountArray2, setRepeatCountArray2] = useState('');
  const [activationCustomerCount2, setActivationCustomerCount2] = useState('');
  const [customerTypeCountDays, setCustomerTypeCountDays] = useState('');

  const [subOrderGraf2, setSubOrderGraf2] = useState('');
  const [orderSubOrderDays, setOrderSubOrderDays] = useState('');
  const [averageOrderValueArray1, setAverageOrderValueArray1] = useState('');

  const [Chartdateopen, setChartDateOpen] = useState(false);
  const [ChartYeardateopen, setChartYearDateOpen] = useState(false);
  const [ChartDateshow, setChartDatesShow] = useState(new Date());
  const [ChartYearDateshow, setChartYearDatesShow] = useState(new Date());
  /* ....................................................... */

  const [ProductsSoldShow, setProductsSoldShow] = useState(false);
  const [OrdersShow, setOrdersShow] = useState(false);
  const [TodayOrdersShow, setTodayOrdersShow] = useState(false);
  const [TodayOrdersbyPaymntShow, setTodayOrdersbyPaymntShow] = useState(false);

  const [OrderTotalOrders, setOrderTotalOrders] = useState(false);
  const [OrdersNumberOfPieces, setOrdersNumberOfPieces] = useState(false);
  const [totalSalesAmount, setTotalSalesAmount] = useState(false);
  const [averageOrderValueshow, setAverageOrderValueshow] = useState(false);
  const [subOrders2, setSubOrders2] = useState(false);
  const [averagePiecesPerOrder2, setAveragePiecesPerOrder2] = useState(false);
  const [newCount2, setNewCount2] = useState(false);
  const [repeatCount2, setRepeatCount2] = useState(false);
  const [activationCount2, setActivationCount2] = useState(false);

  /* ............................................................ */
  const [ShowMonth, setShowMonth] = useState(false);
  const [showyear, setShowyear] = useState("");
  /* ////////////////////////////////////////////////////////////////// */
  const [isYear, setisYear] = useState(false);

  /* WEEk and DAY Button States */
  const [WeekButtonColor, setWeekButtoncolor] = useState('#ccc');
  const [dayButtonColor, setDayButtoncolor] = useState('#fff');
  const [trafficWeekSaleDate, setTrafficWeekSaleDate] = useState(moment(new Date()).subtract(6, 'days').format('DD MMM YYYY'));

  const [yearButtonColor, setYearButtonColor] = useState('#fff');
  const [Week1ButtonColor, setWeek1ButtonColor] = useState('#ccc');
  const [day1ButtonColor, setDay1ButtonColor] = useState('#fff');
  const [heart, setHeart] = useState(false);
  const [heart1, setHeart1] = useState(false);
  const [heart2, setHeart2] = useState(false);
  const [heart3, setHeart3] = useState(false);

  const [hearts1, setHearts1] = useState(false);

  /* Dates For Api Request/.................. */
  const [TotalSalesDate, setTotalSalesDate] = useState(moment(new Date()).subtract(7, 'days').format('DD MMM YYYY'));
  const [TotalToDate, setTotalToDate] = useState(currentdate.cdate);
  const [fromDategetnumbr, setFromDategetnumbr] = useState(moment(new Date()).subtract(7, 'days').format('DD MMM YYYY'));
  const [NumberOdpcsToDate, setNumberOfpecsToDate] = useState(currentdate.cdate);
  const [fromDateSubOrder, setFromDateSubOrder] = useState(moment(new Date()).subtract(7, 'days').format('DD MMM YYYY'));
  const [SubOrderToDate, setSubOrderToDate] = useState(currentdate.cdate);
  const [fromDateOrderType, setFromDateOrderType] = useState(moment(new Date()).subtract(7, 'days').format('DD MMM YYYY'));
  const [OrderTypeToDate, setOrderTypeToDate] = useState(currentdate.cdate);

  const [activityShow, setActivityShow] = useState(true);
  const [salesData, setSalesData] = useState();

  const [TotalSDate, setTotalSDate] = useState(new Date());
  const [TotalSalesFromDate, setTotalSalesFromDate] = useState(currentdate.cdate);

  const [numberofPeices1, setnumberofPeices1] = useState('');
  const [numberofPeaces1Days, setNumberofPeaces1Days] = useState('');
  const [averageNumberOfPcsGraf2, setAverageNumberOfPcsGraf2] = useState('');
  const [errorShow, setErrorShow] = useState(false);
  const [desktopCount, setDesktopCount] = useState(0);
  const [mobileCount, setMobileCount] = useState(0);
  const [appCount, setAppCount] = useState(0);
  const [refreshLoader, setRefreshLoader] = useState(false);
  const [selectDevicemodal, setSelectDevicemodal] = useState(false);
  const [deviceType, setDeviceType] = useState('All');


  const DevicesData = [
    { deviceType: "All", id: 0 },
    { deviceType: "Desktop", id: 1 },
    { deviceType: "Mobile", id: 2 },
    /*  { deviceType: "App", id: 3 },
     { deviceType: "PhonePe", id: 4 }, */
  ]
  /* /......................................................................... */
  useEffect(() => { if (heart) { GetTotalSalesData(); GetUsersDetails(); setHeart(false); } }, [heart]);
  useEffect(() => { if (heart1) { GetNumberOfPieces1(); setHeart1(false); } }, [heart1]);
  useEffect(() => { if (heart2) { GetSoldItems2(); setHeart2(false); } }, [heart2]);
  useEffect(() => { if (heart3) { GetCustomerOrderType2(); setHeart3(false); } }, [heart3]);
  useEffect(() => { if (hearts1) { MonthButtonStateFC(); setHearts1(false); } }, [hearts1]);

  useEffect(() => {
    GetNewRegistrations();
    if (heart1) {
      GetTotalSalesData();
    }
  }, [heart1]);

  /* ///Get Order Type//// */
  const Week1ButtonSate4 = () => {
    setFromDateOrderType(moment(new Date()).subtract(7, 'days').format('DD MMM YYYY'));
    setOrderTypeToDate(currentdate.cdate);
    setTotalSalesDate(moment(new Date()).subtract(7, 'days').format('DD MMM YYYY'));
    setShowyear("");
    setisYear(false);
    setWeek1ButtonColor('#ccc');
    setYearButtonColor('#fff');
    setDay1ButtonColor('#fff');
    setHeart3(true);
  }
  const MonthButtonStateFC4 = async () => {
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    let FirstDay = moment(firstDay).format('DD MMM YYYY')
    setOrderTypeToDate(currentdate.cdate);
    setFromDateOrderType(FirstDay);
    setTotalSalesDate(FirstDay);
    setisYear(false);
    setShowyear("Month");
    console.log('Month Date==>', FirstDay);
    setWeek1ButtonColor('#fff');
    setYearButtonColor('#fff');
    setDay1ButtonColor('#ccc');
    setHeart3(true);
  }
  const Year1ButtonSate4 = () => {
    var timestmp = new Date().setFullYear(new Date().getFullYear(), 0, 1);
    var day = new Date(timestmp);
    console.log(moment(day).format('DD MMM YYYY'));
    /* Last Day Of Current Year */
    let Lastday = new Date(new Date().getFullYear(), 11, 31);
    console.log('lastday of Current Year : ', moment(Lastday).format('DD MMM YYYY'));
    setOrderTypeToDate(moment(Lastday).format('DD MMM YYYY'));
    setFromDateOrderType(moment(day).format('DD MMM YYYY'));
    setTotalSalesDate(moment(day).format('DD MMM YYYY'));
    setShowyear("Year");
    setisYear(true);
    setWeek1ButtonColor('#fff');
    setYearButtonColor('#ccc');
    setDay1ButtonColor('#fff');
    setHeart3(true);
  }
  /* get Sub Orders ....................................................... */

  const Week1ButtonSate3 = () => {
    setFromDateSubOrder(moment(new Date()).subtract(7, 'days').format('DD MMM YYYY'));
    setSubOrderToDate(currentdate.cdate);
    setisYear(false);
    setShowyear("");
    setWeek1ButtonColor('#ccc');
    setYearButtonColor('#fff');
    setDay1ButtonColor('#fff');
    setHeart2(true);
  }
  const MonthButtonStateFC3 = async () => {
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    let FirstDay = moment(firstDay).format('DD MMM YYYY');
    setSubOrderToDate(currentdate.cdate);
    setFromDateSubOrder(FirstDay);
    setisYear(false);
    setShowyear("Month");
    console.log('Month Date==>', FirstDay);
    setWeek1ButtonColor('#fff');
    setYearButtonColor('#fff');
    setDay1ButtonColor('#ccc');
    setHeart2(true);
  }
  const Year1ButtonSate3 = () => {
    var timestmp = new Date().setFullYear(new Date().getFullYear(), 0, 1);
    var day = new Date(timestmp);
    console.log(moment(day).format('DD MMM YYYY'));
    /* Last Day Of Current Year */
    let Lastday = new Date(new Date().getFullYear(), 11, 31);
    console.log('lastday of Current Year : ', moment(Lastday).format('DD MMM YYYY'));
    setSubOrderToDate(moment(Lastday).format('DD MMM YYYY'));
    setFromDateSubOrder(moment(day).format('DD MMM YYYY'));
    setisYear(true);
    setShowyear("Year");
    setWeek1ButtonColor('#fff');
    setYearButtonColor('#ccc');
    setDay1ButtonColor('#fff');
    setHeart2(true);
  }
  /* ..Sales Data....... */
  const Week1ButtonSate = () => {
    setTotalSalesDate(moment(new Date()).subtract(7, 'days').format('DD MMM YYYY'));
    setTotalToDate(currentdate.cdate);
    setisYear(false);
    setShowMonth(false);
    setShowyear("");
    setWeek1ButtonColor('#ccc');
    setYearButtonColor('#fff');
    setDay1ButtonColor('#fff');
    setHeart(true);
  }
  const MonthButtonStateFC = async () => {
    let dateee = new Date
    var firstDay = new Date(dateee.getFullYear(), dateee.getMonth(), 1);
    var day = new Date(firstDay);
    let FirstDay = moment(day).format('DD MMM YYYY');
    setTotalToDate(TotalSalesFromDate);
    setTotalSalesDate(FirstDay);
    setisYear(false);
    setShowyear("Month");
    console.log('Month Date==>', FirstDay);
    setWeek1ButtonColor('#fff');
    setYearButtonColor('#fff');
    setDay1ButtonColor('#ccc');
    setHeart(true);
  }
  const Year1ButtonSate = () => {
    setShowyear("Year");
    var timestmp = TotalSDate.setFullYear(TotalSDate.getFullYear(), 0, 1);
    var day = new Date(timestmp);
    console.log(moment(day).format('DD MMM YYYY'));
    /* Last Day Of Current Year */
    let Lastday = new Date(TotalSDate.getFullYear(), 11, 31);
    console.log('lastday of Current Year : ', moment(Lastday).format('DD MMM YYYY'));
    setTotalToDate(moment(Lastday).format('DD MMM YYYY'));
    setTotalSalesDate(moment(day).format('DD MMM YYYY'));
    setisYear(true);
    setShowMonth(false);
    setWeek1ButtonColor('#fff');
    setYearButtonColor('#ccc');
    setDay1ButtonColor('#fff');
    setHeart(true);
  }
  /* getNumber Peices ....................................................... */

  const Week1ButtonSate2 = () => {
    setFromDategetnumbr(moment(new Date()).subtract(7, 'days').format('DD MMM YYYY'));
    setNumberOfpecsToDate(currentdate.cdate);
    setTotalSalesDate(moment(new Date()).subtract(7, 'days').format('DD MMM YYYY'));
    setShowyear("");

    setisYear(false);
    setWeek1ButtonColor('#ccc');
    setYearButtonColor('#fff');
    setDay1ButtonColor('#fff');
    setHeart1(true);
  }
  const MonthButtonStateFC2 = async () => {
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    let FirstDay = moment(firstDay).format('DD MMM YYYY')
    setNumberOfpecsToDate(currentdate.cdate);
    setFromDategetnumbr(FirstDay);
    setTotalSalesDate(FirstDay);
    setShowyear("Month");
    setisYear(false);
    console.log('Month Date==>', FirstDay);
    setWeek1ButtonColor('#fff');
    setYearButtonColor('#fff');
    setDay1ButtonColor('#ccc');
    setHeart1(true);
  }
  const Year1ButtonSate2 = () => {
    var timestmp = new Date().setFullYear(new Date().getFullYear(), 0, 1);
    var day = new Date(timestmp);
    console.log(moment(day).format('DD MMM YYYY'));
    /* Last Day Of Current Year */
    let Lastday = new Date(new Date().getFullYear(), 11, 31);
    console.log('lastday of Current Year : ', moment(Lastday).format('DD MMM YYYY'));
    setNumberOfpecsToDate(moment(Lastday).format('DD MMM YYYY'));
    setFromDategetnumbr(moment(day).format('DD MMM YYYY'));
    setTotalSalesDate(moment(day).format('DD MMM YYYY'));
    setShowyear("Year");

    setisYear(true);
    setWeek1ButtonColor('#fff');
    setYearButtonColor('#ccc');
    setDay1ButtonColor('#fff');
    setHeart1(true);
  }

  /* .............................................................................. */
  const ButtonSate = () => {
    setTrafficWeekSaleDate(currentdate.cdate)
    setWeekButtoncolor('#fff');
    setDayButtoncolor('#ccc');
    // setHeart(true);
    setTimeout(() => {
      GetUsersDetails()
    }, 2000);
  }
  const WeekButtonSate = () => {
    setTrafficWeekSaleDate(moment(new Date()).subtract(7, 'days').format('DD MMM YYYY'));
    setWeekButtoncolor('#ccc');
    setDayButtoncolor('#fff');
    setHeart(true);
  }

  var Highcharts = 'Highcharts';

  const options = {
    global: {
      useUTC: false
    },
    lang: {
      decimalPoint: '.',
      thousandsSep: ','
    }
  };

  var conf = {
    chart: {
      type: 'areaspline',
      animation: Highcharts.svg, // don't animate in old IE
      margin: 5,
      backgroundColor: '#1BB394',
    },
    title: {
      text: '',
    },
    xAxis: {
      categories: salesDays,
    },
    yAxis: {
      categories: '',
      title: {
        text: ''
      },
      plotLines: [{
        value: 0,
        width: 0,
        color: '#000'
      }]
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      areaspline: {
        fillOpacity: 0.5
      }
    },
    legend: {
      enabled: false
    },
    exporting: {
      enabled: false
    },
    series: [{
      name: '',// salesDate,
      data: salesGrafCount,//salesGrafCount
      color: '#fff',

    }]
  };

  // config1..............................................................
  var conf1 = {
    chart: {
      type: 'column',
      animation: Highcharts.svg, // don't animate in old IE
      margin: 5,
      backgroundColor: '#347ab7',
    },
    title: {
      text: '',
    },
    xAxis: {
      categories: numberofPeacesDays,
    },
    yAxis: {
      title: {
        text: ''
      },
      plotLines: [{
        value: 0,
        width: 0,
        color: '#000'
      }]
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      areaspline: {
        fillOpacity: 0.5
      }
    },
    legend: {
      enabled: false
    },
    exporting: {
      enabled: false
    },
    series: [{
      name: '',
      data: totalnumberofPreacesArray, // totalnumberofPreacesArray
      color: '#9cbedc',

    }]
  };

  // config2..............................................................
  var conf2 = {
    chart: {
      type: 'areaspline',
      animation: Highcharts.svg, // don't animate in old IE
      margin: 5,
      backgroundColor: '#f8cb00',
    },
    title: {
      text: '',
    },
    xAxis: {
      categories: salesDays,
    },
    yAxis: {
      title: {
        text: ''
      },
      plotLines: [{
        value: 0,
        width: 0,
        color: '#000'
      }]
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      areaspline: {
        fillOpacity: 0.5
      }
    },
    legend: {
      enabled: false
    },
    exporting: {
      enabled: false
    },
    series: [{
      name: '',
      data: salesChartArray, // salesChartArray
      color: '#fff',

    }]
  };
  var confV2 = {
    chart: {
      type: 'areaspline',
      animation: Highcharts.svg, // don't animate in old IE
      margin: 5,
      backgroundColor: '#ed5666',
    },
    title: {
      text: '',
    },
    xAxis: {
      categories: salesDays,
    },
    yAxis: {
      title: {
        text: ''
      },
      plotLines: [{
        value: 0,
        width: 0,
        color: '#000'
      }]
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      areaspline: {
        fillOpacity: 0.5
      }
    },
    legend: {
      enabled: false
    },
    exporting: {
      enabled: false
    },
    series: [{
      name: '',
      data: salesChartArray, // salesChartArray
      color: '#fff',

    }]
  };
  // config3..............................................................
  var conf3 = {
    chart: {
      type: 'areaspline',
      animation: Highcharts.svg, // don't animate in old IE
      margin: 5,
      backgroundColor: '#ed5666',
    },
    title: {
      text: '',
    },
    xAxis: {
      categories: salesDays,
    },
    yAxis: {
      title: {
        text: ''
      },
      plotLines: [{
        value: 0,
        width: 0,
        color: '#000'
      }]
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      areaspline: {
        fillOpacity: 0.5
      }
    },
    legend: {
      enabled: false
    },
    exporting: {
      enabled: false
    },
    series: [{
      name: '',
      data: averageOrderValueArray, // averageOrderValueArray
      color: '#fff',

    }]
  };
  // config4..............................................................
  var conf4 = {
    chart: {
      type: 'column',
      animation: Highcharts.svg, // don't animate in old IE
      margin: 5,
      backgroundColor: '#f8cb00',
    },
    title: {
      text: '',
    },
    xAxis: {
      categories: subOrdersDays,
    },
    yAxis: {
      title: {
        text: ''
      },
      plotLines: [{
        value: 0,
        width: 0,
        color: '#000'
      }]
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      areaspline: {
        fillOpacity: 0.5
      }
    },
    legend: {
      enabled: false
    },
    exporting: {
      enabled: false
    },
    series: [{
      name: '',
      data: subOrderGraf, // subOrderGraf
      color: '#fff',

    }]
  };
  // config5..............................................................
  var conf5 = {
    chart: {
      type: 'line',
      animation: Highcharts.svg, // don't animate in old IE
      margin: 5,
      backgroundColor: '#ed5666',
    },
    title: {
      text: '',
    },
    xAxis: {
      categories: numberofPeacesDays,
    },
    yAxis: {
      title: {
        text: ''
      },
      plotLines: [{
        value: 0,
        width: 0,
        color: '#000'
      }]
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      areaspline: {
        fillOpacity: 0.5
      }
    },
    legend: {
      enabled: false
    },
    exporting: {
      enabled: false
    },
    series: [{
      name: '',
      data: averagePiecesPerOrdergraf, // averagePiecesPerOrdergraf
      color: '#fff',

    }]
  };

  // config6..............................................................
  var conf6 = {
    chart: {
      type: 'line',
      animation: Highcharts.svg, // don't animate in old IE
      margin: 5,
      backgroundColor: '#347ab7',
    },
    title: {
      text: '',
    },
    xAxis: {
      categories: newCustomerDays,
    },
    yAxis: {
      title: {
        text: ''
      },
      plotLines: [{
        value: 0,
        width: 0,
        color: '#000'
      }]
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      areaspline: {
        fillOpacity: 0.5
      }
    },
    legend: {
      enabled: false
    },
    exporting: {
      enabled: false
    },
    series: [{
      name: '',
      data: newCountGraf, // newCountGraf
      color: '#fff',

    }]
  };
  // config7..............................................................
  var conf7 = {
    chart: {
      type: 'line',
      animation: Highcharts.svg, // don't animate in old IE
      margin: 5,
      backgroundColor: '#f8cb00',
    },
    title: {
      text: '',
    },
    xAxis: {
      categories: repeatCustomerDays,
    },
    yAxis: {
      title: {
        text: ''
      },
      plotLines: [{
        value: 0,
        width: 0,
        color: '#000'
      }]
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      areaspline: {
        fillOpacity: 0.5
      }
    },
    legend: {
      enabled: false
    },
    exporting: {
      enabled: false
    },
    series: [{
      name: '',
      data: repeatCountsGraf, // newCountGraf
      color: '#fff',

    }]
  };
  // config8..............................................................
  var conf8 = {
    chart: {
      type: 'line',
      animation: Highcharts.svg, // don't animate in old IE repeatCountsGraf
      margin: 5,
      backgroundColor: '#1BB394',
    },
    title: {
      text: '',
    },
    xAxis: {
      categories: activationDays,
    },
    yAxis: {
      title: {
        text: ''
      },
      plotLines: [{
        value: 0,
        width: 0,
        color: '#000'
      }]
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      areaspline: {
        fillOpacity: 0.5
      }
    },
    legend: {
      enabled: false
    },
    exporting: {
      enabled: false
    },
    series: [{
      name: '',
      data: activationCountsGraf, // activationCountsGraf
      color: '#fff',

    }]
  };
  // config9..............................................................
  var conf9 = {
    chart: {
      type: 'line',
      animation: Highcharts.svg, // don't animate in old IE
      margin: 5,
      backgroundColor: '#f8cb00',
    },
    title: {
      text: '',
    },
    xAxis: {
      categories: repeatCustomerDays,
    },
    yAxis: {
      title: {
        text: ''
      },
      plotLines: [{
        value: 0,
        width: 0,
        color: '#000'
      }]
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      areaspline: {
        fillOpacity: 0.5
      }
    },
    legend: {
      enabled: false
    },
    exporting: {
      enabled: false
    },
    series: [{
      name: '',
      data: repeatCustomerCount, // activationCountsGraf
      color: '#fff',

    }]
  };

  // config10..............................................................
  var conf10 = {
    chart: {
      type: 'line',
      animation: Highcharts.svg, // don't animate in old IE
      margin: 5,
      backgroundColor: '#1BB394',
    },
    title: {
      text: '',
    },
    xAxis: {
      type: '',
      tickPixelInterval: 5
    },
    yAxis: {
      title: {
        text: ''
      },
      plotLines: [{
        value: 0,
        width: 0,
        color: '#000'
      }]
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      areaspline: {
        fillOpacity: 0.5
      }
    },
    legend: {
      enabled: false
    },
    exporting: {
      enabled: false
    },
    series: [{
      name: '',
      data: ActivationCustomerCounts, // activationCountsGraf
      color: '#fff',

    }]
  };

  // config11..............................................................
  var conf11 = {
    chart: {
      type: 'areaspline',
      marginLeft: 50,
      marginBottom: 70,
    },
    title: {
      text: ''
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      areaspline: {
        fillOpacity: 0,
        backgroundColor: 'rgba(230, 214, 120, 0.74)'
      }
    },
    xAxis: {
      categories: lastWeekDays,
    },
    yAxis: {
      title: {
        text: ''
      }
    },
    legend: {
      enabled: false
    },
    exporting: {
      enabled: false
    },
    series: [{
      name: 'INR',
      data: salesGrafCountWeekData,
      color: '#21a31a'
    },]

  };
  var conf11a = {
    chart: {
      type: 'areaspline',
      marginLeft: 50,
      marginBottom: 70,
    },
    title: {
      text: ''
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      areaspline: {
        fillOpacity: 0.5,
        backgroundColor: 'rgba(230, 214, 120, 0.74)'
      }
    },
    xAxis: {
      categories: lastWeekDays,
    },
    yAxis: {
      title: {
        text: ''
      }
    },
    legend: {
      enabled: false
    },
    exporting: {
      enabled: false
    },
    series: [{
      name: '',
      data: subOrderGraf2,
      color: '#DA584E'
    },]

  };
  // config12..............................................................
  var conf12 = {
    chart: {
      type: 'areaspline',
      marginLeft: 50,
      marginBottom: 70,
    },
    title: {
      text: ''
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      areaspline: {
        fillOpacity: 0.4,
        backgroundColor: '#ffb',
        lineWidth: 0.5
      }
    },
    xAxis: {
      categories: ProductsSoldDays,
    },
    yAxis: {
      title: {
        text: ''
      }
    },
    legend: {
      enabled: false
    },
    exporting: {
      enabled: false
    },
    series: [{
      name: '',
      data: produstsSoldArrayoriginal,
      color: '#ae55c9',


      //  color: '#rgba(230, 214, 120, 0.74)'
    },]

  };

  // config13..............................................................
  var conf13 = {
    chart: {
      type: 'pie',
      margin: 5,
    },
    title: {
      text: ''
    },
    subtitle: {
      text: ordersByStatusName
    },
    credits: {
      enabled: false
    },
    exporting: {
      enabled: false
    },
    legend: {
      enabled: false
    },
    plotOptions: {
      pie: {
        shadow: false,
        center: ['50%', '50%']
      }
    },
    tooltip: {
      valueSuffix: ''
    },
    series: [{
      name: ordersByStatusName,
      size: '',
      dataLabels: {
        formatter: function () {
          return this.y > 5 ? this.point.name : null;
        },
        distance: -10,


      }
    }, {
      name: ordersByStatusName,
      data: ordersByStatus,


      size: '100%',
      innerSize: '50%',
      dataLabels: {
        formatter: function () {
          return this.y > 1 ? '<b>' + this.point.name + ':</b> ' +
            this.y + '' : null;
        }
      },
    }],
  };
  // config14..............................................................

  var conf14 = {

    chart: {
      type: 'pie',
      margin: 5,
    },
    title: {
      text: ''
    },
    subtitle: {
      text: ordersByStatusName
    },
    credits: {
      enabled: false
    },
    exporting: {
      enabled: false
    },
    legend: {
      enabled: false
    },
    plotOptions: {
      pie: {
        shadow: false,
        center: ['50%', '50%']
      }
    },
    tooltip: {
      valueSuffix: '%'
    },
    series: [{
      name: ordersByStatusName,
      size: '',
      dataLabels: {
        formatter: function () {
          return this.y > 5 ? this.point.name : null;
        },
        distance: -10,


      }
    }, {
      name: ordersByStatusName,
      data: orderByCourier,


      size: '100%',
      innerSize: '0%',
      dataLabels: {
        formatter: function () {
          return this.y > 1 ? '<b>' + this.point.name + ':</b> ' +
            this.y + '%' : null;
        }
      },
    }],

  };

  // config15..............................................................
  var conf15 = {
    chart: {
      type: 'pie',
      margin: 20,
    },
    title: {
      text: ''
    },
    subtitle: {
      text: prepaidTypeName
    },
    credits: {
      enabled: false
    },
    exporting: {
      enabled: false
    },
    legend: {
      enabled: false
    },
    plotOptions: {
      pie: {
        shadow: false,
        center: ['50%', '50%']
      }
    },
    tooltip: {
      valueSuffix: '%'
    },
    series: [{

      size: '',
      dataLabels: {
        formatter: function () {
          return this.y > 5 ? this.point.name : null;
        },
        distance: -10,
      }
    }, {
      data: paymentPrepaidValue,
      name: '',

      size: '100%',
      innerSize: '0%',
      dataLabels: {
        formatter: function () {
          return this.y > 1 ? '<b>' + this.point.name + ':</b> ' +
            this.y + '%' : null;
        }
      },
    }],
  };
  // config15v2..............................................................
  var conf15V2 = {
    chart: {
      type: 'pie',
      marginVertical: 70,
      marginBottom: 70,
    },
    title: {
      text: ''
    },
    subtitle: {
      text: paymentPrepaidName
    },
    credits: {
      enabled: false
    },
    exporting: {
      enabled: false
    },
    legend: {
      enabled: false
    },
    plotOptions: {
      pie: {
        shadow: false,
        center: ['50%', '50%']
      }
    },
    tooltip: {
      valueSuffix: ''
    },
    series: [{

      size: '',
      dataLabels: {
        formatter: function () {
          return this.y > 5 ? this.point.name : null;
        },
        distance: -5,
      }
    }, {
      data: paymentNetBanking,
      size: '100%',
      innerSize: '0%',
      dataLabels: {
        formatter: function () {
          return this.y > 1 ? '<b>' + this.point.name + ':</b> ' +
            this.y + '' : null;
        }
      },
    }],
  };
  /* Orders-TotalOrders */ //paymentNetBanking,paymentPrepaidName
  var conf16 = {
    chart: {
      type: 'areaspline',
      animation: Highcharts.svg, // don't animate in old IE
      marginLeft: 50,
      marginBottom: 70,
      backgroundColor: '#fff',
    },
    title: {
      text: '',
    },
    xAxis: {
      categories: salesCountForC2Days,
    },
    yAxis: {
      // categories: '',
      title: {
        text: ''
      },
      plotLines: [{
        value: 0,
        width: 0,
        color: '#000'
      }]
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      areaspline: {
        fillOpacity: 0.5
      }
    },
    legend: {
      enabled: false
    },
    exporting: {
      enabled: false
    },
    series: [{
      name: '',// salesDate,
      data: salesCountForC2,//salesGrafCount
      color: '#347ab7',

    }]
  };
  /* Orders-numberofPeices */
  var conf17 = {
    chart: {
      type: 'areaspline',
      animation: Highcharts.svg, // don't animate in old IE
      marginLeft: 50,
      marginBottom: 70,
      backgroundColor: '#fff',
    },
    title: {
      text: '',
    },
    xAxis: {
      categories: numberofPeaces1Days,
    },
    yAxis: {
      // categories: '',
      title: {
        text: ''
      },
      plotLines: [{
        value: 0,
        width: 0,
        color: '#000'
      }]
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      areaspline: {
        fillOpacity: 0.5
      }
    },
    legend: {
      enabled: false
    },
    exporting: {
      enabled: false
    },
    series: [{
      name: '',// salesDate,
      data: numberofPeices1,//salesGrafCount
      color: '#347ab7',

    }]
  };
  /* total sales Amount */
  var conf18 = {
    chart: {
      type: 'areaspline',
      animation: Highcharts.svg, // don't animate in old IE
      marginLeft: 50,
      marginBottom: 70,
      backgroundColor: '#fff',
    },
    title: {
      text: '',
    },
    xAxis: {
      categories: salesDays2,
    },
    yAxis: {
      // categories: '',
      title: {
        text: ''
      },
      plotLines: [{
        value: 0,
        width: 0,
        color: '#000'
      }]
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      areaspline: {
        fillOpacity: 0.5
      }
    },
    legend: {
      enabled: false
    },
    exporting: {
      enabled: false
    },
    series: [{
      name: '',// salesDate,
      data: salesAmountChart2,//salesGrafCount
      color: '#347ab7',

    }]
  };
  /* Average Order Value */
  var conf19 = {
    chart: {
      type: 'areaspline',
      animation: Highcharts.svg, // don't animate in old IE
      marginLeft: 50,
      marginBottom: 70,
      backgroundColor: '#fff',
    },
    title: {
      text: '',
    },
    xAxis: {
      categories: salesCountForC2Days,
    },
    yAxis: {
      // categories: '',
      title: {
        text: ''
      },
      plotLines: [{
        value: 0,
        width: 0,
        color: '#000'
      }]
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      areaspline: {
        fillOpacity: 0.5
      }
    },
    legend: {
      enabled: false
    },
    exporting: {
      enabled: false
    },
    series: [{
      name: '',// salesDate,
      data: averageOrderValueArray1,//salesGrafCount
      color: '#347ab7',

    }]
  };
  /* Average peices Per Oreder 2 */
  var conf20 = {
    chart: {
      type: 'areaspline',
      animation: Highcharts.svg, // don't animate in old IE
      marginLeft: 50,
      marginBottom: 70,
      backgroundColor: '#fff',
    },
    title: {
      text: '',
    },
    xAxis: {
      categories: numberofPeaces1Days,
    },
    yAxis: {
      // categories: '',
      title: {
        text: ''
      },
      plotLines: [{
        value: 0,
        width: 0,
        color: '#000'
      }]
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      areaspline: {
        fillOpacity: 0.5
      }
    },
    legend: {
      enabled: false
    },
    exporting: {
      enabled: false
    },
    series: [{
      name: '',// salesDate,
      data: averageNumberOfPcsGraf2,//salesGrafCount
      color: '#347ab7',

    }]
  };
  /* Sub Orders 2 */
  var conf21 = {
    chart: {
      type: 'areaspline',
      animation: Highcharts.svg, // don't animate in old IE
      marginLeft: 50,
      marginBottom: 70,
      backgroundColor: '#fff',
    },
    title: {
      text: '',
    },
    xAxis: {
      categories: orderSubOrderDays,
    },
    yAxis: {
      // categories: '',
      title: {
        text: ''
      },
      plotLines: [{
        value: 0,
        width: 0,
        color: '#000'
      }]
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      areaspline: {
        fillOpacity: 0.5
      }
    },
    legend: {
      enabled: false
    },
    exporting: {
      enabled: false
    },
    series: [{
      name: '',// salesDate,
      data: subOrderGraf2,//salesGrafCount
      color: '#347ab7',

    }]
  };
  /* New Count 2 */
  var conf22 = {
    chart: {
      type: 'areaspline',
      animation: Highcharts.svg, // don't animate in old IE
      marginLeft: 50,
      marginBottom: 70,
      backgroundColor: '#fff',
    },
    title: {
      text: '',
    },
    xAxis: {
      categories: newCountDay2,
    },
    yAxis: {
      // categories: '',
      title: {
        text: ''
      },
      plotLines: [{
        value: 0,
        width: 0,
        color: '#000'
      }]
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      areaspline: {
        fillOpacity: 0.5
      }
    },
    legend: {
      enabled: false
    },
    exporting: {
      enabled: false
    },
    series: [{
      name: '',// salesDate,
      data: newCountArray2,//salesGrafCount
      color: '#347ab7',

    }]
  };
  /* Repeat Count 2 */
  var conf23 = {
    chart: {
      type: 'areaspline',
      animation: Highcharts.svg, // don't animate in old IE
      marginLeft: 50,
      marginBottom: 70,
      backgroundColor: '#fff',
    },
    title: {
      text: '',
    },
    xAxis: {
      categories: repeatCountDays,
    },
    yAxis: {
      // categories: '',
      title: {
        text: ''
      },
      plotLines: [{
        value: 0,
        width: 0,
        color: '#000'
      }]
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      areaspline: {
        fillOpacity: 0.5
      }
    },
    legend: {
      enabled: false
    },
    exporting: {
      enabled: false
    },
    series: [{
      name: '',// salesDate,
      data: repeatCountArray2,//salesGrafCount
      color: '#347ab7',

    }]
  };
  /* Activation Count 2 */
  var conf24 = {
    chart: {
      type: 'areaspline',
      animation: Highcharts.svg, // don't animate in old IE
      marginLeft: 50,
      marginBottom: 70,
      backgroundColor: '#fff',
    },
    title: {
      text: '',
    },
    xAxis: {
      categories: customerTypeCountDays,
    },
    yAxis: {
      // categories: '',
      title: {
        text: ''
      },
      plotLines: [{
        value: 0,
        width: 0,
        color: '#000'
      }]
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      areaspline: {
        fillOpacity: 0.5
      }
    },
    legend: {
      enabled: false
    },
    exporting: {
      enabled: false
    },
    series: [{
      name: '',// salesDate,
      data: activationCustomerCount2 || [0] || [0],//salesGrafCount
      color: '#347ab7',

    }]
  };

  const onChange = (date) => {
    setOpen(false);
    let DateSelect = moment(date).format('DD MMM YYYY');
    setSelectDate(DateSelect);
    setDate(new Date(DateSelect));
    console.log(DateSelect);
  };
  const onFromDate = (datefrom) => {
    setopenfrom(false);
    let DateFromSelect = moment(datefrom).format('DD MMM YYYY');
    setFromDate(DateFromSelect);
    setDatefrom(new Date(DateFromSelect));
    console.log(DateFromSelect);
  };
  /* /......................................................................... */
  const onBmodalDate = () => {
    setopenBForm(false);
    setChartDateOpen(false)
    // let DateFromSelect = moment(ChartDateshow).format('DD MMM YYYY');
    let FirstDay = new Date(ChartDateshow._d.getFullYear(), ChartDateshow._d.getMonth(), 1);
    let LastDay = new Date(ChartDateshow._d.getFullYear(), ChartDateshow._d.getMonth() + 1, 0);
    let LastDayFromDate = moment(LastDay).format('DD MMM YYYY');
    setTotalSalesFromDate(LastDayFromDate);
    console.log('TotalSales-->', FirstDay);
    setTotalSDate(FirstDay);
    setHearts1(true);
  };
  /* ................... */
  const BmodalYearDate = () => {
    setopenBForm(false);
    setChartYearDateOpen(false)
    // let DateFromSelect = moment(ChartDateshow).format('DD MMM YYYY');

    var theFirst = ChartYearDateshow._d.setFullYear(ChartYearDateshow._d.getFullYear(), 0, 1);
    var theLast = ChartYearDateshow._d.setFullYear(ChartYearDateshow._d.getFullYear(), 11, 31);
    let FirstDay = moment(theFirst).format('DD MMM YYYY');
    let theLastDay = moment(theLast).format('DD MMM YYYY');
    setTotalSDate(theLastDay);
    setTotalSalesFromDate(FirstDay);
    console.log('TotalSales-->', FirstDay, theLastDay);
    setHearts1(true);
  };
  /* .......................... */
  useEffect(() => {
    const timer = setTimeout(() => {
      Yeardata();
      GetBrands();
      //GetCustomerOrderType();
      GetAllOrderStatus();
      GetAllOrderStatuss();
    }, 10000);
    return () => clearTimeout(timer)

  });

  const GetAllOrderStatuss = async () => {
    //let getSecuerityToken = await AsyncStorage.getItem('SecurityToken');
    //sToken = JSON.stringify(getSecuerityToken)
    const Request = {
      PartnerId: brandId,
      SecurityToken: "FHTeL8mSg0ITSg0M8gvV5QiM4SllNZATPDCYs2BG2F41pi27eRZLJSdhBpspmFJycsf7125oJVWXlnahR2KmlKG+7ZwLII9ZZE8EsXFLTQ5cOiVTuf7khZxHIvvIk8Bv0NkFokMz/Z5RrZs3KAX6OMAzROZ5mkcWHu7knzbse5o=",
    }
    api.postData('api/OrdersByOrderStatus/GetAllOrderStatus', Request)
      .then((response) => {
        if (response != undefined && response != null) {
          if (response.data.ReturnCode == 0) {
            setResponseMessage(response.data.ReturnMessage);
            if (response.data.Data != undefined && response.data.Data != null) {
              var options = response.data.Data
              setOrderStatusData(options);
              let OrderValueData = []
              options.forEach(x => {
                OrderValueData.push(x.Value);
              });
              setOrderStatusValue(OrderValueData)
            }
          }
          else {
            setResponseMessage('');
            setResponseMessage(response.data.ReturnMessage);
            /* setActivityShow(false); */
            setTimeout(() => {
              setResponseMessage('')
            }, 5000);
          }
        }
      });
  }


  const GetCustomerOrderType2 = async () => {
    let GetSiteId = await AsyncStorage.getItem('siteId');
    let siteId = route.params?.siteId
    const Request = {
      Date: fromDateOrderType,
      IsYear: isYear,
      PartnerId: GetSiteId == null ? JSON.parse(siteId) : JSON.parse(GetSiteId),
      StoreOrderStatus: ids.toString(),
      ToDate: OrderTypeToDate,

    }
    api.postData('api/CustomerOrderType/GetCustomerOrderType', Request).then((response) => {
      if (response != undefined && response != null) {
        if (response.data.ReturnCode == 0) {
          setResponseMessage(response.data.ReturnMessage);
          if (response.data.Data != undefined && response.data.Data != null) {

            var CustomerTypeData = response.data.Data
            /* ............................................................. */

            let cTypecountDays = [];
            CustomerTypeData.forEach(x => {
              cTypecountDays.push(x.Day);
            });
            setCustomerTypeCountDays(cTypecountDays)
            /* ............................................................. */

            let NEwCount = 0;
            let NEwCounts = 0;
            let NEwCountArray1 = [];
            let NEwCountsArray2 = 0;
            let NewCustomertyp = [];
            CustomerTypeData.forEach(x => {
              if (x.CustomerType == 'New') {
                NEwCount = (x.CustomerTypeCount);
                NEwCounts += NEwCount
                NEwCountArray1.push(x.CustomerTypeCount);
                NEwCountsArray2 = NEwCountArray1
                NewCustomertyp.push(x.Day);
              }
            });
            console.log('NEwCounts===>', NEwCountsArray2);
            setNewCountArray2(NEwCountsArray2);
            setNewCountDay2(NewCustomertyp);
            // console.log('NewCustomertypDays===>', NewCustomertyp);
            /* ................................................................................. */
            var RepeatCountArray1 = []
            var RepeatCountDays = [];
            CustomerTypeData.forEach(x => {
              if (x.CustomerType == 'Repeat') {
                RepeatCountArray1.push(x.CustomerTypeCount);
                RepeatCountDays.push(x.Day);
              }
            });
            setRepeatCountDays(RepeatCountDays);
            setRepeatCountArray2(RepeatCountArray1)
            console.log('RepeatCustomerCountsGraf====>', RepeatCountArray1);
            /* /....................................................................................... */
            var ActivationCustomerCountsArray2 = []
            var ActivationCustomerCountsDays = [];
            CustomerTypeData.forEach(x => {
              if (x.CustomerType == 'Activation') {
                ActivationCustomerCountsArray2.push(x.CustomerTypeCount);
                ActivationCustomerCountsDays.push(x.Day);
              }
            });

            setActivationCustomerCount2(ActivationCustomerCountsArray2)
            console.log('ActivationCustomerCountsGraf 2====>', ActivationCustomerCountsArray2);
            /* ..................................................................... */
          }
        }
        else {
          setResponseMessage('');
          setResponseMessage(response.data.ReturnMessage);
        }
      }
    });
  }




  const GetSoldItems2 = async () => {
    let GetSiteId = await AsyncStorage.getItem('siteId');
    let siteId = route.params?.siteId
    const Request = {
      Date: fromDateSubOrder,
      isYear: isYear,
      PartnerId: GetSiteId == null ? JSON.parse(siteId) : JSON.parse(GetSiteId),
      StoreOrderStatus: ids.toString(),
      ToDate: SubOrderToDate,
      "BrandId": brandId,
      "DeviceType": deviceType


    }
    api.postData('api/SoldItems/GetSoldItems', Request).then((response) => {
      if (response != undefined && response != null) {
        if (response.data.ReturnCode == 0) {
          setResponseMessage(response.data.ReturnMessage);
          if (response.data.Data != undefined && response.data.Data != null) {
            let SoldItems = response.data.Data
            let SubOrdersArray = []
            var SubOrderssss = 0;
            let NumberofDays = [];



            SoldItems.forEach(x => {
              SubOrdersArray.push(x.Items);
              SubOrderssss = SubOrdersArray;
              NumberofDays.push(x.Day);

            });
            setOrderSubOrderDays(NumberofDays);
            setSubOrderGraf2(SubOrderssss);
            console.log('Sub OrdersArray ---->', SubOrderssss);

          }
        }
        else {
          setResponseMessage('');
          setResponseMessage(response.data.ReturnMessage);
          // setLoader(false);
          setTimeout(() => {
            setResponseMessage('')
          }, 5000);
        }
      }
    });
  }

  const GetNumberOfPieces1 = async (SalesData) => {
    let GetSiteId = await AsyncStorage.getItem('siteId');
    let siteId = route.params?.siteId

    const Request = {
      Date: fromDategetnumbr,
      PartnerId: GetSiteId == null ? JSON.parse(siteId) : JSON.parse(GetSiteId),
      IsYear: isYear,
      StoreOrderStatus: ids.toString(),
      ToDate: NumberOdpcsToDate,
      "BrandId": brandId,
      "DeviceType": deviceType
    }
    api.postData('api/OrdersByOrderStatus/GetNumberOfPieces', Request).then((response) => {
      if (response != undefined && response != null) {
        if (response.data.ReturnCode == 0) {
          setResponseMessage(response.data.ReturnMessage);
          if (response.data.Data != undefined && response.data.Data != null) {
            let LatOrders = response.data.Data;

            let numbrofpcesArray1 = []
            let NumberofDays = [];

            LatOrders.forEach(x => {
              numbrofpcesArray1.push(x.NumberOfPieces);
              NumberofDays.push(x.Day);
            });
            setNumberofPeaces1Days(NumberofDays);
            setnumberofPeices1(numbrofpcesArray1);
            console.log('TotalNumberOfPiecesArray---->', numbrofpcesArray1);
            console.log('NumberofDays--->', NumberofDays);
            setSalesData(SalesData);
            /* ........................................................................... */
            let A = response.data.Data
            let B = SalesData
            var C = [];
            let AvgOrdersArrayss = []

            for (var i = 0; i < A.length; i++) {
              if (A[i].NumberOfPiecesOfTheDay == 0) {
                AvgOrdersArrayss.push(0)
              } else {
                C = ((A[i].NumberOfPiecesOfTheDay / B[i].SalesCount).toFixed(0));
                AvgOrdersArrayss.push(parseInt(C));
              }
            }
            setAverageNumberOfPcsGraf2(AvgOrdersArrayss);
            console.log('Average Pieces Per Order 2 : ----->', AvgOrdersArrayss)

          }
        }
        else {
          setResponseMessage('');
          setResponseMessage(response.data.ReturnMessage);
          // setLoader(false);
        }
      }
    });
  }



  const GetTotalSalesData = async () => {
    let GetSiteId = await AsyncStorage.getItem('siteId');
    let siteId = route.params?.siteId
    const Request = {
      Date: TotalSalesDate,
      IsYear: isYear,
      PartnerId: GetSiteId == null ? JSON.parse(siteId) : JSON.parse(GetSiteId),
      StoreOrderStatus: ids.toString(),
      ToDate: TotalToDate,
      BrandId: brandId,
      DeviceType: deviceType

    }
    api.postData('api/sales/GetSales', Request).then((response) => {
      if (response != undefined && response != null) {
        if (response.data.ReturnCode == 0) {
          setResponseMessage(response.data.ReturnMessage);
          if (response.data.Data != undefined && response.data.Data != null) {
            let Orders = response.data.Data.salesWithDate
            GetNumberOfPieces1(response.data.Data.salesWithDate);
            let SalesDate = []
            let SalesChart = []
            var SalesDateConst = [];
            let LatOrders = response.data.Data.salesWithDate;
            let sum = []
            let Graf = []
            let salessum = []
            var SalesGrafCount = 0;
            let Salesas = []
            let lastWeekDays = []
            var res = LatOrders.reduce((acc, obj) => {
              var existObj = acc.find(item => item.Day === obj.Day);
              if (existObj) {
                existObj.realValue = (existObj.SalesCount + obj.SalesCount);
                existObj.optimalValue = (existObj.Sales + obj.Sales);
                return acc;
              }
              acc.push(obj);

              return acc;
            }, []);

            res.forEach(x => {
              Graf.push(x.realValue === undefined ? x.SalesCount : x.realValue);
              SalesGrafCount = Graf;
              SalesDateConst.push(x.Day);

            });
            setSalesCountForC2(SalesGrafCount);
            setSalesCountForC2Days(SalesDateConst);

            /*  Orders.forEach((x,index) => {
               Salesas.push(x.SalesCount);
               if(x.Day == x[1].Day){
                 SalesDate.push(x.Day);
               }else{
                 SalesDate.push(x.Day);
               }
               
               SalesChart = Salesas;
               SalesDateConst = SalesDate;
             }); */

            console.log('SalesChart-->', SalesChart);
            // setSalesCountForC2(SalesChart);

            let SalesDatessss = []
            let Salesss = []
            Orders.forEach(x => {
              Salesss.push(x.Sales);
              SalesDatessss.push(x.Day);

            });
            setSalesAmountChart2(Salesss);
            setSalesDays2(SalesDatessss);

            let AvgOrderArray = 0;
            let AVGSales = 0;
            let AvgslCont = 0;
            let AvgOrdersArray = []

            Orders.forEach(x => {

              AVGSales = x.Sales;
              AvgslCont = x.SalesCount;
              if (AVGSales == 0) {
                AvgOrdersArray.push(0)
              } else {
                AvgOrderArray = (AVGSales / AvgslCont).toFixed()
                AvgOrdersArray.push(parseInt(AvgOrderArray))
              }
            });
            setAverageOrderValueArray1(AvgOrdersArray);



          }
        }
        else {
          setResponseMessage('');
          setResponseMessage(response.data.ReturnMessage);

        }
      }
    });
  }

  /* .................................................................................... */
  const GetOrdersByPaymentType = async () => {
    let GetSiteId = await AsyncStorage.getItem('siteId');
    let siteId = route.params?.siteId
    const Request = {
      Date: selectDate,
      PartnerId: GetSiteId == null ? JSON.parse(siteId) : JSON.parse(GetSiteId),
    }
    api.postData('api/OrdersByPaymentType/GetOrdersByPaymentType', Request).then((response) => {
      if (response != undefined && response != null) {
        if (response.data.ReturnCode == 0) {
          setResponseMessage(response.data.ReturnMessage);
          if (response.data.Data != undefined && response.data.Data != null) {

            let NetBankingArray = []
            response.data.Data.PrepaidPayment.forEach(element => {
              NetBankingArray.push(element.Name)
            });
            setPaymentTypeName(NetBankingArray);
            let PrepaidTypeArray = []
            response.data.Data.PaymentType.forEach(element => {
              PrepaidTypeArray.push(element.Name)
            });
            setPrepaidTypeName(PrepaidTypeArray);

            let PPV = []
            response.data.Data.PaymentType.forEach(element => {
              PPV.push(
                {
                  name: element.Name,
                  y: element.Value,
                },
              )

            });
            setPaymentPrepaidValue(PPV);

            let PNV = []
            response.data.Data.PrepaidPayment.forEach(element => {
              PNV.push(
                {
                  name: element.Name,
                  y: element.Value,
                },
              )

            });
            setPaymentNetBankingname(PNV);
            //   setPaymentPrepaidValue(response.data.Data.PaymentType.Value);
            //   setPaymentPrepaidName(response.data.Data.PaymentType.Name);

            //  setPaymentNetBankingname(response.data.Data.PrepaidPayment.Value);
            // setPaymentNetBankingnameName(response.data.Data.PrepaidPayment.Name);

          }
        }
        else {
          setResponseMessage('');
          setResponseMessage(response.data.ReturnMessage);

        }
      }
    });
  }

  const GetOrdersByOrderStatus = async () => {
    let getSecuerityToken = await AsyncStorage.getItem('SecurityToken');
    let GetSiteId = await AsyncStorage.getItem('siteId');
    let siteId = route.params?.siteId
    const Request = {
      Date: selectDate,
      PartnerId: GetSiteId == null ? JSON.parse(siteId) : JSON.parse(GetSiteId),
      "BrandId": brandId,
      "DeviceType": deviceType

    }
    api.postData('api/OrdersByOrderStatus/GetOrdersByOrderStatus', Request).then((response) => {
      if (response != undefined && response != null) {
        if (response.data.ReturnCode == 0) {
          setResponseMessage(response.data.ReturnMessage);
          if (response.data.Data != undefined && response.data.Data != null) {
            let a = []
            response.data.Data.forEach(element => {
              a.push(
                {
                  name: element.Name,
                  y: element.Value,
                },
              )

            });
            setOrdersByStatus(a);
          }
        }
        else {
          setResponseMessage('');
          setResponseMessage(response.data.ReturnMessage);

        }
      }
    });
  }

  const GetOrderByCourier = async () => {
    let GetSiteId = await AsyncStorage.getItem('siteId');
    let siteId = route.params?.siteId
    const Request = {
      "Date": selectDate,
      "PartnerId": GetSiteId == null ? JSON.parse(siteId) : JSON.parse(GetSiteId),
      "BrandId": brandId,
      "DeviceType": deviceType

    }
    api.postData('api/OrdersByCourier/GetOrdersByCourier', Request).then((response) => {
      if (response != undefined && response != null) {
        if (response.data.ReturnCode == 0) {
          setResponseMessage(response.data.ReturnMessage);
          if (response.data.Data != undefined && response.data.Data != null) {
            /* setActivityShow(false); */
            let b = []
            response.data.Data.forEach(element => {
              b.push(
                {
                  name: element.Name,
                  y: element.Value,
                },
              )

            });
            setOrdersByCourier(b);
            //     setOrderByCourierValue(response.data.Data[0].Value);
            //   setorderByCourier(response.data.Data[0].Name);

          }
        }
        else {
          setResponseMessage('');
          setResponseMessage(response.data.ReturnMessage);
        }
      }
    });
  }

  const GetBrands = async () => {
    let getSecuerityToken = await AsyncStorage.getItem('SecurityToken');
    console.log('Secuirity Token--->', getSecuerityToken)
    let GetSiteId = await AsyncStorage.getItem('siteId');
    let allBrand = { "BrandCode": "", "BrandId": 0, "BrandName": "All" };
    let siteId = route.params?.siteId
    if (GetSiteId == null || getSecuerityToken == undefined) {
      Logout();
    } else {
      const Request = {
        "PartnerId": GetSiteId == null ? JSON.parse(siteId) : JSON.parse(GetSiteId)
      }
      api.postData('api/Brands/GetBrands', {}).then((response) => {
        if (response != undefined && response != null) {
          if (response.data.Data != undefined && response.data.Data != null) {
            setResponseMessage(response.data.ReturnMessage);
            response.data.Data.BrandDetails.unshift(allBrand)
            setPartners(response.data.Data.BrandDetails)
            GetSalesData();
            if (response.data.ReturnMessage == 'Security Token Expired.') {
              alert('Security Token Expired.');
              setTimeout(() => {

                Logout();
              }, 10000);
            }
          } else if (response.data.ReturnCode == 0) {
            setResponseMessage('');
            setResponseMessage(response.data.ReturnMessage);
          }
          else {
            setResponseMessage('');
            alert(response.data.ReturnMessage);
            setResponseMessage(response.data.ReturnMessage);


          }
        }
      });
    }

  }



  const GetSalesData = async () => {

    //let getSecuerityToken = await AsyncStorage.getItem('SecurityToken');
    let GetSiteId = await AsyncStorage.getItem('siteId');

    let siteId = route.params?.siteId
    const Request = {
      "Date": fromDate,
      "ToDate": selectDate,
      "PartnerId": GetSiteId == null ? JSON.parse(siteId) : JSON.parse(GetSiteId),
      "StoreOrderStatus": ids.toString(),
      "BrandId": brandId,
      "DeviceType": "All"
    }
    api.postData('api/sales/GetSales', Request).then((response) => {
      if (response != undefined && response != null) {
        if (response.data.ReturnCode == 0) {
          setResponseMessage(response.data.ReturnMessage);
          if (response.data.Data != undefined && response.data.Data != null) {

            GetSoldItems();
            GetNumberOfPieces(response.data.Data.salesWithDate);

            GetOrders();
            let OrdersData = response.data.Data.salesWithDate;

            let Salescount = 0
            let OrdersCount = 0
            let desktopOrders = 0
            let Orders = 0
            OrdersData.forEach(x => {
              if (currentdate.cdate == x.Day) {
                Salescount += x.Sales
                if (x.SourceOfOrderDeviceType == 'Desktop') {
                  desktopOrders = x.SalesCount
                } else if (x.SourceOfOrderDeviceType == 'Mobile') {
                  OrdersCount += x.SalesCount
                }
                Orders += x.SalesCount
              }
            });
            setSalesLastDay(Salescount);
            setMobileCount(OrdersCount)
            setDesktopCount(desktopOrders)
            setOrdersCount(Orders);

            let AvgOrderArray = 0;
            let AVGSales = 0;
            let AvgslCont = 0;
            let AvgOrdersArray = []

            OrdersData.forEach(x => {

              AVGSales = x.Sales;
              AvgslCont = x.SalesCount;
              if (AVGSales == 0) {
                AvgOrdersArray.push(0)
              } else {
                AvgOrderArray = (AVGSales / AvgslCont).toFixed()
                AvgOrdersArray.push(parseInt(AvgOrderArray))
              }
            });
            setAverageOrderValueArray(AvgOrdersArray);

            var SalesGrafCount = 0;
            var SalesCount1 = 0;
            var Saless = 0;
            var SalesChart = 0;

            let LatOrders = response.data.Data.salesWithDate;
            let sum = []
            let Graf = []
            let salessum = []
            let Salesas = []
            let lastWeekDays = []
            LatOrders.forEach(x => {
              Graf.push(x.SalesCount);
              SalesGrafCount = Graf;
              lastWeekDays.push(x.Day)
            });
            setSalesGrafCount(SalesGrafCount);

            LatOrders.forEach(x => {
              sum.push(x.SalesCount);
              SalesCount1 += x.SalesCount;
              setTotalOrders(SalesCount1)
              // setRegCount(SalesCount1);
            });

            LatOrders.forEach(x => {
              salessum.push(x.Sales);
              Saless += x.Sales;
              setSales(Saless);

            });

            let SalesDate = []
            var SalesDateConst = 0;
            LatOrders.forEach(x => {
              Salesas.push(x.Sales);
              SalesDate.push(x.Day);
              SalesChart = Salesas;
              SalesDateConst = SalesDate;
            });
            setSalesChartArray(SalesChart);
            setSalesDate(SalesDateConst);
            console.log('SalesChart-->', SalesChart);
            const lastX = 8;
            const weekSaleData = SalesGrafCount.filter((val, index, arr) => index > arr.length - lastX - 1);
            setOneWeekSaleArray(weekSaleData);
            console.log('weekSaleData-->', weekSaleData);

            let avragegeSalesArray = [];
            let AverageSales = 0;
            LatOrders.forEach(x => {
              avragegeSalesArray.push(x.Sales);
              AverageSales = avragegeSalesArray;
            });
            let addSales = 0;
            let AverageValue = '';
            for (let i = 0; i < AverageSales.length; i++) {
              addSales += AverageSales[i];
            }
            const Average = (addSales / SalesCount1);
            AverageValue = Average.toString()
            if (AverageValue == 'NaN') {
              AverageValue = 0;
              setAverageOrderValue(AverageValue);
            } else {
              setAverageOrderValue(Average);
            }

            console.log('Average Value----===>', AverageValue);
            console.log('SalesCount1-->', SalesCount1);
            console.log('Saless-->', Saless);

            let SalesDays = [];
            OrdersData.forEach(x => {
              SalesDays.push(x.Day)
            });
            console.log('SalesDays--->', SalesDays);
            setSalesDays(SalesDays);
          }
        }
        else {
          setResponseMessage('');
          setResponseMessage(response.data.ReturnMessage);

        }
      }
    });
  }

  const GetSalesData1 = async () => {
    //let getSecuerityToken = await AsyncStorage.getItem('SecurityToken');
    let GetSiteId = await AsyncStorage.getItem('siteId');

    let siteId = route.params?.siteId
    const Request = {
      "Date": moment(new Date()).subtract(7, 'days').format('DD MMM YYYY'),
      "ToDate": currentdate.cdate,
      "PartnerId": "3094",
      "StoreOrderStatus": ids.toString(),
      BrandId: brandId,
      DeviceType: "All"
      //"SecurityToken": SecurityToken
      /* BrandId: "0",
      Date: "26 Aug 2022",
      DeviceType: "All",
      PartnerId: "3094",
      StoreOrderStatus: "9,16,39,42,45,29,3,10,72,26,30,48,2,24,23,25,17,59,60,70,15,34,103,107,108,50,109"
      , ToDate: "02 Sep 2022" */

    }
    api.postData('api/sales/GetSales', Request).then((response) => {
      if (response != undefined && response != null) {
        if (response.data.ReturnCode == 0) {
          // setResponseMessage(response.data.ReturnMessage);
          if (response.data.Data != undefined && response.data.Data != null) {

            // GetSoldItems();
            // GetNumberOfPieces(response.data.Data.salesWithDate);

            // GetOrders();
            let OrdersData = response.data.Data.salesWithDate;
            var last = OrdersData[OrdersData.length - 2]
            //   setOrdersCount(last.SalesCount);
            if (last.SourceOfOrderDeviceType == 'Desktop') {
              //     setDesktopCount(last.SalesCount);
            } else if (last.SourceOfOrderDeviceType == 'Mobile') {
              //     setMobileCount(last.SalesCount);
            } else if (last.SourceOfOrderDeviceType == 'App') {
              //     setAppCount(last.SalesCount);
            }
            // setSalesLastDay(last.Sales);

            let AvgOrderArray = 0;
            let AVGSales = 0;
            let AvgslCont = 0;
            let AvgOrdersArray = []

            OrdersData.forEach(x => {

              AVGSales = x.Sales;
              AvgslCont = x.SalesCount;
              if (AVGSales == 0) {
                AvgOrdersArray.push(0)
              } else {
                AvgOrderArray = (AVGSales / AvgslCont).toFixed()
                AvgOrdersArray.push(parseInt(AvgOrderArray))
              }
            });
            // setAverageOrderValueArray(AvgOrdersArray);

            var SalesGrafCount = 0;
            var SalesCount1 = 0;
            var Saless = 0;
            var SalesChart = 0;

            let LatOrders = response.data.Data.salesWithDate;
            let sum = []
            let Graf = []
            let salessum = []
            let Salesas = []
            let lastWeekDays = []
            var res = LatOrders.reduce((acc, obj) => {
              var existObj = acc.find(item => item.Day === obj.Day);
              if (existObj) {
                existObj.realValue = (existObj.SalesCount + obj.SalesCount);
                existObj.optimalValue = (existObj.Sales + obj.Sales);
                return acc;
              }
              acc.push(obj);

              return acc;
            }, []);
            setLastWeekDays(lastWeekDays)
            // console.log(' SalesGrafCount---->', SalesGrafCount);
            // console.log(res);
            res.forEach(x => {
              Graf.push(x.realValue === undefined ? x.SalesCount : x.realValue);
              SalesGrafCount = Graf;
              lastWeekDays.push(x.Day);

            });
            setSalesGrafCountWeekData(SalesGrafCount);


            LatOrders.forEach(x => {
              sum.push(x.SalesCount);
              SalesCount1 += x.SalesCount;
              // setTotalOrders(SalesCount1)
              // setRegCount(SalesCount1);
            });

            LatOrders.forEach(x => {
              salessum.push(x.Sales);
              Saless += x.Sales;
              // setSales(Saless);

            });

            let SalesDate = []
            var SalesDateConst = 0;
            LatOrders.forEach(x => {
              Salesas.push(x.Sales);
              SalesDate.push(x.Day);
              SalesChart = Salesas;
              SalesDateConst = SalesDate;
            });
            // setSalesChartArray(SalesChart);
            // setSalesDate(SalesDateConst);
            console.log('SalesChart-->', SalesChart);
            const lastX = 8;
            const weekSaleData = SalesGrafCount.filter((val, index, arr) => index > arr.length - lastX - 1);
            // setOneWeekSaleArray(weekSaleData);

          }
        }

        else {
          setResponseMessage('');
          setResponseMessage(response.data.ReturnMessage);

        }
      }
    });
  }


  const GetNewRegistrations = async () => {
    let getSecuerityToken = await AsyncStorage.getItem('SecurityToken');

    let siteId = route.params?.siteId
    let GetSiteId = await AsyncStorage.getItem('siteId');
    const Request = {
      Date: fromDate,
      PartnerId: GetSiteId == null ? JSON.parse(siteId) : JSON.parse(GetSiteId),
      StoreOrderStatus: ids.toString(),
      ToDate: selectDate,
      BrandId: brandId
    }
    api.postData('api/Customer/GetNewRegistrations', Request).then((response) => {
      if (response != undefined && response != null) {
        if (response.data.ReturnCode == 0) {
          setResponseMessage(response.data.ReturnMessage);
          if (response.data.Data != undefined && response.data.Data != null) {
            GetOrderByCourier();
            let regisData = response.data.Data
            var Registrationss = regisData[regisData.length - 1]
            setRegistratrationCount(Registrationss.RegistrationCount)
            var RegistrationCount = 0;
            let LatOrders = response.data.Data;
            let sum = []
            LatOrders.forEach(x => {
              sum.push(x.RegistrationCount);
              RegistrationCount += x.RegistrationCount;
              setRegCount(RegistrationCount);
            });

          }
        }
        else {
          setResponseMessage('');
          setResponseMessage(response.data.ReturnMessage);

        }
      }
    });
  }

  const GetNumberOfPieces = async (SalesData1) => {
    let GetSiteId = await AsyncStorage.getItem('siteId');
    let siteId = route.params?.siteId
    const Request = {
      Date: fromDate,
      PartnerId: GetSiteId == null ? JSON.parse(siteId) : JSON.parse(GetSiteId),
      StoreOrderStatus: ids.toString(),
      ToDate: selectDate,
      "BrandId": brandId,
      "DeviceType": deviceType


    }
    api.postData('api/OrdersByOrderStatus/GetNumberOfPieces', Request)
      .then((response) => {
        if (response != undefined && response != null) {
          if (response.data.ReturnCode == 0) {
            setResponseMessage(response.data.ReturnMessage);
            if (response.data.Data != undefined && response.data.Data != null) {

              GetNewRegistrations();

              let A = response.data.Data
              let B = SalesData1
              var C = [];
              let AvgOrdersArrayss = []

              for (var i = 0; i < A.length; i++) {
                if (A[i].NumberOfPiecesOfTheDay == 0) {
                  AvgOrdersArrayss.push(0)
                } else {
                  C = ((A[i].NumberOfPiecesOfTheDay / B[i].SalesCount).toFixed(0));
                  AvgOrdersArrayss.push(parseInt(C));
                }

              }
              setAveragePiecesPerOrdergraf(AvgOrdersArrayss);
              console.log('Average Pieces Per Order----->', AvgOrdersArrayss);


              //   console.log('Average Pieces Per Order Value --->', AverageValue)

              var OrdersCount = 0;
              var NumberOfPieces = 0;
              var totalnumberofpeaces = 0;
              var AveragePiecesPerOrder0 = 0;
              var AveragePiecesPerOrdergraf = 0;

              let LatOrders = response.data.Data;

              let sum = []
              let numbrofpces = []
              let numbrofpcesArray = []
              let AveragePiecesPerOrders = []
              let AveragePiecesPerOrdergrafs = []

              LatOrders.forEach(x => {
                AveragePiecesPerOrdergrafs.push(x.NumberOfPieces);
                AveragePiecesPerOrdergraf = AveragePiecesPerOrdergrafs;
              });

              //   console.log('AveragePiecesPerOrder===>', AveragePiecesPerOrdergraf)
              LatOrders.forEach(x => {
                AveragePiecesPerOrders.push(x.AveragePiecesPerOrder);
                AveragePiecesPerOrder0 += x.AveragePiecesPerOrder;
                // setAveragePiecesPerOrder(AveragePiecesPerOrder0);
              });

              LatOrders.forEach(x => {
                sum.push(x.OrdersCount);
                OrdersCount += x.OrdersCount;
                // setOrdersCount(OrdersCount);
              });

              LatOrders.forEach(x => {
                numbrofpces.push(x.NumberOfPieces);
                NumberOfPieces += x.NumberOfPieces;
                setNumberOfPieces(NumberOfPieces);
              });

              LatOrders.forEach(x => {
                numbrofpcesArray.push(x.NumberOfPieces);
              });
              setTotalnumberofPreacesArray(numbrofpcesArray)
              console.log('OrdersCount---->', OrdersCount);
              console.log('TotalNumberOfPieces---->', NumberOfPieces);
              console.log('totalnumberofpeaces---->', totalnumberofpeaces);

              let TotalOrderss = 0
              SalesData1.forEach(x => {
                TotalOrderss += x.SalesCount;
                // setOrdersCount(OrdersCount);
              });
              const AveragePerOrder = (NumberOfPieces / TotalOrderss).toFixed(0);
              console.log('Average Pieces Per Order Value--->', AveragePerOrder)
              setAveragePiecesPerOrder(AveragePerOrder);

              /* /................................................. */
              let NumberofDays = [];
              LatOrders.forEach(x => {
                NumberofDays.push(x.Day);

              });
              console.log('NumberofDays--->', NumberofDays);
              setNumberofPeacesDays(NumberofDays)
            }
          }
          else {
            setResponseMessage('');
            setResponseMessage(response.data.ReturnMessage);
            // setLoader(false);
          }
        }
      });
  }

  const GetOrders = async () => {
    let GetSiteId = await AsyncStorage.getItem('siteId');
    let siteId = route.params?.siteId
    const Request = {
      Date: fromDate,
      ToDate: selectDate,
      PartnerId: GetSiteId == null ? JSON.parse(siteId) : JSON.parse(GetSiteId),
    }
    api.postData('api/Orders/GetOrders', Request)
      .then((response) => {
        if (response != undefined && response != null) {
          if (response.data.ReturnCode == 0) {
            setResponseMessage(response.data.ReturnMessage);
            if (response.data.Data != undefined && response.data.Data != null) {
              let Orders = response.data.Data.Orders

            }
          }
          else {
            setResponseMessage('');
            setResponseMessage(response.data.ReturnMessage);

          }
        }
      });
  }

  const GetSoldItems = async () => {
    let GetSiteId = await AsyncStorage.getItem('siteId');
    let siteId = route.params?.siteId
    const Request = {
      Date: fromDate,
      SecurityToken: "",
      PartnerId: GetSiteId == null ? JSON.parse(siteId) : JSON.parse(GetSiteId),
      StoreOrderStatus: ids.toString(),
      ToDate: selectDate,
      "BrandId": brandId,
      "DeviceType": deviceType

    }
    api.postData('api/SoldItems/GetSoldItems', Request)
      .then((response) => {
        if (response != undefined && response != null) {
          if (response.data.ReturnCode == 0) {
            setResponseMessage(response.data.ReturnMessage);
            if (response.data.Data != undefined && response.data.Data != null) {

              let Sold = response.data.Data

              var SoldItems = Sold[Sold.length - 1];

              setProductsSold(SoldItems.Items);
              console.log('SoldProducts', SoldItems.Items);


              let subOrdees = []
              var subOrdeees = 0;
              Sold.forEach(x => {
                subOrdees.push(x.Items);
                subOrdeees += x.Items;
                setSubOrders(subOrdeees);

              });


              console.log('Sub Ordes---->', subOrdeees);

              let SubOrdersArray = []
              var SubOrderssss = 0;
              Sold.forEach(x => {
                SubOrdersArray.push(x.Items);
                SubOrderssss = SubOrdersArray;
              });

              setSubOrderGraf(SubOrderssss)
              console.log('Sub OrdersArray ---->', SubOrderssss);

              GetUsersDetails();
              //setActivityShow(true);

              const lastX = 8;
              const weekProoductsData = SubOrderssss.filter((val, index, arr) => index > arr.length - lastX - 1);
              //  setOneWeekProdustsSoldArray(weekProoductsData);
              console.log('LastWeek Products Sold Data-->', weekProoductsData);
              /* ................................................... */
              let SubOrdersssss = [];
              Sold.forEach(x => {
                SubOrdersssss.push(x.Day);
              });
              console.log(SubOrdersssss);
              setSubOrdersDays(SubOrdersssss);
              setActivityShow(false);

            }
          }
          else {
            setResponseMessage('');
            setResponseMessage(response.data.ReturnMessage);
            // setLoader(false);
            /* setTimeout(() => {
              setResponseMessage('')
            }, 5000); */
          }
        }
      });
  }

  const GetSoldItems1 = async () => {
    let GetSiteId = await AsyncStorage.getItem('siteId');
    let siteId = route.params?.siteId
    const Request = {
      BrandId: brandId,
      Date: moment(new Date()).subtract(7, 'days').format('DD MMM YYYY'),
      DeviceType: "All",
      PartnerId: "3094",
      StoreOrderStatus: ids.toString(),
      ToDate: currentdate.cdate
      /*  Date: moment(new Date()).subtract(7, 'days').format('DD MMM YYYY'),
       PartnerId: brandId,
       StoreOrderStatus: ids.toString(),
       ToDate: currentdate.cdate,
       "BrandId": 0,
       "DeviceType": "All", */
      // SecurityToken: SecurityToken

    }
    api.postData('api/SoldItems/GetSoldItems', Request).then((response) => {
      if (response != undefined && response != null) {
        if (response.data.ReturnCode == 0) {
          setResponseMessage(response.data.ReturnMessage);
          if (response.data.Data != undefined && response.data.Data != null) {

            let Sold = response.data.Data

            var SoldItems = Sold[Sold.length - 1];
            //setProductsSold(SoldItems.Items);
            console.log('SoldProducts', SoldItems.Items);

            let subOrdees = []
            var subOrdeees = 0;
            Sold.forEach(x => {
              subOrdees.push(x.Items);
              subOrdeees += x.Items;
              // setSubOrders(subOrdeees);
            });

            console.log('Sub Ordes---->', subOrdeees);

            let SubOrdersArray = []
            var SubOrderssss = 0;
            Sold.forEach(x => {
              SubOrdersArray.push(x.Items);
              SubOrderssss = SubOrdersArray;
            });

            // setSubOrderGraf(SubOrderssss)
            console.log('Sub OrdersArray ---->', SubOrderssss);

            // GetUsersDetails();
            //setActivityShow(true);

            const lastX = 8;
            const weekProoductsData = SubOrderssss.filter((val, index, arr) => index > arr.length - lastX - 1);
            setOneWeekProdustsSoldArrayoriginal(weekProoductsData);
            console.log('LastWeek Products Sold Data-->', weekProoductsData);
            /* ................................................... */
            let SubOrdersssss = [];
            Sold.forEach(x => {
              SubOrdersssss.push(x.Day);
            });
            console.log(SubOrdersssss);
            setProductsSoldDays(SubOrdersssss);
            setActivityShow(false);

          }
        }
        else {
          setResponseMessage('');
          setResponseMessage(response.data.ReturnMessage);
          // setLoader(false);
          /* setTimeout(() => {
            setResponseMessage('')
          }, 5000); */
        }
      }
    });
  }
  const GetAllOrderStatus = async () => {
    //let getSecuerityToken = await AsyncStorage.getItem('SecurityToken');
    let GetSiteId = await AsyncStorage.getItem('siteId');
    let siteId = route.params?.siteId
    const Request = {
      PartnerId: GetSiteId == null ? JSON.parse(siteId) : JSON.parse(GetSiteId),
    }
    api.postData('api/OrdersByOrderStatus/GetAllOrderStatus', {})
      .then((response) => {
        if (response != undefined && response != null) {
          if (response.data.ReturnCode == 0) {
            setResponseMessage(response.data.ReturnMessage);
            if (response.data.Data != undefined && response.data.Data != null) {
              var options = response.data.Data
              setOrderStatusData(options);
            }
          }
          else {
            setResponseMessage('');
            setResponseMessage(response.data.ReturnMessage);

            setTimeout(() => {
              setResponseMessage('')
            }, 5000);
          }
        }
      });
  }

  const GetCustomerOrderType = async () => {

    let GetSiteId = await AsyncStorage.getItem('siteId');
    let siteId = route.params?.siteId
    const Request = {
      Date: fromDate,
      IsYear: false,
      PartnerId: GetSiteId == null ? JSON.parse(siteId) : JSON.parse(GetSiteId),
      StoreOrderStatus: ids.toString(),
      ToDate: selectDate
    }
    api.postData('api/CustomerOrderType/GetCustomerOrderType', Request)
      .then((response) => {
        if (response != undefined && response != null) {
          if (response.data.ReturnCode == 0) {
            setResponseMessage(response.data.ReturnMessage);
            if (response.data.Data != undefined && response.data.Data != null) {

              var CustomerTypeData = response.data.Data

              let RepeatCustomerCount = 0;
              let RepeatCustomerCounts = 0;
              let RepeatCountArray1 = [];
              let RepeatCountsArray2 = 0;
              let RepeatDays = []
              CustomerTypeData.forEach(x => {
                if (x.CustomerType == 'Repeat') {
                  RepeatCustomerCount = (x.CustomerTypeCount);
                  RepeatCustomerCounts += RepeatCustomerCount
                  RepeatCountArray1.push(x.CustomerTypeCount);
                  RepeatCountsArray2 = RepeatCountArray1
                  RepeatDays.push(x.Day);

                }
                setRepeatCount(RepeatCustomerCounts)
                setRepeatCountsGraf(RepeatCountsArray2);
              });
              console.log('NewCustomertypDays===>', NewCustomertyp);
              setRepeatCustomerDays(RepeatDays);
              console.log('setRepeatCustomerDays===>', RepeatDays)
              /* ............................................................. */

              let ActivationCount = 0;
              let ActivationCounts = 0;
              let ActivationCountArray1 = [];
              let ActivationCountsArray2 = 0;
              let ActivationDays = [];
              CustomerTypeData.forEach(x => {
                if (x.CustomerType == 'Activation') {
                  ActivationCount = (x.CustomerTypeCount);
                  ActivationCounts += ActivationCount
                  ActivationCountArray1.push(x.CustomerTypeCount);
                  ActivationCountsArray2 = ActivationCountArray1
                  ActivationDays.push(x.Day);

                }
                setActivationsCount(ActivationCounts)
                setActivationCountsGraf(ActivationCountsArray2);
              });
              console.log('ActivationCounts===>', ActivationCounts);
              console.log('ActivationDays===>', ActivationDays);
              setActivationDays(ActivationDays)
              /* ............................................................. */

              let NEwCount = 0;
              let NEwCounts = 0;
              let NEwCountArray1 = [];
              let NEwCountsArray2 = 0;
              let NewCustomertyp = [];
              CustomerTypeData.forEach(x => {
                if (x.CustomerType == 'New') {
                  NEwCount = (x.CustomerTypeCount);
                  NEwCounts += NEwCount
                  NEwCountArray1.push(x.CustomerTypeCount);
                  NEwCountsArray2 = NEwCountArray1
                  NewCustomertyp.push(x.Day);
                }
                setNewCount(NEwCounts)
                setNewCountGraf(NEwCountsArray2);
              });
              console.log('NEwCounts===>', NEwCounts);
              // console.log('NewCustomertypDays===>', NewCustomertyp);
              setNewCustomerDays(NewCustomertyp);

              var RepeatCustomerCountsArray = []
              var RepeatCustomerCountss = 0;
              CustomerTypeData.forEach(x => {
                if (x.CustomerType == 'Repeat') {
                  RepeatCustomerCountsArray = (x.CustomerCount);
                  RepeatCustomerCountss = RepeatCustomerCountsArray;
                }
              });
              setRepeatCustomerCount(RepeatCustomerCountss)
              console.log('RepeatCustomerCountsGraf====>', RepeatCustomerCountss);
              /* /....................................................................................... */
              var ActivationCustomerCountsArray = []
              var ActivationCustomerCountss = 0;
              CustomerTypeData.forEach(x => {
                if (x.CustomerType == 'Activation') {
                  ActivationCustomerCountsArray = (x.CustomerCount);
                  ActivationCustomerCountss = ActivationCustomerCountsArray;
                }
              });
              setActivationCustomerCount(ActivationCustomerCountss)
              console.log('ActivationCustomerCountsGraf====>', ActivationCustomerCountss);
              /* ..................................................................... */
            } else {
              // setActivityShow(false);
            }
          }
          else {
            // setActivityShow(false);
            setResponseMessage('');
            setResponseMessage(response.data.ReturnMessage);
          }
        }
      });
  }
  /* GetTraffic And sales */

  const GetUsersDetails = async () => {

    let GetSiteId = await AsyncStorage.getItem('siteId');
    let siteId = route.params?.siteId
    const Request = {
      Date: trafficWeekSaleDate,
      PartnerId: GetSiteId == null ? JSON.parse(siteId) : JSON.parse(GetSiteId),
      ToDate: currentdate.cdate
    }
    api.postData('api/Customer/GetUsersDetails', Request)
      .then((response) => {

        if (response != undefined && response != null) {
          if (response.data.ReturnCode == 0) {
            setResponseMessage(response.data.ReturnMessage);
            if (response.data.Data != undefined && response.data.Data != null) {
              let TraficSalesdata = response.data.Data

              setTrafficSalesData(response.data.Data)
              setActivityShow(false);
              setRefreshLoader(false)
              let Google = 0;
              let Jockey = 0;
              let Faceboobk = 0;
              TraficSalesdata.forEach(x => {
                Jockey += x.JockeyCount;
                Google += x.GoogleCount;
                Faceboobk += x.FacebookCount;
              })
              setJockeyCount(Jockey);
              setGoogleCount(Google);
              setFaceboobkCount(Faceboobk);
              console.log('Platform Count====>', Jockey, Google, Faceboobk)

              var TotalData = Jockey + Google + Faceboobk;
              var Jockeypc = (Jockey / TotalData) * 100;
              var Googlepc = (Google / TotalData) * 100;
              var Faceboobkpc = (Faceboobk / TotalData) * 100;
              setJockeyPC(Jockeypc.toFixed());
              setGooglePC(Googlepc.toFixed());
              setFaceboobkPC(Faceboobkpc.toFixed());
              console.log(Jockeypc.toFixed(), Googlepc.toFixed(), Faceboobkpc.toFixed())
              let newClaint = 0;
              let recuuringClaint = 0;
              TraficSalesdata.forEach(x => {

                newClaint += x.NewUser
                recuuringClaint += x.Recurring
              })
              setNewClient(newClaint);
              // setRecurringClient(recuuringClaint);

              let NewClaintss = [];

              TraficSalesdata.forEach(x => {
                if (x.NewUser == 0 && x.Recurring == 0) {
                  NewClaintss.push(0)
                } else {
                  let z = 100 / (x.NewUser + x.Recurring);
                  console.log(z)
                  let Final = z * x.NewUser
                  NewClaintss.push(Final / 100)
                }
              })
              setNewPercentageData(NewClaintss);
              console.log('Percentage data===>', NewClaintss);
              /* .............................................................................. */

              let Gendersss = [];
              let MaleTotal = 0;
              let FemaleTotal = 0;

              TraficSalesdata.forEach(x => {
                MaleTotal += x.MaleCount
                FemaleTotal += x.FemaleCount
              })

              let zz = 100 / (MaleTotal + FemaleTotal);
              if (zz == Infinity) {
                zz = 0
              }
              console.log(zz)
              let Finals = zz * MaleTotal
              Gendersss.push(Finals / 100)
              console.log('Gender Progress-->', Gendersss);
              setGenderProgress(Gendersss);

              let TotalGenderData = MaleTotal + FemaleTotal;
              let Malepc = (MaleTotal / TotalGenderData) * 100;
              let Femalepc = (FemaleTotal / TotalGenderData) * 100;
              console.log(Malepc.toFixed(), Femalepc.toFixed());
              setMalePC(Malepc.toFixed());
              setFemalePC(Femalepc.toFixed());
              /* ............................................................... */

              let DevicesTotal = [];
              let DeskTotal = 0;
              let mobileTotal = 0;

              TraficSalesdata.forEach(x => {
                DeskTotal += x.DesktopCount
                mobileTotal += x.MobileCount
              })

              let zzz = 100 / (DeskTotal + mobileTotal);
              console.log(zzz)
              let Finalss = zzz * DeskTotal
              DevicesTotal.push(Finalss / 100)
              console.log('DevicesTotal Progress-->', DevicesTotal);
              setDeviceProgress(DevicesTotal);

              var TotalDeviceData = DeskTotal + mobileTotal;
              var Desktop = (DeskTotal / TotalDeviceData) * 100;
              var mobile = (mobileTotal / TotalDeviceData) * 100;
              console.log(Desktop.toFixed(), mobile.toFixed());
              setDesktopPC(Desktop.toFixed());
              setMobilePC(mobile.toFixed());
              // setActivityShow(false)

            }

          }
          else {
            setResponseMessage('');
            setResponseMessage(response.data.ReturnMessage);
          }
        }
      });
  }

  const SubmitFC = () => {
    if (selectDate < fromDate) {
      setErrorShow(true);
    }
    /* if (selectDate > currentdate.cdate) {
      setTimeout(() => {
        setErrorShow(false);
      }, 3000);
      setErrorShow(true);
    }  */else {
      setErrorShow(false);
      //setActivityShow(true);
      //GetBrands();
      GetNumberOfPieces();

      GetSalesData()

      GetBrands()
      // GetNewRegistrations();
      // GetCustomerOrderType();
      scrollIntoView(viewFilterPymnt.current, optionss);

    }
  }

  const DashboardmnFC = () => {

    setTodayOrdersbyPaymntShow(false);
    setOrdersShow(false);
    setProductsSoldShow(false);
    setTodayOrdersShow(false);
    setTodayOrdersbyPaymntShow(false);
    setTrafficSalesShow(false);
    if (drawerVisible) {
      setDraweVisible(false);
    } else {
      setDraweVisible(true);
    }
  }
  const HideAll = () => {
    setDraweVisible(false)
    setTodayOrdersbyPaymntShow(false);
    setOrdersShow(false);
    setProductsSoldShow(false);
    setTodayOrdersShow(false);
    setTodayOrdersbyPaymntShow(false);
    setTrafficSalesShow(false);
  }

  const Ordersssss = () => {
    GetSoldItems1();
    setOrdersShow(true);
    setProductsSoldShow(false);
    setTodayOrdersbyPaymntShow(false);
    setDraweVisible(false);
    setTodayOrdersShow(false);
    setTrafficSalesShow(false);
    setPaymentTypeShow(false);
    setTimeout(() => {
      scrollIntoView(viewRefOrder.current, optionss);
    }, 200);
  }

  const productsSoldFC = () => {
    GetSalesData1();
    setProductsSoldShow(true);
    setHeart2(true);
    setOrdersShow(false);
    setTodayOrdersbyPaymntShow(false);
    setDraweVisible(false);
    setTodayOrdersShow(false);
    setTrafficSalesShow(false);
    setPaymentTypeShow(false);
    setTimeout(() => {
      scrollIntoView(viewRefOrder.current, optionss);
    }, 200);
  }

  const TodayOrdersbyPaymntFC = () => {
    setTodayOrdersbyPaymntShow(true);
    setOrdersShow(false);
    setTodayOrdersShow(false);
    GetOrdersByOrderStatus();
    setProductsSoldShow(false);
    setPaymentTypeShow(false);
    setTrafficSalesShow(false);
    setDraweVisible(false)
    setTimeout(() => {
      scrollIntoView(viewRefbyPymnt.current, optionss);
    }, 200);
  }
  const TodayOrdersFC = () => {
    setTodayOrdersShow(true);
    setOrdersShow(false);
    setTodayOrdersbyPaymntShow(false);
    GetOrdersByOrderStatus();
    setProductsSoldShow(false);
    setPaymentTypeShow(false);
    setTrafficSalesShow(false);
    setDraweVisible(false)
    setTimeout(() => {
      scrollIntoView(viewRef1.current, optionss);
    }, 200);

  }
  const PaymenTypeFC = () => {
    GetOrdersByPaymentType();
    setOrdersShow(false);
    setTodayOrdersbyPaymntShow(false);
    setPaymentTypeShow(true);
    setDraweVisible(false);
    setTodayOrdersShow(false);
    setTrafficSalesShow(false);
    setProductsSoldShow(false);
    setTimeout(() => {
      scrollIntoView(viewRef2.current, optionss);
    }, 200);
  }

  const TrafficSalesFC = () => {
    setOrdersShow(false);
    GetUsersDetails();
    setTodayOrdersbyPaymntShow(false);
    setTrafficSalesShow(true);
    setDraweVisible(false);
    setTodayOrdersShow(false);
    setProductsSoldShow(false);
    setPaymentTypeShow(false);
    setTimeout(() => {
      scrollIntoView(viewRef3.current, optionss);
    }, 50);
  }
  const OrdersTotalOrders = () => {
    Week1ButtonSate();
    HideAll();
    setOrdersNumberOfPieces(false);
    setTotalSalesAmount(false);
    setAverageOrderValueshow(false);
    setSubOrders2(false);
    setAveragePiecesPerOrder2(false);
    setNewCount2(false);
    setActivationCount2(false);
    setRepeatCount2(false);
    setOrderTotalOrders(true);
    setDraweVisible(false);
    setTimeout(() => {
      scrollIntoView(viewRef4.current, optionss);
    }, 100);
    setShowyear("");
    setvalueUI("");
    setSelectedYear("");

  }

  const OrdersNumberOfPiece = () => {
    HideAll();
    Week1ButtonSate2();
    setTotalSalesAmount(false);
    setAverageOrderValueshow(false);
    setSubOrders2(false);
    setAveragePiecesPerOrder2(false);
    setNewCount2(false);
    setActivationCount2(false);
    setRepeatCount2(false);
    setOrderTotalOrders(false);
    setDraweVisible(false);
    setOrdersNumberOfPieces(true);
    setDraweVisible(false);
    setTimeout(() => {
      scrollIntoView(viewRef5.current, optionss);
    }, 50);
    setShowyear("");
    setvalueUI("");
    setSelectedYear("");

  }
  const TotalSalesAmountButton = () => {
    Week1ButtonSate();
    HideAll();
    setAverageOrderValueshow(false);
    setSubOrders2(false);
    setAveragePiecesPerOrder2(false);
    setNewCount2(false);
    setActivationCount2(false);
    setRepeatCount2(false);
    setOrderTotalOrders(false);
    setDraweVisible(false);
    setOrdersNumberOfPieces(false);
    setTotalSalesAmount(true);
    setDraweVisible(false);
    setTimeout(() => {
      scrollIntoView(viewRef6.current, optionss);
    }, 50);
    setShowyear("");
    setvalueUI("");
    setSelectedYear("");
  }
  const AverageOrderValueButton = () => {
    Week1ButtonSate3();
    HideAll();
    setSubOrders2(false);
    setAveragePiecesPerOrder2(false);
    setNewCount2(false);
    setActivationCount2(false);
    setRepeatCount2(false);
    setOrderTotalOrders(false);
    setOrdersNumberOfPieces(false);
    setTotalSalesAmount(false);
    setAverageOrderValueshow(true);
    setDraweVisible(false);
    setTimeout(() => {
      scrollIntoView(viewRef7.current, optionss);
    }, 50);
    setShowyear("");
    setvalueUI("");
    setSelectedYear("");
  }

  const SunOrders2Button = () => {
    Week1ButtonSate3();
    HideAll();
    setAveragePiecesPerOrder2(false);
    setNewCount2(false);
    setActivationCount2(false);
    setRepeatCount2(false);
    setOrderTotalOrders(false);
    setOrdersNumberOfPieces(false);
    setTotalSalesAmount(false);
    setAverageOrderValueshow(false);
    setSubOrders2(true);
    setDraweVisible(false);
    setTimeout(() => {
      scrollIntoView(viewRef8.current, optionss);
    }, 50);
    setShowyear("");
    setvalueUI("");
    setSelectedYear("");
  }
  const AveragePcsPrOrder2Button = () => {
    Week1ButtonSate();
    HideAll();
    setNewCount2(false);
    setActivationCount2(false);
    setRepeatCount2(false);
    setOrderTotalOrders(false);
    setOrdersNumberOfPieces(false);
    setTotalSalesAmount(false);
    setAverageOrderValueshow(false);
    setSubOrders2(false);
    setAveragePiecesPerOrder2(true);
    setDraweVisible(false);
    setTimeout(() => {
      scrollIntoView(viewRef9.current, optionss);
    }, 50);
    setShowyear("");
    setvalueUI("");
    setSelectedYear("");
  }
  const NewCount2Button = () => {
    HideAll();
    Week1ButtonSate4();
    setActivationCount2(false);
    setRepeatCount2(false);
    setOrderTotalOrders(false);
    setOrdersNumberOfPieces(false);
    setTotalSalesAmount(false);
    setAverageOrderValueshow(false);
    setSubOrders2(false);
    setAveragePiecesPerOrder2(false);
    setNewCount2(true);
    setDraweVisible(false);
    setTimeout(() => {
      scrollIntoView(viewRef10.current, optionss);
    }, 50);
    setShowyear("");
    setvalueUI("");
    setSelectedYear("");
  }
  const RepeatCount2Button = () => {
    HideAll();
    Week1ButtonSate4();
    setRepeatCount2(true);
    setOrderTotalOrders(false);
    setOrdersNumberOfPieces(false);
    setTotalSalesAmount(false);
    setAverageOrderValueshow(false);
    setSubOrders2(false);
    setAveragePiecesPerOrder2(false);
    setNewCount2(false);
    setActivationCount2(false);
    setDraweVisible(false);
    setTimeout(() => {
      scrollIntoView(viewRef11.current, optionss);
    }, 50);
    setShowyear("");
    setvalueUI("");
    setSelectedYear("");
  }
  const ActivationCount2Button = () => {
    HideAll();
    Week1ButtonSate4();
    setRepeatCount2(false);
    setOrderTotalOrders(false);
    setOrdersNumberOfPieces(false);
    setTotalSalesAmount(false);
    setAverageOrderValueshow(false);
    setSubOrders2(false);
    setAveragePiecesPerOrder2(false);
    setNewCount2(false);
    setActivationCount2(true);
    setDraweVisible(false);
    setTimeout(() => {
      scrollIntoView(viewRef12.current, optionss);
    }, 50);
    setShowyear("");
    setvalueUI("");
    setSelectedYear("");
  }
  const isChecked = (itemId) => {
    const isThere = ids.includes(itemId);
    return isThere;
  };

  const toggleChecked = (itemId) => {
    const idm = [...ids, itemId];

    if (isChecked(itemId)) {
      setIds(ids => ids.filter((id) => id !== itemId))
    } else {
      setIds(idm)
    }
  };

  const Logout = async () => {
    var keys = await AsyncStorage.getAllKeys();
    AsyncStorage.multiRemove(keys);
    navigation.navigate('Login');

  }



  const RefreshFC = () => {
    setRefreshLoader(true)
    Yeardata();
    GetBrands();
    GetNewRegistrations();
    //GetCustomerOrderType();
    GetAllOrderStatus();
    GetAllOrderStatuss();
  }
  return (
    <View style={{ flexGrow: 1, }}>
      <Modal
        animationType="fade"
        transparent={true}

        visible={activityShow}
        onRequestClose={() => {
          setActivityShow(!activityShow);
        }}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
          <View style={{ flex: 1, height: h - 130, justifyContent: 'center' }}>
            <Image
              style={{ alignSelf: 'center', }}
              source={require('./assets/Loading.gif')}
            />
          </View>
        </View></Modal>


      {/* <Modal
        animationType="slidLeft"
        transparent={true}
        visible={drawerVisible}
        onRequestClose={() => {
          setDraweVisible(!drawerVisible);
        }}
      >
        <SafeAreaView>
          <Pressable onPress={() => setDraweVisible(false)}
            style={{ height: h, }}>
            <View style={{ width: '20%', flexDirection: 'column' }}>
              <TouchableOpacity onPress={() => DashboardmnFC()} style={styles.iconContainer}><Image
                style={{ height: 40, marginVertical: 10 }} resizeMode={'contain'}
                source={require('./assets/Icons-01.png')}
              /></TouchableOpacity>
              <View style={styles.horizontalDivider}></View>
              <TouchableOpacity onPress={() => Ordersssss()} style={styles.iconContainer}><Image
                style={{ height: 40, marginVertical: 10 }} resizeMode={'contain'}
                source={require('./assets/Icons-02.png')}
              /></TouchableOpacity>
              <View style={styles.horizontalDivider}></View>
              <TouchableOpacity onPress={() => productsSoldFC()} style={styles.iconContainer}><Image
                style={{ height: 40, marginVertical: 10 }} resizeMode={'contain'}
                source={require('./assets/Icons-03.png')}
              /></TouchableOpacity>
              <View style={styles.horizontalDivider}></View>
              <TouchableOpacity onPress={() => TodayOrdersFC()} style={styles.iconContainer}><Image
                style={{ height: 40, marginVertical: 10 }} resizeMode={'contain'}
                source={require('./assets/Icons-04.png')}
              /></TouchableOpacity>
              <View style={styles.horizontalDivider}></View>
              <TouchableOpacity onPress={() => TodayOrdersbyPaymntFC()} style={styles.iconContainer}><Image
                style={{ height: 40, marginVertical: 10 }} resizeMode={'contain'}
                source={require('./assets/Icons-05.png')}
              /></TouchableOpacity>
              <View style={styles.horizontalDivider}></View>
              <TouchableOpacity onPress={() => PaymenTypeFC()} style={styles.iconContainer}><Image
                style={{ height: 40, marginVertical: 10 }} resizeMode={'contain'}
                source={require('./assets/Icons-06.png')}
              /></TouchableOpacity>
              <View style={styles.horizontalDivider}></View>
              <TouchableOpacity onPress={() => TrafficSalesFC()} style={styles.iconContainer}><MaterialIcons name={'groups'} size={40} color='#fff' style={{ fontWeight: '700', padding: 8 }} /></TouchableOpacity>
              <View style={styles.horizontalDivider}></View>
            </View>
          </Pressable>
        </SafeAreaView>
      </Modal> */}


      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }} >
        <Pressable onPress={() => setModalVisible(false)} style={styles.centeredView}>
          <View style={[styles.modalView, { height: h / 1.8 }]}>
            <View style={{ width: '80%', alignSelf: 'center', paddingVertical: 10 }}>
              <Text style={{ color: '#000', fontSize: 16, fontWeight: '700' }}>Select Brand</Text>
            </View>
            <View style={{ width: '90%', height: '90%', marginBottom: 30, marginHorizontal: 15 }}>
              <FlatList
                data={partners}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => String(item.BrandId)}
                renderItem={({ item, index }) => {
                  return (
                    <View>
                      <TouchableOpacity style={{ alignItems: 'center', paddingVertical: 8, borderRadius: 8, flexDirection: 'row', marginLeft: 15 }}
                        onPress={() => { setBrandId(item.BrandId), setBrandName(item.BrandName), setModalVisible(false) }}
                      >
                        <View style={{ height: 24, width: 24, borderWidth: 1, borderColor: '#337ab7', borderRadius: 15, alignItems: 'center', justifyContent: 'center' }} >
                          {/* <FontAwesome name={"check"} color={'#fff'} size={16} /> */}
                          <View style={{ height: 18, width: 18, backgroundColor: brandName == item.BrandName ? '#337ab7' : '#fff', borderRadius: 15 }}></View>
                        </View>
                        <Text style={{ fontSize: 16, color: '#000', fontWeight: '500', paddingLeft: 12, top: -1 }}>{item.BrandName}</Text></TouchableOpacity>
                    </View>
                  )
                }}
              />
              <View style={{ margin: 5 }}></View>
            </View>
          </View>

        </Pressable>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={selectDevicemodal}
        onRequestClose={() => {
          setSelectDevicemodal(!selectDevicemodal);
        }} >
        <Pressable onPress={() => setSelectDevicemodal(false)} style={styles.centeredView}>
          <View style={[styles.modalView, { height: h / 4 }]}>
            <View style={{ width: '80%', alignSelf: 'center', paddingVertical: 10 }}>
              <Text style={{ color: '#000', fontSize: 16, fontWeight: '700' }}>Select Device</Text>
            </View>
            <View style={{ width: '90%', height: '90%', marginBottom: 30, marginHorizontal: 15 }}>
              <FlatList
                data={DevicesData}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => String(item.id)}
                renderItem={({ item, index }) => {
                  return (
                    <View>
                      <TouchableOpacity style={{ alignItems: 'center', paddingVertical: 8, borderRadius: 8, flexDirection: 'row', marginLeft: 15 }}
                        onPress={() => { setDeviceType(item.deviceType), setSelectDevicemodal(false) }}
                      >
                        <View style={{ height: 24, width: 24, borderWidth: 1, borderColor: '#337ab7', borderRadius: 15, alignItems: 'center', justifyContent: 'center' }} >
                          {/* <FontAwesome name={"check"} color={'#fff'} size={16} /> */}
                          <View style={{ height: 18, width: 18, backgroundColor: deviceType == item.deviceType ? '#337ab7' : '#fff', borderRadius: 15 }}></View>
                        </View>
                        <Text style={{ fontSize: 16, color: '#000', fontWeight: '500', paddingLeft: 12, top: -1 }}>{item.deviceType}</Text></TouchableOpacity>
                    </View>
                  )
                }}
              />
              <View style={{ margin: 5 }}></View>
            </View>
          </View>

        </Pressable>
      </Modal>


      {/* Order Status Modal*/}
      <Modal
        animationType="fade"
        transparent={true}
        visible={OrdermodalVisible}
        onRequestClose={() => {
          setOrderModalVisible(!OrdermodalVisible);
        }}
      >
        <Pressable onPress={() => setOrderModalVisible(false)} style={{ flex: 1, justifyContent: "center", alignItems: "center", elevation: 10, backgroundColor: 'rgba(52, 52, 52, 0.8)', alignSelf: 'center', height: h, width: w }}>
          <View style={{ width: '100%', backgroundColor: '#fff', elevation: 10, borderRadius: 5, height: h / 1.5, width: w / 1.2 }}>
            <View style={{ width: '100%', backgroundColor: '#fff', borderWidth: 2, borderRadius: 5, borderColor: '#1bb394' }}>
              <View style={{ flexDirection: 'row', backgroundColor: '#fff', justifyContent: 'space-around' }}>
                <TouchableOpacity onPress={() => setIds(orderStatusValue)}
                  style={{ flexDirection: 'row', borderColor: '#1bb394', paddingHorizontal: 10, borderTopColor: '#fff', alignItems: 'center' }}>
                  <Ionicons name={'checkmark'} size={30} color='#000' style={{ fontWeight: '700', alignSelf: 'flex-end', alignSelf: 'center', }} />
                  <Text style={styles.checkallbtttn}>Check All</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIds([])} style={{ flexDirection: 'row', paddingHorizontal: 10, borderTopColor: '#fff', alignItems: 'center' }}>
                  <Ionicons name={'close'} size={30} color='#000' style={{ fontWeight: '700', alignSelf: 'flex-end', alignSelf: 'center', }} />
                  <Text style={styles.checkallbtttn}>Uncheck All</Text>
                </TouchableOpacity>

              </View>
              <FlatList
                data={OrderStatusData}
                keyExtractor={(item, index) => String(item.Value)}
                renderItem={({ item, index }) => {
                  return (

                    <TouchableOpacity activeOpacity={0.5} onPress={() => toggleChecked(item.Value)} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#eee', marginBottom: 2 }}>
                      <CheckBox
                        checkedIcon={
                          <View style={{ height: 24, width: 24, backgroundColor: '#337ab7', borderRadius: 2, alignItems: 'center', justifyContent: 'center' }} >
                            <FontAwesome name={"check"} color={'#fff'} size={16} />
                          </View>
                        }
                        uncheckedIcon={
                          <View style={{ height: 24, width: 24, backgroundColor: '#fff', borderWidth: 1, borderColor: '#337ab7', borderRadius: 2 }} />
                        }
                        color='#FFB500'
                        checked={isChecked(item.Value)}
                        onPress={() => toggleChecked(item.Value)}
                      />
                      <Text style={{ fontSize: 14, color: '#000', fontWeight: '500', alignSelf: 'center', width: '80%' }}>{item.Name}</Text></TouchableOpacity>
                  )
                }}
              />
            </View>
            <View style={{ width: '100%', backgroundColor: '#fff', elevation: 10, borderRadius: 5 }}>
              <TouchableOpacity onPress={() => setOrderModalVisible(false)} style={{ padding: 2, borderRadius: 5, width: '100%' }}>
                <Text style={styles.Submitbutton}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>

        </Pressable>
      </Modal>

      <View style={styles.headerContainer}>
        <Image
          style={{ backgroundColor: '#fff', padding: 10, height: h / 14, width: '33%', }} resizeMode={'contain'}
          source={require('./assets/Reval-platform.png')} />
        <View style={styles.Divider}></View>
        <View style={{ width: '33%', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
          <Text style={{ color: '#000', fontWeight: '700', fontSize: 18 }}>DASHBOARD</Text>
        </View>
        <View style={{ width: '33%', flex: 1, justifyContent: 'flex-end', flexDirection: "row", backgroundColor: "#fff", height: '100%' }}>
          <View style={styles.Divider}></View>
          <TouchableOpacity onPress={() => Logout()} style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name={'power'} size={30} color='#edadad' style={{ fontWeight: '700', alignSelf: 'flex-end', alignSelf: 'center', marginHorizontal: 10 }} />
          </TouchableOpacity>
        </View>
      </View>
      {/* Header End */}
      <View
      >
        <View style={{ flexDirection: 'row', }}>
          {/* Side Menu */}
          {drawerVisible ?
            <View style={{ width: '20%', flexDirection: 'column' }}>
              <TouchableOpacity onPress={() => DashboardmnFC()} style={styles.iconContainer}><Image
                style={{ height: 40, marginVertical: 10 }} resizeMode={'contain'}
                source={require('./assets/Icons-01.png')}
              /></TouchableOpacity>
              <View style={styles.horizontalDivider}></View>
              <TouchableOpacity onPress={() => productsSoldFC()} style={styles.iconContainer}><Image
                style={{ height: 40, marginVertical: 10 }} resizeMode={'contain'}
                source={require('./assets/Icons-02.png')}
              /></TouchableOpacity>
              <View style={styles.horizontalDivider}></View>
              <TouchableOpacity onPress={() => Ordersssss()} style={styles.iconContainer}><Image
                style={{ height: 40, marginVertical: 10 }} resizeMode={'contain'}
                source={require('./assets/Icons-03.png')}
              /></TouchableOpacity>
              <View style={styles.horizontalDivider}></View>
              <TouchableOpacity onPress={() => TodayOrdersFC()} style={styles.iconContainer}><Image
                style={{ height: 40, marginVertical: 10 }} resizeMode={'contain'}
                source={require('./assets/Icons-04.png')}
              /></TouchableOpacity>
              <View style={styles.horizontalDivider}></View>
              <TouchableOpacity onPress={() => TodayOrdersbyPaymntFC()} style={styles.iconContainer}><Image
                style={{ height: 40, marginVertical: 10 }} resizeMode={'contain'}
                source={require('./assets/Icons-05.png')}
              /></TouchableOpacity>
            </View>
            :
            null}
          {/* Side Menu End */}
          <View style={{ flexDirection: 'column', flex: 1, elevation: 10 }}>
            <View style={styles.menubuttonContainer}>
              <TouchableOpacity onPress={() => DashboardmnFC()} style={{ backgroundColor: '#1BB394', borderRadius: 5, width: 42, alignItems: 'center', justifyContent: 'center' }}>
                <FontAwesome name={'bars'} size={24} color='#fff' style={{ fontWeight: '700', alignSelf: 'center', }} />
              </TouchableOpacity>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                <Text style={styles.dashboardText}>Dashboard</Text>
                <TouchableOpacity onPress={() => RefreshFC()} style={{ backgroundColor: '#1BB394', justifyContent: 'center', borderRadius: 5 }}>
                  {refreshLoader ?
                    <ActivityIndicator size={25} color='#fff' style={{ paddingHorizontal: 25 }} />
                    :
                    <Text style={{ fontSize: 14, color: '#fff', paddingHorizontal: 20 }}>Refresh</Text>
                  }
                </TouchableOpacity>
              </View>
            </View>
            {/* Top menu button End */}
            {/*  <ScrollView overScrollMode="never" horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
              <View style={styles.topcards}>
                <Text style={styles.ScoreCardHeader1}>Sales in INR</Text>
                <Text style={styles.ValueText1}>₹ {SalesLastDay}</Text>
              </View>
              <View style={[styles.topcards, { backgroundColor: '#347ab7' }]}>
                <Text style={styles.ScoreCardHeader1}>Orders</Text>
                <Text style={styles.ValueText1}>{ordersCount}</Text>
              </View>
              <View style={[styles.topcards, { backgroundColor: '#f8ac5a' }]}>
                <Text style={styles.ScoreCardHeader1}>New Registrations</Text>
                <Text style={styles.ValueText1}>{registratrationCount}</Text>
              </View>
              <View style={[styles.topcards, { backgroundColor: '#ed5666' }]}>
                <Text style={styles.ScoreCardHeader1}>Products Sold</Text>
                <Text style={styles.ValueText1}>{desktopCount}</Text>
              </View>
              <View style={[styles.topcards, { backgroundColor: '#347AB7' }]}>
                <Text style={styles.ScoreCardHeader1}>Desktop Orders</Text>
                <Text style={styles.ValueText1}>{productsSold}</Text>
              </View>
              <View style={[styles.topcards, { backgroundColor: '#f8ac5a' }]}>
                <Text style={styles.ScoreCardHeader1}>Mobile Orders</Text>
                <Text style={styles.ValueText1}>{mobileCount}</Text>
              </View>
              <View style={[styles.topcards, { backgroundColor: '#ed5666', marginRight: 12 }]}>
                <Text style={styles.ScoreCardHeader1}>App Orders</Text>
                <Text style={styles.ValueText1}>{appCount}</Text>
              </View>
            </ScrollView> */}



            <View style={{ flex: 1, alignSelf: 'center', marginHorizontal: 5 }}>
              <View style={{ flexDirection: 'row', marginVertical: 6, justifyContent: 'space-between' }}>
                <View style={styles.topcards}>
                  <Text numberOfLines={1} style={styles.ScoreCardHeader1}>Sales in INR</Text>
                  <Text style={styles.ValueText1}>₹ {SalesLastDay}</Text>
                </View>
                <View style={[styles.topcards, { backgroundColor: '#347ab7' }]}>
                  <Text numberOfLines={1} style={styles.ScoreCardHeader1}>Orders</Text>
                  <Text style={styles.ValueText1}>{ordersCount}</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', marginVertical: 6, justifyContent: 'space-between' }}>
                <View style={[styles.topcards, { backgroundColor: '#f8ac5a' }]}>
                  <Text numberOfLines={1} style={styles.ScoreCardHeader1}>New Registrations</Text>
                  <Text style={styles.ValueText1}>{registratrationCount}</Text>
                </View>
                <View style={[styles.topcards, { backgroundColor: '#ed5666' }]}>
                  <Text numberOfLines={1} style={styles.ScoreCardHeader1}>Products Sold</Text>
                  <Text style={styles.ValueText1}>{productsSold}</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', marginVertical: 6, justifyContent: 'space-between' }}>
                <View style={[styles.topcards, { backgroundColor: '#347AB7' }]}>
                  <Text numberOfLines={1} style={styles.ScoreCardHeader1}>Desktop Orders</Text>
                  <Text style={styles.ValueText1}>{desktopCount}</Text>
                </View>
                <View style={[styles.topcards, { backgroundColor: '#f8ac5a' }]}>
                  <Text numberOfLines={1} style={styles.ScoreCardHeader1}>Mobile Orders</Text>
                  <Text style={styles.ValueText1}>{mobileCount}</Text>
                </View>
              </View>
              {/* <View style={{ flexDirection: 'row', marginVertical: 6, justifyContent: 'space-between' }}>
                <View style={[styles.topcards, { backgroundColor: '#ed5666', }]}>
                  <Text style={styles.ScoreCardHeader1}>App Orders</Text>
                  <Text style={styles.ValueText1}>{appCount}</Text>
                </View>
              </View> */}



            </View>

            {/* <View ref={viewRef00} style={{ backgroundColor: "#fff", margin: 15, elevation: 10 }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.ScoreCardHeader}>Sales in INR</Text>
                <View style={styles.Divider}></View>
                <Text style={[styles.ScoreCardHeader, { color: '#347ab7' }]}>Orders</Text>
              </View>
              <View style={styles.horizontalDivider}></View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.ValueText}>₹ {SalesLastDay}</Text>
                <View style={styles.Divider}></View>
                <Text style={[styles.ValueText, { color: '#347ab7' }]}>{ordersCount}</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.ScoreCardHeader, { color: '#f8ac5a' }]}>New Registrations</Text>
                <View style={styles.Divider}></View>
                <Text style={[styles.ScoreCardHeader, { color: '#ed5666' }]}>Products Sold</Text>
              </View>
              <View style={styles.horizontalDivider}></View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.ValueText, { color: '#f8ac5a' }]}>{registratrationCount}</Text>
                <View style={styles.Divider}></View>
                <Text style={[styles.ValueText, { color: '#ed5666' }]}>{productsSold}</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.ScoreCardHeader, { color: '#347AB7' }]}>Desktop Orders</Text>
                <View style={styles.Divider}></View>
                <Text style={[styles.ScoreCardHeader, { color: '#f8ac5a' }]}>Mobile Orders</Text>
              </View>
              <View style={styles.horizontalDivider}></View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.ValueText, { color: '#347AB7' }]}>{desktopCount}</Text>
                <View style={styles.Divider}></View>
                <Text style={[styles.ValueText, { color: '#f8ac5a' }]}>{mobileCount}</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.ScoreCardHeader, { color: '#ed5666' }]}>App Orders</Text>
                <View style={styles.Divider}></View>
              </View>
              <View style={[styles.horizontalDivider, { width: '50%' }]}></View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.ValueText, { color: '#ed5666' }]}>{appCount}</Text>
                <View style={styles.Divider}></View>
              </View>
            </View> */}
            {/* Score Card End */}
            <View style={styles.SearchFilterContainer}>
              <Text style={{ color: '#000', fontWeight: '500', paddingTop: 10, paddingBottom: 10, fontSize: 16, paddingLeft: 10 }}>Search Orders</Text>
              <View style={styles.horizontalDivider}></View>
              <View style={{ backgroundColor: errorShow ? '#f2d6d5' : null }}>
                {/* inputs Containers */}
                <View style={{ padding: 10 }}>
                  <Text style={{ padding: 3, fontSize: 15, color: '#000' }}>From Date</Text>
                  <TouchableOpacity style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', borderWidth: 1, borderBottomColor: '#000', height: 50, borderColor: '#ccc' }} onPress={() => setopenfrom(true)}>
                    <TextInput
                      style={{ paddingLeft: 5 }}
                      value={fromDate} //setFromDate
                      color='#777B7E'
                      onChangeText={newText => setFromDate(newText)}
                      editable={false}
                    />
                    <FontAwesome name={'angle-down'} size={20} color='#000' style={{ fontWeight: '700', alignSelf: 'center', marginRight: 15 }} />
                  </TouchableOpacity>
                </View>
                <View style={{ padding: 10, }}>

                  <DatePicker
                    modal
                    mode='date'
                    theme='light'
                    maximumDate={new Date()}
                    open={openfrom}
                    date={datefrom}
                    onConfirm={onFromDate}
                    onCancel={() => {
                      setopenfrom(false)
                    }}
                  />

                  <DatePicker
                    modal
                    mode='date'
                    theme='light'
                    maximumDate={new Date()}
                    open={open}
                    date={date}
                    onConfirm={onChange}
                    onCancel={() => {
                      setOpen(false)
                    }}
                  />

                  <Text style={{ padding: 3, fontSize: 15, color: '#000' }}>To Date</Text>
                  <TouchableOpacity style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', borderWidth: 1, borderBottomColor: '#000', height: 50, borderColor: '#ccc', }} onPress={() => setOpen(true)}>
                    <TextInput
                      style={{ paddingLeft: 5 }}

                      editable={false}
                      color='#777B7E'
                      value={selectDate}
                      onChangeText={newText => setToDate(newText)}
                    />
                    <FontAwesome name={'angle-down'} size={20} color='#000' style={{ fontWeight: '700', alignSelf: 'center', marginRight: 15 }} />
                  </TouchableOpacity>

                </View>
                <View style={{ padding: 10 }}>
                  <Text style={{ padding: 3, fontSize: 15, color: '#000' }}>Select Brand</Text>
                  <TouchableOpacity
                    style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', borderWidth: 1, borderBottomColor: '#000', height: 50, borderColor: '#ccc' }}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={{ paddingLeft: 5, color: '#000' }}>{brandName}</Text>
                    <FontAwesome name={'angle-down'} size={20} color='#000' style={{ fontWeight: '700', alignSelf: 'center', marginRight: 15 }} /></TouchableOpacity>
                </View>
                <View style={{ padding: 10 }}>
                  <Text style={{ padding: 3, fontSize: 15, color: '#000' }}>Select Status</Text>
                  <TouchableOpacity onPress={() => { setOrderModalVisible(!OrdermodalVisible) }}
                    style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', borderWidth: 1, borderBottomColor: '#000', height: 50, borderColor: '#ccc' }}>
                    <Text style={{ color: '#000' }}> {ids.length} Checked</Text>
                    <FontAwesome name={'angle-down'} size={20} color='#000' style={{ fontWeight: '700', alignSelf: 'center', marginRight: 15 }} />
                  </TouchableOpacity>
                </View>
                <View style={{ padding: 10 }}>
                  <Text style={{ padding: 3, fontSize: 15, color: '#000' }}>Select Device</Text>
                  <TouchableOpacity
                    style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', borderWidth: 1, borderBottomColor: '#000', height: 50, borderColor: '#ccc' }}
                    onPress={() => setSelectDevicemodal(!selectDevicemodal)}>
                    <Text style={{ paddingLeft: 5, color: '#000' }}>{deviceType}</Text>
                    <FontAwesome name={'angle-down'} size={20} color='#000' style={{ fontWeight: '700', alignSelf: 'center', marginRight: 15 }} /></TouchableOpacity>
                </View>



                {errorShow ?
                  <Text style={{ textAlign: 'center', fontSize: 14, color: '#FF0000', paddingVertical: 2 }}>'From Date' cannot be greater than 'To Date'.</Text>
                  : null}
                {/* Submit Button */}
                <TouchableOpacity onPress={() => SubmitFC()} style={{ paddingTop: 5, padding: 10 }}>
                  <Text style={styles.Submitbutton}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Charts Contaoner */}

            <View style={styles.chartsContainer} >
              <View style={{ backgroundColor: '#1bb394', height: 2 }}></View>
              <Text style={{ alignSelf: 'flex-start', fontSize: 14, color: '#333333', padding: 5 }}>Reports from {fromDate} to {selectDate}</Text>
              <View style={styles.horizontalDivider}></View>
              {/* Total Orders Chart */}

              <View style={{ backgroundColor: '#1bb394', margin: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Text style={{ padding: 5, fontSize: 14, color: '#fff' }}>Total Orders</Text>
                  <TouchableOpacity onPress={() => OrdersTotalOrders()} style={{ margin: 10 }}>

                    <FontAwesome name={'pie-chart'} size={20} color='#fff' style={{ fontWeight: '700' }} /></TouchableOpacity>
                </View>
                <Text style={{ padding: 5, fontSize: 20, color: '#fff' }}> {totalOrders}</Text>
                <ChartView style={{ height: 100, backgroundColor: '#1bb394' }} config={conf} options={options}></ChartView>
              </View>
              {/* Bar Chart */}
              <View style={{ backgroundColor: '#347ab7', margin: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Text style={{ padding: 5, fontSize: 14, color: '#fff' }}>Total Number of Pieces</Text>
                  <TouchableOpacity onPress={() => OrdersNumberOfPiece()} style={{ margin: 10 }}>
                    <Image
                      style={{ height: 30, width: 30, alignSelf: 'center', resizeMode: 'contain' }}
                      source={require('./assets/chart-1.png')}
                    /></TouchableOpacity>
                </View>
                <Text style={{ padding: 5, fontSize: 20, color: '#fff' }}> {totalnumberOfPieces}</Text>
                <ChartView style={{ height: 100, backgroundColor: '#347ab7' }} config={conf1} options={options}></ChartView>
              </View>
              <View ref={viewFilterPymnt} style={{ backgroundColor: '#f8cb00', margin: 10 }}>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Text style={{ padding: 5, fontSize: 14, color: '#fff' }}>Sub Orders</Text>
                  <TouchableOpacity onPress={() => SunOrders2Button()} style={{ margin: 10 }}>
                    <Image
                      style={{ height: 30, width: 30, alignSelf: 'center', resizeMode: 'contain' }}
                      source={require('./assets/chart-5.png')}
                    /></TouchableOpacity>
                </View>

                <Text style={{ padding: 5, fontSize: 20, color: '#fff' }}> {subOrders}</Text>
                <ChartView style={{ height: 100, backgroundColor: '#f8cb00' }} config={conf4} options={options}></ChartView>
              </View>
              <View style={{ backgroundColor: '#ed5666', margin: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Text style={{ padding: 5, fontSize: 14, color: '#fff' }}>Total Sales In INR Conversion</Text>
                  {/* <TouchableOpacity onPress={() => TotalSalesAmountButton()} style={{ margin: 10 }}>
                    <Image
                      style={{ height: 30, width: 30, alignSelf: 'center', resizeMode: 'contain' }}
                      source={require('./assets/chart-2.png')}
                    /></TouchableOpacity> */}
                </View>
                <Text style={{ padding: 5, fontSize: 20, color: '#fff' }}> {sales.toFixed(0)}</Text>
                <ChartView style={{ height: 100, backgroundColor: '#ed5666' }} config={confV2} options={options}></ChartView>
              </View>
              {/* TotalSales Amount Chart */}
              <View style={{ backgroundColor: '#f8cb00', margin: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Text style={{ padding: 5, fontSize: 14, color: '#fff' }}>Total Sales Amount (INR)</Text>
                  {/* <TouchableOpacity onPress={() => TotalSalesAmountButton()} style={{ margin: 10 }}>
                    <Image
                      style={{ height: 30, width: 30, alignSelf: 'center', resizeMode: 'contain' }}
                      source={require('./assets/chart-2.png')}
                    /></TouchableOpacity> */}
                </View>
                <Text style={{ padding: 5, fontSize: 20, color: '#fff' }}> {sales.toFixed(0)}</Text>
                <ChartView style={{ height: 100, backgroundColor: '#f8cb00' }} config={conf2} options={options}></ChartView>
              </View>
              <View style={{ backgroundColor: '#ed5666', margin: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Text style={{ padding: 5, fontSize: 14, color: '#fff' }}>Average Orders Value (INR)</Text>
                  {/* <TouchableOpacity onPress={() => AverageOrderValueButton()} style={{ margin: 10 }}>
                    <Image
                      style={{ height: 30, width: 30, alignSelf: 'center', resizeMode: 'contain' }}
                      source={require('./assets/chart-3.png')}
                    /></TouchableOpacity> */}
                </View>

                <Text style={{ padding: 5, fontSize: 20, color: '#fff' }}> {parseFloat(averageOrderValue).toFixed(0)}</Text>
                {averageOrderValueArray != null && averageOrderValueArray != undefined && averageOrderValueArray != '' ?
                  <ChartView style={{ height: 100, backgroundColor: '#ed5666' }} config={conf3} options={options}></ChartView>
                  :
                  <Text style={styles.noDatamsgStyle}>No Records are Found.</Text>

                }
              </View>

              {/*  <View style={{ backgroundColor: '#ed5666', margin: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ padding: 5, fontSize: 14, color: '#fff' }}>Average Pieces Per Order</Text>
                <TouchableOpacity onPress={() => AveragePcsPrOrder2Button()} style={{ margin: 10 }}>
                  <Image
                    style={{ height: 30, width: 30, alignSelf: 'center', resizeMode: 'contain' }}
                    source={require('./assets/chart-5.png')}
                  /></TouchableOpacity>
              </View>
              <Text style={{ padding: 5, fontSize: 20, color: '#fff' }}>{averagePiecesPerOrder}</Text>
              <ChartView style={{ height: 100, backgroundColor: '#ed5666' }} config={conf5} options={options}></ChartView>
            </View> */}
              {/* <View style={{ backgroundColor: '#347ab7', margin: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ padding: 5, fontSize: 14, color: '#fff' }}>New Count</Text>
                <TouchableOpacity onPress={() => NewCount2Button()} style={{ margin: 10 }}>
                  <Image
                    style={{ height: 30, width: 30, alignSelf: 'center', resizeMode: 'contain' }}
                    source={require('./assets/chart-5.png')}
                  /></TouchableOpacity>
              </View>
              <Text style={{ padding: 5, fontSize: 20, color: '#fff' }}>{newCount}</Text>
              <ChartView style={{ height: 100, backgroundColor: '#347ab7' }} config={conf6} options={options}></ChartView>
            </View> */}
              {/*   <View style={{ backgroundColor: '#f8cb00', margin: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ padding: 5, fontSize: 14, color: '#fff' }}>Repeat Count</Text>
                <TouchableOpacity onPress={() => RepeatCount2Button()} style={{ margin: 10 }}>
                  <Image
                    style={{ height: 30, width: 30, alignSelf: 'center', resizeMode: 'contain' }}
                    source={require('./assets/chart-5.png')}
                  /></TouchableOpacity>
              </View>
              <Text style={{ padding: 5, fontSize: 20, color: '#fff' }}>{repeatCount}</Text>
              <ChartView style={{ height: 100, backgroundColor: '#f8cb00' }} config={conf7} options={options}></ChartView>
            </View> */}
              {/* <View style={{ backgroundColor: '#1bb394', margin: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ padding: 5, fontSize: 14, color: '#fff' }}>Activation Count</Text>
                <TouchableOpacity onPress={() => ActivationCount2Button()} style={{ margin: 10 }}>
                  <Image
                    style={{ height: 30, width: 30, alignSelf: 'center', resizeMode: 'contain' }}
                    source={require('./assets/chart-5.png')}
                  /></TouchableOpacity>
              </View>
              <Text style={{ padding: 5, fontSize: 20, color: '#fff' }}>{activationsCount}</Text>
              <ChartView style={{ height: 100, backgroundColor: '#1bb394' }} config={conf8} options={options}></ChartView>
            </View> */}
              {/*  <View style={{ backgroundColor: '#f8cb00', margin: 10 }}>
              <Text style={{ padding: 5, fontSize: 14, color: '#fff' }}>Repeat Customer Count</Text>
              <Text style={{ padding: 5, fontSize: 20, color: '#fff' }}>{repeatCustomerCount}</Text>
              <ChartView style={{ height: 100, backgroundColor: '#f8cb00' }} config={conf9} options={options}></ChartView>
            </View>
            <View style={{ backgroundColor: '#1bb394', margin: 10 }}>
              <Text style={{ padding: 5, fontSize: 14, color: '#fff' }}>Activation Customer Count</Text>
              <Text style={{ padding: 5, fontSize: 20, color: '#fff' }}>{ActivationCustomerCounts}</Text>
              <ChartView style={{ height: 100, backgroundColor: '#1bb394' }} config={conf10} options={options}></ChartView>
            </View> */}

            </View>
            {/* Menu Grafs */}
            {/* Products Sold LAst Week */}
            {ProductsSoldShow ?
              (<>
                <View ref={viewRefOrder} style={styles.OrdersButtonChartContainer}>
                  <View style={{ width: '100%', backgroundColor: '#1BB394', height: 1 }}></View>
                  <Text style={{ padding: 15, fontSize: 14, color: '#000' }}>Orders - Last Week</Text>
                  <View style={{ width: '100%', backgroundColor: '#ddd', height: 1 }}></View>
                  <ChartView style={{ height: 280, padding: 10 }} config={conf11} options={options}></ChartView>
                </View>
                {/* <View ref={viewRefOrder} style={styles.OrdersButtonChartContainer}>
                  <View style={{ width: '100%', backgroundColor: '#1BB394', height: 1 }}></View>
                  <Text style={{ padding: 15, fontSize: 14, color: '#000' }}>Products Sold - Last Week</Text>
                  <View style={{ width: '100%', backgroundColor: '#ddd', height: 1, }}></View>
                  <ChartView style={{ height: 160, backgroundColor: '#fff', padding: 10 }} config={conf11a} options={options}></ChartView>
                </View> */}
              </>
              )
              : null}

            {OrdersShow ?
              (<View ref={viewRefOrder} style={styles.OrdersButtonChartContainer}>
                <View style={{ width: '100%', backgroundColor: '#f8ac5a', height: 1 }}></View>
                <Text style={{ padding: 15, fontSize: 14, color: '#000' }}>Products Sold - Last Week</Text>
                <View style={{ width: '100%', backgroundColor: '#ccc', height: 1 }}></View>
                {produstsSoldArrayoriginal != null && produstsSoldArrayoriginal != undefined && produstsSoldArrayoriginal != 0 ?
                  <ChartView style={{ height: 160, backgroundColor: '#fff', margin: 10 }} config={conf12} options={options}></ChartView>
                  :
                  <Text style={styles.noDatamsgStyle}>No Records are Found.</Text>
                }
              </View>)
              : null}

            {/* Orders by Status & couririer */}
            {TodayOrdersShow ?
              (<View ref={viewRef1} style={styles.OrdersButtonChartContainer}>
                <View style={{ width: '100%', backgroundColor: '#347ab7', height: 1 }}></View>
                <Text style={{ padding: 15, fontSize: 14, color: '#000' }}>Today's Orders - By Status</Text>
                <View style={{ width: '100%', backgroundColor: '#ccc', height: 1 }}></View>
                {ordersByStatus != null && ordersByStatus != undefined && ordersByStatus != 0 ?
                  <ChartView style={{ height: 160, backgroundColor: '#fff', padding: 10 }} config={conf13} options={options}></ChartView>
                  :
                  <Text style={styles.noDatamsgStyle}>No Records are Found.</Text>

                }
              </View>)
              : null}
            {TodayOrdersbyPaymntShow ?
              (<View ref={viewRefbyPymnt} style={styles.OrdersButtonChartContainer}>
                <View style={{ width: '100%', backgroundColor: '#f8ac5a', height: 1 }}></View>
                <Text style={{ padding: 15, fontSize: 14, color: '#000' }}>Today's Orders - By Courier</Text>
                <View style={{ width: '100%', backgroundColor: '#ccc', height: 1 }}></View>

                {orderByCourier != null && orderByCourier != undefined && orderByCourier != 0 ?
                  <ChartView style={{ height: 160, backgroundColor: '#fff', padding: 10 }} config={conf14} options={options}></ChartView>
                  :
                  <Text style={styles.noDatamsgStyle}>No Records are Found.</Text>

                }
              </View>)
              : null}

            {PaymentTypeShow ?
              <View ref={viewRef2} style={styles.OrdersButtonChartContainer}>
                <View style={{ width: '100%', backgroundColor: '#ed5666', height: 1 }}></View>
                <Text style={{ padding: 15, fontSize: 14, color: '#000' }}>Today's Orders By Payment Type</Text>
                <View style={{ width: '100%', backgroundColor: '#ccc', height: 1 }}></View>
                <ChartView style={{ height: 230, padding: 10 }} config={conf15} options={options}></ChartView>
                <ChartView style={{ height: 250, padding: 10 }} config={conf15V2} options={options}></ChartView>
              </View>
              : null}

            {OrderTotalOrders ?
              <View ref={viewRef4} style={styles.OrdersButtonChartContainer}>
                <View style={{ width: '100%', backgroundColor: '#ed5666', height: 1 }}></View>

                {/* ..................... */}
                <Modal
                  transparent
                  animationType="fade"
                  visible={Chartdateopen}
                  onRequestClose={() => {
                    setChartDateOpen(false)
                  }}>
                  <View style={styles.bottomDatePickerContainer}>
                    <View style={styles.DatePickercontent}>
                      <MonthPicker
                        selectedDate={ChartDateshow}
                        onMonthChange={setChartDatesShow}
                        mode='year'
                      />
                      <TouchableOpacity
                        style={styles.confirmButton}
                        onPress={() => onBmodalDate()}>
                        <Text style={{ color: '#fff', fontSize: 16 }}>Confirm</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>
                <Modal
                  transparent
                  animationType="fade"
                  visible={ChartYeardateopen}
                  onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                  }}>
                  <View style={styles.bottomDatePickerContainer}>
                    <View style={styles.DatePickercontent}>
                      <MonthPicker
                        selectedDate={ChartYearDateshow}
                        onMonthChange={setChartYearDatesShow}
                      />
                      <TouchableOpacity
                        style={styles.confirmButton}
                        onPress={() => BmodalYearDate()}>
                        <Text style={{ color: '#fff', fontSize: 16 }}>Confirm</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>
                {/* monthpicker */}

                {/* weekdayButtons */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text style={{ padding: 15, fontSize: 14, color: '#000', width: '45%' }}>Orders - Total Orders</Text>
                  <View style={{ flexDirection: 'row', paddingRight: 5 }}>
                    <TouchableOpacity onPress={() => Week1ButtonSate()} style={[styles.dayweekButton, { backgroundColor: Week1ButtonColor }]}><Text style={styles.dayweekButtonText}>Week</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => { MonthButtonStateFC(), setopenBForm(true) }} style={[styles.dayweekButton, { backgroundColor: day1ButtonColor }]}><Text style={styles.dayweekButtonText}>Month</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => { Year1ButtonSate(), setopenBForm(true) }} style={[styles.dayweekButton, { backgroundColor: yearButtonColor }]}><Text style={styles.dayweekButtonText}>Year</Text></TouchableOpacity>
                  </View>
                </View>
                <View style={{ width: '98%', flexDirection: 'row', justifyContent: 'flex-start' }}>
                  <TouchableOpacity onPress={() => { setOrderModalVisible(!OrdermodalVisible) }}
                    style={{ flexDirection: 'row', justifyContent: 'space-between', borderWidth: 1, borderBottomColor: '#000', borderColor: '#ccc', marginRight: 10, width: "48%", margin: 5 }}>
                    <Text style={{ color: '#000', padding: 10 }}> {ids.length} Checked</Text>
                    <Ionicons style={{ padding: 10 }} name={'chevron-down'} size={20} color={'#000'} />
                  </TouchableOpacity>
                  {showyear == "Month" ?
                    <TouchableOpacity onPress={() => setShowMonth(true)}
                      style={{ flexDirection: 'row', justifyContent: 'space-between', borderWidth: 1, borderBottomColor: '#000', borderColor: '#ccc', marginRight: 10, width: "48%", margin: 5 }}>
                      <Text style={{ color: '#000', padding: 12 }}>{valueUI == '' ? moment(new Date()).format('MMM') : valueUI}</Text>
                      <Ionicons style={{ padding: 12 }} name={'chevron-down'} size={20} color={'#000'} />
                    </TouchableOpacity>
                    : null}

                  {showyear == "Year" ?
                    <TouchableOpacity onPress={() => setShowYearModal(true)}
                      style={{ flexDirection: 'row', justifyContent: 'space-between', borderWidth: 1, borderBottomColor: '#000', borderColor: '#ccc', marginRight: 10, width: "48%", margin: 5 }}>
                      <Text style={{ color: '#000', padding: 12 }}>{selectedYear == '' ? moment(new Date()).format('YYYY') : selectedYear}</Text>
                      <Ionicons style={{ padding: 12 }} name={'chevron-down'} size={20} color={'#000'} />
                    </TouchableOpacity>
                    : null}
                </View>

                <View style={{ width: '100%', backgroundColor: '#ccc', height: 1 }}></View>
                {salesCountForC2 == null && salesCountForC2 == undefined ?
                  <Text style={styles.noDatamsgStyle}>No Records are Found.</Text>
                  :
                  <ChartView style={{ height: 200, margin: 5 }} config={conf16} options={options}></ChartView>
                }

              </View>
              : null}

            {OrdersNumberOfPieces ?
              <View ref={viewRef5} style={styles.OrdersButtonChartContainer}>
                <View style={{ width: '100%', backgroundColor: '#ed5666', height: 1 }}></View>
                {/* weekdayButtons */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text style={{ padding: 15, fontSize: 14, color: '#000', width: "45%" }}>Orders - Number Of Pieces</Text>
                  <View style={{ flexDirection: 'row', paddingRight: 5 }}>
                    <TouchableOpacity onPress={() => Week1ButtonSate2()} style={[styles.dayweekButton, { backgroundColor: Week1ButtonColor }]}><Text style={styles.dayweekButtonText}>Week</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => MonthButtonStateFC2()} style={[styles.dayweekButton, { backgroundColor: day1ButtonColor }]}><Text style={styles.dayweekButtonText}>Month</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => Year1ButtonSate2()} style={[styles.dayweekButton, { backgroundColor: yearButtonColor }]}><Text style={styles.dayweekButtonText}>Year</Text></TouchableOpacity>
                  </View>
                </View>
                <View style={{ width: '98%', flexDirection: 'row', justifyContent: 'flex-start' }}>
                  <TouchableOpacity onPress={() => { setOrderModalVisible(!OrdermodalVisible) }}
                    style={{ flexDirection: 'row', justifyContent: 'space-between', borderWidth: 1, borderBottomColor: '#000', borderColor: '#ccc', marginRight: 10, width: "48%", margin: 5 }}>
                    <Text style={{ color: '#000', padding: 10 }}> {ids.length} Checked</Text>
                    <Ionicons style={{ padding: 10 }} name={'chevron-down'} size={20} color={'#000'} />
                  </TouchableOpacity>
                  {showyear == "Month" ?
                    <TouchableOpacity onPress={() => setShowMonth(true)}
                      style={{ flexDirection: 'row', justifyContent: 'space-between', borderWidth: 1, borderBottomColor: '#000', borderColor: '#ccc', marginRight: 10, width: "48%", margin: 5 }}>
                      <Text style={{ color: '#000', padding: 12 }}>{valueUI == '' ? moment(new Date()).format('MMM') : valueUI}</Text>
                      <Ionicons style={{ padding: 12 }} name={'chevron-down'} size={20} color={'#000'} />
                    </TouchableOpacity>
                    : null}

                  {showyear == "Year" ?
                    <TouchableOpacity onPress={() => setShowYearModal(true)}
                      style={{ flexDirection: 'row', justifyContent: 'space-between', borderWidth: 1, borderBottomColor: '#000', borderColor: '#ccc', marginRight: 10, width: "48%", margin: 5 }}>
                      <Text style={{ color: '#000', padding: 12 }}>{selectedYear == '' ? moment(new Date()).format('YYYY') : selectedYear}</Text>
                      <Ionicons style={{ padding: 12 }} name={'chevron-down'} size={20} color={'#000'} />
                    </TouchableOpacity>
                    : null}
                </View>

                <View style={{ width: '100%', backgroundColor: '#ccc', height: 1 }}></View>
                {numberofPeices1 != null && numberofPeices1 != undefined ?
                  <Text style={styles.noDatamsgStyle}>No Records are Found.</Text>
                  :
                  <ChartView style={{ height: 200, margin: 5 }} config={conf17} options={options}></ChartView>
                }
              </View>
              : null}

            {totalSalesAmount ?
              <View ref={viewRef6} style={styles.OrdersButtonChartContainer}>
                <View style={{ width: '100%', backgroundColor: '#ed5666', height: 1 }}></View>
                {/* weekdayButtons */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text style={{ padding: 15, fontSize: 14, color: '#000', width: '45%' }}>Orders - Total Sales Amount</Text>
                  <View style={{ flexDirection: 'row', paddingRight: 5 }}>
                    <TouchableOpacity onPress={() => Week1ButtonSate()} style={[styles.dayweekButton, { backgroundColor: Week1ButtonColor }]}><Text style={styles.dayweekButtonText}>Week</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => MonthButtonStateFC()} style={[styles.dayweekButton, { backgroundColor: day1ButtonColor }]}><Text style={styles.dayweekButtonText}>Month</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => Year1ButtonSate()} style={[styles.dayweekButton, { backgroundColor: yearButtonColor }]}><Text style={styles.dayweekButtonText}>Year</Text></TouchableOpacity>
                  </View>
                </View>
                <View style={{ width: '98%', flexDirection: 'row', justifyContent: 'flex-start' }}>
                  <TouchableOpacity onPress={() => { setOrderModalVisible(!OrdermodalVisible) }}
                    style={{ flexDirection: 'row', justifyContent: 'space-between', borderWidth: 1, borderBottomColor: '#000', borderColor: '#ccc', marginRight: 10, width: "48%", margin: 5 }}>
                    <Text style={{ color: '#000', padding: 10 }}> {ids.length} Checked</Text>
                    <Ionicons style={{ padding: 10 }} name={'chevron-down'} size={20} color={'#000'} />
                  </TouchableOpacity>
                  {showyear == "Month" ?
                    <TouchableOpacity onPress={() => setShowMonth(true)}
                      style={{ flexDirection: 'row', justifyContent: 'space-between', borderWidth: 1, borderBottomColor: '#000', borderColor: '#ccc', marginRight: 10, width: "48%", margin: 5 }}>
                      <Text style={{ color: '#000', padding: 12 }}>{valueUI == '' ? moment(new Date()).format('MMM') : valueUI}</Text>
                      <Ionicons style={{ padding: 12 }} name={'chevron-down'} size={20} color={'#000'} />
                    </TouchableOpacity>
                    : null}

                  {showyear == "Year" ?
                    <TouchableOpacity onPress={() => setShowYearModal(true)}
                      style={{ flexDirection: 'row', justifyContent: 'space-between', borderWidth: 1, borderBottomColor: '#000', borderColor: '#ccc', marginRight: 10, width: "48%", margin: 5 }}>
                      <Text style={{ color: '#000', padding: 12 }}>{selectedYear == '' ? moment(new Date()).format('YYYY') : selectedYear}</Text>
                      <Ionicons style={{ padding: 12 }} name={'chevron-down'} size={20} color={'#000'} />
                    </TouchableOpacity>
                    : null}
                </View>

                <View style={{ width: '100%', backgroundColor: '#ccc', height: 1 }}></View>
                {salesAmountChart2 == null && salesAmountChart2 == undefined ?
                  <Text style={styles.noDatamsgStyle}>No Records are Found.</Text>
                  :
                  <ChartView style={{ height: 200, margin: 5 }} config={conf18} options={options}></ChartView>

                }

              </View>
              : null}

            {averageOrderValueshow ?
              <View ref={viewRef7} style={styles.OrdersButtonChartContainer}>
                <View style={{ width: '100%', backgroundColor: '#ed5666', height: 1 }}></View>
                {/* weekdayButtons */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text style={{ paddingVertical: 10, paddingLeft: 5, fontSize: 14, color: '#000', width: '45%' }}>Orders - Average Orders Value</Text>
                  <View style={{ flexDirection: 'row', paddingRight: 5 }}>
                    <TouchableOpacity onPress={() => Week1ButtonSate()} style={[styles.dayweekButton, { backgroundColor: Week1ButtonColor }]}><Text style={styles.dayweekButtonText}>Week</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => MonthButtonStateFC()} style={[styles.dayweekButton, { backgroundColor: day1ButtonColor }]}><Text style={styles.dayweekButtonText}>Month</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => Year1ButtonSate()} style={[styles.dayweekButton, { backgroundColor: yearButtonColor }]}><Text style={styles.dayweekButtonText}>Year</Text></TouchableOpacity>
                  </View>
                </View>
                <View style={{ width: '98%', flexDirection: 'row', justifyContent: 'flex-start' }}>
                  <TouchableOpacity onPress={() => { setOrderModalVisible(!OrdermodalVisible) }}
                    style={{ flexDirection: 'row', justifyContent: 'space-between', borderWidth: 1, borderBottomColor: '#000', borderColor: '#ccc', marginRight: 10, width: "48%", margin: 5 }}>
                    <Text style={{ color: '#000', padding: 10 }}> {ids.length} Checked</Text>
                    <Ionicons style={{ padding: 10 }} name={'chevron-down'} size={20} color={'#000'} />
                  </TouchableOpacity>
                  {showyear == "Month" ?
                    <TouchableOpacity onPress={() => setShowMonth(true)}
                      style={{ flexDirection: 'row', justifyContent: 'space-between', borderWidth: 1, borderBottomColor: '#000', borderColor: '#ccc', marginRight: 10, width: "48%", margin: 5 }}>
                      <Text style={{ color: '#000', padding: 12 }}>{valueUI == '' ? moment(new Date()).format('MMM') : valueUI}</Text>
                      <Ionicons style={{ padding: 12 }} name={'chevron-down'} size={20} color={'#000'} />
                    </TouchableOpacity>
                    : null}

                  {showyear == "Year" ?
                    <TouchableOpacity onPress={() => setShowYearModal(true)}
                      style={{ flexDirection: 'row', justifyContent: 'space-between', borderWidth: 1, borderBottomColor: '#000', borderColor: '#ccc', marginRight: 10, width: "48%", margin: 5 }}>
                      <Text style={{ color: '#000', padding: 12 }}>{selectedYear == '' ? moment(new Date()).format('YYYY') : selectedYear}</Text>
                      <Ionicons style={{ padding: 12 }} name={'chevron-down'} size={20} color={'#000'} />
                    </TouchableOpacity>
                    : null}
                </View>

                <View style={{ width: '100%', backgroundColor: '#ccc', height: 1 }}></View>
                {averageOrderValueArray1 == null && averageOrderValueArray1 == undefined ?
                  <Text style={styles.noDatamsgStyle}>No Records are Found.</Text>
                  :
                  <ChartView style={{ height: 200, margin: 5 }} config={conf19} options={options}></ChartView>
                }

              </View>
              : null}

            {subOrders2 ?
              <View ref={viewRef8} style={styles.OrdersButtonChartContainer}>
                <View style={{ width: '100%', backgroundColor: '#ed5666', height: 1 }}></View>
                {/* weekdayButtons */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text style={{ padding: 15, fontSize: 14, color: '#000', width: '45%' }}>Orders - Sub Orders</Text>
                  <View style={{ flexDirection: 'row', paddingRight: 5 }}>
                    <TouchableOpacity onPress={() => Week1ButtonSate3()} style={[styles.dayweekButton, { backgroundColor: Week1ButtonColor }]}><Text style={styles.dayweekButtonText}>Week</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => MonthButtonStateFC3()} style={[styles.dayweekButton, { backgroundColor: day1ButtonColor }]}><Text style={styles.dayweekButtonText}>Month</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => Year1ButtonSate3()} style={[styles.dayweekButton, { backgroundColor: yearButtonColor }]}><Text style={styles.dayweekButtonText}>Year</Text></TouchableOpacity>
                  </View>
                </View>
                <View style={{ width: '98%', flexDirection: 'row', justifyContent: 'flex-start' }}>
                  <TouchableOpacity onPress={() => { setOrderModalVisible(!OrdermodalVisible) }}
                    style={{ flexDirection: 'row', justifyContent: 'space-between', borderWidth: 1, borderBottomColor: '#000', borderColor: '#ccc', marginRight: 10, width: "48%", margin: 5 }}>
                    <Text style={{ color: '#000', padding: 10 }}> {ids.length} Checked</Text>
                    <Ionicons style={{ padding: 10 }} name={'chevron-down'} size={20} color={'#000'} />
                  </TouchableOpacity>
                  {showyear == "Month" ?
                    <TouchableOpacity onPress={() => setShowMonth(true)}
                      style={{ flexDirection: 'row', justifyContent: 'space-between', borderWidth: 1, borderBottomColor: '#000', borderColor: '#ccc', marginRight: 10, width: "48%", margin: 5 }}>
                      <Text style={{ color: '#000', padding: 12 }}>{valueUI == '' ? moment(new Date()).format('MMM') : valueUI}</Text>
                      <Ionicons style={{ padding: 12 }} name={'chevron-down'} size={20} color={'#000'} />
                    </TouchableOpacity>
                    : null}

                  {showyear == "Year" ?
                    <TouchableOpacity onPress={() => setShowYearModal(true)}
                      style={{ flexDirection: 'row', justifyContent: 'space-between', borderWidth: 1, borderBottomColor: '#000', borderColor: '#ccc', marginRight: 10, width: "48%", margin: 5 }}>
                      <Text style={{ color: '#000', padding: 12 }}>{selectedYear == '' ? moment(new Date()).format('YYYY') : selectedYear}</Text>
                      <Ionicons style={{ padding: 12 }} name={'chevron-down'} size={20} color={'#000'} />
                    </TouchableOpacity>
                    : null}
                </View>

                <View style={{ width: '100%', backgroundColor: '#ccc', height: 1 }}></View>

                {subOrderGraf2 == null && subOrderGraf2 == undefined ?
                  <Text style={styles.noDatamsgStyle}>No Records are Found.</Text>
                  :
                  <ChartView style={{ height: 200, margin: 5 }} config={conf21} options={options}></ChartView>
                }

              </View>
              : null}

            {averagePiecesPerOrder2 ?
              <View ref={viewRef9} style={styles.OrdersButtonChartContainer}>
                <View style={{ width: '100%', backgroundColor: '#ed5666', height: 1 }}></View>
                {/* weekdayButtons */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text style={{ padding: 15, fontSize: 14, color: '#000', width: '45%' }}>Average Pieces Per Order </Text>
                  <View style={{ flexDirection: 'row', paddingRight: 5 }}>
                    <TouchableOpacity onPress={() => Week1ButtonSate2()} style={[styles.dayweekButton, { backgroundColor: Week1ButtonColor }]}><Text style={styles.dayweekButtonText}>Week</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => MonthButtonStateFC2()} style={[styles.dayweekButton, { backgroundColor: day1ButtonColor }]}><Text style={styles.dayweekButtonText}>Month</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => Year1ButtonSate2()} style={[styles.dayweekButton, { backgroundColor: yearButtonColor }]}><Text style={styles.dayweekButtonText}>Year</Text></TouchableOpacity>
                  </View>
                </View>
                <View style={{ width: '98%', flexDirection: 'row', justifyContent: 'flex-start' }}>
                  <TouchableOpacity onPress={() => { setOrderModalVisible(!OrdermodalVisible) }}
                    style={{ flexDirection: 'row', justifyContent: 'space-between', borderWidth: 1, borderBottomColor: '#000', borderColor: '#ccc', marginRight: 10, width: "48%", margin: 5 }}>
                    <Text style={{ color: '#000', padding: 10 }}> {ids.length} Checked</Text>
                    <Ionicons style={{ padding: 10 }} name={'chevron-down'} size={20} color={'#000'} />
                  </TouchableOpacity>
                  {showyear == "Month" ?
                    <TouchableOpacity onPress={() => setShowMonth(true)}
                      style={{ flexDirection: 'row', justifyContent: 'space-between', borderWidth: 1, borderBottomColor: '#000', borderColor: '#ccc', marginRight: 10, width: "48%", margin: 5 }}>
                      <Text style={{ color: '#000', padding: 12 }}>{valueUI == '' ? moment(new Date()).format('MMM') : valueUI}</Text>
                      <Ionicons style={{ padding: 12 }} name={'chevron-down'} size={20} color={'#000'} />
                    </TouchableOpacity>
                    : null}

                  {showyear == "Year" ?
                    <TouchableOpacity onPress={() => setShowYearModal(true)}
                      style={{ flexDirection: 'row', justifyContent: 'space-between', borderWidth: 1, borderBottomColor: '#000', borderColor: '#ccc', marginRight: 10, width: "48%", margin: 5 }}>
                      <Text style={{ color: '#000', padding: 12 }}>{selectedYear == '' ? moment(new Date()).format('YYYY') : selectedYear}</Text>
                      <Ionicons style={{ padding: 12 }} name={'chevron-down'} size={20} color={'#000'} />
                    </TouchableOpacity>
                    : null}
                </View>
                <View style={{ width: '100%', backgroundColor: '#ccc', height: 1 }}></View>
                <ChartView style={{ height: 200, margin: 5 }} config={conf20} options={options}></ChartView>
              </View>
              : null}

            {newCount2 ?
              <View ref={viewRef10} style={styles.OrdersButtonChartContainer}>
                <View style={{ width: '100%', backgroundColor: '#ed5666', height: 1 }}></View>
                {/* weekdayButtons */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text style={{ padding: 15, fontSize: 14, color: '#000', width: '45%' }}>New Count</Text>
                  <View style={{ flexDirection: 'row', paddingRight: 5 }}>
                    <TouchableOpacity onPress={() => Week1ButtonSate4()} style={[styles.dayweekButton, { backgroundColor: Week1ButtonColor }]}><Text style={styles.dayweekButtonText}>Week</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => MonthButtonStateFC4()} style={[styles.dayweekButton, { backgroundColor: day1ButtonColor }]}><Text style={styles.dayweekButtonText}>Month</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => Year1ButtonSate4()} style={[styles.dayweekButton, { backgroundColor: yearButtonColor }]}><Text style={styles.dayweekButtonText}>Year</Text></TouchableOpacity>
                  </View>
                </View>
                <View style={{ width: '98%', flexDirection: 'row', justifyContent: 'flex-start' }}>
                  <TouchableOpacity onPress={() => { setOrderModalVisible(!OrdermodalVisible) }}
                    style={{ flexDirection: 'row', justifyContent: 'space-between', borderWidth: 1, borderBottomColor: '#000', borderColor: '#ccc', marginRight: 10, width: "48%", margin: 5 }}>
                    <Text style={{ color: '#000', padding: 10 }}> {ids.length} Checked</Text>
                    <Ionicons style={{ padding: 10 }} name={'chevron-down'} size={20} color={'#000'} />
                  </TouchableOpacity>
                  {showyear == "Month" ?
                    <TouchableOpacity onPress={() => setShowMonth(true)}
                      style={{ flexDirection: 'row', justifyContent: 'space-between', borderWidth: 1, borderBottomColor: '#000', borderColor: '#ccc', marginRight: 10, width: "48%", margin: 5 }}>
                      <Text style={{ color: '#000', padding: 12 }}>{valueUI == '' ? moment(new Date()).format('MMM') : valueUI}</Text>
                      <Ionicons style={{ padding: 12 }} name={'chevron-down'} size={20} color={'#000'} />
                    </TouchableOpacity>
                    : null}

                  {showyear == "Year" ?
                    <TouchableOpacity onPress={() => setShowYearModal(true)}
                      style={{ flexDirection: 'row', justifyContent: 'space-between', borderWidth: 1, borderBottomColor: '#000', borderColor: '#ccc', marginRight: 10, width: "48%", margin: 5 }}>
                      <Text style={{ color: '#000', padding: 12 }}>{selectedYear == '' ? moment(new Date()).format('YYYY') : selectedYear}</Text>
                      <Ionicons style={{ padding: 12 }} name={'chevron-down'} size={20} color={'#000'} />
                    </TouchableOpacity>
                    : null}
                </View>
                <View style={{ width: '100%', backgroundColor: '#ccc', height: 1 }}></View>
                <ChartView style={{ height: 200, margin: 5 }} config={conf22} options={options}></ChartView>
              </View>
              : null}
            {repeatCount2 ?
              <View ref={viewRef11} style={styles.OrdersButtonChartContainer}>
                <View style={{ width: '100%', backgroundColor: '#ed5666', height: 1 }}></View>
                {/* weekdayButtons */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text style={{ padding: 15, fontSize: 14, color: '#000', width: '45%' }}>Repeat Count</Text>
                  <View style={{ flexDirection: 'row', paddingRight: 5 }}>
                    <TouchableOpacity onPress={() => Week1ButtonSate4()} style={[styles.dayweekButton, { backgroundColor: Week1ButtonColor }]}><Text style={styles.dayweekButtonText}>Week</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => MonthButtonStateFC4()} style={[styles.dayweekButton, { backgroundColor: day1ButtonColor }]}><Text style={styles.dayweekButtonText}>Month</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => Year1ButtonSate4()} style={[styles.dayweekButton, { backgroundColor: yearButtonColor }]}><Text style={styles.dayweekButtonText}>Year</Text></TouchableOpacity>
                  </View>
                </View>
                <View style={{ width: '98%', flexDirection: 'row', justifyContent: 'flex-start' }}>
                  <TouchableOpacity onPress={() => { setOrderModalVisible(!OrdermodalVisible) }}
                    style={{ flexDirection: 'row', justifyContent: 'space-between', borderWidth: 1, borderBottomColor: '#000', borderColor: '#ccc', marginRight: 10, width: "48%", margin: 5 }}>
                    <Text style={{ color: '#000', padding: 10 }}> {ids.length} Checked</Text>
                    <Ionicons style={{ padding: 10 }} name={'chevron-down'} size={20} color={'#000'} />
                  </TouchableOpacity>
                  {showyear == "Month" ?
                    <TouchableOpacity onPress={() => setShowMonth(true)}
                      style={{ flexDirection: 'row', justifyContent: 'space-between', borderWidth: 1, borderBottomColor: '#000', borderColor: '#ccc', marginRight: 10, width: "48%", margin: 5 }}>
                      <Text style={{ color: '#000', padding: 12 }}>{valueUI == '' ? moment(new Date()).format('MMM') : valueUI}</Text>
                      <Ionicons style={{ padding: 12 }} name={'chevron-down'} size={20} color={'#000'} />
                    </TouchableOpacity>
                    : null}

                  {showyear == "Year" ?
                    <TouchableOpacity onPress={() => setShowYearModal(true)}
                      style={{ flexDirection: 'row', justifyContent: 'space-between', borderWidth: 1, borderBottomColor: '#000', borderColor: '#ccc', marginRight: 10, width: "48%", margin: 5 }}>
                      <Text style={{ color: '#000', padding: 12 }}>{selectedYear == '' ? moment(new Date()).format('YYYY') : selectedYear}</Text>
                      <Ionicons style={{ padding: 12 }} name={'chevron-down'} size={20} color={'#000'} />
                    </TouchableOpacity>
                    : null}
                </View>
                <View style={{ width: '100%', backgroundColor: '#ccc', height: 1 }}></View>
                <ChartView style={{ height: 200, margin: 5 }} config={conf23} options={options}></ChartView>
              </View>
              : null}
            {activationCount2 ?
              <View ref={viewRef12} style={styles.OrdersButtonChartContainer}>
                <View style={{ width: '100%', backgroundColor: '#ed5666', height: 1 }}></View>
                {/* weekdayButtons */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text style={{ padding: 15, fontSize: 14, color: '#000', width: '45%' }}>Activation Count</Text>
                  <View style={{ flexDirection: 'row', paddingRight: 5 }}>
                    <TouchableOpacity onPress={() => Week1ButtonSate4()} style={[styles.dayweekButton, { backgroundColor: Week1ButtonColor }]}><Text style={styles.dayweekButtonText}>Week</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => MonthButtonStateFC4()} style={[styles.dayweekButton, { backgroundColor: day1ButtonColor }]}><Text style={styles.dayweekButtonText}>Month</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => Year1ButtonSate4()} style={[styles.dayweekButton, { backgroundColor: yearButtonColor }]}><Text style={styles.dayweekButtonText}>Year</Text></TouchableOpacity>
                  </View>
                </View>
                <View style={{ width: '98%', flexDirection: 'row', justifyContent: 'flex-start' }}>
                  <TouchableOpacity onPress={() => { setOrderModalVisible(!OrdermodalVisible) }}
                    style={{ flexDirection: 'row', justifyContent: 'space-between', borderWidth: 1, borderBottomColor: '#000', borderColor: '#ccc', marginRight: 10, width: "48%", margin: 5 }}>
                    <Text style={{ color: '#000', padding: 10 }}> {ids.length} Checked</Text>
                    <Ionicons style={{ padding: 10 }} name={'chevron-down'} size={20} color={'#000'} />
                  </TouchableOpacity>
                  {showyear == "Month" ?
                    <TouchableOpacity onPress={() => setShowMonth(true)}
                      style={{ flexDirection: 'row', justifyContent: 'space-between', borderWidth: 1, borderBottomColor: '#000', borderColor: '#ccc', marginRight: 10, width: "48%", margin: 5 }}>
                      <Text style={{ color: '#000', padding: 12 }}>{valueUI == '' ? moment(new Date()).format('MMM') : valueUI}</Text>
                      <Ionicons style={{ padding: 12 }} name={'chevron-down'} size={20} color={'#000'} />
                    </TouchableOpacity>
                    : null}

                  {showyear == "Year" ?
                    <TouchableOpacity onPress={() => setShowYearModal(true)}
                      style={{ flexDirection: 'row', justifyContent: 'space-between', borderWidth: 1, borderBottomColor: '#000', borderColor: '#ccc', marginRight: 10, width: "48%", margin: 5 }}>
                      <Text style={{ color: '#000', padding: 12 }}>{selectedYear == '' ? moment(new Date()).format('YYYY') : selectedYear}</Text>
                      <Ionicons style={{ padding: 12 }} name={'chevron-down'} size={20} color={'#000'} />
                    </TouchableOpacity>
                    : null}
                </View>
                <View style={{ width: '100%', backgroundColor: '#ccc', height: 1 }}></View>
                <ChartView style={{ height: 200, margin: 5 }} config={conf24} options={options}></ChartView>
              </View>
              : null}

            {TrafficSales ?
              <View style={styles.OrdersButtonChartContainer}>
                <View style={{ width: '100%', backgroundColor: '#ed5666', height: 1 }}></View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Text style={{ padding: 15, fontSize: 14, color: '#000' }}>Traffic & Sales</Text>
                  <View style={{ flexDirection: 'row', paddingHorizontal: 10 }}>
                    <TouchableOpacity onPress={() => ButtonSate()} style={[styles.dayweekButton, { backgroundColor: dayButtonColor }]}><Text style={styles.dayweekButtonText}>Today</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => WeekButtonSate()} style={[styles.dayweekButton, { backgroundColor: WeekButtonColor }]}><Text style={styles.dayweekButtonText}>Week</Text></TouchableOpacity>
                  </View>
                </View>

                <View style={{ width: '100%', backgroundColor: '#ccc', height: 1 }}></View>

                <View style={styles.claintesContainer}>
                  <View style={styles.newClaints}>
                    <Text style={styles.ClaintsText}>New Clients Orders</Text>
                    <Text style={styles.ClaintsCountText}>{newClient}</Text>
                  </View>
                  <View style={styles.reccuringClaints}>
                    <Text style={styles.ClaintsText}>Recurring Clients Orders</Text>
                    <Text style={styles.ClaintsCountText}>{recurringClient}</Text>
                  </View>
                </View>
                {/* Progress Data bar */}
                <View style={{ backgroundColor: '#f3f3f4', margin: 10, marginBottom: 20, borderRadius: 10 }}>
                  <FlatList
                    data={trafficSalesData}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item, index }) => {
                      return (
                        <View style={{ paddingTop: 8, paddingBottom: 10 }}>

                          <Text style={{ marginBottom: 5, paddingHorizontal: 10, color: '#000' }}>{item.Day}</Text>

                          <View style={{ justifyContent: 'center', fontFamily: 'indultasemiserif_ffp', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                            <Text style={{ textAlign: 'center', color: '#000', paddingHorizontal: 10, fontWeight: '500' }}>{item.NewUser}</Text>
                            <View>

                              {percentageData.map((item, i) =>
                                <View style={{ justifyContent: 'center', marginHorizontal: 15, alignItems: 'center' }}>
                                  {index == i &&
                                    <Progress.Bar
                                      indeterminateAnimationDuration={2000}
                                      animated={true}
                                      progress={item}
                                      color='#f8cb00' width={200}
                                      backgroundColor='#347ab7'
                                      borderColor='#f3f3f4' />
                                  }
                                </View>
                              )}
                            </View>
                            <Text style={{ color: '#000', alignSelf: 'center', paddingHorizontal: 10, fontWeight: '500' }}>{item.Recurring}</Text>
                          </View>

                        </View>
                      )
                    }} />

                </View>
                {/* Source */}
                <View ref={viewRef3} style={{ backgroundColor: '#393939', width: '95%', borderRadius: 5, alignSelf: 'center', marginBottom: 10 }}>
                  <Text style={{ fontSize: 14, color: '#fff', padding: 3, marginLeft: 8 }}>Source</Text>
                  <Text style={{ fontSize: 28, color: '#fff', marginLeft: 8, padding: 3, fontWeight: '500' }}>3</Text>
                </View>

                <View style={{ margin: 10, backgroundColor: '#f3f3f4', borderRadius: 5 }}>
                  <View style={{ margin: 10, marginVertical: 10, backgroundColor: '#393939', justifyContent: 'space-between', flexDirection: 'row', borderRadius: 5 }}>
                    <Text style={{ color: '#fff', padding: 5 }}>Jockey</Text>
                    <Text style={{ color: '#fff', marginBottom: 10, padding: 5 }}>{jockeyCount} ({jockeyPC}%)</Text>
                  </View>
                  <View style={{ margin: 10, marginVertical: 10, backgroundColor: '#347ab7', justifyContent: 'space-between', flexDirection: 'row', borderRadius: 5 }}>
                    <Text style={{ color: '#fff', padding: 5 }}>Google</Text>
                    <Text style={{ color: '#fff', marginBottom: 10, padding: 5 }}>{googleCount} ({googlePC}%)</Text>
                  </View>
                  <View style={{ margin: 10, marginVertical: 10, backgroundColor: '#ed5666', justifyContent: 'space-between', flexDirection: 'row', borderRadius: 5 }}>
                    <Text style={{ color: '#fff', padding: 5 }}>Facebook</Text>
                    <Text style={{ color: '#fff', marginBottom: 10, padding: 5 }}>{faceboobkCount} ({faceboobkPC}%)</Text>
                  </View>
                </View>
                {/* Male Femail Analytics */}
                <View style={{ margin: 10, }}>
                  <Text style={{ fontSize: 16, marginBottom: 8, marginLeft: 15, color: '#000', fontWeight: '500' }}>Order Mode</Text>
                  <View style={{ margin: 10, flexDirection: 'row', alignSelf: 'center', }}>
                    <View style={{ alignItems: 'center' }}>
                      <FontAwesome name={'desktop'} size={35} color='#4444' style={{ fontWeight: '700' }} />
                      <Text style={{ color: '#347ab7', fontSize: 16, fontWeight: '500' }}>{desktopPC}%</Text>
                      <Text style={{ color: '#83868b', fontWeight: '500' }}>Desktop</Text>
                    </View>
                    <View style={{ alignSelf: 'center' }}>
                      <Progress.Bar
                        indeterminateAnimationDuration={2000}
                        animated={true} progress={deviceProgress}
                        color='#f8cb00' width={200}
                        backgroundColor='#347ab7'
                        borderColor='#f3f3f4' />
                    </View>
                    <View style={{ alignItems: 'center' }}>
                      <FontAwesome name={'mobile-phone'} size={45} color='#4444' style={{ fontWeight: '700' }} />
                      <Text style={{ color: '#f8ac5a', fontSize: 16, fontWeight: '500' }}>{mobilePC}%</Text>
                      <Text style={{ color: '#83868b', fontWeight: '500' }}>Mobile</Text>
                    </View>
                  </View>
                  {/* .................................................................... */}
                  <View style={styles.horizontalDivider}></View>
                  <Text style={{ fontSize: 16, marginBottom: 8, marginLeft: 15, marginTop: 8, color: '#000', fontWeight: '500' }}>Customer Type</Text>
                  <View style={{ margin: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ alignItems: 'center', paddingHorizontal: 10 }}>
                      <SimpleLineIcons name={'user'} size={35} color='#4444' style={{ fontWeight: '700' }} />
                      <Text style={{ color: '#347ab7', fontSize: 16, fontWeight: '500' }}>{malePC}%</Text>
                      <Text style={{ color: '#83868b', fontWeight: '500' }}>Male</Text>
                    </View>
                    <View>
                      <Progress.Bar
                        indeterminateAnimationDuration={2000}
                        animated={true} progress={genderProgress}
                        color='#f8cb00' width={200}
                        backgroundColor='#347ab7'
                        borderColor='#f3f3f4' />
                    </View>
                    <View style={{ alignItems: 'center', paddingHorizontal: 10 }}>
                      <SimpleLineIcons name={'user-female'} size={35} color='#4444' style={{ fontWeight: '700' }} />
                      <Text style={{ color: '#f8ac5a', fontSize: 16, fontWeight: '500' }}>{femalePC}%</Text>
                      <Text style={{ color: '#83868b', fontWeight: '500' }}>Female</Text>
                    </View>
                  </View>
                </View>
              </View>
              : null}



            <View style={{ marginBottom: 70 }}></View>
          </View>

        </View>

        <Modal
          transparent
          animationType="fade"
          visible={ShowMonth}
          onRequestClose={() => {
            setShowMonth(false)
          }}>
          <TouchableOpacity activeOpacity={0.1} onPress={() => setShowMonth(false)} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

            <View style={{ height: h / 3, width: w / 1.2, backgroundColor: '#fff' }}>
              <FlatList
                data={data}
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity onPress={() => { onChangeSS(item) }} style={{ padding: 12 }}>
                      <Text style={{ color: '#000', fontSize: 16 }}>{item.month}</Text>
                    </TouchableOpacity>
                  )
                }}
                keyExtractor={(item, index) => index}
              />
            </View>
          </TouchableOpacity></Modal>

        <Modal
          transparent
          animationType="fade"
          visible={ShowYearModal}
          onRequestClose={() => {
            setShowYearModal(false)
          }}>
          <TouchableOpacity activeOpacity={0.1} onPress={() => setShowYearModal(false)} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

            <View style={{ height: h / 3, width: w / 1.2, backgroundColor: '#fff' }}>
              <FlatList
                data={YearData}
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity onPress={() => { onChangeYear(item) }} style={{ padding: 12 }}>
                      <Text style={{ color: '#000', fontSize: 16 }}>{item}</Text>
                    </TouchableOpacity>
                  )
                }}
                keyExtractor={(item, index) => index}
              />
            </View>
          </TouchableOpacity></Modal>
      </View>
    </View>
  )
}

JockeyDashBoard.defaultProps = {
  placeholder: 'Select date',
};

export default JockeyDashBoard

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#fff', width: w, height: h / 14, flexDirection: 'row',
    alignItems: 'center', elevation: 10
  },
  Divider: {
    backgroundColor: '#ccc', height: '100%', width: 1
  },
  horizontalDivider: {
    backgroundColor: '#ccc', height: 1, width: '100%'
  },
  menubuttonContainer: {
    margin: 15, flexDirection: 'row', height: 38
  },
  dashboardText: {
    fontSize: 24, alignSelf: 'center',
    paddingHorizontal: 8, color: '#000'
  },
  iconContainer: {
    justifyContent: "center", alignItems: 'center', backgroundColor: "#426295",
  },
  ScoreCardHeader1: { textAlign: 'center', color: '#FFFFFF', fontSize: 14, fontWeight: '500' },
  ValueText1: {
    textAlign: 'center', color: '#FFFFFF', fontSize: 20, fontWeight: '500'
  },
  ScoreCardHeader: { width: '50%', textAlign: 'center', padding: 8, color: '#1BB394', fontSize: 14, elevation: 10 },
  ValueText: {
    width: '50%', textAlign: 'center', padding: 8, color: '#1BB394', fontSize: 20
  },
  SearchFilterContainer: {
    backgroundColor: '#fff', margin: 15, elevation: 5, elevation: 10
  },
  centeredView: {
    flex: 1, justifyContent: "center", alignItems: "center", elevation: 10, backgroundColor: 'rgba(52, 52, 52, 0.8)'
  },
  modalView: { width: '90%', backgroundColor: '#fff', elevation: 10, borderRadius: 5 },
  button: {
    borderRadius: 20, padding: 10, elevation: 2
  },
  Submitbutton: {
    backgroundColor: '#1bb394', padding: 12, textAlign: 'center', fontSize: 16, color: '#fff'
  },
  footer: {
    backgroundColor: '#fff', flexDirection: 'row', elevation: 10,
    justifyContent: 'space-around', position: 'absolute', bottom: 0, width: '100%', alignSelf: 'center', paddingHorizontal: 10
  },
  chartsContainer: {
    backgroundColor: '#fff', margin: 15, elevation: 5,
  },
  OrdersButtonChartContainer: {
    backgroundColor: '#fff', margin: 15, elevation: 5

  },
  claintesContainer: {
    flexDirection: 'row', padding: 10, justifyContent: 'space-between'
  },
  newClaints: {
    backgroundColor: '#f8cb00', alignItems: 'flex-start', paddingHorizontal: 10, borderRadius: 5, width: '45%'
  },
  reccuringClaints: {
    backgroundColor: '#347ab7', alignItems: 'flex-start', paddingHorizontal: 10, borderRadius: 5, width: '45%'
  },
  ClaintsText: {
    fontSize: 14, padding: 5, color: '#fff',
  },
  ClaintsCountText: {
    fontSize: 28, padding: 5, color: '#fff', fontWeight: '700'
  },

  dayweekButtonText: {
    alignSelf: 'center', padding: 5, borderWidth: 1, borderColor: '#ccc', color: '#000'
  },
  progresbarsData: {
    backgroundColor: '#ccc', padding: 10
  }, confirmButton: {
    borderWidth: 0.5,
    padding: 15,
    margin: 10,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1bb394'
  },
  bottomDatePickerContainer: {
    flex: 1, justifyContent: "center", alignItems: "center", elevation: 10,
  }, DatePickercontent: {
    width: '95%', backgroundColor: '#fff', elevation: 5, borderColor: '#000', borderWidth: 0.6
  },
  noDatamsgStyle: {
    color: 'red', fontSize: 18, alignSelf: 'center', paddingVertical: 25, fontWeight: '700', elevation: 10
  },
  checkallbtttn: {
    color: 'gray', fontWeight: '500'
  },
  topcards: { width: '48%', backgroundColor: '#1BB394', padding: 8, borderRadius: 4 }

})