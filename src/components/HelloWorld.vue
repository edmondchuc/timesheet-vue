<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    
    <div class="table-responsive">
      <table class="table table-hover-cells table-bordered table-striped">
        <thead>
          <tr class="table-primary">
            <th scope="col">{{ getMonth() }} {{ getYear() }}</th>
            <td v-for="(day, index) in weekdaysForTheMonth()" :key="day.id">{{ index + 1 }}<br>{{ weekdays[day] }}</td>
          </tr>
        </thead>
        <tbody>
          <div is="AppRow" studentName='Student One' v-bind:monthData='test'></div>
        </tbody>
      </table>
    </div>
    

  </div>
</template>

<script>
import AppRow from './app-row.vue'

export default {
  name: 'HelloWorld',
  components: {
    AppRow
  },
  props: {
    msg: String
  },
  data: function() {
    return {
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      test: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
  },
  methods: {
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
