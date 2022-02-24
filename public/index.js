async function main() {

    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');

    // 1bcf01bfa6d1425fb512f046ad8cc631 API KEY
    let response = await fetch('https://api.twelvedata.com/time_series?symbol=GME,MSFT,DIS,BNTX,&interval=1min&apikey=1bcf01bfa6d1425fb512f046ad8cc631', {})
    let parseData = response.json()
    console.log(parseData)

    const {GME, MSFT, DIS, BNTX} = mockData;
    const stocks = [GME, MSFT, DIS, BNTX]

    stocks.forEach(stock => stock.values.reverse())
    // var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(timeChartCanvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: stocks[0].values.map(value => value.datetime),
            datasets: stocks.map(stock => ({
                label: stock.meta.symbol,
                data: stock.values.map(value => parseFloat(value.high)),
                backgroundColor: getColor(stock.meta.symbol),
                borderColor: getColor(stock.meta.symbol),
            }))
        }
    });

    function getColor(stock) {
        if(stock === 'GME') {
            return 'rgba(61, 161, 61, 0.7)'
        }
        if(stock === 'MSFT') {
            return 'rgba(209, 4, 25, 0.7)'
        }
        if(stock === 'DIS') {
            return 'rgba(18, 4, 209, 0.7)'
        }
        if(stock === 'BNTX') {
            return 'rgba(166, 43, 158, 0.7)'
        }
    }

    var highestStock = new Chart(highestPriceChartCanvas.getContext('2d'), {
        type: 'bar',
        data: {
            labels: stocks[0].values.map(value => value.high),
            datasets: stocks.map(stock => ({
                label: stock.meta.symbol,
                data: stock.values.map(value => parseFloat(value.high)),
                backgroundColor: getColor(stock.meta.symbol),
                borderColor: getColor(stock.meta.symbol),
            }))
        },
        options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Highest Stock Price'
              }
            }
        }
    });

}

main()