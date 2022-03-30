<template>
  <div class="about">
    提交结果：{{this.$route.query.state == 1 ? '成功' : '失败'}}
  </div>
</template>

<script>
export default {
}
</script>
