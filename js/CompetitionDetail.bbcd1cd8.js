(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["CompetitionDetail"],{1681:function(t,e,i){},"28b1":function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-row",[i("v-col",{attrs:{cols:"12",sm:"10",md:"8",lg:"6",xl:"4"}},[i("v-form",[i("v-text-field",{attrs:{readonly:"","persistent-hint":"",label:"竞赛名称"},model:{value:t.competitionForm.name,callback:function(e){t.$set(t.competitionForm,"name",e)},expression:"competitionForm.name"}}),i("v-text-field",{attrs:{readonly:"","persistent-hint":"",label:"负责人"},model:{value:t.competitionForm.principal,callback:function(e){t.$set(t.competitionForm,"principal",e)},expression:"competitionForm.principal"}}),i("v-select",{attrs:{readonly:"",items:t.collegeItems,"persistent-hint":"",label:"所属学院"},model:{value:t.competitionForm.college,callback:function(e){t.$set(t.competitionForm,"college",e)},expression:"competitionForm.college"}}),i("v-select",{attrs:{readonly:"","persistent-hint":"",items:t.statusItems,label:"当前状态"},model:{value:t.competitionForm.status,callback:function(e){t.$set(t.competitionForm,"status",e)},expression:"competitionForm.status"}}),i("v-textarea",{attrs:{"auto-grow":"",clearable:"",label:"竞赛描述"},model:{value:t.competitionForm.description,callback:function(e){t.$set(t.competitionForm,"description",e)},expression:"competitionForm.description"}}),t.competitionForm.status?t._e():i("v-btn",{attrs:{color:"success"},on:{click:t.checkCompetition}},[t._v("审核 ")])],1)],1)],1)},o=[],a=i("8897"),r={name:"CompetitionDetail",data:function(){return{competitionForm:{id:1,status:1,name:"软件设计大赛",college:"软件学院",startTime:"第5周",endTime:"第16周",principal:"Teacher",description:"为了激发学生专业学习兴趣和学习主动性，拓展学生专业知识面，快速提高专业水平，促进学院学风建设，特举办2019年第15届软件知识大赛。"},collegeItems:["软件学院","计算机学院"]}},computed:{statusItems:function(){return a["a"]}},methods:{checkCompetition:function(){confirm("是否审核？")&&(this.competitionForm.status=1)}}},s=r,u=i("2877"),c=i("6544"),l=i.n(c),d=i("8336"),h=i("62ad"),p=i("4bd4"),m=i("0fd9"),f=i("b974"),v=i("8654"),g=(i("a9e3"),i("5530")),w=(i("1681"),i("58df")),b=Object(w["a"])(v["a"]),x=b.extend({name:"v-textarea",props:{autoGrow:Boolean,noResize:Boolean,rowHeight:{type:[Number,String],default:24,validator:function(t){return!isNaN(parseFloat(t))}},rows:{type:[Number,String],default:5,validator:function(t){return!isNaN(parseInt(t,10))}}},computed:{classes:function(){return Object(g["a"])({"v-textarea":!0,"v-textarea--auto-grow":this.autoGrow,"v-textarea--no-resize":this.noResizeHandle},v["a"].options.computed.classes.call(this))},noResizeHandle:function(){return this.noResize||this.autoGrow}},watch:{lazyValue:function(){this.autoGrow&&this.$nextTick(this.calculateInputHeight)},rowHeight:function(){this.autoGrow&&this.$nextTick(this.calculateInputHeight)}},mounted:function(){var t=this;setTimeout((function(){t.autoGrow&&t.calculateInputHeight()}),0)},methods:{calculateInputHeight:function(){var t=this.$refs.input;if(t){t.style.height="0";var e=t.scrollHeight,i=parseInt(this.rows,10)*parseFloat(this.rowHeight);t.style.height=Math.max(i,e)+"px"}},genInput:function(){var t=v["a"].options.methods.genInput.call(this);return t.tag="textarea",delete t.data.attrs.type,t.data.attrs.rows=this.rows,t},onInput:function(t){v["a"].options.methods.onInput.call(this,t),this.autoGrow&&this.calculateInputHeight()},onKeyDown:function(t){this.isFocused&&13===t.keyCode&&t.stopPropagation(),this.$emit("keydown",t)}}}),F=Object(u["a"])(s,n,o,!1,null,"1d16b5c1",null);e["default"]=F.exports;l()(F,{VBtn:d["a"],VCol:h["a"],VForm:p["a"],VRow:m["a"],VSelect:f["a"],VTextField:v["a"],VTextarea:x})},"4bd4":function(t,e,i){"use strict";i("4de4"),i("7db0"),i("4160"),i("caad"),i("07ac"),i("2532"),i("159b");var n=i("5530"),o=i("58df"),a=i("7e2b"),r=i("3206");e["a"]=Object(o["a"])(a["a"],Object(r["b"])("form")).extend({name:"v-form",inheritAttrs:!1,props:{lazyValidation:Boolean,value:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(t){var e=Object.values(t).includes(!0);this.$emit("input",!e)},deep:!0,immediate:!0}},methods:{watchInput:function(t){var e=this,i=function(t){return t.$watch("hasError",(function(i){e.$set(e.errorBag,t._uid,i)}),{immediate:!0})},n={_uid:t._uid,valid:function(){},shouldValidate:function(){}};return this.lazyValidation?n.shouldValidate=t.$watch("shouldValidate",(function(o){o&&(e.errorBag.hasOwnProperty(t._uid)||(n.valid=i(t)))})):n.valid=i(t),n},validate:function(){return 0===this.inputs.filter((function(t){return!t.validate(!0)})).length},reset:function(){this.inputs.forEach((function(t){return t.reset()})),this.resetErrorBag()},resetErrorBag:function(){var t=this;this.lazyValidation&&setTimeout((function(){t.errorBag={}}),0)},resetValidation:function(){this.inputs.forEach((function(t){return t.resetValidation()})),this.resetErrorBag()},register:function(t){this.inputs.push(t),this.watchers.push(this.watchInput(t))},unregister:function(t){var e=this.inputs.find((function(e){return e._uid===t._uid}));if(e){var i=this.watchers.find((function(t){return t._uid===e._uid}));i&&(i.valid(),i.shouldValidate()),this.watchers=this.watchers.filter((function(t){return t._uid!==e._uid})),this.inputs=this.inputs.filter((function(t){return t._uid!==e._uid})),this.$delete(this.errorBag,e._uid)}}},render:function(t){var e=this;return t("form",{staticClass:"v-form",attrs:Object(n["a"])({novalidate:!0},this.attrs$),on:{submit:function(t){return e.$emit("submit",t)}}},this.$slots.default)}})}}]);