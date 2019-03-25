<template>
  <div class="timesheet">
    <button v-on:click="logOut" type="button" class="btn btn-light">Log out</button>

    <!-- Button to activate modal for add new client -->
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#addClient">Add client</button>

    <!-- Modal to add new client -->
    <div class="modal fade" id="addClient" tabindex="-1" role="dialog" aria-labelledby="addClientTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addClientTitle">Add client</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="input-group mb-3">
              <input v-model="clientName" type="text" class="form-control" placeholder="Client's name" aria-label="clientName" aria-describedby="basic-addon1">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button v-on:click="addClient" type="button" class="btn btn-primary" data-dismiss="modal">Save</button>
          </div>
        </div>
      </div>
    </div>
    
    <h1>Welcome, {{ username }}</h1>
    
    <div class="table-responsive">
      <table class="table table-hover-cells table-bordered table-striped">
        <thead>
          <tr class="table-primary">
            <th scope="col">{{ getMonth() }} {{ getYear() }}</th>
            <td v-for="(day, index) in weekdaysForTheMonth()" :key="day.id" v-bind:id="['' + (index + 1)]" >{{ index + 1 }}<br>{{ weekdays[day] }}</td>
            <td>Total</td>
          </tr>
        </thead>
        <tbody>
          <div v-for="client in clients" :key="client.id" is="Row" v-bind:rowName='client.name' v-bind:monthData='client.row'></div>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Row from './Row.vue'
import axios from 'axios'

export default {
  name: 'Timesheet',
  components: {
    Row
  },
  props: {
    msg: String
  },

  data: function() {
    return {
      get username() {
        return localStorage.getItem('username');
      },
      clientName: "",
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      // test: ['', '', '', '', '','', '', '', '', '','', '', '', '', '','', '', '', '', '','', '', '', '', '', '', '', '', '', '', ''],
      clients: []
    }
  },

  mounted() {
    if(localStorage.getItem('jwt') === null) {
      // Go to login page
      this.$router.push('/')
    }
    else{
      setTimeout( () => {
        // Scroll into view of cell with today's date on load.
        let today = new Date();
        today = today.getDate();
        var el = document.getElementById('' + today);  
        el.scrollIntoView({behaviour: 'smooth', block: 'center', inline: 'nearest'});
      }, 500);

      // Load clients and sessions from server.
      axios.get('http://localhost:5000/user/client', {headers: {Authorization: `Bearer ${localStorage.getItem('jwt')}`}})
      .then(response => {
        this.clients = response.data;
        console.log(this.clients);
      })
      .catch(error => {
        console.log(error);
      });
    }
  },

  methods: {
    addClient: function() {
      let row = this.weekdaysForTheMonth()
      for(let i = 0; i < row.length; i++) {
        row[i] = '';
      }

      // Send request to server.
      axios.post('http://localhost:5000/user/client', {name: this.clientName, row: row}, {headers: {Authorization: `Bearer ${localStorage.getItem('jwt')}`}})
      .then(response => {
        console.log(response.data);

        // TODO: Add the response to the array instead.
        this.clients.push({'name': response.data.name, 'row': response.data.row});
        // console.log(this.clients);
      })
      .catch(error => {
        console.log(error);
      });
      
      this.clientName = "";
    },
    logOut: function() {
      localStorage.clear();
      this.$router.push('/')
    },
    getYear: function() {
      let date = new Date();
      return date.getFullYear();
    },
    getDaysInCurrentMonth: function() {
      let now = new Date();
      return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    },
    getMonth: function() {
      let month = new Date().getMonth();
      return this.months[month];
    },
    getWeekDay: function() {
      let day = new Date().getDay();
      return this.weekdays[day];
    },
    weekdayOfTheStartOfTheMonth: function() {
      // Get the weekday of the first day of the month.
      let today = new Date();
      let start = today.getDate();
      let weekday = today.getDay();
      for(let i = start; i > 1; i--) {
        weekday--;
        if(weekday === -1) {
          weekday = 6;
        } 
      }
      return weekday;
    },
    weekdaysForTheMonth: function() {
      // Get an array of the weekdays for the current month.
      let start = this.weekdayOfTheStartOfTheMonth();
      let days = this.getDaysInCurrentMonth();
      let month = []; // weekdays for the current month
      for(let i = 0; i < days; i++) {
        if(start > 6) {
          start = 0;
        }
        month.push(start);
        start++;
      }
      return month;
    },
    getDateRow: function() {
      let weekday = this.weekdaysForTheMonth();
      let date = this.weekdayOfTheStartOfTheMonth();
      let day = [] // row of days in the month
      for(let i = 0; i < weekday.length; i++) {
        day.push({
          weekday: weekday[i],
          date: date[i]
        })
      }
      return day;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.table-hover-cells > tbody > tr > th:hover,
.table-hover-cells > tbody > tr > td:hover {
  background-color: #f5f5f5;
}

.table-hover-cells > tbody > tr > th.active:hover,
.table-hover-cells > tbody > tr > td.active:hover,
.table-hover-cells > tbody > tr.active > th:hover,
.table-hover-cells > tbody > tr.active > td:hover {
  background-color: #e8e8e8;
}
thead {
  font-weight: bold;
}
</style>
