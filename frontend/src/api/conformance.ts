import { AlignmentConformance } from '@/models/API/AlignmentConformance';
import { ConformanceDeclare } from '@/models/API/ConformanceDeclare';
import { axiosInstance } from './axios';

const conformanceCheck = (conformanceInput: ConformanceDeclare) => {
    return axiosInstance.post('/model/conformance/declare', conformanceInput, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

const alignmentCheck = (alignmentConformanceInput: AlignmentConformance) => {
    return axiosInstance.post(
        '/model/conformance/alignment',
        alignmentConformanceInput,
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );
};

const conformance = {
    conformanceCheck,
    alignmentCheck,
};

export default conformance;
