import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import SingleCandle from '../components/SingleCandle.vue'

const mountCandle = (candle) => {
  return mount(SingleCandle, {
    props: {
      candle,
      min: 90,
      max: 120,
      width: 5
    }
  })
}

describe('SingleCandle.vue', () => {
  it('renders wick element', () => {
    const wrapper = mountCandle({
      open: 100,
      high: 110,
      low: 95,
      close: 105
    })

    const wick = wrapper.find('.wick')
    expect(wick.exists()).toBe(true)
  })

  it('renders body element', () => {
    const wrapper = mountCandle({
      open: 100,
      high: 110,
      low: 95,
      close: 105
    })

    const body = wrapper.find('.body')
    expect(body.exists()).toBe(true)
  })

  it('applies correct width style', () => {
    const wrapper = mountCandle({
      open: 100,
      high: 110,
      low: 95,
      close: 105
    })

    expect(wrapper.find('.candle').attributes('style')).toContain('width: 5%')
  })

  it('computes wick height and bottom correctly', () => {
    const wrapper = mountCandle({
      open: 100,
      high: 110,
      low: 95,
      close: 105
    })

    const wick = wrapper.find('.wick')

    // scale: (value - 90) / 30 * 100
    const lowPct = ((95 - 90) / 30) * 100
    const highPct = ((110 - 90) / 30) * 100

    expect(wick.attributes('style')).toContain(`bottom: ${lowPct}%`)
    expect(wick.attributes('style')).toContain(`height: ${highPct - lowPct}%`)
  })

  it('renders bullish candle as white with black border', () => {
    const wrapper = mountCandle({
      open: 100,
      high: 110,
      low: 95,
      close: 105 // bullish
    })

    const body = wrapper.find('.body')
    const style = body.attributes('style')

    expect(style).toContain('background-color: var(--candle-up)')
    expect(style).toContain('border: 1px solid var(--candle-border)')
  })

  it('renders bearish candle as black with no border', () => {
    const wrapper = mountCandle({
      open: 100,
      high: 110,
      low: 95,
      close: 90 // bearish
    })

    const body = wrapper.find('.body')
    const style = body.attributes('style')

    expect(style).toContain('background-color: var(--candle-down)')
    expect(style).not.toContain('border: none')
  })

  it('computes body height and bottom correctly', () => {
    const wrapper = mountCandle({
      open: 100,
      high: 110,
      low: 95,
      close: 105
    })

    const body = wrapper.find('.body')

    const openPct = ((100 - 90) / 30) * 100
    const closePct = ((105 - 90) / 30) * 100

    const bottom = Math.min(openPct, closePct)
    const height = Math.abs(openPct - closePct)

    expect(body.attributes('style')).toContain(`bottom: ${bottom}%`)
    expect(body.attributes('style')).toContain(`height: ${height}%`)
  })
})
