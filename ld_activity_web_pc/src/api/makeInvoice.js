import request from '@/utils/request'

//开票点列表
export function place(data) {
  return request({
    url: '/invoice/list/place',
    method: 'get',
    params: data
  })
}

//新增开票点
export function addPlace(data) {
  return request({
    url: '/invoice/add/place',
    method: 'post',
    data: data
  })
}

//修改开票点
export function updatePlace(data) {
  return request({
    url: '/invoice/update/place',
    method: 'put',
    data: data
  })
}

//删除开票点
export function deletePlace(id) {
  return request({
    url: '/invoice/place/' + id,
    method: 'delete'
  })
}

//开票查询列表
export function invoice(data) {
  return request({
    url: '/invoice/invoice',
    method: 'get',
    params: data
  })
}

//电子票据类型列表
export function types(data) {
  return request({
    url: '/invoice/business/types',
    method: 'get',
    params: data
  })
}

