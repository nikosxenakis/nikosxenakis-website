function NumberDialogMenu(){

	var title = "Number";

	this.basicDialogMenu = new BasicDialogMenu(title,DialogMenuData.logicExpressionContentDialogMenuWidth);

	this.dialogTextInput = createHtmlElement({
		format: "input",
		type: "text",
		placeholder: "value",
		father: this.basicDialogMenu.getContentDiv()
	});
    $(this.dialogTextInput).css('max-width', '100%');
    $(this.dialogTextInput).width(100);
    $(this.dialogTextInput).css('margin-left', 175);
	
	$(this.dialogTextInput).on("input",function() {
		var active = DialogMenuController.getActive();
		var outputText = $(active.dialogTextInput).val();
		
		if(!isNaN(outputText) && outputText!=""){
	    	active.basicDialogMenu.enableNextButton(true);
		}
		else{
	    	active.basicDialogMenu.enableNextButton(false);
		}
	});
	
	return this;
};

NumberDialogMenu.prototype.open = function(){

	var inputType = DialogMenuController.getInput().type;
	var inputText = DialogMenuController.getInput().input;
	
	this.input = new InputElement(inputText,inputType)
	
	if(inputType!=InputType.number){
		console.error('wrong input');
		return;
	}
	
    $(this.dialogTextInput).show();

	if(inputText!="")
    	$(this.dialogTextInput).val(inputText);
	else
    	$(this.dialogTextInput).val('0');
};

NumberDialogMenu.prototype.submit = function(){

	var val = $(this.dialogTextInput).val();
	console.log('submit string: ',val);

	this.input.setText(val);
};

NumberDialogMenu.prototype.close = function(){
	console.log('close NumberDialogMenu');

};