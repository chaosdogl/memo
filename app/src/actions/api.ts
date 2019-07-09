export interface RequestInit {
  id?: string,
  method?: string,
  params?: object | null,
  body?: any,
  trigger?: Array<string>
}

export const fetch = function (url: string, RequestInit?: RequestInit) {
  const { method = 'GET', params = null, body = null, trigger = [] } = RequestInit || {}
  return {
    type: `@api/${method}`,
    api: {
      url,
      method,
      params,
      body,
      trigger: [`@api/${method}/success`, `@api/${method}/failure`].map((s, i) => (trigger[i] || s))
    }
  }
}

export const restProxy = function (name: string, baseURL: string) {
  const types = {
    index: `@api/index/${name}`,
    index_success: `@api/index/${name}/success`,
    index_failure: `@api/index/${name}/failure`,
    create: `@api/create/${name}`,
    create_success: `@api/create/${name}/success`,
    create_failure: `@api/create/${name}/failure`,
    update: `@api/update/${name}`,
    update_success: `@api/update/${name}/success`,
    update_failure: `@api/update/${name}/failure`,
    read: `@api/read/${name}`,
    read_success: `@api/read/${name}/success`,
    read_failure: `@api/read/${name}/failure`,
    destory: `@api/destory/${name}`,
    destory_success: `@api/destory/${name}/success`,
    destory_failure: `@api/destory/${name}/failure`,
  }
  return {
    args: { name, baseURL },
    types,
    index({ params = null, body = {}, trigger = [] }: RequestInit = {}) {
      return {
        type: types.index,
        api: {
          method: 'GET',
          url: baseURL,
          params,
          body,
          trigger: [types.index_success, types.index_failure].map((s, i) => (trigger[i] || s))
        }
      }
    },
    create({ params = null, body = {}, trigger = [] }: RequestInit) {
      return {
        type: types.create,
        api: {
          method: 'POST',
          url: baseURL,
          params,
          body,
          trigger: [types.create_success, types.create_failure].map((s, i) => (trigger[i] || s))
        }
      }
    },
    read({ id, params = null, body = {}, trigger = [] }: RequestInit) {
      if (!id) throw new Error('restProxy: id is required')
      return {
        type: types.read,
        api: {
          method: 'GET',
          url: `${baseURL}/${id}`,
          params,
          body,
          trigger: [types.read_success, types.read_failure].map((s, i) => (trigger[i] || s))
        }
      }
    },
    update({ id, params = null, body = {}, trigger = [] }: RequestInit) {
      if (!id) throw new Error('restProxy: id is required')
      return {
        type: types.update,
        api: {
          method: 'PUT',
          url: `${baseURL}/${id}`,
          params,
          body,
          trigger: [types.update_success, types.update_failure].map((s, i) => (trigger[i] || s))
        }
      }
    },
    destory({ id, params = null, body = {}, trigger = [] }: RequestInit) {
      if (!id) throw new Error('restProxy: id is required')
      return {
        type: types.destory,
        api: {
          method: 'DELETE',
          url: `${baseURL}/${id}`,
          params,
          body,
          trigger: [types.destory_success, types.destory_failure].map((s, i) => (trigger[i] || s))
        }
      }
    }
  }
}
