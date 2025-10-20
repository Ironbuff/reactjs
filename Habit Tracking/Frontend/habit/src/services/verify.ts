import api from "./Api"


export const requestPasswordReset = async (email: string) => {
    const response = await api.post('/auth/user/forgot-password', { email });
    return response.data;
};


export const resetPassword = async ({ token, password }: { token: string; password: string }) => {
    const response = await api.post(`/auth/user/reset-password/${token}`, { password });
    return response.data;
};

