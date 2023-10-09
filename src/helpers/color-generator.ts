type RGB = [number, number, number]
type RGBA = [number, number, number, number]
type HSB = [number, number, number]

export class ColorGenerator {
  static hexToRgb(hex: string): RGB {
    const bigint = parseInt(hex.slice(1), 16)
    const r = (bigint >> 16) & 255
    const g = (bigint >> 8) & 255
    const b = bigint & 255
    return [r, g, b]
  }

  static rgbToHex([r, g, b]: RGB): string {
    return '#' + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1).toUpperCase()
  }

  static rgbToHsb([r, g, b]: RGB): HSB {
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    const delta = max - min
    let h: number
    const s = max !== 0 ? delta / max : 0
    const v = max / 255
    if (max === min) {
      h = 0
    } else {
      switch (max) {
        case r:
          h = (g - b) / delta + (g < b ? 6 : 0)
          break
        case g:
          h = (b - r) / delta + 2
          break
        case b:
          h = (r - g) / delta + 4
          break
      }
      h /= 6
    }
    return [h, s, v]
  }

  static hsbToRgb([h, s, v]: HSB): RGB {
    const i = Math.floor(h * 6)
    const f = h * 6 - i
    const p = v * (1 - s)
    const q = v * (1 - f * s)
    const t = v * (1 - (1 - f) * s)
    let r: number, g: number, b: number
    switch (i % 6) {
      case 0:
        ;(r = v), (g = t), (b = p)
        break
      case 1:
        ;(r = q), (g = v), (b = p)
        break
      case 2:
        ;(r = p), (g = v), (b = t)
        break
      case 3:
        ;(r = p), (g = q), (b = v)
        break
      case 4:
        ;(r = t), (g = p), (b = v)
        break
      case 5:
        ;(r = v), (g = p), (b = q)
        break
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]
  }

  private static shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }

  static rgbToRgba([r, g, b]: RGB, alpha: number): RGBA {
    return [r, g, b, alpha]
  }

  static rgbaToHex([r, g, b, a]: RGBA): string {
    const alpha = Math.round(a * 255)
      .toString(16)
      .padStart(2, '0')
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}${alpha}`
  }

  static generateColorsFromPalette(n: number, palette: string[]): string[] {
    const paletteRGBs = palette.map(this.hexToRgb)
    const averageColor = paletteRGBs
      .reduce((acc, curr) => [acc[0] + curr[0], acc[1] + curr[1], acc[2] + curr[2]], [0, 0, 0])
      .map(val => val / palette.length) as RGB
    const [h, s, v] = this.rgbToHsb(averageColor)
    const colors: string[] = []
    for (let i = 0; i < n; i++) {
      const hueOffset = i / (n * 2)
      const newH = (h + hueOffset) % 1
      const newS = s > 0.5 ? s - 0.1 : s + 0.1
      const newV = Math.min(v * 1.3, 0.9) // Ensure it's not too close to white
      const newA = 0.6 + 0.4 * (i / n) // alpha varies from 0.6 to 1.0
      const newRGB = this.hsbToRgb([newH, newS, newV])
      const newRGBA = this.rgbToRgba(newRGB, newA)
      colors.push(this.rgbaToHex(newRGBA))
    }
    return this.shuffleArray(colors)
  }
}
