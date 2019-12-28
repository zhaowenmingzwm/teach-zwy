<template>
    <div>
        <template v-for="(item,index) in resultArray">
            <el-menu-item v-if="!item.hasChildren" :index="item.resourceUrl">
                <i class="el-icon-setting"></i>{{item.resourceName}}
            </el-menu-item>
            <el-submenu :index="item.resourceId.toString()" v-else>
                <template slot="title">
                    <i class="el-icon-menu"></i>{{item.resourceName}}
                </template>
                <myMenu :resultArray="item.children"></myMenu>
            </el-submenu>
        </template>
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: "myMenu",
    data() {
        return {};
    },
    props: {
        resultArray: {
            type: Array,
            default: function(){ return []}
        }
    }
};
</script>