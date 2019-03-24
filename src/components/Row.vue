<template>
    <tr class="text-center">
        <th scope="row">{{ rowName }}</th>
        <td v-for="(day, index) in monthData" :key="day.id" contenteditable="true" v-on:keyup.enter="clickedCellBlur(index, $event)" v-on:click="clickedCellFocus(index, $event)" v-on:blur="clickedCellBlur(index, $event)">{{ day }}</td>
        <td>{{ total }}</td>
    </tr>
</template>

<script>
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
                    this.monthData[index] = parseInt(event.target.innerHTML);
                    event.target.innerHTML = '';
                    this.cellSelected = true;
                } else {
                    if(!isNaN(parseInt(this.monthData)) && this.monthData !== 0) {
                        event.target.innerHTML = this.monthData[index];
                    }
                }
            },
            clickedCellBlur: function(index, event) {
                // If the user did not enter anything into the cell, then set back its original value.
                if(event.target.innerHTML === '') {
                    if(isNaN(parseInt(this.monthData[index]))) {
                        event.target.innerHTML = '';
                    } else {
                        event.target.innerHTML = this.monthData[index];
                    }
                }
                else if(isNaN(parseInt(event.target.innerHTML))) {
                    this.monthData[index] = '';
                    event.target.innerHTML = '';
                }
                else {
                    this.monthData[index] = parseInt(event.target.innerHTML);
                }
                
                // If the user entered a NaN.
                if(isNaN(parseInt(this.monthData[index]))) {
                    console.log('setting value to zero');
                    this.monthData[index] = '';
                    event.target.innerHTML = '';
                }

                // Set the class for the cell.
                if(parseInt(event.target.innerHTML) > 0) {
                    event.target.classList.add('makeBold');
                } else {
                    event.target.classList.remove('makeBold');
                }

                console.log(`Clicked cell ${index+1} with value ${this.monthData[index]}`);
                
                // Calculate total
                this.total = 0
                for(let value of this.monthData) {
                    if(!isNaN(parseInt(value))) {
                        this.total += value;
                    }
                }

                // TODO: Send POST data back to server and store in database. 

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