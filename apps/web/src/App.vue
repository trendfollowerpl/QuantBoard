<template>
  <div class="chart-area">
    <SingleCandle
      :candle="candle"
      :min="min"
      :max="max"
      :width="5"
    />
  </div>
</template>

<script setup>
import SingleCandle from './components/SingleCandle.vue';

const candle = {
  open: 100,
  high: 110,
  low: 95,
  close: 105
};

const min = 90;
const max = 120;
</script>

<style scoped>
.chart-area {
  height: 300px;
  width: 200px;
  border: 1px solid #ccc;
  position: relative;
}
</style>
