import React, { useState } from 'react'
import { FlatList, StyleSheet, Text, View, Dimensions, TextInput, ActivityIndicator, Pressable } from 'react-native'

import Modal from 'react-native-modal'
import { colors } from './Colors'
import getData from './data'

export default function App() {
	const [isModalVisible, setModalVisible] = useState(false)
	const [modalContentData, setModalContentData] = useState({})
	const [searchText, setSearchText] = useState('')
	const [isLoading, setLoading] = useState(false)
	const [data, setData] = useState([])

	const handleCachedLocations = (newLocationData) => {
		setData([...data, newLocationData])
	}

	const handleSearch = (location) => {
		const found = data.filter(item => item.address === location)
		if (found.length > 0){
			const {currentConditions, address, description} = found[0]
			setModalContentData({currentConditions, address, description})
			toggleModal()
			setLoading(false)
			return found[0]
		}
		getData(location)
			.then(({ currentConditions, address, description }) => {
				setModalContentData({currentConditions, address, description})
				handleCachedLocations({currentConditions, address, description})
				toggleModal()
				setLoading(false)
				setSearchText('')
			})
			.catch((error) => {
				setSearchText(error.message)
				setTimeout(() => {
					setSearchText('')
				}, 1000)
				setLoading(false)
			})
	}

	const handleRemove = (location) => {
		const newData = data.filter(item => item.address !== location)
		setData(newData)
		toggleModal()
	}

	const toggleModal = () => {
		setModalVisible(!isModalVisible)
	}

	const ModalContent = () => {
		return (
			<View style={styles.modalContent.view}>
				<Text style={styles.modalContent.title}>{modalContentData.address}</Text>
				<Text style={styles.modalContent.text}>{modalContentData.currentConditions.temp}°C</Text>
				<Text style={styles.modalContent.text}>{modalContentData.currentConditions.conditions}</Text>
				<Text style={styles.modalContent.text}>Humidity {modalContentData.currentConditions.humidity}%</Text>
				<Text style={styles.modalContent.text}>Winddir {modalContentData.currentConditions.winddir}</Text>
				<Text style={styles.modalContent.text}>Windspeed {modalContentData.currentConditions.windspeed}mph</Text>

				<Text style={styles.modalContent.text}>Sunrise at {modalContentData.currentConditions.sunrise}</Text>
				<Text style={styles.modalContent.sunset}>Sunset at {modalContentData.currentConditions.sunset}</Text>

				<Text style={styles.modalContent.description}> {modalContentData.description}</Text>

				<Pressable
					onPress={() => {
						handleRemove(modalContentData.address)
					}}
				>
					<Text style={styles.modalContent.remove}>
            Remove
					</Text>
				</Pressable>
			</View>
		)
	}

	const WeatherCard = (item) => {
		const { data } = item
		return (
			<View style={styles.card.view}>
				<Text style={styles.card.title}>{data.address}</Text>
				<Text style={styles.card.temp}>{data.currentConditions.temp}C</Text>
				<Text style={styles.card.text}>{data.currentConditions.conditions}</Text>
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
				onSubmitEditing={() => {
					setLoading(true)
					handleSearch(searchText)
				}}
			/>
			{ isLoading && <ActivityIndicator size="large" color="#0000ff" /> }
			<FlatList
				data={data}
				keyExtractor={( item ) => item.address}
				renderItem={({ item }) => ( 
					<View style={[styles.item]}>
						<Pressable
							onPress={() => {
								setLoading(true)
								handleSearch(item.address)
							}}
						> 
							<WeatherCard data={item}/>
						</Pressable>
					</View>
				)}
				contentContainerStyle={{ padding: 20 }}
				showsVerticalScrollIndicator={false}
			/>
			<Modal
				isVisible={isModalVisible}
				useNativeDriver
				animationIn="slideInUp"
				animationOut="slideOutDown"
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

	card: {
		view: {
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
			elevation: 5,
		},
		title: {
			fontSize: 20,
			fontWeight: 'bold',
		},
		text: {
			fontSize: 16,
			textAlign: 'center',
		},
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
		view: {
			alignItems: 'center',
			backgroundColor: 'white',
			borderRadius: 4,
			width: Dimensions.get('window').width,
			height: 300,
			padding: 22,
		},
		text: {
			fontSize: 14,
			textAlign: 'center',
		},
		title: {
			fontSize: 20,
			fontWeight: 'bold',
			color: colors.black,
		},
		temp: {
			fontSize: 16,
			textAlign: 'center',
		},
		sunset: {
			paddingBottom: 20,
		},
		description: {
			paddingTop: 20,
			fontSize: 12,
			textAlign: 'center',
			borderTopColor: colors.black,
			borderTopWidth: 1,
		},
		remove: {
			paddingTop: 20,
			fontSize: 12,
			textAlign: 'center',
			color: colors.red,
		}
	},
})

