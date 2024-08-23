import { useEffect, useState } from "react";
import stockdata from "./stockdata.json"
import CandleChart from "./View/CandleChart";

function App() {

    const [stockData, setStockData] = useState<{ [key: string]: { '1. open': string; '2. high': string; '3. low': string; '4. close': string; '5. volume': string; } }>({});

    //api url and api key getting from .env
    const api_url = `${process.env.REACT_APP_API_URL}?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=${process.env.REACT_APP_API_KEY}`

    //fetch data from api
    async function getData(url: string): Promise<any> {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }

    useEffect(() => {
        //daily limit of api has been finished, so I made json for data fetching
        //     (async () => {
        //         await getData(api_url).then(data => {
        //             setStockData(data["Time Series (5min)"])
        //         }
        //     );
        // })()
        setStockData(stockdata["Time Series (5min)"])
    }, [])

    //

    return (
        <div className="p-4">
            <CandleChart data={stockData} />
        </div>
    );
}

export default App;
