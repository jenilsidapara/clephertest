import React, { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';

interface StockData {
    [date: string]: {
        '1. open': string;
        '2. high': string;
        '3. low': string;
        '4. close': string;
        '5. volume': string;
    };
}

interface CandleChartProps {
    data: StockData;
}

const CandleChart: React.FC<CandleChartProps> = ({ data }) => {
    const [chartOptions, setChartOptions] = useState<any>(null);
    const [chartSeries, setChartSeries] = useState<any[]>([]);

    //add chartSeries and chartOptions to create chart as per data
    useEffect(() => {
        const labels = Object.keys(data).reverse();
        const formattedData = labels.map(label => [
            new Date(label),
            parseFloat(data[label]['1. open']),
            parseFloat(data[label]['2. high']),
            parseFloat(data[label]['3. low']),
            parseFloat(data[label]['4. close']),
        ]);

        setChartOptions({
            chart: {
                type: 'candlestick',
                height: 350,
            },
            title: {
                text: 'Candlestick Chart',
                align: 'left',
            },
            xaxis: {
                type: 'datetime',
            },
            yaxis: {
                tooltip: {
                    enabled: true,
                },
            },
        });
        setChartSeries([
            {
                name: 'Candlestick Data',
                data: formattedData,
            },
        ]);
    }, [data]);

    return (
        <div>
            {chartOptions && chartSeries.length > 0 && (
                <ApexCharts
                    options={chartOptions}
                    series={chartSeries}
                    type="candlestick"
                    height={350}
                />
            )}
        </div>
    );
};

export default CandleChart;
