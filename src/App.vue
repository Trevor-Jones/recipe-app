<template>
  <div id="app">
    <v-app id="example-3" standalone>
      <v-navigation-drawer permanent clipped light>
        <v-list dense class="pt-0">
          <v-list-tile v-for="item in items" :key="item.title" router exact :href='item.path'>
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar dark class="primary">
        <v-toolbar-title class="white--text">Recipe App</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>search</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>apps</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>refresh</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>more_vert</v-icon>
        </v-btn>
      </v-toolbar>
      <main>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </main>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      drawer: null,
      items: [
        { title: 'Home', icon: 'dashboard', path: '/' },
        { title: 'About', icon: 'question_answer', path: '/about' }
      ],
      right: null
    }
  }
}
</script>

<style>

</style>
