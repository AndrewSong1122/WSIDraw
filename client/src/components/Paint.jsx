import React from 'react';

class Paint extends React.Component {
    constructor(props) {
        super(props);

        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.endPaintEvent = this.endPaintEvent.bind(this);
        this.turnOnDraw = this.turnOnDraw.bind(this);
        this.turnOnErase = this.turnOnErase.bind(this);
        this.eraseAll = this.eraseAll.bind(this);
      }

    isPainting = false;
    line = [];
    prevPos = { offsetX: 0, offsetY: 0 };
    color = '#000000';
    lineWidth = 5;

    onMouseDown({ nativeEvent }) {
      const { offsetX, offsetY } = nativeEvent;
      this.isPainting = true;
      this.prevPos = { offsetX, offsetY };
      this.ctx.lineWidth = this.lineWidth;
    }


    onMouseMove({ nativeEvent }) {
      if (this.isPainting) {
        const { offsetX, offsetY } = nativeEvent;
        const offSetData = { offsetX, offsetY };
        // Set the start and stop position of the paint event.
        const positionData = {
          start: { ...this.prevPos },
          stop: { ...offSetData },
        };
        // Add the position to the line array
        this.line = this.line.concat(positionData);
        this.paint(this.prevPos, offSetData, this.color);
      }
    }

    paint(prevPos, currPos, strokeStyle) {
      const { offsetX, offsetY } = currPos;
      const { offsetX: x, offsetY: y } = prevPos;

      this.ctx.beginPath();
      this.ctx.strokeStyle = strokeStyle;
      // Move the the prevPosition of the mouse
      this.ctx.moveTo(x, y);
      // Draw a line to the current position of the mouse
      this.ctx.lineTo(offsetX, offsetY);
      // Visualize the line using the strokeStyle
      this.ctx.stroke();
      this.prevPos = { offsetX, offsetY };
    }

    endPaintEvent() {
      if (this.isPainting) {
        this.isPainting = false;
      }
    }

    turnOnDraw(color) {
      this.color = color;
      this.lineWidth = 5;
    }

    turnOnErase() {
      this.color = '#FFFFFF';
      this.lineWidth = 30;
    }

    eraseAll() {
      this.ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.color = '#000000';
      this.lineWidth = 5;
    }

    componentDidMount() {
        this.canvas = this.refs.canvas;
        this.ctx = this.canvas.getContext('2d');
        this.ctx.lineJoin = 'round';
        this.ctx.lineCap = 'round';
        this.ctx.lineWidth = 5;
    }

    render() {
        return(
          <React.Fragment>
            <div className="container">
              <div>
                <canvas id="canvas" ref="canvas" width={1000}
                  height={800}
                  onMouseDown={this.onMouseDown}
                  onMouseLeave={this.endPaintEvent}
                  onMouseUp={this.endPaintEvent}
                  onMouseMove={this.onMouseMove}>
                </canvas>
              </div>
              <button className="toolButton" onClick={this.turnOnDraw.bind(null, '#000000')} style={{backgroundColor: '#000000', color: '#FFFFFF'}}>Draw</button>
              <button className="toolButton" onClick={this.turnOnDraw.bind(null, '#DC143C')} style={{backgroundColor: '#DC143C', color: '#FFFFFF'}}>Draw</button>
              <button className="toolButton" onClick={this.turnOnDraw.bind(null, '#1E90FF')} style={{backgroundColor: '#1E90FF', color: '#FFFFFF'}}>Draw</button>
              <button className="toolButton" onClick={this.turnOnErase} style={{backgroundColor: 'aliceblue'}}>Erase</button>
              <button className="toolButton" onClick={this.eraseAll} style={{backgroundColor: 'aliceblue'}}>Clear</button>
            </div>
          </React.Fragment>
        );
    }
}

export default Paint;