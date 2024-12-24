import { KeyboardAvoidingView, Dimensions, FlatList, Image, Modal, SafeAreaView, TextInput, StyleSheet, BackHandler, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react';
import AntDesign from "react-native-vector-icons/AntDesign";
import Content from '../Components/Content';
import Feather from 'react-native-vector-icons/Feather';
import BottomTab from './BottomTab';
import { AnimatedGaugeProgress, GaugeProgress } from 'react-native-simple-gauge';
import Button from '../Components/Button';
import DisableButton from '../Components/DisableButton';
import api from '../helper/helperModule1';
import Path from '../helper/Api';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import StepsHeader from '../Components/StepsHeader';
import ExitConfirmationModal from '../Components/ExitConfirmationModal';
import ErrorImg from '../assets/ErrorImg.svg';

const w = Dimensions.get('screen').width;
const h = Dimensions.get('screen').height;
const Vi_Step2 = ({ navigation, route }) => {

    const [vehicleprice, setVehicleprice] = useState("");
    const [ownerTypeId, setOwnertypeId] = useState('');
    const [vehicleregnum, setVehicleregnum] = useState("");
    const [fame2subsidy, setFame2subsidy] = useState("0");
    const [insurancecost, setInsurancecost] = useState("0");
    const [regcost, setRegcost] = useState("0");
    const [odometer, setOdometer] = useState("");
    const [errVehiclePrice, setErrVehiclePrice] = useState("");
    const [errVehicleregnum, setErrVehicleregnum] = useState("");
    const [errFame2subsidy, setErrFame2subsidy] = useState("");
    const [errInsurancecost, setErrInsurancecost] = useState("");
    const [errRegcost, setErrRegcost] = useState("");
    const [errOdometer, setErrOdometer] = useState("");
    const [loader, setLoader] = useState(false);
    const [fields, setFields] = useState([])
    const [openFrom, setOpenFrom] = useState(false);
    const [fromDate, setFromDate] = useState('DD/MM/YYYY');
    const [ownerData, setOwnerData] = useState([]);
    const [successMessage, setSuccessMessage] = useState("")
    const [Errmessage, setErrmessage] = useState("");
    const [gagueData, setGagueData] = useState([]);
    const [exitModal, setExitModal] = useState(false);
    const [navigationScreen, setNavigationScreen] = useState("");
    const [displaydate, setDisplaydate] = useState(new Date(new Date().setMonth(new Date().getMonth() - 1)))
    const [errorModelForInvalidDealer, setErrorModelForInvalidDealer] = useState(false);
    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButtonPress);
        return () => backHandler.remove();
    }, []);
    const handleBackButtonPress = () => {
        setNavigationScreen("Vi_Step1")
        setExitModal(true)
        return true;
    };


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            GagueData()
            GetFieldsData();
            GetOwnerData();
            GetVehicelData()
        });
        return () => unsubscribe;
    }, [])
    const GagueData = async () => {
        let StepId = await AsyncStorage.getItem('VIStepId')
        if (StepId == 2.2) {
            setGagueData([{ id: 1, fill: 16.67 }, { id: 2, fill: 0 }, { id: 3, fill: 0 }, { id: 4, fill: 0 }, { id: 5, fill: 0 }, { id: 6, fill: 0 },])
        } else if (StepId == 2.3) {
            setGagueData([{ id: 1, fill: 16.67 }, { id: 2, fill: 16.67 * 2 }, { id: 3, fill: 0 }, { id: 4, fill: 0 }, { id: 5, fill: 0 }, { id: 6, fill: 0 },])
        } else if (StepId == 2.4) {
            setGagueData([{ id: 1, fill: 16.67 }, { id: 2, fill: 16.67 * 2 }, { id: 3, fill: 16.67 * 3 }, { id: 4, fill: 0 }, { id: 5, fill: 0 }, { id: 6, fill: 0 },])
        } else if (StepId == 2.5) {
            setGagueData([{ id: 1, fill: 16.67 }, { id: 2, fill: 16.67 * 2 }, { id: 3, fill: 16.67 * 3 }, { id: 4, fill: 16.67 * 4 }, { id: 5, fill: 0 }, { id: 6, fill: 0 },])
        } else if (StepId == 2.6) {
            setGagueData([{ id: 1, fill: 16.67 }, { id: 2, fill: 16.67 * 2 }, { id: 3, fill: 16.67 * 3 }, { id: 4, fill: 16.67 * 4 }, { id: 5, fill: 16.67 * 5 }, { id: 6, fill: 0 },])
        } else if (StepId == 2.7) {
            setGagueData([{ id: 1, fill: 16.67 }, { id: 2, fill: 16.67 * 2 }, { id: 3, fill: 16.67 * 3 }, { id: 4, fill: 16.67 * 4 }, { id: 5, fill: 16.67 * 5 }, { id: 6, fill: 16.67 * 6 },])
        } else {
            setGagueData([{ id: 1, fill: 0 }, { id: 2, fill: 0 }, { id: 3, fill: 0 }, { id: 4, fill: 0 }, { id: 5, fill: 0 }, { id: 6, fill: 0 },])
        }

    }
    const GetVehicelData = async () => {
        let token = await AsyncStorage.getItem('CustomerToken')
        let InspectionId = await AsyncStorage.getItem('InspectionId')

        let headersList = {
            "Accept": "*/*",
            "Authorization": 'Bearer ' + token,
            "Content-Type": "application/json"
        }

        let newRequest = {
            "VehicleInspectionId": InspectionId,
            "StepId": "2.2"
        }
        console.log('InspectionId', InspectionId);
        let reqOptions = {
            url: Path.baseURL + Path.GetVehicleDetailsByVehicleInspectionId,
            method: "POST",
            headers: headersList,
            data: newRequest,
        }
        axios.request(reqOptions).then((response) => {
            console.log('response.dataFayaz', response.data);
            if (response != undefined && response != null) {
                if (response.data.ReturnCode == 0) {
                    if (response.data.Data != undefined && response.data.Data != null) {
                        let GetData = response.data.Data[0]
                        setVehicleprice(GetData.VehiclePrice.toString());
                        setVehicleregnum(GetData.VehicleRegistrationNo);
                        setFame2subsidy(GetData.FAMEIISubsidy.toString());
                        setInsurancecost(GetData.InsuranceCost.toString());
                        setRegcost(GetData.RegistrationCost.toString());
                        setFromDate(GetData.DateOfPurchase ? moment(new Date(GetData.DateOfPurchase)).format('DD/MM/YYYY') : moment(new Date()).format('DD/MM/YYYY'));
                        setOdometer(GetData.OdometerReading.toString());
                        setOwnertypeId(GetData.OwnerTypeId);
                        if (!response.data.Data[0].OwnerTypeId) {
                            GetOwnerData();
                        }
                        setLoader(false)
                    }
                } else if (response.data.ReturnCode == 72) {
                    setErrmessage(response.data.ReturnMessage)
                    setTimeout(() => {
                        setErrmessage("")
                    }, 3000);
                    setLoader(false)
                } else if (response.data.ReturnCode == 69) {
                    setErrmessage(response.data.ReturnMessage)
                    setTimeout(() => {
                        setErrmessage("")
                    }, 3000);
                    setLoader(false)
                }
                else if (response.data.ReturnCode == 65) {
                    setErrmessage(response.data.ReturnMessage)
                    setTimeout(() => {
                        setErrmessage("")
                    }, 3000);
                    setLoader(false)
                }
                else if (response.data.ReturnCode == 70) {
                    setErrmessage(response.data.ReturnMessage)
                    setTimeout(() => {
                        setErrmessage("")
                    }, 3000);
                    setLoader(false)
                }
                else if (response.data.ReturnCode == 67) {
                    setErrmessage(response.data.ReturnMessage)
                    setTimeout(() => {
                        setErrmessage("")
                    }, 3000);
                    setLoader(false)
                } else if (response.data.ReturnCode == 63) {
                    setLoader(false)
                    setErrmessage(response.data.ReturnMessage)
                    setTimeout(() => {
                        setErrmessage("")
                    }, 3000);

                } else if (response.data.ReturnCode == 59) {
                    setLoader(false)
                    setErrmessage(response.data.ReturnMessage)
                    setTimeout(() => {
                        setErrmessage("")
                    }, 3000);
                    let keys = AsyncStorage.getAllKeys()
                    AsyncStorage.multiRemove(keys)
                    navigation.navigate("Splash")
                } else {
                    setLoader(false)
                    setErrmessage(response.data.ReturnMessage)
                    setTimeout(() => {
                        setErrmessage("")
                    }, 3000);
                }
            } else {
                setLoader(false)
            }
        });
    }
    const GetFieldsData = async () => {
        setLoader(true);
        let Request = {
            "MasterDataCode": "VehicleInspectionCheckList"
        }
        api.postData(Path.GetMasters, Request).then((response) => {
            if (response.data != "" && response.data != null && response.data != undefined) {
                if (response.data.Data != "" && response.data.Data != null && response.data.Data != undefined) {
                    const result = response.data.Data.filter((word) => word.PageNo == 2);
                    setFields(result)
                    setLoader(false);
                } else {
                    if (response.data.ReturnCode == 30) {
                        // Logout();
                    }
                    setLoader(false);
                }
            } else {
                if (response.data.ReturnCode == 30) {
                    // Logout();
                }
                setLoader(false);
            }
        });
    }
    const GetOwnerData = () => {
        setLoader(true);
        let Request = {
            "MasterDataCode": "OwnerType"
        }

        api.postData(Path.GetMasters, Request).then((response) => {
            if (response.data != "" && response.data != null && response.data != undefined) {
                if (response.data.Data != "" && response.data.Data != null && response.data.Data != undefined) {
                    setOwnerData(response.data.Data)
                    setOwnertypeId(response.data.Data[0].Id)
                    setLoader(false);
                } else {
                    if (response.data.ReturnCode == 30) {
                        Logout();
                    } else if (response.data.ReturnCode == 31) {
                        Logout();
                    }
                    setLoader(false);
                }
            } else {
                setLoader(false);
            }
        });
    }
    const OnSubmit = () => {
        if (!errVehiclePrice && !errVehicleregnum && !errFame2subsidy && !errInsurancecost && !errRegcost && !errOdometer
        ) {
            SaveDetails()
        }
    }
    const SaveDetails = async (item) => {
        setLoader(true)
        let StepId = await AsyncStorage.getItem('VIStepId')
        let token = await AsyncStorage.getItem('CustomerToken')
        let InspectionId = await AsyncStorage.getItem('InspectionId')
        let headersList = {
            "Accept": "*/*",
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }

        let newRequest = {
            "VehicleInspectionId": InspectionId,
            "VehiclePrice": vehicleprice.toString(),
            "OwnerTypeId": ownerTypeId,
            "VehicleRegistrationNo": vehicleregnum,
            "SubsidyAmount": fame2subsidy.toString(),
            "PageNumber": "2",
            "InsuranceCost": insurancecost.toString(),
            "RegistrationCost": regcost.toString(),
            "DateOfPurchase": fromDate.toString(),
            "StepId": "2.3",
            "OdometerReading": odometer.toString()

        }
        let reqOptions = {
            url: Path.baseURL + Path.SaveVehicleInspection,
            method: "POST",
            headers: headersList,
            data: newRequest,
        }
        axios.request(reqOptions).then((response) => {
            if (response != undefined && response != null) {
                if (response.data.ReturnCode == 0) {
                    setLoader(false)
                    AsyncStorage.setItem('VIStepId', StepId > '2.3' ? StepId : '2.3')
                    setSuccessMessage("Step 2 Inspection Details Saved Successfully!")
                    setTimeout(() => {
                        setSuccessMessage("")
                        navigation.navigate('Vi_Step3')
                    }, 2000);
                } else if (response.data.ReturnCode == 72) {
                    setErrmessage(response.data.ReturnMessage)
                    setTimeout(() => {
                        setErrmessage("")
                    }, 3000);
                    setLoader(false)
                } else if (response.data.ReturnCode == 69) {
                    setErrmessage(response.data.ReturnMessage)
                    setTimeout(() => {
                        setErrmessage("")
                    }, 3000);
                    setLoader(false)
                }
                else if (response.data.ReturnCode == 65) {
                    setErrmessage(response.data.ReturnMessage)
                    setTimeout(() => {
                        setErrmessage("")
                    }, 3000);
                    setLoader(false)
                }
                else if (response.data.ReturnCode == 70) {
                    setErrmessage(response.data.ReturnMessage)
                    setTimeout(() => {
                        setErrmessage("")
                    }, 3000);
                    setLoader(false)
                }
                else if (response.data.ReturnCode == 67) {
                    setErrmessage(response.data.ReturnMessage)
                    setTimeout(() => {
                        setErrmessage("")
                    }, 3000);
                    setLoader(false)
                } else if (response.data.ReturnCode == 63) {
                    setLoader(false)
                    setErrmessage(response.data.ReturnMessage)
                    setTimeout(() => {
                        setErrmessage("")
                    }, 3000);

                } else if (response.data.ReturnCode == 54) {
                    setLoader(false)
                    setErrorModelForInvalidDealer(true)

                } else if (response.data.ReturnCode == 59) {
                    setLoader(false)
                    setErrmessage(response.data.ReturnMessage)
                    setTimeout(() => {
                        setErrmessage("")
                    }, 3000);
                    let keys = AsyncStorage.getAllKeys()
                    AsyncStorage.multiRemove(keys)
                    navigation.navigate("Splash")
                } else {
                    setLoader(false)
                    setErrmessage(response.data.ReturnMessage)
                    setTimeout(() => {
                        setErrmessage("")
                    }, 3000);
                }
            } else {
                setLoader(false)
            }
        }).catch((err) => {
            console.log(err);
        });

    }

    const validateAll = (item) => {
        let regexPurchasePrice = /^\d{0,8}(\.\d{1,4})?$/
        console.log(vehicleprice);
        if (item.VehicleInspectionCheckListCode == "VP") {
            if (vehicleprice == '' || vehicleprice == null) {
                setErrVehiclePrice('Enter Vehicle Price.');
            } else if (vehicleprice == '0' || vehicleprice == '00' || !regexPurchasePrice.test(vehicleprice)) {
                setErrVehiclePrice('Invalid Vehicle Price.');
            } else {
                setErrVehiclePrice("");
                return true;
            }
        } else if (item.VehicleInspectionCheckListCode == "VRN") {
            if (vehicleregnum == '' || vehicleregnum == null) {
                setErrVehicleregnum('Enter Vehicle Registration Number.');
            } else if (!/^[A-Z]{2}\d{1,2}[A-Z]{1,2}\d{4}$/.test(vehicleregnum)) {
                setErrVehicleregnum('Invalid Vehicle Registration Number.');
            } else {
                setErrVehicleregnum("");
                return true;
            }
        } else if (item.VehicleInspectionCheckListCode == "FAMEIIS") {
            if (fame2subsidy == '' || fame2subsidy == null) {
                setErrFame2subsidy('Enter FAME II Subsidy(₹).');
            } else if (!regexPurchasePrice.test(fame2subsidy)) {
                setErrFame2subsidy('Invalid FAME II Subsidy(₹).');
            } else {
                setErrFame2subsidy("");
                return true;
            }
        } else if (item.VehicleInspectionCheckListCode == "IC") {
            if (insurancecost == '' || insurancecost == null) {
                setErrInsurancecost('Enter Insurance Cost(₹).');
            } else if (!regexPurchasePrice.test(insurancecost)) {
                setErrInsurancecost('Invalid Insurance Cost(₹).');
            } else {
                setErrInsurancecost("");
                return true;
            }
        } else if (item.VehicleInspectionCheckListCode == "RS") {
            if (regcost == '' || regcost == null) {
                setErrRegcost('Enter Registration Cost(₹).');
            } else if (!regexPurchasePrice.test(regcost)) {
                setErrRegcost('Invalid Registration Cost(₹).');
            } else {
                setErrRegcost("");
                return true;
            }
        } else if (item.VehicleInspectionCheckListCode == "ODMRDG") {
            if (odometer == '' || odometer == null) {
                setErrOdometer('Enter Odometer Reading.');
            } else if (!regexPurchasePrice.test(odometer)) {
                setErrOdometer('Invalid Odometer Reading.');
            } else {
                setErrOdometer("");
                return true;
            }
        }

    }
    const onFromDate = (dateFrom) => {
        setOpenFrom(false);
        let DateFromSelect = moment(dateFrom).format('DD/MM/YYYY');
        setFromDate(DateFromSelect);
        setDisplaydate(dateFrom)
    };
    const handleDataFromChild = (data) => {
        if (vehicleprice != "" || vehicleregnum != "" || fame2subsidy != "" || insurancecost != "" || regcost != "" || odometer != "" || fromDate != 'DD/MM/YYYY') {
            setNavigationScreen(data)
            setExitModal(true)
        } else {
            navigation.navigate(data)
        }

    };
    const handleChildModalSate = (data) => {
        setExitModal(data)
    };
    const handleRequestToNavigate = (data) => {
        setExitModal(false)
        navigation.navigate(data)

    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <StepsHeader ScreenName="Vi_Step1" navigation={navigation} data={gagueData} isDataFilled={vehicleprice != "" || vehicleregnum != "" || fame2subsidy != "" || insurancecost != "" || regcost != "" || odometer != "" || fromDate != 'DD/MM/YYYY'} />
            <ExitConfirmationModal navigation={navigation}
                exitModal={exitModal}
                sendModalState={handleChildModalSate}
                navigationScreen={navigationScreen}
                sendRequestTonavigate={handleRequestToNavigate} />

            <Modal
                animationType="fade"
                transparent={true}
                visible={errorModelForInvalidDealer}
            //onRequestClose={() => setErrorModel(false)}
            >
                <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', }}>
                    <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, alignItems: 'center', width: w - 50, marginTop: h / 11 }}>
                        <ErrorImg height={h / 4} width={w / 1.4} />
                        <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 10, color: '#F27677', fontFamily: 'Inter-Bold' }}>Error!</Text>
                        <Text testID='lblsessionErrMsg' style={{ fontSize: 16, color: '#181818', textAlign: 'center', fontFamily: 'Poppins-Regular' }}>Session expired</Text>
                        <Text style={{ fontSize: 16, color: '#181818', textAlign: 'center', fontFamily: 'Poppins-Regular' }}>Please login again to continue.</Text>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => { setErrorModelForInvalidDealer(false), navigation.navigate('Login') }}
                            style={{ backgroundColor: '#F27677', margin: 20, borderRadius: 6 }}>
                            <Text testID='btnlogin' style={{ paddingVertical: 10, paddingHorizontal: 20, color: '#FFFFFF', fontFamily: 'Poppins-Regular' }}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* <View style={{
                borderBottomColor: '#3C30511A',
                borderBottomWidth: 1,
            }}>
                <View style={styles.row}>
                    <TouchableOpacity onPress={() => navigation.navigate('Vi_Step1')} style={{
                        alignItems: 'center', justifyContent: 'center',
                        marginHorizontal: 10,
                    }}>
                        <AntDesign
                            name={'arrowleft'}
                            size={24}
                            color={'#72807B'}
                            style={{ padding: 5 }}
                        />
                    </TouchableOpacity>
                    <FlatList
                        data={gagueData}
                        extraData={gagueData}
                        numColumns={6}
                        key={6}
                        renderItem={({ item, index }) => {
                            return (
                                <View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                            <AnimatedGaugeProgress
                                                size={40}
                                                width={4}
                                                fill={item.fill}
                                                rotation={270}
                                                cropDegree={0}
                                                tintColor="#2274B4"
                                                delay={5}
                                                backgroundColor="#D4ECFF"
                                                stroke={[2, 2]} //For a equaly dashed line
                                                strokeCap="circle"
                                            />
                                            <Text style={{ position: 'absolute', color: '#8A99A3', fontSize: 16 }}>{item.id}</Text>
                                        </View>
                                        {index !== 5 ? (
                                            <View style={{ width: w / 28, borderColor: '#D6D6D6', borderTopWidth: 1.2, borderStyle: 'dotted' }} />
                                        ) : (null)}
                                    </View>
                                    <Text style={{ fontSize: 14, color: '#8A99A3', fontFamily: 'Inter-Medium', marginLeft: 4 }}>Step</Text>
                                </View>
                            )
                        }}

                        keyExtractor={(item) => item.id}
                    />


                </View>
            </View> */}
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                >
                    <FlatList
                        style={{ marginHorizontal: 15, marginBottom: 120 }}
                        data={fields}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, index }) => {
                            return (
                                item.ControlTypeName == "textRight" ?
                                    <>
                                        <View style={styles.maincard}>
                                            <View style={styles.cardview}>
                                                <View style={styles.leftborder}></View>
                                                <Text style={styles.cardtitle}>{item.VehicleInspectionCheckListName}*</Text>
                                                <TextInput
                                                    caretHidden={false}
                                                    placeholder={item.PlaceHolder}
                                                    style={styles.textinput}
                                                    testID='txtitemplaceholder'
                                                    placeholderTextColor={"#4D4D4D"}
                                                    keyboardType={item.VehicleInspectionCheckListCode == "ODMRDG" ? "number-pad" : item.KeyboardType}
                                                    value={item.VehicleInspectionCheckListCode == "VP" ? Number(vehicleprice).toLocaleString() : item.VehicleInspectionCheckListCode == "VRN" ? vehicleregnum : item.VehicleInspectionCheckListCode == "FAMEIIS" ? Number(fame2subsidy).toLocaleString() : item.VehicleInspectionCheckListCode == "IC" ? Number(insurancecost).toLocaleString() : item.VehicleInspectionCheckListCode == "RS" ? Number(regcost).toLocaleString() : item.VehicleInspectionCheckListCode == "ODMRDG" ? odometer : ""}
                                                    //value={item.VehicleInspectionCheckListValue != undefined ? item.VehicleInspectionCheckListValue : ""}
                                                    onChangeText={(txt) => {
                                                        if (item.VehicleInspectionCheckListCode == "VP") {
                                                            setVehicleprice(txt?.replaceAll(',', ''))
                                                        } else if (item.VehicleInspectionCheckListCode == "VRN") {
                                                            setVehicleregnum(txt.toUpperCase())
                                                        } else if (item.VehicleInspectionCheckListCode == "FAMEIIS") {
                                                            setFame2subsidy(txt?.replaceAll(',', ''))
                                                        } else if (item.VehicleInspectionCheckListCode == "IC") {
                                                            setInsurancecost(txt?.replaceAll(',', ''))
                                                        } else if (item.VehicleInspectionCheckListCode == "RS") {
                                                            setRegcost(txt?.replaceAll(',', ''))
                                                        } else if (item.VehicleInspectionCheckListCode == "ODMRDG") {
                                                            setOdometer(txt)
                                                        } else {
                                                            console.log(txt)
                                                        }

                                                    }}
                                                    onBlur={() => {
                                                        validateAll(item)
                                                    }}
                                                    inputMode={item.VehicleInspectionCheckListCode == "VRN" ? 'email' : item.VehicleInspectionCheckListCode == "ODMRDG" ? 'numeric' : 'numeric'}
                                                    maxLength={item.Length == 8 ? 10 : item.Length}
                                                />
                                            </View>
                                        </View>
                                        {errVehiclePrice && item.VehicleInspectionCheckListCode == "VP" ?
                                            <View style={styles.errorstyle}>
                                                <View style={styles.errMsg}>
                                                    <Feather name={'x'} size={10} color={'#FFFF'} />
                                                </View>
                                                <Text testID='lblErrMsg' style={{ fontSize: 11, color: '#9F0404', width: '80%', fontFamily: 'Poppins-Regular' }}>{errVehiclePrice}</Text>
                                            </View>
                                            :
                                            null
                                        }
                                        {errVehicleregnum && item.VehicleInspectionCheckListCode == "VRN" ?
                                            <View style={styles.errorstyle}>
                                                <View style={styles.errMsg}>
                                                    <Feather name={'x'} size={10} color={'#FFFF'} />
                                                </View>
                                                <Text testID='lblErrMsg' style={{ fontSize: 11, color: '#9F0404', width: '80%', fontFamily: 'Poppins-Regular' }}>{errVehicleregnum}</Text>
                                            </View>
                                            :
                                            null
                                        }
                                        {errFame2subsidy && item.VehicleInspectionCheckListCode == "FAMEIIS" ?
                                            <View style={styles.errorstyle}>
                                                <View style={styles.errMsg}>
                                                    <Feather name={'x'} size={10} color={'#FFFF'} />
                                                </View>
                                                <Text testID='lblErrMsg' style={{ fontSize: 11, color: '#9F0404', width: '80%', fontFamily: 'Poppins-Regular' }}>{errFame2subsidy}</Text>
                                            </View>
                                            :
                                            null
                                        }
                                        {errInsurancecost && item.VehicleInspectionCheckListCode == "IC" ?
                                            <View style={styles.errorstyle}>
                                                <View style={styles.errMsg}>
                                                    <Feather name={'x'} size={10} color={'#FFFF'} />
                                                </View>
                                                <Text testID='lblErrMsg' style={{ fontSize: 11, color: '#9F0404', width: '80%', fontFamily: 'Poppins-Regular' }}>{errInsurancecost}</Text>
                                            </View>
                                            :
                                            null
                                        }
                                        {errRegcost && item.VehicleInspectionCheckListCode == "RS" ?
                                            <View style={styles.errorstyle}>
                                                <View style={styles.errMsg}>
                                                    <Feather name={'x'} size={10} color={'#FFFF'} />
                                                </View>
                                                <Text testID='lblErrMsg' style={{ fontSize: 11, color: '#9F0404', width: '80%', fontFamily: 'Poppins-Regular' }}>{errRegcost}</Text>
                                            </View>
                                            :
                                            null
                                        }
                                        {errOdometer && item.VehicleInspectionCheckListCode == "ODMRDG" ?
                                            <View style={styles.errorstyle}>
                                                <View style={styles.errMsg}>
                                                    <Feather name={'x'} size={10} color={'#FFFF'} />
                                                </View>
                                                <Text testID='lblErrMsg' style={{ fontSize: 11, color: '#9F0404', width: '80%', fontFamily: 'Poppins-Regular' }}>{errOdometer}</Text>
                                            </View>
                                            :
                                            null
                                        }
                                    </>
                                    :
                                    item.ControlTypeName == "radiobuttonlist" ?
                                        <>
                                            <View style={styles.maincard}>
                                                <View style={styles.cardview}>
                                                    <View style={styles.leftborder}></View>
                                                    <FlatList
                                                        data={ownerData}
                                                        numColumns={3}
                                                        key={3}
                                                        showsVerticalScrollIndicator={false}
                                                        renderItem={({ item, index }) => {
                                                            return (
                                                                <TouchableOpacity onPress={() => { setOwnertypeId(item.Id) }} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 18, paddingLeft: 12 }}>
                                                                    <View style={{ borderColor: '#ACB5B4', borderWidth: ownerTypeId == item.Id ? 0 : 2, height: 20, width: 20, alignItems: 'center', borderRadius: 4, marginRight: 8, backgroundColor: ownerTypeId == item.Id ? '#00BB56' : '#fff', alignItems: 'center', justifyContent: 'center' }}>
                                                                        {ownerTypeId == item.Id ?
                                                                            <AntDesign
                                                                                name={'check'}
                                                                                color={'#fff'}
                                                                                size={15}
                                                                            />
                                                                            : null}
                                                                    </View>
                                                                    <Text testID='btnlistitem' style={styles.ownertxt}>
                                                                        {item.Name}
                                                                    </Text>
                                                                </TouchableOpacity>
                                                            )
                                                        }}
                                                    />
                                                </View>
                                            </View>
                                        </>
                                        :
                                        item.ControlTypeName == "date" ?
                                            <>
                                                <View style={styles.maincard}>
                                                    <Text style={[styles.cardtitle, { width: w, paddingLeft: 0 }]}>{item.VehicleInspectionCheckListName}*</Text>
                                                    <View style={styles.cardview}>
                                                        <View style={styles.leftborder}></View>
                                                        <TouchableOpacity
                                                            activeOpacity={1}
                                                            testID={'btnFromDate'}
                                                            onPress={() => setOpenFrom(true)} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 1 }}>
                                                            <TextInput
                                                                caretHidden={false}
                                                                style={{
                                                                    fontFamily: "Poppins-Regular",
                                                                    fontSize: 14,
                                                                    paddingLeft: 15,
                                                                    marginVertical: 8
                                                                }}
                                                                value={fromDate}
                                                                color='#777B7E'
                                                                onChangeText={newText => setFromDate(newText)}
                                                                editable={false}
                                                                testID='txtfromdate'
                                                            />
                                                            <Ionicons name='calendar-clear-outline' color={'#000000'} size={28} style={{ paddingRight: 20 }} />
                                                        </TouchableOpacity>
                                                        <DatePicker
                                                            modal
                                                            mode='date'
                                                            minimumDate={new Date(new Date().setFullYear(new Date().getFullYear() - 5))}
                                                            maximumDate={new Date(new Date().setMonth(new Date().getMonth() - 1))}
                                                            title={"Select From Date"}
                                                            open={openFrom}
                                                            date={displaydate}
                                                            //date={new Date(new Date().setMonth(new Date().getMonth() - 1))}
                                                            onConfirm={onFromDate}
                                                            onCancel={() => {
                                                                setOpenFrom(false)
                                                            }}
                                                        />
                                                    </View>
                                                </View>
                                            </>
                                            :
                                            null
                            )
                        }}
                        ListFooterComponent={({ item, index }) => {
                            return (
                                <View style={{ marginBottom: 30 }} />
                            )
                        }}
                    />
                </ScrollView>
            </KeyboardAvoidingView>

            <View style={{ position: 'absolute', bottom: 0, width: w, zIndex: 1, backgroundColor: '#fff' }}>
                {vehicleprice && vehicleregnum && fame2subsidy && insurancecost && regcost && fromDate && odometer && !errVehiclePrice && !errVehicleregnum && !errFame2subsidy && !errInsurancecost && !errRegcost && !errOdometer ?
                    <TouchableOpacity
                        onPress={() => OnSubmit()}
                        disabled={false}
                        activeOpacity={0.8} style={{ marginHorizontal: 20, marginVertical: 12 }} >
                        <Button title={'Save & Continue'} />
                    </TouchableOpacity>
                    :
                    < TouchableOpacity
                        disabled={true}
                        activeOpacity={1} style={{ marginHorizontal: 20, marginVertical: 12 }} >
                        <DisableButton title={'Save & Continue'} />
                    </TouchableOpacity>
                }
                <BottomTab navigation={navigation} sendDataToParent={handleDataFromChild} />
            </View>
            {successMessage != "" ?
                <View style={{ margin: 20, zIndex: 2, flexDirection: 'row', borderRadius: 6, backgroundColor: '#00BB56', alignItems: 'center', position: 'absolute', bottom: 0, width: '90%' }}>
                    <View style={{ backgroundColor: '#007234', alignItems: 'center', justifyContent: 'center', borderRadius: 50, width: 25, height: 25, marginLeft: 10, marginVertical: 15 }}>
                        <AntDesign
                            name={'doubleright'}
                            size={10}
                            color={'#FFFF'}
                            style={{ padding: 5 }}
                        />
                    </View>
                    <Text testID='lblsuccessMsg' numberOfLines={2} style={{ fontSize: 12, marginLeft: 10, color: '#FFFFFF', paddingVertical: 10, fontFamily: 'Poppins-Regular' }}>{successMessage}</Text>
                </View>
                :
                null
            }
            {Errmessage != "" ?
                <View style={{ marginHorizontal: 25, marginBottom: 10, zIndex: 1, flexDirection: 'row', borderRadius: 6, backgroundColor: '#C50000', alignItems: 'center', position: 'absolute', bottom: 0, width: '95%', alignSelf: 'center' }}>
                    <View style={{ backgroundColor: '#9F0404', alignItems: 'center', justifyContent: 'center', borderRadius: 50, width: 25, height: 25, marginLeft: 10, marginVertical: 15 }}>
                        <AntDesign
                            name={'doubleright'}
                            size={10}
                            color={'#FFFF'}
                            style={{ padding: 5 }}
                        />
                    </View>
                    <Text testID='lblErrMsg' numberOfLines={2} style={{ fontSize: 12, marginLeft: 10, color: '#FFFFFF', paddingVertical: 10, fontFamily: 'Poppins-Regular' }}>{Errmessage}</Text>
                </View>
                :
                null
            }
            <Modal
                animationType="fade"
                transparent={true}
                visible={loader}
            >
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.7)', justifyContent: 'center', alignItems: 'center' }}>
                        <Image style={{ height: 60, width: 60, resizeMode: 'contain' }} source={Content.ImageFileNames.LoadingGif} />
                    </View>
                </SafeAreaView>
            </Modal>
        </SafeAreaView>
    )
}

export default Vi_Step2;

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10
    },
    titletxt: {
        color: '#2C2C2C',
        fontSize: 18,
        fontFamily: 'Inter-Bold',
        fontWeight: 'bold'
    },
    maincard: {
        marginTop: 15,
        marginRight: 2
    },
    cardtitle: {
        color: '#181818',
        fontFamily: "Poppins-Medium",
        fontSize: 14,
        paddingVertical: 5,
        paddingLeft: 10,
        width: w / 2
    },
    cardview: {
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 2,
    },
    leftborder: {
        backgroundColor: '#0046BB',
        height: '95%',
        width: 4,
        borderTopRightRadius: 50,
        borderBottomRightRadius: 50
    },
    textinput: {
        width: w / 2.7,
        fontFamily: "Poppins-Regular",
        fontSize: 14,
        paddingLeft: 15, // You can set specific padding values here
        paddingVertical: 5, // Add vertical padding (adjust as needed)
        borderWidth: 0.5,
        borderColor: '#707070',
        borderRadius: 5,
        marginVertical: 8,
        color: '#4D4D4D',
    },
    errorstyle: {
        flexDirection: 'row',
        borderRadius: 6,
        backgroundColor: '#F8D6D6',
        alignItems: 'center',
        marginTop: 6
    },
    errMsg: {
        backgroundColor: '#6F0000',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        width: 22,
        height: 22,
        margin: 5,
        marginHorizontal: 10
    },
    ownertxt: {
        color: '#4D4D4D',
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
        marginTop: 2
    }
})