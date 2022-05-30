<template>
<Toolbar>
    <template #start>
        <div class="toolbar-label">TPS Assembler</div>
    </template>
</Toolbar>
<Textarea v-model="source" rows="20" cols="60"></Textarea>
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

<style>
.toolbar-label {
    color: white;
}
</style>