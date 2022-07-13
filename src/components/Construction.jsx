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
	Modal
} from 'react-native';
import { sizes } from '../constants/theme.js';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Construction = (props) => {
	const { flag, listLang, language, languageName, languageCode} = useSelector((state) => state.langState);
	const startDate = (props.itemDetail.startDate && props.itemDetail.startDate !=''&&props.itemDetail.startDate !=null&&props.itemDetail.startDate != undefined)?(new String(props.itemDetail.startDate)).slice(0, (new String(props.itemDetail.startDate)).indexOf("T")).split("-").reverse().join("-").toString():'';
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

	var colorStatus = 'black';
  switch (props.itemDetail.status) {
    case 4:
      colorStatus = '#00FF0A'
      break;
    case 3:
      colorStatus = '#FEBA0D';
      break;
    default:
      colorStatus = 'black'
  }
	return (
		<View>
			{(props.show == undefined||props.show == true)?(
			<View style={styles.list} >
				<View style={styles.status}>
					<Text style={[styles.top, {  textAlign: "center", textAlignVertical: "center" }]}>{props.itemDetail.constructionCode}</Text>
					<Text style={{marginRight: 40, color:colorStatus}}>{props.itemDetail.statusName} </Text>
				</View>
				<View style={styles.item}>
					<Text style={styles.left}>{language.PROVINCE}</Text>
					<Text style={styles.right}>{props.itemDetail.provinceName}</Text>
				</View>
				<View style={styles.item}>
					<Text style={styles.left}>{language.STATION_CODE}</Text>
					<Text style={styles.right}>{props.itemDetail.constructionCode}</Text>
				</View>
				<View style={styles.item}>
					<Text style={styles.left}>{language.STATION_NAME}</Text>
					<Text style={styles.right}>{props.itemDetail.constructionName}</Text>
				</View>
				<View style={styles.item}>
					<Text style={styles.left}>{language.STATION_TYPE}</Text>
					<Text style={styles.right}>{props.itemDetail.stationTypeName}</Text>
				</View>
				<View style={styles.item}>
					<Text style={styles.left}>{language.COLUMN_TYPE}</Text>
					<Text style={styles.right}>{props.itemDetail.columnTypeName}</Text>
				</View>
				<View style={styles.item}>
					<Text style={styles.left}>{language.CONSTR_TYPE}</Text>
					<Text style={styles.right}>{props.itemDetail.constructionTypeName}</Text>
				</View>
				<View style={styles.item}>
					<Text style={styles.left}>{language.ITEM_TOBE_CONSTR}</Text>
					<Text style={styles.right}>{props.itemDetail.constructionItemName?props.itemDetail.constructionItemName:'N/A'}</Text>
				</View>
				<View style={styles.item}>
					<Text style={styles.left}>{language.HAND_OVER_DATE}</Text>
					<Text style={styles.right}>{startDate }</Text>
				</View>
				<View style={styles.item}>
					<Text style={styles.left}>{language.COMPLETE_DATE}</Text>
					<Text style={styles.right}>{props.itemDetail.completeDateStr}</Text>
				</View>
				
			</View>
			):(<></>)}
	</View>
	);
};
const styles = StyleSheet.create({
	item: {
		flexDirection: 'row',
		marginBottom: 5	,
		paddingHorizontal: 10,
	},
	list: {
		borderTopColor: 'black',
		marginBottom: 10,
		color: 'black',
		backgroundColor:'#FFFFFF'
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
	status:{
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		color:'black'
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
});

export default Construction;