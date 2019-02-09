type StringOrNumberArray = (string | number) [];

type GraphType = "line" | undefined;

interface GraphInfo {
    type : GraphType,
    x_axis : StringOrNumberArray,
    y_axis : StringOrNumberArray
}

interface Graph {
    readonly _x : number[],
    readonly _y : number[],
    generate: () => void,
}

