const json = {
  nodes: [],
  endpoints: [],
  edges: [], // 边的对应关系(sourceId -> targetId)
  head: '',
}

const string = JSON.stringify(json)
// const string = { nodes: [], endpoints: [], edges: [], head: '' }
console.log(string)
console.log('hhh')
console.log(JSON.parse(string))
