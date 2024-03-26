<template>
  <ElAside width="240px" class="left">
    <div class="search">
      <ElInput v-model:value="filterText" placeholder="搜索" size="small">
        <!-- <ElIcon><Search /></ElIcon> -->
      </ElInput>
    </div>
    <ElTree
      ref="tree2"
      :data="nodeData"
      node-key="id"
      :default-expanded-keys="['source', 'learn', 'attack']"
      :icon="ArrowRight"
      :render-content="renderContentFunction"
      :filter-node-method="filterNode"
      :props="defaultProps"
    />
  </ElAside>
</template>

<script>
import * as Vue from 'vue'
import { getMenuData } from '@/api/task'
import { Search, Coin, MagicStick, StarFilled } from '@element-plus/icons-vue'
import { ElIcon } from 'element-plus'

export default {
  components: {
    ElIcon,
    Search,
    Coin,
    MagicStick,
    StarFilled,
  },
  data() {
    return {
      nodeData: [],
      filterText: '',
      defaultProps: {
        children: 'children',
        label: 'label',
      },
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    },
  },
  mounted() {
    getMenuData().then((data) => {
      this.nodeData = data.data
    })
  },
  methods: {
    // kkkk
    renderContentFunction(h, { node, data }) {
      const className = node.expanded ? 'FolderOpened' : 'Folder'
      const classNameChild = !data.children && data.icon ? data.icon : ''

      return h(
        'div',
        {
          class: { leafNode: !data.children },
          style: {
            height: '38px',
            lineHeight: '38px',
            fontSize: '12px',
            color: '#1b1c23',
          },
        },
        [
          h(
            'el-tooltip',
            {
              content: data.label,
              placement: 'top-end',
              disabled: !!data.children,
            },
            [
              h(
                'span',
                {
                  draggable: !data.children,
                  id: data.id,
                  onDragstart: this.dragHandle, // 注意事件监听的变化
                  class: 'node',
                  style: {
                    display: 'inline-block',
                    marginTop: '4px',
                    height: '30px',
                    lineHeight: '30px',
                    width: '140px',
                    borderRadius: '4px',
                    position: 'relative',
                    outline: 'none',
                    border: !data.children ? '1px solid transparent' : 'none',
                  },
                },
                [
                  h('i', { // 这里不就是树的图标吗
                    class: {
                      [className]: !!data.children,
                      [classNameChild]: !data.children,
                    },
                    style: {
                      color: '#00cdea',
                      marginLeft: data.children ? '10px' : '15px',
                    },
                  }),
                  h(
                    'span',
                    {
                      style: {
                        fontSize: '13px',
                        marginLeft: '10px',
                      },
                    },
                    data.label,
                  ),
                ],
              ),
            ],
          ),
        ],
      )
    },
    // renderContentFunction(h, { node, data }) {
    //   const className = node.expanded
    //     ? 'el-icon-folder-opened'
    //     : 'el-icon-folder'
    //   const classNameChild = !data.children && data.icon ? data.icon : ''
    //   return h(
    //     'div',
    //     {
    //       class: { leafNode: !data.children },
    //       style: {
    //         height: '38px',
    //         lineHeight: '38px',
    //         fontSize: '12px',
    //         color: '#1b1c23',
    //       },
    //     },
    //     [
    //       h(
    //         'el-tooltip',
    //         {
    //           attrs: {
    //             content: data.label,
    //             placement: 'top-end',
    //             disabled: !!data.children,
    //           },
    //         },
    //         [
    //           h(
    //             'span',
    //             {
    //               attrs: {
    //                 draggable: !data.children,
    //                 id: data.id,
    //               },
    //               on: {
    //                 dragstart: this.dragHandle,
    //               },
    //               class: 'node',
    //               style: {
    //                 display: 'inline-block',
    //                 marginTop: '4px',
    //                 height: '30px',
    //                 lineHeight: '30px',
    //                 width: '140px',
    //                 borderRadius: '4px',
    //                 position: 'relative',
    //                 outline: 'none',
    //                 border: !data.children ? '1px solid transparent' : 'none',
    //               },
    //             },
    //             [
    //               h('i', {
    //                 class: {
    //                   [className]: !!data.children,
    //                   [classNameChild]: !data.children,
    //                 },
    //                 style: {
    //                   color: '#00cdea',
    //                   marginLeft: data.children ? '10px' : '15px',
    //                 },
    //               }),
    //               h(
    //                 'span',
    //                 {
    //                   style: {
    //                     fontSize: '13px',
    //                     marginLeft: '10px',
    //                   },
    //                 },
    //                 data.label
    //               ),
    //             ]
    //           ),
    //         ]
    //       ),
    //     ]
    //   )
    // },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    dragHandle(ev) {
      console.log('Tree dragHandle')
      ev.dataTransfer.setData('target', ev.target.id)
    },
  },
}
</script>
