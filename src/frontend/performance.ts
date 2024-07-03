// Inspired by https://blog.superhuman.com/performance-metrics-for-blazingly-fast-web-apps/

let lastVisibilityChange = 0
window.addEventListener('visibilitychange', () => lastVisibilityChange = performance.now())

const runMetric = (metric: any = {}) => {
  if (metric.start < lastVisibilityChange || document.hidden) return console.warn('Ignoring metric due to tab visibility')
  metric.finish.run(performance.now())
  requestAnimationFrame(() => { metric.finish.render(performance.now()) })
}

const checkPerformance = (e = { timeStamp: performance.now() }) => {
  
  const mouseDownMetric = { 
    start: e.timeStamp, 
    registered: performance.now(),
    finish: {
      run: (end: number) => console.log('Time to run after click', end - mouseDownMetric.start, end - mouseDownMetric.registered),
      render: (end: number) => console.log('Time to render after click', end - mouseDownMetric.start, end - mouseDownMetric.registered)
    }
  }

  runMetric(mouseDownMetric)

}

// window.addEventListener('mousedown', checkPerformance)

// setInterval(() => checkPerformance(), 1000)
