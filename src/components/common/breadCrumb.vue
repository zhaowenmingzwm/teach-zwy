<template>
	<commonTitle>
		<!-- <div :style="breadcrumb.style">
		    <el-breadcrumb separator=">" class="title">
		    	<template v-for="item in breadcrumb.arr">
			        <el-breadcrumb-item :to="{ path: item.path,query:item.query }" v-if="item.path">{{item.text}}</el-breadcrumb-item>
			        <el-breadcrumb-item class="grey" v-else>{{item.text}}</el-breadcrumb-item>
		    	</template>
		    </el-breadcrumb>
		</div> -->
	</commonTitle>
</template>
<script>
export default {
	name:'breadcrumb',
    data() {
        return {
        }
    },
    props:['breadcrumb'],
    computed: {

    }
}
</script>
<style>

.grey .el-breadcrumb__item__inner{
  color:#97a8be;
}
</style>