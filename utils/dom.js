export const loadingPageStart = () => {
    const el = document.querySelector('.main__content');
    if (el) {
        el.classList.add('__loading');
    }
};

export const loadingPageEnd = () => {
    const el = document.querySelector('.main__content');
    if (el) {
        el.classList.remove('__loading');
    }
};
