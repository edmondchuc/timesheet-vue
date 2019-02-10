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
                this.selectedCellValue = event.target.innerHTML;
                event.target.innerHTML = '';
            },
            clickedCellBlur: function(index, event) {
                if(event.target.innerHTML === '') {
                    event.target.innerHTML = this.monthData[index];
                }
                else {
                    this.monthData[index] = event.target.innerHTML;
                    console.log(`Clicked cell ${index+1} with value ${this.monthData[index]}`);
                }
            }
        }
    }
</script>