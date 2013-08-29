(function(){function apply_generator_to_grammar(){function indent(code){return""!==code?"  "+code.replace(/\n(?![\r\n]|$)/g,"\n  "):code}function multi_indent(code,level){var new_str;return""!==code&&level>0?(new_str=Array(2*level+1).join(" "),new_str+code.replace(/\n(?![\r\n]|$)/g,"\n"+new_str)):code}function create_callback(){return callback_counter+=1,current_callback="k$cb"+callback_counter}function push_class(){class_defs.push(class_def),class_def={name:"",code:"",args:[],has_constructor:!1}}function pop_class(){return class_def=class_defs.pop()}function push_scope(){var new_scope,v,kobj$1,k;scopes.push(scope),try_block_stacks.push(try_block_stack),try_block_stack=[],parfor_cb_stack.push(parfor_cb),parfor_cb=null,new_scope={},current_callbacks.push(current_callback),kobj$1=scope;for(k in kobj$1)kobj$1.hasOwnProperty(k)&&(v=scope[k],"no closures"===v?v=v:"closures ok"===v||"argument"===v||"function"===v?new_scope[k]="closure":"closure"===v&&(new_scope[k]="closure"));scope=new_scope}function pop_scope(code,wrap){var rv,var_names,kobj$2,var_name;rv="",var_names=[],kobj$2=scope;for(var_name in kobj$2)kobj$2.hasOwnProperty(var_name)&&($kindexof.call(["closure","argument","function","class definition"],scope[var_name])>=0||"k$next"===var_name||var_names.push(var_name));return wrap&&(rv+="(function () {\n"),var_names.length>0&&(code="var "+var_names.join(", ")+";\n"+code),rv+=wrap?indent(code):code,wrap&&(rv+="})()"),scopes!==[]&&(scope=scopes.pop()),try_block_stack=try_block_stacks.pop(),current_callback=current_callbacks.pop(),parfor_cb=parfor_cb_stack.pop(),rv}function check_existence_wrapper(code,undefined_unary,invert){var rv;return rv=undefined_unary?invert?"(typeof "+code+" === 'undefined' || "+code+" === null)":"(typeof "+code+" !== 'undefined' && "+code+" !== null)":invert?""+code+" == null":""+code+" != null"}function render_try_blocks(){var rv,indent_level,ki$18,kobj$18,try_block;for(rv="",indent_level=0,kobj$18=try_block_stack,ki$18=0;kobj$18.length>ki$18;ki$18++)try_block=kobj$18[ki$18],rv+=multi_indent(try_block.js_wrapper_try(),indent_level),indent_level+=1;return rv}function render_catch_blocks(){var rv,indent_level,ki$19,kobj$19,try_block;for(rv="",indent_level=try_block_stack.length-1,kobj$19=try_block_stack,ki$19=0;kobj$19.length>ki$19;ki$19++)try_block=kobj$19[ki$19],rv+=multi_indent(try_block.js_wrapper_catch(),indent_level),indent_level-=1;return rv}var scopes,scope,try_block_stack,try_block_stacks,parfor_cb,parfor_cb_stack,callback_counter,current_callback,current_callbacks,comments,class_defs,class_def,use_snippets,self,for_depth,while_depth,snippets;scopes=[],scope={},try_block_stack=[],try_block_stacks=[],parfor_cb=null,parfor_cb_stack=[],callback_counter=0,current_callback="k$cb0",current_callbacks=[],comments=[],class_defs=[],class_def={},use_snippets={},self=this,this.File.prototype.js=function(options){var comment,code,snip,kobj$3,key,rv;scopes=[],scope={},try_block_stack=[],try_block_stacks=[],parfor_cb=null,parfor_cb_stack=[],callback_counter=0,current_callback="k$cb0",current_callbacks=[],class_defs=[],class_def={name:"",code:"",args:[],has_constructor:!1},comments=$kcomprl(this.ts.comments,function($ki){return comment=$ki}),use_snippets={},this.callback=current_callback,this.bare=options.bare,code=self.Block.prototype.js.apply(this),snip=[],kobj$3=use_snippets;for(key in kobj$3)kobj$3.hasOwnProperty(key)&&snip.push(use_snippets[key]);return snip=snip.join("\n"),rv=[snip,code].join("\n"),"k$cb0"!==current_callback&&(rv+="}"),pop_scope(rv,!options.bare)},this.Statement.prototype.js=function(){var comment_postfix,comment,comment_prefix,rv;for(this.statement.in_conditional=this.in_conditional,this.statement.in_loop=this.in_loop,this.statement.parent_block=this.parent_block,this.statement.callback=this.callback,this.statement.original_callback=this.original_callback,comment_postfix="",null!=comments[0]&&comments[0].line===this.statement.line&&comments[0].post_fix&&(comment=comments.shift(),comment_postfix=" /* "+comment.value+" */\n"),comment_prefix="";null!=comments[0]&&comments[0].line<this.statement.line;)comment=comments.shift(),comment_prefix+="/* "+comment.value+" */";return rv=this.statement.js(),""!==comment_postfix&&(rv=rv.replace(/\n/,comment_postfix)),"\n"===rv[0]&&""!==comment_prefix?rv="\n"+comment_prefix+rv:""!==comment_prefix&&(rv=comment_prefix+"\n"+rv),rv},this.ThrowStatement.prototype.js=function(){var rv;return rv=0===try_block_stack.length&&null!=scope.k$next?"return k$next.apply(this, ["+this.expr.js()+"]);\n":"throw "+this.expr.js()+";\n",null!=this.conditional&&(rv=this.conditional.js(rv,!1)),rv},this.ReturnStatement.prototype.js=function(){var exprs_js,expr,arg_list,rv;return exprs_js=$kcomprl(this.exprs,function($ki){return expr=$ki,expr.js()}),null!=scope.k$next?exprs_js.unshift("null"):void 0,arg_list=exprs_js.join(", "),null!=scope.k$next?(scope.k$rv="no closures",rv="return k$rv = ["+arg_list+"], k$next.apply(this, k$rv);",null!=this.conditional&&(rv=this.conditional.js(rv,!1)),rv+="\n"):(rv="return",1===this.exprs.length?rv+=" "+arg_list:this.exprs.length>1&&(rv+="["+arg_list+"]"),rv+=";\n",null!=this.conditional&&(rv=this.conditional.js(rv,!1)),rv)},this.ExpressionStatement.prototype.js=function(){var rv;return rv=this.expr.js(),""===rv?"":this.expr.left.base instanceof self.FunctionExpression?"\n"+rv+"\n\n":rv+";\n"},this.Expression.prototype.js=function(oop_reverse){var rv,left_code,opjs,ki$4,kobj$4,subscope;if(rv="",left_code=oop_reverse?"":this.left.js(),null==this.op)rv+=left_code;else if(opjs=this.op.js(),"in"===opjs&&"of"!==this.op.op.value){if(null==use_snippets["in"]){for(use_snippets["in"]=snippets["in"],kobj$4=scopes,ki$4=0;kobj$4.length>ki$4;ki$4++)subscope=kobj$4[ki$4],subscope.$kindexof="closure";scope.$kindexof="closure"}rv+="($kindexof.call("+this.right.left.js()+", "+left_code+") >= 0) "+this.right.js(!0)}else rv+="nor"===opjs?"!("+left_code+" || "+this.right.js()+")":"pow"===opjs?"Math.pow("+left_code+", "+this.right.left.js()+") "+this.right.js(!0):""+left_code+" "+opjs+" "+this.right.js();return(null!=this.op?this.op.invert:void 0)&&(rv="!("+rv+")"),null!=this.conditional&&(rv=this.conditional.js(rv,!0)),rv},this.UnaryExpression.prototype.js=function(){var rv,base_val,kw_translate,undefined_unary,existence_qualifiers,last_accessor,ki$5,kobj$5,accessor,existence_check,ki$6,kobj$6,eq,closeout,preop_value;for(rv="","IDENTIFIER"===this.base.type?(base_val=this.base.value,kw_translate=KEYWORD_TRANSLATE[base_val],rv+=kw_translate||base_val,null==kw_translate&&(null!=scope[base_val]||!this.is_lvalue()||this.accessors.length>0||this.compound_assign||(scope[base_val]="closures ok"))):rv+=this.base.js(),undefined_unary="IDENTIFIER"===this.base.type&&null==scope[base_val]&&null==kw_translate,existence_qualifiers=[],last_accessor=this.accessors[this.accessors.length-1],kobj$5=this.accessors,ki$5=0;kobj$5.length>ki$5;ki$5++)accessor=kobj$5[ki$5],existence_qualifiers.push(accessor.js_existence(rv,undefined_unary,last_accessor.invert)),rv+=accessor.js(),undefined_unary=!1;for(existence_check=[],kobj$6=existence_qualifiers,ki$6=0;kobj$6.length>ki$6;ki$6++)eq=kobj$6[ki$6],""!==eq&&existence_check.push(eq);return existence_check=existence_check.join(" && "),""!==existence_check&&(last_accessor instanceof self.ExisentialCheck?rv="("+existence_check+")":(closeout="void 0",rv="(("+existence_check+") ? "+rv+" : "+closeout+")")),preop_value=null!=this.preop?this.preop.value:void 0,"new"===preop_value?rv=""+KEYWORD_TRANSLATE[preop_value]+" "+rv:"not"===preop_value?(this.bitwise&&(preop_value="bitwise not"),rv=""+KEYWORD_TRANSLATE[preop_value]+"("+rv+")"):"-"===preop_value&&(rv="-"+rv),rv},this.WhenExpression.prototype.js=function(true_block_js,must_return_value){var conditional_js;return conditional_js=this.condition.js(),("unless"===this.specifier.value||"except"===this.specifier.value)&&(conditional_js="!("+conditional_js+")"),null!=this.false_expr?"("+conditional_js+") ? "+true_block_js+" : "+this.false_expr.js():must_return_value?"("+conditional_js+") ? "+true_block_js+" : void 0":"if ("+conditional_js+") {\n"+indent(true_block_js)+"}\n"},this.ExisentialCheck.prototype.js=function(){return""},this.ExisentialCheck.prototype.js_existence=function(accessor,undefined_unary,invert){return check_existence_wrapper(accessor,undefined_unary,invert)},this.PropertyAccess.prototype.js=function(){var rv;return rv="IDENTIFIER"===this.expr.type?this.expr.value:this.expr.js(),rv="."+rv},this.PropertyAccess.prototype.js_existence=function(accessor,undefined_unary,invert){return this.exisential?check_existence_wrapper(accessor,undefined_unary,invert):""},this.AssignmentStatement.prototype.js=function(){var op,rv;return op=this.assignOp.value,"="!==op&&(op+="=",this.lvalue.compound_assign=!0),rv=""+this.lvalue.js()+" "+op+" "+this.rvalue.js()+";\n",this.rvalue.left.base instanceof self.FunctionExpression&&(rv+="\n"),null!=this.conditional&&(rv=this.conditional.js(rv,!1)),rv},this.NumberConstant.prototype.js=function(){return this.token.text},this.StringConstant.prototype.js=function(){var rv;return rv=this.token.value},this.RegexConstant.prototype.js=function(){return this.token.text},this.BinOp.prototype.js=function(){var op_value;return op_value=this.op.value,this.bitwise&&(op_value="bitwise "+op_value),KEYWORD_TRANSLATE[op_value]||this.op.value},this.IfStatement.prototype.js=function(){var conditional_js,cb_counter,rv,ki$7,kobj$7,else_clause,inner_js;for(null==this.original_callback&&(this.original_callback=this.callback),conditional_js=this.conditional.js(),cb_counter=callback_counter,("unless"===this.condition.value||"except"===this.condition.value)&&(conditional_js="!("+conditional_js+")"),rv="if ("+conditional_js+") {\n",this.block.in_conditional=!0,this.block.in_loop=this.in_loop,kobj$7=this.elses,ki$7=0;kobj$7.length>ki$7;ki$7++)else_clause=kobj$7[ki$7],else_clause.block.in_conditional=!0,else_clause.block.in_loop=this.in_loop;return inner_js=this.js_no_callbacks(),this.callback===current_callback||this.is_else_if||(callback_counter=cb_counter,inner_js=this.js_callbacks()),rv+inner_js},this.IfStatement.prototype.js_no_callbacks=function(){var block_js,else_js,ki$8,kobj$8,else_clause;for(this.block.callback=this.callback,block_js=indent(this.block.js()+this.block.js_closeout())+"}",0===this.elses.length&&(block_js+="\n"),else_js="",kobj$8=this.elses,ki$8=0;kobj$8.length>ki$8;ki$8++)else_clause=kobj$8[ki$8],else_clause.block.callback=this.callback,else_clause.block.original_callback=this.original_callback,else_js+=" else",null!=else_clause.conditional&&(else_js+=" if ("+else_clause.conditional.js()+")"),else_js+=" {\n",else_js+=indent(else_clause.block.js()+else_clause.block.js_closeout()),else_js+="}\n";return block_js+else_js},this.IfStatement.prototype.js_callbacks=function(){var block_js,ki$9,kobj$9,else_clause,else_js,ki$10,kobj$10,callback_js;for(this.callback=create_callback(),this.block.callback=this.callback,this.block.original_callback=this.callback,block_js=indent(this.block.js()),kobj$9=this.elses,ki$9=0;kobj$9.length>ki$9;ki$9++)else_clause=kobj$9[ki$9],else_clause.block.callback=this.callback,else_clause.block.original_callback=this.callback,else_clause.block_js_header=" else ",null!=else_clause.conditional&&(else_clause.block_js_header+="if ("+else_clause.conditional.js()+") "),else_clause.block_js_header+="{\n",else_clause.block_js=indent(else_clause.block.js());for(block_js+=indent(this.block.js_closeout())+"}",0===this.elses.length&&(block_js+="\n"),else_js="",kobj$10=this.elses,ki$10=0;kobj$10.length>ki$10;ki$10++)else_clause=kobj$10[ki$10],else_js+=else_clause.block_js_header+else_clause.block_js+indent(else_clause.block.js_closeout())+"}";return use_snippets.async=snippets.async,callback_js="return $kasync("+this.callback+",this);\n",callback_js+="function "+this.callback+"() {\n",callback_js+=indent(render_try_blocks()),this.parent_block.closeout_callback=this.original_callback,create_callback(),block_js+else_js+"\n"+callback_js},this.BlankStatement.prototype.js=function(){return""},for_depth=1,this.ForStatement.prototype.js=function(){var rv,iterator,terminator,loop_counter,loop_block_js;return this.callback=current_callback,this.loop_block.in_loop=!0,this.loop_block.in_conditional=this.in_conditional,rv="",iterator="ki$"+for_depth,terminator="kobj$"+for_depth,loop_counter="klc$"+for_depth,for_depth+=1,loop_block_js=this.loop_block.js()+this.loop_block.js_closeout(),this.callback!==current_callback?this.js_callbacks(iterator,terminator,loop_counter):(scope[iterator]="no closures",scope[terminator]="no closures","in"===this.type.value?(rv+=""+terminator+" = "+this.iterable.js()+";\n",rv+="for ("+iterator+" = 0; "+iterator+" < "+terminator+".length; "+iterator+"++) {\n",rv+="  "+this.iterant.js()+" = "+terminator+"["+iterator+"];\n"):(rv+=""+terminator+" = "+this.iterable.js()+";\n",rv+="for ("+this.iterant.js()+" in "+terminator+") {\n",rv+="  if (!"+terminator+".hasOwnProperty("+this.iterant.js()+")) {continue;}\n"),rv+=indent(loop_block_js),rv+="}\n",rv)},this.ForStatement.prototype.js_callbacks=function(iterator,terminator,loop_counter){var rv,loop_callback;return rv="","parallel"===(null!=this.execution_style?this.execution_style.value:void 0)?(loop_callback=create_callback(),this.callback=create_callback(),this.loop_block.callback=loop_callback,this.loop_block.original_callback=loop_callback,parfor_cb_stack.push(parfor_cb),parfor_cb=loop_callback,scope[iterator]="no closures",scope[terminator]="no closures",rv+="(function ("+loop_counter+") {\n",rv+="  "+terminator+" = "+this.iterable.js()+";\n",rv+="in"===this.type.value?"  for ("+iterator+" = 0; "+iterator+" < "+terminator+".length; "+iterator+"++) {\n":"  for ("+iterator+" in "+terminator+") {\n",rv+="    (function ("+this.iterant.js()+") {\n",rv+=multi_indent(render_try_blocks(),3),rv+="      "+loop_counter+"++;\n",rv+=multi_indent(this.loop_block.js()+this.loop_block.js_closeout(),3),rv+=multi_indent(render_catch_blocks(),3),rv+="in"===this.type.value?"    })("+terminator+"["+iterator+"]);\n":"    })("+iterator+");\n",rv+="  }\n",use_snippets.async=snippets.async,rv+="  return $kasync("+loop_callback+",this);\n",rv+="  function "+loop_callback+"() {\n",rv+="    if (--"+loop_counter+" == 0) return "+this.callback+"();\n",rv+="  }\n",rv+="})(1);\n",rv+="return;\n",rv+="function "+this.callback+"() {\n",rv+=indent(render_try_blocks()),this.parent_block.closeout_callback=this.original_callback,parfor_cb=parfor_cb_stack.pop()):(this.callback=create_callback(),this.loop_block.callback="k$lcb",this.loop_block.original_callback="k$lcb",use_snippets.async=snippets.async,"in"===this.type.value?rv+="return $kasync("+loop_counter+",this,[0,"+this.iterable.js()+","+this.iterable.js()+"[0]]);\n":(scope[terminator]="no closures",scope[iterator]="no closures",rv+=""+terminator+" = [];\n",rv+="for ("+iterator+" in "+this.iterable.js()+") {if (("+this.iterable.js()+").hasOwnProperty("+iterator+")) {"+terminator+".push("+iterator+")};}\n",rv+="return $kasync("+loop_counter+",this,[0,"+terminator+","+terminator+"[0]]);\n"),rv+="function "+loop_counter+"(k$i,k$obj,"+this.iterant.js()+") {\n",rv+=render_try_blocks(),rv+="  k$i++;\n",rv+="  var k$lcb = function () {if (k$i < k$obj.length) return "+loop_counter+".apply(this,[k$i,k$obj,k$obj[k$i]]); else return "+this.callback+".apply(this);};\n",rv+=indent(this.loop_block.js()+this.loop_block.js_closeout()),rv+=indent(render_catch_blocks()),rv+="}\n",rv+="function "+this.callback+"() {\n",rv+=indent(render_try_blocks()),this.parent_block.closeout_callback=this.original_callback),rv},while_depth=1,this.WhileStatement.prototype.js=function(){var rv;return this.block.in_loop=!0,this.block.in_conditional=this.in_conditional,rv="while ("+this.expr.js()+") {\n",rv+=indent(this.block.js()+this.block.js_closeout()),rv+="}\n",this.callback!==current_callback?this.js_callbacks():rv},this.WhileStatement.prototype.js_callbacks=function(){var rv,while_wrapper;return rv="",while_depth+=1,while_wrapper="kw$"+while_depth,this.callback=create_callback(),this.block.callback="k$lcb",this.block.original_callback="k$lcb",use_snippets.async=snippets.async,rv+="return "+while_wrapper+"();\n",rv+="function "+while_wrapper+"() {\n",rv+=render_try_blocks(),rv+="  var k$lcb = function () {if ("+this.expr.js()+") return $kasync("+while_wrapper+",this); else return $kasync("+this.callback+",this);};\n",rv+=indent(this.block.js()+this.block.js_closeout()),rv+=indent(render_catch_blocks()),rv+="}\n",rv+="function "+this.callback+"() {\n",rv+=indent(render_try_blocks()),this.parent_block.closeout_callback=this.original_callback,rv},this.Block.prototype.js=function(){var previous_cb,rv,statement_js,ki$11,kobj$11,statement;for(null==this.callback&&(this.callback=current_callback),null==this.original_callback&&(this.original_callback=current_callback),previous_cb=current_callback,this.callbacks=[],rv="",this.indent_level=0,kobj$11=this.statements,ki$11=0;kobj$11.length>ki$11;ki$11++)statement=kobj$11[ki$11],statement.parent_block=this,statement.callback=this.callback,statement.original_callback=this.original_callback,statement.in_conditional=this.in_conditional,statement.in_loop=this.in_loop,statement_js=statement.js(),rv+="\n"!==statement_js[0]||"\n\n"!==rv.slice(-2)&&0!==rv.length?multi_indent(statement_js,this.indent_level):multi_indent(statement_js.slice(1),this.indent_level),current_callback!==previous_cb&&(this.indent_level+=1,this.callbacks.unshift(this.callback),this.callback=current_callback,previous_cb=current_callback);return this.callbacks.length>0&&null!=scope.k$next&&(rv+=multi_indent("var k$done = (typeof k$next == 'function') ? k$next : function () {}; k$next=function () {}; return k$done();\n",this.indent_level+1)),rv},this.Block.prototype.js_closeout=function(){var rv,ki$12,kobj$12,callback;for(rv="",null!=this.closeout_callback&&0!==this.callbacks.length&&(this.in_conditional||this.in_loop)&&(use_snippets.async=snippets.async,rv+=multi_indent("return $kasync("+this.closeout_callback+",this);\n",this.indent_level)),kobj$12=this.callbacks,ki$12=0;kobj$12.length>ki$12;ki$12++)callback=kobj$12[ki$12],rv+=multi_indent(render_catch_blocks(),this.indent_level),rv+=multi_indent("}\n",this.indent_level-1);return rv},this.ParenExpression.prototype.js=function(){return"("+this.expr.js()+")"},this.IndexExpression.prototype.js=function(){return"["+this.expr.js()+"]"},this.IndexExpression.prototype.js_existence=function(accessor,undefined_unary,invert){return this.exisential?check_existence_wrapper(accessor,undefined_unary,invert):""},this.ListExpression.prototype.js=function(){var rv,ki$13,kobj$13,item;if(null==this.comprehension){for(rv=[],kobj$13=this.items,ki$13=0;kobj$13.length>ki$13;ki$13++)item=kobj$13[ki$13],rv.push(item.js());return rv=rv.join(", "),"["+rv+"]"}return this.comprehension.js()},this.ListComprehension.prototype.js=function(){var rv;return use_snippets["array list comprehension"]=snippets["array list comprehension"],scope[this.iterant.value]="closures ok",rv="$kcomprl("+this.iterable.js()+",function ($ki) {"+this.iterant.value+" = $ki; return "+this.iter_expr.js()+";})"},this.ObjectComprehension.prototype.js=function(){var rv;return use_snippets["object list comprehension"]=snippets["object list comprehension"],rv="",null!=this.property_iterant&&(scope[this.property_iterant.value]="closures ok",rv+=""+this.property_iterant.value+" = $kp;"),null!=this.value_iterant&&(scope[this.value_iterant.value]="closures ok",rv+=""+this.value_iterant.value+" = $kv;"),rv="$kcompro("+this.iterable.js()+",function ($kp,$kv) {"+rv+"; return "+this.iter_expr.js()+";})"},this.MapItem.prototype.js=function(){return""+this.key.js()+": "+this.val.js()},this.MapExpression.prototype.js=function(){var rv,ki$14,kobj$14,item;for(rv=[],kobj$14=this.items,ki$14=0;kobj$14.length>ki$14;ki$14++)item=kobj$14[ki$14],rv.push(item.js());return rv=rv.join(", "),"{"+rv+"}"},this.FunctionExpression.prototype.js=function(){return"task"===this.specifier.value&&(this.callback="k$next"),class_defs.length>0&&null!=this.name?"method"===this.specifier.value&&"initialize"===this.name.value?(class_def.code+=this.js_constructor(),""):this.js_class_member():this.js_bare_function()},this.FunctionExpression.prototype.js_bare_function=function(){var rv;return rv="function ",null!=this.name&&(rv+=this.name.value),rv+this.js_body()},this.FunctionExpression.prototype.js_class_member=function(){var rv;return rv="method"===this.specifier.value?""+class_def.name+".prototype."+this.name.value+" = function ":""+class_def.name+"."+this.name.value+" = function ",rv+this.js_body()},this.FunctionExpression.prototype.js_constructor=function(){var rv,argument;return class_def.has_constructor=!0,rv="function "+class_def.name,class_def.args=[],class_def.arguments=$kcomprl(this.arguments,function($ki){return argument=$ki}),rv+=this.js_body(class_def.args),null!=this.callback?class_def.arguments.push(this.callback):void 0,rv},this.FunctionExpression.prototype.js_body=function(){var rv,arg_names,argument,ki$15,kobj$15,arg_name,block_code,default_arg_js,ki$16,kobj$16;for(rv="",push_scope(),null!=this.callback&&(scope.k$next=this.callback),arg_names=$kcomprl(this.arguments,function($ki){return argument=$ki,(null!=argument.name?argument.name.value:void 0)||argument}),kobj$15=arg_names,ki$15=0;kobj$15.length>ki$15;ki$15++)arg_name=kobj$15[ki$15],scope[arg_name]="argument";for(block_code=this.block.js(!0)+this.block.js_closeout(),null!=this.callback&&(arg_names.push(this.callback),block_code="try {\n"+indent(block_code)),rv+=indent(pop_scope(block_code,!1)),null!=this.callback&&(rv+="  } catch (k$err) {if (k$next) {return k$next.apply(this,[k$err]);} else {throw k$err;}}\n",rv+="  return k$next ? k$next() : void 0;\n"),default_arg_js="",kobj$16=this.arguments,ki$16=0;kobj$16.length>ki$16;ki$16++)argument=kobj$16[ki$16],null!=argument.default&&(default_arg_js+="  if ("+argument.name.value+" == null) "+argument.name.value+" = "+argument.default.js()+";\n");return rv="("+arg_names.join(", ")+") {\n"+default_arg_js+rv+"}"},this.FunctionCall.prototype.js=function(as_list){var rv,ki$17,kobj$17,argument;for(rv=[],kobj$17=this.arguments,ki$17=0;kobj$17.length>ki$17;ki$17++)argument=kobj$17[ki$17],rv.push(argument.js());return null!=this.callback_name?rv.push(this.callback_name):void 0,rv=rv.join(", "),as_list?"["+rv+"]":"("+rv+")"},this.FunctionCall.prototype.js_existence=function(accessor,undefined_unary,invert){return this.exisential?check_existence_wrapper(accessor,undefined_unary,invert):""},this.FunctionCallArgument.prototype.js=function(){return this.val.js()},this.ClassDefinition.prototype.js=function(){var block_code,rv;return push_scope(),push_class(),class_def.name=this.name.value,class_def.parent=null!=this.parent?this.parent.value:void 0,block_code=this.block.js()+this.block.js_closeout(),block_code=pop_scope(block_code,!1),rv="\n"+class_def.code,""!==(null!=class_def.code)&&(rv+="\n"),class_def.has_constructor||(rv+="function "+class_def.name+"() {\n",null!=this.parent&&(rv+="  return "+this.parent.value+".prototype.constructor.apply(this,arguments);\n"),rv+="}\n"),null!=this.parent?(rv+="__extends("+this.name.value+","+this.parent.value+");\n\n",use_snippets.inherits=snippets.inherits):rv+="\n",rv+=block_code,pop_class(),rv},this.TryCatch.prototype.js=function(){var rv;return try_block_stack.unshift(this),this.try_block.in_conditional=!0,this.try_block.in_loop=this.in_loop,null==this.original_callback&&(this.original_callback=this.callback),rv=this.js_no_callbacks(),this.callback!==current_callback?(this.callback=create_callback(),this.closeout_callback=this.callback,rv=this.js_callbacks()):try_block_stack.shift(),rv},this.TryCatch.prototype.js_no_callbacks=function(){var rv;return rv=this.js_wrapper_try(),this.try_block.original_callback=this.original_callback,rv+=multi_indent(this.try_block.js()+this.try_block.js_closeout(),try_block_stack.length),rv+=this.js_wrapper_catch()},this.TryCatch.prototype.js_callbacks=function(){var rv;return rv=this.js_wrapper_try(),this.try_block.original_callback=this.callback,rv+=multi_indent(this.try_block.js()+this.try_block.js_closeout(),try_block_stack.length),rv+=this.js_wrapper_catch(),rv+="function "+this.callback+"() {\n",try_block_stack.shift(),rv+=indent(render_try_blocks()),this.parent_block.closeout_callback=this.original_callback,rv},this.TryCatch.prototype.js_wrapper_try=function(){var rv;return rv="try {\n"},this.TryCatch.prototype.js_wrapper_catch=function(){var rv,loop_clearout_js;return null!=try_block_stack[0]&&(try_block_stack[0].in_catch=!0),rv="}",loop_clearout_js="",null!=this.catch_block?(rv+=" catch ("+((null!=this.identifier?this.identifier.value:void 0)||"k$e")+") {\n",rv+=indent(this.catch_block.js()+this.catch_block.js_closeout())):(rv+=" catch (k$e) {",(null!=parfor_cb||null!=this.closeout_callback)&&(rv+="\n")),null!=parfor_cb?rv+=indent("return "+parfor_cb+"();\n"):null!=this.closeout_callback&&(rv+=indent("return "+this.closeout_callback+"();\n")),rv+="}\n",null!=try_block_stack[0]&&(try_block_stack[0].in_catch=!1),rv},this.SuperStatement.prototype.js=function(){var rv;return null==class_def.parent?"":(rv=""+class_def.parent+".prototype.constructor.apply(this,",rv+=null!=this.accessor?this.accessor.js(!0):"arguments",rv+=");\n")},this.WaitForStatement.prototype.js=function(){var prefix,rv,number,tvalue_js,rv_block,arg_i,ki$20,kobj$20,argument,try_count;if(null!=try_block_stack[0]?try_block_stack[0].in_catch:void 0)throw Error("wait fors not supported in catch blocks");for(prefix=this.parent_block.bare?"":"return ",this.new_callback=create_callback(),null!=this.rvalue?(this.rvalue.callback_args=this.lvalue,this.rvalue.accessors[this.rvalue.accessors.length-1].callback_name=this.new_callback,rv=""+prefix+this.rvalue.js()+";\n"):(number=this.tvalue.number_constant(),null!=number?tvalue_js=""+1e3*number:(tvalue_js=this.tvalue.js(),null!=this.tvalue.op&&(tvalue_js="("+this.tvalue.js()+")*1000")),rv=""+prefix+"setTimeout("+this.new_callback+","+tvalue_js+");\n"),null!=this.conditional&&(rv=this.conditional.js(rv,!1),rv+=""+prefix+this.new_callback+"();\n"),rv_block="",arg_i=this.no_errors?0:1,kobj$20=(null!=this.lvalue?this.lvalue.arguments:void 0)||[],ki$20=0;kobj$20.length>ki$20;ki$20++)argument=kobj$20[ki$20],rv_block+=""+argument.base.value+" = arguments["+arg_i+"];\n",null==scope[argument.base.value]&&(scope[argument.base.value]="closures ok"),arg_i+=1;return this.block.in_conditional=this.in_conditional,this.block.in_loop=this.in_loop,rv_block+=this.block.js(),rv+="function "+this.new_callback+"() {\n",try_count=try_block_stack.length+1,"undefined"!=typeof try_block&&null!==try_block&&(try_count+=1),rv+=indent(render_try_blocks()),this.no_errors||(rv+=multi_indent("if (arguments[0] != null) throw arguments[0];\n",try_count)),rv+=multi_indent(rv_block,try_count),this.in_conditional||this.in_loop?(use_snippets.async=snippets.async,rv+=multi_indent(""+prefix+"$kasync("+this.parent_block.original_callback+",this);\n",this.block.indent_level+try_count)):scope.k$next&&(rv+=multi_indent(""+prefix+"k$next ? k$next() : void 0;\n",this.block.indent_level+try_count)),rv+=this.block.js_closeout()},snippets={"in":"var $kindexof = [].indexOf || function (item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };",inherits:"var __hasProp = {}.hasOwnProperty, __extends = function (child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; }","array list comprehension":'var $kcomprl = function (iterable,func) {var o = []; if (iterable instanceof Array) {for (var i=0;i<iterable.length;i++) {o.push(func(iterable[i]));}} else if (typeof(iterable.next) == "function") {var i; while ((i = iterable.next()) != null) {o.push(func(i));}} else {throw "Object is not iterable";}return o;};',"object list comprehension":"var $kcompro = function (obj,func) {var o = []; for (var k in obj) {o.push(func(k,obj[k]));}return o;}",async:'var $kasync = (typeof process === "undefined" || !(process.nextTick)) ? (function (fn,self,args) {setTimeout(function () {fn.apply(self,args);}, 0);}) : (function (fn,self,args) {process.nextTick(function () {fn.apply(self,args);});});'}}var KEYWORD_TRANSLATE,load,$kindexof=[].indexOf||function(item){for(var i=0,l=this.length;l>i;i++)if(i in this&&this[i]===item)return i;return-1},$kcomprl=function(iterable,func){var o=[];if(iterable instanceof Array)for(var i=0;iterable.length>i;i++)o.push(func(iterable[i]));else{if("function"!=typeof iterable.next)throw"Object is not iterable";for(var i;null!=(i=iterable.next());)o.push(func(i))}return o};KEYWORD_TRANSLATE={yes:"true",on:"true",no:"false",off:"false",is:"===",isnt:"!==","==":"===","!=":"!==",and:"&&",but:"&&",or:"||",xor:"^","^":"pow",mod:"%",not:"!","new":"new ",me:"this","this":"this","null":"null",nothing:"null",none:"null","break":"break","throw":"throw",raise:"throw","instanceof":"instanceof",of:"in",EndOfList:"undefined",fail:"throw","bitwise and":"&","bitwise or":"|","bitwise xor":"^","bitwise not":"~"},load=function load(grammar){apply_generator_to_grammar.apply(grammar)},exports.load=load})();