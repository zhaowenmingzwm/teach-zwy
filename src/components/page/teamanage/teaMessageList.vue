<template>
    <div>
        <commonTitle>
            预警列表
        </commonTitle>
        <div class="content">
            <infor-mation :messagetype="messagetype"></infor-mation>
        </div>

    </div>
</template>
<script>
import inforMation from '../stumanage/information.vue'

export default {
     components:{
        inforMation
    },
    data() {
        return {
            messagetype:"1"
        };
    },
    methods: {},
    computed: {},
    filters: {}
};
</script>
<style lang="scss">
.content {
   
}
</style>
