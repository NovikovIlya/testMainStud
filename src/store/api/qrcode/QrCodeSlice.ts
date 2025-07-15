import {
    CheckedFlags,
    Directors,
    EditScientificActivityPayload,
    ScientificActivityPayload,
    UserDto,
    foreignLanguageAll,
    socActivity
} from '../../../models/aboutMe'
import { apiSlice } from '../apiSlice'

export const qrCodeService = apiSlice.injectEndpoints({
    endpoints: builder => ({
      
        getQrCode: builder.query<string, string>({
            query: (phone) => ({
                url: `/user-api/qr-code?phone=${phone}`,
                method: 'GET',
                responseHandler: async (response) => {
                    // Получаем изображение как blob
                    const blob = await response.blob();
                    // Конвертируем blob в data URL
                    return new Promise((resolve) => {
                        const reader = new FileReader();
                        reader.onloadend = () => resolve(reader.result as string);
                        reader.readAsDataURL(blob);
                    });
                },
            }),
            keepUnusedDataFor: 1
        }),
   
    })
})

export const {
    useGetQrCodeQuery
} = qrCodeService