<template>
  <div>
    <h1 id="Current">Current portfolio</h1>
    <table id="table" class="auto-index">
      <tr>
        <th>S.No</th>
        <th>Coin</th>
        <th>Ticker</th>
        <th>Buy_Price</th>
        <th>Buy_Quantity</th>
        <th>Current_Price</th>
        <th>Profit</th>
        <th>Options</th>
      </tr>
      <!-- Now the coin data to come from data property,'tablerows', 
instead of javascript -->
      <!-- We will not use insert Row and insertcell etc.. -->
      <!-- :key acts as a unique idenfier to create rows -->
      <tr v-for="(row, index) in tableRows" :key="row.coin">
        <td>{{ index + 1 }}</td>
        <td>{{ row.coin }}</td>
        <td>{{ row.ticker }}</td>
        <td>{{ row.buyPrice }}</td>
        <td>{{ row.buyQuantity }}</td>
        <td>{{ row.currentPrice }}</td>
        <td>{{ row.profit }}</td>
        <td>
          <button @click="deleteInstrument(row.coin, useremail)" class="bwt">Delete</button>
        </td>
      </tr>
    </table>
    <br />
    <br />
    <h2 id="totalProfit">Total Profit is : {{ totalProfit }} USD</h2>
  </div>
</template>

<script>
import firebaseApp from '../firebase.js'
import { getFirestore } from 'firebase/firestore'
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore'
import ccxt from 'ccxt'
import { getAuth } from 'firebase/auth'
const db = getFirestore(firebaseApp)
export default {
  data() {
    return {
      useremail: '',
      tableRows: [],
      totalProfit: 0
    }
  },
  async mounted() {
    const auth = getAuth()
    this.useremail = auth.currentUser.email
    await this.fetchAndUpdateData(this.useremail)
  },
  methods: {
    async fetchAndUpdateData(useremail) {
      let allDocuments = await getDocs(collection(db, String(useremail)))
      this.totalProfit = 0
      // Promise.all to ensure all async operations are over.
      // allDocuments.docs.map(async (doc) to iterate over all documents and create arrays of promises
      this.tableRows = await Promise.all(
        allDocuments.docs.map(async (doc) => {
          let documentData = doc.data()
          let coin = documentData.Coin
          let ticker = documentData.Ticker
          let buyPrice = documentData.Buy_Price
          let buyQuantity = documentData.Buy_Quantity
          let currentPrice = await this.fetchCurrentPrice(ticker)
          let profit = Math.round(buyQuantity * (parseFloat(currentPrice) - parseFloat(buyPrice)))
          this.totalProfit += profit
          return {
            coin,
            ticker,
            buyPrice,
            buyQuantity,
            currentPrice,
            profit
          }
        })
      )
    },
    async fetchCurrentPrice(ticker) {
      let binance = new ccxt.binance()
      let x = await binance.fetch_ohlcv(ticker, '5m')
      return x[499][4]
    },
    async deleteInstrument(coin, user) {
      alert('You are going to delete: ' + coin)
      await deleteDoc(doc(db, user, coin))
      console.log('Document successfully deleted!', coin)
      // Refresh table data and total profit
      await this.fetchAndUpdateData(this.useremail)
    }
  }
}
</script>
<style>
h1,
h2 {
  text-align: center;
  background-color: rgb(129, 184, 99);
  font: 700;
  display: block;
  font-size: 2em;
  margin-block-start: 0.67em;
  margin-block-end: 0.67em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
}
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}
tr:nth-child(even) {
  background-color: #e3edee;
}
th,
td {
  border: 1px solid #dddddd;
  text-align: center;
  padding: 8px;
}
.bwt {
  color: rgb(243, 236, 236);
  background-color: rgb(255, 94, 0);
}
</style>
