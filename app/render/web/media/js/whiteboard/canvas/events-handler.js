var canvas;
var isTouch;
var keyCode;

function onkeydown(e) {
    keyCode = e.keyCode;

    if (!isControlKeyPressed && keyCode === 17) {
        isControlKeyPressed = true;
    }
}

function onkeyup(e) {
    keyCode = e.keyCode;

    /*-------------------------- Ctrl + Z --------------------------*/
    
    if (isControlKeyPressed && keyCode === 90) {
        if (points.length) {
            points.length = points.length - 1;
            drawHelper.redraw();
        }
    }

    /*-------------------------- Ctrl + A --------------------------*/

    if (isControlKeyPressed && keyCode === 65) {
        dragHelper.global.startingIndex = 0;

        endLastPath();
        
        setSelection(find('drag-all-paths'), 'DragAllPaths');
    }

    /*-------------------------- Ctrl + C --------------------------*/
    
    if (isControlKeyPressed && keyCode === 67 && points.length) {
        copy();
    }

    /*-------------------------- Ctrl + V --------------------------*/
    if (isControlKeyPressed && keyCode === 86 && copiedStuff.length) {
        paste();
    }

    /*-------------------------- Ending the Control Key --------------------------*/
    
    if (keyCode === 17) {
        isControlKeyPressed = false;
    }
}

function initEvents() {
    canvas = tempContext.canvas;
    isTouch = 'createTouch' in document;

    addEvent(canvas, 'touchstart', function (e) {
        if (isTouch) e = e.pageX ? e : e.touches.length ? e.touches[0] : { pageX: 0, pageY: 0 };

        var cache = is;

        if (cache.isLine) lineHandler.mousedown(e);
        else if (cache.isPen) pencilHandler.mousedown(e);
        else if (cache.isArc) arcHandler.mousedown(e);
        else if (cache.isRectangle) rectHandler.mousedown(e);
        else if (cache.isQuadraticCurve) quadraticHandler.mousedown(e);
        else if (cache.isBezierCurve) bezierHandler.mousedown(e);
        else if (cache.isDragLastPath || cache.isDragAllPaths) dragHelper.mousedown(e);
        else if (is.isPencil) pencilHandler.mousedown(e);
        else if (is.isEraser) eraserHandler.mousedown(e);
        else if (is.isText) textHandler.mousedown(e);
        else if (is.isHand) handHandler.mousedown(e);

        drawHelper.redraw();
    });

    addEvent(canvas, 'mousedown', function (e) {
        if (isTouch) e = e.pageX ? e : e.touches.length ? e.touches[0] : { pageX: 0, pageY: 0 };

        var cache = is;

        if (cache.isLine) lineHandler.mousedown(e);
        else if (cache.isPen) pencilHandler.mousedown(e);
        else if (cache.isArc) arcHandler.mousedown(e);
        else if (cache.isRectangle) rectHandler.mousedown(e);
        else if (cache.isQuadraticCurve) quadraticHandler.mousedown(e);
        else if (cache.isBezierCurve) bezierHandler.mousedown(e);
        else if (cache.isDragLastPath || cache.isDragAllPaths) dragHelper.mousedown(e);
        else if (is.isPencil) pencilHandler.mousedown(e);
        else if (is.isEraser) eraserHandler.mousedown(e);
        else if (is.isText) textHandler.mousedown(e);
        else if (is.isHand) handHandler.mousedown(e);

        drawHelper.redraw();
    });

    // -------------------------------------------------------------

    addEvent(canvas, 'touchend', function (e) {
        if (isTouch) e = e.pageX ? e : e.touches.length ? e.touches[0] : { pageX: 0, pageY: 0 };

        var cache = is;

        if (cache.isLine) lineHandler.mouseup(e);
        else if (cache.isPen) pencilHandler.mouseup(e);
        else if (cache.isArc) arcHandler.mouseup(e);
        else if (cache.isRectangle) rectHandler.mouseup(e);
        else if (cache.isQuadraticCurve) quadraticHandler.mouseup(e);
        else if (cache.isBezierCurve) bezierHandler.mouseup(e);
        else if (cache.isDragLastPath || cache.isDragAllPaths) dragHelper.mouseup(e);
        else if (is.isPencil) pencilHandler.mouseup(e);
        else if (is.isEraser) eraserHandler.mouseup(e);
        else if (is.isText) textHandler.mouseup(e);
        else if (is.isHand) handHandler.mouseup(e);

        drawHelper.redraw();
    });

    addEvent(canvas, 'mouseup', function (e) {
        if (isTouch) e = e.pageX ? e : e.touches.length ? e.touches[0] : { pageX: 0, pageY: 0 };

        var cache = is;

        if (cache.isLine) lineHandler.mouseup(e);
        else if (cache.isPen) pencilHandler.mouseup(e);
        else if (cache.isArc) arcHandler.mouseup(e);
        else if (cache.isRectangle) rectHandler.mouseup(e);
        else if (cache.isQuadraticCurve) quadraticHandler.mouseup(e);
        else if (cache.isBezierCurve) bezierHandler.mouseup(e);
        else if (cache.isDragLastPath || cache.isDragAllPaths) dragHelper.mouseup(e);
        else if (is.isPencil) pencilHandler.mouseup(e);
        else if (is.isEraser) eraserHandler.mouseup(e);
        else if (is.isText) textHandler.mouseup(e);
        else if (is.isHand) handHandler.mouseup(e);

        drawHelper.redraw();
    });


    addEvent(canvas, 'touchleave', function (e) {
        if (isTouch) e = e.pageX ? e : e.touches.length ? e.touches[0] : { pageX: 0, pageY: 0 };

        var cache = is;

        if (cache.isLine) lineHandler.mouseup(e);
        else if (cache.isPen) pencilHandler.mouseup(e);
        else if (cache.isArc) arcHandler.mouseup(e);
        else if (cache.isRectangle) rectHandler.mouseup(e);
        else if (cache.isQuadraticCurve) quadraticHandler.mouseup(e);
        else if (cache.isBezierCurve) bezierHandler.mouseup(e);
        else if (cache.isDragLastPath || cache.isDragAllPaths) dragHelper.mouseup(e);
        else if (is.isPencil) pencilHandler.mouseup(e);
        else if (is.isEraser) eraserHandler.mouseup(e);
        else if (is.isText) textHandler.mouseup(e);
        else if (is.isHand) handHandler.mouseup(e);

        drawHelper.redraw();
    });

    addEvent(canvas, 'mouseleave', function (e) {
        if (isTouch) e = e.pageX ? e : e.touches.length ? e.touches[0] : { pageX: 0, pageY: 0 };

        var cache = is;

        if (cache.isLine) lineHandler.mouseup(e);
        else if (cache.isPen) pencilHandler.mouseup(e);
        else if (cache.isArc) arcHandler.mouseup(e);
        else if (cache.isRectangle) rectHandler.mouseup(e);
        else if (cache.isQuadraticCurve) quadraticHandler.mouseup(e);
        else if (cache.isBezierCurve) bezierHandler.mouseup(e);
        else if (cache.isDragLastPath || cache.isDragAllPaths) dragHelper.mouseup(e);
        else if (is.isPencil) pencilHandler.mouseup(e);
        else if (is.isEraser) eraserHandler.mouseup(e);
        else if (is.isText) textHandler.mouseup(e);
        else if (is.isHand) handHandler.mouseup(e);

        drawHelper.redraw();
    });

    // -------------------------------------------------------------

    addEvent(canvas, 'touchmove', function (e) {
        if (isTouch) e = e.pageX ? e : e.touches.length ? e.touches[0] : { pageX: 0, pageY: 0 };

        var cache = is;

        if (cache.isLine) lineHandler.mousemove(e);
        else if (cache.isPen) pencilHandler.mousemove(e);
        else if (cache.isArc) arcHandler.mousemove(e);
        else if (cache.isRectangle) rectHandler.mousemove(e);
        else if (cache.isQuadraticCurve) quadraticHandler.mousemove(e);
        else if (cache.isBezierCurve) bezierHandler.mousemove(e);
        else if (cache.isDragLastPath || cache.isDragAllPaths) dragHelper.mousemove(e);
        else if (is.isPencil) pencilHandler.mousemove(e);
        else if (is.isEraser) eraserHandler.mousemove(e);
        else if (is.isText) textHandler.mousemove(e);
        else if (is.isHand) handHandler.mousemove(e);
    });

    addEvent(canvas, 'mousemove', function (e) {
        if (isTouch) e = e.pageX ? e : e.touches.length ? e.touches[0] : { pageX: 0, pageY: 0 };

        var cache = is;

        if (cache.isLine) lineHandler.mousemove(e);
        else if (cache.isPen) pencilHandler.mousemove(e);
        else if (cache.isArc) arcHandler.mousemove(e);
        else if (cache.isRectangle) rectHandler.mousemove(e);
        else if (cache.isQuadraticCurve) quadraticHandler.mousemove(e);
        else if (cache.isBezierCurve) bezierHandler.mousemove(e);
        else if (cache.isDragLastPath || cache.isDragAllPaths) dragHelper.mousemove(e);
        else if (is.isPencil) pencilHandler.mousemove(e);
        else if (is.isEraser) eraserHandler.mousemove(e);
        else if (is.isText) textHandler.mousemove(e);
        else if (is.isHand) handHandler.mousemove(e);
    });

    addEvent(document, 'keydown', onkeydown);
    addEvent(document, 'keyup', onkeyup);
}