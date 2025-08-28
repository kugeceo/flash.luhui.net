document.write('<style>:root{--logo-display:none;}</style>')

window.RufflePlayer = window.RufflePlayer || {};
window.RufflePlayer.config = {
    'showSwfDownload': true,
	'openUrlMode': (/(samstudio.skyfont.com|refine.ssjjss.com)/.test(window.location.hostname)?'allow':'deny'),
    //'contextMenu': false,
}

// NotoSansSC-Regular.7k.ttf	["Noto Sans SC Regular"]
// SimSun.7k.ttf				["SimSun"]
window.RufflePlayer.config.fontSources = ['http://static.e12345.com/font/NotoSansSC-Regular.7k.ttf']
window.RufflePlayer.config.defaultFonts = { sans: ['Noto Sans SC Regular'] }
