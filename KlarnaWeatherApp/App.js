import React from 'react'
import { FlatList, StyleSheet, Text, View, Dimensions, Animated, TouchableOpacity } from 'react-native'

import Modal from 'react-native-modal'

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

const colors = {
	hot: '#FF6347',
	warm: '#FFA500',
	cold: '#00BFFF',

	black: '#000000',
	white: '#FFFFFF', 

}



const calculateTempColor = (temp) => {
	if (temp > 30) {
		return colors.hot
	} else if (temp > 15) {
		return colors.warm
	} else {
		return colors.cold
	}
}



export default function App() {

	return (

		<View style={styles.container}>
			<Modal isVisible={true}>
				<FlatList
					data={weatherData}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => ( 
						<Animated.View style={[styles.item, { borderWidth:1, borderColor: calculateTempColor(item.temp)}]}>
							<TouchableOpacity
								onPress={(e) => console.log(e.nativeEvent)}
							> 
								<Text style={styles.name}>{item.name}</Text>
								<Text style={styles.temp}>{item.temp}°C</Text>
							</TouchableOpacity>
						</Animated.View>
					)}
					contentContainerStyle={{ padding: 20 }}
					showsVerticalScrollIndicator={false}
				/>
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
})

