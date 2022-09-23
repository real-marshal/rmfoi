import { createRoot } from 'react-dom/client'
import App from '@/app/App'

const container = document.querySelector('#root')
if (!container) throw new Error('No root element')

const root = createRoot(container)
root.render(<App />)
