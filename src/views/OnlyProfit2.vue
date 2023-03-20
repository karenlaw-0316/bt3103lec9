<template>
  <div>
    <NavBar />

    <h3>This is Profit Page</h3>
    <ProfitDisplay2 />
    <LogOut />
  </div>
</template>

<script>
import ProfitDisplay2 from '@/components/ProfitDisplay.vue'
import NavBar from '../components/NavBar.vue'
import LogOut from '../components/LogOut.vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

export default {
  name: 'OnlyProfit2',
  components: {
    ProfitDisplay2,
    NavBar,
    LogOut
  },
  data() {
    return { user: false, useremail: '' }
  },
  mounted() {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user
        this.useremail = user.email
      }
    })
  }
}
</script>
