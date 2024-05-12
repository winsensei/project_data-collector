document.addEventListener('DOMContentLoaded', function () {
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const select = dropdown.querySelector('.select');
        const caret = dropdown.querySelector('.caret');
        const menu1 = dropdown.querySelector('.menu1');
        const options = dropdown.querySelectorAll('.menu1 li');
        const selected = dropdown.querySelector('.selected');

        select.addEventListener('click', () => {
            menu1.classList.toggle('menu1-open');
            caret.classList.toggle('caret-rotate'); // เพิ่มคลาส caret-rotate เพื่อหมุนลูกศร
        });

        options.forEach(option => {
            option.addEventListener('click', () => {
                selected.innerText = option.innerText;
                menu1.classList.remove('menu1-open');
            });
        });
    });
});
