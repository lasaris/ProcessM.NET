import { AlignmentConformance } from '@/models/API/AlignmentConformance';
import { ConformanceDeclare } from '@/models/API/ConformanceDeclare';
import { axiosInstance } from './axios';

const conformanceCheck = (conformanceInput: ConformanceDeclare) => {
    return axiosInstance.post(
        '/conformance/declarative/constraints',
        conformanceInput,
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );
};

const alignmentCheck = (alignmentConformanceInput: AlignmentConformance) => {
    return axiosInstance.post(
        '/conformance/imperative/alignments',
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
