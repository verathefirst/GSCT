import React, { useState , useEffect} from 'react';
import Checkbox from 'expo-checkbox';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  Text,
  image,
  Alert,
  pickImage, Modal, Dimensions,
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
import * as ImagePicker from "react-native-image-crop-picker"
import { searchConstruction } from '../services/construction.service'
import Construction from '../components/Construction.jsx';
import ConstructionDetail from '../components/ConstructionDetail.jsx';
import { uploadRequestConstruction } from '../services/upImage.service';
import Button from '../components/Button.jsx';
import { getImage } from '../services/getListImage.service.js';

function DetailConstructionScreen({ navigation, route }) {
  const { flag, listLang, language, languageName, languageCode} = useSelector((state) => state.langState);
  const constructionInfo = route.params && route.params.constructionDetail ? route.params.constructionDetail : null;
  const [avatarSource, setAvatarSource] = useState([]);
  const [listImageSV1, setListImageSV] = useState([]);
  const [modalImages, setModalImages] = useState(false);
  const [modalImages2, setModalImages2] = useState(false);
  const [loading, setLoading] = useState();
  const [show, setShow] = useState(true);
  const [listLocationImage, setListLocationImage] = useState([]);
  const [sizeLocation, setSizeLocation] = useState(0);
  const [loadingMoreImg, setLoadingMoreImg] = useState(false);
  const [listConstructionDetailDTO, setListConstructionDetailDTO] = useState(constructionInfo.listConstructionDetailDTO &&  constructionInfo.listConstructionDetailDTO != null?
  constructionInfo.listConstructionDetailDTO.map((attr) => ({
      ...attr,
      imageList: [],
      fileList: null,
      isRequested: false,
      isUploadItemCheck:false,
    })):null
  );  

  const onPostPressed = async () => {
    try {
      setLoading(true);
      var countCheck = 0;
      var countUnUpload = 0;
      var nameCons = '';
      for(var i=0; i< listConstructionDetailDTO.length; i++){
        if(listConstructionDetailDTO[i].isRequested == true)
        {
          countCheck++;
          if(listConstructionDetailDTO[i].isUploadItemCheck == false)
          {
            countUnUpload++;
            nameCons = listConstructionDetailDTO[i].name;
          }
        }           
      };
      if(countCheck == 0){
        Alert.alert(
          language.NOTIFY,
          language.SELECT_CATEGORY_TO_SUBMIT,
          [
            { text: language.OK }
          ]
        );
        setLoading(false);
      }else if(countUnUpload != 0){
        Alert.alert(
          language.NOTIFY,
          nameCons+" "+language.NOT_ALLOW_UPLOAD,
          [
            { text: language.OK }
          ]
        );
        setLoading(false);
      }else{
        
          Alert.alert(
            language.NOTIFY,
            language.SEND_REQUEST,
            [
              {
                text:language.CANCEL,  onPress: () => console.log("Cancel Pressed"),
              },
              {
                 text: language.YES, onPress: async () =>{
                  
                  
                  const listConstructionDetail = listConstructionDetailDTO.map((item) => ({
                    isRequested: item.isRequested,
                    constructionDetailId: item.constructionDetailId,
                    constructionId: item.constructionId,
                  }));
                  const output = await uploadRequestConstruction("createApproveRequest",listConstructionDetail,languageCode);
                  console.log(JSON.stringify(listConstructionDetail));
                  if (output.errorCode != 0) {
                    Alert.alert(
                      language.NOTIFY,
                      output.description,
                      [
                        { text: language.OK }
                      ]
                    );
                    setLoading(false);
                  } else {
                    Alert.alert(
                      language.NOTIFY,
                      language.SEND_REQUIRES_SUCCESS,
                      [
                        { text: language.OK }
                      ]
                    );
                    navigation.navigate('Authenticated');
                    setLoading(false);
                  }
                 }
             }
            ],
          );
        
        setLoading(false);
      }  
    } catch (e) {
      Alert.alert(
        language.NOTIFY,
        language.NOT_SELECT_PHOTO,
        [
          { text: language.OK }
        ]
      );
      setLoading(false);

    }
  };


 

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        <View>
          <TopNavigation
            style={{ backgroundColor: '#00A3ED' }}
            title={language.MONITORING_CONSTRUCTION}
            leftAction={
              <TopNavigationIcon
                icon='chevron-left'
                onPress={() => navigation.goBack()}
                style={{ backgroundColor: '#00A3ED' }}
                color={'white'}
              />
            }
            color={'white'}
          />
        </View>
        
          <View style={styles.add}>
            <View style={{alignItems: 'center', flexDirection: 'row', flex:1}}>
              <Text style={[styles.top, { textAlign: 'center', textAlignVertical: 'center' }]}>{language.INFORMATION_CONSTR}</Text>
              <View style={{flex:1 }}>
                <TouchableOpacity onPress={()=>{setShow(!show)}}>
                {show?<Image
                  source={icons.ve}
                  style={{
                    width: 9,
                    height: 9,
                  }}
                />:
                <Image
                  source={icons.arrowup}
                  style={{
                    width: 9,
                    height: 9,
                  }}
                />
                }
                </TouchableOpacity>
            </View>
            
            </View>
            <View style={styles.button1}>
              <Button  label={language.SEND_REQUIRES} onPress={onPostPressed} loading={loading} size='small' style={{height:30}}
              />
              
            </View>
          </View>
          
          <Construction itemDetail={constructionInfo} show={show}>
            
          </Construction>
          <View style={{paddingBottom: 10}}>
          <Text style={{marginLeft:10,  color: 'black' }}>{language.LIST_ITEM} ({constructionInfo.listConstructionDetailDTO?constructionInfo.listConstructionDetailDTO.length:'0'})</Text>
          </View>
          {loading ? (
        <LoadingIndicator size={30} color ={colors.black }/>
            ) : !listConstructionDetailDTO ? (
                  <Container>
                    <SizedBox height={20} />
                    <CText type='lighter' size={18} color={''} style={[styles.textAlign]}>
                    {language.NO_DATA}
                  </CText>
                  </Container>
            ):(
                <FlatList
                  contentContainerStyle={{
                    marginHorizontal: sizes.padding,
                  }}
                  data={constructionInfo.listConstructionDetailDTO ? listConstructionDetailDTO: []}
                  keyExtractor={(item) => item.constructionDetailId.toString()}
                  renderItem={({ item }) => { 
                    return (
                      <ConstructionDetail 
                      constructionDetailDTO={item} 
                      setStateModalImages={setModalImages} 
                      setStateAvatarSource={setAvatarSource} 
                      setModalImages2={setModalImages2} 
                      setListImageSV={setListImageSV} 
                      // listImageSV={listImageSV} 
                      // setListLocationImage={setListLocationImage}
                      // setSizeLocation={setSizeLocation}
                      
                      ></ConstructionDetail>
                    );
                  }}
                />
            )
          }

          <Modal animationType='slide' transparent={true} visible={modalImages}>
          <View style={styles.modalContainer}>
            <View style={styles.modalWrap}>
              <View style={styles.modalHeader}>
                <CText size='small' style={{ fontSize: 18 }} type='bold'>Ảnh</CText>
                <Divider style={{ marginHorizontal: sizes.padding }} />
                
                <ScrollView
                 pagingEnabled horizontal style={{width: sizes.width * 0.9,}}>
                {
                  avatarSource.map((image, index) => (
                    // <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                    // <Icon name='chevron-left' size={30} color={colors.red} style={{position: 'absolute'}}/>
                    <Image
                      key={index}
                      style={styles.logo}
                      source={{
                        uri: image.uri,
                      }}
                    />
                    // </View>
                  ))
                }
                </ScrollView>
                <TouchableOpacity
                  style={styles.btnCloseImage}
                  onPress={() => setModalImages(false)}
                >
                  <Text style={styles.txtAgreeClose}>Đồng ý</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          </Modal>
          <Modal animationType='slide' transparent={true} visible={modalImages2}>
          <View style={styles.modalContainer}>
            <View style={styles.modalWrap}>
              <View style={styles.modalHeader}>
                <CText size='small' style={{ fontSize: 18 }} type='bold'>Ảnh</CText>
                <Divider style={{ marginHorizontal: sizes.padding }} />
               
                <ScrollView  pagingEnabled horizontal style={{width: sizes.width * 0.9}}>
                {
                  listImageSV1.map((image, index) => (
                    <Image
                      key={index}
                      style={styles.logo}
                      source={{
                        uri: image.fileContent,
                      }}
                    />
                  ))
                }
                </ScrollView>
                
                <TouchableOpacity
                  style={styles.btnCloseImage}
                  onPress={() => {setModalImages2(false),setListImageSV([])}}
                >
                  <Text style={styles.txtAgreeClose}>Đồng ý</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          </Modal>
                  
      </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
        flex: 1,
        // backgroundColor: 'blue'
    },
  logo: {
    width: sizes.width * 0.9,
    height: sizes.height * 0.5,
    resizeMode: 'contain',
    justifyContent:'center',
    alignItems:'center'
  },

  body: {
    marginBottom: 1,
    flex:1
  },
  cancelImageButton:{
    padding: 7, 
    width: 7, 
    height: 15
  },
  hidden:{
    display: 'none'
  },
  top: {
    fontWeight: 'bold',
    padding: 5,
    color: 'black',
    textAlign: "center",
    textAlignVertical: "center",
    marginLeft: 20, 
    marginTop: 1,
    color: 'black'
  },
  header: {
    fontSize: 15,
    color: "white",
    fontWeight: 'bold',
    backgroundColor: '#00A3ED',
    textAlign: 'center',
    padding: 10
  },

  button1: {
    margin: 5,
    padding: 7,
    backgroundColor: '#00A3ED',
    borderRadius: 10,
    justifyContent:'center',
    alignContent:'center',
    flex:0.5
  },
  Input: {
    height: 40,
    margin: 3,
    borderWidth: 1,
    borderRadius: 10
  },
  item: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingHorizontal: 10,
    marginLeft: 25,

  },

  add: {
    flexDirection: 'row',
  },
  title1: {
    flex: 0.5,

    flexDirection: 'column',
    justifyContent: 'center',
    height: 20
  },
  checkbox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'

  },
  yellowText: {
    color: 'yellow'
  },
  purpleText: {
    color: 'purple'
  },
  containers: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalContainer: {
     flex: 1,
     justifyContent: 'center', 
     alignItems: 'center' 
  },
 modalWrap: {
    width: sizes.width * 0.9,
    height: sizes.height * 0.7,
    backgroundColor: colors.white,
    borderRadius: sizes.radius / 1.5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    backgroundColor:'#E5E5E5'
  },
  modalHeader: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: sizes.padding,
    alignItems: 'center',
    flex:1
  },
  btnCloseImage: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "#00A3ED",
    marginTop:5,
    width: sizes.width * 0.5,
  },
  txtAgreeClose: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default DetailConstructionScreen;
