import React, { useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  Button,
  ScrollView,
  Text,
  Modal,
  SafeAreaView

} from 'react-native';
import icons from '../constants/icons.js';
import { colors, sizes, fonts } from '../constants/theme';
import { useDispatch, useSelector } from 'react-redux';
import LoadingIndicator from '../components/LoadingIndicator.jsx';
import API_CONFIG from '../constants/api-config.js';
import CText from '../components/Text.jsx';
//import Button from '../components/Button.jsx';
import TextPrice from '../components/TextPrice.jsx';
import SizedBox from '../components/SizedBox.jsx';
import Divider from '../components/Divider.jsx';
import Container from '../components/Container.jsx';
import Icon from 'react-native-vector-icons/Feather.js';
import TopNavigation from '../components/TopNavigation.jsx';
import TopNavigationIcon from '../components/TopNavigationIcon.jsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authActions from '../store/actions/auth.action.js';
import {getProvince} from '../store/actions/province.action.js';
import {getConstructionStatus, findConstruction} from '../store/actions/construction.action';
import { constructionDetail, searchConstruction } from '../services/construction.service';
import { TYPES } from '../store/types.js';
import Construction from '../components/Construction.jsx';


function HomeScreen({ navigation }) {
  useEffect(() => {
    onSearchPressed();
  }, [navigation]);
  const dispatch = useDispatch();
  const [provinceCode, setProvinceCode] = useState('');
  const [provinceName, setProvinceName] = useState('');
  const [constructionCode, setConstructionCode] = useState('');
  const [status, setStatus] = useState();
  const [constructionName, setConstructionName] = useState('');
  const { flag, listLang, language, languageName, languageCode} = useSelector((state) => state.langState);
  const { provinces } = useSelector((state)=>state.provinceState);
  const { constructionStatus } = useSelector((state)=>state.constructionState);
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [error, setError] = useState();
  const [loading,setLoading] = useState(false);
  const [constructions, setConstructions] = useState([]);
  const onSearchPressed = async () => {
    try {
      setLoading(true);
      const constructionDTO = {
        constructionCode: constructionCode,
        status: status,
        provinceCode: provinceCode
      };
      var output = await searchConstruction("searchConstruction",constructionDTO,languageCode);     
      console.log(JSON.stringify(constructionDTO));




      if (!output.data) {
        setError('Có lỗi xảy ra');
        setConstructions([]);
      } else {
        dispatch({ type: TYPES.GET_CONSTRUCTIONS_SUCCESS, payload: output.data });
        
        for(var i = 0; i <output.data.length; i++){
          var textMerge = '';
          for(var j = 0; j <output.data[i].listConstructionItemName.length; j++)
          {
            if(textMerge == ''){
              textMerge = output.data[i].listConstructionItemName[j];
            }else{
              textMerge = textMerge+', '+output.data[i].listConstructionItemName[j];
            }
            if(j ==output.data[i].listConstructionItemName.length-1 )
            {
              output.data[i].constructionItemName = textMerge;
            }
          }
        }
        setConstructions(output.data);
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setConstructions([]);
      
    }
  };

  return (
   
   <SafeAreaView  style={styles.container}>
      <View style={styles.body}>
        <View>
          <TopNavigation
            style={{ backgroundColor: '#00A3ED' }}
            title={language.MONITORING_CONSTRUCTION}
            rightAction={
              <TopNavigationIcon
                icon='log-out'
                style={{ backgroundColor: colors.lightRed }}
                color={colors.blue}
                backgroundColor={colors.white}
                onPress={() => { AsyncStorage.removeItem('token'); dispatch(authActions.logOut()); }}
              />
            }
            color={'white'}
          />
        </View>
          <View style={styles.list}>     
              <View>
                <Text style={{ marginLeft: 15, padding: 5, color: 'black' }}>{language.STATION_CODE}</Text>
                <TextInput style={styles.Input} onChangeText={setConstructionCode} value={constructionCode}  />
              </View>
           
            <View>
              <View>
                <Text style={{ marginLeft: 15, padding: 5, color: 'black' }}>{language.CONSTR_STATUS}</Text>
                <TouchableOpacity 
                    onPress={()=>{setModal2(true);dispatch(getConstructionStatus(languageCode));}}>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputRow} editable={false} value={constructionName}/>
                    <Image
                              source={icons.ve}
                              style={{
                              width: 9,
                              height: 9,
                              marginRight:15
                        }}
                    />
                </View>
                </TouchableOpacity>
                <Modal animationType='slide' transparent={true} visible={modal2}>
                    <View style={styles.modalContainer}>
                      <View style={styles.modalWrap}>
                      <View style={styles.modalHeader}>
                        <CText size='small' style={{ fontSize: 18 }} type='bold'>
                          {language.STATUS_LIST}
                          </CText>
                          <TouchableOpacity
                            style={styles.modalHeaderClose}
                            onPress={() => setModal2(false)}
                          >
                            <Icon name='x' size={30} color={colors.red} />
                          </TouchableOpacity>
                      </View>
                      <Divider style={{ marginHorizontal: sizes.padding }} />       
                        <FlatList
                          contentContainerStyle={{
                            marginHorizontal: sizes.padding,
                          }}
                          data={constructionStatus}
                          keyExtractor={(item) => item.value.toString()}
                          renderItem={({ item }) => { 
                            return (
                              <TouchableOpacity
                                activeOpacity={0.6}
                                style={styles.itemContain}
                                onPress={() => {setModal2(false);setConstructionName(item.name); setStatus(item.value)}}
                              >  
                                <SizedBox height={8} />
                                <CText numberOfLines={4} size={15}>
                                  {item.name}
                                </CText>
                                <SizedBox height={4} />
                              </TouchableOpacity>
                            );
                          }}
                        />
                      </View>
                    </View>
                  </Modal>
              </View>
            </View>

            <View >
              {/* <Button style={styles.button} title='Tìm kiếm' onPress={()=>{}}/> */}
              {error ? (
                  <>
                  <CText
                    style={{ textAlign: 'center' }}
                    size={16}
                    type='bold'
                    color={colors.red}
                    label={error}
                  />
                  {/* <SizedBox height={sizes.padding * 2} /> */}
                  </>
                ) : null}
              <TouchableOpacity style={styles.button} onPress={onSearchPressed}>
               
                  <Text style={{ textAlign: 'center', color: 'white', fontWeight:'bold' }}>{language.SEARCH}</Text>
              </TouchableOpacity>
            </View>
          </View>
          
       
      </View>
      <View>
        <Text  style={{color:'black', marginLeft:10,}}>{language.SEARCH_REUSLT} ({constructions.length})</Text>
      </View>
      {loading ? (
        <LoadingIndicator size={30} color ={colors.black }/>
      ) : !constructions.length ? (
            <Container>
              <SizedBox height={20} />
              <CText type='lighter' size={18} color={''} style={[styles.textAlign]}>
              {language.NO_DATA}
             </CText>
            </Container>
      ):(
      <FlatList
            style={{ flex:1}}
            contentContainerStyle={{
              marginHorizontal: sizes.padding,
            }}
            data={constructions}
            keyExtractor={(item) => item.constructionId.toString()}
            renderItem={({ item }) => { 
              return (
                <TouchableOpacity
                onPress={async () => {
                  try {
                    setLoading(true);
                    const constructionDTO = {
                      constructionId: item.constructionId,
                    };
                    // console.log('DTO.id: '+JSON.stringify(constructionDTO));
                    var output = await constructionDetail("getConstructionDetail", constructionDTO,languageCode);    
                    // console.log('OUTPUT: '+ JSON.stringify(constructionDTO) +JSON.stringify(output)); 
                    if (!output.data) {
                      setError('Có lỗi xảy ra');
                    } else {
                      // console.log("constructionDetail", output);
                      
                        var textMerge = '';
                        for(var j = 0; j <output.data.listConstructionItemName.length; j++)
                        {
                          if(textMerge == ''){
                            textMerge = output.data.listConstructionItemName[j];
                          }else{
                            textMerge = textMerge+', '+output.data.listConstructionItemName[j];
                          }
                        }
                        output.data.constructionItemName = textMerge;
                        
                      
                      // console.log('ADU: '+JSON.stringify(output.data))

                      navigation.navigate('DetailConstructionScreen',{constructionDetail: output.data})
                    }
                    setLoading(false);
                  } catch (e) {
                    setLoading(false);
                  }
                }} 
                >
                  <Construction itemDetail={item}></Construction>
                </TouchableOpacity>
              );
            }}
          />)}
      </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    backgroundColor:'#FFFFFF'
   
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
    borderRadius: 50,
    backgroundColor: '#00A3ED',
    padding: 10,
    marginLeft: 100,
    marginRight: 100
  },
  
  item: {
    flexDirection: 'row',
    marginBottom: 5,
    paddingHorizontal: 10,
  },
  list: {
    borderTopColor: 'black',
   
    color: 'black'

  },
  left: {
    flex: 0.4,
    marginLeft: 20,
    color: 'black'
  },
  right: {
    flex: 0.5,
    marginLeft: 20,
    color: 'black'
  },
  inputContainer: {
    height: 40,
    marginHorizontal: 20, 
    borderRadius: 10,
    borderWidth:1,
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
    borderColor:'#C9C5C5'
  },
  inputRow: {
    fontFamily: 'HelveticaNeue-Medium',
    color: colors.black,
    fontSize: 15,
    flex:1,
    paddingLeft: 10
  },
  Input: {
    height: 40,
    marginLeft: 20,
    marginRight: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#C9C5C5',
    
  },
  modalContainer: {
     flex: 1, 
     justifyContent: 'center',
      alignItems: 'center' },
  modalWrap: {
    width: sizes.width * 0.9,
    height: sizes.height * 0.5,
    backgroundColor: colors.white,
    borderRadius: sizes.radius / 1.5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 12,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: sizes.padding,
    alignItems: 'center',
  },
  itemContain: {
    marginVertical: sizes.base,
    width: sizes.width,
  },
  textAlign: {
    alignContent:'center',
    textAlign:'center'
  }
});

export default HomeScreen;
