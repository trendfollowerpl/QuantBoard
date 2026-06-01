<template>
  <div class="candle" :style="{ width: width + '%' }">
    <!-- Wick -->
    <div
      class="wick"
      :style="{
        bottom: lowPct + '%',
        height: (highPct - lowPct) + '%'
      }"
    ></div>

    <!-- Body -->
    <div
      class="body"
      :style="{
        bottom: bodyBottom + '%',
        height: bodyHeight + '%',
        backgroundColor: bodyColor,
        border: bodyBorder
      }"
    ></div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  candle: { type: Object, required: true },
  min: { type: Number, required: true },
  max: { type: Number, required: true },
  width: { type: Number, required: true }
});

// Scale helper
const scale = (v) => ((v - props.min) / (props.max - props.min)) * 100;

// Precomputed values
const openPct = computed(() => scale(props.candle.open));
const closePct = computed(() => scale(props.candle.close));
const highPct = computed(() => scale(props.candle.high));
const lowPct = computed(() => scale(props.candle.low));

const bodyBottom = computed(() => Math.min(openPct.value, closePct.value));
const bodyHeight = computed(() =>
  Math.abs(openPct.value - closePct.value)
);

const isBullish = computed(() => props.candle.close >= props.candle.open);

const bodyColor = computed(() =>
  isBullish.value ? 'var(--candle-up)' : 'var(--candle-down)'
);

const bodyBorder = computed(() =>
  isBullish.value ? '1px solid var(--candle-border)' : 'none'
);
</script>

<style scoped>
.candle {
  position: relative;
  height: 100%;
  display: flex;
  justify-content: center;
}

.wick {
  position: absolute;
  width: 2px;
  background-color: var(--candle-border);
  left: 50%;
  transform: translateX(-50%);
}

.body {
  position: absolute;
  width: 60%;
  border-radius: 2px;
}
</style>
