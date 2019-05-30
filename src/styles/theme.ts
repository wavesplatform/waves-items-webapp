const fontSizes: any = [
  12, 14, 16, 20, 24, 32,
]

fontSizes.xs = fontSizes[0]
fontSizes.sm = fontSizes[1]
fontSizes.md = fontSizes[2]
fontSizes.lg = fontSizes[3]
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
    '#d5d6d9',
    '#b4b6ba',
    '#9b9ea3',
    '#696d75',
    '#50555e',
    '#343a47',
    '#1e2430',
    '#111725',
  ],
  black: '#050c19',
  blue: '#2254F5',
  green: '#28a745',
  red: '#dc3545',
  orange: '#fd7e14',
}

colors.default = colors.grays[0]
colors.placeholder = colors.grays[4]
colors.element = colors.grays[7]
colors.primary = colors.blue

const bg = {
  default: colors.black,
  input: colors.black,
  card: colors.grays[8],
  dropdown: colors.black,
  dropdownHover: colors.grays[8],
}

const border = {
  input: colors.grays[7],
  inputHover: colors.grays[6],
  modal: colors.grays[7],
}

colors.bg = bg
colors.border = border

const space: any = [
  0, 4, 8, 12, 16, 24, 32, 64,
]

space.xs = space[1]
space.sm = space[2]
space.md = space[3]
space.lg = space[4]
space.xl = space[5]
space.xxl = space[7]
space.base = space.md

const avatars: any = {
  xs: {
    width: 16,
    height: 16,
  },
  sm: {
    width: 24,
    height: 24,
  },
  md: {
    width: 32,
    height: 32,
  },
  lg: {
    width: 64,
    height: 64,
  },
}

avatars.base = avatars.sm

const toasts = {
  base: {},
  info: {
    backgroundColor: colors.blue,
  },
}

const fonts = {
  sans: '-apple-system, "Segoe UI", system-ui, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif',
  mono: 'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
}

const lineHeights: any = [
  1, 1.25, 1.5, 2,
]

lineHeights.base = lineHeights[2]

const radii: any = [
  0, 4, 6, 8, 16,
]

radii.sm = radii[1]
radii.md = radii[2]
radii.lg = radii[3]
radii.xl = radii[3]
radii.base = radii.md

const buttons = {
  primary: {
    backgroundColor: colors.primary,
  },
}

export default {
  breakpoints: ['40em', '52em', '64em'],
  fontSizes,
  fontWeights,
  lineHeights,
  colors,
  bg,
  space,
  fonts,
  radii,
  buttons,
  avatars,
  toasts,
}
