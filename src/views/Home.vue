<template>
  <div>
    <NavBar />
    <WelcomeCpp />
    <AddCoin @added="change" />
    <ProfitDisplay :key="refreshComp" />
    <img id="bg" src="@/assets/Coins2.png" alt="" />
    <br />
    <LogOut />
  </div>
</template>

<script>
import WelcomeCpp from '../components/WelcomeCpp.vue'
import AddCoin from '../components/AddCoin.vue'
import ProfitDisplay from '../components/ProfitDisplay.vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import NavBar from '@/components/NavBar.vue'
import LogOut from '../components/LogOut.vue'

export default {
  name: 'App',
  components: {
    WelcomeCpp,
    AddCoin,
    ProfitDisplay,
    NavBar,
    LogOut
  },
  data() {
    return {
      refreshComp: 0,
      user: false
    }
  },
  methods: {
    change() {
      this.refreshComp += 1
    }
  },
  mounted() {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user
        console.log(user)
      }
    })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}

#bg {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 60%;
}
</style>
