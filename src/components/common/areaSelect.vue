<!-- 布局 -->
<template>
  <div style="display: inline-block;">
    <el-select v-model="province" value-key="id"  placeholder="省" v-if="!(canUse > 1)" @change="changeShengTouch" style="width: 140px; margin-right: 10px">
      <el-option v-for="item in provinceArr" :key="item.id" :label="item.areaname" :value="item">
      </el-option>
    </el-select>
    <span v-else>{{province | areaname}}</span>
    <el-select v-show="type > 1" v-if="!(canUse > 2)" v-model="city" value-key="id" placeholder="城市" @change="changeShitouch" style="width: 140px; margin-right: 10px">
      <el-option v-for="item in cityArr" :key="item.id" :label="item.areaname" :value="item">
      </el-option>
    </el-select>
    <span v-else>{{city | areaname}}</span>
    <el-select v-show="type > 2" v-if="!(canUse > 3)" v-model="county" value-key="id" placeholder="县/区" @change="changeXiantouch" style="width: 140px">
      <el-option v-for="item in countyArr" :key="item.id" :label="item.areaname" :value="item">
      </el-option>
    </el-select>
    <span v-else>{{county | areaname}}</span>
  </div>
</template>
<!-- vue -->
<script>
export default {
  props: {
    type: {
      default: '3'
    },
    canUse: {
      default: '1'
    },
    provinceProp:'',
    cityProp:'',
    countyProp:''
  },
  data() {
    return {
      province: '',
      provinceArr: [],
      city: '',
      cityArr: [],
      county: '',
      countyArr: [],
    }
  },
  mounted() {
    // 获取省地区
    this.getArea({ parentId: 0 })
      .then(({ httpCode, result }) => {
        console.log(httpCode)
        if (httpCode === '200') {
          this.$set(this, 'provinceArr', result);
          if(this.provinceProp){

              this.province = this.provinceArr.find((item)=>{
                return item.id == this.provinceProp;
              }) 

              this.getArea({ parentId: this.province.id })
              .then(({ httpCode, result }) => {

                if (httpCode === '200') {
                  this.$set(this, 'cityArr', result);

                  this.city = this.cityArr.find((item)=>{
                    return item.id == this.cityProp;
                  }) 

                } else {
                  this.$message('获取城市列表失败');
                }
              })

            this.getArea({ parentId: this.cityProp})
              .then(({ httpCode, result }) => {
                if (httpCode === '200') {
                  this.$set(this, 'countyArr', result);
                  this.county = this.countyArr.find((item)=>{
                    return item.id == this.countyProp;
                  }) 
                } else {
                  this.$message('获取县/区列表失败');
                }
              })
          }
        } else {
          this.$message('获取省列表失败');
        }
      })

  },

  methods: {
    getArea(send) {
      return this.$axios.post('/areaManager/getArea', send)
    },
    // 省份
    changeShengTouch() {
      this.city = null;
      this.cityArr = [];
      this.county = null;
      this.countyArr = [];
      if (this.province) {
        this.getArea({ parentId: this.province.id })
          .then(({ httpCode, result }) => {

            if (httpCode === '200') {
              this.$set(this, 'cityArr', result);
            } else {
              this.$message('获取城市列表失败');
            }
          })
      }
      this.emitChange();
    },
    // 市
    changeShitouch() {

      this.county = null;
      this.countyArr = [];
      if (this.city) {
        this.getArea({ parentId: this.city.id })
          .then(({ httpCode, result }) => {
            if (httpCode === '200') {
              this.$set(this, 'countyArr', result);
            } else {
              this.$message('获取县/区列表失败');
            }
          })
      }
      if (this.city !== null) {
        this.emitChange();
      }

    },
    // 县
    changeXiantouch() {
      if (this.county !== null) {
        this.emitChange();
      }
    },
    emitChange() {
      this.$emit('change', [this.province, this.city, this.county])
    },
    reset(val) {
      val = Array.isArray(val) ? val : [];
      if (val.length == 1) {
        this.$set(this, 'province', val[0]);
        this.$nextTick(() => {
          this.changeShengTouch();

        })
      } else if (val.length == 2) {
        this.$set(this, 'province', val[0]);

        this.$set(this, 'city', val[1])
        this.$nextTick(() => {
          this.changeShitouch();

        })

      } else {
        this.$set(this, 'province', val[0]);
        this.$set(this, 'city', val[1])

        this.$set(this, 'county', val[2])
        this.$nextTick(() => {
          this.changeXiantouch();
        })

      }

    }
  },

  filters: {
    areaname(val) {
      if (typeof val === 'object' && val !== null)
        return val.areaname
      else
        return '';

    }
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">


</style>
