(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

require('h5');

(function () {
  var mineSweeperLogic = {
    __name: 'minesweeper.mineSweeperLogic'
  };

  var mineSweeperController = {
    __name: 'minesweeper.mineSweeperController',
    _mineSweeperLogic: mineSweeperLogic,
    '#cell click': function cellClick() {
      this.$find('#bar').text('yeah');
    }
  };

  jQuery(function () {
    h5.core.controller('#mineSweeperContainer', mineSweeperController);
  });
})();

},{"h5":2}],2:[function(require,module,exports){
(function (global){

; jQuery = global.jQuery = require("jquery");
; var __browserify_shim_require__=require;(function browserifyShim(module, define, require) {
'use strict';var _typeof=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol?"symbol":typeof obj;}; /*
 * Copyright (C) 2012-2016 NS Solutions Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * hifive
 *   version 1.2.2
 *   gitCommitId : 18daf02760ed112fc2d57b1256e0ebe47c7dfd2e
 *   build at 2016/03/01 21:22:28.583 (+0900)
 *   (scopedglobals,util,async,resource,controller,dataModel,view,modelWithBinding,validation,ui,api.geo,api.sqldb,api.storage,scene)
 */(function($){ // =========================================================================
//
// Prelude
//
// =========================================================================
var savedH5=undefined; //h5存在チェック
if(window.h5){if(window.h5.env&&window.h5.env.version==='1.2.2'){ // 既にロード済みのhifiveと同じバージョンをロードしようとした場合は何もしない
return;} //coexistのために既存のh5を退避
savedH5=window.h5;} // h5空間を新規に作成。クロージャでくるんでいるので
// 以降の各モジュールが見るh5はここで定義された(新しい)h5になる
var h5={}; // =============================
// Expose to window
// =============================
window.h5=h5;h5.coexist=function(){window.h5=savedH5;return h5;};h5.env={version:'1.2.2'}; // =========================================================================
//
// Extenal Library
//
// =========================================================================
// =========================================================================
//
// Modules
//
// =========================================================================
/* h5scopedglobals */ // =========================================================================
//
// Scoped Globals
//
// =========================================================================
// =============================
// Misc Variables
// =============================
/**
 * { (エラーコード): (フォーマット文字列) } マップ
 *
 * @private
 */var errorCodeToMessageMap={}; /**
 * { (エラーコード)： (フォーマッタ関数) } マップ
 *
 * @private
 */var errorCodeToCustomFormatterMap={}; /**
 * ネットワークに繋がらない時にjqXhr.statusに格納されるコード(IE)。通信をリトライするかどうかの判定に使用。
 *
 * @private
 */var ERROR_INTERNET_CANNOT_CONNECT=12029; /**
 * undefinedかどうかの判定で、typeofで判定する
 *
 * @private
 */var TYPE_OF_UNDEFINED='undefined'; /**
 * Node.ELEMENT_NODE。IE8-ではNodeがないので自前で定数を作っている
 *
 * @private
 */var NODE_TYPE_ELEMENT=1; /**
 * Node.DOCUMENT_NODE。IE8-ではNodeがないので自前で定数を作っている
 *
 * @private
 */var NODE_TYPE_DOCUMENT=9; //=============================
// Errors
//=============================
// =============================
// Misc Functions
// =============================
/**
 * フレームワークエラーを発生させます。
 *
 * @private
 * @param code {Number} エラーコード
 * @param msgParam {Any[]} フォーマットパラメータ
 * @param detail {Any} 追加のデータ(内容はAPIごとに異なる)
 */function throwFwError(code,msgParam,detail){var msg=null;var msgSrc=errorCodeToMessageMap[code];var customFormatter=errorCodeToCustomFormatterMap[code];if(customFormatter){msg=customFormatter(code,msgSrc,msgParam,detail);} //カスタムフォーマッタがnull/undefinedを返した場合も標準フォーマッタにかける
if(!msg&&msgSrc){msg=h5.u.str.format.apply(null,[msgSrc].concat(msgParam));}if(msg){ //最後に必ずエラーコードを付ける
msg+='(code='+code+')';}var e=msg?new Error(msg):new Error('FwError: code = '+code);if(code){e.code=code;}if(detail){e.detail=detail;}throw e;} /* del begin */ // テストのためにexposeする
window.com={htmlhifive:{throwFwError:throwFwError}}; /* del end */ /**
 * エラーコードとエラーメッセージのマップを追加します。
 *
 * @private
 * @param mapObj {Object} { (エラーコード): (フォーマット文字列) }という構造のオブジェクト
 */function addFwErrorCodeMap(mapObj){for(var code in mapObj){if(mapObj.hasOwnProperty(code)){errorCodeToMessageMap[code]=mapObj[code];}}} /**
 * エラーコードとカスタムメッセージフォーマッタのマップを追加します。
 *
 * @private
 * @param errorCode エラーコード
 * @param formatter カスタムメッセージフォーマッタ
 */function addFwErrorCustomFormatter(errorCode,formatter){errorCodeToCustomFormatterMap[errorCode]=formatter;} /**
 * 非同期APIのReject時の理由オブジェクトを作成します。
 *
 * @private
 * @param code {Number} エラーコード
 * @param msgParam {Any[]} フォーマットパラメータ
 * @param detail {Any} 追加のデータ(内容はAPIごとに異なる)
 * @returns {Object} 理由オブジェクト
 */function createRejectReason(code,msgParam,detail){var msg=null;var f=errorCodeToMessageMap[code];if(f){var args=[f].concat(msgParam);msg=h5.u.str.format.apply(null,args);}return {code:code,message:msg,detail:detail};} /**
 * 引数を配列化します。既に配列だった場合はそれをそのまま返し、 配列以外だった場合は配列にして返します。 ただし、nullまたはundefinedの場合はそのまま返します。
 *
 * @private
 * @param value 値
 * @returns 配列化された値、ただし引数がnullまたはundefinedの場合はそのまま
 */function wrapInArray(value){if(value==null){return value;}return isArray(value)?value:[value];} /**
 * 相対URLを絶対URLに変換します。
 *
 * @private
 * @param {String} relativePath 相対URL
 * @returns {String} 絶対パス
 */var toAbsoluteUrl=function(){var a=null;var span=null;var isHrefPropAbsoluteFlag=null;function isHrefPropAbsolute(){if(isHrefPropAbsoluteFlag===null){a.setAttribute('href','./');isHrefPropAbsoluteFlag=a.href!=='./';}return isHrefPropAbsoluteFlag;}return function(relativePath){if(!a){ // a.hrefを使わない場合でも、a.hrefが使えるかどうかの判定でa要素を使用するので、最初の呼び出し時に必ずa要素を作る
a=document.createElement('a');}if(isHrefPropAbsolute()){a.setAttribute('href',relativePath);return a.href;} // a.hrefが絶対パスにならない場合はinnerHTMLを使う
if(!span){span=document.createElement('span');}span.innerHTML='<a href="'+relativePath+'" />';return span.firstChild.href;};}(); /**
 * 引数が文字列かどうかを判定します。
 *
 * @private
 * @param {Any} target 値
 * @returns {boolean} 文字列ならtrue、そうでないならfalse
 */function isString(target){return typeof target==='string';} /**
 * DeferredオブジェクトがReject状態かどうかを判定します。 jQuery1.7でDeferred.isRejected/isResolvedはDeprecatedとなり、
 * 1.8で削除された（代わりにstate()メソッドが1.7から追加された）ので、 使用可能なAPIを用いて判定します。
 *
 * @private
 * @param {Object} dfd Deferredオブジェクト
 * @returns {Boolean} Rejected状態かどうか
 */function isRejected(dfd){if(dfd.isRejected){return dfd.isRejected();} //jQuery 1.7でisRejectedはDeprecatedになり、1.8.0で削除された
return dfd.state()==='rejected';} /**
 * DeferredオブジェクトがReject状態かどうかを判定します。 jQuery1.7でDeferred.isRejected/isResolvedはDeprecatedとなり、
 * 1.8で削除された（代わりにstate()メソッドが1.7から追加された）ので、 使用可能なAPIを用いて判定します。
 *
 * @private
 * @param {Object} dfd Deferredオブジェクト
 * @returns {Boolean} Resolved状態かどうか
 */function isResolved(dfd){if(dfd.isResolved){return dfd.isResolved();}return dfd.state()==='resolved';} /**
 * 引数が名前空間として有効な文字列かどうかを判定します。 ただし、全角文字が含まれる場合はfalseを返します。
 *
 * @private
 * @param {Any} property 値
 * @returns {boolean} 名前空間として有効な文字列であればtrue、そうでないならfalse
 */function isValidNamespaceIdentifier(property){if(!isString(property)){return false;} // 全角文字は考慮しない
return !!property.match(/^[A-Za-z_\$][\w|\$]*$/);} /**
 * 文字列をHTMLにパースします
 * <p>
 * jQuery.parseHTMLがある(jQuery1.8以降)場合はjQuery.parseHTMLと同じです
 * </p>
 * <p>
 * ない場合はjQuery1.8以降のparseHTMLと同様の動作を実装しています。
 * </p>
 *
 * @private
 * @param {String} data HTML文字列
 * @param {Document} [context=document] createElementを行うDocumentオブジェクト。省略した場合はdocumentを使用します
 * @param {Boolean} [keppScripts=false] script要素を生成するかどうか。デフォルトは生成しない(false)です
 */var parseHTML=$.parseHTML?$.parseHTML:function(data,context,keepScripts){if(!data||!isString(data)){return null;}if(typeof context==='boolean'){ // context指定が省略された場合(第2引数がboolean)なら第2引数をkeepScripts指定として扱う
keepScripts=context;context=false;}context=context||document; // タグで囲って、$()でパースできるようにする
data='<div>'+data+'</div>';var $ret=$(data,context);if(!keepScripts){ // script要素の除去
$ret.find('script').remove();} // タグで囲ってパースしたので、parentElementがダミーのものになっている
// そのためフラグメントを生成してparentElementがnullになるようにする
var ret=$ret[0].childNodes;var fragment=context.createDocumentFragment();for(var i=0,l=ret.length;i<l;i++){fragment.appendChild(ret[i]);}return fragment.childNodes;}; // =============================
// ロガー・アスペクトで使用する共通処理
// =============================
/**
 * 文字列の正規表現記号をエスケープします。
 *
 * @private
 * @param {String} str 文字列
 * @returns {String} エスケープ済文字列
 */function escapeRegex(str){return str.replace(/\W/g,'\\$&');} /**
 * 引数がStringの場合、RegExpオブジェクトにして返します。 引数がRegExpオブジェクトの場合はそのまま返します。
 *
 * @private
 * @param {String|RegExp} target 値
 * @returns {RegExp} オブジェクト
 */function getRegex(target){if($.type(target)==='regexp'){return target;}var str='';if(target.indexOf('*')!==-1){var array=$.map(target.split('*'),function(n){return escapeRegex(n);});str=array.join('.*');}else {str=target;}return new RegExp('^'+str+'$');} /**
 * promiseのメソッド呼び出しを_h5UnwrappedCallを使って行います。 jQueryのpromiseが渡されたらそのまま実行します。
 *
 * @private
 * @param {Deferred|Promise} promise
 * @param {String} method
 * @param {Array|Any} args 複数の引数があるときは配列で渡します。
 */function registerCallbacksSilently(promise,method,args){if(promise){promise._h5UnwrappedCall?promise._h5UnwrappedCall(method,args):promise[method](args);}} /**
 * 使用しているjQueryのバージョンで推奨されている、Deferredをフィルタリングまたはチェーンするメソッドを実行します。
 * <p>
 * deferred.pipe()がjQuery1.8から非推奨となったため1.8以上の場合then()を、1.7以下の場合はpipe()を実行します。
 *
 * @private
 * @param {Promise} promise Promiseオブジェクト
 * @param {Function} doneFilter doneコールバック
 * @param {Function} failFilter failコールバック
 * @param {Function} progressFilter progressコールバック
 * @returns {Promise} Promiseオブジェクト
 */function thenCompat(promise,doneFilter,failFilter,progressFilter){ //curCSS()はjQuery1.8.0で削除されたメソッド。これの有無で1.8以上かどうかの判定を代理している
return promise[$.hasOwnProperty('curCSS')?'pipe':'then'](doneFilter,failFilter,progressFilter);} /**
 * 渡されたオブジェクトがwindowオブジェクトかどうか判定する
 *
 * @private
 * @param {Any} obj
 * @returns {Boolean} objがwindowオブジェクトかどうか
 */function isWindowObject(obj){ // nodeがdocumentを持ち、documentから得られるwindowオブジェクトがnode自身ならnodeをwindowオブジェクトと判定する
return obj&&obj.document&&obj.document.nodeType===NODE_TYPE_DOCUMENT&&getWindowOfDocument(obj.document)===obj;} /**
 * ノードからドキュメントを取得。
 * <p>
 * 引数がdocumentノードなら引数をそのまま、ノードならownerDocument、windowオブジェクトならそのdocumentを返します。nodeがいずれにも該当しない場合はnullを返します。
 * </p>
 *
 * @private
 * @param {DOM} node
 * @returns {Document} documentオブジェクト
 */function getDocumentOf(node){if(_typeof(node.nodeType)===TYPE_OF_UNDEFINED){ // ノードではない
if(isWindowObject(node)){ // windowオブジェクトならwindow.documentを返す
return node.document;}return null;}if(node.nodeType===NODE_TYPE_DOCUMENT){ // nodeがdocumentの場合
return node;} // nodeがdocument以外(documentツリー属するノード)の場合はそのownerDocumentを返す
return node.ownerDocument;} /**
 * documentオブジェクトからwindowオブジェクトを取得
 *
 * @private
 * @param {Document} doc
 * @returns {Window} windowオブジェクト
 */function getWindowOfDocument(doc){ // IE8-だと、windowとwindow.document.parentWindowで、同じwindowを指すが、"==="で比較するとfalseになる (#339)
// イベントハンドラをバインドするターゲットがwindowである時は、window.document.parentWindowではなく
// windowにバインドして、イベントハンドラのthis(コントローライベントハンドラの第２引数)をwindowにするため、
// window.document === doc の場合はparentWindowではなくwindowを返すようにしている
// IE8-ではdocument.parentWindow、それ以外はdoc.defaultViewでwindowオブジェクトを取得
return window.document===doc?window:doc.defaultView||doc.parentWindow;} /**
 * ノードからwindowオブジェクトを取得
 *
 * @private
 * @param {DOM} node
 * @returns {Window} windowオブジェクト
 */function getWindowOf(node){return getWindowOfDocument(getDocumentOf(node));} /**
 * 引数が配列かどうか判定
 * <p>
 * Array.isArrayがあるブラウザの場合はisArray===Array.isArrayです
 * </p>
 *
 * @private
 * @param {Any} obj
 * @returns {Boolean}
 */var isArray=Array.isArray||function(){ // プロパティアクセスを減らすため、toStringをキャッシュ
var toStringObj=Object.prototype.toString;return function(obj){return toStringObj.call(obj)==='[object Array]';};}(); /**
 * 引数が関数かどうか判定
 *
 * @private
 * @param {Any} obj
 * @returns {Boolean}
 */var isFunction=function(){ // Android3以下、iOS4以下は正規表現をtypeofで判定すると"function"を返す
// それらのブラウザでは、toStringを使って判定する
if(typeof new RegExp()==='function'){var toStringObj=Object.prototype.toString;return function(obj){return toStringObj.call(obj)==='[object Function]';};} // 正規表現のtypeofが"function"にならないブラウザなら、typeofがfunctionなら関数と判定する
return function(obj){return typeof obj==='function';};}(); /**
 * 複数のプロミスを待機する機能と、待機中のプロミスを外す機能を提供するクラス
 *
 * @private
 * @class
 * @param promises
 * @param doneCallback
 * @param failCallback
 * @param cfhIfFail
 */function WaitingPromiseManager(promises,doneCallback,failCallback,cfhIfFail){ // 高速化のため、長さ1または0の場合はforを使わずにチェックする
var length=promises?promises.length:0;var isPromise=h5.async.isPromise;var that=this;var resolveArgs=null;this._doneCallbackExecuter=function(){that._resolved=true;if(doneCallback){if(resolveArgs){ // resolveArgsを生成している(=複数プロミス)の場合は各doneハンドラの引数を配列にしたものを第1引数に渡す
doneCallback.call(this,resolveArgs);}else { // 一つのpromiseにdoneハンドラを引っかけた場合はdoneハンドラの引数をそのままcallbackに渡す
doneCallback.apply(this,arguments);}}};this._failCallbackExecuter=function(){that._rejected=true;if(failCallback){failCallback.apply(this,arguments);}else if(cfhIfFail&&h5.settings.commonFailHandler){ // failCallbackが渡されていなくてcfhIfFailがtrueでcommonFailHandlerが設定されていればcFHを呼ぶ
h5.settings.commonFailHandler.call(this,arguments);}}; // 高速化のため、長さ１またはプロミスを直接指定の場合はプロミス配列を作らない
if(length===1||isPromise(promises)){var promise=length===1?promises[0]:promises;if(!isPromise(promise)){ // 長さ1で中身がプロミスでない場合はdoneCallback実行して終了
this._doneCallbackExecuter();return;} // プロミス配列を作っていない場合のremoveをここで定義(プロトタイプのremoveを上書き)
this.remove=function(p){if(this._resolved||this._rejected){return;}if(promise===p){this._doneCallbackExecuter();}}; // 長さ1で、それがプロミスなら、そのプロミスにdoneとfailを引っかける
promise.done(this._doneCallbackExecuter);promise.fail(this._failCallbackExecuter);return;} // promisesの中のプロミスオブジェクトの数(プロミスでないものは無視)
// 引数に渡されたpromisesのうち、プロミスオブジェクトと判定したものを列挙
var monitoringPromises=[];for(var i=0,l=promises.length;i<l;i++){var p=promises[i];if(isPromise(p)){monitoringPromises.push(p);}}var promisesLength=monitoringPromises.length;if(promisesLength===0){ // プロミスが一つもなかった場合は即doneCallbackを実行
this._resolved=true;doneCallback&&doneCallback();return;}this._promises=monitoringPromises;resolveArgs=[];this._resolveArgs=[];this._resolveCount=0;this._promisesLength=promisesLength; // いずれかのpromiseが成功するたびに全て終わったかチェックする関数
function createCheckFunction(_promise){ // いずれかのpromiseが成功するたびに全て終わったかチェックする関数
return function check() /* var_args */{if(that._rejected){ // 既にいずれかがreject済みならなにもしない
return;}var arg=h5.u.obj.argsToArray(arguments); // 引数無しならundefined、引数が一つならそのまま、引数が2つ以上なら配列を追加
// ($.when()と同じ)
var index=$.inArray(_promise,promises);resolveArgs[index]=arg.length<2?arg[0]:arg;if(++that._resolveCount===that._promisesLength){ // 全てのpromiseが成功したので、doneCallbackを実行
that._doneCallbackExecuter();}};}for(var i=0;i<promisesLength;i++){var targetPromise=monitoringPromises[i];targetPromise.done(createCheckFunction(targetPromise)).fail(this._failCallbackExecuter);}}WaitingPromiseManager.prototype=$.extend(WaitingPromiseManager.prototype,{remove:function remove(promise){if(this._resolved||this._rejected){return;}if(promsie===this._promises){this._doneCallback&&doneCallback();this._resolved=true;return;}var index=$.inArray(promise,this._promises);if(index===-1){return;} // 待機中のpromisesからpromiseを外す
this._promises.splice(index,1); // 取り除くpromiseについてのresolveArgsを減らす
this._resolveArgs.splice(index,1);if(isResolved(promise)){ // 既にresolve済みなら何もしない
return;} // キャッシュしてある待機中プロミスの個数を1減らす
this._promisesLength--;if(that._resolveCount===this._promisesLength){ // 現在resolve済みの個数と、1減らした後の待機中プロミス個数が同じならdoneハンドラ実行
this._doneCallbackExecuter();}}}); /**
 * 複数のプロミスが完了するのを待機する
 * <p>
 * whenとは仕様が異なり、新しくdeferredは作らない。
 * </p>
 *
 * @private
 * @param {Promise[]} promises
 * @param {Function} doneCallback doneコールバック
 * @param {Function} failCallback failコールバック
 * @param {Boolean} cfhIfFail 渡されたpromiseのいずれかが失敗した時にcFHを呼ぶかどうか。
 *            cFHを呼ぶときのthisは失敗したpromiseオブジェクト、引数は失敗したpromiseのfailに渡される引数
 * @returns {WaitingPromiseManager}
 */function waitForPromises(promises,doneCallback,failCallback,cfhIfFail){return new WaitingPromiseManager(promises,doneCallback,failCallback,cfhIfFail);} //TODO あるオブジェクト下に名前空間を作ってexposeするようなメソッドを作る
var h5internal={core:{controllerInternal:null}}; /* ------ h5.u ------ */(function(){ // =========================================================================
//
// Constants
//
// =========================================================================
// =============================
// Production
// =============================
/**
	 * undefinedのタイプ
	 */var TYPE_OF_UNDEFINED='undefined'; /**
	 * シリアライザのバージョン
	 */var CURRENT_SEREALIZER_VERSION='2'; // エラーコード
/**
	 * ns()、getByPathで引数の名前空間名にstring以外が渡されたときに発生するエラー
	 */var ERR_CODE_NAMESPACE_INVALID=11000; /**
	 * expose()で既に存在する名前空間が指定されたときに発生するエラー
	 */var ERR_CODE_NAMESPACE_EXIST=11001; /**
	 * serialize()に関数オブジェクトが渡されたときに発生するエラー
	 */var ERR_CODE_SERIALIZE_FUNCTION=11002; /**
	 * 現行のバージョンと違うバージョンでserialize()された文字列をdeserialize()しようとしたときに発生するエラー
	 */var ERR_CODE_SERIALIZE_VERSION=11003; /**
	 * deserialize()で型情報の判定に失敗したときに発生するエラー
	 */var ERR_CODE_DESERIALIZE_TYPE=11004; /**
	 * serialize()に渡されたオブジェクト/配列が循環参照を持つときに発生するエラー
	 */var ERR_CODE_CIRCULAR_REFERENCE=11005; /**
	 * deserialize()で値が不正でデシリアライズできない時に発生するエラー
	 */var ERR_CODE_DESERIALIZE_VALUE=11006; /**
	 * loadScript()に渡されたパスが不正(文字列以外、空文字、空白文字)である時に発生するエラー
	 */var ERR_CODE_INVALID_SCRIPT_PATH=11007; /**
	 * loadScript()に渡されたオプションが不正(プレーンオブジェクト、null、undefined)である時に発生するエラー
	 */var ERR_CODE_INVALID_OPTION=11008; /**
	 * deserialize()で引数に文字列でないものを渡されたときのエラー
	 */var ERR_CODE_DESERIALIZE_ARGUMENT=11009; /**
	 * loadScript() 読み込みに失敗した場合に発生するエラー
	 */var ERR_CODE_SCRIPT_FILE_LOAD_FAILD=11010; // =============================
// Development Only
// =============================
/* del begin */ /**
	 * 各エラーコードに対応するメッセージ
	 */var errMsgMap={};errMsgMap[ERR_CODE_NAMESPACE_INVALID]='{0} 名前空間の指定が不正です。名前空間として有効な文字列を指定してください。';errMsgMap[ERR_CODE_NAMESPACE_EXIST]='名前空間"{0}"には、プロパティ"{1}"が既に存在します。';errMsgMap[ERR_CODE_SERIALIZE_FUNCTION]='Function型のオブジェクトは変換できません。';errMsgMap[ERR_CODE_SERIALIZE_VERSION]='シリアライザのバージョンが違います。シリアライズされたバージョン：{0} 現行のバージョン：{1}';errMsgMap[ERR_CODE_DESERIALIZE_TYPE]='型指定子が不正です。';errMsgMap[ERR_CODE_CIRCULAR_REFERENCE]='循環参照が含まれています。';errMsgMap[ERR_CODE_DESERIALIZE_VALUE]='不正な値が含まれるため、デシリアライズできませんでした。';errMsgMap[ERR_CODE_INVALID_SCRIPT_PATH]='スクリプトのパスが不正です。空文字以外の文字列、またはその配列を指定して下さい。';errMsgMap[ERR_CODE_INVALID_OPTION]='{0} オプションの指定が不正です。プレーンオブジェクトで指定してください。';errMsgMap[ERR_CODE_DESERIALIZE_ARGUMENT]='deserialize() 引数の値が不正です。引数には文字列を指定してください。';errMsgMap[ERR_CODE_SCRIPT_FILE_LOAD_FAILD]='スクリプトファイルの読み込みに失敗しました。URL:{0}'; // メッセージの登録
addFwErrorCodeMap(errMsgMap); /* del end */ // =========================================================================
//
// Cache
//
// =========================================================================
// =========================================================================
//
// Privates
//
// =========================================================================
// =============================
// Variables
// =============================
/**
	 * loadScript()によって追加されたjsファイルの絶対パスを保持するオブジェクト
	 *
	 * @private
	 */var addedJS={}; /**
	 * HTMLのエスケープルール
	 *
	 * @private
	 */var htmlEscapeRules={'&':'&amp;','"':'&quot;','<':'&lt;','>':'&gt;',"'":'&#39;'}; /**
	 * SCRIPTにonloadがあるかどうか
	 *
	 * @private
	 */var existScriptOnload=document.createElement('script').onload!==undefined; /**
	 * RegExp#toStringで改行文字がエスケープされるかどうか。 IEはtrue
	 *
	 * @private
	 */var regToStringEscapeNewLine=new RegExp('\r\n').toString().indexOf('\r\n')===-1; // =============================
// Functions
// =============================
/**
	 * 型情報の文字列をコードに変換します。
	 *
	 * @private
	 * @returns {String} 型を表すコード（１字）
	 */function typeToCode(typeStr){switch(typeStr){case 'string':return 's';case 'number':return 'n';case 'boolean':return 'b';case 'String':return 'S';case 'Number':return 'N';case 'Boolean':return 'B';case 'infinity':return 'i';case '-infinity':return 'I';case 'nan':return 'x';case 'date':return 'd';case 'regexp':return 'r';case 'array':return 'a';case 'object':return 'o';case 'null':return 'l';case TYPE_OF_UNDEFINED:return 'u';case 'undefElem':return '_';case 'objElem':return '@';}} /**
	 * 文字列中の\(エスケープ文字)とその他特殊文字をエスケープ
	 * <p>
	 * \\, \b, \f, \n, \r, \t をエスケープする
	 * </p>
	 * <p>
	 * http://json.org/json-ja.html に載っているうちの \/ と \" 以外。
	 * </p>
	 * <p>
	 * \/はJSON.stringifyでもエスケープされず、$.parseJSONでは\/も\\/も\/に復元されるので、エスケープしなくてもしてもどちらでもよい。
	 * \"はserialize文字列組立時にエスケープするのでここではエスケープしない。
	 * </p>
	 *
	 * @private
	 * @param {String} str
	 * @param {Boolean} nlEscaped 改行コードがすでにエスケープ済みかどうか。正規表現をtoString()した文字列をエスケープする場合に使用する。
	 *            正規表現をtoString()した場合に改行がエスケープされるブラウザとそうでないブラウザがあるため、改行がescape済みかどうかを引数で取り、
	 *            trueが指定されていた場合は改行以外をエスケープする。
	 * @returns {String} エスケープ後の文字列
	 */function escape(str,nlEscaped){if(isString(str)){var ret=str;if(nlEscaped){ // 改行コードがすでにエスケープ済みの文字列なら、一旦通常の改行コードに戻して、再度エスケープ
// IEの場合、RegExp#toString()が改行コードをエスケープ済みの文字列を返すため。
ret=ret.replace(/\\n/g,'\n').replace(/\\r/g,'\r');} // \b は、バックスペース。正規表現で\bを使うと単語境界を表すが、[\b]と書くとバックスペースとして扱える
ret=ret.replace(/\\/g,'\\\\').replace(/\n/g,'\\n').replace(/\r/g,'\\r').replace(/[\b]/g,'\\b').replace(/\f/g,'\\f').replace(/\t/g,'\\t');return ret;}if(str instanceof String){return new String(escape(str.toString()));}return str;} /**
	 * エスケープされた改行とタブと\(エスケープ文字)をアンエスケープ
	 *
	 * @private
	 * @param {String} str
	 * @param {String} version デシリアライズ対象の文字列がシリアライズされた時のバージョン。'1'ならunescapeしない。
	 * @returns {String} エスケープ後の文字列
	 */function unescape(str,version){if(version==='1'){return str;}if(isString(str)){ // \に変換する\\は一度'\-'にしてから、改行とタブを元に戻す。
// '\-'を元に戻す。
return str.replace(/\\\\/g,'\\-').replace(/\\b/g,'\b').replace(/\\f/g,'\f').replace(/\\n/g,'\n').replace(/\\r/g,'\r').replace(/\\t/g,'\t').replace(/\\-/g,'\\');}if(str instanceof String){return new String(unescape(str.toString()));}return str;} /**
	 * 文字列中のダブルコーテーションをエスケープする
	 *
	 * @private
	 * @param {String} str
	 * @returns {String} エスケープ後の文字列
	 */function escapeDoubleQuotation(str){ // オブジェクトまたは配列の場合、シリアライズした結果に対して、ダブルコーテーションもエスケープする。#459
// ダブルコーテーションを\"でエスケープし、エスケープで使用する\は\\にエスケープする。
// これはオブジェクトまたは配列のデシリアライズ時に$.parseJSONを使用していて、その際にダブルコーテーション及びバックスラッシュがアンエスケープされるためである。
// 例えば {'"':'"'} のようなキー名または値にダブルコーテーションを含むようなオブジェクトの場合、
// parseJSONはダブルコーテーションをエスケープするため、'{"\\"":"\\""}' のような文字列にしないとparseJSONで復元できない。
// '{"\"":"\""}' をparseJSONするとエラーになってしまう。
return str.replace(/\\/g,'\\\\').replace(/"/g,'\\"');} /**
	 * 指定されたスクリプトファイルをロードして、スクリプト文字列を取得します。(loadScriptメソッド用)
	 * <p>
	 * dataType:scriptを指定した場合のデフォルトの挙動は、スクリプトファイルの読み込み完了後に$.globalEval()で評価を行うため、
	 * convertersを上書きしています。
	 *
	 * @private
	 * @param {String} url 読み込み対象のスクリプトパス
	 * @param {Boolean} async 非同期でロードを行うか (true:非同期 / false:同期)
	 * @param {Boolean} cache キャッシュされた通信結果が存在する場合、その通信結果を使用するか (true:使用する/false:使用しない)
	 */function getScriptString(url,async,cache){var df=h5.async.deferred(); // 複数のパラメータを配列でまとめて指定できるため、コールバックの実行をresolveWith/rejectWith/notifyWithで行っている
h5.ajax({url:url,async:async,cache:cache,dataType:'script',converters:{'text script':function textScript(text){return text;}}}).done(function(){var args=argsToArray(arguments);args.push(this.url);df.notifyWith(df,args);df.resolveWith(df,args);}).fail(function(){df.rejectWith(df,argsToArray(arguments));});return df.promise();} // =========================================================================
//
// Body
//
// =========================================================================
/**
	 * ドット区切りで名前空間オブジェクトを生成します。
	 * （h5.u.obj.ns('sample.namespace')と呼ぶと、window.sample.namespaceとオブジェクトを生成します。）
	 * すでにオブジェクトが存在した場合は、それをそのまま使用します。 引数にString以外、または、識別子として不適切な文字列が渡された場合はエラーとします。
	 *
	 * @param {String} namespace 名前空間
	 * @memberOf h5.u.obj
	 * @returns {Object} 作成した名前空間オブジェクト
	 */function ns(namespace){if(!isString(namespace)){ // 文字列でないならエラー
throwFwError(ERR_CODE_NAMESPACE_INVALID,'h5.u.obj.ns()');}var nsArray=namespace.split('.');var len=nsArray.length;for(var i=0;i<len;i++){if(!isValidNamespaceIdentifier(nsArray[i])){ // 名前空間として不正な文字列ならエラー
throwFwError(ERR_CODE_NAMESPACE_INVALID,'h5.u.obj.ns()');}}var parentObj=window;for(var i=0;i<len;i++){var name=nsArray[i];if(_typeof(parentObj[name])===TYPE_OF_UNDEFINED){parentObj[name]={};}parentObj=parentObj[name];} // ループが終了しているので、parentObjは一番末尾のオブジェクトを指している
return parentObj;} /**
	 * 指定された名前空間に、オブジェクトの各プロパティをそれぞれ対応するキー名で公開（グローバルからたどれる状態に）します。
	 * <p>
	 * <ul>
	 * <li>指定された名前空間が既に存在する場合は、その名前空間に対してプロパティを追加します。</li>
	 * <li>指定された名前空間にプロパティが存在する場合は、『上書きは行われず』例外が発生します。。</li>
	 * </ul>
	 * 実行例:
	 *
	 * <pre>
	 * expose('sample.namespace', {
	 * 	funcA: function() {
	 * 		return 'test';
	 * 	},
	 * 	value1: 10
	 * });
	 * </pre>
	 *
	 * 実行結果:&nbsp;(window.は省略可)<br>
	 * alert(window.sample.namespace.funcA) -&gt; "test"と表示。<br>
	 * alert(window.sample.namespace.value1) -&gt; 10と表示。
	 *
	 * @param {String} namespace 名前空間
	 * @param {Object} obj グローバルに公開したいプロパティをもつオブジェクト
	 * @memberOf h5.u.obj
	 */function expose(namespace,obj){var nsObj=ns(namespace);for(var prop in obj){if(obj.hasOwnProperty(prop)){if(nsObj[prop]!==undefined){throwFwError(ERR_CODE_NAMESPACE_EXIST,[namespace,prop]);}nsObj[prop]=obj[prop];}}} /**
	 * 指定されたスクリプトをロードします。
	 *
	 * @param {String|String[]} path ソースパス
	 * @param {Object} [opt] オプション
	 * @param {Boolean} [opt.async] 非同期で読み込むかどうかを指定します。デフォルトはtrue(非同期)です。<br>
	 *            trueの場合、戻り値としてPromiseオブジェクトを返します。<br>
	 *            falseを指定すると同期的に読み込みます（loadScript関数からリターンしたタイミングで、スクリプトは読み込み済みになります）。<br>
	 *            falseの場合、戻り値はありません。<br>
	 *            なお、同期読み込みにすると場合によってはブラウザが固まる等の問題が発生する場合がありますので注意してください。
	 * @param {Boolean} [opt.force] 既に読み込み済みのスクリプトを再度読み込むかどうかを指定します。<br>
	 *            trueの場合、サーバーから最新のスクリプトファイルを取得します。デフォルトはfalse(読み込まない)です。
	 * @param {Boolean} [opt.parallel] 非同期で読み込む場合にパラレルに読み込むかどうかを指定します。<br>
	 *            trueの場合、指定した順番を考慮せずに読み込みます。デフォルトはfalse(シーケンシャルに読み込む)です。<br>
	 *            また、このオプションはasyncオプションがtrue(非同期)のときのみ有効です。
	 * @param {Boolean} [opt.atomic] ファイルの読み込みが全て正常に完了した時点でスクリプトを評価します。デフォルトはfalse(逐次読み込み)です。<br>
	 *            読み込みに失敗したファイルが1つ以上存在する場合、指定した全てのスクリプトがロードされません。
	 * @returns {Any} asyncオプションがtrueの場合はPromiseオブジェクトを、falseの場合は何も返しません。
	 * @name loadScript
	 * @function
	 * @memberOf h5.u
	 */function loadScript(path,opt){var getDeferred=h5.async.deferred;var resources=wrapInArray(path);if(!resources||resources.length===0){throwFwError(ERR_CODE_INVALID_SCRIPT_PATH);}for(var i=0,l=resources.length;i<l;i++){var path=resources[i];if(!isString(path)||!$.trim(path)){throwFwError(ERR_CODE_INVALID_SCRIPT_PATH);}}if(opt!=null&&!$.isPlainObject(opt)){throwFwError(ERR_CODE_INVALID_OPTION,'h5.u.loadScript()');} // asyncオプションはデフォルトtrue(非同期)なので、falseが明示的に指定された場合のみfalse(同期)とする
var async=opt&&opt.async===false?false:true;var force=!!(opt&&opt.force===true);var parallel=!!(opt&&opt.parallel===true);var atomic=!!(opt&&opt.atomic===true); // forceオプションがtrue(ロード済みのJSファイルを再度読み込む)の場合、サーバから最新のファイルを取得する
var cache=!force;var retDf=async?getDeferred():null;var retDfFailCallback=async?function(url){retDf.reject(createRejectReason(ERR_CODE_SCRIPT_FILE_LOAD_FAILD,[url]));}:null;var asyncFunc=async?function(){var df=getDeferred();setTimeout(function(){df.resolve([]);},0);return df.promise();}:null;var promises=parallel?[]:null;var scriptData=[];var loadedUrl={};if(async){ // atomicオプションが無効でかつscript.onloadがあるブラウザ(IE6,7,8以外のブラウザ)の場合、SCRIPTタグでスクリプトを動的に読み込む
// (IE9以降の場合、DocumentModeがQuirksおよび6～8の場合はonloadはundefinedになる)
if(!atomic&&existScriptOnload){var $head=$('head');var scriptLoad=function scriptLoad(url){var scriptDfd=getDeferred();var script=document.createElement('script');script.onload=function(){script.onload=null;addedJS[url]=url;scriptDfd.resolve();};script.onerror=function(){script.onerror=null;scriptDfd.reject(url);};script.type='text/javascript'; // cacheがfalse(最新のJSファイルを取得する)の場合、URLの末尾にパラメータ(+new Date()で、getTime()の値)を付与して常に最新のJSファイルを取得する
// URLにもともとパラメータが付いていれば、パラメータを追加する。
script.src=cache?url:url+(url.indexOf('?')>-1?'&_':'?_')+ +new Date();$head[0].appendChild(script);return scriptDfd.promise();};if(parallel){ // 必ず非同期として処理されるようsetTimeout()を処理して強制的に非同期にする
promises.push(asyncFunc());$.each(resources,function(){var url=toAbsoluteUrl(this.toString());if(!force&&url in addedJS){return true;}promises.push(scriptLoad(url));});waitForPromises(promises,function(){retDf.resolve();},retDfFailCallback);}else { // 必ず非同期として処理されるようsetTimeout()を処理して強制的に非同期にする
var seq=thenCompat(getDeferred().resolve(),asyncFunc);$.each(resources,function(){var url=toAbsoluteUrl(this.toString());seq=thenCompat(seq,function(){if(!force&&url in addedJS){return;}return scriptLoad(url);},retDfFailCallback);});thenCompat(seq,function(){retDf.resolve();},retDfFailCallback);}} // IE6,7,8の場合、SCRIPTタグのonerrorイベントが発生しないため、読み込みが成功または失敗したか判定できない。
// よってatomicな読み込みができないため、Ajaxでスクリプトを読み込む
else {if(parallel){var loadedScripts=[]; // 必ず非同期として処理されるようsetTimeout()を処理して強制的に非同期にする
promises.push(asyncFunc());loadedScripts.push(null);$.each(resources,function(){var url=toAbsoluteUrl(this.toString());if(!force&&(url in addedJS||url in loadedUrl)){return true;}promises.push(getScriptString(url,async,cache));atomic?loadedUrl[url]=url:loadedScripts.push(null);});var doneCallback=null;var progressCallback=null;if(atomic){doneCallback=function doneCallback(){$.each(argsToArray(arguments),function(i,e){$.globalEval(e[0]); // e[0] = responseText
});$.extend(addedJS,loadedUrl);retDf.resolve();};progressCallback=$.noop;}else {doneCallback=function doneCallback(){retDf.resolve();};progressCallback=function progressCallback(){var results=argsToArray(arguments);for(var i=0;i<loadedScripts.length;i++){var result=results[i];if(!result){continue;}var url=results[i][3]; // results[i][3] = url
if(loadedScripts[i]===url){continue;}$.globalEval(results[i][0]); // results[i][0] = responseText
loadedScripts.splice(i,1,url);}};}h5.async.when(promises).done(doneCallback).fail(retDfFailCallback).progress(progressCallback);}else { // 必ず非同期として処理されるようsetTimeout()を処理して強制的に非同期にする
var seq=thenCompat(getDeferred().resolve(),asyncFunc);$.each(resources,function(){var url=toAbsoluteUrl(this.toString());seq=thenCompat(seq,function(){var df=getDeferred();if(!force&&(url in addedJS||url in loadedUrl)){df.resolve();}else {getScriptString(url,async,cache).done(function(text,status,xhr){if(atomic){scriptData.push(text);loadedUrl[url]=url;}else {$.globalEval(text);addedJS[url]=url;}df.resolve();}).fail(function(){df.reject(this.url);});}return df.promise();},retDfFailCallback);});thenCompat(seq,function(){if(atomic){$.each(scriptData,function(i,e){$.globalEval(e);});$.extend(addedJS,loadedUrl);}retDf.resolve();},retDfFailCallback);}}return retDf.promise();}else {$.each(resources,function(){var url=toAbsoluteUrl(this.toString());if(!force&&(url in addedJS||url in loadedUrl)){return true;}getScriptString(url,async,cache).done(function(text,status,xhr){if(atomic){scriptData.push(text);loadedUrl[url]=url;}else {$.globalEval(text);addedJS[url]=url;}}).fail(function(){throwFwError(ERR_CODE_SCRIPT_FILE_LOAD_FAILD,[url]);});});if(atomic){ // 読み込みに成功した全てのスクリプトを評価する
$.each(scriptData,function(i,e){$.globalEval(e);});$.extend(addedJS,loadedUrl);} // 同期ロードの場合は何もreturnしない
}} /**
	 * 文字列のプレフィックスが指定したものかどうかを返します。
	 *
	 * @param {String} str 文字列
	 * @param {String} prefix プレフィックス
	 * @returns {Boolean} 文字列のプレフィックスが指定したものかどうか
	 * @name startsWith
	 * @function
	 * @memberOf h5.u.str
	 */function startsWith(str,prefix){return str.lastIndexOf(prefix,0)===0;} /**
	 * 文字列のサフィックスが指定したものかどうかを返します。
	 *
	 * @param {String} str 文字列
	 * @param {String} suffix サフィックス
	 * @returns {Boolean} 文字列のサフィックスが指定したものかどうか
	 * @name endsWith
	 * @function
	 * @memberOf h5.u.str
	 */function endsWith(str,suffix){var sub=str.length-suffix.length;return sub>=0&&str.lastIndexOf(suffix)===sub;} /**
	 * 第一引数の文字列に含まれる{0}、{1}、{2}...{n} (nは数字)を、第2引数以降に指定されたパラメータに置換します。
	 * <p>
	 * また、{0.name}のように記述すると第2引数のnameプロパティの値で置換を行います。"0."は引数の何番目かを指し、第2引数を0としてそれ以降の引数のプロパティの値を採ることもできます。
	 * </p>
	 * <p>
	 * "0."は省略して単に{name}のように記述することもできます。また、{0.birthday.year}のように入れ子になっているプロパティを辿ることもできます。
	 * </p>
	 * <p>
	 * "."の代わりに"[]"を使ってプロパティにアクセスすることもできます。以下、使用例です。
	 * </p>
	 * <p>
	 *
	 * <pre class="sh_javascript"><code>
	 * var myValue = 10;
	 * h5.u.str.format('{0} is {1}', 'myValue', myValue);
	 * </code></pre>
	 *
	 * 実行結果: myValue is 10
	 * </p>
	 * <p>
	 *
	 * <pre class="sh_javascript"><code>
	 * h5.u.str.format('{name} is at {address}', {
	 * 	name: 'Taro',
	 * 	address: 'Yokohama'
	 * });
	 * </code></pre>
	 *
	 * 実行結果: Taro is at Yokohama
	 * </p>
	 * <p>
	 *
	 * <pre class="sh_javascript"><code>
	 * h5.u.str.format('{0} is born on {1.birthday.year}.', 'Taro', {
	 * 	birthday: {
	 * 		year: 1990
	 * 	}
	 * });
	 * </code></pre>
	 *
	 * 実行結果: Taro is born on 1990.
	 * </p>
	 * <p>
	 *
	 * <pre class="sh_javascript"><code>
	 * h5.u.str.format('{0.name} likes {0.hobby[0]}. {1.name} likes {1.hobby[0]}.', {
	 * 	name: 'Taro',
	 * 	hobby: ['Traveling', 'Shopping']
	 * }, {
	 * 	name: 'Hanako',
	 * 	hobby: ['Chess']
	 * });
	 * </code></pre>
	 *
	 * 実行結果: Taro likes Traveling. Hanako likes Chess.
	 * </p>
	 * <p>
	 *
	 * <pre class="sh_javascript"><code>
	 * h5.u.str.format('{0.0},{0.1},{0.2},…(長さ{length})', [2, 3, 5, 7]);
	 * // 以下と同じ
	 * h5.u.str.format('{0[0]},{0[1]},{0[2]},…(長さ{0.length})', [2, 3, 5, 7]);
	 * </code></pre>
	 *
	 * 実行結果: 2,3,5,…(長さ4)
	 * </p>
	 *
	 * @param {String} str 文字列
	 * @param {Any} var_args 可変長引数。ただし1つ目にオブジェクトまたは配列を指定した場合はその中身で置換
	 * @returns {String} フォーマット済み文字列
	 * @name format
	 * @function
	 * @memberOf h5.u.str
	 */function format(str,var_args){if(str==null){return '';}var args=argsToArray(arguments).slice(1);return str.replace(/\{(.+?)\}/g,function(m,c){if(/^\d+$/.test(c)){ // {0}のような数値のみの指定の場合は引数の値をそのまま返す
var rep=args[parseInt(c,10)];if((typeof rep==='undefined'?'undefined':_typeof(rep))===TYPE_OF_UNDEFINED){ // undefinedなら"undefined"を返す
return TYPE_OF_UNDEFINED;}return rep;} // 数値じゃない場合はオブジェクトプロパティ指定扱い
// 数値.で始まっていなければ"0."が省略されていると見做す
var path=/^\d+[\.|\[]/.test(c)?c:'0.'+c;var rep=getByPath(path,args);if((typeof rep==='undefined'?'undefined':_typeof(rep))===TYPE_OF_UNDEFINED){return TYPE_OF_UNDEFINED;}return rep;});} /**
	 * 指定されたHTML文字列をエスケープします。
	 *
	 * @param {String} str HTML文字列
	 * @returns {String} エスケープ済HTML文字列
	 * @name escapeHtml
	 * @function
	 * @memberOf h5.u.str
	 */function escapeHtml(str){if($.type(str)!=='string'){return str;}return str.replace(/[&"'<>]/g,function(c){return htmlEscapeRules[c];});} /**
	 * オブジェクトを、型情報を付与した文字列に変換します。
	 * <p>
	 * このメソッドが判定可能な型は、以下のとおりです。
	 * <ul>
	 * <li>string(文字列)
	 * <li>number(数値)
	 * <li>boolean(真偽値)
	 * <li>String(文字列のラッパークラス型)
	 * <li>Number(数値のラッパークラス型)
	 * <li>Boolean(真偽値のラッパークラス型)
	 * <li>array(配列)
	 * <li>object(プレーンオブジェクト [new Object() または {…} のリテラルで作られたオブジェクト])
	 * <li>Date(日付)
	 * <li>RegExp(正規表現)
	 * <li>undefined
	 * <li>null
	 * <li>NaN
	 * <li>Infinity
	 * <li>-Infinity
	 * </ul>
	 * <p>
	 * このメソッドで文字列化したオブジェクトは<a href="#deserialize">deseriarize</a>メソッドで元に戻すことができます。
	 * </p>
	 * <p>
	 * object型はプレーンオブジェクトとしてシリアライズします。 渡されたオブジェクトがプレーンオブジェクトで無い場合、そのprototypeやconstructorは無視します。
	 * </p>
	 * <p>
	 * array型は連想配列として保持されているプロパティもシリアライズします。
	 * </p>
	 * <p>
	 * 循環参照を含むarray型およびobject型はシリアライズできません。例外をスローします。
	 * </p>
	 * <p>
	 * 内部に同一インスタンスを持つarray型またはobject型は、別インスタンスとしてシリアライズします。以下のようなarray型オブジェクトaにおいて、a[0]とa[1]が同一インスタンスであるという情報は保存しません。
	 *
	 * <pre>
	 * a = [];
	 * a[0] = a[1] = [];
	 * </pre>
	 *
	 * </p>
	 * <h4>注意</h4>
	 * <p>
	 * function型のオブジェクトは<b>変換できません</b>。例外をスローします。
	 * array型にfunction型のオブジェクトが存在する場合は、undefinedとしてシリアライズします。object型または連想配列にfunction型のオブジェクトが存在する場合は、無視します。
	 * </p>
	 *
	 * @param {Object} value オブジェクト
	 * @returns {String} 型情報を付与した文字列
	 * @name serialize
	 * @function
	 * @memberOf h5.u.obj
	 */function serialize(value){if(isFunction(value)){throwFwError(ERR_CODE_SERIALIZE_FUNCTION);} // 循環参照チェック用配列
var objStack=[];function existStack(obj){for(var i=0,len=objStack.length;i<len;i++){if(obj===objStack[i]){return true;}}return false;}function popStack(obj){for(var i=0,len=objStack.length;i<len;i++){if(obj===objStack[i]){objStack.splice(i,1);}}}function func(val){var ret=val;var type=$.type(val); // プリミティブラッパークラスを判別する
if((typeof val==='undefined'?'undefined':_typeof(val))==='object'){if(val instanceof String){type='String';}else if(val instanceof Number){type='Number';}else if(val instanceof Boolean){type='Boolean';}} // オブジェクトや配列の場合、JSON.stringify()を使って書けるが、json2.jsのJSON.stringify()を使った場合に不具合があるため自分で実装した。
switch(type){case 'String': // stringの場合と同じ処理を行うため、breakしない
case 'string': // String、string、両方の場合について同じ処理を行う
// typeToCodeはStringなら'S'、stringなら's'を返し、区別される
ret=typeToCode(type)+escape(ret);break;case 'Boolean': // String/stringの場合と同様に、Boolean/booleanでも同じ処理を行うためbreakしていないが、
// Boolean型の場合はvalueOfで真偽値を取得する
ret=ret.valueOf();case 'boolean': // Booleanの場合は'B0','B1'。booleanの場合は'b0','b1'に変換する
ret=typeToCode(type)+(ret?1:0);break;case 'Number':ret=ret.valueOf();if($.isNaN&&$.isNaN(val)||$.isNumeric&&!$.isNumeric(val)){if(val.valueOf()===Infinity){ret=typeToCode('infinity');}else if(val.valueOf()===-Infinity){ret=typeToCode('-infinity');}else {ret=typeToCode('nan');}}ret=typeToCode(type)+ret;break;case 'number':if($.isNaN&&$.isNaN(val)||$.isNumeric&&!$.isNumeric(val)){if(val===Infinity){ret=typeToCode('infinity');}else if(val===-Infinity){ret=typeToCode('-infinity');}else {ret=typeToCode('nan');}}else {ret=typeToCode(type)+ret;}break;case 'regexp':ret=typeToCode(type)+escape(ret.toString(),regToStringEscapeNewLine);break;case 'date':ret=typeToCode(type)+ +ret;break;case 'array':if(existStack(val)){throwFwError(ERR_CODE_REFERENCE_CYCLE);}objStack.push(val);var indexStack=[];ret=typeToCode(type)+'[';for(var i=0,len=val.length;i<len;i++){indexStack[i.toString()]=true;var elm;if(!val.hasOwnProperty(i)){elm=typeToCode('undefElem');}else if($.type(val[i])==='function'){elm=typeToCode(TYPE_OF_UNDEFINED);}else {elm=escapeDoubleQuotation(func(val[i]));}ret+='"'+elm+'"';if(i!==val.length-1){ret+=',';}}var hash='';for(var key in val){if(indexStack[key]){continue;}if($.type(val[key])!=='function'){hash+='"'+escapeDoubleQuotation(escape(key))+'":"'+escapeDoubleQuotation(func(val[key]))+'",';}}if(hash){ret+=(val.length?',':'')+'"'+typeToCode('objElem')+'{'+escapeDoubleQuotation(hash);ret=ret.replace(/,$/,'');ret+='}"';}ret+=']';popStack(val);break;case 'object':if(existStack(val)){throwFwError(ERR_CODE_CIRCULAR_REFERENCE);}objStack.push(val);ret=typeToCode(type)+'{';for(var key in val){if(val.hasOwnProperty(key)){if($.type(val[key])==='function'){continue;}ret+='"'+escapeDoubleQuotation(escape(key))+'":"'+escapeDoubleQuotation(func(val[key]))+'",';}}ret=ret.replace(/,$/,'');ret+='}';popStack(val);break;case 'null':case TYPE_OF_UNDEFINED:ret=typeToCode(type);break;}return ret;}return CURRENT_SEREALIZER_VERSION+'|'+func(value);} /**
	 * 型情報が付与された文字列をオブジェクトを復元します。
	 *
	 * @param {String} value 型情報が付与された文字列
	 * @returns {Any} 復元されたオブジェクト
	 * @name deserialize
	 * @function
	 * @memberOf h5.u.obj
	 */function deserialize(value){if(!isString(value)){throwFwError(ERR_CODE_DESERIALIZE_ARGUMENT);}value.match(/^(.)\|(.*)/);var version=RegExp.$1; // version1の場合はエラーにせず、現在のバージョンでunescapeをしない方法で対応している。
if(version!=='1'&&version!==CURRENT_SEREALIZER_VERSION){throwFwError(ERR_CODE_SERIALIZE_VERSION,[version,CURRENT_SEREALIZER_VERSION]);}var ret=RegExp.$2;function func(val){ /**
			 * 型情報のコードを文字列に変換します。
			 *
			 * @private
			 * @returns {String} 型を表す文字列
			 */function codeToType(typeStr){switch(typeStr){case 's':return 'string';case 'n':return 'number';case 'b':return 'boolean';case 'S':return 'String';case 'N':return 'Number';case 'B':return 'Boolean';case 'i':return 'infinity';case 'I':return '-infinity';case 'x':return 'nan';case 'd':return 'date';case 'r':return 'regexp';case 'a':return 'array';case 'o':return 'object';case 'l':return 'null';case 'u':return TYPE_OF_UNDEFINED;case '_':return 'undefElem';case '@':return 'objElem';}}val.match(/^(.)(.*)/);var type=RegExp.$1;ret=RegExp.$2?RegExp.$2:'';if(type!==undefined&&type!==''){switch(codeToType(type)){case 'String':ret=new String(unescape(ret,version));break;case 'string':break;case 'Boolean':if(ret==='0'||ret==='1'){ret=new Boolean(ret==='1');}else {throwFwError(ERR_CODE_DESERIALIZE_VALUE);}break;case 'boolean':if(ret==='0'||ret==='1'){ret=ret==='1';}else {throwFwError(ERR_CODE_DESERIALIZE_VALUE);}break;case 'nan':if(ret!==''){throwFwError(ERR_CODE_DESERIALIZE_VALUE);}ret=NaN;break;case 'infinity':if(ret!==''){throwFwError(ERR_CODE_DESERIALIZE_VALUE);}ret=Infinity;break;case '-infinity':if(ret!==''){throwFwError(ERR_CODE_DESERIALIZE_VALUE);}ret=-Infinity;break;case 'Number':if(codeToType(ret)==='infinity'){ret=new Number(Infinity);}else if(codeToType(ret)==='-infinity'){ret=new Number(-Infinity);}else if(codeToType(ret)==='nan'){ret=new Number(NaN);}else {ret=new Number(ret);if(isNaN(ret.valueOf())){throwFwError(ERR_CODE_DESERIALIZE_VALUE);}}break;case 'number':ret=new Number(ret).valueOf();if(isNaN(ret)){throwFwError(ERR_CODE_DESERIALIZE_VALUE);}break;case 'array':var obj;try{obj=$.parseJSON(ret);}catch(e){throwFwError(ERR_CODE_DESERIALIZE_VALUE);}if(!isArray(obj)){throwFwError(ERR_CODE_DESERIALIZE_VALUE);}var ret=[];for(var i=0,l=obj.length;i<l;i++){switch(codeToType(obj[i].substring(0,1))){case 'undefElem': // i番目に値を何も入れない場合と、
// i番目に値を入れてからdeleteする場合とで
// lengthが異なる場合がある。
// 最後の要素にundefが明示的に入れられている場合は後者のやりかたでデシリアライ���する必要がある
ret[i]=undefined;delete ret[i];break;case 'objElem':var extendObj=func(typeToCode('object')+obj[i].substring(1));for(var key in extendObj){ret[unescape(key)]=extendObj[key];}break;default:ret[i]=func(obj[i]);}}break;case 'object':var obj;try{obj=$.parseJSON(ret);}catch(e){throwFwError(ERR_CODE_DESERIALIZE_VALUE);}if(!$.isPlainObject(obj)){throwFwError(ERR_CODE_DESERIALIZE_VALUE);}var ret={};for(var key in obj){ // プロパティキーはエスケープしたものになっている
// 元のプロパティキー(エスケープ前)のものに変更して値を持たせる
var val=func(obj[key]);ret[unescape(key)]=val;}break;case 'date':ret=new Date(parseInt(ret,10));break;case 'regexp':try{var matchResult=ret.match(/^\/(.*)\/(.*)$/);var regStr=unescape(matchResult[1],version);var flg=matchResult[2];ret=new RegExp(regStr,flg);}catch(e){throwFwError(ERR_CODE_DESERIALIZE_VALUE);}break;case 'null':if(ret!==''){throwFwError(ERR_CODE_DESERIALIZE_VALUE);}ret=null;break;case TYPE_OF_UNDEFINED:if(ret!==''){throwFwError(ERR_CODE_DESERIALIZE_VALUE);}ret=undefined;break;default:throwFwError(ERR_CODE_DESERIALIZE_TYPE);}}return unescape(ret,version);}return func(ret);} /**
	 * オブジェクトがjQueryオブジェクトかどうかを返します。
	 *
	 * @param {Object} obj オブジェクト
	 * @returns {Boolean} jQueryオブジェクトかどうか
	 * @name isJQueryObject
	 * @function
	 * @memberOf h5.u.obj
	 */function isJQueryObject(obj){if(!obj||!obj.jquery){return false;}return obj.jquery===$().jquery;} /**
	 * argumentsを配列に変換します。
	 *
	 * @param {Arguments} args Arguments
	 * @returns {Any[]} argumentsを変換した配列
	 * @name argsToArray
	 * @function
	 * @memberOf h5.u.obj
	 */function argsToArray(args){return Array.prototype.slice.call(args);} /**
	 * 指定された名前空間に存在するオブジェクトを取得します。
	 * <p>
	 * 第1引数に名前空間文字列、第2引数にルートオブジェクトを指定します。第2引数を省略した場合はwindowオブジェクトをルートオブジェクトとして扱います。
	 * </p>
	 * <p>
	 * 名前空間文字列はプロパティ名を"."区切りで記述子、ルートオブジェクトからのパスを記述します。また"."区切りの代わりに"[]"を使ってプロパティアクセスを表すことも可能です。
	 * </p>
	 *
	 * <pre class="sh_javascript"><code>
	 * var rootObj = {
	 * 	a: {
	 * 		b: {
	 * 			c: [{
	 * 				d: 'hoge'
	 * 			}]
	 * 		}
	 * 	}
	 * };
	 * h5.u.obj.getByPath('a.b.c[0].d', rootObj);
	 * // → hoge
	 *
	 * window.hoge = {
	 * 	obj: rootObj
	 * };
	 * h5.u.obj.getByPath('hoge.obj.a.b.c[0].d');
	 * // → hoge
	 * </code></pre>
	 *
	 * @param {String} namespace 名前空間
	 * @param {Object} [rootObj=window] 名前空間のルートとなるオブジェクト。デフォルトはwindowオブジェクト。
	 * @returns {Any} その名前空間に存在するオブジェクト
	 * @name getByPath
	 * @function
	 * @memberOf h5.u.obj
	 */function getByPath(namespace,rootObj){if(!isString(namespace)){throwFwError(ERR_CODE_NAMESPACE_INVALID,'h5.u.obj.getByPath()');} // 'ary[0]'のような配列のindex参照の記法に対応するため、'.'記法に変換する
namespace=namespace.replace(/\[(\d+)\]/g,function(m,c,index){if(index){ // 先頭以外の場合は'[]'を外して'.'を付けて返す
return '.'+c;} // 先頭の場合は'[]'を外すだけ
return c;});var names=namespace.split('.');var idx=0;if(names[0]==='window'&&(!rootObj||rootObj===window)){ // rootObjが未指定またはwindowオブジェクトの場合、namespaceの最初のwindow.は無視する
idx=1;}var ret=rootObj||window;for(var len=names.length;idx<len;idx++){ret=ret[names[idx]];if(ret==null){ // nullまたはundefinedだったら辿らない
break;}}return ret;} /**
	 * インターセプタを作成します。
	 *
	 * @param {Function} pre インターセプト先関数の実行前に呼ばれる関数です。
	 * @param {Function} post インターセプト先関数の実行後に呼ばれる関数です。<br />
	 *            <ul>
	 *            <li><code>pre(),post()には引数としてinvocation(インターセプト対象の関数についてのオブジェクト)と
	 *            data(preからpostへ値を渡すための入れ物オブジェクト)が渡されます。</li>
	 *            <li>invocationは以下のプロパティを持つオブジェクトです。
	 *            <dl>
	 *            <dt>target</dt>
	 *            <dd>インターセプト対象の関数が属しているコントローラまたはロジック</dd>
	 *            <dt>func</dt>
	 *            <dd>インターセプト対象の関数</dd>
	 *            <dt>funcName</dt>
	 *            <dd>インターセプト対象の関数名</dd>
	 *            <dt>args</dt>
	 *            <dd>関数が呼ばれたときに渡された引数(argumentsオブジェクト)</dd>
	 *            <dt>proceed</dt>
	 *            <dd>インターセプト対象の関数を実行する関数。インターセプト対象の関数は自動では実行されません。 インターセプト先の関数を実行するには、
	 *            <code>pre</code>に指定した関数内で<code>invocation.proceed()</code>を呼んでください。
	 *            <code>proceed()</code>を呼ぶと対象の関数(<code>invocation.func</code>)を呼び出し時の引数(<code>invocation.args</code>)で実行します。
	 *            <code>proceed</code>自体は引数を取りません。</dd>
	 *            </dl>
	 *            </li>
	 *            <li>post()は、呼び出した関数の戻り値がPromiseオブジェクトかどうかをチェックし、Promiseオブジェクトの場合は対象のDeferredが完了した後に呼ばれます。</li>
	 *            <li>pre()の中でinvocation.proceed()が呼ばれなかった場合、post()は呼ばれません。</li>
	 *            <li>invocation.resultプロパティに呼び出した関数の戻り値が格納されます。</li>
	 *            <li>pre()が指定されていない場合、invocation.proceed()を実行した後にpost()を呼びます。</li>
	 *            </ul>
	 *            コード例(h5.core.interceptor.lapInterceptor)を以下に示します。<br />
	 *
	 * <pre>
	 * var lapInterceptor = h5.u.createInterceptor(function(invocation, data) {
	 * 	// 開始時間をdataオブジェクトに格納
	 * 		data.start = new Date();
	 * 		// invocationを実行
	 * 		return invocation.proceed();
	 * 	}, function(invocation, data) {
	 * 		// 終了時間を取得
	 * 		var end = new Date();
	 * 		// ログ出力
	 * 		this.log.info('{0} &quot;{1}&quot;: {2}ms', this.__name, invocation.funcName, (end - data.start));
	 * 	});
	 * </pre>
	 *
	 * @returns {Function} インターセプタ
	 * @name createInterceptor
	 * @function
	 * @memberOf h5.u
	 */function createInterceptor(pre,post){return function(invocation){var data={};var ret=pre?pre.call(this,invocation,data):invocation.proceed();invocation.result=ret;if(!post){return ret;}if(ret&&isFunction(ret.promise)&&!isJQueryObject(ret)){var that=this;registerCallbacksSilently(ret,'always',function(){post.call(that,invocation,data);});return ret;}post.call(this,invocation,data);return ret;};} // =============================
// Expose to window
// =============================
expose('h5.u',{loadScript:loadScript,createInterceptor:createInterceptor}); /**
	 * @namespace
	 * @name str
	 * @memberOf h5.u
	 */expose('h5.u.str',{startsWith:startsWith,endsWith:endsWith,format:format,escapeHtml:escapeHtml}); /**
	 * @namespace
	 * @name obj
	 * @memberOf h5.u
	 */expose('h5.u.obj',{expose:expose,ns:ns,serialize:serialize,deserialize:deserialize,isJQueryObject:isJQueryObject,argsToArray:argsToArray,getByPath:getByPath});})(); /* ------ h5.mixin ------ */(function(){ // =========================================================================
//
// Constants
//
// =========================================================================
// =============================
// Production
// =============================
// -------------------------------
// エラーコード
// -------------------------------
/** addEventListenerに不正な引数が渡された */var ERR_CODE_INVALID_ARGS_ADDEVENTLISTENER=16000; // =============================
// Development Only
// =============================
/* del begin */var errMsgMap={};errMsgMap[ERR_CODE_INVALID_ARGS_ADDEVENTLISTENER]='addEventListenerには、イベント名(文字列)、イベントリスナ(関数)を渡す必要があります。'; // メッセージの登録
addFwErrorCodeMap(errMsgMap); /* del end */ // =========================================================================
//
// Cache
//
// =========================================================================
// =========================================================================
//
// Privates
//
// =========================================================================
// =============================
// Variables
// =============================
// =============================
// Functions
// =============================
/**
	 * 受け取ったオブジェクトをイベントオブジェクトにする
	 *
	 * @private
	 * @param {Object} event 任意のオブジェクト
	 * @param {Object} target event.targetになるオブジェクト
	 * @returns {Object} イベントオブジェクト
	 */function setEventProperties(event,target){ // ターゲットの追加
if(!event.target){event.target=target;} // タイムスタンプの追加
if(!event.timeStamp){event.timeStamp=new Date().getTime();} // isDefaultPreventedがないなら、isDefaultPrevented()とpreventDefault()を追加
if(!event.isDefaultPrevented){var _isDefaultPrevented=false;event.isDefaultPrevented=function(){return _isDefaultPrevented;};event.preventDefault=function(){_isDefaultPrevented=true;};} // isImmediatePropagationStoppedがないなら、isImmediatePropagationStopped()とstopImmediatePropagation()を追加
if(!event.isImmediatePropagationStopped){var _isImmediatePropagationStopped=false;event.isImmediatePropagationStopped=function(){return _isImmediatePropagationStopped;};event.stopImmediatePropagation=function(){_isImmediatePropagationStopped=true;};}} // =========================================================================
//
// Body
//
// =========================================================================
/**
	 * Mixinのコンストラクタ
	 * <p>
	 * このクラスは自分でnewすることはありません。
	 * h5.mixin.createMixin(moduleObject)を呼ぶと渡されたモジュールオブジェクトについてのMixinインスタンスを返します。
	 * </p>
	 * <p>
	 * 作製したインスタンスの<a href="Mixin.html#mix">mix()</a>を呼ぶと、モジュールオブジェクトとmixの引数に渡されたオブジェクトをミックスインしたオブジェクトを返します。
	 * </p>
	 *
	 * <pre><code>
	 * // set,getメソッドを持つモジュールオブジェクトのmixinを作成する例
	 * var mixin = h5.mixin.createMixin({
	 * 	set: function(p, v) {
	 * 		this[p] = v;
	 * 	},
	 * 	get: function(p) {
	 * 		return this[p];
	 * 	}
	 * });
	 * var target = {
	 * 	hoge: 'abc'
	 * };
	 * mixin.mix(target);
	 * mixin.get('hoge'); // 'abc'が返る
	 * </code></pre>
	 *
	 * <p>
	 * <a href="h5.mixin.html">h5.mixin</a>以下にこのクラスを実装したインスタンスを配置しています。
	 * </p>
	 *
	 * @class Mixin
	 */ /**
	 * @private
	 * @param moduleObject mixinする元となるモジュールオブジェクト
	 */function Mixin(moduleObject){ // moduleObjectのプロパティキャッシュを作成
var props={};for(var p in moduleObject){var v=moduleObject[p]; // hasOwnPropertyがtrueでなければコピーしない
// 関数、null、文字列リテラル、数値リテラル、真偽値リテラルのいずれかの場合のみコピー
if(moduleObject.hasOwnProperty(p)&&(isFunction(v)||v===null||typeof v==='string'||typeof v==='number'||typeof v==='boolean')){props[p]=v;}} // mix, hasInterfaceはMixinのprototypeに持たせていて、それぞれインスタンスが持つ_mix, _hasInterfaceを呼んでいる
// _mix, _hasInterfaceはmoduleObjectのプロパティキャッシュを参照したいため、Mixinインスタンスごとに定義している
this._mix=function(target){for(var p in props){ // targetがもともと持っていたプロパティがあっても上書き
target[p]=props[p];}};this._hasInterface=function(object){for(var p in props){ // プライベートなものはチェックしない
if(h5.u.str.startsWith(p,'_')){continue;} // hasOwnPropertyがtrueかどうかは判定せず、プロトタイプチェーン上にあってもよい
// undefinedでなければそのプロパティを持っていると判定する
if(_typeof(object[p])===TYPE_OF_UNDEFINED){return false;}}return true;};}$.extend(Mixin.prototype,{ /**
		 * 引数に渡されたオブジェクトと、モジュールオブジェクトとのミックスインを作成します。
		 * <p>
		 * 関数、null、文字列リテラル、数値リテラル、真偽値リテラルのいずれかの値を持つプロパティについてのみミックスインを行います。
		 * </p>
		 *
		 * @memberOf Mixin
		 * @prop {Object} target
		 */mix:function mix(target){return this._mix(target);}, /**
		 * 引数に渡されたオブジェクトが、モジュールオブジェクトを実装しているかどうか判定します。
		 * <p>
		 * 関数、null、文字列リテラル、数値リテラル、真偽値リテラルのいずれかの値を持つモジュールオブジェクトのプロパティを、
		 * 引数に渡されたobjectが全て持っているならtrue、そうでないならfalseを返します。
		 * </p>
		 * <p>
		 * ただしモジュールオブジェクトで定義されたプライベートメンバ("_"始まり)のプロパティについてはチェックしません。
		 * </p>
		 *
		 * @memberOf Mixin
		 * @prop {Object} object
		 * @returns {Boolean}
		 */hasInterface:function hasInterface(object){return this._hasInterface(object);}});function createMixin(moduleObject){return new Mixin(moduleObject);} //-------------------------------------------
//EventDispatcher
//-------------------------------------------
/**
	 * イベントディスパッチャ
	 * <p>
	 * イベントリスナを管理するクラスです。このクラスはnewできません。
	 * </p>
	 * <p>
	 * このモジュールをミックスインしたオブジェクトを作成したい場合は、<a
	 * href="h5.mixin.html#eventDispatcher">h5.mixin.eventDispatcher</a>の<a
	 * href="Mixin.html#mix">mix()</a>メソッドを使用してください。
	 * </p>
	 * <p>
	 * 以下のクラスがイベントディスパッチャのメソッドを持ちます。
	 * <ul>
	 * <li><a href="ObservableArray.html">ObservableArray</a>
	 * <li><a href="ObservableItem.html">ObservableItem</a>
	 * <li><a href="DataModelManager.html">DataModelManager</a>
	 * <li><a href="DataModel.html">DataModel</a>
	 * <li><a href="DataItem.html">DataItem</a>
	 * </ul>
	 * </p>
	 *
	 * @mixin
	 * @name EventDispatcher
	 */var eventDispatcherModule={ /**
		 * イベントリスナが登録されているかどうかを返します
		 * <p>
		 * 第一引数にイベント名、第二引数にイベントリスナを渡し、指定したイベントに指定したイベントリスナが登録済みかどうかを返します。
		 * </p>
		 *
		 * @since 1.1.0
		 * @memberOf EventDispatcher
		 * @param {String} type イベント名
		 * @param {Function} listener イベントリスナ
		 * @returns {Boolean} 第一引数のイベント名に第二引数のイベントリスナが登録されているかどうか
		 */hasEventListener:function hasEventListener(type,listener){if(!this._eventListeners){return false;}var l=this._eventListeners[type];if(!l||!this._eventListeners.hasOwnProperty(type)){return false;}for(var i=0,count=l.length;i<count;i++){if(l[i]===listener){return true;}}return false;}, /**
		 * イベントリスナを登録します。
		 * <p>
		 * 第一引数にイベント名、第二引数にイベントリスナを渡し、イベントリスナを登録します。指定したイベントが起こった時にイベントリスナが実行されます。
		 * </p>
		 * <p>
		 * イベントリスナは、関数または<a
		 * href="http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-EventListener">EventListener</a>
		 * インタフェースを実装するオブジェクト(handleEventプロパティに関数を持つオブジェクト)で指定できます。
		 * <p>
		 * 指定したイベントに、指定したイベントリスナが既に登録されていた場合は何もしません。
		 * </p>
		 * <p>
		 * 同一のイベントに対して複数回addEventListener()を呼び、複数のイベントリスナを登録した場合は、イベント発火時に登録した順番に実行されます。
		 * </p>
		 * <p>
		 * 第３引数以降が指定されていても無視されます。
		 * </p>
		 *
		 * @since 1.1.0
		 * @memberOf EventDispatcher
		 * @param {String} type イベント名
		 * @param {Function|Object} listener イベントリスナまたはhandleEventを持つイベントリスナオブジェクト
		 */addEventListener:function addEventListener(type,listener){ // 引数チェック
// typeは文字列で、第2引数まで指定されていることをチェックする
// listenerが関数またはイベントリスナオブジェクトかどうかは、実行時に判定し、関数でもイベントリスナオブジェクトでもない場合は実行しない
if(arguments.length<2||!isString(type)){throwFwError(ERR_CODE_INVALID_ARGS_ADDEVENTLISTENER);}if(listener==null||this.hasEventListener(type,listener)){ // nullまたはundefinedが指定されている、または既に登録済みのイベントリスナなら何もしない
return;}if(!this._eventListeners){this._eventListeners={};}if(!this._eventListeners.hasOwnProperty(type)){this._eventListeners[type]=[];}this._eventListeners[type].push(listener);}, /**
		 * イベントリスナを削除します。
		 * <p>
		 * 第一引数にイベント名、第二引数にイベントリスナを渡し、指定したイベントから指定したイベントリスナを削除します。
		 * </p>
		 * <p>
		 * 指定したイベント名に指定したイベントリスナが登録されていない場合は何もしません。
		 * </p>
		 *
		 * @since 1.1.0
		 * @memberOf EventDispatcher
		 * @param {String} type イベント名
		 * @param {Function} listener イベントリスナ
		 */removeEventListener:function removeEventListener(type,listener){if(!this.hasEventListener(type,listener)){return;}var l=this._eventListeners[type];for(var i=0,count=l.length;i<count;i++){if(l[i]===listener){l.splice(i,1);return;}}}, /**
		 * イベントをディスパッチします
		 * <p>
		 * イベントオブジェクトを引数に取り、そのevent.typeに登録されているイベントリスナを実行します。
		 * イベントオブジェクトにpreventDefault()関数を追加してイベントリスナの引数に渡して呼び出します。
		 * </p>
		 * <p>
		 * 戻り値は『イベントリスナ内でpreventDefault()が呼ばれたかどうか』を返します。
		 * </p>
		 *
		 * @since 1.1.0
		 * @memberOf EventDispatcher
		 * @param {Object} event イベントオブジェクト
		 * @returns {Boolean} イベントリスナ内でpreventDefault()が呼ばれたかどうか。
		 */dispatchEvent:function dispatchEvent(event){if(!this._eventListeners){return;}var l=this._eventListeners[event.type];if(!l){return;} // リスナをslice(0)して、dispatchEventを呼んだ瞬間にどのリスナが呼ばれるか確定させる
// (あるイベントのイベントリスナの中でadd/removeEventListenerされても、そのイベントが実行するイベントリスナには影響ない)
l=l.slice(0);setEventProperties(event,this); // リスナーを実行。stopImmediatePropagationが呼ばれていたらそこでループを終了する。
for(var i=0,count=l.length;i<count&&!event.isImmediatePropagationStopped();i++){if(isFunction(l[i])){l[i].call(event.target,event);}else if(l[i].handleEvent){ // イベントリスナオブジェクトの場合はhandleEventを呼ぶ
// handleEvent内のコンテキストはイベントリスナオブジェクトなので、callは使わずにそのまま呼び出す
l[i].handleEvent(event);}}return event.isDefaultPrevented();}}; // =============================
// Expose to window
// =============================
/**
	 * @namespace h5.mixin
	 */h5.u.obj.expose('h5.mixin',{ /**
		 * Mixinクラスを引数に渡されたモジュールオブジェクトから作成します。
		 * <p>
		 * 作成したMixinクラスはモジュールオブジェクトとのmixinを行うクラスになります。 Mixinクラスについては<a href="Mixin.html">こちら</a>をご覧ください。
		 * </p>
		 *
		 * @since 1.1.10
		 * @memberOf h5.mixin
		 * @param {Object} moduleObject モジュールオブジェクト。mixinの元となるオブジェクト
		 * @returns {Mixin} モジュールオブジェクトをもとに生成したMixinオブジェクト
		 */createMixin:createMixin, /**
		 * EventDispatcherのMixin
		 * <p>
		 * EventDispatcherのMixinです。このクラスが持つmix()メソッドを呼ぶと、オブジェクトにEventDispatcherの機能が追加されます。
		 * </p>
		 * <p>
		 * Mixinクラスについては<a href="Mixin.html">こちら</a>をご覧ください。
		 * </p>
		 * <p>
		 * EventDispatcherクラスについては<a href="EventDispatcher.html">こちら</a>をご覧ください。
		 * </p>
		 *
		 * @since 1.1.10
		 * @memberOf h5.mixin
		 * @type {Mixin}
		 * @name eventDispatcher
		 */eventDispatcher:createMixin(eventDispatcherModule)});})(); /* ------ h5.log ------ */(function(){ // =========================================================================
//
// Constants
//
// =========================================================================
// =============================
// Production
// =============================
// エラーコード
/**
	 * ログターゲット(targets)の指定が不正なときのエラーコード
	 */var ERR_CODE_LOG_TARGET_TYPE=10000; /*
	 * out.categoryのが指定されていないときのエラーコード
	 * ERR_CODE_OUT_CATEGORY_INVALIDに統合したためver.1.1.0で廃止
	 * var ERR_CODE_OUT_CATEGORY_IS_NONE = 10001;
	 */ /*
	 * カテゴリが複数回指定されたときのエラーコード
	 * 出力定義にマッチするかどうかは、カテゴリ名に加えてレベルしても判定するようになったので1.1.15で廃止 #410
	 * var ERR_CODE_CATEGORY_NAMED_MULTIPLE_TIMES = 10002;
	 */ /**
	 * ログレベルの指定が不正なときのエラーコード
	 */var ERR_CODE_LEVEL_INVALID=10003; /**
	 * 存在しないログターゲットを指定されたときのエラーコード
	 */var ERR_CODE_LOG_TARGETS_IS_NONE=10004; /**
	 * カテゴリに文字列以外または空文字を指定したときのエラーコード
	 */var ERR_CODE_CATEGORY_INVALID=10005; /**
	 * ログターゲット(targets)が複数回指定されたときのエラーコード
	 */var ERR_CODE_LOG_TARGETS_NAMED_MULTIPLE_TIMES=10007; /**
	 * ログターゲット(targets)に文字列以外または空文字を指定されたときのエラーコード
	 */var ERR_CODE_LOG_TARGETS_INVALID=10008; /**
	 * ログターゲット(target)にオブジェクト以外を指定されたときのエラーコード
	 */var ERR_CODE_LOG_TARGET_INVALID=10009; /**
	 * out.categoryが指定されていないときのエラーコード
	 */var ERR_CODE_OUT_CATEGORY_INVALID=10010; /**
	 * スタックトレース出力時に1行目(メッセージ部)に表示するトレース件数
	 */var PREVIEW_TRACE_COUNT=3; // =============================
// Development Only
// =============================
/* del begin */ /**
	 * 各エラーコードに対応するメッセージ
	 */var errMsgMap={};errMsgMap[ERR_CODE_LOG_TARGET_TYPE]='ログターゲットのtypeには、オブジェクト、もしくは"console"のみ指定可能です。';errMsgMap[ERR_CODE_LEVEL_INVALID]='level"{0}"の指定は不正です。Number、もしくはtrace, info, debug, warn, error, noneを指定してください。';errMsgMap[ERR_CODE_LOG_TARGETS_NAMED_MULTIPLE_TIMES]='ログターゲット"{0}"が複数回指定されています。';errMsgMap[ERR_CODE_LOG_TARGETS_IS_NONE]='"{0}"という名前のログターゲットはありません。';errMsgMap[ERR_CODE_CATEGORY_INVALID]='categoryは必須項目です。空文字で無い文字列を指定して下さい。';errMsgMap[ERR_CODE_LOG_TARGETS_INVALID]='ログターゲット(targets)の指定は1文字以上の文字列、または配列で指定してください。';errMsgMap[ERR_CODE_LOG_TARGET_INVALID]='ログターゲット(target)の指定はプレーンオブジェクトで指定してください。';errMsgMap[ERR_CODE_OUT_CATEGORY_INVALID]='outの各要素についてcategoryは文字列で指定する必要があります。'; // メッセージの登録
addFwErrorCodeMap(errMsgMap); /* del end */ // =========================================================================
//
// Cache
//
// =========================================================================
// =========================================================================
//
// Privates
//
// =========================================================================
// =============================
// Variables
// =============================
var logLevel={ /**
		 * ログレベル: ERROR
		 *
		 * @memberOf Log.LEVEL
		 * @const {Object} ERROR
		 * @type Number
		 */ERROR:50, /**
		 * ログレベル: WARN
		 *
		 * @memberOf Log.LEVEL
		 * @const {Object} WARN
		 * @type Number
		 */WARN:40, /**
		 * ログレベル: INFO
		 *
		 * @memberOf Log.LEVEL
		 * @const {Object} INFO
		 * @type Number
		 */INFO:30, /**
		 * ログレベル: DEBUG
		 *
		 * @memberOf Log.LEVEL
		 * @const {Object} DEBUG
		 * @type Number
		 */DEBUG:20, /**
		 * ログレベル: TRACE
		 *
		 * @memberOf Log.LEVEL
		 * @const {Object} TRACE
		 * @type Number
		 */TRACE:10, /**
		 * ログレベル: ALL
		 *
		 * @memberOf Log.LEVEL
		 * @const {Object} ALL
		 * @type Number
		 */ALL:0, /**
		 * ログレベル: NONE
		 *
		 * @memberOf Log.LEVEL
		 * @const {Object} NONE
		 * @type Number
		 */NONE:-1}; // コンパイル済ログ設定
var compiledLogSettings=null; // =============================
// Functions
// =============================
/**
	 * 指定されたレベルを文字列に変換します。
	 */function levelToString(level){if(level===logLevel.ERROR){return 'ERROR';}else if(level===logLevel.WARN){return 'WARN';}else if(level===logLevel.INFO){return 'INFO';}else if(level===logLevel.DEBUG){return 'DEBUG';}else if(level===logLevel.TRACE){return 'TRACE';}} /**
	 * 指定された文字列をレベルに変換します。
	 */function stringToLevel(str){if(str.match(/^error$/i)){return logLevel.ERROR;}else if(str.match(/^warn$/i)){return logLevel.WARN;}else if(str.match(/^info$/i)){return logLevel.INFO;}else if(str.match(/^debug$/i)){return logLevel.DEBUG;}else if(str.match(/^trace$/i)){return logLevel.TRACE;}else if(str.match(/^all$/i)){return logLevel.ALL;}else if(str.match(/^none$/i)){return logLevel.NONE;}else {return null;}} /**
	 * トレース情報からトレース結果のオブジェクト取得します。
	 * <p>
	 * 以下のようなオブジェクトを返します
	 * </p>
	 *
	 * <pre><code>
	 * {
	 * 	 all: maxStackSize maxStackSizeまでのトレース結果を改行で結合した文字列
	 * 	 preview: 最大でPREVIEW_TRACE_COUNTまでのトレース結果を&quot; &lt;- &quot;で結合した文字列 &quot;[func1_2 () &lt;- func1_1 () &lt;- func1 () ...]&quot;
	 * }
	 * </code></pre>
	 *
	 * @param {String[]} traces トレース結果
	 * @param {Integer} maxStackSize 最大トレース数
	 */function getFormattedTraceMessage(traces,maxStackSize){var result={};var slicedTraces=traces.slice(0,maxStackSize);var previewLength=Math.min(PREVIEW_TRACE_COUNT,maxStackSize);var preview=slicedTraces.slice(0,previewLength).join(' <- ');if(slicedTraces.length>previewLength){preview+=' ...';}result.preview=preview;result.all=slicedTraces.join('\n');return result;} /**
	 * 指定されたFunction型のオブジェクトから、名前を取得します。
	 *
	 * @param {Function} fn
	 */function getFunctionName(fn){var ret='';if(!fn.name){var regExp=/^\s*function\s*([\w\-\$]+)?\s*\(/i;regExp.test(fn.toString());ret=RegExp.$1;}else {ret=fn.name;}return ret;} /**
	 * 指定されたFunction型のオブジェクトから、引数の型の一覧を取得します。
	 */function parseArgs(args){var argArray=h5.u.obj.argsToArray(args);var result=[];for(var i=0,len=argArray.length;i<len;i++){result.push($.type(argArray[i]));}return result.join(', ');} // =========================================================================
//
// Body
//
// =========================================================================
/**
	 * コンソールにログを出力するログターゲット
	 *
	 * @name ConsoleLogTarget
	 * @constructor
	 */function ConsoleLogTarget(){ // 空コンストラクタ
}ConsoleLogTarget.prototype={ /**
		 * コンソールログターゲットの初期化を行います。
		 *
		 * @memberOf ConsoleLogTarget
		 * @function
		 * @param {Object} param 初期化パラメータ
		 */init:function init(param){ // 今は特定のパラメータはない
}, /**
		 * ログをコンソールに出力します。
		 *
		 * @memberOf ConsoleLogTarget
		 * @function
		 * @param {Object} logObj ログ情報を保持するオブジェクト
		 */log:function log(logObj){if(!window.console){return;}var args=logObj.args;if(!isString(args[0])){this._logObj(logObj);}else {this._logMsg(logObj);}}, /**
		 * 指定された文字列をコンソールに出力します。
		 *
		 * @memberOf ConsoleLogTarget
		 * @private
		 * @function
		 * @param {Object} logObj ログ情報を保持するオブジェクト
		 */_logMsg:function _logMsg(logObj){var args=logObj.args;var msg=null;if(args.length===1){msg=args[0];}else {msg=h5.u.str.format.apply(h5.u.str,args);}var logMsg=this._getLogPrefix(logObj)+msg;if(logObj.logger.enableStackTrace){logMsg+='  ['+logObj.stackTrace.preview+']';}if(logObj.logger.enableStackTrace&&console.groupCollapsed){console.groupCollapsed(logMsg);}else {this._consoleOut(logObj.level,logMsg);}if(logObj.logger.enableStackTrace){ // if (console.trace) {
// console.trace();
// } else {
this._consoleOut(logObj.level,logObj.stackTrace.all); // }
}if(logObj.logger.enableStackTrace&&console.groupEnd){console.groupEnd();}},_consoleOut:function _consoleOut(level,str){var logPrinted=false; // 専用メソッドがあればそれを使用して出力
if(level==logLevel.ERROR&&console.error){console.error(str);logPrinted=true;}else if(level==logLevel.WARN&&console.warn){console.warn(str);logPrinted=true;}else if(level==logLevel.INFO&&console.info){console.info(str);logPrinted=true;}else if(level==logLevel.DEBUG&&console.debug){console.debug(str);logPrinted=true;}if(!logPrinted&&console.log){ // this.trace()の場合、または固有メソッドがない場合はlogメソッドで出力
console.log(str);}}, /**
		 * 出力するログのプレフィックスを作成します。
		 *
		 * @memberOf ConsoleLogTarget
		 * @private
		 * @function
		 * @param {Object} logObj ログ情報を保持するオブジェクト
		 * @return ログのプレフィックス
		 */_getLogPrefix:function _getLogPrefix(logObj){return '['+logObj.levelString+']'+logObj.date.getHours()+':'+logObj.date.getMinutes()+':'+logObj.date.getSeconds()+','+logObj.date.getMilliseconds()+': ';}, /**
		 * 指定されたオブジ���クトをコンソールに出力します。
		 *
		 * @memberOf ConsoleLogTarget
		 * @private
		 * @function
		 * @param {Object} logObj ログ情報を保持するオブジェクト
		 */_logObj:function _logObj(logObj){ // 専用メソッドがあればそれを使用して出力
var args=logObj.args;var prefix=this._getLogPrefix(logObj);args.unshift(prefix);if(logObj.level==logLevel.ERROR&&console.error){this._output(console.error,args);}else if(logObj.level==logLevel.WARN&&console.warn){this._output(console.warn,args);}else if(logObj.level==logLevel.INFO&&console.info){this._output(console.info,args);}else if(logObj.level==logLevel.DEBUG&&console.debug){this._output(console.debug,args);}else {this._output(console.log,args);}},_output:function _output(func,args){try{ // IEでは、console.log/error/info/warnにapplyがない。
// IE11ではapplyを参照しただけでエラーが発生するので、
// try-catchの中でfunc.applyがあるかどうか確認する
if(func.apply){ // IE以外では、applyを使って呼び出さないと『TypeError:Illegal invocation』が発生する
func.apply(console,args);return;}}catch(e){ // 何もしない
}func(args);}}; /**
	 * h5.settings.logにあるログ設定を適用します。
	 *
	 * @function
	 * @name configure
	 * @memberOf h5.log
	 */var configure=function configure(){ // defaultOutのデフォルト
var defaultOut={level:'NONE',targets:null}; /* del begin */ // h5.dev.jsではデフォルトのdefaultOutをログ出力するようにしておく。
defaultOut={level:'debug',targets:'console'}; /* del end */ // 設定オブジェクト
var settings=$.extend(true,{},h5.settings.log); // デフォルトアウトの設定
var dOut=settings.defaultOut;if(!dOut){dOut=defaultOut;settings.defaultOut=dOut;}function compileLogTarget(targets){if(!$.isPlainObject(targets)){throwFwError(ERR_CODE_LOG_TARGET_INVALID);}for(var prop in targets){var obj=targets[prop];var type=$.type(obj.type); // 今は"remote"でもエラーとなる
if(type!=='object'&&obj.type!=='console'){throwFwError(ERR_CODE_LOG_TARGET_TYPE);}var compiledTarget=null;if(obj.type==='console'){compiledTarget=new ConsoleLogTarget();}else { // typeがオブジェクトの場合
var clone=$.extend(true,{},obj.type);compiledTarget=clone;}if(compiledTarget.init){compiledTarget.init(obj);}obj.compiledTarget=compiledTarget;}targets.console={type:'console',compiledTarget:new ConsoleLogTarget()};}var categoryCache=[];function compileOutput(_logTarget,out,isDefault){if(!isDefault){ // デフォルトアウトでない場合はcategoryの設定を行う
var category=out.category;if(!isString(category)||$.trim(category).length===0){throwFwError(ERR_CODE_OUT_CATEGORY_INVALID);}category=$.trim(category);out.compiledCategory=getRegex(category);categoryCache.push(category);} // レベルのコンパイル(数値化)
var compiledLevel;if(out.level==null){compiledLevel=stringToLevel(isDefault?defaultOut.level:dOut.level);}else {compiledLevel=isString(out.level)?stringToLevel($.trim(out.level)):out.level;}if(typeof compiledLevel!=='number'){throwFwError(ERR_CODE_LEVEL_INVALID,out.level);}out.compiledLevel=compiledLevel; // ターゲットのコンパイル
var compiledTargets=[];var targets=out.targets;if(targets!=null){var targetNames=[]; // targetsの指定は文字列または配列またはnull,undefinedのみ
if(!(targets==null||isArray(targets)||isString(targets)&&$.trim(targets).length)){throwFwError(ERR_CODE_LOG_TARGETS_INVALID);}targets=wrapInArray(targets);for(var i=0,len=targets.length;i<len;i++){if(!(targets[i]==null||isString(targets[i])&&$.trim(targets[i]).length)){throwFwError(ERR_CODE_LOG_TARGETS_INVALID);}var targetName=targets[i];if(!targetName){continue;}if($.inArray(targetName,targetNames)!==-1){throwFwError(ERR_CODE_LOG_TARGETS_NAMED_MULTIPLE_TIMES,targetName);}var l=_logTarget[targetName];if(!l){throwFwError(ERR_CODE_LOG_TARGETS_IS_NONE,targetName);}targetNames.push(targetName);compiledTargets.push(l.compiledTarget);}}out.compiledTargets=compiledTargets;} // ログターゲットをコンパイル
var logTarget=settings.target;if(!logTarget){logTarget={};settings.target=logTarget;}compileLogTarget(logTarget); // 出力定義をコンパイル
compileOutput(logTarget,dOut,true);var outs=settings.out;if(outs){outs=wrapInArray(outs);for(var i=0,len=outs.length;i<len;i++){compileOutput(logTarget,outs[i]);}} // ここまでの処理でエラーが起きなかったら設定を適用する
compiledLogSettings=settings;}; /**
	 * ログを生成するクラス
	 *
	 * @class
	 * @name Log
	 */function Log(category){ // categoryの指定が文字列以外、または空文字、空白文字ならエラー。
if(!isString(category)||$.trim(category).length===0){throwFwError(ERR_CODE_CATEGORY_INVALID);} /**
		 * ログカテゴリ
		 *
		 * @memberOf Log
		 * @type String
		 * @name category
		 */this.category=$.trim(category);}Log.prototype={ /**
		 * ログ出力時、スタックトレース(関数呼び出し関係)を表示するか設定します。<br>
		 * (デフォルト: false[表示しない])
		 *
		 * @type Boolean
		 * @memberOf Log
		 */enableStackTrace:false, /**
		 * ログに表示するトレースの最大数を設定します。<br>
		 * (デフォルト:10)
		 *
		 * @type Number
		 * @memberOf Log
		 */maxStackSize:10, /**
		 * LEVEL.ERROR レベルのログを出力します。
		 * <p>
		 * 引数がObject型の場合はオブジェクト構造を、String型の場合は引数の書式に合わせてログを出力します。
		 * <p>
		 * 書式については、h5.u.str.format関数のドキュメントを参照下さい。
		 *
		 * @see h5.u.str.format
		 * @memberOf Log
		 * @function
		 * @param {Any} var_args コンソールに出力する内容
		 */error:function error(var_args){this._log(logLevel.ERROR,arguments,this.error);}, /**
		 * LEVEL.WARN レベルのログを出力します。
		 * <p>
		 * 引数がObject型の場合はオブジェクト構造を、String型の場合は引数の書式に合わせてログを出力します。
		 * <p>
		 * 書式については、h5.u.str.format関数のドキュメントを参照下さい。
		 *
		 * @see h5.u.str.format
		 * @memberOf Log
		 * @function
		 * @param {Any} var_args コンソールに出力する内容
		 */warn:function warn(var_args){this._log(logLevel.WARN,arguments,this.warn);}, /**
		 * LEVEL.INFO レベルのログを出力します。
		 * <p>
		 * 引数がObject型の場合はオブジェクト構造を、String型の場合は引数の書式に合わせてログを出力します。
		 * <p>
		 * 書式については、h5.u.str.format関数のドキュメントを参照下さい。
		 *
		 * @see h5.u.str.format
		 * @memberOf Log
		 * @function
		 * @param {Any} var_args コンソールに出力する内容
		 */info:function info(var_args){this._log(logLevel.INFO,arguments,this.info);}, /**
		 * LEVEL.DEBUG レベルのログを出力します。
		 * <p>
		 * 引数がObject型の場合はオブジェクト構造を、String型の場合は引数の書式に合わせてログを出力します。
		 * <p>
		 * 書式については、h5.u.str.format関数のドキュメントを参照下さい。
		 *
		 * @see h5.u.str.format
		 * @function
		 * @memberOf Log
		 * @param {Any} var_args コンソールに出力する内容
		 */debug:function debug(var_args){this._log(logLevel.DEBUG,arguments,this.debug);}, /**
		 * LEVEL.TRACE レベルのログを出力します。
		 * <p>
		 * 引数がObject型の場合はオブジェクト構造を、String型の場合は引数の書式に合わせてログを出力します。
		 * <p>
		 * 書式については、h5.u.str.format関数のドキュメントを参照下さい。
		 *
		 * @see h5.u.str.format
		 * @memberOf Log
		 * @function
		 * @param {Any} var_args コンソールに出力する内容
		 */trace:function trace(var_args){this._log(logLevel.TRACE,arguments,this.trace);}, /**
		 * スタックトレース(関数呼び出し関係)を取得します。
		 *
		 * @private
		 * @memberOf Log
		 * @function
		 * @param fn {Function} トレース対象の関数
		 * @returns {Object} 以下のようなオブジェクトを返します
		 *
		 * <pre><code>
		 * {
		 * 	 all: maxStackSize maxStackSizeまでのトレース結果を改行で結合した文字列
		 * 	 preview: 最大でPREVIEW_TRACE_COUNTまでのトレース結果を&quot; &lt;- &quot;で結合した文字列 &quot;[func1_2 () &lt;- func1_1 () &lt;- func1 () ...]&quot;
		 * }
		 * </code></pre>
		 */_traceFunctionName:function _traceFunctionName(fn){var traces=[]; // エラーオブジェクトを生成してスタックトレースを取得
var e=new Error();var errMsg=e.stack||e.stacktrace;if(errMsg){ // stackまたはstacktraceがある場合(IE,Safari以外)
// stackにはFW内部の関数も含まれるので、それを取り除く
// new Error()を呼んだ場合に関数呼び出し３つ分省略すればいいが、minifyするとnew演算子が省略される
// Chrome,FireFoxではnew演算子を省略するコンストラクト呼び出しがstackに入り、newを使った場合と結果が異なる
// Operaではnew演算子を省略しても結果は変わらない
// min版、dev版の互換とブラウザ互換をとるために、取り除く関数呼び出しはここの関数名を基点に数えて取り除く
var CURRENT_FUNCTION_REGEXP=/_traceFunctionName/; // トレースされたログのうち、ここの関数から3メソッド分先までの関数呼び出しはログに出力しない。
// (_traceFunction, _log, debug|info|warn|error|trace の3つ。この関数+2の箇所でsliceする)
var DROP_TRACE_COUNT=3;traces=errMsg.replace(/\r\n/,'\n').replace(/at\b|@|Error\b|\t|\[arguments not available\]/ig,'').replace(/(http|https|file):.+[0-9]/g,'').replace(/ +/g,' ').split('\n');var ret=null;var currentFunctionIndex=null;traces=$.map(traces,function(value,index){if(value.length===0){ // 不要なデータはnullを返して削除(Chromeは配列の先頭, FireFoxは配列の末尾に存在する)
// ただしslice箇所が決定する前は削除しない(nullを返さないようにする)
return currentFunctionIndex==null?'':null;}else if($.trim(value)===''){ret='{anonymous}'; // ログとして出力されたが関数名が無い
}else {ret=$.trim(value);}if(currentFunctionIndex===null&&CURRENT_FUNCTION_REGEXP.test(value)){currentFunctionIndex=index;}return ret;}).slice(currentFunctionIndex+DROP_TRACE_COUNT);}else { // IE, Safari
// 呼び出された関数を辿って行ったときに"use strict"宣言を含む関数がある場合、
// IE11だとcallerプロパティへアクセスすると以下のようにエラーが発生する
// 『strict モードでは、関数または arguments オブジェクトの 'caller' プロパティを使用できません』
// (例えばjQuery1.9.0は"use strict"宣言がされており、jQuery1.9.0内の関数を経由して呼ばれた関数は全てstrictモード扱いとなり、
// callerプロパティにアクセスできない)
// そのため、try-catchで囲んで、取得できなかった場合は{unable to trace}を出力する
// fnは、(debug|info|warn|error|trace)の何れかなので、その呼び出し元から辿る
var caller=fn.caller;for(var i=0,l=this.maxStackSize;i<l;i++){var funcName=getFunctionName(caller);var argStr=parseArgs(caller.arguments);var nextCaller;try{nextCaller=caller.caller;}catch(e){ // エラーが発生してトレースできなくなったら終了
traces.push('{unable to trace}');break;}if(funcName){ // 関数名が取得できているときは関数名を表示
traces.push('{'+funcName+'}('+argStr+')');}else if(nextCaller){ // 関数名は取得できていなくても次の関数ができているなら{anonymous}として表示
traces.push('{anonymous}('+argStr+')');}else { // 次の関数が無い場合はルートからの呼び出し
traces.push('{root}('+argStr+')');}if(!nextCaller){ // これ以上トレースできないので終了
break;}caller=nextCaller;}}return getFormattedTraceMessage(traces,this.maxStackSize);}, /**
		 * ログ情報を保持するオブジェクトに以下の情報を付与し、コンソールまたはリモートサーバにログを出力します。
		 * <ul>
		 * <li>時刻
		 * <li>ログの種別を表す文字列(ERROR, WARN, INFO, DEBUG, TRACE, OTHER)
		 * </ul>
		 *
		 * @private
		 * @memberOf Log
		 * @function
		 * @param {Number} level ログレベル
		 * @param {Arguments} args 引数
		 * @param {Function} func 元々呼ばれた関数
		 */_log:function _log(level,args,func){var logObj={level:level,args:h5.u.obj.argsToArray(args),stackTrace:this.enableStackTrace?this._traceFunctionName(func):''};var outs=compiledLogSettings.out;var defaultOut=compiledLogSettings.defaultOut;var targetOuts=[];var terminated=false;if(outs){outs=wrapInArray(outs);for(var i=0,len=outs.length;i<len;i++){var out=outs[i];if(out.compiledCategory.test(this.category)&&level>=out.compiledLevel&&out.compiledLevel>=0){ // カテゴリとレベル指定を満たした出力定義が出力対象
targetOuts.push(out);if(out.terminate!==false){ // terminate:falseが明示的に指定されていない場合、出力定義にマッチするかどうかの探索を打ち切る
terminated=true;break;}}}}if(!targetOuts.length||!terminated){ // いずれの出力定義の条件も満たさなかったまたは、何れかの条件を満たしたが、terminateしていない場合は、defaultOutも出力対象
targetOuts.push(defaultOut);}for(var i=0,l=targetOuts.length;i<l;i++){var targetOut=targetOuts[i];var levelThreshold=targetOut.compiledLevel;var logTarget=targetOut.compiledTargets;if(level<levelThreshold||levelThreshold<0){return;}logObj.logger=this;logObj.date=new Date();logObj.levelString=this._levelToString(level);if(!logTarget||logTarget.length===0){return;}for(var j=0,len=logTarget.length;j<len;j++){logTarget[j].log(logObj);}}}, /**
		 * ログレベルを判定して、ログの種別を表す文字列を取得します。
		 *
		 * @private
		 * @memberOf Log
		 * @function
		 * @param {Object} level
		 */_levelToString:levelToString}; /**
	 * ロガーを作成します。
	 *
	 * @param {String} [category=null] カテゴリ.
	 * @returns {Log} ロガー.
	 * @name createLogger
	 * @function
	 * @memberOf h5.log
	 * @see Log
	 */var createLogger=function createLogger(category){return new Log(category);}; // =============================
// Expose to window
// =============================
/**
	 * @namespace
	 * @name log
	 * @memberOf h5
	 */h5.u.obj.expose('h5.log',{createLogger:createLogger,configure:configure});})(); /* ------ (h5) ------ */(function(){ // =========================================================================
//
// Constants
//
// =========================================================================
// =============================
// Production
// =============================
/**
	 * シーン間パラメーター用デフォルトプレフィクス
	 */var DEFAULT_CLIENT_QUERY_STRING_PREFIX=''; /**
	 * シーン間パラメーター用デフォルトプレフィクス(FW用)
	 */var DEFAULT_CLIENT_FW_QUERY_STRING_PREFIX='_h5_'; /**
	 * Router 遷移先URL最大長
	 * <p>
	 * URL全体がこの値を超えた場合、開発字はエラー、運用時は警告ログを出力。 IEで2084の場合があり、これ以下で、ある程度のバッファを取った。
	 * </p>
	 */var URL_MAX_LENGTH=1800; /**
	 * シーンのデフォルトのヒストリーモード
	 */var DEFAULT_HISTORY_MODE='history'; // =============================
// Development Only
// =============================
/* del begin */ /* del end */ // =========================================================================
//
// Cache
//
// =========================================================================
// =========================================================================
//
// Privates
//
// =========================================================================
// =============================
// Variables
// =============================
// =============================
// Functions
// =============================
/**
	 * すべてのアスペクト設定をコンパイルします。
	 *
	 * @param {Object|Object[]} aspects アスペクト設定
	 */function compileAspects(aspects){var compile=function compile(aspect){if(aspect.target){aspect.compiledTarget=getRegex(aspect.target);}if(aspect.pointCut){aspect.compiledPointCut=getRegex(aspect.pointCut);}return aspect;};h5.settings.aspects=$.map(wrapInArray(aspects),function(n){return compile(n);});} /**
	 * h5.ajax()でリトライする時のデフォルトのフィルタ<br>
	 * <p>
	 * falseを返した場合はリトライしない。リトライする場合はリトライするajaxSettingsオブジェクト($.ajax()に渡すオブジェクト)を返す。
	 * type===GETかつステータスコードが0(タイムアウト)または12029(IEでコネクションが繋がらない)場合にリトライする。
	 * </p>
	 * <p>
	 * 引数は$.ajaxのfailコールバックに渡されるものが入る。 thisはajaxを呼んだ時の設定パラメータを含むajaxSettingsオブジェクト
	 * </p>
	 *
	 * @param {jqXHR} jqXHR jqXHRオブジェクト
	 * @param {String} textStatus
	 * @param {String} thrownError
	 * @returns {false|Object} リトライしない場合はfalseを返す。する場合はthis(ajaxSettingsオブジェクト)を返す
	 */function defaultAjaxRetryFilter(jqXHR,textStatus,thrownError){ // type===GETかつステータスコードが0(タイムアウト)または12029(IEでコネクションが繋がらない)場合にリトライする
var stat=jqXHR.status; // jQuery1.9以降、GET,POSTの設定はtypeではなくmethodで指定することが推奨されているが、
// thisにはtypeにtoUpperCase()されたものが格納されている
var type=this.type;if(type==='POST'||!(stat===0||stat===ERROR_INTERNET_CANNOT_CONNECT)){return false;}} // =========================================================================
//
// Body
//
// =========================================================================
/**
	 * 設定を格納するh5.settingsオブジェクト
	 *
	 * @name settings
	 * @memberOf h5
	 * @namespace
	 */h5.u.obj.ns('h5.settings');h5.settings={ /**
		 * failコールバックの設定されていないDeferred/Promiseオブジェクトの共通のエラー処理
		 * <p>
		 * failコールバックが一つも設定されていないDeferredオブジェクトがrejectされたときにcommonFailHandlerに設定した関数が実行されます。
		 * <p>
		 * <p>
		 * commonFailHandlerが実行されるDeferredオブジェクトは、h5.async.deferred()で作成したDeferredオブジェクトかhifive内部で生成されているDeferredオブジェクトだけです。
		 * jQuery.Deferred()で生成したDeferredオブジェクトは対象ではありません。
		 * </p>
		 * <p>
		 * commonFailHandlerの引数と関数内のthisは通常のfailハンドラと同様で、それぞれ、rejectで渡された引数、rejectの呼ばれたDefferedオブジェクト、です。
		 * </p>
		 * <h4>サンプル</h4>
		 *
		 * <pre>
		 * // commonFailHandlerの登録
		 * h5.settings.commonFailHandler = function(e) {
		 * 	alert(e);
		 * };
		 *
		 * // Deferredオブジェクトの生成
		 * var dfd1 = h5.async.deferred();
		 * var dfd2 = h5.async.deferred();
		 * var dfd3 = h5.async.deferred();
		 *
		 * dfd1.reject(1);
		 * // alert(1); が実行される
		 *
		 * dfd2.fail(function() {});
		 * dfd2.reject(2);
		 * // failコールバックが登録されているので、commonFailHandlerは実行されない
		 *
		 * var promise3 = dfd3.promise();
		 * promise3.fail(function() {});
		 * dfd3.reject(3);
		 * // promiseオブジェクトからfailコールバックを登録した場合も、commonFailHandlerは実行されない
		 *
		 * h5.ajax('hoge');
		 * // 'hoge'へのアクセスがエラーになる場合、commonFailHandlerが実行される。
		 * // エラーオブジェクトが引数に渡され、[object Object]がalertで表示される。
		 * // h5.ajax()の戻り値であるDeferredオブジェクトが内部で生成されており、
		 * // そのDeferredオブジェクトにfailハンドラが登録されていないためである。
		 *
		 * var d = h5.ajax('hoge');
		 * d.fail(function() {});
		 * // failハンドラが登録されているため、commonFailHandlerは実行されない
		 * </pre>
		 *
		 * <h4>デフォルトの設定</h4>
		 * <p>
		 * h5.settings.commonFailHandlerのデフォルト値はnullです。共通のエラー処理はデフォルトでは何も実行されません。
		 * commonFailHandlerでの処理を止めたい場合は、nullを代入して設定をクリアしてください。
		 * </p>
		 *
		 * <pre>
		 * h5.settings.commonFailHandler = null;
		 * </pre>
		 *
		 * @memberOf h5.settings
		 * @type Function
		 */commonFailHandler:null, /**
		 * コントローラ、ロジックへのアスペクトを設定します。
		 *
		 * @memberOf h5.settings
		 * @type Aspect|Aspect[]
		 */aspects:null, /**
		 * ログの設定を行います。
		 *
		 * @memberOf h5.settings
		 * @type Object
		 */log:null, /**
		 * コントローラのイベントリスナーのターゲット要素（第2引数）をどの形式で渡すかを設定します。<br>
		 * <ul>
		 * <li>1 (default) : jQueryオブジェクト
		 * <li>0 : ネイティブ形式（DOM要素そのもの）
		 * </ul>
		 *
		 * @since 1.1.4
		 * @memberOf h5.settings
		 * @type Number
		 */listenerElementType:1, /**
		 * コントローラに記述されたテンプレートの読み込み等、動的リソース読み込み時の設定を行います。<br>
		 * このプロパティはオブジェクトで、<code>h5.settings.dynamicLoading.retryCount = 3;</code>のようにして設定します。<br>
		 * dynamicLoadingで指定できるプロパティ：
		 * <dl>
		 * <dt>retryCount</dt>
		 * <dd>一時的な通信エラーが発生した場合に通信をリトライする回数（デフォルト：3）</dd>
		 * <dt>retryInterval</dt>
		 * <dd>一時的な通信エラーが発生した場合に通信をリトライするまでの待ち秒数（ミリ秒）。通信エラーが発生した場合、ここで指定した秒数待ってからリクエストを送信します。（デフォルト：500）</dd>
		 * </dl>
		 *
		 * @since 1.1.4
		 * @memberOf h5.settings
		 * @type Object
		 */dynamicLoading:{retryCount:3,retryInterval:500}, /**
		 * h5.ajaxの設定<br>
		 * <p>
		 * このパラメータはオブジェクトで、以下のプロパティを持ちます
		 * </p>
		 * <dl>
		 * <dt>retryCount</dt>
		 * <dd>一時的な通信エラーが発生した場合に通信をリトライする回数。デフォルトは0で、リトライを行いません。</dd>
		 * <dt>retryInterval</dt>
		 * <dd>一時的な通信エラーが発生した場合に通信をリトライするまでの待ち秒数（ミリ秒）。
		 * <p>
		 * 通信エラーが発生した場合、ここで指定した秒数待ってからリクエストを送信します。デフォルトは500msです。
		 * 同期(async:false)でh5.ajaxを呼んだ場合はretryIntervalは無視され、即座にリトライします。 (同期で呼んだ場合は必ず結果が同期で返ってきます。)
		 * </p>
		 * </dd>
		 * <dt>retryFilter</dt>
		 * <dd> リトライ時に実行する関数を登録できます。
		 * <p>
		 * リトライが有効な場合、呼び出しが失敗した場合に呼ばれます。 (失敗か成功かは、jQuery.ajaxの結果に基づく。200番台、304番なら成功、それ以外は失敗。)
		 * </p>
		 * <p>
		 * retryFilterに設定した関数がfalseを返した場合はリトライを中止し、それ以外を返した場合はリトライを継続します。
		 * (retryCountに設定した回数だけリトライをしたら、retryFilterの戻り値���関わらずリトライを中止します。)
		 * </p>
		 * <p>
		 * デフォルトで設定してあるretryFilterは、「メソッドがGET、かつ、コネクションタイムアウトで失敗した場合のみリトライする」 ようになっています。
		 * </p>
		 * <p>
		 * この挙動を変えたい場合は、以下のようにしてretryFilter関数を差し替えます。
		 * </p>
		 * <code><pre>
		 * h5.settings.ajax.retryFilter = function(jqXHR, textStatus, thrownError) {
		 * 	// この関数のthisはh5.ajax()呼び出し時のパラメータオブジェクトです。
		 * 	// thisを見ると、メソッドがGETかPOSTか、等も分かります。
		 * 	console.log('Ajax呼び出し失敗。textStatus = ' + textStatus);
		 * 	return false; // 明示的にfalseを返した場合のみリトライを中止する
		 * }
		 * </pre></code> </dd>
		 * </dl>
		 * h5preinitのタイミングで設定すると、ユーザコード内のh5.ajaxの呼び出し全てに反映されます。 <code><pre>
		 * $(document).bind('h5preinit', function() {
		 * 	h5.settings.ajax = {
		 * 		retryCount: 3,
		 * 		retryInterval: 500,
		 * 		retryFilter: function(){...}
		 * 	};
		 * });
		 * </pre></code>
		 * <p>
		 * また、h5.ajax()の呼び出しパラメータで指定すると、呼び出しごとに設定を変えることもできます。 指定しなかったパラメータは<code>h5.settings.ajax</code>のパラメータが使われます。
		 * </p>
		 * <code><pre>
		 * h5.ajax({
		 * 	url: 'hoge',
		 * 	retryCount: 1
		 * });
		 * // この場合、retryCountだけ1になり、retryIntervalとretryFilterはsettingsのものが使われます。
		 * </pre></code>
		 *
		 * @since 1.1.5
		 * @memberOf h5.settings
		 * @type Object
		 */ajax:{retryCount:0,retryInterval:500,retryFilter:defaultAjaxRetryFilter}, /**
		 * コントローラがh5trackstartイベントにバインドするときに、バインド対象のターゲットに設定するCSSプロパティ"touch-action"の値
		 * <p>
		 * デフォルトは"none"で、h5trackstartイベントがバインドされた要素はタッチ操作でスクロールされないようになります。
		 * </p>
		 * <p>
		 * nullを設定した場合はtouch-actionへの値の設定は行いません。
		 * </p>
		 *
		 * @since 1.1.10
		 * @memberOf h5.settings
		 * @type String
		 */trackstartTouchAction:'none', /**
		 * h5.resモジュールの設定
		 * <p>
		 * 以下のプロパティの設定を行ってください
		 * </p>
		 * <dl>
		 * <dt>baseUrl</dt>
		 * <dd>type:string|null</dd>
		 * <dd>ベースURL。デフォルトはnullで、リソースパス解決時のブラウザのアドレスバーの（ファイル名部分を除いた）パスがカレントパスになります(空文字を指定した場合もnullと同じです)</dd>
		 * <dt>resolveTimeout</dt>
		 * <dd>type:integer</dd>
		 * <dd>タイムアウト時間設定(ms)を設定。タイムアウトに設定された時間待機して、依存解決ができない場合、resolve()は失敗します。デフォルトは10000(10秒)です。</dd>
		 * </dl>
		 *
		 * @memberOf h5.settings
		 * @type Object
		 */res:{baseUrl:null,resolveTimeout:10000}, // TODO autoInitがtrueの場合のみinit
// TODO(鈴木) 暫定。とりあえず設定を有効化しました
/**
		 * シーン機能の設定
		 * <p>
		 * 以下のプロパティの設定を行ってください。
		 * </p>
		 * <dl>
		 * <dt>followTitle</dt>
		 * <dd>type:boolean</dd>
		 * <dd>メインシーンコンテナでブラウザタイトルの追従を行うか(デフォルトtrue)</dd>
		 * <dt>clientQueryStringPrefix</dt>
		 * <dd>type:string</dd>
		 * <dd>シーン遷移パラメーター識別用プレフィクス。デフォルト空文字</dd>
		 * <dt>clientFWQueryStringPrefix</dt>
		 * <dd>type:string</dd>
		 * <dd>シーン遷移パラメーター識別用プレフィクス(FW用)。デフォルト"_h5_"</dd>
		 * <dt>urlHistoryMode</dt>
		 * <dd>type:string</dd>
		 * <dd>メインシーンコンテナURL履歴保持方法({@link h5.scene.urlHistoryMode}参照)。デフォルトは"'history"</dd>
		 * <dt>urlMaxLength</dt>
		 * <dd>type:integer</dd>
		 * <dd>シーン遷移先URL最大長。デフォルト1800</dd>
		 * <dt>baseUrl</dt>
		 * <dd>type:string|null</dd>
		 * <dd>ベースURL。デフォルトはnullで、hifiveを読み込んだページがカレントパスになります(空文字を指定した場合もnullと同じです)</dd>
		 * <dt>autoInit</dt>
		 * <dd>type:boolean</dd>
		 * <dd>ページロード時にドキュメント全体を探索して、DATA属性によるコントローラーバインドとシーンコンテナ生成を行うかどうか。デフォルトfalse</dd>
		 * </dl>
		 *
		 * @memberOf h5.settings
		 * @name scene
		 * @type {Object}
		 */scene:{ // デフォルト設定を記述
followTitle:true,clientQueryStringPrefix:DEFAULT_CLIENT_QUERY_STRING_PREFIX,clientFWQueryStringPrefix:DEFAULT_CLIENT_FW_QUERY_STRING_PREFIX,urlHistoryMode:DEFAULT_HISTORY_MODE,urlMaxLength:URL_MAX_LENGTH,baseUrl:null,autoInit:false}}; // h5preinitでglobalAspectsの設定をしている関係上、別ファイルではなく、ここに置いている。
/**
	 * メソッド呼び出し時に、コントローラまたはロジック名、メソッド名、引数をログ出力するインターセプタです。<br>
	 * このインターセプタはコントローラまたはロジックに対して設定してください。<br>
	 * ver.1.1.6以降、このインターセプタは処理時間も出力します。<br>
	 * 「処理時間」とは、メソッドの戻り値がPromiseでない場合は呼び出し～returnされるまでの時間、<br>
	 * 戻り値がPromiseだった場合は呼び出し～そのPromiseがresolveまたはrejectされるまでの時間です。
	 *
	 * @function
	 * @param {Function} invocation 次に実行する関数
	 * @returns {Any} invocationの戻り値
	 * @memberOf h5.core.interceptor
	 */var logInterceptor=h5.u.createInterceptor(function(invocation,data){this.log.info('{0}.{1}が開始されました。',this.__name,invocation.funcName);this.log.info(invocation.args);data.start=new Date();return invocation.proceed();},function(invocation,data){var end=new Date();var time=end.getTime()-data.start.getTime();this.log.info('{0}.{1}が終了しました。 Time={2}ms',this.__name,invocation.funcName,time);}); /**
	 * メソッドの実行時間を計測するインターセプタです。<br>
	 * このインターセプタはコントローラまたはロジックに対して設定してください。
	 *
	 * @deprecated ※このメソッドの代わりに、logInterceptorを使用してください。ver.1.1.6以降、lapInterceptorはlogInterceptorと同じになりました。
	 * @function
	 * @param {Function} invocation 次に実行する関数
	 * @returns {Any} invocationの戻り値
	 * @memberOf h5.core.interceptor
	 */var lapInterceptor=logInterceptor; /**
	 * 例外発生時にcommonFailHandlerを呼び出すインターセプタです。<br>
	 * このインターセプタをかけたメソッド内で例外がスローされメソッド内でキャッチされなかった場合、
	 * その例外オブジェクトを引数にしてcommonFailHandlerを呼びだします（commonFailHandlerがない場合はなにもしません）。
	 *
	 * @param {Function} invocation 次に実行する関数
	 * @returns {Any} invocationの戻り値
	 * @memberOf h5.core.interceptor
	 */var errorInterceptor=function errorInterceptor(invocation){var ret=null;try{ret=invocation.proceed();}catch(e){if(h5.settings.commonFailHandler&&isFunction(h5.settings.commonFailHandler)){h5.settings.commonFailHandler.call(null,e);}}return ret;}; // ここで公開しないとh5preinit時にデフォルトインターセプタが定義されていないことになる
/**
	 * @name interceptor
	 * @memberOf h5.core
	 * @namespace
	 */h5.u.obj.expose('h5.core.interceptor',{lapInterceptor:lapInterceptor,logInterceptor:logInterceptor,errorInterceptor:errorInterceptor}); // h5preinitイベントをトリガ.
$(document).trigger('h5preinit');if(h5.settings.aspects){compileAspects(h5.settings.aspects);} // ログ設定の適用
h5.log.configure(); // =============================
// Expose to window
// =============================
/* del begin */ // テストのために公開している。
h5.u.obj.expose('h5.core',{__compileAspects:compileAspects}); /* del end */})(); /* ------ h5.env ------ */(function(){ // =========================================================================
//
// Constants
//
// =========================================================================
// =============================
// Production
// =============================
// =============================
// Development Only
// =============================
/* del begin */ /* del end */ // =========================================================================
//
// Cache
//
// =========================================================================
// =========================================================================
//
// Privates
//
// =========================================================================
// =============================
// Variables
// =============================
// =============================
// Functions
// =============================
function check(ua){ /**
		 * iPhoneであるかどうかを表します。 Chrome For iOS など、標準ブラウザでなくてもiPhoneであれば、trueです。
		 *
		 * @name isiPhone
		 * @type Boolean
		 * @memberOf h5.env.ua
		 */var isiPhone=!!ua.match(/iPhone/i); /**
		 * iPadであるかどうかを表します。 Chrome For iOS など、標準ブラウザでなくてもiPhoneであれば、trueです。
		 *
		 * @name isiPad
		 * @type Boolean
		 * @memberOf h5.env.ua
		 */var isiPad=!!ua.match(/iPad/i); /**
		 * iOSであるかどうかを表します。 isiPhoneまたはisiPadがtrueであればtrueです。
		 *
		 * @name isiOS
		 * @type Boolean
		 * @memberOf h5.env.ua
		 */var isiOS=isiPhone||isiPad; /**
		 * Androidであるかどうかを表します。 Androidであれば標準ブラウザでなくても、trueです。
		 *
		 * @name isAndroid
		 * @type Boolean
		 * @memberOf h5.env.ua
		 */var isAndroid=!!ua.match(/android/i); /**
		 * Windows Phoneであるかどうかを表します。
		 *
		 * @name isWindowsPhone
		 * @type Boolean
		 * @memberOf h5.env.ua
		 */var isWindowsPhone=!!ua.match(/Windows Phone/i); /**
		 * ブラウザがMicrosoft Edgeであるかどうかを表します。
		 *
		 * @name isEdge
		 * @type Boolean
		 * @memberOf h5.env.ua
		 */var isEdge=!!ua.match(/Edge/); /**
		 * ブラウザがInternet Explorerであるかどうかを表します。
		 *
		 * @name isIE
		 * @type Boolean
		 * @memberOf h5.env.ua
		 */var isIE=!!ua.match(/MSIE/)||!!ua.match(/Trident/); /**
		 * ブラウザがFirefoxであるかどうかを表します。 モバイル端末のFirefoxでもtrueです。
		 *
		 * @name isFirefox
		 * @type Boolean
		 * @memberOf h5.env.ua
		 */var isFirefox=!!ua.match(/Firefox/i); /**
		 * ブラウザがGoogle Chromeであるかどうかを表します。 Chromeモバイル、Chrome iOS の場合もtrueです。<br />
		 * 以下の文字列が含まれる場合にtrueになります。<br />
		 * <ul>
		 * <li>Chrome (Chrome for Android / Desktop)</li>
		 * <li>CrMo (Chrome for Android)</li>
		 * <li>CriOS (Chrome for iOS)</li>
		 * </ul>
		 *
		 * @name isChrome
		 * @type Boolean
		 * @memberOf h5.env.ua
		 */var isChrome=!isEdge&&!!ua.match(/Chrome/i)||!!ua.match(/CrMo/)||!!ua.match(/CriOS/); /**
		 * ブラウザがSafariであるかどうかを表します。 iOSのSafariの場合もtrueです。
		 *
		 * @name isSafari
		 * @type Boolean
		 * @memberOf h5.env.ua
		 */var isSafari=!isEdge&&!isAndroid&&!isChrome&&!!ua.match(/Safari/i); /**
		 * レンダリングエンジンがWebkitであるかどうかを表します。
		 *
		 * @name isWebkit
		 * @type Boolean
		 * @memberOf h5.env.ua
		 */var isWebkit=!isEdge&&!!ua.match(/Webkit/i); /**
		 * ブラウザがOperaであるかどうかを表します。 モバイル、iOSのOperaの場合もtrueです。
		 *
		 * @name isOpera
		 * @type Boolean
		 * @memberOf h5.env.ua
		 */var isOpera=!!ua.match(/Opera/i); /**
		 * ブラウザがAndroid標準ブラウザであるかどうかを表します。
		 *
		 * @name isAndroidDefaultBrowser
		 * @type Boolean
		 * @memberOf h5.env.ua
		 */var isAndroidDefaultBrowser=isAndroid&&!!ua.match(/Safari/i)&&!isChrome; /**
		 * スマートフォンであるかどうかを表します。<br />
		 * isiPhone, isWindowsPhoneがtrueならtrueとなります。<br />
		 * Androidの場合、判定は以下の場合にtrueとなります。
		 * <ul>
		 * <li>Android標準ブラウザ、かつユーザーエージェントに"Mobile"を含む、かつ"SC-01C"を含まない。 </li>
		 * <li>ユーザーエージェントに"Fennec"を含む。</li>
		 * <li>ユーザーエージェントに"Opera Mobi"を含む。</li>
		 * </ul>
		 *
		 * @name isSmartPhone
		 * @type Boolean
		 * @memberOf h5.env.ua
		 */var isSmartPhone=!!(isiPhone||isWindowsPhone||isAndroidDefaultBrowser&&ua.match(/Mobile/)&&!ua.match(/SC-01C/)||isAndroid&&isChrome&&ua.match(/Mobile/)||ua.match(/Fennec/i)||ua.match(/Opera Mobi/i)); /**
		 * タブレットであるかどうかを表します。<br />
		 * isiPadがtrueならtrueとなります。<br />
		 * Androidの場合、判定は以下の場合にtrueとなります。
		 * <ul>
		 * <li>Android標準ブラウザ、かつユーザーエージェントに"Mobile"を含まない。ただし"SC-01C"を含む場合はtrue。 </li>
		 * <li>ユーザーエージェントに"Fennec"を含む。</li>
		 * <li>ユーザーエージェントに"Opera Tablet"を含む。</li>
		 * </ul>
		 *
		 * @name isTablet
		 * @type Boolean
		 * @memberOf h5.env.ua
		 */var isTablet=!!(isiPad||isAndroidDefaultBrowser&&!ua.match(/Mobile/)||isAndroid&&isChrome&&!ua.match(/Mobile/)||ua.match(/SC-01C/)||ua.match(/Fennec/i)||ua.match(/Opera Tablet/i)); /**
		 * PCであるかどうかを表します。 isSmartPhoneとisTabletがいずれもfalseの場合にtrueです。
		 *
		 * @name isDesktop
		 * @type Boolean
		 * @memberOf h5.env.ua
		 */var isDesktop=!isSmartPhone&&!isTablet; /**
		 * OSのバージョンを表します。<br />
		 * h5.env.ua.isDesktopがtrueである場合、値はnullになります。
		 *
		 * @name osVersion
		 * @type Number
		 * @memberOf h5.env.ua
		 */var osVersion=null; /**
		 * OSのフルバージョンを表します。<br />
		 * h5.env.ua.isDesktopがtrueである場合、値はnullになります。
		 *
		 * @name osVersionFull
		 * @type String
		 * @memberOf h5.env.ua
		 */var osVersionFull=null;var getiOSVersion=function getiOSVersion(pre,post){return $.trim(ua.substring(ua.indexOf(pre)+pre.length,ua.indexOf(post))).split('_');};var getVersion=function getVersion(target,end,ignoreCase){var r=ignoreCase===false?new RegExp(target+end):new RegExp(target+end,'i');return $.trim(ua.match(r));};function spaceSplit(target,ignoreCase){var v=getVersion(target,'[^;)]*',ignoreCase).split(' ');if(v.length===1)return '';return v[v.length-1];}function slashSplit(target,ignoreCase){var v=getVersion(target,'[^;) ]*',ignoreCase).split('/');if(v.length===1)return '';return v[v.length-1];}function colonSplit(target,ignoreCase){var v=getVersion(target,'[^;) ]*',ignoreCase).split(':');if(v.length===1)return '';return v[v.length-1];}var getMainVersion=function getMainVersion(target){return parseInt(target.split('.')[0]);};if(isiPhone){var s=getiOSVersion('iPhone OS','like');osVersion=parseInt(s[0]);osVersionFull=s.join('.');}else if(isiPad){var s=getiOSVersion('CPU OS','like');osVersion=parseInt(s[0]);osVersionFull=s.join('.');}else if(isAndroid&&isFirefox){ // FennecはAndroidのバージョンを取���することができない。
}else if(isAndroid){var s=spaceSplit('Android');osVersion=getMainVersion(s);osVersionFull=s;}else if(isWindowsPhone){var s=spaceSplit('Windows Phone OS');if(!s){s=spaceSplit('Windows Phone');}osVersion=getMainVersion(s);osVersionFull=s;} // Operaのuaに'MSIE'が入っているとき用に、isIE && isOperaならisIEをfalseにする
if(isIE&&isOpera){isIE=false;} // デスクトップの場合。osVersion, osVersionFullはnull
/**
		 * ブラウザのバージョンを表します。
		 *
		 * @name browserVersion
		 * @type Number
		 * @memberOf h5.env.ua
		 */var browserVersion=null; /**
		 * ブラウザのフルバージョンを表します。
		 *
		 * @name browserVersionFull
		 * @type String
		 * @memberOf h5.env.ua
		 */var browserVersionFull=null;if(isiOS||isAndroid&&isAndroidDefaultBrowser){browserVersion=osVersion;browserVersionFull=osVersionFull;}else {var version=null;if(isIE){version=spaceSplit('MSIE',false)||colonSplit('rv');}else if(isChrome){version=slashSplit('Chrome',false);if(!version){version=slashSplit('CrMo',false);}}else if(isSafari){version=slashSplit('Version');}else if(isFirefox){version=slashSplit('Firefox');}else if(isOpera){version=slashSplit('Version');if(!version){version=slashSplit('Opera');}if(!version){version=spaceSplit('Opera');}}else if(isEdge){version=slashSplit('Edge');}if(version){browserVersion=getMainVersion(version);browserVersionFull=version;}}return {osVersion:osVersion,osVersionFull:osVersionFull,browserVersion:browserVersion,browserVersionFull:browserVersionFull,isiPhone:isiPhone,isiPad:isiPad,isiOS:isiOS,isAndroid:isAndroid,isWindowsPhone:isWindowsPhone,isIE:isIE,isFirefox:isFirefox,isChrome:isChrome,isSafari:isSafari,isOpera:isOpera,isEdge:isEdge,isAndroidDefaultBrowser:isAndroidDefaultBrowser,isSmartPhone:isSmartPhone,isTablet:isTablet,isDesktop:isDesktop,isWebkit:isWebkit};} // =========================================================================
//
// Body
//
// =========================================================================
// =============================
// Expose to window
// =============================
/**
	 * @namespace
	 * @name env
	 * @memberOf h5
	 */ /**
	 * ユーザーエージェントからOS、ブラウザを判別します。<br />
	 * 例えば、iPhoneのSafariかどうかを判別したい場合は、<br />
	 * <br />
	 * h5.env.ua.isiPhone && h5.env.ua.isSafari<br />
	 * <br />
	 * で判別することができます。<br />
	 * <br />
	 * 機能の有無を判別したい場合は、基本的にはこれらのプロパティを使わず、機能の有無でチェックしてください。<br />
	 * 例えば『Geolocationが使えるか』を判別したい場合、h5.api.geo.isSupportedで判別できます。<br />
	 *
	 * @namespace
	 * @name ua
	 * @memberOf h5.env
	 */h5.u.obj.expose('h5.env',{ua:check(navigator.userAgent)}); /* del begin */ // テストのためにグローバルに公開。プリプロセッサで削除される。
h5.u.obj.expose('h5.env',{__check:check}); /* del end */})(); /* ------ h5.async ------ */(function(){ // =========================================================================
//
// Constants
//
// =========================================================================
// =============================
// Production
// =============================
/**
	 * h5.async.loopの第一引数に配列以外のものが渡されたときに発生するエラー
	 */var ERR_CODE_NOT_ARRAY=5000; /**
	 * h5.async.deferredがcommonFailHandlerの管理のために上書くjQuery.Deferredのメソッド (failコールバックを登録する可能性のある関数)
	 *
	 * @private
	 * @type {Array}
	 */var CFH_HOOK_METHODS=['fail','always','pipe','then']; /**
	 * pipeを実装するために使用するコールバック登録メソッド
	 *
	 * @private
	 * @type {Array}
	 */var PIPE_CREATE_METHODS=['done','fail','progress']; /**
	 * pipeを実装するために使用するコールバック登録メソッドに対応するDeferredのコールバック呼び出しメソッド
	 *
	 * @private
	 * @type {Array}
	 */var PIPE_CREATE_ACTIONS=['resolve','reject','notify']; // =============================
// Development Only
// =============================
var fwLogger=h5.log.createLogger('h5.async'); /* del begin */var FW_LOG_H5_WHEN_INVALID_PARAMETER='h5.async.when: 引数にpromiseオブジェクトでないものが含まれています。'; /**
	 * 各エラーコードに対応するメッセージ
	 */var errMsgMap={};errMsgMap[ERR_CODE_NOT_ARRAY]='h5.async.each() の第1引数は配列のみを扱います。'; // メッセージの登録
addFwErrorCodeMap(errMsgMap); /* del end */ // =========================================================================
//
// Cache
//
// =========================================================================
/**
	 * argsToArrayのショートカット
	 *
	 * @private
	 */var argsToArray=h5.u.obj.argsToArray; // =========================================================================
//
// Privates
//
// =========================================================================
// =============================
// Variables
// =============================
// thenが新しいプロミス(deferred)を返す(jQuery1.8以降)かどうか
// jQuery.thenの挙動の確認
var isThenReturnsNewPromise=function(){var tempDfd=$.Deferred();return tempDfd!==tempDfd.then();}(); // =============================
// Functions
// =============================
/**
	 * progres,notify,notifyWithが無ければそれらを追加する
	 *
	 * @private
	 * @param {Deferred} dfd
	 */function addProgressFeatureForCompatibility(dfd){ // 既にnorify/notifyWithが呼ばれたかどうかのフラグ
var notified=false; // 最後に指定された実行コンテキスト
var lastNotifyContext=null; // 最後に指定されたパラメータ
var lastNotifyParam=null; // progressCallbacksを格納するための配列
var progressCallbacks=[]; // progress,notify,notifyWithを追加
dfd.progress=function() /* var_args */{ // progressの引数は、配列でも可変長でも、配列を含む可変長でも渡すことができる
// 再帰で処理する
var callbacks=argsToArray(arguments);for(var i=0,l=callbacks.length;i<l;i++){var elem=callbacks[i];if(isArray(elem)){dfd.progress.apply(this,elem);}else if(isFunction(elem)){if(notified){ // 既にnorify/notifyWithが呼ばれていた場合、jQuery1.7以降の仕様と同じにするためにコールバックの登録と同時に実行する必要がある
var params=lastNotifyParam;if(params!==lastNotifyParam){params=wrapInArray(params);}elem.apply(lastNotifyContext,params);}else {progressCallbacks.push(elem);}}}return this;};function notify() /* var_args */{notified=true;lastNotifyContext=this;lastNotifyParam=argsToArray(arguments);if(isRejected(dfd)||isResolved(dfd)){ // resolve済みまたはreject済みならprogressコールバックは実行しない
return dfd;}var args=argsToArray(arguments); // progressコールバックが登録されていたら全て実行する
if(progressCallbacks.length>0){for(var i=0,callbackLen=progressCallbacks.length;i<callbackLen;i++){var params=args;if(params!==arguments){params=wrapInArray(params);} // 関数を実行。関数以外は無視。
isFunction(progressCallbacks[i])&&progressCallbacks[i].apply(this,params);}}return dfd;}dfd.notify=notify; /**
		 * jQueryの公式Doc(2013/6/4時点)だとnotifyWithの第2引数はObjectと書かれているが、
		 * 実際は配列で渡す(jQuery1.7+のnotifyWithと同じ。resolveWith, rejectWithも同じ)。
		 * notifyは可変長で受け取る(公式Docにはオブジェクトと書かれているが、resolve、rejectと同じ可変長)。
		 */dfd.notifyWith=function(context,args){ // 第2引数がない(falseに評価される)なら、引数は渡さずに呼ぶ
return !args?notify.apply(context):notify.apply(context,args);};} /**
	 * 引数に関数が含まれているか
	 *
	 * @private
	 * @param {Any} arg コールバック登録関数に渡され���引数
	 */function hasValidCallback(arg){if(!arg){return false;}arg=wrapInArray(arg);for(var i=0,l=arg.length;i<l;i++){if(isFunction(arg[i])){return true;}}return false;} /**
	 * 引数に指定されたpromiseまたはdeferredオブジェクトに対してコールバック登録関数をフックし、commonFailHandlerの機能を追加する。
	 * 既にフック済みのもの(prev)があればprevが持っているものに差し替える
	 *
	 * @private
	 * @param {Deferred|Promise} promise DeferredまたはPromise
	 * @param {Deferred} rootDfd 元のDeferred
	 *            既にフック済みのDeferredオブジェクト。第一引数がPromiseで、元のdeferredでフック済みならそっちのメソッドに差し替える
	 * @returns CFH機能を追加したDeferredまたはPromise
	 */function toCFHAware(promise,rootDfd){ // すでにtoCFHAware済みなら何もしないでpromiseを返す
if(promise._h5UnwrappedCall){return promise;} // progressを持っているか
var hasNativeProgress=!!promise.progress; // 引数がDeferredオブジェクト(!=プロミスオブジェクト)の場合、
// progress/notify/notifyWithがないなら追加。
// jQuery1.6.x でもprogress/notify/notifyWithを使えるようにする。
if(!hasNativeProgress&&!isPromise(promise)){addProgressFeatureForCompatibility(promise);}else if(rootDfd){ // rootDfdが指定されていればrootDfd.progressでpromise.progressを上書き
promise.progress=rootDfd.progress;} // failコールバックが1つ以上登録されたかどうかのフラグ
var existFailHandler=false; //commonFailHandlerが発火済みかどうかのフラグ
var isCommonFailHandlerFired=false; // ---------------------------------------------
// 以下書き換える(フックする)必要のある関数を書き換える
// ---------------------------------------------
// jQueryが持っているもともとのコールバック登録メソッドを保持するオブジェクト
var originalMethods={}; // フックしたメソッドを保持するオブジェクト
var hookMethods={}; /**
		 * 指定されたメソッドを、フックされたコールバック登録関数を元に戻してから呼ぶ
		 *
		 * @private
		 * @memberOf Deferred
		 * @param {String} method メソッド名
		 * @param {Array|Any} args メソッドに渡す引数。Arrayで複数渡せる。引数1つならそのまま渡せる。
		 * @returns メソッドの戻り値
		 */promise._h5UnwrappedCall=rootDfd?rootDfd._h5UnwrappedCall:function(method,args){args=wrapInArray(args); // originalに戻す
$.extend(promise,originalMethods); // originalに戻した状態でmethodを実行
var ret=promise[method].apply(this,args); // フックされたものに戻す
$.extend(promise,hookMethods);return ret;}; // commonFailHandlerのフラグ管理のために関数を上書きするための関数
function override(method){if(rootDfd){if(!rootDfd[method]){return;}promise[method]=rootDfd[method];return;}var originalFunc=promise[method];originalMethods[method]=originalFunc;promise[method]=function(_method){return function(){if(!existFailHandler){ // failコールバックが渡されたかどうかチェック
var failArgs=argsToArray(arguments);if(method==='then'||method==='pipe'){ // thenまたはpipeならargの第2引数を見る
failArgs=failArgs[1];}if(hasValidCallback(failArgs)){existFailHandler=true;}} // オリジナルのコールバック登録メソッドを呼ぶ
return promise._h5UnwrappedCall.call(this,method,argsToArray(arguments));};}(method);hookMethods[method]=promise[method];} // failコールバックを登録する可能性のある関数を上書き
for(var i=0,l=CFH_HOOK_METHODS.length;i<l;i++){var prop=CFH_HOOK_METHODS[i];if(promise[prop]){ // cfhの管理をするための関数でオーバーライド
override(prop);}} // pipeは戻り値が呼び出したpromise(またはdeferred)と違うので、
// そのdeferred/promiseが持つメソッドの上書きをして返す関数にする。
// jQuery1.6以下にない第3引数でのprogressコールバックの登録にも対応する。
// rootDfdがあればrootDfd.pipeを持たせてあるので何もしない。
if(promise.pipe&&!rootDfd){promise.pipe=function(){ // pipeを呼ぶとpipeに登録した関数がプロミスを返した時にfailハンドラが内部で登録され、
// そのプロミスについてのCommonFailHandlerが動作しなくなる (issue #250)
// (1.8以降の動作の場合thenも同じ)
// そのため、pipeはFW側で実装する
// 新しくDeferredを生成する
var newDeferred=h5.async.deferred(); // コールバックの登録
var fns=argsToArray(arguments);for(var i=0,l=PIPE_CREATE_METHODS.length;i<l;i++){var that=this;(function(fn,method,action){var isFunc=isFunction(fn); // 登録するコールバック
function callback() /* var_args */{if(!isFunc){ // 関数で無かった場合は、渡された引数を次のコールバックにそのまま渡す
newDeferred[action+'With'](this,arguments);return;}var ret=fn.apply(this,arguments);if(ret&&isFunction(ret.promise)){toCFHAware(ret); // コールバックが返したプロミスについてコールバックを登録する
ret.done(newDeferred.resolve); // _h5UnwrappedCallを使って、CFHの挙動を阻害しないようにfailハンドラを登録
ret._h5UnwrappedCall('fail',newDeferred.reject); // jQuery1.6以下でh5を使わずに生成されたプロミスならprogressはないので、
// progressメソッドがあるかチェックしてからprogressハンドラを登録
isFunction(ret.progress)&&ret.progress(newDeferred.notify);}else { // 戻り値はプロミスでなかった場合、戻り値を次のコールバックに渡す
newDeferred[action+'With'](this,[ret]);}} // コールバックを登録
// fnが関数でないかつmethodがfailの場合は、CFHの動作を阻害しないようにfailハンドラを登録するため、
// _h5UnwrappedCallを使う
if(!isFunc&&method==='fail'){that._h5UnwrappedCall(method,callback);}else {that[method](callback);}})(fns[i],PIPE_CREATE_METHODS[i],PIPE_CREATE_ACTIONS[i]);}return newDeferred.promise();};hookMethods.pipe=promise.pipe;} // thenは戻り値が呼び出したpromise(またはdeferred)と違う場合(jQuery1.8以降)、
// そのdeferred/promiseが持つメソッドの上書きをして返す関数にする
// jQuery1.6対応で、第3引数にprogressFilterが指定されていればそれを登録する
// rootDfdがあればrootDfd.thenを持たせてあるので何もしない
if(promise.then&&!rootDfd){var then=promise.then; // 1.8以降の場合 thenはpipeと同じで、別のdeferredに基づくpromiseを生成して返す(then===pipe)
promise.then=isThenReturnsNewPromise?promise.pipe:function() /* var_args */{ // 1.7以前の場合
// jQuery1.7以前は、thenを呼んだ時のthisが返ってくる(deferredから呼んだ場合はdeferredオブジェクトが返る)。
var args=arguments;var ret=then.apply(this,args); // 第3引数にprogressFilterが指定されていて、かつprogressメソッドがjQueryにない(1.6以前)場合
// promise.progressに登録する
if(!hasNativeProgress&&hasValidCallback(args[2])){promise.progress.call(promise,args[2]);} // そのままthis(=ret)を返す
return ret;};hookMethods.then=promise.then;} // reject/rejectWith
function createReject(rejectFunc){return function() /* var_args */{var commonFailHandler=h5.settings.commonFailHandler; // failコールバックが1つもない、かつcommonFailHandlerがある場合は、commonFailHandlerを登録する
if(!existFailHandler&&commonFailHandler&&!isCommonFailHandlerFired){promise.fail.call(this,commonFailHandler);isCommonFailHandlerFired=true;}return rejectFunc.apply(this,arguments);};} // reject
if(promise.reject){if(rootDfd&&rootDfd.reject){promise.reject=rootDfd.reject;}else {promise.reject=createReject(promise.reject);}} // rejectWith
if(promise.rejectWith){if(rootDfd&&rootDfd.rejectWith){promise.rejectWith=rootDfd.rejectWith;}else {promise.rejectWith=createReject(promise.rejectWith);}} // promise
if(promise.promise){if(rootDfd&&rootDfd.promise){promise.promise=rootDfd.promise;}else {var originalPromise=promise.promise;promise.promise=function() /* var_args */{ // toCFHAwareで上書く必要のある関数を上書いてから返す
return toCFHAware(originalPromise.apply(this,arguments),promise);};}}return promise;} // =========================================================================
//
// Body
//
// =========================================================================
/**
	 * 登録された共通のエラー処理(<a href="h5.settings.html#commonFailHandler">h5.settings.commonFailHandler</a>)を実行できるDeferredオブジェクトを返します。<br>
	 * Deferredに notify() / notifyWith() / progress() メソッドがない場合は、追加したオブジェクトを返します。
	 *
	 * @returns {Deferred} Deferredオブジェクト
	 * @name deferred
	 * @function
	 * @memberOf h5.async
	 */var deferred=function deferred(){var rawDfd=$.Deferred();return toCFHAware(rawDfd);}; /**
	 * オブジェクトがPromiseオブジェクトであるかどうかを返します。<br />
	 * オブジェクトがDeferredオブジェクトの場合、falseが返ります。
	 *
	 * @param {Object} object オブジェクト
	 * @returns {Boolean} オブジェクトがPromiseオブジェクトであるかどうか
	 * @name isPromise
	 * @function
	 * @memberOf h5.async
	 */var isPromise=function isPromise(object){return !!object&&object.done&&object.fail&&!object.resolve&&!object.reject;}; /**
	 * 指定された回数ごとにループを抜けブラウザに制御を戻すユーティリティメソッドです。<br>
	 * また、callbackで渡された関数が{Promise}を返した場合、その{Promise}が終了するまで次のループの実行を待機します。
	 *
	 * @param {Any[]} array 配列
	 * @param {Function} callback コールバック関数。<br />
	 *            コールバックには引数として現在のインデックス、現在の値、ループコントローラが渡されます。<br />
	 *            callback(index, value, loopControl) <br />
	 *            loopControlは以下の3つのメソッドを持っています。<br />
	 *            <ul>
	 *            <li>pause - 処理の途中でポーズをかけます。</li>
	 *            <li>resume - ポーズを解除し処理を再開します。</li>
	 *            <li>stop - 処理を中断します。1度stopで中断すると再開することはできません。</li>
	 *            </ul>
	 * @param {Number} [suspendOnTimes=20] 何回ごとにループを抜けるか。デフォルトは20回です。
	 * @returns {Promise} Promiseオブジェクト
	 * @name loop
	 * @function
	 * @memberOf h5.async
	 */var loop=function loop(array,callback,suspendOnTimes){if(!isArray(array)){throwFwError(ERR_CODE_NOT_ARRAY);}var dfd=deferred(); // 何回ごとにループを抜けるか。デフォルトは20回
var st=$.type(suspendOnTimes)==='number'?suspendOnTimes:20;var index=0;var len=array.length;var execute,loopControl=null;var each=function each(){if(index===len){dfd.resolve(array);return;}var ret=callback.call(array,index,array[index],loopControl);index++;if(isPromise(ret)){ret.done(function(){execute();}).fail(function(){dfd.reject(array);});}else {execute();}};var async=function async(){setTimeout(function(){var i=index-1;if(index>0){dfd.notify({data:array,index:i,value:array[i]});}each();},0);};var _pause=false;execute=function execute(){if(_pause){return;}index%st===0?async():each();};var stopFlag=false;loopControl={resume:function resume(){if(!stopFlag&&_pause){_pause=false;execute();}},pause:function pause(){_pause=true;},stop:function stop(){stopFlag=true;dfd.resolve(array);}};async();return dfd.promise();}; /**
	 * 引数に指定した１つ以上のPromiseオブジェクトに基づいて、コールバックメソッドを実行します。
	 * <p>
	 * 引数に指定されたPromiseオブジェクトの挙動によって、以下のような処理を実行します。<br>
	 * <ul>
	 * <li>引数に指定されたPromiseオブジェクトのうち、１つでもreject()が実行されると、failコールバックを実行します。</li>
	 * <li>引数に指定されたすべてのPromiseオブジェクトの全てでresolve()が実行されると、doneコールバックを実行します。</li>
	 * <li>引数に指定されたPromiseオブジェクトでnotify()が実行されると、progressコールバックを実行します。</li>
	 * </ul>
	 * 本メソッドはjQuery.when()と同様の機能を持っており、同じように使うことができます。<br>
	 * ただし、以下のような違いがあります。
	 * <h4>jQuery.when()と相違点</h4>
	 * <ul>
	 * <li>failコールバックが未指定の場合、共通のエラー処理(<a
	 * href="./h5.settings.html#commonFailHandler">commonFailHandler</a>)を実行します。(※
	 * whenに渡したpromiseについてのcommonFailHandlerは動作しなくなります。)</li>
	 * <li>jQuery1.6.xを使用している場合、jQuery.when()では使用できないnotify/progressの機能を使用することができます。ただし、この機能を使用するには<a
	 * href="h5.async.html#deferred">h5.async.deferred()</a>によって生成されたDeferredのPromiseオブジェクトを引数に指定する必要があります。<br>
	 * </li>
	 * <li>引数の指定方法について、jQuery.when()は可変長のみなのに対し、本メソッドは可変長またはPromiseオブジェクトを持つ配列で指定することができます。</li>
	 * </ul>
	 * <h4>引数の指定方法</h4>
	 * 配列または可変長で、複数のPromiseオブジェクトを渡すことができます。<br>
	 * 例)
	 * <ul>
	 * <li>h5.async.when(p1, p2, p3); </li>
	 * <li>h5.async.when([p1, p2, p3]); </li>
	 * </ul>
	 * Promiseオブジェクト以外を渡した時は無視されます。<br>
	 * また、可変長と配列の組み合わせで指定することはできません。<br>
	 * <ul>
	 * <li>h5.async.when(p1, [p2, p3], p4);</li>
	 * </ul>
	 * のようなコードを書いた時、2番目の引数は「配列」であり「Promise」ではないので無視され、p1とp4のみ待ちます。<br>
	 * <br>
	 * また、配列が入れ子になっていても、再帰的に評価はしません。<br>
	 * <ul>
	 * <li>h5.async.when([pi, [p2, p3], p4])</li>
	 * </ul>
	 * と書いても、先の例と同様p1とp4のみ待ちます。
	 *
	 * @param {Promise} var_args Promiseオブジェクﾄ(可変長または配列で複数のPromiseを指定する)
	 * @returns {Promise} Promiseオブジェクト
	 * @name when
	 * @function
	 * @memberOf h5.async
	 */var when=function when() /* var_args */{var args=argsToArray(arguments);if(args.length===1&&isArray(args[0])){args=args[0];}var len=args.length; /* del begin */ // 引数にpromise・deferredオブジェクト以外があった場合はログを出力します。
for(var i=0;i<len;i++){ // DeferredもPromiseも、promiseメソッドを持つので、
// promiseメソッドがあるかどうかでDeferred/Promiseの両方を判定しています。
if(!args[i]||!(args[i].promise&&isFunction(args[i].promise))){fwLogger.info(FW_LOG_H5_WHEN_INVALID_PARAMETER);break;}} /* del end */ // $.when相当の機能を実装する。
// 引数が一つでそれがプロミスだった場合は$.whenはそれをそのまま返しているが、
// h5.async.whenではCFHAwareでprogressメソッドを持つpromiseを返す必要があるため、
// 引数がいくつであろうと、新しくCFHAwareなdeferredオブジェクトを生成してそのpromiseを返す。
var dfd=h5.async.deferred();var whenPromise=dfd.promise(); // $.whenを呼び出して、dfdと紐づける
var jqWhenRet=$.when.apply($,args).done(function() /* var_args */{ // jQuery1.7以下では、thisが$.whenの戻り値の元のdeferredになる。
// (resolveWithで呼んでも同様。指定したコンテキストは無視される。)
// そうなっていたら、thisを$.when���紐づいたdeferredではなく、h5.async.whenのdeferredに差し替える
dfd.resolveWith(this&&this.promise&&this.promise()===jqWhenRet?dfd:this,argsToArray(arguments));}).fail(function() /* var_args */{dfd.rejectWith(this,argsToArray(arguments));}); // progressがある(jQuery1.7以降)ならそのままprogressも登録
if(jqWhenRet.progress){jqWhenRet.progress(function() /* ver_args */{ // jQuery1.7では、thisが$.whenの戻り値と同じインスタンス(プロミス)になる。
// (notifyWithで呼んでも同様。指定したコンテキストは無視される。)
// thisが$.whenの戻り値なら、h5.async.whenの戻り値のプロミスに差し替える
dfd.notifyWith(this===jqWhenRet?whenPromise:this,argsToArray(arguments));});}else {var progressFunc=function progressFunc(index){ // args中の該当するindexに値を格納した配列をprogressコールバックに渡す
return function(value){pValues[index]=arguments.length>1?argsToArray(arguments):value; // jQuery1.6では、jQuery1.7と同様の動作をするようにする。
// thisはh5.async.whenの戻り値と同じ。
dfd.notifyWith(whenPromise,pValues);};}; // progressがない(=jQuery1.6.x)なら、progress機能を追加
// progressの引数になる配列。
// pValuesにはあらかじめundefinedを入れておく($.whenと同じ。progressフィルタ内のarguments.lengthは常にargs.lengthと同じ)
var pValues=[];for(var i=0;i<len;i++){pValues[i]=undefined;}for(var i=0;i<len;i++){var p=args[i]; // progressはjQuery1.6で作られたdeferred/promiseだとないので、あるかどうかチェックして呼び出す
if(p&&isFunction(p.promise)&&p.progress){if(len>1){p.progress(progressFunc(i));}else { // 引数が1つなら、notifyで渡された引数は配列化せず、そのままwhenのprogressへスルーさせる
p.progress(function() /* var_args */{ // thisはh5.async.whenの戻り値と同じ。
dfd.notifyWith(whenPromise,argsToArray(arguments));});}}}}return whenPromise;}; // =============================
// Expose to window
// =============================
/**
	 * @namespace
	 * @name async
	 * @memberOf h5
	 */h5.u.obj.expose('h5.async',{deferred:deferred,when:when,isPromise:isPromise,loop:loop});})(); /* ------ h5.ajax ------ */(function(){ // =========================================================================
//
// Constants
//
// =========================================================================
// =============================
// Production
// =============================
// =============================
// Development Only
// =============================
/* del begin */ /* del end */ // =========================================================================
//
// Cache
//
// =========================================================================
// =========================================================================
//
// Privates
//
// =========================================================================
// =============================
// Variables
// =============================
/**
	 * jqXHRからJqXHRWrapperにコピーしないプロパティ jqXHRのメソッドで非推奨であるもの。(deferredにないもの)
	 *
	 * @type {Array}
	 */var DEPRECATED_METHODS=['error','success','complete']; /**
	 * ajaxの引数のオブジェクトでコールバックが記述されるプロパティ<br>
	 * コールバックの実行されるタイミング順に記述(completeが一番遅いタイミングで実行されるので最後)
	 *
	 * @type {Array}
	 */var CALLBACK_REGISTER_DELEGATE_METHODS=['error','success','complete']; /**
	 * コールバック指定プロパティと、コールバック登録関数を対応させるオブジェクト
	 * <p>
	 * settingsに指定されたコールバックはdone,fail,alwaysで登録させる。<br>
	 * success -> done, error -> fail, complete -> always にそれぞれ対応。<br>
	 * (success,error,completeメソッドはjQuery1.8で非推奨になったため)。
	 * </p>
	 *
	 * @type Object
	 */var PROP_TO_METHOD_MAP={success:'done',error:'fail',complete:'always'}; // =============================
// Functions
// =============================
/**
	 * ajaxの引数に指定されたコールバックを指定するプロパティを外して、deferredに登録する
	 *
	 * @private
	 * @param {Object} settings ajaxに渡すオブジェクト
	 * @param {Deferred} dfd
	 */function delegateCallbackProperties(settings,dfd){for(var i=0,l=CALLBACK_REGISTER_DELEGATE_METHODS.length;i<l;i++){var prop=CALLBACK_REGISTER_DELEGATE_METHODS[i];if(settings[prop]){dfd[PROP_TO_METHOD_MAP[prop]](settings[prop]);settings[prop]=undefined;}}} /**
	 * jqXHRのプロパティをjqXHRWrapperにコピーする
	 * <p>
	 * includeFunction==trueなら関数プロパティはコピーしない。promiseからコピーする関数及び非推奨な関数はコピーしない。
	 * </p>
	 *
	 * @private
	 * @param {JqXHRWrapper} jqXHRWrapper
	 * @param {Object} jqXHR コピー元のjqXHR
	 * @param {Boolean} includeFunction 関数プロパティをコピーするかどうか(trueならコピー)
	 * @param {Promise} promise promiseが持つプロパティはコピーしない
	 */function copyJqXHRProperties(jqXHRWrapper,jqXHR,includeFunction){ // jqXHRの中身をコピー
// 関数プロパティならapplyでオリジナルのjqXHRの関数を呼ぶ関数にする
for(var prop in jqXHR){ // includeFunction=falseの場合は関数はコピーしない。
// includeFunction=trueの場合、
// 非推奨なプロパティ以外をコピー
if(jqXHR.hasOwnProperty(prop)&&(includeFunction||!isFunction(jqXHR[prop]))&&$.inArray(prop,DEPRECATED_METHODS)===-1){ // 値をコピー
jqXHRWrapper[prop]=jqXHR[prop];}}} // =========================================================================
//
// Body
//
// =========================================================================
/**
	 * jqXHRWrapper
	 * <p>
	 * このクラスは自分でnewすることはありません。 h5.ajax()の戻り値がこのクラスです。
	 * jqXHRをラップしているクラスで、jqXHRのメソッド、プロパティを使用することができます。
	 * </p>
	 * <p>jqXHRについての詳細は{@link http://api.jquery.com/jQuery.ajax/|jQuery.ajax() | jQuery API Documentation}をご覧ください。
	 * </p>
	 * <p>
	 * <strong>注意：</strong>jqXHRオブジェクトと違い、success, error, complete メソッドはありません(非推奨であるため)。 それぞれ、done,
	 * fail, always を使用して下さい。
	 * </p>
	 *
	 * @class
	 * @name JqXHRWrapper
	 */ /**
	 * @private
	 * @param jqXHR
	 * @param dfd
	 */function JqXHRWrapper(jqXHR,dfd){ // オリジナルのjqXHRから値をコピー
copyJqXHRProperties(this,jqXHR,true); // jqXHRWrapperをpromise化する
// (jqXHRのdoneやfailは使用しない。promise化で上書かれる。)
dfd.promise(this); // alwaysをオーバーライド
// jQuery1.7.0のバグ(alwaysがjqXHRではなくpromiseを返すバグ)の対応
// http://bugs.jquery.com/ticket/10723  "JQXHR.ALWAYS() RETURNS A PROMISE INSTEAD OF A JQXHR OBJECT"
var originalAlways=this.always;this.always=function() /* var_args */{originalAlways.apply(this,arguments);return this;};} /**
	 * HTTP通信を行います。
	 * <p>
	 * 基本的な使い方は、<a href="http://api.jquery.com/jQuery.ajax/">jQuery.ajax()</a>と同じです。戻り値はjqXHRをラップした
	 * <a href="JqXHRWrapper.html">JqXHRWrapper</a>クラスです。
	 * <p>
	 * <p>
	 * jQuery.ajax()と異なる点は共通のエラーハンドラが定義できることと、リトライオプションを指定できることです。
	 * </p>
	 * <br>
	 * <h3>共通のエラーハンドラ</h3>
	 * <p>
	 * <a href="h5.settings.html#commonFailHandler">h5.settings.commonFailHandler</a>に関数が設定されている場合、
	 * エラーコールバックが登録されないままajaxが失敗すると、h5.settings.commonFailHandlerに設定した関数が呼ばれます。
	 * </p>
	 * <br>
	 * <h3>リトライオプション</h3>
	 * <p>
	 * <a href="h5.settings.html#ajax">h5.settings.ajax</a>でリトライをする設定がしてあれば、リトライを行います(デフォルトはリトライを行わない)。<br>
	 * また、引数からもリトライの設定を指定することができ、h5.settings.ajaxの設定よりも優先します。
	 * </p>
	 * <code><pre>
	 * h5.ajax({
	 * 	url: 'hoge',
	 * 	cache: false		// jQuery.ajaxのオプション
	 * 	retryCount: 3,		// h5.ajaxで追加しているオプション。リトライ回数。
	 * 	retryInterval: 200	// h5.ajaxで追加しているオプション。リトライ間のインターバル。
	 * 	retryFilter: function()		// h5.ajaxで追加しているオプション。リトライ毎に実行される関数。
	 * });
	 * </pre></code>
	 * <p>
	 * リトライ回数の設定してある場合は、リトライ途中で通信に成功した場合はdoneコールバックが、 リトライ回数回リトライしても失敗した場合はfailコールバックが呼ばれます。
	 * </p>
	 * <p>
	 * 同期(async:false)で呼んだ時は、retryIntervalの値に関わらず即座に同期でリトライを行います。ajax通信結果は同期で返ってきます。
	 * </p>
	 *
	 * @param {Any} var_args jQuery.ajaxに渡す引数
	 * @returns {JqXHRWrapper} jqXHRWrapperオブジェクト
	 * @name ajax
	 * @function
	 * @memberOf h5
	 */function ajax() /* var_args */{ // $.ajax(settings)での呼び出しに統一する。
var settings={};var args=arguments;if(isString(args[0])){ // ajax(url,[settings]) での呼び出しなら、settings.urlを追加する。
$.extend(settings,args[1]); // 第1引数のurlがsettings.urlより優先される($.ajaxと同じ)
settings.url=args[0];}else { // 第一引数がurlでないならsettingsにsettingsをクローン
$.extend(settings,args[0]);} // h5.settings.ajaxとマージ
settings=$.extend({},h5.settings.ajax,settings); // deferredオブジェクトの作成
var dfd=h5.async.deferred(); // settingsに指定されたコールバックを外して、deferredに登録する
delegateCallbackProperties(settings,dfd); // $.ajaxの呼び出し。jqXHRを取得してjqXHRWrapperを作成。
var jqXHR=$.ajax(settings); // jqXHRWrapperの作成
var jqXHRWrapper=new JqXHRWrapper(jqXHR,dfd); /**
		 * リトライ時のdoneハンドラ。 成功時はリトライせずにresolveして終了
		 */function retryDone(_data,_textStatus,_jqXHR){ // jqXHRのプロパティの値をラッパーにコピーする
// ラッパーは最終的なjqXHRの値を持てばいいので、resolveを呼ぶ直前で新しいjqXHRの値に変更する
copyJqXHRProperties(jqXHRWrapper,_jqXHR);dfd.resolveWith(this,arguments);} /**
		 * リトライ時のfailハンドラ。 ステータスコードを見て、リトライするかどうかを決める。 リトライしないなら、dfd.reject()を呼んで終了。
		 */function retryFail(_jqXHR,_textStatus,_errorThrown){if(settings.retryCount===0||settings.retryFilter.apply(this,arguments)===false){ // retryFilterがfalseを返した、
// またはこれが最後のリトライ、
// またはリトライ指定のない場合、
// rejectして終了
// jqXHRのプロパティの値をラッパーにコピー
// ラッパーは最終的なjqXHRの値を持てばいいので、rejectを呼ぶ直前で新しいjqXHRの値に変更する
copyJqXHRProperties(jqXHRWrapper,_jqXHR);dfd.rejectWith(this,arguments);return;}settings.retryCount--;if(this.async){ // 非同期ならretryIntervalミリ秒待機してリトライ
var that=this;setTimeout(function(){$.ajax(that).done(retryDone).fail(retryFail);},settings.retryInterval);}else { // 同期なら即リトライする
// (同期で呼ばれたらリトライ指定があっても同期になるようにするためretryIntervalは無視する)
$.ajax(this).done(retryDone).fail(retryFail);}} // コールバックを登録
jqXHR.done(retryDone).fail(retryFail); // 戻り値はjqXHRをラップしたjqXHRWrapperオブジェクト
return jqXHRWrapper;} // =============================
// Expose to window
// =============================
h5.u.obj.expose('h5',{ajax:ajax});})(); /* ------ h5.res ------ */(function(){ // =========================================================================
//
// Constants
//
// =========================================================================
// =============================
// Production
// =============================
/**
	 * リソースファイルの取得時に発生するエラー
	 */var ERR_CODE_RESOURCE_AJAX=17000; /**
	 * タイムアウト時のエラー
	 */var ERR_CODE_RESOLVE_TIMEOUT=17001; // ---------- EJSResolverのエラー ----------
/** テンプレートファイルの内容読み込み時に発生するエラー */var ERR_CODE_TEMPLATE_FILE_NO_TEMPLATE=7001; /** テンプレートIDが不正である時に発生するエラー */var ERR_CODE_TEMPLATE_INVALID_ID=7002; /** テンプレートファイルの取得時に発生するエラー */var ERR_CODE_TEMPLATE_AJAX=7003; /** テンプレートファイルにscriptタグ以外の記述がある */var ERR_CODE_TEMPLATE_FILE_INVALID_ELEMENT=7011; // =============================
// Development Only
// =============================
var fwLogger=h5.log.createLogger('h5.res'); /* del begin */ /**
	 * 各エラーコードに対応するメッセージ
	 */var errMsgMap={};errMsgMap[ERR_CODE_RESOURCE_AJAX]='リソースファイルを取得できませんでした。ステータスコード:{0}, URL:{1}'; // EJSResolverのエラー
errMsgMap[ERR_CODE_TEMPLATE_FILE_NO_TEMPLATE]='テンプレートファイルに<script>タグの記述がありません。テンプレートファイルは全て<script>タグで囲んだテンプレートを記述してください';errMsgMap[ERR_CODE_TEMPLATE_INVALID_ID]='テンプレートIDが指定されていません。空や空白でない文字列で指定してください。';errMsgMap[ERR_CODE_TEMPLATE_AJAX]='テンプレートファイルを取得できませんでした。ステータスコード:{0}, URL:{1}';errMsgMap[ERR_CODE_TEMPLATE_FILE_INVALID_ELEMENT]='テンプレートファイルに<script>タグ以外の記述があります。テンプレートファイルは全て<script>タグで囲んだテンプレートを記述してください';errMsgMap[ERR_CODE_RESOLVE_TIMEOUT]='リソースキー"{0}"の解決がタイムアウトしました'; // メッセージの登録
addFwErrorCodeMap(errMsgMap); /* del end */ // =========================================================================
//
// Cache
//
// =========================================================================
var getDeferred=h5.async.deferred; // =========================================================================
//
// Privates
//
// =========================================================================
// =============================
// Variables
// =============================
/** リゾルバのリスト保持する配列 */var resolvers=[]; /** リソースキーをキーに、解決済コンポーネントを持つマップ */var componentMap={}; /** registerされるのを待っているDeferredのマップ */var waitingInfoMap={}; /** setImmediateでresolve処理を待っているdeferredの配列 */var waitingForImmediateDeferred=[]; /** 非同期でresolveするのを待機するタイマーID(タイマーを複数作成しないようにするため) */var waitingImmediateTimer=null; /**
	 * ViewTemplateクラス
	 */function ViewTemplate(id,content){this.id=id;this.content=content;} /**
	 * ResourceCacheクラス
	 */function ResourceCache(url,path,content){this.url=url;this.path=path;this.content=content;} /**
	 * リソースのキャッシュ機構
	 * <p>
	 * リソースをURL毎にキャッシュします。キャッシュ済みのものはそれを返し、そうでないものは新たにキャッシュして返します
	 * </p>
	 *
	 * @private
	 */var cacheManager={ /**
		 * キャッシュの最大数
		 */MAX_CACHE:10, /**
		 * URLと���ソースを格納するキャッシュ
		 */cache:{}, /**
		 * 現在キャッシュしているURLを保持する配列。もっとも使用されていないURLが配列の先頭にくるようソートされています。(LRU)
		 */cacheUrls:[], /**
		 * 現在アクセス中のURL(絶対パス)をkeyにして、そのpromiseオブジェクトを持つ連想配列
		 */accessingUrls:{}, /**
		 * リソースをキャッシュします。
		 *
		 * @param {ResourceCache} resource ResourceCacheインスタンス
		 */append:function append(resource){if(this.cacheUrls.length>=this.MAX_CACHE){this.clearCache(this.cacheUrls[0]);}var url=resource.url;this.cache[url]=resource;this.cacheUrls.push(url);}, /**
		 * 指定されたパスのキャッシュを削除します。
		 *
		 * @param {String} path ファイルパス
		 * @param {Boolean} isOnlyUrls trueを指定された場合、キャッシュは消さずに、キャッシュしているURLリストから引数に指定されたURLを削除します。
		 */clearCache:function clearCache(path,isOnlyUrls){var url=toAbsoluteUrl(path);if(!isOnlyUrls){delete this.cache[url];}for(var i=0,len=this.cacheUrls.length;i<len;i++){if(this.cacheUrls[i]===url){this.cacheUrls.splice(i,1);break;}}}, /**
		 * キャッシュを全て削除します
		 */clearAllCache:function clearAllCache(){this.cacheUrls=[];this.cache={};}, /**
		 * キャッシュからリソースを取得
		 *
		 * @param {String} url ファイルの絶対パス
		 */getResourceFromCache:function getResourceFromCache(url){var ret=this.cache[url];this.clearCache(url,true);this.cacheUrls.push(url);return ret;}, /**
		 * urlからリソースを取得。プロミスを返し、ResourceCacheをハンドラに渡す
		 *
		 * @param {String} path
		 * @returns {Promise}
		 */loadResourceFromPath:function loadResourceFromPath(path){var absolutePath=toAbsoluteUrl(path); // 現在アクセス中のURLであれば、そのpromiseを返す
if(this.accessingUrls[absolutePath]){return this.accessingUrls[absolutePath];}var df=getDeferred();var promise=df.promise();this.accessingUrls[absolutePath]=promise;var manager=this;h5.ajax(path,{dataType:'text'}).done(function(result,statusText,obj){ // アクセス中のURLのプロミスを保持するaccessingUrlsから、このURLのプロミスを削除する
delete manager.accessingUrls[absolutePath]; // ResourceCacheオブジェクトを作成してキャッシュに登録
var resource=new ResourceCache(absolutePath,path,obj.responseText);manager.append(resource);df.resolve(resource);}).fail(function(e){ // アクセス中のURLのプロミスを保持するaccessingUrlsから、このURLのプロミスを削除する
delete manager.accessingUrls[absolutePath];df.reject(createRejectReason(ERR_CODE_RESOURCE_AJAX,[e.status,absolutePath],{url:absolutePath,path:path,error:e}));return;});return promise;}}; /**
	 * キャッシュ機構を使用してURLへアクセスします
	 *
	 * @private
	 */var urlLoader={ /**
		 * 指定されたテンプレートパスからテンプレートを非同期で読み込みます。 テンプレートパスがキャッシュに存在する場合はキャッシュから読み込みます。
		 *
		 * @private
		 * @param {String} resourcePath リソースパス
		 * @returns {Object} Promiseオブジェクト
		 */load:function load(resourcePath){var absolutePath=toAbsoluteUrl(resourcePath); // キャッシュにある場合
if(cacheManager.cache[absolutePath]){ // キャッシュから取得したリソースを返す
// 新しくDeferredを作ってプロミスを返す
return getDeferred().resolve(cacheManager.getResourceFromCache(absolutePath)).promise();} // キャッシュにない場合
// urlからロードして、そのプロミスを返す
return cacheManager.loadResourceFromPath(resourcePath);}, /**
		 * URL(path)を指定してキャッシュをクリアする
		 *
		 * @param {String} path
		 */clearCache:function clearCache(path){cacheManager.clearCache(path);}, /**
		 * URLキャッシュをすべてクリアする
		 */clearAllCache:function clearAllCache(){cacheManager.clearAllCache();}}; // =============================
// Functions
// =============================
/**
	 * Dependencyクラス
	 * <p>
	 * <a href="h5.res.html#reequire">h5.res.dependsOn()</a>がこのクラスのインスタンスを返します。
	 * </p>
	 *
	 * @class
	 * @name Dependency
	 * @param {String} resourceKey
	 */function Dependency(resourceKey){this._resourceKey=resourceKey; // TODO プロミスのインターフェイスを持つ必要ある…？あるならコメントアウトを外す
// var dfd = getDeferred();
// dfd.promise(this);
}$.extend(Dependency.prototype,{ /**
		 * resourceKeyに基づいて依存関係を解決します
		 * <p>
		 * 登録されているリゾルバでresolveできないリソースキーの場合はfalseを返します
		 * </p>
		 * <p>
		 * 第1引数にリゾルバのタイプを指定した場合、登録されているリゾルバから同一タイプのものを探して、そのリゾルバを使って解決します。
		 * </p>
		 * <p>
		 * 第1引数を省略した場合は、リソースキーから使用するリゾルバを決定します。
		 * </p>
		 *
		 * @memberOf Dependency
		 * @param {String} [type] リゾルバタイプ
		 * @returns {Promise} 依存関係の解決を待機するプロミスオブジェクト
		 */resolve:function resolve(type){ // リゾルバを特定する
function resolveInner(resourceKey){for(var i=0,l=resolvers.length;i<l;i++){if(type&&type!==resolvers[i].type){ // typeが指定されている場合はtypeと一致するかどうか見る
continue;} // typeが指定されていない場合は条件とマッチするか判定
var test=resolvers[i].test;if(!type&&test){if($.type(test)==='regexp'){if(!test.test(resourceKey)){continue;}}else {if(test(resourceKey)===false){continue;}}} // リゾルバを実行
return resolvers[i].resolver(resourceKey,type);} // false以外のものを返すリゾルバが無かった場合はfalseを返す
return false;}if(!isArray(this._resourceKey)){ // リソースキーが配列でない場合
return resolveInner(this._resourceKey);} // リソースキーが配列の場合
var resourceKeys=this._resourceKey;var promises=[];for(var i=0,l=resourceKeys.length;i<l;i++){var resourceKey=resourceKeys[i];var ret=resolveInner(resourceKey);promises.push(ret);}var dfd=h5.async.deferred();waitForPromises(promises,function(results){ // 結果の配列、1番目の結果、2番目の結果、…となるように引数を生成
if(!isArray(results)){ // 結果が配列でない場合(=リソースキーが長さ１の配列の場合)、配列にする
results=[results];}results.unshift(results.slice(0));dfd.resolveWith(dfd,results);},function(e){dfd.reject(e);});return dfd.promise();}, /**
		 * 指定されたリソースキーを返します
		 *
		 * @memberOf Dependency
		 * @returns {String} リソースキー
		 */getKey:function getKey(){return this._resourceKey;}}); /**
	 * カレントを考慮したファイルパスの取得
	 *
	 * @private
	 * @param {String} filePath
	 * @returns {String}
	 */function getFilePath(filePath){var baseUrl=h5.settings.res.baseUrl;if(filePath===toAbsoluteUrl(filePath)||filePath.indexOf('/')===0){ // filePathが絶対パスの場合、または、'/'始まりの場合は、filePathをそのまま返す
return filePath;}if(!baseUrl){ // baseUrlが指定されていないなら'./'を付けて返す
if(filePath.indexOf('./')===0){return filePath;}return './'+filePath;} // 上位パス指定('../')を取り除いて、baseUrlの上位をたどる
function removeAbovePath(base,path){if(path.indexOf('../')!==0){return base+path;}path=path.slice(3);base=base.replace(/[^\/]+?\/$/,'');return removeAbovePath(base,path);} // baseUrlを'/'終わりにして、上位パス指定の計算
if(!h5.u.str.endsWith(baseUrl,'/')){baseUrl+='/';}return removeAbovePath(baseUrl,filePath);} /**
	 * 名前空間からjsファイルをロードするリゾルバ
	 *
	 * @private
	 * @param {String} resourceKey
	 * @returns {Promise} 解決した名前空間オブジェクトをresolveで渡します
	 */function resolveNamespace(resourceKey){var ret=componentMap[resourceKey]||h5.u.obj.getByPath(resourceKey);if(ret){ // 既に解決済みの場合はresolve済みのプロミスを返す
return getDeferred().resolve(ret).promise();} // 現在解決待ちのリソースキーであれば、それを返す
if(waitingInfoMap[resourceKey]){return waitingInfoMap[resourceKey].deferred.promise();} // "."を"/"に変えてファイルパスを取得
var filePath=getFilePath(resourceKey.replace(/\./g,'/'))+'.js';var dfd=getDeferred(); // タイムアウト設定
var resolveTimeout=h5.settings.res.resolveTimeout;var timer=null;if(resolveTimeout>0){timer=setTimeout(function(){if(waitingInfoMap[resourceKey]){delete waitingInfoMap[resourceKey];dfd.reject(createRejectReason(ERR_CODE_RESOLVE_TIMEOUT,[resourceKey]));}},resolveTimeout);} // registerされるのを待つ
waitingInfoMap[resourceKey]={deferred:dfd,timer:timer};var dep=this;h5.u.loadScript(filePath).done(function(){var ret=componentMap[resourceKey]||h5.u.obj.getByPath(resourceKey);if(ret&&waitingInfoMap[resourceKey]){componentMap[resourceKey]=ret;delete waitingInfoMap[resourceKey];clearTimeout(timer);dfd.resolve(ret);return;}}).fail(function(errorObj){ // loadScriptのエラー
clearTimeout(timer);delete waitingInfoMap[resourceKey];dfd.reject(errorObj);});return dfd.promise();} /**
	 * ejsファイルリゾルバ
	 *
	 * @private
	 * @param {String} resourceKey
	 * @returns {Promise} 以下のようなオブジェクトをresolveで返します
	 *
	 * <pre><code>
	 * {
	 *  path: ロードしたファイルのパス,
	 * 	url: ロードしたファイルのURL(絶対パス),
	 * 	templates: [{id: テンプレートID, content: テンプレートの中身}, ...]
	 * }
	 * </code></pre>
	 */function resolveEJSTemplate(resourceKey){var dfd=getDeferred();urlLoader.load(getFilePath(resourceKey)).done(function(resource){ // コンテンツからscript要素を取得
var $elements=$(resource.content).filter(function(){ // IE8以下で、要素内にSCRIPTタグが含まれていると、jQueryが&lt;/SCRIPT&gt;をunknownElementとして扱ってしまう。
// nodeTypeを見てコメントノードも除去して、tagNameが'/SCRIPT'のものも除去する。
return this.nodeType===1&&this.tagName.indexOf('/')!==0;});var textResources=[];if($elements.not('script[type="text/ejs"]').length>0){ // テンプレート記述以外のタグがあ場合はエラー
dfd.reject(createRejectReason(ERR_CODE_TEMPLATE_FILE_INVALID_ELEMENT,null,{url:resource.url,path:resource.path}));return;}if($elements.length===0){ // テンプレート記述が一つもない場合はエラー
dfd.reject(createRejectReason(ERR_CODE_TEMPLATE_FILE_NO_TEMPLATE,null,{url:resource.url,path:resource.path}));} // script要素からViewTemplateを作成
$elements.each(function(){var id=$.trim(this.id);if(!id){dfd.reject(createRejectReason(ERR_CODE_TEMPLATE_INVALID_ID,null,{url:resource.url,path:resource.path}));}var content=$.trim(this.innerHTML);textResources.push(new ViewTemplate(id,content));}); // resolveする
dfd.resolve({url:resource.url,path:resource.path,templates:textResources});}).fail(function(errorObj){ // リソースの取得に失敗
// ここにくるエラーオブジェクトはgetResource()のエラーなので、
// テンプレートのロードが投げるエラー(Viewのエラー)にする
// インスタンスは変更しないようにする
var detail=errorObj.detail;var viewErrorObj=createRejectReason(ERR_CODE_TEMPLATE_AJAX,[detail.error.status,detail.url],detail);errorObj.code=viewErrorObj.code;errorObj.message=viewErrorObj.message;errorObj.detail=errorObj.detail;dfd.reject(errorObj);});return dfd.promise();} /**
	 * jsファイルのデフォルトのリゾルバを作成する
	 *
	 * @private
	 * @param {String} resourceKey
	 * @returns {Function} Viewリゾルバ
	 */function resolveJs(resourceKey){ // loadScriptでロードする
return h5.u.loadScript(getFilePath(resourceKey));} /**
	 * cssファイルのデフォルトのリゾルバを作成する
	 *
	 * @private
	 * @param {String} resoruceKey
	 * @param {String} type
	 * @returns {Function} Viewリゾルバ
	 */function resolveCss(resourceKey){var head=document.getElementsByTagName('head')[0];var cssNode=document.createElement('link');cssNode.type='text/css';cssNode.rel='stylesheet';cssNode.href=getFilePath(resourceKey);head.appendChild(cssNode); // 同期でresolve
// TODO cssのロードを待機する必要ある…？
return getDeferred().resolve(cssNode).promise();} /**
	 * リゾルバを追加します
	 *
	 * @private
	 * @param {String} type リゾルバのタイプ。リゾルバをタイプと紐づける。nullを指定した場合はtypeに紐づかないリゾルバを登録します。
	 * @param {RegExp|Function} test リソースキーがこのリゾルバにマッチするかどうかの正規表現、または関数
	 * @param {Function} resolver リゾルバ
	 */function addResolver(type,test,resolver){if(resolver===undefined&&isFunction(type)){ // 第1引数に関数が指定されていて第2引数の指定がない場合はtype指定無しのリゾルバとみなす
// TODO とりあえずの実装です。引数の指定方法、引数チェック等、詳細仕様が決まり次第実装します。
resolver=type;type=undefined;} // 先頭に追加する
resolvers.unshift({type:type,test:test,resolver:resolver});} // =========================================================================
//
// Body
//
// =========================================================================
/**
	 * 引数がDependencyクラスかどうか判定
	 *
	 * @memberOf h5.res
	 * @param {Any} obj
	 * @returns {Boolean} Dependencyクラスかどうか
	 */function isDependency(obj){return obj instanceof Dependency;} /**
	 * リソースキーから、Dependencyオブジェクトを返します
	 *
	 * @memberOf h5.res
	 * @param {String} resourceKey
	 * @returns {Dependency}
	 */function dependsOn(resourceKey){return new Dependency(resourceKey);} /**
	 * 指定されたリソースキーの解決を行います
	 *
	 * @memberOf h5.res
	 * @param {String|Array} resourceKey
	 * @returns {Promise}
	 */function get(resourceKey){return h5.res.dependsOn(resourceKey).resolve();} /**
	 * リソースの登録
	 *
	 * @memberOf h5.res
	 * @param {String} key
	 * @param {Any} value
	 * @param {Boolean} [exposeToGlobal=false] グローバルに公開するか
	 * @param {String} [exposureName=null] グローバル公開名
	 */function register(key,value,exposeToGlobal,exposureName){if(exposeToGlobal){if(exposureName){h5.u.obj.expose(exposureName,value);}else {h5.u.obj.expose(key,value);}} // コンポーネントマップに登録
componentMap[key]=value; // このリソースキーに紐づくdeferredが既に解決済み(waitingInfoから削除済み)なら何もしない
var waitingInfo=waitingInfoMap[key];if(!waitingInfo){return;}delete waitingInfoMap[key];var dfd=waitingInfo.deferred;var timer=waitingInfo.timer;if(timer){ // タイムアウト待ちタイマーをクリア
clearTimeout(timer);} // 読込後の処理(register()呼び出し後)等が実行された後に、
// ユーザコードのdoneハンドラが動作するようにするためsetTimeout使用
// 既に動作しているタイマーがあれば新たにタイマーは作らない
waitingForImmediateDeferred.push({dfd:dfd,value:value});if(!waitingImmediateTimer){waitingImmediateTimer=setTimeout(function(){waitingImmediateTimer=null;var dfds=waitingForImmediateDeferred.splice(0,waitingForImmediateDeferred.length);for(var i=0,l=dfds.length;i<l;i++){dfds[i].dfd.resolve(dfds[i].value);}},0);}} // デフォルトリゾルバの登録
addResolver('namespace',null,resolveNamespace);addResolver('ejsfile',/.*\.ejs(\?.*$|$)/,resolveEJSTemplate);addResolver('jsfile',/.*\.js(\?.*$|$)/,resolveJs);addResolver('cssfile',/.*\.css(\?.*$|$)/,resolveCss); // =============================
// Expose to window
// =============================
/**
	 * @namespace
	 * @name res
	 * @memberOf h5
	 */h5.u.obj.expose('h5.res',{dependsOn:dependsOn,isDependency:isDependency,register:register,get:get});})(); /* ------ h5.core.controller ------ */(function(){ // =========================================================================
//
// Constants
//
// =========================================================================
// =============================
// Production
// =============================
/**
	 * SVGの名前空間
	 */var SVG_XMLNS='http://www.w3.org/2000/svg'; /**
	 * セレクタのタイプを表す定数 イベントコンテキストの中に格納する
	 */var SELECTOR_TYPE_CONST={SELECTOR_TYPE_LOCAL:1,SELECTOR_TYPE_GLOBAL:2,SELECTOR_TYPE_OBJECT:3};var SUFFIX_CONTROLLER='Controller';var SUFFIX_LOGIC='Logic';var EVENT_NAME_H5_TRACKSTART='h5trackstart';var EVENT_NAME_H5_TRACKMOVE='h5trackmove';var EVENT_NAME_H5_TRACKEND='h5trackend';var ROOT_ELEMENT_NAME='rootElement';var EVENT_NAME_TRIGGER_INDICATOR='triggerIndicator'; /** グローバルセレクタ指定かどうかの判定に使用する正規表現 */var GLOBAL_SELECTOR_REGEXP=/^\{.*\}$/; /** イベント名がバインドリクエスト指定かどうかの判定に使用する正規表現 */var BIND_REQUESTED_REGEXP=/^\[.*\]$/; /** インラインコメントテンプレートのコメントノードの開始文字列 */var COMMENT_BINDING_TARGET_MARKER='{h5view '; // エラーコード
/** エラーコード: テンプレートに渡すセレクタが不正（コントローラビューでテンプレートに渡せるセレクタはコントローラのイベントハンドラ記述と同じになりました(#349） */ //var ERR_CODE_INVALID_TEMPLATE_SELECTOR = 6000;
/** エラーコード: バインド対象が指定されていない */var ERR_CODE_BIND_TARGET_REQUIRED=6001; /** エラーコード: bindControllerメソッドにコントローラではないオブジェクトが渡された（このエラーはver.1.1.3時点では通常発生しないので削除） */ //var ERR_CODE_BIND_NOT_CONTROLLER = 6002;
/** エラーコード: バインド対象となるDOMがない */var ERR_CODE_BIND_NO_TARGET=6003; /** エラーコード: バインド対象となるDOMが複数存在する */var ERR_CODE_BIND_TOO_MANY_TARGET=6004; /** エラーコード: 指定された引数の数が少ない */var ERR_CODE_TOO_FEW_ARGUMENTS=6005; /** エラーコード: コントローラの名前が指定されていない */var ERR_CODE_INVALID_CONTROLLER_NAME=6006; /** エラーコード: コントローラの初期化パラメータが不正 */var ERR_CODE_CONTROLLER_INVALID_INIT_PARAM=6007; /** エラーコード: 既にコントローラ化されている */var ERR_CODE_CONTROLLER_ALREADY_CREATED=6008; /** エラーコード: コントローラの参照が循環している */var ERR_CODE_CONTROLLER_CIRCULAR_REF=6009; /** エラーコード: ロジックの参照が循環している */var ERR_CODE_LOGIC_CIRCULAR_REF=6010; /** エラーコード: コントローラ化によって追加されるプロパティと名前が重複している */var ERR_CODE_CONTROLLER_SAME_PROPERTY=6011; /** エラーコード: イベントハンドラのセレクタに{this}が指定されている */var ERR_CODE_EVENT_HANDLER_SELECTOR_THIS=6012; /** エラーコード: あるセレクタに対して重複したイベントハンドラが設定されている */var ERR_CODE_SAME_EVENT_HANDLER=6013; /** エラーコード: ロジックの名前に文字列が指定されていない */var ERR_CODE_INVALID_LOGIC_NAME=6017; /** エラーコード: 既にロジック化されている */var ERR_CODE_LOGIC_ALREADY_CREATED=6018; /** エラーコード: exposeする際にコントローラ、もしくはロジックの名前がない */var ERR_CODE_EXPOSE_NAME_REQUIRED=6019; /** エラーコード: Viewモジュールが組み込まれていない */var ERR_CODE_NOT_VIEW=6029; /** エラーコード：バインド対象を指定する引数に文字列、オブジェクト、配列以外が渡された */var ERR_CODE_BIND_TARGET_ILLEGAL=6030; /** エラーコード：ルートコントローラ以外ではcontroller.bind()/unbind()/dispose()はできない */var ERR_CODE_BIND_UNBIND_DISPOSE_ROOT_ONLY=6031; /** エラーコード：コントローラメソッドは最低2つの引数が必要 */var ERR_CODE_CONTROLLER_TOO_FEW_ARGS=6032; /** エラーコード：コントローラの初期化処理がユーザーコードによって中断された(__initや__readyで返したプロミスがrejectした) */var ERR_CODE_CONTROLLER_INIT_REJECTED_BY_USER=6033; /** エラーコード：コントローラのバインド対象がノードではない */var ERR_CODE_BIND_NOT_NODE=6034; /** エラーコード：ルートエレメント未設定もしくはunbindされたコントローラで使用できないメソッドが呼ばれた */var ERR_CODE_METHOD_OF_NO_ROOTELEMENT_CONTROLLER=6035; /** エラーコード：disposeされたコントローラで使用できないメソッドが呼ばれた */var ERR_CODE_METHOD_OF_DISPOSED_CONTROLLER=6036; /** エラーコード：unbindは__constructでは呼べない */var ERR_CODE_CONSTRUCT_CANNOT_CALL_UNBIND=6037; /** エラーコード：コントローラの終了処理がユーザーコードによって中断された(__disposeで返したプロミスがrejectした) */var ERR_CODE_CONTROLLER_DISPOSE_REJECTED_BY_USER=6038; /** エラーコード：manageChildの引数にコントローラインスタンス以外が渡された */var ERR_CODE_CONTROLLER_MANAGE_CHILD_NOT_CONTROLLER=6039; /** エラーコード：unbindされたコントローラをmanageChildしようとした */var ERR_CODE_CONTROLLER_MANAGE_CHILD_UNBINDED_CONTROLLER=6040; /** エラーコード：unbindされたコントローラのmanageChildが呼ばれた */var ERR_CODE_CONTROLLER_MANAGE_CHILD_BY_UNBINDED_CONTROLLER=6041; /** エラーコード：manageChildの引数のコントローラインスタンスがルートコントローラじゃない */var ERR_CODE_CONTROLLER_MANAGE_CHILD_NOT_ROOT_CONTROLLER=6042; /** エラーコード：unbindされたコントローラのunmanageChildが呼ばれた */var ERR_CODE_CONTROLLER_UNMANAGE_CHILD_BY_UNBINDED_CONTROLLER=6043; /** エラーコード：unmanageChildの引数のコントローラインスタンスが自分の子コントローラじゃない */var ERR_CODE_CONTROLLER_UNMANAGE_CHILD_NOT_CHILD_CONTROLLER=6044; /** エラーコード：unmanageChildの第1引数がルートエレメント未決定コントローラで、第2引数がfalse */var ERR_CODE_CONTROLLER_UNMANAGE_CHILD_NO_ROOT_ELEMENT=6045; /** エラーコード: コントローラのデフォルトパラメータが不正 */var ERR_CODE_CONTROLLER_INVALID_INIT_DEFAULT_PARAM=6046; // =============================
// Development Only
// =============================
var fwLogger=h5.log.createLogger('h5.core'); /* del begin */ // ログメッセージ
var FW_LOG_TEMPLATE_LOADED='コントローラ"{0}"のテンプレートの読み込みに成功しました。';var FW_LOG_TEMPLATE_LOAD_FAILED='コントローラ"{0}"のテンプレートの読み込みに失敗しました。URL：{1}';var FW_LOG_INIT_CONTROLLER_REJECTED='コントローラ"{0}"の{1}で返されたPromiseがfailしたため、コントローラの初期化を中断しdisposeしました。';var FW_LOG_INIT_CONTROLLER_ERROR='コントローラ"{0}"の初期化中にエラーが発生しました。{0}はdisposeされました。';var FW_LOG_INIT_CONTROLLER_BEGIN='コントローラ"{0}"の初期化を開始しました。';var FW_LOG_INIT_CONTROLLER_COMPLETE='コントローラ"{0}"の初期化が正常に完了しました。';var FW_LOG_INIT_CONTROLLER_THROWN_ERROR='コントローラ"{0}"の{1}内でエラーが発生したため、コントローラの初期化を中断しdisposeしました。';var FW_LOG_BIND_TARGET_NOT_FOUND='イベントのバインド対象が見つかりません。指定されたグローバルセレクタ：{0}';var FW_LOG_BIND_TARGET_INVALID='イベントハンドラ���セットに失敗しました。指定されたオブジェクトがaddEventListenerメソッドを持っていません。対象のオブジェクト：{0}'; // エラーコードマップ
var errMsgMap={}; //errMsgMap[ERR_CODE_INVALID_TEMPLATE_SELECTOR] = 'update/append/prepend() の第1引数に"window", "navigator", または"window.", "navigator."で始まるセレクタは指定できません。';
errMsgMap[ERR_CODE_BIND_TARGET_REQUIRED]='コントローラ"{0}"のバインド対象となる要素を指定して下さい。'; //errMsgMap[ERR_CODE_BIND_NOT_CONTROLLER] = 'コントローラ化したオブジェクトを指定して下さい。';
errMsgMap[ERR_CODE_BIND_NO_TARGET]='コントローラ"{0}"のバインド対象となる要素が存在しません。';errMsgMap[ERR_CODE_BIND_TOO_MANY_TARGET]='コントローラ"{0}"のバインド対象となる要素が2つ以上存在します。バインド対象は1つのみにしてください。';errMsgMap[ERR_CODE_TOO_FEW_ARGUMENTS]='正しい数の引数を指定して下さい。';errMsgMap[ERR_CODE_INVALID_CONTROLLER_NAME]='コントローラの名前は必須です。コントローラの__nameにコントローラ名を空でない文字列で設定して下さい。';errMsgMap[ERR_CODE_CONTROLLER_INVALID_INIT_PARAM]='コントローラ"{0}"の初期化パラメータがプレーンオブジェクトではありません。初期化パラメータにはプレーンオブジェクトを設定してください。';errMsgMap[ERR_CODE_CONTROLLER_ALREADY_CREATED]='指定されたオブジェクトは既にコントローラ化されています。';errMsgMap[ERR_CODE_CONTROLLER_CIRCULAR_REF]='コントローラ"{0}"で、参照が循環しているため、コントローラを生成できません。';errMsgMap[ERR_CODE_LOGIC_CIRCULAR_REF]='ロジック"{0}"で、参照が循環しているため、ロジックを生成できません。';errMsgMap[ERR_CODE_CONTROLLER_SAME_PROPERTY]='コントローラ"{0}"のプロパティ"{1}"はコントローラ化によって追加されるプロパティと名前が重複しています。';errMsgMap[ERR_CODE_EVENT_HANDLER_SELECTOR_THIS]='コントローラ"{0}"でセレクタ名にthisが指定されています。コントローラをバインドした要素自身を指定したい時はrootElementを指定してください。';errMsgMap[ERR_CODE_SAME_EVENT_HANDLER]='コントローラ"{0}"のセレクタ"{1}"に対して"{2}"というイベントハンドラが重複して設定されています。';errMsgMap[ERR_CODE_INVALID_LOGIC_NAME]='ロジック名は必須です。ロジックの__nameにロジック名を空でない文字列で設定して下さい。';errMsgMap[ERR_CODE_LOGIC_ALREADY_CREATED]='指定されたオブジェクトは既にロジック化されています。';errMsgMap[ERR_CODE_EXPOSE_NAME_REQUIRED]='コントローラ、もしくはロジックの __name が設定されていません。';errMsgMap[ERR_CODE_NOT_VIEW]='テンプレートはViewモジュールがなければ使用できません。';errMsgMap[ERR_CODE_BIND_TARGET_ILLEGAL]='コントローラ"{0}"のバインド対象には、セレクタ文字列、または、オブジェクトを指定してください。';errMsgMap[ERR_CODE_BIND_UNBIND_DISPOSE_ROOT_ONLY]='コントローラのbind(), unbind()はルートコントローラでのみ使用可能です。';errMsgMap[ERR_CODE_CONTROLLER_TOO_FEW_ARGS]='h5.core.controller()メソッドは、バインドターゲットとコントローラ定義オブジェクトの2つが必須です。';errMsgMap[ERR_CODE_CONTROLLER_INIT_REJECTED_BY_USER]='コントローラ"{0}"の初期化処理がユーザによって中断されました。';errMsgMap[ERR_CODE_BIND_NOT_NODE]='コントローラ"{0}"のバインド対象がノードではありません。バインド対象に指定できるのはノードかdocumentオブジェクトのみです。';errMsgMap[ERR_CODE_METHOD_OF_NO_ROOTELEMENT_CONTROLLER]='ルートエレメントの設定されていないコントローラのメソッド{0}は実行できません。';errMsgMap[ERR_CODE_METHOD_OF_DISPOSED_CONTROLLER]='disposeされたコントローラのメソッド{0}は実行できません。';errMsgMap[ERR_CODE_CONSTRUCT_CANNOT_CALL_UNBIND]='unbind()メソッドは__constructから呼ぶことはできません。';errMsgMap[ERR_CODE_CONTROLLER_DISPOSE_REJECTED_BY_USER]='コントローラ"{0}"のdispose処理がユーザによって中断されました。';errMsgMap[ERR_CODE_CONTROLLER_MANAGE_CHILD_NOT_CONTROLLER]='manageChildの第1引数はコントローラインスタンスである必要があります。';errMsgMap[ERR_CODE_CONTROLLER_MANAGE_CHILD_UNBINDED_CONTROLLER]='アンバインドされたコントローラをmanageChildすることはできません';errMsgMap[ERR_CODE_CONTROLLER_MANAGE_CHILD_BY_UNBINDED_CONTROLLER]='アンバインドされたコントローラのmanageChildは呼び出せません';errMsgMap[ERR_CODE_CONTROLLER_MANAGE_CHILD_NOT_ROOT_CONTROLLER]='manageChildの第1引数はルートコントローラである必要があります。';errMsgMap[ERR_CODE_CONTROLLER_UNMANAGE_CHILD_BY_UNBINDED_CONTROLLER]='アンバインドされたコントローラのunmanageChildは呼び出せません';errMsgMap[ERR_CODE_CONTROLLER_UNMANAGE_CHILD_NOT_CHILD_CONTROLLER]='unmanageChildの第1引数は呼び出し側の子コントローラである必要があります。';errMsgMap[ERR_CODE_CONTROLLER_UNMANAGE_CHILD_NO_ROOT_ELEMENT]='ルートエレメントの決定していない子コントローラのunmanageChildは、第2引数にfalseを指定することはできません';errMsgMap[ERR_CODE_CONTROLLER_INVALID_INIT_DEFAULT_PARAM]='コントローラ"{0}"のデフォルトパラメータ(__defaultArgs)がプレーンオブジェクトではありません。デフォルトパラメータにはプレーンオブジェクトを設定してください。';addFwErrorCodeMap(errMsgMap); /* del end */ // =========================================================================
//
// Cache
//
// =========================================================================
var getDeferred=h5.async.deferred;var isPromise=h5.async.isPromise;var startsWith=h5.u.str.startsWith;var endsWith=h5.u.str.endsWith;var format=h5.u.str.format;var argsToArray=h5.u.obj.argsToArray;var isJQueryObject=h5.u.obj.isJQueryObject;var isDependency=h5.res.isDependency; // =========================================================================
//
// Privates
//
// =========================================================================
// =============================
// Variables
// =============================
/**
	 * commonFailHandlerを発火させないために登録するdummyのfailハンドラ
	 */var dummyFailHandler=function dummyFailHandler(){ //
}; // コントローラマネージャ。作成した時に値をセットしている。
var controllerManager; // キャッシュマネージャ。作成した時に値をセットしている。
var definitionCacheManager; /**
	 * マウス/タッチイベントについてh5track*イベントをトリガしたかどうかを管理するため、イベントを格納する配列
	 */var storedEvents=[]; /**
	 * あるマウス/タッチイベントについてh5track*イベントをトリガ済みかのフラグを保持する配列<br>
	 * storedEventsに格納されているイベントオブジェクトに対応して、<br>
	 * [true, false, false] のように格納されている。
	 */var h5trackTriggeredFlags=[]; /**
	 * touch-actionをサポートしているときの、そのプロパティ(touchActionまたはmsTouchAction)
	 */var touchActionProp=''; /**
	 * touch-action(または-ms-touch-action)プロパティがサポートされているか
	 */var isTouchActionSupported=function(){ // divを作って、styleにtouchActionまたはmsTouchActionがあるか判定する
// いずれかがあった場合にtouchActionPropを設定して、trueを返す
var div=document.createElement('div');if(_typeof(div.style.touchAction)!==TYPE_OF_UNDEFINED){touchActionProp='touchAction';return true;}else if(_typeof(div.style.msTouchAction)!==TYPE_OF_UNDEFINED){touchActionProp='msTouchAction';return true;}return false;}(); /**
	 * コントローラ化時に呼ばれるフック関数の配列
	 */var controllerInstantiationHooks=[]; // =============================
// Functions
// =============================
/**
	 * 要素のtransformスタイルの指定を無効にする
	 *
	 * @private
	 * @param {DOM} element
	 */function clearTransformStyle(element){if(element.style.transform!=null){element.style.transform='';}if(element.style.mozTansform!=null){element.style.mozTansform='';}if(element.style.webkitTansform!=null){element.style.webkitTansform='';}} /**
	 * svg要素のboundingClientRectを取得した時にsvg要素自体の位置を得できるブラウザかどうか
	 * <p>
	 * (Firefox32以下、iOS5以下、Android対応のため。 issue #393)
	 * </p>
	 *
	 * @private
	 * @returns {Boolean}
	 */var isSVGOffsetCollect=function(){var _isSVGOffsetCollect=null;return function(){if(_isSVGOffsetCollect!=null){ // 判定済みなら判定済み結果を返す
return _isSVGOffsetCollect;} // ダミーのsvg要素とrect要素を作って、正しく位置が取得できるかどうかの判定を行う
var svg=document.createElementNS(SVG_XMLNS,'svg');svg.setAttribute('width',1);svg.setAttribute('height',1);var rect=document.createElementNS(SVG_XMLNS,'rect');rect.setAttribute('x',1);rect.setAttribute('y',1);rect.setAttribute('width',1);rect.setAttribute('height',1); // transformを空文字にして無効にする(cssで指定されていたとしても無効にして計算できるようにするため)
clearTransformStyle(rect);$(function(){document.body.appendChild(svg); // svgのboudingClientRectのtopを取得
var svgTop=svg.getBoundingClientRect().top;svg.appendChild(rect); // svg要素のboundingClientRectが正しく取得できていない場合、描画図形を包含する矩形を表している。
// その場合、rectを追加するとsvgのboundingClientRectが変わるので、rect追加前とrect追加後の位置の差がある場合は
// svg要素の位置が正しくとれないと判定する
_isSVGOffsetCollect=svgTop===svg.getBoundingClientRect().top; // svg要素の削除
document.body.removeChild(svg);}); // document.ready前はnullを返す
return _isSVGOffsetCollect;};}(); // --------------------------------- コントローラ定義オブジェクトのvalidate関数 ---------------------------------
/**
	 * コントローラ定義、ターゲット、初期化パラメータのチェックを行います(コントローラ名のチェック(__name)はチェック済み)
	 * <p>
	 * チェックを通らなかった場合はエラーを投げます
	 * </p>
	 *
	 * @param {Boolean} isRoot ルートコントローラかどうか
	 * @param {DOM|jQuery|String} targetElement
	 * @param {Object} controllerDefObj
	 * @param {String} controllerName
	 */function validateControllerDef(isRoot,targetElement,controllerDefObj,controllerName){ // コントローラ定義オブジェクトに、コントローラが追加するプロパティと重複するプロパティがあるかどうかチェック
if(!controllerPropertyMap){ // 重複チェックが初めて呼ばれた時にコントローラプロパティマップを生成してチェックで使用する
controllerPropertyMap={};var tempInstance=new Controller(null,'a');for(var p in tempInstance){if(tempInstance.hasOwnProperty(p)&&p!=='__name'&&p!=='__templates'&&p!=='__meta'){controllerPropertyMap[p]=1;}}tempInstance=null;var proto=Controller.prototype;for(var p in proto){if(proto.hasOwnProperty(p)){controllerPropertyMap[p]=null;}}proto=null;}for(var prop in controllerDefObj){if(prop in controllerPropertyMap){ // コントローラが追加するプロパティと同じプロパティ名のものがあればエラー
throwFwError(ERR_CODE_CONTROLLER_SAME_PROPERTY,[controllerName,prop],{controllerDefObj:controllerDefObj});}}} /**
	 * コントローラ定義オブジェクトの子孫コントローラ定義が循環参照になっているかどうかをチェックします。
	 *
	 * @private
	 * @param {Object} controllerDefObject コントローラ定義オブジェクト
	 * @param {String} controllerName コントローラ名
	 */function validateControllerCircularRef(controllerDefObject,controllerName){function validateCircular(controllerDef,ancestors){if($.inArray(controllerDef,ancestors)!==-1){ // 循環参照エラー
throwFwError(ERR_CODE_CONTROLLER_CIRCULAR_REF,[controllerName],{controllerDefObj:controllerDefObject});} // 子コントローラをチェック
doForEachChildControllers(controllerDef,function(controller){validateCircular(controller,ancestors.concat([controllerDef]));},true);}validateCircular(controllerDefObject,[]);} /**
	 * ロジック定義が循環参照になっているかどうかをチェックします。
	 *
	 * @private
	 * @param {Object} rootLogicDef ロジック定義オブジェクト
	 */function validateLogicCircularRef(rootLogicDef){function validateCircular(logic,ancestors){if($.inArray(logic,ancestors)!==-1){ // 循環参照エラー
throwFwError(ERR_CODE_LOGIC_CIRCULAR_REF,[rootLogicDef.__name],{logicDefObj:rootLogicDef});}doForEachLogics(logic,function(child){validateCircular(child,ancestors.concat(logic));});}validateCircular(rootLogicDef,[]);} /**
	 * ターゲットエレメントの指定が正しいかどうかチェックします。正しくない場合はthrowFwError
	 *
	 * @private
	 * @param {DOM|jQuery|String} targetElement
	 * @param {Object} controllerDefObj コントローラ定義オブジェクト
	 * @param {String} controllerName コントローラ名
	 */function validateTargetElement(targetElement,controllerDefObj,controllerName){ // null,undefinedならエラー
if(targetElement==null){throwFwError(ERR_CODE_BIND_TARGET_REQUIRED,[controllerName],{controllerDefObj:controllerDefObj});} // 文字列でもObjectでもないならエラー
if(!isString(targetElement)&&(typeof targetElement==='undefined'?'undefined':_typeof(targetElement))!=='object'){throwFwError(ERR_CODE_BIND_TARGET_ILLEGAL,[controllerName],{controllerDefObj:controllerDefObj});}var $bindTargetElement=$(targetElement); // 要素が1つでない場合はエラー
if($bindTargetElement.length===0){throwFwError(ERR_CODE_BIND_NO_TARGET,[controllerName],{controllerDefObj:controllerDefObj});} // 要素が複数ある場合はエラー
if($bindTargetElement.length>1){throwFwError(ERR_CODE_BIND_TOO_MANY_TARGET,[controllerName],{controllerDefObj:controllerDefObj});} // ノードエレメントでない場合はエラー
if($bindTargetElement[0].nodeType!==NODE_TYPE_DOCUMENT&&$bindTargetElement[0].nodeType!==NODE_TYPE_ELEMENT){throwFwError(ERR_CODE_BIND_NOT_NODE,[controllerName],{controllerDefObj:controllerDefObj});}} // ----------------------------- コントローラ定義オブジェクトのチェック関数ここまで -----------------------------
/**
	 * イベントコンテキストクラス イベントコンテキストの中に格納する
	 *
	 * @private
	 * @class
	 * @param {Controller} controller コントローラインスタンス
	 * @param {Event} event イベントオブジェクト
	 * @param {Array} evArg イベントハンドラに渡された引数(arguments)を配列にしたもの
	 * @param {String} selector イベントハンドラのバインドに使用されたセレクタ
	 * @param {Number} selectorType イベントハンドラのバインドに使用されたセレクタのタイプ(SELECTOR_TYPE_CONSTに定義されたもの)
	 */function EventContext(controller,event,evArg,selector,selectorType){this.controller=controller;this.event=event;this.evArg=evArg;this.selector=selector;this.selectorType=selectorType;} // prototypeにセレクタのタイプを表す定数を追加
$.extend(EventContext.prototype,SELECTOR_TYPE_CONST); /**
	 * コントローラがdisposeされていないことと、executeListenersを見てリスナーを実行するかどうかを決定するインターセプタ。
	 *
	 * @private
	 * @param {Object} invocation インヴォケーション
	 * @returns リスナーの戻り値
	 */function executeListenersInterceptor(invocation){ // disposeされていたら何もしない
// disposeされているのにイベントハンドラが起きることがあるのでチェックしている。
// jQueryはイベント発生時に探索したハンドラを実行しようとするので、
// 途中のイベントハンドラでunbindしたハンドラも実行される。
// あるイベントについて、コントローラでバインドしたイベントハンドラより先に実行されるイベントハンドラの中で
// コントローラがdisposeされた場合、unbindしたコントローラのハンドラも実行され、ここの関数が実行される。
// そのため、コントローラがdisposeされているかどうかのチェックが必要。
if(isDisposed(this)||!this.__controllerContext.executeListeners){return;}return invocation.proceed();} /**
	 * 指定されたオブジェクトの関数にアスペクトを織り込みます。
	 *
	 * @private
	 * @param {Object} defObj コントローラまたはロジックの定義オブジェクト
	 * @param {Object} prop プロパティ名.
	 * @param {Boolean} isEventHandler イベントハンドラかどうか
	 * @returns {Object} アスペクトを織り込んだ関数
	 */function weaveAspect(defObj,prop,isEventHandler){var interceptors=getInterceptors(defObj.__name,prop); // イベントハンドラの場合、 enable/disableListeners()のために一番外側に制御用インターセプタを織り込む
if(isEventHandler){interceptors.push(executeListenersInterceptor);}return createWeavedFunction(defObj[prop],prop,interceptors);} /**
	 * 関数名とポイントカットを比べて、条件に合致すればインターセプタを返す.
	 *
	 * @private
	 * @param {String} targetName バインドする必要のある関数名.
	 * @param {Object} pcName ポイントカットで判別する対象名.
	 * @returns {Function[]} AOP用関数配列.
	 */function getInterceptors(targetName,pcName){ /** @type Any */var ret=[];var aspects=h5.settings.aspects; // 織り込むべきアスペクトがない場合はそのまま空の配列を返す
if(!aspects||aspects.length===0){return ret;}aspects=wrapInArray(aspects);for(var i=aspects.length-1;-1<i;i--){var aspect=aspects[i];if(aspect.target&&!aspect.compiledTarget.test(targetName)){continue;}var interceptors=aspect.interceptors;if(aspect.pointCut&&!aspect.compiledPointCut.test(pcName)){continue;}if(!isArray(interceptors)){ret.push(interceptors);continue;}for(var j=interceptors.length-1;-1<j;j--){ret=ret.concat(interceptors[j]);}}return ret;} /**
	 * 基本となる関数にアスペクトを織り込んだ関数を返します。
	 *
	 * @private
	 * @param {Function} base 基本関数.
	 * @param {String} funcName 基本関数名.
	 * @param {Function[]} aspects AOP用関数配列.
	 * @returns {Function} AOP用関数を織り込んだ関数.
	 */function createWeavedFunction(base,funcName,aspects){ // 関数のウィービングを行う
var weave=function weave(baseFunc,fName,aspect){return function() /* var_args */{var that=this;var invocation={target:that,func:baseFunc,funcName:fName,args:arguments,proceed:function proceed(){return baseFunc.apply(that,this.args);}};return aspect.call(that,invocation);};};var f=base;for(var i=0,l=aspects.length;i<l;i++){f=weave(f,funcName,aspects[i]);}return f;} /**
	 * セレクタがコントローラの外側の要素を指しているかどうかを返します。<br>
	 * (外側の要素 = true)
	 *
	 * @private
	 * @param {String} selector セレクタ
	 * @returns {Boolean} コントローラの外側の要素を指しているかどうか
	 */function isGlobalSelector(selector){return GLOBAL_SELECTOR_REGEXP.test(selector);} /**
	 * イベント名がjQuery.bindを使って要素にイベントをバインドするかどうかを返します。
	 *
	 * @private
	 * @param {String} eventName イベント名
	 * @returns {Boolean} jQuery.bindを使って要素にイベントをバインドするかどうか
	 */function isBindRequestedEvent(eventName){return BIND_REQUESTED_REGEXP.test(eventName);} /**
	 * セレクタから{}を外した文字列を返します。
	 *
	 * @private
	 * @param {String} selector セレクタ
	 * @returns {String} セレクタから{}を外した文字列
	 */function trimGlobalSelectorBracket(selector){return $.trim(selector.substring(1,selector.length-1));} /**
	 * イベント名から[]を外した文字列を返す
	 *
	 * @param {String} eventName イベント名
	 * @returns {String} イベント名から[]を外した文字列
	 */function trimBindEventBracket(eventName){return $.trim(eventName.substring(1,eventName.length-1));} /**
	 * 指定されたセレクタがwindow, window., document, document., navigator, navigator.
	 * で始まっていればそのオブジェクトを、そうでなければそのまま文字列を返します。
	 * window,document,navigatorは第2引数に指定されたdocumentが属するウィンドウのものを使用します。
	 * また、第3引数にコントローラが指定されていてかつselectorが"this."で始まっている場合は、コントローラ内のオブジェクトを取得します。
	 *
	 * @private
	 * @param {String} selector セレクタ
	 * @param {Document} doc
	 * @param {Controller} [controller] セレクタがthis.で始まっているときにコントローラの持つオブジェクトをターゲットにする
	 * @returns {Object|String} パスで指定されたオブジェクト、もしくは未変換の文字列
	 */function getGlobalSelectorTarget(selector,doc,controller){if(controller&&selector===ROOT_ELEMENT_NAME){return controller.rootElement;}var specialObj=['window','document','navigator'];for(var i=0,len=specialObj.length;i<len;i++){var s=specialObj[i];if(selector===s||startsWith(selector,s+'.')){ //特殊オブジェクトそのものを指定された場合またはwindow. などドット区切りで続いている場合
return h5.u.obj.getByPath(selector,getWindowOfDocument(doc));}} // selectorが'this.'で始まっていて、かつcontrollerが指定されている場合はコントローラから取得する
var controllerObjectPrefix='this.';if(controller&&startsWith(selector,controllerObjectPrefix)){return h5.u.obj.getByPath(selector.slice(controllerObjectPrefix.length),controller);}return selector;} /**
	 * 指定されたプロパティがイベントハンドラかどうかを返します。
	 *
	 * @private
	 * @param {Object} controllerDefObject コントローラ定義オブジェクト
	 * @param {String} prop プロパティ名
	 * @returns {Boolean} プロパティがイベントハンドラかどうか
	 */function isEventHandler(controllerDefObject,prop){return prop.indexOf(' ')!==-1&&isFunction(controllerDefObject[prop]);} /**
	 * コントローラのプロパティが自分自身の子コントローラであるかどうかを返します。
	 *
	 * @private
	 * @param {Object} controller コントローラ
	 * @param {String} prop プロパティ名
	 * @param {Boolean} isDefObj 定義オブジェクトについての判定かどうか。定義オブジェクトならparentControllerが一致するかどうかは見ない。
	 * @returns {Boolean} コントローラのプロパティが第1引数のコントローラの子コントローラかどうか(true=子コントローラである)
	 */function isChildController(controller,prop,isDefObj){var target=controller[prop]; // プロパティがrootControllerまたはparentControllerの場合はfalse
// __controllerContextがない(コントローラインスタンスではないまたはdispose済みコントローラインスタンス)の場合はfalse
// 子コントローラでない(isRootがtrue)の場合はfalse
// parentControllerを見て、自分の子供ならtrueを返す。
// ただし、parentController未設定(コントローラ化処理の途中)の場合はtrueを返す。
return endsWith(prop,SUFFIX_CONTROLLER)&&prop!=='rootController'&&prop!=='parentController'&&target&&(isDefObj||target.__controllerContext&&!target.__controllerContext.isRoot&&(!target.parentController||target.parentController===controller));} /**
	 * ロジックのプロパティが自分自身の子ロジックであるかどうかを返します。
	 *
	 * @private
	 * @param {Object} logic ロジックまたはコントローラ(コントローラを指定した時は、そのコントローラが持つロジックかどうかを返す)
	 * @param {String} prop プロパティ名
	 * @returns {Boolean} ロジックのプロパティが第1引数のロジックの子ロジックかどうか(true=子ロジックである)
	 */function isChildLogic(logic,prop){ // hasOwnPropertyがtrueで、"Logic"で終わっているプロパティ名のものは子ロジック。ロジック化の対象になる。
return logic.hasOwnProperty(prop)&&endsWith(prop,SUFFIX_LOGIC);} /**
	 * 指定されたコントローラ直下の子コントローラについて、コールバックを実行します
	 *
	 * <pre>
	 * function(controller, parentController, prop) {}
	 * </pre>
	 *
	 * のような関数を指定してください。falseが返されたら中断します。
	 *
	 * @private
	 * @param {Object} controller
	 * @param {Function} callback 引数に各コントローラとプロパティ名が渡されます。
	 * @param {Boolean} isDefObj
	 *            定義オブジェクトについての実行かどうか。定義オブジェクトなら子コントローラを探索するときにparentControllerが一致するかどうかは見ない。
	 * @returns 中断された場合はfalseを返します
	 */function doForEachChildControllers(controller,callback,isDefObj){ // コントローラインスタンスなら__controllerContextから子コントローラを取得
if(!isDefObj){ // disposeされていたら何もしない
if(isDisposed(controller)){return;}var childControllers=controller.__controllerContext.childControllers;for(var i=0,l=childControllers.length;i<l;i++){var childController=childControllers[i];var child=childController;if(false===callback(child,controller)){return false;}}return;} // 定義オブジェクトならdefinitionCacheManagerからキャッシュを取得(ない場合はnull)
var cache=definitionCacheManager.get(controller.__name); // キャッシュがあるなら、キャッシュを使ってループ
if(cache){for(var i=0,l=cache.childControllerProperties.length;i<l;i++){var prop=cache.childControllerProperties[i];var child=controller[prop]; // __construct時点では子コントローラがセットされていない場合があるので、
// その場合はcallbackは実行しない
if(child&&false===callback(controller[prop],controller,prop)){return false;}}return;} // キャッシュがないなら探索しながらループ
for(var prop in controller){if(isChildController(controller,prop,isDefObj)){if(false===callback(controller[prop],controller,prop)){return false;}}}} /**
	 * 指定されたロジック直下の子ロジックについて、コールバックを実行します
	 *
	 * <pre>
	 * function(logic, parentLogic, prop) {}
	 * </pre>
	 *
	 * のような関数を指定してください。falseが返されたら中断します。
	 *
	 * @private
	 * @param {Logic|Object} logic ロジックまたは、まだインスタンス化されていないロジック定義オブジェクト
	 * @param {Function} callback 引数に各ロジックとプロパティ名が渡されます。
	 * @returns 中断された場合はfalseを返します
	 */function doForEachLogics(logic,callback){ // キャッシュがあるなら、キャッシュを使ってループ
var cache=definitionCacheManager.get(logic.__name);if(cache){for(var i=0,l=cache.logicProperties.length;i<l;i++){var prop=cache.logicProperties[i];if(false===callback(logic[prop],logic,prop)){return false;}}return;} // キャッシュがないなら探索しながらループ
for(var prop in logic){if(isChildLogic(logic,prop)){if(false===callback(logic[prop],logic,prop)){return false;}}}} /**
	 * 指定されたコントローラ以下のコントローラについて、コールバックを実行します
	 *
	 * <pre>
	 * function(controller, parentController, prop) {}
	 * </pre>
	 *
	 * のような関数を指定してください。falseが返されたら中断します。
	 *
	 * @private
	 * @param {Object} controller
	 * @param {Function} callback 引数に各コントローラとプロパティ名が渡されます。
	 * @param {Controller} [_parent] 第1引数controllerの親コントローラ。再帰呼び出し時に受け取る変数です。
	 * @param {String} [_prop] _parentがcontrollerを指すプロパティ名。再帰呼び出し時に受け取る変数です。
	 * @returns コールバックがfalseを返して中断した場合はfalseを返します
	 */function doForEachControllerGroups(controller,callback,_parent,_prop){if(callback.call(this,controller,_parent,_prop)===false){return false;}function callbackWrapper(c,parent,prop){if(doForEachControllerGroups(c,callback,parent,prop)===false){return false;}}return doForEachChildControllers(controller,callbackWrapper);} /**
	 * 指定されたコントローラ以下のコントローラについて、深さ優先でコールバックを実行します
	 *
	 * <pre>
	 * function(controller, parentController, prop) {}
	 * </pre>
	 *
	 * のような関数を指定してください。falseが返されたら中断します。
	 *
	 * @private
	 * @param {Object} controller
	 * @param {Function} callback 引数に各コントローラとプロパティ名が渡されます。
	 * @param {Controller} [_parent] 第1引数controllerの親コントローラ。再帰呼び出し時に受け取る変数です。
	 * @param {String} [_prop] _parentがcontrollerを指すプロパティ名。再帰呼び出し時に受け取る変数です。
	 * @returns コールバックがfalseを返して中断した場合はfalseを返します
	 */function doForEachControllerGroupsDepthFirst(controller,callback,_parent,_prop){function callbackWrapper(c,parent,prop){if(!c||doForEachControllerGroupsDepthFirst(c,callback,parent,prop)===false){return false;}}if(doForEachChildControllers(controller,callbackWrapper)===false){return false;}if(callback.call(this,controller,_parent,_prop)===false){return false;}} /**
	 * 指定されたコントローラの子コントローラが持つ、指定されたプロミスを取得します。
	 *
	 * @private
	 * @param {Object} controller コントローラ
	 * @param {String} propertyName プロパティ名(initPromise,postInitPromise,readyPromise)
	 * @returns {Promise[]} Promiseオブジェクト配列
	 */function getChildControllerPromises(controller,propertyName){var promises=[];doForEachChildControllers(controller,function(c){var promise=c[propertyName];if(promise){promises.push(promise);}});return promises;} /**
	 * バインドマップに基づいてイベントハンドラをバインドします
	 *
	 * @private
	 * @param {Controller} controller コントローラ
	 */function bindByBindMap(controller){var bindMap=controller.__controllerContext.cache.bindMap;var doc=getDocumentOf(controller.rootElement);for(var p in bindMap){var bindObjects=createBindObjects(controller,bindMap[p],controller[p]);for(var i=0,l=bindObjects.length;i<l;i++){bindByBindObject(bindObjects[i],doc);}}} /**
	 * イベントハンドラのバインドを行います。
	 *
	 * @private
	 * @param {Controller} controller コントローラ
	 * @param {Object} eventHandlerInfo バインドマップに登録されているイベントハンドラの情報
	 * @param {Function} func イベントハンドラ
	 * @returns {Object[]} バインドオブジェクトの配列
	 */function createBindObjects(controller,eventHandlerInfo,func){var selector=eventHandlerInfo.selector;var eventName=eventHandlerInfo.eventName;var bindTarget=eventHandlerInfo.bindTarget;var isGlobal=eventHandlerInfo.isGlobal;var isBindRequested=eventHandlerInfo.isBindRequested; // ハンドラを取得(アスペクト適用済み)
// この関数の戻り値になるバインドオブジェクトの配列
// 結果は必ず配列になるようにする
var bindObjects;switch(eventName){case 'mousewheel':bindObjects=getNormalizeMouseWheelBindObj(controller,eventName,func);break;case EVENT_NAME_H5_TRACKSTART:case EVENT_NAME_H5_TRACKMOVE:case EVENT_NAME_H5_TRACKEND:bindObjects=getH5TrackBindObj(controller,eventName,func); // バインド対象要素またはセレクタについてトラックイベントの何れかのハンドラが初めてだった場合は、
// h5trackxxxイベントハンドラについてのバインドオブジェクトに加えて、
// トラックイベントをmousedown,touchstart時に有効にするためのイベントハンドラをバインド
var context=controller.__controllerContext;var alreadyBound=false;context.h5trackEventHandlerInfos=context.h5trackEventHandlerInfos||[];var h5trackEventHandlerInfos=context.h5trackEventHandlerInfos;for(var i=0,l=h5trackEventHandlerInfos.length;i<l;i++){var info=h5trackEventHandlerInfos[i];if(bindTarget){ // ターゲット指定の場合はbindTargetを比較
if(isSameBindTarget(bindTarget,info.bindTarget)){alreadyBound=true;break;}}else { // セレクタを指定された場合は、セレクタと、グローバル指定かどうかと、isBindRequested指定を比較
if(selector===info.selector&&isGlobal===info.isGlobal&&isBindRequested===info.isBindRequested){alreadyBound=true;break;}}}if(!alreadyBound){bindObjects=getBindObjForEnableH5track(controller).concat(bindObjects);h5trackEventHandlerInfos.push(eventHandlerInfo);}break;default:bindObjects=getNormalBindObj(controller,eventName,func);break;} // 配列にする
if(!isArray(bindObjects)){bindObjects=[bindObjects];} // イベントコンテキストを作成してからハンドラを呼び出すようにhandlerをラップする
// unbindListにラップしたものが登録されるように、このタイミングで行う必要がある
function wrapHandler(bindObj){var handler=bindObj.handler;var c=bindObj.controller; // h5track*のオフセット計算等のためにすでにhandlerにはFW側でラップ済みの関数を持っている場合がある
// その場合は、bindObj.originalHandlerにすでにラップ前の関数を持たせてある
if(!bindObj.originalHandler){bindObj.originalHandler=handler;}bindObj.handler=function() /* var args */{ // isNativeBindがtrue(addEventListenerによるバインド)なら、イベントハンドラのthisをイベントハンドラの第2引数にする。
// (DOM要素でないものはlistenerElementTypeに関わらずjQueryで包まない)
// isNativeBindがfalse(jQueryのbindまたはdelegateによるバインド)なら
// listenerElementTypeが1ならjQueryオブジェクト、そうでないならDOM要素(イベントハンドラのthis)を、イベントハンドラの第2引数にする
// jQuery1.6.4の場合、currentTargetに正しく値が設定されていない場合があるため、
// currentTargetではなくthisを使用している。(issue#338)
var currentTargetShortcut=!bindObj.isNativeBind&&h5.settings.listenerElementType===1?$(this):this;handler.call(c,createEventContext(bindObj,arguments),currentTargetShortcut);};}for(var i=0,l=bindObjects.length;i<l;i++){var bindObject=bindObjects[i]; // handlerをラップ
wrapHandler(bindObject); // eventHandlerInfoから、bindObjに必要なものを持たせる
bindObject.isBindRequested=isBindRequested;bindObject.isGlobal=isGlobal;bindObject.bindTarget=bindTarget;bindObject.selector=selector; // コントローラを持たせる
bindObject.controller=controller;}return bindObjects;} /**
	 * バインドオブジェクトに基づいてイベントハンドラをバインドします。
	 *
	 * @private
	 * @param {Object} bindObj バインドオブジェクト
	 * @param {Document} doc documentオブジェクト
	 */function bindByBindObject(bindObj,doc){var controller=bindObj.controller;var rootElement=controller.rootElement;var selector=bindObj.selector;var eventName=bindObj.eventName;var handler=bindObj.handler;var useBind=bindObj.isBindRequested;var isGlobal=bindObj.isGlobal;var bindTarget=bindObj.bindTarget;if(bindTarget){ // bindTargetが指定されている場合は必ず直接バインド
bindObj.evSelectorType=SELECTOR_TYPE_CONST.SELECTOR_TYPE_OBJECT;bindEvent(bindObj);}else if(isGlobal){ // グローバルなセレクタの場合
var selectTarget=getGlobalSelectorTarget(selector,doc,controller); // バインド対象がオブジェクト、または直接バインド指定の場合、必ず直接バインドする
if(useBind||!isString(selectTarget)){ // bindObjにselectorTypeを登録する
bindObj.evSelectorType=SELECTOR_TYPE_CONST.SELECTOR_TYPE_OBJECT;bindObj.bindTarget=isString(selectTarget)?$(selectTarget):selectTarget;bindEvent(bindObj);}else { // bindObjにselectorTypeを登録する
bindObj.evSelectorType=SELECTOR_TYPE_CONST.SELECTOR_TYPE_GLOBAL;$(doc).delegate(selectTarget,eventName,handler);} // selectorがグローバル指定の場合はcontext.selectorに{}を取り除いた文字列を格納する
// selectorがオブジェクト指定(rootElement, window, document)の場合はオブジェクトを格納する
bindObj.evSelector=selectTarget;}else { // selectorがグローバル指定でない場合
// bindObjにselectorTypeを登録し、selectorは文字列を格納する
bindObj.evSelectorType=SELECTOR_TYPE_CONST.SELECTOR_TYPE_LOCAL;bindObj.evSelector=selector;if(useBind){bindObj.bindTarget=$(selector,rootElement);bindEvent(bindObj);}else {$(rootElement).delegate(selector,eventName,handler);}} // bindEventで、bindTargetが不正なためバインドできなかった場合は以降何もしない
// (bindHandlersに不要なものを残さないようにするため)
if(bindObj.isBindCanceled){return;} // アンバインドマップにハンドラを追加
// バインドした場合はバインドした要素・オブジェクトをbindTargetに覚えておく
registerWithBoundHandlers(bindObj); // h5trackstartのバインド先のstyle.touchActionにh5.settings.trackstartTouchActionの値(デフォルト'none')を設定する
// touchActionをサポートしていないなら何もしない
// h5.settings.trackstartTouchActionがnullなら何もしない
// TODO プラッガブル(どのイベントの時にどういう処理をするか)が設定できるようにする
if(isTouchActionSupported&&eventName===EVENT_NAME_H5_TRACKSTART&&h5.settings.trackstartTouchAction!=null){var $trackTarget=isGlobal?$(bindObj.evSelector,doc):$(bindObj.evSelector,rootElement);$trackTarget.each(function(){this.style[touchActionProp]=h5.settings.trackstartTouchAction;});}} /**
	 * バインドオブジェクトに基づいてイベントハンドラをアンバインドします。
	 *
	 * @private
	 * @param {Object} bindObj バインドオブジェクト
	 * @param {Document} doc documentオブジェクト
	 * @param {Boolean} shouldNotUnregister boundHandlersから指定されたバインドオブジェクトを削除しない時にtrueを指定する
	 */function unbindByBindObject(bindObj,doc,shouldNotUnregister){var controller=bindObj.controller;var rootElement=controller.rootElement;var selector=bindObj.selector;var handler=bindObj.handler;var eventName=bindObj.eventName;var isGlobal=bindObj.isGlobal;var bindTarget=bindObj.bindTarget;if(bindTarget){ // オブジェクトまたは直接バインド指定されていた場合(===バインド時にbindメソッドを使った場合)は直接unbind
unbindEvent(bindObj);}else if(isGlobal){if(getWindowOfDocument(doc)==null){ // アンバインドする対象のdocumentがもうすでに閉じられている場合は何もしない
return;}$(doc).undelegate(selector,eventName,handler);}else {$(rootElement).undelegate(selector,eventName,handler);}if(!shouldNotUnregister){ // バインド中のハンドラリストから削除
var boundHandlers=controller.__controllerContext.boundHandlers;boundHandlers.splice($.inArray(bindObj,boundHandlers),1);}} /**
	 * バインドマップに基づいてイベントハンドラをアンバインドします。
	 *
	 * @private
	 * @param {Controller} controller コントローラ
	 */function unbindEventHandlers(controller){var rootElement=controller.rootElement;if(!rootElement){ // ルートエレメントが設定される前のunbind(=イベントハンドリング前)なら何もしない
return;} // ドキュメントはrootElementのownerDocument。rootElement自体がdocumentノードならrootElement。
var doc=getDocumentOf(rootElement);var boundHandlers=controller.__controllerContext.boundHandlers;for(var i=0,l=boundHandlers.length;i<l;i++){var bindObj=boundHandlers[i];unbindByBindObject(bindObj,doc,true);} // バインド中のハンドラリストを空にする
controller.__controllerContext.boundHandlers=[];} /**
	 * 指定されたフラグで子コントローラを含む全てのコントローラのexecuteListenersフラグを変更します。
	 *
	 * @private
	 * @param {Controller} controller コントローラ
	 * @param {Boolean} flag フラグ
	 */function setExecuteListenersFlag(controller,flag){doForEachControllerGroups(controller,function(c){c.__controllerContext.executeListeners=flag;});} /**
	 * コントローラに定義されたライフサイクルイベントを呼び出す関数を作成する
	 *
	 * @param {Controller} controller
	 * @param {String} funcName __init, __postInit, __ready のいずれか
	 * @param {Function} callback ライフサイクルイベントの実行が終わった時(非同期ならresolveされた時)に実行する関数
	 * @returns {Function}
	 */function createLifecycleCaller(controller,funcName,callback){return function(){var ret=null;var lifecycleFunc=controller[funcName];var controllerName=controller.__name;var isAlreadyExecuted=false;if(funcName==='__init'){isAlreadyExecuted=controller.isInit;}else if(funcName==='__postInit'){isAlreadyExecuted=controller.isPostInit;}else {isAlreadyExecuted=controller.isReady;}if(!isAlreadyExecuted&&lifecycleFunc){try{ret=controller[funcName](createInitializationContext(controller));}catch(e){ // ライフサイクルイベントの呼び出しで例外が投げられた
fwLogger.error(FW_LOG_INIT_CONTROLLER_THROWN_ERROR,controllerName,funcName); // controllerをdispose
disposeController(controller,e);}}if(ret&&isFunction(ret.done)&&isFunction(ret.fail)){ // ライフサイクルイベントがpromiseを返している場合
// resolveされたらcallbackを実行
ret.done(callback).fail(function() /* var_args */{ // rejectされた場合は連鎖的にdisposeする
fwLogger.error(FW_LOG_INIT_CONTROLLER_REJECTED,controllerName,funcName);fwLogger.error(FW_LOG_INIT_CONTROLLER_ERROR,controller.rootController.__name);var rejectReason=createRejectReason(ERR_CODE_CONTROLLER_INIT_REJECTED_BY_USER,controllerName,argsToArray(arguments)); // controllerをdispose
disposeController(controller.rootController,null,rejectReason);});}else { // callbackを実行
callback();}};} /**
	 * 非同期で実行するライフサイクル(__init, __postInit, __ready)イベントを実行する
	 *
	 * @private
	 * @param {Controller} controller コントローラ(ルートコントローラ)
	 * @returns {Promise[]} Promiseオブジェクト
	 * @param {String} funcName 非同期で実行するライフサイクル関数名。__init, __postInit, __readyのいずれか。
	 */function executeLifecycleEventChain(controller,funcName){function execInner(c){var callback,promises; // ライフサイクルイベント名で場合分けして、待機するプロミスの取得と実行するコールバックの作成を行う
// __postInit, __readyは子から先に実行する
if(funcName==='__init'){callback=createCallbackForInit(c);promises=getPromisesForInit(c);}else if(funcName==='__postInit'){callback=createCallbackForPostInit(c);promises=getPromisesForPostInit(c);}else {callback=createCallbackForReady(c);promises=getPromisesForReady(c);} // waitForPromisesで全てのプロミスが終わってからライフサイクルイベントの呼び出しを行う
// promisesの中にpendingのpromiseが無い場合(空または全てのプロミスがresolve/reject済み)の場合、
// ライフサイクルイベントの呼び出しは同期的に呼ばれる
// ライフサイクルイベントの待機プロミスはコントローラに覚えさせておく
// (unmanageChild時で待機プロミスが減った時に対応するため)
var context=controller.__controllerContext;context.waitingPromisesManagerMap=context.waitingPromsiesManager||{};context.waitingPromisesManagerMap[funcName]=waitForPromises(promises,createLifecycleCaller(c,funcName,callback));} // すでにpromisesのいずれかが失敗している場合は、失敗した時にdisposeされているはず
// disopseされていたら何もしない
if(isDisposing(controller)){return;}doForEachControllerGroups(controller,execInner);} /**
	 * __initイベントを実行するために必要なPromiseを返します。
	 *
	 * @private
	 * @param {Controller} controller コントローラ
	 * @returns {Promise[]} Promiseオブジェクト
	 */function getPromisesForInit(controller){ // 自身のテンプレート用Promiseオブジェクトと、親コントローラのinitPromiseオブジェクトを返す
var promises=[controller.preInitPromise];if(controller.parentController){promises.push(controller.parentController.initPromise);}return promises;} /**
	 * __postInitイベントを実行するために必要なPromiseを返します
	 *
	 * @private
	 * @param {Controller} controller コントローラ
	 * @returns {Promise[]} Promiseオブジェクト
	 */function getPromisesForPostInit(controller){ // 子コントローラのpostInitPromiseを取得
var promises=getChildControllerPromises(controller,'postInitPromise');promises.push(controller.initPromise);return promises;} /**
	 * __readyイベントを実行するために必要なPromiseを返します
	 *
	 * @private
	 * @param {Controller} controller コントローラ
	 * @returns {Promise[]} Promiseオブジェクト
	 */function getPromisesForReady(controller){ // 子コントローラのreadyPromiseを取得
var promises=getChildControllerPromises(controller,'readyPromise');promises.push(controller.postInitPromise);return promises;} /**
	 * __init実行後に実行するコールバック関数を返します。
	 *
	 * @private
	 * @param {Controller} controller コントローラ
	 * @returns {Function} 次に実行する__initを知らせるために、子コントローラの配列を返す関数を返します
	 */function createCallbackForInit(controller){return function(){ // disopseまたはunbindされていたら何もしない
if(isUnbinding(controller)){return;} /**
			 * 全コントローラのinitが終わっているかどうかチェックする関数
			 *
			 * @private
			 * @returns {boolean}
			 */function isAllInitExecuted(){ // __initは親から順に実行しているので、コントローラがリーフノードの場合のみチェックすればよいが、
// 動的に子コントローラが追加される場合もあるため、いずれのコントローラの__initが完了た場合もチェックする
var ret=true;doForEachControllerGroups(controller.rootController,function(c){ret=c.isInit;return ret;});return ret;}if(controller.isInit){ // このコントローラの__init後の処理がすでに実行済みであれば
// 全コントローラの__initが終わっているかどうかチェックして__postInitを呼び出す
if(isAllInitExecuted()){triggerPostInit(controller.rootController);}return;} // isInitフラグを立てる
controller.isInit=true;var initDfd=controller.__controllerContext.initDfd; // FW、ユーザともに使用しないので削除
delete controller.__controllerContext.templatePromise;delete controller.__controllerContext.preInitDfd;delete controller.__controllerContext.initDfd; // 子コントローラのrootElementとviewを設定
var rootElement=controller.rootElement; // 子コントロ���ラ
try{var meta=controller.__meta;var childControllers=controller.__controllerContext.childControllers; // メタのルートエレメント定義とコントローラインスタンスの紐付け
for(var p in meta){if($.inArray(controller[p],childControllers)!==-1){ // 子コントローラに一時的にルートエレメントのメタ定義を持たせる
controller[p].__controllerContext.metaRootElement=meta[p]&&meta[p].rootElement;}} // ルートコントローラはrootElement設定済み
doForEachChildControllers(controller,function(c,parent){var metaRootElement=c.__controllerContext.metaRootElement;delete c.__controllerContext.metaRootElement;if(c.rootElement){ // ルートエレメント設定済みなら何もしない
// (manageChildによる動的子コントローラの場合など、再設定しないようにする)
return;} // ルートエレメントが__metaで指定されている場合は指定箇所、
// そうでない場合は親と同じルートエレメントをターゲットにする
var target=metaRootElement?getBindTarget(metaRootElement,c,controller):rootElement; // バインド箇所決定後には不要なので削除
// ターゲット要素のチェック
validateTargetElement(target,c.__controllerContext.controllerDef,c.__name); // ルートエレメントの設定
c.rootElement=target; // コントローラのviewにコントローラを設定
c.view.__controller=c;});}catch(e){ // エラーが起きたらコントローラをdispose
disposeController(controller,e);return;} // initDfdをresolveする前に、この時点でコントローラツリー上の__initが終わっているかどうかチェック
var shouldTriggerPostInit=isAllInitExecuted(); // resolveして、次のコールバックがあれば次を実行
initDfd.resolveWith(controller); // initPromiseのdoneハンドラでunbindされているかどうかチェック
// unbindされていなくて全コントローラの__initが終わっていたら__postInitを呼び出す
if(!isUnbinding(controller)&&shouldTriggerPostInit){triggerPostInit(controller.rootController);}};} /**
	 * __postInitイベントで実行するコールバック関数を返します。
	 *
	 * @private
	 * @param {Controller} controller コントローラ
	 * @returns {Function} コールバック関数
	 */function createCallbackForPostInit(controller){return function(){ // disopseまたはunbindされていたら何もしない。
if(isUnbinding(controller)){return;}controller.isPostInit=true; // 動的に追加された子コントローラに対応するため、
// 再度子コントローラのpostInitプロミスを取得して、その完了を待ってからpostInitDfdをresolveする
var context=controller.__controllerContext;context.waitingPromsiesManager=context.waitingPromsiesManager||{};context.waitingPromsiesManager['__postInit']=waitForPromises(getPromisesForPostInit(controller),function(){ // unbindまたはdisposeされたかチェック
if(isUnbinding(controller)){return;}var postInitDfd=context.postInitDfd;if(!postInitDfd){ // 既に削除済み(=resolve済み)の場合は、以降の処理は実行済みなので何もしない
return;} // FW、ユーザともに使用しないので削除してresolve
delete context.postInitDfd;postInitDfd.resolveWith(controller); // postInitPromiseのdoneハンドラでunbindまたはdisposeされている場合は何もしない
// また、すでにバインド実行済みなら何もしない
if(isUnbinding(controller)||context.isExecutedBind){return;}if(!context.isRoot){ // 子コントローラの場合
if(!controller.rootController.isPostInit){ // 通常、この時点ではルートのpostInitは未完了であり、
// 以降の処理(イベントハンドラのバインドとtriggerReady)は、
// ルートのpostInit後の処理で行うので何もしない
return;} // ただし、例えばrootの__readyのタイミングでこのコントローラがmanageChildで子コントローラになったなどの場合は、
// この時点でルートのpostInit後の処理が終わっている。
// その場合、このコントローラのイベントハンドラのバインドは自分で行い、
// かつこのコントローラの__readyを実行するためtriggerReadyを呼び出す必要がある
if(!controller.parentController.__meta||controller.parentController.__meta.userHandlers!==false){bindByBindMap(controller);}triggerReady(controller.rootController);return;} // ルートコントローラなら次のフェーズへ
// イベントハンドラのバインド
// メタのuseHandlers定義とコントローラインスタンスの紐付け
var meta=controller.__meta;var childControllers=context.childControllers;for(var p in meta){if($.inArray(controller[p],childControllers)!==-1){ // 子コントローラに一時的にルートエレメントのメタ定義を持たせる
controller[p].__controllerContext.metaUseHandlers=meta[p]&&meta[p].useHandlers;}}doForEachControllerGroups(controller,function(c,parent){var metaUseHandlers=c.__controllerContext.metaUseHandlers;delete c.__controllerContext.metaUseHandlers; // バインド処理をしたかどうか
// manageChildによる動的子コントローラについて２重にバインドしないためのフラグ
if(c.__controllerContext.isExecutedBind){return;}c.__controllerContext.isExecutedBind=true;if(metaUseHandlers!==false){ // 親のuseHandlersでfalseが指定されていなければバインドを実行する
bindByBindMap(c);}}); // managed!==falseの場合のみh5controllerboundをトリガ
// (managedがfalseならコントローラマネージャの管理対象ではないため、h5controllerboundイベントをトリガしない)
if(context.managed!==false){ // h5controllerboundイベントをトリガ.
$(controller.rootElement).trigger('h5controllerbound',controller);if(isUnbinding(controller)){ // イベントハンドラでunbindされたら終了
return;}} // __readyの実行
triggerReady(controller);});return;};} /**
	 * __readyイベントで実行するコールバック関数を返します。
	 *
	 * @private
	 * @param {Controller} controller コントローラ
	 * @returns {Function} コールバック関数
	 */function createCallbackForReady(controller){return function(){ // disopseまたはunbindされていたら何もしない。
if(isUnbinding(controller)){return;}controller.isReady=true; // 動的に追加された子コントローラに対応するため、
// 再度子コントローラのreadyプロミスを取得して、その完了を待ってからreadyDfdをresolveする
var context=controller.__controllerContext;context.waitingPromsiesManager=context.waitingPromsiesManager||{};context.waitingPromsiesManager['__ready']=waitForPromises(getPromisesForReady(controller),function(){ // unbind,disposeされた場合は何もしない
if(isUnbinding(controller)){return;}var readyDfd=context.readyDfd;if(!readyDfd){ // 既に削除済み(=resolve済み)の場合は、以降の処理は実行済みなので何もしない
return;} // FW、ユーザともに使用しないので削除してresolve
delete context.readyDfd;readyDfd.resolveWith(controller); // readyPromiseのdoneハンドラでunbindまたはdisposeされている場合は何もしない
// また、ルートコントローラでない場合も何もしない
if(isUnbinding(controller)||!context.isRoot){return;} // ルートコントローラであれば全ての処理が終了したことを表すイベント"h5controllerready"をトリガ
$(controller.rootElement).trigger('h5controllerready',controller);});};} /**
	 * 指定された要素が文字列があれば、ルートエレメント、{}記法を考慮した要素をjQueryオブジェクト化して返します。 DOM要素、jQueryオブジェクトであれば、
	 * jQueryオブジェクト化して(指定要素がjQueryオブジェクトの場合、無駄な処理になるがコスト的には問題ない)返します。
	 *
	 * @private
	 * @param {String|DOM|jQuery} element セレクタ、DOM要素、jQueryオブジェクト
	 * @param {Controlelr} controller
	 * @returns {jQuery} jQueryオブジェクト
	 */function getTarget(element,controller){if(!isString(element)){return $(element);}var selector=$.trim(element);if(isGlobalSelector(selector)){var s=trimGlobalSelectorBracket(selector);return $(getGlobalSelectorTarget(s,getDocumentOf(controller.rootElement),controller));}return $(controller.rootElement).find(element);} /**
	 * ハンドラをバインド済みリストに登録します。
	 *
	 * @private
	 * @param {Object} bindObj
	 * @param {Object} eventHandlerInfo イベントハンドラ情報
	 */function registerWithBoundHandlers(bindObj){bindObj.controller.__controllerContext.boundHandlers.push(bindObj);} /**
	 * バインドオブジェクトを返します。
	 *
	 * @private
	 * @param {Controller} controller コントローラ
	 * @param {String} selector セレクタ
	 * @param {String} eventName イベント名
	 * @param {Function} func ハンドラとして登録したい関数
	 * @returns {Object} バインドオブジェクト
	 *          <ul>
	 *          <li>bindObj.controller - コントローラ</li>
	 *          <li>bindObj.selector - セレクタ</li>
	 *          <li>bindObj.eventName - イベント名</li>
	 *          <li>bindObj.handler - イベントハンドラ</li>
	 *          </ul>
	 */function getNormalBindObj(controller,eventName,func){return {controller:controller,eventName:eventName,handler:func};} /**
	 * クラスブラウザな"mousewheel"イベントのためのバインドオブジェクトを返します。
	 *
	 * @private
	 * @param {Controller} controller コントローラ
	 * @param {String} eventName イベント名
	 * @param {Function} func ハンドラとして登録したい関数
	 * @returns {Object} バインドオブジェクト
	 *          <ul>
	 *          <li>bindObj.controller - コントローラ</li>
	 *          <li>bindObj.eventName - イベント名</li>
	 *          <li>bindObj.handler - イベントハンドラ</li>
	 *          </ul>
	 */function getNormalizeMouseWheelBindObj(controller,eventName,func){return {controller:controller, // Firefoxには"mousewheel"イベントがない
eventName:_typeof(document.onmousewheel)===TYPE_OF_UNDEFINED?'DOMMouseScroll':eventName,handler:function handler(context){var event=context.event; // jQuery1.7以降ではwheelDeltaとdetailがjQueryEventにコピーされない。
// hifive側でoriginalEventから取った値をコピーする
if(event.wheelDelta==null&&event.originalEvent&&event.originalEvent.wheelDelta!=null){event.wheelDelta=event.originalEvent.wheelDelta;} // Firefox用
// wheelDeltaが無く、かつdetailに値がセットされているならwheelDeltaにdetailから計算した値を入れる
if(event.wheelDelta==null&&event.originalEvent&&event.originalEvent.detail!=null){event.wheelDelta=-event.originalEvent.detail*40;}func.call(controller,context);}};} /**
	 * hifiveの独自イベント"h5trackstart", "h5trackmove", "h5trackend"のためのバインドオブジェクトを返します。
	 *
	 * @private
	 * @param {Controller} controller コントローラ
	 * @param {String} eventName イベント名 h5trackstart,h5trackmove,h5trackendのいずれか
	 * @param {Function} func ハンドラとして登録したい関数
	 * @returns {Object|Object[]} バインドオブジェクト
	 *          <ul>
	 *          <li>bindObj.controller - コントローラ</li>
	 *          <li>bindObj.eventName - イベント名</li>
	 *          <li>bindObj.handler - イベントハンドラ</li>
	 *          </ul>
	 */function getH5TrackBindObj(controller,eventName,func){var normalBindObj=null;if(eventName===EVENT_NAME_H5_TRACKSTART){ // h5trackstartの場合
return getNormalBindObj(controller,eventName,func);} // h5trackmove,h5trackendの場合は、ハンドラ呼び出し前にオフセット計算処理を行うようラップする
normalBindObj=getNormalBindObj(controller,eventName,function(context){var event=context.event;var h5DelegatingEvent=event.h5DelegatingEvent;if(!h5DelegatingEvent){ // マウスやタッチではなくtriggerで呼ばれた場合はオフセット正規化はしない
return func.apply(this,arguments);} // マウスイベントによる発火なら場合はオフセットを正規化する
var originalEventType=h5DelegatingEvent.type;if(originalEventType==='mousemove'||originalEventType==='mouseup'){var offset=$(event.currentTarget).offset()||{left:0,top:0};event.offsetX=event.pageX-offset.left;event.offsetY=event.pageY-offset.top;}func.apply(this,arguments);}); // ラップした関数をhandlerに持たせるので、ラップ前をoriginalHandlerに覚えておく
// ogirinalHandlerにはユーザが指定した関数と同じ関数(ラップ前)を持っていないとoff()でアンバインドできないため
normalBindObj.originalHandler=func;return normalBindObj;} /**
	 * hifiveの独自イベント"h5trackstart", "h5trackmove", "h5trackend"を対象のコントローラで有効にするためのハンドラを返します
	 * <p>
	 * h5trackハンドラは、mousedown,touchstartt時に動的にバインドし、mouseend,touchend時に動的にアンバインドしています。
	 * </p>
	 * <p>
	 * この挙動を有効にするためのバインドオブジェクトを生成して返します。
	 * </p>
	 *
	 * @private
	 * @param {Controller} controller コントローラ
	 * @param {string} selector セレクタ
	 * @returns {Object[]} バインドオブジェクトの配列 mousedown,touchstartのバインドオブジェクト(touchが無い場合はmousedonwのみ)
	 *          <ul>
	 *          <li>bindObj.controller - コントローラ</li>
	 *          <li>bindObj.selector - セレクタ</li>
	 *          <li>bindObj.eventName - イベント名</li>
	 *          <li>bindObj.handler - イベントハンドラ</li>
	 *          </ul>
	 */function getBindObjForEnableH5track(controller,selector){ // タッチイベントがあるかどうか
var hasTouchEvent=_typeof(document.ontouchstart)!==TYPE_OF_UNDEFINED;function getEventType(en){switch(en){case 'touchstart':case 'mousedown':return EVENT_NAME_H5_TRACKSTART;case 'touchmove':case 'mousemove':return EVENT_NAME_H5_TRACKMOVE;case 'touchend':case 'mouseup':return EVENT_NAME_H5_TRACKEND;}} // jQuery.Eventオブジェクトのプロパティをコピーする。
// 1.6.xの場合, "liveFired"というプロパティがあるがこれをコピーしてしまうとtriggerしてもイベントが発火しない。
function copyEventObject(src,dest){for(var prop in src){if(src.hasOwnProperty(prop)&&!dest[prop]&&prop!=='target'&&prop!=='currentTarget'&&prop!=='originalEvent'&&prop!=='liveFired'){dest[prop]=src[prop];}}dest.h5DelegatingEvent=src;}var $document=$(getDocumentOf(controller.rootElement)); // h5trackendイベントの最後でハンドラの除去を行う関数を格納するための変数
var removeHandlers=null;var execute=false;function getHandler(en,eventTarget,setup){return function(context){var type=getEventType(en);var isStart=type===EVENT_NAME_H5_TRACKSTART;if(isStart&&execute){ // スタートイベントが起きた時に実行中 = マルチタッチされた時なので、何もしない
return;} // タッチイベントかどうか
var isTouch=context.event.type.indexOf('touch')===0;if(isTouch){ // タッチイベントの場合、イベントオブジェクトに座標系のプロパティを付加
initTouchEventObject(context.event,en);}var newEvent=new $.Event(type);copyEventObject(context.event,newEvent);var target=context.event.target;if(eventTarget){target=eventTarget;}if(setup){setup(newEvent);} // ------------- h5track*のトリガ処理 -------------
// originalEventがあればoriginalEvent、なければjQueryEventオブジェクトでh5track*をトリガしたかどうかのフラグを管理する
var triggeredFlagEvent=context.event.originalEvent||context.event;if(isStart&&$.inArray(triggeredFlagEvent,storedEvents)===-1){ // スタート時で、かつこのスタートイベントがstoredEventsに入っていないなら
// トリガする前にトリガフラグ保管���ベントのリセット(storedEventsに不要なイベントオブジェクトを残さないため)
storedEvents=[];h5trackTriggeredFlags=[];}var index=$.inArray(triggeredFlagEvent,storedEvents);if(index===-1){ // storedEventsにイベントが登録されていなければ追加し、トリガ済みフラグにfalseをセットする
index=storedEvents.push(triggeredFlagEvent)-1;h5trackTriggeredFlags[index]=false;} // sotredEventsにイベントが登録されていれば、そのindexからトリガ済みフラグを取得する
var triggeredFlag=h5trackTriggeredFlags[index];if(!triggeredFlag&&(!isTouch||execute||isStart)){ // 親子コントローラで複数のイベントハンドラが同じイベントにバインドされているときに、
// それぞれがトリガしてイベントハンドラがループしないように制御している。
// マウス/タッチイベントがh5track*にトリガ済みではない時にトリガする。
// タッチイベントの場合、h5track中でないのにmoveやtouchendが起きた時は何もしない。
// タッチイベントの場合はターゲットにバインドしており(マウスの場合はdocument)、
// バブリングによって同じイベントが再度トリガされるのを防ぐためである。
// トリガ済みフラグを立てる
h5trackTriggeredFlags[index]=true; // h5track*イベントをトリガ
$(target).trigger(newEvent,context.evArg);execute=true;} // 不要なイベントオブジェクトを残さないため、
// documentだったら現在のイベントとそのフラグをstoredEvents/h5trackTriggeredFlagsから外す
// h5trackend時ならstoredEvents/h5trackTtriggeredFlagsをリセットする
// (※ documentまでバブリングすればイベントオブジェクトを保管しておく必要がなくなるため)
if(context.event.currentTarget===document){if(type===EVENT_NAME_H5_TRACKEND){storedEvents=[];h5trackTriggeredFlags=[];}var storedIndex=$.inArray(triggeredFlagEvent,storedEvents);if(storedIndex!==-1){storedEvents.splice(index,1);h5trackTriggeredFlags.splice(index,1);}} // ------------- h5track*のトリガ処理 ここまで -------------
if(isStart&&execute){ // スタートイベント、かつ今h5trackstartをトリガしたところなら、
// h5trackmove,endを登録
// トラック操作で文字列選択やスクロールなどが起きないように元のイベントのpreventDefault()を呼ぶ
// ただし、h5trackstartがpreventDefault()されていたら、元のイベントのpreventDefault()は呼ばない
if(!newEvent.isDefaultPrevented()){newEvent.h5DelegatingEvent.preventDefault();}var nt=newEvent.target; // 直前のh5track系イベントとの位置の差分を格納
var ox=newEvent.clientX;var oy=newEvent.clientY;var setupDPos=function setupDPos(ev){var cx=ev.clientX;var cy=ev.clientY;ev.dx=cx-ox;ev.dy=cy-oy;ox=cx;oy=cy;}; // h5trackstart実行時に、move、upのハンドラを作成して登録する。
// コンテキストをとるように関数をラップして、bindする。
// touchstartで発火したならtouchstart,touchendにバインド、
// そうでない場合(mousedown)ならmousemove,mousenendにバインド
var moveEventType=isTouch?'touchmove':'mousemove';var endEventType=isTouch?'touchend':'mouseup';var moveHandler=getHandler(moveEventType,nt,setupDPos);var upHandler=getHandler(endEventType,nt);var moveHandlerWrapped=function moveHandlerWrapped(e){context.event=e;context.evArg=handlerArgumentsToContextEvArg(arguments);moveHandler(context);};var upHandlerWrapped=function upHandlerWrapped(e){context.event=e;context.evArg=handlerArgumentsToContextEvArg(arguments);upHandler(context);}; // タッチならイベントの起きた要素、マウスならdocumentにバインド
var $bindTarget=isTouch?$(nt):$document; // moveとendのunbindをする関数
removeHandlers=function removeHandlers(){storedEvents=[];h5trackTriggeredFlags=[];$bindTarget.unbind(moveEventType,moveHandlerWrapped);$bindTarget.unbind(endEventType,upHandlerWrapped);if(!isTouch&&controller.rootElement!==document){$(controller.rootElement).unbind(moveEventType,moveHandlerWrapped);$(controller.rootElement).unbind(endEventType,upHandlerWrapped);}}; // h5trackmoveとh5trackendのbindを行う
$bindTarget.bind(moveEventType,moveHandlerWrapped);$bindTarget.bind(endEventType,upHandlerWrapped); // タッチでなく、かつコントローラのルートエレメントがdocumentでなかったら、ルートエレメントにもバインドする
// タッチイベントでない場合、move,endをdocumentにバインドしているが、途中でmousemove,mouseupを
// stopPropagationされたときに、h5trackイベントを発火することができなくなる。
// コントローラのルートエレメント外でstopPropagationされていた場合を考慮して、
// ルートエレメントにもmove,endをバインドする。
// (ルートエレメントの内側でstopPropagationしている場合は考慮しない)
// (タッチの場合はターゲットはstart時の要素なので2重にバインドする必要はない)
if(!isTouch&&controller.rootElement!==document){ // h5trackmoveとh5trackendのbindを行う
$(controller.rootElement).bind(moveEventType,moveHandlerWrapped);$(controller.rootElement).bind(endEventType,upHandlerWrapped);}}else if(type===EVENT_NAME_H5_TRACKEND){ // touchend,mousup時(=h5trackend時)にmoveとendのイベントをunbindする
removeHandlers();execute=false;}};}function createBindObj(en){return {controller:controller,selector:selector,eventName:en,handler:getHandler(en), // コントローラが内部で使用するハンドラ。ポイントカットなどのアスペクトの影響を受けない。
isInnerBindObj:true};}var bindObjects=[createBindObj('mousedown')];if(hasTouchEvent){ // タッチがあるならタッチにもバインド
bindObjects.push(createBindObj('touchstart'));}return bindObjects;} /**
	 * 要素のオフセットを返す
	 *
	 * @private
	 * @param {DOM} target
	 * @returns {Object} offset
	 */function getOffset(target){if(target.tagName.toLowerCase()!=='svg'||isSVGOffsetCollect()){ // オフセットを返す
return $(target).offset();} // targetがSVG要素で、SVG要素のoffsetが正しくとれないブラウザの場合は自分で計算する issue #393
var doc=getDocumentOf(target);var dummyRect=doc.createElementNS(SVG_XMLNS,'rect'); // viewBoxを考慮して、SVG要素の左上位置にrectを置くようにしている
var viewBox=target.viewBox;var x=viewBox.baseVal.x;var y=viewBox.baseVal.y;dummyRect.setAttribute('x',x);dummyRect.setAttribute('y',y);dummyRect.setAttribute('width',1);dummyRect.setAttribute('height',1); // transformを空文字にして無効にする(cssで指定されていたとしても無効にして計算できるようにするため)
clearTransformStyle(dummyRect); // ダミー要素を追加してオフセット位置を取得
target.appendChild(dummyRect);var dummyRectOffset=$(dummyRect).offset(); // ダミー要素を削除
target.removeChild(dummyRect); // 取得したオフセット位置を返す
return dummyRectOffset;} /**
	 * タッチイベントのイベントオブジェクトにpageXやoffsetXといった座標系のプロパティを追加します。
	 * <p>
	 * touchstart/touchmove/touchendをjQuery.trigger()で発火させた場合、originalEventプロパティは存在しないので、座標系プロパティのコピーを行いません。
	 * </p>
	 *
	 * @private
	 * @param {Event} event jQuery.Eventオブジェクト
	 * @param {String} eventName イベント名
	 */function initTouchEventObject(event,eventName){var originalEvent=event.originalEvent;if(!originalEvent){return;}var touches=eventName==='touchend'||eventName==='touchcancel'?originalEvent.changedTouches[0]:originalEvent.touches[0];var pageX=touches.pageX;var pageY=touches.pageY;event.pageX=originalEvent.pageX=pageX;event.pageY=originalEvent.pageY=pageY;event.screenX=originalEvent.screenX=touches.screenX;event.screenY=originalEvent.screenY=touches.screenY;event.clientX=originalEvent.clientX=touches.clientX;event.clientY=originalEvent.clientY=touches.clientY;var target=event.target;if(target.ownerSVGElement){target=target.farthestViewportElement;}else if(target===window||target===document){target=document.body;}var offset=getOffset(target);var offsetX=pageX-offset.left;var offsetY=pageY-offset.top;event.offsetX=originalEvent.offsetX=offsetX;event.offsetY=originalEvent.offsetY=offsetY;} /**
	 * イベントオブジェクトを正規化します。
	 *
	 * @private
	 * @param {Object} event jQuery.Eventオブジェクト
	 */function normalizeEventObjext(event){ // ここはnull, undefinedの場合にtrueとしたいため、あえて厳密等価を使用していない
if(event&&event.offsetX==null&&event.offsetY==null&&event.pageX&&event.pageY){var target=event.target;if(target.ownerSVGElement){ // SVGに属する図形なら、外側のSVG要素をtargetとして扱う
target=target.farthestViewportElement;}else if(target===window||target===document){target=document.body;}var offset=getOffset(target);event.offsetX=event.pageX-offset.left;event.offsetY=event.pageY-offset.top;}} /**
	 * イベントハンドラに渡された、イベントオブジェクト以降の引数を、context.evArgに格納する形に変換します
	 *
	 * <pre>
	 * 例:
	 * $elm.trigger('mouseup', [1, 2, 3]);
	 * なら、イベントハンドラに渡されるイベントは、[event, 1, 2, 3]です。
	 * この[1,2,3]の部分をcontext.evArgに格納してコントローラでバインドしたハンドラに渡す必要があるため、変換が必要になります。
	 * </pre>
	 *
	 * 引数が複数(イベントオブジェクトは除く)ある場合は配列、1つしかない場合はそれをそのまま、無い場合はundefinedを返します。
	 *
	 * @private
	 * @param {argumentsObject} args イベントハンドラに渡されたargumentsオブジェクト
	 * @returns {Any} context.evArgに格納する形式のオブジェクト
	 */function handlerArgumentsToContextEvArg(args){ // 1番目はイベントオブジェクトが入っているので無視して、2番目以降からをevArgに格納する形にする
// 格納するものがないならundefined
// 1つだけあるならそれ
// 2つ以上あるなら配列を返す
var evArg;if(args.length<3){ // 引数部分が1つ以下ならargs[1]をevArgに格納（引数なしならevArgはundefined)
evArg=args[1];}else { // 引数が2つ以上なら配列にしてevArgに格納
evArg=argsToArray(args).slice(1);}return evArg;} /**
	 * イベントコンテキストを作成します。
	 *
	 * @private
	 * @param {Object} bindObj バインドオブジェクト
	 * @param {Array} args 1番目にはjQuery.Eventオブジェクト、2番目はjQuery.triggerに渡した引数
	 * @returns {EventContext}
	 */function createEventContext(bindObj,args){var event=null;var evArg=null;if(args){event=args[0];evArg=handlerArgumentsToContextEvArg(args);} // イベントオブジェクトの正規化
normalizeEventObjext(event);return new EventContext(bindObj.controller,event,evArg,bindObj.evSelector,bindObj.evSelectorType);} /**
	 * 初期化イベントコンテキストをセットアップします。
	 *
	 * @private
	 * @param {Controller} rootController ルートコントローラ
	 * @returns {Object} argsを持つオブジェクト
	 */function createInitializationContext(controller){return {args:controller.__controllerContext.args};} /**
	 * コントローラとその子孫コントローラのrootElementと、view.__controllerにnullをセットします。
	 *
	 * @private
	 * @param {Controller} controller コントローラ
	 */function unbindRootElement(controller){doForEachControllerGroups(controller,function(c){c.rootElement=null;c.view.__controller=null;});} /**
	 * コントローラをバインドする対象となる要素を返します。
	 *
	 * @private
	 * @param {String|DOM|jQuery} element セレクタ、DOM要素、もしくはjQueryオブジェクト
	 * @param {Controller} controller バインドするコントローラ
	 * @param {Controller} parentController 親コントローラ
	 * @returns {DOM} コントローラのバインド対象である要素
	 */function getBindTarget(element,controller,parentController){if(element==null){throwFwError(ERR_CODE_BIND_TARGET_REQUIRED,[controller.__name]);}var $targets; // elementが文字列でもオブジェクトでもないときはエラー
if(!isString(element)&&(typeof element==='undefined'?'undefined':_typeof(element))!=='object'){throwFwError(ERR_CODE_BIND_TARGET_ILLEGAL,[controller.__name]);}if(parentController){ // 親コントローラが指定されている場合は、親のコントローラを起点に探索する
$targets=getTarget(element,parentController);}else {$targets=$(element);} // 要素が存在しないときはエラー
if($targets.length===0){throwFwError(ERR_CODE_BIND_NO_TARGET,[controller.__name]);} // 要素が複数存在するときはエラー
if($targets.length>1){throwFwError(ERR_CODE_BIND_TOO_MANY_TARGET,[controller.__name]);}return $targets.get(0);} /**
	 * __readyイベントを実行します
	 *
	 * @private
	 * @param {Controller} controller コントローラ
	 * @returns {Promose}
	 */function triggerReady(controller){ // コントローラマネージャの管理対象に追加する
// フレームワークオプションでコントローラマネージャの管理対象としない(managed:false)の場合、コントローラマネージャに登録しない
var managed=controller.__controllerContext.managed;var controllers=controllerManager.controllers;if($.inArray(controller,controllers)===-1&&managed!==false){controllers.push(controller);} // __readyイベントの実行
controller.__controllerContext.triggerReadyExecuted=true;executeLifecycleEventChain(controller,'__ready');} /**
	 * __initイベントを実行します
	 *
	 * @private
	 * @param {Controller} controller コントローラ
	 * @param {Boolean} async 同期で__initを呼ぶ場合はfalseを指定
	 */function triggerInit(controller,async){if(async===false){ // asyncがfalseなら同期
executeLifecycleEventChain(controller,'__init');return;} // asyncにfalseが指定されていない場合は必ず非同期になるようにする
setTimeout(function(){ // この時点でcontrollerがルートコントローラでなくなっている(__construct時などバインド後すぐにmanageChildされた)場合がある
// その場合はmanageChild()した側のルートコントローラのライフサイクルが完全に終わっている(===readyDfd削除まで終わっている)場合、
// 自分でtriggerInitする必要がある
// ルートのライフサイクルがまだ終わっていない場合は、親がライフサイクルを実行してくれるのでmanageChildされた側はtriggerInitしない
if(isUnbinding(controller)||!controller.__controllerContext.isRoot&&controller.rootController.readyDfd){return;}executeLifecycleEventChain(controller,'__init');},0);} /**
	 * rootController, parentControllerのセットと__postInitイベントを実行します。
	 *
	 * @private
	 * @param {Controller} controller コントローラ
	 */function triggerPostInit(controller){ // __postInitイベントの実行
controller.__controllerContext.triggerPostInitExecuted=true;executeLifecycleEventChain(controller,'__postInit');} /**
	 * h5.core.bindController()のために必要なプロパティをコントローラに追加します。
	 *
	 * @private
	 * @param {Controller} controller コントローラ
	 * @param {Object} param 初期化パラメータ
	 */function initInternalProperty(controller,param){doForEachControllerGroups(controller,function(c){var templateDfd=getDeferred();templateDfd.resolve();var context=c.__controllerContext;context.templatePromise=templateDfd.promise();context.initDfd=getDeferred();context.postInitDfd=getDeferred();context.readyDfd=getDeferred();context.isUnbinding=false;context.isUnbinded=false;context.isExecutedBind=false;context.triggerPostInitExecuted=false;context.triggerReadyExecuted=false;context.args=param;c.initPromise=context.initDfd.promise();c.postInitPromise=context.postInitDfd.promise();c.readyPromise=context.readyDfd.promise();c.isInit=false;c.isPostInit=false;c.isReady=false;});} /**
	 * インジケータを呼び出します。
	 *
	 * @private
	 * @param {Controller} controller コントローラ
	 * @param {Object} option インジケータのオプション
	 * @returns {Indicator}
	 */function callIndicator(controller,option){var target=null;var opt=option;if($.isPlainObject(opt)){target=opt.target;}else {opt={};}target=target?getTarget(target,controller):controller.rootElement;return h5.ui.indicator.call(controller,target,opt);} /**
	 * __unbind, __disposeイベントを実行します。 各コントローラの__unbind,__disposeが返すプロミスを成功かどうか変わらずに待つプロミス
	 *
	 * @private
	 * @param {Controller} controller コントローラ(ルートコントローラ)
	 * @param {String} funcName プロパティ名(__unbind | __dispose)
	 * @returns {Promise[]} Promiseオブジェクト
	 */function executeLifeEndChain(controller,funcName){var promises=[];var error=null; // 深さ優先で__unbind,__disposeの実行
doForEachControllerGroupsDepthFirst(controller,function(c){if(c[funcName]&&isFunction(c[funcName])){try{var ret=c[funcName]();}catch(e){ // エラーが起きても__unbind,__disposeの実行のチェーンは継続させる
// 最初に起きたエラーを覚えておいて、それ以降に起きたエラーは無視
error=error||e;}if(isPromise(ret)){promises.push(ret);}}});if(error){ // __unbind,__disposeで例外が発生した場合はエラーを投げる
// (executeLifeEndChainの呼び出し元で拾っている)
throw error;}return promises;} /**
	 * オブジェクトのhasOwnPropertyがtrueのプロパティ全てにnullを代入します。
	 * <p>
	 * ネストしたオブジェクトへのnull代入は行いません
	 * </p>
	 *
	 * @private
	 * @param {Object} obj
	 */function nullify(obj){for(var prop in obj){if(obj.hasOwnProperty(prop)){obj[prop]=null;}}} /**
	 * コントローラのリソース解放処理を行います。
	 *
	 * @private
	 * @param {Controller} controller コントローラ
	 * @param {Error} e エラーオブジェクト(正常時は無し)。エラーオブジェクトが指定されている場合は、dispose処理後にthrowする。
	 * @param {Object} rejectReason プロミスのfailハンドラに渡すオブジェクト(正常時は無し)
	 * @returns promise(ただしエラーがある場合はdispose処理が終わった後にエラーを投げて終了します)
	 */function disposeController(controller,e,rejectReason){ // rootControllerの取得
// rootControllerが設定される前(__construct内からdispose()を呼び出した場合)のことを考慮して、
// rootControllerを取得する前にisRootを見てtrueならcontrollerをルートコントローラとみなす
var rootController=controller.__controllerContext&&(controller.__controllerContext.isRoot?controller:controller.rootController);if(!rootController){ // rootControllerが無い場合、
// エラーオブジェクトがあればエラーを投げて終了。エラーのない場合は何もしないで終了。
if(e){ // ライフサイクルの中でdispose()して、__unbindや__disposeでエラーが出た時に、
// ライフサイクル呼び出しを包んでいるtry-catchのcatch節から再度disposeControllerが呼ばれる。
// その時に、dispose()の呼び出しで起きたエラーを飲まないようにするため、ここで再スローする。
throw e;}return;}if(isDisposing(rootController)){ // コントローラのdispose中、dispose済みのコントローラについて呼ばれた場合は何もしない
return;}rootController.__controllerContext.isDisposing=1; // unbindの実行
try{unbindController(rootController,rejectReason||e);}catch(unbindError){ // __unbindの実行でエラーが起きた場合
// 既に投げるエラーがある場合はここで発生したエラーは飲む(初出のエラーを投げるため)
// ここで発生したエラーが初出の場合は、ここで起きたエラーを最後に投げる
// (一番最初に起きた例外のみスローする。変数eには初出のエラーを格納する)
e=e||unbindError;} // __disposeを実行してからcleanupする
// __disposeの実行
var promises;var disposeError=null;try{promises=executeLifeEndChain(rootController,'__dispose');}catch(error){ // __disposeの実行でエラーが起きた場合
// 既に投げるエラーがある場合はそのまま飲むが、そうでない場合はここでキャッチしたエラーを投げる
// (一番最初に起きた例外のみスロー)
e=e||error; // disposeのエラーがあるかどうか覚えておく
disposeError=disposeError||error;} /** disposeメソッド(disposeControllerメソッド)が返すプロミスのdeferred */var dfd=rootController.deferred(); /** __disposeが返すプロミスがrejectされた時のRejectReasonオブジェクト */var disposeRejectReason=null; /** コントローラのクリーンアップとエラー時の処理 */function cleanup(){var lifecycleerrorObject=e||rejectReason||disposeError||disposeRejectReason; // 子から順にview.clearとnullifyの実行
doForEachControllerGroupsDepthFirst(rootController,function(c){ // viewのclearとnullify
if(c.view&&c.view.__view){ // 内部から呼ぶviewのクリアは、アンバインド後に呼ぶので
// view.clearではなくview.__view.clearを使ってエラーチェックをしないようにする
c.view.__view.clear();}if(!lifecycleerrorObject){ // エラーが起きていたらnullifyしない(nullifyをしないことでユーザがエラー時の原因を調べやすくなる)
nullify(c);}else { // isDisposedフラグを立てる
// (nullifyされた場合は__controllerContextごと消えるので見えないが、nullifyされない場合にもdisposeが完了したことが分かるようにする)
c.__controllerContext.isDisposed=1;}});if(disposeRejectReason){ // disposeの返すプロミスをrejectする。
// 引数にはエラーオブジェクトまたはrejectReasonを渡す
dfd.rejectWith(rootController,[disposeRejectReason]);}else {dfd.resolveWith(rootController);}if(!lifecycleerrorObject){ // 何もエラーが起きていなければここで終了
return;} // cleanupが終わったタイミングで、エラーまたはrejectされてdisposeされた場合は、"lifecycleerror"イベントをあげる
// イベントオブジェクトのdetailに(初出の)エラーオブジェクトまたはrejectReasonをいれる
// __disposeで初めてエラーまたはrejectされた場合は__disposeのエラーまたはrejectReasonを入れる
triggerLifecycleerror(rootController,lifecycleerrorObject);if(e||disposeError){throw e||disposeError;}}function disposeFail(){ // __disposeで投げられた例外または、promiseがrejectされた場合はそのrejectに渡された引数を、disposeの返すプロミスのfailハンドラに渡す
disposeRejectReason=disposeError||createRejectReason(ERR_CODE_CONTROLLER_DISPOSE_REJECTED_BY_USER,rootController.__name,argsToArray(arguments)); // コントローラの句リンアップ
cleanup();} // __disposeでエラーが起きていたらプロミスを待たずに失敗時の処理を実行
if(disposeError){disposeFail();}else { // __disposeの返すプロミスを待機してから句リンアップ処理を実行
waitForPromises(promises,cleanup,disposeFail,true);}return dfd.promise();} /**
	 * コントローラのアンバインド処理を行います。
	 *
	 * @private
	 * @param {Controller} controller コントローラ
	 * @param {Object} rejectReason 各Dfdをrejectするときにfailハンドラに渡す引数
	 */function unbindController(controller,rejectReason){ // 既にunbindされている何もしない
if(isUnbinding(controller)){return;}controller.__controllerContext.isUnbinding=1; // rejectまたはfailされていないdeferredをreject()する
// rejectReasonが指定されている場合はrejectReasonをfailハンドラの引数に渡す
// rejectReasonは未指定で、エラーオブジェクトが渡されている場合はエラーオブジェクトをfailハンドラの引数に渡す
// 正常時(rejectReasonもeもない場合)は、引数なし
rejectControllerDfd(controller,rejectReason); // __unbindの実行
var unbindError;try{executeLifeEndChain(controller,'__unbind');}catch(e){ // エラーが起きたら覚えておく
unbindError=e;}doForEachControllerGroups(controller,function(c){ // unbind時は__metaのuseHandlersによらずunbind(onで動的に追加されるハンドラもあるため)
unbindEventHandlers(c);});controller.__controllerContext.unbindList={}; // コントローラマネージャの管理対象から外す.
var controllers=controllerManager.controllers;var that=controller;controllerManager.controllers=$.grep(controllers,function(controllerInstance){return controllerInstance!==that;}); // h5controllerunboundイベントをトリガ
// (コントローラのpostInitまで終わっている、かつ、managedがfalseではない(===h5controllerboundをあげている)場合のみ)
if(controller.isPostInit&&controller.__controllerContext.managed!==false){$(controller.rootElement).trigger('h5controllerunbound',controller);} // rootElementとview.__view.controllerにnullをセット
unbindRootElement(controller); // unbind処理が終了したのでunbindedをtrueにする
controller.__controllerContext.isUnbinded=1; // __unbindでエラーが投げられていれば再スロー
if(unbindError){throw unbindError;}} /**
	 * 指定されたIDを持つViewインスタンスを返します。 自身が持つViewインスタンスが指定されたIDを持っていない場合、parentControllerのViewインスタンスに対して
	 * 持っているかどうか問い合わせ、持っていればそのインスタンスを、持っていなければ更に上に問い合わせます。
	 * ルートコントローラのViewインスタンスも持っていない場合、h5.core.viewに格納された最上位のViewインスタンスを返します。
	 *
	 * @private
	 * @param {String} templateId テンプレートID
	 * @param {Controller} controller コントローラ
	 * @returns {View}
	 */function getView(templateId,controller){if(controller.view.__view.isAvailable(templateId)){return controller.view.__view;}else if(controller.parentController){return getView(templateId,controller.parentController);}return h5.core.view;} /**
	 * 指定されたコントローラがdispose済みかどうかを返します
	 * <p>
	 * dispose処理の途中でまだdisposeが完了していない場合はfalseを返します
	 * </p>
	 *
	 * @private
	 * @param {Controller} controller コントローラ
	 * @returns {Boolean}
	 */function isDisposed(controller){return !controller.__controllerContext||controller.__controllerContext.isDisposed;} /**
	 * 指定されたコントローラがdispose処理中またはdispose済みかどうかを返します
	 * <p>
	 * isDisposedと違い、dispose処理の途中でまだdisposeが完了していない場合にtrueを返します
	 * </p>
	 *
	 * @private
	 * @param {Controller} controller コントローラ
	 * @returns {Boolean}
	 */function isDisposing(controller){return isDisposed(controller)||controller.__controllerContext.isDisposing;} /**
	 * 指定されたコントローラがunbind処理中またはunbind済みかどうかを返します
	 * <p>
	 * すでにdisposeされている場合はアンバインド済みなのでtrueを返します
	 * </p>
	 *
	 * @private
	 * @param {Controller} controller コントローラ
	 * @returns {Boolean}
	 */function isUnbinding(controller){var rc=controller.__controllerContext&&controller.__controllerContext.isRoot?controller:controller.rootController;return !rc||isDisposed(rc)||rc.__controllerContext.isUnbinding||rc.__controllerContext.isUnbinded;} /**
	 * 指定されたコントローラとその子供コントローラのresolve/rejectされていないdeferredをrejectします。
	 *
	 * @private
	 * @param {Controller} controller コントローラ
	 * @param {Any} [errorObj] rejectに渡すオブジェクト
	 */function rejectControllerDfd(controller,errorObj){ // 指定されたコントローラのルートコントローラを取得
// ルートからinitDfdをrejectしていく
var propertyArray=['postInitDfd','readyDfd']; // ルートからinitDfd.rejectしていく
var controllers=[];doForEachControllerGroups(controller,function(c){controllers.push(c);var dfd=c.__controllerContext['initDfd'];if(dfd&&!isRejected(dfd)&&!isResolved(dfd)){ // thisをDfdを持つコントローラにしてreject
dfd.rejectWith(c,[errorObj]);}}); // 子からpostInitDfd, readyDfdをrejectしていく
for(var i=0,l=propertyArray.length;i<l;i++){var property=propertyArray[i]; // initDfdと逆順
for(var index=controllers.length-1;index>=0;index--){var c=controllers[index];var dfd=c.__controllerContext[property];if(dfd&&!isRejected(dfd)&&!isResolved(dfd)){ // thisをDfdを持つコントローラにしてreject
dfd.rejectWith(c,[errorObj]);}}}} /**
	 * インラインコメントテンプレートノードを探す
	 *
	 * @private
	 * @param {Node} rootNode 探索を開始するルートノード
	 * @param {String} id テンプレートID
	 * @returns {Node} 発見したコメントノード、見つからなかった場合はnull
	 */function findCommentBindingTarget(rootNode,id){var childNodes=rootNode.childNodes;for(var i=0,len=childNodes.length;i<len;i++){var n=childNodes[i];if(n.nodeType===1){ //Magic number: 1はNode.ELEMENT_NODE
var ret=findCommentBindingTarget(n,id);if(ret){ //深さ優先で探索して見つかったらそこで探索終了
return ret;}}else if(n.nodeType===8){ //Magic Number: 8はNode.COMMENT_NODE
var nodeValue=n.nodeValue;if(nodeValue.indexOf(COMMENT_BINDING_TARGET_MARKER)!==0){ //コメントが開始マーカーで始まっていないので探索継続
continue;}var beginTagCloseBracketIdx=nodeValue.indexOf('}');if(beginTagCloseBracketIdx===-1){ //マーカータグが正しく閉じられていない
continue;}var beginTag=nodeValue.slice(0,beginTagCloseBracketIdx);var matched=beginTag.match(/id="([A-Za-z][\w-:\.]*)"/);if(!matched){ //idが正しく記述されていない
continue;}else if(matched[1]===id){ //探しているidを持つインラインコメントテンプレートノードが見つかったのでリターン
return n;}}}return null;} /**
	 * ロジック、コントローラが持つown
	 *
	 * @private
	 * @param {Function} func
	 * @returns funcの実行結果
	 */function _own(func){var that=this;return function() /* var_args */{return func.apply(that,arguments);};} /**
	 * ロジック、コントローラが持つownWithOrg
	 *
	 * @private
	 * @param {Function} func
	 * @returns funcの実行結果
	 */function _ownWithOrg(func){var that=this;return function() /* var_args */{var args=h5.u.obj.argsToArray(arguments);args.unshift(this);return func.apply(that,args);};} /**
	 * templateDfdにテンプレートのロード待機処理を設定する
	 *
	 * @param {Controller} controller
	 * @param {Deferred} templateDfd
	 * @param {String|String[]|Depency} templates テンプレートのパス(またはその配列)または、Dependencyオブジェクト
	 */function setTemlatesDeferred(controller,templateDfd,templates){var controllerName=controller.__name;function viewLoad(count){ // Viewモジュールがない場合、この直後のloadでエラーが発生してしまうためここでエラーを投げる。
if(!h5.u.obj.getByPath('h5.core.view')){throwFwError(ERR_CODE_NOT_VIEW);}templates=isArray(templates)?templates:[templates];var promises=[];for(var i=0,l=templates.length;i<l;i++){ // 文字列が指定されていたらDependencyに変換
var dependency=isDependency(templates[i])?templates[i]:h5.res.dependsOn(templates[i]);promises.push(dependency.resolve('ejsfile'));}waitForPromises(promises,function(resources){fwLogger.debug(FW_LOG_TEMPLATE_LOADED,controllerName); // viewにテンプレートを登録
resources=isArray(resources)?resources:[resources];for(var i=0,l=resources.length;i<l;i++){var templates=resources[i].templates;for(var j=0,len=templates.length;j<len;j++){ // 内部から呼ぶviewのロードは、ルートコントローラ設定前に呼ぶので、
// viewではなくview.__viewを使ってコントローラのルートエレメントが設定されているかのチェックをしないようにする
try{controller.view.__view.register(templates[j].id,templates[j].content);}catch(e){ // registerで登録できない(=コンパイルエラー)ならreject
templateDfd.reject(e);}}}templateDfd.resolve();},function(result){ // テンプレートのロードをリトライする条件は、リトライ回数が上限回数未満、かつ
// jqXhr.statusが0、もしくは12029(ERROR_INTERNET_CANNOT_CONNECT)であること。
// jqXhr.statusの値の根拠は、IE以外のブラウザだと通信エラーの時に0になっていること、
// IEの場合は、コネクションが繋がらない時のコードが12029であること。
// 12000番台すべてをリトライ対象としていないのは、何度リトライしても成功しないエラーが含まれていることが理由。
// WinInet のエラーコード(12001 - 12156):
// http://support.microsoft.com/kb/193625/ja
var jqXhrStatus=result.detail.error.status;if(count===h5.settings.dynamicLoading.retryCount||jqXhrStatus!==0&&jqXhrStatus!==ERROR_INTERNET_CANNOT_CONNECT){fwLogger.error(FW_LOG_TEMPLATE_LOAD_FAILED,controllerName,result.detail.url);setTimeout(function(){templateDfd.reject(result);},0);return;}setTimeout(function(){viewLoad(++count);},h5.settings.dynamicLoading.retryInterval);});}viewLoad(0);} /**
	 * eventHandlerInfoオブジェクトを作成します
	 * <p>
	 * 第4引数propはコントローラ定義に書かれたイベントハンドラ(静的)ならそのプロパティ名を渡してください
	 * </p>
	 * <p>
	 * 動的なイベントハンドラの場合はpropは指定しないでください
	 * </p>
	 *
	 * @param {String|Object} selector
	 * @param {String} eventName
	 * @param {Controller|Object} controller コントローラまたはコントローラ定義オブジェクト
	 * @param {String} prop コントローラ定義に記述された静的イベントハンドラの場合に、そのインベントハンドラのプロパティを指定
	 * @returns {Object} eventHandlerInfo
	 */function createEventHandlerInfo(selector,eventName,controller,prop){ // selectorが文字列じゃない場合はターゲットを直接指定している
var isSelector=isString(selector);var bindTarget=isSelector?null:selector;selector=isSelector?$.trim(selector):null;eventName=$.trim(eventName); // ターゲットが直接指定されているならisGlobalはtrue
var isGlobal=!isSelector||isGlobalSelector(selector);var isBindRequested=isBindRequestedEvent(eventName);if(isBindRequested){eventName=$.trim(trimBindEventBracket(eventName));}if(isSelector&&isGlobal){var selector=trimGlobalSelectorBracket(selector); // selectorに{this}が指定されていたらエラー
if(selector==='this'){throwFwError(ERR_CODE_EVENT_HANDLER_SELECTOR_THIS,[controller.__name],{controllerDef:controller});}}return {selector:selector,bindTarget:bindTarget,isGlobal:isGlobal,isBindRequested:isBindRequested,eventName:eventName,propertyKey:prop};} /**
	 * コントローラキャッシュエントリークラス
	 *
	 * @private
	 * @name ControllerCacheEntry
	 * @class
	 */function ControllerCacheEntry(){ // ロジックのプロパティ
this.logicProperties=[]; // イベントハンドランプロパティ
this.eventHandlerProperties=[]; // 関数のプロパティ
this.functionProperties=[]; // その他、コントローラインスタンスに持たせるプロパティ
this.otherProperties=[]; // バインドマップ
this.bindMap={}; // 子コントローラのプロパティ
this.childControllerProperties=[];} /**
	 * コントローラのキャッシュを作成する
	 *
	 * @private
	 * @param {Object} controllerDef コントローラ定義オブジェクト
	 * @returns コントローラのキャッシュオブジェクト
	 */function createControllerCache(controllerDef){var cache=new ControllerCacheEntry();var logicProperties=cache.logicProperties;var eventHandlerProperties=cache.eventHandlerProperties;var functionProperties=cache.functionProperties;var otherProperties=cache.otherProperties;var bindMap=cache.bindMap;var childControllerProperties=cache.childControllerProperties; // 同じセレクタかつ同じイベントに複数のハンドラが指定されているかをチェックするためのマップ
var checkBindMap={};for(var prop in controllerDef){if(isEventHandler(controllerDef,prop)){ // イベントハンドラのキー
eventHandlerProperties.push(prop); // イベントハンドラの場合
// bindMapの作成
var propTrimmed=$.trim(prop);var lastIndex=propTrimmed.lastIndexOf(' '); // イベントハンドラインフォの作成
var info=createEventHandlerInfo(propTrimmed.substring(0,lastIndex),propTrimmed.substring(lastIndex+1,propTrimmed.length),controllerDef,prop); // 整形したものを取得
var selector=info.selector;var eventName=info.eventName;var isGlobal=info.isGlobal;var isBindRequested=info.isBindRequested; // 同じセレクタ、同じイベントハンドラに同じ指定(isGlobal,isBindRequested)でイベントハンドラが指定されていたらエラー
if(!checkBindMap[selector]){checkBindMap[selector]={};}if(!checkBindMap[selector][eventName]){checkBindMap[selector][eventName]={};}if(!checkBindMap[selector][eventName][isGlobal]){checkBindMap[selector][eventName][isGlobal]={};}if(checkBindMap[selector][eventName][isGlobal][isBindRequested]){throwFwError(ERR_CODE_SAME_EVENT_HANDLER,[controllerDef.__name,selector,eventName],{controllerDef:controllerDef});}else { // フラグを立てる
checkBindMap[selector][eventName][isGlobal][isBindRequested]=1;}bindMap[prop]=info;}else if(endsWith(prop,SUFFIX_CONTROLLER)&&controllerDef[prop]&&!isFunction(controllerDef[prop])){ // 子コントローラ
childControllerProperties.push(prop);}else if(endsWith(prop,SUFFIX_LOGIC)&&controllerDef[prop]&&!isFunction(controllerDef[prop])){ // ロジック
logicProperties.push(prop);}else if(isFunction(controllerDef[prop])){ // メソッド(ライフサイクル含む)
functionProperties.push(prop);}else { // その他プロパティ
otherProperties.push(prop);}}return cache;} /**
	 * ロジックキャッシュエントリークラス
	 *
	 * @private
	 * @name LogicCacheEntry
	 * @class
	 */function LogicCacheEntry(){ // ロジックのプロパティ(子ロジック)
this.logicProperties=[]; // 関数のプロパティ
this.functionProperties=[];} /**
	 * ロジックのキャッシュを作成する
	 *
	 * @private
	 * @param {Object} logicDef ロジック定義オブジェクト
	 * @returns ロジックのキャッシュオブジェクト
	 */function createLogicCache(logicDef){var cache=new LogicCacheEntry();var functionProperties=cache.functionProperties;var logicProperties=cache.logicProperties;for(var p in logicDef){if(isChildLogic(logicDef,p)){logicProperties.push(p);}else if(isFunction(logicDef[p])){functionProperties.push(p);}}return cache;} /**
	 * ロジックの__readyを実行する
	 *
	 * @private
	 * @param {Logic} rootLogic ルートロジック
	 * @param {Deferred} readyDfd rootLogicの__readyが終わったらresolveするdeferred
	 */function triggerLogicReady(rootLogic,readyDfd){ // 待機中のプロミスを覚えておく
// プロミスがresolveされたら取り除く
var waitingPromises=[]; /**
		 * promiseにdoneハンドラを追加する関数
		 * <p>
		 * ただし、同一プロミスに同一ロジックについてのリスナを登録できないようにしています
		 * </p>
		 *
		 * @param {Promise} promise
		 * @param {Logic} targetLogic
		 * @param {Function} listener
		 */function addDoneListener(promise,targetLogic,listener){var logicWaitingPromises=targetLogic.__logicContext.waitingPromises=targetLogic.__logicContext.waitingPromises||[];if($.inArray(promise,logicWaitingPromises)===-1){logicWaitingPromises.push(promise);promise.done(listener);}}function execInner(logic,parent){ // isReadyは__ready終了(promiseならresolveした)タイミングでtrueになる
logic.__logicContext.isReady=false; // isCalledReadyは__readyを呼んだ(promiseを返すかどうかは関係ない)タイミングでtrueになる
logic.__logicContext.isCalledReady=false; // 深さ優先でexecInnerを実行
doForEachLogics(logic,execInner); /**
			 * 子が全てisReadyなら__readyを実行して自身をisReadyにする
			 */function executeReady(){if(logic.__logicContext.isCalledReady){ // 既に__ready呼び出し済みなら何もしない
return;}var isChildrenReady=true;doForEachLogics(logic,function(child){ // isReadyがfalseなものが一つでもあればfalseを返して探索を終了
// 子がいない場合はisChidrenReadyはtrueのまま
isChildrenReady=child.__logicContext.isReady;return isChildrenReady;});if(isChildrenReady){ // __readyを実行
var ret=isFunction(logic.__ready)&&logic.__ready();logic.__logicContext.isCalledReady=true;if(isPromise(ret)){ // __readyが返したプロミスをwaitingPromisesに覚えておく
waitingPromises.push(ret);ret.done(function(){ // __readyが返したプロミスがresolveされたらisReady=trueにする
logic.__logicContext.isReady=true; // waitingPromisesから、resolveしたプロミスを取り除く
waitingPromises.splice($.inArray(ret,waitingPromises),1); // ロジックが覚えていた、待機しているプロミスはもう不要なので削除
logic.__logicContext.waitingPromises=null;if(logic===rootLogic){ // rootLogicのisReadyがtrueになったらreadyDfdをresolveして終了
readyDfd.resolveWith(logic);return;}});}else { // __readyが同期または関数でないならすぐにisReadyをtrueにする
logic.__logicContext.isReady=true; // ロジックが覚えていた、待機しているプロミスはもう不要なので削除
logic.__logicContext.waitingPromises=null;if(logic===rootLogic){ // rootLogicの__readyが終わったタイミングでreadyDfdをresolveする
readyDfd.resolveWith(logic);}}}else { // 子のいずれかがisReadyじゃない===どこかで待機しているプロミスがある
// (待機するプロミスが無ければ子から順に実行しているため)
// この時点で待機しているプロミスのいずれかが完了したタイミングで、
// 再度自分の子が全てisReadyかどうかをチェックする
for(var i=0,l=waitingPromises.length;i<l;i++){ // addDoneListener(内部関数)を使って、同じプロミスに同じロジックについてのハンドラが重複しないようにしている
addDoneListener(waitingPromises[i],logic,executeReady);}}}executeReady();}execInner(rootLogic);} /**
	 * bindTargetターゲットが同じかどうか判定する
	 * <p>
	 * どちらかがjQueryオブジェクトならその中身を比較
	 * </p>
	 *
	 * @private
	 */function isSameBindTarget(target1,target2){if(target1===target2){ // 同一インスタンスならtrue
return true;}var isT1Jquery=isJQueryObject(target1);var isT2Jquery=isJQueryObject(target2);if(!isT1Jquery&&!isT2Jquery){ // どちらもjQueryオブジェクトでないならfalse;
return false;} // どちらかがjQueryオブジェクトなら配列にして比較
var t1Ary=isT1Jquery?target1.toArray():[target1];var t2Ary=isT2Jquery?target2.toArray():[target2];if(t1Ary.length!==t2Ary.length){ // 長さが違うならfalse
return false;}for(var i=0,l=t1Ary.length;i<l;i++){if(t1Ary[i]!==t2Ary[i]){return false;}}return true;} /**
	 * コントローラをエラー終了状態にして、lifecycleerrorイベントをトリガする
	 *
	 * @param {Controller} rootController ルートコントローラ
	 * @param {Error|rejectReason} detail 例外オブジェクト、またはRejectReason
	 */function triggerLifecycleerror(rootController,detail){controllerManager.dispatchEvent({type:'lifecycleerror',detail:detail,rootController:rootController});} /**
	 * 渡されたコントローラにルートエレメントが設定されていなかったらエラーを投げる
	 * <p>
	 * unbindされたコントローラ及び__construct時に呼べないメソッドの先頭で呼び出して使用する
	 * </p>
	 *
	 * @param {Controller} controller
	 * @param {String} method メソッド名
	 */function throwErrorIfNoRootElement(controller,method){if(!controller||!controller.rootElement){throwFwError(ERR_CODE_METHOD_OF_NO_ROOTELEMENT_CONTROLLER,method);}} /**
	 * 渡されたコントローラがdisposeされていたら、第２引数に指定されたメソッド名を含めたエラーを投げる
	 * <p>
	 * disposeされたコントローラで呼べないメソッドの先頭で呼び出して使用する
	 * </p>
	 *
	 * @param {Controller} controller
	 * @param {String} method メソッド名
	 */function throwErrorIfDisposed(controller,method){if(!controller||isDisposed(controller)){throwFwError(ERR_CODE_METHOD_OF_DISPOSED_CONTROLLER,method);}} /**
	 * イベントのバインドを行う
	 * <p>
	 * bindTargetがnodeならjQueryのbindで、そうでないならaddEventListenerを使ってバインドする。addEventListenerでバインドした場合はbindObj.isNativeBindをtrueにする。
	 * </p>
	 *
	 * @private
	 * @param bindObj バインドオブジェクト
	 */function bindEvent(bindObj){var bindTarget=bindObj.bindTarget;var eventName=bindObj.eventName;var handler=bindObj.handler;if(bindTarget&&_typeof(bindTarget.nodeType)!==TYPE_OF_UNDEFINED||isWindowObject(bindTarget)||isJQueryObject(bindTarget)){ // ノードタイプが定義されている(=ノード)またはwindowオブジェクトの場合またはjQueryオブジェクトの場合はjQueryのbindを使う
$(bindTarget).bind(eventName,handler);}else { /* del begin */if(bindTarget==null){fwLogger.warn(FW_LOG_BIND_TARGET_NOT_FOUND,bindObj.selector);}else if(!bindTarget.addEventListener){fwLogger.warn(FW_LOG_BIND_TARGET_INVALID,bindObj.selector);} /* del end */if(!bindTarget||!bindTarget.addEventListener){bindObj.isBindCanceled=true;return;} // ノードでない場合はaddEventListenerを使う
bindTarget.addEventListener(eventName,handler);bindObj.isNativeBind=true;}} /**
	 * イベントのアンバインドを行う
	 * <p>
	 * bindTargetがnodeならjQueryのunbindで、そうでないならremoveEventListenerを使ってアンバインドする
	 * </p>
	 *
	 * @private
	 * @param bindObj バインドオブジェクト
	 */function unbindEvent(bindObj){var bindTarget=bindObj.bindTarget;var eventName=bindObj.eventName;var handler=bindObj.handler;var isNativeBind=bindObj.isNativeBind;if(isNativeBind){ // addEventListenerでバインドした場合はremoveEventListenerを使う
bindTarget.removeEventListener(eventName,handler);}else {$(bindTarget).unbind(eventName,handler);}} /**
	 * コントローラインスタンスを子コントローラとして追加
	 *
	 * @param {Controller} parent
	 * @param {Controller} child
	 */function addChildController(parent,child){child.parentController=parent;parent.__controllerContext.childControllers.push(child);child.__controllerContext.isRoot=false;if(parent.__controllerContext.isExecutedConstruct){var rootController=parent.rootController; // __construct実行済みならrootControllerを設定
// 子コントローラの持つ子コントローラも含めてルートコントローラを設定
doForEachControllerGroups(child,function(c){c.rootController=rootController;});}} /**
	 * コントローラインスタンスを子コントローラから削除
	 *
	 * @param {Controller} parent
	 * @param {Controller} child
	 */function removeChildController(parent,child){ // 子コントローラをルートコントローラにする(親との関係を切る)
child.parentController=null;child.rootController=child;child.__controllerContext.isRoot=true;var childControllers=parent.__controllerContext.childControllers;var index=$.inArray(child,childControllers);if(index!==-1){childControllers.splice(index,1);}} // =========================================================================
//
// Body
//
// =========================================================================
function controllerFactory(controller,rootElement,controllerName,controllerDef,args,isRoot){ /**
		 * コントローラ名.
		 *
		 * @type String
		 * @name __name
		 * @memberOf Controller
		 */controller.__name=controllerName; /**
		 * テンプレート.
		 *
		 * @type String|String[]
		 * @name __templates
		 * @memberOf Controller
		 */controller.__templates=null; /**
		 * コントローラがバインドされた要素.
		 *
		 * @type Element
		 * @name rootElement
		 * @memberOf Controller
		 */controller.rootElement=rootElement; /**
		 * コントローラコンテキスト.
		 *
		 * @private
		 * @memberOf Controller
		 * @name __controllerContext
		 */controller.__controllerContext={ /**
			 * リスナーを実行するかどうかのフラグ
			 *
			 * @type Boolean
			 */executeListeners:true, /**
			 * ルートコントローラかどうか
			 *
			 * @type Boolean
			 */isRoot:isRoot, /**
			 * アンバインド対象となるイベントハンドラのマップ.
			 *
			 * @type Object
			 */boundHandlers:[], /**
			 * コントローラ定義オブジェクト
			 *
			 * @type {Object}
			 */controllerDef:controllerDef, /**
			 * コントローラパラメータ
			 */args:null}; // 初期化パラメータをセット
// パラメータもデフォルトパラメータも指定の無い場合はnull
var defaultParam=controllerDef&&controllerDef.__defaultArgs;if(defaultParam){ // デフォルトパラメーターとマージする (#474)
controller.__controllerContext.args=$.extend({},defaultParam,args);}else if(args){ // デフォルトパラメータの無い場合はクローンせずにparamをそのままセット（#163）
controller.__controllerContext.args=args;} /**
		 * コントローラのライフサイクルイベント__initが終了したかどうかを返します。
		 *
		 * @type Boolean
		 * @memberOf Controller
		 * @name isInit
		 */controller.isInit=false; /**
		 * コントローラのライフサイクルイベント__postInitが終了したかどうかを返します。
		 *
		 * @type Boolean
		 * @memberOf Controller
		 * @name isPostInit
		 */controller.isPostInit=false; /**
		 * コントローラのライフサイクルイベント__readyが終了したかどうかを返します。
		 *
		 * @type Boolean
		 * @memberOf Controller
		 * @name isReady
		 */controller.isReady=false; /**
		 * 親子関係を持つコントローラ群の一番祖先であるコントローラを返します。祖先がいない場合、自分自身を返します。
		 *
		 * @type Controller
		 * @memberOf Controller
		 * @name rootController
		 */controller.rootController=null; /**
		 * 親子関係を持つコントローラの親コントローラを返します。親コントローラがいない場合、nullを返します。
		 *
		 * @type Controller
		 * @memberOf Controller
		 * @name parentController
		 */controller.parentController=null; /**
		 * __templatesに指定したテンプレートファイルの読み込みに、成功または失敗したかの状態を持つPromiseオブジェクト。
		 * このオブジェクトが持つ以下の関数で、状態をチェックすることができます。
		 * <p>
		 * <b>state()</b> <table border="1">
		 * <tr>
		 * <td>戻り値</td>
		 * <td>結果</td>
		 * </tr>
		 * <tr>
		 * <td>"resolved"</td>
		 * <td>読み込みに成功</td>
		 * </tr>
		 * <tr>
		 * <td>"rejected"</td>
		 * <td>読み込みに失敗</td>
		 * </tr>
		 * <tr>
		 * <td>"pending"</td>
		 * <td>読み込みが開始されていないまたは読み込み中</td>
		 * </tr>
		 * </table> 注意: jQuery1.7.x未満の場合、この関数は使用できません。
		 * <p>
		 * <b>isResolved(), isRejected()</b> <table border="1">
		 * <tr>
		 * <td>isResolved()の戻り値</td>
		 * <td>isRejected()の戻り値</td>
		 * <td>結果</td>
		 * </tr>
		 * <tr>
		 * <td>true</td>
		 * <td>false</td>
		 * <td>読み込みに成功</td>
		 * </tr>
		 * <tr>
		 * <td>false</td>
		 * <td>true</td>
		 * <td>読み込みに失敗</td>
		 * </tr>
		 * <tr>
		 * <td>false</td>
		 * <td>false</td>
		 * <td>読み込みが開始されていないまたは読み込み中</td>
		 * </tr>
		 * </table>
		 * <p>
		 * また、preInitPromise.done()に関数を設定すると読み込み成功時に、
		 * preInitPromise.fail()に関数を設定すると読み込み失敗時に、設定した関数を実行します。
		 *
		 * @type Promise
		 * @memberOf Controller
		 * @name preInitPromise
		 */controller.preInitPromise=null; /**
		 * コントローラのライフサイクルイベント__initについてのPromiseオブジェクトを返します。
		 *
		 * @type Promise
		 * @memberOf Controller
		 * @name initPromise
		 */controller.initPromise=null; /**
		 * コントローラのライフサイクルイベント__postInitについてのPromiseオブジェクトを返します。
		 *
		 * @type Promise
		 * @memberOf Controller
		 * @name postInitPromise
		 */controller.postInitPromise=null; /**
		 * コントローラのライフサイクルイベント__readyについてのPromiseオブジェクトを返します。
		 *
		 * @type Promise
		 * @memberOf Controller
		 * @name readyPromise
		 */controller.readyPromise=null; /**
		 * コントローラのロガーを返します。
		 * <p>
		 * コントローラ内のメソッドで<code>this.log.debug('debug message');</code>のように記述して使用します。ロガーの使い方の詳細は<a
		 * href="Log.html">Log</a>をご覧ください。
		 * </p>
		 *
		 * @type Log
		 * @memberOf Controller
		 * @name log
		 */controller.log=h5.log.createLogger(controllerName); /**
		 * ビュー操作に関するメソッドを格納しています。
		 * <p>
		 * <a href="View.html">View</a>クラスと同様にテンプレートを扱うクラスですが、Controllerの持つViewは以下の点でViewクラスとは異なります。
		 * </p>
		 * <ul>
		 * <li>append/update/prependメソッドでのターゲット(出力先)について、
		 * コントローラのイベントハンドラと同様にコントローラのルートエレメントを起点に選択します。 また、グローバルセレクタも使用可能です。 </li>
		 *
		 * <pre><code>
		 * // 例
		 * // thisはコントローラ
		 * this.view.append('.target', 'tmpId'); // コントローラのルートエレメント内のtargetクラス要素
		 * this.view.append('{.target}', 'tmpId'); // $('.target')と同じ
		 * this.view.append('{rootElement}', 'tmpId'); // コントローラのルートエレメント(this.rootElementと同じ)
		 * this.view.append('{document.body}', 'tmpId'); // body要素
		 * </code></pre>
		 *
		 * <li>指定されたIDのテンプレートの探索を、親コントローラのView、h5.core.viewについても行います。</li>
		 * <li>自分のコントローラ、親コントローラ、親コントローラの親コントローラ、…、ルートコントローラ、h5.core.view、の順番に探索して、
		 * 最初に見つかったテンプレートを返します。</li>
		 *
		 * <pre><code>
		 * // 例
		 * // parentControllerは子コントローラを持つコントローラ
		 * var parent = parentController.view;
		 * var child = parentController.childController;
		 * // viewにテンプレートを登録
		 * h5.core.view.register('a', 'a_coreView');
		 * h5.core.view.register('b', 'b_coreView');
		 * parent.view.register('a', 'a_parent');
		 * parent.view.register('d', 'd_parent');
		 * child.view.register('c', 'c_child');
		 * child.get('c'); // c_child
		 * child.get('d'); // d_parent
		 * child.get('a'); // a_parent
		 * child.get('b'); // b_coreView
		 * </code></pre>
		 *
		 * <li>bindメソッドはコメントビューを使用したバインドが可能です。</li>
		 * <p>
		 * コメントビューの詳細については、<a
		 * href="http://www.htmlhifive.com/conts/web/view/reference/inline-comment-templating">リファレンス（仕様詳細)
		 * &gt;&gt; コメントビュー</a>をご覧ください。
		 * </p>
		 * </ul>
		 *
		 * @name view
		 * @memberOf Controller
		 * @type View
		 * @see View
		 */controller.view=new View(controller);}function View(controller){ // 利便性のために循環参照になってしまうがコントローラの参照を持つ
this.__controller=controller; // Viewモジュールがなければインスタンスを作成しない(できない)
if(h5.u.obj.getByPath('h5.core.view')){this.__view=h5.core.view.createView();}} /**
	 * コメントビューへのバインドに対応したbind
	 * <p>
	 * コメントビューへのバインドはコントローラビューのbindのみでの機能です
	 * </p>
	 *
	 * @private
	 * @param element
	 * @param context
	 * @returns {Binding}
	 */ // JSDTのフォーマッタが過剰にインデントしてしまうので、独立した関数として記述している
function View_bind(element,context){throwErrorIfNoRootElement(this.__controller,'view#bind');var target=element;if(isString(element)&&element.indexOf('h5view#')===0){ //先頭が"h5view#"で始まっている場合、インラインコメントテンプレートへのバインドとみなす
//（「{h5view id="xxx"}」という記法なので、h5viewタグの特定idをセレクトしているようにみなせる）
//Magic number: 7は"h5view#"の文字数
var inlineCommentNode=findCommentBindingTarget(this.__controller.rootElement,element.slice(7));var rawTmpl=inlineCommentNode.nodeValue;var tmpl=rawTmpl.slice(rawTmpl.indexOf('}')+1); //jQueryによる"クリーンな"DOM生成のため、innerHTMLではなくappend()を使う
var $dummyRoot=$('<div>').append(tmpl);target=[];var childNodes=$dummyRoot[0].childNodes;for(var i=0,len=childNodes.length;i<len;i++){target.push(childNodes[i]);} //ダミールートから要素を外し、インラインテンプレートの直後に要素を挿入
$dummyRoot.empty();var fragment=document.createDocumentFragment();for(var i=0,len=target.length;i<len;i++){fragment.appendChild(target[i]);}inlineCommentNode.parentNode.insertBefore(fragment,inlineCommentNode.nextSibling);} //詳細な引数チェックはView.bindで行う
return this.__view.bind(target,context);} // オリジナルのviewを拡張
// コントローラのルートエレメントが必須なものは、ルートエレメントがあるかどうかチェック(ないならエラー)
// またコントローラがdisposeされている(this.__controllerがnullの場合も含む)ならエラー
$.extend(View.prototype,{get:function get(templateId,param){throwErrorIfNoRootElement(this.__controller,'view#get');return getView(templateId,this.__controller).get(templateId,param);},update:function update(element,templateId,param){throwErrorIfNoRootElement(this.__controller,'view#update');var target=getTarget(element,this.__controller);return getView(templateId,this.__controller).update(target,templateId,param);},append:function append(element,templateId,param){throwErrorIfNoRootElement(this.__controller,'view#append');var target=getTarget(element,this.__controller);return getView(templateId,this.__controller).append(target,templateId,param);},prepend:function prepend(element,templateId,param){throwErrorIfNoRootElement(this.__controller,'view#prepend');var target=getTarget(element,this.__controller);return getView(templateId,this.__controller).prepend(target,templateId,param);},load:function load(resourcePaths){throwErrorIfNoRootElement(this.__controller,'view#load');return this.__view.load(resourcePaths);},register:function register(templateId,templateString){throwErrorIfNoRootElement(this.__controller,'view#register');this.__view.register(templateId,templateString);},isValid:function isValid(templateString){throwErrorIfNoRootElement(this.__controller,'view#isValid');return this.__view.isValid(templateString);},isAvailable:function isAvailable(templateId){throwErrorIfNoRootElement(this.__controller,'view#isAvailable');return getView(templateId,this.__controller).isAvailable(templateId);},clear:function clear(templateIds){throwErrorIfNoRootElement(this.__controller,'view#clear');this.__view.clear(templateIds);},getAvailableTemplates:function getAvailableTemplates(){throwErrorIfNoRootElement(this.__controller,'view#getAvailableTemplates');return this.__view.getAvailableTemplates();},bind:View_bind}); /**
	 * コントローラのコンストラクタ
	 * <p>
	 * このオブジェクトは自分でnewすることはありません。 コントローラ化して動作させる場合は<a
	 * href="h5.core.html#controller">h5.core.controller()</a>を使用してください。
	 * </p>
	 *
	 * @name Controller
	 * @class
	 */ /**
	 * @private
	 * @param {Document} doc コントローラをバインドした要素が属するdocumentノード
	 * @param {Element} rootElement コントローラをバインドした要素
	 * @param {String} controllerName コントローラ名
	 * @param {Object} controllerDef コントローラ定義オブジェクト
	 * @param {Object} args 初期化パラメータ
	 * @param {Boolean} isRoot ルートコントローラかどうか
	 */function Controller(rootElement,controllerName,controllerDef,args,isRoot){ // フック関数を実行
for(var i=0,l=controllerInstantiationHooks.length;i<l;i++){controllerInstantiationHooks[i](this);}return controllerFactory(this,rootElement,controllerName,controllerDef,args,isRoot);}$.extend(Controller.prototype,{ /**
						 * コントローラがバインドされた要素内から要素を選択します。
						 *
						 * @param {String} selector セレクタ
						 * @returns {jQuery} セレクタにマッチするjQueryオブジェクト
						 * @memberOf Controller
						 */$find:function $find(selector){throwErrorIfDisposed(this,'$find');throwErrorIfNoRootElement(this,'$find');return $(this.rootElement).find(selector);}, /**
						 * Deferredオブジェクトを返します。
						 *
						 * @returns {Deferred} Deferredオブジェクト
						 * @memberOf Controller
						 */deferred:function deferred(){throwErrorIfDisposed(this,'deferred');return getDeferred();}, /**
						 * ルート要素を起点に指定されたイベントを実行します。
						 * <p>
						 * 第2引数に指定したparameterオブジェクトは、コントローラのイベントハンドラで受け取るcontext.evArgに格納されます。
						 * </p>
						 * <p>
						 * parameterに配列を指定した場合は、context.evArgに渡した配列が格納されます。
						 * </p>
						 * <p>
						 * 戻り値は、jQueryEventオブジェクトを返します。
						 * </p>
						 * <h5>長さ1の配列をparameterに指定した場合について</h5>
						 * <p>
						 *
						 * <pre class="sh_javascript"><code>
						 * trigger('click', ['a']);
						 * </code></pre>
						 *
						 * のように、１要素だけの配列を渡した場合は、配列ではなくその中身がcontext.evArgに格納されます。(jQuery.triggerと同様です。)
						 * </p>
						 * <p>
						 * triggerで、渡した配列の長さに関わらず、渡したデータを配列としてハンドラで扱いたい場合は、以下のような方法を検討してください。。
						 * </p>
						 * <ul>
						 * <li> parameterをオブジェクトでラップする。
						 *
						 * <pre class="sh_javascript"><code>
						 * // trigger
						 * this.trigger('hoge', {data: ary});
						 * // イベントハンドラ
						 * '{rootElement} hoge': function(context){
						 *   var ary = context.evArg.data;
						 *   for(var i = 0, l = ary.length; i &lt; l; i++){
						 *     // 配列に対する処理
						 *   }
						 * }
						 * </code></pre>
						 *
						 * </li>
						 * <li>イベントハンドラ側で、受け取ったデータが配列でなかったら配列でラップしてから扱う
						 *
						 * <pre class="sh_javascript"><code>
						 * // trigger
						 * this.trigger('hoge', ary);
						 * // イベントハンドラ
						 * '{rootElement} hoge': function(context){
						 *   var ary = $.isArray(context.evArg) ? context.evArg: [context.evArg];
						 *   for(var i = 0, l = ary.length; i &lt; l; i++){
						 *     // 配列に対する処理
						 *   }
						 * }
						 * </code></pre>
						 *
						 * </li>
						 * </ul>
						 *
						 * @param {String|jQueryEvent} event イベント名またはjQueryEventオブジェクト
						 * @param {Object} [parameter] パラメータ
						 * @returns {jQueryEvent} event イベントオブジェクト
						 * @memberOf Controller
						 */trigger:function trigger(event,parameter){throwErrorIfDisposed(this,'trigger');throwErrorIfNoRootElement(this,'trigger'); // eventNameが文字列ならイベントを作って投げる
// オブジェクトの場合はそのまま渡す。
var ev=isString(event)?$.Event(event):event;$(this.rootElement).trigger(ev,parameter);return ev;}, /**
						 * 指定された関数に対して、コンテキスト(this)をコントローラに変更して実行する関数を返します。
						 *
						 * @param {Function} func 関数
						 * @return {Function} コンテキスト(this)をコントローラに変更した関数
						 * @memberOf Controller
						 */own:function own() /* var_args */{throwErrorIfDisposed(this,'own');return _own.apply(this,argsToArray(arguments));}, /**
						 * 指定された関数に対して、コンテキスト(this)をコントローラに変更し、元々のthisを第1引数に加えて実行する関数を返します。
						 *
						 * @param {Function} func 関数
						 * @return {Function} コンテキスト(this)をコントローラに変更し、元々のthisを第1引数に加えた関数
						 * @memberOf Controller
						 */ownWithOrg:function ownWithOrg() /* var_args */{throwErrorIfDisposed(this,'ownWithOrg');return _ownWithOrg.apply(this,argsToArray(arguments));}, /**
						 * コントローラを要素へ再度バインドします。子コントローラでは使用できません。
						 *
						 * @memberOf Controller
						 * @param {String|Element|jQuery} targetElement
						 *            バインド対象とする要素のセレクタ、DOMエレメント、もしくはjQueryオブジェクト.<br />
						 *            セレクタで指定したときにバインド対象となる要素が存在しない、もしくは2つ以上存在する場合、エラーとなります。
						 * @param {Object} [param] 初期化パラメータ.<br />
						 *            初期化パラメータは __init, __readyの引数として渡されるオブジェクトの argsプロパティとして格納されます。
						 * @returns {Controller} コントローラ.
						 */bind:function bind(targetElement,param){throwErrorIfDisposed(this,'bind');if(!this.__controllerContext.isRoot){throwFwError(ERR_CODE_BIND_UNBIND_DISPOSE_ROOT_ONLY);}var target=getBindTarget(targetElement,this);this.rootElement=target;this.view.__controller=this;var args=param?param:null;initInternalProperty(this,args);triggerInit(this);return this;}, /**
						 * コントローラのバインドを解除します。子コントローラでは使用できません。
						 *
						 * @memberOf Controller
						 */unbind:function unbind(){throwErrorIfDisposed(this,'unbind');throwErrorIfNoRootElement(this,'unbind');if(!this.__controllerContext.isRoot){throwFwError(ERR_CODE_BIND_UNBIND_DISPOSE_ROOT_ONLY);}if(!this.__controllerContext.isExecutedConstruct){throwFwError(ERR_CODE_CONSTRUCT_CANNOT_CALL_UNBIND);}try{unbindController(this);}catch(e){ // __unbindの実行でエラーが出たらdisposeする
disposeController(this,e);}}, /**
						 * コントローラのリソースをすべて削除します。<br />
						 * <a href="#unbind">Controller#unbind()</a> の処理を包含しています。
						 *
						 * @returns {Promise} Promiseオブジェクト
						 * @memberOf Controller
						 */dispose:function dispose(){throwErrorIfDisposed(this,'dispose');if(!this.__controllerContext.isRoot){throwFwError(ERR_CODE_BIND_UNBIND_DISPOSE_ROOT_ONLY);}return disposeController(this);}, /**
						 * インジケータの生成を上位コントローラまたはフレームワークに移譲します。<br>
						 * 例えば、子コントローラにおいてインジケータのカバー範囲を親コントローラ全体（または画面全体）にしたい場合などに使用します。<br>
						 * このメソッドを実行すると、「triggerIndicator」という名前のイベントが発生します。また、イベント引数としてオプションパラメータを含んだオブジェクトが渡されます。<br>
						 * イベントがdocumentまで到達した場合、フレームワークが自動的にインジケータを生成します。<br>
						 * 途中のコントローラでインジケータを生成した場合はevent.stopPropagation()を呼んでイベントの伝搬を停止し、イベント引数で渡されたオブジェクトの
						 * <code>indicator</code>プロパティに生成したインジケータインスタンスを代入してください。<br>
						 * indicatorプロパティの値がこのメソッドの戻り値となります。<br>
						 *
						 * @param {Object} opt オプション
						 * @param {String} [opt.message] メッセージ
						 * @param {Number} [opt.percent] 進捗を0～100の値で指定する。
						 * @param {Boolean} [opt.block] 操作できないよう画面をブロックするか (true:する/false:しない)
						 * @returns {Indicator} インジケータオブジェクト
						 * @memberOf Controller
						 */triggerIndicator:function triggerIndicator(opt){throwErrorIfDisposed(this,'triggerIndicator');throwErrorIfNoRootElement(this,'triggerIndicator');var args={indicator:null};if(opt){$.extend(args,opt);}$(this.rootElement).trigger(EVENT_NAME_TRIGGER_INDICATOR,[args]);return args.indicator;}, /**
						 * 指定された要素に対して、インジケータ(メッセージ・画面ブロック・進捗)の表示や非表示を行うためのオブジェクトを取得します。
						 * <p>
						 * <a href="h5.ui.html#indicator">h5.ui.indicator</a>と同様にインジケータオブジェクトを取得する関数ですが、ターゲットの指定方法について以下の点で<a
						 * href="h5.ui.html#indicator">h5.ui.indicator</a>と異なります。
						 * <p>
						 * <ul>
						 * <li>第1引数にパラメータオブジェクトを渡してください。</li>
						 *
						 * <pre><code>
						 * // thisはコントローラ
						 * this.indicator({
						 * 	target: this.rootElement
						 * }); // OK
						 * this.indicator(this.rootElement, option); // NG
						 * </code></pre>
						 *
						 * <li>targetの指定は省略できます。省略した場合はコントローラのルートエレメントがインジケータの出力先になります。</li>
						 * <li>targetにセレクタが渡された場合、要素の選択はコントローラのルートエレメントを起点にします。また、グローバルセレクタを使用できます。
						 * (コントローラのイベントハンドラ記述と同様です。)</li>
						 *
						 * <pre><code>
						 * // thisはコントローラ
						 * this.indicator({target:'.target'}); // コントローラのルートエレメント内のtargetクラス要素
						 * this.indicator({target:'{.target}'}); // $('.target')と同じ
						 * this.indicator({target:'{rootElement}'); // コントローラのルートエレメント(this.rootElementと同じ)
						 * this.indicator({target:'{document.body}'); // body要素
						 * </code></pre>
						 *
						 * </ul>
						 *
						 * @returns {Indicator} ���ンジケータオブジェクト
						 * @memberOf Controller
						 * @see h5.ui.indicator
						 * @see Indicator
						 */indicator:function indicator(opt){throwErrorIfDisposed(this,'indicator');throwErrorIfNoRootElement(this,'indicator');return callIndicator(this,opt);}, /**
						 * コントローラに定義されているリスナーの実行を許可します。
						 *
						 * @memberOf Controller
						 */enableListeners:function enableListeners(){throwErrorIfDisposed(this,'enableListeners');setExecuteListenersFlag(this,true);}, /**
						 * コントローラに定義されているリスナーの実行を禁止します。
						 *
						 * @memberOf Controller
						 */disableListeners:function disableListeners(){throwErrorIfDisposed(this,'disableListeners');setExecuteListenersFlag(this,false);}, /**
						 * 指定された値をメッセージとして例外をスローします。
						 * <p>
						 * 第一引数がオブジェクトまたは文字列によって、出力される内容が異なります。
						 * <p>
						 * <b>文字列の場合</b><br>
						 * 文字列に含まれる{0}、{1}、{2}...{n} (nは数字)を、第二引数以降に指定した値で置換し、それをメッセージ文字列とします。
						 * <p>
						 * <b>オブジェクトの場合</b><br>
						 * Erorrオブジェクトのdetailプロパティに、このオブジェクトを設定します。
						 *
						 * @memberOf Controller
						 * @param {String|Object} msgOrErrObj メッセージ文字列またはオブジェクト
						 * @param {Any} [var_args] 置換パラメータ(第一引数が文字列の場合のみ使用します)
						 */throwError:function throwError(msgOrErrObj,var_args){throwErrorIfDisposed(this,'throwError'); //引数の個数チェックはthrowCustomErrorで行う
var args=argsToArray(arguments);args.unshift(null);this.throwCustomError.apply(this,args);}, /**
						 * 指定された値をメッセージとして例外をスローします。
						 * <p>
						 * このメソッドでスローされたErrorオブジェクトのcustomTypeプロパティには、第一引数で指定した型情報が格納されます。
						 * <p>
						 * 第二引数がオブジェクトまたは文字列によって、出力される内容が異なります。
						 * <p>
						 * <b>文字列の場合</b><br>
						 * 文字列に含まれる{0}、{1}、{2}...{n} (nは数字)を、第二引数以降に指定した値で置換し、それをメッセージ文字列とします。
						 * <p>
						 * <b>オブジェクトの場合</b><br>
						 * Erorrオブジェクトのdetailプロパティに、このオブジェクトを設定します。
						 *
						 * @memberOf Controller
						 * @param {String} customType 型情報
						 * @param {String|Object} msgOrErrObj メッセージ文字列またはオブジェクト
						 * @param {Any} [var_args] 置換パラメータ(第一引数が文字列の場合のみ使用します)
						 */throwCustomError:function throwCustomError(customType,msgOrErrObj,var_args){throwErrorIfDisposed(this,'throwCustomError');if(arguments.length<2){throwFwError(ERR_CODE_TOO_FEW_ARGUMENTS);}var error=null;if(msgOrErrObj&&isString(msgOrErrObj)){error=new Error(format.apply(null,argsToArray(arguments).slice(1)));}else { // 引数を渡さないと、iOS4は"unknown error"、その他のブラウザは空文字が、デフォルトのエラーメッセージとして入る
error=new Error();error.detail=msgOrErrObj;}error.customType=customType;throw error;}, /**
						 * イベントハンドラを動的にバインドします。
						 * <p>
						 * 第1引数targetの指定にはコントローラのイベントハンドラ記述と同様の記述ができます。
						 * つまりセレクタの場合はルートエレメントを起点に選択します。またグローバルセレクタで指定することもできます。、
						 * </p>
						 * <p>
						 * ここで追加したハンドラはコントローラのunbind時にアンバインドされます。
						 * </p>
						 *
						 * @memberOf Controller
						 * @param target {String|Object} イベントハンドラのターゲット
						 * @param eventName {String} イベント名
						 * @param listener {Function} ハンドラ
						 */on:function on(target,eventName,listener){throwErrorIfDisposed(this,'on');throwErrorIfNoRootElement(this,'on'); // バインドオブジェクトの作成
var info=createEventHandlerInfo(target,eventName,this); // アスペクトを掛ける
// onで動的に追加されたハンドラは、メソッド名は空文字扱とする
// アスペクトのpointCutの対象や、invocation.funcNameは空文字とする
var methodName=''; // enable/disableListeners()のために制御用インターセプタも織り込む
var interceptors=getInterceptors(this.__name,methodName);interceptors.push(executeListenersInterceptor);var bindObjects=createBindObjects(this,info,createWeavedFunction(listener,methodName,interceptors));for(var i=0,l=bindObjects.length;i<l;i++){var bindObj=bindObjects[i];if(!bindObj.isInnerBindObj){ // h5track*を有効にするハンドラを除いて、オリジナルハンドラを覚えて置き、off()できるようにする
bindObj.originalHandler=listener;}bindByBindObject(bindObj,getDocumentOf(this.rootElement));}}, /**
						 * イベントハンドラを動的にアンバインドします。
						 * <p>
						 * 第1引数targetの指定にはコントローラのイベントハンドラ記述と同様の記述ができます。
						 * つまりセレクタの場合はルートエレメントを起点に選択します。またグローバルセレクタで指定することもできます。、
						 * </p>
						 *
						 * @memberOf Controller
						 * @param target {String|Object} イベントハンドラのターゲット
						 * @param eventName {String} イベント名
						 * @param listener {Function} ハンドラ
						 */off:function off(target,eventName,listener){throwErrorIfDisposed(this,'off');throwErrorIfNoRootElement(this,'off'); // 指定された条件にマッチするbindObjをboundHandlersから探して取得する
var info=createEventHandlerInfo(target,eventName,this);var boundHandlers=this.__controllerContext.boundHandlers;var matchBindObj=null;var bindTarget=info.bindTarget;var eventName=info.eventName;var selector=info.selector;var isGlobal=info.isGlobal;var isBindRequested=info.isBindRequested;var index=0;for(var l=boundHandlers.length;index<l;index++){var bindObj=boundHandlers[index];if(bindTarget){ // offでオブジェクトやDOMをターゲットに指定された場合はbindTarget、eventName、originalHandlerを比較
if(isSameBindTarget(bindTarget,bindObj.bindTarget)&&eventName===bindObj.eventName&&bindObj.originalHandler===listener){matchBindObj=bindObj;break;}}else { // offでセレクタを指定された場合、セレクタと、グローバル指定かどうかと、isBindRequestedとoriginalHandlerを比較
if(selector===bindObj.selector&&isGlobal===bindObj.isGlobal&&isBindRequested===bindObj.isBindRequested&&listener===bindObj.originalHandler){matchBindObj=bindObj;break;}}}if(matchBindObj){unbindByBindObject(matchBindObj,getDocumentOf(this.rootElement));}}, /**
						 * コントローラを子コントローラとして動的に追加します
						 * <p>
						 * 追加されたコントローラは呼び出し元のコントローラの子コントローラとなります。
						 * </p>
						 *
						 * @memberOf Controller
						 * @param {Controller} コントローラインスタンス
						 */manageChild:function manageChild(controller){throwErrorIfDisposed(this,'manageChild'); // 自分自身がunbindされていたらエラー
if(isUnbinding(this)){throwFwError(ERR_CODE_CONTROLLER_MANAGE_CHILD_BY_UNBINDED_CONTROLLER);return;} // コントローラインスタンスでない場合はエラー
if(!controller||!controller.__controllerContext){throwFwError(ERR_CODE_CONTROLLER_MANAGE_CHILD_NOT_CONTROLLER);return;} // 対象のコントローラがdisopseまたはunbindされていたらエラー
if(isUnbinding(controller)){throwFwError(ERR_CODE_CONTROLLER_MANAGE_CHILD_UNBINDED_CONTROLLER);return;} // ルートコントローラでない場合はエラー
if(controller.rootController!==controller){throwFwError(ERR_CODE_CONTROLLER_MANAGE_CHILD_NOT_ROOT_CONTROLLER);} // 必要なプロパティをセット
addChildController(this,controller); // manageChildしたコントローラはルートコントローラで無くなるので、controllerManagerの管理下から外す
var controllers=controllerManager.controllers;var index=$.inArray(controller,controllers);if(index!=-1){controllers.splice(index,1);}}, /**
						 * 子コントローラを動的に削除
						 *
						 * @memberOf Controller
						 * @param {Controller} コントローラインスタンス
						 * @param {Boolean} [andDispose=true]
						 *            第1引数で指定されたコントローラをdisposeするかどうか。指定無しの場合はdisposeします。
						 * @returns {Promise}
						 */unmanageChild:function unmanageChild(controller,andDispose){throwErrorIfDisposed(this,'unmanageChild'); // 自分自身がunbindされていたらエラー
if(isUnbinding(this)){throwFwError(ERR_CODE_CONTROLLER_UNMANAGE_CHILD_BY_UNBINDED_CONTROLLER);return;} // 対象のコントローラが自分の子コントローラでないならエラー
if(controller.parentController!==this){throwFwError(ERR_CODE_CONTROLLER_UNMANAGE_CHILD_NOT_CHILD_CONTROLLER);return;} // disposeするかどうか。デフォルトtrue(disposeする)
andDispose=andDispose===false?false:true;if(!andDispose&&!controller.rootElement){ // ルートエレメント未決定コントローラはdisposeせずにunmanageChildできない
throwFwError(ERR_CODE_CONTROLLER_UNMANAGE_CHILD_NO_ROOT_ELEMENT);return;}removeChildController(this,controller,andDispose);if(andDispose){controller.dispose();return;} // disposeしない場合、unmanageChildしたコントローラはルートコントローラになるので、controllerManagerの管理下に追加
controllerManager.controllers.push(controller); // 親子間に待機中のプロミスがあればそれを削除
var parentWaitingPromisesManagerMap=this.__controllerContext.waitingPromisesManagerMap;var childWaitingPromisesManagerMap=controller.__controllerContext.waitingPromisesManagerMap;if(parentWaitingPromisesManagerMap){if(parentWaitingPromisesManagerMap['__postInit']){parentWaitingPromisesManagerMap['__postInit'].remove(controller.postInitPromise);}if(parentWaitingPromisesManagerMap['__ready']){parentWaitingPromisesManagerMap['__ready'].remove(controller.readyPromise);}}if(childWaitingPromisesManagerMap){if(childWaitingPromisesManagerMap['__init']){childWaitingPromisesManagerMap['__init'].remove(this.initPromise);}} // 元のルートコントローラによって、triggerPostInitやtriggerReadyが呼ばれていない状態ならここで呼ぶ
// (子コントローラが待機中のプロミスは無く、ルートがtriggerPostInitやtriggerReadyまで行っていない状態)
// initはコントローラバインド時に必ず呼ばれるのでここで呼ぶ必要はない
if(!this.rootController.__controllerContext.triggerPostInitExecuted){triggerPostInit(controller);}else if(!this.rootController.__controllerContext.triggerReadyInitExecuted){triggerReady(controller);}}}); /**
	 * コントローラマネージャクラス
	 *
	 * @name ControllerManager
	 * @class
	 */ // 以下JSDocコメントのみ
/**
					 * コントローラのライフサイクル __construct
					 * <p>
					 * コントローラ生成時に実行されるライフサイクルメソッドの一つ。コントローラ定義オブジェクトの__constructに関数を記述することで動作する。
					 * 指定はオプションであり、記述しなくてもよい。
					 * </p>
					 * <p>
					 * コントローラ生成時のライフサイクルメソッドは{@link Controller.__construct},
					 * {@link Controller.__init}, {@link Controller.__postInit},
					 * {@link Controller.__ready}の順序で動作する。
					 * </p>
					 *
					 * @see {@link http://www.htmlhifive.com/conts/web/view/reference/controller_lifecycle|リファレンス（仕様詳細） » コントローラのライフサイクルについて}
					 * @memberOf Controller
					 * @type {function}
					 * @name __construct
					 */ /**
					 * コントローラのライフサイクル __init
					 * <p>
					 * コントローラ生成時に実行されるライフサイクルメソッドの一つ。コントローラ定義オブジェクトの__initに関数を記述することで動作する。
					 * 指定はオプションであり、記述しなくてもよい。
					 * </p>
					 * <p>
					 * コントローラ生成時のライフサイクルメソッドは{@link Controller.__construct},
					 * {@link Controller.__init}, {@link Controller.__postInit},
					 * {@link Controller.__ready}の順序で動作する。
					 * </p>
					 *
					 * @see {@link http://www.htmlhifive.com/conts/web/view/reference/controller_lifecycle|リファレンス（仕様詳細） » コントローラのライフサイクルについて}
					 * @memberOf Controller
					 * @type {function}
					 * @name __init
					 */ /**
					 * コントローラのライフサイクル __postInit
					 * <p>
					 * コントローラ生成時に実行されるライフサイクルメソッドの一つ。コントローラ定義オブジェクトの__postInitに関数を記述することで動作する。
					 * 指定はオプションであり、記述しなくてもよい。
					 * </p>
					 * <p>
					 * コントローラ生成時のライフサイクルメソッドは{@link Controller.__construct},
					 * {@link Controller.__init}, {@link Controller.__postInit},
					 * {@link Controller.__ready}の順序で動作する。
					 * </p>
					 *
					 * @see {@link http://www.htmlhifive.com/conts/web/view/reference/controller_lifecycle|リファレンス（仕様詳細） » コントローラのライフサイクルについて}
					 * @memberOf Controller
					 * @type {function}
					 * @name __postInit
					 */ /**
					 * コントローラのライフサイクル __ready
					 * <p>
					 * コントローラ生成時に実行されるライフサイクルメソッドの一つ。コントローラ定義オブジェクトの__readyに関数を記述することで動作する。
					 * 指定はオプションであり、記述しなくてもよい。
					 * </p>
					 * <p>
					 * コントローラ生成時のライフサイクルメソッドは{@link Controller.__construct},
					 * {@link Controller.__init}, {@link Controller.__postInit},
					 * {@link Controller.__ready}の順序で動作する。
					 * </p>
					 *
					 * @see {@link http://www.htmlhifive.com/conts/web/view/reference/controller_lifecycle|リファレンス（仕様詳細） » コントローラのライフサイクルについて}
					 * @memberOf Controller
					 * @type {function}
					 * @name __ready
					 */ /**
					 * コントローラのライフサイクル __unbind
					 * <p>
					 * コントローラの破棄時に実行されるライフサイクルメソッドの一つ。コントローラ定義オブジェクトの__unbindに関数を記述することで動作する。
					 * 指定はオプションであり、記述しなくてもよい。
					 * </p>
					 * <p>
					 * コントローラ破棄時のライフサイクルメソッドは{@link Controller.__unbind},{@link Controller.__dispose}の順序で動作する。
					 * </p>
					 *
					 * @see {@link http://www.htmlhifive.com/conts/web/view/reference/controller_lifecycle|リファレンス（仕様詳細） » コントローラのライフサイクルについて}
					 * @memberOf Controller
					 * @type {function}
					 * @name __unbind
					 */ /**
					 * コントローラのライフサイクル __dispose
					 * <p>
					 * コントローラの破棄時に実行されるライフサイクルメソッドの一つ。コントローラ定義オブジェクトの__disposeに関数を記述することで動作する。
					 * 指定はオプションであり、記述しなくてもよい。
					 * </p>
					 * <p>
					 * コントローラ破棄時のライフサイクルメソッドは{@link Controller.__unbind},{@link Controller.__dispose}の順序で動作する。
					 * </p>
					 *
					 * @see {@link http://www.htmlhifive.com/conts/web/view/reference/controller_lifecycle|リファレンス（仕様詳細） » コントローラのライフサイクルについて}
					 * @memberOf Controller
					 * @type {function}
					 * @name __dispose
					 */function ControllerManager(){this.rootElement=document;this.controllers=[]; /**
		 * triggerIndicatorイベントハンドラ
		 *
		 * @param {EventContext} context
		 * @memberOf ControllerManager
		 * @private
		 */$(document).bind(EVENT_NAME_TRIGGER_INDICATOR,function(event,opt){if(opt.target==null){opt.target=document;}opt.indicator=callIndicator(this,opt);event.stopPropagation();});} // eventDispatcherをmixin
h5.mixin.eventDispatcher.mix(ControllerManager.prototype);$.extend(ControllerManager.prototype,{ /**
						 * 現在動作しているすべてのコントローラのインスタンスの配列を返します。<br>
						 * 子コントローラは含まれません。すなわち、ルートコントローラのみが含まれます。
						 *
						 * @returns {Controller[]} コントローラ配列
						 * @memberOf ControllerManager
						 */getAllControllers:function getAllControllers(){return this.controllers;}, /**
						 * 指定した要素にバインドされているすべてのコントローラを返します。バインドされているコントローラがない場合は空の配列が返ります。<br>
						 * オプションを指定すると、子孫要素も検索対象に含めたり、特定の名前のコントローラだけを検索対象にしたりすることができます。<br>
						 * なお、戻り値に含まれるのはルートコントローラのみです。
						 *
						 * @param {String|Element|jQuery} rootElement 検索対象の要素
						 * @param {Object} [option] オプション（ver.1.1.7以降）
						 * @param {Boolean} [option.deep=false]
						 *            子孫要素にバインドされているコントローラも含めるかどうか(ver.1.1.7以降)
						 * @param {String|String[]} [option.name=null]
						 *            指定された場合、この名前のコントローラのみを戻り値に含めます。配列で複数指定することも可能です。(ver.1.1.7以降)
						 * @returns {Controller[]} バインドされているコントローラの配列
						 * @memberOf ControllerManager
						 */getControllers:function getControllers(rootElement,option){var deep=option&&option.deep;var names=option&&option.name?wrapInArray(option.name):null;var seekRoot=$(rootElement)[0];var controllers=this.controllers;var ret=[];for(var i=0,len=controllers.length;i<len;i++){var controller=controllers[i];if(names&&$.inArray(controller.__name,names)===-1||!controller.rootElement){continue;}if(seekRoot===controller.rootElement){ret.push(controller);}else if(deep&&getDocumentOf(seekRoot)===getDocumentOf(controller.rootElement)&&$.contains(seekRoot,controller.rootElement)){ // ownerDocumentが同じ場合に$.contais()の判定を行う
// (IE8でwindow.open()で開いたポップアップウィンドウ内の要素と
// 元ページ内の要素で$.contains()の判定を行うとエラーになるため。)
// また、$.contains()は自分と比較した場合はfalse
ret.push(controller);}}return ret;}}); /**
	 * キャッシュマネージャクラス
	 * <p>
	 * マップを使ってキャッシュの登録、削除を行うクラス
	 * </p>
	 * <p>
	 * このクラスは自分でnewすることはありません。<a
	 * href="h5.core.html#definitionCacheManager">h5.core.definitionCacheManager</a>がこのクラスのメソッド(<a
	 * href="#clear">clear()</a>,<a href="#clearAll">clearAll()</a>)を持ちます。
	 * </p>
	 *
	 * @class CacheManager
	 */function CacheManager(){this._init();}$.extend(CacheManager.prototype,{ /**
		 * コントローラの名前からキャッシュを取り出す。 無ければnullを返す。
		 *
		 * @private
		 * @memberOf CacheManager
		 * @param {String} name
		 */get:function get(name){return this._cacheMap[name];}, /**
		 * キャッシュを登録する。
		 *
		 * @private
		 * @memberOf CacheManager
		 */register:function register(name,cacheObj){this._cacheMap[name]=cacheObj;}, /**
		 * 名前を指定してキャッシュをクリアする
		 *
		 * @param {String} name コントローラまたはロジックの名前(__nameの値)
		 * @memberOf CacheManager
		 */clear:function clear(name){delete this._cacheMap[name];}, /**
		 * キャッシュを全てクリアする
		 *
		 * @memberOf CacheManager
		 */clearAll:function clearAll(){this._cacheMap={};}, /**
		 * 初期化処理
		 *
		 * @private
		 * @memberOf CacheManager
		 */_init:function _init(){this._cacheMap={};}}); // キャッシュ変数にコントローラマネージャ、キャッシュマネージャのインスタンスをそれぞれ格納
definitionCacheManager=new CacheManager();controllerManager=new ControllerManager();h5.u.obj.expose('h5.core',{ /**
		 * コントローラマネージャ
		 *
		 * @name controllerManager
		 * @type ControllerManager
		 * @memberOf h5.core
		 */controllerManager:controllerManager, /**
		 * 定義オブジェクトのキャッシュを管理するキャッシュマネージャ
		 * <p>
		 * コントローラとロジックのキャッシュを管理する<a href="CacheManager.html">CacheManager</a>のインスタンスです。<a
		 * href="CacheManager.html#clear">clear</a>または<a
		 * href="CacheManager.html#clearAll">clearAll</a>を使ってキャッシュを削除することができます。
		 * </p>
		 * <p>
		 * コントローラ化、ロジック化の際に、コントローラ名及びロジック名で、インスタンス化に必要な情報をキャッシュしており、コントローラ及びロジックについて、同じ名前の定義オブジェクトは同じコントローラ、ロジックとして扱います。
		 * </p>
		 * <p>
		 * 同じ名前で定義の異なるコントローラ、ロジックを使用したい場合は、<a href="CacheManager.html#clear">clear</a>または<a
		 * href="CacheManager.html#clearAll">clearAll</a>でキャッシュを削除してください。
		 * </p>
		 *
		 * @name definitionCacheManager
		 * @type CacheManager
		 * @memberOf h5.core
		 */ // clearとclearAllのみ公開
definitionCacheManager:{clear:function clear(name){definitionCacheManager.clear(name);},clearAll:function clearAll(){definitionCacheManager.clearAll();}}}); // プロパティ重複チェック用のコントローラプロパティマップを作成
var controllerPropertyMap=null; /**
	 * コントローラのファクトリ
	 *
	 * @private
	 * @param {String|Element|jQuery} targetElement バインド対象とする要素のセレクタ、DOMエレメント、もしくはjQueryオブジェクト
	 * @param {Object} controllerDefObj コントローラ定義オブジェクト
	 * @param {Object} [param] 初期化パラメータ
	 * @returns {Controller}
	 */ // fwOptは内部的に使用している.
function createAndBindController(targetElement,controllerDefObj,args,fwOpt){ // 内部から再帰的に呼び出された場合は、fwOpt.isInternalが指定されているはずなので、ルートコントローラかどうかはfwOpt.isInternalで判別できる
var isRoot=!fwOpt||!fwOpt.isInternal;if(!isRoot&&isDisposed(fwOpt.rootController)){ // ルートコントローラがdisposeされていたら何もしない
return null;} // コントローラ名
var controllerName=controllerDefObj.__name;if((!isString(controllerName)||$.trim(controllerName).length===0)&&!isDependency(controllerDefObj)){ // Dependency指定の場合を除いて、文字列じゃない又は空文字、空白文字の場合はエラー
throwFwError(ERR_CODE_INVALID_CONTROLLER_NAME,null,{controllerDefObj:controllerDefObj});} // 初期化開始のログ
fwLogger.debug(FW_LOG_INIT_CONTROLLER_BEGIN,controllerName); // 初期化パラメータがオブジェクトかどうかチェック
if(args&&!$.isPlainObject(args)){throwFwError(ERR_CODE_CONTROLLER_INVALID_INIT_PARAM,[controllerName],{controllerDefObj:controllerDefObj});} // 既にコントローラ化されているかどうかチェック
if(controllerDefObj.__controllerContext){throwFwError(ERR_CODE_CONTROLLER_ALREADY_CREATED,null,{controllerDefObj:controllerDefObj});} // デフォルトパラメータがオブジェクトかどうかチェック
if(controllerDefObj.__defaultArgs){if(!$.isPlainObject(controllerDefObj.__defaultArgs)){throwFwError(ERR_CODE_CONTROLLER_INVALID_INIT_DEFAULT_PARAM,[controllerName],{controllerDefObj:controllerDefObj});}} // キャッシュの取得(無かったらundefined)
var cache=definitionCacheManager.get(controllerName); // コントローラ定義オブジェクトのチェック
// キャッシュがある場合はコントローラ定義オブジェクトについてはチェック済みなのでチェックしない
if(!cache){validateControllerDef(isRoot,targetElement,controllerDefObj,controllerName);} // 循環参照チェックはキャッシュが残っていても行う
// cache作成時にチェックしてOKだったとしても、子コントローラの中身が変わってしまっていることがあるため
if(isRoot){ // コントローラの循環参照チェック(ルートコントローラで1度やればよい)
validateControllerCircularRef(controllerDefObj,controllerName);} // キャッシュが無かった場合、キャッシュの作成と登録
if(!cache){cache=createControllerCache(controllerDefObj);definitionCacheManager.register(controllerName,cache);}if(isRoot){ // ルートコントローラの場合はバインド対象となる要素のチェックを同期で行う
// (子コントローラの時は親の__init後にチェックしている)
// 文字列、オブジェクト(配列含む)でない場合はエラー (それぞれ、セレクタ、DOMオブジェクト(またはjQueryオブジェクト)を想定している)
validateTargetElement(targetElement,controllerDefObj,controllerName);} // new Controllerで渡すコントローラ定義オブジェクトはクローンしたものではなくオリジナルなものを渡す。
// コントローラが持つコントローラ定義オブジェクトはオリジナルのものになる。
var controller=new Controller(targetElement?$(targetElement).get(0):null,controllerName,controllerDefObj,args,isRoot);var rootController=isRoot?controller:fwOpt.rootController; // ------ controllerContextの作成 ------//
// Deferred,Promiseの作成
// preInitPromise, initPromise, postInitPromiseが失敗してもcFHを発火させないようにするため、dummyのfailハンドラを登録する
var preInitDfd=getDeferred();var preInitPromise=preInitDfd.promise().fail(dummyFailHandler);var initDfd=getDeferred();var initPromise=initDfd.promise().fail(dummyFailHandler);var postInitDfd=getDeferred();var postInitPromise=postInitDfd.promise().fail(dummyFailHandler);var readyDfd=getDeferred();var readyPromise=readyDfd.promise(); // async:falseならresolve済みにしておいて同期でバインドされるようにする(内部で使用するオプション)
var async=fwOpt&&fwOpt.async;if(async===false){preInitDfd.resolve();initDfd.resolve();postInitDfd.resolve();readyDfd.resolve();}if(!isRoot){ // ルートコントローラでないなら、readyPromiseの失敗でcommonFailHandlerを発火させないようにする
// (ルートコントローラのreadyPromiseのみ、失敗したらcommonFailHandlerが発火する)
readyPromise.fail(dummyFailHandler);} /* del begin */else { // ルートコントローラなら、readyPromise.doneのタイミングで、ログを出力する
readyPromise.done(function(){fwLogger.info(FW_LOG_INIT_CONTROLLER_COMPLETE,controllerName);});} /* del end */ // __controllerContextに必要な情報を持たせる
var controllerContext=controller.__controllerContext; // cacheを持たせる
controllerContext.cache=cache; // 各ライフサイクルのdeferredを持たせる
controllerContext.preInitDfd=preInitDfd;controllerContext.initDfd=initDfd;controllerContext.postInitDfd=postInitDfd;controllerContext.readyDfd=readyDfd; // コントローラにpromiseを持たせる
controller.preInitPromise=preInitPromise;controller.initPromise=initPromise;controller.postInitPromise=postInitPromise;controller.readyPromise=readyPromise; // 子コントローラを保持する配列を持たせる
controllerContext.childControllers=[]; // 子コントローラ、ロジック依存関係解決のプロミス
var promisesForTriggerInit=isRoot?[]:fwOpt.promisesForTriggerInit; // ロジック定義をロジック化
// ロジック定義はクローンされたものではなく、定義時に記述されたものを使用する
// ロジックが持つロジック定義オブジェクトはオリジナルの定義オブジェクトになる
for(var i=0,l=cache.logicProperties.length;i<l;i++){var prop=cache.logicProperties[i];var logicDef=controllerDefObj[prop];if(isDependency(logicDef)){ // Dependencyオブジェクトが指定されていた場合は依存関係を解決する
var promise=logicDef.resolve('namespace');promisesForTriggerInit.push(promise);promise.done(function(logicProp,logicPromise){return function(logic){var logicInstance=createLogic(logic);controller[logicProp]=logicInstance; // ロジック化が終わったらコントローラが待機するプロミスから取り除く
promisesForTriggerInit.splice($.inArray(logicPromise,promisesForTriggerInit),1); // ロジックのreadyPromiseを追加
promisesForTriggerInit.push(logicInstance.readyPromise); // ロジックのreadyPromiseがdoneになったらpromisesForTriggerInitから取り除く
logicInstance.readyPromise.done(function(logicReadyPromise){return function(){promisesForTriggerInit.splice($.inArray(logicReadyPromise,promisesForTriggerInit),1);};}(logicInstance.readyPromise));};}(prop,promise));}else {controller[prop]=createLogic(logicDef);}} // templateDfdの設定
var clonedControllerDef=$.extend(true,{},controllerDefObj);var templates=controllerDefObj.__templates;var templateDfd=getDeferred();var templatePromise=templateDfd.promise();if(isDependency(templates)||templates&&templates.length>0){ // テンプレートファイルのロードを待機する処理を設定する
setTemlatesDeferred(controller,templateDfd,templates);}else { // テンプレートの指定がない場合は、resolve()しておく
templateDfd.resolve();} // テンプレートプロミスのハンドラ登録
templatePromise.done(function(){if(!isDisposing(controller)){ // thisをコントローラにしてresolve
preInitDfd.resolveWith(controller);}}).fail(function(e){ // eはview.load()のfailに渡されたエラーオブジェクト
// thisをコントローラにしてreject
preInitDfd.rejectWith(controller,[e]); /* del begin */ // disposeされていなければルートコントローラの名前でログを出力
if(controller.rootController&&!isDisposing(controller.rootController)){fwLogger.error(FW_LOG_INIT_CONTROLLER_ERROR,controller.rootController.__name);} /* del end */ // disposeする
// 同じrootControllerを持つ他の子コントローラにdisposeされているかどうか
// (controller.rootControllerがnullになっていないか)をチェックをしてからdisposeする
disposeController(controller,null,e);}); // イベントハンドラにアスペクトを設定
for(var i=0,l=cache.eventHandlerProperties.length;i<l;i++){var prop=cache.eventHandlerProperties[i];controller[prop]=weaveAspect(clonedControllerDef,prop,true);} // イベントハンドラではないメソッド(ライフサイク���含む)にアスペクトを設定
for(var i=0,l=cache.functionProperties.length;i<l;i++){var prop=cache.functionProperties[i]; // アスペクトを設定する
controller[prop]=weaveAspect(clonedControllerDef,prop);} // その他プロパティをコピー
for(var i=0,l=cache.otherProperties.length;i<l;i++){var prop=cache.otherProperties[i];controller[prop]=clonedControllerDef[prop];} // コントローラマネージャの管理対象とするか判定する(fwOpt.managed===falseなら管理対象外)
controllerContext.managed=fwOpt&&fwOpt.managed; // __constructを実行(子コントローラのコントローラ化より前)
try{controller.__construct&&controller.__construct(createInitializationContext(controller));if(isDisposing(controller)){ // 途中(__constructの中)でdisposeされたら__constructの実行を中断
return null;}}catch(e){ // ルートコントローラを渡してdisposeする
disposeController(rootController,e);return null;} // __construct呼び出し後にparentControllerとrootControllerの設定
if(isRoot){ // ルートコントローラの場合(parentが無い場合)、rootControllerは自分自身、parentControllerはnull
controller.rootController=controller;controller.parentController=null;}else { // rootControllerはisRoot===trueのコントローラには設定済みなので、親から子に同じrootControllerを引き継ぐ
controller.parentController=fwOpt.parentController;controller.rootController=fwOpt.rootController;} // 動的に追加されたコントローラ(__constructのタイミングで追加されたコントローラ)について、
// ルートコントローラを設定する
if(controller.__controllerContext.childControllers){for(var i=0,childs=controller.__controllerContext.childControllers,l=childs.length;i<l;i++){childs[i].rootController=controller.rootController;}} // __construct実行フェーズが完了したかどうか
// この時点でunbind()呼び出しが可能になる
controller.__controllerContext.isExecutedConstruct=true; // 子コントローラをコントローラ化して持たせる
// 子コントローラがDependencyオブジェクトなら依存関係を解決
var meta=controller.__meta;for(var i=0,l=cache.childControllerProperties.length;i<l;i++){ // createAndBindControllerの呼び出し時に、fwOpt.isInternalを指定して、内部からの呼び出し(=子コントローラ)であることが分かるようにする
var prop=cache.childControllerProperties[i];var childController=clonedControllerDef[prop]; // 子コントローラにパラメータを引き継ぐかどうか
var childArgs=null;if(meta&&meta[prop]&&meta[prop].inheritArgs){childArgs=args;}if(isDependency(childController)){ // Dependencyオブジェクトが指定されていた場合は依存関係を解決する
var promise=childController.resolve('namespace');promisesForTriggerInit.push(promise);promise.done(function(childProp,childControllerPromise,cp){return function(c){var child=createAndBindController(null,$.extend(true,{},c),cp,{isInternal:true,parentController:controller,rootController:rootController,promisesForTriggerInit:promisesForTriggerInit,async:async});if(child==null){ // __constructで失敗したりdisposeされた場合はnullが返ってくるので
// 子コントローラの__constructが正しく実行されなかった場合は以降何もしない
return null;}controller[childProp]=child;controller.__controllerContext.childControllers.push(child); // createAndBindControllerの呼び出しが終わったら、プロミスを取り除く
promisesForTriggerInit.splice($.inArray(childControllerPromise,promisesForTriggerInit),1);};}(prop,promise,childArgs));}else {var child=createAndBindController(null,$.extend(true,{},clonedControllerDef[prop]),childArgs,{isInternal:true,parentController:controller,rootController:rootController});if(child==null){ // __constructで失敗したりdisposeされた場合はnullが返ってくるので
// 子コントローラの__constructが正しく実行されなかった場合は以降何もしない
return null;}controller.__controllerContext.childControllers.push(child);controller[prop]=child;}}if(isRoot){(function(){ // ルートコントローラなら自分以下のinitを実行
// promisesForTriggerInitは子コントローラの依存解決
var constructPromiseCheck=function constructPromiseCheck(){if(promisesForTriggerInit.length===0){ // 待機中のプロミスがもうないならinit開始
triggerInit(controller,async);return;} // 子孫にpromiseを追加されていた場合(さらに待機するコンストラクタがあった場合)
// 再度待機する
waitAllConstructPromise();};var waitAllConstructPromise=function waitAllConstructPromise(){waitForPromises(promisesForTriggerInit,constructPromiseCheck);};waitAllConstructPromise();})();}return controller;} /**
	 * オブジェクトのロジック化を行います。
	 *
	 * @param {Object} logicDefObj ロジック定義オブジェクト
	 * @returns {Logic}
	 * @name logic
	 * @function
	 * @memberOf h5.core
	 */function createLogic(logicDefObj){var readyDfd=h5.async.deferred();var readyPromise=readyDfd.promise();var logicTreeDependencyPromises=[];function create(defObj,isRoot){var logicName=defObj.__name; // エラーチェック
if(!isString(logicName)||$.trim(logicName).length===0){ // __nameが不正
throwFwError(ERR_CODE_INVALID_LOGIC_NAME,null,{logicDefObj:defObj});}if(defObj.__logicContext){ // すでにロジックがインスタンス化されている
throwFwError(ERR_CODE_LOGIC_ALREADY_CREATED,null,{logicDefObj:defObj});} // キャッシュの取得
var cache=definitionCacheManager.get(logicName);if(!cache){ // キャッシュが無い場合で、ルートロジックなら循環参照チェック
// ロジックの循環参照チェック(ルートで1度やればよい)
if(isRoot){validateLogicCircularRef(defObj);} // キャッシュの作成
cache=createLogicCache(defObj);} // クローンしたものをロジック化する
var logic=$.extend(true,{},defObj); // アスペクトの設定
var functionProperties=cache.functionProperties;for(var i=0,l=functionProperties.length;i<l;i++){var prop=functionProperties[i];logic[prop]=weaveAspect(logic,prop);}logic.deferred=getDeferred;logic.log=h5.log.createLogger(logicName);logic.__logicContext={ // ロジック定義オブジェクトはクローンしたものではなくオリジナルのものを持たせる
logicDef:defObj};logic.own=_own;logic.ownWithOrg=_ownWithOrg; // キャッシュへ登録
definitionCacheManager.register(logicName,cache); // __constructの実行
// 親から実行する
if(isFunction(logic.__construct)){logic.__construct();} // ロジックが持っているロジック定義もロジック化
var logicProperties=cache.logicProperties;for(var i=0,l=logicProperties.length;i<l;i++){var prop=logicProperties[i];var childLogicDef=logic[prop];if(isDependency(childLogicDef)){ // 子ロジックがDependencyならresolveしてからロジック化する
var promise=childLogicDef.resolve(); // ロジックツリーの待機するプロミスに追加
logicTreeDependencyPromises.push(promise);promise.done(function(childLogicProp,logicPromise){return function(resolvedLogicDef){ // ロジック化
logic[childLogicProp]=create(resolvedLogicDef); // ロジックツリーの待機するプロミスから取り除く
logicTreeDependencyPromises.splice($.inArray(logicPromise,logicTreeDependencyPromises),1);};}(prop,promise));}else {logic[prop]=create(childLogicDef);}}return logic;}var rootLogic=create(logicDefObj,true);rootLogic.readyPromise=readyPromise; // ロジックツリーの依存解決が終わったタイミングで__readyの実行を開始
function logicTreePromiseCheck(){if(logicTreeDependencyPromises.length===0){ // 待機中のプロミスがもうないなら__readyの開始
triggerLogicReady(rootLogic,readyDfd);return;} // 子孫にpromiseを追加されていた場合(さらに待機するコンストラクタがあった場合)
// 再度待機する
waitAllConstructPromise();}function waitAllConstructPromise(){waitForPromises(logicTreeDependencyPromises,logicTreePromiseCheck);}waitAllConstructPromise();return rootLogic;} /**
	 * コントローラ化時にコントローラに対して追加処理を行うフック関数を登録する関数
	 * <p>
	 * ここで登録したフック関数はコントローラインスタンス生成時(__construct呼び出し前)に呼ばれます
	 * </p>
	 *
	 * @memberOf h5internal.core
	 * @private
	 * @param {Function} func フック関数。第1引数にコントローラインスタンスが渡される
	 */function addControllerInstantiationHook(func){controllerInstantiationHooks.push(func);} // =============================
// Expose internally
// =============================
// fwOptを引数に取る、コントローラ化を行うメソッドを、h5internal.core.controllerInternalとして内部用に登録
h5internal.core.controllerInternal=createAndBindController; // コントローラ化時にフック関数を登録する関数
h5internal.core.addControllerInstantiationHook=addControllerInstantiationHook;h5internal.core.isDisposing=isDisposing; // =============================
// Expose to window
// =============================
/**
	 * Core MVCの名前空間
	 *
	 * @name core
	 * @memberOf h5
	 * @namespace
	 */h5.u.obj.expose('h5.core',{ /**
		 * オブジェクトのコントローラ化と、要素へのバインドを行います。
		 *
		 * @param {String|Element|jQuery} targetElement バインド対象とする要素のセレクタ、DOMエレメント、もしくはjQueryオブジェクト..<br />
		 *            セレクタで指定したときにバインド対象となる要素が存在しない、もしくは2つ以上存在する場合、エラーとなります。
		 * @param {Object} controllerDefObj コントローラ定義オブジェクト
		 * @param {Object} [args] 初期化パラメータ.<br />
		 *            初期化パラメータは __construct, __init, __readyの引数として渡されるオブジェクトの argsプロパティとして格納されます。
		 * @returns {Controller} コントローラ
		 * @name controller
		 * @function
		 * @memberOf h5.core
		 */controller:function controller(targetElement,controllerDefObj,args){if(arguments.length<2){throwFwError(ERR_CODE_CONTROLLER_TOO_FEW_ARGS);}return createAndBindController(targetElement,controllerDefObj,args);},logic:createLogic, /**
		 * コントローラ、ロジックを__nameで公開します。<br />
		 * 例：__nameが"sample.namespace.controller.TestController"の場合、window.sample.namespace.controller.TestController
		 * で グローバルから辿れるようにします。
		 *
		 * @param {Controller|Logic} obj コントローラ、もしくはロジック
		 * @name expose
		 * @function
		 * @memberOf h5.core
		 */expose:function expose(obj){var objName=obj.__name;if(!objName){throwFwError(ERR_CODE_EXPOSE_NAME_REQUIRED,null,{target:obj});}var lastIndex=objName.lastIndexOf('.');if(lastIndex===-1){window[objName]=obj;}else {var ns=objName.substr(0,lastIndex);var key=objName.substr(lastIndex+1,objName.length);var nsObj={};nsObj[key]=obj;h5.u.obj.expose(ns,nsObj);}}});})(); /* ------ h5.core.data ------ */(function(){ // =========================================================================
//
// Constants
//
// =========================================================================
// =============================
// Production
// =============================
/**
	 * criteriaで'or'または'and'の論理演算子を指定するプロパティのマップ
	 *
	 * @private
	 */var OPERAND_PROPERTY='__op'; /**
	 * 比較関数と演算子のマップ
	 *
	 * @private
	 */var COMPARE_FUNCIONS={'=':function _(value,queryValue){return value===queryValue;},'!=':function _(value,queryValue){return value!==queryValue;},'<':function _(value,queryValue){return value<queryValue;},'>':function _(value,queryValue){return value>queryValue;},'<=':function _(value,queryValue){return value<=queryValue;},'>=':function _(value,queryValue){return value>=queryValue;},'between':function between(value,queryValue){var lower=queryValue[0];var upper=queryValue[1]; // 境界値を含む
return lower<=value&&value<=upper;},'!between':function between(value,queryValue){var lower=queryValue[0];var upper=queryValue[1]; // 境界値を含まない
return value<lower||upper<value;},'in':function _in(value,queryValue){return $.inArray(value,queryValue)!==-1;},'!in':function _in(value,queryValue){return $.inArray(value,queryValue)===-1;}}; /**
	 * RegExp型を比較する関数と演算子のマップ
	 *
	 * @private
	 */var COMPARE_REGEXP_FUNCTIONS={'=':function _(value,queryValue){return queryValue.test(value);},'!=':function _(value,queryValue){return !queryValue.test(value);}}; /**
	 * Date型を比較する関数と演算子のマップ
	 *
	 * @private
	 */var COMPARE_DATE_FUNCIONS={'=':function _(value,queryValue){if(!isDate(value)){ // Date型じゃない場合はfalseを返す(queryValueは必ずDate型であるため)
return false;}return value.getTime()===queryValue.getTime();},'!=':function _(value,queryValue){if(!isDate(value)){ // Date型じゃない場合はtrueを返す(queryValueは必ずDate型であるため)
return true;}return value.getTime()!==queryValue.getTime();},'<':function _(value,queryValue){if(!isDate(value)){return false;}return value.getTime()<queryValue.getTime();},'>':function _(value,queryValue){if(!isDate(value)){return false;}return value.getTime()>queryValue.getTime();},'<=':function _(value,queryValue){if(!isDate(value)){return false;}return value.getTime()<=queryValue.getTime();},'>=':function _(value,queryValue){if(!isDate(value)){return false;}return value.getTime()>=queryValue.getTime();},'between':function between(value,queryValue){if(!isDate(value)){return false;}var lower=queryValue[0].getTime();var upper=queryValue[1].getTime();var valueTime=value.getTime(); // 境界値を含む
return lower<=valueTime&&valueTime<=upper;},'!between':function between(value,queryValue){if(!isDate(value)){return false;}var lower=queryValue[0].getTime();var upper=queryValue[1].getTime();var valueTime=value.getTime(); // 境界値を含まない
return valueTime<lower||upper<valueTime;},'in':function _in(value,queryValue){if(!isDate(value)){return false;}var valueTime=value.getTime();for(var i=0,l=queryValue.length;i<l;i++){if(valueTime===queryValue[i].getTime()){return true;}}return false;},'!in':function _in(value,queryValue){if(!isDate(value)){return true;}var valueTime=value.getTime();for(var i=0,l=queryValue.length;i<l;i++){if(valueTime===queryValue[i].getTime()){return false;}}return true;}}; // -------------------------------
// エラーコード
// -------------------------------
// TODO エラーコードの採番は決まってから適切な番号にする
/** 指定された比較関数がない */var ERR_CODE_NO_COMPARE_FUNCTIONS=1; /** ORDER BY句に指定されたkey名がschemaに存在しない */var ERR_CODE_ORDER_BY_KEY=2; /** ORDER BY句に指定された比較関数が不正 */var ERR_CODE_ORDER_BY_COMPARE_FUNCTION_INVALID=3; /** setOrderFunctionで既にオーダー関数が設定済みなのにaddOrderが呼ばれた */var ERR_CODE_ALREADY_SET_ORDER_FUNCTION=4; /** addOrderで既にオーダーキーが追加済みなのにsetOrderFunctionが呼ばれた */var ERR_CODE_ALREADY_ADDED_ORDER=5; /**
	 * 各エラーコードに対応するメッセージ
	 */var errMsgMap={};errMsgMap[ERR_CODE_NO_COMPARE_FUNCTIONS]='演算子"{0}"で"{1}"型の値を比較することはできません';errMsgMap[ERR_CODE_ORDER_BY_KEY]='{0}の第1引数が不正です。指定されたキー({1})はモデル{2}に存在しません';errMsgMap[ERR_CODE_ORDER_BY_COMPARE_FUNCTION_INVALID]='setOrderFunctionの第1引数が不正です。比較関数を関数で指定してください';errMsgMap[ERR_CODE_ALREADY_SET_ORDER_FUNCTION]='setOrderFunction()ですでにソート条件が設定済みです。addOrder()でソート条件を追加することはできません。';errMsgMap[ERR_CODE_ALREADY_ADDED_ORDER]='addOrder()ですでにソート条件が追加済みです。setOrderFunction()でソート条件を設定することはできません。'; // メッセージの登録
addFwErrorCodeMap(errMsgMap); // =============================
// Development Only
// =============================
// =========================================================================
//
// Cache
//
// =========================================================================
// =========================================================================
//
// Privates
//
// =========================================================================
// =============================
// Variables
// =============================
// =============================
// Functions
// =============================
/**
	 * 正規表現かどうか
	 *
	 * @private
	 * @param value
	 * @returns {Boolean}
	 */function isRegExp(value){return value instanceof RegExp;} /**
	 * 日付型かどうか
	 *
	 * @private
	 * @param value
	 * @returns {Boolean}
	 */function isDate(value){return value instanceof Date;} /**
	 * 各条件について結果をANDで評価する関数を生成して返します
	 *
	 * @private
	 * @param {Object} compiledCriteria コンパイル済みcriteria
	 * @returns {Function}
	 */function createANDCompareFunction(compiledCriteria){ // 各条件をANDで比較して返す関数
return function(valueObj){ // クエリについてチェック
var queries=compiledCriteria.queries;for(var i=0,l=queries.length;i<l;i++){var query=queries[i];var prop=query.prop;var queryValue=query.queryValue;var compareFunction=query.compareFunction;if(!compareFunction(valueObj[prop],queryValue)){return false;}} // ユーザ関数についてチェック
var userFunctions=compiledCriteria.userFunctions;for(var i=0,l=userFunctions.length;i<l;i++){if(!userFunctions[i](valueObj)){return false;}} // ネストしたcriteriaについてチェック
var nestedCriterias=compiledCriteria.nestedCriterias;for(var i=0,l=nestedCriterias.length;i<l;i++){if(!nestedCriterias[i].match(valueObj)){return false;}}return true;};} /**
	 * 各条件について結果をORで評価する関数を生成して返します
	 *
	 * @private
	 * @param {Object} compiledCriteria コンパイル済みcriteria
	 * @returns {Function}
	 */function createORCompareFunction(compiledCriteria){return function(valueObj){ // クエリについてチェック
var queries=compiledCriteria.queries;for(var i=0,l=queries.length;i<l;i++){var query=queries[i];var prop=query.prop;var queryValue=query.queryValue;var compareFunction=query.compareFunction;if(compareFunction(valueObj[prop],queryValue)){return true;}} // ユーザ関数についてチェック
var userFunctions=compiledCriteria.userFunctions;for(var i=0,l=userFunctions;i<l;i++){if(!userFunctions[i](valueObj)){return true;}} // ネストしたcriteriaについてチェック
var nestedCriterias=compiledCriteria.nestedCriterias;for(var i=0,l=nestedCriterias.length;i<l;i++){if(nestedCriterias[i].match(valueObj)){return true;}}return false;};} /**
	 * setLive()が呼ばれた時にDataModelにaddEventListenerするリスナを作成します
	 *
	 * @param {Query} query クエリクラス
	 * @returns {Function} リスナ
	 */function createChangeListener(query){var match=query._criteria.match;var resultArray=query.result;return function(ev){var removed=ev.removed;var created=ev.created;var changed=ev.changed;var isSorted=true;for(var i=0,l=removed.length;i<l;i++){ // resultArrayの何番目に入っているアイテムか
var resultIndex=$.inArray(removed[i],resultArray._src); // DataModelから削除されたら結果からも削除
if(resultIndex!==-1){resultArray.splice(resultIndex,1);}}for(var i=0,l=changed.length;i<l;i++){ // resultArrayの何番目に入っているアイテムか(入っていないなら-1)
var resultIndex=$.inArray(changed[i].target,resultArray._src); // 中身が変更されたら再ソート
isSorted=false; // マッチするかどうかチェックして、
// マッチするかつ結果にないものなら追加
// マッチしないかつ結果にあるものなら取り除く
if(match(changed[i].target.get())){if(resultIndex===-1){resultArray.push(changed[i].target);}}else {if(resultIndex!==-1){resultArray.splice(resultIndex,1);}}}for(var i=0,l=created.length;i<l;i++){ // 新しく作成されたアイテムがあればマッチするかどうかチェックして
// マッチするなら結果に追加
if(match(created[i].get())){isSorted=false;resultArray.push(created[i]);}} // ソート
if(query._compareFunction&&!isSorted){ // ソートする必要があるならソートする
resultArray.sort(query._compareFunction);}};} /**
	 * criteriaオブジェクトをコンパイルします
	 * <p>
	 * 以下のようなオブジェクトを生成します
	 * </p>
	 *
	 * <pre class="sh_javascript">
	 * {
	 *   queries: [{
	 *     prop: プロパティ名,
	 *     queryValue: 指定された値,
	 *     compareFunction: 指定された値と比較する関数,
	 *   }],
	 *   nestedCriterias: ネストされたcriteriaオブジェクト(コンパイル済み)の配列,
	 *   userFunctions: ユーザ指定関数の配列
	 * }
	 * </pre>
	 *
	 * @private
	 * @param {Object} criteria 検索条件オブジェクト
	 * @returns {Object} コンパイル済みcriteriaオブジェクト
	 */function compileCriteria(criteria){ // criteriaの解析
var queries=[];var nestedCriterias=[];var userFunctions=[];var compiledCriteria={queries:queries,nestedCriterias:nestedCriterias,userFunctions:userFunctions};for(var prop in criteria){if(prop===OPERAND_PROPERTY){continue;}if($.isPlainObject(criteria[prop])){ // objectの場合はネストしたcriteriaオブジェクトとして解析して追加する
nestedCriterias.push(compileCriteria(criteria[prop]));continue;}if(isFunction(criteria[prop])){ // 関数の場合はユーザ関数として追加
userFunctions.push(criteria[prop]);continue;}var queryValue=criteria[prop]; // queryValueのタイプをチェックする。配列指定なら先頭の要素でタイプを判定する
var valueForTypeCheck=isArray(queryValue)?queryValue[0]:queryValue;var compareFunctions=null;if(isRegExp(valueForTypeCheck)){ // 正規表現の場合
compareFunctions=COMPARE_REGEXP_FUNCTIONS;}else if(isDate(valueForTypeCheck)){ // Dateクラスの場合
compareFunctions=COMPARE_DATE_FUNCIONS;}else { // その他
compareFunctions=COMPARE_FUNCIONS;} // プロパティ名とオペランドに分割。連続した空白文字は無視
var tmp=$.trim(prop.replace(/ +/g,' ')).split(' '); // 演算子省略時は'='で比較
var op=tmp[1]||'=';var compareFunction=compareFunctions[op]; // compareFunctionが無い場合はエラー
if(!compareFunction){throwFwError(ERR_CODE_NO_COMPARE_FUNCTIONS,[op,$.type(valueForTypeCheck)]);}queries.push({prop:tmp[0],queryValue:queryValue,compareFunction:compareFunction});}compiledCriteria.match=criteria[OPERAND_PROPERTY]==='or'?createORCompareFunction(compiledCriteria):createANDCompareFunction(compiledCriteria);return compiledCriteria;} /**
	 * QueryResultクラス
	 * <p>
	 * {@link Query.execute}がこのクラスのインスタンスを返します
	 * </p>
	 * <p>
	 * {@link QueryResult.result}プロパティにクエリ結果が格納されています
	 * </p>
	 *
	 * @class
	 * @name QueryResult
	 */ /**
	 * @private
	 * @param {DataItem[]} result クエリ結果配列
	 */function QueryResult(result){ /**
		 * クエリ結果配列
		 * <p>
		 * {@link Query.execute}によって選択された{@link DataItem}が格納された配列です。
		 * </p>
		 *
		 * @memberOf QueryResult
		 * @name result
		 * @type {DataItem[]}
		 */this.result=result;} /**
	 * Queryクラス
	 * <p>
	 * {@link DataModel.createQuery}の戻り値がこのクラスのインスタンスです。<br>
	 * 参考：<a href="/conts/web/view/reference/data-model-query">リファレンス/データモデルのクエリ</a>
	 * </p>
	 *
	 * @class
	 * @name Query
	 */ /**
	 * @private
	 * @param {DataModel} model データモデル
	 */function Query(model){ /**
		 * 検索対象のデータモデ���
		 *
		 * @private
		 * @name _model
		 * @memberOf Query
		 * @type {DataModel}
		 */this._model=model;} // TODO 今は何もイベントをあげていないのでeventDispatcherにする必要がない。仕様が決まったら対応する。
//	h5.mixin.eventDispatcher.mix(Query.prototype);
$.extend(Query.prototype,{ /**
		 * 検索条件オブジェクトをセットします。<br>
		 * 参考：<a href="/conts/web/view/reference/data-model-query">リファレンス/データモデルのクエリ</a>
		 * <p>
		 * 検索の実行({@link Query.execute})を実行した時に、ここで指定した検索条件オブジェクトに基づいて検索を実行します。
		 * </p>
		 * <p>
		 * 検索条件オブジェクトは、"プロパティ名 (演算子)"をキーにして、比較する値を値に持つオブジェクトを指定します。
		 * 複数のプロパティを持つオブジェクトはデフォルトではANDで評価します。
		 * <p>
		 * 演算子には、===,!==,==,!=,>=,<=,between,!between,in,!inを指定できます。省略した場合は===です。
		 * </p>
		 * 検索条件オブジェクトに"__op"プロパティを持たせて、値に'or'を記述すると、ORでの評価になります。 ('and'を設定すると記述しない場合と同様ANDでの評価になります。
		 * </p>
		 *
		 * <pre class="sh_javascript">
		 * // 記述例
		 * // categoryが'book'で、nameに'HTML5'を含み、priceが3000未満のアイテムを検索する条件
		 * {
		 * 	category: 'book',
		 * 	name: /HTML5/,
		 * 	'price &lt;': 3000
		 * }
		 * // categoryが'game'または'movie'で、releaseDateが2014年以降のアイテムを検索する条件
		 * {
		 *   'category in': ['game', 'movie'],
		 *   'relaseDate &gt;=': new Date('2014/1/1')
		 * }
		 * </pre>
		 *
		 * @memberOf Query
		 * @param {Object} criteria 検索条件オブジェクト
		 * @returns {Query}
		 */setCriteria:function setCriteria(criteria){this._criteria=compileCriteria(criteria);return this;}, /**
		 * 検索を実行
		 * <p>
		 * {@link Query.setCriteria}で設定した検索条件で検索し、結果を{@link QueryResult}で返します。
		 * </p>
		 *
		 * @memberOf Query
		 * @returns {QueryResult}
		 */execute:function execute(){var result=[];for(var id in this._model.items){var item=this._model.items[id]; // マッチするなら結果に追加
if(this._criteria.match(item.get())){result.push(item);}} // ソート
if(this._orderFunction){result.sort(this._orderFunction);}else if(this._addedOrders){var addedOrders=this._addedOrders;var keysLength=addedOrders.length;result.sort(function(item1,item2){ // 追加されたキー順に評価する
// p1,p2が2つとも昇順で登録されている場合、p1で昇順ソートになっていて、p1が同じものについてはp2で昇順ソートされるようにする
for(var i=0;i<keysLength;i++){var order=addedOrders[i];var key=order.key;var isAsc=order.isAsc;var val1=item1.get(key);var val2=item2.get(key);if(val1>val2){return isAsc?1:-1;}if(val1<val2){return isAsc?-1:1;}}return 0;});}return new QueryResult(result);}, // TODO Liveクエリの仕様は再検討する
//		/**
//		 * クエリをライブクエリにします
//		 * <p>
//		 * ライブクエリにすると、検索条件がセットされた時やDataModelに変更があった時に検索結果が動的に変更されます。(executeを呼ぶ必要がありません)
//		 * </p>
//		 *
//		 * @see Query#unsetLive
//		 * @memberOf Query
//		 * @returns {Query}
//		 */
//		setLive: function() {
//			// ライブクエリ設定済みなら何もしない
//			if (this._isLive) {
//				return;
//			}
//			// リスナ未作成なら作成
//			this._listener = this._listener || createChangeListener(this);
//			this._model.addEventListener('itemsChange', this._listener);
//			this._isLive = true;
//
//			return this;
//		},
//
//		/**
//		 * ライブクエリを解除します
//		 *
//		 * @see Query#setLive
//		 * @memberOf Query
//		 * @returns {Query}
//		 */
//		unsetLive: function() {
//			// ライブクエリでなければ何もしない
//			if (!this._isLive) {
//				return;
//			}
//			this._model.removeEventListener('itemsChange', this._listener);
//			this._isLive = false;
//			return this;
//		},
/**
		 * 検索結果のソート条件を比較関数で設定
		 * <p>
		 * 検索結果をソートする比較関数を指定します。データアイテム同士を比較する関数を設定してください。
		 * </p>
		 * <p>
		 * 比較関数の例
		 * </p>
		 *
		 * <pre class="sh_javascript"><code>
		 * query.setOrderFunction(function(a, b) {
		 * 	// 比較関数の引数はそれぞれデータアイテム。第1引数のオブジェクトを先にする場合は負の値、第2引数のオブジェクトを先にする場合は正の値を返す。この場合、ageが小さい順（昇順）でソートされる。
		 * 		return a.get('age') - b.get('age');
		 * 	});
		 * </code></pre>
		 *
		 * <p>
		 * 単にあるプロパティで昇順あるいは降順にソートしたい場合は{@link Query.addOrder}で設定できます。
		 * </p>
		 * <p>
		 * {@link Query.addOrder}で条件を追加している場合にsetOrderFunctionで比較関数を設定することはできません。また逆に、setOrderFunctionで比較関数を設定している場合はaddOrderは呼べません。
		 * </p>
		 * <p>
		 * setOrderFunction()で比較設定を設定済みである場合に再度setOrderFunction()を実行すると、設定済みの関数は上書きされます。
		 * </p>
		 * <p>
		 * setOrderFunction()で設定したソート条件を削除したい場合は{@link Query.clearOrder}を実行してください。
		 * </p>
		 *
		 * @memberOf Query
		 * @param {Function} orderFunction
		 * @returns {Query}
		 */setOrderFunction:function setOrderFunction(orderFunction){ // 比較関数のエラーチェック
if(!isFunction(orderFunction)){throwFwError(ERR_CODE_ORDER_BY_COMPARE_FUNCTION_INVALID);}if(this._addedOrders){ // addOrderですでにオーダーキーが設定済みの場合はsetOrderFunctionできない
throwFwError(ERR_CODE_ALREADY_ADDED_ORDER);}this._orderFunction=orderFunction;return this;}, /**
		 * 検索結果のソート条件を指定したプロパティついての昇順、または降順に設定
		 * <p>
		 * 検索結果のソート条件を指定したプロパティについての昇順、または降順に設定します。第1引数には比較対象となるキー名を指定してください。
		 * </p>
		 * <p>
		 * 第2引数にfalseを指定した場合は降順です。trueを指定した場合は省略した場合は昇順です。
		 * </p>
		 * <p>
		 * addOrderは複数回呼ぶことで条件を追加できます。
		 * </p>
		 *
		 * <pre class="sh_javascript"><code>
		 * query.addOrder('p1').addOrder('p2', false);
		 * </code></pre>
		 *
		 * <p>
		 * 上記のように指定した場合、p1キーで昇順ソートし、p1の値が同じアイテムについてはp2キーで降順ソートします。
		 * </p>
		 * <p>
		 * {@link Query.setOrderFunction}で比較関数を設定している場合はこのメソッドは呼べません。また逆に、addOrder()で条件を追加している場合にsetOrderFunctionで比較関数を設定することもできません。
		 * </p>
		 * <p>
		 * addOrder()で追加した条件をすべて削除したい場合は{@link Query.clearOrder}を実行してください。
		 * </p>
		 *
		 * @memberOf Query
		 * @param {string} key
		 * @param {boolean} [isAsc=true] falseを指定すると降順に設定。デフォルトは昇順
		 * @returns {Query}
		 */addOrder:function addOrder(key,isAsc){ // keyがschemaにあるかどうかチェックする
var schema=this._model.schema;if(!schema.hasOwnProperty(key)){ // スキーマに存在しないプロパティはgetできない（プログラムのミスがすぐわかるように例外を送出）
throwFwError(ERR_CODE_ORDER_BY_KEY,['addOrder',key,this._model.name]);}if(this._orderFunction){ // setOrderFunctionですでにオーダー関数が設定済みの場合はaddOrderできない
throwFwError(ERR_CODE_ALREADY_SET_ORDER_FUNCTION);}this._addedOrders=this._addedOrders||[];this._addedOrders.push({key:key,isAsc:isAsc!==false});return this;}, /**
		 * 検索結果のソート条件指定を全て削除
		 * <p>
		 * {@link Query.addOrder}及び{@link Query.setOrderFunction}で設定したソート条件をすべて削除します。
		 * </p>
		 *
		 * @memberOf Query
		 * @returns {Query}
		 */clearOrder:function clearOrder(){this._addedOrders=null;this._orderFunction=null;return this;}}); // =========================================================================
//
// Body
//
// =========================================================================
/**
	 * Queryクラスを作成して返します
	 *
	 * @private
	 * @returns {Query} 検索を行うQueryクラスを返します
	 */function createQuery(){return new Query(this);} // =============================
// Expose to window
// =============================
// h5internalにqueryを公開
h5internal.data={createQuery:createQuery};})(); /* ------ h5.core.data ------ */(function(){ // =========================================================================
//
// Constants
//
// =========================================================================
// =============================
// Production
// =============================
/**
	 * <a href="#createSequence">createSequence()</a>で使用するための、型指定定数。
	 * <p>
	 * 文字列型を表します。
	 * </p>
	 *
	 * @since 1.1.0
	 * @memberOf h5.core.data
	 * @type {Integer}
	 */var SEQ_STRING=1; /**
	 * <a href="#createSequence">createSequence()</a>で使用するための、型指定定数
	 * <p>
	 * 数値型を表します。
	 * </p>
	 *
	 * @since 1.1.0
	 * @memberOf h5.core.data
	 * @type {Integer}
	 */var SEQ_INT=2;var ID_TYPE_STRING='string';var ID_TYPE_INT='number'; // -------------------------------
// エラーコード
// -------------------------------
/** マネージャ名が不正 */var ERR_CODE_INVALID_MANAGER_NAME=15000; /** ディスプリプタが不正 */var ERR_CODE_INVALID_DESCRIPTOR=15001; /** データアイテムの生成にはIDが必要なのに指定されていない */var ERR_CODE_NO_ID=15002; /** DataItem.set()でidをセットすることはできない */var ERR_CODE_CANNOT_SET_ID=15003; /** createModelに渡された配列内のディスクリプタ同士でtypeやbaseによる依存関係が循環参照している */var ERR_CODE_DESCRIPTOR_CIRCULAR_REF=15004; /** DataModelに属していないDataItem、またはDataManagerに属していないDataModelのDataItemは変更できない */var ERR_CODE_CANNOT_CHANGE_REMOVED_ITEM=15005; /** DataManagerに属していないDataModelで、create/remove/変更できない */var ERR_CODE_CANNOT_CHANGE_DROPPED_MODEL=15006; /** createの引数がオブジェクトでも配列でもない */var ERR_CODE_INVALID_CREATE_ARGS=15007; /** スキーマオブジェクトが指定されていない。 */var ERR_CODE_REQUIRE_SCHEMA=15008; /** スキーマが不正 */var ERR_CODE_INVALID_SCHEMA=15009; /** ObservableArrray#copyFromの引数が不正 */var ERR_CODE_INVALID_COPYFROM_ARGUMENT=15010; /** スキーマ違反の値がセットされた */var ERR_CODE_INVALID_ITEM_VALUE=15011; /** 依存項目にセットされた */var ERR_CODE_DEPEND_PROPERTY=15012; /** ObservableItemでスキーマで定義されていない値にセットされた */var ERR_CODE_CANNOT_SET_NOT_DEFINED_PROPERTY=15013; /** schemaに定義されていないプロパティを取得した */var ERR_CODE_CANNOT_GET_NOT_DEFINED_PROPERTY=15014; /** depend.calcが制約を満たさない値を返している */var ERR_CODE_CALC_RETURNED_INVALID_VALUE=15016; // ----------------------------------------------------------
// ディスクリプタのエラーコード(detailに入れるメッセージID)
// ----------------------------------------------------------
/** ディスクリプタがオブジェクトでない */var DESC_ERR_DETAIL_NOT_OBJECT=15900; /** nameが正しく設定されていない */var DESC_ERR_DETAIL_INVALID_NAME=15901; /** baseの指定が不正 */var DESC_ERR_DETAIL_INVALID_BASE=15902; /** baseに指定されたデータモデルが存在しない */var DESC_ERR_DETAIL_NO_EXIST_BASE=15903; /** schemaもbaseも指定されていない */var DESC_ERR_DETAIL_NO_SCHEMA=15904; /** schemaがオブジェクトでない */var DESC_ERR_DETAIL_SCHEMA_IS_NOT_OBJECT=6; // ---------------------------------------------------
// スキーマのエラーコード(detailに入れるメッセージID)
// ---------------------------------------------------
/** ID指定されたプロパティが重複している */var SCHEMA_ERR_DETAIL_DUPLICATED_ID=15800; /** ID指定されたプロパティがない */var SCHEMA_ERR_DETAIL_NO_ID=15801; /** プロパティ名が不正 */var SCHEMA_ERR_DETAIL_INVALID_PROPERTY_NAME=15802; /** id指定されたプロパティにdependが指定されている */var SCHEMA_ERR_DETAIL_ID_DEPEND=15803; /** depend.onに指定されたプロパティが存在しない */var SCHEMA_ERR_DETAIL_DEPEND_ON=15804; /** depend.calcに関数が指定されていない */var SCHEMA_ERR_DETAIL_DEPEND_CALC=15805; /** typeに文字列が指定されていない */var SCHEMA_ERR_DETAIL_INVALID_TYPE=15806; /** type文字列が不正 */var SCHEMA_ERR_DETAIL_TYPE=15807; /** typeに指定されたデータモデルが存在しない */var SCHEMA_ERR_DETAIL_TYPE_DATAMODEL=15808; /** type:enumなのにenumValueが指定されていない */var SCHEMA_ERR_DETAIL_TYPE_ENUM_NO_ENUMVALUE=15809; /** constraintにオブジェクトが指定されていない */var SCHEMA_ERR_DETAIL_INVALID_CONSTRAINT=15810; /** constraint.notNullの指定が不正 */var SCHEMA_ERR_DETAIL_INVALID_CONSTRAINT_NOTNULL_NOTEMPTY=15811; /** min-maxに数値が入力されなかった時のエラー */var SCHEMA_ERR_DETAIL_INVALID_CONSTRAINT_MIN_MAX=15812; /** typeがinteger,numberじゃないのにconstraint.min/max を指定されたときのエラー */var SCHEMA_ERR_DETAIL_TYPE_CONSTRAINT=15813; /** constraint.patternが正規表現じゃない */var SCHEMA_ERR_DETAIL_INVALID_CONSTRAINT_PATTERN=15814; /** minLength/maxLengthに0以上の整数値以外の値が渡された */var SCHEMA_ERR_DETAIL_INVALID_CONSTRAINT_MINLENGTH_MAXLENGTH=15815; /** constraintの指定に矛盾がある場合(mix > maxなど) */var SCHEMA_ERR_DETAIL_CONSTRAINT_CONFLICT=15816; /** typeがenumでないのにenumValueが指定されている */var SCHEMA_ERR_DETAIL_ENUMVALUE_TYPE=15817; /** enumValueが配列でない、または空配列 */var SCHEMA_ERR_DETAIL_INVALID_ENUMVALUE=15818; /** id項目にdefaultValueが設定されている */var SCHEMA_ERR_DETAIL_DEFAULTVALUE_ID=15819; /** defaultValueに設定された値がtype,constraintに指定された条件を満たしていない */var SCHEMA_ERR_DETAIL_INVALIDATE_DEFAULTVALUE=15820; /** ID項目のconstraintに不正な指定がある */var SCHEMA_ERR_DETAIL_CONSTRAINT_CONFLICT_ID=15821; /** defaultValue指定されたプロパティにdependが指定されている */var SCHEMA_ERR_DETAIL_DEFAULTVALUE_DEPEND=15822; /** dependの依存関係が循環している */var SCHEMA_ERR_DETAIL_DEPEND_CIRCULAR_REF=15823; /** ID項目に'string','integer'以外のタイプが指定された */var SCHEMA_ERR_ID_TYPE=15824; /**
	 * データモデルは存在しないことを表す文字列(n/a) エラーメッセージで使用。
	 */var NOT_AVAILABLE='n/a'; /**
	 * イベント名
	 */var EVENT_ITEMS_CHANGE='itemsChange'; /**
	 * データアイテム、データモデル変更時のイベントログをストックしておくためのタイプ
	 */var UPDATE_LOG_TYPE_CREATE=1;var UPDATE_LOG_TYPE_CHANGE=2;var UPDATE_LOG_TYPE_REMOVE=3; // =============================
// Development Only
// =============================
var fwLogger=h5.log.createLogger('h5.core.data'); /* del begin */ // 詳細エラーメッセージを作成する���数をカスタムフォーマッタに登録
function formatDescriptorError(code,msgSrc,msgParam,detail){var msg=h5.u.str.format.apply(null,[msgSrc].concat(msgParam))+' 詳細：';for(var i=0,len=detail.length;i<len;i++){if(i!==0){msg+=', ';}msg+=i+1+':';var reason=detail[i];if(reason.message){msg+=reason.message;}else {msg+='code='+reason.code;}}return msg;}addFwErrorCustomFormatter(ERR_CODE_INVALID_DESCRIPTOR,formatDescriptorError);addFwErrorCustomFormatter(ERR_CODE_INVALID_SCHEMA,formatDescriptorError); /**
	 * 各エラーコードに対応するメッセージ
	 */var errMsgMap={};errMsgMap[ERR_CODE_REQUIRE_SCHEMA]='スキーマオブジェクトが指定されていません。';errMsgMap[ERR_CODE_INVALID_SCHEMA]='スキーマ定義オブジェクトが不正です。';errMsgMap[ERR_CODE_INVALID_ITEM_VALUE]='Itemのsetterに渡された値がスキーマで指定された型・制約に違反しています。データモデル={0} 違反したプロパティ={1}';errMsgMap[ERR_CODE_DEPEND_PROPERTY]='depend指定されているプロパティに値をセットすることはできません。データモデル={0} 違反したプロパティ={1}';errMsgMap[ERR_CODE_CANNOT_SET_NOT_DEFINED_PROPERTY]='スキーマに定義されていないプロパティに値をセットすることはできません。データモデル={0} 違反したプロパティ={1}';errMsgMap[ERR_CODE_CANNOT_GET_NOT_DEFINED_PROPERTY]='スキーマに定義されていないプロパティは取得できません。データモデル={0} 違反したプロパティ={1}';errMsgMap[ERR_CODE_CALC_RETURNED_INVALID_VALUE]='calcで返却された値が、スキーマで指定された型・制約に違反しています。データモデル={0} プロパティ={1} 返却値={2}';errMsgMap[ERR_CODE_INVALID_COPYFROM_ARGUMENT]='copyFromの引数が不正です。配列を指定してください。引数位置={0}、値={1}';errMsgMap[ERR_CODE_INVALID_MANAGER_NAME]='マネージャ名が不正です。識別子として有効な文字列を指定してください。';errMsgMap[ERR_CODE_NO_ID]='データアイテムの生成にはID項目の値の設定が必須です。データモデル={0} IDプロパティ={1}';errMsgMap[ERR_CODE_INVALID_DESCRIPTOR]='データモデルディスクリプタにエラーがあります。';errMsgMap[ERR_CODE_CANNOT_SET_ID]='id指定されたプロパティを変更することはできません。データモデル={0} プロパティ={1}';errMsgMap[ERR_CODE_DESCRIPTOR_CIRCULAR_REF]='Datamaneger.createModelに渡された配列内のディスクリプタについて、baseやtypeによる依存関係が循環参照しています。';errMsgMap[ERR_CODE_CANNOT_CHANGE_REMOVED_ITEM]='DataModelに属していないDataItem、またはDataManagerに属していないDataModelのDataItemの中身は変更できません。データアイテムID={0}, メソッド={1}';errMsgMap[ERR_CODE_CANNOT_CHANGE_DROPPED_MODEL]='DataManagerに属していないDataModelの中身は変更できません。モデル名={0}, メソッド={1}';errMsgMap[ERR_CODE_INVALID_CREATE_ARGS]='DataModel.createに渡された引数が不正です。オブジェクトまたは、配列を指定してください。'; // メッセージの登録
addFwErrorCodeMap(errMsgMap); // detailに格納するメッセージ
var DESCRIPTOR_VALIDATION_ERROR_MSGS={};DESCRIPTOR_VALIDATION_ERROR_MSGS[SCHEMA_ERR_DETAIL_DUPLICATED_ID]='ID指定されているプロパティが複数あります。ID指定は1つのプロパティのみに指定してください。';DESCRIPTOR_VALIDATION_ERROR_MSGS[SCHEMA_ERR_DETAIL_NO_ID]='ID指定されているプロパティがありません。ID指定は必須です。';DESCRIPTOR_VALIDATION_ERROR_MSGS[SCHEMA_ERR_DETAIL_INVALID_PROPERTY_NAME]='{0}をプロパティ名に指定できません。半角英数字,_,$ で構成される文字列で、先頭は数字以外である必要があります。';DESCRIPTOR_VALIDATION_ERROR_MSGS[SCHEMA_ERR_DETAIL_ID_DEPEND]='"{0}"プロパティの定義にエラーがあります。id指定されたプロパティにdependを指定することはできません。';DESCRIPTOR_VALIDATION_ERROR_MSGS[SCHEMA_ERR_DETAIL_DEPEND_ON]='"{0}"プロパティプロパティの定義にエラーがあります。depend.onに指定されたプロパティが存在しません。';DESCRIPTOR_VALIDATION_ERROR_MSGS[SCHEMA_ERR_DETAIL_DEPEND_CALC]='"{0}"プロパティプロパティの定義にエラーがあります。depend.calcには関数を指定する必要があります';DESCRIPTOR_VALIDATION_ERROR_MSGS[SCHEMA_ERR_DETAIL_INVALID_TYPE]='"{0}"プロパティプロパティの定義にエラーがあります。typeは文字列で指定して下さい。';DESCRIPTOR_VALIDATION_ERROR_MSGS[SCHEMA_ERR_DETAIL_TYPE]='プロパティの定義にエラーがあります。typeに指定された文字列が不正です "{1}"';DESCRIPTOR_VALIDATION_ERROR_MSGS[SCHEMA_ERR_DETAIL_TYPE_DATAMODEL]='"{0}"プロパティの定義にエラーがあります。 typeに指定されたデータモデル"{1}"は存在しません';DESCRIPTOR_VALIDATION_ERROR_MSGS[SCHEMA_ERR_DETAIL_TYPE_ENUM_NO_ENUMVALUE]='"{0}"プロパティの定義にエラーがあります。 タイプにenumを指定する場合はenumValueも指定する必要があります';DESCRIPTOR_VALIDATION_ERROR_MSGS[SCHEMA_ERR_DETAIL_INVALID_CONSTRAINT]='"{0}"プロパティの定義にエラーがあります。 constraintはオブジェクトで指定してください';DESCRIPTOR_VALIDATION_ERROR_MSGS[SCHEMA_ERR_DETAIL_INVALID_CONSTRAINT_NOTNULL_NOTEMPTY]='"{0}"プロパティの定義にエラーがあります。 constraint.{1} の指定が不正です。trueまたはfalseで指定してください。';DESCRIPTOR_VALIDATION_ERROR_MSGS[SCHEMA_ERR_DETAIL_INVALID_CONSTRAINT_MIN_MAX]='"{0}"プロパティの定義にエラーがあります。 constraint.{1} は、数値で指定してください。typeにintegerを指定している場合は整数値で指定する必要があります';DESCRIPTOR_VALIDATION_ERROR_MSGS[SCHEMA_ERR_DETAIL_TYPE_CONSTRAINT]='"{0}"プロパティの定義にエラーがあります。 constraint.{1} は、type:{2}の項目に対して指定することはできません。';DESCRIPTOR_VALIDATION_ERROR_MSGS[SCHEMA_ERR_DETAIL_INVALID_CONSTRAINT_PATTERN]='"{0}"プロパティ constraint.{1}は正規表現オブジェクトで指定してください。';DESCRIPTOR_VALIDATION_ERROR_MSGS[SCHEMA_ERR_DETAIL_INVALID_CONSTRAINT_MINLENGTH_MAXLENGTH]='"{0}"プロパティの定義にエラーがあります。 constraint.{1}には正の整数を指定してください';DESCRIPTOR_VALIDATION_ERROR_MSGS[SCHEMA_ERR_DETAIL_CONSTRAINT_CONFLICT]='"{0}"プロパティの定義にエラーがあります。 constraintに矛盾する指定があります。{1},{2}';DESCRIPTOR_VALIDATION_ERROR_MSGS[SCHEMA_ERR_DETAIL_ENUMVALUE_TYPE]='"{0}"プロパティの定義にエラーがあります。 enumValueはtypeに"enum"またはその配列が指定されている場合のみ指定可能です';DESCRIPTOR_VALIDATION_ERROR_MSGS[SCHEMA_ERR_DETAIL_INVALID_ENUMVALUE]='"{0}"プロパティの定義にエラーがあります。 enumValueはnull,undefinedを含まない長さ1以上の配列を指定してください';DESCRIPTOR_VALIDATION_ERROR_MSGS[SCHEMA_ERR_DETAIL_DEFAULTVALUE_ID]='"{0}"プロパティの定義にエラーがあります。id指定した項目にdefaultValueを設定することはできません';DESCRIPTOR_VALIDATION_ERROR_MSGS[SCHEMA_ERR_DETAIL_INVALIDATE_DEFAULTVALUE]='"{0}"プロパティのdefaultValueに設定された値"{1}"は、typeまたはconstraintに定義された条件を満たしていません';DESCRIPTOR_VALIDATION_ERROR_MSGS[SCHEMA_ERR_DETAIL_CONSTRAINT_CONFLICT_ID]='"{0}"プロパティの定義にエラーがあります。id指定された項目にconstraint.{1}:{2}を指定することはできません';DESCRIPTOR_VALIDATION_ERROR_MSGS[SCHEMA_ERR_DETAIL_DEFAULTVALUE_DEPEND]='"{0}"プロパティの定義にエラーがあります。dependが指定された項目にdefaultValueを指定することはできません。';DESCRIPTOR_VALIDATION_ERROR_MSGS[SCHEMA_ERR_DETAIL_DEPEND_CIRCULAR_REF]='"{0}"プロパティの定義にエラーがあります。depend.onに指定されたプロパティの依存関係が循環しています';DESCRIPTOR_VALIDATION_ERROR_MSGS[DESC_ERR_DETAIL_NOT_OBJECT]='DataModelのディスクリプタにはオブジェクトを指定してください。';DESCRIPTOR_VALIDATION_ERROR_MSGS[DESC_ERR_DETAIL_INVALID_NAME]='データモデル名が不正です。使用できる文字は、半角英数字、_、$、のみで、先頭は数字以外である必要があります。';DESCRIPTOR_VALIDATION_ERROR_MSGS[DESC_ERR_DETAIL_INVALID_BASE]='baseの指定が不正です。指定する場合は、継承したいデータモデル名の先頭に"@"を付けた文字列を指定してください。';DESCRIPTOR_VALIDATION_ERROR_MSGS[DESC_ERR_DETAIL_NO_EXIST_BASE]='baseの指定が不正です。指定されたデータモデル{0}は存在しません。';DESCRIPTOR_VALIDATION_ERROR_MSGS[DESC_ERR_DETAIL_NO_SCHEMA]='schemaの指定が不正です。baseの指定がない場合はschemaの指定は必須です。';DESCRIPTOR_VALIDATION_ERROR_MSGS[DESC_ERR_DETAIL_SCHEMA_IS_NOT_OBJECT]='schemaの指定が不正です。schemaはオブジェクトで指定してください。';DESCRIPTOR_VALIDATION_ERROR_MSGS[SCHEMA_ERR_ID_TYPE]='"{0}"プロパティの定義にエラーがあります。id指定されたプロパティには"string","integer"以外のtypeを指定することはできません。'; // ログメッセージ
var MSG_ERROR_DUP_REGISTER='同じ名前のデータモデルを登録しようとしました。同名のデータモデルの2度目以降の登録は無視されます。マネージャ名は {0}, 登録しようとしたデータモデル名は {1} です。'; /* del end */ // =========================================================================
//
// Cache
//
// =========================================================================
// =========================================================================
//
// Privates
//
// =========================================================================
// =============================
// Variables
// =============================
/**
	 * DataItem, ObservableItem共通
	 */var itemProto={ /**
		 * 指定されたキーのプロパティの値を取得します。
		 * <p>
		 * 引数にプロパティ名を指定すると、アイテムが持つそのプロパティの値を返します。
		 * </p>
		 * <p>
		 * 引数の指定がない場合は、{id: '001', value: 'hoge'} のような、そのデータアイテムが持つ値を格納したオブジェクトを返します。
		 * </p>
		 *
		 * @since 1.1.0
		 * @memberOf DataItem
		 * @param {String} [key] プロパティキー。指定のない場合は、アイテムの持つプロパティ名をキーに、そのプロパティの値を持つオブジェクトを返します。
		 * @returns Any 指定されたプロパティの値。引数なしの場合はプロパティキーと値を持つオブジェクト。
		 */get:function get(key){if(arguments.length===0){return $.extend({},this._values);} // DataItemの場合はモデルから、ObsItemの場合はObsItemのインスタンスからschemaを取得
var model=this._model;var schema=model?model.schema:this.schema;if(!schema.hasOwnProperty(key)){ //スキーマに存在しないプロパティはgetできない（プログラムのミスがすぐわかるように例外を送出）
throwFwError(ERR_CODE_CANNOT_GET_NOT_DEFINED_PROPERTY,[model?model.name:NOT_AVAILABLE,key]);}return getValue(this,key);}, /**
		 * 指定されたキーのプロパティに値をセットします。
		 * <p>
		 * 複数のプロパティに対して値を一度にセットしたい場合は、{ キー1: 値1, キー2: 値2, ... }という構造をもつオブジェクトを1つだけ渡してください。
		 * </p>
		 * <p>
		 * 1つのプロパティに対して値をセットする場合は、 item.set(key, value); のように2つの引数でキーと値を個別に渡すこともできます。
		 * </p>
		 * <p>
		 * このメソッドを呼ぶと、再計算が必要と判断された依存プロパティは自動的に再計算されます。
		 * 再計算によるパフォーマンス劣化を最小限にするには、1つのアイテムへのset()の呼び出しはできるだけ少なくする
		 * （引数をオブジェクト形式にして一度に複数のプロパティをセットし、呼び出し回数を最小限にする）ようにしてください。
		 * </p>
		 *
		 * @since 1.1.0
		 * @memberOf DataItem
		 * @param {Any} var_args 複数のキー・値のペアからなるオブジェクト、または1組の(キー, 値)を2つの引数で取ります。
		 */set:function set(var_args){ //引数はオブジェクト1つ、または(key, value)で呼び出せる
var valueObj=var_args;if(arguments.length===2){valueObj={};valueObj[arguments[0]]=arguments[1];} // データモデルから作られたアイテムなら、アイテムがモデルに属しているか、モデルがマネージャに属しているかのチェック
// アイテムがモデルに属していない又は、アイテムが属しているモデルがマネージャに属していないならエラー
var model=this._model;if(model&&(this._isRemoved||!model._manager)){throwFwError(ERR_CODE_CANNOT_CHANGE_REMOVED_ITEM,[getValue(this,this._model._idKey),'set'],this);} // バリデーション
if(model){ // idの変更がされてるかどうかチェック
if(model._idKey in valueObj&&valueObj[model._idKey]!==getValue(this,model._idKey)){ //IDの変更は禁止
throwFwError(ERR_CODE_CANNOT_SET_ID,[model.name,this._idKey]);} // スキーマの条件を満たすかどうかチェック
// DataItemの場合はモデルから、ObsItemの場合はObsItemのインスタンスからschemaを取得
validateValueObj(model.schema,model._schemaInfo._validateItemValue,valueObj,model);}else { // モデルが無い場合はthisはObserbableItem。(モデルが無いDataItemはチェック済みのため)
// ObsItem.validateを呼んでスキーマの条件を満たすかどうかチェック
var error=this.validate(valueObj);if(error){throw error;}}var event=null; // updateセッション中かどうか。updateセッション中ならこのsetの中ではbeginUpdateもendUpdateしない
// updateセッション中でなければ、begin-endで囲って、最後にイベントが発火するようにする
// このbegin-endの間にObsArrayでイベントが上がっても(内部でcopyFromを使ったりなど)、itemにイベントは上がらない
var isAlreadyInUpdate=model?model._manager.isInUpdate():false;if(model&&!isAlreadyInUpdate){model._manager.beginUpdate();} // isInSetフラグを立てて、set内の変更でObsAry.copyFromを呼んだ時にイベントが上がらないようにする
this._isInSet=true;event=itemSetter(this,valueObj);this._isInSet=false;if(model){ // データアイテムの場合は、モデルにイベントを渡す
if(event){ // 更新した値があればChangeLogを追記
addUpdateChangeLog(model,event);} // endUpdateを呼んでイベントを発火
if(!isAlreadyInUpdate){model._manager.endUpdate();}}else if(event){ // ObservableItemなら即発火
this.dispatchEvent(event);}}, /**
		 * type:[]であるプロパティについて、最後にセットされた値がnullかどうかを返します。
		 * <p>
		 * type:[]としたプロパティは常にObservableArrayインスタンスがセットされており、set('array', null);
		 * と呼ぶと空配列を渡した場合と同じになります。
		 * </p>
		 * <p>
		 * そのため、「実際にはnullをセットしていた（item.set('array', null)）」場合と「空配列をセットしていた（item.set('array,'
		 * [])）」場合を区別したい場合にこのメソッドを使ってください。
		 * </p>
		 * <p>
		 * データアイテムを生成した直後は、スキーマにおいてdefaultValueを書いていな���またはnullをセットした場合はtrue、それ以外の場合はfalseを返します。
		 * </p>
		 * <p>
		 * なお、引数に配列指定していないプロパティを渡した場合は、現在の値がnullかどうかを返します。
		 * </p>
		 *
		 * @since 1.1.0
		 * @memberOf DataItem
		 * @param {String} key プロパティ名
		 * @returns {Boolean} 現在指定したプロパティにセットされているのがnullかどうか
		 */regardAsNull:function regardAsNull(key){if(this._isArrayProp(key)){return this._nullProps[key]===true;}return getValue(this,key)===null;}, /**
		 * 指定されたプロパティがtype:[]かどうかを返します。（type:anyでObservableArrayが入っている場合とtype:[]で最初から
		 * ObservableArrayが入っている場合を区別するため
		 *
		 * @private
		 * @memberOf DataItem
		 * @returns {Boolean} 指定されたプロパティがtype:[]なプロパティかどうか
		 */_isArrayProp:function _isArrayProp(prop){ // DataItemの場合はモデルから、ObsItemの場合はObsItemのインスタンスからschemaを取得
var schema=this._model?this._model.schema:this.schema; // DataItemの場合はモデルから、ObsItemの場合はObsItemのインスタンスからschemaを取得
if(schema[prop]&&schema[prop].type&&schema[prop].type.indexOf('[]')>-1){ //Bindingにおいて比較的頻繁に使われるので、高速化も検討する
return true;}return false;}}; // =============================
// Functions
// =============================
//========================================================
//
// バリデーション関係コードここから
//
//========================================================
/**
	 * ObservableItem, DataItem, DataModelから計算済みのschemaオブジェクトを取得する
	 *
	 * @private
	 * @param {ObservableItem|DataItem|DataModel}
	 */function getSchema(itemOrModel){ // ObsItem,DataModelはschemaプロパティを持つが、DataItemはschemaを持たないので、modelから取得して返す
return itemOrModel.schema||itemOrModel._model.schema;} /**
	 * schemaオブジェクトのtype指定の文字列を、パースした結果を返す。 正しくパースできなかった場合は空オブジェクトを返す。
	 *
	 * @private
	 * @param {String} type type指定文字列。文字列以外が渡された場合は空オブジェクトを返す
	 * @returns {Object} typeをパースした結果オブジェクト。
	 *          elmType:タイプから配列部分を除いた文字列。dataModel:データモデル名。dimension:配列の深さ(配列指定でない場合は0)
	 */function getTypeObjFromString(type){ // マッチ結果から、データモデル指定の場合と配列の場合をチェックする
// "string[]"のとき、matched = ["string[]", "string", undefined, "[]", "[]"]
// "@DataModel"のとき、matched = ["@DataModel", "@DataModel", "DataModel", "", undefined]
var matched=type&&isString(type)?type.match(/^(string|number|integer|boolean|any|enum|@(.+?))((\[\]){0,1})$/):null;return matched?{elmType:matched[1],dataModel:matched[2],dimension:matched[3]?1:0}:{};} /**
	 * dependの循環参照をチェックする関数 循環参照するならtrueを返す
	 *
	 * @private
	 * @param {String} prop map[prop]から辿って行って調べる。
	 * @param {Object} map 依存関係をマップしたオブジェクト。{prop1: ['prop2','prop3'], prop2: ['prop3']}
	 *            のような構造で依存関係を表したオブジェクト
	 * @returns {Boolean} 循環参照しているかどうか
	 */function checkDependCircularRef(prop,map){return function checkCircular(p,ancestors){if(!map[p]){return false;}for(var i=0,l=map[p].length;i<l;i++){if($.inArray(map[p][i],ancestors)>-1||checkCircular(map[p][i],ancestors.concat([p]))){return true;}}return false;}(prop,[]);} /**
	 * 引数がNaNかどうか判定する。isNaNとは違い、例えば文字列はNaNではないのでfalseとする
	 *
	 * @private
	 * @param {Any} val 判定する値
	 * @returns {Boolean} 引数がNaNかどうか
	 */function isStrictNaN(val){return typeof val==='number'&&isNaN(val);} /**
	 * 引数を2つ取り、両方ともisStrictNaNかどうか判定する
	 *
	 * @private
	 * @param {Any} val1 判定する値
	 * @param {Any} val2 判定する値
	 * @returns {Boolean} 引数が2つともNaNかどうか
	 */function isBothStrictNaN(val1,val2){return isStrictNaN(val1)&&isStrictNaN(val2);} /**
	 * type:'number' 指定のプロパティに代入できるかのチェック null,undefined,NaN,parseFloatしてNaNにならないもの
	 * に当てはまる引数についてtrueを返す
	 *
	 * @private
	 * @param {Any} val 判定する値
	 * @param {Boolean} isStrict 厳密に判定するかどうか。isStrict === trueなら型変換可能でも型が違えばfalseを返す
	 * @returns {Boolean} type:'number'指定のプロパティに代入可能か
	 */function isNumberValue(val,isStrict){ // nullまたはundefinedはtrue
// NaNを直接入れた場合はtrue
// new Number() で生成したオブジェクトはtrue
// 文字列の場合は、[±(数字)(.数字)]で構成されている文字列ならOKにする
// ※ parseFloatよりも厳しいチェックにしている。
// "1.2", "+1.2", "1", ".2", "-.2" はOK。
// "12.3px"、"12.3.4"、"123.", [12.3, 4] はいずれもparseFloatできるが、ここではNG。
return val==null||isStrictNaN(val)||typeof val==='number'||!isStrict&&(val instanceof Number||!!((isString(val)||val instanceof String)&&!!val.match(/^[+\-]{0,1}[0-9]*\.{0,1}[0-9]+$/)));} /**
	 * type:'integer' 指定のプロパティに代入できるかのチェック null,undefined,parseFloatとparsFloatの結果が同じもの(NaNは除く)
	 * に当てはまる引数についてtrueを返す
	 *
	 * @private
	 * @param {Any} val 判定する値
	 * @param {Boolean} isStrict 厳密に判定するかどうか。isStrict === trueなら型変換可能でも型が違えばfalseを返す
	 * @returns {Boolean} type:'integer'指定のプロパティに代入可能か
	 */function isIntegerValue(val,isStrict){ // parseIntとparseFloatの結果が同じかどうかで整数値かどうかの判定をする
// typeofが'nubmer'または、new Number()で生成したオブジェクトで、parseFloatとparseIntの結果が同じならtrue
// NaN, Infinity, -Infinityはfalseを返す(parseInt(Infinity)はNaNであるので、InfinityはIntじゃない扱いにする
// 文字列の場合は、[±数字]で構成されている文字列ならOKにする
// ※ parseIntよりも厳しいチェックにしている。"12px"、"12.3"、[12,3] はいずれもparseIntできるが、ここではNG。
return val==null||typeof val==='number'&&parseInt(val)===val||!isStrict&&(val instanceof Number&&parseInt(val)===parseFloat(val)||(typeof val==='string'||val instanceof String)&&!!val.match(/^[+\-]{0,1}[0-9]+$/));} /**
	 * ラッパークラスをunboxする 配列が渡されたら、配列の中身をunboxする
	 *
	 * @private
	 * @param v {Any}
	 * @returns unboxしたもの
	 */function unbox(v){if(isArray(v)){var ary=v.slice(0);for(var i=0,l=ary.length;i<l;i++){ // aryalueOfメソッドのあるオブジェクトならその値を入れる
ary[i]=ary[i]&&_typeof(ary[i])==='object'?ary[i]&&ary[i].valueOf&&ary[i].valueOf():ary[i];}return ary;}return v&&(typeof v==='undefined'?'undefined':_typeof(v))==='object'&&v.valueOf?v.valueOf():v;} /**
	 * type:'string' 指定のプロパティに代入できるかのチェック
	 *
	 * @private
	 * @param {Any} val 判定する値
	 * @param {Boolean} isStrict 厳密に判定するかどうか。isStrict === trueなら型変換可能でも型が違えばfalseを返す
	 * @returns {Boolean} type:'string'指定のプロパティに代入可能か
	 */function isStringValue(val,isStrict){return !!(val==null||isString(val)||!isStrict&&val instanceof String);} /**
	 * type:'boolean' 指定のプロパティに代入できるかのチェック
	 *
	 * @private
	 * @param {Any} val 判定する値
	 * @param {Boolean} isStrict 厳密に判定するかどうか。isStrict === trueなら型変換可能でも型が違えばfalseを返す
	 * @returns {Boolean} type:'boolean'指定のプロパティに代入可能か
	 */function isBooleanValue(val,isStrict){return val==null||typeof val==='boolean'||!isStrict&&val instanceof Boolean;} /**
	 * type:'enum' 指定のプロパティに代入できるかのチェック
	 *
	 * @private
	 * @param {Any} val 判定する値
	 * @param {Array} enumValue 列挙されている値の配列
	 * @returns {Boolean} type:'enum'指定のプロパティに代入可能か
	 */function isEnumValue(v,enumValue){if(isStrictNaN(v)){ // NaN の時は、NaN===NaNにならない(inArrayでも判定できない)ので、enumValueの中身を見て判定する
for(var i=0,l=enumValue.length;i<l;i++){if(isStrictNaN(enumValue[i])){return true;}}return false;}return v===null||$.inArray(v,enumValue)>-1;} /**
	 * データモデルのディスクリプタとして正しいオブジェクトかどうかチェックする。 正しくない場合はエラーを投げる。
	 *
	 * @private
	 * @param {Object} descriptor オブジェクト
	 * @param {Object} DataManagerオブジェクト
	 * @param {Boolean} stopOnErro エラーが発生した時に、即座にreturnするかどうか
	 */function validateDescriptor(descriptor,manager,stopOnError){var errorReason=[];function pushErrorReason() /* var_args */{errorReason.push(createItemDescErrorReason.call(this,arguments));if(stopOnError){ // エラーを投げてチェック処理を終了する
throw null;}} // try-catchで囲うことで、必ずERR_CODE_INVALID_DESCRIPTORエラーを投げられるようにしている。
// (stopOnErrorがfalseで、予期しない箇所でエラーが出たとしてもERR_CODE_INVALID_DESCRIPTORエラーを投げる。)
try{ // descriptorがオブジェクトかどうか
if(!$.isPlainObject(descriptor)){ // descriptorがオブジェクトじゃなかったら、これ以上チェックしようがないので、stopOnErrorの値に関わらずreturnする
pushErrorReason(DESC_ERR_DETAIL_NOT_OBJECT);throw null;} // nameのチェック
if(!isValidNamespaceIdentifier(descriptor.name)){ // 識別子として不適切な文字列が指定されていたらエラー
pushErrorReason(DESC_ERR_DETAIL_INVALID_NAME);} // baseのチェック
var base=descriptor.base;var baseSchema=null;if(base!=null){ // nullまたはundefinedならチェックしない
if(!isString(base)||base.indexOf('@')!==0){ // @で始まる文字列（base.indexOf('@')が0）でないならエラー
pushErrorReason(DESC_ERR_DETAIL_INVALID_BASE);}else {var baseName=base.substring(1);var baseModel=manager.models[baseName];if(!baseModel){ // 指定されたモデルが存在しないならエラー
pushErrorReason(DESC_ERR_DETAIL_NO_EXIST_BASE,baseName);}else {baseSchema=manager.models[baseName].schema;}}} // schemaのチェック
// baseSchemaがないのに、schemaが指定されていなかったらエラー
var schema=descriptor.schema;if(!baseSchema&&schema==null){pushErrorReason(DESC_ERR_DETAIL_NO_SCHEMA);} // schemaが指定されていて、オブジェクトでないならエラー
if(!baseSchema&&!$.isPlainObject(schema)){pushErrorReason(DESC_ERR_DETAIL_SCHEMA_IS_NOT_OBJECT); // schemaがオブジェクトでなかったら、schemaのチェックのしようがないので、stopOnErrorの値に関わらずエラーを投げる
throw null;}}catch(e){throwFwError(ERR_CODE_INVALID_DESCRIPTOR,null,errorReason);}} /**
	 * schemaが正しいかどうか判定する。正しくない場合はエラーを投げる。
	 *
	 * @private
	 * @param {Object} schema schemaオブジェクト。データモデルのディスクリプタに指定されたスキーマなら継承関係は計算済み。
	 * @param {Boolean} [isDataModelSchema]
	 *            データモデルのスキーマかどうか。データモデルのスキーマならidチェックが必要で、type指定に@データモデル指定が可能。
	 * @param {Object} [manager] DataManagerオブジェクト。データモデルのスキーマチェック時には必須。
	 * @param {Boolean} [stopOnError] エラーが発生した時に、即座にreturnするかどうか。(trueなら即座にreturn)
	 */function validateSchema(schema,isDataModelSchema,manager,stopOnError){if((typeof schema==='undefined'?'undefined':_typeof(schema))!=='object'){ // schemaがオブジェクトじゃないならエラー
throwFwError(ERR_CODE_REQUIRE_SCHEMA);}var errorReason=[];function pushErrorReason() /* var_args */{errorReason.push(createItemDescErrorReason.call(this,arguments));if(stopOnError){ // エラーを投げてチェック処理を終了する
throw null;}} // try-catchで囲うことで、必ずERR_CODE_INVALID_SCHEMAエラーを投げられるようにしている。
// (stopOnErrorがfalseで、予期しない箇所でエラーが出たとしてもERR_CODE_INVALID_SCHEMAエラーを投げる。)
try{ /**
			 * dependのチェック
			 * <ul>
			 * <li>defaultValueは指定されていないか
			 * <li>onが指定されているか
			 * <li>onに指定されているプロパティがschema内に存在するか
			 * <li>calcが指定されているか
			 * </ul>
			 *
			 * @param depend
			 */var checkDepend=function checkDepend(depend){if(depend==null){return;} // id指定されているならエラー
if(isId){pushErrorReason(SCHEMA_ERR_DETAIL_ID_DEPEND,schemaProp);} // defaultValueが指定されているならエラー
if(propObj.hasOwnProperty('defaultValue')){pushErrorReason(SCHEMA_ERR_DETAIL_DEFAULTVALUE_DEPEND,schemaProp);} // dependが指定されているなら、onが指定されていること
if(depend.on==null){pushErrorReason(SCHEMA_ERR_DETAIL_DEPEND_ON,schemaProp);}else {var onArray=wrapInArray(depend.on);for(var i=0,l=onArray.length;i<l;i++){if(!schema.hasOwnProperty(onArray[i])){pushErrorReason(SCHEMA_ERR_DETAIL_DEPEND_ON,schemaProp);break;}}} // dependが指定されているなら、calcが指定されていること
if(typeof depend.calc!=='function'){pushErrorReason(SCHEMA_ERR_DETAIL_DEPEND_CALC,schemaProp);} // 後の循環参照チェックのため、depend.onを覚えておく
dependencyMap[schemaProp]=wrapInArray(depend.on);}; /**
			 * typeのチェック
			 * <ul>
			 * <li>typeに指定されている文字列は正しいか
			 * <li>defaultValueとの矛盾はないか
			 * <li>constraintにそのtypeで使えない指定がないか
			 * <li>enumの時は、enumValueが指定されているか
			 * </ul>
			 *
			 * @param type
			 */var checkType=function checkType(type){if(isId&&type==null){ // id項目で、typeが指定されていない場合は、type:stringにしてチェックする
type='string';}var typeObj={};if(type==null){return;}if(!isString(type)){pushErrorReason(SCHEMA_ERR_DETAIL_INVALID_TYPE,schemaProp);return;}if(isId&&type!=='string'&&type!=='integer'){ // id指定されているプロパティで、string,integer以外だった場合はエラー
pushErrorReason(SCHEMA_ERR_ID_TYPE,schemaProp);} // "string", "number[]", "@DataModel"... などの文字列をパースしてオブジェクトを生成する
// 正しくパースできなかった場合は空オブジェクトが返ってくる
typeObj=getTypeObjFromString(type);if(!typeObj.elmType){ // パースできない文字列が指定されていたらエラー
pushErrorReason(SCHEMA_ERR_DETAIL_TYPE,schemaProp,type);}else { // データモデルの場合
if(typeObj.dataModel){if(!isDataModelSchema){ // データモデルをタイプに指定できるのはデータモデルのスキーマだけなのでエラー
pushErrorReason(SCHEMA_ERR_DETAIL_TYPE,schemaProp,typeObj.dataModel);}if(!manager.models[typeObj.dataModel]){pushErrorReason(SCHEMA_ERR_DETAIL_TYPE_DATAMODEL,schemaProp,typeObj.dataModel);}} // enumの場合
if(typeObj.elmType==='enum'){ // enumValueが無ければエラー
if(propObj.enumValue==null){pushErrorReason(SCHEMA_ERR_DETAIL_TYPE_ENUM_NO_ENUMVALUE,schemaProp);}}}}; /**
			 * constraintのチェ���ク
			 * <ul>
			 * <li>プロパティのチェック
			 * <li>値のチェック
			 * <li>タイプと矛盾していないかのチェック
			 * </ul>
			 *
			 * @param constraint
			 * @param typeObj
			 */var checkConstraint=function checkConstraint(constraint,typeObj){if(constraint==null){return;} // constraintのチェック
if(!$.isPlainObject(constraint)){ // constraintがオブジェクトではない場合
pushErrorReason(SCHEMA_ERR_DETAIL_INVALID_CONSTRAINT,schemaProp);return;}for(var p in constraint){ // constraintのプロパティの値とtype指定との整合チェック
var val=constraint[p];if(val==null){continue;}switch(p){case 'notNull':if(val!==true&&val!==false){ // notNullにtrueまたはfalse以外が指定されていたらエラー
pushErrorReason(SCHEMA_ERR_DETAIL_INVALID_CONSTRAINT_NOTNULL_NOTEMPTY,schemaProp,p);}else if(isId&&!val){ // id項目にnotNull:falseが指定されていたらエラー
pushErrorReason(SCHEMA_ERR_DETAIL_CONSTRAINT_CONFLICT_ID,schemaProp,p,val);}break;case 'min':case 'max':switch(typeObj.elmType){case 'integer':if(isString(val)||!isIntegerValue(val)||isStrictNaN(val)){ // 整数値以外、NaNが指定されていたらエラー
pushErrorReason(SCHEMA_ERR_DETAIL_INVALID_CONSTRAINT_MIN_MAX,schemaProp,p);}break;case 'number':if(isString(val)||isString(val)||!isNumberValue(val)||val===Infinity||val===-Infinity||isStrictNaN(val)){ // 整数値以外、NaNが指定されていたらエラー
pushErrorReason(SCHEMA_ERR_DETAIL_INVALID_CONSTRAINT_MIN_MAX,schemaProp,p);}break;default: // typeの指定とconstraintに不整合があったらエラー
pushErrorReason(SCHEMA_ERR_DETAIL_TYPE_CONSTRAINT,schemaProp,p,typeObj.elmType);}break;case 'minLength':case 'maxLength':switch(typeObj.elmType){case 'string':if(isString(val)||!isIntegerValue(val)||isStrictNaN(val)||val<0){ // typeの指定とconstraintに不整合があったらエラー
pushErrorReason(SCHEMA_ERR_DETAIL_INVALID_CONSTRAINT_MINLENGTH_MAXLENGTH,schemaProp,p);}else if(isId&&p==='maxLength'&&val===0){ // id項目にmaxLength: 0 が指定されていたらエラー
pushErrorReason(SCHEMA_ERR_DETAIL_CONSTRAINT_CONFLICT_ID,schemaProp,p,val);}break;default: // type:'string'以外の項目にmaxLength,minLengthが指定されていればエラー
pushErrorReason(SCHEMA_ERR_DETAIL_TYPE_CONSTRAINT,schemaProp,p,typeObj.elmType);}break;case 'notEmpty':switch(typeObj.elmType){case 'string':if(val!==true&&val!==false){ // notEmptyにtrue,false以外の指定がされていたらエラー
pushErrorReason(SCHEMA_ERR_DETAIL_INVALID_CONSTRAINT_NOTNULL_NOTEMPTY,schemaProp,p);}else if(isId&&!val){ // id項目にnotEmpty: false が指定されていたらエラー
pushErrorReason(SCHEMA_ERR_DETAIL_CONSTRAINT_CONFLICT_ID,schemaProp,p,val);}break;default: // type:'string'以外の項目にnotEmptyが指定されていたらエラー
pushErrorReason(SCHEMA_ERR_DETAIL_TYPE_CONSTRAINT,schemaProp,p,typeObj.elmType);}break;case 'pattern':switch(typeObj.elmType){case 'string':if($.type(val)!=='regexp'){ // patternにRegExpオブジェクト以外のものが指定されていたらエラー
pushErrorReason(SCHEMA_ERR_DETAIL_INVALID_CONSTRAINT_PATTERN,schemaProp,p);}break;default: // type:'string'以外の項目にpatterが指定されていたらエラー
pushErrorReason(SCHEMA_ERR_DETAIL_TYPE_CONSTRAINT,schemaProp,p,typeObj.elmType);}break;}} // constraintの中身に矛盾がないかどうかチェック
if(constraint.notEmpty&&constraint.maxLength===0){ // notNullなのにmanLengthが0
pushErrorReason(SCHEMA_ERR_DETAIL_CONSTRAINT_CONFLICT,schemaProp,'notEmpty','maxLength');}if(constraint.min!=null&&constraint.max!=null&&constraint.min>constraint.max){ // min > max
pushErrorReason(SCHEMA_ERR_DETAIL_CONSTRAINT_CONFLICT,schemaProp,'min','max');}if(constraint.minLength!=null&&constraint.maxLength!=null&&constraint.minLength>constraint.maxLength){ // minLength > maxLength
pushErrorReason(SCHEMA_ERR_DETAIL_CONSTRAINT_CONFLICT,schemaProp,'minLength','maxLength');}}; /**
			 * enumValueのチェック
			 * <ul>
			 * <li>typeがenumであること
			 * <li>正しい配列が指定されていること
			 * </ul>
			 *
			 * @param constraint
			 * @param typeObj
			 */var checkEnumValue=function checkEnumValue(enumValue,typeObj){if(enumValue==null){return;}if(typeObj.elmType!=='enum'){ // type指定がenumでないならエラー
pushErrorReason(SCHEMA_ERR_DETAIL_ENUMVALUE_TYPE,schemaProp);}if(!isArray(enumValue)||enumValue.length===0||$.inArray(null,enumValue)>-1||$.inArray(undefined,enumValue)>-1){ // 配列でない、または空配列、null,undefinedを含む配列ならエラー
pushErrorReason(SCHEMA_ERR_DETAIL_INVALID_ENUMVALUE,schemaProp);}}; /**
			 * defaultValueのチェック
			 * <ul>
			 * <li>id:trueの項目ではないこと
			 * </ul>
			 * <p>
			 * defaultValueの中身は見ない。typeやconstraintの条件を満たしているかのチェックはここでは行わない。
			 * また、depend指定されている項目にdefaultValueが指定されている場合はdependのチェック時にエラーにしている。
			 * </p>
			 */var checkDefaultValue=function checkDefaultValue(propObj){if(isId&&propObj.hasOwnProperty('defaultValue')){ // id項目にdefaultValueが設定されていたらエラー
pushErrorReason(SCHEMA_ERR_DETAIL_DEFAULTVALUE_ID,schemaProp);}}; // schemaのそれぞれのプロパティをチェックする
if(isDataModelSchema){ // id指定されている属性が一つだけであることをチェック
var hasId=false;for(var p in schema){if(schema[p]&&schema[p].id===true){if(hasId){pushErrorReason(SCHEMA_ERR_DETAIL_DUPLICATED_ID);}hasId=true;}}if(!hasId){pushErrorReason(SCHEMA_ERR_DETAIL_NO_ID);}} // 循環参照チェックのため、depend指定されているプロパティが出てきたら覚えておく
// key: プロパティ名, value: そのプロパティのdepend.onをwrapInArrayしたもの
var dependencyMap={};for(var schemaProp in schema){ // null(またはundefined)がプロパティオブジェクトに指定されていたら、空オブジェクトと同等に扱い、エラーにしない。
var propObj=schema[schemaProp]==null?{}:schema[schemaProp]; // idの時は特別にチェック(idにはdependが指定できない、typeが指定できない等)する項目があるのでそのフラグを立てる。
// ObservableItemの時はidは関係ないのでfalse
var isId=isDataModelSchema&&!!propObj.id; // プロパティ名が適切なものかどうかチェック
if(!isValidNamespaceIdentifier(schemaProp)){pushErrorReason(SCHEMA_ERR_DETAIL_INVALID_PROPERTY_NAME,schemaProp);} // dependのチェック
checkDepend(propObj.depend); // typeのチェック
checkType(propObj.type); // typeObjの作成
var typeObj={}; // id項目で、typeが指定されていない場合は、type:stringにしてチェックする
var type=isId&&type==null?'string':propObj.type;if(isString(type)){typeObj=getTypeObjFromString(type);} // constraintのチェック
checkConstraint(propObj.constraint,typeObj); // enumValueのチェック
checkEnumValue(propObj.enumValue,typeObj); // defaultValueのチェック
checkDefaultValue(propObj);} // depend.onの循環参照チェック
// onに指定されているプロパティの定義が正しいかどうかのチェックが終わっているここでチェックする
// （循環参照チェック以前の、プロパティがあるのか、dependがあるならonがあるか、などのチェックをしなくて済むようにするため）
// （これ以前のチェックに引っかかっていたら、循環参照のチェックはしない）
for(var prop in dependencyMap){if(checkDependCircularRef(prop,dependencyMap)){pushErrorReason(SCHEMA_ERR_DETAIL_DEPEND_CIRCULAR_REF,prop);}}}catch(e){throwFwError(ERR_CODE_INVALID_SCHEMA,null,errorReason);}return true;} /**
	 * checkFuncsの条件をdefaultValueが満たすかどうかチェックする
	 *
	 * @private
	 * @param {Object} descriptor descriptor
	 * @param {Object} checkFuncs 各プロパティをキーに、チェックする関数を持つオブジェ���ト
	 * @param {Boolean} stopOnError defaultValueがチェック関数を満たさない時に、エラーを投げてチェックを中断するかどうか
	 * @returns {Boolean} チェック結果。
	 */function validateDefaultValue(schema,checkFuncs,stopOnError){var errorReason=[];try{for(var p in schema){var propObj=schema[p];if(!propObj||!propObj.hasOwnProperty('defaultValue')&&propObj.type&&(propObj.type==='array'||getTypeObjFromString(propObj.type).dimension)){ // defaultValueが指定されていないかつ、type指定が配列指定であれば、
// 初期値は空のOvservableArrayになる。
// 空のOvservableArrayがチェックに引っかかることはないので、チェック関数でチェックしない。
continue;} // defaultValueが指定されていない場合は、ここではチェックしない
if(!propObj.hasOwnProperty('defaultValue')){continue;}var defaultValue=propObj.defaultValue;if(checkFuncs[p](defaultValue).length){pushErrorReason(SCHEMA_ERR_DETAIL_INVALIDATE_DEFAULTVALUE,p,defaultValue);}}return true;}catch(e){throwFwError(ERR_CODE_INVALID_SCHEMA,null,errorReason);}} /**
	 * スキーマのプロパティオブジェクトから、そのプロパティに入る値かどうかをチェックする関数を作る。 # schema:{val:xxxx,val2:....}
	 * のxxxxの部分と、マネージャを引数にとる スキーマのチェックが通ってから呼ばれる前提なので、エラーチェックは行わない。
	 *
	 * @private
	 * @param {Object} propertyObject スキーマのプロパティオブジェクト
	 * @param {Boolean} isDataModel データモデルのチェック関数を作成するかどうか。trueならidチェックを行う。
	 * @param {Object} [manager] そのスキーマを持つモデルが属するマネージャのインスタンス。データモデルのチェックに必要(要らないなら省略可能)
	 * @returns {function} 指定されたスキーマのプロパティに、引数の値が入るかどうかをチェックする関数
	 */function createCheckValueBySchemaPropertyObj(propertyObject,isDataModel,manager){ // schema{prop:null} のように指定されている場合はpropObjはnullなので、空オブジェクト指定と同等に扱うようにする
var propObj=propertyObject||{};var checkFuncArray=[];var elmType=null;var dimension=0;var type=propObj.type;var constraint=propObj.constraint||{}; // id:true の場合 type指定がない場合はtype:string,
// notNull(type:stringならnotEmpty)をtrueにする(データモデルの場合のみ)
if(isDataModel&&propObj.id){type=type||'string';constraint.notNull=true;if(type==='string'){constraint.notEmpty=true;}}if(type){ // typeに指定された文字列をパースしてオブジェクトに変換
var typeObj=getTypeObjFromString(type);elmType=typeObj.elmType; // 配列の次元(0か1のみ)。配列でないなら0
dimension=typeObj.dimension; // type指定を元に値を(配列は考慮せずに)チェックする関数を作成してcheckFuncArrayに追加
checkFuncArray.push(createTypeCheckFunction(elmType,{manager:manager,enumValue:propObj.enumValue}));} // constraintを値が満たすかどうかチェックする関数を作成してcheckFuncArrayに追加
if(constraint){checkFuncArray.push(createConstraintCheckFunction(constraint));}return createCheckValueByCheckObj({checkFuncs:checkFuncArray,dimension:dimension});} /**
	 * descriptorからschemaの各プロパティの値をチェックする関数を作成して返す
	 *
	 * @private
	 * @param {Object} schema スキーマオブジェクト
	 * @param {Booelan} isDataModel データモデルのチェック関数を作るかどうか。trueならidのチェックもする。
	 * @param {Object} manager データモデルマネージャ
	 */function createValueCheckFuncsBySchema(schema,isDataModel,manager){var checkFuncs={};for(var p in schema){checkFuncs[p]=createCheckValueBySchemaPropertyObj(schema[p],isDataModel,manager);}return checkFuncs;} /**
	 * constraintオブジェクトから、値がそのconstraintの条件を満たすかどうか判定する関数を作成する
	 *
	 * @private
	 * @param {Object} constraint constraintオブジェクト
	 * @returns {function} 値がconstraintを満たすかどうかチェックする関数。正しい場合は空配列、そうじゃない場合は引っかかった項目を返す
	 */function createConstraintCheckFunction(constraint){return function(v){var errObjs=[];if(constraint.notNull&&v==null){errObjs.push({notNull:constraint.notNull});}if(constraint.notEmpty&&!v){errObjs.push({notEmpty:constraint.notEmpty});}if(v==null){ // notNull,notEmptyのチェック以外は、nullでないものについてチェックを行うので、nullならtrueを返す
return errObjs;}if(constraint.min!=null&&v<constraint.min){errObjs.push({min:constraint.min});}if(constraint.max!=null&&constraint.max<v){errObjs.push({max:constraint.max});}if(constraint.minLength!=null&&v.length<constraint.minLength){errObjs.push({minLength:constraint.minLength});}if(constraint.maxLength!=null&&constraint.maxLength<v.length){errObjs.push({maxLength:constraint.maxLength});}if(constraint.pattern!=null&&!v.match(constraint.pattern)){errObjs.push({pattern:constraint.pattern});}return errObjs;};} /**
	 * type指定された文字列(から"[]"を除いた文字列)、引数がそのtypeを満たすかどうか判定する関数を作成する
	 *
	 * @private
	 * @param {string} elmType type指定文字列
	 * @param {Object} [opt] type判定に使用するためのオプション
	 * @param {Object} [opt.manager]
	 *            DataManagerオブジェクト。"@DataModel"のようにデータモデルを指定された場合、managerからデータモデルを探す
	 * @param {array} [opt.enumValue] typeが"enum"の場合、enumValueに入っているかどうかで判定する
	 * @returns {function} 引数がそのtypeを満たすかどうか判定する関数。満たすなら空配列、満たさないならエラーオブジェクトの入った配列を返す。
	 */function createTypeCheckFunction(elmType,opt){var errObjs=[{type:elmType}];switch(elmType){case 'number':return function(v,isStrict){if(isNumberValue(v,isStrict)){return [];}return errObjs;};case 'integer':return function(v,isStrict){if(isIntegerValue(v,isStrict)){return [];}return errObjs;};case 'string':return function(v,isStrict){if(isStringValue(v,isStrict)){return [];}return errObjs;};case 'boolean':return function(v,isStrict){if(isBooleanValue(v,isStrict)){return [];}return errObjs;};case 'enum':return function(v){if(isEnumValue(v,opt.enumValue)){return [];}return errObjs;};case 'any': // anyならタイプチェックは行わない
return function(){return [];};} // タイプチェックは終わっているはずなので、どのケースにも引っかからない場合はデータモデルかつ、そのデータモデルはマネージャに存在する
var matched=elmType.match(/^@(.+?)$/);var dataModelName=matched[1];var manager=opt.manager;return function(v){var dataModel=manager.models[dataModelName];if(!dataModel){ // チェック時点でモデルがマネージャからドロップされている場合はfalse
return errObjs;}if((typeof v==='undefined'?'undefined':_typeof(v))!=='object'&&v!=null){ // オブジェクト(またはnull,undefined)でないならfalse
return errObjs;} // チェック時にそのモデルが持ってるアイテムかどうかで判定する
// nullはOK
if(v==null||dataModel.has(v)){return [];}return errObjs;};} /**
	 * チェック関数と、配列の次元を持つオブジェクトを引数にとり、値のチェックを行う関数を作成して返す
	 *
	 * @private
	 * @param {Object} checkObj
	 * @param {array} [checkObj.checkFuncs] チェックする関数の配列。配列の先頭の関数から順番にチェックする。指定のない場合は、return
	 *            true;するだけの関数を作成して返す
	 * @param {integer} [checkObj.dimension]
	 *            チェックする値の配列の次元。配列のdimension次���目が全てcheckFuncsを満たすことと、dimension-1次元目まではすべて配列であることを確認する関数を作成して返す。
	 *            0、または指定無しの場合は配列でないことを表す
	 * @returns {Function} 値をチェックする関数を返す。戻り値の関数はエラー理由を返す。length;0ならエラーでない。
	 */function createCheckValueByCheckObj(checkObj){var funcs=checkObj.checkFuncs;if(!funcs||funcs.length===0){return function(){return [];};}var dim=checkObj.dimension||0; /**
		 * 値のチェックを行う関数
		 *
		 * @param {Any} val 値
		 * @param {Boolean} isStrict 型変換可能ならOKにするかどうか
		 */return function checkValue(val,isStrict){var errorReason=[];function _checkValue(v,d){if(!d){ // チェック関数を順番に適用して、falseが返ってきたらチェック終了してfalseを返す
for(var i=0,l=funcs.length;i<l;i++){var result=funcs[i](v,isStrict);if(result.length){errorReason=errorReason.concat(result);return false;}}return true;} // 配列指定なのにセットする値が配列でない場合はfalseを返す
// ただしnullなら空配列同等の扱いをするので、チェックで弾かない
if(v==null){return true;}if(!isArray(v)&&!h5.core.data.isObservableArray(v)){errorReason.push({dimension:dim});return false;}for(var i=0,l=v.length;i<l;i++){ // 配列の各要素について、次元を一つ減らして再帰的にチェックする
if(!_checkValue(v[i],d-1)){return false;}} // 全ての要素についてチェックが通ればtrue
return true;}_checkValue(val,dim);return errorReason;};} //========================================================
//
// バリデーション関係コードここまで
//
//========================================================
/**
	 * ObservableItemまたはDataItemのインスタンスと、初期化プロパティを引数にとり、 アイテムインスタンスの初期化処理を行います。
	 *
	 * @private
	 * @param {DataItem|ObservableItem} item
	 * @param {Object} schema スキーマ
	 * @param {Object} schemaInfo チェック済みスキーマ
	 * @param {Object} userInitialValue 初期値としてsetする値が格納されたオブジェクト
	 */function initItem(item,schema,schemaInfo,userInitialValue){ // アイテムが持つ値を格納するオブジェクト
item._values={}; // nullPropsの設定
/** type:[]なプロパティで、最後にset()された値がnullかどうかを格納する。キー：プロパティ名、値：true/false */item._nullProps={}; // 配列のプロパティを設定
for(var plainProp in schema){if(schema[plainProp]&&isTypeArray(schema[plainProp].type)){ //配列の場合は最初にObservableArrayのインスタンスを入れる
var obsArray=createObservableArray(); //DataItemまたはObsItemに属するObsArrayには、Item自身への参照を入れておく。
//これによりイベントハンドラ内でこのItemを参照することができる
/**
				 * ObservableArrayが所属しているDataItemまたはObservableItemのインスタンス
				 * <p>
				 * ObservableArrayがDataItemまたはObservableItemが持つインスタンスである場合、このプロパティにそのアイテムのインスタンスが格納されています。
				 * </p>
				 *
				 * @name relatedItem
				 * @memberOf ObservableArray
				 * @type {DataItem|ObservableItem}
				 */obsArray.relatedItem=item; // 値のセット
setValue(item,plainProp,obsArray);item._nullProps[plainProp]=true;}}} /**
	 * Itemとプロパティ名を引数にとり、_valuesに格納されている値を返す
	 *
	 * @private
	 * @param {DataItem|ObservableItem} item DataItemまたはObservableItem
	 * @param {String} prop プロパティ名
	 * @returns {Any} Item._values[prop]
	 */function getValue(item,prop){return item._values[prop];} /**
	 * Itemとプロパティ名と値引数にとり、Item._valuesに値を格納する
	 *
	 * @private
	 * @param {DataItem|ObservableItem} item DataItemまたはObservableItem
	 * @param {String} prop プロパティ名
	 * @param {Any} value 値
	 */function setValue(item,prop,value){item._values[prop]=value;} /**
	 * 渡されたタイプ指定文字が配列かどうかを返します
	 *
	 * @private
	 * @param {String} typeStr タイプ指定文字列
	 * @returns {Boolean} タイプ指定文字列が配列指定かどうか
	 */function isTypeArray(typeStr){if(!typeStr){return false;}return typeStr.indexOf('[]')!==-1;} /**
	 * validateDescriptor/Schema/DefaultValueが投げるエラー情報の配列に格納するエラーオブジェクトを作成する
	 *
	 * @private
	 * @param {Integer} code エラーコード
	 * @param {Array} msgParam メッセージパラメータ
	 * @param {Boolean} stopOnError
	 * @returns {Object} エラーオブジェクト
	 */function createItemDescErrorReason() /* var args */{var args=arguments;var code=args[0];var ret={code:code}; /* del begin */args[0]=DESCRIPTOR_VALIDATION_ERROR_MSGS[code];ret.message=h5.u.str.format.apply(null,args); /* del end */ // min版はメッセージがないので格納しない
return ret;} /**
	 * データモデルのitemsChangeイベントオブジェクトを作成する
	 *
	 * @private
	 */function createDataModelItemsChangeEvent(created,recreated,removed,changed){return {type:EVENT_ITEMS_CHANGE,created:created,recreated:recreated,removed:removed,changed:changed};} /**
	 * 依存プロパティの再計算を行います。再計算後の値はitemの各依存プロパティに代入されます。
	 *
	 * @private
	 * @param {DataItem} item データアイテム
	 * @param {Object} event プロパティ変更イベント
	 * @param {String|String[]} changedProps 今回変更されたプロパティ
	 * @param {Boolean} isCreate create時に呼ばれたものかどうか。createなら値の変更を見ずに無条件でcalcを実行する
	 * @returns {Object} { dependProp1: { oldValue, newValue }, ... } という構造のオブジェクト
	 */function calcDependencies(item,event,changedProps,isCreate){ // 今回の変更に依存する、未計算のプロパティ
var targets=[];var schema=getSchema(item);var dependsMap=item._dependencyMap; /**
		 * この依存プロパティが計算可能（依存するすべてのプロパティの再計算が完了している）かどうかを返します。
		 * 依存しているプロパティが依存プロパティでない場合は常にtrue(計算済み)を返します
		 * 依存しているプロパティが依存プロパティが今回の変更されたプロパティに依存していないならtrue(計算済み)を返します
		 */function isReady(dependProp){var deps=wrapInArray(schema[dependProp].depend.on);for(var i=0,len=deps.length;i<len;i++){if($.inArray(deps[i],item._realProperty)===-1&&$.inArray(deps[i],targets)!==-1){ // 依存先が実プロパティでなく、未計算のプロパティであればfalseを返す
return false;}}return true;} /**
		 * changedPropsで指定されたプロパティに依存するプロパティをtargetArrayに追加する
		 */function addDependencies(targetArray,srcProps){for(var i=0,len=srcProps.length;i<len;i++){var depends=dependsMap[srcProps[i]];if(!depends){continue;}for(var j=0,jlen=depends.length;j<jlen;j++){var dprop=depends[j];if($.inArray(dprop,targetArray)===-1){targetArray.push(dprop);}}}}var ret={};if(isCreate){ // createならすべての実プロパティに依存するプロパティを列挙する
// create時にundefinedがセットされた場合、変更なしなのでchangedPropsに入らないが、calcは計算させる
targets=item._dependProps.slice();}else { //今回変更された実プロパティに依存するプロパティを列挙
addDependencies(targets,wrapInArray(changedProps));}while(targets.length!==0){var restTargets=[]; //各依存プロパティについて、計算可能（依存するすべてのプロパティが計算済み）なら計算する
for(var i=0,len=targets.length;i<len;i++){var dp=targets[i];if(isReady(dp)){var newValue=schema[dp].depend.calc.call(item,event); // 型変換を行わない厳密チェックで、戻り値をチェックする
var errReason=item._validateItemValue(dp,newValue,true);if(errReason.length!==0){ // calcの返した値が型・制約違反ならエラー
throwFwError(ERR_CODE_CALC_RETURNED_INVALID_VALUE,[item._model?item._model.name:NOT_AVAILABLE,dp,newValue]);}ret[dp]={oldValue:getValue(item,dp),newValue:newValue}; // calcの結果をセット
if(schema[dp]&&isTypeArray(schema[dp].type)){ //配列の場合は値のコピーを行う。ただし、コピー元がnullの場合があり得る(type:[]はnullable)
//その場合は空配列をコピー
// item._nullPropsにnullかどうかを保持する
if(newValue){getValue(item,dp).copyFrom(newValue); // newValueがnullでないならregardAsNull()がtrueを返すようにする
item._nullProps[dp]=false;}else {getValue(item,dp).copyFrom([]); // newValueがnullまたはundefinedならregardAsNull()がtrueを返すようにする
item._nullProps[dp]=true;}}else {setValue(item,dp,newValue);}}else {restTargets.push(dp);}} //今回計算対象となったプロパティに（再帰的に）依存するプロパティをrestに追加
//restTargetsは「今回計算できなかったプロパティ＋新たに依存関係が発見されたプロパティ」が含まれる
addDependencies(restTargets,targets);targets=restTargets;}return ret;} /**
	 * 渡されたオブジェクトがスキーマを満たすかどうかをチェックする 満たさない場合は例外を投げる。
	 * depend項目のセットはここではエラーにならない。現在の値と厳密等価な値のセットはOKなため、validate時のアイテムの値が分からない限り判定できないため。
	 * depend.calcの計算も行わない。calcの結果がセット時のアイテムの状態によって変わったり、副作用のある関数の可能性もあるため。
	 * そのため、depend項目のスキーマチェックも行われない。
	 *
	 * @private
	 */function validateValueObj(schema,validateItemValue,valueObj,model){for(var prop in valueObj){if(!(prop in schema)){ // schemaに定義されていないプロパティ名が入っていたらエラー
throwFwError(ERR_CODE_CANNOT_SET_NOT_DEFINED_PROPERTY,[model?model.name:NOT_AVAILABLE,prop]);}var newValue=valueObj[prop]; //type:[]で、代入指定無しの場合はvalidationを行わない
if(schema[prop]&&isTypeArray(schema[prop].type)&&!valueObj.hasOwnProperty(prop)){continue;} // modelがある場合はプロパティがidKeyかどうかを調べる
var isId=model&&model._idKey===prop; // 型・制約チェック
// 配列が渡された場合、その配列の要素が制約を満たすかをチェックしている
// idKeyの場合は、isStrictをtrueにしてvalidateItemValueを呼び出す。
// (idの場合はtype:'string'でもnew Strng()で作ったラッパークラスのものは入らない)
var validateResult=validateItemValue(prop,newValue,isId);if(validateResult.length>0){throwFwError(ERR_CODE_INVALID_ITEM_VALUE,[model?model.name:NOT_AVAILABLE,prop],validateResult);}}} /**
	 * アイテムに値をセットする
	 */function itemSetter(item,valueObj,ignoreProps,isCreate){var schema=getSchema(item); // valueObjから整合性チェックに通ったものを整形して格納する配列
var readyProps=[]; //先に、すべてのプロパティの整合性チェックを行う
for(var prop in valueObj){if(ignoreProps&&$.inArray(prop,ignoreProps)!==-1){ //このpropプロパティは無視する
continue;}var oldValue=getValue(item,prop);var newValue=valueObj[prop]; // depend指定されている項目はsetしない
if(schema[prop]&&schema[prop].depend){ // dependなプロパティの場合、現在の値とこれから代入しようとしている値が
// 厳密等価でtrueになる場合に限り、代入を例外にせず無視する。
// これは、item.get()の戻り値のオブジェクトをそのままset()しようとしたときに
// dependのせいでエラーにならないようにするため。
if(oldValue!==newValue){throwFwError(ERR_CODE_DEPEND_PROPERTY,[item._model?item._model.name:NOT_AVAILABLE,prop]);} // 厳密等価な場合は無視
continue;}var type=schema[prop]&&schema[prop].type; // 配列でかつnewValueがnullまたはundefinedなら、空配列が渡された時と同様に扱う。
// エラーにせず、保持しているObsAryインスタンスを空にする。
if(isTypeArray(type)){if(newValue==null){newValue=[];item._nullProps[prop]=true;}else {item._nullProps[prop]=false;}} // typeがstring,number,integer,boolean、またはその配列なら、値がラッパークラスの場合にunboxする
if(type&&type.match(/string|number|integer|boolean/)){newValue=unbox(newValue);} //値がnull以外なら中身の型変換行う
//typeがnumber,integerで、newValueが文字列(もしくは配列)なら型変換を行う
//型のチェックは終わっているので、typeがnumber・integerならnewValueは数値・数値変換可能文字列・null またはそれらを要素に持つ配列のいずれかである
if(newValue!=null&&type&&type.match(/number|integer/)&&typeof newValue!=='number'){if(isArray(newValue)||h5.core.data.isObservableArray(newValue)){for(var i=0,l=newValue.length;i<l;i++){ // スパースな配列の場合、undefinedが入っている可能性があるので、!= で比較
// parseFloatできる値(isNumberValueに渡してtrueになる値)ならparseFloatする
if(newValue[i]!=null&&isNumberValue(newValue[i])){newValue[i]=parseFloat(newValue[i]);}}}else if(newValue!=null){newValue=parseFloat(newValue);}} // 配列なら、配列の中身も変更されていないかチェックする(type:anyならチェックしない)
// type:[]の場合、oldValueは必ずObsArrayまたはundefined。
// newValue,oldValueともに配列(oldValueの場合はObsArray)かつ、長さが同じ場合にのみチェックする
if(isTypeArray(type)&&oldValue&&oldValue.equals(newValue)){continue;} // 値の型変更を行った後に、値が変更されていないかチェックする。(NaN -> NaN も変更無し扱い)
if(oldValue===newValue||isStrictNaN(oldValue)&&isStrictNaN(newValue)){ //同じ値がセットされた場合は何もしない
continue;} // ObservableArrayの場合、oldValueはスナップしたただの配列にする
// ただし、typeが未指定またはanyにObservableArrayが入っていた場合はそのまま
if(type&&type.indexOf('[]')!==-1&&h5.core.data.isObservableArray(oldValue)){ //TODO sliceを何度もしないようにする
oldValue=oldValue.toArray();} //ここでpushしたプロパティのみ、後段で値をセットする
readyProps.push({p:prop,o:oldValue,n:newValue});} //更新する値のない場合は何も返さないで終了
if(!readyProps.length){return;}var changedProps={};var changedPropNameArray=[]; //値の変更が起こる全てのプロパティについて整合性チェックが通ったら、実際に値を代入する
for(var i=0,len=readyProps.length;i<len;i++){var readyProp=readyProps[i]; //TODO 判定文改良
if(schema[readyProp.p]&&isTypeArray(schema[readyProp.p].type)){ //配列の場合は値のコピーを行う。ただし、コピー元がnullの場合があり得る（create()でdefaultValueがnull）ので
//その場合はコピーしない
if(readyProp.n){getValue(item,readyProp.p).copyFrom(readyProp.n);}}else { //新しい値を代入
setValue(item,readyProp.p,readyProp.n);} //newValueは現在Itemが保持している値（type:[]の場合は常に同じObsArrayインスタンス）
changedProps[readyProp.p]={oldValue:readyProp.o,newValue:item.get(readyProp.p)};changedPropNameArray.push(readyProp.p);} //最初にアイテムを生成した時だけ、depend.calcに渡すイベントのtypeはcreateにする
var eventType=isCreate===true?'create':'change'; //今回変更されたプロパティと依存プロパティを含めてイベント送出
var event={type:eventType,target:item,props:changedProps}; // 依存プロパ���ィを再計算し、変更があったらchangeイベントに含める
$.extend(changedProps,calcDependencies(item,event,changedPropNameArray,isCreate));return event;} /**
	 * 当該モデルに対応するアップデートログ保持オブジェクトを取得する。 オブジェクトがない場合は生成する。
	 */function getModelUpdateLogObj(model){var manager=model._manager;var modelName=model.name;if(!manager._updateLogs){manager._updateLogs={};}if(!manager._updateLogs[modelName]){manager._updateLogs[modelName]={};}return manager._updateLogs[modelName];} /**
	 * 当該モデルが属しているマネージャにUpdateLogを追加する
	 */function addUpdateLog(model,type,items){if(!model._manager){return;}var modelLogs=getModelUpdateLogObj(model);for(var i=0,len=items.length;i<len;i++){var item=items[i];var itemId=item._values[model._idKey];if(!modelLogs[itemId]){modelLogs[itemId]=[];}modelLogs[itemId].push({type:type,item:item});}} /**
	 * 当該モデルが属しているマネージャにUpdateChangeLogを追加する
	 */function addUpdateChangeLog(model,ev){if(!model._manager){return;}var modelLogs=getModelUpdateLogObj(model);var itemId=ev.target._values[model._idKey];if(!modelLogs[itemId]){modelLogs[itemId]=[];}modelLogs[itemId].push({type:UPDATE_LOG_TYPE_CHANGE,ev:ev});} /**
	 * ObsArrayのスナップショットをmanager._oldValueLogsに保存しておく アップデートセッション中に複数回変更しても、保存しておくoldValueは1つでいいので、
	 * すでに保存済みなら配列のsliceはしない。
	 */function addObsArrayOldValue(model,item,prop){if(!model._manager){return;}var modelLogs=getModelOldValueLogObj(model);var itemId=item._values[model._idKey];if(!modelLogs[itemId]){modelLogs[itemId]={};}if(!modelLogs[itemId][prop]){modelLogs[itemId][prop]=getValue(item,prop).toArray();return;} // すでに存在していれば、oldValue保存済みなので、何もしない
return;} /**
	 * 当該モデルに対応するアップデートログ保持オブジェクトを取得する。 オブジェクトがない場合は生成する。
	 */function getModelOldValueLogObj(model){var manager=model._manager;var modelName=model.name;if(!manager._oldValueLogs){manager._oldValueLogs={};}if(!manager._oldValueLogs[modelName]){manager._oldValueLogs[modelName]={};}return manager._oldValueLogs[modelName];} /**
	 * schemaからdepend項目の依存関係を表すマップを作成する
	 *
	 * @private
	 * @param schema
	 * @returns {Object}
	 */function createDependencyMap(schema){ //{ 依存元: [依存先] }という構造のマップ。依存先プロパティは配列内で重複はしない。
var dependencyMap={};for(var prop in schema){if(schema.hasOwnProperty(prop)){var dependency=schema[prop]?schema[prop].depend:null;if(dependency){var dependOn=wrapInArray(dependency.on);for(var i=0,len=dependOn.length;i<len;i++){var dependSrcPropName=dependOn[i];if(!dependencyMap[dependSrcPropName]){dependencyMap[dependSrcPropName]=[];}if($.inArray(prop,dependencyMap[dependSrcPropName])===-1){dependencyMap[dependSrcPropName].push(prop);}}}}}return dependencyMap;} /**
	 * 第一引数に指定された名前のデータモデルマネージャを作成します。
	 * <p>
	 * 第2引数が渡された場合、その名前空間に<a href="DataModelManager.html">DataModelManager</a>インスタンスを公開します。
	 * </p>
	 *
	 * @since 1.1.0
	 * @memberOf h5.core.data
	 * @param {String} name マネージャ名
	 * @param {String} [namespace] 公開先名前空間
	 * @returns {DataModelManager} データモデルマネージャ
	 */function createManager(managerName,namespace){if(!isValidNamespaceIdentifier(managerName)){throwFwError(ERR_CODE_INVALID_MANAGER_NAME);} //データモデルマネージャインスタンスを生成
var manager=new DataModelManager(managerName); //第2引数が省略される場合もあるので、厳密等価でなく通常の等価比較を行う
if(namespace!=null){ //指定された名前空間に、managerNameでマネージャを公開する
// 空文字指定ならグローバルに公開する
if(namespace===''){namespace='window';}var o={};o[managerName]=manager;h5.u.obj.expose(namespace,o);}return manager;} /**
	 * モデルを作成する。descriptorは配列で指定可能。
	 * <p>
	 * thisはデータモデルマネージャから呼ばれた場合はそのデータモデルマネージャ。
	 * </p>
	 *
	 * @param {Object|Object[]} descriptor ディスクリプタまたはディスクリプタの配列
	 * @returns {DataModel|DataModel[]}
	 */function createModel(descriptor){ // descriptorがオブジェクトまたは配列じゃなかったらエラー
if(!descriptor||(typeof descriptor==='undefined'?'undefined':_typeof(descriptor))!=='object'){throwFwError(ERR_CODE_INVALID_DESCRIPTOR,null,[createItemDescErrorReason(DESC_ERR_DETAIL_NOT_OBJECT)]);}if(!isArray(descriptor)){ // 既に同名のモデルが登録済みならそれを返す。
if(this.models[descriptor.name]){fwLogger.info(MSG_ERROR_DUP_REGISTER,this.name,descriptor.name);return this.models[descriptor.name];} //createItemProtoは初めにDescriptorの検証を行う。
//検証エラーがある場合は例外を送出する。
//エラーがない場合はデータモデルを返す（登録済みの場合は、すでにマネージャが持っているインスタンスを返す）。
return _createModel(descriptor,this);} // descriptorが配列なら、中身を展開して登録。
// 依存関係順に登録する必要がある。
// 登録したデータモデルを配列に格納して返す。
var l=descriptor.length;if(!l){ //空配列ならエラー
throwFwError(ERR_CODE_INVALID_DESCRIPTOR,null,[createItemDescErrorReason(DESC_ERR_DETAIL_NOT_OBJECT)]);}var dependMap={};var namesInDescriptors=[]; // 依存関係のチェック
// 要素がオブジェクトであり、name、schemaプロパティを持っていない場合はcatch節で、ディスクリプタのエラーを投げる
for(var i=0;i<l;i++){ // 既に同名のモデルがあるかどうかチェックし、それらは新規登録しない
var name=descriptor[i].name;if(this.models[name]){fwLogger.info(MSG_ERROR_DUP_REGISTER,this.name,descriptor.name);retObj[i]=manager.models[descriptor.name];continue;}try{namesInDescriptors.push(name);var depends=[];if(descriptor[i].base){depends.push(descriptor[i].base.substring(1));}for(var p in descriptor[i].schema){var propObj=descriptor[i].schema[p];if(!propObj){continue;}var type=propObj.type;if(type&&type.substring(0,1)==='@'){type=type.indexOf('[]')===-1?type.substring(1):type.substring(1,type.length-2);depends.push(type);}}dependMap[i]={depends:depends};}catch(e){ //descriptorがオブジェクトでない、またはnameとschemaが設定されていない。またはname,baseが文字列でない、schemaがオブジェクトでない
throwFwError(ERR_CODE_INVALID_DESCRIPTOR);}} // dependMapを元に、循環参照チェック
var retObj={size:0};while(retObj.size<l){ // 見つからなかったモデルを覚えておく
// 循環参照のエラーなのか、単に存在しないモデル名指定によるエラーなのかを区別するため
var noExistModels={}; // このwhileループ内で1つでも登録されたか
var registed=false; // descriptorでループさせて、依存関係が解決された居たらデータモデルを登録
for(var i=0;i<l;i++){if(!dependMap[i].registed){var depends=dependMap[i].depends;for(var j=0,len=depends.length;j<len;j++){if(!this.models[depends[j]]){noExistModels[depends[j]]=true;break;}}if(j===len){ // 依存しているものはすべて登録済みなら登録
retObj[i]=_createModel(descriptor[i],this);retObj.size++;registed=true;dependMap[i].registed=true;}}}if(!registed){ // whileループの中で一つも登録されなかった場合は、存在しないデータモデル名を依存指定、または循環参照
// 存在しなかったデータモデル名が全てディスクリプタに渡されたモデル名のいずれかだったら、それは循環参照���ラー
var isCircular=true;for(var modelName in noExistModels){if($.inArray(modelName,namesInDescriptors)===-1){isCircular=false;break;}}if(isCircular){ // 循環参照エラー
throwFwError(ERR_CODE_DESCRIPTOR_CIRCULAR_REF);}throwFwError(ERR_CODE_INVALID_DESCRIPTOR,null,[createItemDescErrorReason(DESC_ERR_DETAIL_NO_EXIST_BASE,modelName)]);}}var retAry=[];for(var i=0;i<l;i++){retAry.push(retObj[i]);}return retAry;} /**
	 * モデルを作成する。
	 * <p>
	 * thisはデータモデルマネージャから呼ばれた場合はそのデータモデルマネージャ。
	 * </p>
	 */function _createModel(desc,manager){validateDescriptor(desc,manager,true);var schema=extendSchema(desc,manager);validateSchema(schema,true,manager,true);var itemValueCheckFuncs=createValueCheckFuncsBySchema(schema,true,manager);validateDefaultValue(schema,itemValueCheckFuncs,true);return new DataModel(schema,desc,itemValueCheckFuncs,manager);} /**
	 * ObsItem,DataItemの生成に必要なスキーマ情報のキャッシュデータを作成します。
	 *
	 * @param {Object} schema validate済みでかつ継承先の項目も拡張済みのスキーマ
	 * @param {Object} itemValueCheckFuncs プロパティの値をチェックする関数を持つオブジェクト
	 * @returns {Object} ObsItem,DataItemの生成に必要なスキーマのキャッシュデータ
	 */function createSchemaInfoCache(schema,itemValueCheckFuncs){ // 実プロパティ・依存プロパティ・配列プロパティを列挙
var realProps=[];var dependProps=[];var aryProps=[];for(var p in schema){if(schema[p]&&schema[p].depend){dependProps.push(p);}else {realProps.push(p);}if(schema[p]&&schema[p].type&&schema[p].type.indexOf('[]')!==-1){aryProps.push(p);}} // 依存プロパティのマップ
var dependencyMap=createDependencyMap(schema);function validateItemValue(p,value,isStrict){return itemValueCheckFuncs[p](value,isStrict);}var defaultInitialValue={};for(var plainProp in schema){var propDesc=schema[plainProp];if(propDesc&&propDesc.depend){ //依存プロパティにはデフォルト値はない（最後にrefresh()で計算される）
continue;}var initValue=null;if(propDesc&&propDesc.defaultValue!==undefined){ //DescriptorのdefaultValueがあれば代入
initValue=propDesc.defaultValue;}else { //どちらでもない場合はnull
initValue=null;}defaultInitialValue[plainProp]=initValue;}function createInitialValueObj(userInitialValue){if(!userInitialValue){return $.extend({},defaultInitialValue);} // 単に$.extend({}, defaultInitialValue, userInitialValue)だとundefinedの値で上書きできないので、
// for文でuserInitialValueに指定されたものを代入する
var actualInitialValue=$.extend({},defaultInitialValue);for(var p in userInitialValue){actualInitialValue[p]=userInitialValue[p];}return actualInitialValue;}var ret={_realProps:realProps,_dependProps:dependProps,_aryProps:aryProps,_dependencyMap:dependencyMap,_createInitialValueObj:createInitialValueObj, /**
			 * 引数にプロパティ名と値を指定し、値がそのプロパティの制約条件を満たすかどうかをチェックします。
			 *
			 * @private
			 * @memberOf DataItem
			 * @param {String} prop プロパティ名
			 * @param {Any} value 値
			 * @returns {Boolean} 値がプロパティの制約条件を満たすならtrue
			 */_validateItemValue:validateItemValue};return ret;} /**
	 * データモデルにおけるスキーマの継承関係を展開してマージしたスキーマを返します。
	 * <p>
	 * 同じ名前のプロパティは「後勝ち」です。継承関係を構築できるのは同一のデータマネージャに属するデータモデル間のみです。
	 * </p>
	 *
	 * @param {Object} desc データモデルの場合はデスクリプタ。
	 * @param {Object} manager データモデルマネージャ。
	 * @returns {Object} 生成したスキーマオブジェクト。
	 */function extendSchema(desc,manager){var base=desc.base;var baseSchema;if(base){ // base指定がある場合はそのモデルを取得
var baseModel=manager.models[base.slice(1)]; // base指定されたモデルのschemaを取得
baseSchema=baseModel.schema;}else { //baseが指定されていない場合は"親"は存在しない＝プロパティを持たない
baseSchema={};} // baseSchemaとschemaをschema優先でマージした結果をschemaに格納する。baseSchemaは上書きしない。
return $.extend({},baseSchema,desc.schema);} /**
	 * DataItem、ObservableItemのが持つObservableArrayのプロパティに対して、リスナを登録します
	 *
	 * @private
	 * @param {DataItem|ObservableItem} item
	 * @param {String} propName プロパティ名
	 * @param {ObservableArray} リスナ登録をするObservableArray
	 * @param {DataModel} [model] モデル(DataItemの場合)
	 */function setObservableArrayListeners(item,propName,observableArray,model){ // 配列操作前と操作後で使う共通の変数
// 配列操作が同期のため、必ずchangeBeforeListener→配列操作→changeListenerになるので、ここのクロージャ変数を両関数で共通して使用できる
// アップデートセッション中かどうか
var isAlreadyInUpdate=false; // 破壊的メソッドだが、追加しないメソッド。validateする必要がない。
var noAddMethods=['sort','reverse','pop','shift']; // changeBefore時に配列の変更前の値を覚えておく
var oldValue=null;function changeBeforeListener(event){ // データモデルの場合、itemがmodelに属していない又は、itemが属しているmodelがmanagerに属していないならエラー
if(model&&(item._isRemoved||!model._manager)){throwFwError(ERR_CODE_CANNOT_CHANGE_REMOVED_ITEM,[item._values[model._idKey],event.method]);}var args=h5.u.obj.argsToArray(event.args);if($.inArray(event.method,noAddMethods)===-1){var isValidateRequired=true; // チェックするメソッドは unshift, push, splice, copyFrom, set
// そのうち、メソッドの引数をそのままチェックすればいいのはunshift, push
switch(event.method){case 'splice':if(args.length<=2){ // spliceに引数が2つなら要素追加はないので、validateチェックはしない
isValidateRequired=false;}isValidateRequired=false; // spliceの場合追加要素は第3引数以降のため2回shiftする
args.shift();args.shift();break;case 'copyFrom': // copyFromの場合は引数が配列であるため、外側の配列を外す
args=args[0];break;case 'set': // setの場合は第1引数はindexなので、shift()したものをチェックする
args.shift();}if(isValidateRequired){var validateResult=item._validateItemValue(propName,args);if(validateResult.length>0){throwFwError(ERR_CODE_INVALID_ITEM_VALUE,propName,validateResult);}}} // データアイテムの場合はイベント管理
if(model){ // oldValueが登録されていなければ登録
addObsArrayOldValue(model,item,propName); // 配列操作前にbeginUpdateして、配列操作後にendUpdateする
isAlreadyInUpdate=model._manager?model._manager.isInUpdate():false;if(!isAlreadyInUpdate){model._manager.beginUpdate();}}else { //oldValueを保存
oldValue=item._values[propName].toArray();}}function changeListener(event){ // Itemのset内で呼ばれた、または、method===null(endUpdate時にdispatchEventで呼ばれた場合)なら何もしない
if(item._isInSet||event.method===null){return;} // 配列の要素が全て同じかどうかのチェックはendUpdateのなかでやる
// changeイベントオブジェクトの作成
var ev={type:'change',target:item,props:{}}; // newValueは現在の値、oldValueはmanager._oldValueLogsの中なので、ここでpropsを入れる必要ない
ev.props[propName]={}; // データアイテムの場合はモデルにイベントを伝播
if(model){ // アップデートログを追加
addUpdateChangeLog(model,ev);if(!isAlreadyInUpdate){ // アップデートセッション中じゃなければすぐにendUpdate()
// _isArrayPropChangeSilentlyRequestedをtrueにして、endUpdate()時にdispatchされないようにする
model._manager._isArrayPropChangeSilentlyRequested=true;model._manager.endUpdate(); // endUpdateが終わったらフラグを元に戻す
model._manager._isArrayPropChangeSilentlyRequested=false;}else { // アップデートセッション中であればendUpdate()が呼ばれたときに、endUpdate()がchangeを発火させるので、
// ObservableArrayのchangeをここでストップする。
// DataItemが持つtype:arrayのプロパティのObservableArrayはDataItem作成時に生成しており、
// このchangeListenerがそのObservableArrayの一番最初に登録されたハンドラになります。
// ハンドラは登録された順番に実行されるため、ここでstopImmediatePropagation()することで
// 登録されたすべてのハンドラの実行をストップすることができます。
event.stopImmediatePropagation();}}else { // ObservableItemの場合は、配列の値が変更されていたら即イベント発火する
// 配列の値が変化していないなら何もしない
if(observableArray.equals(oldValue)){return;} // ObservableItemの場合は即発火
ev.props[propName]={oldValue:oldValue,newValue:getValue(item,propName)};item.dispatchEvent(ev);}}observableArray.addEventListener('changeBefore',changeBeforeListener);observableArray.addEventListener('change',changeListener);} // =========================================================================
//
// Body
//
// =========================================================================
//--------------------------------------------
// DataModelManager
//--------------------------------------------
/**
	 * データモデルマネージャ
	 * <p>
	 * データモデルを管理するデータモデルマネージャクラスです。このインスタンスは<a
	 * href="h5.core.data.html#createManager">h5.core.data.createManager()</a>で作成します。
	 * </p>
	 * <p>
	 * このクラスは<a href="EventDispatcher.html">EventDispatcher</a>のメソッドを持ちます。イベント関連のメソッドについては<a
	 * href="EventDispatcher.html">EventDispatcherミックスイン</a>を参照してください。<br>
	 * データモデルマネージャは、データモデルマネージャが管理するデータモデルに変更があった場合に'itemsChange'イベントが発火します。
	 * </p>
	 *
	 * @since 1.1.0
	 * @class
	 * @mixes EventDispatcher
	 * @name DataModelManager
	 */function DataModelManager(managerName){if(!isValidNamespaceIdentifier(managerName)){throwFwError(ERR_CODE_INVALID_MANAGER_NAME);} /**
		 * このデータモデルマネージャが管理するDataModelインスタンス。
		 * <p>
		 * <a href="#createModel">createModel()</a>で作成したモデルは、データモデルマネージャの管理下に置かれ、modelsから参照できます。
		 * </p>
		 * <p>
		 * {モデル名: データモデルインスタンス, ...} の構造を持つオブジェクトです。
		 * </p>
		 *
		 * @since 1.1.0
		 * @name models
		 * @type {Object}
		 * @memberOf DataModelManager
		 */this.models={}; /**
		 * データモデルマネージャ名
		 * <p>
		 * <a href="h5.core.data.html#createManager">h5.core.data.createManager()</a>の第一引数に指定した値が格納されます。
		 * </p>
		 *
		 * @since 1.1.0
		 * @name name
		 * @type {String}
		 * @memberOf DataModelManager
		 */this.name=managerName; /**
		 * アップデートログ
		 * <p>
		 * マネージャの管理下にあるデータモデル、アイテムのイベントをストアしておくためのオブジェクトです。内部で使用します。
		 * </p>
		 *
		 * @private
		 * @since 1.1.0
		 * @name _updateLogs
		 * @type {Object}
		 * @memberOf DataModelManager
		 */this._updateLogs=null; /**
		 * endUpdate時に配列プロパティについてイベントをあげないかどうか。
		 * <p>
		 * デフォルトではfalseで、endUpdate時にイベントをあげます。 <br>
		 * DataItem作成時にFW内部で登録したchangeListenerからendUpdateを呼ぶ場合にこのフラグはtrueになり、<br>
		 * endUpdate時に配列プロパティのイベントは上がりません。<br>
		 * </p>
		 *
		 * @private
		 * @name _isArrayPropChangeSilentlyRequested
		 * @type {Boolean}
		 * @memberOf DataModelManager
		 */this._isArrayPropChangeSilentlyRequested=false;} // MixinでEventDispatcherをで継承
h5.mixin.eventDispatcher.mix(DataModelManager.prototype);$.extend(DataModelManager.prototype,{ /**
		 * データモデルを作成します。
		 * <p>
		 * 引数にはデータモデルディスクリプタを渡します。
		 * </p>
		 *
		 * @since 1.1.0
		 * @function
		 * @param {Object|Object[]} descriptor データモデルディスクリプタまたはその配列
		 * @param {String} descriptor.name データモデル名。必須。
		 * @param {String} descriptor.base
		 *            マネージャに属する別のデータモデルのschemaを継承する場合に指定します。『'@'+継承先データモデル名』で指定してください。
		 * @param {Object} descriptor.schema スキーマを定義したオブジェクトを指定します。必須。
		 * @memberOf DataModelManager
		 * @returns {DataModel|DataModel[]} データモデルを返します。ディスクリプタが配列で渡された場合はそれぞれについてのデータモデルを配列で返します。
		 */createModel:createModel, /**
		 * 指定されたデータモデルを削除します。
		 * <p>
		 * データアイテムを保持している場合、アイテムをこのデータモデルからすべて削除した後 データモデル自体をマネージャから削除します。
		 * </p>
		 *
		 * @since 1.1.0
		 * @param {String|DataModel} nameOrModel データモデル名またはデータモデルインスタンス
		 * @memberOf DataModelManager
		 */dropModel:function dropModel(nameOrModel){ //TODO dropModelするときに依存していたらどうするか？
//エラーにしてしまうか。
var name=isString(nameOrModel)?nameOrModel:(typeof nameOrModel==='undefined'?'undefined':_typeof(nameOrModel))==='object'?nameOrModel.name:null;if(!name||!this.models[name]){return;}var model=this.models[name];model._manager=null;delete this.models[name];return model;}, /**
		 * アップデートセッション中かどうかを返します。
		 * <p>
		 * beginUpdate()が呼ばれてからendUpdate()が呼ばれるまでの間はアップデートセッション中です。
		 * </p>
		 *
		 * @since 1.1.0
		 * @returns {Boolean} アップデートセッション中かどうか
		 * @memberOf DataModelManager
		 */isInUpdate:function isInUpdate(){return this._updateLogs!==null;}, /**
		 * アップデートセッションを開始します。
		 * <p>
		 * beginUpdate()が呼ばれると、アップデートセッションを開始します。<a href="#endUpdate">endUpdate()</a>を呼ぶとアップデートセッションを解除します。
		 * </p>
		 * <p>
		 * 既にアップデートセッション中であれば何もしません。
		 * </p>
		 * <p>
		 * アップデートセッション中は、このDataModelManager、及びこのの管理下にあるDataModel、DataItemのイベントは発火しません。
		 * endUpdate()が呼ばれた時点で、イベントが発火します。
		 * </p>
		 * <p>
		 * アップデートセッション中の変更イベントはすべてマージされてendUpdate()時に発火します。
		 * </p>
		 *
		 * <pre>
		 * 例：
		 * // managerの管理下にあるDataItem
		 * item.set('value', 'a');
		 * item.addEventListener('change', function(e){
		 *     // oldValueとnewValueをalertで表示するイベントリスナ
		 *     alert('oldValue:' + e.prop.value.oldValue + ', newValue:' + e.prop.value.newValue);
		 * });
		 * // アップデートセッション
		 * manager.beginUpdate();
		 * item.set('value', 'b');
		 * item.set('value', 'c');
		 * manager.endUpdate();
		 * // &quot;oldValue: a, newValue: c&quot; とアラートが出る
		 * </pre>
		 *
		 * @since 1.1.0
		 * @memberOf DataModelManager
		 */beginUpdate:function beginUpdate(){if(this.isInUpdate()){return;}this._updateLogs={};}, /**
		 * アップデートセッションを終了します。
		 * <p>
		 * アップデートセッション中でなければ何もしません。イベントの発火など詳細は<a href="#beginUpdate">beginUpdate()</a>の説明を参照してください。
		 * </p>
		 *
		 * @since 1.1.0
		 * @memberOf DataModelManager
		 */endUpdate:function endUpdate(_opt){if(!this.isInUpdate()){return;} // ObsArrayのchangeイベントをこのendUpdate内でdispatchするかどうか。
// 変更があったObsArrayのイベントがbeginUpdateにより制御されていた場合はここでObsArrayのイベントをdispatchする必要がある。
// 変更があったObsArrayのイベントがすでに実行されている場合はここで改めてdispatchする必要はい。
// マネージャの_isArrayPropChangeSilentlyRequestedがtrueの場合は後者なので、ObsArrayのchangeイベントは上げない。
var dispatchObsAryChange=!this._isArrayPropChangeSilentlyRequested;var updateLogs=this._updateLogs;var oldValueLogs=this._oldValueLogs; //_updateLog, _oldValueLogsをまず削除する。イベントハンドラ内で、値を変更された時に_updateLogをきちんと残せるようにするため。
this._updateLogs=null;this._oldValueLogs=null;function getFirstCRLog(itemLogs,lastPos){for(var i=0;i<lastPos;i++){var type=itemLogs[i].type;if(type===UPDATE_LOG_TYPE_CREATE||type===UPDATE_LOG_TYPE_REMOVE){return itemLogs[i];}}return null;} /**
			 * 内部でDataItemごとのイベントを発火させます。 変更が1つでもあればモデルイベントオブジェクト(のひな形)を返しますが、変更がない場合はfalseを返します
			 */function createDataModelChanges(model,modelUpdateLogs){var recreated=[];var created=[];var changed=[];var removed=[];for(var itemId in modelUpdateLogs){var itemLogs=modelUpdateLogs[itemId];var isChangeOnly=true;var changeEventStack=[]; //新しい変更が後ろに入っているので、降順で履歴をチェックする
for(var i=itemLogs.length-1;i>=0;i--){var log=itemLogs[i]; //あるitemについてのログ
var logType=log.type; //当該ログの種類
if(logType===UPDATE_LOG_TYPE_CHANGE){changeEventStack.push(log.ev);}else { //あるアイテムについての今回の変更のうち、最初に存在するCREATEまたはREMOVEのログ
//(従って、changeのみの場合存在しない場合もある)
var firstCRLog=getFirstCRLog(itemLogs,i);if(logType===UPDATE_LOG_TYPE_CREATE){ //begin->remove->create->end のような操作が行われた場合、
//begin-endの前後でアイテムのインスタンスが変わってしまう。
//これをイベントで判別可能にするため、remove->createだった場合はcreatedではなくrecreatedに入れる。
//なお、begin->remove->create->remove->create->endのような場合、
//途中のcreate->removeは（begin-endの外から見ると）無視してよいので、
//oldItemには「最初のremoveのときのインスタンス」、newItemには「最後のcreateのときのインスタンス」が入る。
//また、begin->create->remove->create->endの場合は、begin-endの外から見ると"create"扱いにすればよい。
//なお、createイベントはDataItemからは発火しない。(createはdependプロパティ内でのみ起こる)
if(firstCRLog&&firstCRLog.type===UPDATE_LOG_TYPE_REMOVE){recreated.push({id:itemId,oldItem:firstCRLog.item,newItem:log.item});}else {created.push(log.item);}}else { //ここに来たら必ずUPDATE_LOG_TYPE_REMOVE
var removedItem;if(firstCRLog&&firstCRLog.type===UPDATE_LOG_TYPE_REMOVE){ //begin->remove->create->remove->endの場合、begin-endの外から見ると
//「最初のremoveで取り除かれた」という扱いにすればよい。
removedItem=firstCRLog.item;}else if(!firstCRLog){ //createまたはremoveのログが最後のremoveより前にない
//＝beginより前からアイテムが存在し、始めてremoveされた
//＝通常のremoveとして扱う
removedItem=log.item;}else { //begin->create-> ( remove->create-> ) remove -> end つまり
//beginより前にアイテムがなく、セッション中に作られたが最終的には
//またremoveされた場合、begin-endの外から見ると「何もなかった」と扱えばよい。
removedItem=null;}if(removedItem){removed.push(removedItem);var removeEvent={type:'remove',model:model};removedItem.dispatchEvent(removeEvent);}}isChangeOnly=false; //CREATEまたはREMOVEを見つけたら、そこで走査を終了
break;}} //新規追加or削除の場合はcreated, removedに当該オブジェクトが入ればよい。
//あるアイテムのcreate,removeどちらのログもなかったということは
//そのオブジェクトはbeginの時点から存在しendのタイミングまで残っていた、ということになる。
//従って、あとはchangeのイベントオブジェクトをマージすればよい。
if(isChangeOnly&&changeEventStack.length>0){var mergedProps={}; //changeEventStackはより「古い」イベントが「後ろ」に入っている。
for(var i=changeEventStack.length-1;i>=0;i--){for(var p in changeEventStack[i].props){if(!mergedProps[p]){ // oldValueのセット
// type:[]ならmanager._oldValueLogsから持ってくる
if(isObservableArray(model.get(itemId).get(p))){var oldValue=oldValueLogs&&oldValueLogs[model.name]&&oldValueLogs[model.name][itemId]&&oldValueLogs[model.name][itemId][p];if(!model.get(itemId).get(p).equals(oldValue)){ //プロパティがObservableArrayの場合、equalsの結果がfalseの場合のみ
//mergedPropsにセットする。つまり、equalsがtrueの場合は「変更がなかった」ことになる。
mergedProps[p]={oldValue:oldValue};}}else {mergedProps[p]={oldValue:changeEventStack[i].props[p].oldValue};}}}} // 今のアイテムがoldValueと違う値を持っていたらmergedPropsにnewValueをセット
// 最終的に値が変わっているかどうかも同時にチェックする
//oldValueは配列ならmanager._oldValueLogsにある
var changedProps=false;for(var p in mergedProps){var oldValue=mergedProps[p].oldValue;var currentValue=model.get(itemId).get(p);if(oldValue===currentValue||isBothStrictNaN(oldValue,currentValue)){delete mergedProps[p];}else {var newValue=model.get(itemId).get(p);if(dispatchObsAryChange&&isObservableArray(newValue)){ // ObservableArrayのイベントを上げる
newValue.dispatchEvent({type:'change',method:null,args:null,returnValue:null});}mergedProps[p].newValue=newValue;changedProps=true;}}if(changedProps){var mergedChange={type:'change',target:changeEventStack[0].target,props:mergedProps};changed.push(mergedChange);mergedChange.target.dispatchEvent(mergedChange);}}} // 何も変更がなかった場合は、falseを返す
if(created.length===0&&recreated.length===0&&removed.length===0&&changed.length===0){return false;}return {created:created,recreated:recreated,removed:removed,changed:changed};} //endUpdateの処理フローここから
var modelChanges={};for(var modelName in updateLogs){if(!updateLogs.hasOwnProperty(modelName)){continue;}var mc=createDataModelChanges(this.models[modelName],updateLogs[modelName]);if(mc){modelChanges[modelName]=mc;}} //高速化のため、createDataModelChanges()の中で各DataItemからのイベントを発火させている
//各DataModelからイベントを発火。
//全てのモデルの変更が完了してから各モデルの変更イベントを出すため、同じループをもう一度行う
var modelChanged=false;for(var modelName in modelChanges){modelChanged=true;var mc=modelChanges[modelName];this.models[modelName].dispatchEvent(createDataModelItemsChangeEvent(mc.created,mc.recreated,mc.removed,mc.changed));}var event={type:EVENT_ITEMS_CHANGE,models:modelChanges}; //最後に、マネージャから全ての変更イベントをあげる。変更がない場合は何もしない
if(modelChanged){this.dispatchEvent(event);}},_dataModelItemsChangeListener:function _dataModelItemsChangeListener(event){var manager=event.target.manager;var modelsChange={};modelsChange[event.target.name]=event;var managerEvent={type:EVENT_ITEMS_CHANGE,models:modelsChange};manager.dispatchEvent(managerEvent);}}); /**
	 * 採番を行う<a href="Sequence.html">Sequence</a>インスタンスを作成します。
	 * <p>
	 * 自動でデータアイテムのナンバリングを行いたい場合などに使用します。
	 * </p>
	 * <p>
	 * 第一引数に開始番号(デフォルト1)、第二引数にステップ数(デフォルト1)、を指定します。
	 * </p>
	 * <p>
	 * 第三引数には戻り値の型を指定します。デフォルトはSEQ_INT（数値型）です。
	 * <ul>
	 * <li><a href="#SEQ_STRING">h5.core.data.SEQ_STRING</a>
	 * <li><a href="#SEQ_INT">h5.core.data.SEQ_INT</a>
	 * </ul>
	 * のいずれかを指定可能です。 SEQ_STRINGを指定した場合、<a href="Sequence.html#current">current()</a>や<a
	 * href="Sequence.html#next">next()</a> を呼ぶと、"1", "123"のような数字文字列が返ります。SEQ_INTの場合は数値が返ります。
	 * </p>
	 *
	 * @since 1.1.0
	 * @memberOf h5.core.data
	 * @param {Number} [start=1] 開始番号
	 * @param {Number} [step=1] ステップ数
	 * @param {Integer} [returnType=2] 戻り値の型(デフォルト number)
	 * @returns {Sequence}
	 */function createSequence(start,step,returnType){ // start,stepをdefault値で、returnTypeだけ指定したい場合、createSequence(null,null,returnType)で呼べるように、==nullで比較している
var current=start!=null?start:1;var theStep=step!=null?step:1;function currentInt(){return current;}function nextInt(){var val=current;current+=theStep;return val;}function currentString(){return current.toString();}function nextString(){var val=current;current+=theStep;return val.toString();}var methods;if(returnType===SEQ_STRING){methods={current:currentString,next:nextString,returnType:SEQ_STRING};}else {methods={current:currentInt,next:nextInt,returnType:SEQ_INT};}methods.setCurrent=function(value){current=value;}; /**
		 * 採番を行うためのクラス。
		 * <p>
		 * 自動でデータアイテムのナンバリングを行いたい場合などに使用します。このクラスは<a
		 * href="h5.core.data.html#createSequence">h5.core.data.createSequence()</a>で作成します。
		 * </p>
		 *
		 * @since 1.1.0
		 * @class Sequence
		 */function Sequence(){ // 空コンストラクタ
}$.extend(Sequence.prototype,methods);return new Sequence();} //--------------------------------------------
// DataModel
//--------------------------------------------
/**
	 * データモデル。 このクラスは直接newすることはできません。
	 * <p>
	 * <a href="DataModelManager.html#createModel">DataModelManager#createModel()</a>を呼ぶと、DataModelクラスを生成して返します。
	 * </p>
	 * <p>
	 * このクラスは<a href="EventDispatcher.html">EventDispatcher</a>のメソッドを持ちます。イベント関連のメソッドについては<a
	 * href="EventDispatcher.html">EventDispatcherミックスイン</a>を参照してください。<br>
	 * データモデルは、データモデルが管理するデータアイテムに変更があった場合に'itemsChange'イベントが発火します。
	 * </p>
	 *
	 * @since 1.1.0
	 * @class
	 * @mixes EventDispatcher
	 * @name DataModel
	 */ /**
	 * @private
	 * @param {Object} schema チェック済みかつextendSchema済みのschema
	 * @param {Object} descriptor チェック済み
	 * @param {Object} itemValueCheckFuncs 値のチェック関数
	 * @param {DataModelManager} manager
	 */function DataModel(schema,descriptor,itemValueCheckFuncs,manager){ /**
		 * データモデルが持つデータアイテムを持つオブジェクト。
		 * <p>
		 * データアイテムのidをキー、データアイテムインスタンスを値、として保持します。
		 * </p>
		 *
		 * @since 1.1.0
		 * @memberOf DataModel
		 * @type Object
		 * @name items
		 */this.items={}; /**
		 * データモデルが持つデータアイテムの数
		 *
		 * @since 1.1.0
		 * @memberOf DataModel
		 * @type Integer
		 * @name size
		 */this.size=0; /**
		 * データモデル名
		 *
		 * @since 1.1.0
		 * @memberOf DataModel
		 * @type String
		 * @name name
		 */this.name=descriptor.name; /**
		 * このデータモデルが属しているデータマネージャインスタンス。<br>
		 *
		 * @private
		 * @since 1.1.0
		 * @memberOf DataModel
		 * @type Object
		 * @name _manager
		 */this._manager=manager; //TODO sequence対応は後日
//this.idSequence = 0;
// idプロパティの設定
// スキーマはチェック済みなのでid指定されているプロパティは必ず一つだけある。
for(var p in schema){if(schema[p]&&schema[p].id){this._idKey=p;}}var schemaIdType=schema[this._idKey].type;if(schemaIdType){if(schemaIdType==='string'){this._idType=ID_TYPE_STRING;}else {this._idType=ID_TYPE_INT;}}else {this._idType=ID_TYPE_STRING;} /**
		 * 継承関係計算済みのスキーマ
		 *
		 * @name schema
		 * @since 1.1.0
		 * @type {Object}
		 * @memberOf DataModel
		 */this.schema=schema; /**
		 * このデータモデルに対応するデータアイテムのコンストラクタ関数
		 *
		 * @private
		 * @since 1.1.0
		 * @type function
		 * @memberOf DataModel
		 */this._itemConstructor=createDataItemConstructor(schema,itemValueCheckFuncs,this); // manager.modelsに自身を登録
manager.models[this.name]=this;} // EventDispatcherをミックスイン
h5.mixin.eventDispatcher.mix(DataModel.prototype);$.extend(DataModel.prototype,{ /**
		 * 指定されたIDと初期値がセットされたデータアイテムを生成します。
		 * <p>
		 * データアイテムはこのデータモデルに紐づけられた状態になっています。
		 * </p>
		 * <p>
		 * 指定されたIDのデータアイテムがすでにこのデータモデルに存在した場合は、 既に存在するデータアイテムを返します（新しいインスタンスは生成されません）。
		 * </p>
		 * <p>
		 * 従って、1つのデータモデルは、1IDにつき必ず1つのインスタンスだけを保持します。
		 * なお、ここでIDの他に初期値も渡された場合は、既存のインスタンスに初期値をセットしてから返します。
		 * このとき、当該インスタンスにイベントハンドラが設定されていれば、changeイベントが（通常の値更新と同様に）発生します。
		 * </p>
		 * <p>
		 * 引数にはディスクリプタオブジェクトまたはその配列を指定します。ディスクリプタオブジェクトについては<a
		 * href="/conts/web/view/tutorial-data-model/descriptor">チュートリアル(データモデル編)&gt;&gt;ディスクリプタの書き方</a>をご覧ください。
		 * </p>
		 *
		 * @since 1.1.0
		 * @memberOf DataModel
		 * @param {Object|Object[]} objOrArray ディスクリプタオブジェクト、またはその配列
		 * @returns {DataItem|DataItem[]} データアイテム、またはその配列
		 */create:function create(objOrArray){ // modelがmanagerを持たない(dropModelされた)ならエラー
if(!this._manager){throwFwError(ERR_CODE_CANNOT_CHANGE_DROPPED_MODEL,[this.name,'create']);}var error=this.validate(objOrArray,true);if(error){throw error;} //removeで同時に複数のアイテムが指定された場合、イベントは一度だけ送出する。
//そのため、事前にアップデートセッションに入っている場合はそのセッションを引き継ぎ、
//入っていない場合は一時的にセッションを作成する。
var isAlreadyInUpdate=this._manager?this._manager.isInUpdate():false;if(!isAlreadyInUpdate){this._manager.beginUpdate();}var actualNewItems=[];var items=wrapInArray(objOrArray);var ret=[];var idKey=this._idKey;for(var i=0,len=items.length;i<len;i++){var valueObj=items[i];var itemId=valueObj[idKey];var storedItem=this._findById(itemId);if(storedItem){ //返す値にstoredItemを追加
ret.push(storedItem); // 既に存在するオブジェクトの場合は値を更新。ただし、valueObjのIDフィールドは無視（上書きなので問題はない）
var event=itemSetter(storedItem,valueObj,[idKey]);if(!event){ //itemSetterが何も返さなかった = 更新する値が何もない
continue;}addUpdateChangeLog(this,event);}else {var newItem=new this._itemConstructor(valueObj);this.items[itemId]=newItem;this.size++;actualNewItems.push(newItem);ret.push(newItem);}}if(actualNewItems.length>0){addUpdateLog(this,UPDATE_LOG_TYPE_CREATE,actualNewItems);}if(!isAlreadyInUpdate){ //既存のアイテムが変更されていればアイテムのイベントを上げる
this._manager.endUpdate();}if(isArray(objOrArray)){return ret;}return ret[0];}, /**
		 * このモデルのスキーマに違反しないかどうかオブジェクトをチェックします。
		 * <p>
		 * 第一引数にはチェックしたいオブジェクト、またはチェックしたいオブジェクトの配列を渡してください。
		 * </p>
		 * <p>
		 * 例：
		 *
		 * <pre>
		 * dataModel.validate({
		 * 	prop1: 5,
		 * 	prop2: 'abc'
		 * });
		 * </pre>
		 *
		 * </p>
		 * <p>
		 * チェックが通らなかった場合は例外オブジェクト、チェックが通った場合はnullを返します
		 * </p>
		 * <p>
		 * 第二引数にtrueを指定した場合は、create()時相当のバリデーションを行います。create()時相当のバリデーションではid指定があるかどうかのチェックがあり、
		 * 引数に未指定のプロパティがあれば初期値の設定をしてからバリデーションを行います。デフォルトはfalseで、set()時相当のスキーマチェックのみを行います。
		 * </p>
		 * <p>
		 * id項目へのセット、depend項目へのセットのチェック及び、depend項目の計算結果のチェック(depend.calcの実行)は行いません。
		 * id項目、depend項目はセットできるかどうかは、セット時のデータアイテムの値に依存するため、validate時にはチェックしません。
		 * depend.calcはその時のデータアイテムに依存したり、副作用のある関数が指定されている場合を考慮し、validate時には実行しません。
		 * </p>
		 *
		 * @since 1.1.9
		 * @memberOf DataModel
		 * @param {Object|Object[]} value チェックしたいオブジェクトまたはオブジェクトの配列
		 * @param {Boolean} [asCreate=false] create()時相当のバリデーションを行うかどうか
		 */validate:function validate(value,asCreate){try{var idKey=this._idKey;var items=wrapInArray(value); // objctでもArrayでもなかったらエラー
if((typeof value==='undefined'?'undefined':_typeof(value))!=='object'&&!isArray(value)){throwFwError(ERR_CODE_INVALID_CREATE_ARGS);}if(asCreate){for(var i=0,len=items.length;i<len;i++){var valueObj=items[i];var itemId=valueObj[idKey]; //idが空文字、null、undefined、はid指定エラー
if(itemId===''||itemId==null){throwFwError(ERR_CODE_NO_ID,[this.name,idKey]);} // validateする
// 新規作成時のチェックなら初期値をセットしてからチェックを実行
var obj=this._schemaInfo._createInitialValueObj(valueObj);validateValueObj(this.schema,this._schemaInfo._validateItemValue,obj,this);}}else {for(var i=0,l=items.length;i<l;i++){var valueObj=items[i];validateValueObj(this.schema,this._schemaInfo._validateItemValue,valueObj,this);}}}catch(e){return e;}return null;}, /**
		 * 指定されたIDのデータアイテムを返します。
		 * <p>
		 * 当該IDを持つアイテムをこのデータモデルが保持していない場合はnullを返します。 引数にIDの配列を渡した場合に一部のIDのデータアイテムが存在しなかった場合、
		 * 戻り値の配列の対応位置にnullが入ります。
		 * </p>
		 * <p>
		 * （例：get(['id1', 'id2', 'id3']) でid2のアイテムがない場合、戻り値は [item1, null, item3] のようになる ）
		 * </p>
		 *
		 * @since 1.1.0
		 * @memberOf DataModel
		 * @param {String|String[]} idOrArray ID、またはその配列
		 * @returns {DataItem|DataItem[]} データアイテム、またはその配列
		 */get:function get(idOrArray){if(isArray(idOrArray)||h5.core.data.isObservableArray(idOrArray)){var ret=[];for(var i=0,len=idOrArray.length;i<len;i++){ret.push(this._findById(idOrArray[i]));}return ret;} //引数の型チェックはfindById内で行われる
return this._findById(idOrArray);}, /**
		 * 指定されたIDのデータアイテムをこのデータモデルから削除します。
		 * <p>
		 * 当該IDを持つアイテムをこのデータモデルが保持していない場合はnullを返します。 引数にIDの配列を渡した場合に一部のIDのデータアイテムが存在しなかった場合、
		 * 戻り値の配列の対応位置にnullが入ります。 （例：remove(['id1', 'id2', 'id3']) でid2のアイテムがない場合、 戻り値は [item1,
		 * null, item3]のようになります。） 引数にID(文字列)またはデータアイテム以外を渡した場合はnullを返します。
		 * </p>
		 *
		 * @since 1.1.0
		 * @memberOf DataModel
		 * @param {String|DataItem|String[]|DataItem[]} objOrItemIdOrArray 削除するデータアイテム
		 * @returns {DataItem|DataItem[]} 削除したデータアイテム
		 */remove:function remove(objOrItemIdOrArray){ // modelがmanagerを持たない(dropModelされた)ならエラー
if(!this._manager){throwFwError(ERR_CODE_CANNOT_CHANGE_DROPPED_MODEL,[this.name,'remove']);} //removeで同時に複数のアイテムが指定された場合、イベントは一度だけ送出する。
//そのため、事前にアップデートセッションに入っている場合はそのセッションを引き継ぎ、
//入っていない場合は一時的にセッションを作成する。
var isAlreadyInUpdate=this._manager?this._manager.isInUpdate():false;if(!isAlreadyInUpdate){this._manager.beginUpdate();}var idKey=this._idKey;var ids=wrapInArray(objOrItemIdOrArray);var actualRemovedItems=[];var ret=[];for(var i=0,len=ids.length;i<len;i++){if(!this.has(ids[i])){ //指定されたアイテムが存在しない場合はnull
ret.push(null);continue;}var id=isString(ids[i])||isIntegerValue(ids[i],true)?ids[i]:ids[i]._values[idKey];var item=this.items[id];delete this.items[id];this.size--;ret.push(item);if(item._model){ // 削除されたフラグを立てる
item._isRemoved=true;}actualRemovedItems.push(item);}if(actualRemovedItems.length>0){addUpdateLog(this,UPDATE_LOG_TYPE_REMOVE,actualRemovedItems);}if(!isAlreadyInUpdate){this._manager.endUpdate();}if(isArray(objOrItemIdOrArray)){return ret;}return ret[0];}, /**
		 * 保持しているすべてのデータアイテムを削除します。
		 *
		 * @since 1.1.3
		 * @memberOf DataModel
		 * @returns {DataItem[]} 削除されたデータアイテム。順序は不定です。
		 */removeAll:function removeAll(){var items=this.toArray();if(items.length>0){this.remove(items);}return items;}, /**
		 * 指定されたデータアイテムを保持しているかどうかを返します。
		 * <p>
		 * 文字列または整数値が渡された場合はIDとみなし、 オブジェクトが渡された場合はデータアイテムとみなします。
		 * オブジェクトが渡された場合、自分が保持しているデータアイテムインスタンスかどうかをチェックします。
		 * </p>
		 * <p>
		 * 従って、同じ構造を持つ別のインスタンスを引数に渡した場合はfalseが返ります。
		 * データアイテムインスタンスを引数に渡した場合に限り（そのインスタンスをこのデータモデルが保持していれば）trueが返ります。
		 * </p>
		 *
		 * @since 1.1.0
		 * @memberOf DataModel
		 * @param {String|Object} idOrObj ID文字列またはデータアイテムオブジェクト
		 * @returns {Boolean} 指定されたIDのデータアイテムをこのデータモデルが保持しているかどうか
		 */has:function has(idOrObj){if(isString(idOrObj)||isIntegerValue(idOrObj,true)){return !!this._findById(idOrObj);}else if((typeof idOrObj==='undefined'?'undefined':_typeof(idOrObj))==='object'){ //型の厳密性はitemsとの厳密等価比較によってチェックできるので、if文ではtypeofで充分
return idOrObj!=null&&isFunction(idOrObj.get)&&idOrObj===this.items[idOrObj.get(this._idKey)];}else {return false;}}, /**
		 * このモデルが属しているマネージャを返します。
		 * <p>
		 * dropModelされたモデルの場合はnullを返します。
		 * </p>
		 *
		 * @since 1.1.0
		 * @memberOf DataModel
		 * @returns {DataManager} このモデルが属しているマネージャ
		 */getManager:function getManager(){return this._manager;}, /**
		 * 指定されたIDのデータアイテムを返します。 アイテムがない場合はnullを返します。
		 *
		 * @private
		 * @since 1.1.0
		 * @memberOf DataModel
		 * @param {String} id データアイテムのID
		 * @returns {DataItem} データアイテム、存在しない場合はnull
		 */_findById:function _findById(id){var item=this.items[id];return (typeof item==='undefined'?'undefined':_typeof(item))===TYPE_OF_UNDEFINED?null:item;}, /**
		 * 引数で指定されたchangeイベントに基づいて、itemsChangeイベントを即座に発火させます。
		 *
		 * @private
		 * @since 1.1.0
		 * @memberOf DataModel
		 * @param {Object} event DataItemのchangeイベント
		 */_dispatchItemsChangeEvent:function _dispatchItemsChangeEvent(event){var modelEvent=createDataModelItemsChangeEvent([],[],[],[event]);this.dispatchEvent(modelEvent); // managerがあれば(dropされたモデルでなければ)managerのイベントを発火
if(this._manager){modelEvent.target=this;this._manager._dataModelItemsChangeListener(modelEvent);}}, /**
		 * データモデルが持つデータアイテムを配列に詰めて返します。 配列中のデータアイテムの順番は不定です。
		 *
		 * @since 1.1.0
		 * @memberOf DataModel
		 * @returns {Array} モデルが持つデータアイテムが格納された配列
		 */toArray:function toArray(){var ret=[];var items=this.items;for(var id in items){if(items.hasOwnProperty(id)){ret.push(items[id]);}}return ret;}, /**
		 * このデータモデルについてデータアイテムの検索を行う{@link Query}インスタンスを作成して返します。
		 *
		 * @since 1.2.0
		 * @memberOf DataModel
		 * @returns {Query} 検索を行うQueryインスタンスを返します
		 */createQuery:h5internal.data.createQuery}); //------------------------------------------
// DataItem
//------------------------------------------
/**
	 * propで指定されたプロパティのプロパティソース(データアイテムのコンストラクタ)を作成します。
	 *
	 * @private
	 * @param {Object} schemaInfo チェック済みスキーマ
	 * @param {Object} itemValuCheckFuncs 値チェック関数を持つオブジェクト。
	 * @param {DataModel} [model] データモデルオブジェクト
	 */function createDataItemConstructor(schema,itemValueCheckFuncs,model){ // スキーマ情報の作成。アイテムのプロトタイプとモデルに持たせる。
var schemaInfo=createSchemaInfoCache(schema,itemValueCheckFuncs);model._schemaInfo=schemaInfo; /**
		 * データアイテムクラス
		 * <p>
		 * データアイテムは<a href="DataModel.html#create">DataModel#create()</a>で作成します。
		 * </p>
		 * <p>
		 * このクラスは<a href="EventDispatcher.html">EventDispatcher</a>のメソッドを持ちます。イベント関連のメソッドについては<a
		 * href="EventDispatcher.html">EventDispatcherミックスイン</a>を参照してください。<br>
		 * データアイテムは、アイテムが持つ値に変更があった場合に'change'イベントが発火します。
		 * </p>
		 *
		 * @since 1.1.0
		 * @class
		 * @mixes EventDispatcher
		 * @name DataItem
		 */ /**
		 * @private
		 * @param {Object} userInitialValue ユーザー指定の初期値
		 */function DataItem(userInitialValue){initItem(this,schema,schemaInfo,userInitialValue); // 初期値の設定
var actualInitialValue=schemaInfo._createInitialValueObj(userInitialValue);validateValueObj(schema,schemaInfo._validateItemValue,actualInitialValue,model);itemSetter(this,actualInitialValue,null,true); // arrayPropsの設定
var arrayProps=schemaInfo._aryProps; // ObservableArrayのイベントリスナの設定を行う
for(var i=0,l=arrayProps.length;i<l;i++){setObservableArrayListeners(this,arrayProps[i],this.get(arrayProps[i]),model);}} // EventDispatcherをミックスイン
h5.mixin.eventDispatcher.mix(DataItem.prototype); // EventDispatcherと、schemaInfoもprototypeに追加する
$.extend(DataItem.prototype,schemaInfo,itemProto,{ /**
			 * データアイテムが属しているデータモデル
			 *
			 * @private
			 * @since 1.1.0
			 * @memberOf DataItem
			 */_model:model, /**
			 * データアイテムがモデルからremoveされたかどうか
			 *
			 * @private
			 * @memberOf DataItem
			 */_isRemoved:false, /**
			 * DataItemが属しているDataModelインスタンスを返します。
			 * <p>
			 * このメソッドは、DataModelから作成したDataItemのみが持ちます。createObservableItemで作成したアイテムにはこのメソッドはありません。
			 * DataModelに属していないDataItem(removeされたDataItem)から呼ばれた場合はnullを返します。
			 * </p>
			 *
			 * @since 1.1.0
			 * @memberOf DataItem
			 * @returns {DataModel} 自分が所属するデータモデル
			 */getModel:function getModel(){return this._isRemoved?null:this._model;}});return DataItem;} // ------------------------
// ObservableItem
// ------------------------
/**
	 * オブザーバブルアイテムクラス
	 * <p>
	 * オブザーバブルアイテムは<a
	 * href="h5.core.data.html#createObservableItem">h5.core.data.html#createObservableItem</a>で作成します。
	 * </p>
	 * <p>
	 * このクラスは<a href="DataItem.html">DataItemクラス</a>のメソッドを持ちます。
	 * </p>
	 *
	 * @since 1.1.0
	 * @class
	 * @mixes EventDispatcher
	 * @name ObservableItem
	 */function ObservableItem(item){} // 空コンストラクタ
// EventDispatcherをミックスイン
h5.mixin.eventDispatcher.mix(ObservableItem.prototype);$.extend(ObservableItem.prototype,itemProto,{ /**
		 * ObservableItemのスキーマに違反しないかどうか引数をチェックします。
		 * <p>
		 * チェックが通らなかった場合は例外オブジェクト、チェックが通った場合はnullを返します
		 * </p>
		 * <p>
		 * このメソッドはh5.core.data.createObservableItem()で作成したObservableItemのみが持ちます。DataModelから作成したDataItemにはこのメソッドはありません。
		 * DataModelから作成したDataItemの値チェックは、<a href="DataModel.html#validate">DataModel#validate</a>を使用してください。
		 * </p>
		 *
		 * @since 1.1.9
		 * @memberOf ObservableItem
		 * @param {Any} var_args 複数のキー・値のペアからなるオブジェクト、または1組の(キー, 値)を2つの引数で取ります。
		 */validate:function validate(var_args){try{ //引数はオブジェクト1つ、または(key, value)で呼び出せる
var valueObj=var_args;if(arguments.length===2){valueObj={};valueObj[arguments[0]]=arguments[1];}validateValueObj(this.schema,this._validateItemValue,valueObj);}catch(e){return e;}return null;}}); /**
	 * ObservableItemを作成します。
	 * <p>
	 * ObservableItemは、データモデルに属さない<a href="DataItem.html"/>DataItem</a>です。DataItemと同様にEventDispatcherクラスのメソッドを持ちます。
	 * </p>
	 * <p>
	 * 引数にはスキーマオブジェクトを指定します。スキーマオブジェクトとは、ディスクリプタオブジェクトのschemaプロパティに指定するオブジェクトのことです。
	 * </p>
	 * <p>
	 * ディスクリプタオブジェクトについては<a
	 * href="/conts/web/view/tutorial-data-model/descriptor">チュートリアル(データモデル編)&gt;&gt;ディスクリプタの書き方</a>をご覧ください。
	 * </p>
	 *
	 * @since 1.1.0
	 * @memberOf h5.core.data
	 * @param {Object} schema スキーマオブジェクト
	 * @returns {ObservableItem} ObservableItemインスタンス
	 */function createObservableItem(schema){ // 値チェックに必要な情報を取得してitemに持たせる
validateSchema(schema,false,null,true);var itemValueCheckFuncs=createValueCheckFuncsBySchema(schema);validateDefaultValue(schema,itemValueCheckFuncs,true);var obsItem=new ObservableItem(); // スキーマ情報の作成。アイテムに持たせる。
var schemaInfo=createSchemaInfoCache(schema,itemValueCheckFuncs); // obsItemのセットアップ
initItem(obsItem,schema,schemaInfo); // schemaを持たせる
obsItem.schema=schema; // schemaInfoの中身を持たせる
for(var p in schemaInfo){obsItem[p]=schemaInfo[p];} // 初期値の設定
var actualInitialValue=schemaInfo._createInitialValueObj();validateValueObj(schema,schemaInfo._validateItemValue,actualInitialValue);itemSetter(obsItem,actualInitialValue,null,true); // ObservableArrayのアイテムについてリスナの設定
for(var i=0,l=obsItem._aryProps.length;i<l;i++){setObservableArrayListeners(obsItem,obsItem._aryProps[i],obsItem.get(obsItem._aryProps[i]));}return obsItem;} /**
	 * ObserevableItem(createObservableItemで作成したオブジェクト)かどうかを判定します。
	 * <p>
	 * DataModelから作成したDataItemの場合はfalseを返します。
	 * </p>
	 *
	 * @since 1.1.0
	 * @memberOf h5.core.data
	 * @returns {Boolean} ObservableItemかどうか
	 */function isObservableItem(obj){ // _validateItemValueを持っているかつ、getModelメソッドがない場合はObservableItemと判定する。
return !!(obj&&obj.constructor&&obj._validateItemValue&&!isFunction(obj.getModel));} //--------------------------------------------
// ObservableArray
//--------------------------------------------
/**
	 * ObservableArray(オブザーバブルアレイ)とは、通常の配列と同じAPIを持ち操作を外部から監視できる、配列とほぼ同じように利用可能なクラスです。
	 * DOM要素のようにaddEventListenerでリスナーをセットすることで、配列に対するメソッド呼び出しをフックすることができます。
	 * <p>
	 * <a href="h5.core.data.html#createObservableArray">h5.core.data.createObservableArray()</a>で作成します。
	 * </p>
	 * <p>
	 * 通常の配列と同様の操作に加え、要素の追加、削除、変更についての監視ができます。
	 * </p>
	 * <p>
	 * Arrayクラスの持つメソッド(concat, join, pop, push, reverse, shift, slice, sort, splice, unshift,
	 * indexOf, lastIndexOf, every, filter, forEach, map, some, reduce, reduceRight)が使えます。
	 * </p>
	 * <p>
	 * このクラスは<a href="EventDispatcher.html">EventDispatcher</a>のメソッドを持ちます。イベント関連のメソッドについては<a
	 * href="EventDispatcher.html">EventDispatcherミックスイン</a>を参照してください。<br>
	 * ObservableArrayは、自身の内容が変更されるメソッドが呼び出される時、実行前に'changeBefore'、実行後に'change'イベントを発生させます。
	 * </p>
	 *
	 * @since 1.1.0
	 * @class
	 * @mixes EventDispatcher
	 * @name ObservableArray
	 */function ObservableArray(){ /**
		 * 配列の長さを表します。このプロパティは読み取り専用で使用してください
		 *
		 * @since 1.1.0
		 * @name length
		 * @memberOf ObservableArray
		 * @type Number
		 */this.length=0;this._src=[];} // EventDispatcherをミックスイン
h5.mixin.eventDispatcher.mix(ObservableArray.prototype); //ObservableArrayの関数はフックされるので、直接prototypeに置かない
var obsFuncs={ /**
		 * この配列が、引数で指定された配列と同じ内容か比較します。<br>
		 * 要素にNaN定数が入っている場合、同一位置にともにNaNが入っているかどうかをisNaN()関数でチェックします。
		 * （obsArrayの内容が[NaN]のとき、obsArray.equals([NaN])）はtrueになります。
		 *
		 * @since 1.1.0
		 * @memberOf ObservableArray
		 * @param {ObservableArray|Array} ary ObservableArrayまたはArray型の配列
		 * @returns {Boolean} 判定結果
		 */equals:function equals(ary){var isObservable=isObservableArray(ary);if(!isObservable&&!isArray(ary)){ // ObservableArrayでもArrayでもないならfalseを返す
return false;}var target=isObservable?ary._src:ary;var len=this.length;var targetLength=target.length; // サイズが異なる場合はfalseを返す
// target(ネイティブの配列)のlengthと比較する。
// (iOS8.0で、ObsArrayのlengthとネイティブのArrayのlengthを比較すると比較結果がおかしくなることがある(#issue 404))
if(targetLength!==len){return false;} // 中身の比較
for(var i=0;i<len;i++){var myVal=this[i];var targetVal=target[i];if(!(myVal===targetVal||isBothStrictNaN(myVal,targetVal))){return false;}}return true;}, /**
		 * 指定された配列の要素をこのObservableArrayにシャローコピーします。
		 * <p>
		 * 元々入っていた値は全て削除され、呼び出し後は引数で指定された配列と同じ要素を持ちます。
		 * </p>
		 * 引数がnullまたはundefinedの場合は、空配列が渡された場合と同じ挙動をします（自身の要素が全て削除されます）
		 *
		 * @since 1.1.0
		 * @memberOf ObservableArray
		 * @param {Array} src コピー元の配列
		 */copyFrom:function copyFrom(src){if(src==null){ //srcがnullの場合は空配列と同じ挙動にする
src=[];}src=isObservableArray(src)?src._src:src;if(!isArray(src)){ //引数が配列でない場合はエラー
throwFwError(ERR_CODE_INVALID_COPYFROM_ARGUMENT,[0,src]);}var args=src.slice(0);args.unshift(0,this.length);Array.prototype.splice.apply(this,args);}, /**
		 * 値を取得します
		 *
		 * @since 1.1.3
		 * @memberOf ObservableArray
		 * @param {Number} index 取得する要素のインデックス
		 * @returns 要素の値
		 */get:function get(index){return this[index];}, /**
		 * 値をセットします
		 *
		 * @since 1.1.3
		 * @memberOf ObservableArray
		 * @param {Number} index 値をセットする要素のインデックス
		 */set:function set(index,value){this[index]=value;}, /**
		 * 現在のObservableArrayインスタンスと同じ要素を持ったネイティブ配列インスタンスを返します
		 *
		 * @since 1.1.3
		 * @memberOf ObservableArray
		 * @returns ネイティブ配列インスタンス
		 */toArray:function toArray(){return this.slice(0);}, /**
		 * 動作は通常の配列のconcatと同じです。<br>
		 * 引数にObservableArrayが渡された場合にそれを通常の配列とみなして動作するようラップされています
		 *
		 * @since 1.1.3
		 * @memberOf ObservableArray
		 * @returns 要素を連結したObservableArrayインスタンス
		 */concat:function concat(){var args=h5.u.obj.argsToArray(arguments);for(var i=0,len=args.length;i<len;i++){if(isObservableArray(args[i])){args[i]=args[i].toArray();}}return this.concat.apply(this,args);}}; //Array.prototypeのメンバーはfor-inで列挙されないためここで列挙。
//プロパティアクセスのProxyingが可能になれば不要になるかもしれない。
var arrayMethods=['concat','join','pop','push','reverse','shift','slice','sort','splice','unshift','indexOf','lastIndexOf','every','filter','forEach','map','some','reduce','reduceRight'];for(var obsFuncName in obsFuncs){if(obsFuncs.hasOwnProperty(obsFuncName)&&$.inArray(obsFuncName,arrayMethods)===-1){arrayMethods.push(obsFuncName);}} // 戻り値として配列を返すので戻り値をラップする必要があるメソッド（従ってtoArrayは含めない）
var creationMethods=['concat','slice','splice','filter','map']; //戻り値として自分自身を返すメソッド
var returnsSelfMethods=['reverse','sort']; // 破壊的(副作用のある)メソッド
var destructiveMethods=['sort','reverse','pop','shift','unshift','push','splice','copyFrom','set'];for(var i=0,len=arrayMethods.length;i<len;i++){var arrayMethod=arrayMethods[i];ObservableArray.prototype[arrayMethod]=function(method){var func=obsFuncs[method]?obsFuncs[method]:Array.prototype[method];function doProcess(){var ret=func.apply(this._src,arguments);if($.inArray(method,returnsSelfMethods)!==-1){ //自分自身を返すメソッドの場合
ret=this;}else if($.inArray(method,creationMethods)!==-1){ //新しい配列を生成するメソッドの場合
var wrapper=createObservableArray();wrapper.copyFrom(ret);ret=wrapper;}return ret;}if($.inArray(method,destructiveMethods)===-1){ //非破壊メソッドの場合
return doProcess;} //破壊メソッドの場合は、changeBefore/changeイベントを出す
//TODO fallback実装の提供?(優先度低)
return function(){var evBefore={type:'changeBefore',method:method,args:arguments};if(!this.dispatchEvent(evBefore)){ //preventDefault()が呼ばれなければ実際に処理を行う
var ret=doProcess.apply(this,arguments);this.length=this._src.length;var evAfter={type:'change',method:method,args:arguments,returnValue:ret};this.dispatchEvent(evAfter);return ret;}};}(arrayMethod);} /**
	 * ObservableArrayを作成します
	 *
	 * @since 1.1.0
	 * @memberOf h5.core.data
	 * @returns {ObservableArray} ObservableArrayインスタンス
	 */function createObservableArray(){return new ObservableArray();} /**
	 * ObservableArrayかどうかを判定します
	 *
	 * @since 1.1.0
	 * @memberOf h5.core.data
	 * @returns {Boolean} ObservableArrayかどうか
	 */function isObservableArray(obj){if(obj&&obj.constructor===ObservableArray){return true;}return false;} // =============================
// Expose to window
// =============================
/**
	 * @namespace
	 * @name data
	 * @memberOf h5.core
	 */h5.u.obj.expose('h5.core.data',{createManager:createManager,createObservableArray:createObservableArray,createObservableItem:createObservableItem,isObservableArray:isObservableArray,isObservableItem:isObservableItem,createSequence:createSequence,SEQ_STRING:SEQ_STRING,SEQ_INT:SEQ_INT});})(); /* ------ h5.core.view ------ */(function(){ // =========================================================================
//
// Constants
//
// =========================================================================
// =============================
// Production
// =============================
/**
	 * EJSにスクリプトレットの区切りとして認識させる文字
	 */var DELIMITER='['; // エラーコード
/**
	 * コンパイルしようとしたテンプレートが文字列でない
	 */var ERR_CODE_TEMPLATE_COMPILE_NOT_STRING=7000; /**
	 * テンプレートIDが不正である時に発生するエラー
	 */var ERR_CODE_TEMPLATE_INVALID_ID=7002; /**
	 * load()呼び出し時に引数にファイル名またはファイル名の配列が渡されなかった時に発生するエラー
	 */var ERR_CODE_INVALID_FILE_PATH=7004; /**
	 * 登録されていないテンプレートIDを指定したときに発生するエラー
	 */var ERR_CODE_TEMPLATE_ID_UNAVAILABLE=7005; /**
	 * テンプレートに渡すパラメータに必要なプロパティが設定されていない時に発生するエラー
	 */var ERR_CODE_TEMPLATE_PROPATY_UNDEFINED=7006; /**
	 * bindに指定されたターゲットが不正(非DOM要素またはセレクタで指定された要素が存在しない)な場合に発生するエラー
	 */var ERR_CODE_BIND_INVALID_TARGET=7007; /**
	 * bindに指定したtargetが表すDOM要素が複数あるならエラー
	 */var ERR_CODE_TOO_MANY_TARGETS=7008; /**
	 * bindに指定したcontextがオブジェクトでない
	 */var ERR_CODE_BIND_CONTEXT_INVALID=7009; /**
	 * テンプレートのコンパイルエラー
	 */var ERR_CODE_TEMPLATE_COMPILE_SYNTAX_ERR=7010; // =============================
// Development Only
// =============================
var fwLogger=h5.log.createLogger('h5.core.view'); /* del begin */var FW_LOG_TEMPLATE_NOT_REGISTERED='指定されたIDのテンプレートは登録されていません。"{0}"';var FW_LOG_TEMPLATE_OVERWRITE='テンプレートID:{0} は上書きされました。'; /**
	 * 各エラーコードに対応するメッセージ
	 */var errMsgMap={};errMsgMap[ERR_CODE_TEMPLATE_COMPILE_NOT_STRING]='テンプレートのコンパイルでエラーが発生しました。テンプレートには文字列を指定してください。'; // ERR_CODE_INVALID_IDのエラーのメッセージはh5.resで登録済みなのでここで再度登録はしない
// (ejsファイル解析時のid不正と、get()の引数のid不正が同じエラーであるため、res,viewで両方使用している)
//	errMsgMap[ERR_CODE_TEMPLATE_INVALID_ID] = 'テンプレートIDが指定されていません。空や空白でない文字列で指定してください。';
errMsgMap[ERR_CODE_INVALID_FILE_PATH]='テンプレートファイルの指定が不正です。空や空白でない文字列、または文字列の配列で指定してください。';errMsgMap[ERR_CODE_TEMPLATE_ID_UNAVAILABLE]='テンプレートID:{0} テンプレートがありません。';errMsgMap[ERR_CODE_TEMPLATE_PROPATY_UNDEFINED]='{0} テンプレートにパラメータが設定されていません。';errMsgMap[ERR_CODE_BIND_INVALID_TARGET]='bindの引数に指定されたターゲットが存在しないかまたは不正です。';errMsgMap[ERR_CODE_TOO_MANY_TARGETS]='bindの引数に指定されたバインド先の要素が2つ以上存在します。バインド対象は1つのみにしてください。';errMsgMap[ERR_CODE_BIND_CONTEXT_INVALID]='bindの引数に指定されたルートコンテキストが不正です。オブジェクト、データアイテム、またはObservableItemを指定してください。';errMsgMap[ERR_CODE_TEMPLATE_COMPILE_SYNTAX_ERR]='テンプレートのコンパイルでエラーが発生しました。構文エラー：{0} {1}'; // メッセージの登録
addFwErrorCodeMap(errMsgMap); /* del end */ // =========================================================================
//
// Cache
//
// =========================================================================
var getDeferred=h5.async.deferred; // =========================================================================
//
// Privates
//
// =========================================================================
// =============================
// Variables
// =============================
/**
	 * EJSテンプレート内で使用可能なヘルパー関数を格納するオブジェクト
	 */var helperExtras={ /**
		 * HTML文字列をエスケープします。
		 *
		 * @param {String} str エスケープ対象文字列
		 * @returns {String} エスケープされた文字列
		 */escapeHtml:function escapeHtml(str){return h5.u.str.escapeHtml(str);}}; // =============================
// Functions
// =============================
/**
	 * jQueryオブジェクトか判定し、jQueryオブジェクトならそのまま、そうでないならjQueryオブジェクトに変換して返します。
	 *
	 * @function
	 * @param {Object} obj DOM要素
	 * @returns {Object} jQueryObject
	 */function getJQueryObj(obj){return h5.u.obj.isJQueryObject(obj)?obj:$(obj);} // =========================================================================
//
// Body
//
// =========================================================================
/**
	 * テンプレートを扱うクラス
	 * <p>
	 * <a href="h5.core.view.html">h5.core.view</a>がこのクラスを実装しています。また、<a
	 * href="h5.core.view.html#createView">h5.core.view.createView()</a>でこのクラスのインスタンスを生成できます。
	 * </p>
	 * <p>
	 * また、コントローラは内部にController.viewインスタンスを持ち、コントローラ内であればthis.viewで参照することができます。
	 * </p>
	 * <p>
	 * コントローラの持つViewについての詳細は、<a href="Controller.view.html">Controller.view</a>を参照してください。
	 * </p>
	 *
	 * @class
	 * @name View
	 */function View(){ /**
		 * キャッシュしたテンプレートを保持するオブジェクト
		 *
		 * @private
		 * @name __cachedTemplates
		 * @memberOf View
		 */this.__cachedTemplates={};}$.extend(View.prototype,{ /**
		 * 指定されたパスのテンプレートファイルを非同期で読み込みキャッシュします。<br>
		 * このメソッドでは、通信エラー発生時に自動リトライは行いません（ver.1.1.4現在。将来この動作は変更される可能性があります）。
		 *
		 * @memberOf View
		 * @name load
		 * @function
		 * @param {String|String[]} resourcePaths テンプレートファイル(.ejs)のパス (配列で複数指定可能)
		 * @returns {Promise} promiseオブジェクト
		 */load:function load(resourcePaths){var dfd=getDeferred();var paths=null; // resourcePathsが文字列か配列でなかったらエラーを投げます。
switch($.type(resourcePaths)){case 'string':if(!$.trim(resourcePaths)){throwFwError(ERR_CODE_INVALID_FILE_PATH);}paths=[resourcePaths];break;case 'array':paths=resourcePaths;if(paths.length===0){throwFwError(ERR_CODE_INVALID_FILE_PATH);}for(var i=0,len=paths.length;i<len;i++){if(!isString(paths[i])){throwFwError(ERR_CODE_INVALID_FILE_PATH);}else if(!$.trim(paths[i])){throwFwError(ERR_CODE_INVALID_FILE_PATH);}}break;default:throwFwError(ERR_CODE_INVALID_FILE_PATH);}var promises=[];for(var i=0,l=paths.length;i<l;i++){promises.push(h5.res.get(paths[i]));}var view=this;waitForPromises(promises,function(resources){ // viewにテンプレートを登録
resources=isArray(resources)?resources:[resources]; // 先に全てのテンプレートが登録できるかどうかをチェック
// チェックしながら登録するテンプレートを列挙する
var validTemplates=[];var invalidTemplate;for(var i=0,l=resources.length;i<l;i++){var templates=resources[i].templates;for(var j=0,len=templates.length;j<len;j++){if(!view.isValid(templates[j].content)){invalidTemplate=templates[j];break;}validTemplates.push(templates[j]);}if(invalidTemplate){break;}}if(invalidTemplate){try{ // invalidなテンプレートがあったらエラーオブジェクトを取得してreject
view.register(invalidTemplate.id,invalidTemplate.content);}catch(e){ // 登録でエラーが発生したらrejectする
// detailにエラーが発生した時のリソースのurlとpathを追加する
e.detail.url=resources[i].url;e.detail.path=resources[i].path;return dfd.reject(e);}} // 全てvalidならすべてのテンプレートを登録
for(var i=0,l=validTemplates.length;i<l;i++){view.register(validTemplates[i].id,validTemplates[i].content);} // TODO doneハンドラに渡す引数を作成
dfd.resolve();},function(e){fwLogger.error(e.message);dfd.reject(e);});return dfd.promise();}, /**
		 * Viewインスタンスに登録されている、利用可能なテンプレートのIDの配列を返します。
		 *
		 * @memberOf View
		 * @name getAvailableTemplates
		 * @function
		 * @returns {String[]} テンプレートIDの配列
		 */getAvailableTemplates:function getAvailableTemplates(){var ids=[];for(var id in this.__cachedTemplates){ids.push(id);}return ids;}, /**
		 * Viewインスタンスに、指定されたIDとテンプレート文字列からテンプレートを1件登録します。
		 * <p>
		 * 指定されたIDのテンプレートがすでに存在する場合は上書きします。 templateStringが不正な場合はエラーを投げます。
		 * </p>
		 *
		 * @memberOf View
		 * @name register
		 * @function
		 * @param {String} templateId テンプレートID
		 * @param {String} templateString テンプレート文字列
		 */register:function register(templateId,templateString){if($.type(templateString)!=='string'){throwFwError(ERR_CODE_TEMPLATE_COMPILE_NOT_STRING,null,{id:templateId});}else if(!isString(templateId)||!$.trim(templateId)){throwFwError(ERR_CODE_TEMPLATE_INVALID_ID,[]);} /* del begin */if(this.__cachedTemplates[templateId]){fwLogger.info(FW_LOG_TEMPLATE_OVERWRITE,templateId);} /* del end */try{var compiledTemplate=new EJS.Compiler(templateString,DELIMITER);compiledTemplate.compile();this.__cachedTemplates[templateId]=compiledTemplate.process;}catch(e){var lineNo=e.lineNumber;var msg=lineNo?' line:'+lineNo:'';throwFwError(ERR_CODE_TEMPLATE_COMPILE_SYNTAX_ERR,[msg,e.message],{id:templateId});}}, /**
		 * テンプレート文字列が、コンパイルできるかどうかを返します。
		 *
		 * @memberOf View
		 * @name isValid
		 * @function
		 * @returns {Boolean} 第一引数に渡されたテンプレート文字列がコンパイル可能かどうか。
		 */isValid:function isValid(templateString){try{var compiledTemplate=new EJS.Compiler(templateString,DELIMITER);compiledTemplate.compile();return true;}catch(e){return false;}}, /**
		 * パラメータで置換された、指定されたテンプレートIDのテンプレートを取得します。
		 * <p>
		 * 取得するテンプレート内に置換要素([%= %])が存在する場合、パラメータを全て指定してください。
		 * </p>
		 * <p>
		 * templateIdがこのViewインスタンスで利用可能でなければエラーを投げます。
		 * </p>
		 * <p> ※ ただし、コントローラが持つviewインスタンスから呼ばれた場合、templateIdが利用可能でない場合は再帰的に親コントローラをたどり、
		 * 親コントローラが持つViewインスタンスで利用可能かどうか確認します。 利用可能であれば、そのインスタンスのview.get()を実行します。
		 * </p>
		 * <p>
		 * 一番上の親のViewインスタンスまで辿ってもtemplateId利用可能でなければ場合はh5.core.view.get()を実行します。
		 * h5.core.viewでtemplateIdが利用可能でなければエラーを投げます。
		 * </p>
		 * <p>
		 * <a href="#update">update()</a>, <a href="#append">append()</a>, <a
		 * href="#prepend">prepend()</a>についても同様です。
		 * </p>
		 *
		 * @memberOf View
		 * @name get
		 * @function
		 * @param {String} templateId テンプレートID
		 * @param {Object} [param] パラメータ(オブジェクトリテラルで指定)
		 * @returns {String} テンプレート文字列
		 */get:function get(templateId,param){var cache=this.__cachedTemplates;if(!isString(templateId)||!$.trim(templateId)){throwFwError(ERR_CODE_TEMPLATE_INVALID_ID);}var template=cache[templateId];if(!template){throwFwError(ERR_CODE_TEMPLATE_ID_UNAVAILABLE,templateId);}var p=param?$.extend(true,{},param):{};var helper=p.hasOwnProperty('_h')?new EJS.Helpers(p):new EJS.Helpers(p,{_h:helperExtras});var ret=null;try{ret=template.call(p,p,helper);}catch(e){throwFwError(ERR_CODE_TEMPLATE_PROPATY_UNDEFINED,e.toString(),e);}return ret;}, /**
		 * 要素を指定されたIDのテンプレートで書き換えます。
		 * <p>
		 * templateIdがこのViewインスタンスで利用可能でなければエラーを投げますが、
		 * コントローラが持つviewインスタンスから呼ばれた場合は親コントローラのviewを再帰的にたどります。詳細は<a href="#get">get()</a>をご覧ください。
		 * </p>
		 *
		 * @memberOf View
		 * @name update
		 * @function
		 * @param {String|Element|jQuery} element DOM要素(セレクタ文字列, DOM要素, jQueryオブジェクト)
		 * @param {String} templateId テンプレートID
		 * @param {Object} [param] パラメータ
		 * @returns {jQuery} テンプレートが適用されたDOM要素(jQueryオブジェクト)
		 */update:function update(element,templateId,param){return getJQueryObj(element).html(this.get(templateId,param));}, /**
		 * 要素の末尾に指定されたIDのテンプレートを挿入します。
		 * <p>
		 * templateIdがこのViewインスタンスで利用可能でなければエラーを投げますが、
		 * コントローラが持つviewインスタンスから呼ばれた場合は親コントローラのviewを再帰的にたどります。詳細は<a href="#get">get()</a>をご覧ください。
		 * </p>
		 *
		 * @memberOf View
		 * @name append
		 * @function
		 * @param {Element|jQuery} element DOM要素(セレクタ文字列, DOM要素, jQueryオブジェクト)
		 * @param {String} templateId テンプレートID
		 * @param {Object} [param] パラメータ
		 * @returns {jQuery} テンプレートが適用されたDOM要素(jQueryオブジェクト)
		 */append:function append(element,templateId,param){return getJQueryObj(element).append(this.get(templateId,param));}, /**
		 * 要素の先頭に指定されたIDのテンプレートを挿入します。
		 * <p>
		 * templateIdがこのViewインスタンスで利用可能でなければエラーを投げますが、
		 * コントローラが持つviewインスタンスから呼ばれた場合は親コントローラのviewを再帰的にたどります。詳細は<a href="#get">get()</a>をご覧ください。
		 * </p>
		 *
		 * @memberOf View
		 * @name prepend
		 * @function
		 * @param {String|Element|jQuery} element DOM要素(セレクタ文字列, DOM要素, jQueryオブジェクト)
		 * @param {String} templateId テンプレートID
		 * @param {Object} [param] パラメータ
		 * @returns {jQuery} テンプレートが適用されたDOM要素(jQueryオブジェクト)
		 */prepend:function prepend(element,templateId,param){return getJQueryObj(element).prepend(this.get(templateId,param));}, /**
		 * 指定されたテンプレートIDのテンプレートが存在するか判定します。
		 *
		 * @memberOf View
		 * @name isAvailable
		 * @function
		 * @param {String} templateId テンプレートID
		 * @returns {Boolean} 判定結果(存在する: true / 存在しない: false)
		 */isAvailable:function isAvailable(templateId){return !!this.__cachedTemplates[templateId];}, /**
		 * 引数に指定されたテンプレートIDをもつテンプレートをキャッシュから削除します。 引数を指定しない場合はキャッシュされている全てのテンプレートを削除します。
		 *
		 * @memberOf View
		 * @name clear
		 * @param {String|String[]} templateIds テンプレートID
		 * @function
		 */clear:function clear(templateIds){if((typeof templateIds==='undefined'?'undefined':_typeof(templateIds))===TYPE_OF_UNDEFINED){this.__cachedTemplates={};return;}var templateIdsArray=null;switch($.type(templateIds)){case 'string':templateIdsArray=[templateIds];break;case 'array':if(!templateIds.length){throwFwError(ERR_CODE_TEMPLATE_INVALID_ID);}templateIdsArray=templateIds;break;default:throwFwError(ERR_CODE_TEMPLATE_INVALID_ID);}for(var i=0,len=templateIdsArray.length;i<len;i++){var id=templateIdsArray[i];if(!isString(id)||!$.trim(id)){throwFwError(ERR_CODE_TEMPLATE_INVALID_ID);} /* del begin */if(!this.__cachedTemplates[id]){fwLogger.warn(FW_LOG_TEMPLATE_NOT_REGISTERED,id);} /* del end */}for(var i=0,len=templateIdsArray.length;i<len;i++){delete this.__cachedTemplates[templateIdsArray[i]];}}, /**
		 * データバインドを開始します。
		 * <p>
		 * 注意:<br>
		 * このメソッドではバインド対象にコメントビューを指定できません。<br>
		 * コメントビューを使用したデータバインドは、コントローラが持つViewインスタンス(<a href="Controller.html#view">Controller.view</a>)から実行して下さい。
		 *
		 * @since 1.1.0
		 * @param {String|Element|Element[]|jQuery} element コメントビュー疑似セレクタ、またはDOM要素(セレクタ文字列, DOM要素,
		 *            DOM要素の配列, jQueryオブジェクト)。 DOM要素の配列を指定する場合、全ての要素ノードの親ノードが同じでなければいけません。
		 * @param {Object} context データコンテキストオブジェクト
		 * @memberOf View
		 * @name bind
		 * @function
		 * @returns {Binding}
		 */bind:function bind(element,context){var targetNodes=null;if(element==null){throwFwError(ERR_CODE_BIND_INVALID_TARGET);} // targetのチェック
if(isArray(element)){ //配列はDOMノードの配列であることを仮定
targetNodes=element;}else { //targetがDOM、セレクタ文字列の場合をまとめて扱う
//インラインテンプレートが指定された場合はコントローラ側のview.bindが予めノード化しているので
//ここに到達した時にはノードになっている
var $element=$(element);if($element.length===0){ // 要素がない、もしくは見つからない場合はエラー
throwFwError(ERR_CODE_BIND_INVALID_TARGET);} //bind()はルートノードが複数であることをサポートするので、lengthは1には限定しない
//ただし、これはappend, prepend等の動作を考慮したものである。
//つまり、全ての要素は同じノードを親として持っていることを前提としている。
//厳密にはチェックすべきだが、実際に問題になることはほとんどないだろうと考え行っていない。
targetNodes=$element.toArray();} // contextのチェック
if(context==null||(typeof context==='undefined'?'undefined':_typeof(context))!=='object'||isArray(context)||h5.core.data.isObservableArray(context)){throwFwError(ERR_CODE_BIND_CONTEXT_INVALID);}return h5internal.view.createBinding(targetNodes,context);}});var view=new View(); /**
	 * <a href="./View.html">View</a>クラスのインスタンスを生成します。
	 * <p>
	 * この関数はh5.core.viewに公開されたViewインスタンスのみが持ちます。この関数で作られたViewインスタンスはcreateView()を持ちません。
	 * </p>
	 *
	 * @name createView
	 * @memberOf h5.core.view
	 * @function
	 */view.createView=function(){return new View();}; /**
	 * HTMLに記述されたテンプレートを読み込む
	 * <p>
	 * HTMLにあるテンプレートが構文エラーの場合は、例外をそのままスローする。
	 */$(function(){$('script[type="text/ejs"]').each(function(){var templateId=$.trim(this.id);var templateText=$.trim(this.innerHTML);if(templateText.length===0||!templateId){return;}var compiledTemplate=new EJS.Compiler(templateText,DELIMITER);compiledTemplate.compile();view.__cachedTemplates[templateId]=compiledTemplate.process;});}); // =============================
// Expose to window
// =============================
/**
	 * <p>
	 * グローバルに公開されているViewクラスのインスタンスです。
	 * </p>
	 * <p>
	 * h5.core.viewは、<a href="View.html">View</a>クラスであり、<a href="View.html">View</a>クラスのメソッドを持ちます。<br>
	 * ただし、h5.core.viewはViewクラスを生成するためのcreateViewメソッドを持ち、生成されたViewクラスはcreateViewメソッドを持ちません。
	 * </p>
	 *
	 * @name view
	 * @memberOf h5.core
	 * @see View
	 * @namespace
	 */h5.u.obj.expose('h5.core',{view:view});})(); /* h5.core.view_binding */(function(){ // =========================================================================
//
// Constants
//
// =========================================================================
// =============================
// Production
// =============================
var DATA_H5_BIND='data-h5-bind';var DATA_H5_CONTEXT='data-h5-context';var DATA_H5_LOOP_CONTEXT='data-h5-loop-context';var DATA_H5_DYN_CTX='data-h5-dyn-ctx';var DATA_H5_DYN_VID='data-h5-dyn-vid';var DATA_H5_DYN_BIND_ROOT='data-h5-dyn-bind-root'; /** 初期状態のclassNameを保存しておく属性 */var DATA_H5_DYN_CN='data-h5-dyn-cn'; /** 1つのバインド指定のターゲットとソースのセパレータ（「text:prop」の「:」） */var BIND_DESC_TARGET_SEPARATOR=':'; /** 複数のバインド指定のセパレータ（「text:prop1; attr(href):prop2」の「;」） */var BIND_DESC_SEPARATOR=';'; /** バインドターゲットのカッコ内を取得するための正規表現（「attr(href)」の「href」を取得） */var BIND_TARGET_DETAIL_REGEXP=/\(\s*(\S+)\s*\)/; // エラーコード
/** data-h5-bindでattr, styleバインドを行う場合は、「style(color)」のように具体的なバインド先を指定する必要があります。 */var ERR_CODE_REQUIRE_DETAIL=7100; /** 不明なバインド先が指定されました。html,style等決められたバインド先を指定してください。 */var ERR_CODE_UNKNOWN_BIND_DIRECTION=7101; /** コンテキスト値が不正です。data-h5-contextの場合はオブジェクト、data-h5-loop-contextの場合は配列を指定してください。 */var ERR_CODE_INVALID_CONTEXT_SRC=7102; // =============================
// Development Only
// =============================
var fwLogger=h5.log.createLogger('h5.core.view_binding'); /* del begin */var errMsgMap={};errMsgMap[ERR_CODE_REQUIRE_DETAIL]='data-h5-bindでattr, styleバインドを行う場合は、「style(color)」のように具体的なバインド先を指定する必要があります。';errMsgMap[ERR_CODE_UNKNOWN_BIND_DIRECTION]='不明なバインド先が指定されました。html,style等決められたバインド先を指定してください。';errMsgMap[ERR_CODE_INVALID_CONTEXT_SRC]='コンテキスト値が不正です。data-h5-contextの場合はオブジェクト、data-h5-loop-contextの場合は配列を指定してください。';addFwErrorCodeMap(errMsgMap); /* del end */ // =========================================================================
//
// Cache
//
// =========================================================================
// =========================================================================
//
// Privates
//
// =========================================================================
// =============================
// Variables
// =============================
var contextUid=0; /** viewUidカウンタ */var viewUid=0; /** bindUidカウンタ */var bindRootId=0; /** グローバルなbindRootIdからBindingインスタンスへのマップ */var bindRootIdToBindingMap={}; //MEMO バインド関係のマップのたどり方
//(1)ソース -> 特定のビュー： srcToViewMap[srcIndex][viewUid] がビュー。
//  srcIndexはbinding._usingContexts配列のソースオブジェクトのインデックス位置。
//  srcToViewMap[i][j]の中身はノードの配列。
//(2)特定のビュー -> ソース： viewUid経由でたどれる。viewToSrcMap[viewUid] がソースオブジェクト。
//  ビュー -> ソースはbindingインスタンス単位ではなく、グローバルに管理（ビュー自体が実質シングルトンなので）。
//(3)loop-contextの各要素と対応する（要素ごとの）ビュー：
//  binding._loopElementsMap[viewUid] = loopElementsArray;
//  loopElementsArrayのi番目にはビューのノードの配列が入っていて、ソース配列のi番目と対応。
/**
	 * ビュー（viewUid） -> ソースオブジェクト のマップ。many:1。キーはviewUid、値はソースオブジェクト。
	 */var viewToSrcMap={}; // =============================
// Functions
// =============================
var cloneNodeDeeply;(function(){var cloneTest=document.createElement('div');cloneTest.h5Dummy='a';var cloned=cloneTest.cloneNode(false);var useOuterHtmlClone=cloned.h5Dummy!==undefined;cloneTest.h5Dummy=undefined;if(useOuterHtmlClone){cloned.h5Dummy=undefined; //IE7の場合、cloneNodeでノードを複製すると、$().find()でクローンした要素を取得できなくなる場合があった（詳細な原因は不明）。
//また、IE8以下、またはIE9でもDocModeが8以下の場合、ノードに付加したJSプロパティやattachEventのイベントがクローン先にもコピーされてしまう。
//そのため、cloneNode()した結果JSプロパティがコピーされる環境（== DocMode<=8の環境、を想定）では
//エレメントのコピーはouterHTMLを基にjQueryによるノード"生成"で行う（!= クローン）ようにしている。
//ノードの生成は、srcNodeのownerDocumentから生成し、documentが異なっても対応できるようにしている
cloneNodeDeeply=function cloneNodeDeeply(srcNode){var doc=srcNode.ownerDocument;if(srcNode.nodeType===NODE_TYPE_ELEMENT){ //IE8以下で<li>等のouterHTMLを取得するとタグの前に改行が入る場合がある
//（<li>タグの前の空白文字が改行になる模様)
// scriptタグはクローンしない(parseHTMLの第3引数指定無し(false)でscriptはコピーしない)
return $($.trim(srcNode.outerHTML),doc)[0];}return srcNode.cloneNode(true);};}else { //その他のブラウザでは、cloneNodeを使ってノードをクローンする。cloneNodeの方が、通常パフォーマンスは良いため。
cloneNodeDeeply=function cloneNodeDeeply(srcNode){return srcNode.cloneNode(true);};}})();function getElemAttribute(node,attr){if(!node||node.nodeType!==NODE_TYPE_ELEMENT){return undefined;}return node.getAttribute(attr);}function setElemAttribute(node,attr,value){node.setAttribute(attr,value);}function removeElemAttribute(node,attr){node.removeAttribute(attr);}function toArray(pseudoArray){if(!pseudoArray){return null;}var ret=[];for(var i=0,len=pseudoArray.length;i<len;i++){ret.push(pseudoArray[i]);}return ret;}function getSrcFromView(viewUid){return viewToSrcMap[viewUid];} /**
	 * viewUidを返す。返される値は、1回のFWの生存期間中一意。（リロードされるとリセット）
	 */function getViewUid(){return viewUid++;}function queryQualifiedElements(rootNode,attrs,value,includeRoot){var ret=[];var attrArray=wrapInArray(attrs);if(includeRoot===true){ //ルートノードを含める場合は、自分をルートとして再帰
queryQualifiedElementsInner(ret,rootNode,attrArray,value);return ret;} //ルートノードを含めない場合は、子要素をそれぞれルートにして処理
var childNodes=rootNode.childNodes;for(var i=0,len=childNodes.length;i<len;i++){queryQualifiedElementsInner(ret,childNodes[i],attrArray,value);}return ret;}function queryQualifiedElementsInner(ret,rootNode,attrs,value){if(rootNode.nodeType!==NODE_TYPE_ELEMENT){return;}for(var i=0,len=attrs.length;i<len;i++){var attrValue=rootNode.getAttribute(attrs[i]);if((typeof value==='undefined'?'undefined':_typeof(value))===TYPE_OF_UNDEFINED){if(attrValue!==null){ret.push(rootNode);break;}}else { //IE7以下では、setAttribute()でdata-*属性に数値を入れると、getAttr()したとき型がNumberになっている。
//しかし、outerHTMLでノードをクローンした場合、data-*属性の値は文字列型になっている。
//そのため、ここでは厳密等価ではなく通常の等価比較を行っている。
if(attrValue!==null&&attrValue==value){ret.push(rootNode);break;}}}if(rootNode.childNodes.length>0){var childNodes=rootNode.childNodes;for(var i=0,len=childNodes.length;i<len;i++){queryQualifiedElementsInner(ret,childNodes[i],attrs,value);}}} /**
	 * 別のコンテキストに属していない（＝現在のコンテキストに属している）バインド対象要素を返します。ネストしたコンテキストの中の対象要素は含まれません。
	 *
	 * @param {Node|Node[]} rootNodes ルート要素、またはルート要素の配列
	 * @returns {jQuery} 別のコンテキストに属していないバインド対象要素
	 */function $getBindElementsInContext(rootNodes,isMultiRoot){rootNodes=wrapInArray(rootNodes);var bindElements=[];for(var i=0,len=rootNodes.length;i<len;i++){var rootNode=rootNodes[i]; //ルート要素がエレメントでない場合は何もしない
if(rootNode.nodeType!==NODE_TYPE_ELEMENT){continue;} //バインディングルートの場合は、
//rootNodeは「仮想の親要素（バインドルート）」の子要素として考える必要がある。
//ルート要素で別のコンテキストが指定されている場合はそれ以下のノードは絶対に含まれない
if(isMultiRoot===true&&(getElemAttribute(rootNode,DATA_H5_CONTEXT)!=null||getElemAttribute(rootNode,DATA_H5_LOOP_CONTEXT)!=null)){continue;}var candidateBindElems=queryQualifiedElements(rootNode,DATA_H5_BIND,undefined,true);for(var j=0,cndBindElemsLen=candidateBindElems.length;j<cndBindElemsLen;j++){var isInCurrentContext=true;for(var node=candidateBindElems[j];node!=null;node=node.parentNode){if(node===rootNode){break;}if(getElemAttribute(node,DATA_H5_CONTEXT)!=null||getElemAttribute(node,DATA_H5_LOOP_CONTEXT)!=null){isInCurrentContext=false;break;}}if(isInCurrentContext){bindElements.push(candidateBindElems[j]);}}}return $(bindElements);} /**
	 * 自分のコンテキストの直接の子供であるdata-context（またはdata-loop-context）を返します。
	 */function $getChildContexts(rootNodes,dataContextAttr,isMultiRoot){var childContexts=[];for(var i=0,len=rootNodes.length;i<len;i++){var rootNode=rootNodes[i]; //ルート要素がエレメントでない場合は別のコンテキストである可能性はない
if(rootNode.nodeType!==NODE_TYPE_ELEMENT){continue;}if(isMultiRoot===true){ //このrootNodesがバインディングのルートノードの場合（＝仮想的なルートノードの子要素の場合）
//指定されたコンテキストが設定されていれば必ず直接の子供
if(rootNode.getAttribute(dataContextAttr)!=null){childContexts.push(rootNode);continue;} //コンテキストが設定されていれば、その子孫のノードは必ず別のコンテキストに属していることになる
if(getElemAttribute(rootNode,DATA_H5_CONTEXT)!=null||getElemAttribute(rootNode,DATA_H5_LOOP_CONTEXT)!=null){continue;}}var candidateContextElems=queryQualifiedElements(rootNode,dataContextAttr,undefined,false);for(var j=0,cndCtxElemsLen=candidateContextElems.length;j<cndCtxElemsLen;j++){ // jQuery1.10.1で、ポップアップウィンドウ先の要素をセレクタで取得すると、jQuery内部(setDocument箇所)でエラーになる
// jQuery1.10.1でのエラー回避のためjQueryを使わないで親ノードを取得している
var contextElem=$(candidateContextElems[j])[0];var contextParent=contextElem.parentNode;if(getElemAttribute(contextParent,DATA_H5_CONTEXT)==null&&getElemAttribute(contextParent,DATA_H5_LOOP_CONTEXT)==null||contextParent===rootNode){childContexts.push(contextElem);}}}return $(childContexts);}function isObservableItem(obj){ //TODO 厳密に判定
// ObservableItemの場合もtrueを返す
if(obj&&obj.addEventListener&&obj.getModel&&!isArray(obj)&&!h5.core.data.isObservableArray(obj)||h5.core.data.isObservableItem(obj)){return true;}return false;}function addViewUid(rootNodes,viewUid){for(var i=0,len=rootNodes.length;i<len;i++){var n=rootNodes[i];if(n.nodeType===NODE_TYPE_ELEMENT){setElemAttribute(n,DATA_H5_DYN_VID,viewUid);}}} /**
	 * data-loop-contextによるループバインドを行う。（applyBindingの中からのみ呼ばれる）
	 *
	 * @param {Binding} binding バインディングインスタンス
	 * @param {Node|Node[]} rootNodes
	 *            データコンテキストを持つルートノード、またはルートノードの配列（テキストノードやコメントノードなどELEMENT以外が含まれる場合も有る）
	 * @param {Object} context データコンテキスト
	 */function applyLoopBinding(binding,rootNodes,context){var viewUid=getViewUid(); //loop-contextの場合は、ループのルートノードは必ず単一のノード
var loopRootElement=rootNodes[0]; //ループ前に一旦内部要素をすべて外す
$(loopRootElement).empty();if(!context){ //contextがない場合はループを一切行わない（BindingEntryもつけない）
return;}if(!(isArray(context)||h5.core.data.isObservableArray(context))){ //data-h5-loop-contextの場合contextは配列でなければならない
throwFwError(ERR_CODE_INVALID_CONTEXT_SRC);}addViewUid(rootNodes,viewUid);binding._addBindingEntry(context,loopRootElement,viewUid);if(h5.core.data.isObservableArray(context)&&!binding._isWatching(context)){var changeListener=function changeListener(event){binding._observableArray_changeListener(event);};binding._listeners[binding._getContextIndex(context)]=changeListener;context.addEventListener('change',changeListener);} //ループルートノードに対応する子ノードリストを、保存しているビューソースから取り出す
var loopDynCtxId=getElemAttribute(loopRootElement,DATA_H5_DYN_CTX);var srcRootChildNodes=toArray(binding._getSrcCtxNode(loopDynCtxId).childNodes); //このループコンテキストの各要素に対応するノード（配列）を格納する配列
var loopElementsArray=[];binding._loopElementsMap[viewUid]=loopElementsArray; //appendChildの呼び出し回数削減。
//ループ単位ごとにappendChildしてdocumentにバインドする（＝Fragmentは都度空になる）ので、使いまわしている。
//対象要素のdocumentオブジェクトを使用する
var fragment=loopRootElement.ownerDocument.createDocumentFragment();var getContextElement=context.get?function(idx){return context.get(idx);}:function(idx){return context[idx];};for(var i=0,len=context.length;i<len;i++){var loopNodes=[]; //1要素分のノードのクローンを作成
for(var j=0,childLen=srcRootChildNodes.length;j<childLen;j++){var clonedInnerNode=cloneNodeDeeply(srcRootChildNodes[j]); //deep copy
loopNodes.push(clonedInnerNode);fragment.appendChild(clonedInnerNode);} //配列1要素分のノードリストを保存
loopElementsArray[i]=loopNodes; //IE6で、documentツリーにぶら下がっていない状態で属性操作を行うとそれが反映されない場合がある
//（例えばinput-checkboxのcheckedを操作してもそれが反映されない）
//そのため、先にツリーにappendしてからバインディングを行う
loopRootElement.appendChild(fragment); //配列1要素分のバインディングを実行
applyBinding(binding,loopNodes,getContextElement(i),false,true);}} /**
	 * データバインドを行う。context単位にsrc/viewの対応を保存。可能ならイベントハンドラを設定して、変更伝搬させる
	 *
	 * @param {Binding} binding バインディングインスタンス
	 * @param {Node|Node[]} rootNodes
	 *            データコンテキストを持つルートノード、またはルートノードの配列（テキストノードやコメントノードなどELEMENT以外が含まれる場合も有る）
	 * @param {Object} context データコンテキスト
	 * @param {Boolean} isLoopContext ループコンテキストかどうか
	 */function applyBinding(binding,rootNodes,context,isLoopContext,isMultiRoot){ //配列化（要素が直接来た場合のため）
rootNodes=wrapInArray(rootNodes);if(isLoopContext){ //loop-contextの場合はループ用の処理を行う
//loop-contextの場合、ルートノードは必ず単一の要素
applyLoopBinding(binding,rootNodes,context);return;} //以下はloop-contextでない場合
var viewUid=getViewUid();if(context){ //TODO loop-contextにおいて個々のループ単位のコンテキスト自身をcontextやloop-contextにバインドする方法を追加した場合
//ここのチェックルーチンは変更になる
if((typeof context==='undefined'?'undefined':_typeof(context))!=='object'||isArray(context)||h5.core.data.isObservableArray(context)){ //data-h5-contextの場合contextはオブジェクトでなければならない（配列は不可）
throwFwError(ERR_CODE_INVALID_CONTEXT_SRC);} //コンテキストが存在する場合
//エレメントについては、ビュー->ソースをすぐにひけるようdata属性でviewUidを付加しておく
addViewUid(rootNodes,viewUid);binding._addBindingEntry(context,rootNodes,viewUid);} //context===nullの場合に子要素のバイン���ィングを解除する必要はない。
//現状の実装では、初回はバインディングはまだ行われておらず、
//2回目以降Itemのpropが変わった場合などで再バインドされるときは
//バインドされていないオリジナルに対してバインドが再実行されるので、
//「バインド済みのものに対して別のコンテキストを割り当てる」ことはない。
var isItem=isObservableItem(context);if(isItem&&!binding._isWatching(context)){ //まだこのバインディングが監視していないオブジェクトの場合は監視を始める。
//ソースデータコンテキストから対応するすべてのビューを知ることができるので、
//ハンドラは1アイテムにつき1つバインドすれば十分。
var changeListener=function changeListener(event){binding._observableItem_changeListener(event);};binding._listeners[binding._getContextIndex(context)]=changeListener;context.addEventListener('change',changeListener);} //自分のコンテキストに属しているバインディング対象要素を探す
//（rootElement自体がバインド対象になっている場合もある）
var $bindElements=$getBindElementsInContext(rootNodes,isMultiRoot); //自コンテキストに属する各要素のデータバインドを実行
$bindElements.each(function(){doBind(this,context,isItem);}); //ネストした子data-context, data-loop-contextのデータバインドを実行
applyChildBinding(binding,rootNodes,context,false,isMultiRoot);applyChildBinding(binding,rootNodes,context,true,isMultiRoot);}function applyChildBinding(binding,rootNodes,context,isLoopContext,isMultiRoot){var dataContextAttr=isLoopContext?'data-h5-loop-context':'data-h5-context'; //自分のコンテキストに属するdata-contextを探す
var $childContexts=$getChildContexts(rootNodes,dataContextAttr,isMultiRoot); //内部コンテキストについてapplyBindingを再帰的に行う
$childContexts.each(function(){var childContextProp=getElemAttribute(this,dataContextAttr); //contextがisObservableItemならgetでchildContextを取得する
//TODO getContextValue()などで統一するか
var childContext=null;if(context){childContext=isObservableItem(context)?context.get(childContextProp):context[childContextProp];}applyBinding(binding,this,childContext,isLoopContext);});} /**
	 * データバインドの指定（data-bind属性の値）をパースします。
	 *
	 * @param {String} bindDesc バインド指定（data-bind属性の値）
	 * @returns {Object} パース済みのバインド指定
	 */function parseBindDesc(bindDesc){var splitDescs=bindDesc.split(BIND_DESC_SEPARATOR);var target=[];var targetDetail=[];var prop=[];for(var i=0,len=splitDescs.length;i<len;i++){var desc=splitDescs[i];if(desc.indexOf(BIND_DESC_TARGET_SEPARATOR)===-1){var trimmed=$.trim(desc);if(trimmed.length>0){ //ターゲット指定がない＝自動バインドの場合
target.push(null);targetDetail.push(null);prop.push($.trim(desc));}}else {var sd=desc.split(BIND_DESC_TARGET_SEPARATOR);var trimmedTarget=$.trim(sd[0]);var trimmedProp=$.trim(sd[1]);var trimmedDetail=null;var detail=BIND_TARGET_DETAIL_REGEXP.exec(trimmedTarget);if(detail){ //attr(color) -> attr, colorに分離してそれぞれ格納
trimmedDetail=detail[1];trimmedTarget=/(\S+)[\s\(]/.exec(trimmedTarget)[1];}if(trimmedTarget.length>0&&trimmedProp.length>0){target.push(trimmedTarget);targetDetail.push(trimmedDetail);prop.push(trimmedProp);}}}var ret={t:target,d:targetDetail,p:prop};return ret;} /**
	 * 指定されたエレメントに対して、data-bindで指示された方法で値をセットします。
	 */function doBind(element,context,isItem){var bindDesc=parseBindDesc(getElemAttribute(element,DATA_H5_BIND));var targets=bindDesc.t;var details=bindDesc.d;var props=bindDesc.p;var elementLowerName=element.tagName.toLowerCase();var $element=$(element); //targetsとpropsのlengthは必ず同じ
for(var i=0,len=targets.length;i<len;i++){var target=targets[i];var detail=details[i];var prop=props[i];var value=null;if(context){ //contextが存在する場合は値を取得。（contextがnullの場合は初期化を行う）
if(isItem){value=context.get(prop);}else {value=context[prop];}}if(target==null){ //自動指定は、inputタグならvalue属性、それ以外ならテキストノードをターゲットとする
if(elementLowerName==='input'){target='attr';detail='value';}else {target='text';}}switch(target){case 'text':value==null?$element.text(''):$element.text(value);break;case 'html':value==null?$element.html(''):$element.html(value);break;case 'class':var origClassName=getElemAttribute(element,DATA_H5_DYN_CN);var isOrigClassEmpty=origClassName==null;var space=isOrigClassEmpty?'':' ';var allowPutValue=false;if(value){ //バインドするクラス名がすでに初期状態のclassに書かれている場合は二重にセットしないようにする
var classTester=new RegExp('\\s'+value+'\\s'); //クラスが１つしか書いていない場合もあるので、正規表現でチェックしやすいよう前後にスペースを付けてチェック
allowPutValue=!classTester.test(' '+origClassName+' ');} //初期状態のclassもバインドの値も空の場合は
//jQueryのremoveClass()に倣って空文字を代入してclassをクリアする
$element[0].className=(isOrigClassEmpty?'':origClassName)+(allowPutValue?space+value:'');break;case 'attr':if(!detail){throwFwError(ERR_CODE_REQUIRE_DETAIL);} // inputのvalue属性の操作はval()メソッドを使う。valueがnullならval('')で空にする。
// attrを使うと表示に反映されないため
if(elementLowerName==='input'&&detail==='value'){value==null?$element.val(''):$element.val(value);}else { //ここのremoveAttr(), attr()はユーザーによる属性操作なので、jQueryのattr APIを使う
value==null?$element.removeAttr(detail):$element.attr(detail,value);}break;case 'style':if(!detail){throwFwError(ERR_CODE_REQUIRE_DETAIL);} //contextがnullの場合valueはnull。styleはcontext===nullの場合当該スタイルを削除するので
//このコードでスタイルが削除される（よってcontextによる分岐は不要）。
value==null?$element.css(detail,''):$element.css(detail,value);break;default:throwFwError(ERR_CODE_UNKNOWN_BIND_DIRECTION);}}} /**
	 * 指定されたノードをDOMツリーから削除し、同時にアンバインドします。
	 */function removeDomNodes(binding,parent,nodesToRemove){for(var i=0,len=nodesToRemove.length;i<len;i++){var n=nodesToRemove[i];parent.removeChild(n);binding._removeBinding(n);}}function cloneChildNodes(parentNode){var childNodes=parentNode.childNodes;var ret=[];for(var i=0,len=childNodes.length;i<len;i++){ret.push(cloneNodeDeeply(childNodes[i]));}return ret;}function addLoopChildren(binding,loopElements,srcCtxRootNode,method,methodArgs){ //追加される全てのノードを持つフラグメント。
//Element.insertBeforeでフラグメントを挿入対象にすると、フラグメントに入っているノードの順序を保って
//指定した要素の前に挿入できる。従って、unshift()の際insertBeforeを一度呼ぶだけで済む。
var fragment=srcCtxRootNode.ownerDocument.createDocumentFragment();var newLoopNodes=[];for(var i=0,argsLen=methodArgs.length;i<argsLen;i++){var newChildNodes=cloneChildNodes(srcCtxRootNode);newLoopNodes[i]=newChildNodes;for(var j=0,newChildNodesLen=newChildNodes.length;j<newChildNodesLen;j++){fragment.appendChild(newChildNodes[j]);}applyBinding(binding,newChildNodes,methodArgs[i]);}Array.prototype[method].apply(loopElements,newLoopNodes);return fragment;} /**
	 * 配列のビューをリバースします。loopNodesはリバース前の配列であることを前提とします。<br>
	 */function reverseLoopNodes(parent,loopNodes){ //一旦すべてのノードをparentから外す
while(parent.firstChild){parent.removeChild(parent.firstChild);} //配列要素をリバースしたのと同等になるようにノードを再挿入する
for(var i=0,len=loopNodes.length;i<len;i++){var nodesPerIndex=loopNodes[i];for(var j=nodesPerIndex.length-1;j>=0;j--){parent.insertBefore(nodesPerIndex[j],parent.firstChild);}}}function spliceLoopNodes(binding,parent,srcArray,methodArgs,loopNodes,srcCtxRootNode){var methodArgsLen=methodArgs.length;if(methodArgsLen===0){return;}var startPos=methodArgs[0];var removePos=startPos;var removeEnd;if(methodArgsLen===1){ //spliceの第2引数省略時は、start以降すべての要素を削除
removeEnd=srcArray.length;}else { //spliceの第2引数は削除する個数
removeEnd=removePos+methodArgs[1];} //指定されたインデックスに対応するDOMノードを削除
for(;removePos<removeEnd;removePos++){var nodesPerIndex=loopNodes[removePos]; //配列がスパースである場合やsplice()で実際の要素数以上の個数を削除しようとしている場合、
//ループノードがない場合が考えられるのでチェックする
if(nodesPerIndex){removeDomNodes(binding,parent,nodesPerIndex);}} //まず、削除のみを行う
loopNodes.splice(startPos,methodArgs[1]);if(methodArgsLen<=2){ //追加する要素がなければ削除だけ行って終了
return;}var insertionMarkerNode;var loopNodesLen=loopNodes.length;if(loopNodesLen===0||startPos===0){ //全ての要素が削除された場合、またはstartが0の場合は先頭に追加する
//全要素が削除されている場合firstChildはnullになっているはず
insertionMarkerNode=parent.firstChild;}else if(startPos>=loopNodesLen){ //startPosがloopNodesの長さより大きい場合はノードは末尾に挿入
//insertBefore()は、挿入位置がnullの場合は末尾挿入
insertionMarkerNode=null;}else { //要素が残っている場合は、startの前に追加する
insertionMarkerNode=loopNodes[startPos][0];} //以下は要素の挿入がある場合
//spliceの挙動(on Chrome22)：
//・startがlengthを超えている場合：要素の削除は起こらない、要素は末尾に挿入される、lengthは挿入した分だけ（startで指定したインデックスに入るわけではない）
//・countが省略された場合：start以降の全要素を削除
//・countがlengthを超えている場合：start以降の全要素が削除される
//・挿入要素がある場合：startの位置にinsertBefore（startがlengthを超えている場合は末尾に挿入）
var fragment=srcCtxRootNode.ownerDocument.createDocumentFragment(); //loopNodesに対するspliceのパラメータ。要素の挿入を行うため、あらかじめstartPosと削除数0を入れておく
var spliceArgs=[startPos,0]; //新たに挿入される要素に対応するノードを生成
for(var i=2,len=methodArgsLen;i<len;i++){var newChildNodes=cloneChildNodes(srcCtxRootNode);for(var j=0,newChildNodesLen=newChildNodes.length;j<newChildNodesLen;j++){fragment.appendChild(newChildNodes[j]);}applyBinding(binding,newChildNodes,methodArgs[i]);spliceArgs.push(newChildNodes);} //DOMツリーの該当位置にノードを追加
parent.insertBefore(fragment,insertionMarkerNode); //指定された位置に要素を挿入する
Array.prototype.splice.apply(loopNodes,spliceArgs);} /**
	 * 指定されたループコンテキスト以下のDOMツリーを再構築します。既存のDOMノードは削除されます。
	 * このメソッドはObservableArrayの更新時のみ呼び出されることを想定しています。
	 */function refreshLoopContext(binding,srcArray,loopRootNode,loopNodes,srcCtxNode){ //現在のビューのすべての要素を外す
for(var i=0,len=loopNodes.length;i<len;i++){removeDomNodes(binding,loopRootNode,loopNodes[i]);} //TODO addLoopChildrenとコード共通化
//追加される全てのノードを持つフラグメント。
//Element.insertBeforeでフラグメントを挿入対象にすると、フラグメントに入っているノードの順序を保って
//指定した要素の前に挿入できる。従って、unshift()の際insertBeforeを一度呼ぶだけで済む。
var fragment=loopRootNode.ownerDocument.createDocumentFragment();var newLoopNodes=[];for(var i=0,srcLen=srcArray.length;i<srcLen;i++){var newChildNodes=cloneChildNodes(srcCtxNode);newLoopNodes[i]=newChildNodes;for(var j=0,newChildNodesLen=newChildNodes.length;j<newChildNodesLen;j++){fragment.appendChild(newChildNodes[j]);}applyBinding(binding,newChildNodes,srcArray.get(i));}loopRootNode.appendChild(fragment);return newLoopNodes;} // =========================================================================
//
// Body
//
// =========================================================================
function Binding__observableArray_changeListener(event){var views=this._getViewsFromSrc(event.target);if(!views){return;} //(3)loop-contextの各要素と対応する（要素ごとの）ビュー：
//binding._loopElementsMap[viewUid] = loopElementsArray;
//loopElementsArrayのi番目にはビューのノードの配列が入っていて、ソース配列のi番目と対応。
for(var viewUid in views){if(!views.hasOwnProperty(viewUid)){continue;}var loopRootNode=views[viewUid];var srcCtxNode=this._getSrcCtxNode(getElemAttribute(loopRootNode,DATA_H5_DYN_CTX));var loopNodes=this._loopElementsMap[viewUid];switch(event.method){case 'set':spliceLoopNodes(this,loopRootNode,event.target,[event.args[0],1,event.args[1]],loopNodes,srcCtxNode);break;case 'shift':case 'pop':var nodesToRemove=loopNodes[event.method]();if(nodesToRemove){ //要素数0の配列に対してshift,popすると戻り値はundefined
removeDomNodes(this,loopRootNode,nodesToRemove);}break;case 'unshift':var fragment=addLoopChildren(this,loopNodes,srcCtxNode,event.method,event.args); //新規追加ノードを先頭に追加
loopRootNode.insertBefore(fragment,loopRootNode.firstChild);break;case 'push':var fragment=addLoopChildren(this,loopNodes,srcCtxNode,event.method,event.args); //新規追加ノードを末尾に追加
loopRootNode.appendChild(fragment);break;case 'splice':spliceLoopNodes(this,loopRootNode,event.target,event.args,loopNodes,srcCtxNode);break;case 'reverse': //DOMツリー側をリバース
reverseLoopNodes(loopRootNode,loopNodes); //保持している配列をリバース
loopNodes.reverse();break;case 'sort':case 'copyFrom':case null: // sort, copyFrom またはnull(endUpdate時にdispatchEventで呼ばれた)ときはループビューをすべて作り直す
this._loopElementsMap[viewUid]=refreshLoopContext(this,event.target,loopRootNode,loopNodes,srcCtxNode);break;}}}function hasClassBinding(bindDesc){return (/class\s*:/.test(bindDesc));} /**
	 * バインディングを管理します。
	 * <p>
	 * このクラスは自分でnewすることはありません。<a href="View.html#bind">view.bind()</a>を呼ぶとこのクラスのインスタンスが返ります。
	 * </p>
	 *
	 * @name Binding
	 * @class
	 */function Binding(target,dataContext){if(target.nodeType!==undefined){if(target.nodeType===NODE_TYPE_ELEMENT){ //エレメントノード
//バインドターゲットの親要素
this._parent=target.parentNode;this._targets=[target];}}else { //複数のノード
/**
			 * バインドターゲットの親要素
			 *
			 * @name _parent
			 * @private
			 */this._parent=target[0].parentNode; /**
			 * バインドターゲット
			 *
			 * @name _targets
			 * @private
			 */this._targets=toArray(target);} /**
		 * このバインディングのID
		 *
		 * @name _bindRootId
		 * @private
		 */this._bindRootId=bindRootId++; //マップにこのインスタンスを登録
bindRootIdToBindingMap[this._bindRootId]=this;var clonedSrc=[]; //this._targetsは常に配列
//初期状態のビューに、コンテキストごとに固有のIDを振っておく
for(var i=0,targetsLen=this._targets.length;i<targetsLen;i++){var originalNode=this._targets[i];if(originalNode.nodeType===NODE_TYPE_ELEMENT){ //ルートのエレメントノードにdata-dyn-bind-rootを付与して、このBindingインスタンスを探せるようにしておく
setElemAttribute(originalNode,DATA_H5_DYN_BIND_ROOT,this._bindRootId); //data-context, data-loop-contextを持つ要素にIDを付与して、オリジナルの要素を探せるようにする
var originalContextElems=queryQualifiedElements(originalNode,[DATA_H5_CONTEXT,DATA_H5_LOOP_CONTEXT],undefined,true);for(var j=0,orgCtxElemsLen=originalContextElems.length;j<orgCtxElemsLen;j++){setElemAttribute(originalContextElems[j],DATA_H5_DYN_CTX,contextUid++);} //data-h5-bindでclassバインドしている場合、オリジナルのclassNameを保存しておく（記述されている場合のみ）
var originalBindElems=queryQualifiedElements(originalNode,DATA_H5_BIND,undefined,true);for(var j=0,orgBindElemsLen=originalBindElems.length;j<orgBindElemsLen;j++){var originalBindElem=originalBindElems[j];if(hasClassBinding(getElemAttribute(originalBindElem,DATA_H5_BIND))&&originalBindElem.className!=''){setElemAttribute(originalBindElem,DATA_H5_DYN_CN,originalBindElem.className);}}} //保存用にクローン
clonedSrc.push(originalNode.cloneNode(true));} /**
		 * クローンした初期状態のテンプレート
		 *
		 * @name _srces
		 * @private
		 */this._srces=clonedSrc; /**
		 * loop-contextの各インデックスがもつ要素（配列）を保持。 キー：viewUid、値：配列の配列。
		 * 値は、「あるviewUidのloop-contextのi番目（＝ここが1段目）の要素の配列（＝2段目）」になっている。
		 *
		 * @name _loopElementsMap
		 * @private
		 */this._loopElementsMap={}; /**
		 * このバインディングのルートデータコンテキスト
		 *
		 * @name _rootContext
		 * @private
		 */this._rootContext=dataContext; /**
		 * 現在適用中のデータコンテキストを入れる配列。同じインスタンスは1つしか入らない。 この配列のインデックスをキーにしてビューを探す<br>
		 * TODO インデックスをキーとして使うため、使用しなくなったオブジェクトの場所にはnullが入り、次第にスパースな配列になってしまう。<br>
		 * 二重ポインタのようにして管理すればよいが、パフォーマンスに重大な影響が出るほどスパースになることはまれと考え、Deferredする。
		 *
		 * @name _usingContexts
		 * @private
		 */this._usingContexts=[]; /**
		 * ソースオブジェクト -> ビュー のマップ。1:many。 キーは_usingContextsのインデックス。 値はさらにマップで、キー：viewUid,
		 * 値：ビューインスタンス（配列）。
		 *
		 * @name _srcToViewMap
		 * @private
		 */this._srcToViewMap={}; /**
		 * バインドUID（現在表示されているDOM）にひもづけているリスナー。キー：contextIndex, 値：リスナー関数
		 *
		 * @name _listeners
		 * @private
		 */this._listeners={}; //TODO ルートが配列（LoopContext）の場合を考える
//バインディングの初期実行
applyBinding(this,this._targets,this._rootContext,false,true);}$.extend(Binding.prototype,{ /**
		 * このデータバインドを解除します。
		 * <p>
		 * 解除後は、ソースオブジェクトを変更してもビューには反映されません。 ビュー（HTML）の状態は、このメソッドを呼んだ時の状態のままです。
		 * </p>
		 *
		 * @since 1.1.0
		 * @memberOf Binding
		 * @function
		 */unbind:function unbind(){ //全てのバインディングを解除
for(var i=0,len=this._targets.length;i<len;i++){var target=this._targets[i];if(target.nodeType===NODE_TYPE_ELEMENT){ //バインディングを解除
this._removeBinding(target); //dyn属性削除
removeElemAttribute(target,DATA_H5_DYN_BIND_ROOT);var cnElems=queryQualifiedElements(target,DATA_H5_DYN_CN,undefined,true);for(var j=0,cnLen=cnElems.length;j<cnLen;j++){removeElemAttribute(cnElems[j],DATA_H5_DYN_CN);}var cxElems=queryQualifiedElements(target,DATA_H5_DYN_CTX,undefined,true);for(var j=0,cxLen=cxElems.length;j<cxLen;j++){removeElemAttribute(cxElems[j],DATA_H5_DYN_CTX);}}} //ビューとこのBindingインスタンスのマップを削除
delete bindRootIdToBindingMap[this._bindRootId]; //TODO リソース解放
//unbindしたら、ノードは元に戻す？？
}, /*
		 * バインディングを再実行します。既存のビューは一度すべて削除されます。
		 *
		 * @since 1.1.0
		 * @memberOf Binding
		 * @function
		 * @private
		 */ //		refresh: function() {
//			//保存しておいたビューをクローン
//			var fragment = document.createDocumentFragment();
//			for ( var i = 0, len = this._srces.length; i < len; i++) {
//				fragment.appendChild(this._srces[i].cloneNode(true));
//			}
//
//			//fragmentをappendする前にノードリストをコピーしておく
//			var newTargets = toArray(fragment.childNodes);
//
//			//新しいターゲットに対してバインディングを実行
//			//TODO ルートが配列（LoopContext）の場合を考える
//			applyBinding(this, newTargets, this._rootContext, false, true);
//
//			//生成したノードを今のターゲット（の最初のノード）の直前に追加して
//			this._parent.insertBefore(fragment, this._targets[0]);
//
//			//既存のターゲットを削除
//			for ( var i = 0, len = this._targets.length; i < len; i++) {
//				this._removeBinding(this._targets[i]);
//				this._parent.removeChild(this._targets[i]);
//			}
//
//			//ターゲットのポインタを更新
//			this._targets = newTargets;
//		},
/**
		 * ObservableArrayの変更に基づいて、自分が管理するビューを更新します。<br>
		 * MEMO フォーマッタが過剰にインデントしてしまうので分離している
		 *
		 * @since 1.1.0
		 * @memberOf Binding
		 * @private
		 * @function
		 * @param event
		 */_observableArray_changeListener:Binding__observableArray_changeListener, /**
		 * データアイテムまたはObservableItemのchangeイベントハンドラ
		 *
		 * @since 1.1.0
		 * @memberOf Binding
		 * @private
		 * @function
		 * @param event
		 */_observableItem_changeListener:function _observableItem_changeListener(event){var views=this._getViewsFromSrc(event.target);if(!views){return;} //このオブジェクトがルートコンテキストかどうか。
//ルートコンテキストの場合、$getBindElementsInContext()において
//対応するビューは「仮想ルート要素の子要素」としてみる必要がある。
var isRootContext=false;if(event.target===this._rootContext){isRootContext=true;}var that=this;for(var vuid in views){if(!views.hasOwnProperty(vuid)){continue;} //viewはこのObservableItemにバインドされているノード配列
var view=views[vuid]; //自分のコンテキストに属しているバインディング対象要素を探す
var $bindElements=$getBindElementsInContext(view,isRootContext); //各要素についてバインドする
$bindElements.each(function(){doBind(this,event.target,true);}); //自分の直接の子供のコンテキスト要素を探す
var $childContexts=$getChildContexts(view,DATA_H5_CONTEXT);$childContexts.each(function(){var contextProp=getElemAttribute(this,DATA_H5_CONTEXT);if(!(contextProp in event.props)){ //このコンテキスト要素に対応するソースオブジェクトは変更されていない
return true;} //子供のコンテキストの場合、仕様上あるコンテキストのルート要素は必ず単一のエレメントである
//現在のバインディングを解除
that._removeBinding(this); //対応するビューを保存してあるビューからクローンする
var dynCtxId=getElemAttribute(this,DATA_H5_DYN_CTX);var srcCtxRootNode=that._getSrcCtxNode(dynCtxId);var cloned=cloneNodeDeeply(srcCtxRootNode); //新しくバインドした要素を追加し、古いビューを削除
//(IE6は先に要素をdocumentツリーに追加しておかないと属性の変更が反映されないので先にツリーに追加)
this.parentNode.replaceChild(cloned,this); //新しいコンテキストソースオブジェクトでバインディングを行う
applyBinding(that,cloned,event.props[contextProp].newValue);}); //自分の直接の子供のループルートコンテキスト要素を探す
var $childLoopContexts=$getChildContexts(view,DATA_H5_LOOP_CONTEXT);$childLoopContexts.each(function(){var contextProp=getElemAttribute(this,DATA_H5_LOOP_CONTEXT);if(!(contextProp in event.props)||event.target._isArrayProp(contextProp)){ //このループルートコンテキスト要素に対応するソースオブジェクトは変更されていない
//または指定されたプロパティはtype:[]なので無視
//（ObsArrayのハンドラで処理すればよい）
return true;} //子供のコンテキストの場合、仕様上あるコンテキストのルート要素は必ず単一のエレメントである
//現在のバインディングを解除
that._removeBinding(this); //新しいコンテキストソースオブジェクトでバインディングを行う
//ループコンテキストなので、ルートノードはそのまま使いまわす
applyBinding(that,this,event.props[contextProp].newValue,true);});}}, /**
		 * @since 1.1.0
		 * @memberOf Binding
		 * @private
		 * @function
		 * @param ctxId
		 */_getSrcCtxNode:function _getSrcCtxNode(ctxId){for(var i=0,len=this._srces.length;i<len;i++){var src=this._srces[i]; //ルート要素にdata-dyn-ctxがついているかチェック
if(getElemAttribute(src,DATA_H5_DYN_CTX)===ctxId){return src;}var ctxElems=queryQualifiedElements(src,DATA_H5_DYN_CTX,ctxId);if(ctxElems.length>0){ //同じctxIdを持つ要素は1つしかない
return ctxElems[0];}}return null;}, /**
		 * @since 1.1.0
		 * @memberOf Binding
		 * @private
		 * @function
		 * @param ctx
		 */_isWatching:function _isWatching(ctx){var idx=this._getContextIndex(ctx);if(idx===-1){return false;}return this._listeners[idx]!=null;}, /**
		 * @since 1.1.0
		 * @memberOf Binding
		 * @private
		 * @function
		 * @param ctx
		 */_getContextIndex:function _getContextIndex(ctx){return $.inArray(ctx,this._usingContexts);}, /**
		 * ソースオブジェクト -> ビュー(配列) のマップエントリ、ビューUID -> ソースオブジェクト のマップエントリを追加。
		 * エントリが存在する場合は上書き（ただし、そもそも二重登録は想定外）。
		 *
		 * @since 1.1.0
		 * @memberOf Binding
		 * @private
		 * @function
		 * @param ctx
		 * @param view
		 * @param viewUid
		 */_addBindingEntry:function _addBindingEntry(src,view,viewUid){var srcIndex=this._getContextIndex(src);if(srcIndex===-1){ //ソースエントリ追加
this._usingContexts.push(src);srcIndex=this._usingContexts.length-1;}viewToSrcMap[viewUid]=src;var srcViewMap=this._srcToViewMap[srcIndex];if(!srcViewMap){ //マップオブジェクトを新規作成し、エントリ追加
var mapObj={};mapObj[viewUid]=view;this._srcToViewMap[srcIndex]=mapObj;return;} //マップエントリ追加
srcViewMap[viewUid]=view;}, /**
		 * @since 1.1.0
		 * @memberOf Binding
		 * @private
		 * @function
		 * @param srcToViewMap
		 */_hasBindingForSrc:function _hasBindingForSrc(srcToViewMap){ //srcToViewMapが自分でキーを持っているということは
//ビューへのバインディングエントリがあるということ
for(var key in srcToViewMap){if(srcToViewMap.hasOwnProperty(key)){return true;}}return false;}, /**
		 * 特定のビューへのバインディングエントリ（ソースオブジェクト -> ビュー のマップエントリ）を削除
		 *
		 * @since 1.1.0
		 * @memberOf Binding
		 * @private
		 * @function
		 * @param viewUid
		 */_removeBindingEntry:function _removeBindingEntry(viewUid){var src=viewToSrcMap[viewUid];if(!src){ //このviewUidが表すバインディングはすでに削除されている
return;}var ctxIndex=this._getContextIndex(src);if(ctxIndex!==-1){var svMap=this._srcToViewMap[ctxIndex];if(svMap&&svMap[viewUid]){ //ソースオブジェクト -> ビュー（viewUid経由） のマップエントリを削除
delete svMap[viewUid];if(!this._hasBindingForSrc(svMap)){var removed=false; //このオブジェクトの監視が不要（他にバインドされているビューがない）になった場合、リスナーを削除
if(isObservableItem(src)){src.removeEventListener('change',this._listeners[ctxIndex]);removed=true;}else if(h5.core.data.isObservableArray(src)){src.removeEventListener('change',this._listeners[ctxIndex]);removed=true;}if(removed){delete this._listeners[ctxIndex];} //このソースを監視する必要がなくなったので、マップそのものを削除
delete this._srcToViewMap[ctxIndex];this._usingContexts[ctxIndex]=null;}}}if(viewToSrcMap[viewUid]){ //viewUid -> ソースオブジェクト のマップエントリを削除
delete viewToSrcMap[viewUid];}}, /**
		 * 指定された要素以下のバインディングを全て解除
		 *
		 * @since 1.1.0
		 * @memberOf Binding
		 * @private
		 * @function
		 * @param rootElem
		 */_removeBinding:function _removeBinding(rootElem){if(rootElem.nodeType!==NODE_TYPE_ELEMENT){ //バインド可能なのはエレメントのみなので、ルートがELEMENTノードでない場合はバインディングはない
return;} //渡された要素自身がviewUidを持っていたら、まずその要素のバインディングエントリを削除
//ここでは、必ず自分自身のエントリが最初に削除されるように、queryQualifiedElementsを使わず独自に削除している
var rootVid=getElemAttribute(rootElem,DATA_H5_DYN_VID);if(rootVid!=null){this._removeBindingEntry(rootVid);removeElemAttribute(rootElem,DATA_H5_DYN_VID);} //子孫要素のバインディングエントリを削除
var vidElems=queryQualifiedElements(rootElem,DATA_H5_DYN_VID);for(var i=0,len=vidElems.length;i<len;i++){var vidElem=vidElems[i];this._removeBindingEntry(getElemAttribute(vidElem,DATA_H5_DYN_VID));removeElemAttribute(vidElem,DATA_H5_DYN_VID);}}, /**
		 * @since 1.1.0
		 * @memberOf Binding
		 * @private
		 * @function
		 * @param src
		 */_getViewsFromSrc:function _getViewsFromSrc(src){var srcIndex=this._getContextIndex(src);if(srcIndex===-1){return null;}return this._srcToViewMap[srcIndex];}});function createBinding(elements,context){return new Binding(elements,context);} // =============================
// Expose to window
// =============================
h5internal.view={createBinding:createBinding};})(); /* ------ h5.validation ------ */(function(){ // =========================================================================
//
// Constants
//
// =========================================================================
// =============================
// Production
// =============================
/**
	 * デフォルトで定義済みのルール名
	 */var DEFAULT_RULE_NAME_REQUIRED='required';var DEFAULT_RULE_NAME_CUSTOM_FUNC='customFunc';var DEFAULT_RULE_NAME_ASSERT_NULL='assertNull';var DEFAULT_RULE_NAME_ASSERT_NOT_NULL='assertNotNull';var DEFAULT_RULE_NAME_ASSERT_FALSE='assertFalse';var DEFAULT_RULE_NAME_ASSERT_TRUE='assertTrue';var DEFAULT_RULE_NAME_MAX='max';var DEFAULT_RULE_NAME_MIN='min';var DEFAULT_RULE_NAME_FUTURE='future';var DEFAULT_RULE_NAME_PAST='past';var DEFAULT_RULE_NAME_DIGITS='digits';var DEFAULT_RULE_NAME_PATTERN='pattern';var DEFAULT_RULE_NAME_SIZE='size'; /**
	 * ValidationResultのイベント名
	 */var EVENT_VALIDATE='validate';var EVENT_VALIDATE_COMPLETE='validateComplete';var EVENT_VALIDATE_ABORT='abort'; // =============================
// Development Only
// =============================
/* del begin */var fwLogger=h5.log.createLogger('h5.validation'); // ログメッセージ
var FW_LOG_NOT_DEFINED_RULE_NAME='指定されたルール{0}は未定義です'; /* del end */ // =========================================================================
//
// Cache
//
// =========================================================================
var isPromise=h5.async.isPromise; // =========================================================================
//
// Privates
//
// =========================================================================
// =============================
// Variables
// =============================
var validateRuleManager=new ValidateRuleManager(); // =============================
// Functions
// =============================
// =============================
// FIXME h5.core.dataからコピペ
// =============================
/**
	 * 引数がNaNかどうか判定する。isNaNとは違い、例えば文字列はNaNではないのでfalseとする
	 *
	 * @private
	 * @param {Any} val 判定する値
	 * @returns {boolean} 引数がNaNかどうか
	 */function isStrictNaN(val){return typeof val==='number'&&isNaN(val);} /**
	 * 引数を2つ取り、両方ともisStrictNaNかどうか判定する
	 *
	 * @private
	 * @param {Any} val1 判定する値
	 * @param {Any} val2 判定する値
	 * @returns {boolean} 引数が2つともNaNかどうか
	 */function isBothStrictNaN(val1,val2){return isStrictNaN(val1)&&isStrictNaN(val2);} /**
	 * type:'number' 指定のプロパティに代入できるかのチェック null,undefined,NaN,parseFloatしてNaNにならないもの
	 * に当てはまる引数についてtrueを返す
	 *
	 * @private
	 * @param {Any} val 判定する値
	 * @param {Boolean} isStrict 厳密に判定するかどうか。isStrict === trueなら型変換可能でも型が違えばfalseを返す
	 * @returns {boolean} type:'number'指定のプロパティに代入可能か
	 */function isNumberValue(val,isStrict){ // nullまたはundefinedはtrue
// NaNを直接入れた場合はtrue
// new Number() で生成したオブジェクトはtrue
// 文字列の場合は、[±(数字)(.数字)]で構成されている文字列ならOKにする
// ※ parseFloatよりも厳しいチェックにしている。
// "1.2", "+1.2", "1", ".2", "-.2" はOK。
// "12.3px"、"12.3.4"、"123.", [12.3, 4] はいずれもparseFloatできるが、ここではNG。
return val==null||isStrictNaN(val)||typeof val==='number'||!isStrict&&(val instanceof Number||!!((isString(val)||val instanceof String)&&!!val.match(/^[+\-]{0,1}[0-9]*\.{0,1}[0-9]+$/)));} /**
	 * type:'integer' 指定のプロパティに代入できるかのチェック null,undefined,parseFloatとparsFloatの結果が同じもの(NaNは除く)
	 * に当てはまる引数についてtrueを返す
	 *
	 * @private
	 * @param {Any} val 判定する値
	 * @param {Boolean} isStrict 厳密に判定するかどうか。isStrict === trueなら型変換可能でも型が違えばfalseを返す
	 * @returns {boolean} type:'integer'指定のプロパティに代入可能か
	 */function isIntegerValue(val,isStrict){ // parseIntとparseFloatの結果が同じかどうかで整数値かどうかの判定をする
// typeofが'nubmer'または、new Number()で生成したオブジェクトで、parseFloatとparseIntの結果が同じならtrue
// NaN, Infinity, -Infinityはfalseを返す(parseInt(Infinity)はNaNであるので、InfinityはIntじゃない扱いにする
// 文字列の場合は、[±数字]で構成されている文字列ならOKにする
// ※ parseIntよりも厳しいチェックにしている。"12px"、"12.3"、[12,3] はいずれもparseIntできるが、ここではNG。
return val==null||typeof val==='number'&&parseInt(val)===val||!isStrict&&(val instanceof Number&&parseInt(val)===parseFloat(val)||(typeof val==='string'||val instanceof String)&&!!val.match(/^[+\-]{0,1}[0-9]+$/));} /**
	 * type:'string' 指定のプロパティに代入できるかのチェック
	 *
	 * @private
	 * @param {Any} val 判定する値
	 * @param {Boolean} isStrict 厳密に判定するかどうか。isStrict === trueなら型変換可能でも型が違えばfalseを返す
	 * @returns {boolean} type:'string'指定のプロパティに代入可能か
	 */function isStringValue(val,isStrict){return !!(val==null||isString(val)||!isStrict&&val instanceof String);} /**
	 * type:'boolean' 指定のプロパティに代入できるかのチェック
	 *
	 * @private
	 * @param {Any} val 判定する値
	 * @param {Boolean} isStrict 厳密に判定するかどうか。isStrict === trueなら型変換可能でも型が違えばfalseを返す
	 * @returns {boolean} type:'boolean'指定のプロパティに代入可能か
	 */function isBooleanValue(val,isStrict){return val==null||typeof val==='boolean'||!isStrict&&val instanceof Boolean;} /**
	 * ValidationResultにデフォルトで登録するvalidateイベントリスナ
	 *
	 * @private
	 */function validateEventListener(ev){ // thisはvalidationResult
// このハンドラがユーザが追加するハンドラより先に動作する前提(EventDispatcherがそういう実装)
// 非同期validateの結果をValidationResultに反映させる
var name=ev.name;if(ev.isValid){this.validProperties.push(name);this.validCount++;}else {this.isValid=false;this.invalidProperties.push(name);this.invalidCount++;this.invalidReason=this.invalidReason||{};this.invalidReason[name]={name:name,value:ev.value,violation:[ev.violation]};}this.validatingProperties.splice($.inArray(name,this.validatingProperties),1);if(!this.isValid||!this.validatingProperties.length){this.isAllValid=this.isValid;}} /**
	 * validation結果クラス
	 * <p>
	 * バリデート結果を保持するクラスです。{@link h5.validation.FormValidationLogic.validate}がこのクラスのインスタンスを返します。
	 * </p>
	 * <p>
	 * このクラスは{@link EventDispatcher}のメソッドを持ち、イベントリスナを登録することができます。
	 * </p>
	 * <p>
	 * このクラスは非同期バリデートの完了を通知するために以下のイベントをあげます。
	 * </p>
	 * <dl>
	 * <dt>validate</dt>
	 * <dd>
	 * <p>
	 * 非同期バリデートを行っているプロパティについて、どれか1つのバリデート結果が出た。
	 * </p>
	 * <p>
	 * 以下のようなイベントオブジェクトを通知します。
	 * </p>
	 *
	 * <pre class="sh_javascript"><code>
	 * {
	 * 	type: 'validate'
	 * 	name: // バリデートが完了したプロパティ名
	 * 	value: // バリデート対象の値
	 * 	isValid: // バリデート結果(true/false)
	 * 	violation:
	 * 	// 失敗時のみ。該当プロパティについてのバリデート失敗理由({@link ValidationResult}に格納されるinvalidReason[name].violationに格納されるルールごとの違反理由オブジェクト)
	 * }
	 * </code></pre>
	 *
	 * </dd>
	 * <dt>validateComplete</dt>
	 * <dd>非同期バリデートを行っているすべてのプロパティのバリデートが完了した。
	 * <p>
	 * 以下のようなイベントオブジェクトを通知します。
	 * </p>
	 *
	 * <pre class="sh_javascript"><code>
	 * {
	 * 	type: 'validateComplete'
	 * }
	 * </code></pre>
	 *
	 * </dd>
	 * <dt>abort</dt>
	 * <dd>非同期バリデートが中断された。
	 * <p>
	 * 以下のようなイベントオブジェクトを通知します。
	 * </p>
	 *
	 * <pre class="sh_javascript"><code>
	 * {
	 * 	type: 'abort'
	 * }
	 * </code></pre>
	 *
	 * </dd>
	 * </dl>
	 *
	 * @class
	 * @name ValidationResult
	 * @mixes EventDispatcher
	 */ /**
	 * @private
	 * @param result
	 */function ValidationResult(result){ /**
		 * バリデーション結果
		 * <p>
		 * 現在完了しているバリデート全てについてバリデートが通ったかどうかをtrueまたはfalseで保持します。
		 * </p>
		 * <p>
		 * 例えば非同期バリデートがあり、全てのバリデートが完了していない場合でもisValidには判定済みのものについてバリデートが通ったかどうかを保持します。
		 * </p>
		 *
		 * @memberOf ValidationResult
		 * @name isValid
		 * @type {boolean}
		 */this.isValid=result.isValid; /**
		 * バリデートの通ったプロパティ名の配列
		 *
		 * @memberOf ValidationResult
		 * @name validProperties
		 * @type {string[]}
		 */this.validProperties=result.validProperties; /**
		 * バリデートの通らなかったプロパティ名の配列
		 *
		 * @memberOf ValidationResult
		 * @name invalidProperties
		 * @type {string[]}
		 */this.invalidProperties=result.invalidProperties; /**
		 * バリデートの終わっていないプロパティ名の配列
		 * <p>
		 * 非同期バリデートが完了していないプロパティ名がここに格納されます。 非同期バリデートが完了した時点で街頭プロパティはここから取り除かれ、{@link ValidationResult.validProperties}または{@link ValidationResult.invalidPropertes}に格納されます。
		 * </p>
		 *
		 * @memberOf ValidationResult
		 * @name validatingProperties
		 * @type {string[]}
		 */this.validatingProperties=result.validatingProperties; /**
		 * バリデート失敗理由
		 * <p>
		 * バリデート失敗の理由がここに格納されます。invalidReasonは以下のようなオブジェクトです。
		 * </p>
		 *
		 * <pre class="sh_javascript"><code>
		 * {
		 *   &quot;プロパティ名&quot;: {
		 *     name: 'name',              // プロパティ名
		 *     value: 101,                // バリデート対象の値
		 *     violation: [{              // 違反理由オブジェクトの配列
		 *       ruleName: 'max',  // バリデートを行ったルール
		 *       ruleValue: {max:100, inclusive: true},  // バリデート関数に渡されたパラメータ
		 *       reason: // 非同期バリデートのみ。非同期バリデート関数が返したプロミスのfailハンドラに渡された引数リスト。同期の場合は常にnull
		 *     }]
		 *   },
		 *   &quot;プロパティ名&quot;: {...},
		 *   &quot;プロパティ名&quot;: {...}
		 * }
		 * </code></pre>
		 *
		 * @memberOf ValidationResult
		 * @name invalidReason
		 * @type {object}
		 */this.invalidReason=result.invalidReason; /**
		 * バリデート成功したプロパティ数
		 *
		 * @memberOf ValidationResult
		 * @name validCount
		 * @type {integer}
		 */this.validCount=result.validProperties.length; /**
		 * バリデート失敗したプロパティ数
		 *
		 * @memberOf ValidationResult
		 * @name invalidCount
		 * @type {integer}
		 */this.invalidCount=result.invalidProperties.length; /**
		 * 非同期バリデートがあるかどうか
		 *
		 * @memberOf ValidationResult
		 * @name isAsync
		 * @type {boolean}
		 */this.isAsync=result.isAsync; /**
		 * 非同期バリデートも含めすべてのプロパティがバリデート成功したかどうか
		 * <p>
		 * 非同期バリデートがあり、まだ結果が出ていない場合はnullです。
		 * </p>
		 *
		 * @memberOf ValidationResult
		 * @name isAllValid
		 * @type {boolean|null}
		 */this.isAllValid=result.isAllValid; /**
		 * バリデート対象のプロパティ名リスト
		 *
		 * @memberOf ValidationResult
		 * @name properties
		 * @type {string[]}
		 */this.properties=result.properties;this.addEventListener(EVENT_VALIDATE,validateEventListener); // abort()が呼ばれていたらdispatchEventを動作させない
this.dispatchEvent=function(){if(this._aborted){return;}ValidationResult.prototype.dispatchEvent.apply(this,arguments);};} // イベントディスパッチャ
h5.mixin.eventDispatcher.mix(ValidationResult.prototype); /**
	 * 非同期バリデートを中止する
	 * <p>
	 * ValidationResultが非同期バリデート結果を待機している場合、このメソッドを呼ぶとバリデートを中止し、以降validate及びvalidateCompleteイベントをあげなくなります。
	 * </p>
	 *
	 * @memberOf ValidationResult
	 * @name abort
	 * @function
	 */ValidationResult.prototype.abort=function(){this.removeEventListener(EVENT_VALIDATE,validateEventListener);this.dispatchEvent({type:EVENT_VALIDATE_ABORT});this._aborted=true;}; /**
	 * priority順に並べるための比較関数
	 * <p>
	 * priorityの数値の降順で返えす。(priorityに一大きい数値の指定されているものが先)
	 *
	 * @private
	 * @param obj1
	 * @param obj2
	 * @returns {integer}
	 */function comparePriority(obj1,obj2){var p1,p2;p1=obj1.priority==null?-Infinity:obj1.priority;p2=obj2.priority==null?-Infinity:obj2.priority;return p1===p2?0:p2-p1;} /**
	 * ルールオブジェクトの管理クラス
	 *
	 * @class
	 * @private
	 */function ValidateRuleManager(){ // ルールを優先度順に並べたもの
this.rules=[]; // ルール名→ルールオブジェクトのマップ
this.rulesMap={};}$.extend(ValidateRuleManager.prototype,{addValidateRule:function addValidateRule(ruleName,func,argNames,priority){var isExistAlready=this.rulesMap[ruleName];if(isExistAlready){for(var i=0,l=this.rules.length;i<l;i++){if(this.rules[i].ruleName===ruleName){this.rules.splice(i,1);break;}}}var ruleObj={ruleName:ruleName,func:func,priority:priority,argNames:argNames};this.rules.push(ruleObj);this.rulesMap[ruleName]=ruleObj;},getValidateFunction:function getValidateFunction(ruleName){return this.rulesMap[ruleName]&&this.rulesMap[ruleName].func;},getValidateArgNames:function getValidateArgNames(ruleName){return this.rulesMap[ruleName]&&this.rulesMap[ruleName].argNames;},sortRuleByPriority:function sortRuleByPriority(ruleNames){var rulesMap=this.rulesMap;ruleNames.sort(function(a,b){return comparePriority(rulesMap[a],rulesMap[b]);});}}); /**
	 * ルール定義の追加
	 * <p>
	 * {@link h5.validation.FormValidationLogic.addRule}で追加するルールはここで追加されたルール定義が使用されます。
	 * </p>
	 * <p>
	 * 第1引数にはルール名を指定します。
	 * </p>
	 * <p>
	 * 第2引数にはバリデート関数を指定します。 バリデート結果が正しい場合はtrueとなる値を返す関数を指定してください。 バリデート関数は第1引数にはバリデート対象の値、第2引数以降には{@link Validate.addRule}で指定するルールオブジェクトに記述されたパラメータが渡されます。
	 * </p>
	 * <p>
	 * 第3引数にはバリデート関数に渡すパラメータのパラメータ名リストを指定します。パラメータ名は{@link ValidationResult.invalidReason}で使用されます。
	 * </p>
	 * <p>
	 * 第4引数は優先度指定です。複数ルールをバリデートする場合に、どのルールから順にバリデートを行うかを優先度で指定します。
	 * 優先度は、数値が大きいものほど優先されます。同じ優先度の場合適用順序は不定です。 デフォルトで用意されているルールの優先度は、requiredが51、その他は50で定義しています。
	 * </p>
	 *
	 * @private
	 * @param {string} ruleName ルール名
	 * @param {Function} func バリデート関数
	 * @param {string[]} [argNames] パラメータ名リスト
	 * @param {number} [priority=0] 優先度
	 */function defineRule(ruleName,func,argNames,priority){ // TODO 優先度は未実装
validateRuleManager.addValidateRule(ruleName,func,argNames,priority);} // =========================================================================
//
// Body
//
// =========================================================================
/**
	 * ルールに基づいたバリデーション関数を持つオブジェクト
	 *
	 * @private
	 */var rule={ /**
		 * 値がnullでないかつ空文字でないことを判定する
		 * <p>
		 * 値がnullまたは空文字の場合はfalseを返します。
		 * </p>
		 *
		 * @param {Any} value 判定する値
		 * @returns {boolean}
		 */required:function required(value){ // nullでないかつ、空文字でもないこと
return value!=null&&value!=='';}, /**
		 * 値を第2引数の関数で判定した結果を返す
		 *
		 * @param {Any} value 判定する値
		 * @param {Function} func 任意のバリデート関数。第1引数に判定する値が渡されます
		 * @returns {Any}
		 */customFunc:function customFunc(value,func){return func(value);}, /**
		 * 値がfalseかどうか判定し、判定結果をtrueまたはfalseで返します
		 * <p>
		 * 値がnullまたはundefinedの場合はtrueを返します。
		 * </p>
		 * <p>
		 * 値が真偽値でない場合はfalseを返します
		 * </p>
		 *
		 * @param {Any} value 判定する値
		 * @returns {boolean}
		 */assertFalse:function assertFalse(value){return value==null||isBooleanValue(value)&&value==false;}, /**
		 * 値がtrueかどうか判定し、判定結果をtrueまたはfalseで返します
		 * <p>
		 * 値がnullまたはundefinedの場合はtrueを返します。
		 * </p>
		 * <p>
		 * 値が真偽値型でない場合はfalseを返します
		 * </p>
		 *
		 * @param {Any} value 判定する値
		 * @returns {boolean}
		 */assertTrue:function assertTrue(value){return value==null||isBooleanValue(value)&&value==true;}, /**
		 * 値が最大値より小さいかどうか判定し、判定結果をtrueまたはfalseで返します
		 * <p>
		 * 第2引数には最大値を指定して、その数値より小さいかどうか判定します。
		 * </p>
		 * <p>
		 * 第3引数にtrueを指定すると、値が最大値と等しい場合もtrueを返します(デフォルトはfalse)。
		 * </p>
		 * <p>
		 * 値がnullまたはundefinedの場合はtrueを返します。
		 * </p>
		 * <p>
		 * 値が数値型でない場合はfalseを返します
		 * </p>
		 *
		 * @param {Any} value 判定する値
		 * @param {number} max 最大値
		 * @param {boolean} [inclusive=false] 境界値にmaxValueを含めるかどうか
		 * @returns {boolean}
		 */max:function max(value,maxVal,inclusive){return value==null||(isNumberValue(value,true)||value instanceof Number)&&(inclusive?value<=maxVal:value<maxVal);}, /**
		 * 値が最小値より大きいかどうか判定し、判定結果をtrueまたはfalseで返します
		 * <p>
		 * 第2引数には最小値を指定して、その数値より大きいかどうか判定します。
		 * </p>
		 * <p>
		 * 第3引数にtrueを指定すると、値が最小値と等しい場合もtrueを返します(デフォルトはfalse)。
		 * </p>
		 * <p>
		 * 値がnullまたはundefinedの場合はtrueを返します。
		 * </p>
		 * <p>
		 * 値が数値型でない場合はfalseを返します
		 * </p>
		 *
		 * @param {Any} value 判定する値
		 * @param {number} min 最小値
		 * @param {boolean} [inclusive=false] 境界値にmaxValueを含めるかどうか
		 * @returns {boolean}
		 */min:function min(value,_min,inclusive){return value==null||(isNumberValue(value,true)||value instanceof Number)&&(inclusive?_min<=value:_min<value);}, /**
		 * 値がnullかどうか判定し、判定結果をtrueまたはfalseで返します
		 * <p>
		 * 値がnullまたはundefinedの場合はtrueを返します。
		 * </p>
		 * <p>
		 * それ以外の場合はfalseを返します。
		 * </p>
		 *
		 * @param {Any} value 判定する値
		 * @returns {boolean}
		 */assertNull:function assertNull(value){return value==null;}, /**
		 * 値がnullでないかどうか判定し、判定結果をtrueまたはfalseで返します
		 * <p>
		 * 値がnullの場合はfalseを返します。undefinedの場合はtrueを返します。
		 * </p>
		 * <p>
		 * それ以外の場合はtrueを返します。
		 * </p>
		 *
		 * @param {Any} value 判定する値
		 * @returns {boolean}
		 */assertNotNull:function assertNotNull(value){return value===undefined?true:value!=null;}, /**
		 * 値が現在時刻より未来かどうか判定し、判定結果をtrueまたはfalseで返します
		 * <p>
		 * 値がnullまたはundefinedの場合はtrueを返します。
		 * </p>
		 * <p>
		 * 値がDate型でない場合はfalseを返します。
		 * </p>
		 *
		 * @param {Any} value 判定する値
		 * @returns {boolean}
		 */future:function future(value){return value==null||value instanceof Date&&new Date().getTime()<value.getTime();}, /**
		 * 値が現在時刻より過去かどうか判定し、判定結果をtrueまたはfalseで返します
		 * <p>
		 * 値がnullまたはundefinedの場合はtrueを返します。
		 * </p>
		 * <p>
		 * 値がDate型でない場合はfalseを返します。
		 * </p>
		 *
		 * @param {Any} value 判定する値
		 * @returns {boolean}
		 */past:function past(value){return value==null||value instanceof Date&&value.getTime()<new Date().getTime();}, /**
		 * 値を数値表現文字列として扱い、桁数の判定を行い、判定結果をtrueまたはfalseで返します
		 * <p>
		 * 第2引数には整数部分の桁数の上限を設定します。
		 * </p>
		 * <p>
		 * 第3引数には小数部分の桁数の上限を設定します。
		 * </p>
		 * <p>
		 * 値がnullまたはundefinedの場合はtrueを返します。
		 * </p>
		 * <p>
		 * 値が文字列型でない場合はfalseを返します。
		 * </p>
		 * <p>
		 * 整数部分、小数部分いずれの桁数も境界値を含めます。
		 * </p>
		 *
		 * @param {Any} value 判定する値
		 * @param {integer} integer 整数桁数の上限値
		 * @param {integer} fraction 小数桁数の上限値
		 * @returns {boolean}
		 */digits:function digits(value,integer,fraction){if(value==null){return true;}var typeValid=isStringValue(value);if(!typeValid){return false;} // 数値表現かどうか判定
// 先頭が+,-,数値の何れかで始まっていること。数値.数値または数値のみであること
if(!/^([+|-])?\d*(\.\d+)?$/.test(value)){return false;} // 整数部分判定
// 数値に変換して正の数で考える
var num=parseInt(value);num=num<0?-num:num;if(integer!=null){ // 整数部分判定
if(num>=Math.pow(10,integer)){return false;}}if(fraction!=null){ // 小数部分判定
var pointIndex=value.indexOf('.');if(pointIndex===-1){ // 小数点が無い場合はvalid
return true;} // 小数部分の桁数がfraction以下の長さかどうか返す
return value.slice(pointIndex+1).length<=fraction;} // integerもfractionもどちらもnullならvalid
return true;}, /**
		 * 値が正規表現を満たすかどうか判定し、判定結果をtrueまたはfalseで返します
		 * <p>
		 * 第2引数に正規表現オブジェクトを指定し、その正規表現を満たすかどうかの判定を行います。
		 * </p>
		 * <p>
		 * 値がnullまたはundefinedの場合はtrueを返します。
		 * </p>
		 * <p>
		 * 値が文字列型でない場合はfalseを返します。
		 * </p>
		 *
		 * @param {Any} value 判定する値
		 * @param {RegExp} regexp 正規表現オブジェクト
		 * @returns {boolean}
		 */pattern:function pattern(value,regexp){return value==null||isStringValue(value)&&regexp.test(value);}, /**
		 * 配列の長さ、または文字列の長さ、オブジェクトのプロパティ数が指定された範囲内であるかどうかを判定し、判定結果をtrueまたはfalseで返します
		 * <p>
		 * 判定対象となる値は配列、文字列、プレーンオブジェクトの何れかです。
		 * 配列の場合は配列の長さ、文字列の場合は文字数、プレーンオブジェクトの場合はhasOwnPropertyがtrueであるプロパティの数を判定の対象とします。
		 * </p>
		 * <p>
		 * その他の型の値の場合はfalseを返します。
		 * </p>
		 * <p>
		 * 第2引数でサイズの下限値、第3引数でサイズの上限値を指定し、その範囲内のサイズであるかどうかを判定します。上限値、下限値ともに境界を含めます。上限値、下限値はどちらかのみの指定が可能です。
		 * </p>
		 * <p>
		 * 値がnullまたはundefinedの場合はtrueを返します。
		 * </p>
		 *
		 * @param {Any} value 判定する値
		 * @param {integer} min 下限値 (nullを指定した場合は下限値による判定は行いません)
		 * @param {integer} max 上限値 (nullを指定した場合は上限値による判定は行いません)
		 * @returns {boolean}
		 */size:function size(value,min,max){min=min||0;max=max||Infinity;if($.isPlainObject(value)){ // プレーンオブジェクトの場合プロパティの数をカウント
var valueSize=0;for(var p in value){valueSize++;}return min<=valueSize&&valueSize<=max;}return value==null||(isStringValue(value)||isArray(value))&&min<=value.length&&value.length<=max;}}; /**
	 * FormValidationロジック
	 * <p>
	 * フォーム要素を集約したオブジェクトのバリデートを行うためのロジックです。
	 * </p>
	 *
	 * @class
	 * @name h5.validation.FormValidationLogic
	 */var FormValidationLogic={ /**
		 * @private
		 */__name:'h5.validation.FormValidationLogic', /**
		 * @private
		 */_rule:{}, /**
		 * @private
		 */_disableProperties:[], /**
		 * フォームの値を集約したオブジェクトのvalidateを行う
		 * <p>
		 * FormValidationロジックはバリデートルールごとにバリデート対象の値を適切な型に変換してからバリデートを行います。
		 * 例えば、値が"1"という文字列であってもmaxルールで判定する場合は1という数値に対してバリデートを行います。
		 * </p>
		 * <p>
		 * また、 グループとそのグループ内のプロパティについてのvalidateに対応しています。
		 * </p>
		 * <p>
		 * グループとは、第1引数のオブジェクトの中に、オブジェクトを値として持つプロパティがある場合、それをグループと言います。
		 * そのグループ単位でのバリデートも行い、さらにグループ内のプロパティについてのバリデートを行います。
		 * </p>
		 * <p>
		 * グループはネストすることはできません。
		 * </p>
		 * <p>
		 * 以下はbirthdayをグループとして扱いvalidateを行う場合の例です。
		 * </p>
		 *
		 * <pre class="sh_javascript"><code>
		 * var formValidator = h5.core.logic(h5.validation.FormValidationLogic);
		 * formValidator.addRule({
		 * 	birthday: {
		 * 		customFunc: function(val) {
		 * 			// 日付として正しいか判定する
		 * 			!isNaN(new Date(val.year, val.month - 1, val.date).getTime());
		 * 		}
		 * 	},
		 * 	year: {
		 * 		required: true
		 * 	},
		 * 	month: {
		 * 		required: true
		 * 	},
		 * 	day: {
		 * 		required: true
		 * 	}
		 * });
		 * formValidator.validate({
		 * 	birthday: {
		 * 		year: 1999,
		 * 		month: 1,
		 * 		date: 1
		 * 	}
		 * });
		 * </code></pre>
		 *
		 * <p>
		 * グループはそのグループ(birthday)のルールによるvalidateが行われる。
		 * </p>
		 * <p>
		 * また、year,month,dayもそれぞれのルールに基づいてvalidateが行われる。
		 * </p>
		 *
		 * @memberOf h5.validation.FormValidationLogic
		 * @param {Object} obj バリデート対象となるオブジェクト
		 * @param {string|string[]} [names] 第1引数オブジェクトのうち、バリデートを行うキー名またはその配列(指定無しの場合は全てのキーが対象)
		 * @returns {ValidationResult} バリデート結果
		 */validate:function validate(obj,names){ // グループ対応。値がオブジェクトのものはグループとして扱う
var validateTarget={};var inGroupNames=[];for(var p in obj){if($.isPlainObject(obj[p])){ // オブジェクトの場合はその中身も展開してvalidateされるようにする
// なお、グループの入れ子は考慮していない
for(var prop in obj[p]){validateTarget[prop]=obj[p][prop];inGroupNames.push(prop);}}validateTarget[p]=obj[p];}var validateNames=null;if(names){validateNames=($.isArray(names)?names.slice(0):[names]).concat(inGroupNames);}return this._validate(validateTarget,validateNames);}, /**
		 * バリデートルールを追加する
		 * <p>
		 * {@link h5.validation.FormValidationLogic.validate}でバリデートを行う際のバリデートルールを追加します。
		 * </p>
		 * <p>
		 * バリデートルールは以下のようなオブジェクトで指定します。
		 *
		 * <pre class="sh_javascript"><code>
		 * var formValidator = h5.core.logic(h5.validation.FormValidationLogic);
		 * formValidator.addRule({
		 * 	// 対象となるプロパティ名(userid)をキーにする
		 * 	userid: {
		 * 		// ルール名: 該当ルールのパラメータ。パラメータを取らないルールの場合はtrueを指定。複数のパラメータを取るルールの場合は配列指定。
		 * 		required: true,
		 * 		pattern: /&circ;[a-z|0-9]*$/,
		 * 		size: [4, 10]
		 * 	}
		 * });
		 * </code></pre>
		 *
		 * 上記の場合、useridは指定が必須(required指定)かつ/&circ;[a-z|0-9]*$/の正規表現を満たし(pattern指定)、4文字以上10字以下(size指定)のルールを追加しています。
		 * </p>
		 * <p>
		 * 以下のようなルールが定義されています。
		 * </p>
		 * <table><thead>
		 * <tr>
		 * <th>ルール名</th>
		 * <th>パラメータ</th>
		 * <th>定義</th>
		 * </tr>
		 * </thead><tbody>
		 * <tr>
		 * <td>required</td>
		 * <td>なし</td>
		 * <td>値がnull,undefined,空文字のいずれでもないこと</td>
		 * </tr>
		 * <tr>
		 * <td>customFunc</td>
		 * <td>func</td>
		 * <td>funcには第1引数に値を取る関数を指定する。funcがtrueを返すこと。</td>
		 * </tr>
		 * <tr>
		 * <td>assertNull</td>
		 * <td>なし</td>
		 * <td>値がnullまたはundefinedであること</td>
		 * </tr>
		 * <tr>
		 * <td>assertNotNull</td>
		 * <td>なし</td>
		 * <td>値がnullまたはundefinedでないこと</td>
		 * </tr>
		 * <tr>
		 * <td>assertFalse</td>
		 * <td>なし</td>
		 * <td>値がfalseであること</td>
		 * </tr>
		 * <tr>
		 * <td>assertTrue</td>
		 * <td>なし</td>
		 * <td>値がtrueであること</td>
		 * </tr>
		 * <tr>
		 * <td>max</td>
		 * <td>[max, inclusive]</td>
		 * <td>inclusiveは省略可能。値がmax未満の数値であること。またinclusiveにtrueを指定した場合は境界値にmaxも含める(値がmax以下であること)。</td>
		 * </tr>
		 * <tr>
		 * <td>min</td>
		 * <td>[mix, inclusive]</td>
		 * <td>inclusiveは省略可能。値がminより大きい数値であること。またinclusiveにtrueを指定した場合は境界値にminも含める(値がmin以上であること)。</td>
		 * </tr>
		 * <tr>
		 * <td>future</td>
		 * <td>なし</td>
		 * <td>値がDate型で現在時刻より未来であること。</td>
		 * </tr>
		 * <tr>
		 * <td>past</td>
		 * <td>なし</td>
		 * <td>値がDate型で現在時刻より過去であること。</td>
		 * </tr>
		 * <tr>
		 * <td>digits</td>
		 * <td>[string, fraction]</td>
		 * <td>数値の桁数判定。整数部分がinteger桁数以下でありかつ小数部分がfraction桁数以下の数値を表す文字列であること</td>
		 * </tr>
		 * <tr>
		 * <td>pattern</td>
		 * <td>[regexp]</td>
		 * <td>regexpには正規表現を指定。値がregexpを満たす文字列であること</td>
		 * </tr>
		 * <tr>
		 * <td>size</td>
		 * <td>[min, max]</td>
		 * <td>値のサイズがmin以上max以下であること。ただし、値がプレーンオブジェクトの場合はプロパティの数、配列または文字列の場合はその長さをその値のサイズとする。</td>
		 * </tr>
		 * </tbody></table>
		 *
		 * @memberOf h5.validation.FormValidationLogic
		 * @param {Object} ルールオブジェクト
		 */addRule:function addRule(ruleObject){for(var prop in ruleObject){var propRule=ruleObject[prop]; // 既に適用ルールが定義されているプロパティについては上書き
this._rule[prop]=propRule;}}, /**
		 * ルールの削除
		 * <p>
		 * {@link h5.validation.FormValidationLogic.addRule}で追加したプロパティルールを削除します。
		 * </p>
		 * <p>
		 * ルールの削除はプロパティ単位で行います。第1引数に対象となるプロパティ名を指定(複数指定可)します。
		 * </p>
		 *
		 * @memberOf h5.validation.FormValidationLogic
		 * @param {string|string[]} keys プロパティ名またはその配列
		 */removeRule:function removeRule(keys){if(!isArray(keys)){delete this._rule[keys];}for(var i=0,l=keys.length;i<l;i++){delete this._rule[keys[i]];}}, /**
		 * ルールの無効化
		 * <p>
		 * 第1引数に指定されたプロパティについてのバリデートを無効化します
		 * </p>
		 *
		 * @memberOf h5.validation.FormValidationLogic
		 * @param {string|string[]} name プロパティ名またはその配列
		 */disableRule:function disableRule(name){var names=wrapInArray(name);for(var i=0,l=names.length;i<l;i++){var index=$.inArray(names[i],this._disableProperties);if(index===-1){this._disableProperties.push(names[i]);}}}, /**
		 * ルールの有効化
		 * <p>
		 * 第1引数に指定されたプロパティについてのバリデートを有効化します
		 * </p>
		 *
		 * @memberOf h5.validation.FormValidationLogic
		 * @param {string|string[]} name プロパティ名またはその配列
		 */enableRule:function enableRule(name){var names=wrapInArray(name);for(var i=0,l=names.length;i<l;i++){var index=$.inArray(names[i],this._disableProperties);if(index!==-1){this._disableProperties.splice(index,1);}}}, /**
		 * パラメータのバリデートを行う
		 * <p>
		 * 第1引数にはバリデート対象となるオブジェクト、第2引数には第1引数のオブジェクトのうち、バリデートを行うキー名(複数の場合は配列)を指定します。
		 * </p>
		 * <p>
		 * 第2引数を省略した場合は第1引数のオブジェクトが持つすべてのキーがバリデート対象になります。
		 * </p>
		 * <p>
		 * バリデートは{@link h5.validation.FormValidationLogic.addRule}によって登録されたルールで行われます。
		 * </p>
		 *
		 * @private
		 * @memberOf h5.validation.FormValidationLogic
		 * @param {Object} obj バリデート対象となるオブジェクト
		 * @param {string|string[]} [names] 第1引数オブジェクトのうち、バリデートを行うキー名またはその配列(指定無しの場合は全てのキーが対象)
		 * @returns {ValidationResult} バリデート結果
		 */_validate:function _validate(obj,names){var _this=this;var validProperties=[];var invalidProperties=[];var properties=[];var validatingProperties=[];var invalidReason=null;var targetNames=names&&(isArray(names)?names:[names]);var isAsync=false; // プロパティ名、プロミスのマップ。1プロパティにつき非同期チェックが複数あればプロミスは複数
var propertyWaitingPromsies={};for(var prop in this._rule){if(names&&$.inArray(prop,targetNames)===-1||$.inArray(prop,this._disableProperties)!==-1){ // バリデートを行うプロパティ名指定がある場合は、そこにないプロパティの場合はバリデート対象にしない
// また、disableRule()でバリデートしないよう設定されているプロパティについてもバリデート対象にしない
continue;}var rule=this._rule[prop];var orgValue=obj[prop];var isInvalidProp=false;var isAsyncProp=false; // ルールを優先度順にソート
var sortedRuleNames=[];for(var ruleName in rule){sortedRuleNames.push(ruleName);}validateRuleManager.sortRuleByPriority(sortedRuleNames); // ルールについてチェックする。あるルールでバリデートエラーが起きても、他のルールもチェックする。
for(var i=0,l=sortedRuleNames.length;i<l;i++){var ruleName=sortedRuleNames[i];var args=rule[ruleName];if((!obj.hasOwnProperty(prop)||args==null)&&!(ruleName===DEFAULT_RULE_NAME_REQUIRED&&args)){ // そもそもvalidate対象のオブジェクトにチェック対象のプロパティがない場合、チェックしない
// また、argsがundefinedならそのルールはチェックしない
// ただし、required指定がある場合はチェックする
continue;} // 値の型変換
var value=this._convertBeforeValidate?this._convertBeforeValidate(orgValue,ruleName):orgValue;if(isArray(args)){args=[value].concat(args);}else {args=[value,args];}var validateFunc=validateRuleManager.getValidateFunction(ruleName);if(!validateFunc){fwLogger.warn(FW_LOG_NOT_DEFINED_RULE_NAME,ruleName);break;}var ret=validateFunc.apply(this,args); // validate関数呼び出し時の引数を格納しておく
var ruleValue={};var argNames=validateRuleManager.getValidateArgNames(ruleName);if(argNames){for(var j=0,len=argNames.length;j<len;j++){ruleValue[argNames[j]]=args[j+1];}} // 非同期の場合
if(isPromise(ret)&&!isRejected(ret)&&!isResolved(ret)){ // pendingのプロミスが返ってきた場合
// 結果が返ってきたらvalidateイベントをあげるようにしておく
isAsyncProp=true;propertyWaitingPromsies[prop]=propertyWaitingPromsies[prop]||[]; // プロミス自体にルール名と値と引数を覚えさせておく
propertyWaitingPromsies[prop].push(ret.promise({ruleName:ruleName,value:value,ruleValue:ruleValue}));} // 同期でエラーが返ってきた(falseまたはreject済みプロミスが返ってきた場合)
if(!ret||isPromise(ret)&&isRejected(ret)){ // validate関数がfalseを返したまたは、promiseを返したけどすでにreject済みの場合はvalidate失敗
// invalidReasonの作成
invalidReason=invalidReason||{};if(!invalidReason[prop]){invalidReason[prop]={name:prop,value:orgValue,violation:[]};}invalidReason[prop].violation.push(this._createViolation(ruleName,ruleValue));isInvalidProp=true;}}if(isAsyncProp){isAsync=true;validatingProperties.push(prop);}else {(isInvalidProp?invalidProperties:validProperties).push(prop);}properties.push(prop);}var isValid=!invalidProperties.length;var validationResult=new ValidationResult({validProperties:validProperties,invalidProperties:invalidProperties,validatingProperties:validatingProperties,properties:properties,invalidReason:invalidReason,isAsync:isAsync, // isValidは現時点でvalidかどうか(非同期でvalidateしているものは関係ない)
isValid:isValid, // 非同期でvalidateしているものがあって現時点でisValid=falseでない(=全部OKかどうか決まっていない)時はisAllValidはnull
isAllValid:isValid?isAsync?null:true:false});if(isAsync){var that;var prop;var promises;var doneHandler;var failHandler;(function(){ /*
				 * validateが全て完了しているかチェックしてvalidateCompelteを上げる関数
				 */var checkValidateComplete=function checkValidateComplete(result){if(result.validCount+result.invalidCount===result.properties.length){result.isAllValid=result.isValid;result.dispatchEvent({type:EVENT_VALIDATE_COMPLETE});}};that=_this; // 非同期の場合、結果が返って気次第イベントをあげる
for(prop in propertyWaitingPromsies){promises=propertyWaitingPromsies[prop];doneHandler=function(_prop){return function(){ // あるプロパティについてのすべての非同期バリデートが終了したらvalidであることを通知
validationResult.dispatchEvent({type:EVENT_VALIDATE,name:_prop,isValid:true, // validate対象のオブジェクトに指定された値
value:obj[_prop]});checkValidateComplete(validationResult);};}(prop);failHandler=function(_prop,_promises,_param){return function(){ // 一つでも失敗したらfailCallbackが実行される
// 既にinvalidになっていたらイベントは上げずに、何もしない
if($.inArray(_prop,validationResult.invalidProperties)!==-1){return;} // どのルールのプロミスがrejectされたか
var ruleName,ruleValue,value;for(var i=0,l=_promises.length;i<l;i++){var p=_promises[i];if(isRejected(p)){ruleName=p.ruleName;ruleValue=p.ruleValue;value=p.value;break;}}validationResult.dispatchEvent({type:EVENT_VALIDATE,name:_prop,isValid:false,value:value,violation:that._createViolation(ruleName,ruleValue,arguments)});checkValidateComplete(validationResult);};}(prop,promises); // failハンドラでどのプロミスの失敗かを判定したいのでwaitForPromisesではなくwhenを使用している
$.when.apply($,promises).done(doneHandler).fail(failHandler);}})();}return validationResult;}, /**
		 * ValidationResultに格納するinvalidReasonオブジェクトを作成する
		 *
		 * @private
		 * @memberOf h5.validation.FormValidationLogic
		 * @param ruleName
		 * @param ruleValue
		 * @param failHandlerArgs 非同期バリデートの場合、failハンドラに渡された引���リスト
		 */_createViolation:function _createViolation(ruleName,ruleValue,failHandlerArgs){var ret={ruleName:ruleName,ruleValue:ruleValue};if(failHandlerArgs){ret.reason=h5.u.obj.argsToArray(failHandlerArgs);}return ret;}, /**
		 * Formから取得した値のvalidateのために、値をルールに適した型へ変換を行う
		 *
		 * @private
		 * @memberOf h5.validation.FormValidationLogic
		 * @param {Any} value
		 * @param {string} ruleName ルール名
		 */_convertBeforeValidate:function _convertBeforeValidate(value,ruleName){if(value==null){ // nullまたはundefinedの場合は型変換しない
return value;}switch(ruleName){case DEFAULT_RULE_NAME_MAX:case DEFAULT_RULE_NAME_MIN:return parseFloat(value);case DEFAULT_RULE_NAME_FUTURE:case DEFAULT_RULE_NAME_PAST:return new Date(value);}return value;}}; // デフォルトルールの追加
defineRule(DEFAULT_RULE_NAME_REQUIRED,rule.required,null,51);defineRule(DEFAULT_RULE_NAME_CUSTOM_FUNC,rule.customFunc,['func'],50);defineRule(DEFAULT_RULE_NAME_ASSERT_NULL,rule.assertNull,null,50);defineRule(DEFAULT_RULE_NAME_ASSERT_NOT_NULL,rule.assertNotNull,null,50);defineRule(DEFAULT_RULE_NAME_ASSERT_FALSE,rule.assertFalse,null,50);defineRule(DEFAULT_RULE_NAME_ASSERT_TRUE,rule.assertTrue,null,50);defineRule(DEFAULT_RULE_NAME_MAX,rule.max,['max','inclusive'],50);defineRule(DEFAULT_RULE_NAME_MIN,rule.min,['min','inclusive'],50);defineRule(DEFAULT_RULE_NAME_FUTURE,rule.future,null,50);defineRule(DEFAULT_RULE_NAME_PAST,rule.past,null,50);defineRule(DEFAULT_RULE_NAME_DIGITS,rule.digits,['integer','fraction'],50);defineRule(DEFAULT_RULE_NAME_PATTERN,rule.pattern,['regexp'],50);defineRule(DEFAULT_RULE_NAME_SIZE,rule.size,['min','max'],50); // =============================
// Expose to window
// =============================
/**
	 * @namespace
	 * @name validation
	 * @memberOf h5
	 */h5.u.obj.expose('h5.validation',{defineRule:defineRule});h5.core.expose(FormValidationLogic);})(); /* ------ h5.ui ------ */(function(){ // =========================================================================
//
// Constants
//
// =========================================================================
// =============================
// Production
// =============================
/**
	 * メッセージを表示する要素のクラス名
	 */var CLASS_INDICATOR_THROBBER='indicator-throbber'; /**
	 * スロバーを表示する要素のクラス名
	 */var CLASS_INDICATOR_MESSAGE='indicator-message'; /**
	 * スロバー本体(Canvas)に付与するクラス名
	 */var CLASS_THROBBER_CANVAS='throbber-canvas'; /**
	 * スロバー内に進捗率(パーセント)を表示する要素のクラス名
	 */var CLASS_THROBBER_PERCENT='throbber-percent'; /**
	 * インジケータ - ルートのクラス名
	 */var CLASS_INDICATOR_ROOT='h5-indicator'; /**
	 * インジケータ - メッセージのクラス名
	 */var CLASS_INDICATOR_CONTENT='content'; /**
	 * インジケータ - オーバーレイのクラス名
	 */var CLASS_OVERLAY='overlay'; /**
	 * インジケータ - オーバーレイのクラス名
	 * <p>
	 * IE6でのみ使用する。
	 */var CLASS_SKIN='skin'; /**
	 * 一番外側にあるVML要素のクラス名
	 */var CLASS_VML_ROOT='vml-root'; /**
	 * VMLのスタイル定義要素(style要素)のid
	 */var ID_VML_STYLE='h5-vmlstyle'; /**
	 * メッセージに要素に表示する文字列のフォーマット
	 */var FORMAT_THROBBER_MESSAGE_AREA='<span class="'+CLASS_INDICATOR_THROBBER+'"></span><span class="'+CLASS_INDICATOR_MESSAGE+'" {0}>{1}</span>'; /**
	 * jQuery.data()で使用するキー名
	 * <p>
	 * インジケータ表示前のスタイル、positionプロパティの値を保持するために使用する
	 */var DATA_KEY_POSITION='before-position'; /**
	 * jQuery.data()で使用するキー名
	 * <p>
	 * インジケータ表示前のスタイル、zoomプロパティの値を保持するために使用する
	 */var DATA_KEY_ZOOM='before-zoom'; /**
	 * scrollToTop() リトライまでの待機時間
	 */var WAIT_MILLIS=500; /**
	 * アニメーション(fadeIn,fadeOut)するときの1フレームの時間(ms)
	 * <p>
	 * jQuery.fx.intervalがデフォルトで13なので、それに倣って13を指定している
	 * </p>
	 */var ANIMATION_INTERVAL=13; // =============================
// Development Only
// =============================
/* del begin */ /* del end */ // =========================================================================
//
// Cache
//
// =========================================================================
var h5ua=h5.env.ua;var isJQueryObject=h5.u.obj.isJQueryObject;var argsToArray=h5.u.obj.argsToArray; // =========================================================================
//
// Privates
//
// =========================================================================
// =============================
// Variables
// =============================
// h5.cssを読み込んで、Canvas版スロバーに適用するスタイルの情報を保持するマップ
// key:クラス名  value:CSSプロパティ名
var throbberStyleMap={throbber:['width','height'],'throbber-line':['width','color']}; /**
	 * Canvasをサポートしているか
	 * <p>
	 * (true:サポート/false:未サポート)
	 */var isCanvasSupported=!!document.createElement('canvas').getContext; /**
	 * VMLをサポートしているか (true:サポート/false:未サポート)
	 */ // 機能ベースでVMLのサポート判定を行う(IE6,7,8,9:true その他のブラウザ:false)
var isVMLSupported=function(){var fragment=document.createDocumentFragment();var div=fragment.appendChild(document.createElement('div'));div.innerHTML='<v:line strokeweight="1"/>';var child=div.firstChild;child.style.behavior='url(#default#VML)';return typeof child.strokeweight==='number';}(); /**
	 * 互換モードか判定します
	 */var compatMode=document.compatMode!=='CSS1Compat'; /**
	 * 対象ブラウザがIE6以前のブラウザか
	 */var isLegacyIE=h5ua.isIE&&h5ua.browserVersion<=6; /**
	 * position:fixedでインジケータを描画するかのフラグ。
	 * <p>
	 * 自動更新またはアップデート可能なブラウザは、最新のブラウザであるものとして判定しない。(常にposition:fixedは有効とする)
	 * <p>
	 * 以下の理由から、機能ベースでの判定は行わない。
	 * <ul>
	 * <li>$.support.fixedPosition()にバグがあり、モバイルブラウザの判定が正しくない。</li>
	 * <li>jQuery1.8では、$.support.fixedPosition()が無くなっている。 (fixedPositionを判定するAPIが無い)</li>
	 * <li>機能ベースでモバイル・デスクトップの両方を検知するのは困難。</li>
	 * </ul>
	 * <p>
	 * <b>position:fixedについて</b>
	 * <ul>
	 * <li>position:fixed対応表: http://caniuse.com/css-fixed</li>
	 * <li>Androidは2.2からposition:fixedをサポートしており、2.2と2.3はmetaタグに「user-scalable=no」が設定されていないと機能しない。<br>
	 * http://blog.webcreativepark.net/2011/12/07-052517.html </li>
	 * <li>Androidのデフォルトブラウザでposition:fixedを使用すると、2.xはkeyframesとtransformをposition:fixedで使用すると正しい位置に表示されないバグが、4.xは画面の向きが変更されると描画が崩れるバグがあるため使用しない。
	 * <li>Windows Phoneは7.0/7.5ともに未サポート https://github.com/jquery/jquery-mobile/issues/3489</li>
	 * <ul>
	 */var usePositionFixed=!(h5ua.isAndroidDefaultBrowser||h5ua.isiOS&&h5ua.browserVersion<5||isLegacyIE||compatMode||h5ua.isWindowsPhone); /**
	 * CSS3 Animationsをサポートしているか
	 * <p>
	 * (true:サポート/false:未サポート)
	 */var isCSS3AnimationsSupported=null; /**
	 * ウィンドウの高さを取得するメソッド
	 */var windowHeight=null; /**
	 * ドキュメントの高さを取得するメソッド
	 */var documentHeight=null; /**
	 * ドキュメントの高さを取得するメソッド
	 */var documentWidth=null; /**
	 * Y方向のス���ロール値を取得するメソッド
	 */var scrollTop=null; /**
	 * Y方向のスクロール値を取得するメソッド
	 */var scrollLeft=null; // =============================
// Functions
// =============================
/**
	 * 指定されたCSS3プロパティをサポートしているか判定します。
	 * <p>
	 * プレフィックスなし、プレフィックスありでサポート判定を行います。
	 * <p>
	 * 判定に使用するプレフィックス
	 * <ul>
	 * <li>Khtml (Safari2以前)</li>
	 * <li>ms (IE)</li>
	 * <li>O (Opera)</li>
	 * <li>Moz (Firefox)</li>
	 * <li>Webkit (Safari2以降/Chrome)</li>
	 * </ul>
	 * <p>
	 * ※Chrome20にて、WebKitプレフィックスはデバッグでの表示上は小文字(webkitXxxxx)だが、先頭文字が小文字または大文字でも正しく判定される。
	 * しかし、古いバージョンでは確認できていないため『Webkit』で判定する。
	 */var supportsCSS3Property=function(){var fragment=document.createDocumentFragment();var div=fragment.appendChild(document.createElement('div'));var prefixes='Webkit Moz O ms Khtml'.split(' ');var len=prefixes.length;return function(propName){ // CSSシンタックス(ハイフン区切りの文字列)をキャメルケースに変換
var propCamel=$.camelCase(propName); // ベンダープレフィックスなしでサポートしているか判定
if(propCamel in div.style){return true;}propCamel=propCamel.charAt(0).toUpperCase()+propCamel.slice(1); // ベンダープレフィックスありでサポートしているか判定
for(var i=0;i<len;i++){if(prefixes[i]+propCamel in div.style){return true;}}return false;};}(); /**
	 * CSSファイルに書かれた、Canvasのスタイル定義を取得します。
	 */function readThrobberStyle(theme){var readStyles={};for(var prop in throbberStyleMap){var $elem=$('<div></div>').addClass(theme).addClass(prop).appendTo('body');var propCamel=$.camelCase(prop);readStyles[propCamel]={};$.map(throbberStyleMap[prop],function(item,idx){if(item==='width'||item==='height'){readStyles[propCamel][item]=parseInt($elem.css(item).replace(/\D/g,''),10);}else {readStyles[propCamel][item]=$elem.css(item);}});$elem.remove();}return readStyles;} /**
	 * VML要素を生成します。
	 */function createVMLElement(tagName,doc,opt){var elem=doc.createElement('v:'+tagName);for(var prop in opt){elem.style[prop]=opt[prop];}return elem;} /**
	 * 要素のサイズから、スロバーの線を引く座標を計算します。
	 */function calculateLineCoords(size,line){var positions=[];var centerPos=size/2;var radius=size*0.8/2;var eachRadian=360/line*Math.PI/180;for(var j=1;j<=line;j++){var rad=eachRadian*j;var cosRad=Math.cos(rad),sinRad=Math.sin(rad);positions.push({from:{x:centerPos+radius/2*cosRad,y:centerPos+radius/2*sinRad},to:{x:centerPos+radius*cosRad,y:centerPos+radius*sinRad}});}return positions;} /**
	 * 任意要素のスクロールサイズ(scrollWidth/Height：見た目でなくコンテンツ全体のサイズ)を取得します。
	 * IE6は内包する要素の方が小さい場合にscrollサイズがclientサイズより小さくなってしまうバグがあります（本来はscroll===client）。
	 * そこで、IE6の場合はscrollとclientのうち大きい方のサイズを返します。<br>
	 * また、scrollW/Hは整数を返しますが、内部的にはサイズが小数になっている場合があります。Chrome22, Firefox20,
	 * Opera12ではscrollサイズをセットしても問題ありませんが、IEの場合
	 * (内部サイズが小数のときに)scrollW/Hの大きさでオーバーレイのサイズを設定すると意図しないスクロールバーが出てしまう場合があります。
	 * このメソッドは、IEかつ内部に小数を取り得る環境と判断した場合この誤差を調整してこの問題を回避します。
	 *
	 * @private
	 * @param elem {Element} DOM要素
	 * @returns {Object}
	 */function getScrollSize(elem){var retW=elem.scrollWidth;var retH=elem.scrollHeight;if(isLegacyIE){retW=Math.max(retW,elem.clientWidth);retH=Math.max(retH,elem.clientHeight);}else if(h5ua.isIE&&typeof getComputedStyle==='function'){ //getComputedStyleが未定義な環境(IE)でエラーにならないように、typeofを使って判定
//IE9以上(かつIE9モード以上)。この場合、ボックスサイズが小数になる可能性がある
//(IE8orIE8モード以下の場合常に整数で計算されるので、scrollサイズを使えばよい)。
//ComputedStyleで厳密なサイズを取得し、その分を調整することで
//意図しないスクロールバーが出ないようにする。
//-1しているのは四捨五入させるため(描画の際はピクセルにスナップされるようなので)。
// エレメントが別ウィンドウの場合もあるので、elemの属するwindowのgetComputedStyleを使用
var comStyle=getWindowOfDocument(getDocumentOf(elem)).getComputedStyle(elem,null);var eW=parseFloat(comStyle.width)+parseFloat(comStyle.paddingLeft)+parseFloat(comStyle.paddingRight);retW+=eW-parseInt(eW)-1;var eH=parseFloat(comStyle.height)+parseFloat(comStyle.paddingTop)+parseFloat(comStyle.paddingBottom);retH+=eH-parseInt(eH)-1;}return {w:retW,h:retH};} /**
	 * ドキュメント(コンテンツ全体)の高さまたは幅を取得します。
	 * <p>
	 * ウィンドウの高さを取得したい場合は引数に"Height"を、 ウィンドウの幅を取得したい場合は引数に"Width"を指定して下さい。
	 * <p>
	 * 以下のバグがあるため自前で計算を行う。
	 * <p>
	 * 1.6.4/1.7.1/1.8.0は正しい値を返すが1.7.1ではバグがあるため正しい値を返さない。<br>
	 * http://bugs.jquery.com/ticket/3838<br>
	 * http://pastebin.com/MaUuLjU2
	 * <p>
	 * IE6だと同一要素に対してスタイルにwidthとpaddingを指定するとサイズがおかしくなる。<br>
	 * http://hiromedo-net.sakura.ne.jp/memoblog/?p=47
	 */function documentSize(propName){var prop=propName;return function(){var body=document.body;var docElem=document.documentElement; // 互換モードの場合はサイズ計算にbody要素を、IE6標準の場合はdocumentElementを使用する
var elem=compatMode?body:isLegacyIE?docElem:null;if(elem){if(prop==='Height'){ // ウィンドウサイズを大きくすると、scroll[Width/Height]よりもclient[Width/Height]の値のほうが大きくなるため、
// client[Width/Height]のほうが大きい場合はこの値を返す
return elem['client'+prop]>elem['scroll'+prop]?elem['client'+prop]:elem['scroll'+prop];}return elem['client'+prop];}return Math.max(body['scroll'+prop],docElem['scroll'+prop],body['offset'+prop],docElem['offset'+prop],docElem['client'+prop]);};} /**
	 * スクロールバーの幅も含めた、ウィンドウ幅または高さを取得します。
	 * <p>
	 * ウィンドウの高さを取得したい場合は引数に"Height"を、 ウィンドウの幅を取得したい場合は引数に"Width"を指定して下さい。
	 * <p>
	 * jQuery1.8からQuirksモードをサポートしていないため、$(window).height()からウィンドウサイズを取得できない(0を返す)ため、自前で計算を行う。<br>
	 * http://blog.jquery.com/2012/08/30/jquery-1-8-1-released/
	 */function windowSize(propName){var prop=propName;return function(){var body=document.body;var docElem=document.documentElement;return typeof window['inner'+prop]==='number'?window['inner'+prop]:compatMode?body['client'+prop]:docElem['client'+prop];};} /**
	 * Y方向またはX方向のスクロール量を取得します。
	 * <p>
	 * Y方向のスクロール量を取得したい場合は引数に"Top"を、 X方向のスクロール量を取得したい場合は引数に"Left"を指定して下さい。
	 */function scrollPosition(propName){var prop=propName;return function(){ // doctypeが「XHTML1.0 Transitional DTD」だと、document.documentElement.scrollTopが0を返すので、互換モードを判定する
// http://mokumoku.mydns.jp/dok/88.html
var elem=compatMode?document.body:document.documentElement;var offsetProp=prop==='Top'?'Y':'X';return window['page'+offsetProp+'Offset']||elem['scroll'+prop];};} /**
	 * スクロールバーの幅を含めない、ウィンドウ幅または高さを取得します。
	 */function getDisplayArea(prop){var e=compatMode?document.body:document.documentElement;return h5ua.isiOS?window['inner'+prop]:e['client'+prop];} /**
	 * 指定された要素の左上からの絶対座標を取得します。
	 * <p>
	 * 1.8.xのjQuery.offset()は、Quirksモードでのスクロール量の計算が正しく行われないため自前で計算する。
	 * </p>
	 * <p>
	 * 絶対座標は、
	 *
	 * <pre>
	 * getBoundingClinetRectの値 + スクロール量 - clientTop / Left
	 * </pre>
	 *
	 * で計算します。
	 * </p>
	 * <p>
	 * IE6の場合、BODY要素についてgetBoundingClientRect()の値が正しく計算できず、
	 * また、HTML要素のmargin,borderが表示されないので、BODY要素の場合は、htmlのpadding～bodyのborderまでを加えた値を計算して返します。
	 * </p>
	 */function getOffset(element){var elem=$(element)[0];var body=document.body;var html=$('html')[0];var box={top:0,left:0};if(elem===body&&isLegacyIE){return {top:parseFloat(html.currentStyle.paddingTop||0)+parseFloat(body.currentStyle.marginTop||0)+parseFloat(body.currentStyle.borderTop||0),left:parseFloat(html.currentStyle.paddingLeft||0)+parseFloat(body.currentStyle.marginLeft||0)+parseFloat(body.currentStyle.borderLeft||0)};}if(typeof elem.getBoundingClientRect!=="undefined"){box=elem.getBoundingClientRect();}var docElem=compatMode?body:document.documentElement;var clientTop=docElem.clientTop||0;var clientLeft=docElem.clientLeft||0;return {top:box.top+scrollTop()-clientTop,left:box.left+scrollLeft()-clientLeft};} /**
	 * 指定された要素で発生したイベントを無効にする
	 */function disableEventOnIndicator() /* var_args */{var disabledEventTypes='click dblclick touchstart touchmove touchend mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave focus focusin focusout blur change select';$.each(argsToArray(arguments),function(i,e){e.bind(disabledEventTypes,function(){return false;});});} /**
	 * スクリーンロック対象の要素か判定します。
	 */function isScreenlockTarget(element){var e=isJQueryObject(element)?element[0]:element;return e===window||e===document||e===document.body;} /**
	 * VMLが機能するよう名前空間とVML要素用のスタイルを定義する(VML用)
	 */function defineVMLNamespaceAndStyle(doc){ // 既に定義済みなら何もしない
if(doc.getElementById(ID_VML_STYLE)){return;}doc.namespaces.add('v','urn:schemas-microsoft-com:vml'); // メモリリークとIE9で動作しない問題があるため、document.createStyleSheet()は使用しない
var vmlStyle=doc.createElement('style');doc.getElementsByTagName('head')[0].appendChild(vmlStyle);vmlStyle.id=ID_VML_STYLE;var styleDef=['v\\:stroke','v\\:line','v\\:textbox'].join(',')+' { behavior:url(#default#VML); }';vmlStyle.setAttribute('type','text/css');vmlStyle.styleSheet.cssText=styleDef;} /**
	 * getComputedStyleがあるブラウザについて、getComputedStyleを呼び出した結果を返します。
	 * <p>
	 * 渡されたエレメントが属するdocumentツリーのwindowオブジェクトのgetComputedStyleを使用します
	 * </p>
	 *
	 * @private
	 * @param {DOM} elem
	 * @returns {Style} elemのcomputedStyle
	 */function getComputedStyleObject(elem){return getWindowOf(elem).getComputedStyle(elem,null);} /**
	 * スタイルを取得する
	 * <p>
	 * IEでjQuery1.8.X～1.10.Xを使用した時、ポップアップウィンドウ内の要素についてスタイルを取得しようとするとエラーになるため、ラップしている。
	 * </p>
	 * <p>
	 * getComputedStyleがないブラウザについては、jQuery.css()を使って取得した値を返す。
	 * </p>
	 *
	 * @private
	 * @param elem {DOM}
	 * @param prop {String} CSSプロパティ
	 * @returns 第1引数について、computedStyleを取得し、第2引数に指定されたプロパティの値を返す
	 */function getComputedStyleValue(elem,prop){if(!getWindowOf(elem).getComputedStyle){return $(elem).css(prop);}return getComputedStyleObject(elem)[prop];} /**
	 * 要素のheight(offsetHeight)を取得する
	 * <p>
	 * IEでjQuery1.8.X～1.10.Xを使用した時、ポップアップウィンドウ内の要素についてスタイルを取得しようとするとエラーになるため、ラップしている。
	 * </p>
	 * <p>
	 * getComputedStyleがないブラウザについては、height()で取得した値を返す。
	 * </p>
	 *
	 * @private
	 * @param {DOM} elem
	 * @returns {Number} 引数で渡された要素のheight
	 */function getHeight(elem){if(!getWindowOf(elem).getComputedStyle){return $(elem).height();}var elemStyle=getComputedStyleObject(elem);return elem.offsetHeight-parseFloat(elemStyle.paddingTop)-parseFloat(elemStyle.paddingBottom);} /**
	 * 要素のwidth(offsetWidth)を取得する
	 * <p>
	 * IEでjQuery1.8.X～1.10.Xを使用した時、ポップアップウィンドウ内の要素についてスタイルを取得しようとするとエラーになるため、ラップしている。
	 * </p>
	 * <p>
	 * getComputedStyleがないブラウザについては、width()で取得した値を返す。
	 * </p>
	 *
	 * @private
	 * @param {DOM} elem
	 * @returns {Number} 引数で渡された要素のwidth
	 */function getWidth(elem){if(!getWindowOf(elem).getComputedStyle){return $(elem).width();}var elemStyle=getComputedStyleObject(elem);return elem.offsetWidth-parseFloat(elemStyle.paddingLeft)-parseFloat(elemStyle.paddingRight);} /**
	 * 要素のouterHeightを取得する
	 * <p>
	 * IEでjQuery1.8.X～1.10.Xを使用した時、ポップアップウィンドウ内の要素についてスタイルを取得しようとするとエラーになるため、ラップしている。
	 * </p>
	 * <p>
	 * getComputedStyleがないブラウザについては、outerHeight()で取得した値を返す。
	 * </p>
	 *
	 * @private
	 * @param {DOM} elem
	 * @param {Boolean} [includeMargin=true] maginを含めるかどうか
	 * @returns {Number} 引数で渡された要素のouterHeight
	 */function getOuterHeight(elem,includeMargin){if(!getWindowOf(elem).getComputedStyle){return $(elem).outerHeight();}var elemStyle=getComputedStyleObject(elem);return getHeight(elem)+parseFloat(elemStyle.paddingTop)+parseFloat(elemStyle.paddingBottom)+parseFloat(elemStyle.borderTopWidth)+parseFloat(elemStyle.borderBottomWidth)+(includeMargin?parseFloat(elemStyle.marginTop)+parseFloat(elemStyle.marginBottom):0);} /**
	 * 要素のouterWidthを取得する
	 * <p>
	 * IEでjQuery1.8.X～1.10.Xを使用した時、ポップアップウィンドウ内の要素についてスタイルを取得しようとするとエラーになるため、ラップしている。
	 * </p>
	 * <p>
	 * getComputedStyleがないブラウザについては、outerWidth()で取得した値を返す。
	 * </p>
	 *
	 * @param {DOM} elem
	 * @param {Boolean} [includeMargin=true] maginを含めるかどうか
	 * @returns {Number} 引数で渡された要素のouterWidth
	 */function getOuterWidth(elem,includeMargin){if(!getWindowOf(elem).getComputedStyle){return $(elem).outerWidth();}var elemStyle=getComputedStyleObject(elem);return getWidth(elem)+parseFloat(elemStyle.paddingLeft)+parseFloat(elemStyle.paddingRight)+parseFloat(elemStyle.borderLeftWidth)+parseFloat(elemStyle.borderRightWidth)+(includeMargin?parseFloat(elemStyle.marginLeft)+parseFloat(elemStyle.marginRight):0);} /**
	 * 要素のinnerHeightを取得する
	 * <p>
	 * IEでjQuery1.8.X～1.10.Xを使用した時、ポップアップウィンドウ内の要素についてスタイルを取得しようとするとエラーになるため、ラップしている。
	 * </p>
	 * <p>
	 * getComputedStyleがないブラウザについては、innerHeight()で取���した値を返す。
	 * </p>
	 *
	 * @param {DOM} elem
	 * @returns {Number} 引数で渡された要素のinnerHeight
	 */function getInnerHeight(elem){if(!getWindowOf(elem).getComputedStyle){return $(elem).innerHeight();}var elemStyle=getComputedStyleObject(elem);return getHeight(elem)+parseFloat(elemStyle.paddingTop)+parseFloat(elemStyle.paddingBottom);} /**
	 * 要素のinnerWidthを取得する
	 * <p>
	 * IEでjQuery1.8.X～1.10.Xを使用した時、ポップアップウィンドウ内の要素についてスタイルを取得しようとするとエラーになるため、ラップしている。
	 * </p>
	 * <p>
	 * getComputedStyleがないブラウザについては、innerWidth()で取得した値を返す。
	 * </p>
	 *
	 * @param {DOM} elem
	 * @returns {Number} 引数で渡された要素のinnerWidth
	 */function getInnerWidth(elem){if(!getWindowOf(elem).getComputedStyle){return $(elem).innerWidth();}var elemStyle=getComputedStyleObject(elem);return getWidth(elem)+parseFloat(elemStyle.paddingLeft)+parseFloat(elemStyle.paddingRight);} /**
	 * fadeIn, fadeOut用のアニメーション関数
	 *
	 * @param {Array} props $elemのアニメーション終了時のスタイルの配列。propsの配列のインデックスは$elemのインデックスに対応する。
	 * @param {jQuery} $elem アニメーションさせる要素
	 * @param {Number} time アニメーションに掛ける時間
	 * @param {Function} callback アニメーション終了時に実行するコールバック関数
	 */function animate(props,$elem,time,callback){var interval=ANIMATION_INTERVAL;var count=0; // 現在の値(アニメーションするごとに変化)
var curProps=[]; // 1インターバルごとに変化する量
var v=[]; // 現在のスタイルを$elemの最初の要素から取得し、それを基準にアニメーションする
$elem.each(function(i){var prop=props[i];v[i]={};curProps[i]={};var curStyle=getComputedStyleObject($elem[i]);for(var p in prop){curProps[i][p]=parseFloat(curStyle[p]);v[i][p]=(parseFloat(prop[p])-parseFloat(curStyle[p]))*interval/time;}});function fn(){count+=interval;if(count>time){ // アニメーション終了
clearInterval(timerId); // スタイルを削除して、デフォルト(cssなどで指定されている値)に戻す
$elem.each(function(i){for(var p in props[i]){this.style[p]='';}});callback();return;}$elem.each(function(i){var curProp=curProps[i];for(var p in curProp){curProp[p]+=v[i][p];}$(this).css(curProp);});}fn();var timerId=setInterval(fn,interval);} /**
	 * opacityを0から、現在の要素のopacityの値までアニメーションします
	 *
	 * @param {jQuery} $elem fadeInさせる要素
	 * @param {Number} time アニメーションに掛ける時間(ms)
	 * @param {Function} callback アニメーションが終了した時に呼び出すコールバック関数
	 */function fadeIn($elem,time,callback){ // 現在のopacityを取得
var opacities=[];$elem.each(function(){var opacity=parseFloat(getComputedStyleValue(this,'opacity'));opacities.push({opacity:opacity});}); // opacityを0にして、display:blockにする
$elem.css({opacity:0,display:'block'});animate(opacities,$elem,time,callback);} /**
	 * opacityを現在の値から、0までアニメーションします
	 *
	 * @param {jQuery} $elem fadeOutさせる要素
	 * @param {Number} time アニメーションに掛ける時間(ms)
	 * @param {Function} callback アニメーションが終了した時に呼び出すコールバック関数
	 */function fadeOut($elem,time,callback){var opacities=[];$elem.each(function(){opacities.push({opacity:0});});animate(opacities,$elem,time,callback);} // =========================================================================
//
// Body
//
// =========================================================================
windowHeight=windowSize('Height');documentHeight=documentSize('Height');documentWidth=documentSize('Width');scrollTop=scrollPosition('Top');scrollLeft=scrollPosition('Left'); // CSS3 Animationのサポート判定
isCSS3AnimationsSupported=supportsCSS3Property('animationName'); /**
	 * VML版スロバー (IE 6,7,8)用
	 */function ThrobberVML(opt,doc){this.style=$.extend(true,{},opt); // documentにVMLの名前空間とスタイルが定義されていなかったら、定義する
defineVMLNamespaceAndStyle(doc);var w=this.style.throbber.width;var h=this.style.throbber.height;this.group=createVMLElement('group',doc,{width:w+'px',height:h+'px'});this.group.className=CLASS_VML_ROOT;var positions=calculateLineCoords(w,this.style.throbber.lines);var lineColor=this.style.throbberLine.color;var lineWidth=this.style.throbberLine.width;for(var i=0,len=positions.length;i<len;i++){var pos=positions[i];var from=pos.from;var to=pos.to;var e=createVMLElement('line',doc);e.strokeweight=lineWidth;e.strokecolor=lineColor;e.fillcolor=lineColor;e.from=from.x+','+from.y;e.to=to.x+','+to.y;var ce=createVMLElement('stroke',doc);ce.opacity=1;e.appendChild(ce);this.group.appendChild(e);}this._createPercentArea(doc);}ThrobberVML.prototype={show:function show(root){if(!root){return;}this.root=root;this.highlightPos=1;this.hide();this.root.appendChild(this.group);this._run();},hide:function hide(){this.root.innerHTML="";if(this._runId){clearTimeout(this._runId);this._runId=null;}},_run:function _run(){var lineCount=this.style.throbber.lines;if(lineCount===0){ // ラインの数が0なら何もしない
return;}var roundTime=this.style.throbber.roundTime;var highlightPos=this.highlightPos;var lines=this.group.childNodes;for(var i=0,len=lines.length;i<len;i++){var child=lines[i];if(child.nodeName==='textbox'){continue;}var lineNum=i+1;var line=child.firstChild;if(lineNum==highlightPos){line.opacity="1";}else if(lineNum==highlightPos+1||lineNum==highlightPos-1){line.opacity="0.75";}else {line.opacity="0.4";}}if(highlightPos==lineCount){highlightPos=0;}else {highlightPos++;}this.highlightPos=highlightPos;var perMills=Math.floor(roundTime/lineCount);var that=this; // VML版スロバーはIE8以下専用でかつ、IE8以下はAnimations/Transformに対応していないのでsetTimeoutでスロバーを描写する
this._runId=setTimeout(function(){that._run.call(that);},perMills);},_createPercentArea:function _createPercentArea(doc){var textPath=createVMLElement('textbox',doc);var $table=$(doc.createElement('table'));$table.append('<tr><td></td></tr>');var $td=$table.find('td');$td.width(this.group.style.width);$td.height(this.group.style.height);$td.css('line-height',this.group.style.height);$td.addClass(CLASS_THROBBER_PERCENT);textPath.appendChild($table[0]);this.group.appendChild(textPath);},setPercent:function setPercent(percent){$(this.group).find('.'+CLASS_THROBBER_PERCENT).html(percent);}}; /**
	 * Canvas版スロバー
	 */var ThrobberCanvas=function ThrobberCanvas(opt,doc){this.style=$.extend(true,{},opt);this.canvas=doc.createElement('canvas');this.baseDiv=doc.createElement('div');this.percentDiv=doc.createElement('div');var canvas=this.canvas;var baseDiv=this.baseDiv;var percentDiv=this.percentDiv; // CSSファイルから読み取ったスタイルをCanvasに適用する
canvas.width=this.style.throbber.width;canvas.height=this.style.throbber.height;canvas.style.display='block';canvas.style.position='absolute';baseDiv.style.width=this.style.throbber.width+'px';baseDiv.style.height=this.style.throbber.height+'px';baseDiv.appendChild(canvas); // パーセント表示用DIV
percentDiv.style.width=this.style.throbber.width+'px';percentDiv.style.height=this.style.throbber.height+'px';percentDiv.style.lineHeight=this.style.throbber.height+'px';percentDiv.className=CLASS_THROBBER_PERCENT;baseDiv.appendChild(percentDiv);this.positions=calculateLineCoords(canvas.width,this.style.throbber.lines);};ThrobberCanvas.prototype={show:function show(root){if(!root){return;}this.root=root;this.highlightPos=1;this.hide();this.root.appendChild(this.baseDiv);this._run();},hide:function hide(){ // this.root.innerHTML = ''だと、IEにてthis.child.innerHTMLまで空になってしまう
// removeChildを使うとDOMがない時にエラーが出るため、jQueryのremove()を使っている
$(this.baseDiv).remove();if(this._runId){ // Timerで動かしている場合(CSSAnimationをサポートしていないためにTimerで動かしている場合)
// Timerを止める
clearTimeout(this._runId);this._runId=null;}},_run:function _run(){var lineCount=this.style.throbber.lines;if(lineCount===0){ // lineの数が0なら何もしない
return;}var canvas=this.canvas;var ctx=canvas.getContext('2d');var highlightPos=this.highlightPos;var positions=this.positions;var lineColor=this.style.throbberLine.color;var lineWidth=this.style.throbberLine.width;var roundTime=this.style.throbber.roundTime;canvas.width=canvas.width;for(var i=0,len=positions.length;i<len;i++){ctx.beginPath();ctx.strokeStyle=lineColor;ctx.lineWidth=lineWidth;var lineNum=i+1;if(lineNum==highlightPos){ctx.globalAlpha=1;}else if(lineNum==highlightPos+1||lineNum==highlightPos-1){ctx.globalAlpha=0.75;}else {ctx.globalAlpha=0.4;}var pos=positions[i];var from=pos.from;var to=pos.to;ctx.moveTo(from.x,from.y);ctx.lineTo(to.x,to.y);ctx.stroke();}if(highlightPos==lineCount){highlightPos=0;}else {highlightPos++;}this.highlightPos=highlightPos;if(isCSS3AnimationsSupported){ // CSS3Animationをサポートしている場合は、keyframesでスロバーを描写する
canvas.className=CLASS_THROBBER_CANVAS;}else {var perMills=Math.floor(roundTime/lineCount);var that=this; // CSSAnimation未サポートの場合タイマーアニメーションで描画する
// 対象ブラウザ: IE 9 / Firefox 2,3 / Opera  9.0～10.1 / Opera Mini 5.0～7.0 / Opera Mobile 10.0
// http://caniuse.com/transforms2d
// http://caniuse.com/#search=canvas
this._runId=setTimeout(function(){that._run.call(that);},perMills);}},setPercent:function setPercent(percent){this.percentDiv.innerHTML=percent;}}; /**
	 * インジケータ(メッセージ・画面ブロック・進捗表示)の表示や非表示を行うクラス。
	 * <p>
	 * このクラスは自分でnewすることはありません。<a href="h5.ui.html#indicator">h5.ui.indicator()</a>または、<a
	 * href="Controller.html#indicator">Controller.indicator()</a>の戻り値がIndicatorクラスです。
	 * </p>
	 *
	 * @class
	 * @name Indicator
	 * @see h5.ui.indicator
	 * @see Controller.indicator
	 */ /**
	 * @private
	 * @param {String|Object} target インジケータを表示する対象のDOM要素、jQueryオブジェクトまたはセレクタ
	 * @param {Object} [option] オプション
	 * @param {Boolean} [showThrobber=true] スロバーを表示するかどうか。デフォルトは表示。
	 * @param {String} [option.message] 表示する文字列 (デフォルト:未指定)
	 * @param {Number} [option.percent] スロバーの中央に表示する数値。0～100で指定する (デフォルト:未指定)
	 * @param {Boolean} [option.block] 画面を操作できないようオーバーレイ表示するか (true:する/false:しない) (デフォルト:true)
	 * @param {Number} [option.fadeIn] インジケータをフェードで表示する場合、表示までの時間をミリ秒(ms)で指定する (デフォルト:フェードしない)
	 * @param {Number} [option.fadeOut] インジケータをフェードで非表示にする場合、非表示までの時間をミリ秒(ms)で指定する (デフォルト:しない)
	 * @param {Promise|Promise[]} [option.promises] Promiseオブジェクト (Promiseの状態に合わせて自動でインジケータの非表示を行う)
	 * @param {String} [option.theme] テーマクラス名 (インジケータのにスタイル定義の基点となるクラス名 (デフォルト:'a')
	 * @param {String} [option.throbber.lines] スロバーの線の本数 (デフォルト:12)
	 * @param {String} [option.throbber.roundTime] スロバーの白線が1周するまでの時間(ms)
	 *            (このオプションはCSS3Animationを未サポートブラウザのみ有効) (デフォルト:1000)
	 */function Indicator(target,option){var that=this;var $t=$(target); // ターゲットが存在しない場合は何もしない
if(!$t.length){return;} // スクリーンロックで表示するか判定
// (自分のwindowのみで、ポップアップウィンドウの場合はスクリーンロックと判定しない)
var isScreenlock=isScreenlockTarget($t); // スクリーンロックで表示する場合はターゲットはbodyにする
$t=isScreenlock?$('body'):$t; // documentの取得
var doc=getDocumentOf($t[0]); // 別ウィンドウのwindow又はdocumentが指定されていた場合は、そのwindow,documentのbodyに出す
if(doc!==window.document&&($t[0]===doc||getWindowOfDocument(doc)===$t[0])){$t=$(doc.body);} // デフォルトオプション
var defaultOption={message:'',percent:-1,block:true,fadeIn:-1,fadeOut:-1,promises:null,theme:'a',showThrobber:true}; // スロバーのスタイル定義 (基本的にはCSSで記述する。ただし固定値はここで設定する)
// CSSAnimationsがサポートされているブラウザの場合、CSSのanimation-durationを使用するためroundTimeプロパティの値は使用しない
var defaultStyle={throbber:{roundTime:1000,lines:12},throbberLine:{},percent:{}}; // デフォルトオプションとユーザオプションをマージしたオプション情報
var settings=$.extend(true,{},defaultOption,option); // インジケータを画面に表示したか
this._displayed=false; // スロバーを保持する配列
this._throbbers=[]; // オプション情報
this._settings=settings; // スタイル情報
this._styles=$.extend(true,{},defaultStyle,readThrobberStyle(settings.theme));if(settings.throbber){$.extend(this._styles.throbber,settings.throbber);} // スクリーンロックで表示するか
this._isScreenLock=isScreenlock; // 表示対象であるDOM要素を保持するjQueryオブジェクト
this._$target=$t; // 表示対象のDOM要素 (旧バージョン互換用)
this._target=this._$target.length===1?this._$target[0]:this._$target.toArray(); // scroll/touchmoveイベントハンドラで使用するタイマーID
this._scrollEventTimerId=null; // scroll/touchmoveイベントハンドラ
this._scrollHandler=function(){that._handleScrollEvent();}; // resize/orientationchangeイベントハンドラ内で使用するタイマーID
this._resizeEventTimerId=null; // scroll/touchmoveイベントハンドラ
this._resizeHandler=function(){that._handleResizeEvent();}; // DOM要素の書き換え可能かを判定するフラグ
this._redrawable=true; // _redrawable=false時、percent()に渡された最新の値
this._lastPercent=-1; // _redrawable=false時、message()に渡された最新の値
this._lastMessage=null; // フェードインの時間 (フェードインで表示しない場合は-1)
this._fadeInTime=typeof settings.fadeIn==='number'?settings.fadeIn:-1; // フェードアウトの時間 (フェードアウトで表示しない場合は-1)
this._fadeOutTime=typeof settings.fadeOut==='number'?settings.fadeOut:-1; // コンテンツ(メッセージ/スロバー)
this._$content=$(); // オーバーレイ
this._$overlay=$(); // スキン - IE6の場合selectタグがz-indexを無視するため、オーバーレイと同一階層にiframe要素を生成してselectタグを操作出来ないようにする
// http://www.programming-magic.com/20071107222415/
this._$skin=$(); // showが呼ばれた時にcontentを表示するかどうか。messageもスロバーもないなら表示しない
this._showContent=settings.showThrobber||settings.message; // コンテンツ内の要素
var contentElem=h5.u.str.format(FORMAT_THROBBER_MESSAGE_AREA,settings.message===''?'style="display: none;"':'',settings.message); // httpsでiframeを開くと警告が出るためsrcに指定する値を変える
// http://www.ninxit.com/blog/2008/04/07/ie6-https-iframe/
var srcVal='https'===document.location.protocol?'return:false':'about:blank';for(var i=0,len=this._$target.length;i<len;i++){this._$content=this._$content.add($(doc.createElement('div')).append(contentElem).addClass(CLASS_INDICATOR_ROOT).addClass(settings.theme).addClass(CLASS_INDICATOR_CONTENT).css('display','none'));this._$overlay=this._$overlay.add((settings.block?$(doc.createElement('div')):$()).addClass(CLASS_INDICATOR_ROOT).addClass(settings.theme).addClass(CLASS_OVERLAY).css('display','none'));this._$skin=this._$skin.add((isLegacyIE||compatMode?$(doc.createElement('iframe')):$()).attr('src',srcVal).addClass(CLASS_INDICATOR_ROOT).addClass(CLASS_SKIN).css('display','none'));}var position=this._isScreenLock&&usePositionFixed?'fixed':'absolute'; // オーバーレイ・コンテンツにpositionを設定する
$.each([this._$overlay,this._$content],function(){this.css('position',position);});var promises=settings.promises;var promiseCallback=function promiseCallback(){that.hide();}; // jQuery1.7以下ならpipe、1.8以降ならthenを使ってコールバックを登録
var pipeMethod=$.hasOwnProperty('curCSS')?'pipe':'then';if(isArray(promises)){ // プロミスでないものを除去
promises=$.map(promises,function(item,idx){return item&&isFunction(item.promise)?item:null;});if(promises.length>0){ // whenを呼んで、pipeにコールバックを登録。
// CFHの発火を阻害しないようにSilentlyでpipeコールバックを登録する。
registerCallbacksSilently(h5.async.when(promises),pipeMethod,[promiseCallback,promiseCallback]);}}else if(promises&&isFunction(promises.promise)){ // CFHの発火を阻害しないようにpipeを呼び出し。
registerCallbacksSilently(promises,pipeMethod,[promiseCallback,promiseCallback]);}}Indicator.prototype={ /**
		 * 画面上にインジケータ(メッセージ・画面ブロック・進捗表示)を表示します。
		 *
		 * @memberOf Indicator
		 * @function
		 * @returns {Indicator} インジケータオブジェクト
		 */show:function show(){if(this._displayed||!this._$target||this._$target.children('.'+CLASS_INDICATOR_ROOT).length>0){return this;}this._displayed=true;var that=this;var fadeInTime=this._fadeInTime;var cb=function cb(){var $window=$(window);if(that._isScreenLock){disableEventOnIndicator(that._$overlay,that._$content);if(!usePositionFixed){$window.bind('touchmove',that._scrollHandler);$window.bind('scroll',that._scrollHandler);}} // 画面の向きの変更を検知したらインジータを中央に表示させる
$window.bind('orientationchange',that._resizeHandler);$window.bind('resize',that._resizeHandler);};for(var i=0,len=this._$target.length;i<len;i++){var _$target=this._$target.eq(i);var _$content=this._$content.eq(i);var _$skin=this._$skin.eq(i);var _$overlay=this._$overlay.eq(i);var settings=this._settings; // position:absoluteの子要素を親要素からの相対位置で表示するため、親要素がposition:staticの場合はrelativeに変更する(親要素がbody(スクリーンロック)の場合は変更しない)
// また、IEのレイアウトバグを回避するためzoom:1を設定する
var targetPosition=getComputedStyleValue(_$target[0],'position');if(!this._isScreenLock&&targetPosition==='static'){ // スロバーメッセージ要素に親要素のposition/zoomを記憶させておく
_$target.data(DATA_KEY_POSITION,targetPosition);_$target.data(DATA_KEY_ZOOM,getComputedStyleValue(_$target[0],'zoom'));_$target.css({position:'relative',zoom:'1'});}var doc=getDocumentOf(_$target[0]);var throbber=null;if(settings.showThrobber){throbber=isCanvasSupported?new ThrobberCanvas(this._styles,doc):isVMLSupported?new ThrobberVML(this._styles,doc):null;}if(throbber){that._throbbers.push(throbber);that.percent(this._settings.percent);throbber.show(_$content.children('.'+CLASS_INDICATOR_THROBBER)[0]);}_$target.append(_$skin).append(_$overlay);if(this._showContent){ // _$contentはメッセージまたはスロバーがある場合のみ
_$target.append(_$content);}} // Array.prototype.pushを使って、適用する要素を配列にまとめる
var elems=this._$skin.toArray();Array.prototype.push.apply(elems,this._$content.toArray());Array.prototype.push.apply(elems,this._$overlay.toArray());var $elems=$(elems);if(fadeInTime<0){$elems.css('display','block');cb();}else {fadeIn($elems,fadeInTime,cb);}this._reposition();this._resizeOverlay();return this;}, /**
		 * オーバーレイのサイズを再計算します。
		 * <p>
		 * position:fixedで表示している場合は再計算しません。また、オーバレイ非表示の場合は何もしません。
		 * <p>
		 * position:absoluteの場合は高さのみ再計算を行い、IE6以下の標準モード及びQuirksモードの場合は高さと幅の両方を再計算します。
		 *
		 * @memberOf Indicator
		 * @function
		 * @private
		 */_resizeOverlay:function _resizeOverlay(){ // スクリーンロックでpoisition:fixedが使用可能なブラウザの場合は、オーバレイをposition:fixedで表示している
// オーバレイをposition:fixedで表示している場合は何もしない
// また、オーバレイを表示していない(block:false)インジケータなら何もしない
if(this._isScreenLock&&usePositionFixed||this._$overlay.length===0){return;}for(var i=0,len=this._$target.length;i<len;i++){var _$content=this._$content.eq(i);var _$overlay=this._$overlay.eq(i);var _$target=this._$target.eq(i);var _$skin=this._$skin.eq(i);var w,h; //オーバーレイはターゲット要素全体の大きさ(スクロールサイズ)にする
if(this._isScreenLock){w=documentWidth();h=documentHeight();}else { // オーバレイとコンテンツを非表示にしたときのscrollWidth/Heightを取得する
_$overlay.css('display','none');_$content.css('display','none');var scrSize=getScrollSize(_$target[0]);_$overlay.css('display','block');_$content.css('display','block');w=scrSize.w;h=scrSize.h;}_$overlay[0].style.width=w+'px';_$overlay[0].style.height=h+'px';if(isLegacyIE||compatMode){_$skin[0].style.width=w+'px';_$skin[0].style.height=h+'px';}}}, /**
		 * インジケータのメッセージ要素のwidthを調整し、中央になるようtopとleftの位置を設定します。
		 *
		 * @memberOf Indicator
		 * @function
		 * @private
		 */_reposition:function _reposition(){for(var i=0,len=this._$target.length;i<len;i++){var _$target=this._$target.eq(i);var _$content=this._$content.eq(i);if(this._isScreenLock){ // MobileSafari(iOS4)だと $(window).height()≠window.innerHeightなので、window.innerHeightをから高さを取得する
// また、quirksモードでjQuery1.8.xの$(window).height()を実行すると0を返すので、clientHeightから高さを取得する
var wh=windowHeight();if(usePositionFixed){ // 可視領域からtopを計算する
_$content.css('top',(wh-getOuterHeight(_$content[0]))/2+'px');}else { // 可視領域+スクロール領域からtopを計算する
_$content.css('top',scrollTop()+wh/2-getOuterHeight(_$content[0])/2+'px');}}else { //オーバーレイの計算はスクロールサイズを基準にしている。これに倣い、中央揃え計算の基準はinnerHeight()にする(＝paddingを含める)。leftも同様
_$content.css('top',_$target.scrollTop()+(getInnerHeight(_$target[0])-getOuterHeight(_$content[0]))/2);}var blockElementPadding=getInnerWidth(_$content[0])-getWidth(_$content[0]);var totalWidth=0;_$content.children().each(function(){var $e=$(this); // IE9にて不可視要素に対してouterWidth(true)を実行すると不正な値が返ってくるため、display:noneの場合は値を取得しない
if(getComputedStyleValue($e[0],'display')==='none'){return true;}totalWidth+=getOuterWidth(this,true);});_$content.css('width',totalWidth+blockElementPadding);_$content.css('left',_$target.scrollLeft()+(getInnerWidth(_$target[0])-getOuterWidth(_$content[0]))/2);}}, /**
		 * 画面上に表示されているインジケータ(メッセージ・画面ブロック・進捗表示)を除去します。
		 *
		 * @memberOf Indicator
		 * @function
		 * @returns {Indicator} インジケータオブジェクト
		 */hide:function hide(){if(!this._displayed){return this;}this._displayed=false;var that=this;var fadeOutTime=this._fadeOutTime; // Array.prototype.pushを使って、適用する要素を配列にまとめる
var elems=this._$skin.toArray();Array.prototype.push.apply(elems,this._$content.toArray());Array.prototype.push.apply(elems,this._$overlay.toArray());var $elems=$(elems);var cb=function cb(){var $window=$(window);$elems.remove(); // 親要素のposition/zoomをインジケータ表示前の状態に戻す
if(!that._isScreenLock){that._$target.each(function(i,e){var $e=$(e);$e.css({position:$e.data(DATA_KEY_POSITION),zoom:$e.data(DATA_KEY_ZOOM)});$e.removeData(DATA_KEY_POSITION).removeData(DATA_KEY_ZOOM);});}$window.unbind('touchmove',that._scrollHandler);$window.unbind('scroll',that._scrollHandler);$window.unbind('orientationchange',that._resizeHandler);$window.unbind('resize',that._resizeHandler);if(that._resizeEventTimerId){clearTimeout(that._resizeEventTimerId);}if(that._scrollEventTimerId){clearTimeout(that._scrollEventTimerId);}};for(var i=0,len=this._throbbers.length;i<len;i++){this._throbbers[i].hide();}if(fadeOutTime<0){$elems.css('display','none');cb();}else {fadeOut($elems,fadeOutTime,cb);}return this;}, /**
		 * 進捗のパーセント値を指定された値に更新します。
		 *
		 * @memberOf Indicator
		 * @function
		 * @param {Number} percent 進捗率(0～100%)
		 * @returns {Indicator} インジケータオブジェクト
		 */percent:function percent(_percent){if(typeof _percent!=='number'||!(_percent>=0&&_percent<=100)){return this;}if(!this._redrawable){this._lastPercent=_percent;return this;}for(var i=0,len=this._throbbers.length;i<len;i++){this._throbbers[i].setPercent(_percent);}return this;}, /**
		 * メッセージを指定された値に更新します。
		 *
		 * @memberOf Indicator
		 * @function
		 * @param {String} message メッセージ
		 * @returns {Indicator} インジケータオブジェクト
		 */message:function message(_message){if(!isString(_message)){return this;}if(!this._redrawable){this._lastMessage=_message;return this;} // スロバーが無くてメッセージが空文字ならcontentは表示しない
this._showContent=this._settings.showThrobber||!!_message;if(!this._showContent){this._$content.remove();}else {this._$target.append(this._$content);}this._$content.children('.'+CLASS_INDICATOR_MESSAGE).css('display','inline-block').text(_message);this._reposition();return this;}, /**
		 * scroll/touchmoveイベントハンドラ
		 * <p>
		 * タッチまたはホイールスクロールの停止を検知します
		 */_handleScrollEvent:function _handleScrollEvent(){if(this._scrollEventTimerId){clearTimeout(this._scrollEventTimerId);}if(!this._redrawable){return;}var that=this;this._scrollEventTimerId=setTimeout(function(){that._reposition();that._scrollEventTimerId=null;},50);}, /**
		 * orientationChange/resizeイベントハンドラ
		 * <p>
		 * orientationChange/resizeイベントが発生した1秒後に、インジケータとオーバーレイを画面サイズに合わせて再描画し、 メッセージとパーセントの内容を更新する。
		 *
		 * @memberOf Indicator
		 * @function
		 * @private
		 */_handleResizeEvent:function _handleResizeEvent(){var that=this;function updateMessageArea(){that._resizeOverlay();that._reposition();that._redrawable=true;that.percent(that._lastPercent);that.message(that._lastMessage);that._resizeEventTimerId=null;}if(this._resizeEventTimerId){clearTimeout(this._resizeEventTimerId);}this._redrawable=false;if(usePositionFixed||isLegacyIE||compatMode){updateMessageArea();}else { // Android 4.xの場合、orientationChangeイベント発生直後にDOM要素の書き換えを行うと画面の再描画が起こらなくなることがあるため、対症療法的に対処
this._resizeEventTimerId=setTimeout(function(){updateMessageArea();},1000);}}}; /**
	 * 指定された要素に対して、インジケータ(メッセージ・画面ブロック・進捗)の表示や非表示を行うためのオブジェクトを取得します。
	 * <p>
	 * 第1引数にインジケータの設定を記述したパラメータオブジェクトを指定してください。
	 * <p>
	 * <strong>第1引数にインジケータのターゲットを指定する方法は非推奨です。</strong>
	 * </p>
	 *
	 * <pre><code>
	 * h5.ui.indicator({
	 * 	target: 'body'
	 * });
	 *
	 * // h5.ui.indicator('body'); 非推奨
	 * </code></pre>
	 *
	 * targetに<strong>document</strong>、<strong>window</strong>または<strong>body</strong>を指定しかつ、blockオプションがtrueの場合、「スクリーンロック」として動作します。<br>
	 * 上記以外のDOM要素を指定した場合は、指定した要素上にインジケータを表示します。
	 * <p>
	 * <strong>スクリーンロック</strong>とは、コンテンツ領域(スクロールしないと見えない領域も全て含めた領域)全体にオーバーレイを、表示領域(画面に見えている領域)中央にメッセージが表示し、画面を操作できないようにすることです。スマートフォン等タッチ操作に対応する端末の場合、スクロール操作も禁止します。
	 * <h4>スクリーンロック中の制限事項</h4>
	 * <ul>
	 * <li>Android
	 * 4.xにてorientationchangeイベント発生直後にインジケータのDOM要素の書き換えを行うと画面の再描画が起こらなくなってしまうため、orientationchangeイベント発生から1秒間percent()/massage()での画面の書き換えをブロックします。<br>
	 * orientationchagenイベント発生から1秒以内にpercent()/message()で値を設定した場合、最後に設定された値が画面に反映されます。</li>
	 * <li>WindowsPhone
	 * 7ではscrollイベントを抑止できないため、インジケータ背後の要素がスクロールしてしまいます。ただし、クリック等その他のイベントはキャンセルされます。</li>
	 * </ul>
	 * <h4>使用例</h4>
	 * <strong>スクリーンロックとして表示する</strong><br>
	 *
	 * <pre>
	 * var indicator = h5.ui.indicator({
	 * 	target: document
	 * }).show();
	 * </pre>
	 *
	 * <strong>li要素にスロバー(くるくる回るアイコン)を表示してブロックを表示しない場合</strong><br>
	 *
	 * <pre>
	 * var indicator = h5.ui.indicator({
	 * 	target: 'li',
	 * 	block: false
	 * }).show();
	 * </pre>
	 *
	 * <strong>パラメータにPromiseオブジェクトを指定して、done()/fail()の実行と同時にインジケータを除去する</strong><br>
	 * resolve() または reject() が実行されると、画面からインジケータを除去します。
	 *
	 * <pre>
	 * var df = $.Deferred();
	 * var indicator = h5.ui.indicator({
	 * 	target: document,
	 * 	promises: df.promise()
	 * }).show();
	 *
	 * setTimeout(function() {
	 * 	df.resolve(); // ここでインジケータが除去される
	 * }, 2000);
	 * </pre>
	 *
	 * <strong>パラメータに複数のPromiseオブジェクトを指定して、done()/fail()の実行と同時にインジケータを除去する</strong><br>
	 * Promiseオブジェクトを複数指定すると、全てのPromiseオブジェクトでresolve()が実行されるか、またはいずれかのPromiseオブジェクトでfail()が実行されるタイミングでインジケータを画面から除去します。
	 *
	 * <pre>
	 * var df = $.Deferred();
	 * var df2 = $.Deferred();
	 * var indicator = h5.ui.indicator({
	 * 	target: document,
	 * 	promises: [df.promise(), df2.promise()]
	 * }).show();
	 *
	 * setTimeout(function() {
	 * 	df.resolve();
	 * }, 2000);
	 *
	 * setTimeout(function() {
	 * 	df.resolve(); // ここでインジケータが除去される
	 * }, 4000);
	 * </pre>
	 *
	 * <p>
	 * コントローラのindicator()の仕様については、<a href="./Controller.html#indicator">Controller.indicator</a>のドキュメント
	 * を参照下さい。
	 *
	 * @memberOf h5.ui
	 * @name indicator
	 * @function
	 * @param {Object} param パラメータオブジェクト
	 * @param {DOM|jQuery|String} param.target インジケータを表示する対象のDOM要素、jQueryオブジェク���またはセレクタ
	 * @param {String} [param.message] スロバーの右側に表示する文字列 (デフォルト:未指定)
	 * @param {Number} [param.percent] スロバーの中央に表示する数値。0～100で指定する (デフォルト:未指定)
	 * @param {Boolean} [param.block] 画面を操作できないようオーバーレイ表示するか (true:する/false:しない) (デフォルト:true)
	 * @param {Number} [param.fadeIn] インジケータをフェードで表示する場合、表示までの時間をミリ秒(ms)で指定する (デフォルト:フェードしない)
	 * @param {Number} [param.fadeOut] インジケータをフェードで非表示にする場合、非表示までの時間をミリ秒(ms)で指定する (デフォルト:しない)
	 * @param {Promise|Promise[]} [param.promises] Promiseオブジェクト (Promiseの状態に合わせて自動でインジケータの非表示を行う)
	 * @param {String} [param.theme] テーマクラス名 (インジケータのにスタイル定義の基点となるクラス名 (デフォルト:'a')
	 * @param {String} [param.throbber.lines] スロバーの線の本数 (デフォルト:12)
	 * @param {String} [param.throbber.roundTime] スロバーの白線が1周するまでの時間(ms)
	 *            (このオプションはCSS3Animationを未サポートブラウザのみ有効) (デフォルト:1000)
	 * @param {Object} [option] 第1引数にターゲット(param.target)を指定して、第2引数にオプションオブジェクトを指定できます。<strong>ただしこの指定方法は非推奨です。</strong><br>
	 *            第2引数のオプションオブジェクトの構造は、パラメータオブジェクトと同様です。
	 * @see Indicator
	 * @see Controller.indicator
	 */var indicator=function indicator(param,option){if($.isPlainObject(param)){ // 第1引数にパラメータオブジェクトが渡されていた場合は、ターゲットをパラメータオブジェクトから取得
// (第1引数がプレーンオブジェクトならパラメータ、そうでないならターゲットの指定と判定する)
return new Indicator(param.target,param);} // 第1引数にターゲット、第2引数にオプションオブジェクト
return new Indicator(param,option);}; /**
	 * 要素が可視範囲内、または指定した親要素内にあるかどうかを返します。
	 * <p>
	 * 第2引数を省略した場合、要素がウィンドウ内に見えているかどうかを返します。 elementが他のDOM要素によって隠れていても、範囲内にあればtrueを返します。
	 * </p>
	 * <p>
	 * 第2引数を指定した場合、elementがcontainerの表示範囲内で見えているかどうかを返します。 containerがウィンドウ内に見えているかどうかは関係ありません。
	 * elementがcontainerの子孫要素で無ければundefinedを返します。
	 * </p>
	 * <p>
	 * ブラウザで拡大/縮小を行っていた場合、僅かな誤差のために結果が異なる場合があります。
	 * </p>
	 * <p>
	 * いずれの場合も、要素が非表示の場合の動作は保障されません。
	 * </p>
	 *
	 * @param {String|Element|jQuery} element 要素
	 * @param {Object} container コンテナ
	 * @returns {Boolean} 要素が可視範囲内にあるかどうか
	 * @name isInView
	 * @function
	 * @memberOf h5.ui
	 */var isInView=function isInView(element,container){var viewTop,viewBottom,viewLeft,viewRight;var $element=$(element);var height,width; // containerの位置を取得。borderの内側の位置で判定する。
if((typeof container==='undefined'?'undefined':_typeof(container))===TYPE_OF_UNDEFINED){ // containerが指定されていないときは、画面表示範囲内にあるかどうか判定する
height=getDisplayArea('Height');width=getDisplayArea('Width');viewTop=scrollTop();viewLeft=scrollLeft();}else {var $container=$(container);if($container.find($element).length===0){ // elementとcontaienrが親子関係でなければundefinedを返す
return undefined;}var containerOffset=getOffset($container);viewTop=containerOffset.top+parseInt($container.css('border-top-width'));viewLeft=containerOffset.left+parseInt($container.css('border-left-width'));height=$container.innerHeight();width=$container.innerWidth();}viewBottom=viewTop+height;viewRight=viewLeft+width; // elementの位置を取得。borderの外側の位置で判定する。
var elementOffset=getOffset($element);var positionTop=elementOffset.top;var positionLeft=elementOffset.left;var positionBottom=positionTop+$element.outerHeight();var positionRight=positionLeft+$element.outerWidth();return (viewTop<=positionTop&&positionTop<viewBottom||viewTop<positionBottom&&positionBottom<=viewBottom)&&(viewLeft<=positionLeft&&positionLeft<viewRight||viewLeft<positionRight&&positionRight<=viewRight);}; /**
	 * ブラウザのトップにスクロールします。
	 *
	 * @name scrollToTop
	 * @function
	 * @memberOf h5.ui
	 */var scrollToTop=function scrollToTop(){var waitCount=3;function fnScroll(){if(window.scrollY===1){waitCount=0;}if(waitCount>0){window.scrollTo(0,1);waitCount--;setTimeout(fnScroll,WAIT_MILLIS);}}window.scrollTo(0,1);if($(window).scrollTop()!==1){setTimeout(fnScroll,WAIT_MILLIS);}}; // =============================
// Expose to window
// =============================
h5.u.obj.expose('h5.ui',{indicator:indicator,isInView:isInView,scrollToTop:scrollToTop});})(); /* ------ h5.ui.jqm.manager ------ */(function(){ // =========================================================================
//
// Constants
//
// =========================================================================
var EV_NAME_H5_JQM_PAGE_HIDE='h5jqmpagehide';var EV_NAME_H5_JQM_PAGE_SHOW='h5jqmpageshow';var EV_NAME_EMULATE_PAGE_SHOW='h5controllerready.emulatepageshow'; // =============================
// Production
// =============================
// エラーコード
var ERR_CODE_INVALID_TYPE=12000;var ERR_CODE_NAME_INVALID_PARAMETER=12001; // =============================
// Development Only
// =============================
var fwLogger=h5.log.createLogger('h5.ui.jqm.manager'); /* del begin */var FW_LOG_JQM_CONTROLLER_ALREADY_INITIALIZED='既にJQMマネージャは初期化されています。';var FW_LOG_CONTROLLER_DEF_ALREADY_DEFINED='既にコントローラ"{0}"はJQMマネージャに登録されています。';var FW_LOG_CSS_FILE_PATH_ALREADY_DEFINED='既にCSSファイル"{0}"はJQMマネージャに登録されています。'; // エラーコードマップ
var errMsgMap={};errMsgMap[ERR_CODE_INVALID_TYPE]='引数{0}が不正です。正しい値を指定して下さい。';errMsgMap[ERR_CODE_NAME_INVALID_PARAMETER]='引数の指定に誤りがあります。第2引数にCSSファイルパス、第3引数にコントローラ定義オブジェクトを指定して下さい。';addFwErrorCodeMap(errMsgMap); /* del end */ // =========================================================================
//
// Cache
//
// =========================================================================
// =========================================================================
//
// Privates
//
// =========================================================================
// =============================
// Variables
// =============================
/**
	 * ページをの初期化処理呼び出しをpagecreateイベントハンドラで行うかどうか
	 * <p>
	 * このフラグがtrueの場合はpagecreateイベントハンドラでページの初期化処理を呼び出します。
	 * falseの場合はpageinitイベントハンドラでページの初期化処理を呼び出します。
	 * </p>
	 * <p>
	 * jqm1.4より前ではpagecreateイベントはページのDOM拡張前、pageinitイベントはページのDOM拡張後に上がりますが、
	 * jqm1.4以降ではDOM拡張後にpagecreateが上がり、pageinitイベントはdeprecatedになりました。
	 * jqm1.4以降ではdeprecatedなpageinitではなくpagecreateイベントハンドラで初期化処理を行うようにします。
	 * </p>
	 * <p>
	 * フラグの値はh5.ui.jqm.manager.init時に設定します。
	 * </p>
	 */var shouldHandlePagecreateEvent; /**
	 * JQMControllerのインスタンス(シングルトン)
	 */var jqmControllerInstance=null; /**
	 * コントローラのマップ
	 * <p>
	 * キー：ページID、値：コントローラ定義オブジェクト
	 *
	 * @type Object
	 */var controllerMap={}; /**
	 * コントローラインスタンスのマップ
	 * <p>
	 * キー：ページID、値：コントローラインスタンスの配列
	 *
	 * @type Object
	 */var controllerInstanceMap={}; /**
	 * JQMManagerで管理する、h5.core.controller()で動的に生成されたコントローラインスタンスを保持するマップ
	 * <p>
	 * キー：ページID、値：コントローラインスタンスの配列
	 *
	 * @type Object
	 */var dynamicControllerInstanceMap={}; /**
	 * 初期化パラメータのマップ
	 * <p>
	 * キー：ページID、値：初期化パラメータの配列
	 *
	 * @type Object
	 */var initParamMap={}; /**
	 * CSSファイルのマップ
	 * <p>
	 * キー：ページID、値：CSSファイルパスのオブジェクトの配列
	 *
	 * @type Object
	 */var cssMap={}; /**
	 * h5.ui.jqm.manager.init()が呼ばれたかどうかを示すフラグ
	 *
	 * @type Boolean
	 */var isInitCalled=false; /**
	 * pagehideイベントが発生したかを判定するフラグ
	 *
	 * @type Boolean
	 */var hideEventFired=false; /**
	 * 初期表示時、アクティブページにバインドしたコントローラがreadyになるよりも前に、 pageshowが発火したかを判定するフラグ
	 *
	 * @type Boolean
	 */var showEventFiredBeforeReady=false; // =============================
// Functions
// =============================
/**
	 * アクティブページに設定されているID属性の値を取得します。
	 * <p>
	 * アクティブページが存在しない、またはIDが1文字以上の文字列ではない場合nullを取得します。
	 */function getActivePageId(){var $ap=$.mobile.activePage;var id=$ap&&$ap[0]&&$ap[0].id;return isString(id)&&id.length>0?id:null;} /**
	 * 現在のアクティブページにコントローラをバインドします。
	 */function bindToActivePage(){var id=getActivePageId();if(id===null){return;} // jqmControllerInstanceにインスタンスが格納されるのはinitの中で$(function(){})で囲って行っているため、
// bindToActivePageがdocument.readyより前に呼ばれた場合はjqmControllerInstanceに値がまだ入っていない場合がある。
// そのためjqmControllerInstanceのメソッド呼び出しは$(function(){})で囲って行っている。
$(function(){jqmControllerInstance.addCSS(id);jqmControllerInstance.bindController(id);});} /**
	 * コントローラインスタンスの__nameプロパティとコントローラ定義オブジェクトの__nameプロパティを比較し、同値であるかを判定します。
	 *
	 * @param {Object[]} controllerInstances コントローラインスタンスを保持する配列
	 * @param {Object} controllerDefObj コントローラ定義オブジェクト
	 */function equalsControllerName(controllerInstances,controllerDefObj){var ret=false;for(var i=0,len=controllerInstances.length;i<len;i++){var ci=controllerInstances[i];if(ci&&ci.__name===controllerDefObj.__name){ret=true;break;}}return ret;} /**
	 * JQMマネージャが管理する動的または静的コントローラが持つイベントハンドラの有効・無効化を行います
	 *
	 * @param {String} id ページID
	 * @param {Boolean} flag (true: ハンドラを有効化する / false: ハンドラを無効化する)
	 */function changeListenerState(id,flag){for(var prop in controllerInstanceMap){var controllers=controllerInstanceMap[prop];var pageControllerEnabled=id===prop;for(var i=0,len=controllers.length;i<len;i++){var controller=controllers[i];if(pageControllerEnabled){controller[(flag?'enable':'disable')+'Listeners']();}}}for(var prop in dynamicControllerInstanceMap){var dynamicControllers=dynamicControllerInstanceMap[prop];var dynamicControllerEnabled=id===prop;for(var i=0,len=dynamicControllers.length;i<len;i++){var dynamicController=dynamicControllers[i];if(dynamicControllerEnabled){dynamicController[(flag?'enable':'disable')+'Listeners']();}}}} /**
	 * バージョン文字列の大小を比較する関数
	 * <p>
	 * '1.11.0', '1.9.9'のような'.'区切りのバージョン文字列を比較して、第1引数の方が小さければ-1、同じなら0、第2引数の方が小さければ1 を返す。
	 * </p>
	 *
	 * @param {String} a バージョン文字列
	 * @param {String} b バージョン文字列
	 * @returns {Integer} 比較結果。aがbより小さいなら-1、同じなら0、aがbより大きいなら1 を返す
	 */function compareVersion(a,b){ // '.0'が末尾にならない様にする
a=a.replace(/(\.0+)+$/,'');b=b.replace(/(\.0+)+$/,'');if(a===b){ // aとbが同じならループで比較せずに0を返す
return 0;}var aAry=a.split('.');var bAry=b.split('.');var aAryLen=aAry.length;for(var i=0;i<aAryLen;i++){if(bAry[i]==null){ // bAryが先にnullになった=aAryの方が桁数(バージョン文字列の.の数)が多い場合、
// '.0'が末尾にならないようにしてあるので、桁数の多い方がバージョンが大きい
return 1;}var aVal=parseInt(aAry[i],10);var bVal=parseInt(bAry[i],10);if(aVal===bVal){ // 同じなら次以降のindexで比較
continue;} // 比較してaが小さいなら-1、bが小さいなら-1を返す
return aVal<bVal?-1:1;}if(bAry[aAryLen]!=null){ // aAryよりbAryの方が桁数が多い場合はbの方が桁数が多いのでバージョンが大きい
return -1;} // 最後まで比較して同じなら同じバージョンなので0を返す
return 0;} // =========================================================================
//
// Body
//
// =========================================================================
/**
	 * @name jqm
	 * @memberOf h5.ui
	 * @namespace
	 */h5.u.obj.ns('h5.ui.jqm'); /**
	 * hifiveで使用するdata属性のプレフィックス。<br />
	 * デフォルトは"h5"。
	 *
	 * @type String
	 * @memberOf h5.ui.jqm
	 * @name dataPrefix
	 */h5.ui.jqm.dataPrefix='h5'; /**
	 * JQMコントローラ
	 */var jqmController={ /**
		 * コントローラ名
		 *
		 * @memberOf JQMController
		 */__name:'JQMController', /**
		 * __readyイベントのハンドラ
		 *
		 * @param {Object} context コンテキスト
		 * @memberOf JQMController
		 */__ready:function __ready(){var that=this;var activePageId=getActivePageId();$(':jqmData(role="page"), :jqmData(role="dialog")').each(function(){that.loadScript(this.id);});var $page=this.$find('#'+activePageId); // 初期表示時、トランジションにアニメーションが適用されていない場合、
// JQMコントローラがreadyになる前にpageshowが発火してしまいJQMコントローラが拾うことができないため、
// 既にpageshowが発火されていたら、h5controllerreadyのタイミングで、h5jqmpageshowをトリガする
$page.one(EV_NAME_EMULATE_PAGE_SHOW,function(){if(showEventFiredBeforeReady&&$page[0]===$.mobile.activePage[0]){$page.trigger(EV_NAME_H5_JQM_PAGE_SHOW,{prevPage:$('')});}});}, /**
		 * pageinitイベントのハンドラ
		 *
		 * @param {Object} context コンテキスト
		 * @memberOf JQMController
		 */':jqmData(role="page"), :jqmData(role="dialog") pageinit':function jqmDataRolePageJqmDataRoleDialogPageinit(context){ // pagecreateイベントを使うべきである場合はpagecreateハンドラ、そうでない時はpageinitハンドラで初期化処理を行う。
if(!shouldHandlePagecreateEvent){this._initPage(context.event.target.id);}}, /**
		 * pagecreateイベントのハンドラ
		 *
		 * @param {Object} context コンテキスト
		 * @memberOf JQMController
		 */':jqmData(role="page"), :jqmData(role="dialog") pagecreate':function jqmDataRolePageJqmDataRoleDialogPagecreate(context){if(shouldHandlePagecreateEvent){this._initPage(context.event.target.id);}}, /**
		 * ページの初期化処理を行う
		 *
		 * @private
		 * @param {String} id
		 * @memberOf JQMController
		 */_initPage:function _initPage(id){this.loadScript(id);this.addCSS(id);this.bindController(id);}, /**
		 * pageremoveイベントのハンドラ
		 *
		 * @param {Object} context コンテキスト
		 * @memberOf JQMController
		 */'{rootElement} pageremove':function rootElementPageremove(context){ // pagehide -> pageremoveの順でイベントは発火するので、pagehideのタイミングでh5jqmpagehideをトリガすればよいが、
// 別ページに遷移する際、JQMがpagebeforeloadからpageloadの間のタイミングで、pageremoveをトリガするハンドラをpagehide.removeにバインドしてしまう為、
// これ以降にpagehideに対して登録したハンドラは全てpageremoveの後に発火してしまう
// 上記の理由により、pageremoveが発生する場合は、このタイミングでh5jqmpagehideイベントをトリガし、
// pagehideイベントではh5jqmpagehideイベントを発火しないようフラグで制御する
$(context.event.target).trigger(EV_NAME_H5_JQM_PAGE_HIDE,{nextPage:$.mobile.activePage});hideEventFired=true;var id=context.event.target.id;var controllers=controllerInstanceMap[id];var dynamicControllers=dynamicControllerInstanceMap[id];if(controllers){for(var i=0,len=controllers.length;i<len;i++){controllers[i].dispose();}controllerInstanceMap[id]=[];}if(dynamicControllers){for(var i=0,len=dynamicControllers.length;i<len;i++){dynamicControllers[i].dispose();}dynamicControllerInstanceMap[id]=[];}}, /**
		 * pagebeforeshowイベントのハンドラ
		 *
		 * @param {Object} context コンテキスト
		 * @memberOf JQMController
		 */'{rootElement} pagebeforeshow':function rootElementPagebeforeshow(context){var id=context.event.target.id;this.addCSS(id);changeListenerState(id,true);}, /**
		 * pagehideイベントのハンドラ コントローラでもページ非表示時のイベントを拾えるようにするため、
		 * JQMのpagehideイベントと同じタイミングで、JQMマネージャが管理しているコントローラのルート要素に対してh5jqmpagehideイベントをトリガします
		 * h5jqmpagehideイベントをトリガ後アクティブページ以外のページに対して、コントローラのイベントハンドラの無効化と、 CSSの定義をHEADタグから削除を行います
		 *
		 * @param {Object} context コンテキスト
		 * @memberOf JQMController
		 */'{rootElement} pagehide':function rootElementPagehide(context){if(!hideEventFired){$(context.event.target).trigger(EV_NAME_H5_JQM_PAGE_HIDE,{nextPage:context.evArg.nextPage});}hideEventFired=false;var id=context.event.target.id;changeListenerState(id,false);this.removeCSS(id);}, /**
		 * コントローラでもページ表示時のイベントを拾えるようにするため、 JQMのpageshowイベントと同じタイミングで、JQMマネージャが管理しているコントローラのルート要素に対して
		 * h5jqmpageshowイベントをトリガします
		 *
		 * @param {Object} context コンテキスト
		 * @memberOf JQMController
		 */'{rootElement} pageshow':function rootElementPageshow(context){var emulatePageShow=false;var $target=$(context.event.target);var $fromPage=context.evArg?context.evArg.prevPage:$('');var conAr=controllerInstanceMap[$target[0].id];if(conAr){for(var i=0,len=conAr.length;i<len;i++){var controllerInstance=conAr[i]; // isReady=falseであるときコントローラのイベントハンドラは無効であり、
// JQMマネージャが管理する静的コントローラがイベントを受け取れない状態なので、h5controllerready後にh5jqmpageshowをトリガするようにする
// トランジションのアニメーションが無効(同期でJQMのイベントが発生する)場合のみここに到達する
if(!controllerInstance.isReady){$target.unbind(EV_NAME_EMULATE_PAGE_SHOW).one(EV_NAME_EMULATE_PAGE_SHOW,function(){if($.mobile.activePage[0]===$target[0]){$target.trigger(EV_NAME_H5_JQM_PAGE_SHOW,{prevPage:$fromPage});}});emulatePageShow=true;break;}}}if(!emulatePageShow){$target.trigger(EV_NAME_H5_JQM_PAGE_SHOW,{prevPage:$fromPage});}}, /**
		 * h5controllerboundイベントを監視しコントローラインスタンスを管理するためのイベントハンドラ
		 *
		 * @param {Object} context コンテキスト
		 * @memberOf JQMController
		 */'{rootElement} h5controllerbound':function rootElementH5controllerbound(context){var boundController=context.evArg;if(this===boundController){return;}var id=getActivePageId();if(id===null){return;} // define()でバインドしたコントローラも、h5controllerboundイベントを発火するので、
// このイベントを発生させたコントローラが、define()によってバインドしたコントローラか判定する
// ↑がtrue = 「既にJQMManagerの管理対象になっているコントローラ」なので、dynamicControllerInstanceMapに含めない
if($.inArray(boundController,controllerInstanceMap[id])!==-1){return;}if(!dynamicControllerInstanceMap[id]){dynamicControllerInstanceMap[id]=[];}dynamicControllerInstanceMap[id].push(boundController);}, /**
		 * 動的に生成されたコントローラがunbindまたはdisposeされた場合、JQMManagerの管理対象から除外します
		 *
		 * @param context コンテキスト
		 * @memberOf JQMController
		 */'{rootElement} h5controllerunbound':function rootElementH5controllerunbound(context){var unboundController=context.evArg;var id=getActivePageId();if(id===null){return;}var index=$.inArray(unboundController,dynamicControllerInstanceMap[id]);if(index===-1){return;}dynamicControllerInstanceMap[id].splice(index,1);}, /**
		 * 指定されたページIDに紐付くスクリプトをロードする。
		 *
		 * @param {String} id ページID
		 * @memberOf JQMController
		 */loadScript:function loadScript(id){var page=$('#'+id);var script=$.trim(page.data(this.getDataAttribute('script')));if(script.length===0){return;}var src=$.map(script.split(','),function(n){return $.trim(n);});var async=page.data(this.getDataAttribute('async'))==true;return h5.u.loadScript(src,{async:async});}, /**
		 * JQMコントローラが使用するdata属性にprefixを付けた属性名を返す。
		 *
		 * @param {String} attributeName 属性名
		 * @returns {String} prefixを付けた属性名
		 */getDataAttribute:function getDataAttribute(attributeName){var prefix=h5.ui.jqm.dataPrefix;if(prefix==null){prefix='h5';}return prefix.length!==0?prefix+'-'+attributeName:attributeName;}, /**
		 * コントローラのバインドを行う
		 *
		 * @param {String} id ページID
		 * @memberOf JQMController
		 */bindController:function bindController(id){var controllerDefs=controllerMap[id];var initParams=initParamMap[id];if(!controllerDefs||controllerDefs.length===0){return;}if(!controllerInstanceMap[id]){controllerInstanceMap[id]=[];}var ci=controllerInstanceMap[id];for(var i=0,len=controllerDefs.length;i<len;i++){var defObj=controllerDefs[i];if(equalsControllerName(ci,defObj)){continue;}controllerInstanceMap[id].push(h5.core.controller('#'+id,defObj,initParams[i]));}}, /**
		 * 指定されたページIDに紐付くCSSをHEADに追加する。
		 *
		 * @param {String} id ページID
		 * @memberOf JQMController
		 */addCSS:function addCSS(id){var src=cssMap[id];if(!src){return;}var head=document.getElementsByTagName('head')[0];var linkTags=head.getElementsByTagName('link');var linkLen=linkTags.length;for(var i=0,srcLen=src.length;i<srcLen;i++){var path=$.mobile.path.parseUrl(src[i]).filename;var isLoaded=false;for(var j=0;j<linkLen;j++){var loadedPath=$.mobile.path.parseUrl(linkTags[j].href).filename;if(loadedPath===path){isLoaded=true;break;}}if(isLoaded){continue;}var cssNode=document.createElement('link');cssNode.type='text/css';cssNode.rel='stylesheet';cssNode.href=src[i];head.appendChild(cssNode);}}, /**
		 * 指定されたページIDに紐付くCSSを削除する。
		 *
		 * @param {String} id ページID
		 * @memberOf JQMController
		 */removeCSS:function removeCSS(id){var fromPageCSS=cssMap[id];if(!fromPageCSS){return;}var id=getActivePageId();if(id===null){return;}var toPageCSS=cssMap[id];$('link').filter(function(){var href=$(this).attr('href'); // 遷移元のページで使用していたCSSファイルを、遷移先のページでも使用する場合はremoveしない
return $.inArray(href,fromPageCSS)!==-1&&$.inArray(href,toPageCSS)===-1;}).remove();}}; // =============================
// Expose to window
// =============================
/**
	 * jQuery Mobile専用コントローラマネージャ (JQM Manager)
	 * <p>
	 * 現在表示されているページ(アクティブページ)に指定したコントローラとCSSファイルを読み込むという定義を行うことにより、 jQuery
	 * Mobile特有のページのライフサイクル(DOM生成や破棄)にあわせて、ページに対して
	 * <ul>
	 * <li>コントローラで定義したハンドラ</li>
	 * <li>スタイル(CSSファイル)</li>
	 * </ul>
	 * の有効・無効化を行います。
	 * <p>
	 * JQM Managerはページ内で動的に作成した(h5.core.controller()で生成した)コントローラも管理します。<br>
	 * 動的に生成したコントローラもページに紐づくものとして管理し、define()で生成したコントローラと同様に、ページの遷移によってハンドラとスタイルの有効・無効化を行います。
	 * <p>
	 * 動的に生成されたコントローラは、そのページに内で起こったユーザー操作などによって初めて作られるものと考えられるため、
	 * pageremoveイベントが発生してページが破棄されると、そのページに紐づいたコントローラのインスタンスも破棄されます。
	 *
	 * @name manager
	 * @memberOf h5.ui.jqm
	 * @namespace
	 */h5.u.obj.expose('h5.ui.jqm.manager',{ /**
				 * jQuery Mobile用hifiveコントローラマネージャを初期化します。
				 * <p>
				 * 2回目以降は何も処理を行いません。
				 *
				 * @memberOf h5.ui.jqm.manager
				 * @function
				 * @name init
				 */init:function init(){if(isInitCalled){fwLogger.info(FW_LOG_JQM_CONTROLLER_ALREADY_INITIALIZED);return;}isInitCalled=true; // jqmのバージョンを見てpagecreateイベントのタイミングで初期化するべきかどうかのフラグの値をセットする
// (initが呼ばれるタイミングではjqmが読み込まれている前提)
shouldHandlePagecreateEvent=compareVersion($.mobile.version,'1.4')>=0; // 初期表示時、JQMマネージャがreadyになる前にpageshowイベントが発火したかをチェックする
$(document).one('pageshow',function(){showEventFiredBeforeReady=true;});$(function(){jqmControllerInstance=h5internal.core.controllerInternal('body',jqmController,null,{managed:false});bindToActivePage();});}, /**
				 * jQuery Mobile用hifiveコントローラマネージャにコントローラを登録します。
				 * <p>
				 * 「data-role="page"」または「data-role="dialog"」の属性が指定された要素でかつ、
				 * idが第1引数で指定されたものに一致する要素に対してコントローラを登録します。
				 * <p>
				 * 1つのページに複数コントローラを登録することもできます。<br>
				 * 以下のように、登録したいコントローラ定義オブジェクトの数分、define()を実行して下さい。
				 *
				 * <pre>
				 * h5.ui.jqm.manager.define('pageA', 'css/pageA.css', controllerDefA, defAParams);
				 * h5.ui.jqm.manager.define('pageA', 'css/pageA.css', controllerDefB, defBParams);
				 * </pre>
				 *
				 * 注意:<br>
				 * ただし、ページに同じコントローラを2つ以上バインドすることはできません。<br>
				 * 同じコントローラであるかの判定は、コントローラ定義オブジェクトの<b>__name</b>プロパティの値がバインド済みのコントローラと同値であるか比較し、同値の場合はバインドされません。
				 *
				 * @param {String} id ページID
				 * @param {String|String[]} [cssSrc] CSSファイルのパス
				 * @param {Object} [controllerDefObject] コントローラ定義オブジェクト
				 * @param {Object} [initParam] 初期化パラメータ (ライフサイクルイベント(__construct, __init,
				 *            __ready)の引数にargsプロパティとして渡されます)
				 * @memberOf h5.ui.jqm.manager
				 * @function
				 * @name define
				 */define:function define(id,cssSrc,controllerDefObject,initParam){if(!isString(id)){throwFwError(ERR_CODE_INVALID_TYPE,'id');}if(cssSrc!=null&&!isString(cssSrc)&&!isArray(cssSrc)){throwFwError(ERR_CODE_INVALID_TYPE,'cssSrc');}if(controllerDefObject!=null){if(isString(controllerDefObject)||isArray(controllerDefObject)){throwFwError(ERR_CODE_NAME_INVALID_PARAMETER);}if(!$.isPlainObject(controllerDefObject)||!('__name' in controllerDefObject)){throwFwError(ERR_CODE_INVALID_TYPE,'controllerDefObject');}if(initParam!=null&&!$.isPlainObject(initParam)){throwFwError(ERR_CODE_INVALID_TYPE,'initParam');}}if(!cssMap[id]){cssMap[id]=[];}if(!controllerMap[id]){controllerMap[id]=[];}if(!initParamMap[id]){initParamMap[id]=[];}$.merge(cssMap[id],$.map($.makeArray(cssSrc),function(val,i){if($.inArray(val,cssMap[id])!==-1){fwLogger.info(FW_LOG_CSS_FILE_PATH_ALREADY_DEFINED,val);return null;}return val;}));if(controllerDefObject){if($.inArray(controllerDefObject,controllerMap[id])===-1){controllerMap[id].push(controllerDefObject);initParamMap[id].push(initParam);}else {fwLogger.info(FW_LOG_CONTROLLER_DEF_ALREADY_DEFINED,controllerDefObject.__name);}}if(isInitCalled&&getActivePageId()!==null){bindToActivePage();}else {this.init();}} /* del begin */, /*
				 * テスト用に公開
				 * JQMControllerが管理しているコントローラへの参照と、JQMControllerインスタンスへの参照を除去し、JQMControllerをdisposeをします。
				 *
				 * @memberOf h5.ui.jqm.manager
				 * @function
				 * @name __reset
				 */__reset:function __reset(){if(jqmControllerInstance){jqmControllerInstance.dispose();jqmControllerInstance=null;}controllerMap={};controllerInstanceMap={};dynamicControllerInstanceMap={};initParamMap={};cssMap={};isInitCalled=false;hideEventFired=false;showEventFiredBeforeReady=false;} /* del end */});})();(function(){var fwLogger=h5.log.createLogger('h5.ui.components.BalloonController');var MSG_CANNOT_CALL_METHOD_DISPOSED='dispose済みのBalloonは操作できません'; /** 吹き出し(三角の部分)の大きさ * */var ARROW_SIZE=34; /**
	 * Balloonクラス
	 *
	 * @class
	 */function Balloon(arrowboxTmpl,content,option){ // display:noneで追加する
this._$arrowbox=$(arrowboxTmpl).css('display','none');this.setContent(content); // containerが指定されていればcontainerを親要素とする
// containerが指定されてなければtargetを親要素とする
// targetも指定されてなければbodyを親要素とする
var container=option&&option.container||option.target.parentElement||document.body;$(container).append(this._$arrowbox); // Balloonインスタンスを要素に持たせる
this._$arrowbox.data('validation-balloon',this);option=option||{}; // クラスの追加
if(option.cls){this._$arrowbox.addClass(option.cls);}}$.extend(Balloon.prototype,{show:function show(option){if(this._isDisposed){fwLogger.info(MSG_CANNOT_CALL_METHOD_DISPOSED);return;}var $arrowbox=this._$arrowbox; // 吹き出しの消去
this.hide(); // 吹き出しの表示(位置調整の前に表示して、offset()で位置とサイズを取得できるようにする)
$arrowbox.css('display','block'); // optionが指定されていない場合は表示して終わり(前に表示した箇所に表示される)
if(!option){return;} // directionが指定されて���ければデフォルトは'top'
var direction=option.direction||'top';$arrowbox.addClass(direction); // positionまたはtargetから表示位置を取得する
// positionまたはtargetはどちらかの指定が必須。
var position=option.position;var $target=$(option.target);var targetW=position?0:$target.outerWidth();var targetH=position?0:$target.outerHeight();var arrowboxPosition=position?$.extend({},position):{top:$target.offset().top,left:$target.offset().left}; // $targetと$arrowboxの左上の位置を合わせる
if(direction==='top'||direction==='bottom'){ // 吹き出しの位置が$targetの真ん中に来るように合わせる
arrowboxPosition.left+=(targetW-$arrowbox.outerWidth())/2;if(direction==='top'){ // 吹き出し分だけ上に移動
arrowboxPosition.top-=$arrowbox.outerHeight()+ARROW_SIZE;}else { // $target分だけ下に移動
arrowboxPosition.top+=targetH+ARROW_SIZE;}}else { // 吹き出しの位置が$targetの真ん中に来るように合わせる
arrowboxPosition.top+=(targetH-$arrowbox.outerHeight())/2;if(direction==='left'){ // 吹き出し分だけ左に移動
arrowboxPosition.left-=$arrowbox.outerWidth()+ARROW_SIZE;}else { // $target分だけ下に移動
arrowboxPosition.left+=targetW+ARROW_SIZE;}} // 吹き出し位置
$arrowbox.css(arrowboxPosition);},hide:function hide(){if(this._isDisposed){fwLogger.info(MSG_CANNOT_CALL_METHOD_DISPOSED);return;}this._$arrowbox&&this._$arrowbox.css('display','none');},setContent:function setContent(content){if(this._isDisposed){fwLogger.info(MSG_CANNOT_CALL_METHOD_DISPOSED);return;}this._$arrowbox.children().remove();this._$arrowbox.append(content);},dispose:function dispose(){if(this._isDisposed){fwLogger.info(MSG_CANNOT_CALL_METHOD_DISPOSED);return;} // 吹き出しの削除
this.hide();this._$arrowbox.remove();this._$arrowbox=null;this._isDisposed=true;}}); /**
	 * BalloonController定義
	 *
	 * @name h5.ui.components.BalloonController
	 * @namespace
	 */var arrowboxController={ /**
		 * コントローラ名
		 *
		 * @memberOf h5.ui.components.BalloonController
		 * @type String
		 */__name:'h5.ui.components.BalloonController', /**
		 * ライフサイクルイベント __ready
		 *
		 * @memberOf h5.ui.components.BalloonController
		 * @param context
		 */__init:function __init(context){this.view.register('balloon','<div class="validation-balloon"></div>');}, /**
		 * Balloonインスタンスを作って返す
		 *
		 * @memberOf h5.ui.components.BalloonController
		 * @param {String|DOM|jQuery} content 吹き出しの中身
		 */create:function create(content,option){var $balloon=this.view.get('balloon');return new Balloon($balloon,content,option);}, /**
		 * BalloonのDOM要素からBalloonインスタンスを取得して返す
		 *
		 * @memberOf h5.ui.components.BalloonController
		 * @param {DOM|jQuery|String} elm 要素またはセレクタ
		 */getBalloonFromElement:function getBalloonFromElement(elm){var $elm=$(elm);if($elm.length>1){fwLogger.error('getBalloonFromElementには一つの要素または、一つの要素にマッチするセレクタを渡してください。');}return $elm.data('validation-balloon');}};h5.core.expose(arrowboxController);})();(function(){ // =========================================================================
//
// Constants
//
// =========================================================================
// =============================
// Production
// =============================
// =============================
// Development Only
// =============================
var fwLogger=h5.log.createLogger('h5.ui.FormController'); /** デフォルトのルールにないルールでのバリデートエラーの場合に出すメッセージ */var MSG_DEFAULT_INVALIDATE='{0}:{1}はルール{2}を満たしません'; /* del begin */ // ログメッセージ
var FW_LOG_ERROR_CREATE_VALIDATE_MESSAGE='バリデートエラーメッセージの生成に失敗しました。message:{0}'; /* del end */ // =========================================================================
//
// Cache
//
// =========================================================================
// =========================================================================
//
// Privates
//
// =========================================================================
// =============================
// Variables
// =============================
/**
	 * デフォルトエラーメッセージ
	 */var defaultInvalidMessage={required:'{displayName}は必須項目です',min:function min(param){return h5.u.str.format('{displayName}は{violation[0].ruleValue.min}{1}数値を入力してください。',param,param.violation[0].ruleValue.inclusive?"以上の":"より大きい");},max:function max(param){return h5.u.str.format('{displayName}は{violation[0].ruleValue.max}{1}数値を入力してください。',param,param.violation[0].ruleValue.inclusive?"以下の":"未満の");},pattern:'{displayName}は正規表現{violation[0].ruleValue.regexp}を満たす文字列を入力してください。',digits:'{displayName}は整数部分{violation[0].ruleValue.integer}桁、小数部分{fraction}桁以下の数値を入力してください。',size:function size(param){var upperLimitMsg='';var lowerLimitMsg='';var min=param.violation[0].ruleValue.min;var max=param.violation[0].ruleValue.max;if(min!=null){lowerLimitMsg=h5.u.str.format('{0}以上',min);}if(max!=null){upperLimitMsg=h5.u.str.format('{0}以下',max);}return h5.u.str.format('{displayName}は{1}{2}の長さでなければいけません。',param,lowerLimitMsg,upperLimitMsg);},future:'{displayName}は現在時刻より未来の時刻を入力してください。',past:'{displayName}は現在時刻より過去の時刻を入力してください。',assertNull:'{displayName}はnullでなければなりません。',assertNotNull:'{displayName}はnullでない値を設定してください。',assertFalse:'{displayName}はfalseとなる値を入力してください。',assertTrue:'{displayName}はtrueとなる値を入力してください。',customFunc:'{displayName}は条件を満たしません'}; // =============================
// Functions
// =============================
/**
	 * メッセージ生成関数
	 *
	 * @memberOf h5internal.validation
	 * @private
	 * @param {string} name
	 * @param {Object} reason
	 * @param {Object} setting
	 * @returns {string} メッセージ
	 */function createValidateErrorMessage(name,reason,setting){var displayName=setting&&setting.displayName||name;var msg=setting&&setting.message;var param=$.extend({},reason,{displayName:displayName});if(isString(msg)){ // messageが指定されていればh5.u.str.formatでメッセージを作成
return h5.u.str.format(msg,param);}else if(isFunction(msg)){return msg(param);} // 何も設定されていない場合はデフォルトメッセージ
// デフォルトメッセージはviolationの一番最初のルールから作成する
var ruleName=reason.violation[0].ruleName;var defaultMsg=defaultInvalidMessage[ruleName];if(defaultMsg){if(isFunction(defaultMsg)){return defaultMsg(param);}return h5.u.str.format(defaultMsg,param);} // デフォルトにないルールの場合
return h5.u.str.format(MSG_DEFAULT_INVALIDATE,name,reason.value,ruleName);} // =========================================================================
//
// Body
//
// =========================================================================
// =============================
// Expose to window
// =============================
h5internal.validation={createValidateErrorMessage:createValidateErrorMessage}; /**
	 * メッセージ及びvalidate結果から作成したメッセージを出力するコントローラ
	 *
	 * @class
	 * @name h5.ui.validation.MessageOutputController
	 */var controlelr={__name:'h5.ui.validation.MessageOutputController',_container:null,_wrapper:null, // validationResultからメッセージを作るための設定
_setting:{}, /**
		 * メッセージ出力先要素をコンテナとして設定する
		 *
		 * @memberOf h5.ui.validation.MessageOutputController
		 * @param {DOM|jQuery|string} container デフォルト出力先(コンテナ)要素をDOM要素、jQueryオブジェクト、セレクタ文字列の何れかで指定
		 */setContainer:function setContainer(container){this._container=container;}, /**
		 * メッセージ出力時にメッセージをラップする要素の設定
		 * <p>
		 * タグまたはタグ生成文字列をラッパーとして設定します。
		 * </p>
		 * <p>
		 * タグ名を指定した場合、指定されたタグで生成した要素でメッセージをラップします。
		 * </p>
		 * <p>
		 * '&lt;span class=&quot;hoge&quot;&gt;'のようなタグ生成文字列も設定でき、指定された文字列から作成した要素でメッセージをラップします。
		 * </p>
		 * <p>
		 * ラッパーの指定がない場合は、このコントローラはメッセージをテキストノードとして出力します。
		 * </p>
		 *
		 * @memberOf h5.ui.validation.MessageOutputController
		 * @param {string} wrapper メッセージをラップするタグまたはタグ生成文字列
		 */setWrapper:function setWrapper(wrapper){this._wrapper=wrapper;}, /**
		 * メッセージ出力先の設定を適用する
		 * <p>
		 * メッセージを{@link ValidationResult}から出力する([appendMessageByValidationResult]{@link h5.ui.validation.appendMessageByValidationResult}を使用する)場合の設定を行うメソッド。
		 * </p>
		 * <p>
		 * プロパティ毎の設定を以下のようなオブジェクトで指定します。既に設定済みのプロパティがある場合、設定は上書かれます。
		 * </p>
		 *
		 * <pre class="sh_javascript"><code>
		 * addMessageSetting({
		 * 	// プロパティ名をキーにして、プロパティ毎のメッセージ定義を記述
		 * 	userid: {
		 * 		displayName: 'ユーザID', // 表示名
		 * 		message: '{displayName}がルール{rule}に違反しています。', // メッセージ。プレースホルダを記述可能(後述)。
		 * 	},
		 * 	address: {
		 * 		message: 'アドレスが不正です'
		 * 	}
		 * });
		 * </code></pre>
		 *
		 * <p>
		 * message,displayName設定プロパティについては{@link h5.ui.FormController.setSetting}をご覧ください。
		 * </p>
		 *
		 * @memberOf h5.ui.validation.MessageOutputController
		 * @param {Object} messageSetting プロパティ毎のメッセージ定義。{プロパティ名: {message:..., displayName:...}}
		 *            のようなオブジェクト
		 */addMessageSetting:function addMessageSetting(messageSetting){if(!this._setting){this._setting=messageSetting;return;}for(var prop in messageSetting){ // 既にメッセージ定義が設定されているプロパティについては上書き
this._setting[prop]=messageSetting[prop];}}, /**
		 * コンテナからメッセージを削除
		 * <p>
		 * {@link h5.ui.validation.MessageOutputController.setContainer|setContainer}で設定した出力先からメッセージを削除します。出力先未設定の場合は何もしません。
		 * </p>
		 *
		 * @memberOf h5.ui.validation.MessageOutputController
		 */clearMessage:function clearMessage(){if(this._container){$(this._container).empty();}}, /**
		 * メッセージの追加表示
		 * <p>
		 * {@link h5.ui.validation.MessageOutputController.setContainer|setContainer}で設定済みコンテナにメッセージを出力します。コンテナ未設定の場合は何もしません。
		 * </p>
		 * <p>
		 * メッセージは{@link h5.ui.validation.MessageOutputController.setWrapper|setWrapper}で設定したラッパーで包んで出力します。ラッパー未設定の場合はテキストノードとしてしゅつりょくします。
		 * </p>
		 *
		 * @param {string} message メッセージ
		 */appendMessage:function appendMessage(message){ // 未指定ならsettingに設定されたコンテナ
var container=this._container;var $container=$(container);if(!$container.length){return;}var wrapper=this._wrapper;if(wrapper){if(h5.u.str.startsWith($.trim(wrapper),'<')){ // '<span class="hoge">'のような指定ならその文字列でDOM生成
msgElement=$(wrapper);msgElement.text(message);}else { // 'span'のような指定ならcreateElementでエレメント生成
msgElement=$(document.createElement(wrapper)).html(message);}}else { // wrapper未設定ならテキストノード
msgElement=document.createTextNode(message);}$container.append(msgElement);}, /**
		 * {@link ValidationResult}からエラーメッセージを作成して返す
		 * <p>
		 * 第1引数に指定されたプロパティ名についてのエラーメッセージを作成して返します
		 * </p>
		 * <p>
		 * 指定されたプロパティがエラーでない場合はnullを返します。
		 * </p>
		 *
		 * @memberOf h5.ui.validation.MessageOutputController
		 * @param {ValidationResult} validationResult
		 * @param {string} name 対象のプロパティ名
		 * @returns {string} エラーメッセージ
		 */getMessageByValidationResult:function getMessageByValidationResult(validationResult,name){var invalidReason=validationResult.invalidReason[name];if(!invalidReason){return null;}return h5internal.validation.createValidateErrorMessage(name,invalidReason,this._setting[name]);}, /**
		 * {@link ValidationResult}からメッセージを作成してコンテナに追加表示する
		 * <p>
		 * {@link ValidationResult}が非同期バリデート待ちの場合は、結果が返ってきたタイミングでメッセージを表示します。
		 * </p>
		 * <p>
		 * {@link h5.ui.validation.MessageOutputController.setContainer|setContainer}で設定済みコンテナにメッセージを出力します。コンテナ未設定の場合は何もしません。
		 * </p>
		 * <p>
		 * メッセージは{@link h5.ui.validation.MessageOutputController.setWrapper|setWrapper}で設定したラッパーで包んで出力します。ラッパー未設定の場合はテキストノードとしてしゅつりょくします。
		 * </p>
		 *
		 * @memberOf h5.ui.validation.MessageOutputController
		 * @param {ValidationResult} validationResult
		 * @param {string|string[]} [names] 出力対象のプロパティ名。指定しない場合は全てが対象
		 */appendMessageByValidationResult:function appendMessageByValidationResult(validationResult,names){var invalidProperties=validationResult.invalidProperties;names=isString(names)?[names]:names;for(var i=0,l=invalidProperties.length;i<l;i++){var name=invalidProperties[i];if(names&&$.inArray(name,names)===-1){continue;}var message=this.getMessageByValidationResult(validationResult,name);this.appendMessage(message);}if(validationResult.isAllValid===null){ // 非同期でまだ結果が返ってきていないものがある場合
validationResult.addEventListener('validate',this.own(function(ev){if(!ev.isValid&&!names||$.inArray(ev.name,names)!==-1){var invalidReason=ev.target.invalidReason[ev.name];var message=h5internal.validation.createValidateErrorMessage(ev.name,invalidReason,this._setting[ev.name]);this.appendMessage(message);}}));return;}}};h5.core.expose(controlelr);})();(function(){var STATE_ERROR='error';var STATE_SUCCESS='success';var STATE_VALIDATING='validating'; /**
	 * バリデートエラー箇所の要素にクラスを追加するための[FormController]{@link h5.ui.validation.FormController}プラグイン
	 * <p>
	 * styleプラグインには以下の設定項目があります。
	 * </p>
	 * <table><thead>
	 * <tr>
	 * <th>設定項目</th>
	 * <th>型</th>
	 * <th>説明</th>
	 * <th>デフォルト値</th>
	 * </tr>
	 * </thead><tbody>
	 * <tr>
	 * <th>errorClassName</th>
	 * <td>string</td>
	 * <td>バリデートエラー時に適用するクラス名</td>
	 * <td>なし</td>
	 * </tr>
	 * <tr>
	 * <th>successClassName</th>
	 * <td>string</td>
	 * <td>バリデート成功時に適用するクラス名</td>
	 * <td>なし</td>
	 * </tr>
	 * <tr>
	 * <th>validatingClassName</th>
	 * <td>string</td>
	 * <td>非同期バリ���ートの結果待機時に適用するクラス名</td>
	 * <td>なし</td>
	 * </tr>
	 * </tbody></table>
	 * <p>
	 * プラグインの設定方法は、{@link h5.ui.FormController.setSetting}をご覧ください。
	 * </p>
	 *
	 * @class
	 * @name h5.ui.validation.Style
	 */var controller={__name:'h5.ui.validation.Style', /**
		 * プラグイン設定
		 *
		 * @private
		 * @memberOf h5.ui.validaiton.Style
		 */_setting:{}, /**
		 * このプラグインがスタイルを適用した要素
		 * <p>
		 * キーにプロパティ名、値に要素を覚えておく
		 * </p>
		 *
		 * @private
		 * @memberOf h5.ui.validation.Style
		 */_styleAppliedElements:{}, /**
		 * プラグイン設定を行う
		 *
		 * @private
		 * @memberOf h5.ui.validation.Style
		 * @param {Object} setting styleプラグイン設定オブジェクト
		 */_setSetting:function _setSetting(setting){this._setting=setting;}, /**
		 * バリデート時に呼ばれる
		 * <p>
		 * {@link ValidationResult}から、各要素にクラスを設定する
		 * </p>
		 *
		 * @private
		 * @memberOf h5.ui.validation.Style
		 * @param {ValidationResult} result
		 */_onValidate:function _onValidate(validationResult){ // validだったものにクラスを適用
var properties=validationResult.properties;for(var i=0,l=properties.length;i<l;i++){var name=properties[i];this._setStyle(this.parentController._getElementByName(name),name,validationResult);}}, /**
		 * フォーム部品フォーカス時に呼ばれる
		 * <p>
		 * イベントの発生したフォーム部品のバリデート結果を適用
		 * </p>
		 *
		 * @private
		 * @memberOf h5.ui.validation.Style
		 * @param {DOM} element イベント発生要素
		 * @param {string} name イベント発生要素の名前(グループの場合はグループ名)
		 * @param {ValidationResult} validationResult
		 */_onFocus:function _onFocus(element,name,validationResult){this._setStyle(element,name,validationResult);}, /**
		 * フォーム部品のkeyup時に呼ばれる
		 * <p>
		 * イベントの発生したフォーム部品のバリデート結果を適用
		 * </p>
		 *
		 * @private
		 * @memberOf h5.ui.validation.Style
		 * @param {DOM} element イベント発生要素
		 * @param {string} name イベント発生要素の名前(グループの場合はグループ名)
		 * @param {ValidationResult} validationResult
		 */_onKeyup:function _onKeyup(element,name,validationResult){this._setStyle(element,name,validationResult);}, /**
		 * プラグインのリセット
		 * <p>
		 * 全てのフォームコントロール部品からプラグインが追加したクラスを全て削除します
		 * </p>
		 *
		 * @memberOf h5.ui.validation.Style
		 */reset:function reset(){ // このプラグインが触った要素全てからクラスを削除
for(var name in this._styleAppliedElements){var element=this._styleAppliedElements[name];var propSetting=$.extend({},this._setting,this._setting.property&&this._setting.property[name]);this._setValidateState(null,element,propSetting,name);}}, /**
		 * バリデート結果からクラスをセットする
		 *
		 * @private
		 * @memberOf h5.ui.validation.Style
		 * @param element
		 * @param name
		 * @param validationResult
		 */_setStyle:function _setStyle(element,name,validationResult){ // 共通設定とプロパティ毎の設定をマージ
var propSetting=$.extend({},this._setting,this._setting.property&&this._setting.property[name]);if(propSetting.off){ // off指定されていれば何もしない
return;}var replaceElement=propSetting.replaceElement;var element=isFunction(replaceElement)?replaceElement(element):replaceElement||element;if(!element){return;}if($.inArray(name,validationResult.validatingProperties)!==-1){ // まだvalidate結果が返ってきていない場合
this._setValidateState(STATE_VALIDATING,element,propSetting);validationResult.addEventListener('validate',this.own(function(ev){if(ev.name===name){this._setValidateState(ev.isValid?STATE_SUCCESS:STATE_ERROR,element,propSetting,name);}}));return;} // invalidPropertiesに入っていればエラー扱い、そうでない場合は成功扱い
// (そもそもルールの指定が無くvalidation対象じゃない(propertiesに入っていない)場合は成功扱い)
this._setValidateState($.inArray(name,validationResult.invalidProperties)===-1?STATE_SUCCESS:STATE_ERROR,element,propSetting,name);}, /**
		 * バリデート結果からクラスをセットする
		 * <p>
		 * 第1引数にerror,success,valiatingの何れかを取り、該当する状態のクラス名を設定する
		 * </p>
		 *
		 * @private
		 * @memberOf h5.ui.validation.Style
		 * @param state
		 * @param element
		 * @param propSetting 適用する設定オブジェクト
		 * @param 対応するプロパティ名
		 */_setValidateState:function _setValidateState(state,element,propSetting,name){var errorClassName=propSetting.errorClassName;var successClassName=propSetting.successClassName;var validatingClassName=propSetting.validatingClassName;$(element).removeClass(errorClassName).removeClass(successClassName).removeClass(validatingClassName);if(!state){return;}var className=propSetting[state+'ClassName'];$(element).addClass(className);this._styleAppliedElements[name]=element;}};h5.core.expose(controller);})();(function(){ /**
	 * validate時にエラーがあった時、エラーメッセージを表示するプラグイン
	 * <p>
	 * compositionプラグインには以下の設定項目があります。
	 * </p>
	 * <table><thead>
	 * <tr>
	 * <th>設定項目</th>
	 * <th>型</th>
	 * <th>説明</th>
	 * <th>デフォルト値</th>
	 * </tr>
	 * </thead><tbody>
	 * <tr>
	 * <th>container</th>
	 * <td>DOM|jQuery|string</td>
	 * <td>メッセージ表示先となるコンテナ要素。</td>
	 * <td>なし</td>
	 * </tr>
	 * <tr>
	 * <th>wrapper</th>
	 * <td>string</td>
	 * <td>メッセージを出力する要素のタグ名またはタグ生成文字列。'li'や、'&lt;span
	 * class="error-msg"&gt;'のような指定ができ、指定された文字列から生成した要素が各メッセージ要素になります。</td>
	 * <td>なし(テキストノードとして表示)</td>
	 * </tr>
	 * </tbody></table>
	 * <p>
	 * プラグインの設定方法は、{@link h5.ui.FormController.setSetting}をご覧ください。
	 * </p>
	 *
	 * @class
	 * @name h5.ui.validation.Composition
	 */var controller={__name:'h5.ui.validation.Composition',_messageOutputController:h5.ui.validation.MessageOutputController, /**
		 * プラグイン設定
		 *
		 * @private
		 * @memberOf h5.ui.validation.Composition
		 */_setting:{}, /**
		 * プラグイン設定を行う
		 *
		 * @private
		 * @memberOf h5.ui.validation.Composition
		 * @param {Object} setting compositionプラグイン設定オブジェクト
		 */_setSetting:function _setSetting(setting){this._setting=setting;if(this.isInit){this._setChildSetting();}else { // 子コントローラの設定は子コントローラのコントローラ化が終わってから
this.initPromise.done(this.own(this._setChildSetting));}}, /**
		 * バリデート時に呼ばれる
		 * <p>
		 * バリデート結果からメッセージを生成して表示
		 * </p>
		 *
		 * @private
		 * @memberOf h5.ui.validation.Composition
		 * @param {ValidationResult} validationResult
		 */_onValidate:function _onValidate(validationResult){this._messageOutputController.clearMessage();this._messageOutputController.appendMessageByValidationResult(validationResult);}, /**
		 * プラグインのリセット
		 * <p>
		 * メッセージを削除します
		 * </p>
		 *
		 * @memberOf h5.ui.validation.Composition
		 */reset:function reset(){this._messageOutputController.clearMessage();}, /**
		 * メッセージ出力コントローラの設定
		 *
		 * @private
		 * @memberOf h5.ui.validation.Composition
		 */_setChildSetting:function _setChildSetting(){var setting=this._setting; // 出力先の設定
this._messageOutputController.setContainer(setting.container);this._messageOutputController.setWrapper(setting.wrapper); // 各プロパティ毎のメッセージ設定をする
var property=setting.property;var messageSetting={};for(var p in property){messageSetting[p]={displayName:property[p].displayName||setting.displayName,message:property[p].message||setting.message,formatter:property[p].formatter||setting.formatter};}this._messageOutputController.addMessageSetting(messageSetting);}};h5.core.expose(controller);})();(function(){var DEFAULT_PLACEMENT='top'; /**
	 * validate時にエラーがあった時、エラーバルーンを表示するプラグイン
	 * <p>
	 * balloonプラグインには以下の設定項目があります。
	 * </p>
	 * <table><thead>
	 * <tr>
	 * <th>設定項目</th>
	 * <th>型</th>
	 * <th>説明</th>
	 * <th>デフォルト値</th>
	 * </thead><tbody>
	 * <tr>
	 * <th>placement</th>
	 * <td>string</td>
	 * <td>バルーンを表示する位置。top,right,bottom,leftの何れかで指定。</td>
	 * <td>top</td>
	 * </tr>
	 * <tr>
	 * <th>container</th>
	 * <td>DOM|jQuery|string</td>
	 * <td>バルーン要素を配置するコンテナ。表示位置ではなくDOMツリー上で配置するときのバルーン要素の親要素となる要素を指定します。指定しない場合は対象要素の親要素。</td>
	 * <td>なし</td>
	 * </tr>
	 * </tbody></table>
	 * <p>
	 * プラグインの設定方法は、{@link h5.ui.FormController.setSetting}をご覧ください。
	 * </p>
	 *
	 * @class
	 * @name h5.ui.validation.ErrorBalloon
	 */var controller={__name:'h5.ui.validation.ErrorBalloon',_executedOnValidate:false,_messageOutputController:h5.ui.validation.MessageOutputController,_setting:{}, /**
		 * プラグイン設定を行う
		 *
		 * @private
		 * @memberOf h5.ui.validation.ErrorBalloon
		 * @param {Object} setting bsBalloonプラグイン設定オブジェクト
		 */_setSetting:function _setSetting(setting){this._setting=setting;if(this.isInit){this._setChildSetting();}else { // 子コントローラの設定は子コントローラのコントローラ化が終わってから
this.initPromise.done(this.own(this._setChildSetting));}}, /**
		 * バリデート時に呼ばれる
		 * <p>
		 * バリデート結果からバルーンの表示・非表示を行う
		 * </p>
		 *
		 * @private
		 * @memberOf h5.ui.validation.ErrorBalloon
		 * @param {ValidationResult} result
		 */_onValidate:function _onValidate(result){this._executedOnValidate=true;}, /**
		 * 要素にフォーカスした時に呼ばれる
		 * <p>
		 * バリデート結果からバルーンの表示・非表示を行う
		 * </p>
		 *
		 * @private
		 * @memberOf h5.ui.validation.ErrorBalloon
		 * @param element
		 * @param name
		 * @param {ValidationResult} validationResult
		 */_onFocus:function _onFocus(element,name,validationResult){this._setErrorBalloon(element,name,validationResult,'focus');}, /**
		 * 要素からフォーカスが外れた時に呼ばれる
		 * <p>
		 * バリデート結果からバルーンの表示・非表示を行う
		 * </p>
		 *
		 * @private
		 * @memberOf h5.ui.validation.ErrorBalloon
		 * @param element
		 * @param name
		 * @param {ValidationResult} validationResult
		 */_onBlur:function _onBlur(element,name,validationResult){this._setErrorBalloon(element,name,validationResult,'blur');}, /**
		 * 要素のキーアップ時に呼ばれる
		 * <p>
		 * バリデート結果からバルーンの表示・非表示を行う
		 * </p>
		 *
		 * @private
		 * @memberOf h5.ui.validation.ErrorBalloon
		 * @param element
		 * @param name
		 * @param {ValidationResult} validationResult
		 */_onKeyup:function _onKeyup(element,name,validationResult){this._setErrorBalloon(element,name,validationResult,'keyup');}, /**
		 * プラグインのリセット
		 * <p>
		 * 表示されているバルーンを削除します
		 * </p>
		 *
		 * @memberOf h5.ui.validation.ErrorBalloon
		 */reset:function reset(){this._hideBalloon();this._executedOnValidate=false;}, /**
		 * バルーンをセット
		 *
		 * @private
		 * @memberOf h5.ui.validation.ErrorBalloon
		 * @param element
		 * @param name
		 * @param {ValidationResult} validationResult
		 * @param {string} type 要素で発生したイベントタイプ
		 */_setErrorBalloon:function _setErrorBalloon(element,name,validationResult,type){if(!this._executedOnValidate){ // _onValidateが１度も呼ばれていなければ何もしない
return;} // 共通設定とプロパティ毎の設定をマージ
var propSetting=$.extend({},this._setting,this._setting.property&&this._setting.property[name]);if(propSetting.off){ // off指定されていれば何もしない
return;}var replaceElement=propSetting.replaceElement;var target=isFunction(replaceElement)?replaceElement(element):replaceElement||element;if(!target){return;}if(type==='blur'||element!==document.activeElement&&!$(document.activeElement).closest(element).length){ // フォーカスが外れた時、該当要素または該当要素内の要素にフォーカスが当たっていない場合は非表示にする
this._hideBalloon();return;}var placement=propSetting.placement||DEFAULT_PLACEMENT;var container=propSetting.container||null;if($.inArray(name,validationResult.validatingProperties)!==-1){ // 非同期バリデートの結果待ちの場合
validationResult.addEventListener('validate',this.own(function(ev){if(element!==document.activeElement){return; // 非同期バリデート終了時に既にフォーカスが外れていたら何もしない
}if(ev.isValid){ // validならバルーンを隠す
this._hideBalloon();return;} // invalidならバルーン表示
this._showBalloon(target,placement,container,this._messageOutputController.getMessageByValidationResult(validationResult,ev.name));}));return;}var invalidReason=validationResult.invalidReason&&validationResult.invalidReason[name];if(!invalidReason){ // validateエラーがないときはhideして終了
this._hideBalloon();return;} // validateエラーがあるとき
this._showBalloon(target,placement,container,this._messageOutputController.getMessageByValidationResult(validationResult,name));}, /**
		 * バルーンを表示
		 *
		 * @private
		 * @memberOf h5.ui.validation.ErrorBalloon
		 * @param target
		 * @param placement
		 * @param message
		 */_showBalloon:function _showBalloon(target,placement,container,message){this._hideBalloon();var balloonCtrl=this._balloonController;if(!balloonCtrl){var c=h5.core.controller(this.rootElement,h5.ui.components.BalloonController);this.manageChild(c);c.readyPromise.done(this.own(function(){this._balloonController=c;this._showBalloon(target,placement,container,message);}));return;}var option={target:target,container:container};var balloon=this._balloonController.create(message,option); // 吹き出しの表示
balloon.show({target:target,direction:placement});this._currentBalloon=balloon;this._currentBalloonTarget=target;}, /**
		 * バルーンを非表示
		 *
		 * @private
		 * @memberOf h5.ui.validation.ErrorBalloon
		 * @param target
		 * @param placement
		 * @param message
		 */_hideBalloon:function _hideBalloon(target,placement,container,message){if(this._currentBalloon){this._currentBalloon.dispose();this._currentBalloon=null;}this._currentBalloonTarget=null;}, /**
		 * メッセージ出力コントローラの設定
		 *
		 * @private
		 * @memberOf h5.ui.validation.ErrorBalloon
		 */_setChildSetting:function _setChildSetting(){var setting=this._setting; // 各プロパティ毎のメッセージ設定をする
var property=setting.property;var messageSetting={};for(var p in property){messageSetting[p]={displayName:property[p].displayName||setting.displayName,message:property[p].message||setting.message,formatter:property[p].formatter||setting.formatter};}this._messageOutputController.addMessageSetting(messageSetting);}};h5.core.expose(controller);})();(function(){var DEFAULT_PLACEMENT='top'; /**
	 * validate時にエラーがあった時、Bootstrapのエラーバルーンを表示するプラグイン
	 * <p>
	 * このプラグインはBootstrapに依存します。Bootstrapのtooltipを使用して表示してています。
	 * </p>
	 * <p>
	 * API仕様は{@link h5.ui.validation.ErrorBalloon}と同じです。
	 * </p>
	 * <p>
	 * プラグインの設定方法は、{@link h5.ui.FormController.setSetting}をご覧ください。
	 * </p>
	 *
	 * @class
	 * @name h5.ui.validation.BootstrapErrorBalloon
	 */var controller={__name:'h5.ui.validation.BootstrapErrorBalloon', /**
		 * バルーンの削除
		 * <p>
		 * 表示されているバルーンを削除します
		 * </p>
		 *
		 * @private
		 * @memberOf h5.ui.validation.BootstrapErrorBalloon
		 */_hideBalloon:function _hideBalloon(){ // 常にバルーンは一つのみ表示している実装のため、その1つのバルーンを非表示
$(this._currentBalloonTarget).tooltip('hide');}, /**
		 * bootstrapのtooltipを使ってバルーンを表示
		 *
		 * @private
		 * @memberOf h5.ui.validation.BootstrapErrorBalloon
		 * @param target
		 * @param placement
		 * @param container
		 * @param message
		 */_showBalloon:function _showBalloon(target,placement,container,message){$(target).attr({'data-placement':placement,'data-container':container,'data-original-title':message, // FIXME animationをtrueにすると、show/hide/showを同期で繰り返した時に表示されない
// (shown.bs.tooltipイベントとか拾って制御する必要あり)
// 一旦animationをoffにしている
'data-animation':false}).tooltip({trigger:'manual'});$(target).tooltip('show');this._currentBalloonTarget=target;}}; // 他のメソッドやプロパティはErrorBalloonから流用
controller=$.extend({},h5.ui.validation.ErrorBalloon,controller);h5.core.expose(controller);})();(function(){ /**
	 * validate時にエラーがあった時、エラーメッセージを表示するプラグイン
	 * <p>
	 * messageプラグインには以下の設定項目があります。
	 * </p>
	 * <table><thead>
	 * <tr>
	 * <th>設定項目</th>
	 * <th>型</th>
	 * <th>説明</th>
	 * <th>デフォルト値</th>
	 * </tr>
	 * </thead><tbody>
	 * <tr>
	 * <th>appendMessage</th>
	 * <td>function</td>
	 * <td>メッセージ要素配置関数。メッセージ要素の配置を行う関数を指定します。第1引数にメッセージ要素(DOM)、第2引数にプロパティ名、第3引数にメッセージ追加対象要素が渡されます。指定しない場合は、メッセージ追加対象要素の後ろに追加します。</td>
	 * <td>なし</td>
	 * </tr>
	 * <tr>
	 * <th>wrapper</th>
	 * <td>string</td>
	 * <td>メッセージを出力する要素のタグ名またはタグ生成文字列。'li'や、'&lt;span
	 * class="error-msg"&gt;'のような指定ができ、指定された文字列から生成した要素が各メッセージ要素になります。</td>
	 * <td>なし(テキストノードとして表示)</td>
	 * </tr>
	 * </tbody></table>
	 * <p>
	 * プラグインの設定方法は、{@link h5.ui.FormController.setSetting}をご覧ください。
	 * </p>
	 *
	 * @class
	 * @name h5.ui.validation.Message
	 */var controller={__name:'h5.ui.validation.Message',_executedOnValidate:false,_messageElementMap:{},_messageOutputController:h5.ui.validation.MessageOutputController, /**
		 * プラグイン設定を行う
		 *
		 * @private
		 * @memberOf h5.ui.validation.Message
		 * @param {Object} setting messageプラグイン設定オブジェクト
		 */_setSetting:function _setSetting(setting){this._setting=setting;if(this.isInit){this._setChildSetting();}else { // 子コントローラの設定は子コントローラのコントローラ化が終わってから
this.initPromise.done(this.own(this._setChildSetting));}}, /**
		 * バリデート時に呼ばれる
		 * <p>
		 * バリデート結果からメッセージの表示・非表示を行う
		 * </p>
		 *
		 * @private
		 * @memberOf h5.ui.validation.Message
		 * @param {ValidationResult} result
		 */_onValidate:function _onValidate(result){this._executedOnValidate=true;var validProperties=result.validProperties;for(var i=0,l=validProperties.length;i<l;i++){var name=validProperties[i];this._setMessage(this.parentController._getElementByName(name),name,result);}}, /**
		 * 要素にフォーカスされた時に呼ばれる
		 * <p>
		 * バリデート結果からメッセージの表示・非表示を行う
		 * </p>
		 *
		 * @private
		 * @memberOf h5.ui.validation.Message
		 * @param element
		 * @param name
		 * @param {ValidationResult} validationResult
		 */_onFocus:function _onFocus(element,name,validationResult){this._setMessage(element,name,validationResult,'focus');}, /**
		 * 要素からフォーカスが外れた時に呼ばれる
		 * <p>
		 * バリデート結果からバルーンの表示・非表示を行う
		 * </p>
		 *
		 * @private
		 * @memberOf h5.ui.validation.Message
		 * @param element
		 * @param name
		 * @param {ValidationResult} validationResult
		 */_onBlur:function _onBlur(element,name,validationResult){this._setMessage(element,name,validationResult,'blur');}, // FIXME どのタイミングで実行するかは設定で決める？
//		_onChange: function(element, name, validationResult) {
//			this._setMessage(element, name, validationResult);
//		},
//		_onKeyup: function(element, name, validationResult) {
//			this._setMessage(element, name, validationResult);
//		},
//		_onClick: function(element, name, validationResult) {
//			this._setMessage(element, name, validationResult);
//		},
/**
		 * プラグインのリセット
		 * <p>
		 * 表示されているメッセージを削除します
		 * </p>
		 *
		 * @memberOf h5.ui.validation.Message
		 */reset:function reset(){for(var p in this._messageElementMap){var $target=this._messageElementMap[name];$target&&$target.remove();}this._executedOnValidate=false;},_setMessage:function _setMessage(element,name,validationResult,type){if(!this._executedOnValidate){ // _onValidateが１度も呼ばれていなければ何もしない
return;} // 共通設定とプロパティ毎の設定をマージ
var propSetting=$.extend({},this._setting,this._setting.property&&this._setting.property[name]);if(propSetting.off){ // off指定されていれば何もしない
return;}if(type==='blur'){ // blurの時はメッセージを非表示にして、終了
this._removeMessage(name);return;}if($.inArray(name,validationResult.validatingProperties)!==-1){ // まだvalidate結果が返ってきていない場合
// メッセージを削除
this._removeMessage(name);validationResult.addEventListener('validate',this.own(function(ev){if(ev.name===name&&!ev.isValid&&(type!=='focus'||document.activeElement===element)){ // nameの結果が返ってきた時にメッセージを表示
// focus時のvalidateなら、まだfocusが当たっているときだけ表示
this._setMessage(element,name,validationResult,type);}}));return;} // 既存のエラーメッセージを削除
this._removeMessage(name);var appendMessage=propSetting.appendMessage;var replaceElement=propSetting.replaceElement;var target=isFunction(replaceElement)?replaceElement(element):replaceElement||element;var $errorMsg=this._messageElementMap[name];if(!$errorMsg){ // TODO タグやクラスを設定できるようにする
$errorMsg=$('<span class="message">');this._messageElementMap[name]=$errorMsg;}$errorMsg.html(this._messageOutputController.getMessageByValidationResult(validationResult,name));if(appendMessage){appendMessage($errorMsg[0],target,name);}else if(target){ // elementの後ろに追加するのがデフォルト動作
// replaceElementで対象が変更されていればその後ろ
$(target).after($errorMsg);}},_removeMessage:function _removeMessage(name){this._messageElementMap[name]&&this._messageElementMap[name].remove();}, /**
		 * メッセージ出力コントローラの設定
		 *
		 * @private
		 * @memberOf h5.ui.validation.Message
		 */_setChildSetting:function _setChildSetting(){var setting=this._setting; // 各プロパティ毎のメッセージ設定をする
var property=setting.property;var messageSetting={};for(var p in property){messageSetting[p]={displayName:property[p].displayName||setting.displayName,message:property[p].message||setting.message,formatter:property[p].formatter||setting.formatter};}this._messageOutputController.addMessageSetting(messageSetting);}};h5.core.expose(controller);})();(function(){ /**
	 * 非同期validate中の項目にインジケータを出すプラグイン
	 * <p>
	 * プラグインの設定方法は、{@link h5.ui.FormController.setSetting}をご覧ください。
	 * </p>
	 *
	 * @class
	 * @name h5.ui.validation.AsyncIndicator
	 */var controller={__name:'h5.ui.validation.AsyncIndicator',_indicators:{}, /**
		 * プラグイン設定を行う
		 *
		 * @private
		 * @memberOf h5.ui.validation.AsyncIndicator
		 * @param {Object} setting asyncIndicatorプラグイン設定オブジェクト
		 */_setSetting:function _setSetting(setting){this._setting=setting;}, /**
		 * バリデート時に呼ばれる
		 * <p>
		 * 非同期バリデートがある場合、該当要素に対してインジケータを表示する
		 * </p>
		 *
		 * @private
		 * @memberOf h5.ui.validation.AsyncIndicator
		 * @param {ValidationResult}
		 */_onValidate:function _onValidate(result){var validatingProperties=result.validatingProperties;var properties=result.properties;for(var i=0,l=properties.length;i<l;i++){var name=properties[i];if($.inArray(name,validatingProperties)!==-1){var element=this.parentController._getElementByName(name);this._showIndicator(element,name,result);}else {this._hideIndicator(name);}}}, /**
		 * 要素にフォーカスされた時に呼ばれる
		 * <p>
		 * 非同期バリデートがある場合、該当要素に対してインジケータを表示する
		 * </p>
		 *
		 * @private
		 * @memberOf h5.ui.validation.AsyncIndicator
		 * @param element
		 * @param name
		 * @param {ValidationResult} validationResult
		 */_onFocus:function _onFocus(element,name,validationResult){var validatingProperties=validationResult.validatingProperties;if($.inArray(name,validatingProperties)!==-1){var element=this.parentController._getElementByName(name);this._showIndicator(element,name,validationResult);}else {this._hideIndicator(name);}}, //		_onBlur: function(element, name, validationResult) {
//			this._showIndicator(element, name, validationResult);
//		},
// FIXME どのタイミングで実行するかは設定で決める？
//		_onChange: function(element, name, validationResult) {
//			this._showIndicator(element, name, validationResult);
//		},
/**
		 * 要素でキーアップされた時に呼ばれる
		 * <p>
		 * 非同期バリデートがある場合、該当要素に対してインジケータを表示する
		 * </p>
		 *
		 * @private
		 * @memberOf h5.ui.validation.AsyncIndicator
		 * @param element
		 * @param name
		 * @param {ValidationResult} validationResult
		 */_onKeyup:function _onKeyup(element,name,validationResult){if($.inArray(name,validationResult.validatingProperties)!==-1){ // バリデート中ならインジケータ表示
this._showIndicator(element,name,validationResult);}}, //		_onClick: function(element, name, validationResult) {
//			this._setMessage(element, name, validationResult);
//		},
/**
		 * プラグインのリセット
		 * <p>
		 * 表示されているインジケータを削除します
		 * </p>
		 *
		 * @memberOf h5.ui.validation.AsyncIndicator
		 */reset:function reset(){for(var name in this._indicators){this._hideIndicator(name);}this._executedOnValidate=false;}, /**
		 * インジケータの表示
		 *
		 * @private
		 * @memberOf h5.ui.validation.AsyncIndicator
		 * @param {ValidationResult} validationResult
		 * @param name
		 */_showIndicator:function _showIndicator(element,name,validationResult){ // 共通設定とプロパティ毎の設定をマージ
var propSetting=$.extend({},this._setting,this._setting.property&&this._setting.property[name]);if(propSetting.off){ // off指定されていれば何もしない
return;}var replaceElement=propSetting.replaceElement;var target=isFunction(replaceElement)?replaceElement(element):replaceElement||element;if(!target){return;} // 既にある場合は再利用
this._indicators[name]=this._indicators[name]||h5.ui.indicator({target:target,block:false});this._indicators[name].show();validationResult.addEventListener('validate',this.own(function(ev){if(name===ev.name){this._hideIndicator(ev.name);}}));validationResult.addEventListener('abort',this.own(function(ev){this._hideIndicator(name);}));}, /**
		 * インジケータの非表示
		 *
		 * @private
		 * @memberOf h5.ui.validation.AsyncIndicator
		 * @param name
		 */_hideIndicator:function _hideIndicator(name){if(this._indicators[name]){this._indicators[name].hide();}}};h5.core.expose(controller);})();(function(){ // ログメッセージ
var FW_LOG_NOT_DEFINED_PLUGIN_NAME='プラグイン"{0}"は存在しません';var FW_LOG_ALREADY_ADDED='プラグイン"{0}"は登録済みです。'; // TODO formのvalidatorで不要な項目は要らない
var DATA_RULE_REQUIRED='required';var DATA_RULE_ASSERT_FALSE='assertFalse';var DATA_RULE_ASSERT_TRUE='assertTrue';var DATA_RULE_NULL='nul';var DATA_RULE_NOT_NULL='notNull';var DATA_RULE_MAX='max';var DATA_RULE_MIN='min';var DATA_RULE_FUTURE='future';var DATA_RULE_PAST='past';var DATA_RULE_PATTERN='pattern';var DATA_RULE_SIZE='size'; // フォームコントロールグループコンテナの名前指定
var DATA_INPUTGROUP_CONTAINER='h5-input-group-container'; // プラグインに通知するイベント
var PLUGIN_EVENT_VALIDATE='_onValidate';var PLUGIN_EVENT_FOCUS='_onFocus';var PLUGIN_EVENT_BLUR='_onBlur';var PLUGIN_EVENT_CHANGE='_onChange';var PLUGIN_EVENT_KEYUP='_onKeyup';var PLUGIN_EVENT_CLICK='_onClick'; // デフォルトで用意しているプラグイン名とプラグイン(コントローラ定義)のマップ
var DEFAULT_PLUGINS={style:h5.ui.validation.Style,composition:h5.ui.validation.Composition,balloon:h5.ui.validation.ErrorBalloon,bsBalloon:h5.ui.validation.BootstrapErrorBalloon,message:h5.ui.validation.Message,asyncIndicator:h5.ui.validation.AsyncIndicator}; // プラグインの表示リセットメui.validation.BootstrapErrorBalloonソッド名
var PLUGIN_METHOD_RESET='reset'; // デフォルトで用意しているvalidateルール生成関数
var defaultRuleCreators={requiredRuleCreator:function requiredRuleCreator(inputElement){if($(inputElement).data(DATA_RULE_REQUIRED)!=null){return true;}},assertFalseRuleCreator:function assertFalseRuleCreator(inputElement){if($(inputElement).data(DATA_RULE_ASSERT_FALSE)!=null){return true;}},assertTrueRuleCreator:function assertTrueRuleCreator(inputElement){if($(inputElement).data(DATA_RULE_ASSERT_TRUE)!=null){return true;}},nulRuleCreator:function nulRuleCreator(inputElement){if($(inputElement).data(DATA_RULE_NULL)!=null){return true;}},notNullRuleCreator:function notNullRuleCreator(inputElement){if($(inputElement).data(DATA_RULE_NOT_NULL)!=null){return true;}},maxRuleCreator:function maxRuleCreator(inputElement){var data=$(inputElement).data(DATA_RULE_MAX);if(data!=null){if(typeof data==='number'){return data;}if(isArray(data)){return [parseFloat(data[0]),$.trim(data[1])==='true'];}return parseFloat(data);}},minRuleCreator:function minRuleCreator(inputElement){var data=$(inputElement).data(DATA_RULE_MIN);if(data!=null){if(typeof data==='number'){return data;}if(isArray(data)){return [parseFloat(data[0]),$.trim(data[1])==='true'];}return parseFloat(data);}},futureRuleCreator:function futureRuleCreator(inputElement){var data=$(inputElement).data(DATA_RULE_FUTURE);if(data!=null){return new Date(data);}},pastRuleCreator:function pastRuleCreator(inputElement){var data=$(inputElement).data(DATA_RULE_PAST);if(data!=null){return new Date(data);}},digitsRuleCreator:function digitsRuleCreator(inputElement){var data=$(inputElement).data(DATA_RULE_PAST);if(data!=null){if(isArray(data)){for(var i=0,l=data.length;i<l;i++){data[i]=parseInt(data[i]);}return data;}return parseInt(data);}},patternRuleCreator:function patternRuleCreator(inputElement){var data=$(inputElement).data(DATA_RULE_PATTERN);if(data!=null){return new RegExp(data);}},sizeRuleCreator:function sizeRuleCreator(inputElement){var data=$(inputElement).data(DATA_RULE_SIZE);if(data!=null){if(isArray(data)){for(var i=0,l=data.length;i<l;i++){data[i]=parseInt(data[i]);}return data;}return parseInt(data);}}}; /**
	 * フォーム要素のバリデートを行うコントローラ
	 *
	 * @class
	 * @name h5.ui.FormController
	 */var controller={__name:'h5.ui.FormController',_config:{},_bindedForm:null,_ruleCreators:[],_plugins:[], /**
		 * フォームバリデーションロジック
		 *
		 * @private
		 * @memberOf h5.ui.FormController
		 */_validationLogic:h5.validation.FormValidationLogic, /**
		 * nameをキーに非同期バリデート結果を待つValidationResultを持つマップ
		 * <p>
		 * 待機中のバリデート結果を保持することで、同じプロパティに対して続けてバリデートが掛けられたときに待機中のものを中断して新しい結果を待つようにしている。
		 * </p>
		 *
		 * @memberOf h5.ui.FormController
		 * @private
		 */_waitingValidationResultMap:{}, /**
		 * 全体のvalidateを行ったときのvalidationResult
		 *
		 * @private
		 * @memberOf h5.ui.FormController
		 */_waitingAllValidationResult:null, /**
		 * フォームコントローラの設定
		 * <p>
		 * {@link h5.ui.FormController.setSetting}で設定した設定オブジェクト
		 * </p>
		 *
		 * @private
		 * @memberOf h5.ui.FormController
		 */_setting:{}, /**
		 * 各プラグインの設定
		 * <p>
		 * {@link h5.ui.FormController.setSetting}で設定した設定オブジェクトから、各プラグイン毎の設定を抜き出してプラグイン名でマップ化したもの
		 * </p>
		 * <p>
		 * プラグインを有効にする前に設定されたものも覚えて置き、有効化された時にそのプラグインの設定を使用する。
		 * </p>
		 *
		 * @private
		 * @memberOf h5.ui.FormController
		 */_pluginSetting:{}, /**
		 * フォームコントローラの設定を行う
		 * <p>
		 * 第1引数にフォームコントローラの設定及び各プラグインの設定を行うオブジェクトを指定します。
		 * </p>
		 * <p>
		 * 各プラグインの機能及びプラグイン名については、{@link h5.ui.FormController.addOutput}をご覧ください。
		 * </p>
		 * <p>
		 * 指定する設定オブジェクトには各プラグイン毎の設定と、各プロパティ毎の設定を記述します。
		 * </p>
		 * <p>
		 *
		 * <pre class="sh_javascript"><code>
		 * {
		 * 	output: { // 各プラグイン毎の設定
		 * 		balloon: { // キー名にプラグイン名
		 * 			placement: 'top' // 設定プロパティと値を記述
		 * 		},
		 * 		message: {...},
		 * 		...
		 * 	},
		 * 	property: { // 各プロパティ毎の設定
		 * 		name: { // キー名にプロパティ名
		 * 			displayName: '名前', // 設定プロパティと値を記述
		 * 			message: '必須です', // 設定プロパティと値を記述
		 * 			output: { // 各プロパティについて各プラグイン固有の設定
		 * 				balloon: {
		 * 					placement: 'left' // 設定プロパティと値を記述
		 * 				},
		 * 				message: {
		 * 					message: '登録には{displayName}が必要です'  // 設定プロパティと値を記述
		 * 				}
		 * 			}
		 * 		}
		 * 	}
		 * }
		 * </code></pre>
		 *
		 * <p>
		 * 設定プロパティは
		 * <ul>
		 * <li>フォームコントローラで使用するもの
		 * <li>各プラグインで使用するもの
		 * <ul>
		 * <li>プラグイン共通のもの
		 * <li>プラグイン固有のもの
		 * </ul>
		 * </ul>
		 * があります。
		 * </p>
		 * <h4>フォームコントローラで使用するもの</h4>
		 * <table class="params"><thead>
		 * <tr>
		 * <th>設定プロパティ名</th>
		 * <th>型</th>
		 * <th>説明</th>
		 * <th>デフォルト値</th>
		 * </tr>
		 * </thead><tbody>
		 * <tr>
		 * <th>isArray</th>
		 * <td>boolean</td>
		 * <td>あるプロパティについて、値を必ず配列で取ってくる場合はtrueを設定します。isArrayを指定しない場合、name属性値が同じフォーム入力要素が複数あると値が配列になったりならなかったりする場合があります。
		 * 例えば、name属性が同じcheckboxが複数チェックされている場合配列になりますが、1つしかチェックされていない場合は文字列になります。
		 * どんな場合でも必ず配列で取得したい場合は、isArrayにtrueを設定してください。</td>
		 * <td>false</td>
		 * </tr>
		 * <tr>
		 * <th>srcElement</th>
		 * <td>DOM|jQuery|string</td>
		 * <td>あるプロパティについて対応する要素を指定します。この指定はフォーム部品ではなくただのdiv等を入力要素としてvalueFuncで値を取ってくるような場合に、エラー出力プラグインが対応する要素を取得するために指定します。</td>
		 * <td>あるプロパティについて対応するフォーム入力部品要素</td>
		 * </tr>
		 * <tr>
		 * <th>valueFunc</th>
		 * <td>function</td>
		 * <td>あるプロパティについて値を取得する関数を指定します。この指定はフォーム部品ではなくただのdiv等を入力要素としたような場合に、値を取得するための関数を設定します。第1引数にはFormControllerのルートエレメント、第1引数にはプロパティ名が渡されます。値を返す関数を設定してください。</td>
		 * <td>なし</td>
		 * </tr>
		 * </tbody></table>
		 * <h4>全プラグイン共通</h4>
		 * <table class="params"><thead>
		 * <tr>
		 * <th>設定プロパティ名</th>
		 * <th>型</th>
		 * <th>説明</th>
		 * <th>デフォルト値</th>
		 * </tr>
		 * </thead><tbody>
		 * <tr>
		 * <th>off</th>
		 * <td>boolean</td>
		 * <td>プラグイン無効設定。無効にする場合はtrueを指定。</td>
		 * <td>false</td>
		 * </tr>
		 * </tbody></table>
		 * <h4>メッセージを表示するプラグイン(message, composition, balloonで共通)</h4>
		 * <table class="params"><thead>
		 * <tr>
		 * <th>設定プロパティ名</th>
		 * <th>型</th>
		 * <th>説明</th>
		 * <th>デフォルト値</th>
		 * </tr>
		 * </thead><tbody>
		 * <tr>
		 * <th>displayName</th>
		 * <td>string</td>
		 * <td>バリデーション対象のプロパティに対応する表示名</td>
		 * <td>バリデーション対象のプロパティ名。メッセージ生成パラメータ(後述)で使用されます。</td>
		 * </tr>
		 * <tr>
		 * <th>message</th>
		 * <td>string|function</td>
		 * <td>
		 * <p>
		 * バリデートエラー時に表示するメッセージ文字列。またはメッセージ生成関数。
		 * </p>
		 * <p>
		 * 文字列で指定する場合はプレースホルダの記述ができます。プレースホルダの場合に適用されるオブジェクト、
		 * 及び関数指定の場合に第1引数に渡されるパラメータ(メッセージ生成パラメータ)は共通で、以下の通りです。
		 * </p>
		 *
		 * <pre class="javascript_sh"><code>
		 * {
		 *     name: 'userid', // プロパティ名
		 *     value: 'ab',     // 値
		 *     displayName: 'ユーザーID', // 設定した表示名。未設定の場合はプロパティ名が入ります。
		 *     violation: [{
		 *       ruleName: 'min',
		 *       ruleValue: {value: 4, inclusive:true},
		 *       reason: (object)  //そのルールが非同期の場合。同期の場合は常にnull
		 *     }, ... ]
		 * }
		 * </code></pre>
		 *
		 * </td>
		 * <td>デフォルトルール毎にデフォルトのメッセージが用意されており、それらが使用されます。</td>
		 * </tr>
		 * </tbody></table>
		 * <h4>フォーム入力要素���準でエラー表示を行うプラグイン(style,message,balloon,asyncIndicatorで共通)</h4>
		 * <table class="params"><thead>
		 * <tr>
		 * <th>設定プロパティ名</th>
		 * <th>型</th>
		 * <th>説明</th>
		 * <th>デフォルト値</th>
		 * </tr>
		 * </thead><tbody>
		 * <tr>
		 * <th>replaceElement</th>
		 * <td>DOM|jQuery|string|function</td>
		 * <td>クラス適用対象要素をDOM,jQuery,セレクタの何れかで指定。関数を設定した場合は第1引数にデフォルトは各プロパティのフォーム部品要素が渡され、その関数が返す要素が対象要素になります。</td>
		 * <td>各プロパティのフォーム入力部品要素</td>
		 * </tr>
		 * </tbody></table>
		 * <p>
		 * 各プラグイン固有の設定項目については、各プラグインのJSDocを参照してください。
		 * </p>
		 * <ul>
		 * <li>{@link h5.ui.validation.Style}
		 * <li>{@link h5.ui.validation.AsyncIndicator}
		 * <li>{@link h5.ui.validation.Composition}
		 * <li>{@link h5.ui.validation.Message}
		 * <li>{@link h5.ui.validation.BootstrapErrorBalloon}
		 * <li>{@link h5.ui.validation.ErrorBalloon}
		 * <ul>
		 *
		 * @memberOf h5.ui.FormController
		 * @param {Object} setting 設定オブジェクト
		 */setSetting:function setSetting(setting){this._setting=setting; // 現在有効なプラグインの設定を取り出して設定する
var currentPlugins=this._plugins;for(var pluginName in currentPlugins){var plugin=currentPlugins[pluginName];plugin._setSetting&&plugin._setSetting(this._margePluginSettings(pluginName));}}, /**
		 * 設定オブジェクトから指定されたプラグインの設定だけ取り出す
		 *
		 * @private
		 * @param pluginName
		 */_margePluginSettings:function _margePluginSettings(pluginName){this._pluginSetting;var setting=this._setting;var outputSetting=setting.output;var propertySetting=setting.property;var pluginSetting=$.extend({},outputSetting&&outputSetting[pluginName]);pluginSetting.property={};for(var prop in propertySetting){var propSetting=$.extend({},propertySetting[prop]);$.extend(propSetting,propSetting[pluginName]);var propertyPluginOutput=h5.u.obj.getByPath('output.'+pluginName,propSetting);delete propSetting['output'];pluginSetting.property[prop]=$.extend({},propSetting,propertyPluginOutput);}return pluginSetting;}, /**
		 * @memberOf h5.ui.FormController
		 * @private
		 */__construct:function __construct(){ // デフォルトルールの追加
// TODO formのvalidatorで不要な項目は要らない
this._addRuleCreator(DATA_RULE_REQUIRED,defaultRuleCreators.requiredRuleCreator);this._addRuleCreator(DATA_RULE_ASSERT_FALSE,defaultRuleCreators.assertFalseRuleCreator);this._addRuleCreator(DATA_RULE_ASSERT_TRUE,defaultRuleCreators.assertTrueRuleCreator);this._addRuleCreator(DATA_RULE_NULL,defaultRuleCreators.nulRuleCreator);this._addRuleCreator(DATA_RULE_NOT_NULL,defaultRuleCreators.notNullRuleCreator);this._addRuleCreator(DATA_RULE_MAX,defaultRuleCreators.maxRuleCreator);this._addRuleCreator(DATA_RULE_MIN,defaultRuleCreators.minRuleCreator);this._addRuleCreator(DATA_RULE_FUTURE,defaultRuleCreators.futureRuleCreator);this._addRuleCreator(DATA_RULE_PAST,defaultRuleCreators.pastRuleCreator);this._addRuleCreator(DATA_RULE_PATTERN,defaultRuleCreators.patternRuleCreator);this._addRuleCreator(DATA_RULE_SIZE,defaultRuleCreators.sizeRuleCreator);}, /**
		 * @memberOf h5.ui.FormController
		 * @private
		 */__init:function __init(){ // form要素にバインドされていればそのformに属しているform関連要素を見る
// すなわち、ルートエレメント以下にあるinputでもform属性で別IDが指定されていたらそのinputは対象外
// また、ルートエレメント外にあるinputでも、form属性がルートエレメントのformを指定していれば対象とする
if(this.rootElement.tagName.toUpperCase()==='FORM'){this._bindedForm=this.rootElement; // HTML5のformによる標準のバリデーションは行わないようにする
$(this._bindedForm).prop('novalidate',true);} // フォーム部品からルールを生成
var $formControls=$(this._getElements());var validateRule={};$formControls.each(this.ownWithOrg(function(element){var name=element.getAttribute('name'); // 名前なしは何もしない
if(name==null){return;}var ruleOfProp={};validateRule[name]=ruleOfProp;for(var i=0,l=this._ruleCreators.length;i<l;i++){var key=this._ruleCreators[i].key;var func=this._ruleCreators[i].func;var ret=func(element);if(ret!==undefined){ruleOfProp[key]=ret;}}}));this.addRule(validateRule); // submitイベントを拾ってvalidateが行われるようにする
if(this._bindedForm){this.on(this._bindedForm,'submit',this._submitHandler);}}, /**
		 * プラグインの有効化
		 * <p>
		 * フォームのバリデート時にバリデート結果を出力するプラグインを有効にします。以下のようなプラグインが用意されています。
		 * </p>
		 * <table><thead>
		 * <tr>
		 * <th>プラグイン名</th>
		 * <th>説明</th>
		 * </tr>
		 * </thead><tbody>
		 * <tr>
		 * <td>composition</td>
		 * <td>フォーム全体バリデート時にバリデート失敗した項目全てについて指定した箇所にメッセージを出力する</td>
		 * </tr>
		 * <tr>
		 * <td>style</td>
		 * <td>バリデート時にバリデート結果によって要素にクラスを適用する</td>
		 * </tr>
		 * <tr>
		 * <td>message</td>
		 * <td>バリデート時にバリデート失敗した項目についてメッセージを表示する</td>
		 * </tr>
		 * <tr>
		 * <td>balloon</td>
		 * <td>バリデート時にバリデート失敗した項目についてバルーンメッセージを表示する</td>
		 * </tr>
		 * <tr>
		 * <td>bsBalloon</td>
		 * <td>バリデート時にバリデート失敗した項目についてブートストラップでバルーンメッセージを表示する(bootstrap依存)</td>
		 * </tr>
		 * <tr>
		 * <td>asyncIndicator</td>
		 * <td>非同期バリデート中の項目についてインジケータを表示する</td>
		 * </tr>
		 * </tbody></table>
		 *
		 * @memberOf h5.ui.FormController
		 * @param {string|string[]} pluginNames プラグイン名またはその配列
		 */addOutput:function addOutput(pluginNames){ // デフォルトの出力プラグイン追加
// __init前(rootElement決定前)ならルートエレメント決定後に実行
if(!this.isInit){this.initPromise.done(this.own(function(){this.addOutput(pluginNames);}));return;}pluginNames=$.isArray(pluginNames)?pluginNames:[pluginNames];for(var i=0,l=pluginNames.length;i<l;i++){var pluginName=pluginNames[i];var plugin=DEFAULT_PLUGINS[pluginName];if(!plugin){this.log.warn(FW_LOG_NOT_DEFINED_PLUGIN_NAME,pluginName);continue;}this._addOutputPlugin(pluginName,plugin);}}, /**
		 * ルールの追加
		 * <p>
		 * バリデートルールを追加する。第1引数にはルールオブジェクトを指定します。ルールオブジェクトについては{@link h5.validation.FormValidationLogic.addRule}と同じ形式で指定してください。
		 * </p>
		 *
		 * @memberOf h5.ui.FormController
		 * @param {Object} ruleObj ルールオブジェクト(オブジェクトの形式は{@link h5.validation.FormValidationLogic.addRule}参照)
		 */addRule:function addRule(ruleObj){this._validationLogic.addRule(ruleObj);}, /**
		 * ルールの削除
		 * <p>
		 * 第1引数に指定されたプロパティについてのバリデートルールを削除します
		 * </p>
		 *
		 * @memberOf h5.ui.FormController
		 * @param {string|string[]} name プロパティ名またはその配列
		 */removeRule:function removeRule(name){this._validationLogic.removeRule(name);this.validate(name);}, /**
		 * ルールの有効化
		 * <p>
		 * 第1引数に指定されたプロパティについてのバリデートを無効化します
		 * </p>
		 *
		 * @memberOf h5.ui.FormController
		 * @param {string|string[]} names プロパティ名またはその配列
		 */enableRule:function enableRule(names){this._validationLogic.enableRule(names);}, /**
		 * ルールの無効化
		 * <p>
		 * 第1引数に指定されたプロパティについてのバリデートを無効化します
		 * </p>
		 *
		 * @memberOf h5.ui.FormController
		 * @param {string|string[]} names プロパティ名またはその配列
		 */disableRule:function disableRule(names){this._validationLogic.disableRule(names);}, /**
		 * このコントローラが管理するフォーム内のフォーム部品の値を集約したオブジェクトを生成する
		 * <p>
		 * フォーム部品を集約し、各部品の名前(name属性値)をキーに、その値を持つオブジェクトを返します。
		 * </p>
		 * <p>
		 * 第1引数を省略した場合、このコントローラのバインド対象のフォーム内全てのフォーム部品を集約対象とします。
		 * </p>
		 * <p>
		 * 第1引数にtargetNamesを指定した場合、指定した名前に当てはまるフォーム部品だけが集約対象になります。
		 * </p>
		 * <p>
		 * 例えばname属性が"userid"のinputがあり、その値が"0001"である場合は、{userid: "0001"}のようなオブジェクトを返します。
		 * </p>
		 * <p>
		 * また、グループ指定された要素の集約をすることができます。
		 * </p>
		 * <p>
		 * グループとは、以下のように指定することができます
		 * </p>
		 *
		 * <pre class="sh_html"><code>
		 * &lt;!-- data-h5-input-group-containerにグループ名を指定。子要素がそのグループになる。 --&gt;
		 * lt;div data-h5-input-group-container=&quot;birthday&quot;&gt;
		 * 		&lt;displayName class=&quot;control-displayName&quot;&gt;生年月日&lt;/displayName&gt;
		 * 		&lt;input name=&quot;year&quot; type=&quot;text&quot; placeholder=&quot;年&quot;&gt;
		 * 		&lt;input name=&quot;month&quot; type=&quot;text&quot; placeholder=&quot;月&quot;&gt;
		 * 		&lt;input name=&quot;day&quot; type=&quot;text&quot; placeholder=&quot;日&quot;&gt;
		 * 		&lt;/div&gt;
		 * </code></pre>
		 *
		 * <p>
		 * 上記のような指定のされた要素は、グループ名をキーにグループに属する要素を集約したオブジェクトとして集約します。戻り値は以下のようになります。
		 * </p>
		 *
		 * <pre class="sh_javascript"><code>
		 * {
		 * 	birthday: {
		 * 		year: &quot;1999&quot;,
		 * 		month: &quot;1&quot;,
		 * 		month: &quot;2&quot;
		 * 	},
		 * 	zipcode: {
		 * 		zip1: &quot;220&quot;,
		 * 		zip2: &quot;0012&quot;
		 * 	}
		 * }
		 * </code></pre>
		 *
		 * @memberOf h5.ui.FormController
		 * @param {string|string[]} names 指定した場合、指定したnameのものだけを集約
		 * @returns {Object} フォーム部品集約オブジェクト
		 */getValue:function getValue(names){names=names&&(!isArray(names)?[names]:names);var $elements=$(this._getElements());var $groups=$(this._getInputGroupElements());var propertySetting=this._setting&&this._setting.property||{};var ret={};var elementNames=[];var rootElement=this.rootElement;$elements.each(function(){var name=this.name;elementNames.push(name);var currentGroup=ret; // グループに属していればグループ名を取得
if($groups.find(this).length){var $group=$(this).closest('[data-'+DATA_INPUTGROUP_CONTAINER+']');var groupName=$group.data(DATA_INPUTGROUP_CONTAINER);}if(groupName){elementNames.push(groupName); // グループコンテナに属するエレメントの場合
if(names&&$.inArray(name,names)===-1&&$.inArray(groupName,names)===-1){ // nameもgroupNameもnamesに入っていなければ集約対象外
return;} // グループ単位でオブジェクトを作る
ret[groupName]=ret[groupName]||{};currentGroup=ret[groupName];}else if(names&&$.inArray(name,names)===-1){ // グループに属さないエレメントの場合
// namesに含まれないnameのエレメントは集約対象外
return;}if(this.type==='file'){ // ファイルオブジェクトを覚えておく
var files=this.files;var filesLength=files.length;if(!filesLength){return;}currentGroup[name]=currentGroup[name]||[];for(var i=0;i<filesLength;i++){currentGroup[name].push(files[i]);}return;}if(!name||(this.type==='radio'||this.type==='checkbox')&&this.checked===false){return;}var valueFunc=propertySetting[name]&&propertySetting[name].valueFunc;var value=valueFunc?valueFunc(rootElement,name):$(this).val();if(valueFunc&&value===undefined||value==null){ // valueFuncがundefinedを返した場合またはvalueがnullだった場合はそのプロパティは含めない
return;}if(propertySetting[name]&&!!propertySetting[name].isArray){ // isArray:trueが指定されていたら必ず配列
value=wrapInArray(value);}if(currentGroup[name]!==undefined){if(!$.isArray(currentGroup[name])){currentGroup[name]=[currentGroup[name]];}if($.isArray(value)){ // select multipleの場合は値は配列
Array.prototype.push.apply(currentGroup[name],value);}else {currentGroup[name].push(value);}}else {currentGroup[name]=value;}}); // セッティングに記述されているがinput要素の集約で集められないプロパティを追加
var otherProperties=[];for(var p in propertySetting){if((!names||$.inArray(p,names)!==-1)&&$.inArray(p,elementNames)===-1){var valueFunc=propertySetting[p]&&propertySetting[p].valueFunc;var val=valueFunc&&valueFunc(rootElement,p);if(val!==undefined){ret[p]=val;}}}return ret;}, /**
		 * このコントローラが管理するフォームに対して、値を集約したオブジェクトから値をセットする
		 * <p>
		 * 各フォーム部品の名前と値を集約したオブジェクトを引数に取り、その値を各フォーム部品にセットします。
		 * </p>
		 *
		 * @memberOf h5.ui.FormController
		 * @param {Object} obj フォーム部品の値を集約したオブジェクト
		 */setValue:function setValue(obj){var $elements=$(this._getElements());var indexMap={}; // グループ指定でプロパティが入れ子であるオブジェクトの場合、展開する
var flatObj={};for(var p in obj){if($.isPlainObject(obj[p])){for(var prop in obj[p]){flatObj[prop]=obj[p][prop];}}else {flatObj[p]=obj[p];}}obj=flatObj;$elements.each(function(){var name=this.name;if(!name){return;}var value=obj[name]; // radio, checkboxの場合
if(this.type==='radio'||this.type==='checkbox'){if($.isArray(value)){indexMap[name]=indexMap[name]?indexMap[name]+1:0;value=value[indexMap[name]];} // 値が一致するならチェック
$(this).prop('checked',$(this).val()===value);return;} // select multipleの場合
if($(this).is('select[multiple]')){$(this).val([]);if($.isArray(value)){indexMap[name]=indexMap[name]||0;value=value.slice(indexMap[name]);}if(value==null){return;}var arrayValue=[];for(var i=0,l=value.length;i<l;i++){arrayValue.push(value[i]);$(this).val(arrayValue);indexMap[name]++;var after=$(this).val();after=$.isArray(after)?after:[after];if(after.length<arrayValue.length){indexMap[name]--;break;}}return;} // その他
if($.isArray(value)){indexMap[name]=indexMap[name]||0;value=value[indexMap[name]++];}$(this).val(value);});}, /**
		 * フォーム部品の値をすべてクリアする
		 *
		 * @memberOf h5.ui.FormController
		 */clearValue:function clearValue(){$(this._getElements()).each(function(){if(this.type==='radio'||this.type==='checkbox'){$(this).prop('checked',false);return;}$(this).val(null);});}, /**
		 * フォーム部品の値をすべてリセットする
		 *
		 * @memberOf h5.ui.FromController
		 */resetValue:function resetValue(){if(this._bindedForm){this._bindedForm.reset();}}, /**
		 * 各プラグインが出力しているバリデート結果表示をすべてリセットする
		 *
		 * @memberOf h5.ui.FormController
		 */resetValidation:function resetValidation(){ //			this._waitingAllValidationResult && this._waitingAllValidationResult.abort();
//			for ( var p in this._waitingValidationResultMap) {
//				this._waitingValidationResultMap[p].abort();
//			}
this._waitingValidationResultMap={};var plugins=this._plugins;for(var pluginName in plugins){this._resetPlugin(pluginName,plugins[pluginName]);}}, /**
		 * フォームに入力された値のバリデートを行う
		 * <p>
		 * 第1引数にプロパティ名またはその配列を指定した場合、指定されたプロパティ名のみをバリデート対象にします。省略した場合は全てが対象になります。
		 * </p>
		 *
		 * @memberOf h5.ui.FormController
		 * @param {string|string[]} names バリデート対象のプロパティ名またはプロパティ名の配列
		 * @returns {ValidationResult}
		 */validate:function validate(names){ // バリデート実行
var result=this._validate(names); // _onValidateの呼び出し
this._callPluginValidateEvent(PLUGIN_EVENT_VALIDATE,result);return result;}, /**
		 * プラグイン名からプラグインインスタンスを取得
		 *
		 * @memberOf h5.ui.FormController
		 * @param {string} pluginName プラグイン名
		 * @returns {Controller}
		 */getOutput:function getOutput(pluginName){return this._plugins[pluginName];}, /*
		 * フォーム部品でのイベント発生時にプラグインを呼び出すイベントハンドラ設定
		 */'{rootElement} focusin':function rootElementFocusin(ctx){this._pluginElementEventHandler(ctx,PLUGIN_EVENT_FOCUS);},'{rootElement} focusout':function rootElementFocusout(ctx){this._pluginElementEventHandler(ctx,PLUGIN_EVENT_BLUR);},'{rootElement} keyup':function rootElementKeyup(ctx){this._pluginElementEventHandler(ctx,PLUGIN_EVENT_KEYUP);},'{rootElement} change':function rootElementChange(ctx){this._pluginElementEventHandler(ctx,PLUGIN_EVENT_CHANGE);},'{rootElement} click':function rootElementClick(ctx){this._pluginElementEventHandler(ctx,PLUGIN_EVENT_CLICK);}, /**
		 * このコントローラが管理するフォームに属するフォーム部品またはフォーム部品グループ要素の中で指定した名前に一致する要素を取得
		 *
		 * @private
		 * @memberOf h5.ui.FormController
		 * @param {string} name
		 * @returns {DOM}
		 */_getElementByName:function _getElementByName(name){ // このメソッドはプラグインがvalidate結果から対応するエレメントを探す時に呼び出される
var srcElement=this._setting.property&&this._setting.property[name]&&this._setting.property[name].srcElement;if(srcElement){return srcElement;}var $formCtrls=$(this._getElements());var element=$formCtrls.filter('[name="'+name+'"]')[0];if(element){return element;}var groupContainer=$(this._getInputGroupElements()).filter('[data-'+DATA_INPUTGROUP_CONTAINER+'="'+name+'"]')[0];if(groupContainer){return groupContainer;}return null;}, /**
		 * このコントローラが管理するフォームに属するフォーム部品全てを取得
		 *
		 * @private
		 * @memberOf h5.ui.FormController
		 * @returns {DOM[]}
		 */_getElements:function _getElements(){var $innerFormControls=this.$find('input,select,textarea').not('[type="submit"],[type="reset"],[type="image"]');if(!this._bindedForm){return $innerFormControls;}var formId=$(this._bindedForm).attr('id'); // ブラウザがform属性に対応しているかどうかに関わらず、
// HTML5の仕様に従ってformに属するフォームコントロール部品を列挙する
var $formControls=$('input,select,textarea').not('[type="submit"],[type="reset"],[type="image"]');return $formControls.filter(function(){var $this=$(this);var formAttr=$this.attr('form'); // form属性がこのコントローラのフォームを指している
// または、このコントローラのフォーム内の要素でかつform属性指定無し
return formAttr&&formAttr===formId||!formAttr&&$innerFormControls.index($this)!==-1;}).toArray();}, /**
		 * このコントローラが管理するフォームに属するグループコンテナ要素(data-group-containerが指定されている要素)を取得
		 *
		 * @private
		 * @memberOf h5.ui.FormController
		 * @returns {DOM[]}
		 */_getInputGroupElements:function _getInputGroupElements(){var $allGroups=$('[data-'+DATA_INPUTGROUP_CONTAINER+']');return this.$find('[data-'+DATA_INPUTGROUP_CONTAINER+']').filter(function(){var $this=$(this);var formAttr=$this.attr('form'); // form属性がこのコントローラのフォームを指している
// または、このコントローラのフォーム内の要素でかつform属性指定無し
return formAttr&&formAttr===formId||!formAttr&&$allGroups.index($this)!==-1;}).toArray();}, /**
		 * バリデートルール生成関数の登録
		 *
		 * @private
		 * @memberOf h5.ui.FormController
		 * @param key
		 * @param func
		 */_addRuleCreator:function _addRuleCreator(key,func){this._ruleCreators.push({key:key,func:func});}, /**
		 * プラグインのリセット
		 *
		 * @private
		 * @memberOf h5.ui.FormController
		 * @param {string} pluginName
		 * @param {Controller} plugins
		 */_resetPlugin:function _resetPlugin(pluginName,plugin){if(!plugin[PLUGIN_METHOD_RESET]){return;}plugin[PLUGIN_METHOD_RESET].call(plugin);}, /**
		 * プラグインの追加(1.2.0では非公開)
		 *
		 * @private
		 * @memberOf h5.ui.FormController
		 * @param pluginName
		 * @param controller
		 */_addOutputPlugin:function _addOutputPlugin(pluginName,controller){if(this._plugins[pluginName]){this.log.warn(FW_LOG_ALREADY_ADDED,pluginName);return;}var c=h5.core.controller(this._bindedForm||this.rootElement,controller);c._setSetting&&c._setSetting(this._margePluginSettings(pluginName));this.manageChild(c);this._plugins[pluginName]=c;}, /**
		 * フォームのバリデートを行う
		 *
		 * @private
		 * @memberOf h5.ui.FormController
		 * @param names
		 * @returns {ValidationResult}
		 */_validate:function _validate(names){var formData=this.getValue(names); // 待機中のValidationResultをabortする処理
// 指定されたnamesに該当するValidationResultをabortで中断する
//			if (names) {
//				names = $.isArray(names) ? names : [names];
//				for (var i = 0, l = names.length; i < l; i++) {
//					// 現在のプロパティ毎の非同期バリデート待ちのValidationResultは全て中断
//					var name = names[i];
//					var r = this._waitingValidationResultMap[name];
//					if (!r) {
//						continue;
//					}
//					r.abort();
//					delete this._waitingValidationResultMap[name];
//				}
//			} else {
//				// namesが指定されていない場合は全てのプロパティが対象
//				for ( var p in this._waitingValidationResultMap) {
//					this._waitingValidationResultMap[p].abort();
//				}
//				this._waitingValidationResultMap = {};
//			}
var result=this._validationLogic.validate(formData,names); // TODO 動作確認としてログ出力
this.log.debug('-----------------------------------------');this.log.debug('・validateするデータ');this.log.debug(formData);this.log.debug('・validate対象のプロパティ:'+names);this.log.debug('・validate結果');this.log.debug(result);this.log.debug(result.isAsync?'非同期':'同期');this.log.debug('-----------------------------------------');if(result.isAsync){var properties=result.validatingProperties;for(var i=0,l=properties.length;i<l;i++){var p=properties[i];this._waitingValidationResultMap[p]=result;}result.addEventListener('validate',this.own(function(ev){delete this._waitingValidationResultMap[ev.name];}));}return result;}, /**
		 * @private
		 * @memberOf h5.ui.FormController
		 */_createPluginElementEventArgs:function _createPluginElementEventArgs(element,validationResult){var name=element.name;}, /**
		 * @private
		 * @memberOf h5.ui.FormController
		 */_pluginElementEventHandler:function _pluginElementEventHandler(ctx,eventType){var target=ctx.event.target;if(!this._isFormControls(target)){return;}var name=target.name;if(!name){ // name無しの要素は対象外
return;} // グループに属していればそのグループに対してvalidate
// タグにグループの指定が無くグループコンテナに属している場合
var groupName;var $groups=$(this._getInputGroupElements());if($groups.find(target).length){var $group=$(target).closest('[data-'+DATA_INPUTGROUP_CONTAINER+']');groupName=$group.data(DATA_INPUTGROUP_CONTAINER);}var validateTargetName=groupName||name;var validationResult=this._validate(validateTargetName);this._callPluginElementEvent(eventType,target,name,validationResult);if(groupName){ // グループがあればグループについてのバリデート結果も通知
var groupTarget=this._getElementByName(groupName);this._callPluginElementEvent(eventType,groupTarget,groupName,validationResult);}}, /**
		 * プラグインのvalidateイベントの呼び出し
		 *
		 * @private
		 * @memberOf h5.ui.FormController
		 */_callPluginValidateEvent:function _callPluginValidateEvent(type,result){var plugins=this._plugins;for(var pluginName in plugins){var plugin=plugins[pluginName];if(plugin[type]){plugin[type].call(plugin,result);}}}, /**
		 * プラグインのフォームコントロール要素についてのイベント呼び出し
		 *
		 * @private
		 * @memberOf h5.ui.FormController
		 */_callPluginElementEvent:function _callPluginElementEvent(eventType,element,name,validationResult){var plugins=this._plugins;for(var pluginName in plugins){var plugin=plugins[pluginName];if(plugin[eventType]){plugin[eventType](element,name,validationResult);}}}, /**
		 * @private
		 * @memberOf h5.ui.FormController
		 */_submitHandler:function _submitHandler(ctx,$el){ctx.event.preventDefault();var validationResult=this.validate();if(validationResult.isAsync){validationResult.addEventListener('validateComplete',function(){if(this.isAllValid){ // 送信
$el[0].submit();}});return;}if(validationResult.isAllValid){ // 送信
$el[0].submit();}}, /**
		 * @private
		 * @memberOf h5.ui.FormController
		 */_isFormControls:function _isFormControls(element){var $formControls=$(this._getElements());return $formControls.index(element)!==-1;}};h5.core.expose(controller);})(); /* ------ h5.api.geo ------ */(function(){ // =========================================================================
//
// Constants
//
// =========================================================================
// =============================
// Production
// =============================
/** エラコード: 指定された緯度または経度の値が不正 */var ERR_CODE_INVALID_COORDS=2000; /** エラーコード: getDistance()で、指定された計算モードの定数が不正 */var ERR_CODE_INVALID_GEOSYSTEM_CONSTANT=2001; /** エラーコード: 位置情報の取得に失敗 */var ERR_CODE_POSITIONING_FAILURE=2002; // =============================
// Development Only
// =============================
/* del begin */var errMsgMap={};errMsgMap[ERR_CODE_INVALID_COORDS]='正しい緯度または経度を指定して下さい。';errMsgMap[ERR_CODE_INVALID_GEOSYSTEM_CONSTANT]='正しい計算モード定数を指定して下さい';errMsgMap[ERR_CODE_POSITIONING_FAILURE]='位置情報の取得に失敗しました。';addFwErrorCodeMap(errMsgMap); /* del end */ // =========================================================================
//
// Cache
//
// =========================================================================
// navigator.geolocationをキャッシュする変数
var geo=null;function getGeo(){if(!geo){geo=navigator.geolocation;}return geo;}var h5ua=h5.env.ua; // =========================================================================
//
// Privates
//
// =========================================================================
// =============================
// Variables
// =============================
// =============================
// Functions
// =============================
// =========================================================================
//
// Body
//
// =========================================================================
/**
	 * h5.api.geo.getDistance() の計算モードを指定するための定数クラス
	 * <p>
	 * このオブジェクトは自分でnewすることはありません。以下のオブジェクトにアクセスするとインスタンスが返されます。
	 * </p>
	 * <ul>
	 * <li>h5.api.geo.GS_GRS80</li>
	 * <li>h5.api.geo.GS_BESSEL</li>
	 * </ul>
	 *
	 * @class
	 * @name GeodeticSystemEnum
	 */function GeodeticSystemEnum(oblateness,semiMajorAxis){ // 扁平率
this.oblateness=oblateness; // 長(赤道)半径
this.semiMajorAxis=semiMajorAxis;} /**
	 * 扁平率を取得します。
	 *
	 * @memberOf GeodeticSystemEnum
	 * @name getOblateness
	 * @returns {Number} 扁平率
	 */GeodeticSystemEnum.prototype.getOblateness=function(){return this.oblateness;}; /**
	 * 長(赤道)半径を取得します。
	 *
	 * @memberOf GeodeticSystemEnum
	 * @name getSemiMajorAxis
	 * @returns {Number} 長(赤道)半径
	 */GeodeticSystemEnum.prototype.getSemiMajorAxis=function(){return this.semiMajorAxis;}; /** 計算モード: 世界測地系(GRS80) */var GRS80=new GeodeticSystemEnum(298.257222,6378137); /** 計算モード: 日本測地系(BESSEL) */var BESSEL=new GeodeticSystemEnum(299.152813,6377397.155); /** ラジアン毎秒 - 1度毎秒 */var DEGREES_PER_SECOND=Math.PI/180; /**
	 * Geolocation API
	 *
	 * @memberOf h5.api
	 * @name geo
	 * @namespace
	 */function Geolocation(){ // 空コンストラクタ
}$.extend(Geolocation.prototype,{ /**
		 * Geolocation APIが使用可能であるかの判定結果<br>
		 *
		 * @type Boolean
		 * @memberOf h5.api.geo
		 * @name isSupported
		 */ // IE9の場合、navigator.geolocationにアクセスするとメモリーリークするのでエージェントで利用可能か判定する
isSupported:h5ua.isIE&&h5ua.browserVersion>=9?true:!!getGeo(), /**
		 * 現在地の緯度・経度を取得します。
		 *
		 * @memberOf h5.api.geo
		 * @name getCurrentPosition
		 * @function
		 * @param {Object} [option] 設定情報
		 * @param {Boolean} [option.enableHighAccuracy] 正確な位置を取得するか (ただし消費電力の増加や応答が遅延する)
		 * @param {Number} [option.timeout] 位置情報を取得するまで待機する時間 (ミリ秒)
		 * @param {Number} [option.maximumAge] キャッシュされた位置情報の有効期間を指定する (ミリ秒)
		 * @returns {Promise} Promiseオブジェクト
		 */getCurrentPosition:function getCurrentPosition(option){var dfd=h5.async.deferred();getGeo().getCurrentPosition(function(geoPosition){dfd.resolve(geoPosition);},function(e){dfd.reject(createRejectReason(ERR_CODE_POSITIONING_FAILURE,null,e));},option);return dfd.promise();}, /**
		 * 現在地の緯度・経度を定期的に送信します。
		 * <p>
		 * このメソッドは定期的に位置情報を取得するため、Deferred.progress()で値を取得します。<br>
		 * (Deferred.done()では値を取得できません。)
		 * <p>
		 * <b>実装例</b><br>
		 *
		 * <pre>
		 * h5.api.geo.watchPosition().progress(function(pos) {
		 * // 変数 pos に位置情報が格納されている。
		 * 		});
		 * </pre>
		 *
		 * @memberOf h5.api.geo
		 * @name watchPosition
		 * @function
		 * @param {Object} [option] 設定情報
		 * @param {Boolean} [option.enableHighAccuracy] 正確な位置を取得するか (ただし消費電力の増加や応答が遅延する)
		 * @param {Number} [option.timeout] 位置情報を取得するまで待機する時間 (ミリ秒)
		 * @param {Number} [option.maximumAge] キャッシュされた位置情報の有効期間を指定する (ミリ秒)
		 * @returns {WatchPositionPromise} WatchPositionPromiseオブジェクト
		 */watchPosition:function watchPosition(option){var dfd=h5.async.deferred();var id=getGeo().watchPosition(function(pos){dfd.notify(pos);},function(e){getGeo().clearWatch(id);dfd.reject(createRejectReason(ERR_CODE_POSITIONING_FAILURE,null,e));},option); /**
			 * h5.api.geo.watchPositionがこのオブジェクトをプロミス化して返します。
			 * <p>
			 * このオブジェクトは自分でnewすることはありません。<b>h5.api.geo.watchPosition</b>関数を呼び出すとインスタンスが返されます。
			 * </p>
			 *
			 * @class
			 * @name WatchPositionPromise
			 */function WatchPositionPromise(){} // 空コンストラクタ
/**
			 * h5.api.geo.watchPositionで行っているユーザの位置監視を終了します。
			 * <p>
			 * ユーザの位置監視を終了し、Deferred.done()が実行されます。
			 * </p>
			 *
			 * @memberOf WatchPositionPromise
			 * @name unwatch
			 */WatchPositionPromise.prototype.unwatch=function(){getGeo().clearWatch(id);dfd.resolve();};return dfd.promise(new WatchPositionPromise());}, /**
		 * ヒュベニの法則を使用して、2点間の緯度・経度から直線距離(m)を取得します。
		 * <p>
		 * 定数に使用している長半径・扁平率は国土地理院で紹介されている値を使用。
		 * <p>
		 * 注意:アルゴリズム上、長距離(100km以上)の地点を図る場合1m以上の誤差が出てしまいます。
		 * <h4>計算モードの指定方法</h4>
		 * 計算モードの指定は以下の定数クラスを使用します。<br>
		 * <table border="1">
		 * <tr>
		 * <td>h5.api.geo.GS_GRS80</td>
		 * <td>世界測地系</td>
		 * </tr>
		 * <tr>
		 * <td>h5.api.geo.GS_BESSEL</td>
		 * <td>日本測地系</td>
		 * </tr>
		 * </table>
		 *
		 * @memberOf h5.api.geo
		 * @name getDistance
		 * @function
		 * @param {Number} lat1 地点1の緯度
		 * @param {Number} lng1 地点1の経度
		 * @param {Number} lat2 地点2の緯度
		 * @param {Number} lng2 地点2の経度
		 * @param {GeodeticSystemEnum} [geoSystem] 計算モード定数
		 *            (h5.api.geo.GS_GRS80:世界測地系(未指定の場合このモードで計算する) / h5.api.geo.GS_BESSEL: 日本測地系)
		 * @returns {Number} 2点間の直線距離
		 */ // TODO 長距離の場合も考えて、距離によって誤差が大きくならない『測地線航海算法』で計算するメソッドの追加も要検討
getDistance:function getDistance(lat1,lng1,lat2,lng2,geoSystem){if(!isFinite(lat1)||!isFinite(lng1)||!isFinite(lat2)||!isFinite(lng2)){throwFwError(ERR_CODE_INVALID_COORDS);}var geodeticMode=geoSystem?geoSystem:GRS80;if(!(geodeticMode instanceof GeodeticSystemEnum)){throwFwError(ERR_CODE_INVALID_GEOSYSTEM_CONSTANT);} // 長半径(赤道半径)
var A=geodeticMode.getSemiMajorAxis(); // 扁平率
var O=geodeticMode.getOblateness(); // 起点の緯度のラジアン
var latRad1=lat1*DEGREES_PER_SECOND; // 起点の経度のラジアン
var lngRad1=lng1*DEGREES_PER_SECOND; // 終点の緯度のラジアン
var latRad2=lat2*DEGREES_PER_SECOND; // 終点の経度のラジアン
var lngRad2=lng2*DEGREES_PER_SECOND; // 2点の平均緯度
var avgLat=(latRad1+latRad2)/2; // 第一離心率
var e=Math.sqrt(2*O-1)/O;var e2=Math.pow(e,2);var W=Math.sqrt(1-e2*Math.pow(Math.sin(avgLat),2)); // 短半径(極半径)
var semiminorAxis=A*(1-e2); // 子午線曲率半径
var M=semiminorAxis/Math.pow(W,3); // 卯酉船曲率半径
var N=A/W; // 2点の緯度差
var deltaLat=latRad1-latRad2; // 2点の経度差
var deltaLon=lngRad1-lngRad2;return Math.sqrt(Math.pow(M*deltaLat,2)+Math.pow(N*Math.cos(avgLat)*deltaLon,2));}, /**
		 * getDistanceメソッドで使用する計算モード定数 (世界測地系:GRS80)
		 *
		 * @constant
		 * @memberOf h5.api.geo
		 * @name GS_GRS80
		 */GS_GRS80:GRS80, /**
		 * getDistanceメソッドで使用する計算モード定数 (日本測地系:BESSEL)
		 *
		 * @constant
		 * @memberOf h5.api.geo
		 * @name GS_BESSEL
		 */GS_BESSEL:BESSEL}); // =============================
// Expose to window
// =============================
h5.u.obj.expose('h5.api',{geo:new Geolocation()});})(); /* ------ h5.api.sqldb ------ */(function(){ // =========================================================================
//
// Constants
//
// =========================================================================
// =============================
// Production
// =============================
/** INSERT フォーマット */var INSERT_SQL_FORMAT='INSERT INTO {0} ({1}) VALUES ({2})'; /** INSERT フォーマット(VALUES未指定) */var INSERT_SQL_EMPTY_VALUES='INSERT INTO {0} DEFAULT VALUES'; /** SELECT フォーマット */var SELECT_SQL_FORMAT='SELECT {0} FROM {1}'; /** UPDATE フォーマット */var UPDATE_SQL_FORMAT='UPDATE {0} SET {1}'; /** DELETE フォーマット */var DELETE_SQL_FORMAT='DELETE FROM {0}'; /** エラーコード: Insert/Sql/Del/Update/Select オブジェクトのexecute()が複数回実行された */var ERR_CODE_RETRY_SQL=3000; /** エラーコード: 指定されたテーブル名が不正 */var ERR_CODE_INVALID_TABLE_NAME=3001; /** エラーコード: 指定されたトランザクションの型が不正 */var ERR_CODE_INVALID_TRANSACTION_TYPE=3002; /** エラーコード: where句に指定されたオペレータ文字列が不正 */var ERR_CODE_INVALID_OPERATOR=3003; /** エラーコード: 引数で指定された型が不正 */var ERR_CODE_INVALID_PARAM_TYPE=3004; /** エラーコード: 指定した取得カラム名が不正 */var ERR_CODE_INVALID_COLUMN_NAME=3005; /** エラーコード: 指定したパラメータが不正 */var ERR_CODE_INVALID_VALUES=3006; /** エラーコード: SQLのステートメントが不正 */var ERR_CODE_INVALID_STATEMENT=3007; /** エラーコード: パラメータに指定したオブジェクトの型が不正 */var ERR_CODE_TYPE_NOT_ARRAY=3008; /** エラーコード: transaction.add()に指定したオブジェクトの型が不正 */var ERR_CODE_INVALID_TRANSACTION_TARGET=3009; /** エラーコード: トランザクション処理失敗 */var ERR_CODE_TRANSACTION_PROCESSING_FAILURE=3010; /** エラーコード: where句に指定されたカラム名が不正 */var ERR_CODE_INVALID_COLUMN_NAME_IN_WHERE=3011; // =============================
// Development Only
// =============================
var fwLogger=h5.log.createLogger('h5.api.sqldb'); /* del begin */var errMsgMap={};errMsgMap[ERR_CODE_RETRY_SQL]='同一オブジェクトによるSQLの再実行はできません。';errMsgMap[ERR_CODE_INVALID_TABLE_NAME]='{0}: テーブル名を指定して下さい。';errMsgMap[ERR_CODE_INVALID_TRANSACTION_TYPE]='{0}: トランザクションが不正です。';errMsgMap[ERR_CODE_INVALID_OPERATOR]='オペレータが不正です。 <= < >= > = != like のいずれかを使用して下さい。';errMsgMap[ERR_CODE_INVALID_PARAM_TYPE]='{0}: {1}に指定したオブジェクトの型が不正です。';errMsgMap[ERR_CODE_INVALID_COLUMN_NAME]='{0}: カラム名を指定して下さい。';errMsgMap[ERR_CODE_INVALID_VALUES]='{0}: 値を指定して下さい。';errMsgMap[ERR_CODE_INVALID_STATEMENT]='{0}: ステートメントが不正です。';errMsgMap[ERR_CODE_TYPE_NOT_ARRAY]='{0}: パラメータは配列で指定して下さい。';errMsgMap[ERR_CODE_INVALID_TRANSACTION_TARGET]='指定されたオブジェクトはトランザクションに追加できません。Insert/Update/Del/Select/Sqlクラスのインスタンスを指定して下さい。';errMsgMap[ERR_CODE_TRANSACTION_PROCESSING_FAILURE]='トランザクション処理中にエラーが発生しました。{0} {1}';errMsgMap[ERR_CODE_INVALID_COLUMN_NAME_IN_WHERE]='where句に指定されたカラム名が空白または空文字です。';addFwErrorCodeMap(errMsgMap); //SQLExceptionの例外メッセージ定義。dev版のみ出力される。
//typeof SQLExceptionは、Android2-4, iOS4はundefined、iOS5-6はobject、PCのChrome26はfunctionになる。
//このため、定数が定義されている環境でのみメッセージを出力することとする。
var SQL_ERR_DATABASE='データベースエラー';var SQL_ERR_CONSTRAINT='一意制約に反しています。';var SQL_ERR_QUOTA='空き容量が不足しています。';var SQL_ERR_SYNTAX='構文に誤りがあります。';var SQL_ERR_TIMEOUT='ロック要求がタイムアウトしました。';var SQL_ERR_TOO_LARGE='取得結果の行が多すぎます。';var SQL_ERR_VERSION='データベースのバージョンが一致しません。';var SQL_ERR_UNKNOWN='トランザクション内で不明なエラーが発生、または例外がスローされました。'; /* del end */ // =========================================================================
//
// Cache
//
// =========================================================================
var getDeferred=h5.async.deferred;var format=h5.u.str.format; // =========================================================================
//
// Privates
//
// =========================================================================
/**
	 * SQLExceptionのエラーコードに対応するメッセージを取得します。
	 */function getTransactionErrorMsg(e){var msg='SQLDB ERROR'; /* del begin */if(e.DATABASE_ERR!=='undefined'){ //OperaやAndroid4系等、SQLExceptionがグローバルに公開されておらず
//エラーオブジェクトを生成しないと定数が見えない環境があるので
//実行時に定数の有無を判定してメッセージを入れる。
//Android2、iOS4等実行時にも定数が存在しない場合はdev版でも汎用メッセージになる。
//注：Android2、iOS4は実際にエラーが発生した時codeが必ず1になる
switch(e.code){case e.DATABASE_ERR:msg=SQL_ERR_DATABASE;break;case e.CONSTRAINT_ERR:msg=SQL_ERR_CONSTRAINT;break;case e.QUOTA_ERR:msg=SQL_ERR_QUOTA;break;case e.SYNTAX_ERR:msg=SQL_ERR_SYNTAX;break;case e.TIMEOUT_ERR:msg=SQL_ERR_TIMEOUT;break;case e.TOO_LARGE_ERR:msg=SQL_ERR_TOO_LARGE;break;case e.VERSION_ERR:msg=SQL_ERR_VERSION;break;case e.UNKNOWN_ERR:msg=SQL_ERR_UNKNOWN;break;}} /* del end */return msg+'(code='+e.code+')';} // =============================
// Variables
// =============================
// =============================
// Functions
// =============================
/**
	 * トランザクションエラー時に実行する共通処理
	 */function transactionErrorCallback(tasks,e){for(var i=tasks.length-1;i>=0;i--){var result=tasks[i];var msgParam=getTransactionErrorMsg(e);result.deferred.reject(createRejectReason(ERR_CODE_TRANSACTION_PROCESSING_FAILURE,[msgParam,e.message],e));}} /**
	 * トランザクション完了時に実行する共通処理
	 */function transactionSuccessCallback(tasks){for(var i=tasks.length-1;i>=0;i--){var result=tasks[i];result.deferred.resolve(result.result);}} /**
	 * 既にexecuteSql()の実行が完了した、またはexecute()が実行中の場合はエラーをスローします
	 */function executeCalled(recentTask){if(!recentTask){return;}var dfd=recentTask.deferred;if(isRejected(dfd)||isResolved(dfd)||!recentTask.result){throwFwError(ERR_CODE_RETRY_SQL);}} /**
	 * DatabaseWrapper.select()/insert()/update()/del() のパラメータチェック
	 * <p>
	 * tableNameが未指定またはString型以外の型の値が指定された場合、例外をスローします。
	 */function validTableName(funcName,tableName){if(!isString(tableName)){throwFwError(ERR_CODE_INVALID_TABLE_NAME,funcName);}} /**
	 * DatabaseWrapper.select()/insert()/update()/del()/sql()/transaction() のパラメータチェック
	 * <p>
	 * txeがTransactionalExecutor型ではない場合、例外をスローします。<br>
	 * null,undefinedの場合は例外をスローしません。
	 */function isTransactionalExecutor(funcName,txe){if(txe!=undefined&&!(txe instanceof TransactionalExecutor)){throwFwError(ERR_CODE_INVALID_TRANSACTION_TYPE,funcName);}} /**
	 * 条件を保持するオブジェクトから、SQLのプレースホルダを含むWHERE文とパラメータの配列を生成します
	 */function setConditionAndParameters(whereObj,conditions,parameters){if($.isPlainObject(whereObj)){for(var prop in whereObj){var params=$.trim(prop).replace(/ +/g,' ').split(' ');var param=[];if(params[0]===""){throwFwError(ERR_CODE_INVALID_COLUMN_NAME_IN_WHERE);}else if(params.length===1){param.push(params[0]);param.push('=');param.push('?');}else if(!/^(<=|<|>=|>|=|!=|like)$/i.test(params[1])){throwFwError(ERR_CODE_INVALID_OPERATOR);}else if(params.length===3&&/^like$/i.test(params[1])){param.push(params[0]);param.push(params[1]);param.push('?');param.push('ESCAPE');param.push('\"'+params[2]+'\"');}else {param.push(params[0]);param.push(params[1]);param.push('?');}conditions.push(param.join(' '));parameters.push(whereObj[prop]);}}} /**
	 * Web SQL Databaseクラス
	 *
	 * @class
	 * @name WebSqlDatabase
	 */function WebSqlDatabase(){} // 空コンストラクタ
/**
	 * Statementクラス
	 * <p>
	 * このクラスを継承しているクラスは<a href="TransactionalExecutor.html#add">TransactionalExecutor.add()</a>で追加できます。
	 * </p>
	 *
	 * @class
	 * @name Statement
	 */function Statement(){ /**
		 * 1インスタンスで複数のステートメントを実行するか判定するフラグ このフラグがtrueの場合、execute()の実行結果を配列で返します
		 *
		 * @private
		 */this._multiple=false;}$.extend(Statement.prototype,{ /**
		 * SQL文を実行します
		 *
		 * @memberOf Statement
		 * @return {TransactionalExecutor} TransactionalExecutorオブジェクト
		 */execute:function execute(){return this._executor.add(this)._execute(function(results){return results[0]; // 配列に包まれていない実行結果を返す
});}}); // =========================================================================
//
// Body
//
// =========================================================================
/**
	 * SQLTransaction管理・実行クラス
	 * <p>
	 * このオブジェクトは自分でnewすることはありません。<br>
	 * <b>h5.api.sqldb.open().transaction()</b>を呼び出した場合と、
	 * Insert/Select/Update/Del/Sqlオブジェクトのexecute()が返すPromiseオブジェクトの、progressコールバックの引数に存在します。
	 * <p>
	 * ver1.1.7までは<b>Transaction</b>クラスと<b>TransactionWrapper</b>クラスが別々に存在していましたが、 ver1.1.8からは<b>TransactionalExecutor</b>クラスに統合されました。
	 * <p>
	 * 本クラスに存在する<b>execute()</b>と<b>add()</b>の使用方法は、Transactionクラスのexecute()とadd()と同じです。
	 *
	 * @class
	 * @name TransactionalExecutor
	 */function TransactionalExecutor(db){this._db=db;this._df=getDeferred();this._tx=null;this._tasks=[];this._queue=[];}$.extend(TransactionalExecutor.prototype,{ /**
		 * トランザクション処理中か判定します
		 *
		 * @private
		 * @memberOf TransactionalExecutor
		 * @function
		 * @returns {Boolean} true:実行中 / false: 未実行
		 */_runTransaction:function _runTransaction(){return this._tx!=null;}, /**
		 * トランザクション内で実行中のDeferredオブジェクトを管理対象として追加します。
		 *
		 * @private
		 * @memberOf TransactionalExecutor
		 * @function
		 * @param {Deferred} df Deferredオブジェクト
		 */_addTask:function _addTask(df){this._tasks.push({deferred:df,result:null});}, /**
		 * SQLの実行結果を設定します
		 *
		 * @private
		 * @memberOf TransactionalExecutor
		 * @function
		 * @param {Any} resul SQL実行結果
		 */_setResult:function _setResult(result){this._getRecentTask().result=result;}, /**
		 * 現在実行中のタスク情報を取得します
		 *
		 * @private
		 * @memberOf TransactionalExecutor
		 * @function
		 * @return {Any} タスク
		 */_getRecentTask:function _getRecentTask(){return this._tasks[this._tasks.length-1];}, /**
		 * 1トランザクションで処理したいSQLをタスクに追加します。
		 * <p>
		 * このメソッドには、以下のクラスのインスタンスを追加することができます。
		 * <ul>
		 * <li><a href="Insert.html">Insert</a></li>
		 * <li><a href="Update.html">Update</a></li>
		 * <li><a href="Del.html">Del</a></li>
		 * <li><a href="Select.html">Select</a></li>
		 * <li><a href="Sql.html">Sql</a></li>
		 * </ul>
		 *
		 * @function
		 * @memberOf TransactionalExecutor
		 * @param {Insert|Update|Del|Select|Sql} statement Statementクラスのインスタンス
		 * @return {TransactionalExecutor} Transactionオブジェクト
		 */add:function add(statement){if(!(statement instanceof Statement)){throwFwError(ERR_CODE_INVALID_TRANSACTION_TARGET);}var recentTask=this._getRecentTask(); // execute()実行中はadd()できない
if(!recentTask||recentTask.result){this._queue.push(statement);}return this;}, /**
		 * SQLを実行します
		 *
		 * @private
		 * @function
		 * @memberOf TransactionalExecutor
		 * @param {Function(Array)} completeCallback SQLの実行が全て完了し、notifyが呼ばれる直前に実行されるコールバック関数
		 * @return {TransactionalExecutor} TransactionalExecutorオブジェクト
		 */_execute:function _execute(completeCallback){var that=this;var df=this._df;var queue=this._queue;var results=[];function executeSql(){if(queue.length===0){var ret=completeCallback(results);that._setResult.apply(that,[ret]);df.notify(ret,that);return;}var statementObj=queue.shift();var statements=statementObj._statements;var parameters=statementObj._parameters;var p=getDeferred().resolve().promise();var ret=[];for(var i=0,iLen=statements.length;i<iLen;i++){(function(statement,parameter){fwLogger.debug(wrapInArray(statement),wrapInArray(parameter));p=thenCompat(p,function(){var thenDf=getDeferred();that._tx.executeSql(statement,parameter,function(innerTx,rs){ret.push(statementObj._onComplete(rs));thenDf.resolve();});return thenDf.promise();});})(statements[i],parameters[i]);}thenCompat(p,function(){ // _multipleフラグがtrueの場合は実行結果を配列として返す
var unwrapedRet=statementObj._multiple?ret:ret[0];results.push(unwrapedRet);executeSql();});}try{executeCalled(this._getRecentTask());this._addTask(df); // トランザクション内で_buildStatementAndParameters()を実行すると、
// SQL構文エラーがクライアントに返せないため、ここでステートメントとパラメータを生成する
for(var j=0,jLen=queue.length;j<jLen;j++){queue[j]._buildStatementAndParameters();}if(this._runTransaction()){executeSql();}else {this._db.transaction(function(tx){that._tx=tx;executeSql();},function(e){that._tx=null;transactionErrorCallback(that._tasks,e);},function(){that._tx=null;transactionSuccessCallback(that._tasks);});}}catch(e){df.reject(e);}this._df=getDeferred();return df.promise();}, /**
		 * add()で追加された順にSQLを実行します
		 * <p>
		 * 実行結果は、戻り値であるPromiseオブジェクトのprogress()に指定したコールバック関数、またはdone()に指定したコールバック関数に返されます。
		 *
		 * <pre>
		 *  db.transaction()
		 *   .add(db.insert('USER', {ID:10, NAME:TANAKA}))
		 *   .add(db.insert('USER', {ID:11, NAME:YOSHIDA}))
		 *   .add(db.insert('USER', {ID:12, NAME:SUZUKI})).execute().done(function(rs) {
		 *  　rs // 第一引数: 実行結果
		 *  });
		 * </pre>
		 *
		 * 実行結果は<b>配列(Array)</b>で返され、結果の格納順序は、<b>add()で追加した順序</b>に依存します。<br>
		 * 上記例の場合、3件 db.insert()をadd()で追加しているので、実行結果rsには3つのROWIDが格納されています。( [1, 2, 3]のような構造になっている )
		 * <p>
		 * また、progress()に指定したコールバック関数の第二引数には、トランザクションオブジェクトが格納され、このオブジェクトを使用することで、トランザクションを引き継ぐことができます。
		 *
		 * <pre>
		 *  db.select('PRODUCT', ['ID']).where({NAME: 'ball'}).execute().progress(function(rs, tx) {
		 * 　db.transaction(tx)
		 * 　　.add(db.update('UPDATE STOCK SET PRICE = 2000').where({ID: rs.item(0).ID}))
		 * 　　.execute();
		 *  });
		 * </pre>
		 *
		 * select().execute()で返ってきたトランザクションを、db.transaction()の引数に指定することで、db.select()とdb.transaction()は同一トランザクションで実行されます。
		 * <p>
		 * <h5>ver1.1.8からの変更点</h5>
		 * execute()が返すPromiseオブジェクトのprogressコールバックの第二引数(<b>TransactionalExecutor</b>インスタンス)に、
		 * Select/Insert/Del/Update/Sqlインスタンスをaddすることができるようになりました。
		 * <p>
		 * 下記のサンプルコードは、Statementインスタンスをtx.add()することにより、db.select()と同一トランザクションでSQLを実行しています。
		 *
		 * <pre>
		 *  db.transaction().add(db.select('PRODUCT', ['ID']).where({NAME: 'ballA'})).execute().progress(function(rsArray, tx) {
		 * 　　tx.add(db.sql(' STOCK', {COUNT:20}).where({ID: rsArray[0].item(0).ID})).execute();
		 *  });
		 * </pre>
		 *
		 * @function
		 * @memberOf TransactionalExecutor
		 * @returns {Promise} Promiseオブジェクト
		 */execute:function execute(){return this._execute(function(results){ // add()されたStatementの数に関係なく、結果は配列に包んで返す
return results;});}, /**
		 * SQLの実行結果を受け取ることができる、Promiseオブジェクトを取得します
		 *
		 * @function
		 * @memberOf TransactionalExecutor
		 * @returns {Promise} Promiseオブジェクト
		 */promise:function promise(){return this._df.promise();}}); /**
	 * 指定されたテーブルに対して、検索処理(SELECT)を行うクラス
	 * <p>
	 * このオブジェクトは自分でnewすることはありません。<br>
	 * <b>h5.api.sqldb.open().select()</b>を呼び出すと、このクラスのインスタンスが返されます。
	 *
	 * @class
	 * @name Select
	 */function Select(executor,tableName,columns){this._statements=[];this._parameters=[];this._executor=executor;this._tableName=tableName;this._columns=isArray(columns)?columns.join(', '):'*';this._where=null;this._orderBy=null;}Select.prototype=new Statement();$.extend(Select.prototype,{ /**
		 * WHERE句を設定します
		 * <p>
		 * <b>条件は以下の方法で設定できます。</b><br>
		 * <ul>
		 * <li>オブジェクト</li>
		 * <li>文字列</li>
		 * </ul>
		 * <b>オブジェクト</b>の場合、キーに『<b>カラム名[半角スペース]オペレータ</b>』、バリューに<b>値</b>を指定します。
		 * <p>
		 * 例. IDが0以上100以下。
		 *
		 * <pre>
		 * db.select('USER', '*').where({
		 * 	'ID &gt;': 0,
		 * 	'ID &lt;=': 100
		 * })
		 * </pre>
		 *
		 * オペレータで使用可能な文字は以下の通りです。
		 * <ul>
		 * <li> &lt;=</li>
		 * <li> &lt;</li>
		 * <li> &gt;=</li>
		 * <li> &gt;</li>
		 * <li> =</li>
		 * <li> !=</li>
		 * <li> like (sqliteの仕様上大文字・小文字を区別しない)</li>
		 * </ul>
		 * 条件を複数指定した場合、全てAND句で結合されます。 AND句以外の条件で結合したい場合は<b>文字列</b>で条件を指定して下さい。
		 * <p>
		 * <b>エスケープ文字の指定方法</b><br>
		 * キーに『<b>カラム名[半角スペース]オペレータ[半角スペース]エスケープ文字</b>』のように指定します。 <br>
		 * エスケープ文字はクォートやダブルクォートで囲わず、エスケープ文字のみ指定して下さい。
		 * <p>
		 * 例. $をエスケープ文字として指定する場合
		 *
		 * <pre>
		 * db.select('USER', '*').where({
		 * 	'NAME like $': 'SUZUKI$'
		 * });
		 * </pre>
		 *
		 * <p>
		 * <b>文字列</b>の場合、SQLステートメントに追加するWHERE文を指定します。
		 * <p>
		 * 例. IDが0以上100以下。
		 *
		 * <pre>
		 * db.select('USER', '*').where('ID &gt;= 10 AND ID &lt;= 100');
		 * </pre>
		 *
		 * @function
		 * @memberOf Select
		 * @param {Object|String} whereObj 条件
		 * @returns {Select} Selectオブジェクト
		 */where:function where(whereObj){if(!$.isPlainObject(whereObj)&&!isString(whereObj)){throwFwError(ERR_CODE_INVALID_PARAM_TYPE,['Select','where']);}this._where=whereObj;return this;}, /**
		 * ORDER BY句を設定します
		 * <p>
		 * ソート対象のカラムが一つの場合は<b>文字列</b>、複数の場合は<b>配列</b>で指定します。
		 * <p>
		 * 例.IDを降順でソートする場合
		 *
		 * <pre>
		 * db.select('USER', '*').orderBy('ID DESC');
		 * </pre>
		 *
		 * 例.IDを降順、NAMEを昇順でソートする場合
		 *
		 * <pre>
		 * db.select('USER', '*').orderBy(['ID DESC', 'NAME ASC']);
		 * </pre>
		 *
		 * なお、複数の条件が指定されている場合、ソートは配列の先頭に指定されたカラムから順番に実行されます。
		 *
		 * @function
		 * @memberOf Select
		 * @param {Array|String} orderBy 条件
		 * @returns {Select} Selectオブジェクト
		 */orderBy:function orderBy(orderByObj){if(!$.isPlainObject(orderByObj)&&!isString(orderByObj)){throwFwError(ERR_CODE_INVALID_PARAM_TYPE,['Select','orderBy']);}this._orderBy=wrapInArray(orderByObj);return this;}, /**
		 * SQLの構文とパラメータを生成します
		 *
		 * @private
		 * @function
		 * @memberOf Select
		 */_buildStatementAndParameters:function _buildStatementAndParameters(){var statement='';var where=this._where;statement=format(SELECT_SQL_FORMAT,this._columns,this._tableName);if($.isPlainObject(where)){var conditions=[];setConditionAndParameters(where,conditions,this._parameters);statement+=' WHERE '+conditions.join(' AND ');}else if(isString(where)){statement+=' WHERE '+where;}if(isArray(this._orderBy)){statement+=' ORDER BY '+this._orderBy.join(', ');}this._statements.push([statement]);this._parameters=[this._parameters];}, /**
		 * executeSql成功時の処理を実行します
		 *
		 * @private
		 * @function
		 * @memberOf Select
		 * @param {ResultSet} rs SQL実行結果
		 * @return {Any} クライアントが取得するSQL実行結果
		 */_onComplete:function _onComplete(rs){return rs.rows;}}); /**
	 * 指定されたテーブルに対して、登録処理(INSERT)を行うクラス
	 * <p>
	 * このオブジェクトは自分でnewすることはありません。<br>
	 * <b>h5.api.sqldb.open().insert()</b>を呼び出すと、このクラスのインスタンスが返されます。
	 *
	 * @class
	 * @name Insert
	 */function Insert(executor,tableName,values){this._statements=[];this._parameters=[];this._executor=executor;this._tableName=tableName;this._values=values?wrapInArray(values):[];this._df=getDeferred(); // 1インスタンスで複数のSQLを実行するのでフラグを立てる
this._multiple=true;}Insert.prototype=new Statement();$.extend(Insert.prototype,{ /**
		 * SQLの構文とパラメータを生成します
		 *
		 * @private
		 * @function
		 * @memberOf Insert
		 */_buildStatementAndParameters:function _buildStatementAndParameters(){var values=this._values;var statements=this._statements;var parameters=this._parameters;if(values.length===0){statements.push(format(INSERT_SQL_EMPTY_VALUES,this._tableName));parameters.push([]);return;}for(var i=0,len=values.length;i<len;i++){var valueObj=values[i];if(valueObj==null){statements.push(format(INSERT_SQL_EMPTY_VALUES,this._tableName));parameters.push([]);}else if($.isPlainObject(valueObj)){var value=[];var column=[];var param=[];for(var prop in valueObj){value.push('?');column.push(prop);param.push(valueObj[prop]);}statements.push(format(INSERT_SQL_FORMAT,this._tableName,column.join(', '),value.join(', ')));parameters.push(param);}}}, /**
		 * executeSql成功時の処理を実行します
		 *
		 * @private
		 * @function
		 * @memberOf Insert
		 * @param {ResultSet} rs SQL実行結果
		 * @return {Any} クライアントが取得するSQL実行結果
		 */_onComplete:function _onComplete(rs){return rs.insertId;}}); /**
	 * 指定されたテーブルに対して、更新処理(UPDATE)を行うクラス
	 * <p>
	 * このオブジェクトは自分でnewすることはありません。<br>
	 * <b>h5.api.sqldb.open().update()</b>を呼び出すと、このクラスのインスタンスが返されます。
	 *
	 * @class
	 * @name Update
	 */function Update(executor,tableName,values){this._statements=[];this._parameters=[];this._executor=executor;this._tableName=tableName;this._values=values;this._where=null;}Update.prototype=new Statement();$.extend(Update.prototype,{ /**
		 * WHERE句を設定します
		 * <p>
		 * <b>条件は以下の方法で設定できます。</b><br>
		 * <ul>
		 * <li>オブジェク</li>
		 * <li>文字列</li>
		 * </ul>
		 * <b>オブジェクト</b>の場合、キーに『<b>カラム名[半角スペース]オペレータ</b>』、バリューに<b>値</b>を指定します。
		 * <p>
		 * 例. IDが0以上100以下。
		 *
		 * <pre>
		 * db.update('USER', {
		 * 	NAME: 'TANAKA'
		 * }).where({
		 * 	'ID &gt;': 0,
		 * 	'ID &lt;=': 100
		 * })
		 * </pre>
		 *
		 * オペレータで使用可能な文字は以下の通りです。
		 * <ul>
		 * <li> &lt;=</li>
		 * <li> &lt;</li>
		 * <li> &gt;=</li>
		 * <li> &gt;</li>
		 * <li> =</li>
		 * <li> !=</li>
		 * <li> like (sqliteの仕様上大文字・小文字を区別しない)</li>
		 * </ul>
		 * 条件を複数指定した場合、全てAND句で結合されます。 AND句以外の条件で結合したい場合は文字列で条件を指定して下さい。
		 * <p>
		 * <b>エスケープ文字の指定方法</b><br>
		 * キーに『<b>カラム名[半角スペース]オペレータ[半角スペース]エスケープ文字</b>』のように指定します。 <br>
		 * エスケープ文字はクォートやダブルクォートで囲わず、エスケープ文字のみ指定して下さい。
		 * <p>
		 * 例. $をエスケープ文字として指定する場合
		 *
		 * <pre>
		 * db.update('USER', {
		 * 	NAME: 'TANAKA'
		 * }).where({
		 * 	'NAME like $': 'SUZUKI$'
		 * });
		 * </pre>
		 *
		 * <p>
		 * <b>文字列</b>の場合、SQLステートメントに追加するWHERE文を指定します。
		 * <p>
		 * 例. IDが0以上100以下。
		 *
		 * <pre>
		 * db.update('USER').where('ID &gt;= 10 AND ID &lt;= 100')
		 * </pre>
		 *
		 * @function
		 * @memberOf Update
		 * @param {Object|String} whereObj 条件
		 * @returns {Update} Updateオブジェクト
		 */where:function where(whereObj){if(!$.isPlainObject(whereObj)&&!isString(whereObj)){throwFwError(ERR_CODE_INVALID_PARAM_TYPE,['Update','where']);}this._where=whereObj;return this;}, /**
		 * SQLの構文とパラメータを生成します
		 *
		 * @private
		 * @function
		 * @memberOf Update
		 */_buildStatementAndParameters:function _buildStatementAndParameters(){var statement='';var where=this._where;var values=this._values;var columns=[];for(var prop in values){columns.push(prop+' = ?');this._parameters.push(values[prop]);}statement=format(UPDATE_SQL_FORMAT,this._tableName,columns.join(', '));if($.isPlainObject(where)){var conditions=[];setConditionAndParameters(where,conditions,this._parameters);statement+=' WHERE '+conditions.join(' AND ');}else if(isString(where)){statement+=' WHERE '+where;}this._statements.push([statement]);this._parameters=[this._parameters];}, /**
		 * executeSql成功時の処理を実行します
		 *
		 * @private
		 * @function
		 * @memberOf Update
		 * @param {ResultSet} rs SQL実行結果
		 * @return {Any} クライアントが取得するSQL実行結果
		 */_onComplete:function _onComplete(rs){return rs.rowsAffected;}}); /**
	 * 指定されたテーブルに対して、削除処理(DELETE)を行うクラス。
	 * <p>
	 * このオブジェクトは自分でnewすることはありません。<br>
	 * <b>h5.api.sqldb.open().del()</b>を呼び出すと、このクラスのインスタンスが返されます。
	 * <p>
	 * <i>deleteは予約語なため、Delとしています。</i>
	 *
	 * @class
	 * @name Del
	 */function Del(executor,tableName){this._statements=[];this._parameters=[];this._executor=executor;this._tableName=tableName;this._where=null;}Del.prototype=new Statement();$.extend(Del.prototype,{ /**
		 * WHERE句を設定します
		 * <p>
		 * <b>条件は以下の方法で設定できます。</b><br>
		 * <ul>
		 * <li>オブジェクト</li>
		 * <li>文字列</li>
		 * </ul>
		 * <b>オブジェクト</b>の場合、キーに『<b>カラム名[半角スペース]オペレータ</b>』、バリューに<b>値</b>を指定します。
		 * <p>
		 * 例. IDが0以上100以下。
		 *
		 * <pre>
		 * db.delete('USER').where({'ID &gt;':0, 'ID &lt;=':100})
		 * </pre>
		 *
		 * オペレータで使用可能な文字は以下の通りです。
		 * <ul>
		 * <li> &lt;=</li>
		 * <li> &lt;</li>
		 * <li> &gt;=</li>
		 * <li> &gt;</li>
		 * <li> =</li>
		 * <li> !=</li>
		 * <li> like (sqliteの仕様上大文字・小文字を区別しない)</li>
		 * </ul>
		 * 条件を複数指定した場合、全てAND句で結合されます。 AND句以外の条件で結合したい場合は文字列で条件を指定して下さい。
		 * <p>
		 * <b>エスケープ文字の指定方法</b><br>
		 * キーに『<b>カラム名[半角スペース]オペレータ[半角スペース]エスケープ文字</b>』のように指定します。 <br>
		 * エスケープ文字はクォートやダブルクォートで囲わず、エスケープ文字のみ指定して下さい。
		 * <p>
		 * 例. $をエスケープ文字として指定する場合
		 *
		 * <pre>
		 * db.delete('USER').where({'NAME like $': 'SUZUKI$'});
		 * </pre>
		 *
		 * <p>
		 * <b>文字列</b>の場合、SQLステートメントに追加するWHERE文を指定します。
		 * <p>
		 * 例. IDが0以上100以下。
		 *
		 * <pre>
		 * db.delete('USER').where('ID &gt;= 10 AND ID &lt;= 100')
		 * </pre>
		 *
		 * @function
		 * @memberOf Del
		 * @param {Object|String} whereObj 条件
		 * @returns {Del} Delオブジェクト
		 */where:function where(whereObj){if(!$.isPlainObject(whereObj)&&!isString(whereObj)){throwFwError(ERR_CODE_INVALID_PARAM_TYPE,['Del','where']);}this._where=whereObj;return this;}, /**
		 * SQLの構文とパラメータを生成します
		 *
		 * @private
		 * @function
		 * @memberOf Del
		 */_buildStatementAndParameters:function _buildStatementAndParameters(){var statement='';var where=this._where;statement=format(DELETE_SQL_FORMAT,this._tableName);if($.isPlainObject(where)){var conditions=[];setConditionAndParameters(where,conditions,this._parameters);statement+=' WHERE '+conditions.join(' AND ');}else if(isString(where)){statement+=' WHERE '+where;}this._statements.push([statement]);this._parameters=[this._parameters];}, /**
		 * executeSql成功時の処理を実行します
		 *
		 * @private
		 * @function
		 * @memberOf Del
		 * @param {ResultSet} rs SQL実行結果
		 * @return {Any} クライアントが取得するSQL実行結果
		 */_onComplete:function _onComplete(rs){return rs.rowsAffected;}}); /**
	 * 指定されたSQLステートメントを実行するクラス
	 * <p>
	 * このオブジェクトは自分でnewすることはありません。<br>
	 * <b>h5.api.sqldb.open().sql()</b>を呼び出すと、このクラスのインスタンスが返されます。
	 *
	 * @class
	 * @name Sql
	 */function Sql(executor,statement,params){this._statements=[];this._parameters=[];this._executor=executor;this._statements.push(statement);this._parameters.push(params||[]);}Sql.prototype=new Statement();$.extend(Sql.prototype,{ /**
		 * SQLの構文とパラメータを生成します
		 *
		 * @private
		 * @function
		 * @memberOf Sql
		 */_buildStatementAndParameters:function _buildStatementAndParameters(){ // 既にコンストラクタで渡されているため何もしない
}, /**
		 * executeSql成功時の処理を実行します
		 *
		 * @private
		 * @function
		 * @memberOf Sql
		 * @param {ResultSet} rs SQL実行結果
		 * @return {Any} クライアントが取得するSQL実行結果
		 */_onComplete:function _onComplete(rs){return rs;}}); /**
	 * Database拡張クラス
	 * <p>
	 * このオブジェクトは自分でnewすることはありません。<br>
	 * <b>h5.api.sqldb.open()</b>を呼び出すと、このクラスのインスタンスが返されます。
	 *
	 * @class
	 * @name DatabaseWrapper
	 */ /**
	 * @param {Database} db openDatabase()が返すネイティブのDatabaseオブジェクト
	 */function DatabaseWrapper(db){this._db=db;}$.extend(DatabaseWrapper.prototype,{ /**
		 * 指定されたテーブルに対して、検索処理(SELECT)を行うためのオブジェクトを生成します
		 *
		 * @memberOf DatabaseWrapper
		 * @function
		 * @param {String} tableName テーブル名
		 * @param {Array} columns カラム
		 * @param {TransactionalExecutor} [txe] TransactionalExecutorクラス
		 * @returns {Select} SELECTオブジェクト
		 */select:function select(tableName,columns,txe){validTableName('select',tableName);if(!isArray(columns)&&columns!=='*'){throwFwError(ERR_CODE_INVALID_COLUMN_NAME,'select');}return new Select(this.transaction(txe),tableName,columns);}, /**
		 * 指定されたテーブルに対して、登録処理(INSERT)を行うためのオブジェクトを生成します
		 * <p>
		 * <b>第二引数valuesの指定方法</b>
		 * <p>
		 * 1テーブルに1件INSERTを行う場合は<b>オブジェクト</b>で値を指定します。また、1テーブルに複数件INSERTを行う場合は<b>配列</b>で値を指定します。<br>
		 * <p>
		 * オブジェクトで指定する場合、シンタックスは以下のようになります。
		 *
		 * <pre>
		 * {カラム名:登録する値, ...}
		 * </pre>
		 *
		 * <p>
		 * 例.USERテーブルに、1件レコードをINSERTする。
		 *
		 * <pre>
		 * db.insert('USER', {
		 * 	ID: 10,
		 * 	NAME: 'TANAKA'
		 * }).execute();
		 * </pre>
		 *
		 * <p>
		 * 配列で指定する場合、シンタックスは以下のようになります。
		 *
		 * <pre>
		 * [{カラム名:登録する値, ...}, {カラム名:登録する値, ...}, ...]
		 * </pre>
		 *
		 * <p>
		 * 例.USERテーブルに、3件レコードをINSERTする。
		 *
		 * <pre>
		 * db.insert('USER', [{
		 * 	ID: 1,
		 * 	NAME: 'TANAKA'
		 * }, {
		 * 	ID: 2,
		 * 	NAME: 'YAMADA'
		 * }, {
		 * 	ID: 3,
		 * 	NAME: 'SUZUKI'
		 * }]).execute();
		 * </pre>
		 *
		 * @memberOf DatabaseWrapper
		 * @function
		 * @param {String} tableName テーブル名
		 * @param {Object|Array} values 値(登録情報を保持するオブジェクトまたは、登録情報のオブジェクトを複数保持する配列)
		 * @param {TransactionalExecutor} [txe] TransactionalExecutorクラス
		 * @returns {Insert} INSERTオブジェクト
		 */insert:function insert(tableName,values,txe){validTableName('insert',tableName);if(values!=null&&!isArray(values)&&!$.isPlainObject(values)){throwFwError(ERR_CODE_INVALID_VALUES,'insert');}return new Insert(this.transaction(txe),tableName,values);}, /**
		 * 指定されたテーブルに対して、更新処理(UPDATE)を行うためのオブジェクトを生成します
		 * <p>
		 * <b>第二引数valuesの指定方法</b>
		 * <p>
		 * オブジェクトリテラルで以下のように指定します。
		 *
		 * <pre>
		 * {
		 * 	カラム名: 更新後の値
		 * }
		 * </pre>
		 *
		 * <p>
		 * 例.USERテーブルのNAMEカラムを"TANAKA"に更新する。
		 *
		 * <pre>
		 * db.update('USER', {
		 * 	NAME: 'TANAKA'
		 * }).excute();
		 * </pre>
		 *
		 * @memberOf DatabaseWrapper
		 * @function
		 * @param {String} tableName テーブル名
		 * @param {Object} values カラム
		 * @param {TransactionalExecutor} [txe] TransactionalExecutorクラス
		 * @returns {Update} Updateオブジェクト
		 */update:function update(tableName,values,txe){validTableName('update',tableName);if(!$.isPlainObject(values)){throwFwError(ERR_CODE_INVALID_VALUES,'update');}return new Update(this.transaction(txe),tableName,values);}, /**
		 * 指定されたテーブルに対して、削除処理(DELETE)を行うためのオブジェクトを生成します
		 * <p>
		 * <i>deleteは予約語なため、delとしています。</i>
		 *
		 * @memberOf DatabaseWrapper
		 * @function
		 * @param {String} tableName テーブル名
		 * @param {TransactionalExecutor} [txe] TransactionalExecutorクラス
		 * @returns {Del} Delオブジェクト
		 */del:function del(tableName,txe){validTableName('del',tableName);return new Del(this.transaction(txe),tableName);}, /**
		 * 指定されたステートメントとパラメータから、SQLを実行するためのオブジェクトを生成します
		 *
		 * @memberOf DatabaseWrapper
		 * @function
		 * @param {String} statement SQLステートメント
		 * @param {Array} parameters パラメータ
		 * @param {TransactionalExecutor} [txe] TransactionalExecutorクラス
		 * @returns {Sql} Sqlオブジェクト
		 */sql:function sql(statement,parameters,txe){if(!isString(statement)){throwFwError(ERR_CODE_INVALID_STATEMENT,'sql');}if(parameters!=null&&!isArray(parameters)){throwFwError(ERR_CODE_TYPE_NOT_ARRAY,'sql');}return new Sql(this.transaction(txe),statement,parameters);}, /**
		 * 指定された複数のSQLを同一トランザクションで実行するためのオブジェクトを生成します
		 *
		 * @memberOf DatabaseWrapper
		 * @function
		 * @param {TransactionalExecutor} [txe] TransactionalExecutorクラス
		 * @returns {TransactionalExecutor} TransactionalExecutorオブジェクト
		 */transaction:function transaction(txe){isTransactionalExecutor('transaction',txe);return txe?txe:new TransactionalExecutor(this._db);}}); /**
	 * Web SQL Database
	 *
	 * @memberOf h5.api
	 * @name sqldb
	 * @namespace
	 */$.extend(WebSqlDatabase.prototype,{ /**
		 * Web SQL Databaseが使用可能であるかの判定結果
		 *
		 * @memberOf h5.api.sqldb
		 * @name isSupported
		 * @type Boolean
		 */isSupported:!!window.openDatabase, /**
		 * データベースに接続します。
		 *
		 * @memberOf h5.api.sqldb
		 * @name open
		 * @function
		 * @param {String} name データベース名
		 * @param {String} [version] バージョン
		 * @param {String} [displayName] 表示用データベース名
		 * @param {Number} [estimatedSize] 見込み容量(バイト)
		 * @returns {DatabaseWrapper} Databaseオブジェクト
		 */open:function open(name,version,displayName,estimatedSize){if(!this.isSupported){return;}var conn=openDatabase(name,version,displayName,estimatedSize);return new DatabaseWrapper(conn);}}); // =============================
// Expose to window
// =============================
h5.u.obj.expose('h5.api',{sqldb:new WebSqlDatabase()});})(); /* ------ h5.api.storage ------ */(function(){ // =========================================================================
//
// Constants
//
// =========================================================================
// =============================
// Production
// =============================
// =============================
// Development Only
// =============================
var fwLogger=h5.log.createLogger('h5.api.storage'); /* del begin */var FW_LOG_STORAGE_SUPPORTED='local storage supported:{0}, session storage supported:{1}'; /* del end */ // =========================================================================
//
// Cache
//
// =========================================================================
// =========================================================================
//
// Privates
//
// =========================================================================
// =============================
// Variables
// =============================
// =============================
// Functions
// =============================
// =========================================================================
//
// Body
//
// =========================================================================
function WebStorage(storage){ /**
		 * ストレージオブジェクト(localStorage/sessionStorage)
		 *
		 * @member h5.api.storage.local
		 * @name storage
		 * @type Storage
		 * @private
		 */this._storage=storage;} /**
	 * Web Storage
	 *
	 * @memberOf h5.api
	 * @name storage
	 * @namespace
	 */$.extend(WebStorage.prototype,{ /**
		 * ストレージに保存されている、キーと値のペアの数を取得します。
		 *
		 * @memberOf h5.api.storage.local
		 * @name getLength
		 * @function
		 * @returns {Number} キーとペアの数
		 */getLength:function getLength(){return this._storage.length;}, /**
		 * 指定されたインデックスにあるキーを、ストレージから取得します。
		 *
		 * @memberOf h5.api.storage.local
		 * @name key
		 * @function
		 * @param {Number} index インデックス
		 * @returns {String} キー
		 */key:function key(index){return this._storage.key(index);}, /**
		 * 指定されたキーに紐付く値を、ストレージから取得します。
		 * <p>
		 * 自動的にsetItem()実行時に保存したときの型に戻します。
		 *
		 * @memberOf h5.api.storage.local
		 * @name getItem
		 * @function
		 * @param {String} key キー
		 * @returns {Any} キーに紐付く値
		 */getItem:function getItem(key){var str=this._storage.getItem(key);if(str===null){return null;}return h5.u.obj.deserialize(str);}, /**
		 * 指定されたキーで、値をストレージに保存します。
		 * <p>
		 * 値は、シリアライズして保存します。保存できる型は<a href="./h5.u.obj.html#serialize">h5.u.obj.serialize()</a>を参照してください。
		 * </p>
		 *
		 * @memberOf h5.api.storage.local
		 * @name setItem
		 * @function
		 * @param {String} key キー
		 * @param {Any} value 値
		 */setItem:function setItem(key,value){this._storage.setItem(key,h5.u.obj.serialize(value));}, /**
		 * 指定されたキーに紐付く値を、ストレージから削除します。
		 *
		 * @memberOf h5.api.storage.local
		 * @name removeItem
		 * @function
		 * @param {String} key キー
		 */removeItem:function removeItem(key){this._storage.removeItem(key);}, /**
		 * ストレージに保存されている全てのキーとそれに紐付く値を全て削除します。
		 *
		 * @memberOf h5.api.storage.local
		 * @name clear
		 * @function
		 */clear:function clear(){this._storage.clear();}, /**
		 * 現在ストレージに保存されているオブジェクト数分、キーと値をペアで取得します。
		 *
		 * @memberOf h5.api.storage.local
		 * @name each
		 * @function
		 * @param {Function} callback インデックス, キー, 値 を引数に持つコールバック関数
		 */each:function each(callback){var storage=this._storage;for(var i=0,len=storage.length;i<len;i++){var k=storage.key(i);callback(i,k,this.getItem(k));}}}); // =============================
// Expose to window
// =============================
h5.u.obj.expose('h5.api.storage',{ /**
		 * ブラウザがこのAPIをサポートしているか。
		 *
		 * @memberOf h5.api.storage
		 * @name isSupported
		 * @type Boolean
		 */ // APIはlocalStorageとsessionStorageに分かれており、本来であればそれぞれサポート判定する必要があるが、
// 仕様ではStorage APIとして一つに扱われておりかつ、テストした限りでは片方のみ使用できるブラウザが見つからない為、一括りに判定している。
// safari(PC,iOS)のプライベートブラウズモードでは、localStorageオブジェクトはあるがsetItem()を使用すると例外が発生するため、
// try-catchでチェックして、例外が発生するかどうかをチェックし、例外が発生した場合はisSupported===falseにする。issue
isSupported:window.localStorage?function(){try{var checkKey='__H5_WEB_STORAGE_CHECK__';window.localStorage.setItem(checkKey,'ok');window.localStorage.removeItem(checkKey);return true;}catch(e){return false;}}():false, /**
		 * ローカルストレージ
		 *
		 * @memberOf h5.api.storage
		 * @name local
		 * @namespace
		 */local:new WebStorage(window.localStorage), /**
		 * セッションストレージ
		 *
		 * @memberOf h5.api.storage
		 * @name session
		 * @namespace
		 */session:new WebStorage(window.sessionStorage)}); /* del begin */fwLogger.debug(FW_LOG_STORAGE_SUPPORTED,!!window.localStorage,!!window.sessionStorage); /* del end */})(); /* ------ h5.scene ------ */(function(){ // =========================================================================
//
// Constants
//
// =========================================================================
/**
	 * コントローラーバインド用データ属性名
	 */var DATA_H5_CONTROLLER='data-h5-controller'; /**
	 * バインド済みコントローラー設定用データ属性名
	 */var DATA_H5_DYN_CONTROLLER_BOUND='data-h5-dyn-controller-bound'; /**
	 * デフォルトシーン指定用データ属性名
	 */var DATA_H5_DEFAULT_SCENE='data-h5-default-scene'; /**
	 * シーン指定用データ属性名
	 */var DATA_H5_SCENE='data-h5-scene'; /**
	 * シーンコンテナ指定用データ属性名
	 */var DATA_H5_CONTAINER='data-h5-scene-container'; /**
	 * メインシーンコンテナ指定用データ属性名
	 */var DATA_H5_MAIN_CONTAINER='data-h5-main-scene-container'; /**
	 * コンテナ生成済み識別用データ属性名
	 */var DATA_H5_DYN_CONTAINER_BOUND='data-h5-dyn-container-bound'; /**
	 * BODY要素のダミーDIV識別用データー属性名
	 */var DATA_H5_DYN_DUMMY_BODY='data-h5-dyn-dummy-body'; /**
	 * シーンコンテナに対するシーンの変更要求イベント名
	 */var EVENT_SCENE_CHANGE_REQUEST='sceneChangeRequest'; /**
	 * シリアライズプレフィクス
	 */var SERIALIZE_PREFIX='2|'; /** シーンコンテナのタイトルデータ属性 */var DATA_H5_SCENE_TITLE='h5-scene-title'; /** シーンコントローラのシーンタイトル定義プロパティ */var CONTROLLER_SCENE_TITLE='sceneTitle'; /**
	 * シーン遷移時のパターン
	 * <p>
	 * シーン遷移時のnavigationTypeパラメータに指定する遷移時のパターンを表す定数です
	 * </p>
	 * <dl>
	 * <dt>h5.scene.navigationType.NORMAL</dt>
	 * <dd>"normal" … URLに開発者指定のパラメーターを入れます(デフォルト)。ブラウザバック等でパラメーター含めて再表示可能です。</dd>
	 * <dt>h5.scene.navigationType.ONCE</dt>
	 * <dd>"once" … URLに開発者指定のパラメーターを入れません。フレームワーク用パラメーターのみとなります。</dd>
	 * <dt>h5.scene.navigationType.SILENT</dt>
	 * <dd>"silent" … URLは変化させずに遷移します。</dd>
	 * </dl>
	 *
	 * @memberOf h5.scene
	 * @name navigationType
	 */var NAVIGATION_TYPE={NORMAL:'normal',ONCE:'once',SILENT:'silent'}; /**
	 * シーン遷移時のHTMLデータ取得時のHTTPメソッド
	 * <p>
	 * シーン遷移時のmethodパラメータに指定するHTMLデータ取得時のHTTPメソッドを表す定数です
	 * </p>
	 * <dl>
	 * <dt>h5.scene.method.GET</dt>
	 * <dd>"get" … GETメソッドで取得します(デフォルト)。</dd>
	 * <dt>h5.scene.method.ONCE</dt>
	 * <dd>"post" … POSTメソッドで取得します。ブラウザバックなどで再表示はできなくなります。</dd>
	 * </dl>
	 *
	 * @memberOf h5.scene
	 * @name method
	 */var METHOD={GET:'get',POST:'post'}; /**
	 * 再表示不可画面用メッセージ
	 */var NOT_RESHOWABLE_MESSAGE='この画面は再表示できません。'; /**
	 * メインシーンコンテナのURL履歴保持方法列挙体
	 * <p>
	 * メインシーンコンテナURL履歴保持方法です。何れかをh5.settings.scene.urlHistoryModeに指定します。
	 * </p>
	 * <dl>
	 * <dt>h5.scene.urlHistoryMode.HASH</dt>
	 * <dd>"hash" … シーン遷移パラメーターをハッシュに格納する。</dd>
	 * <dt>h5.scene.urlHistoryMode.NONE</dt>
	 * <dd>"none" … URLを変更しない。</dd>
	 * <dt>h5.scene.urlHistoryMode.FULLRELOAD</dt>
	 * <dd>"fullreload" … Ajaxを使用せず、ページ全体を再読み込みする(通常の遷移)。</dd>
	 * <dt>h5.scene.urlHistoryMode.HISTORY</dt>
	 * <dd>"history"(デフォルト) … HTML5 History APIを使用してURLを変更する。History APIが使用できない場合はハッシュを使用する。</dd>
	 * <dt>h5.scene.urlHistoryMode.HISTORY_OR_HASH</dt>
	 * <dd>"historyOrHash" … "history"と同義。</dd>
	 * <dt>h5.scene.urlHistoryMode.HISTORY_OR_ERROR</dt>
	 * <dd>"historyOrError" … HTML5 History APIを使用してURLを変更する。History APIが使用できない場合はエラーとする。</dd>
	 * <dt>h5.scene.urlHistoryMode.HISTORY_OR_NONE</dt>
	 * <dd>"historyOrNone" … HTML5 History APIを使用してURLを変更する。History APIが使用できない場合はURLを変更せずに遷移する。</dd>
	 * <dt>h5.scene.urlHistoryMode.HISTORY_OR_FULLRELOAD</dt>
	 * <dd>"historyOrFullreload" … HTML5 History APIを使用してURLを変更する。History
	 * APIが使用できない場合はAjaxを使用せずに遷移する(通常遷移)。</dd>
	 * </dl>
	 *
	 * @memberOf h5.scene
	 * @name urlHistoryMode
	 */var URL_HISTORY_MODE={HASH:'hash',HISTORY:'history',NONE:'none',FULLRELOAD:'fullreload',HISTORY_OR_HASH:'historyOrHash',HISTORY_OR_ERROR:'historyOrError',HISTORY_OR_NONE:'historyOrNone',HISTORY_OR_FULLRELOAD:'historyOrFullreload'}; /**
	 * Router URL履歴保持方法(判定後)
	 */var URL_HISTORY_ACTUAL_MODE={HASH:'hash',HISTORY:'history',NONE:'none',FULLRELOAD:'fullreload'}; /**
	 * Router navigate動作モード指定
	 */var URL_HISTORY_MODE_ON_NAVIGATE={NONE:'none',FULLRELOAD:'fullreload',SILENT:'silent'}; // =============================
// Production
// =============================
var REMOTE_METHOD_INVOCATION='__h5__RMI';var REMOTE_METHOD_INVOCATION_RESULT='__h5__RMI_Result'; // エラーコード
/** エラーコード: scan関数の対象要素が単一でない */var ERR_CODE_SCAN_MULTIPLE_ELEMENT=100000; /** エラーコード: コンテナ生成時にカレントとなるシーン要素が見つからない */var ERR_CODE_CURRENT_SCENE_NOT_FOUND=100001; /** エラーコード: ロードしたHTML内に指定のコンテナが存在しない */var ERR_CODE_TARGET_CONTAINER_NOT_FOUND=100002; /** エラーコード: メインシーンコンテナを複数生成しようとした */var ERR_CODE_MAIN_CONTAINER_ALREADY_CREATED=100003; /** エラーコード: シーン遷移先に文字列以外を指定した */var ERR_CODE_CHANGE_SCENE_TO_IS_NOT_STRING=100004; /** エラーコード: シーン遷移先にハッシュを指定した */var ERR_CODE_CHANGE_SCENE_HASH_IN_TO=100005; /** エラーコード: メインシーンコンテナの遷移先にコントローラーを指定した(暫定対応) */var ERR_CODE_MAIN_CHANGE_SCENE_TO_IS_CONTROLLER=100006; /** エラーコード: シーンコンテナ生成済みの要素でシーンコンテナを作成しようとした */var ERR_CODE_CONTAINER_ALREADY_CREATED=100007; /** エラーコード: シーン遷移先HTMLのロードに失敗した */var ERR_CODE_HTML_LOAD_FAILED=100008; /** コンテナ生成済みマークがあるにも関わらず所定のコントローラーがバインドされていない */var ERR_CODE_CONTAINER_CONTROLLER_NOT_FOUND=100009; /** 遷移先URLが設定された最大長を超過した */var ERR_CODE_URL_LENGTH_OVER=100010; /** RouterでHistoryAPIが使えないためエラー */var ERR_CODE_HISTORY_API_NOT_AVAILABLE=100011; /** RouterでURL履歴保持方法指定が不正 */var ERR_CODE_URL_HISTORY_MODE_INVALID=100012; // =============================
// Development Only
// =============================
var fwLogger=h5.log.createLogger('h5.scene'); /* del begin */ /**
	 * 各エラーコードに対応するメッセージ
	 */var errMsgMap={};errMsgMap[ERR_CODE_SCAN_MULTIPLE_ELEMENT]='h5.scene.scan() の第1引数に複数要素は指定できません。単一要素で指定してください。';errMsgMap[ERR_CODE_CURRENT_SCENE_NOT_FOUND]='カレントとなるシーン要素が見つかりません。';errMsgMap[ERR_CODE_TARGET_CONTAINER_NOT_FOUND]='ロードしたHTMLに、指定されたコンテナ要素が見つかりません。to:{0} container:{1}';errMsgMap[ERR_CODE_MAIN_CONTAINER_ALREADY_CREATED]='メインシーンコンテナはすでに生成されているため、生成できません。';errMsgMap[ERR_CODE_CHANGE_SCENE_TO_IS_NOT_STRING]='シーン遷移先は文字列で指定してください。to:{0}';errMsgMap[ERR_CODE_CHANGE_SCENE_HASH_IN_TO]='シーン遷移先にハッシュは指定できません。to:{0}';errMsgMap[ERR_CODE_MAIN_CHANGE_SCENE_TO_IS_CONTROLLER]='現在、メインシーンコンテナのシーン遷移先にコントローラーは指定できません。to:{0}';errMsgMap[ERR_CODE_CONTAINER_ALREADY_CREATED]='対象要素ですでにシーンコンテナが生成されているため、生成できません。';errMsgMap[ERR_CODE_HTML_LOAD_FAILED]='シーン遷移先HTMLのロードに失敗しました。to:{0}';errMsgMap[ERR_CODE_CONTAINER_CONTROLLER_NOT_FOUND]='要素にコンテナ生成済みマークがあるにも関わらず所定のコントローラーがバインドされていません。';errMsgMap[ERR_CODE_URL_LENGTH_OVER]='遷移先URLが設定された最大長を超過しました。長さ:{0} 最大長:{1}';errMsgMap[ERR_CODE_HISTORY_API_NOT_AVAILABLE]='HistoryAPIが使用できない環境では処理できない設定になっています。';errMsgMap[ERR_CODE_URL_HISTORY_MODE_INVALID]='RouterのURL履歴保持方法指定が不正です。urlHistoryMode:{0}'; // メッセージの登録
addFwErrorCodeMap(errMsgMap); /* del end */ // =========================================================================
//
// Cache
//
// =========================================================================
var isDisposing=h5internal.core.isDisposing; // =========================================================================
//
// Privates
//
// =========================================================================
// =============================
// Variables
// =============================
/**
	 * シーン機能初回適用判定フラグ
	 */var isInited=false; /**
	 * シーン間パラメーター用デフォルトプレフィクス
	 */var clientQueryStringPrefix=h5.settings.scene.clientQueryStringPrefix; /**
	 * FW用シーン間パラメーター用デフォルトプレフィクス
	 */var clientFWQueryStringPrefix=h5.settings.scene.clientFWQueryStringPrefix; /**
	 * シーン間パラメーター用デフォルトプレフィクス正規表現用文字列
	 */var clientQueryStringPrefixForRegExp=null; /**
	 * FW用シーン間パラメーター用デフォルトプレフィクス正規表現用文字列
	 */var clientFWQueryStringPrefixForRegExp=null; /**
	 * Router URL履歴保持方法指定
	 */var urlHistoryMode=h5.settings.scene.urlHistoryMode; /**
	 * Router URL履歴保持方法(判定後)
	 */var urlHistoryActualMode=null; /**
	 * URL分割用正規表現
	 */var locationRegExp=/^(?:(\w+:)?\/\/(([^\/:]+)(?::(\d+))?))?((\/?.*?)([^\/]*?))(\?.*?)?(#.*)?$/; /**
	 * navigateの遷移先指定がコントローラーか否かを判断する正規表現
	 */var controllerRegexp=/Controller$/; /**
	 * メインシーンコンテナのシーン遷移先URLの最大長
	 */var urlMaxLength=null; /**
	 * 再表示不可画面URL/コントローラー
	 */var notReshowable=null; /**
	 * 再表示不可画面用メッセージ
	 */var notReshowableMessage=NOT_RESHOWABLE_MESSAGE; /**
	 * ベースURL
	 */var baseUrl=null; /**
	 * Routerインスタンス
	 */var router=null; // =============================
// Functions
// =============================
/**
	 * デフォルトシーンのシーンコントローラを取得する。
	 *
	 * @private
	 * @returns controller
	 */function getDefaultSceneController(){var bodyController=h5.core.controllerManager.getControllers(document.body)[0];return bodyController;} /**
	 * 対象要素配下のすべての要素にバインドされているコントローラーをdispseします。
	 *
	 * @private
	 * @param element 対象要素
	 */function disposeAllControllers(element){var controllers=h5.core.controllerManager.getControllers(element,{deep:true});for(var i=0,len=controllers.length;i<len;i++){if(!isDisposing(controllers[i])){controllers[i].dispose();}}} /**
	 * ルート要素自身も対象として走査します。
	 *
	 * @private
	 * @param target
	 * @param expr
	 * @returns {jQuery}
	 */function findWithSelf(target,expr){var self=$(target).filter(expr);var children=$(target).find(expr);if(self.length===0){return children;}else if(children.length===0){return self;}self=$.makeArray(self);children=$.makeArray(children);return $(self.concat(children));} /**
	 * data-h5-default-sceneでdata-h5-controller指定がない場合用のダミーコントローラー
	 */var DummyController={__name:'h5.scene.DummyController'}; /**
	 * 要素がシーン属性を持っているかをチェックします
	 *
	 * @private
	 * @param target
	 * @returns {Boolean}
	 */function isScene(target){return $(target).is('['+DATA_H5_DEFAULT_SCENE+'],['+DATA_H5_SCENE+']');} /**
	 * 要素の上方直近のシーン要素を取得します
	 *
	 * @private
	 * @param target
	 * @returns {Element}
	 */function getParentScene(target){var parentScene=$(target).closest('['+DATA_H5_DEFAULT_SCENE+'],['+DATA_H5_SCENE+']');return parentScene.length?parentScene.get(0):null;} /**
	 * 要素がコンテナ属性を持っているかをチェックします
	 * <p>
	 * body、mainタグがメインシーンコンテナの場合、事前にDATA_H5_MAIN_CONTAINERが付与されている前提
	 * </p>
	 *
	 * @private
	 * @param target
	 * @returns {Boolean}
	 */function isContainer(target){return $(target).is('['+DATA_H5_MAIN_CONTAINER+'],['+DATA_H5_CONTAINER+']');} /**
	 * 要素の上方直近のコンテナ要素を取得します
	 *
	 * @private
	 * @param target
	 * @returns {Element}
	 */function _getParentContainer(target){var parentContainer=$(target).closest('['+DATA_H5_MAIN_CONTAINER+'],['+DATA_H5_CONTAINER+']');return parentContainer.length?parentContainer.get(0):null;} /**
	 * 対象要素が指定シーン要素の直属であるかをチェックします
	 * <p>
	 * コンテナ化前の要素も存在するため、シーン属性のチェックのみでは判定できない
	 * </p>
	 *
	 * @private
	 * @param target
	 * @param scene
	 * @returns {Boolean}
	 */function checkScene(target,scene){ // TODO(鈴木) 同一ならtrue(両方nullは想定していない)
if(target===scene)return true; // TODO(鈴木) 対象要素上方直近のコンテナ要素
var targetContainer=_getParentContainer(target); // TODO(鈴木) 指定シーン要素のコンテナ要素。指定シーン要素がない場合はnull。
var container=scene?_getParentContainer(scene):null; // TODO(鈴木) コンテナ要素が一致しない場合はfalse
if(targetContainer!==container){return false;} // TODO(鈴木) 対象要素上方直近のシーン要素が、指定シーン要素に一致すればtrue、そうでなければfalse
return getParentScene(target)===scene;} /**
	 * 対象要素を配下を含めて走査し、DATA属性に基づいてコントローラーをバインド、およびシーンコンテナを生成します。
	 * <p>
	 * DATA属性については以下を参照してください。<br/>
	 * </p>
	 * <ul>
	 * <li><a href="/conts/web/view/reference/scene-spec">リファレンス（仕様詳細)&gt;&gt;画面遷移制御・履歴管理(シーン機能)仕様
	 * [ver.1.2]</a>
	 * <ul>
	 * <li><a
	 * href="/conts/web/view/reference/scene-spec#HHTML306E8A188FF0306B57FA30653044305F81EA52D5751F6210">HTMLの記述に基づいた自動生成</a></li>
	 * <li><a
	 * href="/conts/web/view/reference/scene-spec#HHTML89817D20306E8A188FF0306B57FA30653044305F30B330F330C830ED30FC30E9306E81EA52D530D030A430F330C9">
	 * HTML要素の記述に基づいたコントローラの自動バインド</a></li>
	 * </ul>
	 * </li>
	 * </ul>
	 * <p>
	 * 対象要素がシーンであり、かつコントローラーがバインドされていない場合にPromiseオブジェクトを返却します。
	 * その場合、コントローラーがロード・バインドされたタイミングでresolveが実行されます。 シーンに対応するコントローラーを取得したい場合に利用してください。
	 * </p>
	 * <p>
	 * シーンコンテナ要素配下は、デフォルトで表示されるシーン配下のみを対象とします。(現版ではシーンコンテナの複数シーンは未対応)
	 * このため、シーンコンテナ直下でないシーン要素は、シーンコンテナに所属していないとみなされ、その配下は処理対象とならないので注意が必要です。
	 * </p>
	 * <p>
	 * シーンコンテナ生成済み要素配下は走査対象となりません。追加要素を対象としたい場合ははその部分を指定するようにしてください。
	 * </p>
	 *
	 * @private
	 * @param {Element} [rootElement=document.body] 走査処理対象のルート要素。指定なしの場合はdocument.bodyをルート要素とします。
	 * @param {String} [controllerName]
	 *            バインド対象コントローラー名。指定なしの場合は'data-h5-controller'属性に指定されたすべてのコントローラーを対象とします。
	 * @param {Any} [args] 走査対象のルート要素がコンテナの場合、デフォルトで表示されるシーンコントローラー生成時に渡される引数を設定します。
	 * @returns {Promise} Promiseオブジェクト。詳細については当関数の説明を参照してください。
	 */function scan(rootElement,controllerName,args){ // TODO(鈴木) デフォルトをBODYにする実装を有効化
var root=rootElement?rootElement:document.body;var $root=$(root);if($root.length===0){return;} // TODO(鈴木) 対象要素は一つに限定
if($root.length!==1){throwFwError(ERR_CODE_SCAN_MULTIPLE_ELEMENT);} // TODO(鈴木) メインシーンコンテナができていない場合のみ実行。
// この時点でメインシーンコンテナにはdata-h5-main-scene-container属性があるようにする。
if(!mainContainer){var main=findWithSelf(root,'['+DATA_H5_MAIN_CONTAINER+']');if(main.length===0){main=findWithSelf(root,'main');if(main.length===0&&root===document.body){main=$(root);}if(main.length>0){main.eq(0).attr(DATA_H5_MAIN_CONTAINER,DATA_H5_MAIN_CONTAINER);}}} // TODO(鈴木) rootElementがシーンコンテナの場合
// この場合promiseは返さない
// createSceneContainer→scanForContainer→scanとなり再帰になる
if($root.is('['+DATA_H5_CONTAINER+']')){createSceneContainer(root);return;}else if($root.is('['+DATA_H5_MAIN_CONTAINER+']')){createSceneContainer(root,true);return;} // TODO(鈴木) 以下、rootElementがシーンコンテナでない場合
// TODO(鈴木) シーンコントローラーをresolveで返却すべきか否か
// scanがシーン要素を対象としており、コントローラーがバインドされていない場合に返却する
var resolveSceneController=isScene(root)&&!alreadyBound(root);var dfd=resolveSceneController?h5.async.deferred():null; // 処理対象となるシーン要素取得(自身か、上方直近のシーン要素)
var currentScene=isScene(root)?root:getParentScene(root); // TODO(鈴木) シーンコントローラーが見つかったか
var isFound=false; // TODO(鈴木) コントローラーのバインド
findWithSelf(root,'['+DATA_H5_CONTROLLER+']').each(function(){var attrControllers=this.getAttribute(DATA_H5_CONTROLLER);var attrControllerNameList=attrControllers.split(',');for(var i=0,len=attrControllerNameList.length;i<len;i++){ // TODO(鈴木) getFullnameの仕様不明のため暫定回避
//var attrControllerName = getFullname($.trim(attrControllerNameList[i]));
var attrControllerName=$.trim(attrControllerNameList[i]);if(attrControllerName===''){ // trimした結果空文字になる場合は何もしない
return true;}if(controllerName&&attrControllerName!==controllerName){ // バインドしたいコントローラが指定されていて、その指定と異なっている場合は次を検索
return true;} // 既に「同じ名前の」コントローラがバインドされていたら何もしない
if(!alreadyBound(this,attrControllerName)){ // TODO(鈴木) 対象シーン要素直属でなければ処理しない
if(!checkScene(this,currentScene)){return true;} // TODO(鈴木) 対象シーンのシーンコントローラーであるか否か
var isCurrent=false; //TODO(鈴木) シーンコントローラーを返却する必要がある場合で、また見つかっておらず、
// 処理対象が対象シーン要素自体である場合。
// isFoundフラグにより、同一要素複数コントローラーの場合は、先頭のコントローラーのみ対象となる
if(resolveSceneController&&!isFound&&this===root){isFound=true;isCurrent=true;}markBoundController(this,attrControllerName); // TODO(鈴木) デフォルトのシーンコントローラーである場合のみパラメータを渡す
var loadControllerPromise=loadController(attrControllerName,this,isCurrent?args:null); //TODO(鈴木) デフォルトのシーンコントローラーである場合のみ、コントローラーをresolveで返す
if(isCurrent){loadControllerPromise.done(function(controller){dfd.resolve(controller);});}}}}); // TODO(鈴木) シーンコンテナの探索と生成
$root.find('['+DATA_H5_MAIN_CONTAINER+'],['+DATA_H5_CONTAINER+']').each(function(){ // TODO(鈴木) 対象シーン要素直属でなければ処理しない
if(checkScene(this,currentScene)){return true;}var $container=$(this);if($container.is('['+DATA_H5_MAIN_CONTAINER+']')){createSceneContainer(this,true);}else if($container.is('['+DATA_H5_CONTAINER+']')){createSceneContainer(this);}});if(resolveSceneController){return dfd.promise();}return;} /**
	 * コントローラーがバインド済みであるかをチェックします
	 *
	 * @private
	 * @param element
	 * @param controllerName
	 * @returns {Boolean}
	 */function alreadyBound(element,controllerName){ // TODO
// 一時しのぎ、getControllers()でバインド途中のコントローラも取得できるようにすべき
// var controllers = h5.core.controllerManager.getControllers(element);
var controllers=$(element).attr(DATA_H5_DYN_CONTROLLER_BOUND);if(!controllers)return false;controllers=controllers.split(','); // controllerNameが指定されない場合は、何らかのコントローラーがバインドされていればtrueを返す
if(!controllerName&&controllers.length>0){return true;}for(var i=0;i<controllers.length;i++){ // if(controllers[i].__name === controllerName){
if($.trim(controllers[i])===controllerName){return true;}}return false;} /**
	 * コントローラーがバインドされたことをマークします(暫定)
	 *
	 * @private
	 * @param target
	 * @param name
	 */function markBoundController(target,name){var attr=$(target).attr(DATA_H5_DYN_CONTROLLER_BOUND)||'';if(attr)attr+=',';attr+=name;$(target).attr(DATA_H5_DYN_CONTROLLER_BOUND,attr);} /**
	 * scan関数分割。シーンコンテナを作成用です。
	 * <p>
	 * カレントシーンとなる要素の探索と、コントローラー指定なしの場合のダミーコントローラーバインドを行います。
	 * </p>
	 *
	 * @private
	 * @param rootElement
	 * @param controllerName
	 * @param args
	 * @returns {Promise}
	 */function scanForContainer(rootElement,controllerName,args){var root=rootElement?rootElement:document.body;var dfd=h5.async.deferred();var isFound=false;var dummyController=null; // TODO(鈴木) data-h5-default-scene属性を持つ要素が直下に存在するかの確認
var defaultSceneElm=$(root).find('>['+DATA_H5_DEFAULT_SCENE+']'); // TODO(鈴木) 先頭要素がdata-h5-controllerを属性持っていない場合、ダミーのコントローラーをバインドしてresolve
if(defaultSceneElm.length>0){var elm=defaultSceneElm.eq(0);if(!alreadyBound(elm)){isFound=true;if(!elm.is('['+DATA_H5_CONTROLLER+']')){markBoundController(elm,DummyController.__name);dummyController=h5.core.controller(elm,DummyController,args);dfd.resolve(dummyController);}}} // TODO(鈴木) data-h5-default-scene属性を持つ該当要素が見つからなかった場合
if(!isFound){ // TODO(鈴木) data-h5-scene属性を持つ要素が直下先頭に存在するかの確認
var sceneElm=$(root).children().eq(0).filter('['+DATA_H5_SCENE+']');if(sceneElm.length>0){if(!alreadyBound(sceneElm)){isFound=true;sceneElm.attr(DATA_H5_DEFAULT_SCENE,DATA_H5_DEFAULT_SCENE);defaultSceneElm=sceneElm; //TODO(鈴木) 先頭要素がdata-h5-controllerを属性持っていない場合、ダミーのコントローラーをバインドしてresolve
if(!sceneElm.is('['+DATA_H5_CONTROLLER+']')){markBoundController(sceneElm,DummyController.__name);dummyController=h5.core.controller(sceneElm,DummyController,args);dfd.resolve(dummyController);}}}} // TODO(鈴木) カレントとなるシーン要素が見つからない場合はエラー
if(!isFound){throwFwError(ERR_CODE_CURRENT_SCENE_NOT_FOUND);} // TODO(鈴木) カレントとなるシーン要素のみscan
var promise=scan(defaultSceneElm.get(0),controllerName,args); // TODO(鈴木) デフォルトコントローラーがバインド・返却されていなければscanの結果を使用する
if(!isResolved(dfd)){promise.done(function(controller){dfd.resolve(controller);});}return dfd.promise();} /**
	 * コントローラーファイルのロードとコントローラーの生成
	 *
	 * @private
	 * @param name
	 * @param rootElement
	 * @param args
	 * @returns {Promise}
	 */function loadController(name,rootElement,args){var dfd=h5.async.deferred();h5.res.get(name).then(function(Controller){var controller=h5.core.controller(rootElement,Controller,args);dfd.resolve(controller);});return dfd.promise();}function TypedMessage(type,data){this.type=type;this.data=data;}function MessageChannel(type,targetWindow){this.type=type;this._targetWindow=targetWindow;this._closed=false;this._subscribers=[];var that=this;this._recv=function(event){that._receiveMessage(event.originalEvent);};$(window).on('message',this._recv);}h5.mixin.eventDispatcher.mix(MessageChannel.prototype);$.extend(MessageChannel.prototype,{send:function send(data){if(this._closed){ // TODO fwErrorを投げる
alert('クローズ済みのチャネルです。送信できません。');return;}var msg=new TypedMessage(this.type,data);var msgSerialized=h5.u.obj.serialize(msg); // TODO originを指定できるようにする, IE8-にoriginがないので対応が必要
this._targetWindow.postMessage(msgSerialized,location.origin);},subscribe:function subscribe(func,thisObj){var s={func:func,thisObj:thisObj?thisObj:null};this._subscribers.push(s);},close:function close(){this._closed=true;this.off(window,'message',this._recv);},_receiveMessage:function _receiveMessage(event){var msg;try{msg=h5.u.obj.deserialize(event.data);if(msg.type!==this.type){return;}}catch(e){fwLogger.debug('メッセージをデシリアライズできませんでした。無視します。');return;}var subers=this._subscribers;for(var i=0,len=subers.length;i<len;i++){var s=subers[i];s.func.call(s.thisObj,msg.data);}var ev={type:'message',data:msg.data};this.dispatchEvent(ev);}}); // type:String -> MessageChannelインスタンス
var singletonMessageChannelMap={}; /**
	 * type毎に一意なMessageChannelインスタンスを取得する。
	 *
	 * @returns channel
	 */function getMessageChannel(type,win){var channel=singletonMessageChannelMap[type];if(!channel){channel=new MessageChannel(type,win);singletonMessageChannelMap[type]=channel;}return channel;} // =========================================================================
//
// Classes
//
// =========================================================================
// =============================
// RemoteInvocation
// =============================
var RMI_STATUS_SUCCESS=0;var RMI_STATUS_EXCEPTION=1;var RMI_STATUS_ASYNC_RESOLVED=2;var RMI_STATUS_ASYNC_REJECTED=3;var RMI_STATUS_METHOD_NOT_FOUND=4;function RMIReceiver(){this._recvChannel=new MessageChannel(REMOTE_METHOD_INVOCATION,window.opener);this._recvChannel.subscribe(this._receive,this);this._sendChannel=new MessageChannel(REMOTE_METHOD_INVOCATION_RESULT,window.opener);}$.extend(RMIReceiver.prototype,{_receive:function _receive(data){var controller=getDefaultSceneController();var id=data.id;var method=data.method;var args=data.args;if(!controller[method]||isFunction(controller[method])){this._callFunction(id,controller,method,args);}else {this._sendChannel.send({id:id,isAsync:false,status:RMI_STATUS_METHOD_NOT_FOUND,result:null});}},_callFunction:function _callFunction(id,controller,method,args){args=wrapInArray(args);var ret=undefined;try{ret=controller[method].apply(controller,args);}catch(e){this._sendChannel.send({id:id,isAsync:false,status:RMI_STATUS_EXCEPTION,result:null});return;}var that=this; // TODO コード整理
if(h5.async.isPromise(ret)){ret.done(function() /* var_args */{var value=h5.u.obj.argsToArray(arguments);that._sendChannel.send({id:id,isAsync:true,status:RMI_STATUS_ASYNC_RESOLVED,result:value});}).fail(function() /* var_args */{var value=h5.u.obj.argsToArray(arguments);that._sendChannel.send({id:id,isAsync:true,status:RMI_STATUS_ASYNC_REJECTED,result:value});});}else {this._sendChannel.send({id:id,isAsync:false,status:RMI_STATUS_SUCCESS,result:ret});}}}); // =============================
// RemoteInvocation
// =============================
function RemoteMethodInvocation(targetWindow){this.targetWindow=targetWindow; // TODO channel id は一意になるように生成する
this.id='FIXME'; // TODO channelはmessageイベントを1つだけonしてハンドラを共有する
// id -> dfd
this._invocationMap={}; // TODO createSequenceは別ファイルにしたい
this._invocationSeq=h5.core.data.createSequence(1,1,h5.core.data.SEQ_INT); // TODO MessageChannelは、同一ウィンドウ、かつ、同一チャネルにのみ伝わるようにすべき(channel idの導入)
this._sendChannel=getMessageChannel(REMOTE_METHOD_INVOCATION,targetWindow);this._recvChannel=getMessageChannel(REMOTE_METHOD_INVOCATION_RESULT,targetWindow);this._recvChannel.subscribe(this._receive,this);}$.extend(RemoteMethodInvocation.prototype,{invoke:function invoke(method,args){var dfd=h5.async.deferred();var data={id:this._invocationSeq.next(),method:method,args:args};this._invocationMap[data.id]=dfd;this._sendChannel.send(data);return dfd.promise();},_receive:function _receive(data){var id=data.id;var dfd=this._invocationMap[id];if(!dfd){ // TODO fwLogger
return;}delete this._invocationMap[id];var ret=data.result;var isAsync=data.isAsync;var status=data.status;if(!isAsync){if(status===RMI_STATUS_SUCCESS){dfd.resolve(ret);}else {dfd.reject();}}else {if(status===RMI_STATUS_ASYNC_RESOLVED){dfd.resolve.apply(dfd,ret);}else {dfd.reject.apply(dfd,ret);}}}}); // =============================
// Router
// =============================
/**
	 * Router
	 * <p>
	 * 暫定実装。
	 * </p>
	 * <p>
	 * URLのチェック対象となるのは、HirtoryAPI使用の場合はドメインルートより後、Hash使用の場合はHash(#より後)を対象とし、先頭からベースURLを除いたものです。
	 * (ただし、Hash使用の場合でもHash値がない場合はドメインルートより後を使用) (これをここでは「ルーターURL」と呼称します)
	 * </p>
	 * <p>
	 * ルーティングルールは引数optionのroutesプロパティに以下の形式の配列を指定します。
	 * </p>
	 *
	 * <pre>
	 * [{test:(文字列|正規表現|関数)}, func:(対応処理関数)}, ...]
	 * </pre>
	 *
	 * <p>
	 * testには、URLをチェックするためのルールを以下の様に指定します。
	 * </p>
	 * <dl>
	 * <dt>文字列の場合</dt>
	 * <dd>ルーターURLすべてを指定。(完全一致。パラメーター以下もすべて指定)</dd>
	 * <dt>正規表現の場合</dt>
	 * <dd>ルーターURLとマッチする正規表現を指定</dd>
	 * <dt>関数の場合</dt>
	 * <dd>ルーターURLを仮引数とし、対象の場合true、対象外の場合falseを返却する関数を指定</dd>
	 * </dl>
	 *
	 * @private
	 * @class
	 * @param {Object} [option]
	 * @param {Boolean} [option.urlHistoryMode] URL履歴保持方法指定
	 * @param {String} [option.baseUrl] ベースURL
	 * @param {Integer} [option.urlMaxLength=1800] 遷移先URL最大長
	 * @param {Array} [option.routes] ル���ティングルール。詳細は上述。
	 * @returns {Router} Routerインスタンス
	 */function Router(option){option=option||{};var self; // TODO(鈴木) Routerはシングルトン実装とする。
if(!Router._instance){self=Router._instance=this;var pushSate=!!window.history.pushState;self.urlHistoryMode=option.urlHistoryMode||URL_HISTORY_MODE.HISTORY; // TODO(鈴木) URL履歴保持方法判定
switch(self.urlHistoryMode){case URL_HISTORY_MODE.HASH:self.urlHistoryActualMode=URL_HISTORY_ACTUAL_MODE.HASH;break;case URL_HISTORY_MODE.NONE:self.urlHistoryActualMode=URL_HISTORY_ACTUAL_MODE.NONE;break;case URL_HISTORY_MODE.FULLRELOAD:self.urlHistoryActualMode=URL_HISTORY_ACTUAL_MODE.FULLRELOAD;break;case URL_HISTORY_MODE.HISTORY:case URL_HISTORY_MODE.HISTORY_OR_HASH:case URL_HISTORY_MODE.HISTORY_OR_ERROR:case URL_HISTORY_MODE.HISTORY_OR_NONE:case URL_HISTORY_MODE.HISTORY_OR_FULLRELOAD: // TODO(鈴木) History APIが使用可能である場合
if(pushSate){self.urlHistoryActualMode=URL_HISTORY_ACTUAL_MODE.HISTORY;}} // TODO(鈴木) HISTORY*指定でHistory APIが使用不可である場合
if(!self.urlHistoryActualMode&&!pushSate){ // TODO(鈴木) URL履歴保持方法判定
switch(self.urlHistoryMode){case URL_HISTORY_MODE.HISTORY_OR_ERROR: // TODO(鈴木) HistoryAPIが使用できない環境では処理できない
throwFwError(ERR_CODE_HISTORY_API_NOT_AVAILABLE);return;case URL_HISTORY_MODE.HISTORY:case URL_HISTORY_MODE.HISTORY_OR_HASH:self.urlHistoryActualMode=URL_HISTORY_ACTUAL_MODE.HASH;break;case URL_HISTORY_MODE.HISTORY_OR_NONE:self.urlHistoryActualMode=URL_HISTORY_ACTUAL_MODE.NONE;break;case URL_HISTORY_MODE.HISTORY_OR_FULLRELOAD:self.urlHistoryActualMode=URL_HISTORY_ACTUAL_MODE.FULLRELOAD;break;}}if(!self.urlHistoryActualMode){ // Router URL履歴保持方法指定が不正
throwFwError(ERR_CODE_URL_HISTORY_MODE_INVALID,self.urlHistoryMode);}if(option.baseUrl){var urlHelper=new UrlHelper(option.baseUrl);self._baseUrl=urlHelper.pathname.replace(/^\/?(.*?)\/?$/,'/$1/');}self._urlMaxLength=option.urlMaxLength||URL_MAX_LENGTH; // TODO(鈴木) on/off用にthisをバインド
var _onChange=self._onChange;self._onChange=function(){return _onChange.apply(self,arguments);};}else {self=Router._instance;} // TODO(鈴木) 2回目以降のインスタンス生成時はroutesをマージするのみ、その他のパラメーターは無視
if(option.routes){self._routes=self._routes.concat(option.routes);}return self;}var RouterPrototype={ /**
		 * ルーティングルール
		 *
		 * @private
		 * @memberOf Router
		 */_routes:[], /**
		 * ベースURL
		 *
		 * @private
		 * @memberOf Router
		 */_baseUrl:null, /**
		 * URL監視フラグ
		 *
		 * @private
		 * @memberOf Router
		 */_started:false, /**
		 * URL最大長
		 *
		 * @private
		 * @memberOf Router
		 */_urlMaxLength:null, /**
		 * hashChange時コールバック抑制フラグ
		 *
		 * @private
		 * @memberOf Router
		 */_silentOnce:false, /**
		 * Router URL履歴保持方法指定
		 *
		 * @private
		 * @memberOf Router
		 */urlHistoryMode:null, /**
		 * Router URL履歴保持方法(判定後)
		 *
		 * @private
		 * @memberOf Router
		 */urlHistoryActualMode:null, /**
		 * URL変更なしでの対応関数実行 URL文字列保持用
		 *
		 * @private
		 * @memberOf Router
		 */_urlForSimulate:null, /**
		 * URL変化時コールバック
		 *
		 * @private
		 * @memberOf Router
		 */_onChange:function _onChange(){ // TODO(鈴木) hash変更時にhashchangeを無視する場合
if(this._silentOnce){this._silentOnce=false;return;}var current;var contextualData=null;if(this._urlForSimulate){ // TODO(鈴木) URLを変更せずに対応処理を実行する場合(evaluate経由)
current=this._urlForSimulate; // TODO(鈴木) contextualDataはこの場合でのみ使用可能
contextualData=this._contextualData;this._urlForSimulate=this._contextualData=null;}else { // TODO(鈴木) 通常は現URLから情報を取得
var routerLocation=this._getRouterLocation();current=routerLocation.pathname+routerLocation.search;} // TODO(鈴木) ルーティングルールとの突合用にベースURLを除去
var forTest=this._removeBaseUrl(current);var result=null; // TODO(鈴木) ルーティングテーブル探査
for(var i=0;i<this._routes.length;i++){var route=this._routes[i];if(isString(route.test)){ // ルールが文字列の場合
if(forTest===route.test){result=route.func(current,contextualData);break;}}else if(route.test instanceof RegExp){ // ルールが正規表現の場合
if(route.test.test(forTest)){result=route.func(current,contextualData);break;}}else if(typeof route.test==='function'){ // ルールが関数の場合
if(route.test(forTest)){result=route.func(current,contextualData);break;}}} // TODO(鈴木) 対応関数実行時に返却値がある場合
if(result){this.evaluate(result,contextualData);}}, /**
		 * URL監視の開始
		 *
		 * @memberOf Router
		 * @param {Object} [option]
		 * @param {Boolean} [option.silent=false] 監視開始時にその時点のURLに対応した処理を実行しない場合にtrueを指定する。
		 */start:function start(option){option=option||{};if(this._started)return;this._checkUrlLength(location.href,{throwOnError:true});this._started=true;if(!option||!option.silent){this._onChange();}switch(this.urlHistoryActualMode){case URL_HISTORY_ACTUAL_MODE.HASH:$(window).on('hashchange',this._onChange);break;case URL_HISTORY_ACTUAL_MODE.HISTORY:$(window).on('popstate',this._onChange);break;}}, /**
		 * URL変更
		 *
		 * @memberOf Router
		 * @param {String} to 遷移先指定
		 * @param {Object} [option]
		 * @param {Boolean} [option.replaceHistory=false] 前の画面の履歴を残さずに遷移する場合にtrueを指定する。
		 * @param {String} [option.mode] 動作モード指定
		 */navigate:function navigate(to,option){option=option||{};if(!this._started){return;}this._checkUrlLength(to,{throwOnError:true});var silent=false,mode=this.urlHistoryActualMode; // TODO(鈴木) 動作モード判定
switch(option.mode){case URL_HISTORY_MODE_ON_NAVIGATE.SILENT:silent=true;break;case URL_HISTORY_MODE_ON_NAVIGATE.NONE:mode=URL_HISTORY_ACTUAL_MODE.NONE;break;case URL_HISTORY_MODE_ON_NAVIGATE.FULLRELOAD:mode=URL_HISTORY_ACTUAL_MODE.FULLRELOAD;break;}var result=this._toAbusolute(to); // TODO(鈴木) URL履歴保持方法指定に合わせた処理
// 遷移先URLが現在と同一の場合、NONE以外のケースで、
// 「現URLに対応した処理を実行、ブラウザ履歴は追加しない」
// という動作にする。
//
// ・HistoryAPI pushStateは、同一URLでもブラウザ履歴が追加される。
//   その後のブラウザバックでpopstateも発生する。
// ・hash使用の場合は同一URLではブラウザ履歴は追加されず、hashchangeも発生しない。
// ・href使用の場合は同一URLではブラウザ履歴は追加されないが、通常画面更新は発生する。
//   が、URLにハッシュがついていると、画面更新は発生しない。(スクロールのみ)
//
// これらの差異を吸収するよう実装する。
switch(mode){case URL_HISTORY_ACTUAL_MODE.HASH:if(silent){this._silentOnce=true;} //TODO #449 パラメーター順序違いを考慮した同一性の判定については要検討
if(this.compareUrl(result)){this._onChange();}else {if(option.replaceHistory){location.replace('#'+result);}else {location.hash=result;}}break;case URL_HISTORY_ACTUAL_MODE.HISTORY:if(silent){this._silentOnce=true;} //TODO #449 パラメーター順序違いを考慮した同一性の判定については要検討
if(this.compareUrl(result)){this._onChange();}else {if(option.replaceHistory){history.replaceState(null,null,result);}else {history.pushState(null,null,result);}this._onChange();}break;case URL_HISTORY_ACTUAL_MODE.FULLRELOAD: //TODO #449 パラメーター順序違いを考慮した同一性の判定については要検討
if(this.compareUrl(result)){ //TODO(鈴木) URLにHashが付いていても再表示する
location.reload();}else if(option.replaceHistory){location.replace(result);}else {location.href=result;}break;case URL_HISTORY_ACTUAL_MODE.NONE:this.evaluate(result);break;}return;}, /**
		 * URL監視の停止
		 *
		 * @memberOf Router
		 */stop:function stop(){if(!this._started)return;this._started=false;switch(this.urlHistoryActualMode){case URL_HISTORY_ACTUAL_MODE.HASH:$(window).off('hashchange',this._onChange);break;case URL_HISTORY_ACTUAL_MODE.HISTORY:$(window).off('popstate',this._onChange);break;}}, /**
		 * URL長のチェック
		 * <p>
		 * 指定のURLに遷移した場合、URL全体で設定された最大長を超過しないかをチェックします。 HistroyAPI使用の場合とHash使用の場合で長さは異なるので注意してください。
		 * </p>
		 *
		 * @private
		 * @memberOf Router
		 * @param {String} url
		 * @param {Object} [option]
		 * @param {Boolean} [option.writeBack=false] チェック結果詳細を仮引数のオブジェクトに書き込む場合にtrue。
		 *            ※現時点では使用していない。将来的にメソッドを公開した場合での使用を想定。
		 * @param {Boolean} [option.throwOnError=false] チェックエラー時に例外をスローする場合にtrue。dev版のみ有効。min版では無効。
		 * @returns {Boolean} チェック結果
		 */_checkUrlLength:function _checkUrlLength(url,option){option=option||{};if(this._urlMaxLength==null){return true;}var urlHelper=new UrlHelper(url);if(urlHelper.protocol){ // プロトコル指定ありの場合はそのままチェック。
return url.length<=this._urlMaxLength;}var result=this._toAbusolute(url);if(this.urlHistoryActualMode===URL_HISTORY_ACTUAL_MODE.HASH){var path=window.location.pathname;var search=window.location.search||'';result=path+search+'#'+result;}result=toAbsoluteUrl(result);if(option.writeBack){option.url=result;option.urlLength=result.length;option.urlMaxLength=this._urlMaxLength;}if(result.length<=this._urlMaxLength){return true; /* del begin */}else if(option.throwOnError){ // 遷移先URLが設定された最大長を超過した
throwFwError(ERR_CODE_URL_LENGTH_OVER,[result.length,this._urlMaxLength]);return false; /* del end */}else {fwLogger.warn(ERR_CODE_URL_LENGTH_OVER,result.length,this._urlMaxLength);return false;}}, /**
		 * ベースディレクトリの取得
		 *
		 * @memberOf Router
		 * @returns {String}
		 */_getBaseDir:function _getBaseDir(){if(this._baseUrl){return this._baseUrl;}var routerLocation=this._getRouterLocation();return routerLocation.dir;}, /**
		 * 先頭のベースURLを取り除いたURLを返却
		 *
		 * @private
		 * @memberOf Router
		 * @param {String} url
		 * @returns {String}
		 */_removeBaseUrl:function _removeBaseUrl(url){var baseUrl=this._baseUrl;if(baseUrl&&url.indexOf(baseUrl)===0){url=url.replace(baseUrl,'');}return url;}, /**
		 * URL変更なしでの対応処理実行
		 *
		 * @memberOf Router
		 * @param {String} url
		 * @param {Any} contextualData
		 */evaluate:function evaluate(url,contextualData){var result=this._toAbusolute(url);this._urlForSimulate=result;this._contextualData=contextualData;this._onChange();}, /**
		 * 相対アドレスの絶対アドレスへの変換
		 *
		 * @private
		 * @memberOf Router
		 * @param {String} url
		 * @returns {String}
		 */_toAbusolute:function _toAbusolute(url){var wk=null;var urlHelper=new UrlHelper(url);var routerLocation=this._getRouterLocation();if(urlHelper.isSearch()){wk=routerLocation.pathname+urlHelper.search+urlHelper.hash;}else if(urlHelper.isHash()){wk=routerLocation.pathname+routerLocation.search+urlHelper.hash;}else {wk=urlHelper.pathname+urlHelper.search+urlHelper.hash;if(wk.indexOf('/')!==0){var base=this._getBaseDir();wk=base+wk;}}wk=toAbsoluteUrl(wk);urlHelper=new UrlHelper(wk);var result=urlHelper.pathname+urlHelper.search+urlHelper.hash;return result;}, /**
		 * URLの比較
		 * <p>
		 * 第二引数を指定しない場合、現時点のURLと比較します。
		 * </p>
		 *
		 * @memberOf Router
		 * @param {String} sbj 比較するURL
		 * @param {String} [obj] 比較するURL。指定しない場合は、現時点のURLを対象とする。
		 * @returns {Boolean} 同一の場合はtrue、異なる場合はfalse
		 */compareUrl:function compareUrl(sbj,obj){if(obj==null){var routerLocation=this._getRouterLocation();obj=routerLocation.pathname+routerLocation.search;}if(sbj.indexOf('/')!==0){sbj=this._toAbusolute(sbj);}if(obj.indexOf('/')!==0){obj=this._toAbusolute(obj);}return sbj===obj;}, /**
		 * 現時点のURLの取得
		 * <p>
		 * HirtoryAPI使用の場合はドメインルートより後、Hash使用の場合はHash(#より後)を使用し、UrlHelperで返却します。
		 * (ただし、Hash使用の場合でもHash値がない場合はドメインルートより後を使用します)
		 * </p>
		 *
		 * @private
		 * @memberOf Router
		 * @returns {UrlHelper}
		 */_getRouterLocation:function _getRouterLocation(){var urlHelper;if(this.urlHistoryActualMode===URL_HISTORY_ACTUAL_MODE.HASH&&location.hash){urlHelper=new UrlHelper(location.hash.substring(1));}else {urlHelper=new UrlHelper(location.href);}return urlHelper;}};$.extend(Router.prototype,RouterPrototype); // =============================
// URL Helper
// =============================
/**
	 * UrlHelper
	 * <p>
	 * 暫定実装。
	 * </p>
	 *
	 * @private
	 * @class
	 * @param {String} url
	 * @returns {UrlHelper}
	 */function UrlHelper(url){if(url==null){return;}var match=url.match(UrlHelper.regExp);this.href=match[0]||'';this.protocol=match[1]||'';this.host=match[2]||'';this.hostname=match[3]||'';this.port=match[4]||'';this.pathname=match[5]||'';this.dir=match[6]||'';this.file=match[7]||'';this.search=match[8]||'';this.hash=match[9]||'';}$.extend(UrlHelper.prototype,{ /**
		 * @memberOf UrlHelper
		 */href:undefined, /**
		 * @memberOf UrlHelper
		 */protocol:undefined, /**
		 * @memberOf UrlHelper
		 */host:undefined, /**
		 * @memberOf UrlHelper
		 */hostname:undefined, /**
		 * @memberOf UrlHelper
		 */port:undefined, /**
		 * @memberOf UrlHelper
		 */pathname:undefined, /**
		 * @memberOf UrlHelper
		 */dir:undefined, /**
		 * @memberOf UrlHelper
		 */file:undefined, /**
		 * @memberOf UrlHelper
		 */search:undefined, /**
		 * @memberOf UrlHelper
		 */hash:undefined, /**
		 * @memberOf UrlHelper
		 */isSearch:function isSearch(){return !this.protocol&&!this.host&&!this.pathname&&this.search;}, /**
		 * @memberOf UrlHelper
		 */isHash:function isHash(){return !this.protocol&&!this.host&&!this.pathname&&!this.search&&this.hash;}});UrlHelper.regExp=locationRegExp; // =========================================================================
//
// Body
//
// =========================================================================
// 子ウィンドウの場合
if(window.opener){new RMIReceiver();} /**
	 * シーンクラス
	 * <p>
	 * コントローラ化の際に、コントローラに"scene"プロパティが追加され、コントローラごとに生成されるこのクラスのインスタンスが格納されます
	 * </p>
	 *
	 * @class
	 * @name Scene
	 */ /**
	 * @private
	 * @param {Controller} controller
	 */function Scene(controller){this.__controller=controller;}$.extend(Scene.prototype,{ /**
		 * シーン遷移イベントを発行します。
		 * <p>
		 * 第1引数には、{@link SceneContainerController.navigate}の引数と同じ形式でパラメータを指定してください。
		 * </p>
		 *
		 * @param {String|Object} data
		 * @memberOf Scene
		 */navigate:function navigate(data){if(isDisposing(this.__controller)){ // TODO エラー
return;}this.__controller.trigger(EVENT_SCENE_CHANGE_REQUEST,data);}, /**
		 * このコントローラを直接包含しているシーンコンテナを取得します。
		 * <p>
		 * シーンコンテナ要素が存在しない、またはシーンコンテナ未生成の場合はnullを返却します。
		 * </p>
		 *
		 * @returns {SceneContainerController} シーンコンテナ
		 * @memberOf Scene
		 */getParentContainer:function getParentContainer(){if(isDisposing(this.__controller)){return null;}var element=_getParentContainer(this.__controller.rootElement);if(!element){return null;}return getSceneContainers(element)[0];}});function InvocationProxy(){ // 空コンストラクタ
}function RemoteWindow(url,windowName,features,isModal){var win=window.open(url,windowName,features);this.window=win;this._isModal=false;this._parentBlocker=null;this.setModal(isModal===true?true:false);this._rmi=new RemoteMethodInvocation(win);this._watchChild();}$.extend(RemoteWindow.prototype,{invoke:function invoke(method,args){return this._rmi.invoke(method,args);},getControllerProxy:function getControllerProxy(selector){var proxy=new InvocationProxy();return proxy;},setModal:function setModal(value){if(this._isModal==value){return;} // TODO 外部化
// h5.messageBundle.scene.MODAL_NOTICE = '子ウィンドウを開いている間は操作できません';
var message='子ウィンドウを開いている間は操作できません。';if(this._isModal){ // true -> false なので親ウィンドウのブロックを外す
this._parentBlocker.hide();this._parentBlocker=null;}else { // false -> trueなので親ウィンドウをブロックする
this._parentBlocker=h5.ui.indicator({target:'body',block:true,message:message,showThrobber:false}).show();}this._isModal=value;},close:function close(){var dfd=h5.async.deferred();this.window.close();return dfd.promise();},_watchChild:function _watchChild(){var that=this; // TODO setModal(false)のときは監視しないようにする
function watch(){if(that.window.closed){clearInterval(tid);that.setModal(false);}}var tid=setInterval(watch,300);}}); // TODO(鈴木) シーンクラス削除
/**
	 * 別ウィンドウをオープンします。
	 *
	 * @private
	 * @param url
	 * @param name
	 * @param features
	 * @param isModal
	 * @param controllerName
	 * @param param
	 * @returns {Promise} プロミス。完了するとRemoteWindowオブジェクトを返します。
	 */function openWindow(url,name,features,isModal,controllerName,args){var dfd=h5.async.deferred();var remote=new RemoteWindow(url,name,features,isModal); // FIXME window側のURLのロードが完了し、存在する場合にコントローラのreadyが完了したらresolve
setTimeout(function(){dfd.resolve(remote);},100);return dfd.promise();} // TODO(鈴木) シーンタイプ関連実装削除
/**
	 * HTMLコメント削除用正規表現
	 */var htmlCommentRegexp=/<!--(?:\s|\S)*?-->/g; /**
	 * BODYタグ内容抽出用正規表現
	 */var bodyTagRegExp=/<body\b([^>]*)>((?:\s|\S)*?)(?:<\/body\s*>|<\/html\s*>|$)/i; /**
	 * HTML文字列からBODYタグ内容部分抽出
	 * <p>
	 * BODYタグがある場合、戻り値はDIVタグで囲む。<br>
	 * BODYタグの属性をそのDIVに追加する。(既存BODYタグの属性を操作することはしない)<br>
	 * data-main-container属性を追加する。<br>
	 * </p>
	 * <p>
	 * BODYタグがない場合は文字列をそのまま返す。
	 * </p>
	 *
	 * @private
	 * @param html
	 * @returns {String}
	 */function extractBody(html){ // TODO(鈴木) この場合HTMLコメントは消える。HTMLコメント内にbodyタグがない前提であれば楽だが。。
// HTMLコメントも保存するよう実装すべきか？
var match=html.replace(htmlCommentRegexp,'').match(bodyTagRegExp);if(match){return '<div '+DATA_H5_DYN_DUMMY_BODY+' '+match[1]+'>'+match[2]+'</div>';}return html;} /**
	 * 直下先頭要素に'data-h5-default-scene'もしくは'data-h5-scene'属性がない場合は、'data-h5-default-scene'のDIV要素で囲む。
	 * <p>
	 * その際、親(シーンコンテナ)側にdata-h5-controller属性がある場合は、シーン要素に移動する。
	 * </p>
	 *
	 * @private
	 * @param parent
	 */function wrapScene(parent){var $parent=$(parent);var $children=$parent.children();if($children.eq(0).is('['+DATA_H5_DEFAULT_SCENE+'],['+DATA_H5_SCENE+']')===false){$parent.wrapInner($('<div '+DATA_H5_DEFAULT_SCENE+'></div>'));var name=$parent.attr(DATA_H5_CONTROLLER);if(name){ // TODO(鈴木) childrenは↑のwrapAllで作成した要素
$parent.removeAttr(DATA_H5_CONTROLLER).children().attr(DATA_H5_CONTROLLER,name);}}} /**
	 * 先頭に表示文字列テキストノードがあるかのチェック用正規表現
	 */var startByTextRegexp=/^\s*(?!\s|<)/; /**
	 * HTML要素取得(通信)
	 * <p>
	 * 第二引数にコンテナ指定を追加。これが指定された場合、第一引数により取得したHTML内で、 data-h5-scene-container属性の値がこれに一致する要素を対象とする。
	 * </p>
	 *
	 * @private
	 * @param source
	 * @param method
	 * @returns {Promise}
	 */function loadContentsFromUrl(source,method,serverArgs){var dfd=h5.async.deferred(); // TODO htmlだとスクリプトが実行されてしまうのでフルHTMLが返されるとよくない
// 部分HTML取得の場合のことを考慮。
var xhr=h5.ajax({url:source,dataType:'html',method:method||'get',data:serverArgs});xhr.done(function(data){ // TODO(鈴木) ここでdataからbody部分のみ抜く。
data=extractBody(data); // 先頭が表示文字列テキストノードの場合はコンテナ要素で囲む
if(startByTextRegexp.test(data)){data='<div '+DATA_H5_CONTAINER+'>'+data+'</div>';}var $dom=$(data); // TODO(鈴木)
// mainタグかdata-main-container属性要素があればその内容を対象とする。
// 通常のシーンコンテナ内にmainとdata-main-containerはない前提。
var main=findWithSelf($dom,'['+DATA_H5_MAIN_CONTAINER+']'); // TODO(鈴木)
// 遷移先のHTMLからメインシーンコンテナに該当する部分を抽出。
if(main.length===0){main=findWithSelf($dom,'main');}if(main.length>0){$dom=main.eq(0);$dom.attr(DATA_H5_MAIN_CONTAINER,DATA_H5_MAIN_CONTAINER);} // ルート要素が複数か、単一でもコンテナ要素、またはBODYのダミーでなければコンテナ要素で囲む
if($dom.length>1||!isContainer($dom)&&!$dom.is('['+DATA_H5_DYN_DUMMY_BODY+']')){$dom=$('<div '+DATA_H5_CONTAINER+'></div>').append($dom);}wrapScene($dom);dfd.resolve($dom.children());}).fail(function(error){dfd.reject(error);});return dfd;}var NEW_SCENE_HTML='<div class="h5-scene"></div>'; /**
	 * HTML要素取得
	 *
	 * @private
	 * @param source
	 * @param method
	 * @returns {Promise}
	 */function loadContents(source,method,serverArgs){var dfd;if(isString(source)){dfd=loadContentsFromUrl(source,method,serverArgs);}else {dfd=h5.async.deferred();var contentsRoot;if(source==null){ // 新しくdiv要素を生成
contentsRoot=$(NEW_SCENE_HTML).get(0);}else { // DOM要素が指定されたのでそれをそのまま使用
contentsRoot=h5.u.obj.isJQueryObject(source)?source[0]:source;}dfd.resolve(contentsRoot);}return dfd.promise();} // TODO(鈴木) シーンタイプ関連実装削除
/**
	 * シーン遷移効果保持用オブジェクト
	 */var transitionTypeMap={}; /**
	 * デフォルトシーン遷移効果
	 *
	 * @private
	 * @class
	 */function defaultTransitionController(){ //
}$.extend(defaultTransitionController.prototype,{onChange:function onChange(container,to){var dfd=h5.async.deferred();$(container).empty();$(to).appendTo(container);dfd.resolve();return dfd.promise();},onChangeStart:function onChangeStart(container,from,to){this._ind=h5.ui.indicator({target:container,block:true,message:'遷移中...'}).show();},onChangeEnd:function onChangeEnd(container,from,to){this._ind.hide();}}); /**
	 * シーン遷移用パラメーターシリアライズ
	 *
	 * @private
	 * @param obj
	 * @param parent
	 * @return {String}
	 */function serialize(obj,parent){var str='';function callback(k,v){if(str)str+='&';if(!parent&&(k==='args'||k==='serverArgs')){str+=serialize(v,k);}else {if(parent==='serverArgs'){var _k=encodeURIComponent(k);if(v instanceof Array){var _str='';for(var i=0;i<v.length;i++){if(_str)_str+='&';_str+=_k+'[]';_str+='=';_str+=encodeURIComponent(v[i]);}str+=_str;}else {str+=_k;str+='=';str+=encodeURIComponent(v);}}else {if(parent==='args'){str+=encodeURIComponent(clientQueryStringPrefix+k);}else {str+=encodeURIComponent(clientFWQueryStringPrefix+k);}str+='=';str+=encodeURIComponent(h5.u.obj.serialize(v).substring(2));}}}$.each(obj,callback);return str;} /**
	 * シーン遷移用パラメーターデシリアライズ
	 *
	 * @private
	 * @param str
	 * @return {Object}
	 */function deserialize(str){if(!deserialize._checkKeyRegExp){deserialize._checkKeyRegExp=new RegExp('^('+clientQueryStringPrefixForRegExp+'|'+clientFWQueryStringPrefixForRegExp+')?(.+)');deserialize._checkArrayRegExp=/^(.*)\[\]$/;}var obj={};var checkKeyRegExp=deserialize._checkKeyRegExp;var checkArrayRegExp=deserialize._checkArrayRegExp;function callback(i,pair){pair=pair.split('=');var k=decodeURIComponent(pair[0]);var v=decodeURIComponent(pair[1]);var match=k.match(checkKeyRegExp);if(!match){return;}var prefix=match[1]||'';var name=match[2];if(!prefix){ // prefixが無い場合はserverArgs
obj.serverArgs=obj.serverArgs||{};var _match=name.match(checkArrayRegExp);if(_match){var _name=_match[1];if(_name in obj.serverArgs===false){obj.serverArgs[_name]=[];}if(obj.serverArgs[_name] instanceof Array){obj.serverArgs[_name].push(v);}}else {obj.serverArgs[name]=v;}}if(prefix===clientQueryStringPrefix){obj.args=obj.args||{};obj.args[name]=h5.u.obj.deserialize(SERIALIZE_PREFIX+v);}else if(prefix===clientFWQueryStringPrefix){obj[name]=h5.u.obj.deserialize(SERIALIZE_PREFIX+v);}}$.each(str.split('&'),callback);return obj;} /**
	 * シーン遷移用パラメーター文字列削除
	 *
	 * @private
	 * @param str
	 * @return {String}
	 */function clearParam(str){if(!str)return '';if(!clearParam._regExp){clearParam._regExp=new RegExp('(^|&)(?:'+clientQueryStringPrefixForRegExp+'|'+clientFWQueryStringPrefixForRegExp+')[^=]*=.*?(?=&|$)','g');}var regExp=clearParam._regExp;var urlHelper=new UrlHelper(str);var path=urlHelper.pathname;var search=urlHelper.search||'';search=search.substring(1).replace(regExp,'');if(search)search='?'+search;return path+search;} /**
	 * URLからシーン遷移パラメーターを取得
	 *
	 * @private
	 * @param url
	 * @return {Object}
	 */function getParamFromUrl(url){var urlHelper=new UrlHelper(url);var path=urlHelper.pathname||'';var search=urlHelper.search||'';var param=deserialize(search.substring(1));if(!param.to){param.to=path;}return param;} /**
	 * URL用にシーン遷移パラメーターを文字列に変換
	 *
	 * @private
	 * @param param
	 * @return {String}
	 */function convertParamToUrl(param){ // TODO(鈴木) 遷移先指定がない場合、現在のURLを使用
param=$.extend(true,{},param);var to=param.to;var path='',search='';var isController=controllerRegexp.test(to);if(isController){to='';}else { // TODO(鈴木) paramからtoを削除(URLに余計な情報を残さないため)
delete param.to;to=clearParam(to);var urlHelper=new UrlHelper(to);path=urlHelper.pathname;search=urlHelper.search;}var paramStr=serialize(param);if(paramStr){search+=search?'&':'?';search+=paramStr;}var result=path+search;return result;} /**
	 * メインシーンコンテナインスタンス保持用
	 */var mainContainer=null; /**
	 * 再表示不可画面用コントローラー
	 * <p>
	 * シーン遷移時シーン間パラメーターをURLに保持しない場合で、ブラウザ履歴等により再表示した場合に表示する画面。
	 * </p>
	 *
	 * @private
	 */var NotReshowableController={__name:'h5.scene.NotReshowableController',__init:function __init(context){var _notReshowableMessage=context.args._notReshowableMessage;$(this.rootElement).html('<h1>'+_notReshowableMessage+'</h1>');}}; /**
	 * シーンコンテナクラス
	 * <p>
	 * 実体はコントローラーです。 シーンコンテナを生成する場合はh5.scene.createSceneContainer()を使用してください。
	 * </p>
	 *
	 * @class
	 * @name SceneContainerController
	 */var SceneContainerController={__name:'h5.scene.SceneContainerController', /**
		 * メインシーンコンテナであるか否か
		 *
		 * @readOnly
		 * @type Boolean
		 * @memberOf SceneContainerController
		 */isMain:false, /**
		 * 画面遷移効果
		 *
		 * @private
		 * @memberOf SceneContainerController
		 */_transition:null, /**
		 * 現在表示しているシーンのコントローラー
		 *
		 * @private
		 * @memberOf SceneContainerController
		 */_currentController:null, /**
		 * リンククリックジャックによるシーン遷移の可否
		 *
		 * @private
		 * @memberOf SceneContainerController
		 */_isClickjackEnabled:false, /**
		 * シーン遷移時に使用するDeferredオブジェクト
		 *
		 * @private
		 * @memberOf SceneContainerController
		 */_dfd:null, /**
		 * navigate経由で_navigateを実行したか否か
		 *
		 * @private
		 * @memberOf SceneContainerController
		 */_isNavigated:false, /**
		 * メインシーンコンテナ シーン遷移時パラメーター迂回用
		 * <p>
		 * 遷移パラメーター(FW用以外)をURLに保持しない場合に、このプロパティを経由する。
		 * </p>
		 *
		 * @private
		 * @memberOf SceneContainerController
		 */_detour:{}, /**
		 * Routerインスタンス
		 *
		 * @private
		 * @memberOf SceneContainerController
		 */_router:null, /**
		 * 初期表示フラグ
		 * <p>
		 * メインシーンコンテナで使用。
		 * </p>
		 *
		 * @private
		 * @memberOf SceneContainerController
		 */_first:true, /**
		 * このシーンコンテナが現在表示しているシーンのタイトル
		 * <p>
		 * getTitle()で取得できる
		 * </p>
		 *
		 * @private
		 * @memberOf SceneContainerController
		 * @type {string}
		 */_title:'', /**
		 * __init
		 *
		 * @private
		 * @memberOf SceneContainerController
		 */__init:function __init(context){var args=context.args||{};var element=this.rootElement;var isMain=args.isMain; /* var initialSceneInfo = args.initialSceneInfo; */var that=this;this.isMain=!!isMain;this.followTitle=isMain&&args.followTitle;if(this.isMain&&mainContainer){ // すでにメインシーンコンテナが生成されている場合にエラー
throwFwError(ERR_CODE_MAIN_CONTAINER_ALREADY_CREATED);}this._containerName=$(element).attr(DATA_H5_MAIN_CONTAINER)||$(element).attr(DATA_H5_CONTAINER); // TODO(鈴木) シーンコンテナ下はコントローラーを管理
this._currentController=null; // TODO(鈴木) コンテナ内にシーン要素がなければ追加する
wrapScene(element); // TODO(鈴木) とりあえずデフォルトのtransitionを使用。
this._transition=new defaultTransitionController();this._transition.onChangeStart(element);this.on('{rootElement}',EVENT_SCENE_CHANGE_REQUEST,this.own(this._onSceneChangeRequest));this._router=router;if(this.isMain){mainContainer=this; // _isClickjackEnabledがtrueの場合のみ有効。
// TODO:フラグのセット方法
if(this._isClickjackEnabled){this.on('{a}','click',this.own(this._onAClick));} // TODO(鈴木) Routerでの判定結果を取得
urlHistoryActualMode=this._router.urlHistoryActualMode; // TODO(鈴木) Router処理開始
this._router.start();}else { // TODO(鈴木) カレントとなるシーンを探索してscan
scanForContainer(element).done(function(controller){that._currentController=controller;that._transition.onChangeEnd(that.rootElement,null,controller.rootElement);that._transition=null; // タイトルの設定
var title=that._getTitleFromCurrentScene();if(title!=null){that.setTitle(title);}});}}, /**
		 * __dispose
		 *
		 * @private
		 * @memberOf SceneContainerController
		 */__dispose:function __dispose(){if(!isDisposing(this._currentController)){this._currentController.dispose();}this._currentController=null;if(this.isMain){ // TODO(鈴木) Router処理停止
this._router.stop();this._router=null; // メインシーンコンテナインスタンス保持用変数をnullに更新
mainContainer=null;}}, /**
		 * クリックジャックによる遷移
		 *
		 * @private
		 * @memberOf SceneContainerController
		 * @param context
		 */_onAClick:function _onAClick(context){context.event.preventDefault();var href=context.event.originalEvent.target.href;this.navigate(href);}, /**
		 * シーン遷移イベント発生時処理
		 *
		 * @private
		 * @memberOf SceneContainerController
		 * @param context
		 */_onSceneChangeRequest:function _onSceneChangeRequest(context){context.event.stopPropagation();setTimeout(this.own(function(){this.navigate(context.evArg);}),0);}, /**
		 * シーンコンテナ内のシーンを遷移します。
		 * <p>
		 * 機能の詳細については以下を参照してください。
		 * </p>
		 * <ul>
		 * <li><a
		 * href="/conts/web/view/reference/scene-spec">リファレンス（仕様詳細)&gt;&gt;画面遷移制御・履歴管理(シーン機能)仕様
		 * [ver.1.2]</a>
		 * <ul>
		 * <li><a
		 * href="/conts/web/view/reference/scene-spec#H30B730FC30F330B330F330C630CA5185306E907779FB2830B730FC30F3306E907779FB29">
		 * シーンコンテナ内の遷移(シーンの遷移)</a></li>
		 * </ul>
		 * </li>
		 * </ul>
		 *
		 * @param {String|Object} param 遷移先文字列、または遷移用オプション。
		 *            <p>
		 *            遷移先文字列の場合は、HTMLを返却するURLか、コントローラーの__name属性を指定します。<br>
		 *            遷移用オプションの場合は、以下のプロパティを持ちます。
		 *            </p>
		 * @param {String} param.to 遷移先指定。HTMLを返却するURLか、コントローラーの__name属性を指定します。指定必須です。
		 * @param {Any}[param.args] デフォルトシーンに対応するコントローラー生成時に渡されるパラメータを指定します。
		 * @param {string}[param.navigationType="normal"]
		 *            メインシーンコンテナのみで有効。遷移時のパターンを指定します。以下の値が設定できます。
		 *            <dl>
		 *            <dt>"normal"</dt>
		 *            <dd>URLに開発者指定のパラメーターを入れます(デフォルト)。ブラウザバック等でパラメーター含めて再表示可能です。h5.scene.navigationType.NORMALと同値なのでこれを指定してもよいです。</dd>
		 *            <dt>"once"</dt>
		 *            <dd>URLに開発者指定のパラメーターを入れません。フレームワーク用パラメーターのみとなります。ブラウザバック等で再表示はできなくなります(再表示不可のメッセージ画面(後述)を表示)。h5.scene.navigationType.ONCEと同値なのでこれを指定してもよいです。</dd>
		 *            <dt>"silent"</dt>
		 *            <dd>URLは変化させずに遷移します。h5.scene.navigationType.SILENTと同値なのでこれを指定してもよいです。</dd>
		 *            </dl>
		 * @param {boolean}[param.replaceHistory=false] URLを置換しつつ遷移するか否か。置換して遷移する場合はtrueを設定します。
		 *            デフォルトはfalseです。trueで遷移した場合、元の画面のURLは履歴から削除されるため、ブラウザバックでは戻れなくなります。
		 * @param {string} [param.method="get"]
		 *            toの設定値がHTMLページのURLである場合に有効。AjaxでのHTMLデータ取得時のHTTPメソッドを指定します。
		 *            <dl>
		 *            <dt>"get"</dt>
		 *            <dd>GETメソッドで取得します(デフォルト)。h5.scene.method.GETと同値なのでこれを指定してもよいです。</dd>
		 *            <dt>"post"</dt>
		 *            <dd>POSTメソッドで取得します。h5.scene.method.POSTと同値なのでこれを指定してもよいです。</dd>
		 *            <dd>ブラウザバック等で再表示はできなくなります。</dd>
		 *            </dl>
		 * @param {Object} [param.serverArgs]
		 *            toの設定値がHTMLページのURLである場合に有効。AjaxでのHTMLデータ取得時のパラメーターを指定します。jQuery.ajaxの引数のdataプロパティに相当します。ただし、直下メンバーの各値として配列以外のオブジェクトは設定できません。値の配列については、その要素にオブジェクトは設定できません。
		 * @returns {Promise} Promiseオブジェクト。遷移完了時にresolveを実行します。
		 * @memberOf SceneContainerController
		 */navigate:function navigate(param){ // TODO(鈴木) paramが文字列の場合は遷移先と見なして再帰呼び出しする
if(isString(param)){return this.navigate({to:param});} // 渡されたパラメータを覚えておく
// シーン遷移後のコールバックで使用し、_navigateEndが終わったら破棄する
this._navigateParam=param;param=$.extend(true,{},param);this._transition=new defaultTransitionController(); // TODO(鈴木) シーンコンテナ下はコントローラーを管理
var fromElm=(this._currentController||{}).rootElement; // TODO(鈴木) インジケーターは遷移処理発動直後に表示する必要がある(余計な操作をさせないため)
// fromは設定しているが使っていない。toはここでは指定できない。
this._transition.onChangeStart(this.rootElement,fromElm);var dfd=this._dfd=h5.async.deferred(); // TODO(鈴木) navigate経由で_navigateを実行したか否か
this._isNavigated=true;var to=param.to;if(this.isMain&&param.navigationType!==NAVIGATION_TYPE.SILENT){ // TODO(鈴木) メインシーンコンテナで、URL変更を伴う場合
if(!isString(to)){ // TODO(鈴木) シーン遷移先に文字列以外を指定されたらエラー
throwFwError(ERR_CODE_CHANGE_SCENE_TO_IS_NOT_STRING,[to]);}if(to.indexOf('#')!==-1){ // TODO(鈴木) シーン遷移先にハッシュを指定されたらエラー
throwFwError(ERR_CODE_CHANGE_SCENE_HASH_IN_TO,[to]);}if(param.method===METHOD.POST){this._detour.serverArgs=param.serverArgs;delete param.serverArgs;}if(param.navigationType===NAVIGATION_TYPE.ONCE||param.method===METHOD.POST){this._detour.args=h5.u.obj.deserialize(h5.u.obj.serialize(param.args));delete param.args;}var replaceHistory=param.replaceHistory;delete param.replaceHistory;var url=convertParamToUrl(param); // 現URLと次のURLが同一の場合は処理しないほうがよいか。。
// 処理した場合、履歴は積まれないので、アニメーション的に遷移したとみなされるようなものはしないほうがいい。
//				if (this._router.compareUrl(url)) {
//					this._dfd.resolve({
//						from : fromElm,
//						to : null
//					});
//					// インジケーター消すだけ用のイベント作らないといけない。。
//					this._transition.onChangeEnd(this.rootElement, fromElm);
//					this._isNavigated = false;
//					this._dfd = null;
//					this._transition = null;
//					return;
//				}
this._router.navigate(url,{replaceHistory:replaceHistory});}else { // TODO(鈴木) URL変更を伴わない場合
var url=convertParamToUrl(param);this._router.evaluate(url,{container:this});}return dfd.promise();}, /**
		 * 現在のシーンのタイトルの設定
		 *
		 * @memberOf SceneContainerController
		 * @param {string} title タイトル文字列
		 */setTitle:function setTitle(title){this._title=title;if(this.followTitle){document.title=title;}}, /**
		 * 現在のシーンのタイトルの取得
		 *
		 * @memberOf SceneContainerController
		 * @returns {string} 現在のシーンのタイトル
		 */getTitle:function getTitle(){return this._title;}, /**
		 * シーン遷移内部処理
		 *
		 * @private
		 * @memberOf SceneContainerController
		 * @param to
		 * @param param
		 */_navigate:function _navigate(to,param){if(!to){return;}param=param||{}; // TODO(鈴木) シーンコンテナ下はコントローラーを管理
var fromElm=(this._currentController||{}).rootElement; // navigateメソッド経由でない場合
if(!this._isNavigated){this._transition=new defaultTransitionController();this._transition.onChangeStart(this.rootElement,fromElm);} // 現在のページの全てのコントローラを削除
if(fromElm){disposeAllControllers(fromElm);}var that=this;var args=null;if(param.navigationType===NAVIGATION_TYPE.ONCE||param.method===METHOD.POST){if(!this._isNavigated){this._onNotReshowable(param);return;}args=this._detour.args;delete this._detour.args;}else {args=param.args;}var serverArgs=null;if(param.method===METHOD.POST){serverArgs=this._detour.serverArgs;delete this._detour.serverArgs;}else {serverArgs=param.serverArgs;} // TODO(鈴木) transitionをコントローラーからFunctionに変更
// TODO(鈴木) TransitionController変更に伴う変更
// 次のコンテンツのロードはこちらで行う。
// 将来、コントローラー・DOMを保存して使用する場合に、それらのハンドリングはシーンコンテナで行うほうがよいと思われるため。
// 更にその先で、これらの処理も外部指定が可能なようにする。
// TODO(鈴木) 処理順を以下に変更
// HTMLロード→(ツリーにはappendせず)DOM生成→属性に基づきコントローラーをロード・バインド
// →シーンルートとなるコントローラーのDOMを既存と入れ替える
// (現状はコンテナ以下をそのまま入れている。コンテナ内にDOM的にシーンが複数あるケースは未対応)
if(isString(to)){if(controllerRegexp.test(to)){ // TODO(鈴木) 遷移先指定がコントローラーの__name属性の場合
loadController(to,$('<div></div>'),args).done(function(toController){that._navigateEnd(toController,param);});}else {var callback=function callback(toElm){ // TODO(鈴木)
// DATA属性に基づいてコントローラーバインド・コンテナ生成
// TODO(鈴木) scan用にダミーのDIVにappend
scanForContainer($('<div></div>').append(toElm),null,args).done(function(toController){that._navigateEnd(toController,param);});}; // TODO(鈴木) 遷移先指定がHTMLの場合
var loadPromise=loadContents(to,param.method,serverArgs);loadPromise.done(callback).fail(function(xhr){ // シーン遷移先HTMLのロードに失敗
throwFwError(ERR_CODE_HTML_LOAD_FAILED,[to],xhr);});}}else if(to.__name&&controllerRegexp.test(to.__name)){ // TODO(鈴木) 遷移先指定がコントローラーの場合
that._navigateEnd(to,param);}}, /**
		 * シーン遷移時コントローラーロード後処理
		 *
		 * @private
		 * @memberOf SceneContainerController
		 * @param toController
		 * @param param
		 */_navigateEnd:function _navigateEnd(toController,param){var that=this;var fromElm=(this._currentController||{}).rootElement;var toElm=toController.rootElement;that._currentController=toController; // タイトルを決定する
var title=param&&param.title;if(title==null){ // 指定無しの場合
var isController=this._navigateParam&&controllerRegexp.test(this._navigateParam.to);if(isController&&toController[CONTROLLER_SCENE_TITLE]!=null){ // 遷移先指定がコントローラの場合、プロパティから取得
this.setTitle(toController[CONTROLLER_SCENE_TITLE]);}else { // 遷移先指定がコントローラでない場合(=ページURLの場合)は表示されている要素から設定
var title=this._getTitleFromCurrentScene();if(title!=null){this.setTitle(title);}}}else {this.setTitle(title);}this._navigateParam=null;this._transition.onChange(this.rootElement,toElm).done(this.own(function(){ // TODO(鈴木) disposeのタイミングはどうすべきか・・
if(this._dfd){this._dfd.resolve({from:fromElm,to:toElm});}if(fromElm){$(fromElm).remove();} // TODO(鈴木) インジケータ非表示
that._transition.onChangeEnd(that.rootElement,fromElm,toElm);that._isNavigated=false;that._dfd=null;that._transition=null;}));}, /**
		 * 現在表示されているシーン要素からタイトルを抽出して設定する
		 *
		 * @private
		 * @memberOf SceneContainerController
		 * @returns {string|undefined} シーン要素から取得したタイトル文字列(未定義の場合はundefined)
		 */_getTitleFromCurrentScene:function _getTitleFromCurrentScene(){var elm=this._currentController.rootElement;var dataTitle=$(elm).data(DATA_H5_SCENE_TITLE);if(dataTitle!=null){ // data-h5-scene-title指定
return dataTitle;} // titleタグ
var $title=$(elm).find('title');if($title.length){return $title.text();}}, /**
		 * シーン再表示不可時処理
		 *
		 * @private
		 * @memberOf SceneContainerController
		 * @param {Object} param
		 */_onNotReshowable:function _onNotReshowable(param){if(notReshowable.__name&&controllerRegexp.test(notReshowable.__name)){ // TODO(鈴木) notReshowable指定がコントローラーの場合
var notReshowableController=h5internal.core.controllerInternal($('<div></div>'),notReshowable,{_notReshowableMessage:notReshowableMessage});this._navigateEnd(notReshowableController,param);}else { // TODO(鈴木) notReshowable指定がコントローラー以外の場合
var navigateParam=null;if(isString(notReshowable)){navigateParam={to:notReshowable};}else {navigateParam=$.extend(true,{},notReshowable);}navigateParam.args=navigateParam.args||{};navigateParam.args._notReshowableMessage=notReshowableMessage;this._navigate(navigateParam.to,navigateParam);}}, /**
		 * Router用デフォルトコールバック
		 * <p>
		 * </p>
		 *
		 * @private
		 * @memberOf SceneContainerController
		 * @param {String} url
		 */_defaultFuncForRouter:function _defaultFuncForRouter(url){var that=this;var param=getParamFromUrl(url);var to=param.to; // TODO(鈴木) メインシーンコンテナかつ初回表示時
if(this.isMain&&this._first){ // TODO(鈴木) シーン遷移タイプが'once'(一回のみ)、またはAjaxメソッドタイプが'post'の場合、
// 再表示不可エラー画面を表示する。
if(param.navigationType===NAVIGATION_TYPE.ONCE||param.method===METHOD.POST){this._onNotReshowable(param);this._first=false;return;}var isController=to&&controllerRegexp.test(to);var useHash=urlHistoryActualMode===URL_HISTORY_ACTUAL_MODE.HASH&&location.hash.substring(1);var converted=!this._router.compareUrl(url); // TODO(鈴木) 初回読み込みでHTMLの場合でURLそのまま使用する場合は、
// 単にscanForContainerする。
if(!converted&&!useHash&&!isController){var callback=function callback(controller){that._currentController=controller;that._transition.onChangeEnd(that.rootElement,null,controller.rootElement);that._transition=null; // タイトルの設定
var title=that._getTitleFromCurrentScene();if(title!=null){that.setTitle(title);}};scanForContainer(this.rootElement,null,param.args).done(callback);this._first=false;return;}}to=to||location.pathname+location.search;to=clearParam(to);if(this._first){this._navigated=true;}this._navigate(to,param);this._first=false;}}; /**
	 * シーンコンテナインスタンスを生成します.
	 *
	 * @memberOf h5.scene
	 * @param {Element} element シーンコンテナ生成対象要素。
	 * @param {Boolean} [isMain=false] メインシーンコンテナとするか否か。
	 *            <dl>
	 *            <dt>メインシーンコンテナとする
	 *            <dt>
	 *            <dd>true</dd>
	 *            <dt>メインシーンコンテナとしない</dt>
	 *            <dd>false(デフォルト)</dd>
	 *            </dl>
	 * @returns {SceneContainerController} 生成したシーンコンテナのインスタンス。
	 */function createSceneContainer(element,isMain){ // TODO(鈴木) element指定なしの場合はdiv要素を作って設定
if(element==null){element=$('<div></div>').get(0);} // TODO(鈴木) コンテナ生成済みであればエラー。判定方法は見直しが必要か。
if($(element).is('['+DATA_H5_DYN_CONTAINER_BOUND+']')){throwFwError(ERR_CODE_CONTAINER_ALREADY_CREATED);} // タイトル追従するかどうか(メインシーンコンテナの場合はデフォルトtrue)
// メインシーンコンテナでない場合は追従しない
var followTitle=isMain;if(isMain){if($(element).is(':not(['+DATA_H5_MAIN_CONTAINER+'])')){$(element).attr(DATA_H5_MAIN_CONTAINER,DATA_H5_MAIN_CONTAINER);}}else {if($(element).is(':not(['+DATA_H5_CONTAINER+'])')){$(element).attr(DATA_H5_CONTAINER,DATA_H5_CONTAINER);}followTitle=h5.settings.scene.followTitle;}var container=h5internal.core.controllerInternal(element,SceneContainerController,{isMain:isMain,followTitle:followTitle},{async:false});$(element).attr(DATA_H5_DYN_CONTAINER_BOUND,DATA_H5_DYN_CONTAINER_BOUND);return container;} /**
	 * シーン機能の初回適用を行います。
	 * <p>
	 * ドキュメント全体に対し、DATA属性に基づいて、コントローラーのバインドとシーンコンテナの生成を行います。<br/> 2回目以降の実行は無視されます。
	 * </p>
	 *
	 * @memberOf h5.scene
	 */function init(){if(!isInited){isInited=true;scan();}} /**
	 * メインシーンコンテナのインスタンスを取得します。
	 *
	 * @memberOf h5.scene
	 * @returns {SceneContainerController} メインシーンコンテナのインスタンス。未作成の場合はnull。
	 */function getMainSceneContainer(){return mainContainer;} /**
	 * 指定要素およびその配下のシーンコンテナを取得します
	 *
	 * @memberOf h5.scene
	 * @param {DOM|jQuery|stroing} [rootElement=document.body]
	 *            走査先頭要素。要素またはセレクタを指定します。指定しない場合はドキュメント全体を対象とします。
	 * @param {boolean} [option.deep=true] 子孫要素にバインドされているコントローラも含めるかどうか(デフォルトは含める)
	 * @returns {SceneContainerController[]} シーンコンテナの配列。
	 */function getSceneContainers(rootElement,option){return h5.core.controllerManager.getControllers(rootElement||document.body,{name:SceneContainerController.__name,deep:option&&option.deep===false?false:true});} /**
	 * シーンコンテナを取得します
	 * <p>
	 * 第1引数に取得対象とする要素のdata-h5-scene-container属性まはたdata-h5-main-scene-container属性の値を文字列で指定します。該当する要素に対応するシーンコンテナを返します。
	 * </p>
	 *
	 * @memberOf h5.scene
	 * @param {String} name
	 *            取得対象とする要素のdata-h5-scene-container属性まはたdata-h5-main-scene-container属性の値を文字列で指定します。
	 * @returns {SceneContainerController} 該当するシーンコンテナ。ない場合はnullを返します。
	 */function getSceneContainerByName(name){if(name==null){return null;}var containers=getSceneContainers();if(containers.length===0){return null;}if(name){for(var i=0;i<containers.length;i++){if(containers[i]._containerName===name){return containers[i];}}return null;}return containers[0];} // =============================
// Code on boot
// =============================
// フック
h5internal.core.addControllerInstantiationHook(function(c){ // TODO controllerがすでにsceneプロパティを持っていたらエラーでよいか
/**
		 * シーン操作に関するモジュール
		 * <p>
		 * コントローラ化の際に、コントローラに"scene"プロパティが追加されます。
		 * </p>
		 * <p>
		 * 使用方法については{@link Scene}をご覧ください。
		 * </p>
		 *
		 * @memberOf Controller
		 * @type Scene
		 * @name scene
		 */c.scene=new Scene(c);});$(function(){ // シーン遷移パラメーター識別用プレフィクス
clientQueryStringPrefix=h5.settings.scene.clientQueryStringPrefix; //  正規表現用文字列作成
clientQueryStringPrefixForRegExp=clientQueryStringPrefix.replace(/\\/g,'\\\\'); // シーン遷移パラメーター識別用プレフィクス(FW用)
clientFWQueryStringPrefix=h5.settings.scene.clientFWQueryStringPrefix; // 正規表現用文字列作成
clientFWQueryStringPrefixForRegExp=clientFWQueryStringPrefix.replace(/\\/g,'\\\\'); // メインシーンコンテナURL履歴保持方法
urlHistoryMode=h5.settings.scene.urlHistoryMode; // シーン遷移先URL最大長
urlMaxLength=parseInt(h5.settings.scene.urlMaxLength); //  再表示不可画面
notReshowable=NotReshowableController; // ベースURL
baseUrl=h5.settings.scene.baseUrl; // TODO(鈴木) h5.settings.scene.routesからルーティングテーブルマージ
var routes=[];if(h5.settings.scene.routes){routes=routes.concat(h5.settings.scene.routes);} // TODO(鈴木) シーン用ルーティングテーブルをRouter用に変換。
var routesForRouter=$.map(routes,function(route){var test=route.test;if(isFunction(test)){var _test=test;test=function test(url){var param=getParamFromUrl(url);return _test(url,param);};}return {test:test,func:function func(url,contextualData){contextualData=contextualData||{};var navigationInfo=route.navigationInfo;if(isFunction(navigationInfo)){var param=getParamFromUrl(url);navigationInfo=navigationInfo(url,param);}if(navigationInfo==null){var container=contextualData.container||mainContainer;container._defaultFuncForRouter(url);return null;}if(isString(navigationInfo)){navigationInfo={to:navigationInfo};}var result=convertParamToUrl(navigationInfo);return result;}};}); // TODO(鈴木) デフォルト動作用定義追加。
routesForRouter.push({test:/.*/,func:function func(url,contextualData){contextualData=contextualData||{};var container=contextualData.container||mainContainer;container._defaultFuncForRouter(url);}}); // TODO(鈴木) Routerインスタンス生成
router=new Router({routes:routesForRouter,urlHistoryMode:urlHistoryMode,baseUrl:baseUrl,urlMaxLength:urlMaxLength}); // autoInit=trueの場合に全体を探索し、DATA属性によりコントローラーバインドとシーンコンテナ生成を行う。
if(h5.settings.scene.autoInit){init();}}); // =============================
// Expose to window
// =============================
/**
	 * @namespace
	 * @name scene
	 * @memberOf h5
	 */h5.u.obj.expose('h5.scene',{createSceneContainer:createSceneContainer,init:init,getMainSceneContainer:getMainSceneContainer,getSceneContainers:getSceneContainers,getSceneContainerByName:getSceneContainerByName,navigationType:NAVIGATION_TYPE,method:METHOD,urlHistoryMode:URL_HISTORY_MODE});})(); /* del begin */var fwLogger=h5.log.createLogger('h5');fwLogger.info('開発版のhifive(ver.{0})の読み込みが完了しました。リリース時はMinify版（h5.js）を使用してください。',h5.env.version);fwLogger.info('hifive内部で使用されるjQueryのバージョン：{0}',$.fn.jquery); /* del end */})(jQuery);

}).call(global, module, undefined, undefined);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"jquery":3}],3:[function(require,module,exports){
/*!
 * jQuery JavaScript Library v2.2.3
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-04-05T19:26Z
 */

(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var arr = [];

var document = window.document;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "2.2.3",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {

		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isPlainObject: function( obj ) {
		var key;

		// Not plain objects:
		// - Any object or value whose internal [[Class]] property is not "[object Object]"
		// - DOM nodes
		// - window
		if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		// Not own constructor property must be Object
		if ( obj.constructor &&
				!hasOwn.call( obj, "constructor" ) &&
				!hasOwn.call( obj.constructor.prototype || {}, "isPrototypeOf" ) ) {
			return false;
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}

		// Support: Android<4.0, iOS<6 (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		var script,
			indirect = eval;

		code = jQuery.trim( code );

		if ( code ) {

			// If the code includes a valid, prologue position
			// strict mode pragma, execute code by injecting a
			// script tag into the document.
			if ( code.indexOf( "use strict" ) === 1 ) {
				script = document.createElement( "script" );
				script.text = code;
				document.head.appendChild( script ).parentNode.removeChild( script );
			} else {

				// Otherwise, avoid the DOM node creation, insertion
				// and removal by using an indirect global eval

				indirect( code );
			}
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE9-11+
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( (oldCache = uniqueCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		} );

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i,
			len = this.length,
			ret = [],
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					// Support: Blackberry 4.6
					// gEBID returns nodes no longer in the document (#6963)
					if ( elem && elem.parentNode ) {

						// Inject the element directly into the jQuery object
						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

				// Always skip document fragments
				if ( cur.nodeType < 11 && ( pos ?
					pos.index( cur ) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector( cur, selectors ) ) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return elem.contentDocument || jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this === promise ? newDefer.promise() : this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add( function() {

					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 ||
				( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// Add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.progress( updateFunc( i, progressContexts, progressValues ) )
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject );
				} else {
					--remaining;
				}
			}
		}

		// If we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
} );


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {

	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
} );

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// Support: IE9-10 only
		// Older IE sometimes signals "interactive" too soon
		if ( document.readyState === "complete" ||
			( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		} else {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			len ? fn( elems[ 0 ], key ) : emptyGet;
};
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	/* jshint -W018 */
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	register: function( owner, initial ) {
		var value = initial || {};

		// If it is a node unlikely to be stringify-ed or looped over
		// use plain assignment
		if ( owner.nodeType ) {
			owner[ this.expando ] = value;

		// Otherwise secure it in a non-enumerable, non-writable property
		// configurability must be true to allow the property to be
		// deleted with the delete operator
		} else {
			Object.defineProperty( owner, this.expando, {
				value: value,
				writable: true,
				configurable: true
			} );
		}
		return owner[ this.expando ];
	},
	cache: function( owner ) {

		// We can accept data for non-element nodes in modern browsers,
		// but we should not, see #8335.
		// Always return an empty object.
		if ( !acceptData( owner ) ) {
			return {};
		}

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		if ( typeof data === "string" ) {
			cache[ data ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ prop ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :
			owner[ this.expando ] && owner[ this.expando ][ key ];
	},
	access: function( owner, key, value ) {
		var stored;

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			stored = this.get( owner, key );

			return stored !== undefined ?
				stored : this.get( owner, jQuery.camelCase( key ) );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i, name, camel,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key === undefined ) {
			this.register( owner );

		} else {

			// Support array or space separated string of keys
			if ( jQuery.isArray( key ) ) {

				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = key.concat( key.map( jQuery.camelCase ) );
			} else {
				camel = jQuery.camelCase( key );

				// Try the string as a key before any manipulation
				if ( key in cache ) {
					name = [ key, camel ];
				} else {

					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					name = camel;
					name = name in cache ?
						[ name ] : ( name.match( rnotwhite ) || [] );
				}
			}

			i = name.length;

			while ( i-- ) {
				delete cache[ name[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <= 35-45+
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://code.google.com/p/chromium/issues/detail?id=378607
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data, camelKey;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// with the key as-is
				data = dataUser.get( elem, key ) ||

					// Try to find dashed key if it exists (gh-2779)
					// This is for 2.2.x only
					dataUser.get( elem, key.replace( rmultiDash, "-$&" ).toLowerCase() );

				if ( data !== undefined ) {
					return data;
				}

				camelKey = jQuery.camelCase( key );

				// Attempt to get data from the cache
				// with the key camelized
				data = dataUser.get( elem, camelKey );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, camelKey, undefined );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			camelKey = jQuery.camelCase( key );
			this.each( function() {

				// First, attempt to store a copy or reference of any
				// data that might've been store with a camelCased key.
				var data = dataUser.get( this, camelKey );

				// For HTML5 data-* attribute interop, we have to
				// store property names with dashes in a camelCase form.
				// This might not apply to all properties...*
				dataUser.set( this, camelKey, value );

				// *... In the case of properties that might _actually_
				// have dashes, we need to also store a copy of that
				// unchanged property.
				if ( key.indexOf( "-" ) > -1 && data !== undefined ) {
					dataUser.set( this, key, value );
				}
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() { return tween.cur(); } :
			function() { return jQuery.css( elem, prop, "" ); },
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([\w:-]+)/ );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE9
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE9-11+
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
			[];

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], ret ) :
		ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {

				// Support: Android<4.1, PhantomJS<2
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android<4.1, PhantomJS<2
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0-4.3, Safari<=5.1
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari<=5.1, Android<4.2
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<=11+
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();


var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE9
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Support (at least): Chrome, IE9
		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		//
		// Support: Firefox<=42+
		// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
		if ( delegateCount && cur.nodeType &&
			( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push( { elem: cur, handlers: matches } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
		"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split( " " ),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: ( "button buttons clientX clientY offsetX offsetY pageX pageY " +
			"screenX screenY toElement" ).split( " " ),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +
					( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
					( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY +
					( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
					( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: Cordova 2.5 (WebKit) (#13255)
		// All events should have a target; Cordova deviceready doesn't
		if ( !event.target ) {
			event.target = document;
		}

		// Support: Safari 6.0+, Chrome<28
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android<4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {
	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName( "tbody" )[ 0 ] ||
			elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android<4.1, PhantomJS<2
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <= 35-45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <= 35-45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {

	// Keep domManip exposed until 3.0 (gh-2225)
	domManip: domManip,

	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: QtWebKit
			// .get() because push.apply(_, arraylike) throws
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );


var iframe,
	elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */

// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		display = jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
				.appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = iframe[ 0 ].contentDocument;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var documentElement = document.documentElement;



( function() {
	var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE9-11+
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	container.appendChild( div );

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {
		div.style.cssText =

			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";
		div.innerHTML = "";
		documentElement.appendChild( container );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";
		reliableMarginLeftVal = divStyle.marginLeft === "2px";
		boxSizingReliableVal = divStyle.width === "4px";

		// Support: Android 4.0 - 4.3 only
		// Some styles come back with percentage values, even though they shouldn't
		div.style.marginRight = "50%";
		pixelMarginRightVal = divStyle.marginRight === "4px";

		documentElement.removeChild( container );
	}

	jQuery.extend( support, {
		pixelPosition: function() {

			// This test is executed only once but we still do memoizing
			// since we can use the boxSizingReliable pre-computing.
			// No need to check if the test was already performed, though.
			computeStyleTests();
			return pixelPositionVal;
		},
		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},
		pixelMarginRight: function() {

			// Support: Android 4.0-4.3
			// We're checking for boxSizingReliableVal here instead of pixelMarginRightVal
			// since that compresses better and they're computed together anyway.
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return pixelMarginRightVal;
		},
		reliableMarginLeft: function() {

			// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return reliableMarginLeftVal;
		},
		reliableMarginRight: function() {

			// Support: Android 2.3
			// Check if div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container. (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// This support function is only executed once so no memoizing is needed.
			var ret,
				marginDiv = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			marginDiv.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;box-sizing:content-box;" +
				"display:block;margin:0;border:0;padding:0";
			marginDiv.style.marginRight = marginDiv.style.width = "0";
			div.style.width = "1px";
			documentElement.appendChild( container );

			ret = !parseFloat( window.getComputedStyle( marginDiv ).marginRight );

			documentElement.removeChild( container );
			div.removeChild( marginDiv );

			return ret;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		style = elem.style;

	computed = computed || getStyles( elem );
	ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

	// Support: Opera 12.1x only
	// Fall back to style even without computed
	// computed is undefined for elems on document fragments
	if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
		ret = jQuery.style( elem, name );
	}

	// Support: IE9
	// getPropertyValue is only needed for .css('filter') (#12537)
	if ( computed ) {

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// http://dev.w3.org/csswg/cssom/#resolved-values
		if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE9-11+
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Support: IE11 only
	// In IE 11 fullscreen elements inside of an iframe have
	// 100x too small dimensions (gh-1764).
	if ( document.msFullscreenElement && window.top !== window ) {

		// Support: IE11 only
		// Running getBoundingClientRect on a disconnected node
		// in IE throws an error.
		if ( elem.getClientRects().length ) {
			val = Math.round( elem.getBoundingClientRect()[ name ] * 100 );
		}
	}

	// Some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// Check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = dataPriv.get( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {

			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = dataPriv.access(
					elem,
					"olddisplay",
					defaultDisplay( elem.nodeName )
				);
			}
		} else {
			hidden = isHidden( elem );

			if ( display !== "none" || !hidden ) {
				dataPriv.set(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// Support: IE9-11+
			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				style[ name ] = value;
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					elem.offsetWidth === 0 ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = extra && getStyles( elem ),
				subtract = extra && augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				);

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ name ] = value;
				value = jQuery.css( elem, name );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// Support: Android 2.3
jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE9
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE9-10 do not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			dataPriv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
			style.display = "inline-block";
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show
				// and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = dataPriv.access( elem, "fxshow", {} );
		}

		// Store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done( function() {
				jQuery( elem ).hide();
			} );
		}
		anim.done( function() {
			var prop;

			dataPriv.remove( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		} );
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnotwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ?
		opt.duration : opt.duration in jQuery.fx.speeds ?
			jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	window.clearInterval( timerId );

	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: iOS<=5.1, Android<=4.2+
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE<=11+
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: Android<=2.3
	// Options inside disabled selects are incorrectly marked as disabled
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE<=11+
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {

					// Set corresponding property to false
					elem[ propName ] = false;
				}

				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle;
		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ name ];
			attrHandle[ name ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				name.toLowerCase() :
				null;
			attrHandle[ name ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							-1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {
			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




var rclass = /[\t\r\n\f]/g;

function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnotwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + getClass( elem ) + " " ).replace( rclass, " " )
					.indexOf( className ) > -1
			) {
				return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g,
	rspaces = /[\x20\t\r\n\f]+/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?

					// Handle most common string cases
					ret.replace( rreturn, "" ) :

					// Handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					jQuery.trim( jQuery.text( elem ) ).replace( rspaces, " " );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ?
								!option.disabled : option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];
					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true

				// Previously, `originalEvent: {}` was set here, so stopPropagation call
				// would not be triggered on donor event, since in our own
				// jQuery.event.stopPropagation function we had a check for existence of
				// originalEvent.stopPropagation method, so, consequently it would be a noop.
				//
				// But now, this "simulate" function is used only for events
				// for which stopPropagation() is noop, so there is no need for that anymore.
				//
				// For the 1.x branch though, guard for "click" and "submit"
				// events is still used, but was moved to jQuery.event.stopPropagation function
				// because `originalEvent` should point to the original event for the constancy
				// with other events and for more focused logic
			}
		);

		jQuery.event.trigger( e, null, elem );

		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




support.focusin = "onfocusin" in window;


// Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



// Support: Android 2.3
// Workaround failure to string-cast null input
jQuery.parseJSON = function( data ) {
	return JSON.parse( data + "" );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE9
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

		// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// The jqXHR state
			state = 0,

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {

								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" ).replace( rhash, "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE8-11+
			// IE throws exception if url is malformed, e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE8-11+
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );

				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapAll( html.call( this, i ) );
			} );
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function() {
		return this.parent().each( function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		} ).end();
	}
} );


jQuery.expr.filters.hidden = function( elem ) {
	return !jQuery.expr.filters.visible( elem );
};
jQuery.expr.filters.visible = function( elem ) {

	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	// Use OR instead of AND as the element is not visible if either is true
	// See tickets #10406 and #13132
	return elem.offsetWidth > 0 || elem.offsetHeight > 0 || elem.getClientRects().length > 0;
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} ) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE9
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE9
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = callback( "error" );

				// Support: IE9
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" ).prop( {
					charset: s.scriptCharset,
					src: s.url
				} ).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = jQuery.trim( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win,
			elem = this[ 0 ],
			box = { top: 0, left: 0 },
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		box = elem.getBoundingClientRect();
		win = getWindow( doc );
		return {
			top: box.top + win.pageYOffset - docElem.clientTop,
			left: box.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	},
	size: function() {
		return this.length;
	}
} );

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}



var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}

return jQuery;
}));

},{}]},{},[1])
//# sourceMappingURL=build.js.map
