<template>
    <Panel class="welcome-panel-header-custom" header="Virtual Web TPS Beta" :toggleable="true"
        v-model:collapsed="isCollapsed">
        <template #icons>
            <button class="p-panel-header-icon p-link mr-2" @click="toggle">
                <span class="pi pi-question"></span>
            </button>
        </template>
        <a href="http://rcarduino.de/doku.php?id=arduino:arduinosps" target="_blank">TPS/myco</a><br />
        Hallo, willkommen bei Virtual-TPS, dem TPS-Editor und Simulator für Ihren Browser.<br />
        Hier können Sie ihre TPS Programme in TPS Assembler schreiben und auch gleich mit dem Emulator testen.
    </Panel>
    <OverlayPanel ref="op" :showCloseIcon="true">
        <table border="1">
            <tr>
                <th></th>
                <th>0</th>
                <th>1</th>
                <th>2</th>
                <th>3</th>
                <th>4</th>
                <th>5</th>
                <th>6</th>
                <th>7</th>
                <th>8</th>
                <th>9</th>
                <th>a</th>
                <th>b</th>
                <th>c</th>
                <th>d</th>
                <th>e</th>
                <th>f</th>
            </tr>
            <tr>
                <td></td>
                <td>n.n.</td>
                <td>Port<br />[DOUT]</td>
                <td>Delay<br />[WAIT]</td>
                <td>Jump back relative<br />[RJMP]</td>
                <td>A=#<br />[LDA]</td>
                <td>=A</td>
                <td>A=</td>
                <td>Calc</td>
                <td>Page<br />[PAGE]</td>
                <td>Jump Absolute (# + 16*Page) [JMP]</td>
                <td>C* C>0: C=C-1; Jump # + (16*page) [LOOPC]</td>
                <td>D* D>0: D=D-1; Jump # + (16*page) [LOOPD]</td>
                <td>Skip if</td>
                <td>Call #+(16*page)</td>
                <td>Callsub/Ret</td>
                <td>Byte Commands</td>
            </tr>
            <tr>
                <td>0</td>
                <td>NOP</td>
                <td>aus</td>
                <td>1ms</td>
                <td>0</td>
                <td>0</td>
                <td>A&lt;&gt;B [SWAP]</td>
                <td></td>
                <td></td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>A==0 [SKIP0]</td>
                <td>0</td>
                <td>ret [RTR]</td>
                <td>A=ADC.1 [BLDA]</td>
            </tr>
            <tr>
                <td>1</td>
                <td></td>
                <td>1</td>
                <td>2ms</td>
                <td>1</td>
                <td>1</td>
                <td>B=A [MOV]</td>
                <td>A=B [MOV]</td>
                <td>A=A+1 [INC]</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>A&gt;B[AGTB]</td>
                <td>1</td>
                <td>Call 1 [CASB]</td>
                <td>A=ADC.2 [BLDA]</td>
            </tr>
            <tr>
                <td>2</td>
                <td></td>
                <td>2</td>
                <td>5ms</td>
                <td>2</td>
                <td>2</td>
                <td>C=A [MOV]</td>
                <td>A=C [MOV]</td>
                <td>A=A-1 [DEC]</td>
                <td>2</td>
                <td>2</td>
                <td>2</td>
                <td>2</td>
                <td>A&lt;B</td>
                <td>2</td>
                <td>2 [CASB]</td>
                <td>A=RCin.1[BLDA]</td>
            </tr>
            <tr>
                <td>3</td>
                <td></td>
                <td>3</td>
                <td>10ms</td>
                <td>3</td>
                <td>3</td>
                <td>D=A [MOV]</td>
                <td>A=D [MOV]</td>
                <td>A=A+B [ADD]</td>
                <td>3</td>
                <td>3</td>
                <td>3</td>
                <td>3</td>
                <td>A==B[AEQB]</td>
                <td>3</td>
                <td>3 [CASB]</td>
                <td>A=RCin.2 [BLDA]</td>
            </tr>
            <tr>
                <td>4</td>
                <td></td>
                <td>4</td>
                <td>20ms</td>
                <td>4</td>
                <td>4</td>
                <td>Dout=A [STA]</td>
                <td>A=Din [LDA]</td>
                <td>A=A-B [SUB]</td>
                <td>4</td>
                <td>4</td>
                <td>4</td>
                <td>4</td>
                <td>Din.1==1 [DEQ1 1]</td>
                <td>4</td>
                <td>4 [CASB]</td>
                <td>PWM.1=A</td>
            </tr>
            <tr>
                <td>5</td>
                <td></td>
                <td>5</td>
                <td>50ms</td>
                <td>5</td>
                <td>5</td>
                <td>Dout.1=A [STA]</td>
                <td>A=Din.1 [LDA]</td>
                <td>A=A*B [MUL]</td>
                <td>5</td>
                <td>5</td>
                <td>5</td>
                <td>5</td>
                <td>Din2.==1 [DEQ1 2]</td>
                <td>5</td>
                <td>5 [CASB]</td>
                <td>PWM.2=A [BSTA]</td>
            </tr>
            <tr>
                <td>6</td>
                <td></td>
                <td>6</td>
                <td>100ms</td>
                <td>6</td>
                <td>6</td>
                <td>Dout.2=A [STA]</td>
                <td>A=Din.2 [LDA]</td>
                <td>A=A/B [DIV]</td>
                <td>6</td>
                <td>6</td>
                <td>6</td>
                <td>6</td>
                <td>Din.3==1</td>
                <td>6</td>
                <td>6 [CASB]</td>
                <td>Servo.1=A [BSTA]</td>
            </tr>
            <tr>
                <td>7</td>
                <td></td>
                <td>7</td>
                <td>200ms</td>
                <td>7</td>
                <td>7</td>
                <td>Dout.3=A [STA]</td>
                <td>A=Din.3 [LDA]</td>
                <td>A=A and B [AND]</td>
                <td>7</td>
                <td>7</td>
                <td>7</td>
                <td>7</td>
                <td>Din.4==1 [DEQ1 4]</td>
                <td>7</td>
                <td></td>
                <td>Servo.2=A [BSTA]</td>
            </tr>
            <tr>
                <td>8</td>
                <td></td>
                <td>8</td>
                <td>500ms</td>
                <td>8</td>
                <td>8</td>
                <td>Dout.4=A [STA]</td>
                <td>A=Din.4 [LDA]</td>
                <td>A=A or B [OR]</td>
                <td>8</td>
                <td>8</td>
                <td>8</td>
                <td>8</td>
                <td>Din.1==0 [DEQ0 1]</td>
                <td>8</td>
                <td>Def 1 [DFSB]</td>
                <td>Tone=A [Tone]</td>
            </tr>
            <tr>
                <td>9</td>
                <td></td>
                <td>9</td>
                <td>1s</td>
                <td>9</td>
                <td>9</td>
                <td>PWM.1=A [STA]</td>
                <td>A=ADC.1 [LDA]</td>
                <td>A=A xor B [XOR]</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>Din.2==0 [DEQ0 2]</td>
                <td>9</td>
                <td>Def 2 [DFSB]</td>
                <td></td>
            </tr>
            <tr>
                <td>a</td>
                <td></td>
                <td>10</td>
                <td>2s</td>
                <td>10</td>
                <td>10</td>
                <td>PWM.2=A [STA]</td>
                <td>A=ADC.2 [LDA]</td>
                <td>A=not A [NOT]</td>
                <td>10</td>
                <td>10</td>
                <td>10</td>
                <td>10</td>
                <td>Din.3==0 [DEQ0 3]</td>
                <td>10</td>
                <td>Def 3 [DFSB]</td>
                <td></td>
            </tr>
            <tr>
                <td>b</td>
                <td></td>
                <td>11</td>
                <td>5s</td>
                <td>11</td>
                <td>11</td>
                <td>Servo.1=A [STA]</td>
                <td>A=RCin.1 [LDA]</td>
                <td>A=A % B (Rest)[MOD]</td>
                <td>11</td>
                <td>11</td>
                <td>11</td>
                <td>11</td>
                <td>Din.4==0 [DEQ0 4]</td>
                <td>11</td>
                <td>Def 4 [DFSB]</td>
                <td></td>
            </tr>
            <tr>
                <td>c</td>
                <td></td>
                <td>12</td>
                <td>10s</td>
                <td>12</td>
                <td>12</td>
                <td>Servo.2=A [STA]</td>
                <td>A=RCin.2 [LDA]</td>
                <td>A=A + 16*B [BYTE]</td>
                <td>12</td>
                <td>12</td>
                <td>12</td>
                <td>12</td>
                <td>S_PRG==0 [PRG0]</td>
                <td>12</td>
                <td>Def 5 [DFSB]</td>
                <td></td>
            </tr>
            <tr>
                <td>d</td>
                <td></td>
                <td>13</td>
                <td>20s</td>
                <td>13</td>
                <td>13</td>
                <td>E=A [MOV]</td>
                <td>A=E [MOV]</td>
                <td>A=B - A [BSUBA]</td>
                <td>13</td>
                <td>13</td>
                <td>13</td>
                <td>13</td>
                <td>S_SEL==0 [SEL0]</td>
                <td>13</td>
                <td>Def 6 [DFSB]</td>
                <td></td>
            </tr>
            <tr>
                <td>e</td>
                <td></td>
                <td>14</td>
                <td>30s</td>
                <td>14</td>
                <td>14</td>
                <td>F=A [MOV]</td>
                <td>A=F [MOV]</td>
                <td>A=A SHR 1 [SHR]</td>
                <td>14</td>
                <td>14</td>
                <td>14</td>
                <td>14</td>
                <td>S_PRG==1 [PRG1]</td>
                <td>14</td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td>f</td>
                <td></td>
                <td>15</td>
                <td>60s</td>
                <td>15</td>
                <td>15</td>
                <td>Push A [PUSH]</td>
                <td>Pop A [POP]</td>
                <td>A=A SHL 1 [SHL]</td>
                <td>15</td>
                <td>15</td>
                <td>15</td>
                <td>15</td>
                <td>S_SEL==1 [SEL1]</td>
                <td>15</td>
                <td>restart [REST]</td>
                <td>PrgEnd [PEND]</td>
            </tr>
        </table>
    </OverlayPanel>
</template>

<script>
export default {
    emits: ['help'],
    data() {
        return {
            isCollapsed: false
        }
    },
    mounted() {
        setTimeout(this.collapse, 10000);
    },
    methods: {
        collapse() {
            this.isCollapsed = true;
        },
        toggle(event) {
            //this.$refs.op.toggle(event);
            this.$emit("help");
        }
    }
}
</script>

<style>
a:link {
    color: lightblue;
    background-color: transparent;
    text-decoration: none;
}

a:visited {
    color: lightblue;
    background-color: transparent;
    text-decoration: none;
}

a:hover {
    color: white;
    background-color: transparent;
    text-decoration: underline;
}

a:active {
    color: yellow;
    background-color: transparent;
    text-decoration: underline;
}

.welcome-panel-header-custom .p-panel-header {
    font-size: 20px;
}
</style>