const json = {
  nodes: [],
  endpoints: [],
  edges: [], // 边的对应关系(sourceId -> targetId)
  head: '',
}

const string = JSON.stringify(json)
console.log(string)
console.log('hhh')
console.log(JSON.parse(string))
