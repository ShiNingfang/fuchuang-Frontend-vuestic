/* eslint-disable import/no-cycle */
import './editorCss'
import instance from './instance'
import extendsEvent, { EventCenter } from './EventCenter'
import panZoom from './moveAndZoom'
import contentMenu from './contextMenu'
import editor from './editor'
import model from './model'
import exec, { undo, AddNodeCommand } from './Command'

const FlowChart = {
  /**
   * @description 设置插件容器
   * @param {string} id 容器id
   */
  setContainer(id) {
    instance.setContainer(id)
    this.init()
  },

  /**
   * @description 在容器内添加节点
   * @param {object} position {left:0; top:0}节点位置
   * @param {string} elId 记录生产节点的源节点id，便于传递原节点信息
   */
  addNode(position, elId) {
    exec(AddNodeCommand, position, elId)
  },

  /**
   * @description 撤销
   */
  undo() {
    undo()
  },

  /**
   * @description 初始化
   */
  init() {
    editor.init()
    panZoom.init()
    contentMenu.init()
  },

  /**
   * @description  缩小画布
   */
  zoomIn() {
    const x = instance.mainContainerWrap.clientWidth / 2
    const y = instance.mainContainerWrap.clientHeight / 2
    instance.pan.smoothZoom(x, y, 0.8)
  },

  /**
   * @description 放大画布
   */
  zoomOut() {
    const x = instance.mainContainerWrap.clientWidth / 2
    const y = instance.mainContainerWrap.clientHeight / 2
    instance.pan.smoothZoom(x, y, 1.2)
  },

  /**
   * @description 加载数据
   */
  loadData(data) {
    model.setData(data)
    editor.render()
  },

  /**
   * @description 获得模型数据
   */
  getModelData() {
    return model.getData()
  },

  getNodeParams(nodeId) {
    return model.getData().nodes.find((node) => node.id === nodeId).data.params
  },

  setNodeParams(nodeId, params) {
    model.getData().nodes.find((node) => node.id === nodeId).data.params =
      params
  },

  getNode(nodeId) {
    return model.getData().nodes.find((node) => node.id === nodeId)
  },
  /**
   * @description 插件扩展
   * @param {*} plugin 插件函数
   * @param  {...any} args 参数。暴露内部实例对象
   */
  use(plugin, ...args) {
    plugin.apply(
      this,
      [
        {
          instance,
          editor,
          model,
          contentMenu,
        },
      ].concat(args)
    )
  },
}

extendsEvent(FlowChart)

document.addEventListener('click', (ev) => {
  EventCenter.emit('document.click', ev)
})

export default FlowChart
