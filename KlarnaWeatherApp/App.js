import React, { useState } from 'react'
import { FlatList, Text, View, TextInput, ActivityIndicator, Pressable } from 'react-native'

import Modal from 'react-native-modal'
import { styles } from './styles'

import getData from './data'
import { colors } from './Colors'

export default function App() {
	const [isModalVisible, setModalVisible] = useState(false)
	const [modalContentData, setModalContentData] = useState({})
	const [searchText, setSearchText] = useState('')
	const [isLoading, setLoading] = useState(false)
	const [data, setData] = useState([])

	const toggleModal = () => setModalVisible(!isModalVisible)
	const handleCachedLocations = (newLocationData) => setData([...data, newLocationData])

	const handleSuccess = (data, cached = false) => {
		setModalContentData(data)
		if(!cached) handleCachedLocations(data)
		toggleModal()
		setSearchText('')
		setLoading(false)
	}

	const handleError = (error) => {
		setSearchText(error.message)
		setTimeout(() => {
			setSearchText('')
		}, 1000)
		setLoading(false)
	}

	const handleSearch = (location) => {
		const found = data.filter(item => item.address === location)

		if (found.length > 0){
			const {currentConditions, address, description} = found[0]
			handleSuccess({currentConditions, address, description}, true)
			return
		}
		getData(location)
			.then(({ currentConditions, address, description }) => {
				handleSuccess({ currentConditions, address, description }, false)
			})
			.catch((error) => {
				handleError(error)
			})
	}

	const handleRemove = (location) => {
		const newData = data.filter(item => item.address !== location)
		setData(newData)
		toggleModal()
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

	const WeatherCard = (object) => {
		const { data } = object
		return (
			<View style={[styles.item]}>
				<Pressable
					onPress={() => {
						setLoading(true)
						handleSearch(data.address)
					}}
				> 
					<View style={styles.card.view}>
						<Text style={styles.card.title}>{data.address}</Text>
						<Text style={styles.card.temp}>{data.currentConditions.temp}C</Text>
						<Text style={styles.card.text}>{data.currentConditions.conditions}</Text>
					</View>
				</Pressable>
			</View>
		)
	}

	return (
		<View style={styles.container}>
			<Text style={{fontSize: 20, fontWeight: 'bold', marginTop: 40}}>
        Weather App
			</Text>
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
			{ isLoading && <ActivityIndicator size="large" color={colors.black} /> }

			<FlatList
				data={data}
				keyExtractor={(item) => item.address}
				renderItem={({ item }) => <WeatherCard data={item} />}
				contentContainerStyle={{ padding: 20 }}
				showsVerticalScrollIndicator={false}
				ListEmptyComponent={
					<Text style={styles.empty}>Please add a location above</Text>
				}
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
