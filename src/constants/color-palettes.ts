export const COLOR_PALETTE_GENERAL = ['#57007B', '#AA0070', '#E0395C', '#FD7A4B', '#FFBA4B', '#F9F871']
export const COLOR_PALETTE_PURPLE = ['#5f3a6e', '#8d6c9d', '#b99bcf', '#dbc0f2', '#f0e0fa']
export const COLOR_PALETTE_ORANGE = ['#ffa600', '#ff8000', '#ff8c00', '#ffa200', '#ff9100']
export const COLOR_PALETTE_GREEN = ['#5b8c5a', '#7aa878', '#9ac49a', '#bad0bc', '#daeada']
export const COLOR_PALETTE_BLUE = ['#003366', '#005c99', '#0077cc', '#0099ff', '#66ccff']
export const COLOR_PALETTE_RED = ['#b55c5c', '#c87c7c', '#db9c9c', '#edbcbc', '#ffdbdb']
export const COLOR_PALETTE_CATEGORICAL = [
  '#1F77B4',
  '#FF7F0E',
  '#2CA02C',
  '#D62728',
  '#9467BD',
  '#8C564B',
  '#E377C2',
  '#7F7F7F',
  '#BCBD22',
  '#17BECF'
]
export const COLORS = [
  '#57007B',
  '#AA0070',
  '#E0395C',
  '#FD7A4B',
  '#FFBA4B',
  '#F9F871',
  '#0047B2',
  '#0072D3',
  '#0098DF',
  '#00BBD9',
  '#00DBCB',
  '#775784',
  '#FFE8FF',
  '#5FBAB0',
  '#C2FCF4',
  '#4A817A',
  '#B3A7B7',
  '#7F7382',
  '#750000',
  '#B13A05',
  '#90AECF',
  '#E8D5B5',
  '#FCA6FF',
  '#2CBEB2',
  '#FFFADE',
  '#D8E7F8',
  '#477EAC',
  '#12EDDD',
  '#00B4A6',
  '#007E72',
  '#A486AE',
  '#FFF6FF',
  '#4E4351',
  '#00463E',
  '#007A6D',
  '#564C00',
  '#0062B7',
  '#BDA79E',
  '#006ED3',
  '#00B9F1',
  '#37FCEB',
  '#8F5300',
  '#007F8E',
  '#C39FD0',
  '#447CA9',
  '#3B4856',
  '#BB008D',
  '#AD2100',
  '#DE89FF',
  '#429F95',
  '#00524B',
  '#8133A5',
  '#AD5CD0',
  '#DA86FD',
  '#FFB1FF',
  '#AC5BCF',
  '#2C0053',
  '#EC96FF',
  '#BD6BE0'
]

function hexToRgb(hex: string): [number, number, number] {
  const bigint = parseInt(hex.substring(1), 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255
  return [r, g, b]
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  ;(r /= 255), (g /= 255), (b /= 255)
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b)
  let h,
    s = (max + min) / 2
  const l = (max + min) / 2

  if (max === min) {
    h = s = 0
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }

  return [h, s, l]
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  let r, g, b

  if (s === 0) {
    r = g = b = l
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1).toUpperCase()
}

export function generateHueVariations(baseColors: string[], count: number): string[] {
  if (count <= baseColors.length) {
    return baseColors.slice(0, count)
  }

  const colors: string[] = []
  const hueStep = 1 / count

  for (let i = 0; i < count; i++) {
    const baseColor = baseColors[i % baseColors.length]
    const [r, g, b] = hexToRgb(baseColor)
    const [h, s, l] = rgbToHsl(r, g, b)
    const adjustedHue = (h + hueStep * i) % 1 // Hue is in [0, 1] range
    const [newR, newG, newB] = hslToRgb(adjustedHue, s, l)
    const newColor = rgbToHex(newR, newG, newB)
    colors.push(newColor)
  }

  return colors
}
