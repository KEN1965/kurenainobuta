
AFRAME.registerComponent('hover-on-palm', {
  schema: {
    amplitude: {type: 'number', default: 0.02},
    frequency: {type: 'number', default: 1.5},
  },
  init() {
    const soundEl = this.el.querySelector('a-sound')
    const overlay = document.getElementById('overlay')
    const startBtn = document.getElementById('start-button')

    // ARの準備が完全に整ったらボタンを表示する
    this.el.sceneEl.addEventListener('realityready', () => {
      if (overlay) {
        overlay.style.display = 'flex'  // ここで初めて表示
      }
    })

    const startAR = () => {
      if (soundEl && soundEl.components.sound) {
        soundEl.components.sound.playSound()
      }

      if (overlay) {
        overlay.style.opacity = '0'
        setTimeout(() => {
          overlay.style.display = 'none'
        }, 600)
      }
    }

    if (startBtn) {
      startBtn.addEventListener('click', startAR)
      startBtn.addEventListener('touchstart', startAR)
    }
  },
  tick(time, timeDelta) {
    // 純粋にサイン波の数値だけを計算
    const offset = Math.sin(time / 1000 * this.data.frequency) * this.data.amplitude

    // このコンポーネントが付いている要素の「Y軸（高さ）」だけを書き換える
    // 親要素が回転していないため、このYは必ず「垂直方向」になります
    this.el.object3D.position.z = offset
  },
})
