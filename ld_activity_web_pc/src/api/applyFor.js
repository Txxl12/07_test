import request from '@/utils/request'

//申请电子票据申请单
export function apply(data) {
  return request({
    url: '/invoice/apply',
    method: 'post',
    data: data
  })
}

//查询电子票据申请单
export function applyList(data) {
  return request({
    url: '/invoice/list',
    method: 'get',
    params: data
  })
}

//电子票据申请单详情
export function applyDetails(id) {
  return request({
    url: '/invoice/apply/' + id,
    method: 'get'
  })
}

//电子票据种类名称
export function typeList(data) {
  return request({
    url: '/invoice/type',
    method: 'get',
    params: data
  })
}

//申请电子票据申请单撤销
export function applyCancel(data) {
  return request({
    url: '/invoice/apply/cancel',
    method: 'post',
    params: data
  })
}

//入库
export function allWarehouse(id) {
  return request({
    url: '/invoice/apply/segment/'+ id,
    method: 'put'
  })
}


//入库
export function warehouse(id) {
  return request({
    url: '/invoice/segment/'+ id,
    method: 'put'
  })
}
