import React, { useState, useEffect } from 'react';
import Checkbox from 'expo-checkbox';
import {
  View,
  Alert,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList, 
  Image,
  ScrollView,
  Text,
  image,
  pickImage, Modal, Dimensions
} from 'react-native';
import LoadingIndicator from '../components/LoadingIndicator.jsx';
import * as ImagePicker from "react-native-image-crop-picker"
import icons from '../constants/icons';
import { colors, sizes, fonts } from '../constants/theme';
import { getImageList } from '../services/getListImage.service.js';
import Icon from 'react-native-vector-icons/Feather.js';
import { uploadImage } from '../services/upImage.service.js';
import { useDispatch, useSelector } from 'react-redux';

const ConstructionDetail = (props) => {
  const { flag, listLang, language, languageName, languageCode} = useSelector((state) => state.langState);
  const [isSelected, setIsSelected] = useState(props.constructionDetailDTO.isRequested);
  const [disabled, setDisabled] = useState((props.constructionDetailDTO.status == 1 || props.constructionDetailDTO.status == 4 || props.constructionDetailDTO.status == 6 || props.constructionDetailDTO.status == 8) ? false : true);
  const [avatarSource, setAvatarSource] = useState([]);
  const [list, setList] = useState([]);
  const [a, setA] = useState(avatarSource ? avatarSource.map((item) => ({ ...item })) : null);
  const [loading, setLoading] = useState(false);
  const [loadingImgItem, setLoadingImgItem] = useState(false);
  const firstApprovedDate = props.constructionDetailDTO.firstApprovedDate ? (new String(props.constructionDetailDTO.firstApprovedDate).valueOf()).slice(0, (new String(props.constructionDetailDTO.firstApprovedDate).valueOf())).split("-").reverse().join("/").toString() : '';


  useEffect(() => {
  }, [props.constructionDetailDTO])
  var colorStatus = 'black';
  switch (props.constructionDetailDTO.status) {
    case 5 || 2 || 3:
      colorStatus = '#DC0DFE';
      break;
    case 7:
      colorStatus = 'black'
      break;
    case 1:
      colorStatus = '#FEBA0D';
      break;
    default:
      colorStatus = 'red'
  }
  const onGetPressed = async () => {
    try {
      setLoading(true);
      const { errorCode, description, data } = await getImageList("getImageList", {constructionDetailId: props.constructionDetailDTO.constructionDetailId}, languageCode)

      // const { errorCode, description, data } = await getImage("getImage", props.constructionDetailDTO.listImageDTO.length != 0 ? props.constructionDetailDTO.listImageDTO[0].imageId : null); // hàm chưa sửa. //sửa thành hàm lấy 1 ảnh //truyền tham số lấy ảnh đầu tiên của list
      // console.log(JSON.stringify('1:'+errorCode));
      if (errorCode != 0) {
        Alert.alert(
          language.NOTIFY,
          description,
          [
            { text: language.OK }
          ]
        );
      } else {
        props.setListImageSV(data);
        props.setModalImages2(true);
        // props.setListLocationImage(props.constructionDetailDTO);
      //   props.setSizeLocation(props.constructionDetailDTO.listImageDTO.length);
      }
    
      setLoading(false);  
    } catch (e) {
      Alert.alert(
        language.NOTIFY,
        language.SYSTEM_ERROR,
        [
          { text: language.OK }
        ]
      );
      throw e;
      setLoading(false);
    }
  }
  const onPostItemImgPressed = async () => {
    try {
      setLoadingImgItem(true);
      var listFileImage = new FormData();
      // console.log(JSON.stringify(props.constructionDetailDTO.imageList.map(e => e.path)));
      if (props.constructionDetailDTO.isRequested == true) {
        for (var i = 0; i < props.constructionDetailDTO.imageList.length; i++) {
          listFileImage.append('listFileImage', {
            name: "test.jpg",
            type: props.constructionDetailDTO.imageList[i].mime,
            uri: props.constructionDetailDTO.imageList[i].path,
          });
          console.log(JSON.stringify(listFileImage));
         
        }
        var { errorCode, description } = await uploadImage(listFileImage, props.constructionDetailDTO.constructionDetailId, languageCode);
        // ImagePicker.openPicker({
        //   cropping: false,
        //   cropperToolbarColor: Global.primaryColor,
        // }).then(listFileImage => {
        //   console.log(listFileImage);
        //   let divider = 1;
        //   if (listFileImage.size > 150000) {
        //     divider = listFileImage.size / 150000;
        //   }
        //   ImageResizer.createResizedImage(
        //     listFileImage.path,
        //     listFileImage.width / divider,
        //     listFileImage.height / divider,
        //     'JPEG',
        //     100,
        //     0,
        //     null,
        //   )
        // })
        if (errorCode != 0) {
          Alert.alert(
            language.NOTIFY,
            description,
            [
              { text: language.OK }
            ]
          );
        } else {
          Alert.alert(
            language.NOTIFY,
            language.UPLOAD_SUCCESS,
            [
              { text: language.OK }
            ]
          );
          // setDisabled(true);
          props.constructionDetailDTO.isUploadItemCheck = true;
        }
      }
      else {
        Alert.alert(
          language.NOTIFY,
          language.CHECK_RECORD,
          [
            { text: language.OK }
          ]
        );
      }

      setLoadingImgItem(false);
    } catch (e) {
      setLoadingImgItem(false);
      Alert.alert(
        language.NOTIFY,
        language.NOT_SELECT_PHOTO,
        [
          { text: "OK" }
        ]
      );
      throw e
    }
  };

  // 1. Mở picker lên (thư viện) => set đường dẫn image vào biến avatarsource
  const addImage = () => {
    ImagePicker.openPicker({
      multiple: true,
      // includeBase64: true,
      cropping: false,
      mediaType:'photo'
    }).then(images => {
      if (images) {
        if (avatarSource) {
          setAvatarSource([...avatarSource, ...images]);
          setA([...avatarSource, ...images]); //xóa anh
          props.constructionDetailDTO.imageList = [...avatarSource, ...images];
        } else {
          setAvatarSource([...images]);
          setA([...images]);
          props.constructionDetailDTO.imageList = [...avatarSource, ...images];
        }
      }
    });
  };

  // 2. Mở camera lên => set đường dẫn image vào biến avatarsource
  const addCamara = () => {
    ImagePicker.openCamera({
      width: 1000,
      height: 1000,
      cropping: true,
      freeStyleCropEnabled: true,
      showCropGuidelines: false,
      hideBottomControls: false,
      showCropFrame: false,
      includeBase64: true, //check anh base64
    }).then(image => {
      if (image) {
        if (avatarSource) {
          setAvatarSource([...avatarSource, image]);
          setA([...avatarSource, image]);
          props.constructionDetailDTO.imageList = [...avatarSource, image];
        } else {
          setAvatarSource([...image]);
          setA([...image]);
          props.constructionDetailDTO.imageList = [...image];
        }
      }
    });

  };

  // 3. Từ cái biến avatarsource => trả về nội dung cho trường source của component Image
  const getImagesUri = (index) => {
    if (avatarSource && avatarSource[index]) {
      return { uri: `data:${avatarSource[index].mime};base64,${avatarSource[index].data}` };
    }
    return icons.no_image
  }

  const getCancelImageButtonStyle = (index) => {
    if (avatarSource && avatarSource[index]) {
      return styles.cancelImageButton
    }
    return styles.hidden
  }

  const formatDate = (string) => {
    if (string) {
      let stringArr = string.split('T');
      stringArr[0] = stringArr[0].split('-').reverse().join('/');
      let dateFormatted = stringArr.join(' ');
      return dateFormatted;
    }
    else {
      return null;
    }
  }

  // 4. Gửi ảnh dưới dạng BASE64
  const postBase64Image = () => {

  }

  return (
    <View style={styles.list} >
      <View style={{ flexDirection: 'row', marginBottom: 10, }}>
        <Text style={{ flex: 0.5, color: 'black', fontWeight: 'bold', paddingLeft: 5, color: 'black', textAlign: "left", textAlignVertical: "center", marginTop: 1, color: 'black' }}>{props.constructionDetailDTO.name}</Text>
        <Text style={{ flex: 0.5, color: colorStatus, textAlign: "right", textAlignVertical: "center" }}>{props.constructionDetailDTO.statusName} </Text>
        <Checkbox style={{ marginRight: 2, marginTop: 2, justifyContent: 'flex-end', flex: 0.05 }}
          value={isSelected}
          onValueChange={(value) => { props.constructionDetailDTO.isRequested = value; setIsSelected(value) }}
          // color={isSelected ? '#434343' : undefined}
          disabled={disabled}
        />
        <View>

        </View>
      </View>
      <View style={styles.item}>
        <Text style={styles.left}>{language.CON_ITEM_NAME}</Text>
        <Text style={styles.right}>{props.constructionDetailDTO.name}</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.left}>{language.CON_DATE}</Text>
        <Text style={styles.right}>{props.constructionDetailDTO.startDate ? (formatDate(props.constructionDetailDTO.startDate)) : ''}</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.left}>{language.COMPLETE_DATE}</Text>
        <Text style={styles.right}>{props.constructionDetailDTO.acceptanceDate ? (formatDate(props.constructionDetailDTO.acceptanceDate)) : ''}</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.left}>{language.ACCEPTANCE_DATE} </Text>
        <Text style={styles.right}>{firstApprovedDate}</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.left}>{language.REQUIRES_ACCEPTANCE_COML_DATE}</Text>
        <Text style={styles.right}>{props.constructionDetailDTO.secondApprovedDate ? (formatDate(props.constructionDetailDTO.secondApprovedDate)) : ''}</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.left}>{language.ACCEPTANCE_DATE_COMPLETE}</Text>
        <Text style={styles.right}>{props.constructionDetailDTO.thirdApprovedDate ? (formatDate(props.constructionDetailDTO.thirdApprovedDate)) : ''}</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.left}>{language.REJECT_REASON} </Text>
        <Text style={styles.right}>{props.constructionDetailDTO.rejectReason ? (props.constructionDetailDTO.rejectReason) : ''}</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.left}>{language.REJECT_DATE}</Text>
        <Text style={styles.right}>{props.constructionDetailDTO.rejectDate ? (formatDate(props.constructionDetailDTO.rejectDate)) : ''}</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.left}>{language.REJECT_BY}</Text>
        <Text style={styles.right}>{props.constructionDetailDTO.rejectBy ? (props.constructionDetailDTO.rejectBy) : ''}</Text>
      </View>
      {(props.constructionDetailDTO.status == 1 || props.constructionDetailDTO.status == 4 || props.constructionDetailDTO.status == 6 || props.constructionDetailDTO.status == 8) ?
        (
          <>
            <View style={styles.item}>
              <View style={[styles.left, { flexDirection: 'row' }]}>
                <Text style={{ color: 'black' }}>{language.CHOOSE_AT_LEAST_1}</Text>
                <Text style={{ color: 'red' }}>*</Text>
              </View>


              {/* <Text style={styles.right}>{props.constructionDetailDTO.startDate}</Text> */}
            </View>

            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 5.5, padding: 4, borderColor: 'black', borderStyle: 'dashed', borderWidth: 0.5, marginLeft: 20, marginRight: 10, marginBottom: 20, borderRadius: 10 }}>
                <View style={{ flexDirection: 'row', textAlign: 'center', justifyContent: 'space-between' }}>
                  {avatarSource.length != 0 ? (
                    <View style={{ flex: 1, paddingRight: 10 }}>
                      <ScrollView horizontal >
                        {
                          avatarSource.map((image, index) => (
                            <View style={{ flexDirection: 'row', marginRight: 20 }} key={index}>
                              <TouchableOpacity disabled={!(avatarSource && avatarSource[0])} onPress={() => { props.setStateAvatarSource(avatarSource); props.setStateModalImages(true) }}>
                                <Image source={{ uri: image.path }} style={{ padding: 20, width: 25, height: 25 }} />
                              </TouchableOpacity>
                              <TouchableOpacity onPress={() => { a.splice(index, 1); setAvatarSource([...a]); props.constructionDetailDTO.imageList = [a]; }}>
                                <Image source={icons.x} style={getCancelImageButtonStyle(index)} />
                              </TouchableOpacity>
                            </View>
                          ))
                        }
                      </ScrollView>
                    </View>)
                    : (
                      <View style={{ justifyContent: 'center', flex: 1, paddingLeft: 10 }}>
                        <Text>{language.NOT_SELECT_PHOTO}</Text>
                      </View>
                    )
                  }
                  <View style={{ flex: 0.3, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={addImage.bind(this)}>
                      <Image
                        source={icons.Vector}
                        style={{
                          marginTop: 7,
                          width: 25,
                          height: 25,
                        }}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={addCamara.bind(this)} >
                      <Image
                        source={icons.camera}
                        style={{
                          marginTop: 7,
                          width: 30,
                          height: 30,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <TouchableOpacity style={{ flex: 1, backgroundColor: '#00A3ED', marginBottom: 20, borderRadius: 10, marginRight: 10, justifyContent: 'center', alignItems: 'center' }}
                onPress={onPostItemImgPressed}>
                {loadingImgItem ? (
                  <LoadingIndicator size={30} color={colors.white} />)
                  : (
                    <Icon name='upload' size={25} color={colors.white} />
                  )}

              </TouchableOpacity>
            </View>
          </>
        ) :
        (<View>
          <View style={styles.item}>
            <Text style={styles.left}>{language.CATEGORY_PHOTO}</Text>
         
          {loading ? (
            <View>
              <LoadingIndicator color={colors.blue} size={25} />
            </View>) : (


            <TouchableOpacity onPress={onGetPressed} style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text style={[styles.right, { color: 'blue', textDecorationLine: 'underline', }]}>{language.VIEW_PHOTO}</Text>

            </TouchableOpacity>
          )}
           </View>
        </View>

        )
      }
    </View>

  );
};
const styles = StyleSheet.create({
  logo: {
    width: sizes.width * 0.9,
    height: 300,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1
  },
  body: {
    marginBottom: 40,
    flex: 1
  },
  cancelImageButton: {
    padding: 7,
    width: 7,
    height: 15
  },
  hidden: {
    display: 'none'
  },
  top: {
    fontWeight: 'bold',
    padding: 5,
    color: 'black',
    textAlign: "left",
    textAlignVertical: "center",
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
    marginLeft: 100

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
  list: {
    borderTopColor: 'black',
    marginBottom: 10,
    color: 'black',
    backgroundColor: 'white',
    borderRadius: 10
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
})
export default ConstructionDetail;