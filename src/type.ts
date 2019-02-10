type StringOrNumberArray = (string | number) [];

type GraphType = "line" | undefined;

interface GraphInfo {
    type : GraphType,
    x_axis : StringOrNumberArray,
    x_axis_name:string,
    y_axis : StringOrNumberArray,
    y_axis_name:string
}

interface Graph {
    readonly _x : number[],
    readonly _y : number[],
    generate: () => void,
}

type Axis = "X"| "Y";

