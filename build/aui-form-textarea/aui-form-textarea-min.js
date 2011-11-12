AUI.add("aui-form-textarea",function(b){var e=b.Lang,c=b.getClassName,k="textarea",h=c(k),d=[c(k,"height","monitor"),c("field","text","input"),c("helper","hidden","accessible")].join(" "),l="&nbsp;&nbsp;",i="&nbsp;\n&nbsp;",a='<pre class="'+d+'">',j="</pre>",g='<textarea autocomplete="off" class="{cssClass}" name="{name}"></textarea>';var f=b.Component.create({NAME:k,ATTRS:{autoSize:{value:true},height:{value:"auto"},maxHeight:{value:1000,setter:"_setAutoDimension"},minHeight:{value:45,setter:"_setAutoDimension"},width:{value:"auto",setter:"_setAutoDimension"}},HTML_PARSER:{node:"textarea"},EXTENDS:b.Textfield,prototype:{FIELD_TEMPLATE:g,renderUI:function(){var m=this;f.superclass.renderUI.call(m);if(m.get("autoSize")){m._renderHeightMonitor();}},bindUI:function(){var m=this;f.superclass.bindUI.call(m);if(m.get("autoSize")){m.get("node").on("keyup",m._onKeyup,m);}m.after("adjustSize",m._uiAutoSize);m.after("heightChange",m._afterHeightChange);m.after("widthChange",m._afterWidthChange);},syncUI:function(){var n=this;f.superclass.syncUI.call(n);n._setAutoDimension(n.get("minHeight"),"minHeight");n._setAutoDimension(n.get("maxHeight"),"maxHeight");var o=n.get("width");var m=n.get("minHeight");n._setAutoDimension(o,"width");n._uiSetDim("height",m);n._uiSetDim("width",o);},_afterHeightChange:function(n){var m=this;m._uiSetDim("height",n.newVal,n.prevVal);},_afterWidthChange:function(n){var m=this;m._uiSetDim("width",n.newVal,n.prevVal);},_onKeyup:function(n){var m=this;m.fire("adjustSize");},_renderHeightMonitor:function(){var n=this;var p=b.Node.create(a+j);var r=n.get("node");b.getBody().append(p);n._heightMonitor=p;var m=r.getComputedStyle("fontFamily");var s=r.getComputedStyle("fontSize");var o=r.getComputedStyle("fontWeight");var q=r.getComputedStyle("fontSize");r.setStyle("height",n.get("minHeight")+"px");p.setStyles({fontFamily:m,fontSize:s,fontWeight:o});if("outerHTML" in p.getDOM()){n._updateContent=n._updateOuterContent;}else{n._updateContent=n._updateInnerContent;}},_setAutoDimension:function(o,n){var m=this;m["_"+n]=o;},_uiAutoSize:function(){var n=this;var r=n.get("node");var o=n._heightMonitor;var s=n._minHeight;var q=n._maxHeight;var p=r.val();var t=document.createTextNode(p);o.set("innerHTML","");o.appendChild(t);o.setStyle("width",r.getComputedStyle("width"));p=o.get("innerHTML");if(!p.length){p=l;}else{p+=i;}n._updateContent(p);var m=Math.max(o.get("offsetHeight"),s);m=Math.min(m,q);if(m!=n._lastHeight){n._lastHeight=m;n._uiSetDim("height",m);}},_uiSetDim:function(o,n){var m=this;var p=m.get("node");if(e.isNumber(n)){n+="px";}p.setStyle(o,n);},_updateInnerContent:function(n){var m=this;return m._heightMonitor.set("innerHTML",n);},_updateOuterContent:function(n){var m=this;n=n.replace(/\n/g,"<br />");return m._updateInnerContent(n);}}});b.Textarea=f;},"@VERSION@",{skinnable:true,requires:["aui-form-textfield"]});