
export default class LineGraph implements Graph{

    _x: number[] = [];
    x_name : string = '';
    
    _y: number[] = [];
    y_name : string = '';

    x_scale:number = 100;
    y_scale:number = 30;

    x_max:number = 0;
    y_max:number = 0;

    scale_interval:number = 0.1;

    set x(x_axis:StringOrNumberArray)
    {
        this._x = x_axis.map((val) => parseInt(<string>val));
        this.x_max = Math.max(...this._x);
        
    }
    
    set y(y_axis:StringOrNumberArray)
    {
        this._y = y_axis.map((val) => parseInt(<string>val));
        this.y_max = Math.max(...this._y);
    }

    generate():void
    {
        this.scale();

        let arrays:(number|string)[][] = Array(this.y_scale + 1).fill(' ').map(()=> Array(this.x_scale + 1).fill(' '));
        
        for(let i = 0;i < this._x.length;i++){    
            arrays[this._y[i]][this._x[i]] = 'x';
        }

        arrays = arrays.reverse();
        arrays = this.appendOutLine(arrays);
        arrays = this.appendXScaleInterval(arrays);
        arrays = this.appendYScaleInterval(arrays);
        arrays = this.addLabel(arrays);

        for(let array of arrays){
            for(let sign of array){
                process.stdout.write(<string>sign);
            }
            process.stdout.write("\n");
        }
    }

    addLabel(arrays:(number|string)[][]): typeof arrays
    {   
        let insertionIndex:number = 0;

        let horizontalArrayLength = arrays[0].length;
        let x_name_length = this.x_name.length;
        insertionIndex = (horizontalArrayLength - x_name_length) / 2; 
        let append_x = Array(horizontalArrayLength).fill(' ');
        
        append_x.splice(insertionIndex,x_name_length,this.x_name);
        arrays.push(append_x);
        
        let y_name_length = this.y_name.length;
        insertionIndex = (arrays.length - y_name_length) / 2;

        let ii = 0;
        for(let i = 0;i < arrays.length;i++){
            
            console.log(insertionIndex);
            if(i >= insertionIndex && i < (insertionIndex + y_name_length)){
                arrays[i].unshift(this.y_name[ii]);
                console.log(ii,this.y_name,this.y_name[ii]);
                ii++;
            }
            else{
                arrays[i].unshift(' ');
            }
        }
        return arrays;
    }
    appendOutLine(arrays:(number|string)[][]): typeof arrays
    {   
        arrays = arrays.map((array)=> {array.unshift('|'); return array});
        arrays.push(Array(this.x_scale + 1).fill('-'));
        return arrays;
    }

    appendYScaleInterval(arrays:(number|string)[][]):typeof arrays
    {   
        let interval = 0;
        let append_y = Array(this.y_scale + 4).fill(' ');
        let append_y_pipe = Array(this.y_scale + 4).fill(' ');
        let maxLength = this.y_max.toString().length;
        while(interval < 1){
            let interval_value = interval * this.y_max;
            let index = Math.round(interval * this.y_scale);

            append_y_pipe[index] = '-';
            append_y[index] = Math.round(this.y_max - interval_value).toString();
            
            interval += this.scale_interval;
        }

        for(let i = 0; i < arrays.length;i++){
            arrays[i].unshift(append_y[i],append_y_pipe[i]);
            for(let ii = append_y[i].length; ii < maxLength; ii++){
                arrays[i].unshift(' ');
            }
        }
        console.log(arrays);

        return arrays;
    }

    appendXScaleInterval(arrays:(number|string)[][]): typeof arrays
    {   
        let interval = this.scale_interval;    

        let append_x = Array(this.x_scale + 1).fill(' ');
        let append_x_pipe = Array(this.x_scale + 1).fill(' ');

        while(interval < 1){
            let interval_value = Math.round(interval * this.x_max).toString();
            let index = Math.round(interval * this.x_scale);

            append_x_pipe[index] = '|';

            append_x[index] = interval_value;
            interval += this.scale_interval;
        }
        for(let i = 0; i < append_x.length;i++){
            if(append_x[i].length > 1){
                append_x.splice(i + 1,append_x[i].length -1);
            }
        }
        arrays.push(append_x_pipe,append_x);
        
        return arrays;
    }

    scale():void
    {   
        let multiplier:number = 0;

        multiplier = this.x_scale / this.x_max;
        this._x = this._x.map((val)=> Math.round(val * multiplier));
        
        multiplier = this.y_scale / this.y_max;
        this._y = this._y.map((val)=> Math.round(val * multiplier));
    }
}