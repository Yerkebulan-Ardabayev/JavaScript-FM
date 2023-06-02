const color = [
  'rgba(42, 23, 14, 0.834)',
  'rgb(101, 107, 132)',
  'rgba(43, 226, 95, 0.345)',
  'rgb(144, 177, 47)',
  ' aqua',
  '#FF5733',
  '#F9FF33',
  '#3371FF',
];
const getRandomNumber = () => {
  return Math.floor(Math.random() * color.length);
};
const colorChangeText = document.getElementById('color_text');
const changeColor = () => {
  colorChangeText.style.backgroundColor = color[getRandomNumber()];
};
btn.addEventListener('click', () => {
  changeColor();
});
