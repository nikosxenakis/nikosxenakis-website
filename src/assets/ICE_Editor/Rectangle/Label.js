function Label (id,relPos,color,size){

    var c=Canvas.getInstance();

    this.relPos = relPos;

	this.label = new fabric.IText(id,{
        left: relPos.left,
        top: relPos.top,
        fill: color,
        fontSize: size,
        shadow: color+' 0px 0px 1px',
        fontFamily: "Helvetica",
        fontWeight: 100,
        id: id,
        textAlign:"center",
        hasBorders: false,
        hasControls: false,
        hasRotatingPoint: false,
        class: this
    });

    c.canvas.add(this.label);

};

Label.prototype.getLeft = function (){
    return this.label.getLeft();
};

Label.prototype.getTop = function (){
    return this.label.getTop();
};

Label.prototype.getWidth = function (){
    return this.label.width;
};

Label.prototype.getHeight = function (){
    return this.label.height;
};

Label.prototype.setFontSize = function (size){
    this.label.setFontSize(size);
};

Label.prototype.getFontSize = function (flag){
    return this.label.getFontSize(size);
};

Label.prototype.move = function (dx,dy){

    this.label.setLeft(this.label.getLeft() + dx);
    this.label.setTop(this.label.getTop() + dy);

    this.label.setCoords();
};

Label.prototype.remove = function (){
	var c=Canvas.getInstance();
	c.canvas.remove(this.label);
	this.label = null;
};

Label.prototype.setVisibillity = function (flag){
	this.label.visible = flag;
};

Label.prototype.bringToFront = function (){
    this.label.bringToFront();
};

Label.prototype.mouseOver = function (){
    if(this.rectangle)
        this.rectangle.mouseOver();
};

Label.prototype.mouseUp = function (){
    if(this.rectangle)
        this.rectangle.mouseUp();
};

Label.prototype.mouseDown = function (){
    if(this.rectangle)
        this.rectangle.mouseDown();
};

Label.prototype.mouseOut = function (){
    if(this.element)
        this.rectangle.mouseOut();
};

Label.prototype.sendToBack = function (){
    this.label.sendToBack();
};
