<template>
  <div class="page-container">
    <div class="submit-box">
      <div class="content">
      <div class="line-style">
        <el-select
          v-model="currencyPair"
          class="m-2"
          placeholder="请选择要转换的货币对"
          size="large"
        >
          <el-option
            v-for="item in currencyPairs"
            :key="item.value"
            :label="item.label"
            :value="item"
          />
        </el-select>
      </div>
      <el-row class="line-style" :span="24" :gutter="24">
        <el-col class="input-item" :span="12">
          <span class="label">{{ label1 }}</span>
          <el-input-number
            style="width: 190px"
            v-model="currencyFrom"
            @input="currencyFromInput($event)"
            controls-position="right"
            :min="0"
            :max="1000000000"
            :precision="2"
          ></el-input-number>
        </el-col>
        <el-col :span="12" class="input-item">
          <span class="label">ClientRate</span>
          <el-input v-model="currencyPair.rate" disabled></el-input>
        </el-col>
      </el-row>

      <el-row class="line-style" :span="24">
        <el-col class="input-item">
          <span class="label">{{ label2 }}</span>
          <el-input v-model="currencyTo" disabled></el-input>
        </el-col>
      </el-row>
      </div>
      <div class="btn-box">
        <el-button type="primary" @click="submit">提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { debounce, throttle, fmoney } from "@/utils/tools";
import { ref } from "vue";
export default {
  setup() {
    const currencyPairs = [
      {
        label: "EURUSD",
        value: "EUR-USD",
        rate: 1.1349,
      },
      {
        label: "GBPUSD",
        value: "GBP-USD",
        rate: 1.3545,
      },
    ];
    const currencyTo = ref(0);
    return {
      currencyPairs,
      currencyTo,
    };
  },
  data() {
    return {
      currencyPair: this.currencyPairs[0],
      currencyFrom: 0,
    };
  },
  computed: {
    label1() {
      return this.currencyPair.value && this.currencyPair.value.split("-")[0];
    },
    label2() {
      return this.currencyPair.value && this.currencyPair.value.split("-")[1];
    },
    disabled() {
      return (
        this.currencyFrom > 1000000000 ||
        this.currencyFrom * this.currencyPair.rate > 1000000000
      );
    },
  },
  methods: {
    currencyFromInput($event) {
      debounce(() => {
        this.currencyTo = fmoney($event * this.currencyPair.rate, 2);
      }, 500).apply(this);
    },
    submit() {
      const LIMIT = 1000000000;
      throttle(() => {
        let routeUrl = this.$router.resolve({
          path: '/about',
          query: {
            state:
              Number(this.currencyFrom > 0 &&
              this.currencyFrom <= LIMIT &&
              this.currencyFrom * this.currencyPair.rate <= LIMIT),
          }
        })
        window.open(routeUrl.href, '_blank')
      }, 500).apply(this);
    },
  },
};
</script>

<style lang="less" scoped>
.page-container {
  box-sizing: border-box;
  padding: 20px 0 0 50px;
  .submit-box {
    width: 600px;
    min-height: 400px;
    background: burlywood;
    box-sizing: border-box;
    padding: 10px 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    .content {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      flex: 1;
    }
    .line-style {
      margin: 5px 0;
      .input-item {
        display: flex;
        align-items: center;
        .label {
          margin-right: 8px;
          display: inline-block;
        }
      }
    }
    
  }
}
</style>
