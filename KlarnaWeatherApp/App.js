import React, { useState } from 'react'
import { FlatList, StyleSheet, Text, View, Dimensions, TouchableOpacity, TextInput } from 'react-native'

import Modal from 'react-native-modal'
import { colors } from './Colors'
import getData from './data'

const weatherData = [
	{ id: '1', name: 'Stockholm', temp: '10' },

	{ id: '2', name: 'London', temp: '5' },

	{ id: '3', name: 'New York', temp: '15' },

	{ id: '4', name: 'Tokyo', temp: '20' },

	{ id: '5', name: 'Sydney', temp: '25' },

	{ id: '6', name: 'Moscow', temp: '0' },

	{ id: '7', name: 'Cape Town', temp: '30' },

	{ id: '8', name: 'Rio de Janeiro', temp: '35' },

	{ id: '9', name: 'Cairo', temp: '40' },

	{ id: '10', name: 'Beijing', temp: '45' },
]

/*const calculateTempColor = (temp) => {
	if (temp > 30) {
		return colors.hot
	} else if (temp > 15) {
		return colors.warm
	} else {
		return colors.cold
	}
}*/

export default function App() {
	const [isModalVisible, setModalVisible] = useState(false)
	const [modalContentData, setModalContentData] = useState({})
	const [searchText, setSearchText] = useState('')

	const handleSearch = () => {
		getData(searchText)
			.then((data) => {
				setModalContentData(data)
				setModalVisible(true)
			})
			.catch((error) => {
				console.log(error)
			})
	}

	const toggleModal = () => {
		setModalVisible(!isModalVisible)
	}
	const ModalContent = () => {
		return (
			<View style={styles.modalContent}>
				<Text style={styles.modalText}>{modalContentData.name}</Text>
			</View>
		)
	}
	return (

		<View style={styles.container}>
			<TextInput
				style={styles.input}
				onChangeText={setSearchText}
				value={searchText}
				placeholder="Location"
				keyboardType="string"
				onPressOut={handleSearch}
			/>
			<FlatList
				data={[ ...weatherData]}
				keyExtractor={( item ) => item.id}
				renderItem={({ item }) => ( 
					<View style={[styles.item, /*{ borderWidth:1 /calculateTempColor(item.temp)}*/]}>
						<TouchableOpacity
							onPress={() => {
								setModalContentData(item)
								toggleModal()
							}}
						> 
							<Text style={styles.name}>{item.name}</Text>
							<Text style={styles.temp}>{item.temp}°C</Text>
						</TouchableOpacity>
					</View>
				)}
				contentContainerStyle={{ padding: 20 }}
				showsVerticalScrollIndicator={false}
			/>
			<Modal
				isVisible={isModalVisible}
				useNativeDriver
				animationIn="zoomInDown"
				animationOut="zoomOutUp"
				animationInTiming={600}
				animationOutTiming={600}
				style={styles.modal}
				onBackdropPress={toggleModal}
				onSwipeComplete={toggleModal}
				swipeDirection={['down', 'left', 'right', 'up']}
			>
				<ModalContent content={modalContentData} />
			</Modal>
		</View>
	)
}



const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},

	item: {
		backgroundColor: colors.white,
		width: Dimensions.get('window').width/1.2,
		borderRadius: 20,
		alignItems: 'center',
		justifyContent: 'center',
		marginVertical: 8,
		padding: 20,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5
	},
	name: {
		fontSize: 20,
		fontWeight: 'bold',
		color: colors.black,
	},
	temp: {
		fontSize: 16,
		textAlign: 'center',
	},
	input: {
		height: 40,
		margin: 12,
		marginTop: 50,
		padding: 10,
		borderBottomColor: colors.black,
		borderBottomWidth: 1,
		width: Dimensions.get('window').width,
	},
	modal: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-end',
		margin: 0,
		width: Dimensions.get('window').width,
	},
	modalContent: {
		alignItems: 'center',
		backgroundColor: 'white',
		borderRadius: 4,
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height/2,
		padding: 22,
	},
})

