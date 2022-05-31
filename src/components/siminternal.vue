<template>
    <Panel header="Internal">
        <div class="grid">
            <div class="col">
                <label for="rega">A</label><br />
                <InputNumber id="rega" v-model="rega" size="4" mode="decimal" v-tooltip="'Register A'" :readonly="true">
                </InputNumber>
            </div>
            <div class="col">
                <label for="regb">B</label><br />
                <InputNumber id="regb" v-model="regb" size="4" mode="decimal" v-tooltip="'Register B'" :readonly="true">
                </InputNumber>
            </div>
            <div class="col">
                <label for="addr">Addr</label><br />
                <InputNumber id="addr" v-model="addr" size="4" mode="decimal" v-tooltip="'Adresse'" :readonly="true">
                </InputNumber>
            </div>
        </div>
        <div class="grid">
            <div class="col">
                <label for="regc">C</label><br />
                <InputNumber id="regc" v-model="regc" size="4" mode="decimal" v-tooltip="'Register C'" :readonly="true">
                </InputNumber>
            </div>
            <div class="col">
                <label for="regd">D</label><br />
                <InputNumber id="regd" v-model="regd" size="4" mode="decimal" v-tooltip="'Register D'" :readonly="true">
                </InputNumber>
            </div>
            <div class="col">
                <label for="page">Page</label><br />
                <InputNumber id="page" v-model="page" size="4" mode="decimal" v-tooltip="'Page'" :readonly="true">
                </InputNumber>
            </div>
        </div>
        <div class="grid">
            <div class="col">
                <label for="rege">E</label><br />
                <InputNumber id="rege" v-model="rege" size="4" mode="decimal" v-tooltip="'Register E'" :readonly="true">
                </InputNumber>
            </div>
            <div class="col">
                <label for="regf">F</label><br />
                <InputNumber id="regf" v-model="regf" size="4" mode="decimal" v-tooltip="'Register F'" :readonly="true">
                </InputNumber>
            </div>
            <div class="col">
                <label for="raddr">RAddr</label><br />
                <InputNumber id="raddr" v-model="raddr" size="4" mode="decimal" v-tooltip="'Rücksprungadresse'"
                    :readonly="true"></InputNumber>
            </div>
        </div>
        <div class="grid">
            <div class="col">
                <label for="cmd">cmd</label><br />
                <InputNumber id="cmd" v-model="cmd" size="4" mode="decimal" v-tooltip="'Command'" :readonly="true">
                </InputNumber>
            </div>
            <div class="col">
                <label for="data">data</label><br />
                <InputNumber id="data" v-model="data" size="4" mode="decimal" v-tooltip="'data'" :readonly="true">
                </InputNumber>
            </div>
            <div class="col">
                <label for="dly">delay</label><br />
                <InputNumber id="dly" v-model="dly" size="4" mode="decimal" v-tooltip="'delay'" :readonly="true">
                </InputNumber>
            </div>
            <div class="col">
                <label for="tone">tone</label><br />
                <InputNumber id="tone" v-model="tone" size="4" mode="decimal" v-tooltip="'tone'" :readonly="true">
                </InputNumber>
            </div>
        </div>
        <label for="stack">Stack</label><br />
        <Listbox id="stack" :options="stack" :readonly="true" emptyMessage="no stack"></Listbox>
    </Panel>
</template>

<script>
export default {
    props: {
        rega: Number,
        regb: Number,
        regc: Number,
        regd: Number,
        rege: Number,
        regf: Number,
        addr: Number,
        page: Number,
        raddr: Number,
        stack: Array,
        cmd: Number,
        data: Number,
        dly: Number,
        tone: Number
    }
}
</script>