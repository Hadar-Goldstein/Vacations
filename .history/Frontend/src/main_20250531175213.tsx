import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Layout } from './Components/LayoutArea/Layout/Layout.tsx'
import './index.css'
import "./Assets/Fonts/fonts.css"
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Provider store={}>
            <Layout />
        </Provider>
    </BrowserRouter>
)
