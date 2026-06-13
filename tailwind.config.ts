import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
      colors: {
        ds: {
          // Surfaces
          'bg':                  '#f8f9ff',
          'surface':             '#ffffff',
          'surface-low':         '#eff4ff',
          'surface-container':   '#e5eeff',
          'surface-high':        '#dce9ff',
          'surface-highest':     '#d3e4fe',
          'surface-dim':         '#cbdbf5',
          // Text
          'on-surface':          '#0b1c30',
          'on-surface-variant':  '#45464d',
          'inverse-surface':     '#213145',
          'inverse-on-surface':  '#eaf1ff',
          // Borders
          'outline':             '#76777d',
          'outline-variant':     '#c6c6cd',
          // Primary (Deep Navy)
          'primary':             '#131b2e',
          'primary-dim':         '#0F172A',
          'on-primary':          '#ffffff',
          'primary-container':   '#1e2a40',
          'on-primary-container':'#7c839b',
          'primary-fixed':       '#dae2fd',
          // Secondary (Teal)
          'secondary':           '#006a61',
          'secondary-dark':      '#005049',
          'on-secondary':        '#ffffff',
          'secondary-container': '#86f2e4',
          'on-secondary-container':'#006f66',
          'secondary-fixed':     '#89f5e7',
          'secondary-fixed-dim': '#6bd8cb',
          // Tertiary (Amber)
          'tertiary':            '#b87500',
          'on-tertiary':         '#ffffff',
          'tertiary-container':  '#ffddb8',
          'on-tertiary-container':'#653e00',
          // Error (Red)
          'error':               '#ba1a1a',
          'on-error':            '#ffffff',
          'error-container':     '#ffdad6',
          'on-error-container':  '#93000a',
        }
      },
      borderRadius: {
        'none': '0',
        'sm':   '2px',
        DEFAULT:'4px',
        'md':   '6px',
        'lg':   '8px',
        'xl':   '12px',
        'full': '9999px',
      },
      boxShadow: {
        'card': '0px 4px 6px -1px rgba(0,0,0,0.1), 0px 2px 4px -1px rgba(0,0,0,0.06)',
        'modal': '0px 10px 25px -3px rgba(0,0,0,0.15), 0px 4px 6px -2px rgba(0,0,0,0.08)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
export default config
