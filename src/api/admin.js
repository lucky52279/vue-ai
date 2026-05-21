import service from "../utils/request";
export function login(data) {
  return service.post('/user/login', data)
}

export function categoryTree() {
  return service.get('/knowledge/category/tree')
}

export function articlePage(params) {
  return service.get('/knowledge/article/page', { params })
}
export function uploadFile(file, businessInfo) {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('businessType', 'ARTICLE')
  formData.append('businessId', businessInfo.businessId)
  formData.append('businessField', 'cover')
  return service.post('/file/upload', formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
}

export function createArticle(data) {
  return service.post('/knowledge/article', data)
}
//获得详情信息
export function getArticleDetail(id) {
  return service.get(`/knowledge/article/${id}`)
}

//更新文章
export function updateArticle(id, data) {
  return service.put(`/knowledge/article/${id}`, data)
}
//更新文章状态
export function updateArticleStatus(id, data) {
  return service.put(`/knowledge/article/${id}/status`, data)
}

//删除文章
export function deleteArticle(id) {
  return service.delete(`/knowledge/article/${id}`)
}

//分页咨询记录
export function consultationPage(params) {
  return service.get('/psychological-chat/sessions', { params })
}

export function getSessionDetail(sessionId) {
  return service.get(`/psychological-chat/sessions/${sessionId}/messages`)
}

export function getEmotionalPage(params) {
  return service.get('/emotion-diary/admin/page', { params })
}
export function deleteEmotional(id) {
  return service.delete(`/emotion-diary/admin/${id}`)
}
export function getAnalyticsOverview() {
  return service.get('/data-analytics/overview')
}
export function logout() {
  return service.post('/user/logout')
}