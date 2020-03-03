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
        this.save = this.save.bind(this);
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
        const positionData = {
          start: { ...this.prevPos },
          stop: { ...offSetData },
        };
        this.line = this.line.concat(positionData);
        this.paint(this.prevPos, offSetData, this.color);
      }
    }

    paint(prevPos, currPos, strokeStyle) {
      const { offsetX, offsetY } = currPos;
      const { offsetX: x, offsetY: y } = prevPos;

      this.ctx.beginPath();
      this.ctx.strokeStyle = strokeStyle;
      this.ctx.moveTo(x, y);
      this.ctx.lineTo(offsetX, offsetY);
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
      this.ctx.fillStyle = '#FFFFFF';
      this.ctx.fillRect(0, 0, canvas.width, canvas.height);
      this.color = '#000000';
      this.lineWidth = 5;
    }

    save() {
      const data = this.canvas.toDataURL('image/png');
      const anchor = document.createElement('a');
      anchor.href = data;
      anchor.download = 'image.png';
      anchor.click();
    }

    componentDidMount() {
        this.canvas = this.refs.canvas;
        this.ctx = this.canvas.getContext('2d');
        this.ctx.lineJoin = 'round';
        this.ctx.lineCap = 'round';
        this.ctx.lineWidth = 5;
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    render() {
        return(
          <React.Fragment>
            <div className="container">
              <div>
                <canvas id="canvas" ref="canvas"
                  width={750}
                  height={750}
                  onMouseDown={this.onMouseDown}
                  onMouseLeave={this.endPaintEvent}
                  onMouseUp={this.endPaintEvent}
                  onMouseMove={this.onMouseMove}>
                </canvas>
              </div>
              <div id="colors">
                <button className="toolButton" onClick={this.turnOnDraw.bind(null, '#DC143C')} style={{backgroundColor: '#DC143C', color: '#FFFFFF'}}>Draw</button>
                <button className="toolButton" onClick={this.turnOnDraw.bind(null, '#FFA500')} style={{backgroundColor: '#FFA500', color: '#FFFFFF'}}>Draw</button>
                <button className="toolButton" onClick={this.turnOnDraw.bind(null, '#FFD700')} style={{backgroundColor: '#FFD700', color: '#FFFFFF'}}>Draw</button>
                <button className="toolButton" onClick={this.turnOnDraw.bind(null, '#00FF7F')} style={{backgroundColor: '#00FF7F', color: '#FFFFFF'}}>Draw</button>
                <button className="toolButton" onClick={this.turnOnDraw.bind(null, '#1E90FF')} style={{backgroundColor: '#1E90FF', color: '#FFFFFF'}}>Draw</button>
                <button className="toolButton" onClick={this.turnOnDraw.bind(null, '#663399')} style={{backgroundColor: '#663399', color: '#FFFFFF'}}>Draw</button>
                <button className="toolButton" onClick={this.turnOnDraw.bind(null, '#000000')} style={{backgroundColor: '#000000', color: '#FFFFFF'}}>Draw</button>
                <button className="toolButton" onClick={this.turnOnDraw.bind(null, '#696969')} style={{backgroundColor: '#696969', color: '#FFFFFF'}}>Draw</button>
                <button className="toolButton" onClick={this.turnOnDraw.bind(null, '#DCDCDC')} style={{backgroundColor: '#DCDCDC', color: '#FFFFFF'}}>Draw</button>
                <button className="toolButton" onClick={this.turnOnDraw.bind(null, '#FFDEAD')} style={{backgroundColor: '#FFDEAD', color: '#FFFFFF'}}>Draw</button>
                <button className="toolButton" onClick={this.turnOnDraw.bind(null, '#8B4513')} style={{backgroundColor: '#8B4513', color: '#FFFFFF'}}>Draw</button>
                <button className="toolButton" onClick={this.turnOnDraw.bind(null, '#800000')} style={{backgroundColor: '#800000', color: '#FFFFFF'}}>Draw</button>
                <button className="toolButton" onClick={this.turnOnDraw.bind(null, '#FF69B4')} style={{backgroundColor: '#FF69B4', color: '#FFFFFF'}}>Draw</button>
                <button className="toolButton" onClick={this.turnOnDraw.bind(null, '#FFC0CB')} style={{backgroundColor: '#FFC0CB', color: '#FFFFFF'}}>Draw</button>
              </div>
              <div id="tools">
                <button className="toolButton" onClick={this.turnOnErase} style={{backgroundColor: 'aliceblue'}}>Erase</button>
                <button className="toolButton" onClick={this.eraseAll} style={{backgroundColor: 'aliceblue'}}>Clear</button>
              </div>
              <div id="etc">
                <button className="toolButton" onClick={this.save} style={{backgroundColor: 'aliceblue'}}>Save your drawing!</button>
              </div>
            </div>
          </React.Fragment>
        );
    }
}

export default Paint;