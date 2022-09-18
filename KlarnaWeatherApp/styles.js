import { StyleSheet, Dimensions } from 'react-native'

import { colors } from './Colors'

export const styles = StyleSheet.create({
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