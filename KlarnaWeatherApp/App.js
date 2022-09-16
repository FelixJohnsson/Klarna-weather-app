import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const weatherData = [
  { id: '1', name: 'Stockholm', temp: '10' },
  { id: '2', name: 'London', temp: '5' },
  { id: '3', name: 'New York', temp: '15' },
  { id: '4', name: 'Tokyo', temp: '20' },
  { id: '5', name: 'Sydney', temp: '25' },
]

const colors = {
  hot: '#FF6347',
  warm: '#FFA500',
  cold: '#00BFFF',

  black: '#000000',
  white: '#FFFFFF',

}

export default function App() {
  return (
    <View style={styles.container}>
      <FlatList
        data={weatherData}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.temp}>{item.temp}°C</Text>
          </View>
        )}
      />
    </View>
  );
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
    borderColor: colors.black,
    borderWidth: 1,
    padding: 100,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});
