export const fromArrayToObject = <T extends { id: number }>(
    params: T[]
): Hash<T> => {
    const acc: Hash<T> = {};

    params.forEach((item) => {
        acc[item.id] = item;
    });

    return acc;
};
