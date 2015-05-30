(function(global){
	"use strict";
	var wsProto = Object.create(HTMLElement.prototype),
		privateVars = {};


	//versionを定義します
	Object.defineProperty(wsProto, "version", {
		enumerable: true, //プロパティ列挙に現れる
		value: "1.0.0" //このコンポーネントのバージョンは"1.0.0"である
		//書換え不可、__proto__はnull、設定変更不可
	});


	//
	//--------------- privates -----------------
	//
	privateVars.doc = (document._currentScript || document.currentScript).ownerDocument;	

	//
	//---------------- Header -------------------
	//


	//======Property
	
	//this.baseTemplates
	//
	//テンプレートのリスト
	//type: Array
	//default: []



	//this.endpoint
	//
	//apiのエンドポイント
	//type: String
	//default: undefined


	//this.jsonpCallbacks
	//
	//jsonp用のグローバルな関数リスト
	//type: Array
	//default: []

	

	//this.queryParams
	//
	//api問い合わせのオプション
	//type: Object
	//default: {}



	//=======class property

	//データを受け取った時のコールバックの配列
	wsProto.onGetDataCallbacks = [];

	//テーマリスト
	wsProto.themeList = ["dark", "light"];





	//========class method


	//インスタンスのプロパティを初期化する
	//param:
	//	なし
	//return:
	//	this
	wsProto.init = init;


	//デフォルトテンプレートを読み込み、リストに追加する
	//param:
	//	(string) query
	//		読み込むエレメントをquerySelectorで指定する
	//		default:"template"
	//
	//return:
	//	this
	wsProto.loadDefaultTemplates = loadDefaultTemplates;
	


	//NodeListをArrayにして返す HTMLCollectionでも可
	//param:
	//	nodeList
	//
	//return:
	//	array　もしくは (不正な引数時)false
	wsProto.nodeListToArray = nodeListToArray;

	//テンプレートのリストを読み込み、this.rootに挿入する
	//param:
	//	なし
	//
	//return:
	//	this
	wsProto.updateBase = updateBase;


	//this.rootをセットする 新しいshadowrootをセットするのにも使う
	//param:
	//	1番目:(boolean) isShadow
	//		truthy: shadowrootがセット
	//		falsey: thisがセット
	//
	//	2番目:(boolean) forceNew
	//		truthy: 既にshadowRootがあっても新しいshadowrootをセット
	//		falsey: もし既存のshadowrootがあればそれをセット、無ければ新しく作る
	//
	//return:
	//	this
	wsProto.setRoot = setRoot;



	//rootのドキュメントをリセット、又は新規作成する
	//param:
	//	1番目:(boolean) createNewShadowRoot
	//		truthy: 新しいshadowrootを作る
	//		falsey: 既存のshadowRootをリセット
	//
	//return:
	//	this
	wsProto.resetRoot = resetRoot;



	//objectをqueryStringにして返す
	//param:
	//	1番目:(object) options
	//
	//return: (string) querystring
	wsProto.getQueryString = getQueryString;



	//wikipedia apiのエンドポイントを設定する
	//param:
	//	1番目:(string) languageCode
	//		http://en.wikipedia.org/wiki/Wikimedia_project#Language_codes を参照
	//		デフォルトは"ja"
	//
	//	2番目:(string) URIScheme 
	//		https or http デフォルトはページのscheme
	//
	//return:this
	wsProto.setWikipediaAPIEndpoint = setWikipediaAPIEndpoint;



	//jsonpリクエストを発生させる
	//param:
	//	1番目:(function) callback
	//		リクエスト成功時のコールバック
	//	
	//	2番目:(string) url
	//		jsonpのリクエストurl
	//
	//	3番目:(object) data
	//		クエリパラメータになるobject
	//
	//return:
	//	this
	wsProto.requestWithJsonP = requestWithJsonP;


	//domのattributeから設定を読み取り、セットする
	//param:
	//	1番目:(array) attrNames
	//		属性の名前
	//		default:全ての設定attributeを読み取る
	//
	//return:
	//	this;
	wsProto.readOptions = readOptions;


	//デフォルトのqueryParamsを設定する
	//param:
	//	なし
	//
	//return:
	//	this;
	wsProto.setDefaultQueryParams = setDefaultQueryParams;



	//リクエスト可能な常態かチェック
	//param:
	//	なし
	//
	//return:
	//	(boolean) true or false
	//	true:
	//		リクエストレディ
	//	false:
	//		リクエストできない
	wsProto.isRequestReady = isRequestReady;



	//アンカーを絶対urlにする
	//param:
	//	(node) doc
	//
	//return:
	//	(node) doc
	wsProto.absUrl = absUrl;




	//jsonからタイトル,html,pageidをthisに設定する
	//
	//param:
	//	(json) json
	//
	//return:
	//	this
	wsProto.setDataFromJSON = setDataFromJSON;




	//nodeやstringをthis.rootの指定した場所の末尾に挿入する
	//文字列の場合は既存の文字列と結合する
	//
	//param:
	//	1番目:
	//		(node) or (string) content
	//
	//	2番目:
	//		(string) querySelectorString
	//
	//return:
	//	this;
	wsProto.insertContent = insertContent;



	//ユーティリティ
	//urlからオリジンを返す
	//param:
	//	(stirng) url
	//
	//return:
	//	(string) origin
	wsProto.getOriginFromURL = getOriginFromURL;



	//チェックして実行できそうなら実行する
	//param:
	//	無し
	//
	//return:
	//	this;
	wsProto.checkAndRun = checkAndRun;


	//<wikipedia-summary></wikipedia-summary>が生成された時のコールバック
	//param:
	//	なし
	//
	//return:
	//	this;
	wsProto.createdCallback = createdCallback;


	//属性値変更時のコールバック
	//param:
	//	1番目:(string) attrName
	//
	//	2番目:(string) oldVal
	//
	//	3番目:(string) newVal
	//
	//return this;
	wsProto.attributeChangedCallback = attributeChangedCallback;
	



	//summaryの<p>を探し、arrayで返す
	//サマリーを探す為のメソッド
	//param:
	//	1番目: (node) node
	//	省略時: this.wpdata.node
	//
	//return:
	//	(array) summaryArray;
	wsProto.getSummary = getSummary;




	//themeを変更する
	//param:
	//	1番目: (string) themeName
	//
	//return:
	//	this
	wsProto.changeTheme = changeTheme;




	//
	//implements
	//
	
	function init(){
		this.baseTemplates = [];
		this.endpoint;
		this.jsonpCallbacks = [];
		this.queryParams = {};
		this.wpData = {};

		return this;
	}
	

	function loadDefaultTemplates(query){
		var doc, tpls, arTpls, _this;

		query = query || "template";

		_this = this;

		doc = privateVars.doc;
		tpls = doc.querySelectorAll(query);

		arTpls = this.nodeListToArray(tpls);
		if(arTpls){
			arTpls.forEach(function(value, index, arry){
				var clone;
				if("content" in value){
					clone = document.importNode(value.content, true);
				}else{
					clone = value.cloneNode(true);
				}

				this.baseTemplates.push(clone);
			}, _this);
		}

		return this;
	}


	function nodeListToArray(nodeList){
		if(nodeList === null){
			//querySelectorAllの結果が0の場合はnullが帰るのでチェックしておく
			console.warn("nodeListがnullでした。空のarrayを返します。");
			return [];
		}else if('length' in nodeList){
			return Array.prototype.slice.call(nodeList);
		}else{
			console.warn("引数が不正です");
			return false;
		}
	}

	function updateBase(){
		
		var base,
			_this;

		_this = this;
		if(this.root.innerHTML){
			console.warn("innerHTMLが空ではありません。既存のdomにベーステンプレートが追加されようとしています");
		}

		base = this.baseTemplates;

		if(!Array.isArray(base) || !base.length){
			console.warn("ベースとなるテンプレートdomのarrayが空です。何もせずにthisを返します。");
			return this;
		}

		//ベーステンプレートを挿入
		base.forEach(function(value, index, base_array){
			var node;
			if("nodeType" in value){
				//nodeが外部ドキュメントの場合はcloneを作る
				if(value.ownerDocument === document){
					node = value.cloneNode(true);
				}else{
					//nodeはcloneされた外部ドキュメントのnodeである
					node = document.importNode(value, true);
				}
			}else{
				console.log("テンプレートがnodeではありません。");
				//stringならhtmlなstringということにする
				if(typeof value === "string"){
					console.log("テンプレートをHTML stringとして読み込みます");
					node = document.createElement("template");
					node.innerHTML = value;
					node = node.content;
				}else{
					console.warn("このテンプレートを無視します");
				}
			}

			if(node){
				//nodeを挿入
				_this.root.appendChild(node);
			}
		});
		return this;
	}


	function setRoot(isShadow, forceNew){
		var root;
		if(isShadow){
			//shadowRootをセット
			if(forceNew){
				//新しいshadowRootをセット
				root = this.createShadowRoot();
			}else{
				//古いshadowRootがあればそれを
				if(this.shadowRoot){
					root = this.shadowRoot;
				}else{
					root = this.createShadowRoot();
				}
			}
		}else{
			root = this;
		}

		this.root = root;

		return this;
	}
				

	function resetRoot(createNewShadowRoot){
		if(this.shadowRoot){
			//shadowroot
			if(createNewShadowRoot){
				this.setRoot(true, true);
			}else{
				this.root.innerHTML = "";
			}
		}else{
			this.innerHTML = "";
		}

		return this;
	}



	function getQueryString(options){
		var queryStringArray = [];
		Object.keys(options).forEach(function(value, index, arry){
			queryStringArray.push(encodeURIComponent(index) + '=' + encodeURIComponent(value))
		});

		return queryStringArray.join('&');
	}



	function setWikipediaAPIEndpoint(languageCode, URIScheme){
		var languageCode = (languageCode || "ja").toLowerCase(),
			URIScheme = (URIScheme || location.protocol).toLowerCase(),
			endpointPath = 'w/api.php';

		//:がついていなかったらつけておく
		if(URIScheme.indexOf(':') !== (URIScheme.length - 1)){
			URIScheme = URIScheme + ':';
		}

		this.endpoint = URIScheme + '//' + languageCode + '.wikipedia.org/' + endpointPath;

		return this;
	}



	function requestWithJsonP(callback, url, data){
		var _this = this;

		JSONP({
			url: url,
			data: data,
			success: function(data){
				callback(data);
			},
			error: function(){
				cosole.warn("JSONPリクエストに失敗しました");
			}
		});
	}


	function setDefaultQueryParams(){
		var params,
			_this = this;
		if(this.queryParams === undefined){
			this.queryParams = {};
		}

		params = {
			action: "query",
			prop: "revisions",
			rvprop: "content",
			rvparse: "",
			redirects: "",
			format: "json"
		};

		Object.keys(params).forEach(function(val, key, arr){
			this.queryParams[val] = params[val];
		}, _this);

		return this;
	}


	function readOptions(attrNames){
		var allAttr,
			attributeNames,
			_this = this;

		allAttr = {"title":"titles"};//ホワイトリスト

		//もしthis.queryparamsがundefinedならオブジェクトを作っておく
		if(this.queryParams === undefined){
			this.queryParams = {};
		}

		//どの属性を読み取るか
		//引数が無ければ全部
		if(attrNames){
			attributeNames = Array.isArray(attrNames)?attrNames:[attrNames];
		}else{
			attributeNames = [];
			//全部
			Object.keys(allAttr).forEach(function(val, key, arr){
				attributeNames.push(val);
			});
		}


		//属性名がホワイトリストなら値をthis.queryParamsに設定する
		attributeNames.forEach(function(value, index, arry){
			if(allAttr[value] && this.getAttribute(value)){
				this.queryParams[allAttr[value]] = this.getAttribute(value);
			}
		}, _this);

		return this;
	}



	function isRequestReady(){

		return this.endpoint && "queryParams" in this && this.queryParams.titles;
	}
	


	function absUrl(node){
		var rAncs,
			rImgs,
			origin;

		origin = this.getOriginFromURL(this.endpoint);

		rAncs = this.nodeListToArray(
				node.querySelectorAll('a[href^="/wiki/"]'));

		rAncs.forEach(function(val, key, arr){
			var href = val.getAttribute("href");
			val.setAttribute("href", origin + href);
		});

		return node;
	}



	function getSummary(node){
		var summary = [],
			currentNode,
			node = node || this.wpData.node;


		currentNode = node.querySelector("fake-body>p");

		while(currentNode !== null && "tagName" in currentNode && currentNode.tagName.toLowerCase() === 'p'){
			summary.push(currentNode.cloneNode(true));

			if(currentNode.nextSibling){
				currentNode = currentNode.nextSibling;
			}else{
				break;
			}
		}

		return summary;
	}





	function setDataFromJSON(json){

		var pages = json.query.pages,
			pageId,
			tmp;

		pageId = Object.keys(pages)[0];

		this.wpData.title = pages[pageId].title;
		this.wpData.pageId = pageId;
		this.wpData.html = pages[pageId].revisions[0]["*"];

		tmp = document.createElement('template');
		tmp.innerHTML = '<fake-body>' + this.wpData.html + '</fake-body>';

		this.wpData.node = tmp.content;

		return this;
	}


	function insertContent(content, querySelectorString){

		var nodes = this.nodeListToArray(this.root.querySelectorAll(querySelectorString));

		if(typeof content === "string"){
			nodes.forEach(function(val){
				val.textContent = val.textContent + content;
			});
		}else{
			//node?
			nodes.forEach(function(val){
				val.appendChild(content);
			});
		}

		return this;
	}

	function getOriginFromURL(url){
		var protocol,
			host,
			origin,
			temp;
			
		if(!url || typeof url !== "string"){
			return null;
		}


		temp = url.split('/');
		protocol = temp[0];
		host = temp[2];
		origin = protocol + '//' + host;

		return origin;
	}

	function changeTheme(themeName){
		var themeList = this.themeList,
			name = themeName.toLowerCase(),
			container,
			cList;

		if(!themeName || themeList.indexOf(name) === -1){
			console.warn("unknown theme");
			return this;
		}

		container = this.root.querySelector(".wikipedia-summary");

		if(container){
			cList = container.classList;
			
			themeList.forEach(function(val){
				cList.remove(val);
			});

			cList.add(name);
		}

		return this;
	}








	function createdCallback(){
		
		var _this = this,
			temp = {};

		//プロパティを初期化する
		this.init();

		//rootをセットする
		this.setRoot(true, true); //shadowRootを作る

		//クエリのデフォルト値をセットする
		this.setDefaultQueryParams();

		//エンドポイントを設定する
		this.setWikipediaAPIEndpoint(this.getAttribute("lang"));	

		//クエリの設定を読み取る
		this.readOptions();

		//デフォルトテンプレートを取得する
		this.loadDefaultTemplates("template");

		//テンプレート挿入する
		this.updateBase();

		//テーマを反映させる
		if(this.getAttribute("theme")){
			this.changeTheme(this.getAttribute("theme"));
		}


		this.checkAndRun();

		return this;
	}


	function attributeChangedCallback(attrName, oldVal, newVal){
		switch(attrName){
			case "theme":
				this.changeTheme(newVal);
				return this;

			case "title":
				this.readOptions("title");
				break;

			case "lang":
				this.setWikipediaAPIEndpoint(newVal);
				break;

			default:
				console.log("unknown attribute, "+ attrName);
				return this;
		}

		this.resetRoot(false);
		this.updateBase();
		this.checkAndRun();

		return this;
	}


	function checkAndRun(){
		var _this = this;

		if(this.isRequestReady()){

			this.requestWithJsonP(function(data){
				//リクエスト成功時にはonGetDataCallbacksを実行していく
				_this.onGetDataCallbacks.forEach(function(val, key, arry){
					if(typeof val === "function"){
						val.call(_this, data);
					}
				}, _this);
			}, this.endpoint, this.queryParams);
		}else{
		}

		return this;
	}



	//データ取得時のデフォルトコールバックを実装していく
	//thisはwsProtoのインスタンス
	wsProto.onGetDataCallbacks.push(
		//htmlやtitleデータをthis.wpDataにセット
		function(json){
			this.setDataFromJSON(json);
		},

		//サマリーセット
		function(){
			var _this = this,
				summary;

			summary = this.getSummary();
			if(!summary.length){
				console.warn("no summary found");
			}

			summary.forEach(function(val){
				this.insertContent(
					//polyfill環境下で絶対urlになってなかったのでこの段階でもURLを修正する
					_this.absUrl(val.cloneNode(true)),
					'.summary'
				);
			}, _this);
		},

		//タイトルをセット
		function(){
			this.insertContent(
					this.wpData.title,
					'h1'
			);
		},

		//帰属表示
		function(){
			var anc = document.createElement('a'),
				anc2 = document.createElement('a'),
				span = document.createElement('span'),
				span2 = document.createElement('span'),
				url,
				bq,
				licenses = 'http://creativecommons.org/licenses/by-sa/3.0/',
				title = this.wpData.title,
				origin = this.getOriginFromURL(this.endpoint);

			url = origin + '/wiki/' + encodeURIComponent(title);

			anc.setAttribute("href", url);
			anc.textContent = '続きを読む';

			this.insertContent(
					anc,
					'p.attr'
			);

			//cc-sa-by
			anc2.setAttribute('href', licenses);
			anc2.textContent = licenses;

			span.innerHTML = ' (';
			span2.innerHTML = ') ';
			span.appendChild(anc2);
			span.appendChild(span2);


			this.insertContent(
					span,
					'p.attr'
			);

			//<blockquote>にcite属性をセット
			bq = this.root.querySelector("blockquote");

			if(bq){
				bq.setAttribute("cite", url);
			}
		}
	);






	//カスタムエレメントを登録
	document.registerElement('wikipedia-summary', {prototype: wsProto});


})(this);
