const qazaqMenu = [
  'shuzhuk',
  'kumys',
  'zhent',
  'kurt',
  'kuymak',
  'lagman',
  'manti',
  'meat',
  'sorpa',
  'beshbarmak',
  'plov',
];

const container = document.querySelector('.menu');
const buttonSort = document.querySelector('.buttonSort');
const buttonSortAgain = document.querySelector('.buttonSortAgain');

const renderItem = (item) => {
  const menuList = document.createElement('span');
  menuList.classList.add('menuList');
  menuList.innerText = item;
  return menuList;
};

const render = (arr) => {
  arr.forEach((item) => {
    container.appendChild(renderItem(item));
  });
};

render(qazaqMenu);

buttonSort.addEventListener('click', () => {
  container.innerHTML = '';
  const arr = qazaqMenu.sort((a, b) => {
    return (a.length - b.length) || a.localeCompare(b)
  });
  render(arr);
});
