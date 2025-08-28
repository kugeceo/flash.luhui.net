var sfcore={}
sfcore.db
sfcore.da=[]

sfcore.loaderInit=function(){
	sfcore.loader = {}
	var exports = sfcore.loader;
	var Ucren =	{
        isIe: /msie/i.test(navigator.userAgent),
        randomNumber: function(num) {
            return Math.floor(Math.random() * num)
        }
	};
    Function.prototype.bind = function(scope) {
        var me = this;
        return function() {
            return me.apply(scope, arguments)
        }
    }
	
	var	loading = $("#loading");
	var	loadingBg =	$("#loading-bg");
	var	loader = $("#loading-loader");
	var	loadingText = $("#loading-text");
	var	loadingState = $("#loading-state");
	var	lastdecimal, tempdecimal, interv;
	var	close =	function() {
		loading.hide();
		loadingBg.hide();
	};
	var	exponential = function(index, offset, target, framesNum) {
		if (index == 0)	{
			return offset
		} else {
			if (index == framesNum)	{
				return offset +	target
			} else {
				if ((index /= framesNum	/ 2) < 1) {
					return target /	2 *	Math.pow(2,	10 * (index	- 1)) +	offset
				} else {
					return target /	2 *	(-Math.pow(2, -10 *	--index) + 2) +	offset
				}
			}
		}
	};
	exports.animTo = function()	{
		var	timer =	0
		  ,	lastWidth =	0
		  ,	frames = 15;
		return function(width, callback) {
			var	last = lastWidth, index = 0, ctime;
			timer =	ctime =	setInterval(function() {
				if (timer != ctime)	{
					return clearInterval(ctime)
				}
				var	w =	lastWidth =	exponential(index++, last, width - last, frames);
				loader.css("width", Math.round(w)	+ "%");
				loadingState.html(w.toFixed(2) + "%");
				w === 100 && loadingText.html("完成.");
				if (index >	frames)	{
					clearInterval(ctime);
					lastWidth =	0;
					callback &&	setTimeout(callback, 100)
				}
			}, Ucren.isIe ?	16 : 24)
		}
	}();
	exports.show = function(text) {
		if (this.inworking)	{
			return
		}
		var	proc = 0
		  ,	me = this;
		var	time = 150;
		var	intervFun =	function() {
			var	n =	Math.max(Math.floor((100 - proc) / 4), 0);
			if (n == 0)	{
				lastdecimal = lastdecimal +	Ucren.randomNumber(10)
			} else {
				lastdecimal = Ucren.randomNumber(1000)
			}
			proc = Math.min(proc + n, 100);
			me.animTo(proc);
			if (lastdecimal	> 999) {
				proc = Math.min(proc + 1, 99);
				lastdecimal	-= 1000
			}
			tempdecimal = lastdecimal /	1000;
			clearTimeout(interv);
			interv = setTimeout(intervFun, time)
		};
		loadingText.html(text +	"...");
		loadingBg.show();
		loading.show();
		intervFun();
		this.inworking = true
	}
	;
	exports.hide = function() {
		if (!this.inworking) {
			return
		}
		clearTimeout(interv);
		this.animTo(100, function()	{
			close();
			this.inworking = false
		}
		.bind(this));
		loadingState.html("100%")
	}
	;
}

sfcore.getdat=function(){
	JSZipUtils.getBinaryContent('/database/flashmuseum.gif', function(err, data) {
		if(err) {
			//throw err
		}
		JSZip.loadAsync(data).then(function (zip) {
			zip.forEach(function (relativePath, zipEntry) {
				zip.file(zipEntry.name).async('string').then(function(d){
					//with(window){eval(d)}
					$.globalEval('sfcore.db='+d)
					var a=[]
					for(var k in sfcore.db){
						var hot=0
						for(var j in sfcore.db[k]['ref']){
							hot=Math.max(hot, sfcore.db[k]['ref'][j]['hot']||0)
						}
						a.push([k,hot])
					}
					a.sort(function(a,b){
						return b[1]-a[1]
					})
					for(var i=0; i<a.length; i++){
						sfcore.da.push(a[i][0])
					}
					sfcore.loader.hide()

					var hash=window.location.hash
					if(hash){
						var ma=hash.match(/^#\/(p|s)\/(.*)$/)
						if(ma){
							var mb=ma[2].match(/^(.*)\/f\/(.*)$/)
							if(ma[1]=='p'){
								var tag
								if(mb){
									sfcore.swflist(mb[1].split('-')[0]-1, 0, 0, mb[2])
									tag=$('#dtcon a:contains("'+mb[1]+'")')[0]
								}else{
									sfcore.swflist(ma[2].split('-')[0]-1)
									tag=$('#dtcon a:contains("'+ma[2]+'")')[0]
								}
								sfcore.tree.openTo(tag.id.substr(3), true)
								tag.onclick()
							}else if(ma[1]=='s'){
								if(mb){
									sfcore.swfsearch(decodeURIComponent(mb[1]), mb[2])
								}else{
									sfcore.swfsearch(decodeURIComponent(ma[2]))
								}
							}
						}else{
							sfcore.tree.openTo(3, true)
							sfcore.swflist(0)
						}
					}else{
						sfcore.tree.openTo(3, true)
						sfcore.swflist(0)
					}

				})
			})
		})
	})
}

sfcore.swflist=function(idx,db,da,num){
	sfcore.loader.show('正在加载列表')
	sfcore.loader.hide()

	// site: flash8, flashempire, niuniu
	var s='',
		d=db||sfcore.db,
		a=da||sfcore.da,
		info;
	s+='<ul class=grid>'
	var sn=Math.min(idx+100, a.length)
	if(!db && !num){
		window.location.hash='#/p/'+(idx+1)+'-'+sn
	}
	for (var i=idx; i<sn; i++) {
		s+='<li class=grid-item>'
		for(var j in d[a[i]]['ref']){
			info=d[a[i]]['ref'][j]
			s+='<dl>'
			s+='<dt sha256='+a[i]+'>'
			if(d[a[i]]['shot']){
				s+='<img class=lazy src=/images/spacer.gif data-original=/datafile/zc/jpg/'+d[a[i]]['shot'][0]['img']+'.jpg>'

			}else{
				s+='<img class="lazy blank" src=/images/spacer.gif data-original=/images/blank.gif>'
			}
			s+='</dt>'
			s+='<dd>'
				s+='作品：'+info['name']+'<br>'
				var au=info['auth']
				if(au){
					s+='作者：<a href="/#/s/'+au+'" target=_blank>'+au+'</a><br>'
				}
			s+='</dd>'
			s+='</dl>'
			break
		}
		s+='</li>'
	}
	s+='</ul>'
	$('#sfcon').html(s)

	//$('.grid').masonry({itemSelector:'.grid-item', columnWidth:150, gutter:20})
	var msnry = new Masonry('.grid', {itemSelector:'.grid-item', columnWidth:150, gutter:20})

	var tipIndex
	var imgNum=0,
		layoutNum=Math.round( 20/1440*$(window).width() )
	$('.grid dt img').load(function(){
		$(this).css('min-height','auto')
		if(this.src.indexOf('spacer.gif')==-1){
			imgNum++
			if(imgNum==2 || imgNum%layoutNum==0 || imgNum==d.length){
				//$('.grid').masonry('layout')
				msnry.layout()
			}
		}
	})
	.hover(
		function(){
			var k=$(this).parent().attr('sha256')
			var d=sfcore.db[k]
			var s=''
			var hot
			for(var i in d['ref']){
				hot=d['ref'][i]['hot']||hot
			}
			for(var i in d['ref']){
				var name=d['ref'][i]['name']
				var auth=d['ref'][i]['auth']
				var desc=d['ref'][i]['desc']||d['ref'][i]['category']
				var up=d['ref'][i]['up']
				s+='编号：'+(sfcore.da.indexOf(k)+1)+'<br>'
				s+=name?'作品：'+name+'<br>':''
				s+=auth?'作者：'+auth+'<br>':''
				s+=desc?'简介：'+desc+'<br>':''
				s+=hot ?'热度：'+hot +'<br>':''
				s+=up  ?'上传：'+up  +'<br>':''
				s+='大小：'+Math.round(d['size']/1024*10)/10+' KB<br>'
				if(d['shot']){
					s+='尺寸：'+d['shot'][0]['width']+' x '+d['shot'][0]['height']+'<br>'
				}
				s+='来源：'+i+'<br>'
				break;
			}
			tipIndex=layer.tips(s,this,{tips:[4,'#666'], skin:'tiplayer', time:0, anim:-1, isOutAnim:false})
		},
		function(){
			layer.close(tipIndex)
		}
	)
	.click(function(){
		var k=$(this).parent().attr('sha256')
		window.location.hash=window.location.hash.split('/f/')[0]+'/f/'+(sfcore.da.indexOf(k)+1)
		var d=sfcore.db[k]
		var t=''
		for(var i in d['ref']){
			var name=d['ref'][i]['name']
			var auth=d['ref'][i]['auth']
			t+=name?name:''
			t+=auth?' - '+auth:''
			break;
		}
		var swfw=550
		var swfh=400
		if(d['shot']){
			swfw=d['shot'][0]['width']*1
			swfh=d['shot'][0]['height']*1
		}
		var w,h,
			iw=swfw,
			ih=swfh,
			ww=$(window).width()-40-2-6,
			wh=$(window).height()-40-43-2
		if(iw/ww < ih/wh){
			h=Math.min(ih,wh)
			w=iw/ih*h
		}else{
			w=Math.min(iw,ww)
			h=ih/iw*w
		}
		layer.open({
			btn: 0,
			area: 'hack',
			isOutAnim: false,
			shadeClose: true,
			skin: 'swflayer',
			title: false,
			content: '<div style="text-align:center;"><IFRAME id=rfcon src="/ruffle.html?path=/datafile/zc/swf/'+k+'.swf&width='+w+'&height='+h+'&title='+encodeURIComponent(t)+'" width='+w+' height='+h+' border=0 frameSpacing=0 frameBorder=0 marginWidth=0 marginHeight=0 noResize scrolling=no></IFRAME></div>'
		})
	})
	if(num){
		$('#sfcon dt[sha256="'+sfcore.da[num-1]+'"] img').click() 
	}
	$('img.lazy').lazyload({effect: 'fadeIn', container: $('#content')})
}

sfcore.swfsearch=function(kw,num){
	var kwd=kw.toLowerCase()
	var db=sfcore.db
	var da=sfcore.da
	var s=''
	var a1=[], a2=[], a3=[]
	for(var i=0; i<da.length; i++){
		for(var j in db[da[i]]['ref']){
			if(a1.length<100 && (db[da[i]]['ref'][j]['name']||'').toLowerCase().indexOf(kwd)>-1){
				a1.push(da[i])
			}
			if(a2.length<100 && (db[da[i]]['ref'][j]['auth']||'').toLowerCase().indexOf(kwd)>-1){
				a2.push(da[i])
			}
			if(a3.length<100 && (db[da[i]]['ref'][j]['desc'] || db[da[i]]['ref'][j]['category'] || '').toLowerCase().indexOf(kwd)>-1){
				a3.push(da[i])
			}
		}
	}
	var d={}
	for(var i=0; i<a1.length; i++){
		d[a1[i]]=1
	}
	for(var i=0; i<a2.length; i++){
		d[a2[i]]=1
	}
	for(var i=0; i<a3.length; i++){
		d[a3[i]]=1
	}
	var sdb={}, sda=[], n=0
	for(var k in d){
		sdb[k]=db[k]
		sda.push(k)
		if(++n>100){
			break;
		}
	}
	if(!num){
		window.location.hash='#/s/'+encodeURIComponent(kw)
	}
	sfcore.swflist(0,sdb,sda,num)
}

sfcore.buildTree=function(){
	dt = new dTree('dt');
	dt.icon.imgFolder='img/imgfolder.gif'
	var wd=window.devicePixelRatio
	if(wd && wd>1){
		for(var i in dt.icon){
			dt.icon[i]=dt.icon[i].replace('img/','img/x2/').replace('.gif','.png')
		}
	}
	sfcore.tree=dt
	dt.config.useCookies = false;
	dt.add(0,-1,'flash.luhui.net');
	dt.add(1,0,'Flash历史博物馆','javascript:void(0)','','','',dt.icon.folderOpen,true);

	var tn=Math.ceil(12333/100)
	for(var i=1,j=2,p; i<=tn; i++,j++){
		if(i%10==1){
			dt.add(j,1,Math.ceil(i/10)+' 号厅展','javascript:void(0)','','','',dt.icon.imgFolder);
			p=j
			j++
		}
		dt.add(j,p, ((i-1)*100+1)+'-'+(i<tn?i*100:12333),'javascript:sfcore.swflist('+(i-1)*100+')','','','',dt.icon.imgFolder);
	}
	dt.add(j,1,'鲁虺软件','javascript:window.open(\'http://soft.luhui.net\')','','','',dt.icon.imgFolder,true);
	dt.add(j+1,j,'Flash源码','javascript:window.open(\'http://gu1vhwx.nat.ipyingshe.com/zh/?mod=forumdisplay&fid=50&filter=typeid&typeid=195\')','','','',dt.icon.node,true);

	dt.add(0,-1,'My example tree');
/*
	dt.add(1,0,'展馆II号入口','/#/s/example01.html');
	dt.add(2,-1,'展馆III号入口','/#/s/example01.html');
*/
	dt.add(3,1,'Flash企业画册 ','/#/s/画册');
	dt.add(4,0,'Flash工具','/#/s/工具');
	dt.add(5,3,'Flash游戏','/#/s/游戏');
	dt.add(6,0,'Flash插件','/#/s/插件');
	dt.add(7,0,'Flash播放器','/player');
	dt.add(8,1,'Flash电子杂志','/#/s/杂志');
	dt.add(9,0,'关于本馆','/#/s/关于','Pictures I\'ve taken over the years','','','img/imgfolder.gif');
	dt.add(10,9,'Flash建站','/#/s/网站','Pictures of Gullfoss and Geysir');
	dt.add(11,9,'隐私保护','/#/s/隐私');
	dt.add(12,0,'版权声明','/#/s/版权','','','img/trash.gif');

	//document.write(dt);
	$('#dtcon').html(''+dt)
}

sfcore.main=function(){

	$(window).resize(function(){
		var win=$(this),
			ww=win.width(),
			wh=win.height(),
			widen;
		if(ww<924){
			$('.mhide').hide()
			$('#aside, #aside .caption').width(188)
			widen=0
		}else{
			$('.mhide').show()
			$('#aside, #aside .caption').width(238)
			widen=50
		}
		$('#aside').height(ww-10)
		$('#page').width(ww).height(wh)
		$('#content').width(ww-(214+widen)).height(wh-20)
		$('#folder').height(wh-27-10)
	}).resize()

	$('#starthere').hide()

	sfcore.buildTree()

	sfcore.loaderInit()
	sfcore.loader.show('正在加载页面')
	//sfcore.loader.hide()

	$('#sbtn').click(function(){
		var kw=$('#stxt').val()
		if(kw!=''){
			sfcore.swfsearch(kw)
		}
	})
	$('#sfrm').submit(function(){
		$('#sbtn').click()
		return false
	})

	sfcore.getdat()
}

/*
     "00983885564771e09ed957dd84c80d4659ed0500e4fdb48610596fd31419675e": {
          "size": 938454,
          "src": "flashempire.com/theater/flash/2006-01/1072244_1138091056.swf",
          "ref": {
               "flashempire": {
                    "auth": "windway-wwteam",
                    "desc": "一个模仿韩国的女孩比较喜欢的游戏。",
                    "id": 23813,
                    "name": "娱乐冰冰果",
                    "hot": 6845
               }
          },
          "shot": [
               {
                    "img": "e01672e5521611cba2ca45d48ba701621cbc826cd8f1872b0034f24b2224adef",
                    "width": 550,
                    "height": 500
               }
          ]
     },
     "00985638f0497860264dec1712072929f6cf706796fded5840cf059f0229a7ce": {
          "size": 4145052,
          "src": "flashempire.com/theater/flash/swfI/1091028142_xy04.swf",
          "ref": {
               "flash8": {
                    "auth": "思妙动画",
                    "desc": "猴王担心自己最终也会被扔下山崖……",
                    "email": "snail@snailcn.com",
                    "id": 10483,
                    "name": "大闹西游4 王者拜师(上)",
                    "src": true,
                    "up": "思妙动画"
               },
               "flashempire": {
                    "auth": "思妙文化",
                    "desc": "猴王担心自己最终也会被扔下山崖……",
                    "id": 3044,
                    "name": "大闹西游4：王者拜师（上）",
                    "hot": 72331
               }
          },
          "shot": [
               {
                    "img": "26d6b9c19cfbaaea26ba3b5bc0b43d69d53c68c756cb0254569e16a3085989e3",
                    "width": 360,
                    "height": 288
               }
          ]
     },
     "009b8f6c5429eae985ed54304001287567146ccbcfdbbe8531d264ae9acf5670": {
          "size": 60279,
          "src": "niu-niu.com/happy/swf/xixi067.swf",
          "ref": {
               "niuniu": {
                    "auth": "牛牛",
                    "category": "牛牛漫画",
                    "name": "新观点"
               }
          }
     },
*/