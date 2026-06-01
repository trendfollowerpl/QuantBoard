# `candles.md`  
## **Requirements for the OHLC Candle Component (`SingleCandle.vue`)**

### 1. Purpose  
The component is responsible for rendering **a single OHLC candle** (Open–High–Low–Close) used in financial charts.  
It does **not** manage multiple candles, axes, interactions, or chart layout.

---

## 2. Input Data (Props)

The component accepts the following props:

- **`candle: { open: number, high: number, low: number, close: number }`**  
  OHLC values for the candle.

- **`min: number`**  
  Minimum value of the visible chart range (used for vertical scaling).

- **`max: number`**  
  Maximum value of the visible chart range.

- **`width: number`**  
  Candle width expressed as a percentage of the container’s width.

---

## 3. Visual Logic

### 3.1 Candle Color  
- **Black candle** when `close < open` (bearish).  
- **White candle** when `close >= open` (bullish).  
- **White candles must have a black border** (1px solid).

Colors must be sourced from global CSS variables:

```css
:root {
  --candle-up: white;
  --candle-down: black;
  --candle-border: black;
}
```

### 3.2 Wick (High–Low Line)  
- Always uses `var(--candle-border)` as color.  
- Positioned vertically from `low` to `high`.  
- Centered horizontally relative to the candle body.

### 3.3 Body (Open–Close Rectangle)  
- Vertical position spans from `min(open, close)` to `max(open, close)`.  
- Height is computed as a percentage of the visible range.  
- Optional small corner rounding (e.g., 2px).

---

## 4. Value Scaling  
All OHLC values must be converted to percentages relative to the visible range:

```
pct = (value - min) / (max - min) * 100
```

The component positions all elements using absolute positioning in percentage units.

---

## 5. No Configuration  
At this stage, the component:

- does **not** expose any configuration options  
- does **not** allow customizing colors, borders, widths, or styles  
- does **not** support animations  
- does **not** support user interactions  

---

## 6. No External Libraries  
The component must be implemented **entirely manually**, without using charting libraries such as:

- Chart.js  
- D3.js  
- Highcharts  
- Lightweight Charts  
- Any other visualization library  

---

## 7. Scope of Responsibility  
The component:

- renders **exactly one** candle  
- does not manage collections of candles  
- does not draw axes or gridlines  
- does not handle zooming or panning  
- does not provide tooltips  
- does not handle mouse or touch events  
- does not animate  

---

## 8. Styling

### 8.1 Local Styling  
- All structural styles must be defined inside the component (`<style scoped>`).  
- The component background is transparent.  
- Wick and body must be positioned using absolute coordinates.

### 8.2 Global Styling  
The **only** allowed global styling is the definition of CSS variables:

```css
:root {
  --candle-up: white;
  --candle-down: black;
  --candle-border: black;
}
```

No global resets, layout rules, or structural styles may affect the component.

---

## 9. Non‑Functional Requirements

### 9.1 Performance  
- Rendering must be lightweight and fast.  
- No heavy computations or unnecessary DOM operations.

### 9.2 Code Quality  
- Code must be clean, modular, and easy to extend.  
- Scaling logic and color logic must be clearly separated.

### 9.3 Testability  
The component must allow unit testing, including:

- correct color selection  
- correct scaling  
- correct body and wick positioning  

---

## 10. Example Usage

```vue
<SingleCandle
  :candle="{ open: 100, high: 110, low: 95, close: 105 }"
  :min="90"
  :max="120"
  :width="2"
/>
```

---

If you want, I can now generate:

- the **Vue 3 component skeleton**,  
- a **diagram** showing rendering flow,  
- or the **requirements for the multi‑candle container**.

Just tell me which direction you want next.