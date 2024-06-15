const color = (['yellow', 'aqua', 'gray'] as const)[(Math.random() * 3) | 0]

document.body.style.background = color
