async function fetchCryptoPrices() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,fetch-ai,pepe,dogecoin,binancecoin&vs_currencies=usd');
        const prices = await response.json();

        const indent = 2;
        const cryptoPrices = {
            bitcoin: prices.bitcoin.usd,
            ethereum: prices.ethereum.usd,
            solana: prices.solana.usd,
            'fetch-ai': prices['fetch-ai'].usd,
            pepe: prices.pepe.usd,
            dogecoin: prices.dogecoin.usd,
            binancecoin: prices.binancecoin.usd
        };

        const valFormat = (val) => {
            if (typeof val === 'number') return `<span class="value number">${val}</span>`;
            else if (typeof val === 'string') return `<span class="value string">"${val}"</span>`;
        };

        document.querySelector(".screen").innerHTML =
            `<span class="keyword">const</span>
            <span class="def">cryptoPrices</span>
            <span class="operator">=</span> {<br>` +
            Object.entries(cryptoPrices).reduce((str, [key, val]) => str + `${'&nbsp;'.repeat(indent)}<span class="property">${key}</span>: ${valFormat(val)},<br>`, '') +
            '};';

    } catch (error) {
        console.error('Error fetching crypto prices:', error);
    }
}

function startFetching() {
    fetchCryptoPrices();
    setInterval(fetchCryptoPrices, 60000); // Mettre à jour toutes les 60 secondes
}

startFetching();