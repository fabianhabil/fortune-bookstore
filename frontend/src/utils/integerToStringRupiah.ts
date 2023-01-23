const integerToStringRupiah = (value: number) => {
    const string = Number(value).toLocaleString().replace(/,/g, '.');
    if (value === 0) return 0;
    return string.concat(',00');
};

export default integerToStringRupiah;
