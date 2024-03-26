<template>
  <ElTooltip :disabled="tooltipDisabled" placement="right" effect="dark">
    <template #content>
      <div class="fy_tooltip_content">节点信息：{{ text }}</div>
    </template>
    <div @mousedown="tooltipDisabled = true" @mouseup="tooltipDisabled = false">
      <span class="blue_line"></span>
      <div class="content">
        <!-- <ElIcon class="node-state"><component :is="iconClassName" /></ElIcon> -->
        <ElIcon class="node-state"><Coin /></ElIcon>
        <span class="text">{{ text }}</span>
        <!-- <el-icon class="is-loading">
          <Loading style="display: inline-block; width: 20px; height: 20px;" />
        </el-icon> -->

        <!-- Vue 3 风格的条件渲染 -->
        <ElIcon v-if="state === 'loading'" color="#909399" class="node-state"><Loading /></ElIcon>
        <ElIcon v-if="state === 'success'" color="#67C23A" class="node-state"><CircleCheck /></ElIcon>
        <ElIcon v-if="state === 'failed'" color="#F56C6C" class="node-state"><CircleClose /></ElIcon>
        <ElIcon v-if="state === 'warning'" color="#E6A23C" class="node-state"><Warning /></ElIcon>
        <i v-else></i>
      </div>
    </div>
  </ElTooltip>
</template>

<script setup>
import * as Vue from 'vue'
import { Loading, CircleCheck, CircleClose, Warning, Coin, MagicStick, StarFilled } from '@element-plus/icons-vue'
import { ref, toRefs } from 'vue'
import { ElIcon, ElTooltip } from 'element-plus'

const props = defineProps({
  contentText: String,
  nodeState: String,
  iconClassName: String, // 确保iconClassName作为prop传入
})

// 通过toRefs创建响应式引用
const { contentText, nodeState, iconClassName } = toRefs(props)

// 定义内部状态
const tooltipDisabled = ref(false)

// 使用onMounted初始化可能依赖于props的值
// 如果text和state不需要在mounted时设置，可以直接赋值
const text = ref(contentText.value) // 从props直接初始化
const state = ref(nodeState.value) // 从props直接初始化
</script>

<style lang="scss" scoped>
.el-icon-loading {
  color: #909399 !important;
}
.el-icon-check {
  color: #67c23a !important;
}
.el-icon-close {
  color: #f56c6c !important;
}
.el-icon-warning {
  color: #e6a23c !important;
}
// .content {
//   display: flex;
//   align-items: center;
// }

// .node-state {
//   margin-right: 5px; /* 调整图标与文本之间的水平间距 */
//   vertical-align: middle; /* 垂直对齐 */
// }
</style>
