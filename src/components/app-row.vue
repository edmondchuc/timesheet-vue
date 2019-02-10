<template>
    <tr>
        <th scope="row">{{ studentName }}</th>
        <td v-for="(day, index) in monthData" :key="day.id" contenteditable="true" v-on:click="clickedCellFocus(index, $event)" v-on:blur="clickedCellBlur(index, $event)">{{ day }}</td>
    </tr>
</template>

<script>
    export default {
        name: 'AppRow',
        props: {
            studentName: {
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
                selectedCellValue: undefined
            }
        },

        methods: {
            clickedCellFocus: function(index, event) {
                this.monthData[index] = parseInt(event.target.innerHTML);
                event.target.innerHTML = '';
            },
            clickedCellBlur: function(index, event) {
                // If the user did not enter anything into the cell, then set back its original value.
                if(event.target.innerHTML === '') {
                    event.target.innerHTML = parseInt(this.monthData[index]);
                }
                else if(isNaN(parseInt(event.target.innerHTML))) {
                    this.monthData[index] = 0;
                    event.target.innerHTML = 0;
                }
                else {
                    this.monthData[index] = parseInt(event.target.innerHTML);
                }
                
                // If the user entered a NaN.
                if(parseInt(this.monthData[index]) === NaN) {
                    console.log('setting value to zero');
                    this.monthData[index] = 0;
                    event.target.innerHTML = '0';
                }

                // Set the class for the cell.
                if(parseInt(event.target.innerHTML) > 0) {
                    event.target.classList.add('makeBold');
                } else {
                    event.target.classList.remove('makeBold');
                }

                console.log(`Clicked cell ${index+1} with value ${this.monthData[index]}`);
            }
        }
    }
</script>

<style>
.makeBold {
    font-weight: bold;
}
</style>