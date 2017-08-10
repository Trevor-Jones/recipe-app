<template>
  <div>
    <div>
      Hello {{ uid }}
    </div>
    <div>
      Bye {{ recipeId }}
    </div>
  </div>
</template>

<script>

  export default {
    name: 'landing-page',
    props: ['uid', 'recipeId'],
  };
</script>

<style>

</style>
