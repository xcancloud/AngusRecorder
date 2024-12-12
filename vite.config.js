import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {crx} from '@crxjs/vite-plugin'
import manifest from './src/manifest.json'

export default defineConfig({
    plugins: [
        vue(),
        crx({manifest})
    ]
})
