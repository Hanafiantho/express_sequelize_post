interface ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
    error?: any;
}

export const successResponse = <T>(data: T, message = 'success'): ApiResponse<T> => {
    return {
        success: true,
        data,
        message,
    };
};

export const errorResponse = (error: any, message = 'Error'): ApiResponse<null> => {
    return {
        success: false,
        message,
        error,
    };
};
