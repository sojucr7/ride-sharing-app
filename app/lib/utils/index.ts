export const validateEmail = function(email:string):boolean {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
export const parseJwt = function(token:String) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}