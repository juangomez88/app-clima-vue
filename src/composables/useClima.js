import axios from 'axios'
import {ref, computed} from 'vue'

export default function useClima() {

    const clima = ref({})
    const cargando = ref(false)
    const error = ref('')

    const obtenerClima = async ({ciudad, pais}) => {
        //Importar API Key
        const key = import.meta.env.VITE_API_KEY
        cargando.value = true
        clima.value = {}
        error.value = ''

    try {
           //Obtener lat, lng
        const url = `http://api.openweathermap.org/geo/1.0/direct?q=${ciudad},${pais}&limit=1&appid=${key}`
        const {data} = await axios(url)
        const { lat, lon } = data[0]
        //Obtener el clima
        const urlCLima = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`
        const { data: resultado } = await axios(urlCLima)
        clima.value = resultado

    } catch {
        error.value = 'Ciudad no encontrada'
    }finally{
        cargando.value = false
    }
        
    }

    const mostrarClima = computed(() => {
        return Object.values(clima.value).length > 0
    })

    const formatoTemperatura = temperatura => parseInt(temperatura - 273.15)

    return {
        obtenerClima, 
        clima,
        mostrarClima,
        formatoTemperatura,
        cargando,
        error
    }
}