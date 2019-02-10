import LineGraph from './graphs/line';

const readline = require('readline');

let r1 = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

function promptSelectGraphType()
{    
    return new Promise( (resolve,reject):void => {
        r1.question("Select graph type:\n", (answer:string) =>{
            switch(answer){
                case "line":
                break;
        
                default :
                reject("Invalid Graph Type");
            }
            resolve(answer);
        });
    });
}

function addXAxis():Promise<StringOrNumberArray>
{
    return new Promise((resolve,reject):void=>{
        r1.question("Add X axis\n",(answer:string) => {
            // console.log(Array.isArray(answer));
            try{
                resolve(JSON.parse(answer));
            }catch(err){
                reject("Invalid Array given");
            }
        });
    });
}

function addYAxis(requiredlength : number):Promise<StringOrNumberArray>
{
    return new Promise((resolve,reject):void=>{
        r1.question(`Add Y axis(Length: ${requiredlength})\n`,(answer:string) => {
            
            let y_axis:StringOrNumberArray = [];
            try{
                y_axis = JSON.parse(answer);                
            }
            catch(err){
                reject("Invalid Array given");
            }

            if(y_axis.length !== requiredlength){
                reject(`Required length is ${requiredlength}`);
            }
            resolve(y_axis);
        });
    });
}

function getAxisName(axis:Axis)
{
    return new Promise((resolve):void=>{
        r1.question(`Add ${axis} axis name\n`,(answer:string) => {
            resolve(answer);
        });
    });
}

function handleError(err:string)
{
    console.log("\x1b[41m",'Abort!',"\x1b[0m",err);
    r1.close();
    throw new Error(err);
}

async function handleInput():Promise<GraphInfo>
{
    let type:GraphType = undefined;
    let x_axis_name : string = '';
    let y_axis_name : string = '';
    let x_axis:StringOrNumberArray = [];
    let y_axis:StringOrNumberArray = [];

    try{
        type = <GraphType>await promptSelectGraphType();
    }catch(err){
        handleError(err);
    }
    x_axis_name = <string>await getAxisName('X');
    
    try{
        x_axis = <StringOrNumberArray>await addXAxis();
    }catch(err){
        handleError(err);
    }
    y_axis_name = <string>await getAxisName('Y');

    try{
        y_axis = <StringOrNumberArray>await addYAxis(x_axis.length);
    }catch(err){
        handleError(err);
    }

    return {type, x_axis,x_axis_name, y_axis,y_axis_name};
}

async function main()
{
    var input:GraphInfo = await handleInput();
    
    if(input.type = "line"){
        var graph = new LineGraph; 
    }else{
        throw new Error("Error!");
    }

    graph.x = input.x_axis;
    graph.x_name = input.x_axis_name;
    graph.y = input.y_axis;
    graph.y_name = input.y_axis_name;
    graph.generate();

    r1.close();
}

main();

