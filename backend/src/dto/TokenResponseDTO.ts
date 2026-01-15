export default interface TokenResponseDTO {
    userExternalId: string;
    email: string;
    authenticated: boolean;
    accessToken: string;
    refreshToken: string;
}