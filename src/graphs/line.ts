
export default class LineGraph implements Graph{

    _x: number[] = [];
    _y: number[] = [];

    set x(x_axis:StringOrNumberArray){
        this._x = x_axis.map((val) => parseInt(<string>val));
    }
    
    set y(y_axis:StringOrNumberArray){
        this._y = y_axis.map((val) => parseInt(<string>val));
    }

    generate():void{
        
        let arrays:number[][] = Array(Math.max(...this._y)).fill('').map(()=> Array(Math.max(...this._x)).fill(0));
        
        for(let i = 0;i < this._x.length;i++){    
            arrays[this._y[i] - 1][this._x[i] - 1] = 1;
        }
        arrays = arrays.reverse();

    }
}