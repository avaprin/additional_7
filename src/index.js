module.exports = function solveSudoku(matrix)
{
    function isRow(matrix,i,n)
    {
        for(let j = 0;j<matrix.length;j++)
        {
            if(matrix[i][j]===n)return false;
        }
        return true;
    }
    function isColumn(matrix,j,n)
    {
        for(let i = 0;i<matrix.length;i++)
        {
            if(matrix[i][j]===n)return false;
        }
        return true;
    }
    function isBlock(matrix,i,j,n)
    {
        let row = 3*(Math.floor(i/3));
        let column = 3*(Math.floor(j/3));
        for(let r = 0;r<3;++r)
        {
            for(let c = 0;c<3;c++)
            {
                if(matrix[r+row][c+column]===n)return false;
            }
        }
        return true;
    }
    function setSolution(matrix)
    {
        let success=true,failure=false;
        var arr = [];
        for(let i = 0;i<matrix.length;i++)
        {
            for(let j = 0;j<matrix.length;j++)
            {
                if(!matrix[i][j])arr.push([i,j,[]]);
            }
        }
        if(arr.length===0)return success;
        for(let a of arr){
            for(let i = 1;i<=9;++i)
            {
                if(isRow(matrix,a[0],i) && isColumn(matrix,a[1],i) && isBlock(matrix,a[0],a[1],i))
                    a[2].push(i);
            }
        }
        let min = arr[0];
        for(let i = 1;i<arr.length;i++)
        {
            if(arr[i][2].length<min[2].length)min = arr[i];
        }
        for(let a of min[2])
        {
            matrix[min[0]][min[1]]=a;
            let status = setSolution(matrix);
            if(status===success)return success;
            else matrix[min[0]][min[1]] = 0;
        }
        return failure;
    }
    setSolution(matrix);
    return matrix;// your solution
}
