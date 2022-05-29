<template>
<Toolbar>
    <template #start>
        TPS Assembler
    </template>
</Toolbar>
<Textarea v-model="source" rows="30" cols="60"></Textarea>
</template>

<script>
export default {
     data() {
        return {
            source: ""
        }
    },
    methods: {
    }
}
</script>