import { Conformance } from '@/models/API/Conformance';
import { axiosInstance } from './axios';

const conformanceCheck = (conformanceInput: Conformance) => {
    return axiosInstance.post('/model/conformance/', conformanceInput, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

const conformance = {
    conformanceCheck,
};

export default conformance;
