<template>
    <tr>
        <th scope="row">{{ studentName }}</th>
        <td v-for="(day, index) in monthData" :key="day.id" contenteditable="true" v-on:click="clickedCellFocus($event)" v-on:blur="clickedCellBlur(index, $event)">{{ day }}</td>
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
            clickedCellFocus: function(event) {
                this.selectedCellValue = parseInt(event.target.innerHTML);
                event.target.innerHTML = '';
            },
            clickedCellBlur: function(index, event) {
                // If the user entered a NaN.
                if(this.monthData[index] === NaN) {
                    this.monthData[index] = 0;
                }

                // If the user did not enter anything into the cell, then set back its original value.
                if(event.target.innerHTML === '') {
                    event.target.innerHTML = parseInt(this.monthData[index]);
                }
                else {
                    this.monthData[index] = parseInt(event.target.innerHTML);
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