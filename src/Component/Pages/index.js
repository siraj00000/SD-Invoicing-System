import React from 'react'
import { View, Dimensions, ScrollView } from 'react-native'
import { LineChart, BarChart } from 'react-native-chart-kit'
import { color1, color2, color3 } from '../../Themes/Color'


const line = {
    labels: ['Jan', 'Feb', 'March', 'April', 'May', 'June'],
    datasets: [
        {
            data: [20, 45, 28, 80, 99, 43],
            strokeWidth: 2, // optional
        },
    ],
};
const barChart = {
    labels: ["Mon", "Tues", "Wed", "Thur", "Fri", "Sat"],
    datasets: [
        {
            data: [30, 49, 88, 20, 99, 63]
        }
    ]
};
export const Pages = () => {
    return (
        <View>
            <LineChart
                data={line}
                width={Dimensions.get('window').width * .9} // from react-native
                height={220}
                yAxisLabel={'$'}
                chartConfig={chartConfig}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16,
                    backgroundColor: color2,
                }}
            />
            <BarChart
                data={barChart}
                width={Dimensions.get('window').width * .9} // from react-native
                height={220}
                yAxisLabel="$"
                chartConfig={chartConfig}
                verticalLabelRotation={30}
                style={{
                    marginVertical: 8,
                    borderRadius: 16,
                    backgroundColor: color2,
                }}
            />
        </View>
    )
}

const chartConfig = {
    backgroundGradientFrom: color1,
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: color3,
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(243, 114, 22, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
};
