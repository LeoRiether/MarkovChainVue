<template>
  <div id="app" class="section">
    <div class="columns container">
      <div class="column content"><p class="results">{{ output }}</p></div>
      <div class="options column">
        <textarea class="textarea field" placeholder="Texto ou 'url https://link-do-arquivo.com'" v-model="sample" @change="sampleChanged = true"></textarea>
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label for="out" class="label">Tamanho do Output</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <input type="number" class="input" v-model="outsize">
              </div>
            </div>
          </div>
        </div>
        <button class="button is-fullwidth" @click="generate">Gerar</button>
      </div>
    </div>
  </div>
</template>

<script>
import Markov from "./Markov";
import donquixote from "../assets/don_quixote.txt";

window.Markov = Markov;

export default {
  name: 'app',
  data() {
    return {
      output: "Output here",
      outsize: 200,
      sample: `url ${donquixote}`,
      sampleChanged: true,
    }
  },
  methods: {
    generate() {
      Promise.resolve()
      .then(_ => {
        if (this.sampleChanged)
          return Markov.load(this.sample || `url ${donquixote}`);
      })
      .then(_ => Markov.generate(~~this.outsize))
      .then(o => this.output = o)
      .catch(e => console.error(e));
    }
  }
}
</script>

<style lang="sass">

  .results
    padding: .75rem
    border: thin solid rgba(#333, .2)
    border-radius: 8px
    min-height: 100%

  .content
    margin-bottom: 0 !important

</style>

