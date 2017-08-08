<template>
  <div id="wrapper">
    <img id="logo" src="~@/assets/logo.png" alt="electron-vue">
    <main>
      <div class="left-side">
        <span class="title">
          Welcome to your new project!
        </span>
      </div>

      <div class="right-side">
        <div class="doc">
          <div class="title">Getting Started0</div>
          <p>
            electron-vue comes packed with detailed documentation that covers everything from
            internal configurations, using the project structure, building your application,
            and so much more.
          </p>
          <button class="btn btn-default" @click="open('https://simulatedgreg.gitbooks.io/electron-vue/content/')">Read the Docs</button><br><br>
        </div>
        <div class="doc">
          <div class="title alt">Other Documentation</div>
          <button class="btn btn-default" @click="open('https://electron.atom.io/docs/')">Electron</button>
          <button class="btn btn-default" @click="open('https://vuejs.org/v2/guide/')">Vue.js</button>
          <router-link to="/foo" class="btn btn-default">Go to Foo</router-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script>

  export default {
    name: 'landing-page',
    methods: {
      open(link) {
        this.$electron.shell.openExternal(link);
      },
    },
  };
</script>

<style>

</style>
