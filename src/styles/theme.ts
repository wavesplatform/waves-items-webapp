const fontSizes: any = [
  12, 14, 16, 20, 24, 32,
]

fontSizes.sm = fontSizes[0]
fontSizes.md = fontSizes[1]
fontSizes.lg = fontSizes[2]
fontSizes.base = fontSizes.md

const fontWeights: any = [
  300, 400, 700,
]

fontWeights.light = fontWeights[0]
fontWeights.normal = fontWeights[1]
fontWeights.bold = fontWeights[2]

const colors: any = {
  white: '#fff',
  grays: [
    '#e6e7e8',
    '#cdced1',
    '#b4b6ba',
    '#9b9ea3',
    '#696d75',
    '#50555e',
    '#373d47',
    '#1e2430',
    '#0e1420',
  ],
  black: '#050c19',
  blue: '#07c',
  green: '#28a745',
  red: '#dc3545',
  orange: '#fd7e14',
}

colors.bodyBg = colors.black
colors.bodyColor = colors.grays[0]
colors.primary = colors.blue

const space: any = [
  0, 4, 8, 16, 32, 64, 128,
]

space.sm = space[1]
space.md = space[2]
space.lg = space[3]

const fonts = {
  sans: '-apple-system, "Segoe UI", system-ui, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif',
  mono: 'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
}

export default {
  breakpoints: ['40em', '52em', '64em'],
  fontSizes,
  fontWeights,
  colors,
  space,
  fonts,
}
