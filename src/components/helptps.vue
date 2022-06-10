<template>
    <a href="https://wk-music.de/ArduinoWiki/doku.php?id=arduino:arduinosps:commandtable"
      target="_blank">Commandtable</a><br />
    0x####: 0x## "#"<br />Adresse: Command "Comment"
    <hr />
    <h3>Commands</h3>
    0x00: NOP: , no operation<br />
    0x1#: Port: output directly to the leds<br />
    0x2#: Delay: add a delay: 1,2,5,10,20,50... ms<br />
    0x3#: Jump: relative back, #=1..f<br />
    0x4#: Load: A with value, #=0..f<br />
    0x8#: Load: page register, #=0..f<br />
    0x9#: Jump: absolut, addr = # + 16*page, #=0..f<br />
    0xa#: Loop C: if C > 0 then C=C-1, Jump addr = # + 16*page, #=0..f<br />
    0xb#: Loop D: if D > 0 then D=D-1, Jump addr = # + 16*page, #=0..f<br />
    0xd#: Call: call subroutine, addr = # + 16*page, #=0..f<br />
    <hr />
    <h3>=A</h3>
    <div class="grid">
        <div class="col">
            0x50: A&lt;-&gt;B<br />
        0x51..0x53: B,C,D=A<br />
        0x5d, 0x5e: E,F=A<br />
        0x5f: Push A (to stack)<br />
      </div>
      <div class="col">
          0x54: Dout=A<br />
        0x55..0x58: Dout.#=A, #=1..4<br />
        0x59, 0x5a: PWM.#=A, #=1,2<br />
        0x5b, 0x5c: Srv.#=A, #=1,2<br />
      </div>
    </div>
    <hr />
    <h3>A=</h3>
    <div class="grid">
      <div class="col">
          0x61..0x63: A=B,C,D<br />
        0x6d, 0x6e: A=E,F<br />
        0x6f: Pop (from stack)<br />
      </div>
      <div class="col">
          0x64: A=Din<br />
        0x65.0x68: A=Din.#, #=1..4<br />
        0x69, 0x6a: A=ADC.#, #=1,2<br />
        0x6b, 0x6c: A=RC.#, #=1,2<br />
      </div>
    </div>
    <hr />
    <h3>Calc</h3>
    <div class="grid">
        <div class="col">
        0x71: A=A+1<br />
        0x72: A=A-1<br />
        0x73: A=A+B<br />
        0x74: A=A-B<br />
      </div>
      <div class="col">
        0x75: A=A*B<br />
        0x76: A=A/B<br />
        0x77: A=A&B<br />
        0x78: A=A|1<br />
      </div>
      <div class="col">
          0x79: A=A^1<br />
        0x7a: A=~A<br />
        0x7b: A=A%B<br />
        0x7c: A=A+16*B<br />
      </div>
      <div class="col">
        0x7d: A=B-A<br />
        0x7e: A=A&lt;&lt;1<br />
        0x7f: A=A&gt;&gt;1<br />
      </div>
    </div>
    <hr />
    <h3>Skip next Command if</h3>
    <div class="grid">
        <div class="col">
            0xc0: A==0<br />
        0xc1: A&gt;B<br />
        0xc2: A&lt;B<br />
        0xc3: A==B<br />
      </div>
      <div class="col">
        0xc4..0xc7: Din.#==1, #1..4<br />
        0xc8..0xcb: Din.#==0, #1..4<br />
        0xcc, 0xce: PRG==0,1<br />
        0xcd, 0xcf: SEL==0,1<br />
      </div>
    </div>
    <hr />
    <h3>Call subroutine / Byte Commands</h3>
    <div class="grid">
        <div class="col">
            0xe0: return <br />
        0xe1..0xe6: Call 1..6<br />
        0xe8..0xed: define 1..6<br />
        0xef: Restart<br />
      </div>
      <div class="col">
          0xf0,0xf1:A=ADC.#, #=1,2 <br />
        0xf2,0xf3:A=RC.#, #=1,2<br />
        0xf4,0xf5:PWM.#=A, #=1,2<br />
        0xf6,0xf7:Srv.#=A, #=1,2<br />
        0xf8: Tone<br />
        0xff: Program end<br />
      </div>
    </div>
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
</style>