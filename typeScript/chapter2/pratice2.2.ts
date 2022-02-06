// 2.2.1 타입키워드 사용
type Foot = number;
type Pound = number;

type Patient = {
    name: string;
    height: Foot;
    weight?: Pound; // ? 있거나 없거나
};

let patient: Patient = {
    name: 'Joe Smith',
    height: 5
};
