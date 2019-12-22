class Board{
    constructor(array,turn){
        this.array=array;
        this.turn=turn;
        for(var i=0;i<8;i++){
            for(var j=0;j<8;j++){
                if((i==3 && j==3)||(i==4 && j==4)){
                    array[i][j]="w";
                }else if((i==3 && j==4)||(i==4 && j==3)){
                    array[i][j]="b";
                }else{
                    array[i][j]="s";
                }
            }
        }
    }
    nextTurn(){
        this.turn++;
    }
    setBoard(newArray){
        this.array=newArray;
    }
    altBoard(raw,column,col){
        this.array[raw][column]=col;
    }


    initDrawBoard(){
        var boardWrapper = document.getElementById("boardWrapper");
        for(let i=0;i<8;i++){
            var div = document.createElement("div");
            div.setAttribute("id","raw"+i);
            div.style="margin:0px;width:500px;height:58px;padding:0px;"
            boardWrapper.appendChild(div);
            for(let j=0;j<8;j++){
                var canvas = document.createElement("canvas");
                var canvasContext = canvas.getContext("2d");
                canvas.width=58;
                canvas.height=58;
                canvas.style="border:1px solid black;margin:0px;padding:0px;";
                canvas.id=("mass"+i)+j;
                canvasContext.fillStyle="green";
                canvasContext.fillRect(0,0,60,60);
                div.appendChild(canvas);
            }
        }
    }
    
    drawBoard(){
        var player=document.getElementById("title");
        if(this.turn==0){

        }else if(this.turn%2==0){
            player.innerHTML="黒の番です";
        }else{
            player.innerHTML="白の番です";
        }
        for(var i=0;i<8;i++){
            for(var j=0;j<8;j++){
                if(array[i][j]=="b"){
                    var canvas = document.getElementById(("mass"+i)+j);
                    var canvasContext = canvas.getContext("2d");
                    canvasContext.fillStyle="black";
                    canvasContext.beginPath();
                    canvasContext.arc(29,29,28,0,6.28);
                    canvasContext.fill();
                }else if(array[i][j]=="w"){
                    var canvas = document.getElementById(("mass"+i)+j);
                    var canvasContext = canvas.getContext("2d");
                    canvasContext.fillStyle="white";
                    canvasContext.arc(29,29,28,0,6.28);
                    canvasContext.fill();
                }
            }
        }
    }


    //新しく石を打つx,y座標と現在のターンの色を与えると、それに従ってひっくり返せるマスに対応した配列要素を変更する。
    changeArray(x,y,color){
        this.array[x][y]=color;
        let arrayReversal=[];
        let directions=[[0,1],[0,-1],[1,0],[1,1],[1,-1],[-1,-1],[-1,0],[-1,1]];
        for(let i=0;i<directions.length;i++){
            let direction = directions[i];
            arrayReversal=this.arrayReversalFunc(x+direction[0],y+direction[1],direction,color,[]);
            for(let j=0;j<arrayReversal.length;j++){
                this.array[arrayReversal[j][0]][arrayReversal[j][1]]=color;
            }
        }
    }

    isClicked(x,y){
        if(this.isPuttable(x,y)){
            if(this.turn%2==0){
                this.changeArray(x,y,"b");
                this.turn++;
                this.drawBoard();
            }else{
                this.changeArray(x,y,"w");
                this.turn++;
                this.drawBoard();
            }
        }
    }

    //再帰でやる。
    arrayReversalFunc(currentX,currentY,direction,depColor,reversalArray){

        //同じ色のマスが無く、参照しているマスが空か枠外にはみ出てれば空のスタックを返す。違う色なら渡されたスタックに自分の座標を加えて、次のマスに渡す。同じ色なら渡されたスタックをそのまま返す。
        if(currentX<0 || currentX>=8 || currentY<0 || currentY>=8){
            return []; 
        }else if(this.array[currentX][currentY]=="s"){
            return [];
        }else if( this.array[currentX][currentY]==depColor){
            return reversalArray;
        }else if( this.array[currentX][currentY]!=depColor){
            let returnArray=reversalArray;
            returnArray.push([currentX,currentY]);
            return this.arrayReversalFunc(currentX+direction[0],currentY+direction[1],direction,depColor,returnArray);
        }else{
            return returnArray;
        }
    }

    isPuttable(x,y){
        if(array[x][y]=="s"){
            let flag = false;
            if(this.turn%2==0){
                let arrayReversal=[];
                let directions=[[0,1],[0,-1],[1,0],[1,1],[1,-1],[-1,-1],[-1,0],[-1,1]];
                for(let i=0;i<directions.length;i++){
                    let direction = directions[i];
                    arrayReversal=this.arrayReversalFunc(x+direction[0],y+direction[1],direction,"b",[]);
                    if(arrayReversal.length>0){
                        flag=true;
                    }
                }

            }else{
                let arrayReversal=[];
                let directions=[[0,1],[0,-1],[1,0],[1,1],[1,-1],[-1,-1],[-1,0],[-1,1]];
                for(let i=0;i<directions.length;i++){
                    let direction = directions[i];
                    arrayReversal=this.arrayReversalFunc(x+direction[0],y+direction[1],direction,"w",[]);
                    if(arrayReversal.length>0){
                        flag=true;
                    }
                }

            }
            return flag;
        }else{
            return false;
        }
    }

    puttableMass(){

    }
}

function hello(message) {
    console.log(message);
}