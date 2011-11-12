AUI.add("aui-diagram-builder-connector",function(i){var U=i.Lang,s=U.isArray,w=U.isBoolean,F=U.isObject,g=U.isString,o=i.Array,S=function(A){return(A*A*A);},R=function(A){return(3*A*A*(1-A));},Q=function(A){return(3*A*(1-A)*(1-A));},O=function(A){return((1-A)*(1-A)*(1-A));},l=function(Y,X,W,aa,Z){var A=X[0]*S(Y)+aa[0]*R(Y)+Z[0]*Q(Y)+W[0]*O(Y);var ab=X[1]*S(Y)+aa[1]*R(Y)+Z[1]*Q(Y)+W[1]*O(Y);return[A,ab];},I=function(A){return i.instanceOf(A,i.Graphic);},d=function(A){return A*180/Math.PI;},h=function(A){return A===0?0:(A<0?-1:1);},C="anchor",L="arrowPoints",N="boundingBox",V="builder",G="click",y="color",q="connector",t="diagramNode",B="fill",z="graphic",H="helper",K="hidden",P="lazyDraw",c="mouseenter",j="mouseleave",x="name",J="nodeName",n="p1",m="p2",e="path",v="region",u="selected",r="shape",b="shapeArrow",p="shapeArrowHover",M="shapeArrowSelected",D="shapeHover",k="shapeSelected",E="showName",f="stroke",T="visible",a=i.getClassName(H,K);i.PolygonUtil={ARROW_POINTS:[[-12,-6],[-8,0],[-12,6],[6,0]],drawArrow:function(X,Y,aa,W,Z,ab){var A=this;var ac=Math.atan2(Z-aa,W-Y);X.moveTo(W,Z);W=W-5*Math.cos(ac);Z=Z-5*Math.sin(ac);A.drawPolygon(X,A.translatePoints(A.rotatePoints(ab||A.ARROW_POINTS,ac),W,Z));},drawPolygon:function(W,X){var A=this;W.moveTo(X[0][0],X[0][1]);o.each(X,function(Z,Y){if(Y>0){W.lineTo(X[Y][0],X[Y][1]);}});W.lineTo(X[0][0],X[0][1]);},translatePoints:function(X,W,Z){var A=this;var Y=[];o.each(X,function(ab,aa){Y.push([X[aa][0]+W,X[aa][1]+Z]);});return Y;},rotatePoints:function(W,Y){var A=this;var X=[];o.each(W,function(aa,Z){X.push(A.rotatePoint(Y,W[Z][0],W[Z][1]));});return X;},rotatePoint:function(W,A,X){return[(A*Math.cos(W))-(X*Math.sin(W)),(A*Math.sin(W))+(X*Math.cos(W))];}};i.Connector=i.Base.create("line",i.Base,[],{SERIALIZABLE_ATTRS:[y,P,x,k,D,n,m],shape:null,shapeArrow:null,initializer:function(X){var A=this;var W=A.get(P);A.after({nameChange:A._afterNameChange,p1Change:A.draw,p2Change:A.draw,selectedChange:A._afterSelectedChange,showNameChange:A._afterShowNameChange,visibleChange:A._afterVisibleChange});A._initShapes();if(!W){A.draw();}A._uiSetVisible(A.get(T));A._uiSetName(A.get(x));A._uiSetSelected(A.get(u),!W);A._uiSetShowName(A.get(E));},destructor:function(){var A=this;A.shape.destroy();A.shapeArrow.destroy();A.get(J).remove();},draw:function(){var ap=this;var Y=ap.shape;var A=ap.shapeArrow;var X=ap.get(n),W=ap.get(m),al=ap.toCoordinate(X),aj=ap.toCoordinate(W),an=al[0],aa=al[1],am=aj[0],Z=aj[1],ag=Math.max(Math.abs(an-am)/2,10),ae=Math.max(Math.abs(aa-Z)/2,10),ad=null,af=8,ao=d(Math.atan2(Z-aa,am-an)),ab=Math.round(Math.abs(ao)/(360/af));if(h(ao)<0){ad=[[an+ag,aa,am-ag,Z,am,Z],[an+ag,aa,am,aa-ae,am,Z],[an,aa-ae,am,aa-ae,am,Z],[an-ag,aa,am,aa-ae,am,Z],[an-ag,aa,am+ag,Z,am,Z]];}else{ad=[[an+ag,aa,am-ag,Z,am,Z],[an+ag,aa,am,aa+ae,am,Z],[an,aa+ae,am,aa+ae,am,Z],[an-ag,aa,am,aa+ae,am,Z],[an-ag,aa,am+ag,Z,am,Z]];}var ac=ad[ab];Y.clear();Y.moveTo(an,aa);Y.curveTo.apply(Y,ac);Y.end();var ai=l(0,[an,aa],[am,Z],[ac[0],ac[1]],[ac[2],ac[3]]),ah=l(0.075,[an,aa],[am,Z],[ac[0],ac[1]],[ac[2],ac[3]]),ak=l(0.5,[an,aa],[am,Z],[ac[0],ac[1]],[ac[2],ac[3]]);A.clear();i.PolygonUtil.drawArrow(A,ah[0],ah[1],ai[0],ai[1],ap.get(L));A.end();if(ap.get(E)){ap.get(J).center(ap.toXY(ak));}return ap;},getProperties:function(){var A=this;var W=A.getPropertyModel();o.each(W,function(X){X.value=A.get(X.attributeName);});return W;},getPropertyModel:function(){var W=this;var X=W.get(C);var A=X?X.get(t).getStrings():{};return[{attributeName:x,editor:new i.TextCellEditor({validator:{rules:{value:{required:true}}}}),name:A[x]}];},hide:function(){var A=this;A.set(T,false);return A;},show:function(){var A=this;A.set(T,true);return A;},toCoordinate:function(W){var A=this;return A._offsetXY(W,-1);},toJSON:function(){var A=this;var W={};o.each(A.SERIALIZABLE_ATTRS,function(X){W[X]=A.get(X);});return W;},toXY:function(W){var A=this;return A._offsetXY(W,1);},_afterNameChange:function(W){var A=this;A._uiSetName(W.newVal);A.draw();},_afterSelectedChange:function(W){var A=this;A._uiSetSelected(W.newVal);},_afterShowNameChange:function(W){var A=this;A._uiSetShowName(W.newVal);},_afterVisibleChange:function(W){var A=this;A._uiSetVisible(W.newVal);},_initShapes:function(){var A=this;var W=A.shape=A.get(z).addShape(A.get(r));var X=A.shapeArrow=A.get(z).addShape(A.get(b));W.on(G,i.bind(A._onShapeClick,A));W.on(c,i.bind(A._onShapeMouseEnter,A));W.on(j,i.bind(A._onShapeMouseLeave,A));X.on(G,i.bind(A._onShapeClick,A));A.get(J).on(G,i.bind(A._onShapeClick,A));},_offsetXY:function(Y,X){var A=this;var W=A.get(z).getXY();return[Y[0]+W[0]*X,Y[1]+W[1]*X];},_onShapeClick:function(Y){var A=this;var W=A.get(V);var X=A.get(u);if(W){if(Y.hasModifier()){W.closeEditProperties();}else{W.unselectConnectors();if(X){W.closeEditProperties();}else{W.editConnector(A);}}}A.set(u,!X);},_onShapeMouseEnter:function(Y){var A=this;if(!A.get(u)){var X=A.get(D);var W=A.get(p);if(X){A._updateShape(A.shape,X);}if(W){A._updateShape(A.shapeArrow,W);}}},_onShapeMouseLeave:function(W){var A=this;if(!A.get(u)){A._updateShape(A.shape,A.get(r));A._updateShape(A.shapeArrow,A.get(b));}},_setNodeName:function(W){var A=this;if(!i.instanceOf(W,i.Node)){W=new i.Template(W).render();A.get(V).canvas.append(W.unselectable());}return W;},_setShape:function(W){var A=this;return i.merge({type:e,stroke:{color:A.get(y),weight:2,opacity:1}},W);},_setShapeArrow:function(W){var A=this;return i.merge({type:e,fill:{color:A.get(y),opacity:1},stroke:{color:A.get(y),weight:2,opacity:1}},W);},_uiSetName:function(W){var A=this;A.get(J).html(W);},_uiSetSelected:function(X,W){var A=this;A._updateShape(A.shape,X?A.get(k):A.get(r),W);A._updateShape(A.shapeArrow,X?A.get(M):A.get(b),W);},_uiSetShowName:function(W){var A=this;A.get(J).toggleClass(a,!W);},_uiSetVisible:function(W){var A=this;A.shape.set(T,W);A.shapeArrow.set(T,W);A._uiSetShowName(W&&A.get(E));},_updateShape:function(X,Y,W){var A=this;if(Y.hasOwnProperty(B)){X.set(B,Y[B]);}if(Y.hasOwnProperty(f)){X.set(f,Y[f]);}if(W!==false){A.draw();
}}},{ATTRS:{arrowPoints:{value:i.PolygonUtil.ARROW_POINTS},builder:{},color:{value:"#27aae1",validator:g},graphic:{validator:I},lazyDraw:{value:false,validator:w},name:{valueFn:function(){var A=this;return q+(++i.Env._uidx);},validator:g},nodeName:{setter:"_setNodeName",value:['<span class="{$ans}diagram-builder-connector-name"></span>'],writeOnce:true},p1:{value:[0,0],validator:s},p2:{value:[0,0],validator:s},selected:{value:false,validator:w},shape:{value:null,setter:"_setShape"},shapeArrow:{value:null,setter:"_setShapeArrow"},shapeArrowHover:{value:{fill:{color:"#ffd700"},stroke:{color:"#ffd700",weight:5,opacity:0.8}}},shapeArrowSelected:{value:{fill:{color:"#ff6600"},stroke:{color:"#ff6600",weight:5,opacity:0.8}}},shapeHover:{value:{stroke:{color:"#ffd700",weight:5,opacity:0.8}}},shapeSelected:{value:{stroke:{color:"#ff6600",weight:5,opacity:0.8}}},showName:{validator:w,value:true},transition:{value:{},validator:F},visible:{validator:w,value:true}}});},"@VERSION@",{skinnable:true,requires:["aui-base","aui-template","arraylist-add","arraylist-filter","json","graphics","dd"]});