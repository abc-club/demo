var $window = window,
  $container = document.querySelector('.container');
$window.onload = $window.onscroll = function () {
  var $imgboxs = $container.children;
  [...$imgboxs].forEach(($item) => {
    if ($item.classList.contains('loaded')) return;
    var $img = $item.querySelector('img'),
      clientRect = $item.getBoundingClientRect(), // NOTE: 这里用item的高度，因为img还没有宽高
      $A = clientRect.top + clientRect.height,
      $B = window.innerHeight;
    if ($A <= $B) {
      console.log('loaded');
      $img.src = $img.dataset['src'];
      $item.classList.add('loaded');
    }
  });
};
