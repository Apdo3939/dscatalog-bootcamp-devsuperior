
import jwtDecoder from 'jwt-decode';

export const CLIENT_ID = 'dscatalog';
export const CLIENT_SECRET = 'dscatalog123';

type LoginResponse = {
    access_token: string;
    expires_in: number;
    scope: string;
    token_type: string;
    userFirstName: string;
    userId: number;
}

type Role = 'ROLE_OPERATOR' | 'ROLE_ADMIN';

type AccessToken = {
    exp : number;
    user_name: string;
    authorities: Role[];
}

export const saveSessiondata = (loginResponse: LoginResponse) => {
    localStorage.setItem('authData', JSON.stringify(loginResponse));
}

export const getSessiondata =() => {
    const sessionData = localStorage.getItem('authData') ?? '{}';
    const parsedSessionData = JSON.parse(sessionData);
    return parsedSessionData as LoginResponse;
}

export const getAccessTokenDecoded = () => {
    const sessionData = getSessiondata();
    const tokenDecoded = jwtDecoder(sessionData.access_token);
    return tokenDecoded as AccessToken;

}

export const tokenIsValid = () => {
    const {exp} = getAccessTokenDecoded();
    if(Date.now() <= exp * 1000){
        return true;
    }
    return false;
}

export const isAuthenticated = () => {
    const sessionData = getSessiondata();
    return sessionData.access_token && tokenIsValid();
}