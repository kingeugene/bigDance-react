interface IInfo {
    desc: string;
    isActive: boolean;
}

interface ITag {
    name: string;
    value: number;
}

interface ITest {
    userId: number;
    id: number;
    title: string;
    info: IInfo;
    tags: ITag[];
}

const test: ITest = {
    userId: 1,
    id: 1,
    title: "delectus aut autem",
    info: {
        desc: "delectus aut autem",
        isActive: true,
    },
    tags: [
        {
            name: "my name",
            value: 1000,
        },
    ],
};

export default test;
