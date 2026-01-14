export default interface TokenResponseDTO {
    authenticated: boolean;
    accessToken: string;
    refreshToken: string;
}