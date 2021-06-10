export class StorageHelper{

    private static readonly tokenKey = "tokenKey";

    public static getToken(){
        return window.localStorage[this.tokenKey];
    }

    public static setToken(token: string){
        window.localStorage[this.tokenKey] = token;
    }
}