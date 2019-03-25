<template>
    <tr class="text-center">
        <th scope="row">{{ rowName }}</th>
        <td v-for="(day, index) in monthData" :key="day.id" contenteditable="true" v-on:keyup.enter="clickedCellBlur(index, $event)" v-on:click="clickedCellFocus(index, $event)" v-on:blur="clickedCellBlur(index, $event)">{{ day.duration }}</td>
        <td>{{ total }}</td>
    </tr>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'Row',
        props: {
            rowName: {
                type: String,
                required: true
            },
            monthData: {
                type: Array,
                required: true
            }
        },

        data: function() {
            return {
                // Is a cell in this row selected?
                cellSelected: false,

                // The sum of all cell values in this row.
                total: 0
            }
        },

        methods: {
            clickedCellFocus: function(index, event) {
                if(this.cellSelected === false) {
                    this.monthData[index].duration = parseInt(event.target.innerHTML);
                    event.target.innerHTML = '';
                    this.cellSelected = true;
                } else {
                    if(!isNaN(parseInt(this.monthData)) && this.monthData !== 0) {
                        event.target.innerHTML = this.monthData[index].duration;
                    }
                }
            },
            clickedCellBlur: function(index, event) {
                // If the user did not enter anything into the cell, then set back its original value.
                if(event.target.innerHTML === '') {
                    if(isNaN(parseInt(this.monthData[index].duration))) {
                        event.target.innerHTML = '';
                    } else {
                        event.target.innerHTML = this.monthData[index].duration;
                    }
                }
                else if(isNaN(parseInt(event.target.innerHTML))) {
                    this.monthData[index].duration = '';
                    event.target.innerHTML = '';
                }
                else {
                    this.monthData[index].duration = parseInt(event.target.innerHTML);
                }
                
                // If the user entered a NaN.
                if(isNaN(parseInt(this.monthData[index].duration))) {
                    console.log('setting value to zero');
                    this.monthData[index].duration = '';
                    event.target.innerHTML = '';
                }

                // Set the class for the cell.
                if(parseInt(event.target.innerHTML) > 0) {
                    event.target.classList.add('makeBold');
                } else {
                    event.target.classList.remove('makeBold');
                }

                console.log(`Clicked cell ${index+1} with value ${this.monthData[index].duration}`);
                
                // Calculate total
                this.total = 0
                for(let value of this.monthData) {
                    if(!isNaN(parseInt(value.duration))) {
                        this.total += value.duration;
                    }
                }
                
                // Send POST data back to server and store in database. 
                axios.put('http://localhost:5000/user/client', {'duration': this.monthData[index].duration, 'session_id': this.monthData[index].session_id}, {headers: {Authorization: `Bearer ${localStorage.getItem('jwt')}`}})
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error);
                });

                // Reset
                this.cellSelected = false;
                
                // TODO: If keyboard event 'enter' key was pressed, remove the newline and deselect the current cell.
            }
        }
    }
</script>

<style>
.makeBold {
    font-weight: bold;
}
</style>