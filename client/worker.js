import client from './client'
import environment from './environment'
import router from './router'
import state from './state'

const worker = { ...state.worker }
delete state.worker

const emptyQueue = Object.freeze([])

const queuesProxyHandler = {
  set(target, name, value) {
    target[name] = value
    client.update()
    return true
  },
  get(target, name) {
    return target[name] || emptyQueue
  },
}

worker.queues = new Proxy({}, queuesProxyHandler)

const workerProxyHandler = {
  set(target, name, value) {
    if (target[name] !== value) {
      target[name] = value
      client.update()
    }
    return true
  },
}

const proxy = new Proxy(worker, workerProxyHandler)

async function register() {
  if ('serviceWorker' in navigator) {
    const request = `/service-worker.js`
    try {
      proxy.registration = await navigator.serviceWorker.register(request, { scope: '/' })
      if (environment.development) {
        proxy.registration.unregister()
      }
    } catch (error) {
      console.error(error)
    }
  }
}

if (worker.enabled) {
  window.addEventListener('beforeinstallprompt', function (event) {
    event.preventDefault()
    proxy.installation = event
  })
  register()
}

window.addEventListener('online', () => {
  proxy.online = true
  if (environment.mode === 'ssg') {
    router._update(router.url)
  } else {
    proxy.responsive = true
  }
})

window.addEventListener('offline', () => {
  proxy.online = false
})

export default proxy
