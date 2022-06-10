<template>
    <a href="https://wkla.no-ip.biz/ArduinoWiki/doku.php?id=arduino:arduinosps:tpsass:mnemonics"
        target="_blank">Commandtable</a><br />
    LDA #4 ; load 4 into the A register
    <hr />
    <h3>Commands Mnemonics</h3>
    <table width="100%">
        <tr>
            <th>Mnemonic</th>
            <th>Code</th>
            <th>short</th>
        </tr>
        <tr>
            <td>NOP</td>
            <td>00</td>
            <td>no operation</td>
        </tr>
        <tr>
            <td>WAIT #x</td>
            <td>2x</td>
            <td>wait &lt;time&gt;</td>
        </tr>
        <tr>
            <td>RJMP #x</td>
            <td>3x</td>
            <td>Jump back</td>
        </tr>
        <tr>
            <td>PAGE #x</td>
            <td>8x</td>
            <td>set page</td>
        </tr>
        <tr>
            <td>JMP #x</td>
            <td>9x</td>
            <td>jump to #x + 16 * page</td>
        </tr>
        <tr>
            <td>LOOPC #x</td>
            <td>Ax</td>
            <td>if C>0: C=C-1; jump #x + (16*page)</td>
        </tr>
        <tr>
            <td>LOOPD #x</td>
            <td>Ax</td>
            <td>if D>0: D=D-1; jump #x + (16*page)</td>
        </tr>
        <tr>
            <td>SKIP0</td>
            <td>C0</td>
            <td>Skip if A = 0</td>
        </tr>
        <tr>
            <td>AGTB</td>
            <td>C1</td>
            <td>Skip if A &gt; B </td>
        </tr>
        <tr>
            <td>ALTB</td>
            <td>C2</td>
            <td>Skip if A &lt; B </td>
        </tr>
        <tr>
            <td>AEQB</td>
            <td>C3</td>
            <td>Skip if A = B</td>
        </tr>
        <tr>
            <td>DEQ#y #x</td>
            <td>C4..CB</td>
            <td>Skip if Din.X = Y</td>
        </tr>
        <tr>
            <td>PRG#x</td>
            <td>CC,CE</td>
            <td>Skip if PRG = x</td>
        </tr>
        <tr>
            <td>SEL#x</td>
            <td>CD,CF</td>
            <td>Skip if SEL = x</td>
        </tr>
        <tr>
            <td>CALL #x</td>
            <td>Dx</td>
            <td>Call sub #x + (16 * page)</td>
        </tr>
        <tr>
            <td>RTR</td>
            <td>E0</td>
            <td>Return</td>
        </tr>
        <tr>
            <td>CASB #x</td>
            <td>E1..E6</td>
            <td>Call sub #x</td>
        </tr>
        <tr>
            <td>DFSB #x</td>
            <td>E8..ED</td>
            <td>Define sub #x</td>
        </tr>
        <tr>
            <td>REST</td>
            <td>EF</td>
            <td>Restart program</td>
        </tr>
        <tr>
            <td>PEND</td>
            <td>FF</td>
            <td>Program end</td>
        </tr>
    </table>
    <hr />
    <h3>Load & Save</h3>
    <table width="100%">
        <tr>
            <th>Mnemonic</th>
            <th>Code</th>
            <th>short</th>
        </tr>
        <tr>
            <td>LDA ##x</td>
            <td>4x</td>
            <td>A = #x</td>
        </tr>
        <tr>
            <td>SWAP</td>
            <td>50</td>
            <td>Swap A & B</td>
        </tr>
        <tr>
            <td>MOV X,Y</td>
            <td>51..53, 61..63, 5D, 5E, 6D, 6E</td>
            <td>X = Y</td>
        </tr>
        <tr>
            <td>PUSH</td>
            <td>5F</td>
            <td>push A on stack</td>
        </tr>
        <tr>
            <td>POP</td>
            <td>6F</td>
            <td>pop A on stack</td>
        </tr>
    </table>
    <hr />
    <h3>Math</h3>
    <table width="100%">
        <tr>
            <th>Mnemonic</th>
            <th>Code</th>
            <th>short</th>
            <th>Mnemonic</th>
            <th>Code</th>
            <th>short</th>
        </tr>
        <tr>
            <td>INC</td>
            <td>71</td>
            <td>A=A+1</td>
            <td>AMD</td>
            <td>71</td>
            <td>A=A and B</td>
        </tr>
        <tr>
            <td>DEC</td>
            <td>72</td>
            <td>A=A-1</td>
            <td>OR</td>
            <td>71</td>
            <td>A=A or B</td>
        </tr>
        <tr>
            <td>ADD</td>
            <td>73</td>
            <td>A=A+B</td>
            <td>XOR</td>
            <td>71</td>
            <td>A=A xor B</td>
        </tr>
        <tr>
            <td>SUB</td>
            <td>74</td>
            <td>A=A-B</td>
            <td>NOT</td>
            <td>71</td>
            <td>A=!A</td>
        </tr>
        <tr>
            <td>MUL</td>
            <td>75</td>
            <td>A=A*B</td>
            <td>MOD</td>
            <td>71</td>
            <td>A=A%B</td>
        </tr>
        <tr>
            <td>DIV</td>
            <td>75</td>
            <td>A=A/B</td>
            <td>BYTE</td>
            <td>7C</td>
            <td>A=A+16*B</td>
        </tr>
        <tr>
            <td>BSUBA</td>
            <td>7D</td>
            <td>A=B-A</td>
        </tr>
    </table>
    <hr />
    <h3>In & Out</h3>
    <table width="100%">
        <tr>
            <th>Mnemonic</th>
            <th>Code</th>
            <th>short</th>
        </tr>
        <tr>
            <td>LDA DIN</td>
            <td>64</td>
            <td>A=Din</td>
        </tr>
        <tr>
            <td>LDA DINx</td>
            <td>65..68</td>
            <td>A=Din.x</td>
        </tr>
        <tr>
            <td>LDA ADCx</td>
            <td>69,6A</td>
            <td>A=ADC.x</td>
        </tr>
        <tr>
            <td>LDA RCx</td>
            <td>6B,6C</td>
            <td>A=RC.x</td>
        </tr>
        <tr>
            <td>PORT #x</td>
            <td>1x</td>
            <td>Dout= #x</td>
        </tr>
        <tr>
            <td>STA DOUT</td>
            <td>54</td>
            <td>DOut=A</td>
        </tr>
        <tr>
            <td>STA DOUTx</td>
            <td>55..58</td>
            <td>Dout.X=A</td>
        </tr>
        <tr>
            <td>STA PWMx</td>
            <td>59,5A</td>
            <td>PWM.X=A</td>
        </tr>
        <tr>
            <td>STA SRVx</td>
            <td>5B,5C</td>
            <td>Srv.X=A</td>
        </tr>
    </table>
    <hr />
    <h3>Byte</h3>
    <table width="100%">
        <tr>
            <th>Mnemonic</th>
            <th>Code</th>
            <th>short</th>
        </tr>
        <tr>
            <td>BLDA ADCx</td>
            <td>F0,F1</td>
            <td>A=ADC.x</td>
        </tr>
        <tr>
            <td>BLDA RCx</td>
            <td>F2,F3</td>
            <td>A=RC.x</td>
        </tr>
        <tr>
            <td>BSTA PWMx</td>
            <td>F4,F5</td>
            <td>PWM.X=A</td>
        </tr>
        <tr>
            <td>BSTA SRVx</td>
            <td>F6,F7</td>
            <td>Srv.X=A</td>
        </tr>
        <tr>
            <td>TONE</td>
            <td>F8</td>
            <td>Tone A</td>
        </tr>
    </table>
    <hr />
    <h3>Labels</h3>
    You can also use a label for the Jump, Loop and Call commands. The associated PAGE command must be implemented
    separately. The Jump Address is calculated automatically, if the argument of the page command is set to:?. Example:
    <div class="code">:Loop<br />
        PORT #4<br />
        WAIT 200ms<br />
        PORT #0<br />
        WAIT 200ms<br />
        PAGE :?<br />
        JMP :Loop
    </div>
    Labels are allowed with the Mnemonics RJMP, JMP, LOOPC, LOOPD and CALL. The two extended commands DFSB and CASB for
    subroutine execution do also have support for labels. Thus, something like this will also work:
    <div class="code">:Loop<br />
        CASB :Blink<br />
        ...<br />
        DFSB :Blink<br />
        PORT #4<br />
        WAIT 200ms<br />
        PORT #0<br />
        WAIT 200ms<br />
        RTR<br />
    </div>
    <hr />
    <h3>Comments</h3>
    Comments are allowed. There are 2 types of comments: Block comments go over several lines, start with “ \* ” and end
    with “ */ ”. Line comments start with a ; , stand behind the argument and the assembler ignores the rest of the
    line.
    Example:
    <div class="code">/*<br />
        multi line comment<br />
        */<br />
        :loop<br />
        PORT #0x0F ; line comment<br />
        WAIT 200ms<br />
        PORT #0x00<br />
        WAIT 200ms<br />
        RJMP :loop
    </div>

    <hr />
    <h3>JMP, CALL, LOOPx and PAGE</h3>
    For Absolute Jumps, the argument of the mnemonics and additionally the contents of the PAGE register are always
    used. The address is then calculated as: adr = #x + (16 * PAGE). You will have to calculate the PAGE contents and
    set the corresponding PAGE command before the Jump Instruction. Here the assembler can help with this calculation:
    If there is a PAGE instruction with an argument ? just before the Jump Instruction, the Assembler will calculate the
    PAGE number. Example:
    <div class="code">PAGE :?<br />
        JMP :loop2<br />
        :loop<br />
        PORT #0x0F<br />
        WAIT 200ms<br />
        :loop2<br />
        PORT #0x00<br />
        WAIT 200ms<br />
        RJMP :loop
    </div>
    Here, the correct page is automatically entered in the first PAGE command.
    <hr />
    <h3>DOUT</h3>
    The command DOUT can occur in 3 different variants.
    DOUT (without argument): Register A is sent on the outputs.<br />
    DOUT 1..4: The argument is a number of 1..4. In this case, only the respective output bit (1..4) is switched. If
    register A = 0, the related output becomes logic 0, if A = 1, the output becomes logic 1. The remaining 3 outputs
    remain unchanged.<br />
    DOUT # 0..15: The argument is output directly on all 4 outputs. Example: DOUT # 9 switches outputs 1 and 4 to
    logical 1 and outputs 2 and 3 to logical 0.<br />

    For example:
    <div class="code"> LDA 0x01<br />
        DOUT 0x04 ; will output 1 on output **D4** ausgeben. because Register A's value is 1.<br />
        DOUT #0x04 ; will output 1 on output **D3**. (0x04 = 4 = 0b00000100)<br />
    </div>
    <hr />
    <h3>Macros</h3>
    You can also use Macros to simplify programs. First of all, you have to define a Macro. As example here the Blink
    function:
    <div class="code">PORT #0B1111<br />
        WAIT 200ms<br />
        PORT #0B0000<br />
        WAIT 200ms<br />
    </div>
    In order to be able to use these as Macros in different places, one must first mark the place as a macro. This is
    done by marking beginning and end with .macro and .endmacro . After .macro you have to write the name of the macro
    under which you want to use the macro. Result of this Macro definition:
    <div class="code">.macro blink<br />
        PORT #0B1111<br />
        WAIT 200ms<br />
        PORT #0B0000<br />
        WAIT 200ms<br />
        .endmacro
    </div>
    And you can make certain values even variable. Here, for example, which LEDs should flash and how long the wait
    should be.
    <div class="code">.macro blink output delay<br />
        PORT output<br />
        WAIT delay<br />
        PORT #0B0000<br />
        WAIT delay<br />
        .endmacro
    </div>
    In the actual program you can call the macro with e.g.
    <div class="code">.blink #0B1010 200ms</div>
    Macros must be defined before the first call. The whole program is now:
    <div class="code">.macro blink output delay<br />
        PORT output<br />
        WAIT delay<br />
        PORT #0B0000<br />
        WAIT delay<br />
        .endmacro<br />
        <br />
        :loop<br />
        .blink #0B1111 200ms<br />
        RJMP :loop
    </div>
    <hr />
    <h3>Directives</h3>
    The assembler supports various directives. We have already met some of them, the macros, loops…<br />
    Further:<br />

    .arduinosps: this sets the hardware to Arduino_TPS. This directive should appear before the actual code.<br />
    .tinysps: sets the hardware to the Tiny_TPS.<br />
    .atmega8: sets the hardware to the ATMega8.<br />
    .holtek: sets the hardware to Holtek.<br />
    .include: This feature is not supported in web mode
</template>


<style scoped>
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

.code {
    font-family: 'Courier New', Courier, monospace;
}
</style>