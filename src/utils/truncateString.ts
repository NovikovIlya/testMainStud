export function truncateString(n:number,str:string) {
    if (str?.length > n) { 
        return str.slice(0, n) + '...';
    }
    return str;
}