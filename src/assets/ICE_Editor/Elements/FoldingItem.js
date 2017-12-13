var FoldingItemState = {
    unfolded : 0,
    folded : 1
};

function FoldingItem (element) {

    this.element = element;
    this.foldingItemState = FoldingItemState.unfolded;
    
    if( !this.element.getRectangle(RectangleOffset.secondHorizontial) ){
        return;
    }

    var c = Canvas.getInstance();
    var pos = this.element.getRectangle(RectangleOffset.firstHorizontial);
    var left = pos.left + FoldingItemData.foldingItemWidth/3;
    var top = pos.top + pos.height - 2*FoldingItemData.foldingItemHeight;

    this.foldingItemBoxInCanvas = new fabric.Rect({
            left: left,
            top: top,
            fill: 'white',
            stroke: '#808080',
            strokeWidth: 1,
            width: FoldingItemData.foldingItemWidth,
            height: FoldingItemData.foldingItemHeight,
            selectable: false,
            hasBorders: false,
            hasControls: false,
            hasRotatingPoint: false,
            opacity: CanvasData.lowOpacity,
            element: this.element,
            foldingItem: this,
            class:this
    });
    
    this.foldingItemInsideBoxHorizontialLineInCanvas = this.makeLine([ 
        this.foldingItemBoxInCanvas.getLeft() + 2, 
        this.foldingItemBoxInCanvas.getTop() + this.foldingItemBoxInCanvas.height/2, 
        this.foldingItemBoxInCanvas.getLeft() + this.foldingItemBoxInCanvas.width - 2, 
        this.foldingItemBoxInCanvas.getTop() + this.foldingItemBoxInCanvas.height/2
    ]);

    this.foldingItemInsideBoxVerticalLineInCanvas = this.makeLine([ 
        this.foldingItemBoxInCanvas.getLeft() + this.foldingItemBoxInCanvas.width/2, 
        this.foldingItemBoxInCanvas.getTop() + 2, 
        this.foldingItemBoxInCanvas.getLeft() + this.foldingItemBoxInCanvas.width/2, 
        this.foldingItemBoxInCanvas.getTop() + this.foldingItemBoxInCanvas.height - 2, 
    ]);

    this.foldingItem = new fabric.Group(
        [   this.foldingItemBoxInCanvas, 
            this.foldingItemInsideBoxHorizontialLineInCanvas, 
            this.foldingItemInsideBoxVerticalLineInCanvas
        ], { 
            left: left, 
            top: top,
            selectable: false,
            hasBorders: false,
            hasControls: false,
            hasRotatingPoint: false,
            class: this
    });

    this.foldingItemLineInCanvas = this.makeLine([ 
        this.foldingItem.getLeft(), 
        this.foldingItem.getTop() + FoldingItemData.foldingItemHeight, 
        this.foldingItem.getLeft(), 
        this.element.getRectangle(RectangleOffset.secondHorizontial).getTop() + this.element.getRectangle(RectangleOffset.secondHorizontial).height/2
    ]);

    this.foldingItemSecondaryLineInCanvas = this.makeLine([ 
        this.foldingItemLineInCanvas.x2, 
        this.foldingItemLineInCanvas.y2, 
        this.foldingItemLineInCanvas.x2+10, 
        this.foldingItemLineInCanvas.y2
    ]);


    c.canvas.add(this.foldingItem);
    c.canvas.add(this.foldingItemLineInCanvas);
    c.canvas.add(this.foldingItemSecondaryLineInCanvas);

}

FoldingItem.prototype.bringToFront = function (){

    if( ! this.element.getRectangle(RectangleOffset.secondHorizontial) )
        return;

    this.foldingItem.bringToFront();
    this.foldingItemLineInCanvas.bringToFront();
    this.foldingItemSecondaryLineInCanvas.bringToFront();
};

FoldingItem.prototype.sendToBack = function (){

    if( ! this.element.getRectangle(RectangleOffset.secondHorizontial) )
        return;

    this.foldingItem.sendToBack();
    this.foldingItemLineInCanvas.sendToBack();
    this.foldingItemSecondaryLineInCanvas.sendToBack();
};

FoldingItem.prototype.moveFoldingItem = function (){

    if( ! this.element.getRectangle(RectangleOffset.secondHorizontial) )
        return;

    var pos = this.element.getRectangle(RectangleOffset.firstHorizontial);
    var left = pos.left + FoldingItemData.foldingItemWidth/3;
    var top = pos.top + pos.height - 2*FoldingItemData.foldingItemHeight;
    
    this.foldingItem.setLeft(left);
    this.foldingItem.setTop(top);

    this.foldingItem.setCoords();

    this.foldingItemLineInCanvas.set({ 
        'x1': left, 
        'y1': top + FoldingItemData.foldingItemHeight,
        'x2': left, 
        'y2': this.element.getRectangle(RectangleOffset.secondHorizontial).getTop() + this.element.getRectangle(RectangleOffset.secondHorizontial).height/2
    });

    this.foldingItemLineInCanvas.setCoords();

    this.foldingItemSecondaryLineInCanvas.set({ 
        'x1': this.foldingItemLineInCanvas.x2,
        'y1': this.foldingItemLineInCanvas.y2, 
        'x2': this.foldingItemLineInCanvas.x2+10, 
        'y2': this.foldingItemLineInCanvas.y2
    });

    this.foldingItemSecondaryLineInCanvas.setCoords();
}

FoldingItem.prototype.changeSize = function (dy){

    if( ! this.element.getRectangle(RectangleOffset.secondHorizontial) )
        return;

    var y2 = this.foldingItemLineInCanvas.y2;

    this.foldingItemLineInCanvas.set({ 'y2': y2+dy });
    this.foldingItemSecondaryLineInCanvas.set({ 'y1': y2+dy ,'y2': y2+dy });

    this.foldingItemLineInCanvas.setCoords();
    this.foldingItemSecondaryLineInCanvas.setCoords();

    //c.canvas.renderAll();
}

FoldingItem.prototype.setVisibility = function (flag){

    if(this.visible && this.visible == flag)
        return;

    this.visible = flag;
    
    if( ! this.element.getRectangle(RectangleOffset.secondHorizontial) )
        return;

    this.foldingItemLineInCanvas.visible = flag;
    this.foldingItemSecondaryLineInCanvas.visible = flag;

    this.foldingItem.visible = flag;
    this.foldingItemBoxInCanvas.visible = flag;
    this.foldingItemInsideBoxHorizontialLineInCanvas.visible = flag;
    this.foldingItemInsideBoxVerticalLineInCanvas.visible = flag;

    if(this.foldingItemState == FoldingItemState.unfolded){
        this.foldingItemInsideBoxVerticalLineInCanvas.visible = false;
    }
}

FoldingItem.prototype.mouseOver = function (e){
    this.element.getRectangle(RectangleOffset.firstHorizontial).rectangle.mouseOver(e);
};

FoldingItem.prototype.mouseUp = function (e){
    this.element.getRectangle(RectangleOffset.firstHorizontial).rectangle.mouseUp(e);
};

FoldingItem.prototype.mouseDown = function(e){
    if( this.foldingItemState == FoldingItemState.unfolded ){
        this.element.foldElement(this.element);
    }
    else{
        this.element.unfoldElement(this.element);
    } 

    this.element.setOpacity(CanvasData.lowOpacity);

    return false;
};

FoldingItem.prototype.mouseOut = function (e){
    this.element.getRectangle(RectangleOffset.firstHorizontial).rectangle.mouseOut(e);
};

FoldingItem.prototype.makeLine = function (coords){
    return new fabric.Line(coords, {
        fill: 'white',
        stroke: 'grey',
        strokeWidth: 1,
        opacity: 1,
        element: this.element,
        foldingItem: this,
        selectable: false,
        hasBorders: false,
        hasControls: false,
        hasRotatingPoint: false,
        class: this
    });
}

FoldingItem.prototype.removeFoldingItem = function (){
    if( ! this.element.getRectangle(RectangleOffset.secondHorizontial) )
        return;

    c=Canvas.getInstance();
    c.canvas.remove(this.foldingItem);
    //c.canvas.remove(this.foldingItemBoxInCanvas);
    c.canvas.remove(this.foldingItemLineInCanvas);
    c.canvas.remove(this.foldingItemSecondaryLineInCanvas);
    //c.canvas.remove(this.foldingItemInsideBoxHorizontialLineInCanvas);
    //c.canvas.remove(this.foldingItemInsideBoxVerticalLineInCanvas);
};
