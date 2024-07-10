<script setup>
import useClima from '../composables/useClima';

const { formatoTemperatura} = useClima()

    defineProps({
        clima: {
            type: Object,
            required: true
        }
    })
</script>

<template>
    <div class="resultado">
        <h2>Clima de: {{ clima.name}}</h2>
        <p class="actual">{{ formatoTemperatura(clima.main.temp) }}&deg;C</p>
        <div class="temperaturas">
            <p>Min: {{ formatoTemperatura(clima.main.temp_min) }}<span>&deg;C</span></p>
            <p>Max: {{ formatoTemperatura(clima.main.temp_max) }}<span>&deg;C</span></p>
        </div>
    </div>
</template>
