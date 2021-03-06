import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const ChartColor = ['rgba(0, 28, 255, 0.59)','rgba(142, 28, 255, 0.59)','rgba(142, 211, 40, 0.59)',
'rgba(255, 81, 40, 0.59)'];
const ChartBorder = ['rgba(0, 28, 255, 1)','rgba(142, 28, 255, 1)','rgba(142, 211, 40, 1)',
'rgba(255, 81, 40, 1)'];

export function GetIconUrl(icon) {
    return `../img/${icon}.svg`;
    //return `http://openweathermap.org/img/wn/${icon}@2x.png`;
}

export function GetHourOnly(time){
    let hour = new Date(time * 1000).getHours();
    if(hour> 12){
        hour = hour - 12;
        return `${hour} PM`;
    }
    return `${hour} AM`;
}

const GetDay = (dateObj) => {
    var date = new Date(dateObj.time * 1000).getDay();
    let day = "";
    switch (date) {
        case 0:
            day = "Sunday"; break;

        case 1:
            day = "Monday"; break;

        case 2:
            day = "Tuesday"; break;

        case 3:
            day = "Wednesday"; break;

        case 4:
            day = "Thursday"; break;

        case 5:
            day = "Friday"; break;

        case 6:
            day = "Saturday"; break;

        default:
            day = ""; break;

    }
    return day;
}

const GRAPH = {
    options: {
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    color: "black",
                    fontSize: 18
                }
            },
        },

        scales: {
            y: {
                ticks: {
                    color: "black",
                    font: 18,
                }
            },
            x: {
                ticks: {
                    color: "black",
                    font: 14,
                }
            }
        }
    }
}

const GraphDataset = (weather, propArr) => {
    const index = Math.floor(Math.random() * ChartColor.length);
    const color = [ChartColor[index], ChartColor[(index +1) % ChartColor.length]];
    const border = [ChartBorder[index],ChartBorder[(index +1) % ChartBorder.length]];

    let graphData = propArr.map((item,index)=>{
        return {
            label: item.title,
            data: weather.data.map(i => i[item.property]),
            backgroundColor: color[index],
            borderColor: border[index],
            borderWidth: 1
        };
    })

    return graphData;
}
let weeklyChart;
export function GetWeeklyGraph(weekly, type) {
    if (weeklyChart) weeklyChart.destroy();
    const Datasets = CreateDataset(weekly, type);
    let elem = document.getElementById('weeklyChart');
    if (elem !== null && elem !== undefined) {
        let ctx = elem.getContext('2d');
        weeklyChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: weekly.data.map(i => GetDay(i)),
                datasets: Datasets
            },
            options: GRAPH.options
        });
    }
}

const CreateDataset = (weekly, type) => {
    let dataset;
    switch (type) {
        case 0:
            dataset = GraphDataset(weekly, [{'title':'Temp High', 'property':'temperatureHigh'},{'title':'Temp Low', 'property':'temperatureLow'}]);
            break;
        case 1:
            dataset = GraphDataset(weekly, [{'title':'Precipitation Probability', 'property':'precipProbability'}]);
            break;
        case 2:
            dataset = GraphDataset(weekly, [{'title':'Wind Speed', 'property':'windSpeed'}]);
            break;
        case 3:
            dataset = GraphDataset(weekly, [{'title':'Humidity', 'property':'humidity'}]);
            break;
        case 4:
            dataset = GraphDataset(weekly, [{'title':'Cloud Cover', 'property':'cloudCover'}]);
            break;

        default:
            dataset = GraphDataset(weekly, ['Temp High', 'temperatureHigh','Temp Low', 'temperatureLow']);
            break;
    }
    return dataset;
}


