<template>
  <div class="components-container">
    <VueSplitter class="flowChartWrap" :min-percent="5" :initial-percent="17">
      <template #left-pane>
        <ComponentTree style="width: auto" />
      </template>
      <template #right-pane>
        <VueSplitter class="flowChartWrap" :initial-percent="node_outerSplitPaneSize">
          <!-- 画布 -->
          <template #left-pane>
            <ElMain>
              <ElContainer>
                <!-- 2.2 画布内容 -->
                <ElContainer>
                  <!-- 2.2.1 flow面板 -->
                  <ElMain class="main">
                    <div class="mainContainer" @drop="dropHandle" @dragover="dragoverHandle">
                      <div>
                        <ElButton
                          style="margin-top: 10px; margin-left: 10px"
                          icon="VideoPlay"
                          :disabled="isExecDisable"
                          size="small"
                          @click="execModel"
                          >执行</ElButton
                        >
                        <ElButton
                          style="margin-top: 10px; margin-right: 10px; float: right"
                          icon="VideoPlay"
                          size="small"
                          @click="saveData"
                          >保存</ElButton
                        >
                      </div>
                      <div id="mainContainer" />
                    </div>
                  </ElMain>
                </ElContainer>
              </ElContainer>
            </ElMain>
          </template>
          <template #right-pane>
            <VueSplitter
              v-if="isShowNode"
              :initial-percent="tab_outerSplitPaneSize"
              class="flowChartWrap"
              is-horizontal
            >
              <!-- 参数 -->
              <template #top-pane>
                <ElAside width="100%" style="height: 100%" class="right">
                  <ElContainer id="mainNodeInfo" style="height: 100%">
                    <ElMain>
                      <div class="title">参数配置-{{ currentNodeType }}</div>
                      <div class="model-attr">
                        <ElForm
                          v-if="
                            currentNodeType === '标准模式' ||
                            currentNodeType === 'XNegDL' ||
                            currentNodeType === 'PPUTL' ||
                            currentNodeType === '共享数据'
                          "
                          :model="paramsForm"
                          class="demo-form-inline"
                          style="height: 100%; padding-right: 20px"
                          label-width="100px"
                        >
                          <ElCol class="leftForm" :span="12">
                            <ElFormItem label="no_models">
                              <ElInputNumber
                                v-model="paramsForm.no_models"
                                :min="1"
                                :step="1"
                                step-strictly
                                size="mini"
                                style="vertical-align: middle"
                              />
                            </ElFormItem>
                            <ElFormItem label="model_name">
                              <ElSelect v-model="paramsForm.model_name" placeholder="请选择" size="mini">
                                <ElOption label="resnet18" value="resnet18" />
                                <ElOption label="resnet50" value="resnet50" />
                                <ElOption label="densenet121" value="densenet121" />
                                <ElOption label="alexnet" value="alexnet" />
                                <ElOption label="vgg16" value="vgg16" />
                                <ElOption label="vgg19" value="vgg19" />
                                <ElOption label="inception_v3" value="inception_v3" />
                                <ElOption label="googlenet" value="googlenet" />
                              </ElSelect>
                            </ElFormItem>
                            <ElFormItem label="type">
                              <ElSelect v-model="paramsForm.type" placeholder="请选择" size="mini">
                                <ElOption label="cifar" value="cifar" />
                                <ElOption label="mnist" value="mnist" />
                              </ElSelect>
                            </ElFormItem>
                            <ElFormItem label="global_epochs">
                              <ElInputNumber
                                v-model="paramsForm.global_epochs"
                                :min="1"
                                :step="1"
                                step-strictly
                                size="mini"
                              />
                            </ElFormItem>
                            <ElFormItem label="local_epochs">
                              <ElInputNumber
                                v-model="paramsForm.local_epochs"
                                :min="1"
                                :step="1"
                                step-strictly
                                size="mini"
                              />
                            </ElFormItem>
                            <ElFormItem label="batch_size">
                              <ElInputNumber
                                v-model="paramsForm.batch_size"
                                :min="1"
                                :step="1"
                                step-strictly
                                size="mini"
                              />
                            </ElFormItem>
                          </ElCol>
                          <ElCol class="rightForm" :span="12">
                            <ElFormItem label="k">
                              <ElInputNumber
                                v-model="paramsForm.k"
                                :min="1"
                                :max="paramsForm.no_models"
                                :step="1"
                                step-strictly
                                size="mini"
                              />
                            </ElFormItem>
                            <ElFormItem label="lr">
                              <ElInputNumber
                                v-model="paramsForm.lr"
                                :min="0.001"
                                :max="1.0"
                                :step="0.001"
                                step-strictly
                                size="mini"
                              />
                            </ElFormItem>
                            <ElFormItem label="momentum">
                              <ElInputNumber
                                v-model="paramsForm.momentum"
                                :min="0"
                                :max="1.0"
                                :step="0.1"
                                step-strictly
                                size="mini"
                              />
                            </ElFormItem>
                            <ElFormItem label="lambda_">
                              <ElInputNumber
                                v-model="paramsForm.lambda_"
                                :min="0"
                                :max="1.0"
                                :step="0.1"
                                step-strictly
                                size="mini"
                              />
                            </ElFormItem>
                            <ElFormItem label="prop">
                              <ElInputNumber
                                v-model="paramsForm.prop"
                                :min="0"
                                :max="1.0"
                                :step="0.1"
                                step-strictly
                                size="mini"
                              />
                            </ElFormItem>
                          </ElCol>
                        </ElForm>
                        <ElForm
                          v-else-if="currentNodeType === '差分隐私'"
                          :model="paramsForm"
                          class="demo-form-inline"
                          style="height: 100%; padding-right: 20px"
                          label-width="100px"
                        >
                          <ElCol class="leftForm" :span="12">
                            <ElFormItem label="no_models">
                              <ElInputNumber
                                v-model="paramsForm.no_models"
                                :min="1"
                                :step="1"
                                step-strictly
                                size="mini"
                              />
                            </ElFormItem>
                            <ElFormItem label="model_name">
                              <ElSelect v-model="paramsForm.model_name" placeholder="请选择" size="mini">
                                <ElOption label="resnet18" value="resnet18" />
                                <ElOption label="resnet50" value="resnet50" />
                                <ElOption label="densenet121" value="densenet121" />
                                <ElOption label="alexnet" value="alexnet" />
                                <ElOption label="vgg16" value="vgg16" />
                                <ElOption label="vgg19" value="vgg19" />
                                <ElOption label="inception_v3" value="inception_v3" />
                                <ElOption label="googlenet" value="googlenet" />
                              </ElSelect>
                            </ElFormItem>
                            <ElFormItem label="type">
                              <ElSelect v-model="paramsForm.type" placeholder="请选择" size="mini">
                                <ElOption label="cifar" value="cifar" />
                                <ElOption label="mnist" value="mnist" />
                              </ElSelect>
                            </ElFormItem>
                            <ElFormItem label="global_epochs">
                              <ElInputNumber
                                v-model="paramsForm.global_epochs"
                                :min="1"
                                :step="1"
                                step-strictly
                                size="mini"
                              />
                            </ElFormItem>
                            <ElFormItem label="local_epochs">
                              <ElInputNumber
                                v-model="paramsForm.local_epochs"
                                :min="1"
                                :step="1"
                                step-strictly
                                size="mini"
                              />
                            </ElFormItem>
                            <ElFormItem label="batch_size">
                              <ElInputNumber
                                v-model="paramsForm.batch_size"
                                :min="1"
                                :step="1"
                                step-strictly
                                size="mini"
                              />
                            </ElFormItem>
                            <ElFormItem label="k">
                              <ElInputNumber
                                v-model="paramsForm.k"
                                :min="1"
                                :max="paramsForm.no_models"
                                :step="1"
                                size="mini"
                              />
                            </ElFormItem>
                            <ElFormItem label="lr">
                              <ElInputNumber
                                v-model="paramsForm.lr"
                                :min="0.001"
                                :max="1.0"
                                :step="0.001"
                                size="mini"
                              />
                            </ElFormItem>
                          </ElCol>
                          <ElCol class="rightForm" :span="12">
                            <ElFormItem label="momentum">
                              <ElInputNumber
                                v-model="paramsForm.momentum"
                                :min="0"
                                :max="1.0"
                                :step="0.1"
                                size="mini"
                              />
                            </ElFormItem>
                            <ElFormItem label="lambda_">
                              <ElInputNumber v-model="paramsForm.lambda_" :min="0" :max="1.0" :step="0.1" size="mini" />
                            </ElFormItem>
                            <ElFormItem label="prop">
                              <ElInputNumber v-model="paramsForm.prop" :min="0" :max="1.0" :step="0.1" size="mini" />
                            </ElFormItem>
                            <ElFormItem label="dp">
                              <ElSwitch v-model="paramsForm.dp" active-color="#13ce66" inactive-color="#ff4949" />
                            </ElFormItem>
                            <ElFormItem label="C">
                              <ElInputNumber v-model="paramsForm.C" :min="0" size="mini" />
                            </ElFormItem>
                            <ElFormItem label="sigma">
                              <ElInputNumber v-model="paramsForm.sigma" :min="0" :step="0.01" size="mini" />
                            </ElFormItem>
                            <ElFormItem label="q">
                              <ElInputNumber v-model="paramsForm.q" :min="0" :max="1.0" :step="0.1" size="mini" />
                            </ElFormItem>
                            <ElFormItem label="w">
                              <ElInputNumber v-model="paramsForm.w" :step="1" step-strictly size="mini" />
                            </ElFormItem>
                          </ElCol>
                        </ElForm>
                        <ElForm
                          v-else-if="currentNodeType === '同态加密'"
                          :model="paramsForm"
                          class="demo-form-inline"
                          style="height: 100%; padding-right: 20px"
                          label-width="100px"
                        >
                          <ElCol class="leftForm" :span="12">
                            <ElFormItem label="no_models">
                              <ElInputNumber
                                v-model="paramsForm.no_models"
                                :min="1"
                                :step="1"
                                step-strictly
                                size="mini"
                                style="vertical-align: middle"
                              />
                            </ElFormItem>
                            <ElFormItem label="global_epochs">
                              <ElInputNumber
                                v-model="paramsForm.global_epochs"
                                :min="1"
                                :step="1"
                                step-strictly
                                size="mini"
                              />
                            </ElFormItem>
                            <ElFormItem label="local_epochs">
                              <ElInputNumber
                                v-model="paramsForm.local_epochs"
                                :min="1"
                                :step="1"
                                step-strictly
                                size="mini"
                              />
                            </ElFormItem>
                            <ElFormItem label="batch_size">
                              <ElInputNumber
                                v-model="paramsForm.batch_size"
                                :min="1"
                                :step="1"
                                step-strictly
                                size="mini"
                              />
                            </ElFormItem>
                            <ElFormItem label="k">
                              <ElInputNumber
                                v-model="paramsForm.k"
                                :min="1"
                                :max="paramsForm.no_models"
                                :step="1"
                                step-strictly
                                size="mini"
                              />
                            </ElFormItem>
                          </ElCol>
                          <ElCol class="rightForm" :span="12">
                            <ElFormItem label="lr">
                              <ElInputNumber
                                v-model="paramsForm.lr"
                                :min="0.001"
                                :max="1.0"
                                :step="0.001"
                                step-strictly
                                size="mini"
                              />
                            </ElFormItem>
                            <ElFormItem label="momentum">
                              <ElInputNumber
                                v-model="paramsForm.momentum"
                                :min="0"
                                :max="1.0"
                                :step="0.1"
                                step-strictly
                                size="mini"
                              />
                            </ElFormItem>
                            <ElFormItem label="lambda_">
                              <ElInputNumber
                                v-model="paramsForm.lambda_"
                                :min="0"
                                :max="1.0"
                                :step="0.1"
                                step-strictly
                                size="mini"
                              />
                            </ElFormItem>
                            <ElFormItem label="prop">
                              <ElInputNumber
                                v-model="paramsForm.prop"
                                :min="0"
                                :max="1.0"
                                :step="0.1"
                                step-strictly
                                size="mini"
                              />
                            </ElFormItem>
                            <ElFormItem label="feature_num">
                              <ElInputNumber
                                v-model="paramsForm.feature_num"
                                :min="1"
                                :step="1"
                                step-strictly
                                size="mini"
                              />
                            </ElFormItem>
                          </ElCol>
                        </ElForm>
                        <!-- 数据源 -->
                        <div v-else style="height: 100%">
                          <!-- <div class="title">参数配置-选择数据源样本</div> -->
                          <div class="model-attr" style="height: calc(100% - 41px)">
                            <ElTabs
                              v-model="SourceActiveName"
                              style="margin-top: 0px; height: 100%; overflow-y: auto"
                              tab-position="left"
                            >
                              <ElTabPane
                                v-for="(item, index) in taskSource"
                                :key="item.owner.id"
                                :label="item.owner.id === mineId ? '自有数据' : item.owner.name"
                                :name="item.owner.id"
                              >
                                <ElTable
                                  v-model:selected="selectedSource[item.owner.id]"
                                  :data="item.data"
                                  :row-key="(record) => record.id"
                                  style="width: 100%"
                                  tooltip-effect="dark"
                                  show-overflow-tooltip
                                  highlight-current-row
                                  stripe
                                  @selectionChange="(selection) => updateSelectedSource(selection, item.owner.id)"
                                >
                                  <ElTableColumn type="selection" width="55" />
                                  <ElTableColumn prop="name" label="样本名称" width="100px" />
                                  <ElTableColumn prop="number" label="样本记录数" width="100px" />
                                  <ElTableColumn prop="description" label="描述" min-width="100px" />
                                </ElTable>
                              </ElTabPane>
                              <!-- <ElTabPane
                                v-for="(item, index) in taskSource"
                                :key="index"
                                :label="item.owner.id === mineId ? '自有数据' : item.owner.name"
                                :name="item.owner.id"
                              >
                                <ElTable
                                  :data="item.data"
                                  tooltip-effect="dark"
                                  style="width: 100%"
                                  show-overflow-tooltip
                                  highlight-current-row
                                  stripe
                                  @rowClick="rowClick"
                                  @selectionChange="selectionChangeHandler(item.owner.id)"
                                >
                                  <ElTableColumn type="selection" width="55" align="center" />
                                  <ElTableColumn
                                    prop="name"
                                    label="样本名称"
                                    align="center"
                                    width="100px"
                                    show-overflow-tooltip
                                  />
                                  <ElTableColumn
                                    prop="number"
                                    label="样本记录数"
                                    align="center"
                                    width="100px"
                                    show-overflow-tooltip
                                  />
                                  <ElTableColumn
                                    prop="description"
                                    label="描述"
                                    min-width="100px"
                                    show-overflow-tooltip
                                  />
                                </ElTable>
                              </ElTabPane> -->
                            </ElTabs>
                          </div>
                        </div>
                      </div>
                    </ElMain>
                  </ElContainer>
                </ElAside>
              </template>
              <!-- Tab -->
              <template #bottom-pane>
                <ElTabs
                  v-model="TabActiveName"
                  style="margin-top: 0px; height: 100%; overflow-y: auto"
                  type="border-card"
                >
                  <ElTabPane label="日志" name="logger">
                    <div v-for="(log, index) in logMessages" :key="index" style="color: #888; padding-left: 15px">
                      {{ log }}
                    </div>
                  </ElTabPane>
                  <ElTabPane
                    v-if="completedModelList.length > 0"
                    id="modelResult"
                    ref="modelResult"
                    style="height: 100%"
                    label="模型训练报告"
                    name="result"
                  >
                    <ElTabs
                      v-model="ResultActiveName"
                      style="margin-top: 0px; height: 100%; overflow-y: auto"
                      tab-position="left"
                    >
                      <ElTabPane
                        v-for="(modelNode, index) in completedModelList"
                        :key="index"
                        :label="modelNode.data.type"
                        :name="modelNode.data.type"
                      >
                        <ElTable
                          :data="allTableData[modelNode.data.type] ? allTableData[modelNode.data.type].tableData : []"
                          border
                          style="width: 100%"
                        >
                          <ElTableColumn prop="type" label="类型" width="100" />
                          <ElTableColumn
                            v-for="(iteration, resultIndex) in allTableData[modelNode.data.type]
                              ? allTableData[modelNode.data.type].iterations
                              : []"
                            :key="resultIndex"
                            :prop="iteration"
                            :label="iteration"
                            align="center"
                          />
                        </ElTable>
                        <div :id="'RocChart-' + modelNode.data.type" style="width: 100%; height: 400px" />
                      </ElTabPane>
                    </ElTabs>
                  </ElTabPane>
                </ElTabs>
              </template>
            </VueSplitter>
          </template>
        </VueSplitter>
      </template>
    </VueSplitter>
  </div>
</template>

<script>
import { $on, $off, $once, $emit } from '@/utils/gogocodeTransfer'
import * as Vue from 'vue'
import ComponentTree from '@/components/ComponentTree.vue'
// import splitPane from 'vue-splitpane'
import VueSplitter from '@rmp135/vue-splitter'
import { getTaskModel, getTaskSource, saveTaskModel } from '@/api/task'
import FlowChart from '@/utils/FlowChart/index'
import PluginFlowExec from '@/utils/FlowChart/pluginFlowExec'

import { fetchList } from '@/api/minedata'
import waves from '@/directive/waves' // waves directive
// import { parseTime } from '@/utils'
// import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import * as echarts from 'echarts'

import { useLoggerStore } from '@/stores/logger' // 假设这是你的Pinia store路径
import { useUserStore } from '../../stores/user-store'
const userStore = useUserStore()

FlowChart.use(PluginFlowExec)

export default {
  components: { ComponentTree, VueSplitter },
  directives: { waves },
  props: {
    sidebarComponentName: String,
  },
  data() {
    return {
      loggerStore: useLoggerStore(),

      isShowNode: true,
      isShowTab: true,
      currentNodeId: '',
      currentNodeType: '数据源',
      isExecDisable: false,

      tableData2: [],
      taskSource: [],
      selectedSource: {}, // 用于存储每个owner选中的项
      mineId: userStore.id,
      cooperateList: ['自有数据'],
      SourceActiveName: this.mineId,
      TabActiveName: 'logger',
      ResultActiveName: '',
      paramsForm: {},
      node: {},
      completedModelList: [],
      allTableData: {}, // 用于存储所有模型类型的表格数据

      // list: null,
      // total: 0,
      // listLoading: true,
      // listQuery: {
      //   page: 1,
      //   limit: 2,
      //   importance: undefined,
      //   title: undefined,
      //   type: undefined,
      //   sort: '-lastTime',
      // },
      RocChart: null,
    }
  },
  computed: {
    node_outerSplitPaneSize() {
      return this.isShowNode ? 55 : 100 // 55 100
    },
    tab_outerSplitPaneSize() {
      return this.isShowTab ? 60 : 100 // 60 100
    },
    logMessages() {
      return this.loggerStore.logs
    },
  },
  watch: {
    isShowTab(newVal) {
      if (newVal === true) {
        this.$nextTick(() => {
          this.initCharts()
        })
      }
    },
    currentNodeId(val) {
      // this.paramsForm = FlowChart.getNodeParams(val)
      this.node = FlowChart.getNode(val)
      this.paramsForm = this.node.data.params
    },
  },
  created() {
    this.getSimple()
    // this.getList()
    if (this.$route.query.cooperators) {
      const cooperatorsArray = this.$route.query.cooperators.split(',')
      this.cooperateList = ['自有数据', ...cooperatorsArray]
    }
  },
  mounted() {
    FlowChart.setContainer('mainContainer')
    FlowChart.on('selectNode', (id, type) => {
      this.isShowNode = true
      this.currentNodeId = id
      this.currentNodeType = type
    })
    FlowChart.on('modelCompleted', (node) => {
      const nodeType = node.data.type
      this.completedModelList.push(node)
      if (this.completedModelList.length === 1) {
        this.TabActiveName = 'result'
        this.ResultActiveName = nodeType
      }
      console.log(node.data.result)
      // 转换结果为表格数据并根据模型类型存储
      this.transformResultsToTableData(nodeType, node.data.result)
      // 渲染结果
      this.$nextTick(() => {
        // 渲染图表
        this.initRocChart('RocChart-' + nodeType, node.data.result)
        // 添加大小变化的监听器
        const chartContainer = document.getElementById('RocChart-' + nodeType)
        if (chartContainer) {
          const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
              const echartsInstance = echarts.getInstanceByDom(entry.target)
              if (echartsInstance) {
                echartsInstance.resize()
              }
            }
          })
          resizeObserver.observe(chartContainer)

          // 如果需要，可以在组件销毁时停止观察
          $once(this, 'hook:beforeDestroy', () => {
            resizeObserver.unobserve(chartContainer)
          })
        }
      })
    })
    getTaskModel(this.$route.query.taskId).then((data) => {
      FlowChart.loadData(data)
      // 添加一个获取selected和设置selected的。
      console.log(FlowChart.getNodeParams('数据源'))
    })

    this.initializeSelectedSource()
  },
  methods: {
    dragoverHandle(ev) {
      ev.preventDefault()
    },
    dropHandle(ev) {
      FlowChart.addNode({ pageX: ev.pageX, pageY: ev.pageY }, ev.dataTransfer.getData('target'))
    },
    execModel() {
      this.isExecDisable = true
      this.isShowNode = true
      this.isShowTab = true
      FlowChart.runModel(this.loggerStore).then(() => {
        this.isExecDisable = false
      })
    },
    async saveData() {
      const modelData = FlowChart.getModelData()
      // console.log(modelData)
      // console.log(FlowChart.getCompletedModel())
      // console.log(modelData)
      const res = await saveTaskModel({
        id: this.$route.query.taskId,
        data: modelData,
      })
      console.log(res)
      if (res.code === 200) {
        this.$message.success('模型保存成功')
      } else {
        this.$message.success('模型保存失败')
      }
    },
    getSimple() {
      getTaskSource(this.$route.query.taskId).then((response) => {
        // console.log(response.data)
        this.taskSource = response.data
        console.log(this.taskSource)
      })
    },
    handleChange(val) {
      console.log(val)
    },
    // getList() {
    //   // this.listLoading = true
    //   fetchList(this.listQuery).then((response) => {
    //     // this.list = response.data.items
    //     // this.total = response.data.total
    //     // setTimeout(() => {
    //     //   this.listLoading = false
    //     // }, 1.5 * 1000)
    //   })
    // },
    initRocChart(id, data) {
      const chartDom = document.getElementById(id)
      this.RocChart = echarts.init(chartDom)
      this.RocChart.setOption({
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data: ['Acc', 'Loss'],
        },
        grid: {
          left: '3%',
          right: '3%',
          bottom: '3%',
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          // data: data.acc.map((_, i) => `Epoch ${i + 1}`), // 假设每个epoch对应一个数据点
          data: ['Epoch 1', 'Epoch 2', 'Epoch 3', 'Epoch 4', 'Epoch 5', 'Epoch 6', 'Epoch 7', 'Epoch 8'],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            name: 'Acc',
            type: 'line',
            data: data.acc,
          },
          {
            name: 'Loss',
            type: 'line',
            data: data.loss,
          },
        ],
      })
    },
    // 转换特定模型类型的结果数据为表格数据
    transformResultsToTableData(modelType, result) {
      const { acc, loss } = result
      const iterations = acc.map((_, index) => `训练${index + 1}`)
      const accRow = {
        type: 'Acc',
        ...acc.reduce((obj, value, index) => ({ ...obj, [`训练${index + 1}`]: value }), {}),
      }
      const lossRow = {
        type: 'Loss',
        ...loss.reduce((obj, value, index) => ({ ...obj, [`训练${index + 1}`]: value }), {}),
      }
      const tableData = [accRow, lossRow]

      // 将转换后的表格数据存储在allTableData对象中，按模型类型组织
      this.allTableData[modelType] = { tableData, iterations }
    },
    initializeSelectedSource() {
      this.taskSource.forEach((item) => {
        if (!this.selectedSource[item.owner.id]) {
          this.$set(this.selectedSource, item.owner.id, [])
        }
      })
    },
    // 更新选中状态的方法
    updateSelectedSource(selected, ownerId) {
      // console.log('select')
      this.selectedSource[ownerId] = selected.map((item) => item.id)
      console.log(this.selectedSource)
      FlowChart.setNodeParams('数据源', this.selectedSource)
    },
  },
}
</script>

<style scoped>
.components-container {
  position: relative;
  height: calc(100vh - 85px);
  margin: 0;
}
.tab-container {
  margin: 0px;
}
.leftForm {
  padding-left: 20px;
}
::v-deep .el-tabs__content {
  padding-left: 0px;
}
</style>

<style lang="scss">
.flowChartWrap {
  height: 100%;
  .left {
    border-right: 1px solid #e5e5e5;
    height: 100%;
    .el-tree {
      height: calc(100% - 40px);
      overflow-y: auto;
    }
  }
  .right {
    border-left: 1px solid #e5e5e5;
  }
  .main {
    #mainMenu {
      height: 41px;
      border-bottom: 1px solid #e1e1e1;
      .tool-left {
        float: left;
        .el-button {
          &:first-child {
            margin-left: 10px;
          }
          border: none;
          margin-top: 8px;
        }
      }
      .tool-right {
        float: right;
        .el-button {
          position: relative;
          border: none;
          margin: 3px 0 0 0;
          &:last-child {
            margin-right: 10px;
          }
          background: transparent;
        }
      }
    }
    .mainContainer {
      height: calc(100vh - 42px);
      position: relative;
      // background-color: pink ;
      background-color: rgb(237, 239, 243); /* 背景颜色 */
      background-size: 10px 10px;
      background-image: radial-gradient(circle, rgb(210, 210, 210) 1px, transparent 1px);
      overflow: hidden;
      outline: none !important;
      #mainContainer {
        outline: none !important;
        height: 100%;
        width: 100%;
        position: relative;
      }
    }
  }
  #mainNodeInfo {
    .nodeInfoToolBar {
      border-left: 1px solid #e5e5e5;
      overflow: hidden;
      .tool {
        padding: 8px 0;
        writing-mode: vertical-rl;
        line-height: 32px;
        font-size: 12px;
        border-bottom: 1px solid #ccc;
        cursor: pointer;
        &.acitve {
          background: #eee;
        }
        span {
          margin: 5px 0;
        }
      }
    }
    .title {
      border-bottom: 1px solid #e5e5e5;
      height: 41px;
      font-size: 16px;
      font-weight: bolder;
      // color: #1c9bec;
      line-height: 40px;
      text-align: center;
    }
    // .model-attr {
    //     padding: 0;
    //     .item {
    //     font-size: 12px;
    //     }
    //     .value {
    //     font-size: 12px;
    //     color: #999;
    //     margin-left: 10px;
    //     }
    //     .el-input {
    //     margin-top: 5px;
    //     }
    //     textarea {
    //     margin-top: 5px;
    //     font-family: inherit;
    //     }
    // }
    .node-attr {
      padding: 10px;
      .item {
        font-size: 12px;
      }
      .value {
        font-size: 12px;
        color: #999;
        margin-left: 10px;
      }
    }
    .messageInfo {
      padding: 0px;
      margin: 10px;
      color: #333;
      font-size: 14px;
      .el-card__body {
        padding: 10px;
      }
      p {
        padding: 0;
        margin: 0;
        font-size: 12px;
      }
    }
  }
  .el-aside {
    background: #f8f8f8;
    padding: 0;
    margin: 0;
    .search {
      height: 40px;
      background-color: #f3f3f3;
      padding: 8px 12px;
      box-sizing: border-box;
      border-bottom: 1px solid #e5e5e5;
      .el-input {
        height: 24px;
        .el-input__inner {
          height: 24px;
        }
      }
      .el-input--small .el-input__icon {
        line-height: 24px;
      }
    }
    .el-tree {
      background: transparent;
    }
    .right {
      margin: 0;
    }
  }
  .el-container {
    height: 100%;
  }
  .tabsNav {
    padding: 0;
    .el-tabs--card > .el-tabs__header .el-tabs__nav {
      border-top: 3px solid #01c1de;
      border-radius: 0;
    }
    .el-tabs__item.is-active {
      color: #333 !important;
    }
    .el-tabs__item {
      font-size: 12px;
    }
    .el-tabs__item:focus.is-active.is-focus:not(:active) {
      box-shadow: none !important;
    }
  }
  .el-tree-node__content,
  .el-tree-node {
    min-height: 38px !important;
  }
  .leafNode {
    .node::before {
      content: '';
      position: absolute;
      top: 2px;
      left: 3px;
      border-radius: 2px;
      padding: 13px 2px;
      background: transparent;
    }
    &:hover span.node {
      border: 1px solid #1c9bec !important;
      background: #fff;
      &::before {
        background: #1c9bec;
      }
    }
  }
}

.el-main {
  padding: 0;
}
</style>
